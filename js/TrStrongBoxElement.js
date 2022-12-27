export class TrStrongBoxElement{

    #urlRegExp = /^(http|https)(\S+)(\.[a-zA-Z]{2,4}$|\.[a-zA-Z]\/{2,4}$)/g // uso un objeto de tipo RegExp porque con string.Match() no puedo usar "{}$" para matchear el final de una linea
    #_url
    #_usuario
    #_password
    #_descripcion
    #_htmlTableRowElement
    #_enFavoritos
    #_enPapelera

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
        <td class="td-list-element"><a href="${this.url.valor}" target="_blank">${this.url.dominio}</a><span>${this.usuario}</span></td>
        <td class="td-list-element"><button><i></i>pass</button></td>
        <td class="td-list-element">${this.descripcion}</td>
        `
    }

    // FAV & TRASH
    
    get enFavoritos(){
        return this.#_enFavoritos
    }

    // Getters & Setters

    get url(){
        return this._url
    }
    set url(url){
        this._url = {
            value : url,
            domain : url.startsWith('https://') ? url.slice(8) : url.slice(7),
            icon : url + '/favicon.ico' // hacer con fetch
        }
    }

    get user(){
        return this._user
    }
    set user(user){
        this._user = user
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
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    get description(){
        return this._description
    }
    set usuario(usuario){
        this.#_usuario = usuario
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    get inFav(){
        return this._inFav
    }
    set password(password){
        this.#_password = {
            valor : password,
            level : this.#passLevel(password)
        }
        this.#HtmlTableRowElement({url : this.url, usuario : this.usuario, password : this.password, descripcion : this.descripcion})
    }

    get inTrash(){
        return this._inTrash
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
        <td class="td-list-element"><i><img src="${htmlTableRowElement.url.icon}" alt="url icon"></i><a href="${htmlTableRowElement.url.valor}" target="_blank">${htmlTableRowElement.url.valor}</a></td>
        <td class="td-list-element">${htmlTableRowElement.usuario}</td>
        <td class="td-list-element">${htmlTableRowElement.password.valor}</td>
        <td class="td-list-element">${htmlTableRowElement.descripcion}</td>
        `
    }

            <td class="td-list-element">

            <button type="button" id="delete"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></i></button>

            <button type="button" id="fav"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: ${data.fav ? 'rgba(155, 155, 0, 1)' : 'rgba(155, 155, 155, 1)'};transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg></i></button>

            <button type="button" id="pass"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path><path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></i></button>
        
            </td>
            `
        }else{
            this._htmlTableRowElement.innerHTML = `\
            <tr>
                <td class="td-list-element"><span><img src="${data.url.icon}" alt="${data.url.domain}"width="24px" hieght="24px"></span></td>
                <td class="td-list-element"><span>${data.url.domain}</span></td>
                <td class="td-list-element"><button type="button" id="restore"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></i></button></td>
            </tr>
            `
        }
    }
}