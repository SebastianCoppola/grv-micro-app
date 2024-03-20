import React, { useState, useEffect } from 'react'
import { PRESTACION_NO_ENCONTRADA } from '../../../../Utils/const'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Componentes:
import AutoSuggest from '../../../commons/Autosuggest/Autosuggest'
import CustomTableContrataciones from '../../../commons/Table/CustomTableContrataciones'
//Material:
import { Grid, TextField } from '@material-ui/core'
import { setListadoPrestacionesNomencladas, setListadoPrestacionesNoNomencladas } from '../../../../redux/actions/prestaciones'
import Loader from '../../../commons/Loading/Loader'
import Utils from '../../../../Utils/utils'

const DrawerAgregarPrestacion = props => {
    const { setDeshabilitarSiguiente, esNomenclada, setDatosGuardar, setOpenSnackBar, datosGuardar, convenio } = props;
    //Redux: 
    const dispatch = useDispatch();
    const prestacionesOptions = useSelector(state => esNomenclada ?
        state.prestaciones.prestacionesNomencladas
        : state.prestaciones.prestacionesNoNomencladas)
    const loadingListarPrestaciones = useSelector(state => state.prestaciones.loadingListarPrestaciones)
    const errorListarPrestaciones = useSelector(state => state.prestaciones.errorListarPrestaciones)
    const requestConvenio = useSelector(state => state.convenio.request)
    const request = useSelector(state => esNomenclada ?
        (state.convenio.request && state.convenio.request.prestacionesNomencladas && state.convenio.request.prestacionesNomencladas.length > 0 ?
            state.convenio.request.prestacionesNomencladas : null
        )
        :
        (state.convenio.request && state.convenio.request.prestacionesNoNomencladas && state.convenio.request.prestacionesNoNomencladas.length > 0 ?
            state.convenio.request.prestacionesNoNomencladas : null
        )
    )
    //Autosuggest:
    const [prestacionSeleccionada, setPrestacionSeleccionada] = useState(null)
    const [isSelected, setIsSelected] = useState(false)
    //Tabla
    const [prestacionesTabla, setPrestacionesTabla] = useState([])
    const [dataSelect, setDataSelect] = useState([])
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [loadingAgregarPrestacion, setLoadingAgregarPrestacion] = useState(false)
    //Inputs:
    const [precio, setPrecio] = useState('')
    const [errorPrecio, setErrorPrecio] = useState(false)
    const [codigoExterno, setCodigoExterno] = useState('')
    const [loadingTabla, setLoadingTabla] = useState(false)
    //Para los casos que en el buscador se coloquen los . (ejemplo 00.00.1) y traigan menos de 10 resultados
    const [prestacionesTabla2, setPrestacionesTabla2] = useState([])
    //Para los casos que en el buscador se coloquen los . (ejemplo 00.00.1) y traigan mas de 10 resultados
    const [prestacionesTabla3, setPrestacionesTabla3] = useState([])


    //3 caracteres input:
    const onInputAutosuggest = (value) => {
        if (esNomenclada) { dispatch(actions.clearPrestacionesNomencladas()) }
        else { dispatch(actions.clearPrestacionesNoNomencladas()) }
        let req = {
            "criterioBusqueda": value,
        }
        if (esNomenclada) {
            dispatch(actions.listarPrestacionesNomencladas(req))
        } else {
            dispatch(actions.listarPrestacionesNoNomencladas(req))
        }
    }

    useEffect(() => {
        setPrestacionesTabla2([])
        setPrestacionesTabla3([])
    }, [])

    useEffect(() => {
        if (loadingListarPrestaciones) {
            setPrestacionesTabla([])
            setPrestacionesTabla2([])
            setPrestacionesTabla3([])
        }
    }, [loadingListarPrestaciones])

    useEffect(() => prestacionesOptions.cantidadTotal <= 10 ? setPrestacionesTabla2(prestacionesOptions.objetos) : setPrestacionesTabla3(prestacionesOptions.objetos), [prestacionesOptions])
    //Mapea el codigo y la descripción de las opciones para mostrar en el Autosuggest:
    const mapPrestaciones =
        prestacionesTabla2 && prestacionesTabla2.length > 0 ?
            prestacionesTabla2.map(data => { return data.codigo + ' ' + data.descripcion })
            : prestacionesTabla3 && prestacionesTabla3.length > 0 ?
                prestacionesTabla3.map(data => { return data.codigo + ' ' + data.descripcion })
                : null;


    //Is in convenio:
    const callbackIsInConvenio = (exito, data, prestacionFiltrada) => {
        let req = esNomenclada ? "idPrestacionesNomencladas" : "idPrestacionesNoNomencladas"
        if (exito) {
            if (data[req][0].incluidaEnConvenio) {
                setOpenSnackBar({ open: true, severity: "error", title: 'Prestación ya incluida anteriormente.' })
                setPrestacionSeleccionada(null)
                setLoadingAgregarPrestacion(false)
                setLoadingTabla(false)
            } else {
                setPrestacionesTabla([{ ...prestacionFiltrada, 'tableData': { 'checked': true } }, ...prestacionesTabla,])
                setDataSelect([...dataSelect, prestacionFiltrada])
                setLoadingAgregarPrestacion(false)
                setPrestacionSeleccionada(null)
                setLoadingTabla(false)
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Hubo un error al intentar comprobar que la prestación no esté incluida en el convenio.'
            })
            setLoadingAgregarPrestacion(false)
            setPrestacionSeleccionada(null)
            setLoadingTabla(false)
        }
    }
    const isInConvenio = (prestacionFiltrada) => {
        let req = esNomenclada ? "idPrestacionesNomencladas" : "idPrestacionesNoNomencladas"
        let request = {
            idConvenio: convenio.idConvenio,
            [req]: [prestacionFiltrada.idPrestacion]
        }
        dispatch(actions.isInConvenio(request, callbackIsInConvenio, prestacionFiltrada))
    }


    //Are in convenio:
    const callbackAreInConvenio = (exito, data, prestaciones, opcionesForzar) => {
        let req = esNomenclada ? "idPrestacionesNomencladas" : "idPrestacionesNoNomencladas"
        if (exito) {
            let newOptions = []
            prestaciones.forEach(prestacion => {
                if (data[req].filter(it => it.id === prestacion.idPrestacion)[0].incluidaEnConvenio === false) {
                    newOptions.push(prestacion)
                }
            })
            setPrestacionesTabla([...newOptions, ...opcionesForzar].sort((a, b) => a.codigo.localeCompare(b.codigo)))
            setLoadingAgregarPrestacion(false)
            setLoadingTabla(false)
        } else {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Hubo un error al intentar comprobar que la prestación no esté incluida en el convenio.'
            })
            setLoadingAgregarPrestacion(false)
            setPrestacionSeleccionada(null)
            setLoadingTabla(false)
        }
    }
    const areInConvenio = (prestaciones, opcionesForzar) => {
        let req = esNomenclada ? "idPrestacionesNomencladas" : "idPrestacionesNoNomencladas"
        let request = {
            idConvenio: convenio.idConvenio,
            [req]: prestaciones.map(it => { return it.idPrestacion })
        }
        dispatch(actions.isInConvenio(request, callbackAreInConvenio, prestaciones, opcionesForzar))
    }

    //Filtra el valor seleccionado entre las opciones y las agrega a la tabla. 
    useEffect(() => {
        if ((prestacionSeleccionada && prestacionesTabla2) || (prestacionSeleccionada && prestacionesTabla3)) {
            setLoadingTabla(true)
            setLoadingAgregarPrestacion(true)
            let prestacionFiltrada = prestacionesTabla2 && prestacionesTabla2.length > 0
                ? prestacionesTabla2.filter(it => it.codigo === prestacionSeleccionada.split(" ")[0])[0]
                : prestacionesTabla3 && prestacionesTabla3.length > 0 ? prestacionesTabla3.filter(it => it.codigo === prestacionSeleccionada.split(" ")[0])[0]
                    : null
            if (prestacionFiltrada) {
                //isSelected?
                if (dataSelect && dataSelect.length > 0 &&
                    dataSelect.filter(it => it.idPrestacion === prestacionFiltrada.idPrestacion).length > 0) {
                    setOpenSnackBar({ open: true, severity: "error", title: 'Prestación ya seleccionada.' })
                    setPrestacionSeleccionada(null)
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
                //isInRequest? 
                else if (request && request.length > 0 &&
                    request.filter(it => it.idPrestacion === prestacionFiltrada.idPrestacion && it.eliminarPrestacion !== true).length > 0) {
                    setOpenSnackBar({ open: true, severity: "error", title: 'Prestación ya incluida anteriormente.' })
                    setPrestacionSeleccionada(null)
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
                //is deleted in request?
                else if (request && request.length > 0 &&
                    request.filter(it => it.idPrestacion === prestacionFiltrada.idPrestacion && it.eliminarPrestacion === true).length > 0) {
                    setDataSelect([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionesTabla([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionSeleccionada('')
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
                //deleteAll in request?
                else if (requestConvenio && (requestConvenio.eliminarTodasNomencladas || requestConvenio.eliminarTodasNoNomencladas)){
                    setDataSelect([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionesTabla([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionSeleccionada('')
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
                //criterioBusqueda in request?
                else if (requestConvenio && (requestConvenio.eliminarNomencladasCriterio || requestConvenio.eliminarNoNomencladasCriterio)){
                    let eliminarConCriterio = esNomenclada ? "eliminarNomencladasCriterio" : "eliminarNoNomencladasCriterio"
                    let match = false
                    requestConvenio[eliminarConCriterio].forEach(it=>{
                        if(Utils.matchCriterioBusqueda(prestacionFiltrada, it)){
                            match = true
                        }
                    })
                    if(match){
                        setDataSelect([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                        setPrestacionesTabla([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                        setPrestacionSeleccionada('')
                        setLoadingAgregarPrestacion(false)
                        setLoadingTabla(false)
                    }
                }
                //isInConvenio?
                else if (convenio && convenio.idConvenio) {
                    isInConvenio(prestacionFiltrada)
                } else {
                    setDataSelect([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionesTabla([...dataSelect, { ...prestacionFiltrada, tableData: { checked: true } }])
                    setPrestacionSeleccionada('')
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
            } else {
                //areSelected?
                let filteredOptions = []
                if (prestacionesTabla2 && prestacionesTabla2.length > 0) {
                    prestacionesTabla2.forEach(prestacion => {
                        if (dataSelect.filter(it => it.idPrestacion === prestacion.idPrestacion).length === 0) {
                            filteredOptions.push(prestacion)
                        }
                    })
                } else if (prestacionesTabla3 && prestacionesTabla3.length > 0) {
                    prestacionesTabla3.forEach(prestacion => {
                        if (dataSelect.filter(it => it.idPrestacion === prestacion.idPrestacion).length === 0) {
                            filteredOptions.push(prestacion)
                        }
                    })
                }
                //areInRequest?
                let newOptions = []
                let opcionesForzar = []
                filteredOptions.forEach(prestacion => {
                    if (!request || (request && request.filter(it => it.idPrestacion === prestacion.idPrestacion).length === 0)) {
                        newOptions.push(prestacion)
                    }
                    if (request && request.filter(it => it.idPrestacion === prestacion.idPrestacion && it.eliminarPrestacion === true).length > 0) {
                        if (opcionesForzar.filter(it => it.idPrestacion === prestacion.idPrestacion).length === 0) {
                            opcionesForzar.push(prestacion)
                        }
                    }
                })
                //deleteAll?
                if(requestConvenio && (requestConvenio.eliminarTodasNomencladas || requestConvenio.eliminarTodasNoNomencladas)){
                    opcionesForzar.push(...newOptions)
                }
                //criterioBusqueda?
                if(requestConvenio && (requestConvenio.eliminarNomencladasCriterio || requestConvenio.eliminarNoNomencladasCriterio)){
                    newOptions.length > 0 && newOptions.forEach(prestacion=>{
                        let eliminarConCriterio = esNomenclada ? "eliminarNomencladasCriterio" : "eliminarNoNomencladasCriterio"
                        let match = false
                        requestConvenio[eliminarConCriterio].forEach(it=>{
                            if(Utils.matchCriterioBusqueda(prestacion, it)){
                                match = true
                            }
                        })
                        if(match){
                            opcionesForzar.push(prestacion)
                        }
                    })
                }
                //areInConvenio?
                if (convenio && convenio.idConvenio) {
                    areInConvenio([...(dataSelect && dataSelect.map(it => { return { ...it, tableData: { checked: true } } })), ...newOptions], opcionesForzar)
                } else {
                    setPrestacionesTabla([...(dataSelect && dataSelect.map(it => { return { ...it, tableData: { checked: true } } })), ...newOptions])
                    setLoadingAgregarPrestacion(false)
                    setLoadingTabla(false)
                }
            }
        }
    }, [prestacionSeleccionada])


    //Filtra elimina las prestaciones NO SELECCIONADAS al limpiar la búsqueda:
    useEffect(() => {
        if (!isSelected && prestacionesTabla) {
            setPrestacionesTabla(prestacionesTabla.filter(it => it.tableData.checked === true))
        }
    }, [isSelected])


    //OnChangeInputs: 
    const handleChangePrecio = (e) => {
        var regEx1 = /^([0-9]{1,10}\.?)$/
        var regEx2 = /^([0-9]{1,10}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,10}\.)$/

        if (e.target.value === "0") {
            setErrorPrecio(true)
        } else if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
            setPrecio(e.target.value)
            if (regEx3.test(e.target.value)) { setErrorPrecio(true) }
            else { setErrorPrecio(false) }
        }
        if (e.target.value === '') {
            setErrorPrecio(true)
            setPrecio(e.target.value)
        }

    }


    const handleChangeCodigoExterno = (e) => {
        if (e.target.value === '') {
            setCodigoExterno(null)
        } else {
            setCodigoExterno(e.target.value)
        }
    }


    //Habilitar desabilitar boton siguiente:
    useEffect(() => {
        setDatosGuardar({ prestaciones: dataSelect, precio: precio, codigoExterno: codigoExterno })
        if (dataSelect && dataSelect.length > 0 && precio && !errorPrecio) {
            setDeshabilitarSiguiente(false)
        } else {
            setDeshabilitarSiguiente(true)
        }
    }, [dataSelect, precio, codigoExterno])


    return (
        <Grid xs={12}>
            <Grid xs={12}>
                <span style={{ fontSize: '12px', color: '#747474', margin: "2px" }}>Buscar prestación por código o descripción</span>
                <AutoSuggest
                    onInput={onInputAutosuggest}
                    minType={3}
                    list={mapPrestaciones}
                    setSeleccionado={setIsSelected}
                    valueAutoSuggest={prestacionSeleccionada}
                    setValueAutoSuggest={setPrestacionSeleccionada}
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
                    stopAutoHighlight={true}
                    disabledAutosuggest={false}
                    loading={loadingListarPrestaciones}
                    error={errorListarPrestaciones}
                    textoError={PRESTACION_NO_ENCONTRADA}
                />
            </Grid>
            {loadingTabla ?
                (
                    <Grid alignItems='center' style={{ marginTop: "30px" }}>
                        <Loader loading={loadingTabla} />
                    </Grid>
                )
                : prestacionesTabla && prestacionesTabla.length > 0 ?
                    <Grid container xs={12} style={{ marginTop: '30px' }}>
                        <CustomTableContrataciones
                            //Data:
                            data={prestacionesTabla}
                            cantTotal={prestacionesTabla.length}
                            columnas={[
                                {
                                    title: 'LISTA DE RESULTADOS',
                                    field: "codigoDescripcion",
                                    cellStyle: { minWidth: '600px', maxWidth: '600px', overflow: 'hidden', textOverflow: 'ellipsis' },
                                    render: row => (row.codigo + " " + row.descripcion)
                                },
                            ]}
                            //Selection:
                            selection={true}
                            dataSelect={dataSelect}
                            setDataSelect={setDataSelect}
                            disableSelection={true}
                            //Pagination:
                            pagination={true}
                            paginationWidth={true}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            //Loading: 
                            loading={loadingAgregarPrestacion}
                        />
                    </Grid>
                    : null
            }
            <Grid container xs={12} style={{ marginTop: '30px' }}>
                <TextField
                    label='Precio *'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={datosGuardar && datosGuardar.precio}
                    onChange={handleChangePrecio}
                    error={errorPrecio}
                />
                <TextField
                    label='Código Externo'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={codigoExterno}
                    onChange={handleChangeCodigoExterno}
                />
            </Grid>
        </Grid>
    )
}

export default DrawerAgregarPrestacion