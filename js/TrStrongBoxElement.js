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
        <td class="td-list-element"><i><img src="${this.url.icon}" alt="url icon" width="32" height="32"></i></td>
        <td class="td-list-element"><a href="${this.url.valor}" target="_blank">${this.url.dominio}</a>${this.usuario}</td>
        <td class="td-list-element">${this.descripcion}</td>

        <td class="td-list-element">

        <button type="button" id="delete"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></i></button>

        <button type="button" id="fav"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 0, 1);transform: ;msFilter:;"><path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"></path></svg></i></button>

        <button type="button" id="pass"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path><path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></i></button>
        
        </td>
        `
    }

    ///////////////////////////////////////////////////////
    //////////////// SETTERS & GETTERS ////////////////////
    ///////////////////////////////////////////////////////

    // FAV & TRASh

    get enFavoritos(){
        this.#_enFavoritos = !this.#_enFavoritos
    }
    get enPapelera(){
        this.#_enPapelera = !this.#_enPapelera
    }

    set enFavoritos(fav){
        this.#_enFavoritos = fav
    }
    set enPapelera(trash){
        this.#_enPapelera = trash
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

    get #password(){
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
        <td class="td-list-element"><i><img src="${htmlTableRowElement.url.icon}" alt="url icon" width="32" height="32"></i></td>
        <td class="td-list-element"><a href="${htmlTableRowElement.url.valor}" target="_blank">${htmlTableRowElement.url.dominio}</a>${htmlTableRowElement.usuario}</td>
        <td class="td-list-element">${htmlTableRowElement.descripcion}</td>

        <td class="td-list-element">

        <button type="button" id="delete"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></i></button>

        <button type="button" id="fav"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 0, 1);transform: ;msFilter:;"><path d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"></path></svg></i></button>

        <button type="button" id="pass"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path><path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></i></button>
        
        </td>
        `
        // this.#listeners()
    }

    ///////////////////////////////////////////////////////
    ///////// PRIVATE METHODS (no setters) ///////////////
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
