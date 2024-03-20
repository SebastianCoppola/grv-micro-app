import {
    SET_REQUEST_CONVENIO,
    SET_CONVENIO_ACTUAL, SET_LOADING_CONVENIO_ACTUAL, SET_ERROR_CONVENIO_ACTUAL,
    SET_PN, SET_LOADING_PN, SET_ERROR_PN,
    SET_PNN, SET_LOADING_PNN, SET_ERROR_PNN,
    SET_PNBU, SET_LOADING_PNBU, SET_ERROR_MODULOS,
    SET_MODULOS, SET_LOADING_MODULOS, SET_ERROR_PNBU,
    SET_CONVENIO_HISTORICO, SET_LOADING_CONVENIO_HISTORICO, SET_ERROR_CONVENIO_HISTORICO,
    SET_CONVENIO_FUTURO, SET_LOADING_CONVENIO_FUTURO, SET_ERROR_CONVENIO_FUTURO,SET_PRESTACIONES_PREQUIRUGICAS, SET_LOADING_PRESTACIONES_PREQUIRURGICAS
} from '../actionTypes'

import {
    URL_GET_CONVENIO_ACTUAL,
    URL_GET_PN,
    URL_GET_PNN,
    URL_GET_PNBU,
    URL_GET_MODULOS,
    URL_GET_MODULOS_AND_INCLUSIONES,
    URL_GET_VERSIONAR_CONVENIO,
    URL_IS_IN_CONVENIO,
    FETCH_URL_PRESTACIONES_PREQUIRURGICAS,
    URL_GET_CONVENIO_HISTORICO,
    URL_GET_PN_HISTORICO,
    URL_GET_PNN_HISTORICO,
    URL_GET_PNBU_HISTORICO,
    URL_GET_MODULOS_HISTORICOS,
    URL_RESTAURAR_REVISION,
    URL_GET_CONVENIO_FUTURO,
    URL_GET_PN_FUTURO,
    URL_GET_PNN_FUTURO,
    URL_GET_PNBU_FUTURO,
    URL_GET_MODULOS_FUTURO,
    URL_DELETE_CONVENIO_FUTURO,
    URL_SAVE_CONVENIO_FUTURO,
} from '../../Utils/urls'


//SET REQUEST CONVENIO:
const setRequest = (data) => {
    return {
        type: SET_REQUEST_CONVENIO,
        payload: data
    }
}
export const setRequestConvenio = (request) => {
    return dispatch => { dispatch(setRequest(request)) }
}


//GET & SET CONVENIO ACTUAL:
const setConvenioActual = (data) => {
    return {
        type: SET_CONVENIO_ACTUAL,
        payload: data
    }
}
const setLoadingConvenioActual = (boolean) => {
    return {
        type: SET_LOADING_CONVENIO_ACTUAL,
        payload: boolean
    }
}
const setErrorConvenioActual = (boolean) => {
    return {
        type: SET_ERROR_CONVENIO_ACTUAL,
        payload: boolean
    }
}
export const getConvenioActual = (request) => {
    return dispatch => {
        dispatch(setLoadingConvenioActual(true))
        dispatch(setErrorConvenioActual(false))
        fetch(URL_GET_CONVENIO_ACTUAL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setConvenioActual(data.body))
                            dispatch(setErrorConvenioActual(false))
                            dispatch(setLoadingConvenioActual(false))
                        } else {
                            dispatch(setConvenioActual(null))
                            dispatch(setErrorConvenioActual(true))
                            dispatch(setLoadingConvenioActual(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorConvenioActual(true))
                dispatch(setLoadingConvenioActual(false))
            })
    }
}


//GET & SET PRESTACIONES NOMENCLADAS
const setPN = (data) => {
    return {
        type: SET_PN,
        payload: data
    }
}
const setLoadingPN = (boolean) => {
    return {
        type: SET_LOADING_PN,
        payload: boolean
    }
}
const setErrorPN = (boolean) => {
    return {
        type: SET_ERROR_PN,
        payload: boolean
    }
}
export const getPNConvenio = (request) => {
    return dispatch => {
        dispatch(setLoadingPN(true))
        fetch(URL_GET_PN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setErrorPN(false))
                            dispatch(setPN(data.body))
                            dispatch(setLoadingPN(false))
                        } else if (data.status === 404) {
                            dispatch(setErrorPN(false))
                            dispatch(setPN([]))
                            dispatch(setLoadingPN(false))
                        } else {
                            dispatch(setErrorPN(true))
                            dispatch(setPN(null))
                            dispatch(setLoadingPN(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorPN(true))
                dispatch(setLoadingPN(false))
            })
    }
}


//GET & SET PRESTACIONES NO NOMENCLADAS
const setPNN = (data) => {
    return {
        type: SET_PNN,
        payload: data
    }
}
const setLoadingPNN = (boolean) => {
    return {
        type: SET_LOADING_PNN,
        payload: boolean
    }
}
const setErrorPNN = (boolean) => {
    return {
        type: SET_ERROR_PNN,
        payload: boolean
    }
}
export const getPNNConvenio = (request) => {
    return dispatch => {
        dispatch(setLoadingPNN(true))
        fetch(URL_GET_PNN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setErrorPNN(false))
                            dispatch(setPNN(data.body))
                            dispatch(setLoadingPNN(false))
                        } else if (data.status === 404) {
                            dispatch(setErrorPNN(false))
                            dispatch(setPNN([]))
                            dispatch(setLoadingPNN(false))
                        } else {
                            dispatch(setErrorPNN(true))
                            dispatch(setPNN(null))
                            dispatch(setLoadingPNN(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorPNN(true))
                dispatch(setLoadingPNN(false))
            })
    }
}


//GET & SET PRESTACIONES NBU
const setPNBU = (data) => {
    return {
        type: SET_PNBU,
        payload: data
    }
}
const setLoadingPNBU = (boolean) => {
    return {
        type: SET_LOADING_PNBU,
        payload: boolean
    }
}
const setErrorPNBU = (boolean) => {
    return {
        type: SET_ERROR_PNBU,
        payload: boolean
    }
}
export const getPNBUConvenio = (request) => {
    return dispatch => {
        dispatch(setLoadingPNBU(true))
        fetch(URL_GET_PNBU, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setErrorPNBU(false))
                            dispatch(setPNBU(data.body))
                            dispatch(setLoadingPNBU(false))
                        } else if (data.status === 404) {
                            dispatch(setErrorPNBU(false))
                            dispatch(setPNBU([]))
                            dispatch(setLoadingPNBU(false))
                        } else {
                            dispatch(setErrorPNBU(true))
                            dispatch(setPNBU(null))
                            dispatch(setLoadingPNBU(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorPNBU(true))
                dispatch(setLoadingPNBU(false))
            })
    }
}


//GET & SET MODULOS
const setModulos = (data) => {
    return {
        type: SET_MODULOS,
        payload: data
    }
}
const setLoadingModulos = (boolean) => {
    return {
        type: SET_LOADING_MODULOS,
        payload: boolean
    }
}
const setErrorModulos = (boolean) => {
    return {
        type: SET_ERROR_MODULOS,
        payload: boolean
    }
}
export const getModulosConvenio = (request) => {
    return dispatch => {
        dispatch(setLoadingModulos(true))
        fetch(URL_GET_MODULOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setErrorModulos(false))
                            dispatch(setModulos(data.body))
                            dispatch(setLoadingModulos(false))
                        } else if (data.status === 404) {
                            dispatch(setErrorModulos(false))
                            dispatch(setModulos([]))
                            dispatch(setLoadingModulos(false))
                        } else {
                            dispatch(setErrorModulos(true))
                            dispatch(setModulos(null))
                            dispatch(setLoadingModulos(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorModulos(true))
                dispatch(setLoadingModulos(false))
            })
    }
}


//CLEAR PN, PNN, PNBU, MOD, CONVENIO
export const clearDataConvenio = () => {
    return dispatch => {
        dispatch(setConvenioActual(null))
        dispatch(setPN(null))
        dispatch(setPNN(null))
        dispatch(setPNBU(null))
        dispatch(setModulos(null))
    }
}
export const clearPNConvenio = () => {
    return dispatch => {
        dispatch(setPN(null))
    }
}
export const clearPNNConvenio = () => {
    return dispatch => {
        dispatch(setPNN(null))
    }
}
export const clearModulosConvenio = () => {
    return dispatch => {
        dispatch(setModulos(null))
    }
}


//EXPORTAR DATOS:
export const getDatosExportar = (request, datosExportar, callback) => {
    let url = [URL_GET_PN, URL_GET_PNN, URL_GET_MODULOS_AND_INCLUSIONES]
    return () => {
        fetch(url[datosExportar], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data.body)
                        }
                        else if (data.status === 404) {
                            callback(true, [])
                        }
                        else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                callback(false)
            })
    }
}


//VERSIONAR CONVENIO:
export const versionarConvenio = (request, callBackVersionar) => {
    return () => {
        fetch(URL_GET_VERSIONAR_CONVENIO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 201) {
                            callBackVersionar(true);
                        } else {
                            callBackVersionar(false);
                        }
                    })
            })
            .catch(() => {
                callBackVersionar(false);
            })
    }
}


//COMPROBAR SI PRESTACIÓN O MÓDULO YA ESTÁ INCLUIDA EN CONVENIO: 
export const isInConvenio = (request, callback, prestacionFiltrada, opcionesForzar) => {
    return () => {
        fetch(URL_IS_IN_CONVENIO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, data.body, prestacionFiltrada, opcionesForzar)
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


//GET & SET CONVENIOS HISTORICOS
const setConvenioHistorico = (data) => {
    return {
        type: SET_CONVENIO_HISTORICO,
        payload: data
    }
}
const setLoadingConvenioHistorico = (boolean) => {
    return {
        type: SET_LOADING_CONVENIO_HISTORICO,
        payload: boolean
    }
}
const setErrorConvenioHistorico = (boolean) => {
    return {
        type: SET_ERROR_CONVENIO_HISTORICO,
        payload: boolean
    }
}
export const getConvenioHistorico = (req) => {
    return dispatch => {
        dispatch(setErrorConvenioHistorico(false))
        dispatch(setLoadingConvenioHistorico(true))
        fetch(URL_GET_CONVENIO_HISTORICO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setConvenioHistorico(data.body))
                        dispatch(setErrorConvenioHistorico(false))
                        dispatch(setLoadingConvenioHistorico(false))
                    } else {
                        dispatch(setErrorConvenioHistorico(true))
                        dispatch(setLoadingConvenioHistorico(false))
                    }
                }).catch(err => {
                    dispatch(setErrorConvenioHistorico(true))
                    dispatch(setLoadingConvenioHistorico(false))
                })
        })

    }
}
//RESTAURAR CONVENIO HISTORICO
export const restaurarRevision = (req, cb) => {
    return dispatch => {
        fetch(URL_RESTAURAR_REVISION, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 201) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                })
        }).catch(err => {
            cb(false)
        })
    }
}
//GET PN HITORICO
export const getPresNomencladaConvenioHistorico = req => {
    return dispatch => {
        dispatch(setErrorPN(false))
        dispatch(setLoadingPN(true))
        fetch(URL_GET_PN_HISTORICO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPN(false))
                        dispatch(setPN(data.body))
                        dispatch(setLoadingPN(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPN(false))
                        dispatch(setPN([]))
                        dispatch(setLoadingPN(false))
                    } else {
                        dispatch(setErrorPN(true))
                        dispatch(setPN(null))
                        dispatch(setLoadingPN(false))
                    }
                })
        }).catch(e => {
            dispatch(setLoadingPN(false))
            dispatch(setErrorPN(true))
        })
    }
}
//GET PNN HISTORICO
export const getPresNoNomencladasHistorico = request => {
    return dispatch => {
        dispatch(setErrorPNN(false))
        dispatch(setLoadingPNN(true))
        fetch(URL_GET_PNN_HISTORICO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPNN(false))
                        dispatch(setPNN(data.body))
                        dispatch(setLoadingPNN(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPNN(false))
                        dispatch(setPNN([]))
                        dispatch(setLoadingPNN(false))
                    } else {
                        dispatch(setErrorPNN(true))
                        dispatch(setPNN(null))
                        dispatch(setLoadingPNN(false))
                    }
                })
        }).catch(e => {
            dispatch(setErrorPNN(true))
            dispatch(setLoadingPNN(false))
        })
    }
}
//GET PNBU HISTORICO
export const getPrestacionesNBUHistoricos = request => {
    return dispatch => {
        dispatch(setErrorPNBU(false))
        dispatch(setLoadingPNBU(true))
        fetch(URL_GET_PNBU_HISTORICO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPNBU(false))
                        dispatch(setPNBU(data.body))
                        dispatch(setLoadingPNBU(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPNBU(false))
                        dispatch(setPNBU([]))
                        dispatch(setLoadingPNBU(false))
                    } else {
                        dispatch(setErrorPNBU(true))
                        dispatch(setPNBU(null))
                        dispatch(setLoadingPNBU(false))
                    }
                })
        }).catch(e => {
            dispatch(setErrorPNBU(true))
            dispatch(setLoadingPNBU(false))
        })
    }
}
//GET Modulos HISTORICO
export const getModulosHistoricos = request => {
    return dispatch => {
        dispatch(setErrorModulos(false))
        dispatch(setLoadingModulos(true))
        fetch(URL_GET_MODULOS_HISTORICOS, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorModulos(false))
                        dispatch(setModulos(data.body))
                        dispatch(setLoadingModulos(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorModulos(false))
                        dispatch(setLoadingModulos(false))
                        dispatch(setModulos([]))
                    } else {
                        dispatch(setErrorModulos(true))
                        dispatch(setLoadingModulos(false))
                        dispatch(setModulos(null))
                    }
                })
        }).catch(e => {
            dispatch(setErrorModulos(true))
            dispatch(setLoadingModulos(false))
        })
    }
}

//GET & SET CONVENIOS FUTUROS
const setConvenioFuturo = (data) => {
    return {
        type: SET_CONVENIO_FUTURO,
        payload: data
    }
}
const setLoadingConvenioFuturo = (boolean) => {
    return {
        type: SET_LOADING_CONVENIO_FUTURO,
        payload: boolean
    }
}
const setErrorConvenioFuturo = (boolean) => {
    return {
        type: SET_ERROR_CONVENIO_FUTURO,
        payload: boolean
    }
}
export const getConveniosFuturos = (req) => {
    return dispatch => {
        dispatch(setErrorConvenioFuturo(false))
        dispatch(setLoadingConvenioFuturo(true))
        fetch(URL_GET_CONVENIO_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setConvenioFuturo(data.body))
                        dispatch(setErrorConvenioFuturo(false))
                        dispatch(setLoadingConvenioFuturo(false))
                    } else {
                        dispatch(setErrorConvenioFuturo(true))
                        dispatch(setLoadingConvenioFuturo(false))
                    }
                }).catch(err => {
                    dispatch(setErrorConvenioFuturo(true))
                    dispatch(setLoadingConvenioFuturo(false))
                })
        })
    }
}
//UPDATE CONVENIO FUTURO
export const updateConveniosFuturos = (req, callback) => {
    return () => {
        fetch(URL_GET_CONVENIO_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        callback(true, data.body)
                    } else {
                        callback(false)
                    }
                }).catch( () => {
                    callback(false)
                })
        })
    }
}
//GET PN FUTURO
export const getPresNomencladaConvenioFuturo = req => {
    return dispatch => {
        dispatch(setErrorPN(false))
        dispatch(setLoadingPN(true))
        fetch(URL_GET_PN_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPN(false))
                        dispatch(setPN(data.body))
                        dispatch(setLoadingPN(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPN(false))
                        dispatch(setPN([]))
                        dispatch(setLoadingPN(false))
                    } else {
                        dispatch(setErrorPN(true))
                        dispatch(setPN(null))
                        dispatch(setLoadingPN(false))
                    }
                })
        }).catch(e => {
            dispatch(setLoadingPN(false))
            dispatch(setErrorPN(true))
        })
    }
}
//GET PNN FUTURO
export const getPresNoNomencladasFuturo = request => {
    return dispatch => {
        dispatch(setErrorPNN(false))
        dispatch(setLoadingPNN(true))
        fetch(URL_GET_PNN_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPNN(false))
                        dispatch(setPNN(data.body))
                        dispatch(setLoadingPNN(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPNN(false))
                        dispatch(setPNN([]))
                        dispatch(setLoadingPNN(false))
                    } else {
                        dispatch(setErrorPNN(true))
                        dispatch(setPNN(null))
                        dispatch(setLoadingPNN(false))
                    }
                })
        }).catch(e => {
            dispatch(setErrorPNN(true))
            dispatch(setLoadingPNN(false))
        })
    }
}
//GET PNBU FUTURO
export const getPrestacionesNBUFuturo = request => {
    return (dispatch) => {
        dispatch(setErrorPNBU(false))
        dispatch(setLoadingPNBU(true))
        fetch(URL_GET_PNBU_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorPNBU(false))
                        dispatch(setPNBU(data.body))
                        dispatch(setLoadingPNBU(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorPNBU(false))
                        dispatch(setPNBU([]))
                        dispatch(setLoadingPNBU(false))
                    } else {
                        dispatch(setErrorPNBU(true))
                        dispatch(setPNBU(null))
                        dispatch(setLoadingPNBU(false))
                    }
                })
        }).catch(e => {
            dispatch(setErrorPNBU(true))
            dispatch(setLoadingPNBU(false))
        })
    }
}
//GET Modulos FUTURO
export const getModulosFuturo = request => {
    return dispatch => {
        dispatch(setErrorModulos(false))
        dispatch(setLoadingModulos(true))
        fetch(URL_GET_MODULOS_FUTURO, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setErrorModulos(false))
                        dispatch(setModulos(data.body))
                        dispatch(setLoadingModulos(false))
                    } else if (data.status === 404) {
                        dispatch(setErrorModulos(false))
                        dispatch(setLoadingModulos(false))
                        dispatch(setModulos([]))
                    } else {
                        dispatch(setErrorModulos(true))
                        dispatch(setLoadingModulos(false))
                        dispatch(setModulos(null))
                    }
                })
        }).catch(e => {
            dispatch(setErrorModulos(true))
            dispatch(setLoadingModulos(false))
        })
    }
}
//ELIMINAR CONVENIO FUTURO:
export const eliminarConvenioFuturo = (request, callback) => {
    return () => {
        fetch(URL_DELETE_CONVENIO_FUTURO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    })
            })
            .catch(() => {
                callback(false);
            })
    }
}
//GUARDAR CONVENIO FUTURO:
export const guardarConvenioFuturo = (request, callback) => {
    return () => {
        // callback(true)
        fetch(URL_SAVE_CONVENIO_FUTURO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    })
            })
            .catch(() => {
                callback(false);
            })
    }
}


//PREQX:
export const setPrestacionesPrequirurgicas = data => {
    return {
        type: SET_PRESTACIONES_PREQUIRUGICAS,
        payload: data
    }
}
const setLoadingPrestacionesPrequirurgicas = bool => {
    return {
        type: SET_LOADING_PRESTACIONES_PREQUIRURGICAS,
        payload: bool
    }
}
export const getPrestacionesPrequirurgicas = (req, cb) => {
    return dispatch => {
        dispatch(setLoadingPrestacionesPrequirurgicas(true))
        fetch(FETCH_URL_PRESTACIONES_PREQUIRURGICAS, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        }).then(res => {
            res.json()
                .then(data => {
                    if (data.status === 200) {
                        dispatch(setLoadingPrestacionesPrequirurgicas(false))
                        cb(true, data.body)
                    } else if (data.status === 404) {
                        dispatch(setLoadingPrestacionesPrequirurgicas(false))
                        cb(true, [])
                    } else {
                        dispatch(setLoadingPrestacionesPrequirurgicas(false))
                        cb(false, [])
                    }
                })
        }).catch(err => {
            dispatch(setLoadingPrestacionesPrequirurgicas(false))
            cb(false, [])
        })
    }
}