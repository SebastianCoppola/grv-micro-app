import {
    SET_DENUNCIAS, SET_DENUNCIAS_TABLERO_BORRADOR,
    SET_DENUNCIAS_TABLERO_INCOMPLETO,
    SET_DENUNCIAS_TABLERO_COMPLETO,
    SET_CANTIDAD_DENUNCIAS,
    SET_DENUNCIA,
    SET_LOADING_DENUNCIA,
    SET_PRE_DENUNCIA,
    SET_DATA_GRAFICOS,
    SET_TIPO_SEDE, SET_SEDE,
    SET_SINIESTROS_ANTERIORES,
    SET_LOADING_NUEVA_DENUNCIA,
    SET_CENTRO_MEDICO_SUGERIDO,
    LOADING_DENUNCIAS_ANTERIORES_REINGRESO,
    SET_LOADING_CARDS,
    LOADING_PRE_DENUNCIAS,
    BUSQUEDA_CENTRO_MEDICO,
    SET_LOADING_SAVE_DENUNCIA,
    SET_LOADING_UPDATE,
    GET_CAMPOS_REQUERIDOS,
    SET_DATA_PRESTADOR, SET_CORTO_PUNZANTE_ANTERIOR_ACTIVO,
    SET_REDUX_DENUNCIA_SNACKBAR,
    ERROR_AUTOSUGGEST_CENTROS_MEDICOS,
    ERROR_AUTOSUGGEST_SEDE,
    ERROR_AUTOSUGGEST_TIPO_SEDE,
    LOADING_AUTOSUGGEST_CENTROS_MEDICOS,
    LOADING_AUTOSUGGEST_SEDE,
    LOADING_AUTOSUGGEST_TIPO_SEDE,
    SET_LOADING_ENVIAR_A_PENDIENTES,
    LOADING_SINIESTROS_MULTIPLES_SAVE,
    SET_LOADING_SINIESTRO_MULTIPLE_SAVE_DENUNCIA,
    LOADING_GENERAR_PREDENUNCIA,
    LOADING_BUSQUEDA_PRESTADOR,
    SET_LOADING_CAMPOS_REQUERIDOS,
    SET_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR,
    SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
    SET_DATA_PRESTADORES_BUSCADOR,
} from '../actionTypes';
import {
    FECTH_URL_ACCIDENTADO,
    FECTH_URL_DENUNCIAS,
    FECTH_URL_GET_DENUNCIA_BY_ID,
    MARCAR_VERIFICADA_DENUNCIA,
    FECTH_URL_PRE_DENUNCIAS,
    FECTH_URL_SAVE_DENUNCIA,
    FECTH_URL_ASIGNAR_RESPONSABLE_PRE_DENUNCIA,
    FECTH_URL_DESASIGNAR_RESPONSABLE_PRE_DENUNCIA,
    FECTH_URL_ENVIAR_PENDIENTES,
    FETCH_URL_ASOCIAR_DENUNCIA_EXISTENTE,
    FETCH_URL_UPDATE_DENUNCIA,
    FETCH_URL_DESACTIVAR_ALARMA_TRASLADO,
    FETCH_URL_NUEVA_SEDE,
    FETCH_URL_GENERAR_PRE_DENUNCIA,
    FETCH_URL_CAMPOS_REQUERIDOS,
    FETCH_URL_ANULAR_PRE_DENUNCIA,
    FETCH_URL_GUARDAR_SINIESTROS_MULTIPLES,
    FETCH_URL_SINIESTROS_MULTIPLES_SAVE_DENUNCIA,
    FETCH_URL_CLONAR_DENUNCIA_REINGRESO,
    FECTH_URL_DENUNCIAS_EXPORTAR,
    FETCH_URL_CORTO_PUNZANTE_ANTERIOR_ACTIVO,
    FETCH_URL_CAMPOS_REQUERIDOS_DENUNCIA,
    FETCH_URL_ENVIAR_MAIL_CORTO_PUNZANTES_ANTERIORES_ACTIVOS,
    FECTH_URL_CANTIDAD_DENUNCIAS,
    FECTH_URL_SUPERVISOR_GRAFICOS,
    FETCH_URL_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR,
} from '../../Urls/callCenter'

import {
    FECTH_URL_BUSQUEDA_PRESTADOR,
    FECTH_URL_SEDE, FECTH_URL_TIPO_SEDE,
    FETCH_URL_BUSQUEDA_CENTROS_MEDICOS,
    FETCH_URL_CENTROS_MEDICOS_A_DETERMINAR,
    FETCH_URL_CENTROS_MEDICOS_SUGERIDOS,
    FETCH_URL_ENVIAR_MAIL_PRIMERA_ASISTENCIA,
} from '../../Urls/contrataciones'

import {
    estadosCEM, ENVIAR_PENDIENTES_OK, MAIL_ENVIADO_OK,
    MAIL_ENVIADO_ERROR, SNACK_WARNING, SNACK_SEVERITY,
    MENSAJE_ERROR_DESACTIVAR_ALARMA, MENSAJE_OK_DESACTIVAR_ALARMA
} from '../../Utils/const'

import { exportarExcel } from "./importarExportar"


//GET ACCIDENTADO:
const setLoadingNuevaDenuncia = (data) => {
    return {
        type: SET_LOADING_NUEVA_DENUNCIA,
        payload: data
    }
}
export const searchAccidentado = (tipoDocumento, nroDocumento, idEmpleador, successAccidentado) => {
    return dispatch => {
        dispatch(setLoadingNuevaDenuncia(true));
        fetch(FECTH_URL_ACCIDENTADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tipoDoc: tipoDocumento,
                nroDoc: nroDocumento,
                idEmpleador: idEmpleador
            })
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (successAccidentado) {
                            dispatch(setLoadingNuevaDenuncia(false))
                            successAccidentado(data.body)
                        }
                    })
                    .catch(
                        dispatch(setLoadingNuevaDenuncia(false))
                    )
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingNuevaDenuncia(false))
            })
    }
}


//GET DENUNCIAS:
export const setDenuncias = (data) => {
    return {
        type: SET_DENUNCIAS,
        payload: data
    }
}
const setLoading = (data) => {
    return {
        type: SET_LOADING_DENUNCIA,
        payload: data
    }
}
export const searchDenuncias = (request) => {
    return dispatch => {
        dispatch(setLoading(true))
        fetch(FECTH_URL_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setLoading(false))
                        dispatch(setDenuncias(data.body))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoading(false))
            })
    }
}


//GET DATA TABLERO DENUNCIAS: 
const setLoadingCards = (data) => {
    return {
        type: SET_LOADING_CARDS,
        payload: data
    }
}
const setDenunciaTableros = (data, estado) => {
    let payload = null
    let type = null
    switch (estado) {
        case estadosCEM.INCOMPLETO:
            type = SET_DENUNCIAS_TABLERO_INCOMPLETO
            payload = { list: data.objetos, total: data.cantidadTotal }
            break
        case estadosCEM.COMPLETO:
            type = SET_DENUNCIAS_TABLERO_COMPLETO
            payload = { list: data.objetos, total: data.cantidadTotal }
            break
        case estadosCEM.BORRADOR:
            type = SET_DENUNCIAS_TABLERO_BORRADOR
            payload = { list: data.objetos, total: data.cantidadTotal }
            break
        default:
            break
    }
    return {
        type: type,
        payload: payload
    }
}
export const searchTableroDenuncias = (request, estado, callBack) => {
    return dispatch => {
        dispatch(setLoadingCards(true))
        fetch(FECTH_URL_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.body && data.status == 200) {
                            dispatch(setLoadingCards(false))
                            dispatch(setDenunciaTableros(data.body, estado))
                            callBack(true, data.body, estado)

                        } else {
                            dispatch(setLoadingCards(false))
                        }
                    })
                    .catch(
                        dispatch(setLoadingCards(false))
                    )
            })
            .catch(err => {
                dispatch(setLoadingCards(false))
            })
    }
}


//GET CANTIDAD DENUNCIAS:
const setCantidadDenuncias = (data) => {
    return {
        type: SET_CANTIDAD_DENUNCIAS,
        payload: data
    }
}
export const searchCantidadDenuncias = (request, callback) => {
    return dispatch => {
        fetch(FECTH_URL_CANTIDAD_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setCantidadDenuncias(data.body))
                        callback(false)
                    })
            })
            .catch(err => {
                console.log(err);
                callback(false)
            })
    }
}


//GET DENUNCIA BY ID:
const setDenuncia = (data) => {
    return {
        type: SET_DENUNCIA,
        payload: data
    }
}
export const searchDenunciaById = (request, estadoCEM, callback, codigo) => {
    return dispatch => {
        // dispatch(setLoading(true))
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
            // .catch(() => {
            //     console.log('here1')
            //     if (callback) callback(false)
            //     dispatch(setLoading(false))
            // })
        })
        .catch(() => {
            if (callback) callback(false)
            dispatch(setLoading(false))
        })
    }
}


//SEARCH PRE DENUNCIAS: 
const setLoadingPreDenuncias = (data) => {
    return {
        type: LOADING_PRE_DENUNCIAS,
        payload: data
    }
}
const setPreDenuncia = (data) => {
    return {
        type: SET_PRE_DENUNCIA,
        payload: data
    }
}
export const searchPreDenuncias = (request) => {
    return dispatch => {
        dispatch(setLoadingPreDenuncias(true))
        fetch(FECTH_URL_PRE_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setPreDenuncia(data.body))
                        dispatch(setLoadingPreDenuncias(false))
                    })
                    .catch(error => {
                        dispatch(setLoadingPreDenuncias(false))
                    })
            })
            .catch(err => {
                dispatch(setLoadingPreDenuncias(false))
                console.log(err)
            })
    }
}


//MARCAR COMO VERIFICADO:
export const marcarVerificado = (request, callback, rowSelected) => {
    return () => {
        fetch(MARCAR_VERIFICADA_DENUNCIA, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            if (rowSelected) {
                                callback(rowSelected, true)
                            }
                            else {
                                callback(true)
                            }
                        } else {
                            if (rowSelected) {
                                callback(rowSelected, false)
                            } else {
                                callback(false)
                            }

                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//GET TABLEROS GRAFICOS:
const setDataGraficos = (data) => {
    return {
        type: SET_DATA_GRAFICOS,
        payload: data
    }
}
export const fetchTableroGraficos = (request, callback) => {
    return dispatch => {
        fetch(FECTH_URL_SUPERVISOR_GRAFICOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        dispatch(setDataGraficos(data.body))
                        callback(false)
                    })
            })
            .catch(err => {
                console.log(err)
                callback(false)
            })
    }
}


//GET TIPO SEDE:
const setTipoSede = (data) => {
    return {
        type: SET_TIPO_SEDE,
        payload: data
    }
}
const errorAutosuggestTipoSede = (data) => {
    return {
        type: ERROR_AUTOSUGGEST_TIPO_SEDE,
        payload: data
    }
}
const loadingAutosuggestTipoSede = (data) => {
    return {
        type: LOADING_AUTOSUGGEST_TIPO_SEDE,
        payload: data
    }
}
export const searchTipoSede = (id, request) => {
    return dispatch => {
        dispatch(loadingAutosuggestTipoSede(true))
        fetch(FECTH_URL_TIPO_SEDE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'idEmpleador': id, 'descripcion': request }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setTipoSede(data.body))
                            dispatch(errorAutosuggestTipoSede(false))
                            dispatch(loadingAutosuggestTipoSede(false))
                        } else {
                            dispatch(errorAutosuggestTipoSede(true))
                            dispatch(loadingAutosuggestTipoSede(false))
                        }
                    }).catch(err => {
                        console.log(err)
                        dispatch(errorAutosuggestTipoSede(true))
                        dispatch(loadingAutosuggestTipoSede(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(errorAutosuggestTipoSede(true))
                dispatch(loadingAutosuggestTipoSede(false))
            })
    }
}


//GET SEDE:
const setSede = (data) => {
    return {
        type: SET_SEDE,
        payload: data
    }
}
const loadingAutosuggestSede = (data) => {
    return {
        type: LOADING_AUTOSUGGEST_SEDE,
        payload: data
    }
}
const errorAutosuggestSede = (data) => {
    return {
        type: ERROR_AUTOSUGGEST_SEDE,
        payload: data
    }
}
export const searchSede = (id, request) => {
    return dispatch => {
        dispatch(loadingAutosuggestSede(true))
        fetch(FECTH_URL_SEDE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'idTipoSede': id, 'descripcion': request }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(errorAutosuggestSede(false))
                            dispatch(loadingAutosuggestSede(false))
                            dispatch(setSede(data.body))
                        } else {
                            dispatch(errorAutosuggestSede(true))
                            dispatch(loadingAutosuggestSede(false))
                            dispatch(setSede([]))
                        }
                    }).catch(err => {
                        console.log(err)
                        dispatch(errorAutosuggestSede(true))
                        dispatch(loadingAutosuggestSede(false))
                        dispatch(setSede([]))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(errorAutosuggestSede(true))
                dispatch(loadingAutosuggestSede(false))
                dispatch(setSede([]))

            })
    }
}


//SAVE DENUNCIA: 
const setLoadingSaveDenuncia = (data) => {
    return {
        type: SET_LOADING_SAVE_DENUNCIA,
        payload: data
    }
}
export const saveDenuncia = (request, callback, tipo) => {
    return dispatch => {
        dispatch(setLoadingSaveDenuncia(true))
        fetch(FECTH_URL_SAVE_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 201) {
                            dispatch(setLoadingSaveDenuncia(false))
                            let dato = data && data.body
                            callback(true, dato, tipo)
                        } else {
                            dispatch(setLoadingSaveDenuncia(false))
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingSaveDenuncia(false))
            })
    }
}


//GET SINIESTTROS ANTERIORES:
const setSiniestrosAnteriores = (data) => {
    return {
        type: SET_SINIESTROS_ANTERIORES,
        payload: data
    }
}
export const searchSiniestrosAnteriores = (request, callback) => {
    return dispatch => {
        fetch(FECTH_URL_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            dispatch(setSiniestrosAnteriores(data.body))
                            if (callback) callback(true, data.body)
                        } else {
                            if (callback) callback(false, data.body)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//ASIGNAR RESPONSABLE:
export const asignarResponsable = (request, callback) => {
    return () => {
        fetch(FECTH_URL_ASIGNAR_RESPONSABLE_PRE_DENUNCIA, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, 'Se asigno correctamente el Responsable')
                        } else {
                            callback(false, 'Error al asignar Responsable')
                        }
                    })
                    .catch(err => {
                        callback(false, 'Error al asignar Responsable')
                    })
            })
            .catch(err => {
                callback(false, 'Error al asignar Responsable')
            })
    }
}


//ENVIAR PENDIENTES:
const setLoadingEnviarApendientes = (data) => {
    return {
        type: SET_LOADING_ENVIAR_A_PENDIENTES,
        payload: data
    }
}
export const enviarPendientes = (request, success) => {
    return dispatch => {
        dispatch(setLoadingEnviarApendientes(true))
        fetch(FECTH_URL_ENVIAR_PENDIENTES, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            if (success) {
                                dispatch(setLoadingEnviarApendientes(false))
                                success(ENVIAR_PENDIENTES_OK, 'success')
                            }
                        } else {
                            dispatch(setLoadingEnviarApendientes(false))
                            success(data.message, 'error')
                        }
                        dispatch(setSede(data.body))
                    })
            })
            .catch(err => {
                dispatch(setLoadingEnviarApendientes(false))
                console.log(err)
            })
    }
}


//DESASIGNAR RESPONSABLE:
export const desasignarResponsable = (request, callback) => {
    return () => {
        fetch(FECTH_URL_DESASIGNAR_RESPONSABLE_PRE_DENUNCIA, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, 'Se desasigno correctamente el Responsable')
                        } else {
                            callback(false, 'Error al desasignar el Responsable')
                        }
                    })
            })
            .catch(err => {
                callback(false, 'Error al desasignar el Responsable')
                console.log(err)
            })
    }
}


//GET DENUNCIAS ANTERIORES:
const setLoadingDenunciasAnterioresReingreso = (data) => {
    return {
        type: LOADING_DENUNCIAS_ANTERIORES_REINGRESO,
        payload: data
    }
}
export const searchDenunciasAnteriores = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingDenunciasAnterioresReingreso(true))
        fetch(FECTH_URL_DENUNCIAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data) {
                            if (callback) callback(data.body)
                            dispatch(setLoadingDenunciasAnterioresReingreso(false))
                        } else {
                            dispatch(setLoadingDenunciasAnterioresReingreso(false))
                        }
                    })
                    .catch(error => {
                        dispatch(setLoadingDenunciasAnterioresReingreso(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingDenunciasAnterioresReingreso(false))
            })
    }
}


//GET CENTRO MEDICO:
export const setCentroMedicoSugerido = (data) => {
    return {
        type: SET_CENTRO_MEDICO_SUGERIDO,
        payload: data
    }
}
export const searchCentroMedicoSugerido = (request) => {
    return dispatch => {
        fetch(FETCH_URL_CENTROS_MEDICOS_SUGERIDOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data) {
                            dispatch(setCentroMedicoSugerido(data.body))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//ASOCIAR DENUNCIA:
export const asociarDenunciaExistente = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingPreDenuncias(true))
        fetch(FETCH_URL_ASOCIAR_DENUNCIA_EXISTENTE, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingPreDenuncias(false))
                            callback(true, 'PreDenuncia asociada correctamente')
                        } else {
                            dispatch(setLoadingPreDenuncias(false))
                            callback(false, 'No se pudo asociar la preDenuncia correspondiente')
                        }
                    })
            })
            .catch(err => {
                dispatch(setLoadingPreDenuncias(false))
                callback(false, 'No se pudo asociar la preDenuncia correspondiente')
            })
    }
}


//GENERAR PRE DENUNCIA:
const setLoadingGenerarPredenuncia = (data) => {
    return {
        type: LOADING_GENERAR_PREDENUNCIA,
        payload: data
    }
}
export const generarPreDenuncia = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingGenerarPredenuncia(true))
        fetch(FETCH_URL_GENERAR_PRE_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingGenerarPredenuncia(false))
                            callback(true, 'Se genera la Denuncia correspondiente', data.body)
                        } else {
                            dispatch(setLoadingGenerarPredenuncia(false))
                            callback(false, 'No se pudo generar la Denuncia correspondiente')
                        }
                    }).catch(err => {
                        dispatch(setLoadingGenerarPredenuncia(false))
                        callback(false, 'No se pudo generar la Denuncia correspondiente')
                    })
            })
            .catch(err => {
                dispatch(setLoadingGenerarPredenuncia(false))
                callback(false, 'No se pudo generar la Denuncia correspondiente')
            })
    }
}


//GET CENTRO MEDICO:
export const setBusquedaCentroMedicos = (data) => {
    return {
        type: BUSQUEDA_CENTRO_MEDICO,
        payload: data
    }
}
const errorAutosuggestCentrosMedicos = (data) => {
    return {
        type: ERROR_AUTOSUGGEST_CENTROS_MEDICOS,
        payload: data
    }
}
const loadingAutosuggestCentrosMedicos = (data) => {
    return {
        type: LOADING_AUTOSUGGEST_CENTROS_MEDICOS,
        payload: data
    }
}
export const searchBusquedaCentroMedico = (request, value) => {
    return dispatch => {
        let request3 = { ...request, descripcion: value }
        dispatch(loadingAutosuggestCentrosMedicos(true))
        fetch(FETCH_URL_BUSQUEDA_CENTROS_MEDICOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request3)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setBusquedaCentroMedicos(data.body))
                            dispatch(errorAutosuggestCentrosMedicos(false))
                            dispatch(loadingAutosuggestCentrosMedicos(false))
                        } else {
                            dispatch(errorAutosuggestCentrosMedicos(true))
                            dispatch(loadingAutosuggestCentrosMedicos(false))
                        }
                    }).catch(err => {
                        console.log(err)
                        dispatch(errorAutosuggestCentrosMedicos(true))
                        dispatch(loadingAutosuggestCentrosMedicos(false))
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(loadingAutosuggestCentrosMedicos(false))
            })
    }
}


//CENTRO MEDICO A DETERMINAR:
export const centroMedicoADeterminar = (callback) => {
    return () => {
        fetch(FETCH_URL_CENTROS_MEDICOS_A_DETERMINAR, {
            method: 'GET',
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data.body)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//UPDATE DENUNCIA:
const setLoadingUpdate = (data) => {
    return {
        type: SET_LOADING_UPDATE,
        payload: data
    }
}
export const updateDenuncia = (request, callback, tipo) => {
    return dispatch => {
        dispatch(setLoadingUpdate(true))
        fetch(FETCH_URL_UPDATE_DENUNCIA, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, tipo, data.body)
                            dispatch(setLoadingUpdate(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingUpdate(false))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingUpdate(false))
            })
    }
}


//ENVIAR MAIL PRIMERA ASISTENCIA:
export const enviarMailPrimeraAsistencia = (request, callback) => {
    return () => {
        fetch(FETCH_URL_ENVIAR_MAIL_PRIMERA_ASISTENCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(SNACK_SEVERITY.WARNING, MAIL_ENVIADO_OK, true)
                        } else if (data.status === 204) {
                            callback(SNACK_SEVERITY.WARNING, data.message, false)
                        } else {
                            callback(SNACK_SEVERITY.ERROR, MAIL_ENVIADO_ERROR, false)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//DESACTIVAR ALARMA TRASLADO:
export const desactivarAlarmaTraslado = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        fetch(FETCH_URL_DESACTIVAR_ALARMA_TRASLADO, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(SNACK_SEVERITY.SUCCESS, MENSAJE_OK_DESACTIVAR_ALARMA)

                        } else {
                            callback(SNACK_SEVERITY.ERROR, MENSAJE_ERROR_DESACTIVAR_ALARMA)
                            dispatch(setLoading(false))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                callback(SNACK_SEVERITY.ERROR, MENSAJE_ERROR_DESACTIVAR_ALARMA)
            })
    }
}


//GUARDAR NUEVA SEDE:
export const guardarNuevaSede = (request, callback, tipo) => {
    return () => {
        fetch(FETCH_URL_NUEVA_SEDE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data.body.idSede, tipo)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//GET CAMPOS REQUERIDOS:
const getCamposRequeridos = (data) => {
    return {
        type: GET_CAMPOS_REQUERIDOS,
        payload: data
    }
}
export const camposRequeridos = (request, callback) => {
    return dispatch => {
        fetch(FETCH_URL_CAMPOS_REQUERIDOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            if (callback) callback(true, data.body)
                            dispatch(getCamposRequeridos(data.body))
                        } else {
                            if (callback) callback(false)
                        }
                    })
            })
            .catch(() => {
                callback(false)
            })
    }
}


//ANULAR PRE DENUNCIA:
export const anularPreDenuncia = (request, callback) => {
    return () => {
        fetch(FETCH_URL_ANULAR_PRE_DENUNCIA, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true)
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//SAVE SINIESTRO MULTIPLE:
const loadingSiniestrosMultiplesSave = (data) => {
    return {
        type: LOADING_SINIESTROS_MULTIPLES_SAVE,
        payload: data
    }
}
export const saveSiniestrosMultiples = (request, callback) => {
    return dispatch => {
        dispatch(loadingSiniestrosMultiplesSave(true))
        fetch(FETCH_URL_GUARDAR_SINIESTROS_MULTIPLES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(loadingSiniestrosMultiplesSave(false))
                            callback(true, data.body)
                        } else {
                            dispatch(loadingSiniestrosMultiplesSave(false))
                            callback(false)
                        }
                    }).catch(err => {
                        dispatch(loadingSiniestrosMultiplesSave(false))
                        console.log(err)
                    })
            })
            .catch(err => {
                dispatch(loadingSiniestrosMultiplesSave(false))
                console.log(err)
            })
    }
}


//SAVE DENUNCIAS SINIESTROS MULTIPLES: 
const loadingSiniestrosMultiplesSaveDenuncia = (data) => {
    return {
        type: SET_LOADING_SINIESTRO_MULTIPLE_SAVE_DENUNCIA,
        payload: data
    }
}
export const saveDenunciaSiniestrosMultiples = (request, callback) => {
    return dispatch => {
        dispatch(loadingSiniestrosMultiplesSaveDenuncia(true))
        fetch(FETCH_URL_SINIESTROS_MULTIPLES_SAVE_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            dispatch(loadingSiniestrosMultiplesSaveDenuncia(false))
                            callback(true)
                        } else {
                            dispatch(loadingSiniestrosMultiplesSaveDenuncia(false))
                            callback(false)
                        }
                    }).catch(err => {
                        dispatch(loadingSiniestrosMultiplesSaveDenuncia(false))
                        console.log(err)
                    })
            })
            .catch(err => {
                dispatch(loadingSiniestrosMultiplesSaveDenuncia(false))
                console.log(err)
            })
    }
}


//CLONAR DENUNCIA:
export const clonarDenunciaReingreso = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingUpdate(true))
        fetch(FETCH_URL_CLONAR_DENUNCIA_REINGRESO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data.body)
                            dispatch(setLoadingUpdate(false))
                        } else {
                            callback(false, null)
                            dispatch(setLoadingUpdate(false))
                        }
                    }).catch(err => {
                        console.log(err)
                        dispatch(setLoadingUpdate(false))
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}


//GET PRESTADOR Buscador y tabla normal:
const setLoadingBusquedaPrestador = (data) => {
    return {
        type: LOADING_BUSQUEDA_PRESTADOR,
        payload: data
    }
}

const setLoadingBusquedaPrestadorBuscador = (data) => {
    return {
        type: SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
        payload: data
    }
}

const setDataPrestador = (data) => {
    return {
        type: SET_DATA_PRESTADOR,
        payload: data
    }
}

const setDataPrestadorBuscador = data => {
    return {
        type: SET_DATA_PRESTADORES_BUSCADOR,
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

export const limpiarDataPrestadoresBuscador = () => {
    return {
        type: SET_DATA_PRESTADORES_BUSCADOR,
        payload: []
    }
}

export const limpiarDataPrestadores = () => {
    return {
        type: SET_DATA_PRESTADOR,
        payload: []
    }
}

//BUSCAR DENUNCIAS EXPORTAR:
export const busquedaDenunciasExportar = (request, callback1) => {
    return dispatch => {
        const callback2 = (bool) => {
            callback1(bool)
            dispatch(setLoading(false))
        }
        dispatch(setLoading(true))
        fetch(FECTH_URL_DENUNCIAS_EXPORTAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(exportarExcel(data.body, callback2))
                        } else {
                            callback1(true)
                            dispatch(setLoading(false))
                        }
                    }).catch(() => {
                        callback1(true)
                        dispatch(setLoading(false))
                    })
            })
            .catch(() => {
                callback1(true)
                dispatch(setLoading(false))
            })
    }
}


//SET CORTO PUNZANTE:
export const setCortoPunzanteAnteriorActivo = data => {
    return {
        type: SET_CORTO_PUNZANTE_ANTERIOR_ACTIVO,
        payload: data
    }
}
export const fetchURLCortoPunzanteActivo = (req, errorCallback) => {
    return dispatch => {
        fetch(FETCH_URL_CORTO_PUNZANTE_ANTERIOR_ACTIVO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => {
                res.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setCortoPunzanteAnteriorActivo(data.body))
                            if (errorCallback) errorCallback(false)
                        } else if (data.status === 404) {
                            dispatch(setCortoPunzanteAnteriorActivo(null))
                            if (errorCallback) errorCallback(false)
                        } else {
                            dispatch(setCortoPunzanteAnteriorActivo(null))
                            if (errorCallback) errorCallback(true)
                        }
                    })
            })
            .catch(() => {
                dispatch(setCortoPunzanteAnteriorActivo(null))
                if (errorCallback) errorCallback(true)
            })
    }
}


//GET CAMPOS REQUERIDOS:
const setLoadingCamposRequeridos = (bool) => {
    return {
        type: SET_LOADING_CAMPOS_REQUERIDOS,
        payload: bool
    }
}
export const camposRequeridosDenuncia = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingCamposRequeridos(true))
        fetch(FETCH_URL_CAMPOS_REQUERIDOS_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, data.body)
                            dispatch(setLoadingCamposRequeridos(false))
                        } else {
                            callback(false)
                            dispatch(setLoadingCamposRequeridos(false))
                        }
                    })
            })
            .catch(err => {
                console.log(err)
                dispatch(setLoadingCamposRequeridos(false))
            })
    }
}


//SET SNACKBAR DENUNCIAS:
export const setReduxDenunciaSnackBar = (data) => {
    return {
        type: SET_REDUX_DENUNCIA_SNACKBAR,
        payload: data
    }
}


//ENVIAR MAIL CORTO PUNZANTE:
export const enviarMailCortoPunzantesAnterioresActivos = (request, cb) => {
    return () => {
        fetch(FETCH_URL_ENVIAR_MAIL_CORTO_PUNZANTES_ANTERIORES_ACTIVOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }).then(response => {
            response.json()
                .then(data => {
                    if (data.status === 200) {
                        cb(true)
                    } else {
                        cb(false)
                    }
                })
        }).catch(err => {
            console.log(err)
            cb(false)
        })
    }
}


//GET EXISTEN PREDENUNCIAS SIN ASIGNAR:
const setExistenPredenunciasSinAsignar = bool => {
    return {
        type: SET_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR,
        payload: bool
    }
}
export const getExistenPredenunciasSinAsignar = req => {
    return dispatch => {
        fetch(FETCH_URL_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setExistenPredenunciasSinAsignar(data.body))
                        } else {
                            dispatch(setExistenPredenunciasSinAsignar(false))
                        }
                    })
            })
            .catch(() => {
                dispatch(setExistenPredenunciasSinAsignar(false))
            })
    }
}