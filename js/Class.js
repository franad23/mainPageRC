class CardProd {
    constructor(id, name, ranking, price, disc, discPer, img, descrip, tpd, fav, type, stock) {
        this.id = id;
        this.name = name;
        this.ranking = ranking;
        this.price = price;
        this.disc = disc;
        this.discPer = discPer;
        this.img = img;
        this.descrip = descrip;
        this.tpd = tpd;
        this.fav = fav;
        this.type = type;
        this.stock = stock
    }
    createCard(cont){
        let card = document.createElement('div');
        card.classList.add('cardProdCont')
        card.innerHTML = `
            <div class="imgCardContLN">
                <img class="imgCard" src="${this.img}" alt="">
                ${this.fav ?  `<i class="bi bi-heart-fill iconCards" onclick="window.fav(${this.id})"></i>`: `<i class="bi bi-heart iconCards" onclick="window.fav(${this.id})"></i>`}
            </div>
            <div class="priceCardContName">
                <h1>${this.name}</h1>
                <div class="priceCardCont">
                    ${this.disc ? `<span class="disc badge text-bg-success"> -${this.discPer}%</span>
                    <del class="PrevPriceCard">$${this.price}ARS</del>
                    <span>$${Math.floor((this.price * (100-this.discPer))/100)}ARS</span>`: `<span>$${this.price}ARS</span>`}
                    
                </div>
            </div>
        `
        cont.appendChild(card)
    }
    createFavCard(cont) {
        let card = document.createElement('div');
        card.classList.add('cardFavCont');
        card.innerHTML = `
            <img class="imgFav" src="${this.img}" alt="">
            <button type="button" class="btn btn-secondary btnDeleteFav" onclick="deleteFav(${this.id})">Eliminar Fav</button>
            <div class="priceNameContFav">
                <h1>${this.name}</h1>
                <div class="priceContFav">
                    ${this.disc ? `<span class="disc badge text-bg-success"> -${this.discPer}%</span>
                    <del class="PrevPrice">$${this.price}ARS</del>
                    <span>$${Math.floor((this.price * (100-this.discPer))/100)}ARS</span>`: `<span>$${this.price}ARS</span>`}
                </div>
            </div>
        `
        cont.appendChild(card)
    }
}