import {
    SET_PARAMETROS,
    SET_LOADING_PARAMETROS,
    SET_LOADING_SAVE_PARAMETROS,
} from '../actionTypes'

const initialState = {
    parametros: null,
    loadingParametros: false,
    loadingSaveParametros: false,
}

const loginTools = (state = initialState, action) => {
    switch (action.type) {
        case SET_PARAMETROS: 
            return {
                ...state,
                parametros: action.payload
            }
        case SET_LOADING_PARAMETROS: 
            return {
                ...state,
                loadingParametros: action.payload
            }
        case SET_LOADING_SAVE_PARAMETROS: 
            return {
                ...state,
                loadingSaveParametros: action.payload
            }
        default:
            return state
    }
}
export default loginTools