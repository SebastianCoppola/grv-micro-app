import {
    SET_SNACKBAR,
    SET_LOADING_GENERICAS,
    SET_SOLICITUDES_GENERICAS,
    SET_DATOS_SOLICITUD,
    SET_DATOS_SOLICITUD_DRAWER_NOTIFICACIONES,
    SET_DATOS_SEGUIMIENTO,
    SET_DATOS_SOLICITUDES_MAS_INFO,
    SET_DATOS_SOLICITUDES_BY_DENUNCIA,
    SET_TODAS_SG,
    SET_LOADING_DATOS_TABLA_SOLICITUDES_BY_DENUNCIA,
    SET_SOLICITUD_SELECCIONADA,
    SET_USUARIO_ACTIVO,
    SET_DATA_NOTIFICACIONES_MAS_INFO,
    SET_LOADING_NOTIFICACIONES_MAS_INFO,
    SET_ERROR_NOTIFICACIONES_MAS_INFO,
    SET_DETALLE_NOTIFICACIONES_MAS_INFO,
    SET_LOADING_DETALLE_NOTIFICACIONES_MAS_INFO,
    SET_ERROR_DETALLE_NOTIFICACIONES_MAS_INFO,
    SET_SOLICITANTE_GESTOR_AREA,
    SET_CANTIDAD_SOLICITUDES,
    SET_PERSONAS_BY_AREA,
    SET_LOADING_SEGUIMIENTO,
    SET_ACTUALIZAR_DATA_TABLA_SOLICITUDES,
    SET_LOADING_AUTOSUGGEST,
    SET_MAS_INFO_SELECCIONADA,
    SET_CANTIDAD_SOLICITUDES_GENERICAS,
    SET_LOADING_CABECERA_SOLICITUDES,
    SET_CANTIDAD_NOTIFICACIONES_MAS_INFO,
    ACTUALIZAR_NOTIFICACIONES,
    SET_DATOS_SOLICITUD_MAS_INFO,
    ACTUALIZAR_DATA_MAS_INFO,
    SET_NOTIFICACION_TE_RESPONDIERON,
    SET_NOTIFICACIONES_GENERALES,
    SET_AREAS_DE_GESTION,
    SET_TIPOS_SOLICITUD, 
    SET_EXISTEN_SG_SIN_ASIGNAR,
    SET_DATOS_BUSQUEDA_SG_CON_RETORNO
} from '../actionTypes'

const initialState = {
    solicitudesGenericas: { objetos: [], cantidadTotal: 0 },
    loading: false,
    snackbar: {
        open: false,
        severity: '',
        message: '',
        vertical: '',
    },
    datosSolicitud: null,
    datosSolicitudDrawerNotificaciones: null,
    datosSeguimiento: null,
    datosSolicitudesMasInfo: [],
    datosSolicitudByDenuncia: [],
    todasSG: { objetos: [], cantidadTotal: 0 },
    loadingTablaSolicitudesByDenuncia: false,
    solicitudSeleccionada: null,
    masInfoSeleccionada: null,
    usuarioActivo: null,
    dataNotificacionesMasInfo: null,
    loadingNotificacionesMasInfo: false,
    errorNotificacionesMasInfo: false,
    detalleNotificacionesMasInfo: [],
    loadingDetalleNotificacionesMasInfo: false,
    errorDetalleNotificacionesMasInfo: false,
    solicitanteGestorArea: null,
    cantidadSolicitudes: null,
    personasByArea: null,
    loadingSeguimiento: false,
    actualizarData: false,
    loadingAutoSuggest: false,
    cantidadSolicitudesGenericas: null,
    loadingCabecera: false,
    cantidadNotificacionesMasInfo: null,
    actualizarNotificaciones: false,
    datosSolicitudMasInfo: null,
    actualizarDataMasInfo: false,
    notificacionTeRespondieron: false,
    notificacionesGenerales: false,
    areasDeGestion: null,
    tipoSolicitud: null,
    existenSgSinAsignar: false,
    busquedaConRetorno: null
}

const solicitudesGenericas = (state = initialState, action) => {
    switch (action.type) {
        case SET_SOLICITUDES_GENERICAS:
            return {
                ...state,
                solicitudesGenericas: action.payload
            }
        case SET_LOADING_GENERICAS:
            return {
                ...state,
                loading: action.payload
            }
        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: { ...action.payload }
            }
        case SET_DATOS_SOLICITUD:
            return {
                ...state,
                datosSolicitud: action.payload
            }
        case SET_DATOS_SEGUIMIENTO:
            return {
                ...state,
                datosSeguimiento: action.payload
            }
        case SET_DATOS_SOLICITUDES_MAS_INFO:
            return {
                ...state,
                datosSolicitudesMasInfo: action.payload
            }
        case SET_DATOS_SOLICITUDES_BY_DENUNCIA:
            return {
                ...state,
                datosSolicitudByDenuncia: action.payload
            }
        case SET_TODAS_SG:
            return {
                ...state,
                todasSG: action.payload
            }
        case SET_LOADING_DATOS_TABLA_SOLICITUDES_BY_DENUNCIA:
            return {
                ...state,
                loadingTablaSolicitudesByDenuncia: action.payload
            }
        case SET_SOLICITUD_SELECCIONADA:
            return {
                ...state,
                solicitudSeleccionada: action.payload
            }
        case SET_USUARIO_ACTIVO:
            return {
                ...state,
                usuarioActivo: action.payload
            }
        case SET_DATA_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                dataNotificacionesMasInfo: action.payload
            }
        case SET_LOADING_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                loadingNotificacionesMasInfo: action.payload
            }
        case SET_ERROR_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                errorNotificacionesMasInfo: action.payload
            }
        case SET_DETALLE_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                detalleNotificacionesMasInfo: action.payload
            }
        case SET_LOADING_DETALLE_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                loadingDetalleNotificacionesMasInfo: action.payload
            }
        case SET_ERROR_DETALLE_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                errorDetalleNotificacionesMasInfo: action.payload
            }
        case SET_SOLICITANTE_GESTOR_AREA:
            return {
                ...state,
                solicitanteGestorArea: action.payload
            }
        case SET_CANTIDAD_SOLICITUDES:
            return {
                ...state,
                cantidadSolicitudes: action.payload
            }
        case SET_PERSONAS_BY_AREA:
            return {
                ...state,
                personasByArea: action.payload
            }
        case SET_LOADING_SEGUIMIENTO:
            return {
                ...state,
                loadingSeguimiento: action.payload
            }
        case SET_ACTUALIZAR_DATA_TABLA_SOLICITUDES:
            return {
                ...state,
                actualizarData: action.payload
            }
        case SET_LOADING_AUTOSUGGEST:
            return {
                ...state,
                loadingAutoSuggest: action.payload
            }
        case SET_MAS_INFO_SELECCIONADA:
            return {
                ...state,
                masInfoSeleccionada: action.payload,
            }
        case SET_DATOS_SOLICITUD_DRAWER_NOTIFICACIONES:
            return {
                ...state,
                datosSolicitudDrawerNotificaciones: action.payload
            }
        case SET_CANTIDAD_SOLICITUDES_GENERICAS:
            return {
                ...state,
                cantidadSolicitudesGenericas: action.payload
            }
        case SET_LOADING_CABECERA_SOLICITUDES:
            return {
                ...state,
                loadingCabecera: action.payload
            }
        case SET_CANTIDAD_NOTIFICACIONES_MAS_INFO:
            return {
                ...state,
                cantidadNotificacionesMasInfo: action.payload
            }
        case ACTUALIZAR_NOTIFICACIONES:
            return {
                ...state,
                actualizarNotificaciones: !(state.actualizarNotificaciones)
            }
        case SET_DATOS_SOLICITUD_MAS_INFO:
            return {
                ...state,
                datosSolicitudMasInfo: action.payload
            }
        case ACTUALIZAR_DATA_MAS_INFO:
            return {
                ...state,
                actualizarDataMasInfo: !(state.actualizarDataMasInfo)
            }
        case SET_NOTIFICACION_TE_RESPONDIERON:
            return {
                ...state,
                notificacionTeRespondieron: action.payload
            }
        case SET_AREAS_DE_GESTION:
            return {
                ...state,
                areasDeGestion: action.payload
            }
        case SET_TIPOS_SOLICITUD:
            return {
                ...state,
                tipoSolicitud: action.payload
            }
        case SET_NOTIFICACIONES_GENERALES:
            return {
                ...state,
                notificacionesGenerales: action.payload
            }
        case SET_EXISTEN_SG_SIN_ASIGNAR:
            return {
                ...state,
                existenSgSinAsignar: action.payload
            }
            case SET_DATOS_BUSQUEDA_SG_CON_RETORNO:
                return {
                    ...state,
                    busquedaConRetorno: action.payload
                }
        default:
            return state;
    }
}
export default solicitudesGenericas