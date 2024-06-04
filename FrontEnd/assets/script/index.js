
//---Récupération les données depuis l'API---// 

//-----Récupération les données Works 
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

//-----Récupération les données Catégories 
let categories = [];
async function getCategories() {
    await fetch('http://localhost:5678/api/categories')     // appel de l'API
          .then((response) => response.json())              // récup des données
          .then((data) => {                                 // remplir le tableau 
            categories=data

            // afficher les catégories
            console.log(categories);                     
          } )
};

//-----Création des bouttons dynamiquement pour les catégories
function createButtonCatg(){

    //recup le conteneur html avec la classe filters où les btn seront ajoutés
    let filters = document.querySelector('.filters')
  
    //btn tous 
    let btnTous = document.createElement("button");
    //ajout des attributs
    btnTous.textContent = "Tous";
    btnTous.setAttribute("name", "Tous");
    btnTous.setAttribute("type", "button");
    btnTous.classList.add("filters_btn");
    //ajout du boutton dans le conteneur filters
    filters.appendChild(btnTous);
    
    //btn categories
    //boucle pour ajouter les btn pour chaque catégorie
    for (let i=0; i<categories.length; i++){
  
        // creation du btn
        let btnCategorie = document.createElement("button")  
        //ajout des attributs
        btnCategorie.setAttribute("name",categories[i].name)
        btnCategorie.setAttribute("type","button")
        btnCategorie.classList += "filters_btn"
  
        //ajout le txt des noms dans les btn depuis le tab de catégories
        btnCategorie.textContent=categories[i].name
  
        //ajout du boutton dans le conteneur filters
        filters.appendChild(btnCategorie)
    }
  }
  

//-----Fonction initialisation
async function init() {
    await getWorks();
    await getCategories();
    createButtonCatg();
  };
  // appel pour l'initialisation
  init(); 
  
  
  
  