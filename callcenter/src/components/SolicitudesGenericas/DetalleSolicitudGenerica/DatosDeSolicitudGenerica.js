import React, { useEffect, useState } from 'react';
//MATERIAL:
import { Box, Divider, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Typography, CircularProgress } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
//COMPONENT:
import CustomButton from '../../commons/Button/CustomButton';
//ICONS:
import NuevoSeguimiento from '../acciones/NuevoSeguimiento';
import CambiarGestor from '../acciones/CambiarGestor';
import { ReactComponent as ExcelFileIcon } from '../../../commons/assets/DenunciaCompleta/excelFileIcon.svg'
import { ReactComponent as AnadioSeguimiento } from '../../../commons/assets/IconsTipoSeguimientos/AnadioSeguimiento.svg'
import { ReactComponent as CalificacionNegativa } from '../../../commons/assets/IconsTipoSeguimientos/CalificacionNegativa.svg'
import { ReactComponent as CalificacionPositiva } from '../../../commons/assets/IconsTipoSeguimientos/CalificacionPositiva.svg'
import { ReactComponent as CambioGestor } from '../../../commons/assets/IconsTipoSeguimientos/CambioGestor.svg'
import { ReactComponent as Cerro } from '../../../commons/assets/IconsTipoSeguimientos/Cerro.svg'
import { ReactComponent as Derivo } from '../../../commons/assets/IconsTipoSeguimientos/Derivo.svg'
import { ReactComponent as MasInfo } from '../../../commons/assets/IconsTipoSeguimientos/MasInfo.svg'
import { ReactComponent as InicioSolicitud } from '../../../commons/assets/IconsTipoSeguimientos/InicioSolicitud.svg'
import { ReactComponent as NoDefinido } from '../../../commons/assets/IconsTipoSeguimientos/NoDefinido.svg'
import { ReactComponent as Reabrio } from '../../../commons/assets/IconsTipoSeguimientos/Reabrio.svg'
import { ReactComponent as Rechazo } from '../../../commons/assets/IconsTipoSeguimientos/Rechazo.svg'
import ArchivoAdjunto from './ArchivoAdjunto';
//REDUX:
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions/solicitudesGenericas';
//UTILS:
import Utils from '../../../Utils/utils';
import { getArchivoSolicitudGenerica } from '../../../redux/actions/importarExportar';

const useStyles = makeStyles((theme) => ({
    card: {
        width: 865,
        //flexGrow: 1,
        boxSizing: 'border-box',
        border: '1px solid #dadce0',
        borderRadius: 8
    },
    label: {
        width: 'fit-content',
        marginRight: 12,
        fontSize: 14,
        color: '#747474'
    },
    value: {
        fontSize: 14
    },
    tabla: {
        '& .MuiTableCell-root': {
            padding: 14
        },
        '& .MuiTableCell-head': {
            fontSize: 12,
            color: '#747474'
        },
    },
    tablaRow: {
        fontSize: 14
    }
}));

const DatosSolicitudGenerica = (props) => {
    const { esModoEdicion, actualizarData, dataBackSolicitud } = props
    const classes = useStyles();
    //Seguimiento Redux:
    const dispatch = useDispatch()
    const dataBackSeguimiento = useSelector(state => state.solicitudesGenericas.datosSeguimiento)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const loadingSeguimiento = useSelector(state => state.solicitudesGenericas.loadingSeguimiento)
    //Seguimiento Tabla:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [asc, setAsc] = useState(false)
    const [req, setReq] = useState(null)

    //Tabla Seguimiento: 
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    }

    //Devuelve el Icono de Seguimiento segun el tipo:
    const getIconTipoSeguimiento = (idTipoSeguimiento) => {
        switch (idTipoSeguimiento) {
            case 1: return <InicioSolicitud />
            case 2: return <MasInfo />
            case 3: return <Derivo />
            case 4: return <CambioGestor />
            case 5: return <AnadioSeguimiento />
            case 6: return <CalificacionNegativa />
            case 7: return <CalificacionPositiva />
            case 8: return <Cerro />
            case 9: return <Rechazo />
            case 10: return <Reabrio />
            case 11: return <NoDefinido style={{ border: 'back 1px solid', padding: 8, background: '#eaeaea', borderRadius: 5 }} />
            default: return <NoDefinido style={{ border: 'back 1px solid', padding: 8, background: '#eaeaea', borderRadius: 5 }} />
        }
    }

    const sortFromBack = () => {
        if (asc === true) {
            setAsc(false)
        } else {
            setAsc(true)
        }
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0)
    }

    useEffect(() => {
        setReq({
            idSolicitud: dataBackSolicitud && dataBackSolicitud.nroSolicitud,
            offset: page * rowsPerPage,
            limit: rowsPerPage
        })
    }, [page, rowsPerPage, dataBackSolicitud])

    useEffect(() => {
        if (dataBackSolicitud && req && req.idSolicitud) {
            dispatch(actions.searchDatosSeguimiento(req))
        }
    }, [req])

    let callbackError = (bool) => {
        let message = bool ? "Hubo un error al descargar el archivo" : "Archivo descargado"
        let severity = bool ? 'error' : 'success'
        dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: "bottom" }));
    }

    let descargarArchivoAdjunto = (tipoSeguimiento, nombreArchivo) => {
        let req = {
            nombreArchivo,
            accion: tipoSeguimiento === 1 ? "INICIO" : tipoSeguimiento === 5 ? "SEGUIMIENTO" : tipoSeguimiento === 2 ? "MAS INFO" : "CIERRE"
        }
        dispatch(getArchivoSolicitudGenerica(req, callbackError, nombreArchivo))
    }

    return (
        <Box>
            <Box p={3} className={classes.card}>
                <Grid container direction="column" spacing={5}>
                    <Grid container item direction="column" spacing={2}>
                        <Grid container item justify="space-between" alignItems="center">
                            <Grid item><Typography variant="h8">Datos de la solicitud</Typography></Grid>
                            <Grid item>
                                <Box display="flex" justifyContent="flex-end" alignItems="center">
                                    <Typography className={classes.label}>Estado solicitud:</Typography>
                                    <CustomButton
                                        label={dataBackSolicitud && dataBackSolicitud.estadoSolicitud ? dataBackSolicitud.estadoSolicitud : '-'}
                                        width={100}
                                        height={dataBackSolicitud && dataBackSolicitud.estadoSolicitud === "Cerrado No Resuelta" ? 50 : 30}
                                        styleButton={{ border: '1px solid #fdc800', backgroundColor: 'rgba(255, 205, 113, 0.27)' }}
                                        styleLabel={{ textTransformation: 'none', color: '#f29423' }}
                                        disabled={true}
                                    />
                                    {dataBackSolicitud && dataBackSolicitud.reabierta ?
                                        <>
                                            <Typography style={{ color: '#3fb6dc', marginLeft: 15 }}>Reabierto</Typography>
                                            <div style={{ position: 'absolute' }}>
                                                <div style={{ position: 'relative', right: -24, top: -4, width: 8, height: 72, backgroundColor: '#3fb6dc', borderRadius: '0 5px 0 0' }}></div>
                                            </div>
                                        </>
                                        : null
                                    }
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item><Divider /></Grid>
                        <Grid container item direction="row" xs={12}>
                            <Grid container item direction="column" xs={6} spacing={2}>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Nro. solicitud:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.nroSolicitud ? dataBackSolicitud.nroSolicitud : '-'}</Typography></Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Fecha solicitud:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.fechaSolicitud ? Utils.dateFormat5(dataBackSolicitud && dataBackSolicitud.fechaSolicitud) : '-'}</Typography></Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Solicitante:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.solicitante ? dataBackSolicitud.solicitante : '-'}</Typography></Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Área solicitante:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.areaSolicitante ? dataBackSolicitud.areaSolicitante : '-'}</Typography></Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Tipo solicitud:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.tipoSolicitud ? dataBackSolicitud.tipoSolicitud : '-'}</Typography></Grid>
                                </Grid>
                            </Grid>
                            <Grid container item direction="column" xs={6} spacing={2}>
                                <Grid item container>
                                    <Grid item><Typography className={classes.label}>Área gestión:</Typography></Grid>
                                    <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.areaGestion ? dataBackSolicitud.areaGestion : '-'}</Typography></Grid>
                                </Grid>
                                <Grid item container alignItems='center'>
                                    <Grid item><Typography className={classes.label}>Gestor:</Typography></Grid>
                                    <Grid item>
                                        {
                                            dataBackSolicitud && dataBackSolicitud.gestor
                                                ? <CambiarGestor
                                                    gestorActual={{ nombre: dataBackSolicitud.gestor }}
                                                    esModoEdicion={esModoEdicion}
                                                    dataSolicitud={dataBackSolicitud}
                                                    actualizarData={actualizarData} />
                                                : '-'
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item container alignItems='center'>
                                    <Grid item><Typography className={classes.label}>Adjunto inicial:</Typography></Grid>
                                    <Grid item>
                                        {dataBackSolicitud && dataBackSolicitud.adjuntoInicial
                                            ? <ArchivoAdjunto nombre={dataBackSolicitud && dataBackSolicitud.adjuntoInicial ? dataBackSolicitud.adjuntoInicial : "-"} peso={dataBackSolicitud && dataBackSolicitud.pesoArchivo ? dataBackSolicitud.pesoArchivo : "-"} />
                                            : '-'
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Box p={2} style={{ backgroundColor: '#f5f5f5' }}>
                                <Typography style={{ fontSize: 14 }}>Observación: {dataBackSolicitud && dataBackSolicitud.observacion ? dataBackSolicitud.observacion : '-'} </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container item direction="column" >
                        <Grid container item direction="column" spacing={2}>
                            <Grid item><Typography variant="h8">Datos del prestador</Typography></Grid>
                            <Grid item><Divider /></Grid>
                            <Grid container item direction="row" xs={12}>
                                <Grid container item direction="column" xs={6} spacing={2}>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Provincia:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.provinciaPrestador ? dataBackSolicitud.provinciaPrestador : '-'}</Typography></Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Ciudad/ Localidad:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.ciudadLocalidadPrestador ? dataBackSolicitud.ciudadLocalidadPrestador : '-'}</Typography></Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Motivo del caso:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.motivoCaso ? dataBackSolicitud.motivoCaso : '-'}</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid container item direction="column" xs={6} spacing={2}>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Estado:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.estadoPrestador ? dataBackSolicitud.estadoPrestador : '-'}</Typography></Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Subclasificación:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.subclasificacion ? dataBackSolicitud.subclasificacion : '-'}</Typography></Grid>
                                    </Grid>
                                    <Grid item container>
                                        <Grid item><Typography className={classes.label}>Tiempo de resolución:</Typography></Grid>
                                        <Grid item><Typography className={classes.value}>{dataBackSolicitud && dataBackSolicitud.tiempoResolucion ? dataBackSolicitud.tiempoResolucion : '-'}</Typography></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box p={3} mt={3} className={classes.card}>
                <Grid container direction="column" spacing={2}>
                    <Grid container item justify="space-between" alignItems="center">
                        <Grid item><Typography variant="h8">Seguimiento</Typography></Grid>
                        <Grid item>
                            {esModoEdicion && dataBackSolicitud && dataBackSolicitud.idGestor &&
                                dataBackSolicitud.idGestor === parseInt(usuarioActivo.id) &&
                                <NuevoSeguimiento />
                            }
                        </Grid>
                    </Grid>
                    <Grid item><Divider /></Grid>
                    {loadingSeguimiento ?
                        (<Grid container justify='center' style={{ marginTop: 50 }}>
                            <CircularProgress />
                        </Grid>)
                        : dataBackSeguimiento && dataBackSeguimiento.objetos && dataBackSeguimiento.objetos.length ?
                            <Grid item>
                                <Table className={classes.tabla}>
                                    <TableHead className={classes.tablaHead}>
                                        <TableRow>
                                            <TableCell align="left">TIPO</TableCell>
                                            <TableCell align="left">RESPONSABLE</TableCell>
                                            <TableCell align="left">FECHA</TableCell>
                                            <TableCell align="left">OBSERVACIÓN DE SEGUIMIENTO</TableCell>
                                            <TableCell align="right">ADJUNTO</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataBackSeguimiento && dataBackSeguimiento.objetos && dataBackSeguimiento.objetos.length > 0 && dataBackSeguimiento.objetos.map((row) => (
                                            <TableRow key={row.fecha} className={classes.tablaRow}>
                                                <TableCell align="left">{getIconTipoSeguimiento(row.idTipoSeguimiento ?? 0)}</TableCell>
                                                <TableCell align="left">
                                                    <Box display="flex" alignItems="center">
                                                        {row && row.avatar
                                                            ? <img src={row.avatar} alt="responsable-avatar" style={{ marginRight: 10, width: '35px', height: '35px' }} />
                                                            : <AccountCircle style={{ marginRight: 10, width: '36px', height: '36px', color: 'grey' }} />
                                                        }
                                                        <Typography style={{ fontSize: 14, maxWidth: 160 }}>{row.responsable}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="left">{Utils.dateFormat5(row.fecha)}</TableCell>
                                                <TableCell align="left">{row.observacion}</TableCell>
                                                <TableCell align="center">
                                                    {row.nombreArchivo
                                                        ? (<IconButton className={classes.adjunto} onClick={() => descargarArchivoAdjunto(row.idTipoSeguimiento, row.nombreArchivo)}><ExcelFileIcon /></IconButton>)
                                                        : '-'
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Box display="flex" justifyContent={'end'} alignItems="center" mt={3}>
                                    <TablePagination
                                        className={classes.pagination}
                                        labelRowsPerPage="Filas por página"
                                        rowsPerPageOptions={[5, 10, 15]}
                                        component="div"
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                                        count={dataBackSeguimiento && dataBackSeguimiento.cantidadTotal}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage} />
                                </Box>
                            </Grid>
                            :
                            <Box p={2} style={{ backgroundColor: '#f5f5f5' }}>
                                <Typography style={{ fontSize: 14, textAlign: 'center', color: 'red' }}>No existen datos de seguimiento.</Typography>
                            </Box>
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default DatosSolicitudGenerica