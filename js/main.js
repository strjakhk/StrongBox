import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

// Creando un array con los items a mostrar (luego, se va a implementar una base de datos local para que el array se llene con los objetos de esa bd)

const listaItems = [
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("http://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("http://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas")
]

const mostrarElementos = (listaItems) =>{
    if(listaItems.length > 0){
        const table = document.getElementById('strongbox-items')
        for(let i = 0; i < listaItems.length; i++){
            table.appendChild(listaItems[i].htmlTableRowElement)
        }
    }else{
        noHayElementos()
    }
}

function noHayElementos(){
    console.log("No hay elementos que mostrar")
}

mostrarElementos(lista)

// Boton para añadir elementos en la caja fuerte

const elemento = {
    // objeto con los datos que el usuario ingresa en el formulario para añadir un elemento
}

const agregarElemento = (elemento) =>{

    // con esta funcion se va a agregar el elemento directamente en la base de datos, no en el array

    if(elemento){
        console.log("Elemento añadido a la base de datos")
    }else{
        console.log("No se pudo agregar el elemento")
    }
}