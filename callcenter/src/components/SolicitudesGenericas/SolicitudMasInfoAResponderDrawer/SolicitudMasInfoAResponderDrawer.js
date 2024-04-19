import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import { useHistory, useLocation } from "react-router-dom";
import { TIPO_NOTIFICACION } from '../../../Utils/const'
import { respuestaSolicitudActionCreator, RespuestaSolicitudProvider, useRespuestaSolicitudContext } from "./RespuestaSolicitudContext";
import { Box, Divider, Drawer, Grid, IconButton, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import CabeceraDatosDenuncia from "../DetalleSolicitudGenerica/CabeceraDatosDenuncia";
import DatosSolicitudGenerica from "../DetalleSolicitudGenerica/DatosDeSolicitudGenerica";
import MasInformacionDrawer from "./MasInformacionDrawer";
import CustomButton from "../../commons/Button/CustomButton";
import AsignarGestorMasInfo from "../acciones/AsignarGestorMasInfo";
import CustomSnackBar from "../../commons/SnackBar/CustomSnackBar";
import CustomLoading from "../../commons/Loading/CustomLoading";

export const useStyles = makeStyles((theme) => ({
    drawerContent: {
        padding: '16px 24px',
        maxWidth: 920,
        flexGrow: 1,
        boxSizing: 'border-box'
    },
    titulo: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    tab: {
        textTransform: 'none',
        fontSize: 16
    }
}));

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && (
            <Box py={3}>
                <Grid container direction="column" alignItems="center">
                    <Grid container item style={{ maxWidth: 865 }}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        )}
    </div>
);

const SolicitudMasInfoAResponderDrawer = ({ open, onClose, action, masInfoSeleccionada, dataSG }) => {

    const classes = useStyles()

    const history = useHistory()
    const dispatch = useDispatch()
    let location = useLocation()

    const [tabValue, setTabValue] = useState(0)
    const [gestor, setGestor] = useState(null)
    const [respuestaSolicitud, dispatchContext] = useRespuestaSolicitudContext()
    const [file, setFile] = useState(null)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitudDrawerNotificaciones)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    const loading = useSelector(state => state.solicitudesGenericas.loading);

    //Llamada Api para buscar los datos de la SG solo en caso de Notificaciones:
    useEffect(() => {
        if (open && dataSG === undefined) {
            dispatch(actions.getDatosSGDrawerNotificaciones({
                idSolicitudGenerica: masInfoSeleccionada.idSolicitudGenerica,
                esSupervisor: !(usuarioActivo.isOperador),
                idOperador: usuarioActivo.id
            }))
        }
        if (!open) {
            dispatch(actions.actualizaNotificaciones())
        }
    }, [open])

    useEffect(() => {
        cancelarHandler()
    }, [tabValue])

    const closeHandler = () => {
        onClose();
        dispatchContext(respuestaSolicitudActionCreator.reset())
        dispatch(actions.clearDatosSGDrawerNotificaciones())
        dispatch(actions.actualizaNotificaciones())
    };

    const cancelarHandler = () => {
        dispatchContext(respuestaSolicitudActionCreator.reset());
    };

    const enviarRespuestaHandler = () => {
        let cb = bool => {
            let message = bool ? 'Respuesta enviada.' : 'Ocurrió un error al intentar responder la solicitud + información.'
            let severity = bool ? 'success' : 'error'
            let vertical = bool ? 'bottom' : 'top'
            dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
            if (bool) {
                if (location.pathname.startsWith('/home/editar/')) {
                    history.push('/home/editar/solicitudesGenericas')
                } else {
                    history.push('/home/solicitudesGenericas')
                }
                onClose()
            }
        }
        let req = {
            idSolicitudGenericaMasInfo: masInfoSeleccionada.idSolicitudMasInfo,
            idSolicitante: respuestaSolicitud.respuesta.idSolicitante,
            observaciones: respuestaSolicitud.respuesta.observaciones,
            estadoRespuesta: respuestaSolicitud.respuesta.estadoRespuesta,
        }
        var formData = new FormData();
        formData.set("file", file ? file : null)
        formData.set("responderSolicitud", JSON.stringify(req))
        dispatch(actions.responderSolicitudMasInfo(formData, cb))
    };

    const asignarGestorHandler = () => {
        onClose();
    };

    const disableEnviarRespuesta = () => {
        return !(respuestaSolicitud
            && respuestaSolicitud.respuesta
            && respuestaSolicitud.respuesta.estadoRespuesta
            && respuestaSolicitud.respuesta.observaciones)
    }

    const showCancelarButton = () => {
        return Boolean(respuestaSolicitud.respuesta)
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={closeHandler}
        >
            <Box px={3} py={2} display="flex" className={classes.drawerContent} >
                <Grid container direction="column" justify="space-between" >
                    <Grid container item direction="column" spacing={1}>
                        <Grid container item justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h2" className={classes.titulo}>Solicitud + info a responder</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={closeHandler}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item><Divider /></Grid>
                        <Grid item>
                            <Box mt={1}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <CabeceraDatosDenuncia dataBackSolicitud={dataSG ? dataSG : dataBackSolicitud} />
                                    </Grid>
                                    <Grid item>
                                        <Tabs
                                            value={tabValue}
                                            onChange={(_, newValue) => setTabValue(newValue)}
                                            indicatorColor="primary"
                                            textColor="primary"
                                        >
                                            <Tab label="+ Información" className={classes.tab} />
                                            <Tab label="Datos de seguimiento" className={classes.tab} />
                                        </Tabs>
                                        <TabPanel value={tabValue} index={0}>
                                            <MasInformacionDrawer
                                                masInfoSeleccionada={masInfoSeleccionada}
                                                action={action}
                                                setFile={setFile}
                                                file={file}
                                            />
                                        </TabPanel>
                                        <TabPanel value={tabValue} index={1}>
                                            <DatosSolicitudGenerica
                                                dataBackSolicitud={dataSG ? dataSG : dataBackSolicitud}
                                                esModoEdicion={false}
                                            />
                                        </TabPanel>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item justify="flex-end" alignItems="center" spacing={2}>
                        <Grid item>
                            <CustomButton
                                styleLabel={{ color: '#747474' }}
                                styleButton={{ borderRadius: 20, border: '1px solid white', backgroundColor: 'white' }}
                                label="Volver"
                                onClik={closeHandler}
                            />
                        </Grid>
                        {action === TIPO_NOTIFICACION[0] && (
                            <Grid item>
                                <AsignarGestorMasInfo
                                    buttonLabel="Asignar Solicitud + info"
                                    titulo="Asignar Gestor a la solicitud + info"
                                    confirmarHandler={asignarGestorHandler}
                                    gestor={gestor} setGestor={setGestor}
                                    masInfoSeleccionada={masInfoSeleccionada}
                                />
                            </Grid>
                        )}

                        {action === TIPO_NOTIFICACION[1] && (
                            <>
                                {showCancelarButton() && (
                                    <Grid item>
                                        <CustomButton
                                            variant="contained"
                                            styleLabel={{ color: '#747474' }}
                                            styleButton={{ borderRadius: 20, border: '1px solid #747474', backgroundColor: 'white' }}
                                            label="Cancelar"
                                            onClik={cancelarHandler}
                                        />
                                    </Grid>
                                )}
                                <Grid item>
                                    <CustomButton
                                        variant="contained"
                                        color="primary"
                                        styleButton={{ borderRadius: 20 }}
                                        label="Enviar respuesta"
                                        disabled={disableEnviarRespuesta()}
                                        onClik={enviarRespuestaHandler}
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Grid item>
                <CustomSnackBar
                    handleClose={() => dispatch(actions.setSnackBar({ open: false }))}
                    open={snackbar.open}
                    title={snackbar.message}
                    severity={snackbar.severity}
                    vertical={snackbar.vertical ? snackbar.vertical : 'bottom'}
                />
            </Grid>
            <CustomLoading loading={loading} />
        </Drawer>
    );
};

const SolicitudMasInfoAResponderDrawerWrapper = (props) => (
    <RespuestaSolicitudProvider>
        <SolicitudMasInfoAResponderDrawer {...props} />
    </RespuestaSolicitudProvider>
);


export default SolicitudMasInfoAResponderDrawerWrapper;
