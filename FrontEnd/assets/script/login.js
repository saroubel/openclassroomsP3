// Vérification du mail
function checkEmail() {

    // récup valeur email avec id (email-bar) et la stocke dans la variable "email"
    let email = document.getElementById("email-bar").value
    
    // Regex pour valider le format d'une adresse e-mail 
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // au moins un caractère @ et un caractère 
    
    if (!regex.test(email)) {
        alert("Please enter a valid email address")
        // alert("Veuillez entrer une adresse e-mail valide")

    }
}




// Vérification du mot de passe
function checkPassword() {

    // récup valeur passwords avec id (password-bar) et la stocke dans la variable "password"
    let password = document.getElementById("password-bar").value

    // Regex pour un mot de passe valide
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/
        // au moins un chiffre, minuscule, majuscule, 
        // au moins un caractère alphanumérique, longueur au moins 4 caractères et $ fin de la chaine

    if (!regex.test(password)) {
        alert("Please enter a valid password")
        // alert("Veuillez entrer un mot de passe valide")
    }
}


