import React, { useEffect, useState } from 'react'
import { PROVEEDOR_NO_ENCONTRADO } from '../../../../Utils/const'

//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../redux/actions/'
//Material:
import { Typography, Grid, Divider, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Add, Delete } from '@material-ui/icons'
//Componentes:
import CustomButton from '../../../commons/Button/CustomButton'
import AutoSuggest from '../../../commons/Autosuggest/Autosuggest'
import CustomTableContrataciones from '../../../commons/Table/CustomTableContrataciones'
import BuscadorContrataciones from '../../../commons/Buscador/BuscadorContrataciones'

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '30px',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '15px 0',
        boxSizing: 'borderBox'
    },
    boxMargins: {
        margin: '15px 20px'
    },
    iconAction: {
        width: '40px',
        height: '40px',
        margin: '0 5px',
        padding: '0',
        border: '1px solid grey',
        borderRadius: '15%',
    },
    resultadosHeader: {
        margin: '15px 0',
        maxHeight: '100px',
        backgroundColor: '#f4f4f4',
        padding: '15px 25px'
    }
}))

const CostoExtra = props => {
    const { listadoCostosExtra, setListadoCostosExtra } = props
    const classes = useStyles()
    const [addCostoExtra, setAddCostoExtra] = useState(false)
    const [showBotonAplicar, setShowBotonAplicar] = useState(false)
    //Autosuggest:
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    const [proveedor, setProveedor] = useState(null)
    //Redux:
    const dispatch = useDispatch()
    const proveedoresConvenio = useSelector(state => state.proveedor.proveedoresConvenio)
    const loadingProveedoresConvenio = useSelector(state => state.proveedor.loadingProveedoresConvenio)
    const errorProveedoresConvenio = useSelector(state => state.proveedor.errorProveedoresConvenio)
    const prestacionesProveedor = useSelector(state => state.prestaciones.prestacionesProveedor)
    const loadingPrestacionesProveedor = useSelector(state => state.prestaciones.loadingPrestacionesProveedor)
    const errorPrestacionesProveedor = useSelector(state => state.prestaciones.errorPrestacionesProveedor)
    //Tabla:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dataSelect, setDataSelect] = useState([])
    const [criterioBusqueda, setCriterioBusqueda] = useState(null)


    //3 caracteres input:
    const onInputAutosuggest = (value) => {
        let req = { "razonSocialOnombreCorto": value }
        dispatch(actions.fetchProveedoresConvenioActivo(req))
    }

    //Mapea el codigo y la descripción de las opciones para mostrar en el Autosuggest:
    const mapProveedores =
        proveedoresConvenio && proveedoresConvenio.length > 0 ?
            proveedoresConvenio.map(data => { return data.razonSocial })
            : null;

    //Filtra el proveedor seleccionado entre las opciones. 
    useEffect(() => {
        if(proveedorSeleccionado === null) {
            setProveedor(null)
            dispatch(actions.clearPrestacionesProveedor())
        }
        if (proveedorSeleccionado && proveedoresConvenio) {
            let proveedorFiltrado = proveedoresConvenio.filter(it => it.razonSocial === proveedorSeleccionado)
            if (proveedorFiltrado && proveedorFiltrado.length > 0) {
                setProveedor(proveedorFiltrado[0])
                dispatch(actions.fetchPrestacionesProveedor({idProveedor: proveedorFiltrado[0].idProveedor}))
            } else {
                setProveedor(null)
                dispatch.apply(actions.clearPrestacionesProveedor())
            }
        }
        setDataSelect([])
    }, [proveedorSeleccionado])

    //Procesar prestaciones de un proveedor para pasar a la tabla: 
    const procesarPrestacionesProveedor = () => {
        let newListado = listadoCostosExtra.length > 0 ? listadoCostosExtra.filter(it=>it.eliminarCostoExtra !== true) : []
        let newOptions = []
        
        if(prestacionesProveedor && prestacionesProveedor.length > 0){
            prestacionesProveedor.forEach(prestacion => {
                if(newListado.filter(it => it.idPrestacion === prestacion.idPrestacion).length === 0){
                    newOptions.push(prestacion)
                }
            })
        }

        let res = [...newListado, ...newOptions]
        if(criterioBusqueda){
            res = res.filter(it => it.codigoDescripcion.toLowerCase().includes(criterioBusqueda.toLowerCase()))
        }

        return res
    }

    //Habilito el botón "Agregar": 
    useEffect(()=>{
        if(dataSelect && dataSelect.length > 0){
            setShowBotonAplicar(true)
        }else{
            setShowBotonAplicar(false)
        }
    },[dataSelect])

    //On click 'Agregar' agregar prestaciones
    const handleAgregarPrestaciones = () => {
        if(dataSelect && dataSelect.length > 0){
            let newListado = [...listadoCostosExtra]
            dataSelect.map(it => {
                if(listadoCostosExtra.filter(pres => pres.idPrestacion === it.idPrestacion).length === 0){
                    newListado.push({ ...it, precio: parseFloat(it.precio).toFixed(2), disableSelection: true })
                }else{
                    newListado = [
                        ...newListado.filter(pres => pres.idPrestacion !== it.idPrestacion),
                        {...it, precio: parseFloat(it.precio).toFixed(2), eliminarCostoExtra: false}
                    ]
                }
            })
            setListadoCostosExtra(newListado)
        }
        setAddCostoExtra(false)
        setProveedor(null)
        setProveedorSeleccionado(null)
        setDataSelect([])
        setCriterioBusqueda(null)
        dispatch(actions.clearPrestacionesProveedor())
    }
    const handleCancelarAgregar = () => {
        setAddCostoExtra(false)
        setProveedor(null)
        setProveedorSeleccionado(null)
        setDataSelect([])
        setCriterioBusqueda(null)
        dispatch(actions.clearPrestacionesProveedor())
    }

    //handleBuscar prestaciones de un proveedor seleccionado:
    const handleBuscar = (e) => {
        setCriterioBusqueda(e)
    }

    //Eliminar Costo Extra:
    const eliminarCostoExtra = (row) => {
        setListadoCostosExtra([
            ...listadoCostosExtra.filter(it => it.idPrestacion !== row.idPrestacion),
            {...row, eliminarCostoExtra: true}
        ])
    }

    return (
        <Grid xs={12} className={classes.container} >
            <Grid container xs={11} justify='space-between' alignItems='flex-end' className={classes.boxMargins}>
                <Grid item >
                    <Typography style={{ fontSize: '18px', fontWeight: '600' }}>Costos extras</Typography>
                </Grid>
                <Grid item>
                    <CustomButton
                        item
                        label='Agregar costo extra'
                        startIcon={<Add />}
                        variant='outlined'
                        onClik={() => setAddCostoExtra(!addCostoExtra)}
                    />
                </Grid>
            </Grid>
            <Divider className={classes.boxMargins} />
            {addCostoExtra ?
                <>
                    <Grid xs={12} className={classes.boxMargins}>
                        <span style={{ fontSize: '12px', color: '#747474', margin: "2px" }}>
                            Buscar proveedor con convenio activo
                        </span>
                        <AutoSuggest
                            onInput={onInputAutosuggest}
                            minType={3}
                            list={mapProveedores}
                            setSeleccionado={setIsSelected}
                            valueAutoSuggest={proveedorSeleccionado}
                            setValueAutoSuggest={setProveedorSeleccionado}
                            label={''}
                            shrink={true}
                            placeholder={'Ingrese min 3 caracteres'}
                            style={{
                                marginTop: "10px",
                                border: "1px solid #dadce0",
                                borderRadius: "10px",
                                minWidth: '600px',
                                width: '100%',
                                height: "40px",
                                boxSizing: 'border-box',
                                padding: '3px 10px 0 10px',
                            }}
                            underline={true}
                            stopAutoHighlight={false}
                            loading={loadingProveedoresConvenio}
                            error={errorProveedoresConvenio}
                            textoError={PROVEEDOR_NO_ENCONTRADO}
                        />
                    </Grid>
                    {proveedor || (listadoCostosExtra && listadoCostosExtra.length > 0) ?
                        <>
                            <Grid container xs={12} justify='space-between' alignItems='center' className={classes.resultadosHeader}>
                                <Grid item>
                                    <Typography>Lista de prestaciones</Typography>
                                </Grid>
                                <Grid item>
                                    <BuscadorContrataciones
                                        onClick={e => handleBuscar(e)}
                                        placeholder='Buscar'
                                    />
                                </Grid>
                            </Grid>
                            <Grid xs={11} className={classes.boxMargins} >
                                <CustomTableContrataciones
                                    data={procesarPrestacionesProveedor()}
                                    cantTotal={procesarPrestacionesProveedor().length}
                                    columnas={[
                                        {
                                            title: 'CÓDIGO Y DESCRIPCIÓN',
                                            field: "codigoDescripcion",
                                            cellStyle: { minWidth: '450px', maxWhidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis' },
                                        },
                                        {
                                            title: 'PRECIO',
                                            field: "precio",
                                            headerStyle: { textAlign: 'center' },
                                            cellStyle: { minWidth: '100px', maxWhidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' },
                                            render: row => `$${ isNaN(parseFloat(row.precio)) ? '0.00' : parseFloat(row.precio).toFixed(2)}`
                                        },
                                    ]}
                                    //Selection: 
                                    selection={true}
                                    dataSelect={dataSelect}
                                    setDataSelect={setDataSelect}
                                    disableSelection={true}
                                    //Pagination: 
                                    pagination={true}
                                    page={page} setPage={setPage}
                                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                                    paginationWidth={true}
                                    //Others:
                                    noSorting={true}
                                    loading={loadingPrestacionesProveedor}
                                />
                            </Grid>
                        </>
                        : null
                    }
                    <Grid container xs={11} justify='flex-end' spacing={2} className={classes.boxMargins}>
                        <Grid item>
                            <CustomButton
                                label='Cancelar'
                                onClik={handleCancelarAgregar}
                                size='small'
                            />
                        </Grid>
                        {showBotonAplicar ?
                            <Grid item>
                                <CustomButton
                                    label='Agregar'
                                    variant='contained'
                                    onClik={handleAgregarPrestaciones}
                                    color='primary'
                                    size='small'
                                />
                            </Grid>
                            : null
                        }
                    </Grid>
                </>
                :
                <Grid xs={12} className={classes.boxMargins}>
                    {listadoCostosExtra && listadoCostosExtra.length > 0 && listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true ).length > 0 ?
                        <Grid xs={11} className={classes.boxMargins} >
                            <CustomTableContrataciones
                                //Data:
                                data={listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true)}
                                cantTotal={listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true).length}
                                noSorting={true}
                                columnas={[
                                    {
                                        title: 'CÓDIGO Y DESCRIPCIÓN',
                                        field: "codigoDescripcion",
                                        headerStyle: { minWidth: '360px', maxWhidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis', padding:'5px 5px' },
                                        cellStyle: { minWidth: '360px', maxWhidth: '450px', overflow: 'hidden', textOverflow: 'ellipsis', padding:'5px 5px' },
                                    },
                                    {
                                        title: 'PRECIO',
                                        field: "precio",
                                        headerStyle: { textAlign: 'center' },
                                        cellStyle: { minWidth: '50px', maxWhidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center' },
                                        render: row => `$${ isNaN(parseFloat(row.precio)) ? '0.00' : parseFloat(row.precio).toFixed(2)}`
                                    },
                                    {
                                        cellStyle: { minWidth: '20px', overflow: 'hidden', textOverflow: 'ellipsis' },
                                        render: row => (
                                            <IconButton
                                                className={classes.iconAction}
                                                size="small"
                                                onClick={() => eliminarCostoExtra(row)}>
                                                <Delete />
                                            </IconButton>
                                        )
                                    }
                                ]}
                            />
                        </Grid>
                        :
                        <Typography>
                            No hay costos extra en esta prestación.
                        </Typography>
                    }
                </Grid>
            }
        </Grid>
    )
}

export default CostoExtra