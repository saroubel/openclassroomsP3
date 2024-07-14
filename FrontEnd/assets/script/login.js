//------Vérification du mail
function checkEmail() {
    // récup valeur email
    const email = this.value
    // valider le format mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!regex.test(email)) {
        alert("Please enter a valid email address")
    }
}




//------Vérification du mot de passe
function checkPassword() {
    // récup valeur passwords
    const password = this.value    
    // valider format pswrd 
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/   
    
    if (!regex.test(password)) {
        alert("Please enter a valid password")
    }
}




//------initialiser les validations
function initialiseValidation() {
    const emailInput = document.getElementById("email-bar")
    const passwordInput = document.getElementById("password-bar")

    emailInput.addEventListener('change', checkEmail)
    passwordInput.addEventListener('change', checkPassword)
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
                    // Vérifier si le message d'erreur existe déjà
                    const existingErrorMsg = form.querySelector('.error-msg');
                    if (!existingErrorMsg) {
                        // Créer un nouveau message d'erreur si aucun n'existe
                        const errorMsg = document.createElement('div'); 
                        errorMsg.classList.add('error-msg');            // Ajout classe 'error-message'
                        errorMsg.textContent = "Please check your email and password";
                        form.appendChild(errorMsg); 
                
                        //css pour le message d'erreur
                        errorMsg.style.cssText = 'color: red; font-size: 16px; align-self: center; margin-bottom: 10px;';
                    }
                }
        })
    })
}




// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    initialiseValidation()
    login()
})





