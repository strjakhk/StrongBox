export class TrStrongBoxElement{

    #urlRegExp = /^(http|https)(\S+)(\.[a-zA-Z]{2,4}$|\.[a-zA-Z]\/{2,4}$)/g
    #_url
    #_usuario
    #_password
    #_descripcion
    #_enFavoritos
    #_enPapelera
    #_htmlTableRowElement

    constructor(url, usuario, password, descripcion){

        this.#_enFavoritos = false
        this.#_enPapelera = false

        if(this.#urlRegExp.test(url)){
            this.#_url = {
                valor : url,
                dominio : url.startsWith('https://') ? url.slice(8) : url.slice(7),
                icon : url + '/favicon.ico'
            }
            
        }else{
            this.#_url = {
                valor : undefined,
                icon : undefined
            }
        }
        
        this.#_usuario = usuario

        this.#_password = {
            valor : password,
            level : this.#passLevel(password)
        }
        
        this.#_descripcion = descripcion

        this.#_htmlTableRowElement = document.createElement("tr")
        this.#_htmlTableRowElement.innerHTML = `\
        <td class="td-list-element"><i><img src="${this.url.icon}" alt="url icon"></i></td>
        <td class="td-list-element"><a href="${this.url.valor}" target="_blank">${this.url.dominio}</a>${this.usuario}</td>
        <td class="td-list-element">${this.password.valor}</td>
        <td class="td-list-element">${this.descripcion}</td>
        `
    }

    ///////////////////////////////////////////////////////

    // FAV & TRASH
    
    get enFavoritos(){
        return this.#_enFavoritos
    }
    get enPapelera(){
        return this.#_enPapelera
    }

    set enFavoritos(fav){
        if(this.#_enFavoritos != fav){
            this.#_enFavoritos = fav
        }
    }
    set enPapelera(trash){
        if(this.#_enPapelera != trash){
            this.#_enPapelera = trash
        }
    }

    // URL

    get url(){
        return this.#_url
    }
    set url(url){
        if(this.#urlRegExp.test(url)){
            this.#_url = {
                valor : url,
                icon : url + 'favicon.ico'
            }
            
        }else{
            this.#_url = {
                valor : undefined,
                icon : undefined
            }
        }
        htmlTableRowElement({url: this.url, usuario: this.usuario, password: this.password, descripcion: this.descripcion})
    }

    // USUARIO

    get usuario(){
        return this.#_usuario
    }
    set usuario(usuario){
        if(!usuario.match(/\s/) || usuario.length > 3){
            this.#_usuario = usuario
        }else{
            this.#_usuario = undefined
        }
        htmlTableRowElement({url: this.url, usuario: this.usuario, password: this.password, descripcion: this.descripcion})
    }

    // PASSWORD

    get password(){
        return this.#_password
    }
    set password(password){
        this.#_password = {
            valor : password,
            level : this.#passLevel(password)
        }
        htmlTableRowElement({url: this.url, usuario: this.usuario, password: this.password, descripcion: this.descripcion})
    }

    // DESCRIPCION

    get descripcion(){
        return this.#_descripcion
    }
    set descripcion(descripcion){
        if(descripcion.length < 20){
            this.#_descripcion = descripcion
        }else{
            this.#_descripcion = undefined
        }
        htmlTableRowElement({url: this.url, usuario: this.usuario, password: this.password, descripcion: this.descripcion})
    }

    // HTML NODE

    get htmlTableRowElement(){
        return this.#_htmlTableRowElement
    }
    set #HtmlTableRowElement(htmlTableRowElement){
        this.#_htmlTableRowElement.innerHTML = `\
        <td class="td-list-element"><i><img src="${htmlTableRowElement.url.icon}" alt="url icon"></i></td>
        <td class="td-list-element"><a href="${htmlTableRowElement.url.valor}" target="_blank">${htmlTableRowElement.url.dominio}</a>${htmlTableRowElement.usuario}</td>
        <td class="td-list-element">${htmlTableRowElement.password.valor}</td>
        <td class="td-list-element">${htmlTableRowElement.descripcion}</td>
        `
    }

    ///////////////////////////////////////////////////////

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
