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
  





//-----Afficher Gallery de tout les works dynamiquement avec photo et titre
function showAllWorks(){  

  //recup le conteneur html avec la classe gallery où les works seront ajoutés
  let gallery = document.querySelector('.gallery')
  
  //afficher les works 
  for(let i = 0; i < listWorks.length; i++) {

      //pour tester l'affichage des works
      // console.log(listWorks[i])

      // ajouter du contenu HTML pour les works dans le conteneur gallery
      gallery.innerHTML += 
      `<figure class="gallery_pic">
      <img src="${listWorks[i].imageUrl}" alt="${listWorks[i].title}">
      <figcaption>${listWorks[i].title}</figcaption>
      </figure>`
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
       
        // ajouter du contenu HTML pour les works dans le conteneur gallery
        gallery.innerHTML +=
          `<figure class="gallery_pic">
      <img src="${listWorks[i].imageUrl}" alt="${listWorks[i].title}">
      <figcaption>${listWorks[i].title}</figcaption>
      </figure>`
      }
    }
  }
}





//-----Fonction initialisation
async function init() {
    await getWorks();
    await getCategories();
    createButtonCatg();
    showAllWorks();
}
  // appel pour l'initialisation
  init(); 
  
  
  
  