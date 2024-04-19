import React, { useEffect, useRef, useState } from 'react'
//Mui:
import { CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
//Components:
import CustomTableContrataciones from '../../../../commons/Table/CustomTableContrataciones'
import AutoSuggest from '../../../../commons/Autosuggest/Autosuggest'
import CustomButton from '../../../../commons/Button/CustomButton'
//Icons:
import imgDelete from '../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'
import { ReactComponent as EditIcon } from "../../../../../commons/assets/IconsSolicitudesGenericas/editIcon.svg"
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'
import { setMaterialesQuirurgicos } from '../../../../../redux/actions/auditoriaMedica'

const useStyles = makeStyles({
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
})

const PedidosMaterialesQuirurgicos = (props) => {
    const { numeroAutorizacion, setDisableRechazarAprobar } = props
    const classes = useStyles(props)
    //Redux:
    const dispatch = useDispatch()
    const dataBack = useSelector(state => state.auditoriaMedica.dataMatQxAutorizacionPendiente)
    const loadingData = useSelector(state => state.auditoriaMedica.loadingMatQxAutorizacionPendiente)
    //Editar
    const [editar, setEditar] = useState(false)
    //Incluir Material:
    const [seleccionado, setSeleccionado] = useState(null)
    const [valueAutoSuggest, setValueAutoSuggest] = useState(null)
    const [opciones, setOpciones] = useState([])
    const [cantidadIncluir, setCantidadIncluir] = useState(null)
    const [errorIncluir, setErrorIncluir] = useState(false)
    const listadoMaterialesQx = useSelector(state => state.listados.listadoMaterialesQx)
    const loadingListadoMaterialesQx = useSelector(state => state.listados.loadingListadoMaterialesQx)
    const errorListadoMaterialesQx = useSelector(state => state.listados.errorListadoMaterialesQx)
    //Estados para agregar nuevos materiales
    const [test, setTest] = useState(null)
    //Editar Cantidad Row:
    const [rowId, setRowId] = useState(null)
    const [rowCantidad, setRowCantidad] = useState(null)
    const editCantidadRef = useRef()
    //Data Tabla:
    const [editedInclusiones, setEditedInclusiones] = useState([])
    const usuarioLogueado = JSON.parse(localStorage.getItem("userin"))
    const idUsuarioLogueado = usuarioLogueado.id

    //Busco el detalle de la autorización:
    useEffect(() => {
        dispatch(actions.getDataMatQxAutorizacionPendiente({ idAutorizacion: numeroAutorizacion }))
    }, [])

    //Habilito y deshabilito el botón guardar:
    useEffect(() => {
        setDisableRechazarAprobar(editar)
    }, [editar])

    //ACCIONES INCLUIR MATERIAL:
    const onInput = (value) => {
        dispatch(actions.getListadoMaterialesQx({ descripcion: value }))
        if (valueAutoSuggest) {
            setTest(null)
        } else {
            setTest(value)
        }
    }
    const mapOpciones = listadoMaterialesQx && listadoMaterialesQx.map(it => {
        return it.descripcion
    })
    const onChangeCantidadIncluir = (e) => {
        if (e.target.value > 0) setCantidadIncluir(e.target.value)
    }
    const disableIcluir = () => {
        if (!valueAutoSuggest || !cantidadIncluir || cantidadIncluir === ' ') {
            return true
        } else {
            return false
        }
    }
    const handleIncluir = () => {
        let incluirMaterial = (newMaterial, newArray) => {
            editedInclusiones && editedInclusiones.length > 0 ? setEditedInclusiones([newMaterial, ...newArray]) : setEditedInclusiones([newMaterial, ...newArray, ...dataBack])
            setErrorIncluir(false)
            setSeleccionado(false)
            setValueAutoSuggest(null)
            setCantidadIncluir(" ")
            setTest(null)
        }

        let materialSeleccionado = listadoMaterialesQx && listadoMaterialesQx.length > 0 ? listadoMaterialesQx.filter(it => it.descripcion === valueAutoSuggest)[0] : test
        let editedRepetido = materialSeleccionado && editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.filter(it => it.idMaterialQuirurgico === materialSeleccionado.codigo)[0]
        let oldRepetido = materialSeleccionado && dataBack && dataBack.length > 0 && dataBack.filter(it => it.idMaterialQuirurgico === materialSeleccionado.codigo).length > 0

        if (editedRepetido) {
            if (editedRepetido.eliminarMaterial === true) {
                let newArray = editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.filter(it => it.idMaterialQuirurgico !== materialSeleccionado.codigo)
                let newMaterial = {
                    idMaterialQuirurgico: materialSeleccionado && materialSeleccionado.codigo ? materialSeleccionado.codigo : null,
                    material: materialSeleccionado && materialSeleccionado.descripcion ? materialSeleccionado.descripcion : test,
                    cantidad: parseInt(cantidadIncluir),
                    agregarMaterial: true,
                    eliminarMaterial: null,
                }
                incluirMaterial(newMaterial, newArray)
            } else {
                setErrorIncluir(true)
            }
        } else if (oldRepetido) {
            setErrorIncluir(true)
        } else {
            let newMaterial = {
                idMaterialQuirurgico: materialSeleccionado && materialSeleccionado.codigo ? materialSeleccionado.codigo : null,
                material: materialSeleccionado && materialSeleccionado.descripcion ? materialSeleccionado.descripcion : test,
                cantidad: parseInt(cantidadIncluir),
                agregarMaterial: true,
                eliminarMaterial: null
            }
            incluirMaterial(newMaterial, editedInclusiones)
        }
    }

    //ACCIONES INTERIORES TABLA
    const enableEditarCantidadFila = (row) => {
        setRowId(row.tableData.id)
        setRowCantidad(row.cantidad)
    }
    const disableEditarCantidadFila = (row) => {
        setRowId(null)
        setRowCantidad(null)
    }
    const onChangeCantidadFila = (e, row) => {
        if (e.target.value > "0") setRowCantidad(parseInt(e.target.value))

        let editedRepetido = editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.filter(it => it.idMaterialQuirurgico === row.idMaterialQuirurgico).length > 0
        let oldRepetido = dataBack && dataBack.length > 0 && dataBack.filter(it => it.idMaterialQuirurgico === row.idMaterialQuirurgico).length > 0

        if (editedRepetido) {
            let newArr = editedInclusiones.map(it => {
                if (it.idMaterialQuirurgico !== row.idMaterialQuirurgico) {
                    return it
                } else {
                    return {
                        idMaterialQuirurgico: it && it.idMaterialQuirurgico ? it.idMaterialQuirurgico : null,
                        material: it && it.material ? it.material : test,
                        cantidad: parseInt(e.target.value),
                        eliminarMaterial: it.agregarMaterial ? null : false,
                        agregarMaterial: it.agregarMaterial ? it.agregarMaterial : false
                    }
                }
            })
            setEditedInclusiones(newArr)
        } else if (oldRepetido) {
            let oldarr = dataBack.map(it => {
                if (it.idMaterialQuirurgico !== row.idMaterialQuirurgico) {
                    return it
                } else {
                    return {
                        idMaterialQuirurgico: it && it.idMaterialQuirurgico ? it.idMaterialQuirurgico : null,
                        material: it && it.material ? it.material : test,
                        cantidad: parseInt(e.target.value),
                        eliminarMaterial: false,
                        agregarMaterial: false
                    }
                }
            })
            //Ver Mañana
            setEditedInclusiones(oldarr)
        } else {
            let newArr = [
                {
                    idMaterialQuirurgico: row && row.idMaterialQuirurgico ? row.idMaterialQuirurgico : null,
                    material: row && row.material ? row.material : test,
                    cantidad: parseInt(e.target.value),
                    eliminarMaterial: row.agregarMaterial ? null : false,
                    agregarMaterial: row.agregarMaterial ? row.agregarMaterial : false
                },
                ...editedInclusiones]
            setEditedInclusiones(newArr)
        }
    }
    let eliminarMaterial = (row) => {
        let oldRepetido = dataBack.filter(it => it.idMaterialQuirurgico === row.idMaterialQuirurgico).length > 0
        let editedRepetido = editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.filter(it => it.idMaterialQuirurgico === row.idMaterialQuirurgico).length > 0
        if (oldRepetido) {
            if (editedRepetido) {
                let newArr = editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.filter(it => it.idMaterialQuirurgico !== row.idMaterialQuirurgico)
                setEditedInclusiones([
                    {
                        idMaterialQuirurgico: row && row.idMaterialQuirurgico ? row.idMaterialQuirurgico : null,
                        material: row && row.material ? row.material : test,
                        cantidad: parseInt(row.cantidad),
                        eliminarMaterial: true,
                        agregarMaterial: null
                    }, ...newArr])
            } else {
                let newArr = [
                    {
                        idMaterialQuirurgico: row && row.idMaterialQuirurgico ? row.idMaterialQuirurgico : null,
                        material: row && row.material ? row.material : test,
                        cantidad: parseInt(row.cantidad),
                        eliminarMaterial: true,
                        agregarMaterial: null
                    },
                    ...dataBack.filter(it => it.idMaterialQuirurgico !== row.idMaterialQuirurgico)
                ]
                setEditedInclusiones([...editedInclusiones, ...newArr])
            }
        } else {
            let newArr = editedInclusiones.filter(it => it.idMaterialQuirurgico !== row.idMaterialQuirurgico)
            setEditedInclusiones(newArr)
        }
    }

    //ACCIONES EDITAR GENERAL:
    const handleCancelEditar = () => {
        setEditedInclusiones([])
        setEditar(false)
        setErrorIncluir(false)
    }
    const handleSaveEditar = () => {
        //DISPATCH SAVE
        let arr = editedInclusiones && editedInclusiones.length > 0 && editedInclusiones.map(it => {
            delete it.tableData
            return it
        })
        let req = {
            idAutorizacion: numeroAutorizacion,
            idOperadorLogueado: parseInt(idUsuarioLogueado),
            materialesQuirurgicos: arr && arr.length > 0 ? arr : []
        }
        dispatch(setMaterialesQuirurgicos(req, callback))
    }
    const callback = bool => {
        if (bool) {
            dispatch(actions.getDataMatQxAutorizacionPendiente({ idAutorizacion: numeroAutorizacion }))
            handleCancelEditar()
        } else {
            handleCancelEditar()
        }
    }
    const disableSaveEditar = () => {
        let areNewChanges = editedInclusiones && editedInclusiones.length > 0 ? true : false
        return !areNewChanges
    }

    //Columnas Tabla Materiales Quirurgicos
    const columnasTabla = [
        {
            title: "MATERIAL", field: "material", sorting: false,
            cellStyle: { color: '#505050', fontSize: '11px', width: '300px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: { color: '#747474', fontSize: '10px', minWidth: "300px" }
        },
        {
            title: "CANTIDAD", field: "cantidad", sorting: false,
            cellStyle: { color: '#505050', fontSize: '11px', maxWidth: '100px' },
            headerStyle: { color: '#747474', fontSize: '10px', maxWidth: '10px' },
            render: row => (
                <>
                    {editar && rowId !== null && rowId === row.tableData.id ?
                        <TextField
                            autoFocus={true}
                            inputRef={editCantidadRef}
                            className={classes.editCantidadInput}
                            value={rowCantidad}
                            type="number"
                            variant="outlined"
                            size="small"
                            onChange={(e) => onChangeCantidadFila(e, row)}
                            onBlur={() => disableEditarCantidadFila(row)}
                        />
                        :
                        <button className={classes.editCantidadButton} onClick={() => enableEditarCantidadFila(row)}>
                            {row.cantidad ? row.cantidad : 0}
                        </button>
                    }
                </>
            )
        },
        {
            title: editar ? 'ELIMINAR' : '', sorting: false,
            cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'center', width: '5%' },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'center' },
            render: row => (editar &&
                <img
                    style={{ cursor: 'pointer' }}
                    src={imgDelete}
                    onClick={() => eliminarMaterial(row)}
                />
            )
        }
    ]

    //ProcesarDataTabla:
    const procesarDataTabla = () => {
        let dataTabla = []

        //En caso que no haya datos en editedInclusiones (nuevos items o modificacion de lo ya existentes) muestre la tabla del back:
        if (editedInclusiones && editedInclusiones.length === 0) {
            dataTabla = dataBack
        }

        //Sino que muestre los datos de la modificacion:
        if (editedInclusiones && editedInclusiones.length > 0) {
            //En caso que haya uno eliminado se quite de la lista pero no de la request
            let arraEliminadoTrue = editedInclusiones && editedInclusiones.length > 0
                && editedInclusiones.filter(it => !it.eliminarMaterial)
            dataTabla = arraEliminadoTrue
        }

        return dataTabla
    }

    useEffect(() => 
        seleccionado && test && !valueAutoSuggest ? setValueAutoSuggest(`${test}`) : null
    , [seleccionado])

    return (
        <>
            {loadingData ?
                <Grid style={{ minWidth: 450, textAlign: 'center', marginTop: '150px' }}>
                    <CircularProgress open={true} />
                </Grid>
                :
                <Grid item xs={12} container>
                    {!editar ?
                        <Grid item container justify='flex-end'>
                            <CustomButton
                                startIcon={<EditIcon />}
                                size="small"
                                variant={'contained'}
                                label={'Editar'}
                                styleButton={{ borderRadius: 5, border: '1px solid #747474', background: 'rgba(200,0,0,0)' }}
                                styleLabel={{ color: "#747474" }}
                                onClik={() => setEditar(true)}
                            />
                        </Grid>
                        :
                        <Grid container xs={12} alignItems="flex-end" style={{ background: '#ffeebf', padding: '12px 15px 20px 15px', border: 'dashed 1px #707070' }}>
                            <Grid item xs={7} style={{ padding: '0 5px' }}>
                                <span style={{ fontSize: '12px', color: '#747474', marginBottom: '5px' }}>Material</span>
                                <AutoSuggest
                                    onInput={onInput}
                                    minType={3}
                                    list={mapOpciones}
                                    setSeleccionado={setSeleccionado}
                                    valueAutoSuggest={valueAutoSuggest}
                                    setValueAutoSuggest={setValueAutoSuggest}
                                    opciones={opciones}
                                    setOpciones={setOpciones}
                                    label={''}
                                    shrink={true}
                                    placeholder={'Ingrese min 3 caracteres'}
                                    style={{
                                        border: "1px solid #c4c4c4",
                                        borderRadius: '5px',
                                        backgroundColor: "white",
                                        height: "40px",
                                        boxSizing: 'border-box',
                                        padding: '3px 0px 0 5px',
                                        width: "220px"
                                    }}
                                    underline={true}
                                    loading={loadingListadoMaterialesQx}
                                    error={errorListadoMaterialesQx}
                                    clearEscape={false}
                                />
                            </Grid>
                            <Grid item xs={3} style={{ padding: '0 5px' }}>
                                <span style={{ fontSize: '12px', color: '#747474', marginBottom: '5px' }}>Cantidad</span>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    style={{ background: '#fff' }}
                                    value={cantidadIncluir}
                                    onChange={(e) => onChangeCantidadIncluir(e)}
                                />
                            </Grid>
                            <Grid item xs={2} style={{ padding: '0 5px' }}>
                                <CustomButton
                                    size='medium'
                                    isAction={true}
                                    onClik={handleIncluir}
                                    label={"Incluír"}
                                    variant={'contained'}
                                    color='primary'
                                    disabled={disableIcluir()}
                                />
                            </Grid>
                            {errorIncluir &&
                                <Grid item xs={12} style={{ margin: '15px 5px 0px 5px' }}>
                                    <Typography style={{ color: 'red', fontSize: 14 }}>
                                        El material ya se encuentra incluido.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <CustomTableContrataciones
                            data={procesarDataTabla() ?? []}
                            columnas={columnasTabla}
                        />
                    </Grid>
                    {editar &&
                        <Grid container justify='flex-end' style={{ marginTop: 20, gap: 5 }}>
                            <CustomButton
                                label={'Cancelar'}
                                styleButton={{ borderRadius: 20 }}
                                variant='outlined'
                                color='secondary'
                                onClik={handleCancelEditar}
                            />
                            <CustomButton
                                label={'Guardar'}
                                styleButton={{ borderRadius: 20 }}
                                variant='contained'
                                color='primary'
                                onClik={handleSaveEditar}
                                disabled={disableSaveEditar()}
                            />
                        </Grid>
                    }
                </Grid >
            }
        </>

    )
}

export default PedidosMaterialesQuirurgicos
