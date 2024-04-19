import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { ZONA_AFECTADA_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const ZonaAfeccion = (props) => {
    const { valueZonaAfectada, setValueZonaAfectada, denuncia, setDataZonaAfectada, error, label, 
        tipoBusqueda, disableEdition } = props;
    const data1 = useSelector(state => state.listados.zonaAfeccion)
    const data2 = useSelector(state => state.listados.zonaAfeccion_2)
    const data3 = useSelector(state => state.listados.zonaAfeccion_3)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [estado, setEstado] = React.useState(false)
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestZonaAfeccion = useSelector(state => state.listados.loadingAutosuggestZonaAfeccion)
    const loadingAutosuggestZonaAfeccion_2 = useSelector(state => state.listados.loadingAutosuggestZonaAfeccion_2)
    const loadingAutosuggestZonaAfeccion_3 = useSelector(state => state.listados.loadingAutosuggestZonaAfeccion_3)
    const errorAutosuggestZonaAfeccion = useSelector(state => state.listados.errorAutosuggestZonaAfeccion)
    const errorAutosuggestZonaAfeccion_2 = useSelector(state => state.listados.errorAutosuggestZonaAfeccion_2)
    const errorAutosuggestZonaAfeccion_3 = useSelector(state => state.listados.errorAutosuggestZonaAfeccion_3)
    const dispatch = useDispatch()

    const onInput = (value) => {
        dispatch(actions.searchZonaAfeccion(value, tipoBusqueda))
    }

    const mapZonaAfeccion = tipoBusqueda ===0 ? data1 && data1.map(data => {
        return data
    }): tipoBusqueda===1 ? data2 && data2.map(data => {
        return  data 
    }):tipoBusqueda===2 &&  data3 && data3.map(data => {
        return  data 
    })

    if (tipoBusqueda===0 && data1 && setDataZonaAfectada) {
        setDataZonaAfectada(data1)
    }
    if (tipoBusqueda===1 && data2 && setDataZonaAfectada) {
        setDataZonaAfectada(data2)
    }
    if (tipoBusqueda===2 && data3 && setDataZonaAfectada) {
        setDataZonaAfectada(data3)
    }

    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapZonaAfeccion}
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueZonaAfectada}
                setValueAutoSuggest = {setValueZonaAfectada}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {ZONA_AFECTADA_NO_ENCONTRADA}
                label = {label}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                denuncia = {denuncia}
                nombreVariable = {'descripcion'}
                loading = {tipoBusqueda ===0 ? loadingAutosuggestZonaAfeccion : tipoBusqueda ===1 ? loadingAutosuggestZonaAfeccion_2 : tipoBusqueda ===2 ? loadingAutosuggestZonaAfeccion_3 : false}
                error = {tipoBusqueda ===0 ? errorAutosuggestZonaAfeccion : tipoBusqueda ===1 ? errorAutosuggestZonaAfeccion_2 : tipoBusqueda ===2 ? errorAutosuggestZonaAfeccion_3 : false}
                errorLoc={( !valueZonaAfectada || error) ? true : false}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
ZonaAfeccion.propTypes = {
    valueZonaAfectada: PropTypes.any,
    setValueZonaAfectada: PropTypes.any,
    denuncia:PropTypes.any,
    setDataZonaAfectada:PropTypes.any
};
export default ZonaAfeccion