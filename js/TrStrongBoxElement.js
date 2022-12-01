export class TrStrongBoxElement{

    #urlRegExp = /^(http|https)(\S+)(\.[a-zA-Z]{2,4}$|\.[a-zA-Z]\/{2,4}$)/g // uso un objeto de tipo RegExp porque con string.Match() no puedo usar "{}$" para matchear el final de una linea
    #_url
    #_usuario
    #_password
    #_descripcion
    #_htmlTableRowElement

    constructor(url, usuario, password, descripcion){

        if(this.#urlRegExp.test(url)){
            this.#_url = {
                value : url,
                dominio : url.startsWith('https://') ? url.slice(8) : url.slice(7),
                icon : url + '/favicon.ico'
            }
            
        }else{
            this.#_url = {
                value : undefined,
                icon : undefined
            }
        }
        
        this.#_usuario = usuario

        this.#_password = {
            value : password,
            level : this.#passLevel(password)
        }
        
        this.#_descripcion = descripcion

        this.#_htmlTableRowElement = document.createElement("tr")
        this.#_htmlTableRowElement.innerHTML = `\
        <td class="td-list-element"><i><img src="${this.url.icon}" alt="url icon"></i></td>
        <td class="td-list-element"><a href="${this.url.value}" target="_blank">${this.url.dominio}</a><span>${this.usuario}</span></td>
        <td class="td-list-element"><button><i></i>pass</button></td>
        <td class="td-list-element">${this.descripcion}</td>
        `
    }

    // URL

    get url(){
        return this.#_url
    }
    set url(url){
        if(this.#urlRegExp.test(url)){
            this.#_url = {
                value : url,
                icon : url + 'favicon.ico'
            }
            
        }else{
            this.#_url = {
                value : undefined,
                icon : undefined
            }
        }
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    // USUARIO

    get usuario(){
        return this.#_usuario
    }
    set usuario(usuario){
        this.#_usuario = usuario
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    // PASSWORD

    get password(){
        return this.#_password
    }
    set password(password){
        this.#_password = {
            value : password,
            level : this.#passLevel(password)
        }
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    // DESCRIPCION

    get descripcion(){
        return this.#_descripcion
    }
    set descripcion(descripcion){
        this.#_descripcion = descripcion
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    // HTMLTableRowElement
    // el metodo set genera el elemento html con los datos de la instancia del objeto, pero solo puede llamarse desde los otros métodos setters.
    // de esta forma los datos del elemento html se actualizan cada vez que el usuario llama a un método set (por ejemplo, cuando quieran actualizar un dato)

    get htmlTableRowElement(){
        return this.#_htmlTableRowElement
    }
    set #HtmlTableRowElement(htmlTableRowElement){
        this.#_htmlTableRowElement.innerHTML = `\
        <td class="td-list-element"><i><img src="${htmlTableRowElement.url.icon}" alt="url icon"></i><a href="${htmlTableRowElement.url.value}" target="_blank">${htmlTableRowElement.url.value}</a></td>
        <td class="td-list-element">${htmlTableRowElement.usuario}</td>
        <td class="td-list-element">${htmlTableRowElement.password.value}</td>
        <td class="td-list-element">${htmlTableRowElement.descripcion}</td>
        `
    }

    // Metodo privado para obtener el nivel de la contraseña

    // passlvl = -1000  -> Error, la contraseña no puede contener espacios
    // passlvl = -2000  -> Error, cadena vacía o tipo de dato incorrecto
    // passlvl = -1 a 2 -> Contraseña debil
    // passlvl =  2 a 4 -> Contraseña normal
    // passlvl =  4 a 6 -> Contraseña fuerte

    #passLevel(password){
        if(typeof password == "string" && password.length > 0){
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
    }
}
