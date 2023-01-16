// Función para encryptar contraseña. Se genera un objeto con la configuración de encriptación. De este objeto, solo guardo en el storage los datos como iv, salt y ct

function encryptPassword(pass){
    const cipherPassWithParameters = JSON.parse(sjcl.encrypt("pass", pass, { salt : 'mysalt'}))
    const cipherPassWithOutParameters = (cipherPassWithParameters.iv + cipherPassWithParameters.salt + cipherPassWithParameters.ct).split('').reverse().join('')
    return cipherPassWithOutParameters
}

// Función para desencriptar contraseña guardada en el localstorage usando librería sjcl.
// El método sjcl.decrypt recibe un json con la configuración de encriptación. Las propiedades que guardo en el storage y que se leen acá son iv, salt y ct. Estas propiedades no se guardan en su formato original dentro del local storage, sino que hago una concatenación entre las tres y revierto la cadena para que no sea legible a simple vista.

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