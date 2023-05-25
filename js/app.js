import datos from "../datos.json" assert { type: "json"};
let arrDB = datos;
console.log(datos);
const $lastNewsCardsCont = document.querySelector('.lastNewsCardsCont');
const $offCanvasFavCont = document.querySelector('.offCanvasFavCont');
const $admin = document.querySelector(".admin");
const $optNavBarDropDownUser = document.querySelectorAll('.optNavBarDropDownUser');
const $optNavBarDropDownToLogin = document.querySelector('.optNavBarDropDownToLogin');
let currentUser = {admin:false}; //PRUEBA PARA USUARIO
// let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//-----------Carga de datos LS--------------
window.loadDataLS = (arrDB) => {
    localStorage.setItem('datos', JSON.stringify(arrDB));
}
if (localStorage.getItem('datos') == null) {
    loadDataLS(arrDB);
}
//-------------Pusheo el array ArrDB para trabajar desde ahi-----------
window.loadDataDB = () => {
    arrDB = [];
    JSON.parse(localStorage.getItem('datos')).forEach(element => {
        arrDB.push(new CardProd (element.id, 
            element.name, 
            element.ranking, 
            element.price, 
            element.disc, 
            element.discPer, 
            element.img, 
            element.descrip, 
            element.tdp, 
            element.fav,
            element.type, 
            element.stock))
    })
}
loadDataDB()
console.log(arrDB);
// --------Favoritos------------
window.fav = function(id) {
    let index = arrDB.findIndex((item) => item.id == id);
    console.log(index);
    if (arrDB[index].fav == true) {
        arrDB[index].fav = false;
        console.log(arrDB[index].fav); 
        loadDataLS(arrDB)
        loadDataDB()
        loadFav();
        lastNews();
    } else {
        arrDB[index].fav = true;
        console.log(arrDB[index].fav); 
        loadDataLS(arrDB)
        loadDataDB()
        loadFav();
        lastNews();
    }
};
window.loadFav = () => {
    let favSelec = arrDB.filter(elem => elem.fav == true);
    console.log(favSelec);
    $offCanvasFavCont.innerHTML = '';
    console.log(favSelec);
    favSelec.forEach(elem => {
        elem.createFavCard($offCanvasFavCont);
    })
}
window.modalFav = () => {
    loadFav();
}
window.deleteFav = (id) => {
    let index = arrDB.findIndex((item) => item.id == id);
    console.log(arrDB[index].fav); 
    loadDataLS(arrDB)
    loadDataDB()
    fav(id);
    loadFav();
}
// --------Carga de Ultimas novedades------------

window.lastNews = () => {
    let lastNews = arrDB.slice((arrDB.length)-5);
    $lastNewsCardsCont.innerHTML = "";
    console.log(lastNews);
    lastNews.forEach(elem => {
        elem.createCard($lastNewsCardsCont);
    })
}
lastNews();
console.log(currentUser);
//---------Carga Boton Admin -------------
if (currentUser == null) {
    $optNavBarDropDownUser.forEach(elem => {
        elem.setAttribute("style", "display: none");
    })
    $optNavBarDropDownToLogin.setAttribute("style", "display: block");
}else {
    $optNavBarDropDownToLogin.setAttribute("style", "display: none");
    if (currentUser.admin) {
        $admin.setAttribute("style", "display: block");
    }

}