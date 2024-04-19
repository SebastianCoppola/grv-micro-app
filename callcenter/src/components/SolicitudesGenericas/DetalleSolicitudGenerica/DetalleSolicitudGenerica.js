import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../hooks/hooks';
//Material:
import { Box, Grid, makeStyles, Tab, Tabs } from "@material-ui/core";
//Components:
import DatosSolicitudGenerica from './DatosDeSolicitudGenerica';
import CabeceraDatosDenuncia from './CabeceraDatosDenuncia';
import CustomButton from '../../commons/Button/CustomButton';
import MasInformacionDetalle from './MasInformacion/MasInformacionDetalle';
import AlertComponent from '../AlertComponent/AlertComponent';
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
//Redux:
import * as actions from '../../../redux/actions';
//Acciones SG:
import ReabrirSolicitudGenerica from '../acciones/ReabrirSolicitudGenerica';
import CalificarGestion from '../acciones/CalificarGestion';
import DerivarSolicitudGenerica from '../acciones/DerivarSolicitudGenerica';
import CerrarSolicitudGenerica from '../acciones/CerrarSolicitudGenerica';
import RechazarSolicitudGenerica from '../acciones/RechazarSolicitudGenerica';
import AsignarGestor from '../acciones/AsignarGestor';
import CustomLoading from '../../commons/Loading/CustomLoading';
import { clearDatosSeguimientos } from '../../../redux/actions/solicitudesGenericas';
import { clearBusquedaSGRetorno, guardarBusquedaSGRetorno } from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'

const useStyles = makeStyles((theme) => ({
    tab: {
        textTransform: 'none',
        fontSize: 14
    }
}));

const TabPanel = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && (
            <Box p={3}>
                <Grid container direction="column" alignItems="center">
                    <Grid container item style={{ maxWidth: 865 }}>
                        {children}
                    </Grid>
                </Grid>
            </Box>
        )}
    </div>
);

const DetalleSolicitudGenerica = (props) => {
    const { esModoEdicion, actualizarData } = props;
    const classes = useStyles();
    const history = useHistory();
    const query = useQuery();
    const [tabValue, setTabValue] = useState(query.get("tab") ? +query.get("tab") : 0);
    const [gestor, setGestor] = useState('')
    const [firstRender, setFirstRender] = useState(true)
    //Redux:
    const dispatch = useDispatch();
    const notificacionTeRespondieron = useSelector(state => state.solicitudesGenericas.notificacionTeRespondieron)
    const notificacionesGenerales = useSelector(state => state.solicitudesGenericas.notificacionesGenerales)
    const solicitudSeleccionada = useSelector(state => state.solicitudesGenericas.solicitudSeleccionada)
    const masInfoSeleccionada = useSelector(state => state.solicitudesGenericas.masInfoSeleccionada)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const loading = useSelector(state => state.solicitudesGenericas.loading)
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const consultaPreDefinida = useSelector(state => state.solicitudesGenericas.busquedaConRetorno)

    const [consultaBusquedaAnteriorRetorno, setConsultaBusquedaAnteriorRetorno] = useState(consultaPreDefinida)
    useEffect(() => {

        let cb = bool => {
            if (bool) {
                dispatch(actions.setSnackBar({
                    open: true,
                    message: "Hubo un error al recuperar los datos de la solicitud seleccionada.",
                    severity: 'error'
                }))
            }
        }

        if (firstRender) {
            dispatch(actions.clearDatosSolicitud())
            dispatch(clearDatosSeguimientos())
            if (solicitudSeleccionada) {
                dispatch(actions.searchDatosSolicitud({
                    idSolicitudGenerica: solicitudSeleccionada.idSolicitud,
                    idOperador: parseInt(usuarioActivo.id),
                    esSupervisor: !(usuarioActivo.isOperador)
                }, cb))
            } else {
                dispatch(actions.searchDatosSolicitud({
                    idSolicitudGenerica: masInfoSeleccionada && masInfoSeleccionada.idSolicitudGenerica,
                    idOperador: parseInt(usuarioActivo.id),
                    esSupervisor: !(usuarioActivo.isOperador)
                }, cb))
            }
            if (consultaPreDefinida !== null ) {
                dispatch(clearBusquedaSGRetorno())
            }
            setFirstRender(false)
        }

        if (notificacionTeRespondieron) {
            dispatch(actions.clearDatosSolicitud())
            dispatch(clearDatosSeguimientos())
            dispatch(actions.searchDatosSolicitud({
                idSolicitudGenerica: masInfoSeleccionada && masInfoSeleccionada.idSolicitudGenerica,
                idOperador: parseInt(usuarioActivo.id),
                esSupervisor: !(usuarioActivo.isOperador)
            }, cb))
            dispatch(actions.setNotificacionTeRespondieron(false))
        }

        if (notificacionesGenerales) {
            dispatch(actions.clearDatosSolicitud())
            dispatch(clearDatosSeguimientos())
            dispatch(actions.searchDatosSolicitud({
                idSolicitudGenerica: solicitudSeleccionada && solicitudSeleccionada.idSolicitud,
                idOperador: parseInt(usuarioActivo.id),
                esSupervisor: !(usuarioActivo.isOperador)
            }, cb))
            dispatch(actions.setNotificacionesGenerales(false))
        }

    }, [masInfoSeleccionada, solicitudSeleccionada])

    const puedeReabrirse = () => {
        return (dataBackSolicitud
            && (dataBackSolicitud.idEstadoSolicitud === 3 || dataBackSolicitud.idEstadoSolicitud === 4)
            && (dataBackSolicitud.puedeReabrirse === false)
            && (dataBackSolicitud.idSolicitante === parseInt(usuarioActivo.id)
                || (Utils.stringsAreEqual(dataBackSolicitud.areaSolicitante, usuarioActivo.area) && !(usuarioActivo.isOperador))
            )
        )
    }

    const handleVolver = () => {
        if (consultaBusquedaAnteriorRetorno !== null) {
            dispatch(guardarBusquedaSGRetorno(consultaBusquedaAnteriorRetorno))
        }
            history.goBack()
    }
    return (
        <Grid container direction="column" spacing={3}>
            <CustomLoading loading={loading} />
            <Grid item><CabeceraDatosDenuncia dataBackSolicitud={dataBackSolicitud} /></Grid>
            <Grid item>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    indicatorColor="primary"
                    textColor="primary">
                    <Tab label="Datos de seguimiento" className={classes.tab} />
                    <Tab label="+ Información" className={classes.tab} />
                </Tabs>
                <TabPanel value={tabValue} index={0}>
                    <DatosSolicitudGenerica
                        esModoEdicion={esModoEdicion}
                        actualizarData={actualizarData}
                        dataBackSolicitud={dataBackSolicitud}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <MasInformacionDetalle
                        esModoEdicion={esModoEdicion}
                        dataBackSolicitud={dataBackSolicitud}
                    />
                </TabPanel>
            </Grid>
            <Grid container item justify="center" style={{ display: "flex" }}>
                <Grid container item justify="space-between" style={{ maxWidth: 865 }}>
                    <Grid item >
                        {puedeReabrirse() &&
                            <AlertComponent
                                severidad="info"
                                texto="Ya pasaron 15 días desde su rechazo o cierre. No se podrá reabrir."
                            />
                        }
                    </Grid>
                    <Grid container item justify="flex-end" alignItems="center" spacing={1} xs>
                        <Grid item>
                            <CustomButton
                                styleLabel={{ color: '#747474' }}
                                styleButton={{ borderRadius: 20, border: '1px solid white', backgroundColor: 'white' }}
                                label="Volver"
                                onClik={handleVolver}
                            />
                        </Grid>
                        {dataBackSolicitud && dataBackSolicitud.puedeReabrirse &&
                            <Grid item>
                                <ReabrirSolicitudGenerica actualizarData={actualizarData} />
                            </Grid>
                        }
                        {dataBackSolicitud && dataBackSolicitud.puedeCalificarse &&
                            <Grid item>
                                <CalificarGestion actualizarData={actualizarData} usuarioActivo={usuarioActivo} />
                            </Grid>
                        }
                        {dataBackSolicitud && dataBackSolicitud.puedeDerivarse &&
                            <Grid item>
                                <DerivarSolicitudGenerica actualizarData={actualizarData} dataBackSolicitud={dataBackSolicitud} />
                            </Grid>
                        }
                        {dataBackSolicitud && dataBackSolicitud.puedeCerrarse &&
                            <Grid item>
                                <CerrarSolicitudGenerica actualizarData={actualizarData} />
                            </Grid>
                        }
                        {dataBackSolicitud && dataBackSolicitud.puedeRechazarse &&
                            <Grid item>
                                <RechazarSolicitudGenerica actualizarData={actualizarData} />
                            </Grid>
                        }
                        {dataBackSolicitud && dataBackSolicitud.puedeAsignarse &&
                            <Grid item>
                                <AsignarGestor
                                    actualizarData={actualizarData}
                                    gestor={gestor} setGestor={setGestor}
                                    buttonLabel="Asignar gestor"
                                    titulo="Asignar Gestor"
                                    confirmarHandler={() => history.goBack()}
                                />
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <CustomSnackBar
                    handleClose={() => dispatch(actions.setSnackBar({ open: false }))}
                    open={snackbar.open}
                    title={snackbar.message}
                    severity={snackbar.severity}
                    vertical={snackbar.vertical ? snackbar.vertical : 'bottom'}
                />
            </Grid>
        </Grid>
    );
};

export default DetalleSolicitudGenerica;