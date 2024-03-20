import {
    SET_REQUEST_CONVENIO,
    SET_CONVENIO_ACTUAL, SET_LOADING_CONVENIO_ACTUAL, SET_ERROR_CONVENIO_ACTUAL,
    SET_PN, SET_LOADING_PN, SET_ERROR_PN,
    SET_PNN, SET_LOADING_PNN, SET_ERROR_PNN,
    SET_PNBU, SET_LOADING_PNBU, SET_ERROR_MODULOS,
    SET_MODULOS, SET_LOADING_MODULOS, SET_ERROR_PNBU,
    SET_CONVENIO_HISTORICO, SET_LOADING_CONVENIO_HISTORICO, SET_ERROR_CONVENIO_HISTORICO,
    SET_CONVENIO_FUTURO, SET_LOADING_CONVENIO_FUTURO, SET_ERROR_CONVENIO_FUTURO,
    SET_PRESTACIONES_PREQUIRUGICAS, SET_LOADING_PRESTACIONES_PREQUIRURGICAS
} from '../actionTypes'

const initialState = {
    request: null,
    convenioActual: null, loadingConvenioActual: false, errorConvenioActual: false,
    pn: null, loadingPN: false, errorPN: false,
    pnn: null, loadingPNN: false, errorPNN: false,
    pnbu: null, loadingPNBU: false, errorPNBU: false,
    modulos: null, loadingModulos: false, errorModulos: false,
    convenioHistorico: null, loadingConvenioHistorico: false, errorConvenioHistorico: false,
    convenioFuturo: null, loadingConvenioFuturo: false, errorConvenioFuturo: false,
    prestacionesPreQx: null, loadingPrestacionesPrequirurgicas: false
}

const convenio = (state = initialState, action) => {
    switch (action.type) {
        case SET_REQUEST_CONVENIO:
            return {
                ...state,
                request: action.payload
            }
        case SET_CONVENIO_ACTUAL:
            return {
                ...state,
                convenioActual: action.payload
            }
        case SET_LOADING_CONVENIO_ACTUAL:
            return {
                ...state,
                loadingConvenioActual: action.payload
            }
        case SET_ERROR_CONVENIO_ACTUAL:
            return {
                ...state,
                errorConvenioActual: action.payload
            }
        case SET_PN:
            return {
                ...state,
                pn: action.payload
            }
        case SET_LOADING_PN:
            return {
                ...state,
                loadingPN: action.payload
            }
        case SET_ERROR_PN:
            return {
                ...state,
                errorPN: action.payload
            }
        case SET_PNN:
            return {
                ...state,
                pnn: action.payload
            }
        case SET_LOADING_PNN:
            return {
                ...state,
                loadingPNN: action.payload
            }
        case SET_ERROR_PNN:
            return {
                ...state,
                errorPNN: action.payload
            }
        case SET_PNBU:
            return {
                ...state,
                pnbu: action.payload
            }
        case SET_LOADING_PNBU:
            return {
                ...state,
                loadingPNBU: action.payload
            }
        case SET_ERROR_PNBU:
            return {
                ...state,
                errorPNBU: action.payload
            }
        case SET_MODULOS:
            return {
                ...state,
                modulos: action.payload
            }
        case SET_LOADING_MODULOS:
            return {
                ...state,
                loadingModulos: action.payload
            }
        case SET_ERROR_MODULOS:
            return {
                ...state,
                errorModulos: action.payload
            }
        case SET_CONVENIO_HISTORICO:
            return {
                ...state,
                convenioHistorico: action.payload
            }
        case SET_LOADING_CONVENIO_HISTORICO:
            return {
                ...state,
                loadingConvenioHistorico: action.payload
            }
        case SET_ERROR_CONVENIO_HISTORICO:
            return {
                ...state,
                errorConvenioHistorico: action.payload
            }
        case SET_CONVENIO_FUTURO:
            return {
                ...state,
                convenioFuturo: action.payload
            }
        case SET_LOADING_CONVENIO_FUTURO:
            return {
                ...state,
                loadingConvenioFuturo: action.payload
            }
        case SET_ERROR_CONVENIO_FUTURO:
            return {
                ...state,
                errorConvenioFuturo: action.payload
            }
        case SET_PRESTACIONES_PREQUIRUGICAS:
            return {
                ...state,
                prestacionesPreQx: action.payload
            }
        case SET_LOADING_PRESTACIONES_PREQUIRURGICAS:
            return {
                ...state,
                loadingPrestacionesPrequirurgicas: action.payload
            }
        default:
            return state;
    }
}

export default convenio