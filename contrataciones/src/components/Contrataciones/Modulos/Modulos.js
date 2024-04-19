import React, { useEffect, useState } from 'react'
//Utils:
import { BUSCAR } from '../../../Utils/const'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../redux/actions/index'
//Img:
import SVGiconEdit from '../../../commons/assets/Icon-edit.svg'
import IconExcel from '../../../commons/assets/Contrataciones/Modulos/file-excel-outline-modulos.png'
import SVGiconInclusion from '../../../commons/assets/Contrataciones/Modulos/format-list-bulleted-square.svg'
//Material:
import { Grid, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
//Components:
import DrawerModulo from './DrawerModulo'
import DrawerInclusiones from './DrawerInclusiones'
import BuscadorContrataciones from '../../commons/Buscador/BuscadorContrataciones'
import CustomButton from '../../commons/Button/CustomButton'
import CustomTableContrataciones from '../../commons/Table/CustomTableContrataciones'
import Drawer2 from '../../commons/CustomDrawer/Drawer'
import AdminSlide from '../../commons/Slider/AdminSlide'
import DrawerConvenios from './DrawerConvenios'
import CustomAlert from '../../commons/CustomAlert/customAlert'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import CustomLoader from '../../commons/Loading/CustomLoading'

const Modulos = () => {

    const classes = {}
    //Redux:
    const dispatch = useDispatch()
    const datos = useSelector(state => state.moduloConvenio.modulosListado)
    const loadingListadoModulo = useSelector(state => state.moduloConvenio.loadingListadoModulo)
    const loadingSaveEditModulo = useSelector(state => state.moduloConvenio.loadingSaveEditModulo)
    const loadingImpactarConvenios = useSelector(state => state.moduloConvenio.loadingImpactarConvenios);
    //Confimation: 
    const [openAlert1, setOpenAlert] = useState({ "open": false, "mensaje": null })
    const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' })
    //CustomTable:
    const cellStyle = { color: '#505050', fontSize: '12px', alignContent: 'left' }
    const headerStyle = { color: '#747474', fontSize: '13px', alignContent: 'left' }
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Drawers
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const [modoInclusiones, setModoInclusiones] = useState(false)
    const [modoEditarModulo, setModoEditarModulo] = useState(false)
    const [modoCrearModulo, setModoCrearModulo] = useState(false)
    const [modoConvenios, setModoConvenios] = useState(false)
    const [tituloDrawer, setTituloDrawer] = useState(null)
    const [request, setRequest] = useState(null)
    const [incluido, setIncluido] = useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [navigateBack, setNavigateBack] = useState(false)
    const [newInclusiones, setNewInclusiones] = useState([])
    const [oldInclusiones, setOldInclusiones] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [dataPrestaciones, setDataPrestaciones] = useState([])
    const [actualizarData, setActualizarData] = useState(false)
    const [conveniosSeleccionados, setConveniosSeleccionados] = useState([])
    const [requestImpactar, setRequestImpactar] = useState(null)

    //Pedir listado Modulos
    useEffect(() => {
        let req = {
            criterioBusqueda: busqueda,
            limit: rowsPerPage,
            offset: page * rowsPerPage
        }
        dispatch(action.getListadoModulos(req))
    }, [page, rowsPerPage, busqueda, actualizarData])

    //Ordenar datos de la tabla por paginacion
    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (datos && datos.cantidadTotal && datos.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = datos && datos.objetos ? datos.objetos.map(newData => {
            return { ...newData }
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (datos && datos.cantidadTotal && lengthData < datos.cantidadTotal) {
            for (let index = lengthData; index < datos.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setDataPrestaciones([...dataRellenar, ...dataApi, ...dataRestante])
    }, [datos])

    //Abrir Drawer:
    const handleNuevoModulo = () => {
        setTituloDrawer("Nuevo Módulo")
        setModoCrearModulo(true)
        setRequest({ "inclusiones": [] })
        setOpenDrawer({ ...openDrawer, 'right': true });
    }
    const handleEditarModulo = (row) => {
        setTituloDrawer("Editar Módulo")
        setModoEditarModulo(true)
        setRequest({ ...row, "inclusiones": [] })
        setOpenDrawer({ ...openDrawer, 'right': true });
    }
    const handleVerInclusiones = (row) => {
        setTituloDrawer(`Inclusiones del módulo ${row.codigo}`)
        setModoInclusiones(true);
        setRequest(row)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }

    //Actions Drawer
    const toggleDrawer = (anchor, open) => (event) => {
        cerrarDrawer();
    }
    const handleVolver = () => {
        setTituloDrawer("Editar Módulo")
        setModoConvenios(false)
        setModoEditarModulo(true)
        setNavigateBack(true)
    }
    const cerrarDrawer = () => {
        setTituloDrawer(null)
        setModoInclusiones(false)
        setModoEditarModulo(false)
        setModoCrearModulo(false)
        setModoConvenios(false)
        setRequest(null)
        setRequestImpactar(null)
        setOpenDrawer({ ...openDrawer, 'right': false })
        setNewInclusiones([])
        setOldInclusiones([])
        dispatch(action.clearInclusionesModulo());
        dispatch(action.clearConveniosIncluidos());
        setNavigateBack(false)
    }
    const guardarModulo = () => {
        if (modoCrearModulo) {
            dispatch(action.saveModulo(request, callback))
            setOpenDrawer({ ...openDrawer, 'right': false })
        }
        if (modoEditarModulo) {
            setModoEditarModulo(false)
            setTituloDrawer("Edición de Convenio")
            setModoConvenios(true)
        }
        if (modoConvenios) {
            //Lógica de "Impactar en convenio":
            if (requestImpactar && requestImpactar.modulo && requestImpactar.idConvenio) {
                dispatch(action.impactarConvenios(requestImpactar, callback))
            }
            setOpenDrawer({ ...openDrawer, 'right': false })
        }
    }
    const guardarSinImpactar = () => {
        //Lógica de "Guardar sin impactar":
        if (modoConvenios) dispatch(action.editModulo(request, callback))
        setOpenDrawer({ ...openDrawer, 'right': false })
    }

    //Callback:
    const callback = (success) => {
        let deleted = request && request.inclusiones ? request.inclusiones && request.inclusiones.filter(it => it.eliminarPrestacion === true) : [];
        let included = request && request.inclusiones ? request.inclusiones && request.inclusiones.filter(it => it.eliminarPrestacion !== true) : [];
        let impactar = requestImpactar && requestImpactar.idConvenio ? requestImpactar.idConvenio : [];
        if (success) {
            setActualizarData(!actualizarData)
            setOpenAlert({
                "open": true,
                "mensaje": modoCrearModulo ? `Nuevo módulo ${request.codigo} CREADO`
                    : `El módulo ${request.codigo} se ha guardado correctamente. `
                    + `${included.length > 0 ? ('Se incluyeron o editaron las siguientes prestaciones:' + included.map(it => (' ' + it.codigo)) + '. ') : ''}`
                    + `${deleted.length > 0 ? ('Se eliminaron las siguientes prestaciones:' + deleted.map(it => (' ' + it.codigo)) + '. ') : ''}`
                    + `${impactar.length > 0 ? ('Se versionaron los siguientes convenios:' + impactar.map(it => (' ' + it)) + '. ') : ''}`
            });
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>{`Hubo un error al guardar el módulo ${request.codigo}. Intentelo nuevamente.`}</div>
            })
        }
        cerrarDrawer();
    }

    //Exportar:
    const handleExportarModulo = (row) => {
        console.log("Data a exportar: ", row)
    }

    //SnackBar + Alert:
    const handleCloseAlert = () => {
        setOpenAlert({ "open": false, "mensaje": null })
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };

    //Handle buscar:
    const handleBuscar = (value) => {
        setBusqueda(value)
    }

    //Contenido Drawer:
    const contenido = [{
        texto: modoEditarModulo || modoCrearModulo ?
            <DrawerModulo
                request={request} setRequest={setRequest}
                incluido={incluido} setIncluido={setIncluido}
                newInclusiones={newInclusiones} setNewInclusiones={setNewInclusiones}
                oldInclusiones={oldInclusiones} setOldInclusiones={setOldInclusiones}
                modoEditarModulo={modoEditarModulo} modoCrearModulo={modoCrearModulo}
                openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar}
                navigateBack={navigateBack}
            />
            : modoInclusiones ?
                <DrawerInclusiones
                    request={request}
                />
                : modoConvenios ?
                    <DrawerConvenios
                        request={request}
                        conveniosSeleccionados={conveniosSeleccionados}
                        setConveniosSeleccionados={setConveniosSeleccionados}
                        setRequestImpactar={setRequestImpactar}
                    />
                    : null
    }]
    const maxSteps = contenido.length;

    //CustomTable
    let headerTabla = [
        {
            title: <div style={{ cursor: "auto" }}>CÓDIGO</div>,
            field: "codigo",
            cellStyle: cellStyle,
            cellStyle: { width: '50px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: headerStyle,
        },
        {
            title: <div style={{ cursor: "auto" }}>NOMBRE</div>,
            field: "nombre",
            cellStyle: cellStyle,
            cellStyle: { minWidth: '200px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: headerStyle,
        },
        {
            title: <div style={{ cursor: "auto" }}>DESCRIPCIÓN</div>,
            cellStyle: cellStyle,
            cellStyle: { minWidth:'500px', maxWidth:'500px'},
            headerStyle: headerStyle,
            render: row => (
                <div style={{display: '-webkit-box', WebkitLineClamp: 9, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {row.descripcion}
                </div>
            )
        },
        {
            title: <div style={{ cursor: "auto" }}>INCLUSIONES</div>,
            field: "inclusiones",
            cellStyle: cellStyle,
            cellStyle: { minWidth: '5px' },
            headerStyle: headerStyle,
            render: row => (
                <div>
                    <IconButton
                        className={classes.iconEditar}
                        size="small"
                        onClick={() => handleVerInclusiones(row)} >
                        <img src={SVGiconInclusion} />
                    </IconButton>
                </div>
            )
        },
        {
            title: <div style={{ cursor: "auto" }}>ACCIONES</div>,
            field: "acciones",
            cellStyle: cellStyle,
            cellStyle: { minWidth: '5px' },
            headerStyle: headerStyle,
            render: row => (
                <div style={{ display: "flex" }}>
                    <IconButton
                        className={classes.iconEditar}
                        size="small"
                        onClick={() => handleEditarModulo(row)} >
                        <img src={SVGiconEdit} />
                    </IconButton>
                    <IconButton
                        className={classes.iconEditar}
                        size="small"
                        onClick={() => handleExportarModulo(row)} >
                        <img src={IconExcel} />
                    </IconButton>
                </div>
            )
        }
    ]

    return (
        <div className={classes.root}>
            <Grid container justify={"space-between"} spacing={5} xs={12}>
                <Grid item xs={3} justify={"flex-start"}>
                    <BuscadorContrataciones
                        onClick={handleBuscar}
                        placeholder={BUSCAR}
                    />
                </Grid>
                <Grid container item xs={5} justify={"flex-end"} alignContent={'flex-end'} spacing={2}>
                    <Grid item>
                        <CustomButton
                            size={'medium'}
                            isAction={true}
                            startIcon={<AddIcon style={{ marginLeft: '5px', color: '#ffffff' }} />}
                            onClik={handleNuevoModulo}
                            label={"Nuevo Módulo"}
                            variant={'contained'}
                            color='primary'
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} width='100%'>
                    <CustomTableContrataciones
                        data={dataPrestaciones}
                        cantTotal={datos && datos.cantidadTotal ? datos.cantidadTotal : 0}
                        columnas={headerTabla}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        mensaje={false}
                        className={classes.cellStyle}
                        pagination={true}
                        loading={loadingListadoModulo}
                        noSorting={true}
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
                width={modoInclusiones ? 650 : 800}
                title={tituloDrawer}
            >
                <AdminSlide
                    contenido={contenido}
                    //CANCELAR
                    buttonCancelar={modoInclusiones ? false : true}
                    labelButtonCancelar={modoConvenios ? 'Guardar sin impactar' : 'Cancelar'}
                    variantButtonCancelar={'outlined'}
                    onClickCancelar={modoConvenios ? guardarSinImpactar : cerrarDrawer}
                    //GUARDAR
                    valueHabilitadoSiguiente={
                        modoEditarModulo ?
                            !(request && request.codigo && request.descripcion && request.nombre && (oldInclusiones && oldInclusiones.length > 0 || newInclusiones && newInclusiones.length > 0))
                            : modoCrearModulo ?
                                !(request && request.codigo && request.descripcion && request.nombre && request.inclusiones && request.inclusiones.length > 0)
                                : modoConvenios ?
                                    !(requestImpactar && requestImpactar.modulo.codigo && requestImpactar.modulo.descripcion && requestImpactar.modulo.nombre && requestImpactar.idConvenio && requestImpactar.idConvenio.length > 0)
                                    : true
                    }
                    labelButtonSiguiente={modoEditarModulo ? 'Continuar' : modoCrearModulo ? 'Guardar' : modoConvenios && request && request.incluidoEnConvenio ? 'Impactar en convenios' : null}
                    variantButtonSiguiente={'contained'}
                    handleNext={guardarModulo}
                    //VOLVER
                    backBoton={modoConvenios ? true : false}
                    labelBackBoton={"Atrás"}
                    variantBackBoton={'contained'}
                    handleBack={handleVolver}
                    //OTROS
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                    isAction={true}
                />
            </Drawer2>
            <CustomAlert
                message={openAlert1.mensaje}
                onClose={handleCloseAlert}
                variant={'filled'}
                severity='success'
                open={openAlert1.open}
                snack={true}
                autoHideDuration={15000}
            />
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
            <CustomLoader loading={loadingSaveEditModulo || loadingImpactarConvenios} />
        </div>
    )
}

export default Modulos;
