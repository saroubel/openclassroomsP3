//------Vérification du mail
function checkEmail() {

    // récup valeur email avec id (email-bar) et la stocke dans la variable "email"
    const email = document.getElementById("email-bar").value
    
    // Regex pour valider le format d'une adresse e-mail 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // au moins un caractère @ et un caractère 
    
    if (!regex.test(email)) {
        alert("Please enter a valid email address")
    }
}




//------Vérification du mot de passe
function checkPassword() {

    // récup valeur passwords avec id (password-bar) et la stocke dans la variable "password"
    const password = document.getElementById("password-bar").value

    // Regex pour un mot de passe valide
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/
        // au moins un chiffre, minuscule, majuscule, 
        // au moins un caractère alphanumérique, longueur au moins 4 caractères et $ fin de la chaine

    if (!regex.test(password)) {
        alert("Please enter a valid password")
    }
}






//------Bouton se connecter
//------Récupération API de login et sauvegarde du Token et puis rediriger vers Index

function login() {

    //récup form login
    const form = document.querySelector('.login') 

    // ajout event pour btn se connecter
    form.addEventListener('submit', (event) => {

        //pour ne pas rafraichir la page
        event.preventDefault()

        //récup valeur saisies dans email et password
        const email = document.getElementById("email-bar").value
        const password = document.getElementById("password-bar").value

        // appel de l'API de login
        fetch('http://localhost:5678/api/users/login', {
            // envoi des infos en format JSON     
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({email,password})  //convertir les données JS en JSON pour l'envoi au serveur via l'API
        })

        .then(response => response.json())

        .then(data => {
            // si Tout est Ok,token renvoyé par l'API passera sur index
            if (data.token) {
                localStorage.setItem('token', data.token)           // sauvegarde du token dans le localStorage
                window.location.href = "index.html#portfolio"       // redirection vers index projets 

            } else {
                // alert("Please check your email and password ")    
                // Afficher un message d'erreur
                const errorDisplay = document.createElement('div'); 
                errorDisplay.classList.add('error-msg');        // Ajout classe 'error-message'
                errorDisplay.textContent = "Please check your email and password";
                form.appendChild(errorDisplay); 
                //css pour le message d'erreur
                errorDisplay.style.cssText = 'color: red; font-size: 16px; align-self: center; margin-bottom: 10px;';
            }
        })
    })
}


// appel de la fonction pour se connecter
login()





