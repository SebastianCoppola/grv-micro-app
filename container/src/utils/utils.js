import React from "react"

export default class Utils {

    //Funcion que recupera un cookie segun el nombre. Devuelve la cookie o null. 
    static getCookieByName = (name) => {
        let regex = new RegExp(`(^| )${name}=([^;]+)`)
        let match = document.cookie.match(regex)
        if (match) return match[2]
        else return null
    }

    //Funcion que elimina un cookie segun el nombre. 
    static deleteCookieByName = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }

    //Funcion para deserializar imagenes b64 a blob
    static deserializeImagenToBlob = (base64Data, imagenDefault) => {
        if (base64Data && base64Data !== null) {
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/png" });
            const blobURL = URL.createObjectURL(blob)
            return <img src={blobURL} alt='usuario-responsable' style={{ width: '40px', height: '40px', margin: '0px 0px 0 16px', backgroundColor: '#ffffff' }} />
        }
        return <img src={imagenDefault} alt='usuario-responsable' style={{ width: '40px', height: '40px', margin: '0px 0px 0 16px', backgroundColor: '#ffffff' }} />
    }

}