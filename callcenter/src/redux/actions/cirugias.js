//ACTION TYPES:
import {
    SET_LOADING_DATOS_CIRUGIAS_POR_DENUNCIA,
    SET_DATOS_CIRUGIAS_POR_DENUNCIA,
    SET_DATOS_OBSERVACIONES_POR_CIRUGIA,
    SET_LOADING_OBSERVACIONES_CIRUGIA
} from '../actionTypes';

//URL:
import {
    URL_GET_DATOS_CIRUGIAS_POR_DENUNCIA,
    URL_GET_OBSERVACIONES_POR_CIRUGIA,
    URL_SAVE_OBSERVACION_CIRUGIA,
    URL_ANULAR_CIRUGIA
} from '../../Urls/auditoriaMedica'

const setLoadingDatosDenunciaAuditoria = (bool) => {
    return {
        type: SET_LOADING_DATOS_CIRUGIAS_POR_DENUNCIA,
        payload: bool
    }
}

const setDatosCirugiasPorDenuncia = (data) => {
    return {
        type: SET_DATOS_CIRUGIAS_POR_DENUNCIA,
        payload: data
    }
}

export const getDatosCirugiasPorDenuncia = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingDatosDenunciaAuditoria(true))
        fetch(URL_GET_DATOS_CIRUGIAS_POR_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDatosCirugiasPorDenuncia(data.body))
                        if (errorCallback) errorCallback(false)
                            dispatch(setLoadingDatosDenunciaAuditoria(false))
                        } else {
                            dispatch(setDatosCirugiasPorDenuncia(null))
                        if (errorCallback) errorCallback(true)
                            dispatch(setLoadingDatosDenunciaAuditoria(false))
                        }           
                })
        )
        .catch(() => {
            dispatch(setDatosCirugiasPorDenuncia(null))
            if (errorCallback) errorCallback(true)
                dispatch(setLoadingDatosDenunciaAuditoria(false))
        })
    }    
}

const setDatosObservacionesPorCirugia = (data) => {
    return {
        type: SET_DATOS_OBSERVACIONES_POR_CIRUGIA,
        payload: data
    }
}

const setLoadingObservacionesPorCirugia = (bool) => {
    return {
        type: SET_LOADING_OBSERVACIONES_CIRUGIA,
        payload: bool
    }
}

export const getObservacionesPorCirugia = (req, errorCallback) => {
    return dispatch => {
        dispatch(setLoadingObservacionesPorCirugia(true))
        fetch(URL_GET_OBSERVACIONES_POR_CIRUGIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setDatosObservacionesPorCirugia(data.body))
                        if (errorCallback) errorCallback(false)
                            dispatch(setLoadingObservacionesPorCirugia(false))
                    } else {
                        dispatch(setDatosObservacionesPorCirugia(null))
                        if (errorCallback) errorCallback(true)
                            dispatch(setLoadingObservacionesPorCirugia(false))
                    }           
                })
        )
        .catch(() => {
            dispatch(setDatosObservacionesPorCirugia(null))
            if (errorCallback) errorCallback(true)
                dispatch(setLoadingObservacionesPorCirugia(false))
        })
    }    
}

export const guardarObservacionCirugia = (req, callback) => {
    return () => {
        fetch(URL_SAVE_OBSERVACION_CIRUGIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        callback(true)
                    } else {
                        callback(false)
                    }           
                })
        )
        .catch(() => {
            callback(false)
        })
    }    
}

export const anularCirugia = (req, callback) => {
    return () => {
        fetch(URL_ANULAR_CIRUGIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(response => response.json()
                .then(data => {
                    if (data.status === 200) {
                        callback(true)
                    } else {
                        callback(false)
                    }           
                })
        )
        .catch(() => {
            callback(false)
        })
    }    
}
