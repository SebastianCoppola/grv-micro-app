import {
    SET_LOADING_TRASLADOS, 
    SET_TRASLADOS_COMPLETOS, 
    SET_TRASLADOS_GENERAL,
    SET_SERVICIOS_TRASLADOS, 
    SET_AGENCIA_TRASLADOS, 
    SET_DETALLE_TRASLADO,
    SET_EXPORTAR_TRASLADO,
    SET_EXPORTAR_TRASLADO_DONE
} from '../actionTypes'

import {
    FECTH_URL_SEARCH_TRASLADOS,
    FETCH_URL_ELIMINAR_TRASLADO,
    FETCH_URL_CONFIRMAR_TRASLADO,
    FETCH_URL_SERVICIOS_TRASLADOS,
    FETCH_URL_GUARDAR_TRASLADO,
    FETCH_URL_DETALLE_TRASLADOS,
    FETCH_BUSCAR_PROVEEDORES,
    FECTH_URL_TRASLADO_DESCARGAR,
    FECTH_URL_TRASLADO_OBSERVACION
} from '../../Urls/callCenter'

import {
    ERROR_SERVICIO_ELIMINAR_TRASLADO,
    ELIMINAR_TRASLADO_OK, 
    SNACK_SEVERITY, 
    CREACION_TRASLADO_OK, 
    CREACION_TRASLADO_ERROR, 
    CONFIRMACION_TRASLADO_OK, 
    CONFIRMACION_TRASLADO_ERROR,
} from '../../Utils/const'


//LOADING TODO:
const setLoading = (data) => {
    return {
        type: SET_LOADING_TRASLADOS,
        payload: data
    }
}


//GET TRASLADO GENERAL:
const setTrasladosGeneral = (data) => {
    return {
        type: SET_TRASLADOS_GENERAL,
        payload: data
    }
}
export const searchtTrasladosGeneral = (request) => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch(FECTH_URL_SEARCH_TRASLADOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setTrasladosGeneral(data && data.body ? data.body : []))
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//GET TRASLADO:
const setTrasladosCompletos = (data) => {
    return {
        type: SET_TRASLADOS_COMPLETOS,
        payload: data
    }
}
export const searchtTrasladosCompleto = (request) => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch(FECTH_URL_SEARCH_TRASLADOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setTrasladosCompletos(data && data.body ? data.body : []))
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//DELETE TRASLADO:
export const eliminarTraslado = (idTraslado, success) => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch(FETCH_URL_ELIMINAR_TRASLADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idTraslado: idTraslado })
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (success && data && data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, ELIMINAR_TRASLADO_OK)
                        } else {
                            success(SNACK_SEVERITY.ERROR, data.message ? data.message : ERROR_SERVICIO_ELIMINAR_TRASLADO)
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//CONFIRMAR TRASLADO:
export const confirmarTraslado = (request, success) => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch(FETCH_URL_CONFIRMAR_TRASLADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, CONFIRMACION_TRASLADO_OK)
                        } else {
                            success(SNACK_SEVERITY.ERROR, data.message ? data.message : CONFIRMACION_TRASLADO_ERROR)
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//GET SERVICIOS:
const setServiciosTraslados = (data) => {
    let list = []
    for (var i in data) {
        let clone = {
            ...data[i],
            verificado: false
        }
        list.push(clone);
    }
    return {
        type: SET_SERVICIOS_TRASLADOS,
        payload: list
    }
}
export const fetchServicios = () => {
    return dispatch => {
        dispatch(setLoading(true));
        fetch(FETCH_URL_SERVICIOS_TRASLADOS, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.body) {
                            dispatch(setServiciosTraslados(data.body))
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//SAVE TRASLADO:
export const creacionTraslado = (request, success) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FETCH_URL_GUARDAR_TRASLADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status == 200 && success) {
                            success(true, SNACK_SEVERITY.SUCCESS, CREACION_TRASLADO_OK)
                        } else {
                            success(false, SNACK_SEVERITY.ERROR, CREACION_TRASLADO_ERROR)
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//GET AGENCIAS TRASLADO:
const setAgenciaTraslados = (data) => {
    return {
        type: SET_AGENCIA_TRASLADOS,
        payload: data
    }
}
export const fetchAgenciasTraslado = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FETCH_BUSCAR_PROVEEDORES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.body) {
                            dispatch(setAgenciaTraslados(data.body))
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}


//GET DETALLE TRASLADO:
const setDetalleTraslado = (data) => {
    return {
        type: SET_DETALLE_TRASLADO,
        payload: data
    }
}
export const fetchDetalleTraslado = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FETCH_URL_DETALLE_TRASLADOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idTraslado: request })
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.body) {
                            dispatch(setDetalleTraslado(data.body))
                        }
                        dispatch(setLoading(false));
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false));
            })
    }
}

//GET DATOS TRASLADO PARA EXPORTAR:
const setExportarTraslado = (data) => {
    return {
        type: SET_EXPORTAR_TRASLADO,
        payload: data
    }
}
//GET DATOS TRASLADO PARA EXPORTAR:
export const clearExportarTraslado = () => {
    return {
        type: SET_EXPORTAR_TRASLADO_DONE,
        payload: null
    }
}
//BUSCAR TRASLADOS PARA DESCARGAR:
export const getTrasladosDescargar = (request, callback) => {
    return dispatch => {
        const error = (bool) => {
            dispatch(setLoading(false))
            callback(bool)
        }
        dispatch(setLoading(true))
        fetch(FECTH_URL_TRASLADO_DESCARGAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setLoading(false));
                        if (data.status === 200) {
                            dispatch(setExportarTraslado(data.body))
                        } else {
                             error(true) 
                        }
                    }).catch(() => {
                        error(true) 
                    })
            })
            .catch(() => {
                 error(true)
            })
    } 
}

export const fetchSaveObservacion = (request, cb) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_TRASLADO_OBSERVACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(() => {
                        if(cb) cb(true)
                        dispatch(setLoading(false))
                    })
            })
            .catch(() => {
                if(cb) cb(false)
                dispatch(setLoading(false))
            })
    }
}

