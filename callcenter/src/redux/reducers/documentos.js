import {
    SET_DENUNCIAS,
    SET_DENUNCIAS_TABLERO_BORRADOR,
    SET_DENUNCIAS_TABLERO_INCOMPLETO,
    SET_DENUNCIAS_TABLERO_COMPLETO,
    SET_CANTIDAD_DENUNCIAS,
    SET_DENUNCIA,
    SET_PRE_DENUNCIA,
    SET_DATA_GRAFICOS,
    SET_TIPO_SEDE, SET_SEDE,
    SET_SINIESTROS_ANTERIORES,
    SET_LOADING_CARDS,
    SET_LOADING_DENUNCIA,
    SET_LOADING_NUEVA_DENUNCIA,
    SET_CENTRO_MEDICO_SUGERIDO,
    LOADING_DENUNCIAS_ANTERIORES_REINGRESO,
    LOADING_PRE_DENUNCIAS,
    BUSQUEDA_CENTRO_MEDICO,
    SET_LOADING_SAVE_DENUNCIA,
    SET_LOADING_UPDATE,
    GET_CAMPOS_REQUERIDOS,
    SET_DATA_PRESTADOR,
    SET_CORTO_PUNZANTE_ANTERIOR_ACTIVO,
    ERROR_AUTOSUGGEST_CENTROS_MEDICOS,
    ERROR_AUTOSUGGEST_SEDE,
    ERROR_AUTOSUGGEST_TIPO_SEDE,
    LOADING_AUTOSUGGEST_CENTROS_MEDICOS,
    LOADING_AUTOSUGGEST_SEDE,
    LOADING_AUTOSUGGEST_TIPO_SEDE,
    SET_LOADING_ENVIAR_A_PENDIENTES,
    LOADING_SINIESTROS_MULTIPLES_SAVE,
    SET_LOADING_SINIESTRO_MULTIPLE_SAVE_DENUNCIA,
    LOADING_BUSQUEDA_PRESTADOR,
    SET_LOADING_CAMPOS_REQUERIDOS,
    SET_REDUX_DENUNCIA_SNACKBAR,
    SET_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR,
    SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR,
    SET_DATA_PRESTADORES_BUSCADOR,
} from '../actionTypes'

const initialState = {
    denuncias: [],
    denunciaTableroBorrador: null,
    denunciaTableroIncompleto: null,
    denunciaTableroCompleto: null,
    cantidadDenuncias: null,
    denuncia: null,
    cantidadBorrador: 0,
    cantidadIncompleto: 0,
    cantidadCompleto: 0,
    preDenuncia: null,
    graficosData: [],
    tipoSede: [],
    sede: [],
    siniestrosAnteriores: [],
    loadingCards: false,
    loadingDenuncia: false,
    loadingNuevaDenuncia: false,
    centroMedicoSugerido: [],
    loadingDenunciasAnterioresReingreso: false,
    loadingPreDenuncias: false,
    busquedaCentroMedico: null,
    loadingSaveDenuncia: false,
    loadingUpdate: false,
    loadingEscritorioSupervisor: false,
    camposRequeridos: null,
    dataPrestadoresBuscador: [],
    dataPrestadores: [],
    errorAutosuggestCentrosMedicos: false,
    errorAutosuggestSede: false,
    errorAutosuggestTipoSede: false,
    loadingAutosuggestCentrosMedicos: false,
    loadingAutosuggestSede: false,
    loadingAutosuggestTipoSede: false,
    loadingEnviarApendientes: false,
    loadingSiniestrosMultiplesSave: false,
    loadingSiniestrosMultiplesSaveDenuncia: false,
    loadingGenerarPredenuncia: false,
    loadingBusquedaPrestador: false,
    loadingBusquedaPrestadorBuscador: false,
    cortoPunzanteAnteriorActivo: null,
    loadingCamposRequeridos: false,
    reduxDenunciaSnackBar: { open: false, title: '', severity: '', vertical: '' },
    existenPredenunciasSinAsignar: false,
}

const documentos = (state = initialState, action) => {
    switch (action.type) {
        case SET_DENUNCIAS:
            return {
                ...state,
                denuncias: action.payload
            }
            break;
        case SET_DENUNCIAS_TABLERO_BORRADOR:
            return {
                ...state,
                denunciaTableroBorrador: action.payload.list,
                cantidadBorrador: action.payload.total,
            }
            break;
        case SET_DENUNCIAS_TABLERO_INCOMPLETO:
            return {
                ...state,
                denunciaTableroIncompleto: action.payload.list,
                cantidadIncompleto: action.payload.total,
            }
            break;
        case SET_DENUNCIAS_TABLERO_COMPLETO:
            return {
                ...state,
                denunciaTableroCompleto: action.payload.list,
                cantidadCompleto: action.payload.total,
            }
            break;
        case SET_CANTIDAD_DENUNCIAS:
            return {
                ...state,
                cantidadDenuncias: action.payload
            }
            break;
        case SET_DENUNCIA:
            return {
                ...state,
                denuncia: action.payload
            }
            break;
        case SET_PRE_DENUNCIA:
            return {
                ...state,
                preDenuncia: action.payload
            }
            break;
        case SET_DATA_GRAFICOS:
            return {
                ...state,
                graficosData: action.payload
            }
            break;
        case SET_TIPO_SEDE:
            return {
                ...state,
                tipoSede: action.payload
            }
            break;
        case SET_SEDE:
            return {
                ...state,
                sede: action.payload
            }
            break;
        case SET_SINIESTROS_ANTERIORES:
            return {
                ...state,
                siniestrosAnteriores: action.payload
            }
            break;
        case SET_LOADING_CARDS:
            return {
                ...state,
                loadingCards: action.payload
            }
            break;
        case SET_LOADING_DENUNCIA:
            return {
                ...state,
                loadingDenuncia: action.payload
            }
            break;
        case SET_LOADING_NUEVA_DENUNCIA:
            return {
                ...state,
                loadingNuevaDenuncia: action.payload
            }
            break;
        case LOADING_DENUNCIAS_ANTERIORES_REINGRESO:
            return {
                ...state,
                loadingDenunciasAnterioresReingreso: action.payload
            }
            break;
        case SET_LOADING_ENVIAR_A_PENDIENTES:
            return {
                ...state,
                loadingEnviarApendientes: action.payload
            }
            break;
        case SET_CENTRO_MEDICO_SUGERIDO:
            return {
                ...state,
                centroMedicoSugerido: action.payload
            }
            break;
        case LOADING_PRE_DENUNCIAS:
            return {
                ...state,
                loadingPreDenuncias: action.payload
            }
            break;
        case BUSQUEDA_CENTRO_MEDICO:
            return {
                ...state,
                busquedaCentroMedico: action.payload
            }
            break;
        case SET_LOADING_SAVE_DENUNCIA:
            return {
                ...state,
                loadingSaveDenuncia: action.payload
            }
            break;
        case GET_CAMPOS_REQUERIDOS:
            return {
                ...state,
                camposRequeridos: action.payload
            }
            break;
        case SET_LOADING_UPDATE:
            return {
                ...state,
                loadingUpdate: action.payload
            }
            break;
        case SET_DATA_PRESTADOR:
            return {
                ...state,
                dataPrestadores: action.payload
            }
        case SET_DATA_PRESTADORES_BUSCADOR:
            return {
                ...state,
                dataPrestadoresBuscador: action.payload
            }
        case ERROR_AUTOSUGGEST_CENTROS_MEDICOS:
            return {
                ...state,
                errorAutosuggestCentrosMedicos: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_SEDE:
            return {
                ...state,
                errorAutosuggestSede: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_TIPO_SEDE:
            return {
                ...state,
                errorAutosuggestTipoSede: action.payload
            }
            break;

        case LOADING_AUTOSUGGEST_CENTROS_MEDICOS:
            return {
                ...state,
                loadingAutosuggestCentrosMedicos: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_SEDE:
            return {
                ...state,
                loadingAutosuggestSede: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_TIPO_SEDE:
            return {
                ...state,
                loadingAutosuggestTipoSede: action.payload
            }
            break;
        case LOADING_SINIESTROS_MULTIPLES_SAVE:
            return {
                ...state,
                loadingSiniestrosMultiplesSave: action.payload
            }
            break;
        case SET_LOADING_SINIESTRO_MULTIPLE_SAVE_DENUNCIA:
            return {
                ...state,
                loadingSiniestrosMultiplesSaveDenuncia: action.payload
            }
            break;
        case SET_LOADING_SINIESTRO_MULTIPLE_SAVE_DENUNCIA:
            return {
                ...state,
                loadingSiniestrosMultiplesSaveDenuncia: action.payload
            }
            break;
        case LOADING_BUSQUEDA_PRESTADOR:
            return {
                ...state,
                loadingBusquedaPrestador: action.payload
            }
        case SET_LOADING_BUSQUEDA_PRESTADOR_BUSCADOR:
            return {
                ...state,
                loadingBusquedaPrestadorBuscador: action.payload
            }
        case SET_CORTO_PUNZANTE_ANTERIOR_ACTIVO:
            return {
                ...state,
                cortoPunzanteAnteriorActivo: action.payload
            }
        case SET_LOADING_CAMPOS_REQUERIDOS:
            return {
                ...state,
                loadingCamposRequeridos: action.payload
            }
        case SET_REDUX_DENUNCIA_SNACKBAR:
            return {
                ...state,
                reduxDenunciaSnackBar: action.payload
            }
        case SET_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR:
            return {
                ...state,
                existenPredenunciasSinAsignar: action.payload
            }
        default:
            return state;
    }
}

export default documentos