import {
   SET_EVOLUCIONES, SET_LOADING_EVOLUCIONES, SET_LOADING_OBSERVACIONES, SET_OBSERVACIONES,
   SET_CONSULTAS_Y_RECLAMOS_COMPLETO, SET_LOADING_RECLAMOS, SET_CONSULTAS_Y_RECLAMOS_GENERAL, 
   SET_DETALLE_CONSULTA_RECLAMO, LOADING_EDITAR_OBSERVACION, LOADING_NUEVA_OBSERVACION
} from '../actionTypes'

const initialState = {

    evoluciones:[],
    loadingEvolucion:false,
    observaciones:[],
    loadingObservaciones:false,
    reclamosCompleto: [],
    reclamosGeneral: [],
    loading: false,
    loadingEditarObservaciones: false,
    loadingNuevaObservacion : false
}

const consultasReclamos = (state = initialState, action) => {
    switch (action.type) {
        case SET_EVOLUCIONES:
            return {
                ...state,
                evoluciones: action.payload
            }
            break;
        case SET_LOADING_EVOLUCIONES:
            return {
                ...state,
                loadingEvolucion: action.payload
            }
            break;
        case SET_OBSERVACIONES:
            return {
                ...state,
                observaciones: action.payload
            }
            break;
        case SET_LOADING_OBSERVACIONES:
            return {
                ...state,
                loadingObservaciones: action.payload
            }
            break;
        case SET_CONSULTAS_Y_RECLAMOS_COMPLETO:
            return {
                ...state,
                reclamosCompleto: action.payload
            }
            break;
        case SET_LOADING_RECLAMOS:
            return {
                ...state,
                loading: action.payload
            }
            break;
        case SET_CONSULTAS_Y_RECLAMOS_GENERAL:
            return {
                ...state,
                reclamosGeneral: action.payload
            }
            break;
        case SET_DETALLE_CONSULTA_RECLAMO:
            return {
                ...state,
                detalleReclamo: action.payload
            }
            break;
        case LOADING_EDITAR_OBSERVACION:
            return {
                ...state,
                loadingEditarObservaciones: action.payload
            }
            break;
        case LOADING_NUEVA_OBSERVACION:
            return {
                ...state,
                loadingNuevaObservacion: action.payload
            }
            break;
        default:
            return state;
    }
}
export default consultasReclamos