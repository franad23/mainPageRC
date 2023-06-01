let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser !== null) {
  window.location.href = "../mainPage.html";
}
console.log(currentUser);
//Codigo para tomar primeros datos de usuario del JSON
import users from "../JSON/users.json" assert {type:'json'};
window.loadDataLS = (users) => {
  localStorage.setItem('nusers', JSON.stringify(users));
}
if (localStorage.getItem('nusers') == null) {
  loadDataLS(users);
}

//Codigo para tomar los datos registrados
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const nusers = JSON.parse(localStorage.getItem('nusers')) || [];
    const validUsers = nusers.find(nuser => nuser.email === email )
    console.log(nusers.find(nuser => nuser.email === email ))
    if (nusers.find(nuser => nuser.email === email ) == undefined) {
      alert("Usuario no registrado, Registrate!")
    }
    else if (validUsers.password != password ) {
        alert('usuario y/o contraseña erroneos')
    }
    else if(validUsers.password == password && validUsers.acepted == true) {
      alert(`Bienvenido ${validUsers.name}`)
      localStorage.setItem('currentUser', JSON.stringify(validUsers))
      window.location.href = "../mainPage.html";
    }
    else if(validUsers.password == password && validUsers.acepted == false){
    alert('Usuario todavia no aceptado por un admin')
    }
})

// Codigo para crear un div y mostrarlo como alert
// function alertMessage (message){
//     let alertMessage = document.createElement('div');
//     alertMessage.classList.add('alert','alert-danger','mt-2','text-warning');
//     alertMessage.setAttribute('role','alert');
//     alertMessage.innertext =(message);
//     let container = document.querySelector('.form');
//     container.appendChild(alertMessage);
// }


//Codigo para enviar mails
// const btn = document.getElementById('button');

// document.getElementById('form')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

//    btn.value = 'Sending...';

//    const serviceID = 'default_service';
//    const templateID = 'template_snqk97j';

//    emailjs.sendForm(serviceID, templateID, this)
//     .then(() => {
//       btn.value = 'Send Email';
//       alert('¡Bienvenido! Revisen su mail');
//     }, (err) => {
//       btn.value = 'Send Email';
//       alert(JSON.stringify(err));
//     });
// });

