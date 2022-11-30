export class TrStrongBoxElement{

    #urlRegExp = /^(http|https)(\S+)(\.[a-zA-Z]{2,4}$)/g // uso un objeto de tipo RegExp porque con string.Match() no puedo usar "{}$" para matchear el final de una linea

    constructor(url, usuario, password, descripcion){

        if(this.#urlRegExp.test(url)){
            this._url = {
                value : url,
                icon : url + 'favicon.ico'
            }
            
        }else{
            this._url = {
                value : undefined,
                icon : undefined
            }
        }
        
        this._usuario = usuario

        this._password = {
            value : password,
            level : this.#passLevel(password)
        }
        
        this._descripcion = descripcion

        this._htmlTableRowElement = document.createElement("tr")
        this._htmlTableRowElement.innerHTML = `\
        <td>${this.url.value}</td>
        <td>${this.usuario}</td>
        <td>${this.password.value}</td>
        <td>${this.descripcion}</td>
        `
    }

    // URL getter & setter

    get url(){
        return this._url
    }
    set url(url){
        if(this.#urlRegExp.test(url)){
            this._url = {
                value : url,
                icon : url + 'favicon.ico'
            }
            
        }else{
            this._url = {
                value : undefined,
                icon : undefined
            }
        }
        this.#HtmlTableRowElement({url : this._url, usuario : this._usuario, password : this._password, descripcion : this._descripcion})
    }

    // USUARIO getter & setter

    get usuario(){
        return this._usuario
    }
    set usuario(usuario){
        this._usuario = usuario
        this.#HtmlTableRowElement({url : this._url, usuario : this._usuario, password : this._password, descripcion : this._descripcion})
    }

    // PASSWORD getter & setter

    get password(){
        return this._password
    }
    set password(password){
        this._password = {
            value : password,
            level : this.#passLevel(password)
        }
        this.#HtmlTableRowElement({url : this._url, usuario : this._usuario, password : this._password, descripcion : this._descripcion})
    }

    // DESCRIPCION getter & setter

    get descripcion(){
        return this._descripcion
    }
    set descripcion(descripcion){
        this._descripcion = descripcion
        this.#HtmlTableRowElement({url : this._url, usuario : this._usuario, password : this._password, descripcion : this._descripcion})
    }

    // HTMLTableRowElement getter & setter
    // el metodo set genera el elemento html con los datos de la instancia del objeto. El método es privado y se llama cada vez que se llama a otros métodos setters para mantener los datos actualizados


    get htmlTableRowElement(){
        return this._htmlTableRowElement
    }
    set #HtmlTableRowElement(htmlTableRowElement){
        this._htmlTableRowElement.innerHTML = `\
        <td>${htmlTableRowElement.url.value}</td>
        <td>${htmlTableRowElement.usuario}</td>
        <td>${htmlTableRowElement.password.value}</td>
        <td>${htmlTableRowElement.descripcion}</td>
        `
    }

    // Metodo privado para obtener el nivel de la contraseña

    #passLevel(password){
        if(password){
            let passlvl = 0

            if(password.match(/[\s]/)) return (-1000)
            if(password.match(/[\W]/)) passlvl++
            if(password.match(/[\d]/)) passlvl++
            if(password.match(/[A-Z]/)) passlvl++

            switch (true){
                case (password.length < 6) : passlvl -= 1; break
                case (password.length >= 6 && password.length <= 8) : passlvl += 1; break
                case (password.length >= 9 && password.length <= 12) : passlvl += 2; break
                case (password.length > 12) : passlvl += 3; break
            }
            return passlvl
        }else{
            return (-2000)
        }

        // passlvl = -1000  -> Error, la contraseña no puede contener espacios
        // passlvl = -2000  -> Error, cadena vacía
        // passlvl = -1 a 2 -> Contraseña debil
        // passlvl =  2 a 4 -> Contraseña normal
        // passlvl =  4 a 6 -> Contraseña fuerte
    }
}
