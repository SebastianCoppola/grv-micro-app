import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../redux/actions/'
//Components: 
import CustomCardConvenios from './CustomCardConvenios'
import ClipBoardCheck from "../../../../commons/assets/Cards/ClipboardCheck.svg"
import ClipBoardMinus from "../../../../commons/assets/Cards/ClipboardMinus.svg"
import ClipBoardClockOut from "../../../../commons/assets/Cards/ClipBoardClockOut.svg"
import CustomAlert from '../../../commons/CustomAlert/customAlert'
import TablasConvenio from "../TablasConvenios/TablasConvenio"
//Material:
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { getModulosHistoricos, getPresNomencladaConvenioHistorico, getPresNoNomencladasHistorico, getPrestacionesNBUHistoricos } from '../../../../redux/actions/convenio';
import Loader from '../../../commons/Loading/Loader';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';

const useStyles = makeStyles((theme) => ({
    textNotSelect: {
        fontSize: '14px',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    cabecera: {
        borderLeft: '2px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '0 30px 0 30px',
        display: 'flex',
        alignItems: 'center',
        height: '60px'
    },
    iconActions: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    titles: {
        fontSize: "16px",
        color: "#323232",
        fontWeight: '400',
        margin: '0 0 15px 0'
    },
    noData: {
        fontSize: '14px',
        lineHeight: 1.32,
        color: '#e34850',
    },
}))

//Contenido principal de cada pestaña, tanto para las pantallas historico convenios y 
//convenios futuros
const Contenido = (props) => {
    const {
        data,
        historicoConvenio,
        convenioSeleccionado, setConvenioSeleccionado,
        openAlert, handleCloseAlert,
        setDrawerNro,
        setEditRow,
        handleClickEditar,
        handleClickEliminar,
        setLoadingComponente,
        request,
        setRequest,
        proveedor,
        usuario
    } = props

    const classes = useStyles()
    //Redux:
    const dispatch = useDispatch();
    const pnBack = useSelector(state => state.convenio.pn)
    const tableLoadingPN = useSelector(state => state.convenio.loadingPN)
    const errrorPN = useSelector(state => state.convenio.errorPN)
    const pnnBack = useSelector(state => state.convenio.pnn)
    const tableLoadingPNN = useSelector(state => state.convenio.loadingPNN)
    const errrorPNN = useSelector(state => state.convenio.errorPNN)
    const modulosBack = useSelector(state => state.convenio.modulos)
    const tableLoadingModulos = useSelector(state => state.convenio.loadingModulos)
    const errorModulos = useSelector(state => state.convenio.errorModulos)
    const pnbuBack = useSelector(state => state.convenio.pnbu)
    const errorPNBU = useSelector(state => state.convenio.errorPNBU)
    //Tablas:
    const [errorTablas, setErrorTablas] = useState(false)
    const [loadingTablas, setLoadingTablas] = useState(true)
    //PN Tabla
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dataPrestacionesNomencladas, setDataPrestacionesNomencladas] = useState(null)
    //PNN Tabla
    const [pagePNN, setPagePNN] = useState(0)
    const [rowsPerPagePNN, setRowsPerPagePNN] = useState(5)
    const [dataPrestacionesNoNomencladas, setDataPrestacionesNoNomencladas] = useState(null)
    //Modulos Tabla
    const [pageModulos, setPageModulos] = useState(0)
    const [rowsPerPageModulos, setRowsPerPageModulos] = useState(5)
    const [dataModulos, setDataModulos] = useState(null)
    //Cards
    const [cardArr, setCardArr] = useState([])
    //SnackBar:
    const [openSnackBar, setOpenSnackBar] = useState({ 'open': false, 'title': '', 'severity': '' });


    //Cuando carga todo, loading false. 
    useEffect(() => {
        if (dataPrestacionesNomencladas && dataPrestacionesNoNomencladas && dataModulos && pnbuBack) {
            setLoadingComponente(false)
            setLoadingTablas(false)
        }
    }, [dataPrestacionesNomencladas, dataPrestacionesNoNomencladas, dataModulos, pnbuBack])


    //Si existe algun error en el backend, seteo el errorTablas en 'true'. 
    useEffect(() => {
        if (errrorPN || errrorPNN || errorPNBU || errorModulos) {
            setErrorTablas(true)
            setOpenSnackBar({
                "open": true,
                "title": 'Se produjo un error al intentar cargar las prestaciones NBU.',
                "severity": 'error'
            })
            setLoadingComponente(false)
            setLoadingTablas(false)
        } else {
            setErrorTablas(false)
        }
    }, [errrorPN, errrorPNN, errorPNBU, errorModulos])


    //Al rerandizar la pagina la primera card queda seleccionada:
    useEffect(() => {
        if (data && data.length > 0) {
            if (historicoConvenio) {
                let arr = []
                data.forEach((item, i) => {
                    if (item.esActivo === true) {
                        setConvenioSeleccionado(item)
                        setRequest({ ...request, idConvenioActual: item.idConvenio })
                        let prueba = data.filter(item2 => item2.idConvenio !== item.idConvenio)
                        arr = [item, ...prueba]
                    }
                })
                setCardArr(arr)
            } else {
                setCardArr(data)
                setConvenioSeleccionado(data[0])
            }
        }
    }, [data])


    //Action change card: 
    const handleClickCustomCard = (item) => {
        for (let i = 0; i < data.length; i++) {
            if (item.idConvenio === data[i].idConvenio) {
                setConvenioSeleccionado(item)
                if (setRequest) setRequest({ ...request, idConvenioRestaurar: item.idConvenio })
            }
        }
        dispatch(actions.clearDataConvenio())
    }

    //LoadingTablas cuando cambia el convenio seleccioando:
    useEffect(() => {
        setLoadingTablas(true)
    }, [convenioSeleccionado])


    //Al cambiar el convenio busco PRESTACIONES-NOMENCLADAS:
    useEffect(() => {
        if (convenioSeleccionado && convenioSeleccionado.idConvenio) {
            let req = {
                idConvenio: convenioSeleccionado.idConvenio,
                offset: page * rowsPerPage,
                limit: rowsPerPage
            }
            dispatch(getPresNomencladaConvenioHistorico(req))
        }
    }, [convenioSeleccionado, page, rowsPerPage])
    //Al cambiar el convenio busco PRESTACIONES-NO-NOMENCLADAS:
    useEffect(() => {
        if (convenioSeleccionado && convenioSeleccionado.idConvenio) {
            let req = {
                idConvenio: convenioSeleccionado.idConvenio,
                offset: pagePNN * rowsPerPagePNN,
                limit: rowsPerPagePNN
            }
            dispatch(getPresNoNomencladasHistorico(req))
        }
    }, [convenioSeleccionado, pagePNN, rowsPerPagePNN])
    //Al cambiar el convenio busco PRESTACIONES-NBU:
    useEffect(() => {
        if (convenioSeleccionado && convenioSeleccionado.idConvenio) {
            let req = {
                idConvenio: convenioSeleccionado.idConvenio,
                offset: 0,
                limit: 5
            }
            dispatch(getPrestacionesNBUHistoricos(req))
        }
    }, [convenioSeleccionado])
    //Al cambiar el convenio busco MODULOS:
    useEffect(() => {
        if (convenioSeleccionado && convenioSeleccionado.idConvenio) {
            let req = {
                idConvenio: convenioSeleccionado.idConvenio,
                offset: pageModulos * rowsPerPageModulos,
                limit: rowsPerPageModulos
            }
            dispatch(getModulosHistoricos(req))
        }
    }, [convenioSeleccionado, pageModulos, rowsPerPageModulos])


    //Ordeno data segun paginacion de la tabla para PRESTACIONES-NOMENCLADAS:
    useEffect(() => {
        if (pnBack) {
            setDataSegunPaginacion(page, rowsPerPage, pnBack, setDataPrestacionesNomencladas)
        }
    }, [pnBack])
    //Ordeno data segun paginacion de la tabla para PRESTACIONES-NO-NOMENCLADAS:
    useEffect(() => {
        if (pnnBack) {
            setDataSegunPaginacion(pagePNN, rowsPerPagePNN, pnnBack, setDataPrestacionesNoNomencladas)
        }
    }, [pnnBack])
    //Ordeno data segun paginacion de la tabla para MODULOS:
    useEffect(() => {
        if (modulosBack) {
            setDataSegunPaginacion(pageModulos, rowsPerPageModulos, modulosBack, setDataModulos)
        }
    }, [modulosBack])


    //Función genérica para ordenar data según paginación de tabla:
    const setDataSegunPaginacion = (pagina, rowsPagina, back, cb) => {
        const dataRellenar = [];
        const dimension = pagina * rowsPagina
        if (back && back.cantidadTotal && back.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = back && back.objetos ? back.objetos.map(newData => {
            return { ...newData }
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (back && back.cantidadTotal && lengthData < back.cantidadTotal) {
            for (let index = lengthData; index < back.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        cb({
            cantidadTotal: back && back.cantidadTotal ? back.cantidadTotal : 0,
            objetos: [...dataRellenar, ...dataApi, ...dataRestante]
        })
    }


    //SnackBar:
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };


    return (
        <Grid container style={{ marginTop: "4px" }} spacing={4}>
            <Grid item xs={3} style={{ maxHeight: cardArr.length > 14 ? "2800px" : null, padding: '0 20px', overflow: cardArr.length > 14 ? "hidden" : null, overflowY: cardArr.length > 14 ? "scroll" : null }}>
                {cardArr && cardArr.length > 0 && cardArr.map(item => {
                    return (
                        <CustomCardConvenios
                            handleClickEditar={handleClickEditar}
                            handleClickEliminar={handleClickEliminar}
                            id={item.idConvenio}
                            convenioSeleccionado={convenioSeleccionado}
                            handleClickCustomCard={() => handleClickCustomCard(item)}
                            historicoConvenio={historicoConvenio}
                            titulo={historicoConvenio ? `Version ${item.version}` : `Se activará en ${item.diasActivacion} días.`}
                            subtitulo={item.esActivo ? "Activo" : ""}
                            carga={item.fechaCarga}
                            desde={item.fechaVigenciaDesde}
                            hasta={item.fechaVigenciaHasta}
                            icon={historicoConvenio && item.esActivo ? ClipBoardCheck : historicoConvenio === false ? ClipBoardClockOut : ClipBoardMinus}
                            setLoadingComponente={setLoadingComponente}
                            setLoadingTablas={setLoadingTablas}
                            proveedor={proveedor}
                            usuario={usuario}
                        />
                    )
                })}
            </Grid>
            <Grid item xs={9}>
                {loadingTablas ? (
                    <Grid container justify='center' alignItems='center' style={{ minHeight: '300px' }}>
                        <Loader loading={true} />
                    </Grid>
                ) : !errorTablas ?
                    <>
                        <Grid style={{ margin: '0 0 50px 0' }}>
                            <Typography className={classes.titles}>Prestaciones nomencladas</Typography>
                            {dataPrestacionesNomencladas && dataPrestacionesNomencladas.objetos && dataPrestacionesNomencladas.objetos.length > 0 ?
                                <TablasConvenio
                                    pn={true}
                                    esEditar={false}
                                    data={dataPrestacionesNomencladas}
                                    loadingDataTabla={tableLoadingPN}
                                    errorDataTabla={errrorPN}
                                    page={page}
                                    setPage={setPage}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={setRowsPerPage}
                                />
                                :
                                <Grid className={classes.cabecera}>
                                    <Typography className={classes.noData}>
                                        No hay registros para mostrar.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                        <Grid style={{ margin: '0 0 50px 0' }}>
                            <Typography className={classes.titles}>Prestaciones no nomencladas</Typography>
                            {dataPrestacionesNoNomencladas && dataPrestacionesNoNomencladas.objetos && dataPrestacionesNoNomencladas.objetos.length > 0 ?
                                <TablasConvenio
                                    pnn={true}
                                    esEditar={false}
                                    data={dataPrestacionesNoNomencladas}
                                    loadingDataTabla={tableLoadingPNN}
                                    errorDataTabla={errrorPNN}
                                    page={pagePNN}
                                    setPage={setPagePNN}
                                    rowsPerPage={rowsPerPagePNN}
                                    setRowsPerPage={setRowsPerPagePNN}
                                />
                                :
                                <Grid className={classes.cabecera}>
                                    <Typography className={classes.noData}>
                                        No hay registros para mostrar.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                        <Grid style={{ margin: '0 0 50px 0' }}>
                            <Typography className={classes.titles}>Prestaciones NBU</Typography>
                            {pnbuBack && pnbuBack.objetos && pnbuBack.objetos.length > 0 ?
                                <Grid container justify='space-between' className={classes.cabecera} style={{ marginBottom: '70px' }}>
                                    <Grid item >
                                        <Typography className={classes.textNotSelect}>
                                            {pnbuBack.cantidadTotal} prestaciones con Valor NBU: {convenioSeleccionado.valorNbu}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.iconActions} size="small" onClick={() => setDrawerNro(15)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                :
                                <Grid className={classes.cabecera}>
                                    <Typography className={classes.noData}>
                                        No hay registros para mostrar.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                        <Grid style={{ margin: '0 0 50px 0' }}>
                            <Typography className={classes.titles}>Módulos</Typography>
                            {dataModulos && dataModulos.objetos && dataModulos.objetos.length > 0 ?
                                <TablasConvenio
                                    modulos={true}
                                    esEditar={false}
                                    data={dataModulos}
                                    loadingDataTabla={tableLoadingModulos}
                                    errorDataTabla={errorModulos}
                                    setDrawerNro={setDrawerNro}
                                    setEditRow={setEditRow}
                                    page={pageModulos}
                                    setPage={setPageModulos}
                                    rowsPerPage={rowsPerPageModulos}
                                    setRowsPerPage={setRowsPerPageModulos}
                                />
                                :
                                <Grid className={classes.cabecera}>
                                    <Typography className={classes.noData}>
                                        No hay registros para mostrar.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                    </>
                    : null
                }
            </Grid>

            <CustomAlert
                message={`Version ${convenioSeleccionado && convenioSeleccionado.version} RESTAURADA.`}
                onClose={handleCloseAlert}
                variant={"filled"}
                severity="success"
                open={openAlert}
                snack={true}
            />
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />

        </Grid>
    )
}

export default Contenido
