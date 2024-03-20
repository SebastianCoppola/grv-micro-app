import {
    SET_DENUNCIA,
    SET_LOADING_DENUNCIA,
    SET_DATA_PRESTADOR, 
    LOADING_BUSQUEDA_PRESTADOR,
    SET_DATA_PRESTADORES_BUSCADOR,
    SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
} from '../actionTypes'

import {
    FECTH_URL_GET_DENUNCIA_BY_ID,
    FECTH_URL_BUSQUEDA_PRESTADOR,
} from '../../Utils/urls'


//SEARCH DENUNCIA BY ID:
const setLoading = (data) => {
    return {
        type: SET_LOADING_DENUNCIA,
        payload: data
    }
}
const setDenuncia = (data) => {
    return {
        type: SET_DENUNCIA,
        payload: data
    }
}
export const searchDenunciaById = (request, estadoCEM, callback, codigo) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_GET_DENUNCIA_BY_ID, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idDenuncia: request, estadoCEM: estadoCEM }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDenuncia(data.body))
                            if (callback) callback(true, codigo)
                            dispatch(setLoading(false))
                        } else {
                            if (callback) callback(false)
                            dispatch(setLoading(false))
                        }
                    })
                    .catch(() => {
                        if (callback) callback(false)
                        dispatch(setLoading(false))
                    })
            })
            .catch(() => {
                if (callback) callback(false)
                dispatch(setLoading(false))
            })
    }
}

//BUSQUEDA PRESTADOR:
const setLoadingBusquedaPrestador = (data) => {
    return {
        type: LOADING_BUSQUEDA_PRESTADOR,
        payload: data
    }
}
const setDataPrestador = (data) => {
    return {
        type: SET_DATA_PRESTADOR,
        payload: data
    }
}
export const busquedaPrestador = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingBusquedaPrestador(true))
        fetch(FECTH_URL_BUSQUEDA_PRESTADOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataPrestador(data.body))
                            callback(false, data.body)
                        } else {
                            dispatch(setDataPrestador([]))
                            callback(false)
                        }
                        dispatch(setLoadingBusquedaPrestador(false))
                    }).catch(err => {
                        console.log(err)
                        callback(true)
                        dispatch(setLoadingBusquedaPrestador(false))
                    })
            })
            .catch(err => {
                console.log(err)
                callback(true)
            })
    }
}

//BUSQUEDA PRESTADOR BUSCADOR:
const setLoadingBusquedaPrestadorBuscador = (data) => {
    return {
        type: SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
        payload: data
    }
}
const setDataPrestadorBuscador = data => {
    return {
        type: SET_DATA_PRESTADORES_BUSCADOR,
        payload: data
    }
}
export const busquedaPrestadorBuscador = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingBusquedaPrestadorBuscador(true))
        fetch(FECTH_URL_BUSQUEDA_PRESTADOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataPrestadorBuscador(data.body))
                            callback(false, data.body)
                        } else {
                            dispatch(setDataPrestadorBuscador([]))
                            callback(false)
                        }
                        dispatch(setLoadingBusquedaPrestadorBuscador(false))
                    }).catch(err => {
                        console.log(err)
                        callback(true)
                        dispatch(setLoadingBusquedaPrestadorBuscador(false))
                    })
            })
            .catch(err => {
                console.log(err)
                callback(true)
            })
    }
}