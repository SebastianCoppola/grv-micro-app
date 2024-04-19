//ACTION TYPES:
import {
    SET_DATA_HISTORIAL_POR_DENUNCIA,
    SET_LOADING_HISTORIAL_POR_DENUNCIA,
    SET_DATA_HISTORIAL_POR_TURNO,
    SET_LOADING_HISTORIAL_POR_TURNO,
} from '../actionTypes';

//URL:
import {
    URL_GET_HISTORIAL_POR_DENUNCIA,
    URL_GET_HISTORIAL_POR_TURNO,
} from '../../Urls/auditoriaMedica'

//HISTORIAL DE SINIESTROS
const setDataHistorialPorDenuncia = (data) => {
    return {
        type: SET_DATA_HISTORIAL_POR_DENUNCIA,
        payload: data
    }
}
const setLoadingHistorialPorDenuncia = (bool) => {
    return {
        type: SET_LOADING_HISTORIAL_POR_DENUNCIA,
        payload: bool
    }
}
export const getDataHistorialPorDenuncia = (req, errorCallback) => {
    // let hardcodedResponse = {
    //     body: [
    //         {
    //             idTurno: "20034254",
    //             fechaSolicitud: "20/05/2023",
    //             fechaHoraTurno: "20.05.2023 12:00",
    //             apellidoNombreSolicitante: "Toledo Marcelo",
    //             tipoTurno: "Consulta",
    //             proveedorCentroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //             idEstadoTurno: 1,
    //             estadoTurno: "Prog. sin Traslados",
    //             observaciones: 'Se agregan pedidos de materiales para cx ya autorizada el 21/06/2023 (Pedido 331, aut. 3456, aut. cx 4556).',
    //             anulacion: 'Turno anulado por anulación de autorización. Varela Federico.',
    //         },
    //         {
    //             idTurno: "20034254",
    //             fechaSolicitud: "20/05/2023",
    //             fechaHoraTurno: "20.05.2023 12:00",
    //             apellidoNombreSolicitante: "Toledo Marcelo",
    //             tipoTurno: "Consulta",
    //             proveedorCentroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //             idEstadoTurno: 2,
    //             estadoTurno: "Realizado",
    //             observaciones: 'Se agregan pedidos de materiales para cx ya autorizada el 21/06/2023 (Pedido 331, aut. 3456, aut. cx 4556).',
    //             anulacion: 'Turno anulado por anulación de autorización. Varela Federico.',
    //         },
    //         {
    //             idTurno: "20034254",
    //             fechaSolicitud: "20/05/2023",
    //             fechaHoraTurno: "20.05.2023 12:00",
    //             apellidoNombreSolicitante: "Toledo Marcelo",
    //             tipoTurno: "Consulta",
    //             proveedorCentroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //             idEstadoTurno: 3,
    //             estadoTurno: "PCT",
    //             observaciones: 'Se agregan pedidos de materiales para cx ya autorizada el 21/06/2023 (Pedido 331, aut. 3456, aut. cx 4556).',
    //             anulacion: 'Turno anulado por anulación de autorización. Varela Federico.',
    //         },
    //         {
    //             idTurno: "20034254",
    //             fechaSolicitud: "20/05/2023",
    //             fechaHoraTurno: "20.05.2023 12:00",
    //             apellidoNombreSolicitante: "Toledo Marcelo",
    //             tipoTurno: "Consulta",
    //             proveedorCentroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //             idEstadoTurno: 2,
    //             estadoTurno: "Realizado",
    //             observaciones: 'Se agregan pedidos de materiales para cx ya autorizada el 21/06/2023 (Pedido 331, aut. 3456, aut. cx 4556).',
    //             anulacion: 'Turno anulado por anulación de autorización. Varela Federico.',
    //         }
    //     ],
    //     cantidadTotal: 4
    // }
    // return dispatch => {
    //     dispatch(setLoadingHistorialPorDenuncia(true))
    //     setTimeout(() => {
    //         dispatch(setDataHistorialPorDenuncia(hardcodedResponse))
    //         if (errorCallback) errorCallback(false)
    //         dispatch(setLoadingHistorialPorDenuncia(false))
    //     }, 800)
    // }
    return dispatch => {
        dispatch(setLoadingHistorialPorDenuncia(true))
        fetch(URL_GET_HISTORIAL_POR_DENUNCIA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setLoadingHistorialPorDenuncia(false))
                            dispatch(setDataHistorialPorDenuncia(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingHistorialPorDenuncia(false))
                        } else if (data.status === 204) {
                            dispatch(setDataHistorialPorDenuncia(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingHistorialPorDenuncia(false))
                        } else {
                            dispatch(setDataHistorialPorDenuncia(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingHistorialPorDenuncia(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataHistorialPorDenuncia(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingHistorialPorDenuncia(false))
            })
    }
}

//INFORMACION DE TURNOS
const setDataHistorialPorTurno = (data) => {
    return {
        type: SET_DATA_HISTORIAL_POR_TURNO,
        payload: data
    }
}
const setLoadingHistorialPorTurno = (bool) => {
    return {
        type: SET_LOADING_HISTORIAL_POR_TURNO,
        payload: bool
    }
}
export const getDataHistorialPorTurno = (req, errorCallback) => {
    // let hardcodedResponse = [
    //     {
    //         fechaLog: "20/01/2023 12:18:03",
    //         fechaTurno: "20/05/2023 12:00",
    //         fechaInformado: "20/05/2023",
    //         idEstadoTurnoLog: 1,
    //         estadoTurnoLog: "Realizado",
    //         responsable: "Toledo Marcelo",
    //         accion: "Autorización turno",
    //         observaciones: null,
    //         centroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //         programador: null,
    //         fechaProg: null,
    //         fechaReprog: null,
    //         observacionesReprog: null
    //     },
    //     {
    //         fechaLog: "20/01/2023 12:18:03",
    //         fechaTurno: "20/05/2023 12:00",
    //         fechaInformado: "20/05/2023",
    //         idEstadoTurnoLog: 1,
    //         estadoTurnoLog: "Realizado",
    //         responsable: "Toledo Marcelo",
    //         accion: "Autorización turno",
    //         observaciones: null,
    //         centroMedico: "Red de Hospitales Públicos- Provincia de Misiones",
    //         programador: null,
    //         fechaProg: null,
    //         fechaReprog: null,
    //         observacionesReprog: null
    //     }
    // ]
    // return dispatch => {
    //     dispatch(setLoadingHistorialPorTurno(true))
    //     setTimeout(() => {
    //         dispatch(setDataHistorialPorTurno(hardcodedResponse))
    //         if (errorCallback) errorCallback(false)
    //         dispatch(setLoadingHistorialPorTurno(false))
    //     }, 800)
    // }
    return dispatch => {
        dispatch(setLoadingHistorialPorTurno(true))
        fetch(URL_GET_HISTORIAL_POR_TURNO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataHistorialPorTurno(data.body))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingHistorialPorTurno(false))
                        } else if (data.status === 204) {
                            dispatch(setDataHistorialPorTurno(null))
                            if (errorCallback) errorCallback(false)
                            dispatch(setLoadingHistorialPorTurno(false))
                        } else {
                            dispatch(setDataHistorialPorTurno(null))
                            if (errorCallback) errorCallback(true)
                            dispatch(setLoadingHistorialPorTurno(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setDataHistorialPorTurno(null))
                if (errorCallback) errorCallback(false)
                dispatch(setLoadingHistorialPorTurno(false))
            })
    }
}