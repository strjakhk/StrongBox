import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

//////////////// SHOW ITEMS ////////////////

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

function mostrarElementos(listaItems){
    const table = document.getElementById('strongbox-items')
    if(listaItems.length > 0){
        table.innerHTML = ""
        for(let i = 0; i < listaItems.length; i++){
            table.appendChild(listaItems[i].htmlTableRowElement)
        }
    }else{
        table.innerHTML = `
        <div>
            <h1>No hay elementos que mostrar</h1>
        </div>
        `
    }
}

mostrarElementos(listaItems)

// LISTENERS PARA DELETE, FAV Y PASS hacerlos en la función "mostrarElementos", que es la que inserta los elementos en el DOM

//////////////// SEARCH ITEMS ////////////////
const searchInputNode = document.getElementById("search")

searchInputNode.oninput = (e) =>{
    console.log(e.target.value)
    const itemsFound = listaItems.filter((elemento) =>{
        return elemento.url.valor.match(e.target.value) || elemento.usuario.match(e.target.value)
    })
    mostrarElementos(itemsFound)
}

//////////////// ADD ITEMS ////////////////

function agregarElemento(elemento){
    // con esta funcion se va a agregar el elemento directamente en la base de datos, no en el array
    listaItems.push(elemento)
    mostrarElementos(listaItems)
}

//////////////// FORM VALIDATION ////////////////
const addButton = document.getElementById("add-button")
addButton.onclick = () => {
    const buttonSection = document.querySelector(".strongbox-content section:nth-child(2) div:nth-child(1)")
    const addItemForm = document.createElement("div")

    addItemForm.innerHTML = `
    <button type="button" id="close"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ccc ;transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></i></button>
    <div id="clear"></div>
    <form id="add-button-form">
        <input type="url" name="url" id="url" placeholder=" url" required>
        <input type="text" name="user" id="user" placeholder=" usuario" pattern=".{3,}" required>
        <input type="password" name="pass" id="pass" placeholder=" contraseña" required>
        <input type="text" name="description" id="description" placeholder=" descripcion" maxlength="20" required>
        <input type="submit" value="agregar">
    </form>
    `
    addItemForm.classList.add("add-form")
    buttonSection.appendChild(addItemForm)

    const formulario = document.getElementById("add-button-form")
    const closeButton = document.getElementById("close")
    closeButton.addEventListener("click", closeHandler)
    formulario.addEventListener("input", onInputHandler)
    formulario.addEventListener("invalid", onInvalidHandler, true)
    formulario.addEventListener("submit", onSubmitHandler)
}

function closeHandler(){
    document.querySelector(".add-form").remove()
}

function onSubmitHandler(e){
    e.preventDefault()
    const formulario = e.target
    if(formulario.checkValidity()){
        agregarElemento(new TrStrongBoxElement(
            formulario.children[0].value,
            formulario.children[1].value,
            formulario.children[2].value,
            formulario.children[3].value
        ))        
        formulario.parentElement.remove()
    }
}

function onInputHandler(e){
    if(!e.target.checkValidity() && e.target.value != ""){
        e.target.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
    }else{
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
    }
}

function onInvalidHandler(e){
    console.log("invalid") // crear mensaje personalizado para que se muestre al apretar el boton de enviar
}

//////////////// LISTENERS ////////////////
