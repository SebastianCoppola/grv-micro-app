import {
	SET_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	SET_BUSQUEDA_EMPLEADOR_TODOS,
	SET_DATOS_PACIENTE,
	SET_LOADING_DATOS_PACIENTE,
} from '../actionTypes'

import {
	FECTH_URL_BUSQUEDA_EMPLEADOR,
	FECTH_URL_VALIDAR_EMPLEADOR,
	FECTH_URL_CALCULAR_CUIL,
	FECTH_URL_BUSQUEDA_EMPLEADOR_TODOS,
	FETCH_URL_DATOS_PACIENTE,
} from '../../Urls/callCenter'

import { SNACK_SEVERITY } from '../../Utils/const'


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


//VALIDAR EMPLEADOR:
export const validarEmpleador = (request, callback) => {
	return () => {
		fetch(FECTH_URL_VALIDAR_EMPLEADOR, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status === 200 && data.body.valido ) {
							callback(SNACK_SEVERITY.SUCCESS, data.body.descripcion,data.body.valido)
						} else {
							callback(SNACK_SEVERITY.ERROR,  data.body.descripcion, data.body.valido)
						}
					})
			})
			.catch(err => {
				console.log(err)
			})
	}
}


//CALCULAR CUIL:
export const calcularCuil = (request, callback) => {
	return () => {
		fetch(FECTH_URL_CALCULAR_CUIL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status === 200 ) {
							callback(data.body ? data.body : '')					
						} else {
							callback('')
						}
					})
			})
			.catch(() => {
				callback('')
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


//GET DATOS PACIENTE:
const setDatosPaciente = data => {
    return {
        type: SET_DATOS_PACIENTE,
        payload: data
    }
}
const setLoadingDatosPaciente = data => {
    return {
        type: SET_LOADING_DATOS_PACIENTE,
        payload: data
    }
}
export const getDatosPaciente = (req, errorCallback) => {
    return dispatch => {
		dispatch(setLoadingDatosPaciente(true))
        fetch(FETCH_URL_DATOS_PACIENTE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => res.json()
                .then(data => {
                    if (data.status === 200){
                        dispatch(setDatosPaciente(data.body))
                    }else{
						errorCallback(true)
					}
					dispatch(setLoadingDatosPaciente(false))
                }))
            .catch(()=>{
				errorCallback(true)
				dispatch(setLoadingDatosPaciente(false))
			})
    }
}
export const clearDatosPaciente = () => {
    return dispatch => {dispatch(setDatosPaciente(null))}
}