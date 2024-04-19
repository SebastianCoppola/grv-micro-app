import PROVINCIAART from '../commons/assets/LogoCliente/PROVINCIAART.png'
import UCAPP from '../commons/assets/LogoCliente/UCAPP.png'
import PREVENCION from '../commons/assets/LogoCliente/PREVENCION.png'
import PLUSART from '../commons/assets/LogoCliente/PLUSART.png'
import ISPRO from '../commons/assets/LogoCliente/ISPRO.png'
import GALENOART from '../commons/assets/LogoCliente/GALENOART.png'
import EXPERTAART from '../commons/assets/LogoCliente/EXPERTAART.png'

export const getImage = (img) => {
    switch (img) {
        case 'PROVINCIAART':
            return PROVINCIAART;
            break;
        case 'UCAPP':
            return UCAPP;
            break;
        case 'PREVENCION':
            return PREVENCION;
            break;
        case 'PLUSART':
            return PLUSART;
            break;
        case 'ISPRO':
            return ISPRO;
            break;
        case 'GALENOART':
            return GALENOART;
            break;
        case 'EXPERTAART':
            return EXPERTAART;
            break;
        default:
            return null;
    }
}