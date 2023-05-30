const $btnOffCanvasCont = document.querySelector('.btnOffCanvasCont');
const $offcanvasCont = document.querySelector('.offcanvasCont');
const $badgeCont = document.querySelector('.badgeCont');
let usersNotAccep;
let users = [];

const loadUsers = () => {
    // Obtener los usuarios desde el almacenamiento local
    users = JSON.parse(localStorage.getItem('nusers')) || [];
    // usersArr = [...users];
    usersNotAccep = users.filter(elem => !elem.acepted);
    $badgeCont.textContent = usersNotAccep.length.toString();
    updateOffcanvasContent(usersNotAccep);
    console.log(users);
};

const saveUsers = (users) => {
    localStorage.setItem('nusers', JSON.stringify(users));
}
const updateOffcanvasContent = (usersNotAccep) => {
    $offcanvasCont.innerHTML = "";
    usersNotAccep.forEach(elem => {
        let card = document.createElement('div');
        card.classList.add('cardProd');
        card.setAttribute("onclick", `confirmUser("${elem.email}")`);
        card.innerHTML = `
        <div class="nameCont">
        <h1>${elem.name}</h1>
        </div>
    `;
        $offcanvasCont.appendChild(card);
    });
};

$btnOffCanvasCont.addEventListener('click', function () {
    const usersNotAccep = users.filter(elem => !elem.acepted);
    updateOffcanvasContent(usersNotAccep);

    const offcanvasElement = document.getElementById("offcanvasRight");
    offcanvasElement.addEventListener('hidden.bs.offcanvas', function () {
        const body = document.querySelector('body');
        body.classList.remove('offcanvas-open');
    });
});

window.confirmUser = (email) => {
    let userToModif = users.find(elem => elem.email == email);
    let userIsAccepted = confirm(`¿Aceptar al usuario ${userToModif.name} como cliente?`);
    
    if (!userIsAccepted) {
        let index = users.findIndex(user => user.email == email);
        users.splice(index, 1);
        console.log(users);
        saveUsers(users)
    } else {
        let adminIsAccepted = confirm(`¿Agregar al usuario ${userToModif.name} como administrador?`);
        users.find(elem => elem.email == email).acepted = userIsAccepted;
        users.find(elem => elem.email == email).admin = adminIsAccepted;
        console.log(users);
        saveUsers(users)
        loadUsers(); // Volver a cargar los usuarios y actualizar el contenido del offcanvas
    }

};

loadUsers();
