import { PORTAL_CLIENTE_APP } from "./const"
import { URL_FRONT_PORTAL_CLIENTE, URL_FRONT_UI } from "./url"

class Utils {

    static usuarioConPermisos(roles) {
        if (roles) {
            let rol = roles.filter(it => it === 'Supervisor' || it === 'Operador')
            if (rol && rol[0]) {
                return true;
            }
        }
        return false;
    }

    //Valida el area del usuario que se loguea y lo redirige a la app de esa área:
    static verificarAreaUsuarioLogueadoYRedireccion = (appUsuarios) => {
        //valido que tenga un solo valor en el atributo APP de keycloak
        if(appUsuarios.length == 1) {
            if(appUsuarios[0] === PORTAL_CLIENTE_APP){
                //PORTAL_CLIENTES
                window.location.href = URL_FRONT_PORTAL_CLIENTE
            }else{
                console.log('a punto de redirigir')
                window.location.href = URL_FRONT_UI
            }
        } else {
            //En caso de tener mas de un tributo se redirige al front que agrupa disitintas areas
            //(CEM - Contrataciones - Auditoria Medica)
            window.location.href = URL_FRONT_UI
        }
    }
}

export default Utils;
