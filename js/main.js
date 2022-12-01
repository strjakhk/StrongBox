import { TrStrongBoxElement } from "./TrStrongBoxElement.js"


// Mostrar lista de elementos

const lista = ["ele1", "ele2", "ele3"]
const contadorDeElementos = lista.length // En la interfaz, siempre se va a mostrar la cantidad de elementos en la caja fuerte

const mostrarElementos = (lista) =>{
    if(lista.length > 0){
        for(let i = 0; i < lista.length; i++){
            agregarItem(lista[i], i)
        }
    }else{
        noHayElementos()
    }    
}

function noHayElementos(){
    console.log("No hay elementos que mostrar")
}

function agregarItem(elemento, i){
    console.log(`Elemento número ${i + 1} = ${elemento}`)
}

mostrarElementos(lista)

// Boton para añadir elementos en la caja fuerte

const elemento = "Un elemento agregado por el usuario"

const agregarElemento = (elemento) =>{

    if(elemento){
        console.log("Elemento añadido a la base de datos")
    }else{
        console.log("No se pudo agregar el elemento")
    }
}

// Se llama a la función cuando el usuario hace click en el botón de "Añadir elemento"

agregarElemento(elemento)


// creando lista de items


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

const table = document.getElementById('strongbox-items')

for(let i = 0; i < listaItems.length; i++){
    table.appendChild(listaItems[i].htmlTableRowElement)
}