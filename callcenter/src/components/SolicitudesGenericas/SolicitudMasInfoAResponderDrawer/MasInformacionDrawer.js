import React, { useEffect } from 'react'
//Mui:
import { Box, CircularProgress, Grid } from '@material-ui/core'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'
//Utils:
import { TIPO_NOTIFICACION } from '../../../Utils/const'
//Components:
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import CardSolicitudDrawer from './CardSolicitudDrawer'

const MasInformacionDrawer = (props) => {
    const { action, masInfoSeleccionada, setFile, file } = props
    //Redux:
    const dispatch = useDispatch()
    const detalleNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.detalleNotificacionesMasInfo)
    const datosSolicitudMasInfo = useSelector(state => state.solicitudesGenericas.datosSolicitudMasInfo)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const loadingDetalleNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.loadingDetalleNotificacionesMasInfo)
    const errorDetalleNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.errorDetalleNotificacionesMasInfo)
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    //Order Data:
    const orderSolicitudesMasInfo = (array) => {
        if (array.length) {
            return [
                ...array.filter(it => it.idSolicitudMasInfo === masInfoSeleccionada.idSolicitudMasInfo),
                ...array.filter(it => it.idSolicitudMasInfo !== masInfoSeleccionada.idSolicitudMasInfo)
            ]
        } else {
            return []
        }
    }

    //Data:
    const data = action === TIPO_NOTIFICACION[0]
        ? (datosSolicitudMasInfo ? [datosSolicitudMasInfo] : null)
        : orderSolicitudesMasInfo(detalleNotificacionesMasInfo)

    //Llamadas Api:
    useEffect(() => {
        if (masInfoSeleccionada) {
            if (action === TIPO_NOTIFICACION[1]) {
                dispatch(actions.searchDetalleNotificacionesMasInfo({
                    idSolicitud: masInfoSeleccionada && masInfoSeleccionada.idSolicitudGenerica
                        ? masInfoSeleccionada.idSolicitudGenerica
                        : dataBackSolicitud.nroSolicitud,
                    idOperador: parseInt(usuarioActivo.id),
                    esSupervisor: !(usuarioActivo.esOperador)
                }))
            } else {
                dispatch(actions.getDataSolicitudMasInfo({
                    "idSolicitudMasInfo": masInfoSeleccionada.idSolicitudMasInfo,
                    "idOperador": parseInt(usuarioActivo.id),
                    "esSupervisor": !(usuarioActivo.esOperador)
                }))
            }
        }
    }, [])

    //Abro SnackBar en caso de ERROR:
    useEffect(() => {
        if (errorDetalleNotificacionesMasInfo) {
            dispatch(actions.setSnackBar({
                open: true,
                message: 'Ocurrió un error al intentar recuperar las notificaciones.',
                severity: 'error',
                vertical: 'top'
            }))
        }
    }, [errorDetalleNotificacionesMasInfo])

    //Helpers:
    const isAResponder = (solicitud) => {
        if (action === TIPO_NOTIFICACION[0]) return false
        else return masInfoSeleccionada.idSolicitudMasInfo === solicitud.idSolicitudMasInfo
    }
    const isComprimir = (solicitud) => {
        if (action === TIPO_NOTIFICACION[0]) return false
        else return !(masInfoSeleccionada.idSolicitudMasInfo === solicitud.idSolicitudMasInfo)
    }

    return (
        <>
            <Box style={{ minWidth: 900 }}>
                {loadingDetalleNotificacionesMasInfo ?
                    <Grid container justify='center' style={{ marginTop: 50 }}>
                        <CircularProgress />
                    </Grid>
                    : data && data.length ?
                        data.map((solicitud, index) => (
                            <Box key={index} mb={2}>
                                <CardSolicitudDrawer
                                    solicitud={solicitud}
                                    aResponder={isAResponder(solicitud)}
                                    comprimir={isComprimir(solicitud)}
                                    setFile={setFile}
                                    file={file}
                                />
                            </Box>
                        ))
                        : null
                }
                <Grid item>
                    <CustomSnackBar
                        handleClose={() => dispatch(actions.setSnackBar({ open: false }))}
                        open={snackbar.open}
                        title={snackbar.message}
                        severity={snackbar.severity}
                        vertical={snackbar.vertical ? snackbar.vertical : 'bottom'}
                    />
                </Grid>
            </Box>
        </>
    );
};

export default MasInformacionDrawer;
