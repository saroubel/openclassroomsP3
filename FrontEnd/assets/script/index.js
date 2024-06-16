//---Récupération les données depuis l'API---//

//-----Récupération les données Works 
let listWorks = []                                          // variable initialisée à un tab vide pour stocker les données                              
async function getWorks() {                                 // exécute des opérations bloquantes en arrière-plan sans bloquer le thread d'exécution principal
    await fetch('http://localhost:5678/api/works')          // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            listWorks=data

            // afficher les works
            // console.log(listWorks)                          

          } )
}


//-----Récupération les données Catégories 
let categories = []
async function getCategories() {
    await fetch('http://localhost:5678/api/categories')     // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            categories=data

            // afficher les catégories
            // console.log(categories);                     
          } )
};




//-----Création des bouttons Catégories dynamiquement 
function createButtonCatg(){

    //recup le conteneur html avec la classe filters où les btn de catégories seront ajoutés
    const filters = document.querySelector('.filters')
  
    // btn tous 
    const btnTous = document.createElement("button")  // button : balise
    // ajout des attributs
    btnTous.textContent = "Tous"
    btnTous.setAttribute("name", "Tous")
    btnTous.setAttribute("type", "button")
    // ajout class au btn
    btnTous.classList.add("filters_btn")  

    //----------//
    // click et fonction filterByCatg pour btn Tous
    btnTous.addEventListener('click', function () { 
      filterByCatg("Tous") 
      btnTous.classList.toggle('toggled')  // add classe toggled pour changer style btn Tous lors du click
     
     }
    )

    // ajout du btn dans le conteneur filters
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

      //ajout le txt des noms dans les btn depuis le tab de catégories
      btnCategorie.textContent=categories[i].name

      //----------//
      //click et fonction filterByCatg pour chaque catégorie
      btnCategorie.addEventListener('click', function () {

        filterByCatg(categories[i].name)
        btnCategorie.classList.toggle('toggled');
        }
      )
  
      //ajout du btn dans le conteneur filters
      filters.appendChild(btnCategorie)
    }
  }
  



  

//-------Manipulation du DOM en JS -- Création d'une figure où les img et titres seront ajoutés
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




//-----Afficher Gallery de tout les works dynamiquement avec photo et titre--Manipulation du DOM en JS
function showAllWorks(){  

  //recup le conteneur html avec la classe gallery où les works seront ajoutés
  let gallery = document.querySelector('.gallery')
  
  //afficher les works 
  for(let i = 0; i < listWorks.length; i++) {

      //appel pour chaque work
      creationFigureGallery(listWorks[i],gallery)
  }
} 






//-----Filtrage de gallery par catégories pendant click
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






//------Se déconnecter
function logout() {
  // Suppression du token
  localStorage.removeItem('token');
}




//------Mode admin 
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
  }
}





//-----Fonction initialisation
async function init() {
  await getWorks()
  await getCategories()
  createButtonCatg()
  showAllWorks()
  isAdmin()
  }
// appel pour l'initialisation
init(); 



