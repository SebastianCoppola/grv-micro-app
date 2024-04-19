import {
    SET_LOADING_TRASLADOS, SET_TRASLADOS_COMPLETOS, SET_TRASLADOS_GENERAL, SET_SERVICIOS_TRASLADOS,
    SET_AGENCIA_TRASLADOS, SET_DETALLE_TRASLADO, SET_EXPORTAR_TRASLADO, SET_EXPORTAR_TRASLADO_DONE
} from '../actionTypes'

const initialState = {
    trasladosGeneral: [],
    loading: false,
    trasladosCompleto: [],
    serviciosTraslados: null,
    agenciasTraslados: [],
    detalleTraslado: null,
    exportarTraslados: null,
}

const traslados = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_TRASLADOS:
            return {
                ...state,
                loading: action.payload
            }
            break;
        case SET_TRASLADOS_COMPLETOS:
            return {
                ...state,
                trasladosCompleto: action.payload
            }
            break;
        case SET_TRASLADOS_GENERAL:
            return {
                ...state,
                trasladosGeneral: action.payload
            }
            break;
        case SET_SERVICIOS_TRASLADOS:
            return {
                ...state,
                serviciosTraslados: action.payload
            }
            break;
        case SET_AGENCIA_TRASLADOS:
            return {
                ...state,
                agenciasTraslados: action.payload
            }
            break;
        case SET_DETALLE_TRASLADO:
            return {
                ...state,
                detalleTraslado: action.payload,
            }
            break;
        case SET_EXPORTAR_TRASLADO:
            return {
                ...state,
                exportarTraslados: action.payload,
                loading: false
            }
            break;
            case SET_EXPORTAR_TRASLADO_DONE:
                return {
                    ...state,
                    exportarTraslados: action.payload,
                }
                break;
        default:
            return state;
    }
}
export default traslados