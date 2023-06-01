//Codigo para tomar primeros datos de usuario del JSON
import users from "../JSON/users.json" assert {type:'json'};
window.loadDataLS = (users) => {
    localStorage.setItem('nusers', JSON.stringify(users));
}
if (localStorage.getItem('nusers') == null) {
    loadDataLS(users);
}

const formsignin = document.querySelector('#formsignin')
formsignin.addEventListener('submit', (e) => {
    e.preventDefault()
    const namelogin = document.querySelector('#namelogin').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const passwordValid = document.querySelector('#passwordValid').value

    const nusers = JSON.parse(localStorage.getItem('nusers')) || [];
    const userRegistrated = nusers.find(nusers => nusers.email === email)

    if (userRegistrated) {
        return alert('Usuario ya registrado, ingrese con su cuenta')
    }else if (password !== passwordValid) {
        alert ("Contraseñas No coinciden intente de nuevo por favor")
    }else if (requirements.some(elem => elem.regex.test(password) == false)) {
        alert ("Contraseña no cumple requisitos minimos")
    }else {
        nusers.push({ name: namelogin, email: email, password: password, acepted: false, admin: false })
        localStorage.setItem('nusers', JSON.stringify(nusers))
        alert('Su usuario ha sido guardado correctamente. Recuerde que un admin tiene que aceptar su usuario!')
        formsignin.reset();
    }
    //variable que se pone en el ultimo valor del id y luego agrega un nuevo id. deberia ir donde pido los datos del form?
})

//Codigo para los requisitos de la contraseña
const passwordInput = document.querySelector(".pass-field input")
const eyeIcon = document.querySelector(".pass-field i")
const requirementList = document.querySelectorAll(".requirement-list li")

const requirements = [
    { regex: /.{8,}/, index: 0 }, //minimo 8 caracteres
    { regex: /[0-9]/, index: 1 }, //minimo 1 numero
    { regex: /[a-z]/, index: 2 }, //minimo 1 minuscula
    { regex: /[^A-Za-z0-9]/, index: 3 }, //minimo 1 caracter especial
    { regex: /[A-Z]/, index: 4 } //minimo 1 mayusculas
]
passwordInput.addEventListener("input", (e) => {
    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];
        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    })
})
