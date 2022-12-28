import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

// Mostrar items

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

    // Papelera
    buttons[0].onclick = () =>{
        !item.inTrash ? item.inTrash = true : item.inTrash = false
        updateStorage(item)
    }
    
    // Favoritos
    buttons[1].onclick = () =>{
        !item.inFav ? item.inFav = true : item.inFav = false
        updateStorage(item)
    }

    // Copiar contraseña al clipboard
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

// Añadir item al storage o actualizar storage  

function updateStorage(item){
    localStorage.setItem(item.url.domain, item.toJson())
    showItems(filterShowableItems())
}

// Buscar items 

document.getElementById("search").oninput = (e) =>{
    const itemsFound = readStorage().filter((item) =>{
        return item.url.value.match(e.target.value) || item.user.match(e.target.value)
    })
    showItems(itemsFound)
}

// Mostrar todos los items (desde el botón)

document.getElementById("all-items").onclick = () =>{
    showItems(filterShowableItems())
}

// Mostrar favoritos

document.getElementById("favorites").onclick = () =>{
    const itemsFound = filterShowableItems().filter(item => item.inFav )
    showItems(itemsFound)
}

// Mostrar papelera 

document.getElementById("trash").onclick = () =>{
    showItems(filterInTrashItems())
}

// Validación de formulario

document.getElementById("add-button").onclick = () => {
    const newItemSection = document.getElementById("new-item-section")
    const addItemForm = document.createElement("div")
    newItemSection.appendChild(addItemForm)

    addItemForm.classList.add("add-form")
    addItemForm.innerHTML = `
    <button type="button" id="close"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ccc ;transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></i></button>
    <div id="clear"></div>
    <form id="add-button-form">
        <input type="url" name="url" id="url" placeholder=" url">
        <input type="text" name="user" id="user" placeholder=" usuario">
        <input type="password" name="pass" id="pass" placeholder=" contraseña">
        <input type="text" name="description" id="description" placeholder=" descripcion">
        <input type="submit" value="agregar">
    </form>
    `

    document.getElementById("close").onclick = () =>{
        document.querySelector(".add-form").remove()
    }

    document.getElementById("add-button-form").addEventListener("submit", function(e){
        e.preventDefault()
        const formulario = e.target
        const inputs = document.querySelectorAll("#add-button-form input")

        if(!/\.\w{2,4}$/g.test(inputs[0].value)){
            formulario.reset()
            alert("url no valida")
            return
        }
        
        if(!/\S{3,}/g.test(inputs[1].value)){
            formulario.reset()
            alert("usuario no valido")
            return
        }

        if(/\s{1,}/g.test(inputs[2].value)){
            formulario.reset()
            alert("contraseña no valida")
            return
        }

        if(inputs[3].value.length > 12){
            formulario.reset()
            alert("descripción no valida")
            return
        }

        const newItem = new TrStrongBoxElement(
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            inputs[3].value,
            false,
            false
        )
        formulario.parentElement.remove()
        updateStorage(newItem)
    })
}