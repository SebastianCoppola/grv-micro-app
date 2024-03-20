import React, { useState, useEffect } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Mui:
import { Grid, TextField } from '@material-ui/core'
//Components:
import BusquedaModulos from '../../../commons/CustomAutosuggest/BusquedaModulos'
//Utils:
import Utils from '../../../../Utils/utils'

const DrawerAgregarModulo = props => {

    const { setDeshabilitarSiguiente, datosGuardar, setDatosGuardar, setOpenSnackBar, convenio } = props;
    
    //BusquedaModulos:
    const [moduloSeleccionado, setModuloSeleccionado] = useState(null)
    const [modulosOptions, setModulosOptions] = useState([])
    const [moduloAgregar, setModuloAgregar] = useState(null)
    //Inputs:
    const [precio, setPrecio] = useState('')
    const [errorPrecio, setErrorPrecio] = useState(false)
    const [codigoExterno, setCodigoExterno] = useState('')
    //Redux: 
    const requestConvenio = useSelector(state => state.convenio.request)
    const request = useSelector(state => state.convenio.request && state.convenio.request.modulos && state.convenio.request.modulos.length > 0 ? state.convenio.request.modulos : null)
    const dispatch = useDispatch()


    //OnChangeInputs: 
    const handleChangePrecio = (e) => {
        var regEx1 = /^([0-9]{1,10}\.?)$/
        var regEx2 = /^([0-9]{1,10}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,10}\.)$/
        if (e.target.value === "0") {
            setErrorPrecio(true)
        } else if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
            setPrecio(e.target.value)
            setDatosGuardar({ ...datosGuardar, precio: e.target.value })
            if (regEx3.test(e.target.value)) { setErrorPrecio(true) }
            else { setErrorPrecio(false) }
        }
        if (e.target.value === '') {
            setErrorPrecio(true)
            setPrecio(e.target.value)
            setDatosGuardar({ ...datosGuardar, precio: e.target.value })
        }
    }
    const handleChangeCodigoExterno = (e) => {
        if (e.target.value === '') {
            setCodigoExterno(null)
        } else {
            setCodigoExterno(e.target.value)
            setDatosGuardar({ ...datosGuardar, codigoExterno: e.target.value })
        }
    }

    //Is in convenio:
    const callbackIsInConvenio = (exito, data) => {
        if (exito) {
            if (data.idModulos[0].incluidaEnConvenio) {
                setOpenSnackBar({ open: true, severity: "error", title: 'Módulo ya incluido anteriormente.' })
                setModuloAgregar(null)
                setModuloSeleccionado(null)
                setDeshabilitarSiguiente(true)
            } else {
                setDatosGuardar({ ...datosGuardar, ...moduloSeleccionado })
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Hubo un error al intentar comprobar que el módulo no esté incluido en el convenio.'
            })
            setModuloAgregar(null)
            setModuloSeleccionado(null)
            setDeshabilitarSiguiente(true)
        }
    }
    const isInConvenio = () => {
        let request = {
            idConvenio: convenio.idConvenio,
            idModulos: [moduloSeleccionado.idModulo]
        }
        dispatch(actions.isInConvenio(request, callbackIsInConvenio))
    }

    useEffect(() => {
        if (moduloSeleccionado) {
            //is in request? 
            if (request && request.length > 0 && request.filter(it => it.idModulo === moduloSeleccionado.idModulo && it.eliminarModulo !== true).length > 0) {
                setOpenSnackBar({ open: true, severity: "error", title: 'Módulo ya incluido anteriormente.' })
                setModuloAgregar(null)
                setModuloSeleccionado(null)
                setDeshabilitarSiguiente(true)
            }
            //is eliminado in request? 
            else if (request && request.length > 0 && request.filter(it => it.idModulo === moduloSeleccionado.idModulo && it.eliminarModulo === true).length > 0) {
                setDatosGuardar({ ...datosGuardar, ...moduloSeleccionado })
            }
            //deleteAll in request? 
            else if (requestConvenio && requestConvenio.eliminarTodosModulos) {
                setDatosGuardar({ ...datosGuardar, ...moduloSeleccionado })
            }
            //delete criterio busqueda in request? 
            else if (requestConvenio && requestConvenio.eliminarModulosCriterio) {
                let match = false
                requestConvenio.eliminarModulosCriterio.forEach(it=>{
                    if(Utils.matchCriterioBusqueda(moduloSeleccionado, it)){
                        match = true
                    }
                    if(match){
                        setDatosGuardar({ ...datosGuardar, ...moduloSeleccionado })
                    }
                })
            }
            //is in convenio? 
            else if (convenio && convenio.idConvenio) {
                isInConvenio()
            }
            else {
                setDatosGuardar({ ...datosGuardar, ...moduloSeleccionado })
            }
        } else {
            setDatosGuardar({ ...datosGuardar, idModulo: null })
        }
    }, [moduloSeleccionado])

    //Habilitar & Deshabilitar SIGUIENTE: 
    useEffect(() => {
        if (datosGuardar && datosGuardar.precio && !errorPrecio && datosGuardar.idModulo && moduloSeleccionado) {
            setDeshabilitarSiguiente(false)
        } else {
            setDeshabilitarSiguiente(true)
        }
    }, [datosGuardar])



    return (
        <Grid xs={11}>
            <Grid xs={12}>
                <BusquedaModulos
                    moduloOpciones={modulosOptions} setModuloOpciones={setModulosOptions}
                    moduloSeleccionado={moduloSeleccionado} setModuloSeleccionado={setModuloSeleccionado}
                    valueModulo={moduloAgregar} setValueModulo={setModuloAgregar}
                />
            </Grid>
            <Grid container xs={12} style={{ marginTop: '30px' }}>
                <TextField
                    label='Precio *'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={precio}
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

export default DrawerAgregarModulo