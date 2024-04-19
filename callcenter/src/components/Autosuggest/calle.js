import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { CALLE_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const Calle = (props) => {
    const { valueCalle, setValueCalle, disabledCalle, denuncia,
        setDataCalle, error, placeholder } = props;
    const data = useSelector(state => state.ubicacion.calle)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestCalle = useSelector(state => state.ubicacion.loadingAutosuggestCalle)
    const errorAutosuggestCalle = useSelector(state => state.ubicacion.errorAutosuggestCalle)
    const dispatch = useDispatch()

    const onInput = (value) => {
        dispatch(actions.searchCalle(value))
    }

    const mapCalle = data && data.map(data => {
        return data.descripcion
    })

    if (data && setDataCalle) {
        setDataCalle(data)
    }

    return (
        <>
            <AutoSuggest
                onInput={onInput}
                minType={3}
                list={mapCalle}
                setSeleccionado={setSeleccionado}
                valueAutoSuggest={valueCalle}
                placeholder={placeholder}
                setValueAutoSuggest={setValueCalle}
                textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError={CALLE_NO_ENCONTRADA}
                label={'Calle'}
                shrink={true}
                opciones={opciones}
                setOpciones={setOpciones}
                disabledAutosuggest={disabledCalle}
                denuncia={denuncia}
                nombreVariable={'descripcion'}
                loading={loadingAutosuggestCalle}
                error={errorAutosuggestCalle}
                errorLoc={error}
                calle={true}
            />
        </>
    )
}
Calle.propTypes = {
    valueCalle: PropTypes.any,
    setValueCalle: PropTypes.any,
    dataCalle: PropTypes.any,
    disabledCalle: PropTypes.any,
    denuncia: PropTypes.any,
    setDataCalle: PropTypes.any
};
export default Calle