import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

// Creando un array con los items a mostrar (luego, se va a implementar una base de datos local para que el array se llene con los objetos de esa bd)

const listaItems = [
    new TrStrongBoxElement("https://google.com", "strjak", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://facebook.com", "almeds", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://youtube.com", "rifac", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://instagram.com", "usuario22", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("http://twitter.com", "trec21", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://github.com", "findinguser", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://w3schools.com", "strjakHK", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("http://mozilla.org", "juan", "skai!s00A1-?!ssgj2", "elemento de pruebas"),
    new TrStrongBoxElement("https://regex101.com", "strack", "skai!s00A1-?!ssgj2", "elemento de pruebas")
]

// Mostrar todos los elementos

const mostrarElementos = (listaItems) =>{
    if(listaItems.length > 0){
        for(let i = 0; i < listaItems.length; i++){
            console.log(`Elemento ${i + 1}\nURL: ${listaItems[i].url.dominio}\nDESCRIPCION: ${listaItems[i].descripcion}`)
        }
    }else{
        noHayElementos()
    }
}

function noHayElementos(){
    console.log("No hay elementos que mostrar")
}

mostrarElementos(listaItems)

// Boton para añadir elementos en la caja fuerte

const agregarElemento = () =>{

    // con esta funcion se va a agregar el elemento directamente en la base de datos, no en el array

    const elemento = {
        url : prompt("Url (se debe ingresar la url con protocolo http o https)"),
        usuario : prompt("Usuario"),
        pass : prompt("Contraseña"),
        descripcion : prompt("Descripcion")
    }

    const newItem = new TrStrongBoxElement(elemento.url, elemento.usuario, elemento.pass, elemento.descripcion)    
    listaItems.push(newItem)

    mostrarElementos(listaItems)
}

agregarElemento()

// Buscar un elemento por url o dominio

const buscarElemento = () =>{
    const buscar = prompt("Ingrese elemento a buscar")
    const resultado = listaItems.filter((elemento) =>{
        return elemento.url.valor.match(buscar) || elemento.usuario.match(buscar)
    })
    return resultado
}

mostrarElementos(buscarElemento())


