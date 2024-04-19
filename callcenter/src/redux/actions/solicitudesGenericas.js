import {
    SET_SNACKBAR,
    SET_SOLICITUDES_GENERICAS,
    SET_LOADING_GENERICAS,
    SET_DATOS_SOLICITUD,
    SET_DATOS_SEGUIMIENTO,
    SET_DATOS_SOLICITUDES_MAS_INFO,
    SET_DATOS_SOLICITUDES_BY_DENUNCIA,
    SET_LOADING_DATOS_TABLA_SOLICITUDES_BY_DENUNCIA,
    SET_TODAS_SG,
    SET_SOLICITUD_SELECCIONADA,
    SET_USUARIO_ACTIVO,
    SET_DATA_NOTIFICACIONES_MAS_INFO, 
    SET_LOADING_NOTIFICACIONES_MAS_INFO, 
    SET_ERROR_NOTIFICACIONES_MAS_INFO,
    SET_DATOS_SOLICITUD_DRAWER_NOTIFICACIONES,
    SET_DETALLE_NOTIFICACIONES_MAS_INFO, 
    SET_LOADING_DETALLE_NOTIFICACIONES_MAS_INFO, 
    SET_ERROR_DETALLE_NOTIFICACIONES_MAS_INFO,
    SET_SOLICITANTE_GESTOR_AREA, 
    SET_CANTIDAD_SOLICITUDES,
    SET_PERSONAS_BY_AREA, 
    SET_LOADING_SEGUIMIENTO, 
    SET_ACTUALIZAR_DATA_TABLA_SOLICITUDES, 
    SET_LOADING_AUTOSUGGEST, 
    SET_MAS_INFO_SELECCIONADA, 
    SET_CANTIDAD_SOLICITUDES_GENERICAS, 
    SET_LOADING_CABECERA_SOLICITUDES,
    SET_CANTIDAD_NOTIFICACIONES_MAS_INFO,
    ACTUALIZAR_NOTIFICACIONES,
    SET_DATOS_SOLICITUD_MAS_INFO,
    ACTUALIZAR_DATA_MAS_INFO,
    SET_NOTIFICACION_TE_RESPONDIERON,
    SET_AREAS_DE_GESTION,
    SET_TIPOS_SOLICITUD,
    SET_NOTIFICACIONES_GENERALES,
    SET_EXISTEN_SG_SIN_ASIGNAR,
    SET_DATOS_BUSQUEDA_SG_CON_RETORNO
} from '../actionTypes'

import {
    FECTH_URL_SEARCH_SOLICITUDES_GENERICAS,
    FETCH_ASIGNAR_SOLICITUDES_GENERICAS,
    FETCH_DESAASIGNAR_SOLICITUDES_GENERICAS,
    FETCH_CERRAR_SOLICITUD_GENERICA,
    FETCH_MARCAR_VISTA_SOLICITUD_GENERICA,
    FETCH_URL_SET_DATOS_SOLICITUD,
    FETCH_URL_SET_DATOS_SEGUIMIENTO,
    FETCH_URL_SOLICITUDES_MAS_INFO,
    FETCH_URL_SOLICITUD_MAS_INFO,
    FETCH_URL_SET_NUEVA_SOLICITUD,
    FETCH_URL_REABRIR_SOLICITUD,
    FETCH_URL_CALIFICAR_GESTION,
    FETCH_URL_DERIVAR_SOLICITUD,
    FETCH_URL_RECHAZAR_SOLICITUD,
    FETCH_URL_REASIGNAR_SOLICITUD,
    FETCH_URL_NUEVO_SEGUIMIENTO,
    FETCH_URL_GET_CANTIDAD_SOLICITUDES_GESTOR,
    FETCH_URL_NUEVA_MAS_INFO,
    FETCH_URL_RESPONDER_MAS_INFO,
    FETCH_URL_ASIGNAR_GESTOR_MAS_INFO,
    FETCH_URL_NOTIFICACIONES_MAS_INFO,
    FETCH_URL_MARCAR_MAS_INFO_COMO_VISTA,
    FETCH_URL_CANTIDAD_NOTIFICACIONES_MAS_INFO,
    FETCH_URL_CANTIDADES_SOLICITUD_GENERICAS,
    FETCH_URL_GET_SOLICITANTE_GESTOR_POR_AREA,
    FETCH_URL_PERSONAS_BY_AREA,
    FETCH_URL_AREAS_DE_GESTION,
    FETCH_URL_TIPOS_SOLICITUD,
    FETCH_URL_EXISTEN_SG_SIN_ASIGNAR,
} from '../../Urls/solicitudesGenericas'

import {
    SNACK_SEVERITY, 
    SOLICITUD_GENERICA_DESASIGNADA_OK,
    ERROR_SERVICIO_ASIGNAR_SOLICITUD_GENERICA,
} from '../../Utils/const'

//SNACKBAR:
export const setSnackBar = (payload) => ({ type: SET_SNACKBAR, payload })

//LOADING:
const setLoadingGenericas = (data) => {
    return {
        type: SET_LOADING_GENERICAS,
        payload: data
    }
}

//SOLICITUDES GENERICAS:
const setSolicitudesGenericas = (data) => {
    return {
        type: SET_SOLICITUDES_GENERICAS,
        payload: data
    }
}
export const searchSolicitudesGenericas = (request, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FECTH_URL_SEARCH_SOLICITUDES_GENERICAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            if(errorCallback) errorCallback(false)
                            dispatch(setLoadingGenericas(false))
                            dispatch(setSolicitudesGenericas({ objetos: data.body && data.body.objetos, cantidadTotal: data.body && data.body.cantidadTotal }))
                        } else if (data.status === 204){
                            if(errorCallback) errorCallback(false)
                            dispatch(setLoadingGenericas(false))
                            dispatch(setSolicitudesGenericas(null))
                        } else {
                            dispatch(setLoadingGenericas(false))
                            dispatch(setSolicitudesGenericas(null))
                            if(errorCallback) errorCallback(true)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
                errorCallback(true)
            })
    }
}
export const asignarSolicitudesGenericas = (request, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_ASIGNAR_SOLICITUDES_GENERICAS, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) cb(true)
                        else cb(false)
                        dispatch(setLoadingGenericas(false))
                    })
            })
            .catch(err => {
                console.log(err)
                cb(false)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const desasignarSolicitudesGenericas = (request, success) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_DESAASIGNAR_SOLICITUDES_GENERICAS, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (success && data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, SOLICITUD_GENERICA_DESASIGNADA_OK, false)
                        } else {
                            success(SNACK_SEVERITY.ERROR, data.message ? data.message : ERROR_SERVICIO_ASIGNAR_SOLICITUD_GENERICA, false)
                        }
                        dispatch(setLoadingGenericas(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const cerrarSolicitudGenerica = (request, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_CERRAR_SOLICITUD_GENERICA, {
            method: 'PATCH',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) { cb(true, null) }
                        else { cb(false, data.message) }
                        dispatch(setLoadingGenericas(false))
                    })
            })
            .catch(() => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const marcarComoVista = (request) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_MARCAR_VISTA_SOLICITUD_GENERICA, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setLoadingGenericas(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const setNuevaSolicitud = (req, cb) => {
    return dispatch => {
        fetch(FETCH_URL_SET_NUEVA_SOLICITUD, {
            method: 'POST',
            headers: {},
            body: req
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                }))
            .catch(err => cb(false))
    }
}
export const reabrirSolicitud = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_REABRIR_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true, data.message)
                    } else {
                        cb(false, data.message)
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const setCalificarGestion = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_CALIFICAR_GESTION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const derivarSolicitud = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_DERIVAR_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setLoadingGenericas(false))
                        cb(true, data.message)
                    }
                    else {
                        dispatch(setLoadingGenericas(false))
                        cb(false, data.message)
                    }
                }))
            .catch(err => {
                dispatch(setLoadingGenericas(false))
                cb(false)
            })
    }
}
export const rechazarSolicitud = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_RECHAZAR_SOLICITUD, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setLoadingGenericas(false))
                        cb(true, data.message)
                    } else {
                        dispatch(setLoadingGenericas(false))
                        cb(false, data.message)
                    }
                }))
            .catch(err => {
                dispatch(setLoadingGenericas(false))
                cb(false)
            })
    }
}
export const reasignarSolcitud = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_REASIGNAR_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    dispatch(setLoadingGenericas(false))
                    callback(true)
                } else {
                    dispatch(setLoadingGenericas(false))
                    callback(false)
                }
            })
            .catch(err => {
                dispatch(setLoadingGenericas(false))
                callback(false)
            })
    }
}
export const nuevoSeguimiento = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_NUEVO_SEGUIMIENTO, {
            method: 'POST',
            headers: {},
            body: req
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })

    }
}

//MODAL CONSULTAR TODAS LAS SG:
const setTodasSG = (data) => {
    return {
        type: SET_TODAS_SG,
        payload: data
    }
}
export const searchTodasSG = (request) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FECTH_URL_SEARCH_SOLICITUDES_GENERICAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingGenericas(false))
                            dispatch(setTodasSG({ objetos: data.body && data.body.objetos, cantidadTotal: data.body && data.body.cantidadTotal }))
                        } else {
                            dispatch(setLoadingGenericas(false))
                            dispatch(setTodasSG({ objetos: [], cantidadTotal: 0 }))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const clearTodasSG = () => {
    return dispatch => {
        dispatch(setTodasSG({ objetos: [], cantidadTotal: 0 }))
    }
}

//DATOS SG:
const setDatosSolicitud = (data) => {
    return {
        type: SET_DATOS_SOLICITUD,
        payload: data
    }
}
export const searchDatosSolicitud = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_SET_DATOS_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDatosSolicitud(data.body))
                        dispatch(setLoadingGenericas(false))
                        cb(false)
                    } else {
                        dispatch(setLoadingGenericas(false))
                        dispatch(setDatosSolicitud(null))
                        cb(true)
                    }
                }))
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
                dispatch(setDatosSolicitud(null))
                cb(false)
            })
    }
}
export const clearDatosSolicitud = () => {
    return dispatch => {
        dispatch(setDatosSolicitud(null))
    }
}

//DATOS SEGUIMIENTO SG:
const setDatosSeguimiento = data => {
    return {
        type: SET_DATOS_SEGUIMIENTO,
        payload: data
    }
}
const setLoadingSeguimiento = boolean => {
    return {
        type: SET_LOADING_SEGUIMIENTO,
        payload: boolean
    }
}
export const searchDatosSeguimiento = (req) => {
    return dispatch => {
        dispatch(setLoadingSeguimiento(true))
        fetch(FETCH_URL_SET_DATOS_SEGUIMIENTO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setLoadingSeguimiento(false))
                        dispatch(setDatosSeguimiento(data.body))
                    }
                }))
            .catch(err => {
                dispatch(setLoadingSeguimiento(false))
                console.log(err)
            })
    }
}
export const clearDatosSeguimientos = () => {
    return dispatch => dispatch(setDatosSeguimiento(null))
}

//DATOS SOLICITUDES MAS INFO:
const setDataSolicitudesMasInfo = data => {
    return {
        type: SET_DATOS_SOLICITUDES_MAS_INFO,
        payload: data
    }
}
export const searchDatosSolicitudesMasInfo = (req) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_SOLICITUDES_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDataSolicitudesMasInfo(data.body))
                    } else {
                        dispatch(setDataSolicitudesMasInfo(null))
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                dispatch(setLoadingGenericas(false))
                dispatch(setDataSolicitudesMasInfo(null))
                console.log(err)
            })
    }
}
export const clearDatosSolicitudesMasInfo = () => {
    return dispatch => dispatch(setDataSolicitudesMasInfo(null))
}
export const asignarGestorSolicitudMasInfo = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_ASIGNAR_GESTOR_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (cb && data.status === 200) {
                            cb(true)
                        } else {
                            cb(false)
                        }
                        dispatch(setLoadingGenericas(false))
                    })
            })
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })
    }
}
export const responderSolicitudMasInfo = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_RESPONDER_MAS_INFO, {
            method: 'POST',
            headers: {},
            body: req
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })

    }
}
export const createSolicitudMasInfo = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_NUEVA_MAS_INFO, {
            method: 'POST',
            headers: {},
            body: req
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                    dispatch(setLoadingGenericas(false))
                }))
            .catch(err => {
                cb(false)
                dispatch(setLoadingGenericas(false))
            })

    }
}

//NOTIFICACIONES MAS INFO:
const setDataNotificacionesMasInfo = data => {
    return {
        type: SET_DATA_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
const setLoadingNotificacionesMasInfo = data => {
    return {
        type: SET_LOADING_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
export const setErrorNotificacionesMasInfo = data => {
    return {
        type: SET_ERROR_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
export const getDataNotificacionesMasInfo = (req) => {
    return dispatch => {
        dispatch(setLoadingNotificacionesMasInfo(true))
        fetch(FETCH_URL_NOTIFICACIONES_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDataNotificacionesMasInfo(data.body))
                        dispatch(setErrorNotificacionesMasInfo(false))
                    } else if (data.status === 204) {
                        dispatch(setDataNotificacionesMasInfo(data.body))
                        dispatch(setErrorNotificacionesMasInfo(false))
                    }
                    dispatch(setLoadingNotificacionesMasInfo(false))
                }))
            .catch(err => {
                dispatch(setErrorNotificacionesMasInfo(true))
                dispatch(setLoadingNotificacionesMasInfo(false))
            })
    }
}
export const clearDataNotificacionesMasInfo = () => {
    return dispatch => { dispatch(setDataNotificacionesMasInfo(null)) }
}
export const marcarMasInfoComoVista = (req) => {
    return () => {
        fetch(FETCH_URL_MARCAR_MAS_INFO_COMO_VISTA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    //console.log(data)
                })
            )
            .catch(err => {
                console.log(err)
            })
    }
}

//DETALLE NOTIFICACIONES MAS INFO
const setDetalleNotificacionesMasInfo = data => {
    return {
        type: SET_DETALLE_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
const setLoadingDetalleNotificacionesMasInfo = data => {
    return {
        type: SET_LOADING_DETALLE_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
export const setErrorDetalleNotificacionesMasInfo = data => {
    return {
        type: SET_ERROR_DETALLE_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
export const searchDetalleNotificacionesMasInfo = (req) => {
    return dispatch => {
        dispatch(setErrorDetalleNotificacionesMasInfo(false))
        dispatch(setLoadingDetalleNotificacionesMasInfo(true))
        fetch(FETCH_URL_SOLICITUDES_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDetalleNotificacionesMasInfo(data.body))
                        dispatch(setErrorDetalleNotificacionesMasInfo(false))
                    } else {
                        dispatch(setErrorDetalleNotificacionesMasInfo(true))
                    }
                    dispatch(setLoadingDetalleNotificacionesMasInfo(false))
                }))
            .catch(err => {
                dispatch(setErrorDetalleNotificacionesMasInfo(true))
                dispatch(setLoadingDetalleNotificacionesMasInfo(false))
            })
    }
}

//DATOS SOLICITUD MAS INFO:
const setDataSolicitudMasInfo = data => {
    return {
        type: SET_DATOS_SOLICITUD_MAS_INFO,
        payload: data
    }
}
export const getDataSolicitudMasInfo = (req) => {
    return dispatch => {
        dispatch(setLoadingDetalleNotificacionesMasInfo(true))
        fetch(FETCH_URL_SOLICITUD_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorDetalleNotificacionesMasInfo(false))
                        dispatch(setDataSolicitudMasInfo(data.body))
                    } else {
                        dispatch(setErrorDetalleNotificacionesMasInfo(true))
                        dispatch(setDataSolicitudMasInfo(null))
                    }
                    dispatch(setLoadingDetalleNotificacionesMasInfo(false))
                }))
            .catch(err => {
                dispatch(setLoadingDetalleNotificacionesMasInfo(false))
                dispatch(setErrorDetalleNotificacionesMasInfo(true))
                dispatch(setDataSolicitudMasInfo(null))
            })
    }
}
export const clearDataSolicitudMasInfo = () => {
    return dispatch => dispatch(setDataSolicitudMasInfo(null))
}

//CANTIDAD NOTIFICACIONES MAS INFO: 
const setCantidadNotificacionesMasInfo = data => {
    return {
        type: SET_CANTIDAD_NOTIFICACIONES_MAS_INFO,
        payload: data
    }
}
export const searchCantidadNotificacionesMasInfo = req => {
    return dispatch => {
        fetch(FETCH_URL_CANTIDAD_NOTIFICACIONES_MAS_INFO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setCantidadNotificacionesMasInfo(data.body))
                    } else {
                        dispatch(setCantidadNotificacionesMasInfo(null))
                    }
                }))
            .catch(err => {
                console.log(err)
                dispatch(setCantidadNotificacionesMasInfo(null))
            })
    }
}

//DATOS SG DRAWER NOTIFICACIONES:
const setDatosSGDrawerNotificaciones = (data) => {
    return {
        type: SET_DATOS_SOLICITUD_DRAWER_NOTIFICACIONES,
        payload: data
    }
}
export const getDatosSGDrawerNotificaciones = (req) => {
    return dispatch => {
        dispatch(setLoadingGenericas(true))
        fetch(FETCH_URL_SET_DATOS_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDatosSGDrawerNotificaciones(data.body))
                        dispatch(setLoadingGenericas(false))
                    } else {
                        dispatch(setLoadingGenericas(false))
                        dispatch(setDatosSGDrawerNotificaciones(null))
                    }
                }))
            .catch(err => {
                console.log(err)
                dispatch(setLoadingGenericas(false))
                dispatch(setDatosSGDrawerNotificaciones(null))
            })
    }
}
export const clearDatosSGDrawerNotificaciones = () => {
    return dispatch => {
        dispatch(setDatosSGDrawerNotificaciones(null))
    }
}

//DATOS DENUNCIA:
const setDatosByDenuncia = data => {
    return {
        type: SET_DATOS_SOLICITUDES_BY_DENUNCIA,
        payload: data
    }
}
const setLoadingDatosByDenuncia = boolean => {
    return {
        type: SET_LOADING_DATOS_TABLA_SOLICITUDES_BY_DENUNCIA,
        payload: boolean
    }
}
export const searchDatosSolicitudesByDenuncia = (req) => {
    return dispatch => {
        dispatch(setLoadingDatosByDenuncia(true))
        fetch(FECTH_URL_SEARCH_SOLICITUDES_GENERICAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDatosByDenuncia(data.body))
                        dispatch(setLoadingDatosByDenuncia(false))
                    } else {
                        dispatch(setDatosByDenuncia(null))
                        dispatch(setLoadingDatosByDenuncia(false))
                    }
                }))
            .catch(err => {
                dispatch(setLoadingDatosByDenuncia(false))
                console.log(err)
            })
    }
}

//SOLICITANTE-GESTOR-AREAS
const setSolicitanteGestorArea = (data) => {
    return {
        type: SET_SOLICITANTE_GESTOR_AREA,
        payload: data
    }
}
export const searchSolicitanteGestorArea = (req) => {
    return dispatch => {
        fetch(FETCH_URL_GET_SOLICITANTE_GESTOR_POR_AREA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setSolicitanteGestorArea(data.body))
                    }
                }))
            .catch(err => console.log(err))
    }
}
const setCantidadSolicitudesPorGestor = data => {
    return {
        type: SET_CANTIDAD_SOLICITUDES,
        payload: data
    }
}
export const searchCantidadSolicitudesPorGestor = (req) => {
    return dispatch => {
        dispatch(clearDatosCantidadSolicitudes())
        fetch(FETCH_URL_GET_CANTIDAD_SOLICITUDES_GESTOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setCantidadSolicitudesPorGestor(data.body))
                    }
                }))
            .catch(err => console.log(err))
    }
}
const setLoadingAutoSuggest = bool => {
    return {
        type: SET_LOADING_AUTOSUGGEST,
        payload: bool
    }
}
const setPersonasByArea = (data) => {
    return {
        type: SET_PERSONAS_BY_AREA,
        payload: data
    }
}
export const searchPersonasByArea = (req) => {
    return dispatch => {
        dispatch(setLoadingAutoSuggest(true))
        fetch(FETCH_URL_PERSONAS_BY_AREA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setPersonasByArea(data.body))
                        dispatch(setLoadingAutoSuggest(false))
                    }
                }))
            .catch(err => {
                dispatch(setLoadingAutoSuggest(false))
                console.log(err)
            })
    }
}

//CANTIDAD SOLICITUDES GENERICAS
const setCantidadSolicitudesGenericas = (data) => {
    return {
        type: SET_CANTIDAD_SOLICITUDES_GENERICAS,
        payload: data
    }
}
const setLoadingCabecera = boolean => {
    return {
        type: SET_LOADING_CABECERA_SOLICITUDES,
        payload: boolean
    }
}
export const clearCantidadSolicitudesGenericas = () => {
    return dispatch => dispatch(setCantidadSolicitudesGenericas(null))
}
export const searchCantidadSolicitudesGenericas = (req) => {
    return dispatch => {
        dispatch(clearCantidadSolicitudesGenericas())
        dispatch(setLoadingCabecera(true))
        fetch(FETCH_URL_CANTIDADES_SOLICITUD_GENERICAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setLoadingCabecera(false))
                        dispatch(setCantidadSolicitudesGenericas(data.body))
                    } else {
                        dispatch(setLoadingCabecera(false))
                    }
                }))
            .catch(err => {
                console.log(err)
                dispatch(setLoadingCabecera(false))
            })
    }
}

//TIPO SOLICITUD
const setTipoSolicitud = (data) => {
    return {
        type: SET_TIPOS_SOLICITUD,
        payload: data
    }
}
export const searchTipoSolicitud = (req, errorCallback) => {
    return dispatch => {
        fetch(FETCH_URL_TIPOS_SOLICITUD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setTipoSolicitud(data.body))
                    } else {
                        dispatch(setTipoSolicitud(null))
                        if (errorCallback) errorCallback(true)
                    }
                }))
            .catch(() => {
                dispatch(setTipoSolicitud(null))
                if (errorCallback) errorCallback(true)
            })
    }
}
export const clearTipoSolicitud = () => {
    return dispatch => dispatch(setTipoSolicitud(null))
}

//AREAS DE GESTION
const setAreasDeGestion = (data) => {
    return {
        type: SET_AREAS_DE_GESTION,
        payload: data
    }
}
export const getAreasDeGestion = (req, errorCallback) => {
    return dispatch => {
        fetch(FETCH_URL_AREAS_DE_GESTION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setAreasDeGestion(data.body))
                    } else {
                        dispatch(setAreasDeGestion(null))
                        if (errorCallback) errorCallback(true)
                    }
                }))
            .catch(() => {
                dispatch(setAreasDeGestion(null))
                if (errorCallback) errorCallback(true)
            })
    }
}
export const clearAreasDeGestion = () => {
    return dispatch => dispatch(setAreasDeGestion(null))
}

//-----------------
//REDUCERS INTERNOS
//-----------------

//SOLICITUD ELEGIDA:
const setSGSeleccionada = data => {
    return {
        type: SET_SOLICITUD_SELECCIONADA,
        payload: data
    }
}
export const seleccionarSG = (req) => {
    return dispatch => {
        dispatch(setSGSeleccionada(req))
    }
}
export const clearSGSeleccionada = () => {
    return dispatch => {
        dispatch(setSGSeleccionada(null))
    }
}
//MAS INFO ELEGIDA:
const setMasInfoSeleccionada = data => {
    return {
        type: SET_MAS_INFO_SELECCIONADA,
        payload: data
    }
}
export const seleccionarMasInfo = (req) => {
    return dispatch => {
        dispatch(setMasInfoSeleccionada(req))
    }
}
export const clearMasInfoSeleccionada = () => {
    return dispatch => {
        dispatch(setMasInfoSeleccionada(null))
    }
}
//USUARIO ACTIVO:
const setearUsuarioActivo = data => {
    return {
        type: SET_USUARIO_ACTIVO,
        payload: data
    }
}
export const setUsuarioActivo = (data) => {
    return dispatch => dispatch(setearUsuarioActivo(data))
}
//Limpiar datos
export const clearDatosCantidadSolicitudes = () => {
    return dispatch => dispatch(setCantidadSolicitudesPorGestor(null))
}
//Guardar Busqueda SG para mantener luego de volver del detalle
const setBusquedaSGRetorno = data => {
    return {
        type: SET_DATOS_BUSQUEDA_SG_CON_RETORNO,
        payload: data
    }
}
export const guardarBusquedaSGRetorno = (req) => {
    return dispatch => {
        dispatch(setBusquedaSGRetorno(req))
    }
}
export const clearBusquedaSGRetorno = () => {
    return dispatch => {
        dispatch(setBusquedaSGRetorno(null))
    }
}
//Actualizar data
const actualizarData = bool => {
    return {
        type: SET_ACTUALIZAR_DATA_TABLA_SOLICITUDES,
        payload: bool
    }
}
export const actualizarDataSG = (boolean) => {
    return dispatch => dispatch(actualizarData(boolean))
}
export const actualizarDataMasInfo = () => {
    return {
        type: ACTUALIZAR_DATA_MAS_INFO
    }
}
export const actualizaNotificaciones = () => {
    return {
        type: ACTUALIZAR_NOTIFICACIONES
    }
}
export const setNotificacionTeRespondieron = (bool) => {
    return {
        type: SET_NOTIFICACION_TE_RESPONDIERON,
        payload: bool
    }
}
export const setNotificacionesGenerales = (bool) => {
    return {
        type: SET_NOTIFICACIONES_GENERALES,
        payload: bool
    }
}

//Existen SG Sin Asignar:
const setExistenSgSinAsignar = bool => {
    return {
        type: SET_EXISTEN_SG_SIN_ASIGNAR,
        payload: bool
    }
}
export const getExistenSgSinAsignar = req => {
    return dispatch => {
        fetch(FETCH_URL_EXISTEN_SG_SIN_ASIGNAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setExistenSgSinAsignar(data.body))
                    } else {
                        dispatch(setExistenSgSinAsignar(false))
                    }
                }))
            .catch(() => {
                dispatch(setExistenSgSinAsignar(false))
            })
    }
}