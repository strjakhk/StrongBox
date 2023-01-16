// Mostrar items

showItems(filterShowableItems())

function showItems(list){
    const table = document.getElementById('strongbox-items')
    if(list.length > 0){
        document.getElementById("item-count").innerText = list.length // contador de items (se muestra siempre en pantalla)
        table.innerHTML = ""
        list.forEach(item =>{
            table.appendChild(item.htmlTableRowElement)
            !item.inTrash ? generateListenersOnNormalItem(item) : generateListenersOnItemInTrash(item) // Generar listeners para FAV, DELETE y PASS
        })
    }else{
        showNoElementsMessage(table)
    }
}

function showNoElementsMessage(table){
    document.getElementById("item-count").innerText = 0
    table.innerHTML = `
    <div class="empty-message-box">
        <h2>Nothing found</h2>
        <img src="../images/nothing-found-icon.png" alt="tumbleweed">
    </div>
    `
}

function generateListenersOnNormalItem(item){
    const buttons  = [...item.htmlTableRowElement.getElementsByTagName("button")]

    // Papelera
    buttons[0].onclick = () =>{
        if(!item.inTrash){
            item.inTrash = true
            alertify.warning("item en papelera")
        }else{
            item.inTrash = false
        }
        updateStorage(item)
        showItems(filterShowableItems())
    }
    
    // Favoritos
    buttons[1].onclick = () =>{
        if(!item.inFav){
            item.inFav = true
            alertify.message("agregado a favoritos")
        }else{
            item.inFav = false
        }

        updateStorage(item)
        JSON.parse(sessionStorage.getItem("whereIam")).place == "fav" ? showItems(filterFavoriteItems()) : showItems(filterShowableItems())
    }

    // Copiar contraseña al clipboard
    buttons[2].onclick = () =>{
        navigator.clipboard.writeText(item.pass.value)
        alertify.success("contraseña copiada")
    }
}

function generateListenersOnItemInTrash(item){
    const buttons  = [...item.htmlTableRowElement.getElementsByTagName("button")]

    // Restaurar
    buttons[0].onclick = () =>{
        item.inTrash = false
        updateStorage(item)
        showItems(filterInTrashItems())
        alertify.success("item restaurado!")
    }

    // Borrar permanentemente del Localstorage
    buttons[1].onclick = () =>{
        alertify.confirm("strongbox", "Eliminar permanentemente?",
        function(){
            alertify.warning("elemento eliminado")
            localStorage.removeItem(item.url.domain)
            showItems(filterInTrashItems())
        },
        function(){
            alertify.message("acción cancelada")
        })
    }
}

// leer items de storage, filtrando los que están en papelera

function filterInTrashItems(){
    const itemsFound = readStorage().filter(item => item.inTrash)
    sessionStorage.setItem("whereIam", JSON.stringify({ place : "trash", isEmpty : itemsFound.length > 0 ? false : true}))
    return itemsFound
}

// leer items de storage, filtrando los que no están en papelera

function filterShowableItems(){
    const itemsFound = readStorage().filter(item => !item.inTrash)
    sessionStorage.setItem("whereIam", JSON.stringify({ place : "all", isEmpty : itemsFound.length > 0 ? false : true}))
    return itemsFound
}

// leer items de storage, filtrando los favoritos

function filterFavoriteItems(){
    const itemsFound = filterShowableItems().filter(item => item.inFav )
    sessionStorage.setItem("whereIam", JSON.stringify({ place : "fav", isEmpty : itemsFound.length > 0 ? false : true}))
    return itemsFound
}

// Buscar items 

document.getElementById("search").oninput = (e) =>{
    let itemsFound = []
    const whereIam = JSON.parse(sessionStorage.getItem("whereIam"))
    if(whereIam.place == "fav"){
        itemsFound = filterFavoriteItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }

    if(whereIam.place == "trash"){
        itemsFound = filterInTrashItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }

    if(whereIam.place == "all"){
        itemsFound = filterShowableItems().filter((item) =>{
            return item.url.value.match(e.target.value) || item.user.match(e.target.value)
        })
    }
    
    showItems(itemsFound)
}

// Mostrar todos los items

document.getElementById("show-all").onclick = () =>{
    document.getElementById("items-section").innerText = "Elementos de caja fuerte"
    showItems(filterShowableItems())
}

// Mostrar todos los items (desde el botón)

document.getElementById("all-items").onclick = () =>{
    document.getElementById("items-section").innerText = "Elementos de caja fuerte"
    showItems(filterShowableItems())
}

// Mostrar favoritos

document.getElementById("favorites").onclick = () =>{
    document.getElementById("items-section").innerText = "Favoritos"
    showItems(filterFavoriteItems())
}

// Mostrar papelera 

document.getElementById("trash").onclick = () =>{
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
        <div class="submit-and-pw">
            <input type="submit" form="add-button-form" value="agregar">
            <div class="pwgenerator">
                <div>
                    <span>generador de contraseña</span>
                    <span id="passwd"></span>
                </div>
                <button type="button" id="pwgenerator">generar</button>
            </div>
        </div>
        
    </form>
    `

    document.getElementById("pwgenerator").onclick = (e) =>{
        e.target.disabled = true
        fetch("https://makemeapassword.ligos.net/api/v1/alphanumeric/json?c=1&l=14&sym=y")
        .then(response => response.json())
        .then(json => {
            document.getElementById("passwd").innerText = json.pws[0]
            e.target.disabled = false
        })
    }

    document.getElementById("close").onclick = () =>{
        document.querySelector(".add-form").remove()
    }

    document.getElementById("add-button-form").onsubmit = (e) =>{
        e.preventDefault()
        const formulario = e.target
        const inputs = document.querySelectorAll("#add-button-form input")        

        if(formulario.checkValidity()){ // checkValidity para la primer capa de validación con html5 (atributos required) y expresiones regulares en la segunda capa
            if(!/\.\w{2,5}$/g.test(inputs[0].value)){
                inputErrorMessage(inputs[0])
                return
            }
            
            if(!/^\S{3,30}$/g.test(inputs[1].value)){                
                inputErrorMessage(inputs[1])
                return
            }
    
            if(/^\s{1,}/g.test(inputs[2].value)){                
                inputErrorMessage(inputs[2])
                return
            }
    
            if(!/^.{1,40}$/g.test(inputs[3].value)){
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
            showItems(filterShowableItems())
        }
    }

    function inputErrorMessage(input){
        const errorDialog = document.querySelector(".form-message > span")
        errorDialog.classList.add("error-dialog")
    
        switch(input.name){
            case "url":
                errorDialog.innerText = `Error en el campo: [${input.name}]\nEl formato del dominio debe ser [https://dominio.extension]`
                break

            case "user":
                errorDialog.innerText = `Error en el campo: [${input.name}]\nEl usuario debe contener entre 3 y 30 caracteres (sin espacios)`
                break

            case "pass":
                errorDialog.innerText = `Error en el campo: [${input.name}]\nLa contraseña no puede contener espacios`
                break

            case "description":
                errorDialog.innerText = `Error en el campo: [${input.name}]\nDescripción demasiado larga, debe ttener un maximo de 40 caracteres`
                break

            default:
                errorDialog.classList.remove("error-dialog")
                errorDialog.innerText = `Agregar nuevo elemento`
        }
    }
}