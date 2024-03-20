import {
    URL_IMPORTAR_PN,
    URL_IMPORTAR_PNN,
    URL_IMPORTAR_MODULOS,
    FECTH_URL_EXPORTAR_CONSULTA_GENERICA,
    FECTH_URL_IMPORTAR_SUBPRESTADORES,
    FECTH_URL_IMPORTAR_LOCALIDADES,
    FETCH_URL_DESCARGAR_PDF_HISTORICO,
} from '../../Utils/urls'

import {
    SET_LOCALIDADES_IMPORTADAS,
    SET_LOADING_IMPORTAR,
} from '../actionTypes'

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

//EXPORTAR PDF:
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
