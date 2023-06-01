$prodCont = document.querySelector('.prodCont');
let prod = JSON.parse(localStorage.getItem("prodSelect"))
function createCard(cont, prod){
    let card = document.createElement('div');
    card.classList.add('cardProdCont');
    card.setAttribute("onclick", `addCart(${prod.id})`)
    card.innerHTML = `
        <div class="imgCardContLN">
            <img class="imgCard" src="${prod.img}" alt="">
        </div>
        <div class="priceCardContName">
            <h2>${prod.name}</h2>
            <div class="priceCardCont">
                ${prod.disc ? `<span class="disc badge text-bg-success"> -${prod.discPer}%</span>
                <del class="PrevPriceCard">$${prod.price}ARS</del>
                <span>$${Math.floor((prod.price * (100-prod.discPer))/100)}ARS</span>`: `<span>$${prod.price}ARS</span>`}
                <div class="iconContCard">
                    <div>
                    <i class="bi bi-shield-lock"></i> Garantía - 12 meses
                    </div>
                    <div>
                    <i class="bi bi-truck"></i> Envíos a todo el país.
                    </div>
                    <div>
                    <i class="bi bi-check2"></i> Stock Disponible
                    </div>
                    <div>
                    <button class="btnComprar" onclick="to404()">Comprar</button>
                    <button class="btnComprar" onclick="to404()">Agregar Favoritos</button>
                    </div>
                </div>
            </div>
        </div>
    `
    cont.appendChild(card)
}

createCard($prodCont, prod)


window.to404 = () => {
    window.location.href = "../404.html";
}

