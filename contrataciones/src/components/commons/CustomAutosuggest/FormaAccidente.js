import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { FORMA_ACCIDENTE_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const FormaAccidente = (props) => {
    const { valueAccidente, setValueAccidente, denuncia, setDataFormaAccidente, error, disableEdition} = props;
    const data = useSelector(state => state.listados.formaAccidente)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestFormaAccidente = useSelector(state => state.listados.loadingAutosuggestFormaAccidente)
    const errorAutosuggestFormaAccidente = useSelector(state => state.listados.errorAutosuggestFormaAccidente)
    const dispatch = useDispatch()

    const onInput = (value) => {
        dispatch(actions.searchFormaAccidente(value))
    }

    const mapAccidente = data && data.map(data => {
        return data
    })
    if (data && setDataFormaAccidente) {
        setDataFormaAccidente(data)
    }

    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapAccidente && mapAccidente}
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueAccidente}
                setValueAutoSuggest = {setValueAccidente}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {FORMA_ACCIDENTE_NO_ENCONTRADA}
                label = {'Forma de accidente'}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                denuncia = {denuncia}
                nombreVariable = {'descripcion'}
                loading = {loadingAutosuggestFormaAccidente}
                error = {errorAutosuggestFormaAccidente}
                errorLoc = {error}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
FormaAccidente.propTypes = {
    valueAccidente: PropTypes.any,
    setValueAccidente: PropTypes.any,
    denuncia:PropTypes.any,
    setDataFormaAccidente:PropTypes.any
};
export default FormaAccidente