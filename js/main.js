import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

//////////////// SHOW ITEMS ////////////////

showItems(filterShowableItems())

function showItems(list){
    const table = document.getElementById('strongbox-items')
    if(list.length > 0){
        table.innerHTML = ""
        list.forEach(item =>{
            table.appendChild(item.htmlTableRowElement)

            // Listeners para FAV, DELETE y PASS
            !item.inTrash ? generateListenersOnNormalItem(item) : generateListenersOnItemInTrash(item)
        })
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

document.getElementById("trash").onclick = () =>{
    showItems(filterInTrashItems())
}

//////////////// FORM VALIDATION ////////////////

document.getElementById("add-button").onclick = () => {
    const buttonSection = document.querySelector(".strongbox-content section:nth-child(2) div:nth-child(1)")
    const addItemForm = document.createElement("div")
    addItemForm.classList.add("add-form")
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
        formulario.parentElement.remove()
        updateStorage(newItem)
    }
}

function onInputHandler(e){
    !e.target.checkValidity() && e.target.value != "" ? e.target.style.backgroundColor = "rgba(255, 0, 0, 0.2)" : e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
}

function onInvalidHandler(e){
    console.log("invalid") // crear mensaje personalizado para que se muestre al apretar el boton de enviar
}