export class TrStrongBoxElement{
    constructor(url, user, pass, des, fav, trash){
        this.url = url
        this.user = user
        this.pass = pass
        this.description = des
        this.inFav = fav
        this.inTrash = trash
        this.#htmlTableRowElement = { url : this.url, user : this.user, pass : this.pass, des : this.description, fav : this.inFav, trash : this.inTrash}
    }

    #passlvl(pass){
        let passlvl = 0
        pass.match(/[\W]/) && passlvl++
        pass.match(/[\d]/) && passlvl++
        pass.match(/[A-Z]/) && passlvl++
        pass.length > 6 && passlvl++
        pass.length > 8 && passlvl++
        pass.length > 12 && passlvl++

        return passlvl
    }

    toJson(){
        return JSON.stringify({
            url : this.url.value,
            user : this.user,
            pass : this.pass.value,
            des : this.description,
            fav : this.inFav,
            trash : this.inTrash
        })
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

    get pass(){
        return this._pass
    }
    set pass(pass){
        this._pass = { value : pass, level : this.#passlvl(pass) }
    }

    get description(){
        return this._description
    }
    set description(des){
        this._description = des
    }

    get inFav(){
        return this._inFav
    }
    set inFav(inFav){
        this._inFav = inFav
    }

    get inTrash(){
        return this._inTrash
    }
    set inTrash(inTrash){
        this._inTrash = inTrash
    }

    get htmlTableRowElement(){
        return this._htmlTableRowElement
    }
    set #htmlTableRowElement(data){
        this._htmlTableRowElement = document.createElement("tr")

        if(!data.trash){
            this._htmlTableRowElement.innerHTML = `\
            <td class="td-list-element"><i class="url-icon"><img src="${data.url.icon}" alt="url icon" width="24" height="24"></i></td>
            <td class="td-list-element"><a href="${data.url.value}" target="_blank">${data.url.domain}</a>${data.user}</td>
            <td class="td-list-element">${data.des}</td>

            <td class="td-list-element">

            <button type="button"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg></i></button>

            <button type="button" id="fav"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: ${data.fav ? 'rgba(155, 155, 0, 1)' : 'rgba(155, 155, 155, 1)'};transform: ;msFilter:;"><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path></svg></i></button>

            <button type="button" id="pass"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M14 8H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V10c0-1.103-.897-2-2-2z"></path><path d="M20 2H10a2 2 0 0 0-2 2v2h8a2 2 0 0 1 2 2v8h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path></svg></i></button>
        
            </td>
            `
        }else{
            this._htmlTableRowElement.className = "trash-tr"
            this._htmlTableRowElement.innerHTML = `\
            <td class="td-list-element"><span><img src="${data.url.icon}" alt="${data.url.domain}"width="24px" hieght="24px"></span></td>
            <td class="td-list-element"><span>${data.url.domain}</span></td>
            <td class="td-list-element" id="restore-and-delete-content">
                <button type="button" id="restore"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 155, 0, 0.8);transform: ;msFilter:;"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg></i></button>
                <button type="button" id="delete"><i><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(155, 155, 155, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg></i></button>
            </td>
            `
        }
    }
}