import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { SERVICIO_TRASLADO_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const ProveedorTraslados = (props) => {
    const { valueProveedor, setValueProveedor, denuncia, setDataProveedor, idTipoTraslado, 
        setSeleccionado} = props;
    const data = useSelector(state => state.listados.proveedorServicios ? state.listados.proveedorServicios : null)
    const [estado, setEstado] = useState(false)
    const [valueSuggestWrite, setValueSuggestWrite] = useState('')
    const loadingAutosuggestProveedorTraslado = useSelector(state => state.listados.loadingAutosuggestProveedorTraslado)
    const errorAutosuggestProveedorTraslado = useSelector(state => state.listados.errorAutosuggestProveedorTraslado)
    const dispatch = useDispatch()

    const onInput = (value) => {
        let request = {
            descripcion: value,
            idTipoTraslado: idTipoTraslado
        }
        dispatch(actions.searchProveedorTraslado(request))
    }
    const mapProveedor = data && data.map(data => { 
        return data
    })
    if (data && setDataProveedor) {
        setDataProveedor(data)
    }
    return (
        <>
        <AutoSuggest
            onInput = {onInput}
            minType = {3}
            list = {mapProveedor}
            setSeleccionado = {setSeleccionado}
            valueAutoSuggest = {valueProveedor}
            setValueAutoSuggest = {setValueProveedor}
            textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
            textoError = {SERVICIO_TRASLADO_NO_ENCONTRADO}
            label = {'Buscar Servicio Traslado'}
            shrink = {true}
            denuncia = {denuncia}
            nombreVariable = {'descripcion'}
            loading = {loadingAutosuggestProveedorTraslado}
            error = {errorAutosuggestProveedorTraslado}
        />
        </>
    )
}
ProveedorTraslados.propTypes = {
    valueProveedor: PropTypes.any,
    setValueProveedor: PropTypes.any,
    denuncia: PropTypes.any,
    setDataProveedor: PropTypes.any
};
export default ProveedorTraslados