import React, { useEffect, useState } from 'react'
//Mui:
import { Box, CircularProgress, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
//Components:
import CustomTableContrataciones from '../../../../commons/Table/CustomTableContrataciones'
import AutoSuggest from '../../../../commons/Autosuggest/Autosuggest'
import CustomButton from '../../../../commons/Button/CustomButton'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'

const useStyles = makeStyles((theme) => ({
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
    },
    tablaMateriales: {
        height:'100%',
        maxHeight:'320px',
        overflowY:'auto'
    }
}))

const MaterialesQuirurgicos = (props) => {
    const { pedido, actualizarListadoMateriales, usuarioActivo, editMode } = props
    const classes = useStyles(props)
    const dispatch = useDispatch()
    const dataMaterialesQxPorPedido = useSelector(state => state.auditoriaMedica.dataMaterialesQxPorPedido)
    const loadingMaterialesQxPorPedido = useSelector(state => state.auditoriaMedica.loadingMaterialesQxPorPedido)
    const [seleccionado, setSeleccionado] = useState(null)
    const [valueAutoSuggest, setValueAutoSuggest] = useState(null)
    const [opciones, setOpciones] = useState([])
    const [cantidadIncluir, setCantidadIncluir] = useState(null)
    const [incluido, setIncluido] = useState(false)
    const [errorRepetido, setErrorRepetido] = useState(false)
    const [errorIncluir, setErrorIncluir] = useState(false)
    const [errorMaterialNoExiste, setErrorMaterialNoExiste] = useState(false)
    const listadoMaterialesQx = useSelector(state => state.listados.listadoMaterialesQx)
    const loadingListadoMaterialesQx = useSelector(state => state.listados.loadingListadoMaterialesQx)
    const errorListadoMaterialesQx = useSelector(state => state.listados.errorListadoMaterialesQx)
    const [dataTabla, setDataTabla] = useState([])  

    useEffect(() => {
        getDataMaterialesQxPorPedido(pedido)
    }, [,incluido])

    useEffect(() => {
        if(dataMaterialesQxPorPedido && dataMaterialesQxPorPedido.length){
            setDataTabla(dataMaterialesQxPorPedido)
            actualizarListadoMateriales(dataMaterialesQxPorPedido)
        }
    }, [dataMaterialesQxPorPedido])

    //Get Materiales Qx por Pedido:
    const getDataMaterialesQxPorPedido = (pedido) => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar cargar los materiales quirúrgicos.'
                }))
            }
        }
        let req = {
            idAutorizacion : pedido.idAutorizacion
        }
        dispatch(actions.getDataMaterialesQxPorPedido(req, errorCallback))
    }
    
    //ACCIONES INCLUIR MATERIAL:
    const onInput = (value) => {
        dispatch(actions.getListadoMaterialesQx({ descripcion: value }))
    }

    const mapOpciones = listadoMaterialesQx && listadoMaterialesQx.map(it => {
        return it.descripcion
    })

    const onChangeCantidadIncluir = (e) => {
        if (e.target.value > 0) setCantidadIncluir(e.target.value)
    }

    const disableIcluir = () => {
        if (!seleccionado || !cantidadIncluir || cantidadIncluir === ' ') return true
        else return false
    }

    const handleIncluir = () => {
        let materialSeleccionado = listadoMaterialesQx && listadoMaterialesQx.length > 0 && listadoMaterialesQx.filter(it => it.descripcion === valueAutoSuggest)[0]
        let isRepetido = dataTabla && dataTabla.length > 0 && dataTabla.filter(it => it.idMaterialQuirurgico === materialSeleccionado.codigo).length > 0

        setErrorRepetido(false)
        setErrorIncluir(false)
        setIncluido(false)
        setErrorMaterialNoExiste(false)

        if(!materialSeleccionado){
            setErrorMaterialNoExiste(true);
            setCantidadIncluir(null)
        }else if(isRepetido){
            setErrorRepetido(true)
            setCantidadIncluir(null)
        }else{
            let req = {
                idAutorizacion: pedido.idAutorizacion,
                idOperadorLogueado: parseInt(usuarioActivo.id),
                materialesQuirurgicos: [{
                    idMaterialQuirurgico: materialSeleccionado.codigo,
                    material: materialSeleccionado.descripcion,
                    cantidad: parseInt(cantidadIncluir),
                    agregarMaterial: true
                }]
            }
            dispatch(actions.setMaterialesQuirurgicos(req, callback))
            setErrorRepetido(false) 
            setErrorMaterialNoExiste(false); 
        }
    }

    const callback = bool => {
        console.log(bool)
        if (bool) {
            setErrorIncluir(false)
            setIncluido(true)
            setCantidadIncluir(null)
        } else {
            setErrorIncluir(true)
            setIncluido(false)
        }
    }

    //ACCIONES INTERIORES TABLA
    const onChangeCantidadFila = (e, row) => {
        if(e.target.value >= 0){
            let cantidad = parseInt(e.target.value)
            let idMaterial = row.idMaterialQuirurgico
            let newArr = dataTabla.map(it=>{
                if(it.idMaterialQuirurgico === idMaterial){
                    return {...it, validado: cantidad}
                }else{
                    return it
                }
            })
            setDataTabla(newArr)
            actualizarListadoMateriales(newArr)
        }
    }

    //Columnas Tabla Materiales Quirurgicos
    const columnasTabla = editMode ? [
        {
            title: "MATERIAL", field: "material", sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px'},
            cellStyle: {color:'#505050', fontSize:'11px', width:'300px', overflow:'hidden', textOverflow:'ellipsis'},
        },
        {
            title: "CANTIDAD AUTORIZADA", field: "cantidad", sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px', textAlign:'center'},
            cellStyle: { color: '#505050', fontSize: '11px', textAlign: 'center' },
        },
        {
            title: 'CANTIDAD VALIDADA', sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px', textAlign:'center'},
            cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'center' },
            render: row => (
                <TextField
                    className={classes.editCantidadInput}
                    value={row.validado}
                    defaultValue={0}
                    type="number"
                    variant="outlined"
                    size="small"
                    onChange={(e) => onChangeCantidadFila(e, row)}
                    onKeyDown={(e) => e.preventDefault()}
                    inputProps={{
                        min: '0'
                    }}
                />
            )
        }
    ] : [
        {
            title: "MATERIAL", field: "material", sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px'},
            cellStyle: {color:'#505050', fontSize:'11px', width:'300px', overflow:'hidden', textOverflow:'ellipsis'},
        },
        {
            title: "CANTIDAD AUTORIZADA", field: "cantidad", sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px', textAlign:'center'},
            cellStyle: { color: '#505050', fontSize: '11px', textAlign: 'center' },
        },
        {
            title: 'CANTIDAD VALIDADA', field: "validado", sorting: false,
            headerStyle: {color:'#747474', fontSize:'10px', textAlign:'center'},
            cellStyle: { color: '#505050', fontSize: '11px', textAlign: 'center' },
            render: row => (row && row.validado ? row.validado : 0)
        }
    ]

    return (
        <>
            {loadingMaterialesQxPorPedido ?
                <Grid style={{ minWidth: 450, textAlign: 'center', marginTop: '150px' }}>
                    <CircularProgress open={true} />
                </Grid>
            :
                <>
                    {editMode && 
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
                                />
                            </Grid>
                            <Grid item xs={3} style={{ padding: '0 5px' }}>
                                <span style={{ fontSize: '12px', color: '#747474', marginBottom: '5px' }}>Cantidad</span>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={0}
                                    style={{ background: '#fff' }}
                                    value={cantidadIncluir}
                                    onChange={(e) => onChangeCantidadIncluir(e)}
                                    onKeyDown={(e) => e.preventDefault()}
                                    inputProps={{
                                        min: '0'
                                    }}
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
                            {incluido &&
                                <Grid item xs={12} style={{ margin: '15px 5px 0px 5px' }}>
                                    <Typography style={{ color: 'green', fontSize: 14 }}>
                                        Material quirurgico incluido correctamente.
                                    </Typography>
                                </Grid>
                            }
                            {errorIncluir &&
                                <Grid item xs={12} style={{ margin: '15px 5px 0px 5px' }}>
                                    <Typography style={{ color: 'red', fontSize: 14 }}>
                                        Ocurrió un error al intentar incluir el material quirurgico.
                                    </Typography>
                                </Grid>
                            }
                            {errorRepetido &&
                                <Grid item xs={12} style={{ margin: '15px 5px 0px 5px' }}>
                                    <Typography style={{ color: 'red', fontSize: 14 }}>
                                        El material ya se encuentra incluido.
                                    </Typography>
                                </Grid>
                            }
                            {errorMaterialNoExiste &&
                                <Grid item xs={12} style={{ margin: '15px 5px 0px 5px' }}>
                                    <Typography style={{ color: 'red', fontSize: 14 }}>
                                        El material que quiere incluir no existe.
                                    </Typography>
                                </Grid>
                            }
                        </Grid>
                    }

                    <Grid item xs={12} className={editMode ? classes.tablaMateriales : null}>
                        <CustomTableContrataciones
                            data={dataTabla}
                            columnas={columnasTabla}
                        />
                    </Grid>
                </>
            }
        </>
    )
}

export default MaterialesQuirurgicos