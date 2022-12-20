import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

//////////////// SHOW ITEMS ////////////////

function readStorage(){
    const items = []
    for(let i = 0; i < localStorage.length; i++){
        const itemKey = localStorage.key(i)
        const itemFromStorage = JSON.parse(localStorage.getItem(itemKey))
        items.push(new TrStrongBoxElement(
            itemFromStorage.url,
            itemFromStorage.user,
            itemFromStorage.pass,
            itemFromStorage.descripcion,
            itemFromStorage.fav,
            itemFromStorage.trash
        ))        
    }
    return items
}

// este método se encarga de insertar los elementos de un array en el dom
function showItems(list){
    const table = document.getElementById('strongbox-items')
    if(list.length > 0){
        table.innerHTML = ""
        for(let i = 0; i < list.length; i++){
            table.appendChild(list[i].htmlTableRowElement)
        }
    }else{
        table.innerHTML = `
        <div>
            <h1>No hay elementos que mostrar</h1>
        </div>
        `
    }
}

showItems(readStorage())


// LISTENERS PARA DELETE, FAV Y PASS hacerlos en la función "mostrarElementos", que es la que inserta los elementos en el DOM


//////////////// SEARCH ITEMS ////////////////
const searchInputNode = document.getElementById("search")

searchInputNode.oninput = (e) =>{
    let itemsFound = []
    itemsFound = readStorage().filter((elemento) =>{
        return elemento.url.valor.match(e.target.value) || elemento.usuario.match(e.target.value)
    })
    showItems(itemsFound)
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
        const newItem = new TrStrongBoxElement(
            formulario.children[0].value,
            formulario.children[1].value,
            formulario.children[2].value,
            formulario.children[3].value,
            false,
            false
        )
        if(addItemToStorage(newItem)){
            formulario.parentElement.remove()
            showItems(readStorage())
        }else{
            formulario.reset()
            alert("No se pudo agregar el item, verifique que no exista otro con la misma url")
        }
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

//////////////// ADD ITEM  ////////////////

function addItemToStorage(item){
    if(localStorage.length){
        for(let i = 0; i < localStorage.length; i++){         
            const itemKey = localStorage.key(i)
            if(JSON.parse(localStorage.getItem(itemKey)).url == item.url.valor){
                return 0
            }
        }
    }    
    localStorage.setItem(item.url.dominio, item.toJson())
    showItems(readStorage())

    return 1
}


//////////////// LISTENERS ////////////////
