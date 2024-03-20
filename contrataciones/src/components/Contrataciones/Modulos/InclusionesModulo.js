import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { PRESTACION_NO_ENCONTRADA } from '../../../Utils/const';
import * as actions from '../../../redux/actions/index';
//Material:
import { Typography, Divider, Grid, TextField, makeStyles, CircularProgress } from '@material-ui/core';
//Tippy:
import { Tooltip } from 'react-tippy';
//Components:
import AutoSuggest from '../../commons/Autosuggest/Autosuggest';
import CustomButton from '../../commons/Button/CustomButton';
import CustomSelect from '../../commons/Select/customSelect';
import CustomTable from '../../commons/Table/CustomTable';
import CustomText from '../../commons/TextField/CustomText';
import CustomTypography from '../../commons/Typography/CustomTypography';
import imgDelete from '../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'


const useStyles = makeStyles((theme) => ({
    inclusiones: {
        backgroundColor: 'rgba(255, 205, 113, 0.25)',
        padding: '12px 81px 28px 24px',
        margin: '5px',
        border: 'dashed 1px #707070'
    },
    container: {
        border: '1px solid #dadce0',
        padding: '10px',
    },
    customText: {
        marginBottom: "2px"
    },
    editCantidadButton: {
        backgroundColor: 'transparent',
        border: 'none',
        width: "70px",
        textAlign: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    editCantidadInput: {
        width: "70px",
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                border: "2px solid #1473e6",
            },
        },
    },
    editCantidadInputNaN: {
        width: "70px",
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                border: "2px solid red",
            },
        },
    },
    confirmarEliminar: {
        padding: '15px',
        margin: '0',
        width: '350px',
        border: '1px solid red',
        backgroundColor: 'white'
    }
}))


const DrawerModulo = (props) => {
    const { request, setRequest, incluido, setIncluido, modoEditarModulo, modoCrearModulo, navigateBack,
        newInclusiones, setNewInclusiones, oldInclusiones, setOldInclusiones, openSnackBar, setOpenSnackBar } = props;
    const classes = useStyles(props);
    //Redux:
    const dispatch = useDispatch();
    const tipoPrestacionesData = useSelector(state => state.moduloConvenio.tipoPrestaciones)
    const prestacionesNomencladasOptions = useSelector(state => state.prestaciones.prestacionesNomencladas)
    const prestacionesNoNomencladasOptions = useSelector(state => state.prestaciones.prestacionesNoNomencladas)
    const loadingListarPrestaciones = useSelector(state => state.prestaciones.loadingListarPrestaciones)
    const errorListarPrestaciones = useSelector(state => state.prestaciones.errorListarPrestaciones)
    const inclusionesModulo = useSelector(state => state.moduloConvenio.inclusionesModulo)
    const loadingInclusionesModulo = useSelector(state => state.moduloConvenio.loadingInclusionesModulo);
    //Campos Form:
    const [tipoPrestacion, setTipoPrestacion] = useState(null)
    const [prestacionSeleccionada, setPrestacionSeleccionada] = useState(null);
    const [cantidad, setCantidad] = useState(null)
    //Tabla:
    const [incluir, setIncluir] = useState(null)
    //Autosuggest:
    const [prestacionesOptions, setPrestacionesOptions] = useState([]);
    const [isSelected, setIsSelected] = useState(false)
    const [opciones, setOpciones] = useState([])
    //Editar Cantidad de inclusiones:
    const [rowId, setRowId] = useState(null);
    const [rowCantidad, setRowCantidad] = useState(null);
    const editCantidadRef = useRef();
    const [errorNaN, setErrorNaN] = useState(false);


    //Busco tiposPrestaciones e inclusionesModulo si no estoy volviendo del drawer siguiente:
    useEffect(() => {
        if (!navigateBack) {
            dispatch(actions.getListadoTipoPrestaciones())
            if (request && request.idModulo) {
                dispatch(actions.getInclusionesModulo({ "idModulo": request.idModulo }));
            }
        }
    }, [])


    //Seteo Old Inclusiones:
    useEffect(() => {
        if (!navigateBack && modoEditarModulo) {
            setOldInclusiones(
                inclusionesModulo.map(inclusion => {
                    return {
                        "idPrestacion": inclusion.idPrestacionNomeclada !== null ? inclusion.idPrestacionNomeclada : inclusion.idPrestacionNoNomenclada,
                        "codigo": inclusion.codigo,
                        "descripcion": inclusion.descripcion,
                        "codigoDescripcion": `${inclusion.codigo} ${inclusion.descripcion}`,
                        "cantidad": inclusion.cantidad,
                        "tipoPrestacionDescripcion": (inclusion.idPrestacionNomeclada !== null) ? "Nomenclada" : "No Nomenclada",
                        "tipoPrestacion": (inclusion.idPrestacionNomeclada !== null) ? 1 : 2,
                    }
                })
            )
        }
    }, [inclusionesModulo])


    //3 caracteres input:
    const onInput = (value) => {
        let req = {
            "criterioBusqueda": value,
        }
        if (tipoPrestacion && tipoPrestacion === 1) {
            dispatch(actions.listarPrestacionesNomencladas(req))
        }
        if (tipoPrestacion && tipoPrestacion === 2) {
            dispatch(actions.listarPrestacionesNoNomencladas(req))
        }
    }


    //Actualizo las Opciones del Autosuggest:
    useEffect(() => {
        if (prestacionesNomencladasOptions) {
            setPrestacionesOptions(prestacionesNomencladasOptions.objetos)
        }
    }, [prestacionesNomencladasOptions])
    useEffect(() => {
        if (prestacionesNoNomencladasOptions) {
            setPrestacionesOptions(prestacionesNoNomencladasOptions.objetos)
        }
    }, [prestacionesNoNomencladasOptions])


    //Mapea el codigo y la descripción de las opciones para mostrar en el Autosuggest:
    const mapPrestaciones =
        prestacionesOptions && prestacionesOptions.length > 0 ?
            prestacionesOptions.map(data => { return data.codigo + ' ' + data.descripcion })
            : null;


    //OnChange Inclusiones:
    const handleChangeSelectTipoPrestacion = (e) => {
        setTipoPrestacion(e.target.value)
        setPrestacionesOptions([])
        setPrestacionSeleccionada(null)
        setCantidad(0)
        setIncluir({
            "tipoPrestacion": e.target.value,
            "tipoPrestacionDescripcion": e.target.value === 1 ? "Nomenclada" : "No Nomenclada",
        })
    }
    useEffect(() => {
        if (prestacionSeleccionada) {
            let prestacionFiltrada = prestacionesOptions.filter(it => it.codigo === prestacionSeleccionada.split(" ")[0])[0]
            if (prestacionFiltrada) {
                let existeEnOld = oldInclusiones.filter(it => it.idPrestacion === prestacionFiltrada.idPrestacion).length > 0
                let existeEnNew = newInclusiones.filter(it => it.idPrestacion === prestacionFiltrada.idPrestacion).length > 0
                if (existeEnNew || existeEnOld) {
                    setOpenSnackBar({
                        open: true,
                        severity: 'error',
                        title: <div>{`La prestación ${prestacionFiltrada.codigo} ya está incluida en el módulo.`}</div>
                    })
                    setPrestacionSeleccionada(null)
                } else {
                    setIncluir({
                        ...incluir,
                        "codigoDescripcion": `${prestacionFiltrada.codigo} ${prestacionFiltrada.descripcion}`,
                        "idPrestacion": prestacionFiltrada.idPrestacion,
                        "codigo": `${prestacionFiltrada.codigo}`,
                    })
                }
            }
        }
    }, [prestacionSeleccionada])

    const onChangeCantidad = (e) => {
        setCantidad(e.target.value)
            setIncluir({
                ...incluir,
                "cantidad": e.target.value
            })
    }


    //Inlcuir Inclusión:
    const onClickIncluir = () => {
        setIncluido(true)
        setNewInclusiones([
            ...newInclusiones,
            incluir
        ])
        setTipoPrestacion(null)
        setPrestacionSeleccionada(null)
        setCantidad(0)
        setRequest({
            ...request,
            "inclusiones": [
                ...request.inclusiones, {
                    "idPrestacion": incluir.idPrestacion,
                    "tipoPrestacion": incluir.tipoPrestacion,
                    "cantidad": parseInt(incluir.cantidad),
                    "codigo": incluir.codigo,
                }
            ]
        })
    }


    //Eliminar Inclusión:
    const confirmarEliminar = (row) => {
        return (
            <Grid xs={12} container className={classes.confirmarEliminar}>
                <Grid item xs={1}>
                    <img src={imgDelete} />
                </Grid>
                <Grid item xs={11}>
                    <Typography style={{ fontSize: '15px', textAlign: 'left', margin: '2px 0 0 5px' }}>
                        Eliminar
                    </Typography>
                    <Typography style={{ fontSize: '14px', textAlign: 'left', margin: '10px 0px' }}>
                        ¿Desea eliminar la prestación {row.codigo.length > 8 ? "" + row.codigo.substring(0, 9) + "..." : row.codigo}?
                    </Typography>
                    <Grid xs={12} container justify='flex-end'>
                        <button
                            style={{ border: 'none', backgroundColor: 'transparent', margin: '20px 0 0 0', color: 'red', cursor: 'pointer' }}
                            onClick={() => onClickEliminarIncluida(row)}
                        >Eliminar</button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
    const onClickEliminarIncluida = (row) => {
        if (modoCrearModulo) {
            setNewInclusiones(newInclusiones && newInclusiones.filter(it => it.idPrestacion !== row.idPrestacion))
            setRequest({
                ...request,
                "inclusiones": request.inclusiones.filter(it => it.idPrestacion !== row.idPrestacion)
            })
        }
        if (modoEditarModulo) {
            //Caso sea una prestación recien incluida.
            if (newInclusiones && newInclusiones.filter(it => it.idPrestacion === row.idPrestacion).length > 0) {
                setNewInclusiones(newInclusiones && newInclusiones.filter(it => it.idPrestacion !== row.idPrestacion))
                setRequest({
                    ...request,
                    "inclusiones": request.inclusiones.filter(it => it.idPrestacion !== row.idPrestacion)
                })
            //Caso sea una prestación ya guardada en modulo y cuya cantidad fue editada.
            } else if (request.inclusiones && request.inclusiones.filter(it => it.idPrestacion === row.idPrestacion).length > 0){
                setOldInclusiones(oldInclusiones && oldInclusiones.filter(it => it.idPrestacion !== row.idPrestacion))
                setRequest({
                    ...request,
                    "inclusiones": [
                        ...request.inclusiones.filter(it => it.idPrestacion !== row.idPrestacion),
                        {codigo: row.codigo, eliminarPrestacion: true, idPrestacion: row.idPrestacion, tipoPrestacion: row.tipoPrestacion}
                    ]
                })
            //Caso sea una prestación ya guardada en modulo y cuya cantidad no fue editada.
            } else {
                setOldInclusiones(oldInclusiones && oldInclusiones.filter(it => it.idPrestacion !== row.idPrestacion))
                setRequest({
                    ...request,
                    "inclusiones": [
                        ...request.inclusiones,
                        { "idPrestacion": row.idPrestacion, "tipoPrestacion": row.tipoPrestacion, "eliminarPrestacion": true, "codigo": row.codigo }
                    ]
                })
            }
        }
    }


    //Change Cantidad Inclusión:
    const selectRow = (row) => {
        setRowId(row.tableData.id)
        setRowCantidad(row.cantidad)
    }
    const onChangeCantidadEdit = (e) => {
        if (e.target.value !== "0") setRowCantidad(e.target.value)
        setTimeout(() => { editCantidadRef.current.focus() }, 50)
    }
    const onSaveCantidadEdit = (row, e) => {
        if (e.target.value) {
            //Caso sea una prestación recien incluida.
            let newArr = []
            if (newInclusiones && newInclusiones.filter(it => it.idPrestacion === row.idPrestacion).length > 0) {
                newInclusiones.forEach(it => {
                    if (it.idPrestacion !== row.idPrestacion) newArr.push(it)
                    else newArr.push({ ...row, "cantidad": parseInt(rowCantidad) })
                })
                setNewInclusiones(newArr)
                //Caso sea una prestación ya guardada en modulo.
            } else {
                oldInclusiones.forEach(it => {
                    if (it.idPrestacion !== row.idPrestacion) newArr.push(it)
                    else newArr.push({ ...row, "cantidad": parseInt(rowCantidad) })
                })
                setOldInclusiones(newArr)
            }
            //Seteo la request:
            setRequest({
                ...request,
                "inclusiones": [
                    ...(request.inclusiones.filter(it => it.idPrestacion !== row.idPrestacion)),
                    {
                        "idPrestacion": row.idPrestacion,
                        "tipoPrestacion": row.idTipoPrestacion ? row.idTipoPrestacion : row.tipoPrestacion,
                        "cantidad": parseInt(rowCantidad),
                        "codigo": row.codigo
                    }
                ]
            })
            setRowId(null)
            setRowCantidad(null)
            setErrorNaN(false)
        } else {
            setErrorNaN(true)
            setTimeout(() => { editCantidadRef.current.focus() }, 50)
        }
    }


    //Tabla inclusiones
    const headerTabla = [
        {
            title: "TIPO PRÁCTICA",
            field: "tipoPrestacionDescripcion",
            cellStyle: { color: '#505050', fontSize: '12px', textAlign: 'left', width: '20%', height: '50px' },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'left' },
        },
        {
            title: "CÓDIGO Y DESCRIPCIÓN",
            field: "codigoDescripcion",
            cellStyle: { color: '#505050', fontSize: '12px', textAlign: 'left', maxWidth: '350px', overflow: 'hidden', textOverflow: "ellipsis" },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'left' },
        },
        {
            title: "CANTIDAD",
            field: "cantidad",
            cellStyle: { color: '#505050', fontSize: '12px', alignContent: 'center', width: '15%', },
            headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'center' },
            render: row => (
                <>
                    {rowId !== null && rowId === row.tableData.id ?
                        <TextField
                            autoFocus={true}
                            inputRef={editCantidadRef}
                            className={errorNaN ? classes.editCantidadInputNaN : classes.editCantidadInput}
                            value={rowCantidad}
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={(e) => onChangeCantidadEdit(e)}
                            onBlur={(e) => onSaveCantidadEdit(row, e)}
                            onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9) }}
                        />
                        :
                        <button className={classes.editCantidadButton} onClick={() => selectRow(row)}>
                            {row.cantidad ? row.cantidad : 0}
                        </button>
                    }
                </>
            ),
        },
        {
            title: "ELIMINAR",
            cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'center', width: '5%' },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'center' },
            render: row => (
                <Tooltip
                    position="left"
                    theme="light"
                    title="Mas Acciones"
                    trigger="click"
                    interactive="true"
                    html={confirmarEliminar(row)}
                >
                    <img style={{ cursor: 'pointer' }} src={imgDelete} />
                </Tooltip>
            )
        },
    ]


    return (
        <Grid container xs={12} spacing={2} className={classes.container}>
            <Grid item xs={12}>
                <CustomTypography text='Inclusiones *' variant='h6' />
                <Divider />
            </Grid>
            <Grid container xs={12} alignItems="bottom" className={classes.inclusiones} spacing={2} >
                <Grid item xs={4}>
                    <CustomSelect
                        titulo={'Seleccionar tipo'}
                        data={tipoPrestacionesData}
                        variant={'outlined'}
                        height='42px'
                        estilo={true}
                        fullwidth={true}
                        handleChangeSelect={(e) => handleChangeSelectTipoPrestacion(e)}
                        val={tipoPrestacion ? tipoPrestacion : ""}
                    />
                </Grid>
                <Grid item xs={5}>
                    <span style={{ fontSize: '12px', color: '#747474', margin: "2px" }}>{"Prestación"}</span>
                    <AutoSuggest
                        onInput={onInput}
                        minType={3}
                        list={mapPrestaciones}
                        setSeleccionado={setIsSelected}
                        valueAutoSuggest={prestacionSeleccionada}
                        setValueAutoSuggest={setPrestacionSeleccionada}
                        label={''}
                        shrink={true}
                        opciones={opciones}
                        setOpciones={setOpciones}
                        placeholder={'Ingrese min 3 caracteres'}
                        style={{
                            marginTop: "5px",
                            border: "1px solid #dadce0",
                            backgroundColor: "white",
                            height: "40px",
                            boxSizing: 'border-box',
                            padding: '3px 0px 0 5px',
                        }}
                        underline={true}
                        disabledAutosuggest={tipoPrestacion === null ? true : false}
                        loading={loadingListarPrestaciones}
                        error={errorListarPrestaciones}
                        textoError={PRESTACION_NO_ENCONTRADA}
                    />
                </Grid>
                <Grid item xs={2}>
                    <span style={{ fontSize: '12px', color: '#747474', margin: "2px" }}>{"Cantidad"}</span>
                    <CustomText
                        label={''}
                        id={'cantidad'}
                        value={cantidad}
                        variant='outlined'
                        type='number'
                        maxlenght={9}
                        style={{ marginTop: '5px' }}
                        onChange={(e) => onChangeCantidad(e)}
                        disabled={tipoPrestacion === null ? true : false}
                    />
                </Grid>
                <Grid item xs={1} style={{ display: "flex", alignItems: "center" }} >
                    <CustomButton
                        size='medium'
                        isAction={true}
                        onClik={() => onClickIncluir()}
                        label={"Incluír"}
                        disabled={!(incluir
                            && incluir.tipoPrestacion
                            && incluir.codigoDescripcion
                            && prestacionSeleccionada != null
                            && incluir.cantidad && incluir.cantidad !== "0")}
                        variant={'contained'}
                        color='primary' />
                </Grid>
            </Grid>
            {modoCrearModulo ?
                (newInclusiones && newInclusiones.length > 0 ?
                    <Grid item xs={12}>
                        <CustomTable
                            data={newInclusiones}
                            columnas={headerTabla}
                            verPaginacion={false}
                        />
                    </Grid>
                    : null
                )
                : modoEditarModulo ?
                    (loadingInclusionesModulo ?
                        <Grid container xs={12} justify="center" style={{ margin: '50px' }}>
                            <CircularProgress />
                        </Grid>
                        : oldInclusiones && oldInclusiones.length > 0 || newInclusiones && newInclusiones.length > 0 ?
                            <Grid item xs={12}>
                                <CustomTable
                                    data={[...oldInclusiones, ...newInclusiones]}
                                    columnas={headerTabla}
                                    verPaginacion={false}
                                />
                            </Grid>
                            : null
                    )
                    : null
            }
        </Grid>
    )
}

export default DrawerModulo;