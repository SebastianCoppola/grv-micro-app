import {
    SET_LOCALIDADES_IMPORTADAS,
    SET_LOADING_IMPORTAR,
    SET_LOADING_IMMPRIMIR_PDF_AUTORIZACION,
    SET_LOADING_DESCARGAR_PDF_ORDEN_MEDICA,
    SET_LOADING_DESCARGAR_PDF_INICIO_SG,
    SET_LOADING_DESCARGAR_PDF_TRASLADO,
    SET_LOADING_DESCARGAR_PDF_CONVENIO_TRASLADO
} from "../actionTypes"

const initialState = {
    localidadesImportadas: null,
    loadingImportar: false,
    loadingImprimirPdfAutorizacion: false,
    loadingDescargarPdfOrdenMedica: false,
    loadingDescargarPdfInicioSg: false,
    loadingDescargarPdfTraslado: false,
    loadingDescargarPdfConvenioTraslado: false
}

const importarExportar = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALIDADES_IMPORTADAS:
            return {
                ...state,
                localidadesImportadas: action.payload
            }
        case SET_LOADING_IMPORTAR:
            return {
                ...state,
                loadingImportar: action.payload
            }
        case SET_LOADING_IMMPRIMIR_PDF_AUTORIZACION:
            return {
                ...state,
                loadingImprimirPdfAutorizacion: action.payload
            }
        case SET_LOADING_DESCARGAR_PDF_ORDEN_MEDICA:
            return {
                ...state,
                loadingDescargarPdfOrdenMedica: action.payload
            }
        case SET_LOADING_DESCARGAR_PDF_INICIO_SG:
            return {
                ...state,
                loadingImprimirPdfInicioSg: action.payload
            }
        case SET_LOADING_DESCARGAR_PDF_TRASLADO:
            return {
                ...state,
                loadingDescargarPdfTraslado: action.payload
            }
        case SET_LOADING_DESCARGAR_PDF_CONVENIO_TRASLADO:
            return {
                ...state,
                loadingDescargarPdfConvenioTraslado: action.payload
            }
        default:
            return state;
    }
}

export default importarExportar