import {
    SET_DENUNCIA,
    SET_LOADING_DENUNCIA,
    SET_DATA_PRESTADOR,
    LOADING_BUSQUEDA_PRESTADOR,
    SET_DATA_PRESTADORES_BUSCADOR,
    SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
} from '../actionTypes'

const initialState = {
    denuncia: null,
    loadingDenuncia: false,
    dataPrestadores: [], 
    loadingBusquedaPrestador: false,
    dataPrestadoresBuscador: [],
    loadingBusquedaPrestadorBuscador: false,
}

const documentos = (state = initialState, action) => {
    switch (action.type) {
        case SET_DENUNCIA:
            return {
                ...state,
                denuncia: action.payload
            }
        case SET_LOADING_DENUNCIA:
            return {
                ...state,
                loadingDenuncia: action.payload
            }
        case SET_DATA_PRESTADOR:
            return {
                ...state,
                dataPrestadores: action.payload
            }
        case LOADING_BUSQUEDA_PRESTADOR:
            return {
                ...state,
                loadingBusquedaPrestador: action.payload
            }
        case SET_DATA_PRESTADORES_BUSCADOR:
            return {
                ...state,
                dataPrestadoresBuscador: action.payload
            }
        case SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR:
            return {
                ...state,
                loadingBusquedaPrestadorBuscador: action.payload
            }
        default:
            return state
    }
}

export default documentos