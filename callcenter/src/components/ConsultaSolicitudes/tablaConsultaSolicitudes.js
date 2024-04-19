import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Dom:
import { useHistory } from 'react-router-dom'
//Utils:
import {  ERROR_SEARCH_BY_ID, ERROR_SEARCH_BY_ID_REDIRECCION, ERROR_SERVICIO_VERIFICAR } from '../../Utils/const'
import Utils from '../../Utils/utils'
//Mui:
import { makeStyles, Button, Grid, TableSortLabel, Typography, Tooltip } from '@material-ui/core'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined'
import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check'
//Componentes:
import Drawer2 from '../commons/CustomDrawer/Drawer'
import VerResumen from './ComponentesDrawer/verResumen'
import IconButtonMenu from '../commons/Menu/IconButtonMenu'
import CustomChip from '../commons/Chip/CustomChip'
import AdminSlide from '../commons/Slider/AdminSlide'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import CustomTypography from '../commons/Typography/CustomTypography'
import CustomButton from '../commons/Button/CustomButton'
import PasarSiniestroPendientes from "../EscritorioOperador/PasarSiniestroPendientes"
import CustomTableConsultaSolicitudes from '../commons/Table/CustomTableConsultaDenuncias'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '2px'
    },
    iconBntVerificado: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        width: "40px",
        height: "40px",
        marginLeft: '4px',
        backgroundColor: '#e9f9f0',
        border: '1px solid #2dc76d'
    },
}))

const tooltip = makeStyles({
    tooltip: {
        backgroundColor: '#ffffff',
        border: 'solid 1px #8e8e8e',
        color: '#6e6e6e'
    }
})

const TablaConsultaSolicitudes = (props) => {

    const classes = useStyles(props)

    const { esOperador, setActivarAlarmas, dataDenuncias, setActualizarData, setPage, page, setRowsPerPage, 
        rowsPerPage, usuarioActivo, setIdDenuncia, setOpenBuscador, setOrdenDenuncia, disableEdition, siniestrosHoy } = props

    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const classesTooltip = tooltip()
    const optionsOperador = ['Editar', 'Traslado', 'Ver Resumen', 'Consultas y Reclamos', 'Enviar a Siniestros con Pendientes']
    const optionAlarmas = ['Alarma Corto Punzante', 'Alarma Diagnóstico Médico', 'Alarma Seguimiento Médico']
    const optionsSupervisor = ['Editar', 'Traslado', 'Ver Resumen', 'Consultas y Reclamos', 'Enviar a Siniestros con Pendientes']
    const verificacion = ['Marcar como Verificado']
    const [verificado, setVerificado] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [menu, setMenu] = useState(null)
    const [enviarPendientes, setEnviarPendientes] = useState(false)
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false, })
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })
    const [valMultiline, setValMultiline] = useState(null)
    const contenido = [{ texto: <VerResumen datos={selectedRow} /> }]
    const maxSteps = contenido.length
    const [activeStep, setActiveStep] = useState(0)
    const [direccionOrdenDenuncia, setdireccionOrdenDenuncia] = useState('asc')
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    const onClickItem = (event, row, value) => {
        let idEstadoCem = row && row.idEstadoCem
        setMenu(event)
        if (event.target.value === 0) {
            if (row && row.idDenuncia) {
                dispatch(actions.searchDenunciaById(row.idDenuncia, idEstadoCem, callbackConsultasYRelamos, event.target.value))
            }
        }
        else if (event.target.value === 1) {
            let id = row && row.idDenuncia
            let estadoCem = row && row.idEstadoCem
            setIdDenuncia(id)
            if (id) {
                dispatch(actions.searchDenunciaById(id, estadoCem, callbackConsultasYRelamos, event.target.value))
            }
        }
        else if (event.target.value === 2) {
            setSelectedRow(row)
            setEnviarPendientes(false)
            setOpenDrawer({ ...openDrawer, 'right': true });
            setOpenBuscador(false)
        }
        else if (event.target.value === 3) {
            setSelectedRow(row)
            let id = row && row.idDenuncia
            let estadoCem = row && row.idEstadoCem
            setIdDenuncia(id)
            if (id) {
                dispatch(actions.searchDenunciaById(id, estadoCem, callbackConsultasYRelamos, event.target.value))
            }

        }
        else if (event.target.value === 4) {
            setSelectedRow(row)
            setEnviarPendientes(true)
            setOpenDrawer({ ...openDrawer, 'right': true });
            setOpenBuscador(false)
        }
    }

    const callbackConsultasYRelamos = (succes, codigo) => {
        if (succes) {
            if (codigo === 0) {
                history.push({
                    pathname: '/home/editar'
                })
            }
            if (codigo === 1) {
                history.push({
                    pathname: '/home/editar/traslados'
                })
            }
            if (codigo === 3) {
                history.push({
                    pathname: '/home/editar/consultasyReclamos'
                })
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    <div>{`${ERROR_SEARCH_BY_ID} 
                ${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                    <div>Por favor intente nuevamente.</div>
                </div>
            })
        }
    }

    const onClickVerificar = (event, rowSelected, value) => {
        let request = {
            idDenuncia: rowSelected.idDenuncia,
            idPersona: usuarioActivo.id,
            idRol: 1
        }
        dispatch(actions.marcarVerificado(request, callBack, rowSelected))
    }

    const callBack = (rowSelected, succes) => {
        if (succes) {
            const dataUpdate = [...data];
            const index = rowSelected.tableData.id;
            dataUpdate[index] = { ...rowSelected, verificado: !verificado };
            setData([...dataUpdate]);
            setActualizarData(data => !data)
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: ERROR_SERVICIO_VERIFICAR
            })
        }
    }

    const onClickAlarmas = (event, row) => {
        let idCodigo = row && row.alarmas[event.target.value].codigo;
        let idEstadoCem = row && row.idEstadoCem
        if (row && row.idDenuncia) {
            dispatch(actions.searchDenunciaById(row.idDenuncia, idEstadoCem, callbackAlarmas, idCodigo))
        }
    }

    const callbackAlarmas = (succes, codigo) => {
        if (succes) {
            if (codigo === 1) {
                setActivarAlarmas((alarmas) => ({ ...alarmas, ['cortoPunzante']: true }))
                history.push('/home/editar/generales');
            }
            if (codigo === 2) {
                setActivarAlarmas((alarmas) => ({ ...alarmas, ['diagnosticoMedico']: true }))
                history.push('/home/editar/generales');
            }
            if (codigo === 3) {
                setActivarAlarmas((alarmas) => ({ ...alarmas, ['seguimientoMedico']: true }))
                history.push('/home/editar/traslados');
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    <div>{`${ERROR_SEARCH_BY_ID} 
                ${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                    <div>Por favor intente nuevamente.</div>
                </div>
            })
        }
    }

    const contieneAlarmasSinPendientes = (alarmas) => {
        let sinPendiente = false
        if (alarmas && alarmas.length > 0) {
            alarmas.map((item) => {
                if (!item.pendiente) {
                    sinPendiente = true;
                }
            })
        }

        return sinPendiente;

    }

    const setRowBorderLeft = (row) => {
        let color = ''
        let idEstadoMedico = row.estadoMedicoIdEstadoMedico
        let esRechazado = row.rechazadoPorArt

        if (idEstadoMedico === 1) color = 'green' //ILT
        else if (idEstadoMedico === 2) color = 'blue' //ILP
        else if (idEstadoMedico === 9 && esRechazado) color = 'orange' //FIN ILT + RECHAZO ART
        else color = 'red'

        return color
    }

    //Manejo del sentido de la flecha de orden de denuncia y de la variable para la request en el headerFiltro.
    const onClickOrdenDenuncias = () => {
        setOrdenDenuncia(ordenDenuncia => !ordenDenuncia)
        setdireccionOrdenDenuncia(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'))
    }

    const onClickNroDenuncia = (event, row) => {
        const estadoCem = row ? row.idEstadoCem : null;
        if (row && row.idDenuncia) {
            dispatch(actions.searchDenunciaById(row.idDenuncia, estadoCem, callBackSearch))
        }
    }

    const headerOperador = [
        {
            title: siniestrosHoy ? //Solo si es pantalla de siniestros de hoy se orden por Denuncia.
                <TableSortLabel active direction={direccionOrdenDenuncia} onClick={onClickOrdenDenuncias}>
                    DENUNCIA
                </TableSortLabel>
                :
                "DENUNCIA",
            field: "denuncia",
            sorting: false,
            headerStyle: { fontSize: '11px', color: '#757474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { padding: '0 8px' },
            render: row =>
            (<div>
                <Button onClick={(event) => onClickNroDenuncia(event, row)}>
                    <Typography style={{ color: setRowBorderLeft(row), fontSize: '12px', textDecoration: 'underline' }}>
                        {row.denuncia ? row.denuncia : ''}
                    </Typography>
                </Button>
            </div>)
        },
        {
            title: "ACCIDENTADO", field: "paciente",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "DNI", field: 'nroDoc', width: '10%',
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 14 },
            cellStyle: { fontSize: '12px', paddingRight: 14 },
        },
        {
            title: "EMPLEADOR", field: "empleador",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "TRAMITADOR", field: "tramitador",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "FECHA OCURRENCIA", width: '10%',
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
            render: row => row?.fechaOcurrencia ? `${row.fechaOcurrencia.slice(0, -5)} ${row.horaOcurrencia}` : ''

        },
        {
            title: "CENTRO PRIMERA ASISTENCIA", field: "centroDerivacion",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "OPERADOR CEM", field: "operadorCem",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "ESTADO CEM", field: "estadoCem",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { fontSize: '12px', paddingRight: 8 },
        },
        {
            title: "ACCIONES", field: "acciones",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: { boxSizing: 'inherit', fontSize: '12px' },
            render: row =>
                <div row={selectedRow} style={{ display: 'flex' }}>
                    {row.alarmas && row.alarmas.length > 0 ?
                        <IconButtonMenu
                            disabled={row && row.estadoCem
                                && row.estadoCem.props && row.estadoCem.props.label === 'Borrador'
                                ? true
                                : false
                            }
                            icon={<AccessAlarmIcon
                                style={row && row.estadoCem
                                    && row.estadoCem.props && row.estadoCem.props.label === 'Borrador'
                                    ? { color: '#d3d3d3' } : { color: '#747474' }} />}
                            className={classes.iconBnt}
                            size="small"
                            options={renderAlarmas(row)}
                            onClickItem={(event) => onClickAlarmas(event, row)} >
                        </IconButtonMenu>
                        : null}
                    {!esOperador ?
                        (!row.verificado ?
                            <IconButtonMenu
                                disabled={row && row.estadoCem
                                    && row.estadoCem.props && row.estadoCem.props.label !== 'Completo'
                                    ? true : false
                                }
                                icon={<CheckIcon
                                    style={row && row.estadoCem
                                        && row.estadoCem.props && row.estadoCem.props.label !== 'Completo'
                                        ? { color: '#d3d3d3' }
                                        : { color: '#747474' }}
                                />}
                                className={classes.iconBnt}
                                size="small"
                                options={verificacion}
                                onClickItem={(event) => onClickVerificar(event, row)}>
                            </IconButtonMenu>
                            :
                            <Tooltip
                                arrow
                                placement="top"
                                classes={classesTooltip}
                                title={<Fragment>
                                    <Grid container justify='center' alignItems='center'>
                                        <Grid item >
                                            <CustomTypography
                                                style={{ fontSize: '14px', marginLeft: '5px', marginBottom: '3px' }}
                                                text={row ? row.supervisorVerificado : ''}
                                            />
                                        </Grid>
                                    </Grid>
                                </Fragment>}>
                                <IconButton className={classes.iconBntVerificado} size="small">
                                    <CheckIcon style={{ color: '#2dc76d' }} />
                                </IconButton>
                            </Tooltip>

                        )
                        : null}
                    <div>
                        <IconButtonMenu
                            icon={<MoreVertOutlinedIcon style={{ color: '#747474' }} />}
                            className={classes.iconBnt}
                            size="small"
                            options={esOperador ? optionsOperador : optionsSupervisor}
                            disabledMenu={row && row.estadoCem
                                && row.estadoCem.props && row.estadoCem.props.label === 'Borrador'
                                ? true : false
                            }
                            // disableSiniestroConPendientes={row.alarmas && row.alarmas.length > 0
                            //     && contieneAlarmasSinPendientes(row && row.alarmas)
                            //     ? false : true
                            // }
                            disableSiniestroConPendientes={
                                disableEdition
                                    ? disableEdition
                                    : row.alarmas && row.alarmas.length > 0 && contieneAlarmasSinPendientes(row && row.alarmas)
                                        ? false
                                        : true
                            }
                            disableEditar={
                                disableEdition ?
                                    disableEdition : esOperador && row.denuncia && row.estadoMedicoIdEstadoMedico === 9
                                        ? true : false
                            }
                            onClickItem={(event) => onClickItem(event, row)}
                        />
                    </div>
                </div>
        }
    ]

    const renderAlarmas = (row) => {
        let alarmas = [];
        if (row && row.alarmas) {
            row.alarmas.forEach(i => {
                alarmas.push(i.descripcion)
            });
        }
        return alarmas;
    }

    //Falta localidad y Provincia
    const direccion = (data) => {
        return `${data.calle ? data.calle : ''} ${data.numero ? data.numero : ''}
                ${data.piso ? data.piso : ''} [CP ${data.codigoPostalCodigo ? data.codigoPostalCodigo : ''}].
               ${data.localidadNombre ? data.localidadNombre : ''}, ${data.localidadProvinciaNombre ? data.localidadProvinciaNombre : ''}`
    }

    const contacto = (data) => {
        return `${data.codigoPaisCelular ? data.codigoPaisCelular : ''} ${data.codigoAreaCelular ? data.codigoAreaCelular : ''}
                ${data.numeroCelular ? data.numeroCelular : ''} - ${data.telefono ? data.telefono : ''}/
                ${data.telefonoSecundario ? data.telefonoSecundario : ''}`
    }

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (dataDenuncias && dataDenuncias.cantidadTotal && dataDenuncias.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi
        if (esOperador) {
            dataApi = dataDenuncias && dataDenuncias.objetos ? dataDenuncias.objetos.map(newData => {
                return ({
                    denuncia: newData ? Utils.nroAsignadoProvisorio(newData) : '',
                    colorEstadoMedico: newData ? newData.colorEstadoMedico : null, // Falta agregar
                    estadoMedicoIdEstadoMedico: newData ? newData.estadoMedicoIdEstadoMedico : null,
                    paciente: newData.accidentado && `${Utils.stringNull(newData.accidentado.apellido)} ${Utils.stringNull(newData.accidentado.nombre)} `,
                    dni: newData.accidentado && newData.accidentado.nroDoc,
                    empleador: newData.accidentado && newData.empleadorRazonSocial,
                    tramitador: newData.accidentado && newData.tramitadorNombreCompleto,
                    fechaOcurrencia: Utils.dateFormat5(newData && newData.fechaOcurrencia),
                    horaOcurrencia: newData && newData.horaOcurrencia,
                    centroDerivacion: newData && newData.centroPrimerAsistencia && newData.centroPrimerAsistencia.razonSocial,
                    operadorCem: newData && newData.operadorNombreCompleto,
                    nroDoc: newData && newData.accidentado && newData.accidentado.nroDoc,
                    estadoCem: <CustomChip
                        fontSize={true}
                        label={newData.estadoCEM === 0 ? 'Incompleto' : newData.estadoCEM === 1 ? 'Completo' : 'Borrador'}
                        colorLabel={newData.estadoCEM === 0 ? 'Incompleto' : newData.estadoCEM === 1 ? 'Completo' : 'Borrador'}
                    />,
                    direccion: newData && newData.accidentado && direccion(newData.accidentado),
                    telefono: newData && newData.accidentado && contacto(newData.accidentado),
                    estadoMedico: newData && newData.estadoMedicoDescripcion,
                    tipoSiniestro: newData && newData.tipoSiniestroDescripcion,
                    diagnosticoCie10: newData && newData.diagnosticoCie10Descripcion,
                    diagnosticoDeCerteza: newData && newData.diagnosticoDeCerteza,
                    idDenuncia: newData && newData.idDenuncia,
                    idEstadoCem: newData && newData.estadoCEM,
                    alarmas: newData && newData.alarmas,
                    rechazadoPorArt: newData && newData.rechazadoPorArt,
                })
            }
            ) : []
        } else {
            dataApi = dataDenuncias && dataDenuncias.objetos ? dataDenuncias.objetos.map(newData => {
                return ({
                    denuncia: newData ? Utils.nroAsignadoProvisorio(newData) : '',
                    colorEstadoMedico: newData ? newData.colorEstadoMedico : null, // Falta agregar
                    estadoMedicoIdEstadoMedico: newData ? newData.estadoMedicoIdEstadoMedico : null,
                    verificado: newData && newData.esVerificadoSupervisor,
                    paciente: newData.accidentado && `${Utils.stringNull(newData.accidentado.apellido)} ${Utils.stringNull(newData.accidentado.nombre)}`,
                    dni: newData.accidentado && newData.accidentado.nroDoc,
                    empleador: newData.accidentado && newData.empleadorRazonSocial,
                    tramitador: newData.accidentado && newData.tramitadorNombreCompleto,
                    fechaOcurrencia: Utils.dateFormat5(newData && newData.fechaOcurrencia),
                    horaOcurrencia: newData && newData.horaOcurrencia,
                    centroDerivacion: newData && newData.centroPrimerAsistencia && newData.centroPrimerAsistencia.razonSocial,
                    operadorCem: newData && newData.operadorNombreCompleto,
                    nroDoc: newData && newData.accidentado && newData.accidentado.nroDoc,
                    estadoCem: <CustomChip
                        fontSize={true}
                        label={newData.estadoCEM === 0 ? 'Incompleto' : newData.estadoCEM === 1 ? 'Completo' : 'Borrador'}
                        colorLabel={newData.estadoCEM === 0 ? 'Incompleto' : newData.estadoCEM === 1 ? 'Completo' : 'Borrador'}
                    />,
                    direccion: newData && newData.accidentado && direccion(newData.accidentado),
                    telefono: newData && newData.accidentado && contacto(newData.accidentado),
                    estadoMedico: newData && newData.estadoMedicoDescripcion,
                    tipoSiniestro: newData && newData.tipoSiniestroDescripcion,
                    diagnosticoCie10: newData && newData.diagnosticoCie10Descripcion,
                    diagnosticoDeCerteza: newData && newData.diagnosticoDeCerteza,
                    idDenuncia: newData && newData.idDenuncia,
                    supervisorVerificado: newData && newData.supervisorCEMNombre && newData.supervisorCEMApellido ? newData.supervisorCEMApellido + ' ' + newData.supervisorCEMNombre : '',
                    idEstadoCem: newData && newData.estadoCEM,
                    alarmas: newData && newData.alarmas,
                    rechazadoPorArt: newData && newData.rechazadoPorArt,
                })
            }
            ) : []
        }
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (dataDenuncias && dataDenuncias.cantidadTotal && lengthData < dataDenuncias.cantidadTotal) {
            for (let index = lengthData; index < dataDenuncias.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])
    }, [esOperador, dataDenuncias])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(true)
    }

    const handleVerDenuncia = () => {
        const estadoCem = selectedRow ? selectedRow.idEstadoCem : null;
        if (selectedRow && selectedRow.idDenuncia) {
            dispatch(actions.searchDenunciaById(selectedRow.idDenuncia, estadoCem, callBackSearch))
        }
    }

    const callBackSearch = (success) => {
        if (success) {
            history.push('/home/editar')
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: (
                    <div>
                        <div>{`${ERROR_SEARCH_BY_ID} ${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                        <div>Por favor intente nuevamente.</div>
                    </div>
                )
            })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    const onClickCancelar = () => {
        setOpenSnackBar({ open: false });
    }

    const contenido2 = [
        {
            texto: <PasarSiniestroPendientes
                alarmas={selectedRow && selectedRow.alarmas ? selectedRow.alarmas : null}
                onClickCancelar={onClickCancelar}
                setValMultiline={setValMultiline}
            />
        }
    ]

    const enviarAPendientes = () => {
        let alarmasSinPendientes = [];
        selectedRow.alarmas.map((item) => {
            if (!item.pendiente) {
                alarmasSinPendientes.push({ codigo: item.codigo })
            }
        })
        let request = {
            idDenuncia: selectedRow.idDenuncia,
            idOperador: usuarioActivo && usuarioActivo.id,
            mensaje: valMultiline,
            alarmas: alarmasSinPendientes
        }
        dispatch(actions.enviarPendientes(request, succesPendientes))
        setActualizarData(data => !data)
    }

    const succesPendientes = (mensaje, success) => {
        setOpenSnackBar({
            open: true,
            severity: success,
            title: mensaje
        })
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    const buttons = () => {
        return (<Fragment>
            <Grid item>
                <CustomButton
                    styleLabel={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff' }}
                    styleButton={{ backgroundColor: '#1473e6' }}
                    startIcon={false}
                    width={'90px'}
                    height={'40px'}
                    label={"Enviar"}
                    variant={"contained"}
                    isAction={true}
                    onClik={enviarAPendientes}
                />
            </Grid> </Fragment>)
    }

    return (
        <div>
            <Grid container alignItems='center' justify='center' spacing={2} >
                <Grid item xs={12}>
                    <CustomTableConsultaSolicitudes
                        data={data}
                        cantTotal={dataDenuncias && dataDenuncias.cantidadTotal ? dataDenuncias.cantidadTotal : null}
                        columnas={headerOperador}
                        setRowBorderLeft={setRowBorderLeft}
                        referencias={[
                            { text: 'ILT', color: 'green' },
                            { text: 'ILP', color: 'blue' },
                            { text: 'FIN ILT', color: 'red' },
                            { text: 'RECHAZO', color: 'orange' },
                        ]}
                        page={page} setPage={setPage}
                        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                        opcionesPaginacion={opcionesPaginacion}
                    />
                </Grid>
            </Grid>
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                label={'Ver denuncia completa'}
                variant={'contained'}
                button={false}
                handleButton={handleVerDenuncia}
                title={`Denuncia  ${selectedRow && selectedRow.denuncia ? selectedRow.denuncia : ''}`}
            >
                <AdminSlide
                    contenido={enviarPendientes ? contenido2 : contenido}
                    labelButtonSiguiente={enviarPendientes ? null : 'Ver denuncia completa'}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    handleNext={handleVerDenuncia}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                    buttons={enviarPendientes ? buttons() : null} />

            </Drawer2>

            {openSnackBar.open ? <CustomSnackBar handleClose={handleClose} open={openSnackBar.open} title={openSnackBar.title}
                severity={openSnackBar.severity} /> : null}
        </div>
    )
}
TablaConsultaSolicitudes.propTypes = {
    open2: PropTypes.any,
    esOperador: PropTypes.any,
    usuarioActivo: PropTypes.object

};
export default TablaConsultaSolicitudes