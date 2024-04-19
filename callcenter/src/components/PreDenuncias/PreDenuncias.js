import React, { useEffect, Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index'
//material-ui
import { Avatar, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
//iconos
import PNGResponsable from '../../commons/assets/IconsSolicitudesGenericas/Gestor.png';
import SVGAsignar from '../../commons/assets/IconsSolicitudesGenericas/Asignar.svg';
import SVGAccion from '../../commons/assets/IconsSolicitudesGenericas/Accion.svg';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
//componentes
import CustomChip from '../commons/Chip/CustomChip';
import HeaderFiltros from '../commons/Header/HeaderFiltros';
import CustomTable from '../commons/Table/CustomTable';
import Drawer2 from '../commons/CustomDrawer/Drawer';
import VerDetallePreDenuncias from './ComponenteDrawer/VerDetallePreDenuncias';
import CustomTypography from '../commons/Typography/CustomTypography';
import AdminSlide from '../commons/Slider/AdminSlide';
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar';
import Utils from '../../Utils/utils';
import AnularPreDenuncia from './ComponenteDrawer/AnularPreDenuncia';
import { COMPONENT_PREDENUNCIA, ERROR_SEARCH_BY_ID_REDIRECCION, MENSAJE_ERROR_ANULAR_PRE_DENUNCIA, 
    MENSAJE_OBSERVACIONES_ANULAR_REQUERIDO, MENSAJE_OK_ANULAR_PRE_DENUNCIA, 
    SNACK_SEVERITY, 
    SNACK_VERTICAL} from '../../Utils/const';
import IconSearch from '../BuscadorFlotante/IconSearch';

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
}));

const tooltip = makeStyles({
    tooltip: {
        backgroundColor: ' #2F61D5',
    },
    arrow: {
        color: ' #2F61D5'
    }
})

const PreDenuncias = (props) => {
    const history = useHistory();
    const { usuarioActivo, setMiniMenu, setNavegacion, setTituloHeader, openMenu,
        openBuscador, setOpenBuscador } = props;
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const classesTooltip = tooltip();
    const [esOperador, setEsOperador] = useState(usuarioActivo.isOperador);
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState(null);
    const dataPreDenuncia = useSelector(state => state.documentos.preDenuncia);
    const loadingPreDenuncias = useSelector(state => state.documentos.loadingPreDenuncias);
    const [loading, setLoading] = useState(false);
    const [dataSelect, setDataSelect] = useState([]);
    const [SelectSiniestrosAnterior, setSelectSiniestroAnterior] = useState(null)
    const [selectEstadoCEM, setSelectEstadoCEM] = useState(null)
    const [actualizarData, setActualizarData] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo));
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });
    //slide
    const [activeStep, setActiveStep] = useState(0);
    const [openDrawer, setOpenDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [valMensaje, setValMensaje] = useState("");

    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setTituloHeader('Pre Denuncias');
    }, [])

    useEffect(() => {
        setEsOperador(usuarioActivo.isOperador)
    }, [usuarioActivo])

    const nombreResponsable = newData => {
        if (newData.responsableProcesamientoNombre && newData.responsableProcesamientoApellido) {
            return `${newData.responsableProcesamientoApellido} ${newData.responsableProcesamientoNombre}`
        } else {
            return ''
        }
    }



    const verificarResponsable = (rowSelected) => {
        if (rowSelected) {
            const { idResponsable } = data[rowSelected.tableData.id];
            if (idResponsable === parseInt(usuarioActivo.id)) {
                return true
            } else {
                return false
            }
        }
    }

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (dataPreDenuncia && dataPreDenuncia.cantidadTotal && dataPreDenuncia.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        const dataApi = dataPreDenuncia && dataPreDenuncia.objetos ? dataPreDenuncia.objetos.map(newData => {

            return ({
                preDenuncia: newData && newData.idPreDenuncia ? newData.idPreDenuncia : '',
                nroSiniestro: newData && newData.nroSiniestro ? newData.nroSiniestro : '',
                paciente: newData && newData.nombreApellido ? newData.nombreApellido : '',
                documento: newData && newData.numeroDocumento ? newData.numeroDocumento : '',
                tipoDoc: newData && newData.tipoDocumento ? newData.tipoDocumento : '',
                empleador: newData && newData.empleadorRazonSocial ? newData.empleadorRazonSocial : '',
                fechaOcurrencia: Utils.dateFormat6(newData.fechaOcurrencia, newData.horaOcurrencia),
                idResponsable: newData && newData.responsableProcesamientoIdPersona ? newData.responsableProcesamientoIdPersona : null,
                responsable: newData && nombreResponsable(newData),
                informacion: {
                    fechaOcurrencia: newData && newData.fechaOcurrencia ? newData.fechaOcurrencia : '',
                    horaOcurrencia: newData && newData.horaOcurrencia ? newData.horaOcurrencia : '',
                    tipoSiniestro: newData && newData.tipoSiniestroDescripcion ? newData.tipoSiniestroDescripcion : '',
                    medico: newData && newData.proveedorCentroMedicoPrimeraAtencion ? newData.proveedorCentroMedicoPrimeraAtencion : '',
                    relatoCaso: newData && newData.relato ? newData.relato : '',
                    dni: newData && newData.numeroDocumento ? newData.numeroDocumento : '',
                    nombre: newData && newData.nombreApellido ? newData.nombreApellido : '',
                    direccion: newData && newData.domicilio ? newData.domicilio : '',
                    telefono: newData && newData.telefono ? newData.telefono : '',
                    empleador: newData ? nombreResponsable(newData) : '',
                    cuitEmpleador: newData && newData.empleadorCuit ? newData.empleadorCuit : '',

                }
            })
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (dataPreDenuncia && dataPreDenuncia.cantidadTotal && lengthData < dataPreDenuncia.cantidadTotal) {
            for (let index = lengthData; index < dataPreDenuncia.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])

    }, [dataPreDenuncia])

    const header = [
        {
            title: "PRE DENUNCIA", field: "preDenuncia",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }
        },

        {
            title: "NÚMERO SINIESTRO", field: "nroSiniestro",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "PACIENTE", field: "paciente",
            cellStyle: { fontSize: '12px', minWidth: '250px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "DOCUMENTO", field: "documento",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "EMPLEADOR", field: "empleador",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "FECHA OCURRENCIA", field: "fechaOcurrencia",
            cellStyle: { fontSize: '12px', minWidth: '200px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "RESPONSABLE", field: "responsable",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (
                <CustomChip
                    fontSize={true}
                    label={row.responsable !== '' ? row.responsable : esOperador ? 'Asignarme' : 'Asignar'}
                    colorLabel={'#6e6e6e'}
                    style={{ backgroundColor: '#fafafa' }}
                    color={'#8e8e8e'}
                    avatar={<Avatar style={{ width: '17px', height: '17px' }} src={row.responsable !== '' ? PNGResponsable : SVGAsignar} />}
                    icon={row && row.gestor !== '' ? (
                        <Tooltip arrow
                            classes={classesTooltip}
                            placement="top"
                            title={
                                <Grid container justify='center' alignItems='center'>
                                    <Grid item >
                                        <ErrorOutlinedIcon style={{ width: '17px', height: '17px', backgroundColor: ' #2F61D5' }} />
                                    </Grid>
                                    <Grid item >
                                        <CustomTypography style={{ fontSize: '14px', marginLeft: '5px', marginBottom: '3px' }} text={'Libera'} />
                                    </Grid>
                                </Grid>
                            }
                        >
                            <ClearIcon />
                        </Tooltip>
                    ) : null}
                    handleDelete={((esOperador && verificarResponsable(row)) || !esOperador) && row.responsable !== '' ? () => handleDeleteResponsable(row) : null}
                    onClick={(row.responsable === '' && esOperador) ? () => onClickAsignarResponsable(row) : null}
                />
            )
        },
        {
            title: "ACCIONES", field: "acciones",
            cellStyle: { fontSize: '12px', textAlign: 'center' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (
                <Fragment>
                    <IconButton className={classes.iconBnt} onClick={(event) => onClickAccion(event, row)}>
                        <img src={SVGAccion} alt='ver Detalle' />
                    </IconButton>
                    <IconButton className={classes.iconBnt} onClick={(event) => onClickAnular(event, row)}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </Fragment>
            )
        }
    ]

    const handleDeleteResponsable = (rowSelected) => {
        const { preDenuncia: idPreDenuncia } = data[rowSelected.tableData.id];
        const request = {
            idPreDenuncia: idPreDenuncia && idPreDenuncia,
            idOperadorLogueado: usuarioActivo && usuarioActivo.id,
        }
        dispatch(actions.desasignarResponsable(request, callBack))
    }

    const onClickAsignarResponsable = (rowSelected) => {
        const { preDenuncia: idPreDenuncia } = data[rowSelected.tableData.id];
        const request = {
            idsPreDenuncias: [idPreDenuncia && idPreDenuncia],
            idOperadorResponsable: usuarioActivo && usuarioActivo.id,
            idOperadorLogueado: usuarioActivo && usuarioActivo.id,
        }
        dispatch(actions.asignarResponsable(request, callBack))
    }

    const callBack = (succes, message) => {
        if (succes) {
            setOpenSnackBar({
                open: true,
                severity: 'success',
                title: message,
            })
            setActualizarData(!actualizarData);
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: message,
            })
        }
    }

    const onClickAccion = (event, row) => {
        setLoading(true);
        setActiveStep(0)
        dispatch(actions.searchSiniestrosAnteriores({
            tipoDoc: parseInt(row.tipoDoc),
            nroDoc: (row.documento).toString(),
        }))
        setSelectedRow(row)
        setOpenDrawer({ ...openDrawer, 'right': true });
        setOpenBuscador(false)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(true)
    }

    const contenido = [
        {
            texto: <VerDetallePreDenuncias
                data={selectedRow && selectedRow.informacion && selectedRow.informacion}
                dataInfo={selectedRow}
                nroDoc={selectedRow && selectedRow.documento}
                tipoDoc={selectedRow && selectedRow.tipoDoc}
                loading={loading}
                setLoading={setLoading}
                setSelectSiniestroAnterior={setSelectSiniestroAnterior}
                setSelectEstadoCEM={setSelectEstadoCEM}
            />
        },
        {
            texto: <AnularPreDenuncia
                data={selectedRow && selectedRow.informacion && selectedRow.informacion}
                dataInfo={selectedRow}
                setValMensaje={setValMensaje}
                valMensaje={valMensaje}
            />
        }
    ]

    const onClickAsociarDenunciaExistente = () => {
        const request = {
            idPreDenuncia: parseInt(selectedRow.preDenuncia),
            idDenuncia: parseInt(SelectSiniestrosAnterior),
            idOperadorLogueado: parseInt(usuarioActivo.id),
            estadoCEM: parseInt(selectEstadoCEM),
        }
        setOpenDrawer({ ...openDrawer, 'right': false });
        dispatch(actions.asociarDenunciaExistente(request, callBack))
        setOpenBuscador(true)
    }

    const maxSteps = contenido.length

    const onClickDenuncia = () => {
        const request = {
            idOperadorLogueado: parseInt(usuarioActivo.id),
            idPreDenuncia: parseInt(selectedRow.preDenuncia)
        }
        dispatch(actions.generarPreDenuncia(request, callBackGenerar))

    }

    const callBackGenerar = (success, mensaje, data) => {
        if (success) {
            dispatch(actions.searchDenunciaById(data.idDenuncia, data.estadoCEM, callbackSearch))

        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: mensaje,
            })
        }
    }

    const callbackSearch = (succes) => {
        if (succes) {
            history.push({
                pathname: '/home/editar'
            })
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    <div>{'Se creo correctamente la predenuncia, pero hubo un problema al recuperar la denuncia.'}</div>
                    <div>{`${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                    <div>Por favor intente nuevamente.</div>
                </div>,
            })
            setOpenDrawer({ ...openDrawer, 'right': false });
            setOpenBuscador(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    const onClickAnular = (event, row) => {
        setLoading(true);
        setSelectedRow(row)
        setActiveStep(1)
        setOpenDrawer({ ...openDrawer, 'right': true });
        setOpenBuscador(false)
    }

    const getTitle = () => {
        let title = activeStep == 1 ? 'Anular Pre Denuncia: ' : `Número de Siniestro: `;
        title += `${selectedRow && selectedRow.nroSiniestro ? selectedRow.nroSiniestro : ''}`
        return title;
    }

    const onClickAceptarAnular = () => {
        if (valMensaje === "" || valMensaje === null) {
            setOpenSnackBar({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                title: MENSAJE_OBSERVACIONES_ANULAR_REQUERIDO,
            })
        } else {
            const request = {
                idUsuario: parseInt(usuarioActivo.id),
                idPreDenuncia: parseInt(selectedRow.preDenuncia),
                observaciones: valMensaje
            }
            dispatch(actions.anularPreDenuncia(request, callBackAnular))
        }
    }

    const callBackAnular = (success) => {
        setOpenSnackBar({
            open: true,
            severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
            title: success ? MENSAJE_OK_ANULAR_PRE_DENUNCIA : MENSAJE_ERROR_ANULAR_PRE_DENUNCIA,
        })
        if (success) {
            setOpenDrawer({ ...openDrawer, 'right': false });
            setOpenBuscador(true)
            setActualizarData(!actualizarData);
            setValMensaje("")
        }

    }

    return (
        <div >
            {!openBuscador ?
                <IconSearch open={openBuscador} usuarioActivo={usuarioActivo} />
                : null}
            <Grid container alignItems='center' justify='center' spacing={2} >
                <Grid item xs={12}>
                    <Paper elevation={0} className={classes.paper}>
                        <HeaderFiltros
                            component={COMPONENT_PREDENUNCIA} 
                            showBuscador={true}
                            dataSelect={dataSelect} setDataSelect={setDataSelect} tipoDoc={4}
                            showSiestrosCheck={true} showEstadoCEM={false} showOperadores={false}
                            showAsignarSolicitudes={!esOperador} disableAsignarOperador={dataSelect.length === 0 ? true : false}
                            tituloCheck1={'Mis asignaciones'} tituloCheck2={'Pre Denuncias sin asignación'}
                            align={esOperador ? 'center' : 'flex-start'}
                            openMenu={openMenu} actualizarData={actualizarData}
                            page={page} rowsPerPage={rowsPerPage} setPage={setPage}
                            solicitudesGenericas={!esOperador}
                            siniestrosHoy={false}
                            fechaConsulta={false}
                            //Tipo de Fecha
                            esFechaCarga={true}
                            esFechaOcurrencia={false}
                            esFechaContacto={false}
                            usuarioActivo={usuarioActivo}
                            positionSnackBar={SNACK_VERTICAL.BOTTOM}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    <CustomTable
                        cantTotal={dataPreDenuncia && dataPreDenuncia.cantidadTotal && dataPreDenuncia.cantidadTotal}
                        columnas={header}
                        data={data}
                        setPage={setPage}
                        page={page}
                        setRowsPerPage={setRowsPerPage}
                        rowsPerPage={rowsPerPage}
                        loading={loadingPreDenuncias}
                        setDataSelect={setDataSelect}
                        selection={!esOperador ? true : false}
                        vencimiento={false}
                        textoAvatar1={'Por vencer'}
                        textoAvatar2={'Advertencia de vencimiento'}
                        opcionesPaginacion={opcionesPaginacion}
                    />
                </Grid>
                <Drawer2
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    anchor='right'
                    toggleDrawer={toggleDrawer}
                    width={'550px'}
                    variant={'contained'}
                    title={getTitle()}
                    button={false}
                    handleButton={null}
                >
                    <AdminSlide
                        contenido={contenido}
                        buttonCancelar={true}
                        backBoton={false}
                        labelButtonCancelar={activeStep == 1 ? 'Anular Pre Denuncia' : 'Asociar denuncia existente'}
                        labelButtonSiguiente={activeStep == 1 ? 'Anular' : 'Generar denuncia'}
                        variantButtonCancelar={'outlined'}
                        variantButtonSiguiente={'contained'}
                        onClickCancelar={onClickAsociarDenunciaExistente}
                        handleNext={activeStep == 1 ? onClickAceptarAnular : onClickDenuncia}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        maxSteps={maxSteps}
                        disabled={SelectSiniestrosAnterior ? false : true} />

                </Drawer2>

            </Grid>
            {openSnackBar.open ? <CustomSnackBar handleClose={handleClose} open={openSnackBar.open} title={openSnackBar.title}
                severity={openSnackBar.severity} vertical={'bottom'} /> : null}
        </div>
    )
}

export default PreDenuncias