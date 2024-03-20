import {
    SET_LOCALIDADES,
	ERROR_AUTOSUGGEST_LOCALIDADES,
	LOADING_AUTOSUGGEST_LOCALIDADES,
	SET_CALLE,
	ERROR_AUTOSUGGEST_CALLE,
	LOADING_AUTOSUGGEST_CALLE,
	SET_CODIGO_POSTAL,
	ERROR_AUTOSUGGEST_CODIGO_POSTAL,
	LOADING_AUTOSUGGEST_CODIGO_POSTAL,
	SET_CODIGO_POSTAL_CABA,
	SET_PROVINCIAS,
	ERROR_AUTOSUGGEST_PROVINCIA,
	LOADING_AUTOSUGGEST_PROVINCIA,
	SET_LOCALIDADES_SELECT,
} from '../actionTypes'

import {
    FECTH_URL_PROVINCIAS,
    FECTH_URL_LOCALIDADES,
	FECTH_URL_LOCALIDADES_SELECT,
    FECTH_URL_CALLE,
	FECTH_URL_CODIGO_POSTAL,
	FECTH_URL_CODIGO_POSTAL_CABA
} from '../../Utils/urls'

import { ID_LOCALIDAD } from '../../Utils/const'
 

//GET PROVINCIAS:
export const setProvincias = (data) => {
	return {
		type: SET_PROVINCIAS,
		payload: data
	}
}
export const errorAutosuggestProvincia= (data) => {
	return {
		type: ERROR_AUTOSUGGEST_PROVINCIA,
		payload: data
	}
}
const loadingAutosuggestProvincia = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_PROVINCIA,
		payload: data
	}
}
export const searchProvincias = (descripcion) => {
	return dispatch => {
		dispatch(loadingAutosuggestProvincia(true))
		fetch(FECTH_URL_PROVINCIAS, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({descripcion:descripcion})
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setProvincias(data.body))
							dispatch(errorAutosuggestProvincia(false))
							dispatch(loadingAutosuggestProvincia(false))
						}else{
							dispatch(errorAutosuggestProvincia(true))
							dispatch(loadingAutosuggestProvincia(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestProvincia(true))
						dispatch(loadingAutosuggestProvincia(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(errorAutosuggestProvincia(true))
				dispatch(loadingAutosuggestProvincia(false))
			})
	}

}


//GET LOCALIDADES:
export const setLocalidades = (data) => {
	return {
		type: SET_LOCALIDADES,
		payload: data
	}
}
const loadingAutosuggestLocalidades = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_LOCALIDADES,
		payload: data
	}
}
const errorAutosuggestLocalidades= (data) => {
	return {
		type: ERROR_AUTOSUGGEST_LOCALIDADES,
		payload: data
	}
}
export const searchLocalidades = (request) => {
	return dispatch => {
		dispatch(loadingAutosuggestLocalidades(true))
		fetch(FECTH_URL_LOCALIDADES, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setLocalidades(data.body))
							dispatch(errorAutosuggestLocalidades(false))
							dispatch(loadingAutosuggestLocalidades(false))
						}else{
							dispatch(errorAutosuggestLocalidades(true))
							dispatch(loadingAutosuggestLocalidades(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestLocalidades(true))
						dispatch(loadingAutosuggestLocalidades(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(errorAutosuggestLocalidades(true))
				dispatch(loadingAutosuggestLocalidades(false))
			})
	}

}


//GET CALLE:
const setCalle = (data) => {
	return {
		type: SET_CALLE,
		payload: data
	}
}
const loadingAutosuggestCalle = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_CALLE,
		payload: data
	}
}
const errorAutosuggestCalle= (data) => {
	return {
		type: ERROR_AUTOSUGGEST_CALLE,
		payload: data
	}
}
export const searchCalle = (descripcion) => {
	return dispatch => {
		dispatch(loadingAutosuggestCalle(true))
		fetch(FECTH_URL_CALLE, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({idLocalidad: ID_LOCALIDAD,descripcion:descripcion})
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setCalle(data.body))
							dispatch(errorAutosuggestCalle(false))
							dispatch(loadingAutosuggestCalle(false))
						}else{
							dispatch(errorAutosuggestCalle(true))
							dispatch(loadingAutosuggestCalle(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestCalle(true))
						dispatch(loadingAutosuggestCalle(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(loadingAutosuggestCalle(false))
			})
	}

}


//GET CODIGO POSTAL:
const setCodigoPostal = (data) => {
	return {
		type: SET_CODIGO_POSTAL,
		payload: data
	}
}
const loadingAutosuggestCodigoPostal = (data) => {
	return {
		type: LOADING_AUTOSUGGEST_CODIGO_POSTAL,
		payload: data
	}
}
const errorAutosuggestCodigoPostal= (data) => {
	return {
		type: ERROR_AUTOSUGGEST_CODIGO_POSTAL,
		payload: data
	}
}
export const searchCodigoPostal = (descripcion) => {
	return dispatch => {
		dispatch(loadingAutosuggestCodigoPostal(true))
		fetch(FECTH_URL_CODIGO_POSTAL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({descripcion:descripcion})
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setCodigoPostal(data.body))
							dispatch(errorAutosuggestCodigoPostal(false))
							dispatch(loadingAutosuggestCodigoPostal(false))
						}else{
							dispatch(errorAutosuggestCodigoPostal(true))
							dispatch(loadingAutosuggestCodigoPostal(false))
						}
					}).catch(err => {
						console.log(err)
						dispatch(errorAutosuggestCodigoPostal(true))
						dispatch(loadingAutosuggestCodigoPostal(false))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(errorAutosuggestCodigoPostal(true))
				dispatch(loadingAutosuggestCodigoPostal(false))
			})
	}

}


//GET CODIGO POSTAL CABA:
const setCodigoPostalCABA = (data) => {
	return {
		type: SET_CODIGO_POSTAL_CABA,
		payload: data
	}
}
export const searchCodigoPostalCaba = (calle, nroCalle) => {
	return dispatch => {
		fetch(FECTH_URL_CODIGO_POSTAL_CABA, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({calle:calle, numero:nroCalle})
		})
			.then((response) => {
				response.json()
					.then(data => {
						if(data.status ===200){
						dispatch(setCodigoPostalCABA(data.body))
						}
					})
			})
			.catch(err => {
				console.log(err)
			})
	}

}


//GET LOCALIDADES SELECT:
const setLocalidadesSelect = (data) => {
	return {
		type: SET_LOCALIDADES_SELECT,
		payload: data
	}
}
export const searchLocalidadesSelect = (request) => {
	return dispatch => {
		dispatch(loadingAutosuggestLocalidades(true))
		fetch(FECTH_URL_LOCALIDADES_SELECT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request)
		})
			.then((response) => {
				response.json()
					.then(data => {
						if (data.status ===200){
							dispatch(setLocalidadesSelect(data.body))					
						}else{
							dispatch(setLocalidadesSelect(null))
							
						}
					}).catch(err => {
						console.log(err)
						dispatch(setLocalidadesSelect(null))
					})
			})
			.catch(err => {
				console.log(err)
				dispatch(setLocalidadesSelect(null))
			})
	}

}
