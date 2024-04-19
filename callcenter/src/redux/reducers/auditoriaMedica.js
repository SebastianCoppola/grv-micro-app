import {
    SET_SNACKBAR_AUDITORIA,
    SET_REQUEST_FILTROS,
    CLEAR_REQUEST_FILTROS,
    SET_DATA_TABLERO_AM,
    SET_LOADING_TABLERO_AM,
    SET_DATA_INDICADORES_SINIESTROS,
    SET_LOADING_INDICADORES_SINIESTROS,
    SET_DATA_AUTORIZACIONES_PEDIENTES,
    SET_LOADING_AUTORIZACIONES_PEDIENTES,
    SET_DATA_SINIESTROS_ILT_VENCIDOS,
    SET_LOADING_SINIESTROS_ILT_VENCIDOS,
    SET_DATA_PRACTICAS_PENDIENTES_AUTORIZACION,
    SET_LOADING_PRACTICAS_PENDIENTES_AUTORIZACION,
    SET_DATA_NUEVOS_INGRESOS,
    SET_LOADING_NUEVOS_INGRESOS,
    SET_DATA_SINIESTROS_ACTIVOS,
    SET_LOADING_SINIESTROS_ACTIVOS,
    GET_CANTIDAD_NOTIFICACIONES_AM,
    SET_DATA_DETALLE_AUTORIZACION_PENDIENTE,
    SET_LOADING_DETALLE_AUTORIZACION_PENDIENTE,
    SET_DATA_MAT_QX_AUTORIZACION_PENDIENTE,
    SET_LOADING_MAT_QX_AUTORIZACION_PENDIENTE,
    SET_DATA_PEDIDO_MATERIALES_QX,
    SET_LOADING_PEDIDO_MATERIALES_QX,
    SET_DATA_MATERIALES_XQ_PEDIDO,
    SET_LOADING_MATERIALES_XQ_PEDIDO,
    SET_LOADING_SAVE_NUEVO_PROXIMO_CONTACTO,
} from '../actionTypes'

const initialState = {
    snackBarAuditoria: { open: false, severity: '', message: '', vertical: '' },
    requestFiltros: {
        idAuditor: '',
        fechaSolicitud: '',
        fechaDesde: '',
        fechaHasta: '',
        denuncia: '',
        idTipoTurno: '',
        idCliente: '',
        idTramitador: '',
        indicacionesPendientes: false,
        limit: 5,
        offset: 0,
        ordenAsc: false,
    },
    cantidadNotificaciones: null,
    dataTableroAM: null,
    loadingTableroAM: false,
    dataIndicadoresSiniestros: null,
    loadingIndicadoresSiniestros: false,
    dataAutorizacionesPendientes: null,
    loadingAutorizacionesPendientes: false,
    dataSiniestrosIltVencidos: null,
    loadingSiniestrosIltVencidos: false,
    dataPracticasPendientesAutorizacion: null,
    loadingPracticasPendientesAutorizacion: false,
    dataNuevosIngresos: null,
    loadingNuevosIngresos: false,
    dataSiniestrosActivos: null,
    loadingSiniestrosActivos: false,
    dataDetalleAutorizacionPendiente: null,
    loadingDetalleAutorizacionPendiente: null,
    dataMatQxAutorizacionPendiente: null,
    loadingMatQxAutorizacionPendiente: null,
    dataPedidoMaterialesQX: null,
    loadingPedidoMaterialesQX: false,
    dataMaterialesQxPorPedido: null,
    loadingMaterialesQxPorPedido: false,
    datosDenunciaAuditoria: null,
    loadingDatosDenunciaAuditoria: false,
    loadingNuevoProximoContacto: false,
}

const auditoriaMedica = (state = initialState, action) => {
    switch (action.type) {
        case SET_SNACKBAR_AUDITORIA:
            return {
                ...state,
                snackBarAuditoria: { ...action.payload }
            }
        case SET_REQUEST_FILTROS:
            return {
                ...state,
                requestFiltros: action.payload
            }
        case CLEAR_REQUEST_FILTROS:
            return {
                ...state,
                requestFiltros: initialState.requestFiltros
            }
        case GET_CANTIDAD_NOTIFICACIONES_AM:
            return {
                ...state,
                cantidadNotificaciones: action.payload
            }
        case SET_DATA_TABLERO_AM:
            return {
                ...state,
                dataTableroAM: action.payload
            }
        case SET_LOADING_TABLERO_AM:
            return {
                ...state,
                loadingTableroAM: action.payload
            }
        case SET_DATA_AUTORIZACIONES_PEDIENTES:
            return {
                ...state,
                dataAutorizacionesPendientes: action.payload
            }
        case SET_LOADING_AUTORIZACIONES_PEDIENTES:
            return {
                ...state,
                loadingAutorizacionesPendientes: action.payload
            }
        case SET_DATA_SINIESTROS_ILT_VENCIDOS:
            return {
                ...state,
                dataSiniestrosIltVencidos: action.payload
            }
        case SET_LOADING_SINIESTROS_ILT_VENCIDOS:
            return {
                ...state,
                loadingSiniestrosIltVencidos: action.payload
            }
        case SET_DATA_PRACTICAS_PENDIENTES_AUTORIZACION:
            return {
                ...state,
                dataPracticasPendientesAutorizacion: action.payload
            }
        case SET_LOADING_PRACTICAS_PENDIENTES_AUTORIZACION:
            return {
                ...state,
                loadingPracticasPendientesAutorizacion: action.payload
            }
        case SET_DATA_NUEVOS_INGRESOS:
            return {
                ...state,
                dataNuevosIngresos: action.payload
            }
        case SET_LOADING_NUEVOS_INGRESOS:
            return {
                ...state,
                loadingNuevosIngresos: action.payload
            }
        case SET_DATA_SINIESTROS_ACTIVOS:
            return {
                ...state,
                dataSiniestrosActivos: action.payload
            }
        case SET_LOADING_SINIESTROS_ACTIVOS:
            return {
                ...state,
                loadingSiniestrosActivos: action.payload
            }
        case SET_DATA_DETALLE_AUTORIZACION_PENDIENTE:
            return {
                ...state,
                dataDetalleAutorizacionPendiente: action.payload
            }
        case SET_LOADING_DETALLE_AUTORIZACION_PENDIENTE:
            return {
                ...state,
                loadingDetalleAutorizacionPendiente: action.payload
            }
        case SET_DATA_MAT_QX_AUTORIZACION_PENDIENTE:
            return {
                ...state,
                dataMatQxAutorizacionPendiente: action.payload
            }
        case SET_LOADING_MAT_QX_AUTORIZACION_PENDIENTE:
            return {
                ...state,
                loadingMatQxAutorizacionPendiente: action.payload
            }
        case SET_DATA_INDICADORES_SINIESTROS: 
            return {
                ...state,
                dataIndicadoresSiniestros: action.payload
            }
        case SET_LOADING_INDICADORES_SINIESTROS: 
            return {
                ...state,
                loadingIndicadoresSiniestros: action.payload
            }
        case SET_DATA_PEDIDO_MATERIALES_QX:
            return {
                ...state,
                dataPedidoMaterialesQX: action.payload
            }
        case SET_LOADING_PEDIDO_MATERIALES_QX:
            return {
                ...state,
                loadingPedidoMaterialesQX: action.payload
            }
        case SET_DATA_MATERIALES_XQ_PEDIDO:
            return {
                ...state,
                dataMaterialesQxPorPedido: action.payload
            }
        case SET_LOADING_MATERIALES_XQ_PEDIDO:
            return {
                ...state,
                loadingMaterialesQxPorPedido: action.payload
            }
        case SET_LOADING_SAVE_NUEVO_PROXIMO_CONTACTO:
            return {
                ...state,
                loadingNuevoProximoContacto: action.payload
            }
        default:
            return state;
    }
}
export default auditoriaMedica