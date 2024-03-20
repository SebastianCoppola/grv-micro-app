import {
	SET_CONTACTOS,
	SET_LOADING_CONTACTOS,
	CAMPANA_NOTIFICACIONES
} from '../actionTypes'

import {
	FECTH_URL_CONTACTOS,
	FECTH_URL_CAMPANA_NOTIFICACIONES
} from '../../Utils/urls'

export const setContactos = (data) => {
	return {
		type: SET_CONTACTOS,
		payload: data
	}
}
const setLoadingContactos = (data) => {
	return {
		type: SET_LOADING_CONTACTOS,
		payload: data
	}
}
const setCampanaNotificaciones = (data) => {
	return {
		type: CAMPANA_NOTIFICACIONES,
		payload: data
	}
}
export const searchContactos = (request, callback) => {
	return dispatch => {
		dispatch(setLoadingContactos(true))
		fetch(FECTH_URL_CONTACTOS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						dispatch(setContactos(data.body))
						callback(true, false)
						dispatch(setLoadingContactos(false))
						if (data.status === 204) {
							callback(false, false)
						}
					})
			})
			.catch(err => {
				callback(true, true)
				dispatch(setLoadingContactos(false))
			})
	}

}
export const searchCampanaNotificaciones = (request) => {
	return dispatch => {
		fetch(FECTH_URL_CAMPANA_NOTIFICACIONES, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data && data.status === 200) {
							dispatch(setCampanaNotificaciones(data.body))
						}

					})
			})
			.catch(err => {
				console.log(err)
			})
	}

}