import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { NATURALEZA_SINIESTRO_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const NaturalezaSiniestro = (props) => {
    const { valueNaturaleza, setValueNaturaleza,denuncia, setDataNaturaleza, error, label, 
        tipoBusqueda, disableEdition } = props;
    const data1 = useSelector(state => state.listados.naturalezaSiniestro)
    const data2 = useSelector(state => state.listados.naturalezaSiniestro_2)
    const data3 = useSelector(state => state.listados.naturalezaSiniestro_3)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestNaturalezaSiniestro = useSelector(state => state.listados.loadingAutosuggestNaturalezaSiniestro)
    const loadingAutosuggestNaturalezaSiniestro_2 = useSelector(state => state.listados.loadingAutosuggestNaturalezaSiniestro_2)
    const loadingAutosuggestNaturalezaSiniestro_3 = useSelector(state => state.listados.loadingAutosuggestNaturalezaSiniestro_3)
    const errorAutosuggestNaturalezaSiniestro = useSelector(state=> state.listados.errorAutosuggestNaturalezaSiniestro)
    const errorAutosuggestNaturalezaSiniestro_2 = useSelector(state=> state.listados.errorAutosuggestNaturalezaSiniestro_2)
    const errorAutosuggestNaturalezaSiniestro_3 = useSelector(state=> state.listados.errorAutosuggestNaturalezaSiniestro_3)
    const dispatch = useDispatch()
    
    const onInput = (value) => {
        dispatch(actions.searchNaturalezaSiniestro(value, tipoBusqueda))
    }

    const mapNaturalezaSiniestro = tipoBusqueda ===0 ? data1 && data1.map(data => {
        return  data
    }): tipoBusqueda ===1 ? data2 && data2.map(data => {
        return  data
    }): tipoBusqueda ===2 && data3 && data3.map(data => { 
        return  data
    })
    
    if (tipoBusqueda===0 && data1 && setDataNaturaleza) {
        setDataNaturaleza(data1)
    }
    if (tipoBusqueda===1 && data2 && setDataNaturaleza) {
        setDataNaturaleza(data2)
    }
    if (tipoBusqueda===2 && data3 && setDataNaturaleza) {
        setDataNaturaleza(data3)
    }
    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapNaturalezaSiniestro}
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueNaturaleza}
                setValueAutoSuggest = {setValueNaturaleza}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {NATURALEZA_SINIESTRO_NO_ENCONTRADA}
                label = {label}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                denuncia = {denuncia}
                nombreVariable = {'descripcion'}
                loading = {tipoBusqueda ===0 ? loadingAutosuggestNaturalezaSiniestro : tipoBusqueda===1 ? loadingAutosuggestNaturalezaSiniestro_2: tipoBusqueda===2 ? loadingAutosuggestNaturalezaSiniestro_3 : false }
                error = {tipoBusqueda ===0 ? errorAutosuggestNaturalezaSiniestro : tipoBusqueda ===1 ? errorAutosuggestNaturalezaSiniestro_2 : tipoBusqueda===2 ? errorAutosuggestNaturalezaSiniestro_3 : false}
                errorLoc={( !valueNaturaleza || error) ? true : false}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
NaturalezaSiniestro.propTypes = {
    valueNaturaleza: PropTypes.any,
    setValueNaturaleza: PropTypes.any,
    denuncia:PropTypes.any,
    setDataNaturaleza:PropTypes.any
};
export default NaturalezaSiniestro