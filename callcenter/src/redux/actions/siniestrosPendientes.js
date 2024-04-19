import {
    SET_SINIESTROS_CON_PENDIENTES,
    SET_LOADING_CON_PENDIENTES
} from '../actionTypes'

import {
    FECTH_URL_SEARCH_SINIESTROS_PENDIENTES,
    FECTH_URL_SEARCH_ASIGNAR_PENDIENTE,
    FECTH_URL_SEARCH_DESASIGNAR_PENDIENTES
} from '../../Urls/callCenter'

import {
    SNACK_SEVERITY,
    ERROR_SERVICIO_ASIGNAR_SINIESTRO_PENDIENTE,
    SINIESTRO_PENDIENTE_DESASIGNADA_OK,
    SINIESTRO_PENDIENTE_ASIGNADA_OK
} from '../../Utils/const'

const setSiniestros = (data) => {
    return {
        type: SET_SINIESTROS_CON_PENDIENTES,
        payload: data
    }
}

const setLoading = (data) => {
    return {
        type: SET_LOADING_CON_PENDIENTES,
        payload: data
    }
}

export const searchSiniestrosPendientes = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_SINIESTROS_PENDIENTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setLoading(false))
                        if(data && data.body){
                            dispatch(setSiniestros(data && data.body ? data.body : null))
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                dispatch(setLoading(false))
                console.log(err)
            })
    }
}

export const asignarSiniestroPendiente = (request, success) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_ASIGNAR_PENDIENTE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (success && data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, SINIESTRO_PENDIENTE_ASIGNADA_OK, false)
                        } else {
                            success(SNACK_SEVERITY.ERROR, data.message ? data.message : ERROR_SERVICIO_ASIGNAR_SINIESTRO_PENDIENTE, false)
                        }
                        dispatch(setLoading(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}

export const desasignarSiniestroPendiente = (request, success) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_DESASIGNAR_PENDIENTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (success && data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, SINIESTRO_PENDIENTE_DESASIGNADA_OK, false)
                        } else {
                            success(SNACK_SEVERITY.ERROR, data.message ? data.message : ERROR_SERVICIO_ASIGNAR_SINIESTRO_PENDIENTE, false)
                        }
                        dispatch(setLoading(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}