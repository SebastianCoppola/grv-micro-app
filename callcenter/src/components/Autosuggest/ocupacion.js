import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { OCUPACION_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE, OCUPACION } from '../../Utils/const'

const Ocupacion = (props) => {
    const { valueOcupacion, setValueOcupacion, label, setTipeo, tipeo, denuncia, setDataOcupacion,
        error, placeholder } = props;
    const data = useSelector(state => state.listados.ocupacion)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestOcupacion = useSelector(state => state.listados.loadingAutosuggestOcupacion)
    const errorAutosuggestOcupacion = useSelector(state => state.listados.errorAutosuggestOcupacion)
    const dispatch = useDispatch()

    const onInput = (value) => {
        if (setTipeo) {
            setTipeo(value)
        }
        dispatch(actions.searchOcupacion(value, OCUPACION))
    }

    const mapOcupacion = data && data.map(data => {
        return data
    })
    if (data && setDataOcupacion) {
        setDataOcupacion(data)
    }
    return (
        <>
            <AutoSuggest
                onInput={onInput}
                minType={3}
                list={mapOcupacion && mapOcupacion}
                setSeleccionado={setSeleccionado}
                valueAutoSuggest={valueOcupacion}
                setValueAutoSuggest={setValueOcupacion}
                textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
                placeholder={placeholder}
                textoError={OCUPACION_NO_ENCONTRADA}
                label={label}
                shrink={true}
                opciones={opciones}
                nombreVariable={'descripcion'}
                setOpciones={setOpciones}
                tipeo={tipeo}
                denuncia={denuncia}
                loading={loadingAutosuggestOcupacion}
                error={errorAutosuggestOcupacion}
                errorLoc={error}
            />
        </>
    )
}
Ocupacion.propTypes = {
    valueOcupacion: PropTypes.any,
    setValueOcupacion: PropTypes.any,
    label: PropTypes.any,
    setTipeo: PropTypes.any,
    tipeo: PropTypes.any,
    denuncia: PropTypes.any,
    setDataOcupacion: PropTypes.any
};
export default Ocupacion