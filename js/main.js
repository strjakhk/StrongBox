import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

//////////////// SHOW ITEMS ////////////////

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
        showNoElementsMessage(table)
    }
}

function showNoElementsMessage(table){
    table.innerHTML = `
    <div>
        <h1>No hay elementos que mostrar</h1>
    </div>
    `
}

function generateListenersOnNormalItem(item){
    const buttons  = [...item.htmlTableRowElement.getElementsByTagName("button")]

    // TRASH
    buttons[0].onclick = () =>{
        !item.inTrash ? item.inTrash = true : item.inTrash = false
        updateStorage(item)
    }
    
    // FAVORITES
    buttons[1].onclick = () =>{
        !item.inFav ? item.inFav = true : item.inFav = false
        updateStorage(item)
    }

    // COPY PASS TO CLIPBOARD
    buttons[2].onclick = () =>{
        navigator.clipboard.writeText(item.pass.value)
    }
}

function generateListenersOnItemInTrash(item){
    const buttons  = [...item.htmlTableRowElement.getElementsByTagName("button")]
    buttons[0].onclick = () =>{
        item.inTrash = false
        updateStorage(item)
        showItems(filterInTrashItems())
    }
}

function filterInTrashItems(){
    const itemsFound = readStorage().filter(item => item.inTrash)
    return itemsFound
}

function filterShowableItems(){
    const itemsFound = readStorage().filter(item => !item.inTrash)
    return itemsFound
}

function readStorage(){
    const items = []
    for(let i = 0; i < localStorage.length; i++){
        const itemKey = localStorage.key(i)
        const itemFromStorage = JSON.parse(localStorage.getItem(itemKey))
        items.push(new TrStrongBoxElement(
            itemFromStorage.url,
            itemFromStorage.user,
            itemFromStorage.pass,
            itemFromStorage.des,
            itemFromStorage.fav,
            itemFromStorage.trash
        ))        
    }
    return items
}

//////////////// ADD ITEM TO STORAGE OR UPDATE STORAGE  ////////////////

function updateStorage(item){
    localStorage.setItem(item.url.domain, item.toJson())
    showItems(filterShowableItems())
}

//////////////// SEARCH ITEMS ////////////////

document.getElementById("search").oninput = (e) =>{
    const itemsFound = readStorage().filter((item) =>{
        return item.url.value.match(e.target.value) || item.user.match(e.target.value)
    })
    showItems(itemsFound)
}

//////////////// SHOW ALL ITEMS (from button) ////////////////

document.getElementById("all-items").onclick = () =>{
    showItems(filterShowableItems())
}

//////////////// SHOW FAVORITES ////////////////

document.getElementById("favorites").onclick = () =>{
    const itemsFound = filterShowableItems().filter(item => item.inFav )
    showItems(itemsFound)
}

//////////////// SHOW TRASH ////////////////

const elemento = {
    // objeto con los datos que el usuario ingresa en el formulario para añadir un elemento
}

const agregarElemento = (elemento) =>{

function closeHandler(){
    document.querySelector(".add-form").remove()
}

    if(elemento){
        console.log("Elemento añadido a la base de datos")
    }else{
        console.log("No se pudo agregar el elemento")
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