import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

//////////////// SEARCH ITEMS    ////////////////
const searchInputNode = document.querySelector("#search")

searchInputNode.oninput = (e) =>{
    console.log(e.target.value)
    const itemsFound = listaItems.filter((elemento) =>{
        return elemento.url.valor.match(e.target.value) || elemento.usuario.match(e.target.value)
    })
    mostrarElementos(itemsFound)
}

//////////////// FORM VALIDATION ////////////////
const addButton = document.querySelector("#add-button")
addButton.onclick = () => {
    const buttonSection = document.querySelector(".strongbox-content section:nth-child(2) div:nth-child(1)")
    const addItemForm = document.createElement("div")
    
    addItemForm.innerHTML = `
    <form action="#" id="add-button-form">
        <input type="url" name="url" id="url" placeholder=" url" required>
        <input type="text" name="user" id="user" placeholder=" usuario" pattern=".{3,}" required>
        <input type="password" name="pass" id="pass" placeholder=" contraseña" required>
        <input type="text" name="description" id="description" placeholder=" descripcion" maxlength="20" required>
        <button type="submit">Añadir</button>
    </form>
    `
    addItemForm.classList.add("add-form")
    buttonSection.appendChild(addItemForm)

    const formulario = document.getElementById("add-button-form")
    formulario.addEventListener("input", onInputHandler)
    formulario.addEventListener("invalid", onInvalidHandler, true)
    formulario[4].addEventListener("click", onClickHandler) // submit button
}

function onClickHandler(e){
    const formulario = e.target.parentNode
    if(formulario.checkValidity()){
        agregarElemento(new TrStrongBoxElement(
            formulario.children[0].value,
            formulario.children[1].value,
            formulario.children[2].value,
            formulario.children[3].value
        ))
        formulario.reset()
    }
}

function onInputHandler(e){
    if(!e.target.checkValidity() && e.target.value != ""){
        e.target.style.backgroundColor = "rgba(255, 0, 0, 0.1)"
    }else{
        e.target.style.backgroundColor = "rgba(255, 255, 255, 1)"
    }
}

function onInvalidHandler(e){
    console.log("invalid") // crear mensaje personalizado para que se muestre al apretar el boton de enviar
}

////////////////
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

function mostrarElementos(listaItems){
    if(listaItems.length > 0){
        const table = document.querySelector("#strongbox-items")
        table.innerHTML = ""
        for(let i = 0; i < listaItems.length; i++){
            table.appendChild(listaItems[i].htmlTableRowElement)
        }
    }else{
        noHayElementos()
    }
}

function noHayElementos(){
    const table = document.getElementById('strongbox-items')
    table.innerHTML = `
    <div>
        <h1>No hay elementos que mostrar</h1>
    </div>
    `
}

mostrarElementos(listaItems)

// Boton para añadir elementos en la caja fuerte

function agregarElemento(elemento){
    // con esta funcion se va a agregar el elemento directamente en la base de datos, no en el array
    listaItems.push(elemento)
    mostrarElementos(listaItems)
}