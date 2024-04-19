import { Avatar, Box, Button, Grid, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loader from "../../commons/Loading/Loader";
import PNGavatar from '../../../commons/assets/avatar.png';
import { ReactComponent as EditIcon } from '../../../commons/assets/DenunciaCompleta/editIcon.svg';
import { ReactComponent as PreviewIcon } from '../../../commons/assets/DenunciaCompleta/previewIcon.svg';
import { ReactComponent as InfoResponderIcon } from '../../../commons/assets/DenunciaCompleta/infoResponderIcon.svg';
import { ReactComponent as InfoSolicitadaIcon } from '../../../commons/assets/DenunciaCompleta/infoSolicitadaIcon.svg';
import { ReactComponent as InfoRespondidaIcon } from '../../../commons/assets/DenunciaCompleta/infoRespondidaIcon.svg';
import { ReactComponent as InfoResponderTablaIcon } from '../../../commons/assets/DenunciaCompleta/infoResponderTablaIcon.svg';
import { ReactComponent as InfoSolicitadaTablaIcon } from '../../../commons/assets/DenunciaCompleta/infoSolicitadaTablaIcon.svg';
import { ReactComponent as InfoRespondidaTablaIcon } from '../../../commons/assets/DenunciaCompleta/infoRespondidaTablaIcon.svg';
import { ReactComponent as MasInfoResponderIcon } from '../../../commons/assets/IconsSolicitudesGenericas/masInfoResponderIcon.svg';
import { ReactComponent as MasInfoSolicitadaIcon } from '../../../commons/assets/IconsSolicitudesGenericas/masInfoSolicitadaIcon.svg';
import { useHistory } from "react-router-dom";
import { AccountCircle } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearDatosSolicitud, clearSGSeleccionada, seleccionarSG } from "../../../redux/actions/solicitudesGenericas";
import { OPCIONES_PAGINACION_5_10_15 } from "../../../Utils/const";

const useStyles = makeStyles(theme => ({
    tabla: {
        '& .MuiTableCell-root': {
            width: 80,
            padding: '6px 16px 6px 10px',
            fontFamily: 'inherit',
            fontSize: 12,
            '& p': {
                fontSize: 12
            }
        },
        '& .MuiTableCell-head': {
            color: '#747474',
            verticalAlign: 'baseline',
        },
        '& thead th:last-of-type': {
            paddingRight: 0,
            paddingLeft: 0
        },
        '& tbody td:last-of-type': {
            paddingRight: 0,
            paddingLeft: 0
        }
    },
    areaGestion: (props) => {
        if (props.openMenuSiniestros) return {
            maxWidth: 68,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }
        return null;
    },
    gestor: {
        width: 'fit-content',
        maxWidth: 160,
        padding: 5,
        height: 30,
        borderRadius: 5,
        border: '1px solid #8e8e8e',
        backgroundColor: '#fafafa'
    },
    gestorIcon: {
        width: 20,
        height: 20
    },
    estado: {
        width: 96,
        height: 30,
        borderRadius: 5,
        border: '1px solid',
        display: 'block',
        textAlign: 'center',
        padding: 5,
        boxSizing: 'border-box'
    },
    estadoNoResuelto: {
        width: 96,
        height: 50,
        borderRadius: 5,
        border: '1px solid',
        display: 'block',
        textAlign: 'center',
        padding: 5,
        boxSizing: 'border-box'
    },
    estadoEnGestion: {
        color: '#2f61d5',
        borderColor: '#2f61d5',
        backgroundColor: 'rgba(47, 97, 213, 0.1)'
    },
    estadoDerivado: {
        color: '#f29423',
        borderColor: '#f29423',
        backgroundColor: 'rgba(255, 205, 113, 0.27)'
    },
    estadoCerrado: {
        color: '#2dc76d',
        borderColor: '#2dc76d',
        backgroundColor: 'rgba(45, 199, 109, 0.27)'
    },
    estadoRechazado: {
        color: '#ff7052',
        borderColor: '#ff7052',
        backgroundColor: 'rgba(255, 112, 82, 0.27)'
    },
    acciones: {
        borderRadius: 5,
        border: '1px solid  #d3d3d3',
        padding: 7
    },
    pagination: {
        '& .MuiTablePagination-actions': {
            marginLeft: 0
        },
        '& .MuiToolbar-gutters': {
            paddingLeft: 0
        },
        '& .MuiTablePagination-selectRoot': {
            margin: 0
        }
    }
}))

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
    const { data, setIdSolicitud, page, setPage, setRowsPerPage, rowsPerPage, isAsc, setIsAsc, opcionesPaginacion } = props;
    const classes = useStyles(props);
    const history = useHistory();
    const [rows, setRows] = useState(data && data.objetos ? data.objetos : []);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearSGSeleccionada())
    }, [])

    useEffect(() => setRows(data && data.objetos ? data.objetos : []), [data])

    const sortTableHandler = () => {
        setIsAsc(isAsc === null ? false : isAsc === false ? true : false)
    };

    const handleChangeRowsPerPage = (event) => {
        console.log('rowsperpage', event.target.value, parseInt(event.target.value, 10))
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const estado = (estadoId) => {
        return ({
            'En Gestión': { label: 'En gestión', classes: [classes.estado, classes.estadoEnGestion].join(' ') },
            'Derivado': { label: 'Derivado', classes: [classes.estado, classes.estadoDerivado].join(' ') },
            'Cerrado': { label: 'Cerrado', classes: [classes.estado, classes.estadoCerrado].join(' ') },
            'Rechazado': { label: 'Rechazado', classes: [classes.estado, classes.estadoRechazado].join(' ') },
            "Cerrado No Resuelta": { label: 'Cerrado No Resuelta', classes: [classes.estadoNoResuelto, classes.estadoCerrado].join(' ') }
        })[estadoId];
    };

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

    const verSolicitudHandler = (solicitud) => {
        history.push("/home/editar/solicitudesGenericas/ver");
        dispatch(seleccionarSG(solicitud))
    }

    const editarSolicitudHandler = (solicitud) => {
        history.push("/home/editar/solicitudesGenericas/editar");
        dispatch(seleccionarSG(solicitud))
    }

    return (
        <>
            {rows && rows.length > 0 ? (
                <>
                    <Table className={classes.tabla}>
                        <TableHead className={classes.tablaHead}>
                            <TableRow>
                                <TableCell style={{ maxWidth: 5, padding: 0 }}></TableCell>
                                <TableCell align='right'>
                                    <TableSortLabel
                                        active
                                        direction={isAsc ? 'asc' : 'desc'}
                                        onClick={() => sortTableHandler()}>
                                        SOLICITUD
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="left" >PACIENTE</TableCell>
                                <TableCell align="left">ÁREA SOLICITANTE</TableCell>
                                <TableCell align="left">SOLICITANTE</TableCell>
                                <TableCell align="left">TIPO</TableCell>
                                <TableCell align="left">ÁREA GESTIÓN</TableCell>
                                <TableCell align="left">GESTOR</TableCell>
                                <TableCell align="left">ESTADO</TableCell>
                                <TableCell align="left">ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
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
                                                            : null
                                                }

                                            </span>
                                            <b>{row.idSolicitud}</b>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{row.denunciaAccidentadoApellido +  ' ' + row.denunciaAccidentadoNombre}</TableCell>
                                    <TableCell align="left">{row.areaGestionOrigenDescripcion}</TableCell>
                                    <TableCell align="left">{row && row.solicitanteNombre ? row.solicitanteNombre + ' ' + row.solicitanteApellido : null}</TableCell>
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
                                        <Box component="span" className={estado(row.estadoSolicitudDescripcion).classes}>
                                            {estado(row.estadoSolicitudDescripcion).label}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            className={classes.acciones}
                                            onClick={() => {
                                                if ((row.estadoSolicitudDescripcion === "En Gestión" || row.estadoSolicitudDescripcion === "Derivado" || row.estadoSolicitudDescripcion === 'Cerrado' || row.estadoSolicitudDescripcion === 'Rechazado') && row.puedeEditarse === true) {
                                                    editarSolicitudHandler(row)
                                                } else {
                                                    verSolicitudHandler(row)

                                                }
                                            }
                                            }
                                        >
                                            {(row.estadoSolicitudDescripcion === "En Gestión" || row.estadoSolicitudDescripcion === "Derivado" || row.estadoSolicitudDescripcion === 'Cerrado' || row.estadoSolicitudDescripcion === 'Rechazado') && row.puedeEditarse === true ? <EditIcon /> : <PreviewIcon />}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                            count={data.cantidadTotal}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage} />
                    </Box>
                </>
            ) : (
                <Box className={classes.notFoundOnTable}>
                    <Box display="flex" justifyContent="center" p={3}>
                        <Typography>{`No se encontraron SG ${'Vencidas'} en "${'Mis pedidas enviadas'}"`}</Typography>
                    </Box>
                </Box>
            )}

        </>
    );
};

TablaSolicitudesGenericas.propTypes = {
    data: PropTypes.array.isRequired,
    openMenuSiniestros: PropTypes.bool.isRequired
};

export default TablaSolicitudesGenericas;