// función para leer todos los items de la storage, sin filtros

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

// Añadir item al storage o actualizar storage  

function updateStorage(item){
    localStorage.setItem(item.url.domain, item.toJson())
}
