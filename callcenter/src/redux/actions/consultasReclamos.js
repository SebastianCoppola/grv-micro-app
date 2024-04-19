
import {
    SET_EVOLUCIONES, 
    SET_LOADING_EVOLUCIONES, 
    SET_OBSERVACIONES, 
    SET_LOADING_OBSERVACIONES,
    SET_CONSULTAS_Y_RECLAMOS_COMPLETO, 
    SET_LOADING_RECLAMOS, 
    SET_CONSULTAS_Y_RECLAMOS_GENERAL, 
    SET_DETALLE_CONSULTA_RECLAMO, 
    LOADING_EDITAR_OBSERVACION, 
    LOADING_NUEVA_OBSERVACION
} from '../actionTypes'

import {
    FETCH_SERCH_EVOLUCIONES, 
    FETCH_SERCH_OBSERVACIONES, 
    FECTH_URL_SEARCH_CONSULTAS_RECLAMOS, 
    FECTH_URL_SEARCH_DETALLE_CONSULTAS_RECLAMOS,
    FECTH_URL_NUEVA_OBSERVACION,
    FECTH_URL_ELIMINAR_OBSERVACIONES,
    FECTH_URL_EDITAR_OBSERVACION,
    FECTH_URL_CREAR_CONSULTAS_RECLAMOS,
    FECTH_URL_EXPORTAR_CONSULTA_RECLAMO
} from '../../Urls/callCenter'

import {
    SNACK_SEVERITY, 
    NUEVA_CONSULTA_RECLAMO_OK, 
    NUEVA_CONSULTA_RECLAMO_ERROR, 
    NOMBRE_EXCEL_EXPORTAR_CONSULTA_RECLAMO
} from '../../Utils/const'


//Get Evoluciones:
const setEvoluciones = (data) => {
    return {
        type: SET_EVOLUCIONES,
        payload: data
    }
}
const setLoadingEvolucion = (data) => {
    return {
        type: SET_LOADING_EVOLUCIONES,
        payload: data
    }
}
export const searchEvoluciones = (request) => {
    return dispatch => {
        dispatch(setLoadingEvolucion(true))
        fetch(FETCH_SERCH_EVOLUCIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setEvoluciones(data.body))
                            dispatch(setLoadingEvolucion(false))
                        } else {
                            dispatch(setLoadingEvolucion(false))
                        }
                    })
                })
                .catch(err => {
                dispatch(setLoadingEvolucion(false))
                console.log(err)
            })
    }
}


//Get Observaciones:
const setObservaciones = (data) => {
    return {
        type: SET_OBSERVACIONES,
        payload: data
    }
}
const setLoadingObservaciones = (data) => {
    return {
        type: SET_LOADING_OBSERVACIONES,
        payload: data
    }
}
export const searchObservaciones = (request) => {
    return dispatch => {
        dispatch(setLoadingObservaciones(true))
        fetch(FETCH_SERCH_OBSERVACIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setObservaciones(data.body))
                            dispatch(setLoadingObservaciones(false))
                        } else {
                            dispatch(setLoadingObservaciones(false))
                        }
                    })
                })
                .catch(err => {
                dispatch(setLoadingObservaciones(false))
                console.log(err)
            })
    }
}


//Get Reclamo By Denuncia:
const setLoading = (data) => {
    return {
        type: SET_LOADING_RECLAMOS,
        payload: data
    }
}
const setReclamosCompleto = (data) => {
    return {
        type: SET_CONSULTAS_Y_RECLAMOS_COMPLETO,
        payload: data
    }
}
export const searchReclamosByDenuncia = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_CONSULTAS_RECLAMOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data) {
                            dispatch(setReclamosCompleto(data.body ? data.body : []))
                        }
                        dispatch(setLoading(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}


//Get Reclamo General:
const setReclamosGeneral = (data) => {
    return {
        type: SET_CONSULTAS_Y_RECLAMOS_GENERAL,
        payload: data
    }
}
export const searchReclamosGeneral = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_CONSULTAS_RECLAMOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data) {
                            dispatch(setReclamosGeneral(data.body ? data.body : []))
                        }
                        dispatch(setLoading(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}


//Get Detalle Reclamo:
const setDetalleConsultaReclamo = (data) => {
    return {
        type: SET_DETALLE_CONSULTA_RECLAMO,
        payload: data
    }
}
export const searchDetalleReclamo = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_SEARCH_DETALLE_CONSULTAS_RECLAMOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idContactoCallcenter: request })
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data) {
                           dispatch(setDetalleConsultaReclamo(data.body))
                        }
                        dispatch(setLoading(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}


//Nueva Observación:
const loadingNuevaObservacion = (data) => {
    return {
        type: LOADING_NUEVA_OBSERVACION,
        payload: data
    }
}
export const nuevaObservacion = (request, callback) => {
    return dispatch => {
        dispatch(loadingNuevaObservacion(true))
        fetch(FECTH_URL_NUEVA_OBSERVACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                           callback(true, 'Nueva Observacion agregada con exito')
                           dispatch(loadingNuevaObservacion(false))
                        }else{
                            callback(false, 'Error al agregar nueva Observacion')
                            dispatch(loadingNuevaObservacion(false))
                        }
                        //dispatch(setLoading(false))
                    })
                    .catch(err =>{
                        console.log(err)
                        callback(false, 'Error al agregar nueva Observacion')
                        dispatch(loadingNuevaObservacion(false))
                    })
            })
            .catch(err => {
                console.log(err)
                callback(false, 'Error al agregar nueva Observacion')
                dispatch(loadingNuevaObservacion(false))
            })
    }
}


//Eliminar Observación:
export const eliminarObservaciones = (request, callback) => {
    return () => {
        fetch(FECTH_URL_ELIMINAR_OBSERVACIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                           callback(true, 'Observacion/es eliminada/s con exito')
                        }else{
                            callback(false, 'Error al eliminar Observacion/es')
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                        callback(false, 'Error al eliminar Observacion/es')
                    })
            })
            .catch(err => {
                console.log(err)
                callback(false, 'Error al eliminar Observacion/es')
            })
    }
}


//Editar Observación:
const loadingEditarObservacion = (data) => {
    return {
        type: LOADING_EDITAR_OBSERVACION,
        payload: data
    }
}
export const editarObservacion = (request, callback) => {
    return dispatch => {
        dispatch(loadingEditarObservacion(true))
        fetch(FECTH_URL_EDITAR_OBSERVACION, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                           callback(true, 'Observación modificada con exito')
                           dispatch(loadingEditarObservacion(false))
                        }else{
                            callback(false, 'Error al modificar Observación')
                            dispatch(loadingEditarObservacion(false))
                        }
                    })
                    .catch(err =>{
                        console.log(err)
                        callback(false, 'Error al modificar Observación')
                        dispatch(loadingEditarObservacion(false))
                    })
            })
            .catch(err => {
                console.log(err)
                callback(false, 'Error al modificar Observación')
                dispatch(loadingEditarObservacion(false))
            })
    }
}


//Crear Consulta o Reclamo:
export const crearConsultaReclamo = (request, success) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_CREAR_CONSULTAS_RECLAMOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setLoading(false))
                        if (data.status === 200) {
                            success(SNACK_SEVERITY.SUCCESS, NUEVA_CONSULTA_RECLAMO_OK, data.body.idContactoCallcenter)
                        }else{
                            success(SNACK_SEVERITY.ERROR, NUEVA_CONSULTA_RECLAMO_ERROR, null)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                success(SNACK_SEVERITY.ERROR, NUEVA_CONSULTA_RECLAMO_ERROR)
                dispatch(setLoading(false))
            })
    }
}


//Exportar Consultas y Reclamos:
export const exportarExcelConsultaReclamo = (request, callBack) => {
    return () => {
        fetch(FECTH_URL_EXPORTAR_CONSULTA_RECLAMO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status == 200) {
                    callBack(false)
                    return response.blob()
                } else {
                    callBack(true)
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', NOMBRE_EXCEL_EXPORTAR_CONSULTA_RECLAMO);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}