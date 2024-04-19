import { 
    SET_LOADING_CON_PENDIENTES,
    SET_SINIESTROS_CON_PENDIENTES
 } from '../actionTypes'

 const initialState = {
    siniestros : [],
    loading: false
}

const siniestroPendientes = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_CON_PENDIENTES:
            return {
                ...state,
                loading: action.payload
            }
            break;
        case SET_SINIESTROS_CON_PENDIENTES:
            return {
                ...state,
                siniestros: action.payload
            }
            break;
        default:
            return state;
    }
} 
export default siniestroPendientes
