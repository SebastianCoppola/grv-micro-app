import {
    SET_USUARIO_ACTIVO,
    SET_RUTAS,
    SET_RUTAS_CALLCENTER
} from '../actionTypes'
  
const initialState = {
    usuarioActivo: null,
    rutas: null,
    rutasCallCenter: null
}
  
const generales = (state = initialState, action) => {
    switch (action.type) {
    case SET_USUARIO_ACTIVO:
        return {
            ...state,
            usuarioActivo: action.payload
        }
    case SET_RUTAS:
        return {
            ...state,
            rutas: action.payload
        }
    case SET_RUTAS_CALLCENTER:
        return {
            ...state,
            rutasCallCenter: action.payload
        }
    default:
        return state
    }
}

export default generales