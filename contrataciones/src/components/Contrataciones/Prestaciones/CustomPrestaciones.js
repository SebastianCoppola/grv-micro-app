import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import { BUSCAR, EDITAR_PRESTACION_NO_NOMENCLADA, INCLUIR_MODULO, NUEVA_PRESTACION, NUEVA_PRESTACION_NO_NOMENCLADA } from '../../../Utils/const';
//Material:
import { Grid, IconButton, Menu, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
//Components:
import BuscadorContrataciones from '../../../components/commons/Buscador/BuscadorContrataciones';
import CustomButton from '../../../components/commons/Button/CustomButton';
import SVGtablePlus from '../../../commons/assets/Contrataciones/Modulos/tableplus.svg';
import SVGiconEdit from '../../../commons/assets/Icon-edit.svg'
import CustomTableContrataciones from '../../../components/commons/Table/CustomTableContrataciones';
import Drawer2 from '../../commons/CustomDrawer/Drawer';
import AdminSlide from '../../commons/Slider/AdminSlide';
import DrawerPrestacionNoNomenclada from './PrestacionesNoNomencladas/DrawerPrestacionNoNomenclada';
import DrawerIncluirAModulo from './DrawerIncluirAModulo';
import CustomAlert from "../../commons/CustomAlert/customAlert";
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
import CustomLoader from '../../commons/Loading/CustomLoading'


const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    iconEditar: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    warning: {
        marginLeft: '-180px',
        "& .MuiMenu-list": {
            paddingTop: '0px',
            paddingBottom: '0px',
        },
        "& .MuiPaper-elevation8": {
            boxShadow: "none",
        }
    },
    warningTypography: {
        backgroundColor: '#1473e6',
        color: 'white',
        fontSize: '13px',
        width: '150px',
        padding: '10px',
    }
});

const CustomPrestaciones = (props) => {
    const { data, setData, noNomenclada, request, setRequest, requestIncluir, setRequestIncluir, requestListar, setRequestListar,
        page, setPage, setRowsPerPage, rowsPerPage, tipoOrdenamiento, setTipoOrdenamiento, criterioOrdenamiento,
        setCriterioOrdenamiento, criterioBusqueda, setCriterioBusqueda, setUpdateTable, updateTable } = props;
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [openAlert, setOpenAlert] = useState({ "open": false, "mensaje": null });
    const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' });
    //CustomTable:
    const cellStyle = { color: '#505050', fontSize: '12px', alignContent: 'left', height: '40px' }
    const headerStyle = { color: '#747474', fontSize: '13px', alignContent: 'left' }
    //Drawer:
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false });
    const [activeStep, setActiveStep] = useState(0);
    const [modoEditar, setModoEditar] = useState(false);
    const [modoAgregar, setModoAgregar] = useState(false);
    const [modoIncluir, setModoIncluir] = useState(false);
    const [saveIncluir, setSaveIncluir] = useState(false);
    //Prestaciones seleccionadas:
    const [dataSelect, setDataSelect] = useState([]);
    const [prestacionesSeleccionadas, setPrestacionesSeleccionadas] = useState([]);
    //Datos prestaciones nomencladas
    const [dataPrestaciones, setDataPrestaciones] = useState([])
    //Loading
    const loadingListarPrestaciones = useSelector(state => state.prestaciones.loadingListarPrestaciones)
    const loadingAddEditPrestacionesNoNomencladas = useSelector(state => state.prestaciones.loadingAddEditPrestacionesNoNomencladas)
    const loadingSaveInclusiones = useSelector(state => state.moduloConvenio.loadingSaveInclusiones)
    const errorAutosuggestModulos = useSelector(state => state.moduloConvenio.errorAutosuggestModulos)
    //Aviso "Incluir a módulo"
    const [anchorEl, setAnchorEl] = useState(null);
    const showWarning = (event) => { setAnchorEl(event.currentTarget) };
    const hideWarning = () => { setAnchorEl(null) };
    //Modulo seleccionado: 
    const [moduloSeleccionado, setModuloSeleccionado] = useState(null);

    //Ordeno Data segun paginacion de la tabla:
    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (data && data.cantidadTotal && data.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = data && data.objetos ? data.objetos.map(newData => {
            return { ...newData }
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (data && data.cantidadTotal && lengthData < data.cantidadTotal) {
            for (let index = lengthData; index < data.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setDataPrestaciones([...dataRellenar, ...dataApi, ...dataRestante])
    }, [data])

    //Seteo checked = true cada vez que cambio de página:
    useEffect(() => {
        dataPrestaciones && dataPrestaciones.forEach(item => {
            prestacionesSeleccionadas && prestacionesSeleccionadas.length > 0 && prestacionesSeleccionadas.forEach(item2 => {
                if (item.idPrestacion === item2.idPrestacion) {
                    item.tableData.checked = true
                }
            })
        })
    }, [dataPrestaciones])

    //Callbacks Incluir, Add, Edit:
    const callback = (success) => {
        setModuloSeleccionado(null)
        if (success) {
            setOpenAlert({
                "open": true,
                "mensaje": saveIncluir ? `Se incluyeron ${requestIncluir.idPrestacionesAIncluir.length} prestaciones al módulo ${moduloSeleccionado.codigo}` : `La prestación ${request.codigo} se guardó correctamente.`
            });
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>{saveIncluir ? `Ocurrió un error al incluir las prestaciones. Vuelva a intentarlo` : `Ocurrió un error al guardar la prestación ${request.codigo}. Intente nuevamente.`}</div>
            })
            setModuloSeleccionado(null)
        }
        setUpdateTable(!updateTable)
        setPrestacionesSeleccionadas([])
        drawerCancelar()
    }

    //Open Drawer:
    const handleEditarPrestacion = (row) => {
        setRequest(row)
        setModoEditar(true)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }
    const handleNuevaPrestacion = () => {
        setModoAgregar(true)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }
    const handleIncluirModulo = (event) => {
        if (prestacionesSeleccionadas && prestacionesSeleccionadas.length > 0) {
            setModoIncluir(true)
            setOpenDrawer({ ...openDrawer, 'right': true });
        } else {
            showWarning(event)
        }
    }

    //Close Drawer:
    const toggleDrawer = (anchor, open) => (event) => {
        drawerCancelar()
    }

    //Actions Drawer:
    const drawerCancelar = () => {
        setRequest(null)
        setRequestIncluir(null)
        setModoAgregar(false)
        setModoEditar(false)
        setModoIncluir(false)
        setSaveIncluir(false)
        setModuloSeleccionado(null)
        setOpenDrawer({ ...openDrawer, 'right': false })
        dispatch(actions.clearInclusionesRepetidas())
        dispatch(actions.clearInclusionesModulo())
    }
    const drawerGuardar = () => {
        if (modoAgregar || modoEditar) {
            if (modoAgregar) dispatch(actions.savePrestacionNoNomencladas(request, callback));
            if (modoEditar) dispatch(actions.editPrestacionNoNomencladas(request, callback));
            setOpenDrawer({ ...openDrawer, 'right': false })
            dataPrestaciones && dataPrestaciones.length > 0 && dataPrestaciones.forEach(item => {
                item.tableData.checked = false
            })
        }
        if (modoIncluir) {
            setSaveIncluir(true)
            setModoIncluir(false)
        }
    }

    //Aceptar y Cancelar Incluir a Módulo:
    const cancelarSaveIncluir = () => {
        setSaveIncluir(false)
        setModoIncluir(true)
    }
    const aceptarSaveIncluir = () => {
        if (noNomenclada) {
            dispatch(actions.saveInclusionesModuloPNN(requestIncluir, callback));
            setModuloSeleccionado(null)
        } else {
            dispatch(actions.saveInclusionesModuloPN(requestIncluir, callback));
            setModuloSeleccionado(null)
        }
        setOpenDrawer({ ...openDrawer, 'right': false })
        dataPrestaciones && dataPrestaciones.length > 0 && dataPrestaciones.forEach(item => {
            item.tableData.checked = false
        })
    }

    //Close Alert & SnackBar:
    const handleCloseAlert = () => {
        setOpenAlert({ "open": false, "mensaje": null })
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };

    //Buscador:
    const handleBuscar = value => {
        setCriterioBusqueda(value)
    }

    //Sorting Column: 
    const sortColumn = (event) => {
        setTipoOrdenamiento(tipoOrdenamiento === null ? 1 : tipoOrdenamiento === 1 ? 2 : 1)
        setCriterioOrdenamiento(event.target.id === "codigo" ? 1 : event.target.id === "descripcion" ? 2 : event.target.id === "categoria" ? 3 : event.target.id === "subCategoria" ? 4 : 5)
    }

    //Contenido Drawers: 
    const contenidoPrestacion = [{
        texto: <DrawerPrestacionNoNomenclada
            request={request}
            setRequest={setRequest}
        />
    }]
    const maxStepsPrestacion = contenidoPrestacion.length;
    const contenidoIncluir = [{
        texto: <DrawerIncluirAModulo
            prestacionesSeleccionadas={prestacionesSeleccionadas}
            requestIncluir={requestIncluir} setRequestIncluir={setRequestIncluir}
            saveIncluir={saveIncluir}
            aceptarGrabar={aceptarSaveIncluir}
            cancelarGrabar={cancelarSaveIncluir}
            noNomenclada={noNomenclada}
            moduloSeleccionado={moduloSeleccionado}
            setModuloSeleccionado={setModuloSeleccionado}
            modoIncluir={modoIncluir}
        />
    }]
    const maxStepsIncluir = contenidoIncluir.length;

    //Headers CustomTable:
    let headerTabla = [
        {
            title: <div id="codigo" onClick={(event) => sortColumn(event)}>CÓDIGO</div>,
            field: "codigo",
            cellStyle: cellStyle,
            cellStyle: { width: '50px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: headerStyle,
        },
        {
            title: <div id="descripcion" onClick={(event) => sortColumn(event)}>DESCRIPCIÓN</div>,
            field: "descripcion",
            cellStyle: cellStyle,
            cellStyle: { minWidth: '400px', maxWidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: headerStyle,
        },
        {
            title: <div id="categoria" onClick={(event) => sortColumn(event)}>CATEGORÍA</div>,
            field: "categoriaContrataciones",
            cellStyle: cellStyle,
            headerStyle: headerStyle,
        },
        {
            title: <div id="subCategoria" onClick={(event) => sortColumn(event)}>SUBCATEGORÍA</div>,
            field: "subCategoriaContrataciones",
            cellStyle: cellStyle,
            headerStyle: headerStyle,
        },
    ];
    (noNomenclada && (
        headerTabla = [...headerTabla,
        {
            title: <div id="uNbu" onClick={(event) => sortColumn(event)}>U.NBU</div>,
            field: "uNbu",
            cellStyle: cellStyle,
            headerStyle: headerStyle,
        },
        {
            title: "ACCIONES",
            field: "acciones",
            cellStyle: cellStyle,
            headerStyle: headerStyle,
            render: row => (
                <div>
                    <IconButton
                        className={classes.iconEditar}
                        size="small"
                        onClick={() => handleEditarPrestacion(row)} >
                        <img src={SVGiconEdit} />
                    </IconButton>
                </div>
            )
        }
        ]
    ))

    return (
        <div className={classes.root}>
            <Grid container justify={"space-between"} spacing={5} xs={12}>
                <Grid item xs={3} justify={"flex-start"}>
                    <BuscadorContrataciones
                        onClick={e => handleBuscar(e)}
                        placeholder={BUSCAR}
                    />
                </Grid>
                <Grid container item xs={5} justify={"flex-end"} alignContent={'flex-end'} spacing={2}>
                    <Grid item>
                        <CustomButton
                            size={'medium'}
                            startIcon={<img src={SVGtablePlus} />}
                            label={INCLUIR_MODULO}
                            onClik={(e) => handleIncluirModulo(e)}
                            variant={"outlined"}
                            disabled={false}
                            styleButton={anchorEl ? { border: "2px solid #1473e6" } : null}
                        />
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={hideWarning}
                            getContentAnchorEl={null}
                            className={classes.warning}
                        >
                            <Typography className={classes.warningTypography}>
                                Deberás seleccionar 1 o más prestaciones a incluir.
                            </Typography>
                        </Menu>
                    </Grid>
                    {noNomenclada &&
                        <Grid item>
                            <CustomButton
                                size={'medium'}
                                isAction={true}
                                startIcon={<AddIcon style={{ marginLeft: '5px', color: '#ffffff' }} />}
                                onClik={handleNuevaPrestacion}
                                label={NUEVA_PRESTACION}
                                variant={'contained'}
                                color='primary' />
                        </Grid>
                    }
                </Grid>
                <Grid item xs={12} width='100%'>
                    <CustomTableContrataciones
                        data={dataPrestaciones}
                        setData={setDataPrestaciones}
                        cantTotal={data && data.cantidadTotal}
                        columnas={headerTabla}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        mensaje={false}
                        className={classes.cellStyle}
                        selection={true}
                        pagination={true}
                        dataSelect={dataSelect}
                        setDataSelect={setDataSelect}
                        noSorting={true}
                        loading={loadingListarPrestaciones}
                        prestacion={true}
                        prestacionesSeleccionadas={prestacionesSeleccionadas}
                        setPrestacionesSeleccionadas={setPrestacionesSeleccionadas}
                    />
                </Grid>
            </Grid>
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                variant={'contained'}
                button={false}
                title={modoEditar ? EDITAR_PRESTACION_NO_NOMENCLADA : modoAgregar ? NUEVA_PRESTACION_NO_NOMENCLADA : modoIncluir || saveIncluir ? INCLUIR_MODULO : null}
            >
                <AdminSlide
                    contenido={modoEditar || modoAgregar ? contenidoPrestacion : contenidoIncluir}
                    buttonCancelar={saveIncluir ? false : true}
                    onClickCancelar={drawerCancelar}
                    variantButtonCancelar={'outlined'}
                    labelButtonCancelar={'Cancelar'}
                    labelButtonSiguiente={
                        modoEditar ? 'Guardar' :
                            modoAgregar ? 'Grabar' :
                                modoIncluir ? 'Incluir a módulo' : null
                    }
                    valueHabilitadoSiguiente={
                        modoIncluir ?
                            (requestIncluir !== null && requestIncluir.idPrestacionesAIncluir.length > 0 && !errorAutosuggestModulos) ?
                                false
                                :
                                true
                            : modoAgregar || modoEditar ?
                                (request !== null && request.codigo && request.descripcion) ?
                                    false
                                    : true
                                : true
                    }
                    variantButtonSiguiente={'contained'}
                    handleNext={drawerGuardar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={modoEditar || modoAgregar ? maxStepsPrestacion : maxStepsIncluir}
                />
            </Drawer2>
            <CustomAlert
                message={openAlert.mensaje}
                onClose={handleCloseAlert}
                variant={'filled'}
                severity='success'
                open={openAlert.open}
                snack={true}
            />
            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={handleCloseSnackBar}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                />
                : null
            }
            <CustomLoader loading={loadingAddEditPrestacionesNoNomencladas || loadingSaveInclusiones} />
        </div>
    )
}
CustomPrestaciones.propTypes = {

}
export default CustomPrestaciones