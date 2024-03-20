import {
    SET_LOADING_VALIDACION_CUIT,
    FIND_TIPOS_PROVEEDOR_DATOS,
    SET_DATA_CONTACTOS,
    SET_LOADING_BUSQUEDA_CONTACTOS,
    SET_LISTAR_SUBPRESTADORES,
    SET_LOADING_LISTAR_SUBPRESTADORES, 
    SET_PROVEEDORES_CONVENIO,
    SET_LOADING_PROVEEDORES_CONVENIO,
    SET_ERROR_PROVEEDORES_CONVENIO,
    SET_LOADING_SAVE_PRESTADOR,
    SET_PROVEEDOR_TRASLADO_ACTIVO
} from '../actionTypes'

const initialState = {
    loadingValidarCuit: false,
    tiposProveedorDatos: [],
    contactosByProveedor: null,
    tiposProveedorDatos: null,
    loadingBusquedaListadoContactos: false,
    listadoSubprestadores: [],
    loadingBusquedaListadoSubprestadores: false,
    proveedoresConvenio: null, 
    loadingProveedoresConvenio: false, 
    errorProveedoresConvenio: false,
    loadingSaveProveedor: false,
    setProveedorTrasladoActivo : null
}

const proveedor = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_VALIDACION_CUIT:
            return {
                ...state,
                loadingValidarCuit: action.payload
            }
        case FIND_TIPOS_PROVEEDOR_DATOS:
            return {
                ...state,
                tiposProveedorDatos: action.payload
            }
        case SET_DATA_CONTACTOS:
            return {
                ...state,
                contactosByProveedor: action.payload
            }
        case SET_LOADING_BUSQUEDA_CONTACTOS:
            return {
                ...state,
                loadingBusquedaListadoContactos: action.payload
            }
        case SET_LISTAR_SUBPRESTADORES:
            return {
                ...state,
                listadoSubprestadores: action.payload
            }
        case SET_LOADING_LISTAR_SUBPRESTADORES:
            return {
                ...state,
                loadingBusquedaListadoSubprestadores: action.payload
            }
        case SET_PROVEEDORES_CONVENIO:
            return {
                ...state,
                proveedoresConvenio: action.payload
            }
        case SET_LOADING_PROVEEDORES_CONVENIO:
            return {
                ...state,
                loadingProveedoresConvenio: action.payload
            }
        case SET_ERROR_PROVEEDORES_CONVENIO:
            return {
                ...state,
                errorProveedoresConvenio: action.payload
            }
        case SET_LOADING_SAVE_PRESTADOR:
            return {
                ...state, 
                loadingSaveProveedor: action.payload
            }
        case SET_PROVEEDOR_TRASLADO_ACTIVO:
            return{
                ...state,
                setProveedorTrasladoActivo:action.payload
            }
        default:
            return state;
    }
}

export default proveedor