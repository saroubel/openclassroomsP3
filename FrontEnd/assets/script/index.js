//---Récupération les données depuis l'API---//

//*** Récupération les données Works 
let listWorks = []                                          // variable initialisée à un tab vide pour stocker les données                              
async function getWorks() {                                 // exécute des opérations bloquantes en arrière-plan sans bloquer le thread d'exécution principal
    await fetch('http://localhost:5678/api/works')          // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            listWorks=data

            // afficher les works
            console.log(listWorks)                          

          } )
}



//*** Récupération les données Catégories 
let categories = []
async function getCategories() {
    await fetch('http://localhost:5678/api/categories')     // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            categories=data

            // afficher les catégories
            // console.log(categories);                     
          } )
}




//*** Création des bouttons Catégories dynamiquement 
function createButtonCatg(){

    // recup le conteneur html avec la classe filters où les btn de catégories seront ajoutés
    const filters = document.querySelector('.filters')
  
    // btn tous 
    const btnTous = document.createElement("button")  
    // ajout des attributs
    btnTous.textContent = "Tous"
    btnTous.setAttribute("name", "Tous")
    btnTous.setAttribute("type", "button")
    // ajout class au btn
    btnTous.classList.add("filters_btn")  
    // Ajout class 'toggled' au btn 'Tous' pour qu'il sera affiché par défaut aprés l'actualisation de la page
    btnTous.classList.add("toggled")

    //** click et filterByCatg pour btn Tous
    btnTous.addEventListener('click', function () { 
      //appel fonction qu'on va la créer qui filtre les works
      filterByCatg("Tous")

          // Supprimer classe 'toggled'de tous les boutons pour ne garder que le btn 'Tous'
          const allButtons = document.querySelectorAll('.filters_btn');
          allButtons.forEach(btn => btn.classList.remove('toggled'));
          // Ajouter classe 'toggled' au bouton cliqué
          btnTous.classList.add('toggled');
     
    })

    // ajout btn tous dans le conteneur filters
    filters.appendChild(btnTous)
    


    // btns categories
    // ajouter les btn pour chaque catégorie
    for (let i=0; i<categories.length; i++){
  
      // créer btn
      let btnCategorie = document.createElement("button")  
      //ajout des attributs depuis le tab de catégories
      btnCategorie.setAttribute("name",categories[i].name) 
      btnCategorie.setAttribute("type","button")
      // ajout class aux btns
      btnCategorie.classList.add("filters_btn")
      // btnCategorie.classList += "filters_btn"

      //ajouter les noms pour les btn depuis le tab de catégories
      btnCategorie.textContent=categories[i].name
      
      //** click et filterByCatg pour chaque catégorie
      btnCategorie.addEventListener('click', function () {
        filterByCatg(categories[i].name)

          // Supprimer classe 'toggled' de tous les boutons pour garder le btn cliqué
          const allButtons = document.querySelectorAll('.filters_btn');
          allButtons.forEach(btn => btn.classList.remove('toggled'));
          // Ajouter classe 'toggled' au bouton cliqué
          btnCategorie.classList.add('toggled');
      })

      //ajout du btn dans le conteneur filters
      filters.appendChild(btnCategorie)   
    }
  }
  



  

//*** Manipulation du DOM en JS -- Création d'une figure où les img et titres seront ajoutés
  function creationFigureGallery(work,gallery) {
      
  let figureGallery = document.createElement("figure")
  let imageGallery = document.createElement("img") 
  let titleGallery = document.createElement("figcaption")

  // ajout des attributs à l'image
  imageGallery.setAttribute("src",work.imageUrl)
  imageGallery.setAttribute("alt",work.title)
  // ajout txt dans le figcaption
  titleGallery.textContent = work.title

  //ajout class gallery_pic
  figureGallery.classList.add("gallery_pic")

  //ajout des img et titres dans le conteneur gallery
  gallery.appendChild(figureGallery)
  figureGallery.appendChild(imageGallery)
  figureGallery.appendChild(titleGallery)
  } 




//*** Afficher Gallery de tout les works dynamiquement avec photo et titre--Manipulation du DOM en JS
function showAllWorks(){  

  //recup le conteneur html avec la classe gallery où les works seront ajoutés
  let gallery = document.querySelector('.gallery')
  
  //afficher les works 
  for(let i = 0; i < listWorks.length; i++) {

      //appel pour chaque work
      creationFigureGallery(listWorks[i],gallery)
  }
} 






//*** Filtrage de gallery par catégories pendant click
function filterByCatg(categorieSelectionne) {

  // console.log("ce que j'ai cliqué : " + categorieSelectionne)

  //recup les conteneurs html avec les classes gallery 
  let gallery = document.querySelector('.gallery')  

  // Vider gallery avant d'afficher de nv works 
  gallery.innerHTML = '';

  //si on clique sur le btn tous
  if (categorieSelectionne == "Tous") {
    showAllWorks();
  }
  //si on clique sur les btn des catégories
  else {

    // filtrer tout les works par catégories
    for (let i = 0; i < listWorks.length; i++) {

      //si le nom de work correspond à la catégories
      if (listWorks[i].category.name == categorieSelectionne) {
       
        //appel pour chaque work
      creationFigureGallery(listWorks[i],gallery)

      }
    }
  }
}





//********************************//

//*** Se déconnecter
function logout() {
  // Suppression du token
  localStorage.removeItem('token');
}


//*** Mode admin 
function isAdmin() {
  // si login est connecter
  if (localStorage.getItem('token')) {

    //récup lien login qui se trouve dans nav ul li 
    const loginLink = document.querySelector('nav ul li:nth-child(3) a')

    //Modifier txt login -> logout
    loginLink.textContent = 'logout'

    //clique sur logout pour se deconnecter
    loginLink.addEventListener('click', function () {
      logout()
    })


    //modifier mes projets
    const mesProjets = document.querySelector('.portfolio_title');     //conteneur où lien et icone seront ajoutés
    
    const modifierIcon = document.createElement('i');                  //ajout de l'icone modifier mes projets
    modifierIcon.classList.add('fa-regular', 'fa-pen-to-square');      
    
    const modifier = document.createElement('a');                      //ajout lien pour modifier
    modifier.textContent = 'modifier';
    modifier.href = '#';
    modifier.classList.add('edit');

    mesProjets.appendChild(modifierIcon);                              //mettre i et a dans le conteneur portfolio_title
    mesProjets.appendChild(modifier);
    

    //mode edition
    const body = document.querySelector('body');                       //recup body pour ajouter div 
    
    const modeEdition = document.createElement('div');                 //creation div
    modeEdition.classList.add('mode_edition');
        
    const modeEditionIcon = document.createElement('i');               //ajout icone mode edition
    modeEditionIcon.classList.add('fa-regular', 'fa-pen-to-square');
       
    const modeEditionTxt = document.createElement('a');                //ajout txt mode edition
    modeEditionTxt.textContent = 'Mode édition';
    modeEditionTxt.href = '#';
    modeEditionTxt.classList.add('txt_edition');


    modeEdition.appendChild(modeEditionIcon);                          //ajout txt et i dans la div
    modeEdition.appendChild(modeEditionTxt);                     
    body.insertBefore(modeEdition, body.firstChild);                   //ajout div dans le body
    
    }
      else {
        console.log("pas connecté")
      }
}



//********************************//

//*** creation Modale pour modifier mes projets
function createModal(update) {

      //créer modal
      const modal = document.createElement('aside')
      modal.classList.add('modal')

      //insert modal apres click sur update work pour eviter recreation de la modale
      //update parametre qui permet de créer modale apres click de modifier ou mode edition
      update.insertAdjacentElement('afterend', modal);

      //créer le contenu de la modale pour supression img
      const modalContent1 = document.createElement('div')
      modalContent1.classList.add('modal_content_1')
      modal.appendChild(modalContent1);

      //créer div pour icônes close et retour
      const divCloseBack = document.createElement('div')
      divCloseBack.classList.add('div_close_back')
      modalContent1.appendChild(divCloseBack);

      //créer icone close 
      const btnClose = document.createElement('i')
      btnClose.classList.add('fa-solid', 'fa-xmark')
      divCloseBack.appendChild(btnClose)

      //créer titre modal
      const modalTitle = document.createElement('h3')
      modalTitle.textContent = 'Galerie photo'
      modalContent1.appendChild(modalTitle)

      //créer conteneur gallery 
       const galleryModal = document.createElement('div')
       galleryModal.classList.add('gallery_modal')
       modalContent1.appendChild(galleryModal)

      //appel fonction - add images dans le conteneur gallery
      addImgModal(galleryModal)

      //appel fonction event click de la suppression
      eventDeleteIcon()

      //créer boutton Ajouter une photo
      const btnAdd = document.createElement('button')
      btnAdd.textContent = 'Ajouter une photo'
      btnAdd.classList.add('btn_add')
      modalContent1.appendChild(btnAdd)
      //appel fonction event ajouter une photo
      eventAddPhoto()

      //ouverture - appel fonction
      openModal(modal)
      //fermeture click sur icone close
      btnClose.addEventListener('click', function() {
        closeModal(modal) })
      //fermeture click en dehors de la modale
      window.onclick = function(event) {
        if (event.target === modal) {
          closeModal(modal)
        }
      }
    }



//*** Ouverture de la modale
function openModal(modal) {
  modal.style.display = 'block'
}


//*** Fermeture de la modale
async function closeModal(modal) {
  modal.style.display = 'none'

    //supprimer gallery index aprés fermeture de la modale pour mettre à jour des works
      //vider gallery
      let gallery = document.querySelector('.gallery')  
      gallery.innerHTML = ''  
      //recharger works
      await getWorks()
      //afficher works
      showAllWorks()  
}



//*** Créer img au conteneur galleryModal avec les icônes supression
function addImgModal(galleryModal) {

    for (let i = 0; i < listWorks.length; i++) {

      //créer conteneur box pour img et icon
      const imgModalBox = document.createElement('div');
      imgModalBox.classList.add('img_modal_box');

      //créer img
        const imgModal = document.createElement('img')
        imgModal.src = listWorks[i].imageUrl // imgModal.setAttribute('src', listWorks[i].imageUrl)
        imgModal.alt = listWorks[i].title
        imgModal.classList.add('img_modal')

      //créer icône supression sur img
        const deleteIcon = document.createElement('i')
        deleteIcon.setAttribute('id', listWorks[i].id)
        deleteIcon.classList.add('fa-solid', 'fa-trash-can')  

        imgModalBox.appendChild(imgModal)
        imgModalBox.appendChild(deleteIcon)    
        
      //ajouter conteneur box à gallery de modale
        galleryModal.appendChild(imgModalBox);
   }
}



//*** API Suppression Work
  //async pour pouvoir utiliser await pour l'attente des works 
async function deleteWork(id) {

  const token = localStorage.getItem('token')
  if (!token) {
    console.error('No token found')
    return;
  }
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })  

  //**Mettre à jour la liste des works aprés suppression
      //suppression img dans le conteneur galleryModal
        const galleryModal = document.querySelector('.gallery_modal')
        galleryModal.innerHTML = ''

      //appel Api pour recharger la liste des works
        await getWorks()

      //appel fonction ajout les img avec les icônes delete
        addImgModal(galleryModal)

      //appel fonction event click suppression pour les icônes
        eventDeleteIcon()
}




//*** Event click Suppression Work
function eventDeleteIcon() {

  //appel icône supression
  const deleteIcon = document.querySelectorAll('.fa-trash-can')

  //event click 
  deleteIcon.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', function() {
      //confirmation
      if (confirm('Are you sure you want to delete this work ?')) {
        deleteWork(deleteIcon.id)
      }
      })
      
  })
}



//*** Event click Modifier Work
function eventModifier() { 
    //si login est connecté
      if (localStorage.getItem('token')) {
        //recup modifier
        const modifier = document.querySelector('.edit')
        //click sur btn modifier ouvert la modale
        modifier.addEventListener('click', function () {
          //appel fonction creation modale
          createModal(modifier)
        })
      }
}


//*** Event click Mode edition = modifier work
function eventModeEdition() { 
    //si login est connecté
      if (localStorage.getItem('token')) {
        //recup mode edition
        const modeEdition = document.querySelector('.mode_edition')
        //clique sur btn mode edition ouvert la modale
        modeEdition.addEventListener('click', function () {
          //appel fonction creation modale
          createModal(modeEdition)
        })
      }
}


//*** Event boutton ajouter une photo
function eventAddPhoto() { 
    
        //recup les elements de la modale existante et btn ajout
        const modalContent1 = document.querySelector('.modal_content_1')
        const div_close_back = document.querySelector('.div_close_back')
        const btnAdd = document.querySelector('.btn_add')
        const modalTitle = document.querySelector('h3')
        const galleryModal = document.querySelector('.gallery_modal')

        //click -> ouvert la modale 2 d'ajout
        btnAdd.addEventListener('click', function () {

            // Créer icône back pour retourner à la modale précédente
            const backBtn = document.createElement('i')
            backBtn.classList.add('fa-solid', 'fa-arrow-left')
            backBtn.setAttribute('id', 'back_btn')
            // Ajouter icône back à modalContent1 avec insertAdjacentElement pour que l'icône soit en haut
            div_close_back.insertAdjacentElement('afterbegin', backBtn)

            // Changer titre modal
            modalTitle.textContent = 'Ajout photo'

            // Cachez le conteneur gallery de modale existant
            galleryModal.style.display = 'none'

            // Cacher bouton ajouter une photo
            btnAdd.style.display = 'none'

            // Créer uploader image
            const uploaderImg = document.createElement('div')
            uploaderImg.classList.add('uploader_img')
            modalContent1.appendChild(uploaderImg)

            // Créer file icon
            const fileIcon = document.createElement("i")
            fileIcon.classList.add("fa-regular", "fa-image")
            uploaderImg.appendChild(fileIcon)

            // Créer file label
            const fileLabel = document.createElement("label")
            fileLabel.textContent = "+ Ajouter photo"
            fileLabel.classList.add("fileLabel")
            // fileLabel.style.cursor = "pointer"
            // fileLabel.setAttribute("for", "file")
            uploaderImg.appendChild(fileLabel)

            // Créer file input
            const fileInput = document.createElement("input")
            fileInput.type = "file"
            fileInput.id = "file"
            fileInput.name = "images"
            uploaderImg.appendChild(fileInput)

            // Créer image preview
            // Créer image preview
            // Créer image preview



            // Créer file max Size 
            const fileMaxSize = document.createElement("p")
            fileMaxSize.classList.add("max_size")
            fileMaxSize.textContent = "Jpg, png: 4Mo max"
            uploaderImg.appendChild(fileMaxSize) 
            

            // Créer champs titre
            // Créer champs catégorie
            

            // Créer bouton valider
            const btnValider = document.createElement("button")
            btnValider.classList.add("btn_valider")
            btnValider.textContent = "Valider"
            modalContent1.appendChild(btnValider)
        })


}


//*** Event boutton valider
//*** Event boutton valider
//*** Event boutton valider


//*** Event retour à la modale précédente
//*** Event retour à la modale précédente
//*** Event retour à la modale précédente





//********************************//

//*** Fonction initialisation
async function init() {
  await getWorks()
  await getCategories()
  createButtonCatg()
  showAllWorks()
  isAdmin()
  eventModifier()
  eventModeEdition()
}
// appel pour l'initialisation
init(); 

//********************************//