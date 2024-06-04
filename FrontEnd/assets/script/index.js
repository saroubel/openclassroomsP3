
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

//-----Fonction initialisation
async function init() {
    await getWorks();
    await getCategories();
  };
  // appel pour l'initialisation
  init(); 
  
  
  
  