import {
    GET_MODULO,
    SET_LOADING_MODULO,
    SET_ERROR_MODULO,
    GET_INCLUSIONES_MODULO,
    SET_LOADING_INCLUSIONES_MODULO,
    GET_INCLUSIONES_REPETIDAS,
    SET_LOADING_INCLUSIONES_REPETIDAS,
    SET_LOADING_SAVE_INCLUSIONES,
    SET_LISTADO_TIPO_PRESTACION,
    SET_LOADING_SAVE_EDIT_MODULO,
    SET_CONVENIOS_INCLUIDOS,
    SET_LOADING_CONVENIOS_INCLUIDOS,
    GET_LISTADO_MODULOS,
    SET_LOADING_LISTADO_MODULOS,
    SET_LOADING_IMPACTAR_CONVENIOS
} from '../actionTypes'

import {
    FETCH_URL_MODULOS,
    FETCH_URL_INCLUSIONES_MODULO,
    FETCH_URL_INCLUSIONES_REPETIDAS_PNN,
    FETCH_URL_INCLUSIONES_REPETIDAS_PN,
    SAVE_URL_INCLUSIONES_MODULO_PNN,
    SAVE_URL_INCLUSIONES_MODULO_PN,
    SAVE_URL_MODULO,
    FETCH_URL_GET_CONVENIOS_INCLUIDOS,
    EDIT_URL_MODULO,
    FETCH_URL_LISTADO_MODULOS,
    FETCH_URL_IMPACTAR_CONVENIOS,
    FETCH_URL_GET_LISTADOS_TIPO_PRESTACION,
} from '../../Utils/urls'


//GET MODULO:
const setLoadingModulo = (boolean) => {
    return {
        type: SET_LOADING_MODULO,
        payload: boolean
    }
}
const setErrorModulo = (boolean) => {
    return {
        type: SET_ERROR_MODULO,
        payload: boolean
    }
}
const setModulos = (data) => {
    return {
        type: GET_MODULO,
        payload: data
    }
}
export const getModulos = (request) => {
    return dispatch => {
        dispatch(setLoadingModulo(true))
        fetch(FETCH_URL_MODULOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            if (data.body === null) {
                                dispatch(setErrorModulo(true))
                                dispatch(setModulos([]))
                                dispatch(setLoadingModulo(false))
                            } else {
                                dispatch(setErrorModulo(false))
                                dispatch(setModulos(data.body.modulo))
                                dispatch(setLoadingModulo(false))
                            }
                        } else {
                            dispatch(setErrorModulo(true))
                            dispatch(setModulos([]))
                            dispatch(setLoadingModulo(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setErrorModulo(true))
                dispatch(setLoadingModulo(false))
            })
    }
}
export const clearModulos = () => {
    return dispatch => {
        dispatch(setModulos([]))
    }
}


//GET MODULO LISTADO
const setListadoModulos = data => {
    return {
        type: GET_LISTADO_MODULOS,
        payload: data
    }
}
const setLoadingListadoModulos = boolean => {
    return {
        type: SET_LOADING_LISTADO_MODULOS,
        payload: boolean
    }
}
export const getListadoModulos = request => {
    return dispatch => {
        dispatch(setLoadingListadoModulos(true))
        fetch(FETCH_URL_LISTADO_MODULOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setListadoModulos(data.body))
                            dispatch(setLoadingListadoModulos(false))
                        } else {
                            dispatch(setLoadingListadoModulos(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setLoadingListadoModulos(false))
            })
    }
}


//GET INCLUSIONES MODULO
const setLoadingInclusionesModulo = (boolean) => {
    return {
        type: SET_LOADING_INCLUSIONES_MODULO,
        payload: boolean
    }
}
const setInclusionesModulo = (data) => {
    return {
        type: GET_INCLUSIONES_MODULO,
        payload: data
    }
}
export const getInclusionesModulo = (request) => {
    return dispatch => {
        dispatch(setLoadingInclusionesModulo(true))
        fetch(FETCH_URL_INCLUSIONES_MODULO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setInclusionesModulo(data.body))
                            dispatch(setLoadingInclusionesModulo(false))
                        } else {
                            dispatch(setLoadingInclusionesModulo(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setLoadingInclusionesModulo(false))
                console.log(err)
            })
    }
}
export const clearInclusionesModulo = () => {
    return dispatch => {
        dispatch(setInclusionesModulo([]))
    }
}


//GET INCLUSIONES REPETIDAS
const setLoadingInclusionesRepetidas = (boolean) => {
    return {
        type: SET_LOADING_INCLUSIONES_REPETIDAS,
        payload: boolean
    }
}
const setInclusionesRepetidas = (data) => {
    return {
        type: GET_INCLUSIONES_REPETIDAS,
        payload: data
    }
}
export const getInclusionesRepetidasPNN = (request) => {
    return dispatch => {
        dispatch(setLoadingInclusionesRepetidas(true))
        fetch(FETCH_URL_INCLUSIONES_REPETIDAS_PNN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setInclusionesRepetidas(data.body))
                            dispatch(setLoadingInclusionesRepetidas(false))
                        } else {
                            dispatch(setInclusionesRepetidas([]))
                            dispatch(setLoadingInclusionesRepetidas(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setInclusionesRepetidas([]))
                dispatch(setLoadingInclusionesRepetidas(false))
            })
    }
}
export const getInclusionesRepetidasPN = (request) => {
    return dispatch => {
        dispatch(setLoadingInclusionesRepetidas(true))
        fetch(FETCH_URL_INCLUSIONES_REPETIDAS_PN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setInclusionesRepetidas(data.body))
                            dispatch(setLoadingInclusionesRepetidas(false))
                        } else {
                            dispatch(setInclusionesRepetidas([]))
                            dispatch(setLoadingInclusionesRepetidas(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setInclusionesRepetidas([]))
                dispatch(setLoadingInclusionesRepetidas(false))
            })
    }
}
export const clearInclusionesRepetidas = () => {
    return dispatch => {
        dispatch(setInclusionesRepetidas([]))
    }
}


//SAVE INCLUSIONES MODULO
const setLoadingSaveIncluciones = (boolean) => {
    return {
        type: SET_LOADING_SAVE_INCLUSIONES,
        payload: boolean
    }
}
export const saveInclusionesModuloPNN = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveIncluciones(true))
        fetch(SAVE_URL_INCLUSIONES_MODULO_PNN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 201) {
                            callback(true)
                            dispatch(setLoadingSaveIncluciones(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingSaveIncluciones(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingSaveIncluciones(false))
            })
    }
}
export const saveInclusionesModuloPN = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveIncluciones(true))
        fetch(SAVE_URL_INCLUSIONES_MODULO_PN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true)
                            dispatch(setLoadingSaveIncluciones(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingSaveIncluciones(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingSaveIncluciones(false))
            })
    }
}


//GET LISTADO TIPO PRESTACION
const setListadoTipoPrestaciones = data => {
    return {
        type: SET_LISTADO_TIPO_PRESTACION,
        payload: data
    }
}
export const getListadoTipoPrestaciones = () => {
    return async dispatch => {
        try {
            const res = await fetch(FETCH_URL_GET_LISTADOS_TIPO_PRESTACION)
            const data = await res.json()
            if (data.status === 200) {
                dispatch(setListadoTipoPrestaciones(data.body))
            }
        } catch (err) {
            console.log(err)
        }
    }
}


//SAVE & EDIT MODULO
const setLoadingSaveEditModulo = boolean => {
    return {
        type: SET_LOADING_SAVE_EDIT_MODULO,
        payload: boolean
    }
}
export const saveModulo = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveEditModulo(true))
        fetch(SAVE_URL_MODULO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true)
                            dispatch(setLoadingSaveEditModulo(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingSaveEditModulo(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingSaveEditModulo(false))
            })
    }
}
export const editModulo = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingSaveEditModulo(true))
        fetch(EDIT_URL_MODULO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true)
                            dispatch(setLoadingSaveEditModulo(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingSaveEditModulo(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingSaveEditModulo(false))
            })
    }
}


//GET CONVENIOS INCLUIDOS
const setConveniosIncluidos = (data) => {
    return {
        type: SET_CONVENIOS_INCLUIDOS,
        payload: data
    }
}
const setLoadingConveniosIncluidos = (boolean) => {
    return {
        type: SET_LOADING_CONVENIOS_INCLUIDOS,
        payload: boolean
    }
}
export const getConveniosIncluidos = (request) => {
    return dispatch => {
        dispatch(setLoadingConveniosIncluidos(true))
        fetch(FETCH_URL_GET_CONVENIOS_INCLUIDOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(setConveniosIncluidos(data.body))
                            dispatch(setLoadingConveniosIncluidos(false))
                        } else {
                            dispatch(setConveniosIncluidos([]))
                            dispatch(setLoadingConveniosIncluidos(false))
                        }
                    })
                })
            .catch(err => {
                dispatch(setLoadingConveniosIncluidos(false))
            })
    }
}
export const clearConveniosIncluidos = () => {
    return dispatch => {
        dispatch(setConveniosIncluidos([]))
    }
}


//Impactar en convenios:
const setLoadingImpactarConvenios = (boolean) => {
    return {
        type: SET_LOADING_IMPACTAR_CONVENIOS,
        payload: boolean
    }
}
export const impactarConvenios = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingImpactarConvenios(true))
        fetch(FETCH_URL_IMPACTAR_CONVENIOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true)
                            dispatch(setLoadingImpactarConvenios(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingImpactarConvenios(false))
                        }
                    })
            })
            .catch(err => {
                callback(false)
                dispatch(setLoadingImpactarConvenios(false))
            })
    }
}

