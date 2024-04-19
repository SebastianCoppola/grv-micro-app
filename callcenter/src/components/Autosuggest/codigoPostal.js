import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { CODIGO_POSTAL_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NUMERO  } from '../../Utils/const'

const CodigoPostal = (props) => {
    const { valueCodigoPostal, setValueCodigoPostal, denuncia, codigoPostalCABA2,
        setDataCodigoPostal, disabled, sede, error, label } = props;
    const data = useSelector(state => state.ubicacion.codigoPostal)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestCodigoPostal = useSelector(state => state.ubicacion.loadingAutosuggestCodigoPostal)
    const errorAutosuggestCodigoPostal = useSelector(state => state.ubicacion.errorAutosuggestCodigoPostal)
    const dispatch = useDispatch()
    
    const onInput = (value) => {
        dispatch(actions.searchCodigoPostal(value))
    }
    
    const mapCodigoPostal = data && data.map(data => {
        return  data 
    })
    
    if (data && setDataCodigoPostal) {
        setDataCodigoPostal(data)
    }
    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapCodigoPostal}
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueCodigoPostal}
                setValueAutoSuggest = {setValueCodigoPostal}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NUMERO }
                textoError = {CODIGO_POSTAL_NO_ENCONTRADO}
                label = {label ? label : 'Código Postal'}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                disabledAutosuggest = {disabled}  
                codigoPostal = {true} 
                denuncia = {denuncia || sede} 
                nombreVariable = {'descripcion'}
                codigoPostalCABA2 = {codigoPostalCABA2}  
                loading = {loadingAutosuggestCodigoPostal}
                error = {errorAutosuggestCodigoPostal} 
                errorLoc = {error}      
            />
        </>
    )
}
CodigoPostal.propTypes = {
    valueCodigoPostal: PropTypes.any,
    setValueCodigoPostal: PropTypes.any,
    dataCalle:PropTypes.any,
    denuncia:PropTypes.any,
    codigoPostalCABA2:PropTypes.any,
    setDataCodigoPostal:PropTypes.any,
    disabled: PropTypes.bool,
};
export default CodigoPostal