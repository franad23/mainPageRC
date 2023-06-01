let datos=[];

const cuerpoTabla = document.querySelector('#productTable');
const myModal = new bootstrap.Modal(document.getElementById('productModal'),);
const $findProduct= document.getElementById("findProduct");
let idProductUpdate = null;

window.showModal = (id) => {
    idProductUpdate = id;
    let index = datos.findIndex((item) => item.id == idProductUpdate);
    document.querySelector("#nameModal").value = datos[index].name;
    document.querySelector("#typeModal").value = datos[index].type;
    document.querySelector("#discPerModal").value = datos[index].discPer;
    document.querySelector("#priceModal").value = datos[index].price;
    document.querySelector("#stockModal").value = datos[index].stock;
    myModal.show();
}

const productUpdate = (event) => {
    event.preventDefault();
    let index = datos.findIndex((item) => item.id == idProductUpdate);
    datos[index].name = document.querySelector("#nameModal").value;
    datos[index].type = document.querySelector("#typeModal").value;
    datos[index].discPer = parseInt(document.querySelector("#discPerModal").value);
    datos[index].price = parseInt(document.querySelector("#priceModal").value);
    datos[index].stock =parseInt(document.querySelector("#stockModal").value);
    datos[index].disc = datos[index].discPer > 0 ? true : false;
    cargarTabla();
    savedJSON();
    myModal.hide();
}

//carga la tabla desde el local storage, en caso de no haber lo carga desde el archivo json

const cargarTabla = () => {
    cuerpoTabla.innerHTML = '';
    
    const toFind= document.querySelector("#findProduct").value.toLowerCase();
    const filtredProducts = datos.filter(item => item.name.toLowerCase().includes(toFind) || item.type.toLowerCase().includes(toFind))
    
    if(filtredProducts==0){
        document.querySelector('#noResultsMessage').style.display = 'inline';
    } else {
    document.querySelector('#noResultsMessage').style.display = 'none';
    filtredProducts.map((item) => {
    
        const fila = document.createElement('tr');
        const celdas = `
        <td >${item.id}</td>
        <td>${item.name}</td>
        <td>${item.type}</td>
        <td>${item.price}</td>
        <td>${item.discPer}</td>
        <td>${item.stock}</td>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="showModal(${item.id})"><i class="fa-regular fa-pen-to-square"></i></button>
        <button class="btn btn-outline-danger" onclick="deleteProduct(${item.id})"><i class="fa-solid fa-square-xmark"></i></i></button>
        
        
        
        </div>
        `

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);

        })
    }
}
// Agrega un nuevo producto a la tabla y lo guarda dentro del local storage
const addProduct = (event) => {
    event.preventDefault();

    let id = datos.at(-1).id + 1

    let product = document.querySelector("#name").value;
    let type = document.querySelector("#type").value;
    let discPer = document.querySelector("#discPer").value;
    let price = document.querySelector("#price").value;
    let stock = document.querySelector("#stock").value;
    let img = document.querySelector("#imageUrl").value;
    let disc = false;
    let ranking = 0;
    let descrip = "";
    let tdp = 0;
    let fav = false;

    if (discPer > 0) {
        disc = true;
    }

    datos.push(new CardProd(id, product, ranking, price, disc, discPer, img, descrip, tdp, fav, type, stock));
    
    document.querySelector('#formProduct').reset();
    savedJSON();
    cargarTabla();
};
//Eliminia el producto de la tabla
window.deleteProduct = (id) => {
    let index = datos.findIndex((item) => item.id == id);
    let validar = confirm(`¿Esta seguro que quiere eliminar el producto ${datos[index].name}?`);
    if (validar) {
        datos.splice(index, 1);
        savedJSON();
        cargarTabla();
    }
}

cargarTabla();

document.querySelector('#formProduct').addEventListener('submit', addProduct);
document.querySelector('#formModal').addEventListener('submit', productUpdate);
document.querySelector('#findProduct').addEventListener('input', () => {
    cargarTabla();
  });
//Guarda los datos en local storage
const savedJSON = ()=>{
    const datosGuardados = JSON.stringify(datos);
    localStorage.setItem('datos', datosGuardados);
}

//Obtenemos los datos del local storage
const  getJSON=()=>{
    
    let datosGuardados=localStorage.getItem('datos');

    if (datosGuardados){
        datos = JSON.parse(datosGuardados);
        cargarTabla();
    }else{
        const url = '../JSON/datos.json';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function (){
            if (xhr.status === 200) {
                datos = JSON.parse(xhr.responseText);
                savedJSON();
                cargarTabla();
            } else {
                console.error('Error al cargar los datos:', xhr.status);
            }
        };
        xhr.send();
    }
    cargarTabla();
} ;
getJSON();
