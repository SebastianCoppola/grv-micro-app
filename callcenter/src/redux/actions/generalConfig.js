import {
    SET_GENERAL_SNACKBAR,
    SET_GENERAL_LOADING,
    SET_GENERAL_ACTIVE_USER,
    SET_GENERAL_RUTAS,
} from '../actionTypes'

export const setSnackbar = (payload) => ({
    type: SET_GENERAL_SNACKBAR,
    payload
})

export const setLoading = (payload) => ({
    type: SET_GENERAL_LOADING,
    payload
})

export const setActiveUser = (payload) => {
    return {
        type: SET_GENERAL_ACTIVE_USER,
        payload
    }
}

export const setRutas = (payload) => {
    return {
		type: SET_GENERAL_RUTAS,
		payload
    }
}