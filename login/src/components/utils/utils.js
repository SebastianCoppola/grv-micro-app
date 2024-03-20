import { PORTAL_CLIENTE_APP } from "./const";
import { URL_FRONT_PORTAL_CLIENTE, URL_FRONT_UI } from "./url";

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
    static verificarAreaUsuarioLogueadoYRedireccion = (datosUsuario) => {
        //valido que tenga un solo valor en el atributo APP de keycloak
        if( datosUsuario.apps.length == 1 ) {
            switch (datosUsuario.apps[0]) {
                //PORTAL_CLIENTES
                case PORTAL_CLIENTE_APP:
                    window.location.href = URL_FRONT_PORTAL_CLIENTE
                    break;
                //CEM
                default:
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
