import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'
import { useHistory } from "react-router";
import { TIPO_NOTIFICACION } from '../../../Utils/const'
import { Avatar, Box, CircularProgress, Drawer, Grid, IconButton, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import { ReactComponent as RespondidoMasInfoIcon } from '../../../commons/assets/IconsSolicitudesGenericas/respondidoMasInfoIcon.svg';
import { ReactComponent as AResponderMasInfoIcon } from '../../../commons/assets/IconsSolicitudesGenericas/aResponderMasInfoIcon.svg';
import { ReactComponent as SinAsignarMasInfoIcon } from '../../../commons/assets/IconsSolicitudesGenericas/sinAsignarMasInfoIcon.svg';
import { ReactComponent as DotIcon } from '../../../commons/assets/IconsSolicitudesGenericas/dotIcon.svg';
import { ReactComponent as MasInfoNotificacionesIcon } from '../../../commons/assets/IconsSolicitudesGenericas/masInfoNotificacionesIcon.svg';
import SolicitudMasInfoAResponderDrawer from '../SolicitudMasInfoAResponderDrawer/SolicitudMasInfoAResponderDrawer';
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
import CloseIcon from '@material-ui/icons/Close';
import { NOTIFICACIONES_MAS_INFO_NOT_FOUND as NOT_FOUND } from '../../../Utils/const'

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && children}
    </div>
);
const useNotificacionStyles = makeStyles({
    root: {
        border: '1px solid #eaeaea',
        borderRadius: 4,
        boxSizing: 'border-box',
        '& p': {
            fontSize: 14
        },
        '& :hover': {
            backgroundColor: '#f4f4f4',
            cursor: 'pointer'
        }
    }
});
const Notificacion = ({ icono, titulo, descripcion, fecha, onClickHandler }) => {
    const classes = useNotificacionStyles();
    return (
        <Box className={classes.root} mb={1} onClick={onClickHandler}>
            <Box p={1}>
                <Grid container>
                    <Grid item xs={2}>{icono}</Grid>
                    <Grid container item direction="column" xs={9}>
                        <Grid item><Typography><b>{titulo}</b></Typography></Grid>
                        <Grid item><Typography>{descripcion}</Typography></Grid>
                        <Grid item><Typography>{fecha}</Typography></Grid>
                    </Grid>
                    <Grid item xs={1}><DotIcon /></Grid>
                </Grid>
            </Box>
        </Box>
    );
};
const useStyles = makeStyles((theme) => ({
    tab: {
        textTransform: 'none',
        fontSize: 14,

    },
    drawerContent: {
        padding: 24,
        minWidth: 470,
        maxWidth: 470,
        boxSizing: 'border-box',
        '& .MuiTab-root': {
            minWidth: 0,
            padding: '6px 9px'
        }
    },
    titulo: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    dotNotificacion: {
        width: 17,
        height: 17,
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#f29423',
        fontSize: 11
    },
    notFound:{
        backgroundColor:'#dfdfdf',
        fontSize:14,
        padding:'20px 10px 20px 30px',
        margin:'10px 10px 0 10px',
        borderRadius:2,
    }
}));


const NotificacionesMasInformacion = (props) => {
    const classes = useStyles();
    const history = useHistory();
    //Redux:
    const dispatch = useDispatch()
    const actualizarNotificaciones = useSelector(state => state.solicitudesGenericas.actualizarNotificaciones)
    const cantidadNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.cantidadNotificacionesMasInfo)
    const dataNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.dataNotificacionesMasInfo)
    const loadingNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.loadingNotificacionesMasInfo)
    const errorNotificacionesMasInfo = useSelector(state => state.solicitudesGenericas.errorNotificacionesMasInfo)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    //Drawer I
    const [showDrawer, setShowDrawer] = useState(false);
    const [tabValue, setTabValue] = useState(0)
    //Drawer II
    const [openSolicitudMasInfoDrawer, setopenSolicitudMasInfoDrawer] = useState(false);
    const [masInfoSeleccionada, setMasInfoSeleccionada] = useState(null)
    const [action, setAction] = useState(null)
    
    //Actualizar Notificaciones +INFO:
    useEffect(()=>{
        dispatch(actions.actualizaNotificaciones())
    },[])

    //Llamar al endpoint cantidad de notificaciones:
    useEffect(()=>{
        if(props.usuarioActivo && props.usuarioActivo.id){
            dispatch(actions.searchCantidadNotificacionesMasInfo({
                "idOperador": parseInt(props.usuarioActivo.id),
                "areaGestionOrigen": props.usuarioActivo.area,
                "supervisor": !(props.usuarioActivo.isOperador),
            }))
        }
    },[actualizarNotificaciones, usuarioActivo])

    //Busco Notificaciones al abrir el drawer:
    useEffect(() => {
        if (showDrawer && usuarioActivo) {
            props.setOpenBuscador(false)
            dispatch(actions.getDataNotificacionesMasInfo({
                "idOperador": usuarioActivo.id,
                "areaGestionOrigen": usuarioActivo.area,
                "supervisor": usuarioActivo.isOperador ? false : true
            }))
        } else {
            props.setOpenBuscador(true)
            dispatch(actions.clearDataNotificacionesMasInfo())
            dispatch(actions.setErrorNotificacionesMasInfo(false))
            dispatch(actions.actualizaNotificaciones())
        }
    }, [showDrawer])

    //Al cargarse usuario activo seteo el tabValue:
    useEffect(() => {
        setTabValue(usuarioActivo && usuarioActivo.isOperador ? 1 : 0)
    }, [usuarioActivo])

    //Abro SnackBar en caso de ERROR:
    useEffect(() => {
        if (errorNotificacionesMasInfo) {
            dispatch(actions.setSnackBar({
                open: true,
                message: typeof (errorNotificacionesMasInfo) === "string" ? errorNotificacionesMasInfo : 'Ocurrió un error al intentar recuperar las notificaciones.',
                severity: 'error',
                vertical: 'top'
            }))
        }
    }, [errorNotificacionesMasInfo])

    //Handlers:
    const sinAsignarHandler = (solicitud) => {
        marcarComoVista(solicitud)
        setMasInfoSeleccionada(solicitud)
        setShowDrawer(false)
        setAction(TIPO_NOTIFICACION[0])
        setopenSolicitudMasInfoDrawer(true)
    }
    const aResponderHandler = (solicitud) => {
        marcarComoVista(solicitud)
        setMasInfoSeleccionada(solicitud)
        setShowDrawer(false);
        setAction(TIPO_NOTIFICACION[1]);
        setopenSolicitudMasInfoDrawer(true);
    }
    const teRespondieronHandler = (solicitud) => {
        marcarComoVista(solicitud)
        dispatch(actions.setNotificacionTeRespondieron(true))
        dispatch(actions.clearSGSeleccionada())
        dispatch(actions.seleccionarMasInfo(solicitud))
        setShowDrawer(false);
        history.push('/home/solicitudesGenericas/editar?tab=1');
    }
    
    //Helpers
    const formatDate = (date) => {
        return date.substring(0,10)
                    .split('-')
                    .reverse()
                    .toString()
                    .replaceAll(',','/')
    }
    const marcarComoVista = (solicitud) => {
        let req = {
            idSolicitudMasInfo: solicitud.idSolicitudMasInfo,
            idOperador: parseInt(usuarioActivo.id),
            esSupervisor: !usuarioActivo.isOperador
        }
        dispatch(actions.marcarMasInfoComoVista(req))
    }

    return (
        <>
            <SolicitudMasInfoAResponderDrawer
                masInfoSeleccionada={masInfoSeleccionada}
                open={openSolicitudMasInfoDrawer}
                onClose={()=>setopenSolicitudMasInfoDrawer(false)}
                action={action} 
                notificaciones={true}
            />
            <Box style={{ position: 'relative' }}>
                <IconButton onClick={() => setShowDrawer(true)}>
                    <MasInfoNotificacionesIcon />
                    {cantidadNotificacionesMasInfo &&
                        <Avatar className={classes.dotNotificacion}>{cantidadNotificacionesMasInfo}</Avatar>
                    }
                </IconButton>
            </Box>
            <Drawer
                anchor="right"
                open={showDrawer}
                onClose={() => setShowDrawer(false)}>
                <Box className={classes.drawerContent} >
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Tabs
                                value={tabValue}
                                onChange={(_, newValue) => setTabValue(newValue)}
                                indicatorColor="primary"
                                textColor="primary">
                                {usuarioActivo && !usuarioActivo.isOperador ?
                                    <Tab label="Sin asignar" className={classes.tab} value={0} />
                                    : null}
                                <Tab label="A responder" className={classes.tab} value={1} />
                                <Tab label="Te respondieron" className={classes.tab} value={2} />
                            </Tabs>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setShowDrawer(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box pt={3}>
                        <TabPanel value={tabValue} index={0}>
                            {loadingNotificacionesMasInfo ?
                                <Grid container justify='center' style={{ marginTop: 50 }}>
                                    <CircularProgress />
                                </Grid>
                            : dataNotificacionesMasInfo 
                                && dataNotificacionesMasInfo.length 
                                && dataNotificacionesMasInfo.filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[0]).length ?
                                    dataNotificacionesMasInfo
                                        .filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[0])
                                        .map(it => 
                                            <Notificacion
                                                key={it.tituloNotificacion.split('#')[1]}
                                                icono={<SinAsignarMasInfoIcon />}
                                                titulo={it.tituloNotificacion}
                                                descripcion={it.observacion}
                                                fecha={formatDate(it.fechaHora)}
                                                onClickHandler={()=>{sinAsignarHandler(it)}} 
                                            />
                                    )
                            :
                                <Typography className={classes.notFound}>{NOT_FOUND[0]}</Typography>
                            }
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            {loadingNotificacionesMasInfo ?
                                <Grid container justify='center' style={{ marginTop: 50 }}>
                                    <CircularProgress />
                                </Grid>
                            : dataNotificacionesMasInfo 
                                && dataNotificacionesMasInfo.length 
                                && dataNotificacionesMasInfo.filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[1]).length ?
                                    dataNotificacionesMasInfo
                                        .filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[1])
                                        .map(it => 
                                            <Notificacion
                                                key={it.tituloNotificacion.split('#')[1]}
                                                icono={<AResponderMasInfoIcon />}
                                                titulo={it.tituloNotificacion}
                                                descripcion={it.observacion}
                                                fecha={formatDate(it.fechaHora)}
                                                onClickHandler={()=>{aResponderHandler(it)}} 
                                            />
                                        )
                            :
                                <Typography className={classes.notFound}>{NOT_FOUND[1]}</Typography>
                            }
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            {loadingNotificacionesMasInfo ?
                                <Grid container justify='center' style={{ marginTop: 50 }}>
                                    <CircularProgress />
                                </Grid>
                            : dataNotificacionesMasInfo 
                                && dataNotificacionesMasInfo.length
                                && dataNotificacionesMasInfo.filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[2]).length ?
                                    dataNotificacionesMasInfo
                                        .filter(it=>it.tipoNotificacion === TIPO_NOTIFICACION[2])
                                        .map(it => 
                                            <Notificacion
                                                key={it.tituloNotificacion.split('#')[1]}
                                                icono={<RespondidoMasInfoIcon />}
                                                titulo={it.tituloNotificacion}
                                                descripcion={it.observacion}
                                                fecha={formatDate(it.fechaHora)}
                                                onClickHandler={()=>{teRespondieronHandler(it)}} 
                                            />
                                        )
                            :
                                <Typography className={classes.notFound}>{NOT_FOUND[2]}</Typography>
                            }
                        </TabPanel>
                    </Box>
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
            </Drawer>
        </>
    );
};

export default NotificacionesMasInformacion;