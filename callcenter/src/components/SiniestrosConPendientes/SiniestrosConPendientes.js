import React, { useEffect, useState, Fragment } from 'react'
import { useHistory } from 'react-router'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Utils:
import Utils from '../../Utils/utils'
import { COMPONENT_CONSULTA_SINIESTROS_PENDIENTES, ERROR_SEARCH_BY_ID, 
    ERROR_SEARCH_BY_ID_REDIRECCION, SNACK_SEVERITY } from '../../Utils/const'
//Material-UI:
import { Avatar, Button, Grid, makeStyles, Paper, Typography, Tooltip } from '@material-ui/core'
import { Clear, AccessAlarm, ErrorOutlined} from '@material-ui/icons'
//Componentes:
import CustomChip from '../commons/Chip/CustomChip'
import HeaderFiltros from '../commons/Header/HeaderFiltros'
import CustomTypography from '../commons/Typography/CustomTypography'
import IconButtonMenu from '../commons/Menu/IconButtonMenu'
import CustomLoading from '../commons/Loading/CustomLoading'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
//Iconos:
import PNGGestor from '../../commons/assets/IconsSolicitudesGenericas/Gestor.png'
import SVGAsignar from '../../commons/assets/IconsSolicitudesGenericas/Asignar.svg'
import CustomTableConsultaSolicitudes from '../commons/Table/CustomTableConsultaDenuncias'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '5px',
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent",
            border: '1px solid #2f61d5',
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
}))

const tooltip = makeStyles({
    tooltip: {
        backgroundColor: ' #2F61D5',
    },
    arrow: {
        color: '#2F61D5'
    }
})

const SiniestrosConPendientes = (props) => {
    const { setMiniMenu, setNavegacion, setTituloHeader, setActivarAlarmas, usuarioActivo } = props
    const classes = useStyles(props)
    const history = useHistory()
    const classesTooltip = tooltip()
    const dispatch = useDispatch()  
    const siniestros = useSelector(state => state.siniestrosPendientes.siniestros ? state.siniestrosPendientes.siniestros : [])
    const loading = useSelector(state => state.siniestrosPendientes.loading)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)
    const esOperador = usuarioActivo && usuarioActivo.isOperador
    const [actualizarData, setActualizarData] = useState(false)
    const [data, setData] = useState(null)
    const estadosCEM = [{codigo:0, descripcion:'Incompleto'}, {codigo:1, descripcion:'Completo'}]
    const [openSnackBar, setOpenSnackBar] = useState({open:false, title:'', severity:''})

    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setData(siniestros)
        setTituloHeader('Siniestros con Pendientes');
    }, [])

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (siniestros && siniestros.cantidadTotal && siniestros.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = siniestros && siniestros.objetos ? siniestros.objetos : []
        const dataRestante = [];

        const lengthData = dataRellenar.length + dataApi.length
        if (siniestros && siniestros.cantidadTotal && lengthData < siniestros.cantidadTotal) {
            for (let index = lengthData; index < siniestros.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])
    }, [siniestros])

    const onClickAlarmas = (event, row) => {
        let idCodigo = row && row.alarmas[event.target.value].codigo;
        let idEstadoCem = row && row.denunciaEstadoCEM
        let idDenuncia = row && row.idDenuncia
        dispatch(actions.searchDenunciaById(idDenuncia, idEstadoCem, callbackAlarmas, idCodigo))
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
        }else{
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                <div>{`${ERROR_SEARCH_BY_ID} 
                ${ ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                <div>Por favor intente nuevamente.</div>
            </div>
            })
        }
    }
   
    const handleVerDenuncia = (event, row) => {
        let idEstadoCem = row && row.denunciaEstadoCEM
        dispatch(actions.searchDenunciaById(row.idDenuncia, idEstadoCem, callBackSearch))
    }

    const callBackSearch = (success) => {
        if(success){
            history.push('/home/editar')
        }
       else{
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'No se pudo redirigir a la denuncia. Por favor intente nuevamente.'
            }) 
        }
    }

    const renderAlarmas = (row) => {
        let alarmas = [];
        if (row && row.alarmas) {
            row.alarmas.forEach(i => {
                alarmas.push(i.descripcion)
            });
        }
        return alarmas;
    }

    const handleDeleteGestor = (rowSelected) => {
        let solicitud = data[rowSelected.tableData.id];
        const request = {
            idPendiente: solicitud.idPendiente
        }
        dispatch(actions.desasignarSiniestroPendiente(request, successAsignacion))
    }

    const onClickAsignarGestor = (rowSelected) => {
        let solicitud = data[rowSelected.tableData.id];
        const request = {
            idPendiente: solicitud.idPendiente,
            idOperador: usuarioActivo && usuarioActivo.id,
        }
        dispatch(actions.asignarSiniestroPendiente(request, successAsignacion))
    }

    const successAsignacion = (status, mensaje, asignar) => {
        setOpenSnackBar({
            open: true,
            severity: status,
            title: mensaje
        })
        if (status === SNACK_SEVERITY.SUCCESS) {
            setActualizarData(!actualizarData)
        }
    }

    const setRowBorderLeft = (row) => {
        let color = ''
        let idEstadoMedico = row.idEstadoMedico
        let esRechazado = row.rechazadoPorArt

        if(idEstadoMedico === 1) color = 'green' //ILT
        else if(idEstadoMedico === 2) color = 'blue' //ILP
        else if(idEstadoMedico === 9 && esRechazado) color = 'orange' //FIN ILT + RECHAZO ART
        else color = 'red'

        return color 
    }

    const header = [
        {
            title: "DENUNCIA", field: "denuncia",
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
            cellStyle: {padding:'0 8px'},
            render: row => 
                <div>
                    <Button onClick={(event)=>handleVerDenuncia(event, row)}>
                        <Typography style={{color:setRowBorderLeft(row),fontSize:'12px',textDecoration:'underline'}}>
                            {row ? Utils.nroAsignadoProvisorio4(row) : ''}
                        </Typography>
                    </Button>
                </div>
        },
        {
            title: "PACIENTE", field: "denunciaAccidentadoNombreCompleto",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
        },

        {
            title: "MENSAJE", field: "mensaje",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
        },

        {
            title: "FECHA PENDIENTE", field: "fechaCreacion",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
            render: row => (row ? Utils.dateFormat5(row.fechaCreacion) : '')
        },
        {
            title: "OPERADOR CEM", field: "operadorAltaNombreCompleto",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
        },
        {
            title: "ESTADO CEM", field: "estadoCem",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
            render: row => 
                <CustomChip
                    fontSize={true}
                    label={`${Utils.getLabelCodEstadoCem(row.denunciaEstadoCEM)}`}
                    colorLabel={`${Utils.getLabelCodEstadoCem(row.denunciaEstadoCEM)}`}
                />
        },
        {
            title: "ALERTAS", field: "alertas",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
            render: row => (
                row.alarmas ?
                    <IconButtonMenu
                        icon={<AccessAlarm style={{ color: '#747474' }} />}
                        className={classes.iconBnt}
                        size="small"
                        options={renderAlarmas(row)}
                        onClickItem={(event) => onClickAlarmas(event, row)} >
                    </IconButtonMenu>
                    : null
            )
        },
        {
            title: "SEGUIMIENTO", field: "seguimiento",
            cellStyle: {fontSize:'12px',paddingRight:8},
            headerStyle: {fontSize:'11px', color:'#757474',fontWeight:700,paddingRight:8},
            render: row => {
                return (
                    <CustomChip
                        fontSize={true}
                        label={row.operadorSeguimientoID !== null ?
                            row.operadorSeguimientoNombreCompleto
                            : 'Asignarme'}
                        colorLabel={'#6e6e6e'}
                        style={{ backgroundColor: '#fafafa' }}
                        color={'#8e8e8e'}
                        avatar={<Avatar style={{ width: '17px', height: '17px' }}
                            src={row.operadorSeguimientoID !== null ? PNGGestor : SVGAsignar}
                        />
                        }
                        icon={<Tooltip arrow
                            classes={classesTooltip}
                            placement="top"
                            title={<Fragment>
                                <Grid container justify='center' alignItems='center'>
                                    <Grid item >
                                        <ErrorOutlined
                                            style={{ width: '17px', height: '17px', backgroundColor: '#2F61D5', }}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <CustomTypography
                                            style={{ fontSize: '14px', marginLeft: '5px', marginBottom: '3px' }}
                                            text={'Libera'}
                                        />
                                    </Grid>
                                </Grid>
                            </Fragment>
                            }>
                            <Clear />
                        </Tooltip>
                        }
                        handleDelete={row.operadorSeguimientoID !== null
                            && ( !esOperador || Utils.habilitarAsignacion(row.operadorSeguimientoID, parseInt(usuarioActivo.id)))
                            ? () => handleDeleteGestor(row) : null}
                        onClick={row && row.operadorSeguimientoID === null ? () => onClickAsignarGestor(row) : null}
                    />
                )
            }
        },
    ]

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    return (
        <div className={classes.root}>
            <CustomLoading loading={loading} />
            <Grid container alignItems='center' justify='center' spacing={1} >
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <HeaderFiltros showBuscador={true}
                            showSiestrosCheck={false} estadosCEM={estadosCEM} showEstadoCEM={true} showOperadores={true}
                            showAsignarSolicitudes={false} align={'center'}
                            tituloCheck1='' tituloCheck2={''} solicitudesGenericas={false} siniestrosHoy={false}
                            component={COMPONENT_CONSULTA_SINIESTROS_PENDIENTES} page={page} rowsPerPage={rowsPerPage} 
                            setPage={setPage} setActualizarData={setActualizarData} actualizarData={actualizarData}
                            fechaConsulta={false}
                            //Tipo de Fecha
                            esFechaCarga={true} 
                            esFechaOcurrencia={false} 
                            esFechaContacto={false}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <CustomTableConsultaSolicitudes
                        data={data}
                        cantTotal={siniestros && siniestros.cantidadTotal ? siniestros.cantidadTotal : 0}
                        columnas={header}
                        setRowBorderLeft={setRowBorderLeft}
                        referencias={[
                            {text:'ILT', color: 'green'},
                            {text:'ILP', color: 'blue'},
                            {text:'FIN ILT', color: 'red'},
                            {text:'RECHAZO', color: 'orange'},
                        ]}
                        page={page} setPage={setPage}
                        rowsPerPage={rowsPerPage}  setRowsPerPage={setRowsPerPage}
                        opcionesPaginacion={opcionesPaginacion}
                    />
                </Grid>
            </Grid>
            { openSnackBar.open ? 
                <CustomSnackBar 
                    handleClose={handleClose} 
                    open={openSnackBar.open} 
                    title={openSnackBar.title}
                    severity={openSnackBar.severity} 
                /> 
            : null}
        </div>
    )
}

export default SiniestrosConPendientes
