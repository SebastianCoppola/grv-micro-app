import {
    GET_MODULO,
    SET_LOADING_MODULO,
    SET_ERROR_MODULO,
    GET_INCLUSIONES_MODULO,
    SET_LOADING_INCLUSIONES_MODULO,
    GET_INCLUSIONES_REPETIDAS,
    SET_LOADING_INCLUSIONES_REPETIDAS,
    SET_LOADING_SAVE_INCLUSIONES,
    SET_LISTADO_TIPO_PRESTACION,
    SET_CONVENIOS_INCLUIDOS,
    SET_LOADING_CONVENIOS_INCLUIDOS,
    GET_LISTADO_MODULOS,
    SET_LOADING_LISTADO_MODULOS,
    SET_LOADING_SAVE_EDIT_MODULO,
    SET_LOADING_IMPACTAR_CONVENIOS,
} from '../actionTypes'

const initialState = {
    modulos: [],
    loadingAutosuggestModulos: false,
    errorAutosuggestModulos: false,
    loadingModulos: false,
    inclusionesModulo: [],
    loadingInclusionesModulo: false,
    inclusionesRepetidas: [],
    loadingInclucionesRepetidas: false,
    loadingSaveInclusiones: false,
    tipoPrestaciones: [],
    conveniosIncluidos: [],
    loadingConveniosIncluidos: false,
    modulosListado: [],
    loadingListadoModulo: false,
    loadingSaveEditModulo: false,
    loadingImpactarConvenios: false
}

const moduloConvenio = (state = initialState, action) => {
    switch (action.type) {
        case GET_MODULO:
            return {
                ...state,
                modulos: action.payload
            }
        case SET_LOADING_MODULO:
            return {
                ...state,
                loadingAutosuggestModulos: action.payload
            }
        case SET_ERROR_MODULO:
            return {
                ...state,
                errorAutosuggestModulos: action.payload
            }
        case GET_INCLUSIONES_MODULO:
            return {
                ...state,
                inclusionesModulo: action.payload
            }
        case SET_LOADING_INCLUSIONES_MODULO:
            return {
                ...state,
                loadingInclusionesModulo: action.payload
            }
        case GET_INCLUSIONES_REPETIDAS:
            return {
                ...state,
                inclusionesRepetidas: action.payload
            }
        case SET_LOADING_INCLUSIONES_REPETIDAS:
            return {
                ...state,
                loadingInclucionesRepetidas: action.payload
            }
        case SET_LOADING_SAVE_INCLUSIONES:
            return {
                ...state,
                loadingSaveInclusiones: action.payload
            }
        case SET_LISTADO_TIPO_PRESTACION:
            return {
                ...state,
                tipoPrestaciones: action.payload
            }
        case SET_LOADING_SAVE_EDIT_MODULO:
            return {
                ...state,
                loadingSaveEditModulo: action.payload
            }
        case SET_CONVENIOS_INCLUIDOS:
            return {
                ...state,
                conveniosIncluidos: action.payload
            }
        case SET_LOADING_CONVENIOS_INCLUIDOS:
            return {
                ...state,
                loadingConveniosIncluidos: action.payload
            }
        case GET_LISTADO_MODULOS:
            return {
                ...state,
                modulosListado: action.payload
            }
        case SET_LOADING_LISTADO_MODULOS:
            return {
                ...state,
                loadingListadoModulo: action.payload
            }
        case SET_LOADING_IMPACTAR_CONVENIOS:
            return {
                ...state,
                loadingImpactarConvenios: action.payload
            }
        default:
            return state;
    }
}

export default moduloConvenio