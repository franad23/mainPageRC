import datos from "../JSON/datos.json" assert {type:'json'};
// import { CardProd } from "./Class";
const $cardsCont = document.querySelector('.cardsCont');
const $offCanvasFavCont = document.querySelector('.offCanvasFavCont') 
const $inputSearch = document.getElementById('inputSearch')
const $admin = document.querySelector(".admin");
const $optNavBarDropDownUser = document.querySelectorAll('.optNavBarDropDownUser');
const $optNavBarDropDownToLogin = document.querySelector('.optNavBarDropDownToLogin');
const $logOut = document.getElementById('logOut');
const $offCanvasCart = document.querySelector('.offCanvasCart')
const $totalCart = document.getElementById('totalCart');
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let prodArr = datos;
// let cartArr = JSON.parse(localStorage.getItem('Cart'));
let cartArr = [];
let prodToCart = [];

//-----------Carga de datos LS--------------
window.loadDataLS = (prodArr) => {
    localStorage.setItem('datos', JSON.stringify(prodArr));
}
if (localStorage.getItem('datos') == null) {
    loadDataLS(prodArr);
}

window.loadDataCartLS = (cartArr) => {
    localStorage.setItem('Cart', JSON.stringify(cartArr));
}
if (localStorage.getItem('Cart') == null) {
    loadDataCartLS(cartArr);
}
//--------Select para obtener filtrados----------
const $select = document.getElementById('select');
$select.addEventListener("change", () => {
    console.log($select.value);
    let arrToSearch = prodArr.filter(elem => elem.type == $select.value)
    $cardsCont.innerHTML = '';
    if ($select.value == "TODO") {
        loadCards();
    }
    arrToSearch.forEach(elem => {
        elem.createCard($cardsCont);
    })
})


//-----------Carga de datos en el array a trabajar-------------
const loadDataDB = () => {
    prodArr = [];
    JSON.parse(localStorage.getItem('datos')).forEach(element => {
        prodArr.push(new CardProd(element.id, 
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
loadDataDB();

//----------Carga de tarjetas de productos-----------
console.log(prodArr);
window.loadCards = () => {
    $cardsCont.innerHTML = '';
    prodArr.forEach(elem => {
        elem.createCardProducts($cardsCont);
    });
}
loadCards();

//-----------Carga de favoritos---------------

const loadFav = () => {
    let favSelec = prodArr.filter(elem => elem.fav == true);
    $offCanvasFavCont.innerHTML = '';
    console.log(favSelec);
    favSelec.forEach(elem => {
        elem.createFavCard($offCanvasFavCont)
    })
}

window.fav = function(id) {
    let index = prodArr.findIndex((item) => item.id == id);
    console.log(index);
    if (prodArr[index].fav == true) {
        prodArr[index].fav = false;
        console.log(prodArr[index].fav); 
        loadDataLS(prodArr)
        loadDataDB()
        loadFav();
        loadCards();
    } else {
        prodArr[index].fav = true;
        console.log(prodArr[index].fav); 
        loadDataLS(prodArr)
        loadDataDB()
        loadFav();
        loadCards();
    }
};
window.modalFav = (event) => {
    loadFav();
}

window.deleteFav = (id) => {
    let index = prodArr.findIndex((item) => item.id == id);
    console.log(prodArr[index].fav); 
    loadDataLS(prodArr)
    loadDataDB()
    fav(id);
    loadFav();
}

//-----------Input de busqueda-------------
$inputSearch.addEventListener("input", () => {
    let toSearch = $inputSearch.value;
    let toSearchregex = new RegExp(`${toSearch}`,"gi") ;
    let arrToSearch = prodArr.filter(element => element.name.match(toSearchregex))
    $cardsCont.innerHTML = '';
    arrToSearch.forEach(elem => {
        elem.createCard($cardsCont)
    })
    console.log(toSearch);
    console.log(arrToSearch);
    if (arrToSearch.length == 0) {
        let notFind = document.createElement('h1')
        notFind.innerHTML = `Tu busqueda "${toSearch}" no coincide con nuestros productos`
        $cardsCont.appendChild(notFind);
    }
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
// ----------Carrito----------
// loadCart()
window.addCart = function(id) {
    prodToCart = prodArr.find((item) => item.id == id);
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
    localStorage.setItem("prodSelect", JSON.stringify(prodArr.find((item) => item.id == id)))
    window.location.href = "../paginadeProducto.html";
}

window.to404 = () => {
    window.location.href = "../404.html";
}