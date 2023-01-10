import { TrStrongBoxElement } from "./TrStrongBoxElement.js"

// Mostrar items

showItems(filterShowableItems())
sessionStorage.setItem("whereIam", "all")

function showItems(list){
    const table = document.getElementById('strongbox-items')
    if(list.length > 0){
        document.getElementById("item-count").innerText = list.length
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
    document.getElementById("item-count").innerText = 0
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

    buttons[1].onclick = () =>{
        const deleteDialog = document.createElement("div")
        deleteDialog.classList.add("delete-dialog")
        document.getElementById("restore-and-delete-content").appendChild(deleteDialog)
        deleteDialog.innerHTML = `
            <span>borrar?</span>
            <div>
                <button type="button" id="yes">si</button>
                <button type="button" id="no">no</button>
            </div>       
        `
        document.getElementById("yes").onclick = () =>{
            localStorage.removeItem(item.url.domain)
            showItems(filterInTrashItems())
        }

        document.getElementById("no").onclick = () =>{
            deleteDialog.remove()
        }
    }
}

// leer items de storage, filtrando los favoritos

function filterFavoriteItems(){
    const itemsFound = filterShowableItems().filter(item => item.inFav )
    return itemsFound
}

// leer items de storage, filtrando los que están en papelera

function filterInTrashItems(){
    const itemsFound = readStorage().filter(item => item.inTrash)
    return itemsFound
}

// leer items de storage, filtrando los que no están en papelera

function filterShowableItems(){
    const itemsFound = readStorage().filter(item => !item.inTrash)
    return itemsFound
}

// función para leer todos los items de la storage, sin filtrar alguno

function readStorage(){
    const items = []
    for(let i = 0; i < localStorage.length; i++){
        const itemKey = localStorage.key(i)
        const itemFromStorage = JSON.parse(localStorage.getItem(itemKey))
        items.push(new TrStrongBoxElement(
            itemFromStorage.url,
            itemFromStorage.user,
            decryptPassword(itemFromStorage.pass),
            itemFromStorage.des,
            itemFromStorage.fav,
            itemFromStorage.trash
        ))        
    }
    return items
}

function decryptPassword(cipherPass){
    const encryptedPass = {
        iv : cipherPass.split('').reverse().join('').slice(0, 24),
        v : 1,
        iter : 10000,
        ks: 128,
        ts : 64,
        mode: "ccm",
        adata : "",
        cipher : "aes",
        salt : cipherPass.split('').reverse().join('').slice(24, 32),
        ct : cipherPass.split('').reverse().join('').slice(32)
    }

    const decryptedPass = sjcl.decrypt("pass", JSON.stringify(encryptedPass))
    return decryptedPass
}

// Añadir item al storage o actualizar storage  

function updateStorage(item){
    localStorage.setItem(item.url.domain, item.toJson())
    showItems(filterShowableItems())
}

// Buscar items 

document.getElementById("search").oninput = (e) =>{
    let itemsFound = []
    const whereIam = sessionStorage.getItem("whereIam")
    if(whereIam == "fav"){
        itemsFound = filterFavoriteItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }

    if(whereIam == "trash"){
        itemsFound = filterInTrashItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }

    if(whereIam == "all"){
        itemsFound = filterShowableItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }
    
    showItems(itemsFound)
}

// Mostrar todos los items

document.getElementById("show-all").onclick = () =>{
    sessionStorage.setItem("whereIam", "all")
    document.getElementById("items-section").innerText = "Elementos de caja fuerte"
    showItems(filterShowableItems())
}

// Mostrar todos los items (desde el botón)

document.getElementById("all-items").onclick = () =>{
    sessionStorage.setItem("whereIam", "all")
    document.getElementById("items-section").innerText = "Elementos de caja fuerte"
    showItems(filterShowableItems())
}

// Mostrar favoritos

document.getElementById("favorites").onclick = () =>{
    sessionStorage.setItem("whereIam", "fav")
    document.getElementById("items-section").innerText = "Favoritos"
    showItems(filterFavoriteItems())
}

// Mostrar papelera 

document.getElementById("trash").onclick = () =>{
    sessionStorage.setItem("whereIam", "trash")
    document.getElementById("items-section").innerText = "Papelera"
    showItems(filterInTrashItems())
}

// Validación de formulario para añadir elementos

document.getElementById("add-button").onclick = () => {
    const newItemSection = document.getElementById("new-item-section")
    const addItemForm = document.createElement("div")
    newItemSection.appendChild(addItemForm)

    addItemForm.classList.add("add-form")
    addItemForm.innerHTML = `
    <div class="form-message">
        <span>Agregar nuevo elemento</span>
        <button type="button" id="close"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #ccc ;transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg></i></button>
    </div>
    <form id="add-button-form">
        <input type="url" name="url" id="url" placeholder=" url" required>
        <input type="text" name="user" id="user" placeholder=" usuario" required>
        <input type="password" name="pass" id="pass" placeholder=" contraseña" required>
        <input type="text" name="description" id="description" placeholder=" descripcion" required>
        <input type="submit" value="agregar">
    </form>
    `

    document.getElementById("close").onclick = () =>{
        document.querySelector(".add-form").remove()
    }

    document.getElementById("add-button-form").onsubmit = (e) =>{
        e.preventDefault()
        const formulario = e.target
        const inputs = document.querySelectorAll("#add-button-form input")

        if(formulario.checkValidity()){ // uso checkValidity para la primer capa de validación con html5 (atributos required)
            if(!/\.\w{2,4}$/g.test(inputs[0].value)){
                inputErrorMessage(inputs[0])
                return
            }
            
            if(!/\S{3,}/g.test(inputs[1].value)){                
                inputErrorMessage(inputs[1])
                return
            }
    
            if(/\s{1,}/g.test(inputs[2].value)){                
                inputErrorMessage(inputs[2])
                return
            }
    
            if(inputs[3].value.length > 12){                
                inputErrorMessage(inputs[3])
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
        }
    }

    function inputErrorMessage(input){
        const errorDialog = document.querySelector(".form-message > span")
        errorDialog.classList.add("error-dialog")
    
        switch(input.name){
            case "url":
                errorDialog.textContent = `Error en el campo: [${input.name}]`
                break

            case "user":
                errorDialog.textContent = `Error en el campo: [${input.name}]`
                break

            case "pass":
                errorDialog.textContent = `Error en el campo: [${input.name}]`
                break

            case "description":
                errorDialog.textContent = `Error en el campo: [${input.name}]`
                break

            default:
                errorDialog.classList.remove("error-dialog")
                errorDialog.textContent = `Agregar nuevo elemento`
        }
    }
}