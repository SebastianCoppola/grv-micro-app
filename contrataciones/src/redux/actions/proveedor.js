import {
    SET_LOADING_VALIDACION_CUIT,
    FIND_TIPOS_PROVEEDOR_DATOS,
    SET_LISTAR_SUBPRESTADORES,
    SET_DATA_CONTACTOS,
    SET_LOADING_BUSQUEDA_CONTACTOS,
    SET_LOADING_LISTAR_SUBPRESTADORES,
    SET_PROVEEDORES_CONVENIO,
    SET_LOADING_PROVEEDORES_CONVENIO,
    SET_ERROR_PROVEEDORES_CONVENIO,
    SET_LOADING_SAVE_PRESTADOR,
    SET_PROVEEDOR_TRASLADO_ACTIVO
} from '../actionTypes'

import {
    FECTH_URL_CAMBIO_ESTADO_PROVEEDOR,
    FECTH_URL_VALIDACION_CUIT,
    FECTH_URL_SAVE_PROVEEDOR,
    FETCH_URL_FIND_TIPOS_PROVEEDOR_DATOS,
    FETCH_URL_LISTAR_SUBPRESTADOR,
    FETCH_URL_SAVE_ALL_PROVEEDOR,
    FETCH_URL_SAVE_SUBPRESTADOR,
    FETCH_URL_ESTADO_SUBPRESTADOR,
    FETCH_URL_FIND_CONTACTOS,
    FETCH_URL_SAVE_CONTACTOS,
    FETCH_URL_DELETE_CONTACTOS,
    FETCH_URL_UPDATE_CONTACTOS,
    FETCH_URL_UPDATE_SUBPRESTADOR,
    FETCH_URL_PROVEEDOR_CONVENIO_ACTIVO
} from '../../Utils/urls'


//CAMBIAR ESTADO PROVEEDOR:
export const cambiarEstadoProveedor = (request, callback, row) => {
    return () => {
        fetch(FECTH_URL_CAMBIO_ESTADO_PROVEEDOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, row)
                        } else {
                            callback(false, row)
                        }
                    }).catch(err => {
                        callback(false, row)

                    })
            })
            .catch(err => {
                callback(false, row)

            })
    }
}


//VALIDAR CUIT:
const setLoadingVaidacionCuit = (data) => {
    return {
        type: SET_LOADING_VALIDACION_CUIT,
        payload: data
    }
}
export const validacionCuit = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingVaidacionCuit(true))
        fetch(FECTH_URL_VALIDACION_CUIT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data.body)
                            dispatch(setLoadingVaidacionCuit(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingVaidacionCuit(false))
                        }
                    }).catch(err => {
                        callback(false)
                        dispatch(setLoadingVaidacionCuit(false))
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingVaidacionCuit(false))
            })
    }
}


//SAVE PROVEEDOR:
export const saveProveedor = (request, callback) => {
    return () => {
        fetch(FECTH_URL_SAVE_PROVEEDOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 201) {
                            callback(true)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                callback(false)
            })
    }
}


//GET TIPOS PROVEEDOR:
const setTiposProveedorDatos = (data) => {
    return {
        type: FIND_TIPOS_PROVEEDOR_DATOS,
        payload: data
    }
}
export const findTiposProveedorDatos = (request) => {
    return dispatch => {
        fetch(FETCH_URL_FIND_TIPOS_PROVEEDOR_DATOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            dispatch(setTiposProveedorDatos(data.body));

                        }
                    })
            })
            .catch(err => {

            })
    }
}


//SET TIPOS PROVEEDOR:
export const setTipoProveedorDatosNull = () => {
    return {
        type: FIND_TIPOS_PROVEEDOR_DATOS,
        payload: null
    }
}


//SET SUBPRESTADORES:
const setListarSubprestadores = data => {
    return {
        type: SET_LISTAR_SUBPRESTADORES,
        payload: data
    }
}
const setLoadingSubprestador = (data) => {
    return {
        type: SET_LOADING_LISTAR_SUBPRESTADORES,
        payload: data
    }
}
export const searchListarSubprestadores = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingSubprestador(true))
        fetch(FETCH_URL_LISTAR_SUBPRESTADOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data && data.status === 200) {
                        dispatch(setListarSubprestadores(data.body))
                        if(errorCallback) errorCallback(false)
                        dispatch(setLoadingSubprestador(false))
                    } else if(data && data.status === 404){
                        dispatch(setListarSubprestadores([]))
                        if(errorCallback) errorCallback(false)
                        dispatch(setLoadingSubprestador(false))
                    } else {
                        dispatch(setListarSubprestadores([]))
                        if(errorCallback) errorCallback(true)
                        dispatch(setLoadingSubprestador(false))
                    }
                })).catch(() => {
                    dispatch(setListarSubprestadores([]))
                    if(errorCallback) errorCallback(true)
                    dispatch(setLoadingSubprestador(false))
                })
    }
}


//GET CONTACTOS:
const setDataContactos = (data) => {
    return {
        type: SET_DATA_CONTACTOS,
        payload: data
    }
}
const setLoadingBusquedaListadoContactos = (data) => {
    return {
        type: SET_LOADING_BUSQUEDA_CONTACTOS,
        payload: data
    }
}
export const busquedaContactos = (request) => {
    return dispatch => {
        dispatch(setLoadingBusquedaListadoContactos(true))
        fetch(FETCH_URL_FIND_CONTACTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataContactos(data.body))
                        } else {
                            dispatch(setDataContactos([]))
                        }
                        dispatch(setLoadingBusquedaListadoContactos(false))
                    }).catch(err => {
                        dispatch(setLoadingBusquedaListadoContactos(false))
                    })
            })
            .catch(err => {
                dispatch(setLoadingBusquedaListadoContactos(false))
            })
    }
}


//SAVE CONTACTO:
export const saveContacto = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingVaidacionCuit(true))
        fetch(FETCH_URL_SAVE_CONTACTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 201) {
                            callback(true)
                            dispatch(setLoadingVaidacionCuit(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingVaidacionCuit(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingVaidacionCuit(false))
            })
    }
}


//DELETE CONTACTO:
export const deleteContacto = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingVaidacionCuit(true))
        fetch(FETCH_URL_DELETE_CONTACTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingVaidacionCuit(false))
                            callback(true)
                        } else {
                            dispatch(setLoadingVaidacionCuit(false))
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                dispatch(setLoadingVaidacionCuit(false))
                callback(false)
            })
    }
}


//UPDATE CONTACTO:
export const updateContacto = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingVaidacionCuit(true))
        fetch(FETCH_URL_UPDATE_CONTACTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingVaidacionCuit(false))
                            callback(true)
                        } else {
                            dispatch(setLoadingVaidacionCuit(false))
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                dispatch(setLoadingVaidacionCuit(false))
                callback(false)
            })
    }
}


//SAVE PROVEEDOR:
const setLoadingSaveProveedor = (bool) => {
    return {
        type: SET_LOADING_SAVE_PRESTADOR,
        payload: bool
    }
}
export const saveProveedorEdit = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveProveedor(true))
        fetch(FETCH_URL_SAVE_ALL_PROVEEDOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            callback(true)
                            dispatch(setLoadingSaveProveedor(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingSaveProveedor(false))
                        }
                    })
            })
            .catch(() => {
                callback(false)
                dispatch(setLoadingSaveProveedor(false))
            })
    }
}


//SAVE SUBPRESTADOR:
export const saveSubPrestador = (request, callback) => {
    return () => {
        fetch(FETCH_URL_SAVE_SUBPRESTADOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            callback(true)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                callback(false)
            })
    }
}


//CABIAR ESTADO SUBPRESTADOR:
export const cambiarEstadoSubPrestador = (request, callback, row) => {
    return () => {
        fetch(FETCH_URL_ESTADO_SUBPRESTADOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, row)
                        } else {
                            callback(false, row)
                        }
                    }).catch(err => {
                        callback(false, row)

                    })
            })
            .catch(err => {
                callback(false, row)
            })
    }
}


//UPDATE PRESTADOR:
export const updateSubPrestador = (request, callback) => {
    return () => {
        fetch(FETCH_URL_UPDATE_SUBPRESTADOR, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            callback(true)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(() => {
                callback(false)
            })
    }
}


//FETCH PROVEEDOR CON CONVENIO ACTIVO: 
const setProveedoresConvenio = (data) => {
    return {
        type: SET_PROVEEDORES_CONVENIO,
        payload: data
    }
}
const setLoadingProveedoresConvenio = (boolean) => {
    return {
        type: SET_LOADING_PROVEEDORES_CONVENIO,
        payload: boolean
    }
}
const setErrorProveedoresConvenio = (boolean) => {
    return {
        type: SET_ERROR_PROVEEDORES_CONVENIO,
        payload: boolean
    }
}
export const fetchProveedoresConvenioActivo = (request) => {
    return dispatch => {
        dispatch(setLoadingProveedoresConvenio(true))
        fetch(FETCH_URL_PROVEEDOR_CONVENIO_ACTIVO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                .then(data => {
                    if (data && data.status === 200 && data.body && data.body.length > 0) {
                        dispatch(setProveedoresConvenio(data.body))
                        dispatch(setErrorProveedoresConvenio(false))
                        dispatch(setLoadingProveedoresConvenio(false))
                    }else{
                        dispatch(setProveedoresConvenio(null))
                        dispatch(setErrorProveedoresConvenio(true))
                        dispatch(setLoadingProveedoresConvenio(false))
                    }
                })
            })
            .catch(err => {
                dispatch(setProveedoresConvenio(null))
                dispatch(setErrorProveedoresConvenio(true))
                dispatch(setLoadingProveedoresConvenio(false))
            })
    }
}

//SET_PROVEEDOR_TRASLADO_ACTIVO
export const setProveedorTrasladoActivo = (data) => {
    return{
        type : SET_PROVEEDOR_TRASLADO_ACTIVO,
        payload : data
    }
}