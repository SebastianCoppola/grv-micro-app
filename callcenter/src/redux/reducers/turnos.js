import {
    SET_DATA_HISTORIAL_POR_DENUNCIA,
    SET_LOADING_HISTORIAL_POR_DENUNCIA,
    SET_DATA_HISTORIAL_POR_TURNO,
    SET_LOADING_HISTORIAL_POR_TURNO
} from '../actionTypes'

const initialState = {
    dataHistorialPorDenuncia:null,
    loadingHistorialPorDenuncia:false,
    dataHistorialPorTurno: null,
    loadingHistorialPorTurno: false,
}

const turnos = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA_HISTORIAL_POR_DENUNCIA:
            return {
                ...state,
                dataHistorialPorDenuncia: action.payload
            }
        case SET_LOADING_HISTORIAL_POR_DENUNCIA:
            return {
                ...state,
                loadingHistorialPorDenuncia: action.payload
            }
        case SET_DATA_HISTORIAL_POR_TURNO:
            return {
                ...state,
                dataHistorialPorTurno: action.payload
            }
        case SET_LOADING_HISTORIAL_POR_TURNO:
            return {
                ...state,
                loadingHistorialPorTurno: action.payload
            }
        default:
            return state;
    }
}
export default turnos