import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
//Material:
import { Grid } from '@material-ui/core';
//Components:
import DetalleSolicitudGenerica from './DetalleSolicitudGenerica/DetalleSolicitudGenerica';
import TablaSolicitudesGenericas from './TablaSolicitudesGenericas/TablaSolicitudesGenericas';
import TableroSupervisor from './TableroSupervisor/TableroSupervisor';
import TableroOperador from './TableroOperador/TableroOperador';
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar';
import CustomLoading from '../commons/Loading/CustomLoading'
//Redux:
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { searchCantidadSolicitudesGenericas } from '../../redux/actions/solicitudesGenericas';
import Utils from '../../Utils/utils';


const SolicitudesGenericas = (props) => {
    const { setTituloHeader, usuarioActivo, setMiniMenu } = props;
    let { path } = useRouteMatch()
    const [mensajeNotFound, setMensajeNotFound] = useState('No se encontraron SG.')
    //Redux:
    const dispatch = useDispatch();
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar);
    const solicitudesGenericas = useSelector(state => state.solicitudesGenericas.solicitudesGenericas);
    const loading = useSelector(state => state.solicitudesGenericas.loading);
    const actualizarData = useSelector(state => state.solicitudesGenericas.actualizarData)
    //Table:
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo));
    const [page, setPage] = useState(0);
    const [request, setRequest] = useState(null)
    const loadingCabecera = useSelector(state => state.solicitudesGenericas.loadingCabecera)
    const [noFiltro, setNoFiltro] = useState(true)
    const [isAsc, setIsAsc] = useState(false)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    useEffect(() => {
        setTituloHeader('Solicitudes Genéricas')
        if(setMiniMenu) setMiniMenu(false)
        dispatch(actions.actualizaNotificaciones())
    }, []);

    useEffect(() => {
        if (!noFiltro) {
            setRequest({
                ...request,
                ordenarDesc: !isAsc,
                offset: page * rowsPerPage,
                filtroPersonaLogueada: false,
                limit: rowsPerPage
            })
        } else {
            if(usuarioActivo && !usuarioActivo.isOperador){
            dispatch(actions.clearTodasSG())
            setRequest({
                idOperador: usuarioActivo && usuarioActivo.id && parseInt(usuarioActivo.id),
                areaOperador: usuarioActivo && usuarioActivo.area,
                filtroPersonaLogueada: true,
                ordenarDesc: !isAsc,
                supervisor: usuarioActivo && !usuarioActivo.isOperador,
                offset: page * rowsPerPage,
                limit: rowsPerPage
            })
        }
        }
    }, [page, rowsPerPage, isAsc]);

    const errorCalback = (bool) => {
        dispatch(actions.setSnackBar({
            vertical: bool ? 'top' : 'bottom',
            open: bool ? true : false, 
            message: bool ? 'Ocurrió un error al buscar las solciitudes genéricas.' : null, 
            severity: bool ? 'error' : null,
        }))
    }

    useEffect(() => {
        const buscarSolicitudesGenericas = async () => {
            if (request) {
              dispatch(actions.searchSolicitudesGenericas(request, errorCalback));
                let req = {
                  areaOperador: usuarioActivo && usuarioActivo.area,
                  idOperador: usuarioActivo && usuarioActivo.id && parseInt(usuarioActivo.id),
                  esSupervisor: usuarioActivo && usuarioActivo.isOperador ? false : true,
                };
                dispatch(searchCantidadSolicitudesGenericas(req));
            }
        };
    
        buscarSolicitudesGenericas();
    
        const intervalo = setInterval(buscarSolicitudesGenericas, 1 * 60 * 1000);
    
        return () => clearInterval(intervalo);
      }, [request, actualizarData]);

    return (
        <Switch>
            <Route exact path={path}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        {usuarioActivo.isOperador ?
                            <TableroOperador
                                usuarioActivo={usuarioActivo}
                                request={request}
                                setRequest={setRequest}
                                setPage={setPage} setRowsPerPage={setRowsPerPage}
                                setMensajeNotFound={setMensajeNotFound}
                                loadingCabecera={loadingCabecera}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                setNoFiltro={setNoFiltro}
                                noFiltro={noFiltro}
                                isAsc={isAsc}
                            />
                            :
                            <TableroSupervisor
                                usuarioActivo={usuarioActivo}
                                request={request}
                                setRequest={setRequest}
                                setPage={setPage} setRowsPerPage={setRowsPerPage}
                                setMensajeNotFound={setMensajeNotFound}
                                loadingCabecera={loadingCabecera}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                setNoFiltro={setNoFiltro}
                                noFiltro={noFiltro}
                                isAsc={isAsc}
                            />
                        }
                    </Grid>
                    <Grid item>
                        {loading ?
                            <CustomLoading loading={true} />
                            :
                            <TablaSolicitudesGenericas
                                data={solicitudesGenericas}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                page={page}
                                setPage={setPage}
                                mensajeNotFound={mensajeNotFound}
                                usuarioActivo={usuarioActivo}
                                setRequest={setRequest}
                                request={request}
                                isAsc={isAsc}
                                setIsAsc={setIsAsc}
                                opcionesPaginacion={opcionesPaginacion}
                            />
                        }
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
            </Route>
            <Route exact path={`${path}/ver-detalle`}>
                <DetalleSolicitudGenerica usuarioActivo={usuarioActivo} esModoEdicion={false} actualizarData={actualizarData} />
            </Route>
            <Route exact path={`${path}/editar`}>
                <DetalleSolicitudGenerica usuarioActivo={usuarioActivo} esModoEdicion={true} actualizarData={actualizarData} />
            </Route>
        </Switch>
    );
};

export default SolicitudesGenericas;
