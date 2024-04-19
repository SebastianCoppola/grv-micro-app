import { Box, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactComponent as EditIcon } from '../../../commons/assets/IconsSolicitudesGenericas/editIcon.svg';
import { ReactComponent as PreviewIcon } from '../../../commons/assets/IconsSolicitudesGenericas/previewIcon.svg';
import { ReactComponent as InfoResponderIcon } from '../../../commons/assets/IconsSolicitudesGenericas/infoResponderIcon.svg';
import { ReactComponent as InfoSolicitadaIcon } from '../../../commons/assets/IconsSolicitudesGenericas/infoSolicitadaIcon.svg';
import { ReactComponent as InfoRespondidaIcon } from '../../../commons/assets/IconsSolicitudesGenericas/infoRespondidaIcon.svg';
import { ReactComponent as MasInfoResponderIcon } from '../../../commons/assets/IconsSolicitudesGenericas/masInfoResponderIcon.svg';
import { ReactComponent as MasInfoSolicitadaIcon } from '../../../commons/assets/IconsSolicitudesGenericas/masInfoSolicitadaIcon.svg';
import useTablaSolicitudesGenericasStyles from "./useTablaSolicitudesGenericasStyles";
import { AccountCircle } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { seleccionarSG, clearSGSeleccionada, searchSolicitudesGenericas } from "../../../redux/actions/solicitudesGenericas";
import { OPCIONES_PAGINACION_5_10_15 } from "../../../Utils/const";

const useDotStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        borderRadius: 10,
        width: 18,
        height: 18,
        backgroundColor: props => props.color
    }
}));
const Dot = (props) => {
    const classes = useDotStyles(props);
    return <span className={classes.root}></span>;
}
const IconWithLabel = ({ label, children }) => {
    return (
        <Box display="flex" mr={2}>
            {children}
            <span style={{ fontSize: 12, marginLeft: 5 }}>{label}</span>
        </Box>
    );
};


const TablaSolicitudesGenericas = (props) => {
    const { data, rowsPerPage, setRowsPerPage, page, setPage, mensajeNotFound, setRequest, usuarioActivo, request, isAsc, setIsAsc, opcionesPaginacion } = props;
    const classes = useTablaSolicitudesGenericasStyles(props);

    const dispatch = useDispatch()
    //Router:
    const history = useHistory();
    let { url } = useRouteMatch();

    useEffect(() => {
        dispatch(clearSGSeleccionada())
    }, [])

    const orderBy = (column) => {
        setIsAsc(isAsc === null ? false : isAsc === false ? true : false)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const estado = (estadoId) => {
        if (estadoId) {
            return ({
                'En Gestión': { label: 'En Gestión', classes: [classes.estado, classes.estadoEnGestion].join(' ') },
                'Derivado': { label: 'Derivado', classes: [classes.estado, classes.estadoDerivado].join(' ') },
                'Cerrado': { label: 'Cerrado', classes: [classes.estado, classes.estadoCerrado].join(' ') },
                'Rechazado': { label: 'Rechazado', classes: [classes.estado, classes.estadoRechazado].join(' ') },
                "Cerrado No Resuelta": { label: 'Cerrado No Resuelta', classes: [classes.estadoNoResuelto, classes.estadoCerrado].join(' ') }
            })[estadoId];
        }
    };

    const verSolicitudHandler = (solicitud) => {
        dispatch(seleccionarSG(solicitud))
        history.push(`${url}/ver-detalle`);
    }

    const editarSolicitudHandler = (solicitud) => {
        dispatch(seleccionarSG(solicitud))
        history.push(`${url}/editar`);
    }

    let test = (row) => {
        let arrayEstilos = []
        if (row && row.porVencer) {
            arrayEstilos.push("porVencer")
        }
        if (row && row.vencida) {
            arrayEstilos.push("vencida")
        }
        if (row && row.reAbierta) {
            arrayEstilos.push("reAbierta")
        }
        return arrayEstilos;
    }

    return (
        <>
            <Table className={classes.tabla}>
                <TableHead className={classes.tablaHead}>
                    <TableRow>
                        <TableCell style={{ maxWidth: 5, padding: 0 }}></TableCell>
                        <TableCell align='right'>
                            <TableSortLabel active direction={isAsc === null || isAsc === true ? 'asc' : 'desc'} onClick={() => orderBy('solicitud')} style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>
                                SOLICITUD
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>DENUNCIA</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>PACIENTE</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>ÁREA SOLICITANTE</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>SOLICITANTE</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>TIPO</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>ÁREA GESTIÓN</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>GESTOR</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>ESTADO</TableCell>
                        <TableCell align="left" style={{ fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }}>ACCIONES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.objetos && data.objetos.length > 0 &&
                        data.objetos.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell style={{ maxWidth: 5, padding: 0 }}>
                                    {
                                        test(row) && test(row).length > 0 && test(row).map((estado, _, { length }) => {
                                            const estilos = { height: `calc(4rem / ${length || 1})`, width: 5, backgroundColor: '' };
                                            switch (estado) {
                                                case "porVencer":
                                                    estilos.backgroundColor = '#f29423'
                                                    break;
                                                case "vencida":
                                                    estilos.backgroundColor = '#e34850'
                                                    break;
                                                case "reAbierta":
                                                    estilos.backgroundColor = '#3fb6dc'
                                                    break;
                                                default:
                                                    estilos.backgroundColor = ''
                                            }
                                            return <div key={estado} style={estilos}></div>;
                                        })
                                    }
                                </TableCell>
                                <TableCell align="right" component="th" scope="row" >
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <span>
                                            {
                                                row && row.masInfoResponder ? (<MasInfoResponderIcon />)
                                                    : row && row.masInfoSolicitada ? (<MasInfoSolicitadaIcon />)
                                                        : row && row.masInfoRespondida ? (<InfoRespondidaIcon />)
                                                            : null
                                            }

                                        </span>
                                        <b>{row.idSolicitud}</b>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">{row && row.denunciaNroAsignado ? row.denunciaNroAsignado : row.denunciaNroProvisorio}</TableCell>
                                <TableCell align="left">{row.denunciaAccidentadoApellido +  ' ' + row.denunciaAccidentadoNombre}</TableCell>
                                <TableCell align="left">{row && row.areaGestionOrigenDescripcion ? row.areaGestionOrigenDescripcion : null}</TableCell>
                                <TableCell align="left">{row && row.solicitanteNombre ? row.solicitanteNombre + " " + row.solicitanteApellido : null}</TableCell>
                                <TableCell align="left">{row.tipoSolicitudDescripcion}</TableCell>
                                <TableCell align="left" className={classes.areaGestion}>{row && row.areaGestion ? row.areaGestion : null}</TableCell>
                                <TableCell align="left">
                                    {row.gestorApellido ? (
                                        <Grid container justify="space-around" alignItems="center" wrap="nowrap" className={classes.gestor} spacing={1}>
                                            {row.gestorApellido && (
                                                <Grid item>
                                                    <AccountCircle style={{ width: '20px', height: '20px', color: 'grey' }} />
                                                </Grid>
                                            )}
                                            <Grid item zeroMinWidth>
                                                <Typography noWrap>{row.gestorApellido ? row.gestorNombre + " " + row.gestorApellido : "-"}</Typography>
                                            </Grid>
                                        </Grid>
                                    ) : null}
                                </TableCell>
                                <TableCell align="left">
                                    <Box component="span" className={row && row.estadoSolicitudDescripcion ? estado(row.estadoSolicitudDescripcion).classes : classes.estadoEnGestion}>
                                        {row && row.estadoSolicitudDescripcion ? estado(row.estadoSolicitudDescripcion).label : null}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        className={classes.acciones}
                                        onClick={() => { (row.estadoSolicitudDescripcion === "En Gestión" || row.estadoSolicitudDescripcion === "Derivado" || row.estadoSolicitudDescripcion === 'Cerrado' || row.estadoSolicitudDescripcion === 'Rechazado') && row.puedeEditarse === true ? editarSolicitudHandler(row) : verSolicitudHandler(row) }}>
                                        {(row.estadoSolicitudDescripcion === "En Gestión" || row.estadoSolicitudDescripcion === "Derivado" || row.estadoSolicitudDescripcion === 'Cerrado' || row.estadoSolicitudDescripcion === 'Rechazado') && row.puedeEditarse === true ? <EditIcon /> : <PreviewIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

            {data && data.objetos && data.objetos.length === 0 || data === null ?
                <Box className={classes.notFoundOnTable}>
                    <Box display="flex" justifyContent="center" p={3}>
                        <Typography>{mensajeNotFound}</Typography>
                    </Box>
                </Box>
                : null}

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                <Box display="flex">
                    <IconWithLabel label="Por vencer"><Dot color="#f29423" /></IconWithLabel>
                    <IconWithLabel label="Vencido"><Dot color="#e34850" /></IconWithLabel>
                    <IconWithLabel label="Reabierto"><Dot color="#3fb6dc" /></IconWithLabel>
                    <IconWithLabel label="+ info a responder"><InfoResponderIcon /></IconWithLabel>
                    <IconWithLabel label="+ info solicitada"><InfoSolicitadaIcon /></IconWithLabel>
                    <IconWithLabel label="+ info respondida"><InfoRespondidaIcon /></IconWithLabel>
                </Box>
                <TablePagination
                    className={classes.pagination}
                    labelRowsPerPage="Filas por página"
                    rowsPerPageOptions={opcionesPaginacion ?? OPCIONES_PAGINACION_5_10_15}
                    component="div"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    count={data && data.cantidadTotal ? data.cantidadTotal : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        </>
    )
};

TablaSolicitudesGenericas.propTypes = {
    data: PropTypes.array.isRequired
};

export default TablaSolicitudesGenericas;