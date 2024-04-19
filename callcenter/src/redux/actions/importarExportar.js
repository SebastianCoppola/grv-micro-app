import {
    FECTH_URL_IMPORTAR,
    FECTH_URL_CODIGO_BARRAS,
    FECTH_URL_EXPORTAR_EXCEL,
    FECTH_URL_DESCARGAR_PDF_TRASLADO
} from '../../Urls/callCenter'

import {
    FETCH_URL_DESCARGAR_PDF_AUTORIZACION,
    FETCH_URL_DESCARGAR_PDF_ORDEN_MEDICA
} from '../../Urls/auditoriaMedica'

import {
    URL_IMPORTAR_PN,
    URL_IMPORTAR_PNN,
    URL_IMPORTAR_MODULOS,
    FECTH_URL_EXPORTAR_CONSULTA_GENERICA,
    FECTH_URL_IMPORTAR_SUBPRESTADORES,
    FECTH_URL_IMPORTAR_LOCALIDADES,
    FETCH_URL_DESCARGAR_PDF_HISTORICO,
    FETCH_URL_EXPORTAR_PDF_CONVENIO_TRASLADO
} from '../../Urls/contrataciones'

import {
    SET_LOCALIDADES_IMPORTADAS,
    SET_LOADING_IMPORTAR,
    SET_LOADING_IMMPRIMIR_PDF_AUTORIZACION,
    SET_LOADING_DESCARGAR_PDF_ORDEN_MEDICA,
    SET_LOADING_DESCARGAR_PDF_INICIO_SG,
    SET_LOADING_DESCARGAR_PDF_CONVENIO_TRASLADO
} from '../actionTypes'

import { NOMBRE_EXCEL_EXPORTAR_CONSULTA, NOMBRE_PDF_TRASLADO, NOMBRE_PDF_CONVENIO_TRASLADO, GUION, PDF } from '../../Utils/const'

import { FETCH_URL_DESCARGAR_PDF_INICIO_SG } from '../../Urls/solicitudesGenericas'

// IMPORTAR DOCUMENTO:
export const importarDocumento = (request, callback) => {
    return () => {
        fetch(FECTH_URL_IMPORTAR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
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

// IMPORTAR CODIGO BARRAS:
export const importarCodigoBarras = (request, callback) => {
    return () => {
        fetch(FECTH_URL_CODIGO_BARRAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.text()
                    .then(data => {
                        if (data) {
                            callback(true, data)
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

// EXPORTAR EXCEL:
export const exportarExcel = (request, callBack) => {
    return () => {
        fetch(FECTH_URL_EXPORTAR_EXCEL, {
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
                    link.setAttribute('download', NOMBRE_EXCEL_EXPORTAR_CONSULTA);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// EXPORTAR CONSULTA GENERICA:
export const exportarConsultaGenerica = (request, title, callBack) => {
    return () => {
        fetch(FECTH_URL_EXPORTAR_CONSULTA_GENERICA, {
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
                    link.setAttribute('download', title);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// IMPORTAR SUBPRESTADORES
export const importarSubprestadores = (request, callback) => {
    return () => {
        fetch(FECTH_URL_IMPORTAR_SUBPRESTADORES, {
            method: 'POST',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status == 200) {
                            callback(true, data)
                            if (data.body.startsWith("Error")) {
                                callback(false)
                            }
                        } else {
                            callback(false, data)
                        }
                    })
            })
            .catch(err => {
                callback(false, err)
            })
    }
}

//IMPORTAR LOCALIDADES:
const setLocalidadesImportadas = (data) => {
    return {
        type: SET_LOCALIDADES_IMPORTADAS,
        payload: data
    }
}
export const importarLocalidades = (request, callback) => {
    return (dispatch) => {
        fetch(FECTH_URL_IMPORTAR_LOCALIDADES, {
            method: 'POST',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLocalidadesImportadas(data.body))
                            callback(true)
                            if (data.message.startsWith("Error")) {
                                callback(true, data.message)
                            }
                        } else {
                            callback(false)
                        }
                    })
            })
            .catch(err => {
                callback(false)
            })
    }
}

//IMPORTAR PRESTACIONES NOMENCLADAS, NO NOMENCLADAS & MODULOS:
const setLoadingImportar = (boolean) => {
    return {
        type: SET_LOADING_IMPORTAR,
        payload: boolean
    }
}
export const importarPrestacionesNomencladas = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingImportar(true))
        fetch(URL_IMPORTAR_PN, {
            method: 'POST',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, data, "pn")

                        } else {
                            callback(false, data, "pn")
                        }
                        dispatch(setLoadingImportar(false))
                    })
            })
            .catch(err => {
                callback(false, err, "pn")
                dispatch(setLoadingImportar(false))
            })
    }
}
export const importarPrestacionesNoNomencladas = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingImportar(true))
        fetch(URL_IMPORTAR_PNN, {
            method: 'POST',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, data, "pnn")
                        } else {
                            callback(false, data, "pnn")
                        }
                        dispatch(setLoadingImportar(false))
                    })
            })
            .catch(err => {
                callback(false, err, "pnn")
                dispatch(setLoadingImportar(false))
            })
    }
}
export const importarModulos = (request, callback) => {
    return (dispatch) => {
        dispatch(setLoadingImportar(true))
        fetch(URL_IMPORTAR_MODULOS, {
            method: 'POST',
            headers: {},
            body: request
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            callback(true, data, "modulos")
                        } else {
                            callback(false, data, "modulos")
                        }
                        dispatch(setLoadingImportar(false))
                    })
            })
            .catch(err => {
                callback(false, err, "modulos")
                dispatch(setLoadingImportar(false))
            })
    }
}

// EXPORTAR PDF:
export const exportarPDF = (request, callBack, convenio, proveedor) => {
    return () => {
        fetch(FETCH_URL_DESCARGAR_PDF_HISTORICO, {
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
                    link.setAttribute('download', "convenio-" + convenio + "-" + proveedor);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// DESCARGAR PDF AUTORIZACION:
const setLoadingPdfAutorizacion = (bool) => {
    return {
        type: SET_LOADING_IMMPRIMIR_PDF_AUTORIZACION,
        payload: bool
    }
}
export const getPdfAutorizacion = (req, errorCallBack) => {
    return dispatch => {
        dispatch(setLoadingPdfAutorizacion(true))
        fetch(FETCH_URL_DESCARGAR_PDF_AUTORIZACION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setLoadingPdfAutorizacion(false))
                    errorCallBack(false)
                    return response.blob()
                } else {
                    errorCallBack(true)
                    dispatch(setLoadingPdfAutorizacion(false))
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.target = "_blank"
                    link.href = url
                    document.body.appendChild(link)
                    link.click()
                }
            })
            .catch(() => {
                errorCallBack(true)
                dispatch(setLoadingPdfAutorizacion(false))
            })
    }
}

//EXPORTAR PDF PEDIDO MATERIALES QX
const setLoadingPdfOrdenMedica = (bool) => {
    return {
        type: SET_LOADING_DESCARGAR_PDF_ORDEN_MEDICA,
        payload: bool
    }
}
export const getPdfOrdenMedica = (req, errorCallBack) => {
    return dispatch => {
        dispatch(setLoadingPdfOrdenMedica(true))
        fetch(FETCH_URL_DESCARGAR_PDF_ORDEN_MEDICA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setLoadingPdfOrdenMedica(false))
                    errorCallBack(false)
                    return response.blob()
                } else {
                    errorCallBack(true)
                    dispatch(setLoadingPdfOrdenMedica(false))
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.target = "_blank"
                    link.href = url
                    document.body.appendChild(link)
                    link.click()
                }
            })
            .catch(() => {
                errorCallBack(true)
                dispatch(setLoadingPdfOrdenMedica(false))
            })
    }

}

// DESCARGAR PDF INICIO SOLICITUD GENERICA:
const setLoadingPdfInicioSolicitudGenerica = (bool) => {
    return {
        type: SET_LOADING_DESCARGAR_PDF_INICIO_SG,
        payload: bool
    }
}
export const getArchivoSolicitudGenerica = (req, errorCallBack, nombre) => {
    return dispatch => {
        dispatch(setLoadingPdfInicioSolicitudGenerica(true))
        fetch(FETCH_URL_DESCARGAR_PDF_INICIO_SG, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setLoadingPdfInicioSolicitudGenerica(false))
                    errorCallBack(false)
                    return response.blob()
                } else {
                    errorCallBack(true)
                    dispatch(setLoadingPdfInicioSolicitudGenerica(false))
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.target = "_blank"
                    link.href = url
                    link.setAttribute('download', nombre)
                    document.body.appendChild(link)
                    link.click()
                }
            })
            .catch(() => {
                errorCallBack(true)
                dispatch(setLoadingPdfInicioSolicitudGenerica(false))
            })
    }
}

// DESCARGAR PDF TRASLADO:
const setLoadingPdfTraslado = (bool) => {
    return {
        type: SET_LOADING_DESCARGAR_PDF_INICIO_SG,
        payload: bool
    }
}
export const descargarPDFTraslado = (request, callBack) => {
    return dispatch => {
        dispatch(setLoadingPdfTraslado(true))
        fetch(FECTH_URL_DESCARGAR_PDF_TRASLADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setLoadingPdfTraslado(false))
                    callBack(false)
                    return response.blob()
                } else {
                    dispatch(setLoadingPdfTraslado(false))
                    callBack(true)
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', NOMBRE_PDF_TRASLADO);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(() => {
                dispatch(setLoadingPdfTraslado(false))
                callBack(true)
            })
    }
}

// DESCARGAR PDF CONVENIO TRASLADO
const setLoadingPdfConvenioTraslado = (bool) => {
    return {
        type: SET_LOADING_DESCARGAR_PDF_CONVENIO_TRASLADO,
        payload: bool
    }
}
export const descargarPDFConvenioTraslado = (request, callBack) => {
    return dispatch => {
        dispatch(setLoadingPdfConvenioTraslado(true))
        fetch(FETCH_URL_EXPORTAR_PDF_CONVENIO_TRASLADO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(setLoadingPdfConvenioTraslado(false))
                    callBack(true)
                    return response.blob()
                } else {
                    dispatch(setLoadingPdfConvenioTraslado(false))
                    callBack(false)
                }
            })
            .then((blob) => {
                if (blob) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', NOMBRE_PDF_CONVENIO_TRASLADO + GUION + request.datosConvenio[0] + PDF);
                    document.body.appendChild(link);
                    link.click();
                }
            })
            .catch(() => {
                dispatch(setLoadingPdfConvenioTraslado(false))
                callBack(false)
            })
    }
}