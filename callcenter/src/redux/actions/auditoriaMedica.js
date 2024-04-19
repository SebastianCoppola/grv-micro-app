//ACTION TYPES:
import {
    SET_SNACKBAR_AUDITORIA,
    SET_REQUEST_FILTROS,
    CLEAR_REQUEST_FILTROS,
    SET_DATA_TABLERO_AM,
    SET_LOADING_TABLERO_AM,
    SET_DATA_INDICADORES_SINIESTROS,
    SET_LOADING_INDICADORES_SINIESTROS,
    SET_DATA_AUTORIZACIONES_PEDIENTES,
    SET_LOADING_AUTORIZACIONES_PEDIENTES,
    SET_DATA_SINIESTROS_ILT_VENCIDOS,
    SET_LOADING_SINIESTROS_ILT_VENCIDOS,
    SET_DATA_PRACTICAS_PENDIENTES_AUTORIZACION,
    SET_LOADING_PRACTICAS_PENDIENTES_AUTORIZACION,
    SET_DATA_NUEVOS_INGRESOS,
    SET_LOADING_NUEVOS_INGRESOS,
    SET_DATA_SINIESTROS_ACTIVOS,
    SET_LOADING_SINIESTROS_ACTIVOS,
    GET_CANTIDAD_NOTIFICACIONES_AM,
    SET_DATA_DETALLE_AUTORIZACION_PENDIENTE,
    SET_LOADING_DETALLE_AUTORIZACION_PENDIENTE,
    SET_DATA_MAT_QX_AUTORIZACION_PENDIENTE,
    SET_LOADING_MAT_QX_AUTORIZACION_PENDIENTE,
    SET_DATA_PEDIDO_MATERIALES_QX,
    SET_LOADING_PEDIDO_MATERIALES_QX,
    SET_DATA_MATERIALES_XQ_PEDIDO,
    SET_LOADING_MATERIALES_XQ_PEDIDO,
    SET_LOADING_SAVE_NUEVO_PROXIMO_CONTACTO,
} from '../actionTypes'

//URL:
import {
    URL_GET_CANTIDAD_NOTIFICACIONES_AM,
    URL_GET_DATA_TABLERO,
    URL_GET_INDICADORES_SINIESTROS,
    URL_GET_AUTORIZACIONES_PENDIENTES,
    URL_GET_SINIESTROS_ACTIVOS,
    URL_GET_SINIESTROS_ILT_VENCIDOS,
    URL_GET_NUEVOS_INGRESOS,
    URL_GET_MATERIALES_QX_AUTORIZACION,
    URL_DATOS_AUTORIZACIONES,
    URL_APROBAR_AUTORIZACION,
    URL_SET_MATERIALES_QUIRURGICOS_AUTORIZACION,
    URL_DATA_AUTORIZACIONES_PENDIENTES_APROBACION,
    URL_GET_DATA_PEDIDOS_MATERIALES_QX,
    URL_SAVE_NUEVO_PROXIMO_CONTACTO,
    URL_VERIFICAR_ALARMA_ESTUDIOS_PENDIENTES,
    URL_GUARDAR_DATOS_DENUNCIA_AUDITORIA,
    URL_GET_MATERIALES_QX,
    URL_VALIDAR_MATERIALES_QX
} from '../../Urls/auditoriaMedica'

//SNACKBAR:
export const setSnackBarAuditoria = (payload) => ({
    type: SET_SNACKBAR_AUDITORIA,
    payload
})

//REQUEST FILTROS:
export const setRequestFiltros = (payload) => ({
    type: SET_REQUEST_FILTROS,
    payload
})
export const clearRequestFiltros = () => ({
    type: CLEAR_REQUEST_FILTROS
})

//CANTIDAD NOTIFICACIONES
const setCantidadNotificaciones = (data) => {
    return {
        type: GET_CANTIDAD_NOTIFICACIONES_AM,
        payload: data
    }
}
export const getCantidadNotificaciones = (req) => {
    return dispatch => {
        fetch(URL_GET_CANTIDAD_NOTIFICACIONES_AM, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setCantidadNotificaciones(data.body))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

//DATA TABLERO AM: 
const setDataTableroAM = (data) => {
    return {
        type: SET_DATA_TABLERO_AM,
        payload: data
    }
}
const setLoadingTableroAM = (bool) => {
    return {
        type: SET_LOADING_TABLERO_AM,
        payload: bool
    }
}
export const getDataTableroAM = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingTableroAM(true))
        fetch(URL_GET_DATA_TABLERO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status === 200) {
                            errorCallback(false)
                            dispatch(setDataTableroAM(data.body))
                            dispatch(setLoadingTableroAM(false))
                        } else {
                            errorCallback(true)
                            dispatch(setDataTableroAM(null))
                            dispatch(setLoadingTableroAM(false))
                        }
                    })
            })
            .catch(() => {
                errorCallback(true)
                dispatch(setDataTableroAM(null))
                dispatch(setLoadingTableroAM(false))
            })
    }
}

//INDICADORES DE SINIESTROS: 
const setDataIndicadoresSiniestros = (data) => {
    return {
        type: SET_DATA_INDICADORES_SINIESTROS,
        payload: data
    }
}
const setLoadingIndicadoresSiniestros = (bool) => {
    return {
        type: SET_LOADING_INDICADORES_SINIESTROS,
        payload: bool
    }
}
export const getDataIndicadoresSiniestros = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingIndicadoresSiniestros(true))
        fetch(URL_GET_INDICADORES_SINIESTROS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataIndicadoresSiniestros(data.body))
                            errorCallback(false)
                            dispatch(setLoadingIndicadoresSiniestros(false))
                        } else {
                            errorCallback(true)
                            dispatch(setDataIndicadoresSiniestros(null))
                            dispatch(setLoadingIndicadoresSiniestros(false))
                        }
                    })
            })
            .catch(() => {
                errorCallback(true)
                dispatch(setDataIndicadoresSiniestros(null))
                dispatch(setLoadingIndicadoresSiniestros(false))
            })
    }
}

//DATA AUTORIZACIONES PENDIENTES: 
const setDataAutorizacionesPendientes = (data) => {
    return {
        type: SET_DATA_AUTORIZACIONES_PEDIENTES,
        payload: data
    }
}
const setLoadingAutorizacionesPendientes = (bool) => {
    return {
        type: SET_LOADING_AUTORIZACIONES_PEDIENTES,
        payload: bool
    }
}
export const getDataAutorizacionesPendientes = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingAutorizacionesPendientes(true))
        fetch(URL_GET_AUTORIZACIONES_PENDIENTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataAutorizacionesPendientes(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingAutorizacionesPendientes(false))
                        } else if (data.status === 204) {
                            dispatch(setDataAutorizacionesPendientes(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingAutorizacionesPendientes(false))
                        } else {
                            dispatch(setDataAutorizacionesPendientes(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingAutorizacionesPendientes(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataAutorizacionesPendientes(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingAutorizacionesPendientes(false))
            })
    }
}

//DATA NUEVOS INGRESOS: 
const setDataNuevosIngresos = (data) => {
    return {
        type: SET_DATA_NUEVOS_INGRESOS,
        payload: data
    }
}
const setLoadingNuevosIngresos = (bool) => {
    return {
        type: SET_LOADING_NUEVOS_INGRESOS,
        payload: bool
    }
}
export const getDataNuevosIngresos = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingNuevosIngresos(true))
        fetch(URL_GET_NUEVOS_INGRESOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataNuevosIngresos(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingNuevosIngresos(false))
                        } else if (data.status === 204) {
                            dispatch(setDataNuevosIngresos(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingNuevosIngresos(false))
                        } else {
                            dispatch(setDataNuevosIngresos(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingNuevosIngresos(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataNuevosIngresos(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingNuevosIngresos(false))
            })
    }
}

//DATA SINIESTROS ACTIVOS: 
const setDataSiniestrosActivos = (data) => {
    return {
        type: SET_DATA_SINIESTROS_ACTIVOS,
        payload: data
    }
}
const setLoadingSiniestrosActivos = (bool) => {
    return {
        type: SET_LOADING_SINIESTROS_ACTIVOS,
        payload: bool
    }
}
export const getDataSiniestrosActivos = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingSiniestrosActivos(true))
        fetch(URL_GET_SINIESTROS_ACTIVOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataSiniestrosActivos(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingSiniestrosActivos(false))
                        } else if (data.status === 204) {
                            dispatch(setDataSiniestrosActivos(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingSiniestrosActivos(false))
                        } else {
                            dispatch(setDataSiniestrosActivos(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingSiniestrosActivos(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataSiniestrosActivos(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingSiniestrosActivos(false))
            })
    }
}

//DATA SINIESTROS ILT VENCIDOS: 
const setDataSiniestrosIltVencidos = (data) => {
    return {
        type: SET_DATA_SINIESTROS_ILT_VENCIDOS,
        payload: data
    }
}
const setLoadingSiniestrosIltVencidos = (bool) => {
    return {
        type: SET_LOADING_SINIESTROS_ILT_VENCIDOS,
        payload: bool
    }
}
export const getDataSiniestrosIltVencidos = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingSiniestrosIltVencidos(true))
        fetch(URL_GET_SINIESTROS_ILT_VENCIDOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataSiniestrosIltVencidos(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingSiniestrosIltVencidos(false))
                        } else if (data.status === 204) {
                            dispatch(setDataSiniestrosIltVencidos(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingSiniestrosIltVencidos(false))
                        } else {
                            dispatch(setDataSiniestrosIltVencidos(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingSiniestrosIltVencidos(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataSiniestrosIltVencidos(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingSiniestrosIltVencidos(false))
            })
    }
}

//PRACTICAS PENDIENTES DE AUTORIZACIÓN - DENUNCIA COMPLETA
const setDataPracticasPendientesAutorizacion = (data) => {
    return {
        type: SET_DATA_PRACTICAS_PENDIENTES_AUTORIZACION,
        payload: data
    }
}
const setLoadingPracticasPendientesAutorizacion = (bool) => {
    return {
        type: SET_LOADING_PRACTICAS_PENDIENTES_AUTORIZACION,
        payload: bool
    }
}
export const getDataPracticasPendientesAutorizacion = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingPracticasPendientesAutorizacion(true))
        fetch(URL_DATA_AUTORIZACIONES_PENDIENTES_APROBACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataPracticasPendientesAutorizacion(data.body))
                            dispatch(setLoadingPracticasPendientesAutorizacion(false))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingPracticasPendientesAutorizacion(false))
                        } else if (data.status === 204) {
                            dispatch(setLoadingPracticasPendientesAutorizacion(false))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingPracticasPendientesAutorizacion(false))
                        } else {
                            dispatch(setDataPracticasPendientesAutorizacion(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingPracticasPendientesAutorizacion(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataPracticasPendientesAutorizacion(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingPracticasPendientesAutorizacion(false))
            })
    }
}

//DETALLE AUTORIZACION PENDIENTES - DENUNCIA COMPLETA
const setDataDetalleAutorizacionPendiente = (data) => {
    return {
        type: SET_DATA_DETALLE_AUTORIZACION_PENDIENTE,
        payload: data
    }
}
const setLoadingDetalleAutorizacionPendiente = (bool) => {
    return {
        type: SET_LOADING_DETALLE_AUTORIZACION_PENDIENTE,
        payload: bool
    }
}
export const getDataDetalleAutorizacionPendiente = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingDetalleAutorizacionPendiente(true))
        fetch(URL_DATOS_AUTORIZACIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingDetalleAutorizacionPendiente(false))
                            dispatch(setDataDetalleAutorizacionPendiente(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingDetalleAutorizacionPendiente(false))
                        } else if (data.status === 204) {
                            dispatch(setLoadingDetalleAutorizacionPendiente(false))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingDetalleAutorizacionPendiente(false))
                        } else {
                            dispatch(setDataDetalleAutorizacionPendiente(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingDetalleAutorizacionPendiente(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataDetalleAutorizacionPendiente(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingDetalleAutorizacionPendiente(false))
            })
    }
}

//MATERIAL QX AUTORIZACION PENDIENTES - DENUNCIA COMPLETA
const setDataMatQxAutorizacionPendiente = (data) => {
    return {
        type: SET_DATA_MAT_QX_AUTORIZACION_PENDIENTE,
        payload: data
    }
}
const setLoadingMatQxAutorizacionPendiente = (bool) => {
    return {
        type: SET_LOADING_MAT_QX_AUTORIZACION_PENDIENTE,
        payload: bool
    }
}
export const getDataMatQxAutorizacionPendiente = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingMatQxAutorizacionPendiente(true))
        fetch(URL_GET_MATERIALES_QX_AUTORIZACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDataMatQxAutorizacionPendiente(data.body))
                        if (errorCallback) errorCallback(false)
                        dispatch(setLoadingMatQxAutorizacionPendiente(false))
                    } else {
                        dispatch(setDataMatQxAutorizacionPendiente(null))
                        if (errorCallback) errorCallback(true)
                        dispatch(setLoadingMatQxAutorizacionPendiente(false))
                    }
                })
            )
            .catch(() => {
                dispatch(setDataMatQxAutorizacionPendiente(null))
                if (errorCallback) errorCallback(true)
                dispatch(setLoadingMatQxAutorizacionPendiente(false))
            })
    }
}

//Aprobar o Rechazar autorizacion
export const aprobarRechazarAutorizacion = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingPracticasPendientesAutorizacion(true))
        fetch(URL_APROBAR_AUTORIZACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        callback(true)
                        dispatch(setLoadingPracticasPendientesAutorizacion(false))
                    } else {
                        callback(false)
                        dispatch(setLoadingPracticasPendientesAutorizacion(false))
                    }
                })
            )
            .catch(() => {
                callback(false)
                dispatch(setLoadingPracticasPendientesAutorizacion(false))
            })
    }
}

//Request para setear materiales quirurgicos a una autorizacion que envio por request
export const setMaterialesQuirurgicos = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingMatQxAutorizacionPendiente(true))
        fetch(URL_SET_MATERIALES_QUIRURGICOS_AUTORIZACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        callback(true)
                        dispatch(setLoadingMatQxAutorizacionPendiente(false))
                    } else {
                        callback(false)
                        dispatch(setLoadingMatQxAutorizacionPendiente(false))
                    }
                })
            )
            .catch(() => {
                callback(false)
                dispatch(setLoadingMatQxAutorizacionPendiente(false))
            })
    }
}

//PEDIDO MATERIALES QX - CIRUGIAS
const setDataPedidoMaterialesQX = (data) => {
    return {
        type: SET_DATA_PEDIDO_MATERIALES_QX,
        payload: data
    }
}
const setLoadingPedidoMaterialesQX = (bool) => {
    return {
        type: SET_LOADING_PEDIDO_MATERIALES_QX,
        payload: bool
    }
}
export const getDataPedidoMaterialesQX = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingPedidoMaterialesQX(true))
        fetch(URL_GET_DATA_PEDIDOS_MATERIALES_QX, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDataPedidoMaterialesQX(data.body))
                        if (errorCallback) errorCallback(false)
                        dispatch(setLoadingPedidoMaterialesQX(false))
                    } else {
                        dispatch(setDataPedidoMaterialesQX(null))
                        if (errorCallback) errorCallback(true)
                        dispatch(setLoadingPedidoMaterialesQX(false))
                    }
                })
            )
            .catch(() => {
                dispatch(setDataPedidoMaterialesQX(null))
                if (errorCallback) errorCallback(true)
                dispatch(setLoadingPedidoMaterialesQX(false))
            })
    }
}

//MATERIALES QX POR PEDIDO
const setDataMaterialesQxPorPedido = (data) => {
    return {
        type: SET_DATA_MATERIALES_XQ_PEDIDO,
        payload: data
    }
}
const setLoadingMaterialesQxPorPedido = (bool) => {
    return {
        type: SET_LOADING_MATERIALES_XQ_PEDIDO,
        payload: bool
    }
}
export const getDataMaterialesQxPorPedido = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingMaterialesQxPorPedido(true))
        fetch(URL_GET_MATERIALES_QX, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDataMaterialesQxPorPedido(data.body))
                        if (errorCallback) errorCallback(false)
                        dispatch(setLoadingMaterialesQxPorPedido(false))
                    } else {
                        dispatch(setDataMaterialesQxPorPedido(null))
                        if (errorCallback) errorCallback(true)
                        dispatch(setLoadingMaterialesQxPorPedido(false))
                    }
                })
            )
            .catch(() => {
                dispatch(setDataMaterialesQxPorPedido(null))
                if (errorCallback) errorCallback(true)
                dispatch(setLoadingMaterialesQxPorPedido(false))
            })
    }
}

//VALIDAR MATERIALES QX
export const validarMaterialesQxFetch = (req, errorCallback) => {
    fetch(URL_VALIDAR_MATERIALES_QX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
    })
    .then(response => response.json()
        .then(data => {
            console.log(data)
            if (data.status === 200) {
                if (errorCallback) errorCallback(false)
            } else {
                if (errorCallback) errorCallback(true)
            }
        })
    )
    .catch(() => {
        if (errorCallback) errorCallback(true)
    })
}

//DATOS DENUNCIA AUDITORIA MEDICA
const setLoadingSaveNuevoProximoContacto = (bool) => {
    return {
        type: SET_LOADING_SAVE_NUEVO_PROXIMO_CONTACTO,
        payload: bool
    }
}
export const saveNuevoProximoContacto = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveNuevoProximoContacto(true))
        fetch(URL_SAVE_NUEVO_PROXIMO_CONTACTO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        if (callback) callback(true)
                        dispatch(setLoadingSaveNuevoProximoContacto(false))
                    } else {
                        if (callback) callback(false)
                        dispatch(setLoadingSaveNuevoProximoContacto(false))
                    }
                })
            )
            .catch(() => {
                if (callback) callback(false)
                dispatch(setLoadingSaveNuevoProximoContacto(false))
            })
    }
}

//GET ALARMA ESTUDIOS PENDIENTES:
export const getAlarmaEstudiosPendientes = (req, callback) => {
    return () => {
        fetch(URL_VERIFICAR_ALARMA_ESTUDIOS_PENDIENTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(data.body, false)
                        } else {
                            callback(null, true)
                        }
                    })
            })
            .catch(err => {
                callback(null, true)
            })
    }
}

//GUARDAR DATOS AUDITORIA:
export const setGuardarDatosAuditoria = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingSaveNuevoProximoContacto(true))
        fetch(URL_GUARDAR_DATOS_DENUNCIA_AUDITORIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                })
        }).catch(() => cb(false))
    }
}