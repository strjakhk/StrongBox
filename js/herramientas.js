const genPassBox = document.getElementById("generate-password-box")
const expAndImpBox = document.getElementById("import-and-export")

document.getElementById("pw-generator").onclick = () =>{
    genPassBox.style.display = "block"
    expAndImpBox.style.display = "none"
}

document.getElementById("export-data").onclick = () =>{
    genPassBox.style.display = "none"
    expAndImpBox.style.display = "block"
}

// GENERAR CONTRASEÑA

document.getElementById("pass-generator-form").onsubmit = (e) =>{
    const button = e.target.querySelector("button")
    button.disabled = true

    e.preventDefault()

    const length = document.getElementById("length").value
    const symbolsInputs = [...document.querySelectorAll("input[name='symbols']")]
    const symbol = symbolsInputs.find(element => element.checked).value == "yes" ? 'Y' : 'N'

    fetch(`https://makemeapassword.ligos.net/api/v1/alphanumeric/json?c=1&l=${length}&sym=${symbol}`)
    .then(response => response.json())
    .then(value => {
        document.getElementById("generatedpw").innerText = value.pws[0]
        button.disabled = false
        alertify.message("contraseña generada")
    })
}

// EXPORTAR DATOS (JSON)

document.getElementById("download-json").onclick = () =>{
    const a = document.createElement("a")
    const data = getAllData()
    const blob = new Blob([JSON.stringify(data)], { type : "application/json"})
    a.href = URL.createObjectURL(blob)
    a.download = "object.json"
    a.click()
}

function getAllData(){
    const items = []
    const storageLength = localStorage.length
    for(let i = 0; i < storageLength; i++){
        const key = localStorage.key(i)
        const item = JSON.parse(localStorage.getItem(key))
        items.push({
            url : item.url,
            user : item.user,
            pass : decryptPassword(item.pass),
            description : item.des
        })
    }
    return items
}

// IMPORTAR DATOS (archivo JSON)

document.getElementById("jsondata").onchange = (e) =>{
    if(e.target.files.length > 0){
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener("load", importData)
        reader.readAsText(file)
    }else{
        alertify.alert("error", "No hay un archivo seleccionado")
    }
}

function importData(e){
    const data = JSON.parse(e.target.result)

    try{
        data.forEach(item => {
            const newItem = new TrStrongBoxElement(
                item.url,
                item.user,
                item.pass,
                item.description,
                false,
                false
            )
            updateStorage(newItem)
        })
        alertify.success("datos actualizados!")
    }catch(error){
        alertify.alert("error", "El archivo no es valido")
    }

}