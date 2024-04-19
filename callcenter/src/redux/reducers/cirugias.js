import {
    SET_LOADING_DATOS_CIRUGIAS_POR_DENUNCIA,
    SET_DATOS_CIRUGIAS_POR_DENUNCIA,
    SET_DATOS_OBSERVACIONES_POR_CIRUGIA,
    SET_LOADING_OBSERVACIONES_CIRUGIA,
 } from '../actionTypes'

const initialState = {
    loadingDatosCirugiasPorDenuncia: false,
    dataCirugiasGeneral:[],
    loadingObservacionesCirugia: false,
    observaciones: []
}

const cirugias = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_DATOS_CIRUGIAS_POR_DENUNCIA: 
            return {
                ...state,
                loadingDatosCirugiasPorDenuncia: action.payload
            }
        case SET_DATOS_CIRUGIAS_POR_DENUNCIA: 
            return {
                ...state,
                dataCirugiasGeneral: action.payload
            }
        case SET_DATOS_OBSERVACIONES_POR_CIRUGIA:
            return {
                ...state,
                observaciones: action.payload
            }
        case SET_LOADING_OBSERVACIONES_CIRUGIA: 
            return {
                ...state,
                loadingObservacionesCirugia: action.payload
            }          
        default:
            return state;
    }
}

export default cirugias