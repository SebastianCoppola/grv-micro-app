import {
    SET_GENERAL_SNACKBAR,
    SET_GENERAL_LOADING,
    SET_GENERAL_ACTIVE_USER,
    SET_GENERAL_RUTAS
} from '../actionTypes'

const initialState = {
    snackbar: { open: false, severity: '', message: '', vertical: '' },
    loading: false,
    usuarioActivo: null,
    rutas: null
}

const generalConfig = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENERAL_SNACKBAR:
            return {
                ...state,
                snackbar: action.payload
            }
        case SET_GENERAL_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_GENERAL_ACTIVE_USER:
            return {
                ...state,
                usuarioActivo: action.payload
            }
        case SET_GENERAL_RUTAS:
            return {
                ...state,
                rutas: action.payload
            }
        default:
            return state
    }
}

export default generalConfig