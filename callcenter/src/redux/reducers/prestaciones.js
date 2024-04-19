import {
    SET_LISTADO_PRESTACIONES_NO_NOMENCLADAS,
    SET_LISTADO_PRESTACIONES_NOMENCLADAS,
    SET_LOADING_LISTAR_PRESTACIONES,
    SET_ERROR_LISTAR_PRESTACIONES,
    SET_LOADING_ADD_EDIT_PRESTACIONES_NO_NOMENCLADAS,
    SET_PRESTACIONES_PROVEEDOR,
    SET_LOADING_PRESTACIONES_PROVEEDOR,
    SET_ERROR_PRESTACIONES_PROVEEDOR,
    LOADING_BUSQUEDA_PRESTACIONES,
    SET_DATA_PRESTACIONES,
} from "../actionTypes"

const initialState = {
    prestacionesNomencladas: [],
    prestacionesNoNomencladas: [],
    loadingListarPrestaciones: false,
    errorListarPrestaciones: false,
    loadingAddEditPrestacionesNoNomencladas: false,
    prestacionesProveedor: [], 
    loadingPrestacionesProveedor: false, 
    errorPrestacionesProveedor: false,
    loadingBusquedaPrestaciones: false,
    dataPrestaciones: []
}

const prestaciones = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTADO_PRESTACIONES_NOMENCLADAS:
            return {
                ...state,
                prestacionesNomencladas: action.payload
            }
        case SET_LISTADO_PRESTACIONES_NO_NOMENCLADAS:
            return {
                ...state,
                prestacionesNoNomencladas: action.payload
            }
        case SET_LOADING_LISTAR_PRESTACIONES:
            return {
                ...state,
                loadingListarPrestaciones: action.payload
            }
        case SET_ERROR_LISTAR_PRESTACIONES:
            return {
                ...state,
                errorListarPrestaciones: action.payload
            }
        case SET_LOADING_ADD_EDIT_PRESTACIONES_NO_NOMENCLADAS:
            return {
                ...state,
                loadingAddEditPrestacionesNoNomencladas: action.payload
            }
        case SET_PRESTACIONES_PROVEEDOR:
            return {
                ...state,
                prestacionesProveedor: action.payload
            }
        case SET_LOADING_PRESTACIONES_PROVEEDOR:
            return {
                ...state,
                loadingPrestacionesProveedor: action.payload
            }
        case SET_ERROR_PRESTACIONES_PROVEEDOR:
            return {
                ...state,
                errorPrestacionesProveedor: action.payload
            }
        case LOADING_BUSQUEDA_PRESTACIONES:
            return {
                ...state,
                loadingBusquedaPrestaciones: action.payload
            }
        case SET_DATA_PRESTACIONES:
            return {
                ...state,
                dataPrestaciones: action.payload
            }
        default:
            return state
    }
}

export default prestaciones