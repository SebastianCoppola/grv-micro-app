import {
	SET_USUARIO_ACTIVO,
	SET_RUTAS,
	SET_RUTAS_CALLCENTER,
} from '../actionTypes'

export const setUsuarioActivo = (data) => {
	return {
		type: SET_USUARIO_ACTIVO,
		payload: data
	}
}

export const setRutas = (data) => {
	return {
		type: SET_RUTAS,
		payload: data
	}
}

export const setRutasCallCenter = (data) => {
	return {
		type: SET_RUTAS_CALLCENTER,
		payload: data
	}
}