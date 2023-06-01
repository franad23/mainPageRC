import datos from "../JSON/datos.json" assert { type: "json"};
let arrDB = datos;
const $lastNewsCardsCont = document.querySelector('.lastNewsCardsCont');
const $offCanvasFavCont = document.querySelector('.offCanvasFavCont');
const $admin = document.querySelector(".admin");
const $optNavBarDropDownUser = document.querySelectorAll('.optNavBarDropDownUser');
const $optNavBarDropDownToLogin = document.querySelector('.optNavBarDropDownToLogin');
const $logOut = document.getElementById('logOut');
const $offCanvasCart = document.querySelector('.offCanvasCart')
const $totalCart = document.getElementById('totalCart');
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
// let cartArr = JSON.parse(localStorage.getItem('Cart'));
let cartArr = [];
let prodToCart = [];
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
        elem.createCardProducts($lastNewsCardsCont);
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
//--------Cerrar sesion -------
$logOut.addEventListener('click', () => {
    localStorage.setItem('currentUser', JSON.stringify(null))
})
// ----------Carrito----------

window.addCart = function(id) {
    prodToCart = arrDB.find((item) => item.id == id);
    cartArr.push(prodToCart)
    localStorage.setItem("Cart", JSON.stringify(cartArr))
    loadCart()
    console.log(cartArr);
};
window.loadCart = () => {
    let totalPrice = 0;
    $offCanvasCart.innerHTML = "";
    cartArr.forEach(elem => {
        let card = document.createElement('div');
        card.classList.add('cardFavCont');
        card.innerHTML = `
            <img class="imgFav" src="${elem.img}" alt="">
            <button type="button" class="btn btn-secondary btnDeleteFav" onclick="deleteCart(${elem.id})">Eliminar</button>
            <div class="priceNameContFav">
                <h1>${elem.name}</h1>
                <div class="priceContFav">
                    ${elem.disc ? `<span class="disc badge text-bg-success"> -${elem.discPer}%</span>
                    <del class="PrevPrice">$${elem.price}ARS</del>
                    <span>$${Math.floor((elem.price * (100-elem.discPer))/100)}ARS</span>`: `<span>$${elem.price}ARS</span>`}
                </div>
            </div>
        `
        $offCanvasCart.appendChild(card)
        totalPrice += elem.disc ? Math.floor((elem.price * (100-elem.discPer))/100) : elem.price;
        $totalCart.innerHTML = totalPrice;
    });
    if (JSON.parse(localStorage.getItem('Cart')).length == 0) {
        $totalCart.innerHTML = 0;
    }

}

window.deleteCart = (id) => {
    let index = cartArr.findIndex((item) => item.id == id);
    console.log(index);
    cartArr.splice(index, 1);
    console.log(cartArr);
    localStorage.setItem("Cart", JSON.stringify(cartArr))
    loadCart()
}
window.modalCart = () => {
    loadCart()
}

//---------Redireccion a otra pagina -----------

window.prodSelected = (id) => {
    localStorage.setItem("prodSelect", JSON.stringify(arrDB.find((item) => item.id == id)))
    window.location.href = "../paginadeProducto.html";
}

window.to404 = () => {
    window.location.href = "../404.html";
}