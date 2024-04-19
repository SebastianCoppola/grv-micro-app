import React, { useEffect, useState } from 'react'
//Mui:
import { Box, CircularProgress, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Utils:
import { TIPO_NOTIFICACION } from '../../../../Utils/const'
//Components:
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
import SolicitarMasInfo from '../../acciones/SolicitarMasInfo'
import CardSolicitudDetalle from './CardSolicitudDetalle'
import SolicitudMasInfoAResponderDrawerWrapper from '../../SolicitudMasInfoAResponderDrawer/SolicitudMasInfoAResponderDrawer'

const useStyles = makeStyles((theme) => ({
    card: ({ esModoEdicion }) => ({
        backgroundColor: esModoEdicion ? '' : '#f5f5f5',
        marginTop: 20,
        margin: "auto",
        borderRadius: 8,
        border: esModoEdicion ? '1px solid #dadce0' : 'none',
        minHeight: 110
    }),
    descripcion: {
        color: ({ esModoEdicion }) => esModoEdicion ? '#505050' : '#e34850'
    },
    label: {
        fontSize: 15,
        color: '#747474',
        marginRight: 12
    }
}));

const MasInformacionDetalle = (props) => {
    const {esModoEdicion, dataBackSolicitud} = props;
    const classes = useStyles({ esModoEdicion });
    //Redux:
    const dispatch = useDispatch()  
    const datosSolicitudesMasInfo = useSelector(state => state.solicitudesGenericas.datosSolicitudesMasInfo)
    const loadingDetalleNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.loadingDetalleNotificacionesMasInfo)
    const errorDetalleNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.errorDetalleNotificacionesMasInfo)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    const masInfoSeleccionada = useSelector(state => state.solicitudesGenericas.masInfoSeleccionada)
    const actualizarDataMasInfo = useSelector(state => state.solicitudesGenericas.actualizarDataMasInfo)
    //Drawer:
    const [openSolicitudMasInfoDrawer, setopenSolicitudMasInfoDrawer] = useState(false)
    const [action, setAction] = useState(null)

    //Action Cards:
    const handleResponderMasInfo = (solicitud) => {
        dispatch(actions.seleccionarMasInfo(solicitud))
        setAction(TIPO_NOTIFICACION[1])
        setopenSolicitudMasInfoDrawer(true)
    }
    const handleAsignarGestor = (solicitud) => {
        dispatch(actions.seleccionarMasInfo(solicitud))
        setAction(TIPO_NOTIFICACION[0])
        setopenSolicitudMasInfoDrawer(true)
    }

    //Llamadas Api:
    useEffect(() => {   
        if(dataBackSolicitud){
            dispatch(actions.searchDatosSolicitudesMasInfo({
                idSolicitud: dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                idOperador: parseInt(usuarioActivo.id),
                esSupervisor: !(usuarioActivo.esOperador)
            }))
        }else{
            dispatch(actions.clearDatosSolicitudesMasInfo())
        }
    },[dataBackSolicitud, actualizarDataMasInfo])

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
    const isExpandir = (solicitud) => {
        if(!masInfoSeleccionada) return true
        else return masInfoSeleccionada ? solicitud.idSolicitudMasInfo === masInfoSeleccionada.idSolicitudMasInfo : false
    }

    return (
        <>
            <SolicitudMasInfoAResponderDrawerWrapper
                masInfoSeleccionada={masInfoSeleccionada}
                dataSG={dataBackSolicitud}
                open={openSolicitudMasInfoDrawer}
                onClose={() => setopenSolicitudMasInfoDrawer(false)}
                action={action}
            />
            <Box style={{minWidth:900}}>
                {esModoEdicion && datosSolicitudesMasInfo && 
                    datosSolicitudesMasInfo.length > 0 && dataBackSolicitud && 
                    dataBackSolicitud.puedeAgregarseMasInfo &&
                    <Box display="flex" justifyContent="flex-end">
                        <Box mb={2}>
                            <SolicitarMasInfo />
                        </Box>
                    </Box>
                }
                {loadingDetalleNotificacionesMasInfo ?
                    <Grid container justify='center' style={{ marginTop: 50 }}>
                        <CircularProgress />
                    </Grid>
                    : datosSolicitudesMasInfo && datosSolicitudesMasInfo.length ?
                        datosSolicitudesMasInfo.map(solicitud => (
                            <Box key={solicitud.id} mb={2}>
                                <CardSolicitudDetalle
                                    solicitud={solicitud}
                                    aResponder={solicitud && solicitud.puedeResponderse}
                                    aAsignar={solicitud && solicitud.puedeAsignarse}
                                    expandir={isExpandir(solicitud)}
                                    handleResponderMasInfo={handleResponderMasInfo}
                                    handleAsignarGestor={handleAsignarGestor}
                                    notificacione={false}
                                    comprimir={true}
                                />
                            </Box>
                        ))
                        :
                        <Box p={3} className={classes.card} style={{ width: esModoEdicion ? 500 : 380, marginBottom: 70 }}>
                            <Grid container direction="column" spacing={2}>
                                <Grid container justify="space-between" item>
                                    <Grid item>
                                        <Typography variant="h6"><b>Solicitudes de + información</b></Typography>
                                    </Grid>
                                    <Grid item>
                                        {esModoEdicion && dataBackSolicitud 
                                            && dataBackSolicitud.puedeAgregarseMasInfo 
                                            && <SolicitarMasInfo />
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item><Divider /></Grid>
                                <Grid item>
                                    <Typography className={classes.descripcion}>No hay solicitudes registradas.</Typography>
                                </Grid>
                            </Grid>
                        </Box>
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

export default MasInformacionDetalle;
