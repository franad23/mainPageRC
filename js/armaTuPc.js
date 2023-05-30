//-------Variables--------
import datos from "../JSON/datos.json" assert {type:'json'};
import options from "../JSON/optionsData.json" assert {type:'json'};
const $prodCont = document.querySelector('.prodCont')
const $priceCont = document.querySelector('.priceCont')
const $bottleNeckCalCont = document.querySelector('.bottleNeckCalCont')
const $opcCont = document.querySelector(".opcCont");
const $nextBtn = document.querySelectorAll('.nextBtn')
const $opcContOffCanvas = document.querySelector('.opcContOffCanvas')
const $admin = document.querySelector(".admin");
const $optNavBarDropDownUser = document.querySelectorAll('.optNavBarDropDownUser');
const $optNavBarDropDownToLogin = document.querySelector('.optNavBarDropDownToLogin');
let cart = {}; // al usarlo como objeto SOLO puedo colocar una sola relacion clave:valor (O sea no permite poner mas de un processasor)
let prodArr = datos;
let optionsArr = [];
let arrType = [];
let toBottleNeckCal = [];
let arrTypeSort = ["processor", "Motherboard", "RAM", "DISK", "graphicCard", "FAN", "POWER", "MONITOR", "PERIPHERALS"];
let currentProd = arrTypeSort[0];
let arrTypeTocheck = [];
const $logOut = document.getElementById('logOut');
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
//--------Carga los datos del JSON en un variable prodArr-------
window.loadDataLS = (prodArr) => {
    localStorage.setItem('datos', JSON.stringify(prodArr));
}
if (localStorage.getItem('datos') == null) {
    loadDataLS(prodArr);
}
const loadData = () => {
    prodArr = [];
    JSON.parse(localStorage.getItem('datos')).forEach(element => {
        prodArr.push(new CardProd (element.id, element.name, element.ranking, element.price, element.disc, element.discPer, element.img, element.descrip, element.tdp, element.fav, element.type))
    })
    optionsArr = [],
    options.forEach(element => {
        optionsArr.push(new Options (element.id, element.img))
    })
}
loadData();

//-----Para generar dinamicamente el calculo de Bottleneck en la parte lateral derecha

const bottleNeckCal = (cart, cont) => { // QUE SE EJECUTE SOLO ESTA OPCION SI ESTA LA GRAFICA SELECCIONADA
    $bottleNeckCalCont.innerHTML = ' ';
    let sortRank = cart.map(elem => elem.ranking).sort(function(a, b){return a - b});
    let relation = (sortRank[1]/sortRank[0]).toFixed(1)
    let card = document.createElement('div')
    card.innerHTML = `
    <h1 class="nameBottleNeck">Cuando ${cart.find(elem => elem.ranking == sortRank[0]).name} este al 100%</h1>
    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0"
    aria-valuemax="100">
    <div class="progress-bar text-bg-warning" style="width: 100%">100%</div>
    </div>
    <h1 class="nameBottleNeck">${cart.find(elem => elem.ranking == sortRank[1]).name} Estara al ${Math.round(100/relation)}%</h1>
    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0"
    aria-valuemax="100">
    <div class="progress-bar text-bg-warning" style="width: ${Math.round(100/relation)}%">${Math.round(100/relation)}%</div>
    </div>
    `
    cont.appendChild(card)
}
//-----------Pushea a arrType los types de los productos del JSON-----------
const typesOfProd = () => {
    prodArr.forEach(elem => {
        let tofind = elem.type;
        if (tofind == arrType.find(element => element == tofind)) {
            return
        }
        else {
            arrType.push(tofind);
    }
})};
typesOfProd();
//-------Carga las opciones el menu izquierdo desde el JSON---------
const loadOptions = () => {
    optionsArr.forEach(elem => {
        elem.createOptions($opcCont);
        elem.createOptionsOffcanvas($opcContOffCanvas);
    })
}
loadOptions();
//--------Carga las tarjetas de productos desde el prodArr--------
const loadCards = (typ) => {
    let toGenerate = prodArr.filter(elem => elem.type == typ)
    $prodCont.innerHTML = '';
    toGenerate.forEach(elem => {
        elem.createCard($prodCont);
    });
}
loadCards(currentProd);
//-----------Carga las tarjetas segun lo que se selecciono en las opciones del menu de la derecha--------
window.selType = (id) => {
    let arrToSearch = prodArr.filter(elem => elem.type == id)
    $prodCont.innerHTML = '';
    arrToSearch.forEach(elem => {
        elem.createCard($prodCont);
    })
}
//-----------Agrega al carrito-----------
window.addCart = function(id) {
    let toCart = prodArr.find(elem => elem.id == id) //ACA VER PORQUE CON FIND SI ME TOMA Y CON FILTER NO
    let $spanId = document.getElementById(toCart.type).lastElementChild;
    let $spanIdOffcanvas = document.getElementById(`${toCart.type}offCanvas`).lastElementChild;
    let price = 0;
    let ram$disk = [];
    let howCurrentProd;
    cart[toCart.type] = [toCart.name, toCart.disc ? toCart.price * (100-toCart.discPer)/100: toCart.price, toCart.ranking];
    if (Object.keys(cart).length >= 5 && cart.graphicCard[2] !== 0) {
        toBottleNeckCal = [{"name": cart.processor[0], "ranking": cart.processor[2]}, {"name": cart.graphicCard[0], "ranking": cart.graphicCard[2]}];
        bottleNeckCal(toBottleNeckCal, $bottleNeckCalCont);
    }
    for (let priceProd in cart) {
        price += cart[priceProd][1];
        $priceCont.innerHTML = `$${price}ARS`;
        $spanId.innerHTML = `${toCart.name}`;
        $spanIdOffcanvas.innerHTML = `${toCart.name}`;

    }
    if (!arrTypeTocheck.some(elem => elem == toCart.type) || arrTypeTocheck.length == 0) {
        arrTypeTocheck.push(arrTypeSort.splice(0,1).toString())
        currentProd = arrTypeSort[0]
    }
    else {
        currentProd == currentProd;
    }
    //INVESTIGAR BIEN COMO HACE PARA QUE EL USUARIO PUEDA SELECCIONAR ENTRE 1 O 2 RAM O DISK 
    loadCards(currentProd);
    console.log(currentProd);
    console.log(cart);
}
//----------Si el cliente NO quiere esa opciones se pasa a la siguiente------------
$nextBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        cart[currentProd] = ["No quiere nada de esta seccion", 0, 0];
        arrTypeTocheck.push(arrTypeSort.splice(0,1).toString())
        currentProd = arrTypeSort[0]
        loadCards(currentProd);
    });
})

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



// $nextBtn.addEventListener('click', function () {
//     cart[currentProd] = ["No quiere nada de esta seccion", 0, 0];
//     arrTypeTocheck.push(arrTypeSort.splice(0,1).toString())
//     currentProd = arrTypeSort[0]
//     loadCards(currentProd);
// });
