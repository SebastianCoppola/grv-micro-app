import {
	SET_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	SET_BUSQUEDA_EMPLEADOR_TODOS,
} from '../actionTypes'

import {
	FECTH_URL_BUSQUEDA_EMPLEADOR,
	FECTH_URL_BUSQUEDA_EMPLEADOR_TODOS,
} from '../../Utils/urls'

//GET EMPLEADOR:
const setBusquedaEmpleador = (data) => {
	return {
		type: SET_BUSQUEDA_EMPLEADOR,
		payload: data
	}
}
const errorAutosuggestBusquedaEmpleador = (data) => {
	return {
		type: ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
		payload: data
	}
}
const loadingAutosuggestBusquedaEmpleador = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
		payload: data
	}
}
export const searchEmpleador = (request) => {
	return dispatch => {
		dispatch(loadingAutosuggestBusquedaEmpleador(true))
		fetch(FECTH_URL_BUSQUEDA_EMPLEADOR, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setBusquedaEmpleador(data.body))
							dispatch(errorAutosuggestBusquedaEmpleador(false))
							dispatch(loadingAutosuggestBusquedaEmpleador(false))
						}
						else{
							dispatch(errorAutosuggestBusquedaEmpleador(true))
							dispatch(loadingAutosuggestBusquedaEmpleador(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestBusquedaEmpleador(true))
						dispatch(loadingAutosuggestBusquedaEmpleador(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(errorAutosuggestBusquedaEmpleador(true))
				dispatch(loadingAutosuggestBusquedaEmpleador(false))
			})
	}
}

//GET EMPLEADOR TODOS:
const setBusquedaEmpleadorTodos = (data) => {
	return {
		type: SET_BUSQUEDA_EMPLEADOR_TODOS,
		payload: data
	}
}
const errorAutosuggestBusquedaEmpleadorTodos = (data) => {
	return {
		type: ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
		payload: data
	}
}
const loadingAutosuggestBusquedaEmpleadorTodos = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
		payload: data
	}
}
export const searchEmpleadorTodos = (request) => {
	return dispatch => {
		dispatch(loadingAutosuggestBusquedaEmpleadorTodos(true))
		fetch(FECTH_URL_BUSQUEDA_EMPLEADOR_TODOS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setBusquedaEmpleadorTodos(data.body))
							dispatch(errorAutosuggestBusquedaEmpleadorTodos(false))
							dispatch(loadingAutosuggestBusquedaEmpleadorTodos(false))
						}
						else{
							dispatch(errorAutosuggestBusquedaEmpleadorTodos(true))
							dispatch(loadingAutosuggestBusquedaEmpleadorTodos(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestBusquedaEmpleadorTodos(true))
						dispatch(loadingAutosuggestBusquedaEmpleadorTodos(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(errorAutosuggestBusquedaEmpleadorTodos(true))
				dispatch(loadingAutosuggestBusquedaEmpleadorTodos(false))
			})
	}
}