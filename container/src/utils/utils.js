export default class Utils {

    static getCookieByName = (name) => {
        let regex = new RegExp(`(^| )${name}=([^;]+)`)
        let match = document.cookie.match(regex)
        if (match) return match[2]
        else return null
    }

    static deleteCookieByName = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

}