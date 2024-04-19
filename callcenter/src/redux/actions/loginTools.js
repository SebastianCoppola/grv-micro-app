//ACTION TYPES:
import {
    SET_PARAMETROS,
    SET_LOADING_PARAMETROS,
    SET_LOADING_SAVE_PARAMETROS,
} from '../actionTypes';

//URL:
import {
    URL_SAVE_PARAMETROS,
    URL_GET_PARAMETROS,
} from '../../Urls/auditoriaMedica'

//GET PARAMETROS:
const setParametros = (data) => {
    return {
        type: SET_PARAMETROS,
        payload: data
    }
}
const setLoadingParametros = (bool) => {
    return {
        type: SET_LOADING_PARAMETROS,
        payload: bool
    }
}
export const getParametrosByUsuario = (req, exitoCallback) => {
    return dispatch => {
        dispatch(setLoadingParametros(true))
        fetch(URL_GET_PARAMETROS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if(data.status === 200){
                            if(exitoCallback) exitoCallback(true)
                            dispatch(setParametros(data.body))
                            dispatch(setLoadingParametros(false))
                        }else{
                            if(exitoCallback) exitoCallback(true)
                            dispatch(setParametros(null))
                            dispatch(setLoadingParametros(false))
                        }
                    })
                })
            .catch(()=>{
                if(exitoCallback) exitoCallback(true)
                dispatch(setParametros(null))
                dispatch(setLoadingParametros(false))
            })
    }   
}

//SAVE PARAMETROS:
const setLoadingSaveParametros = (bool) => {
    return {
        type: SET_LOADING_SAVE_PARAMETROS,
        payload: bool
    }
}
export const saveParametros = (req, exitoCallback) => {      
    return dispatch => {
        dispatch(setLoadingSaveParametros(true))
        fetch(URL_SAVE_PARAMETROS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then(data => {
                        if(data.status === 200){
                            if(exitoCallback) exitoCallback(true)
                            dispatch(setLoadingSaveParametros(false))
                        }else{
                            if(exitoCallback) exitoCallback(false)
                            dispatch(setLoadingSaveParametros(false))
                        }
                    })
                })
            .catch(()=>{
                if(exitoCallback) exitoCallback(false)
                dispatch(setLoadingSaveParametros(false))
            })
    }   
}

