import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest'
import { TAREA_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'


const Tarea = (props) => {
    
    const { valueOcupacion, setValueOcupacion, label, tipeo, denuncia,
        setDataTareaAccidente, error, placeholder } = props
        
    const dispatch = useDispatch()
    
    const data = useSelector(state => state.listados.tarea)
    const errorAutosuggestTarea = useSelector(state => state.listados.errorAutosuggestTarea)
    const loadingAutosuggestTarea = useSelector(state => state.listados.loadingAutosuggestTarea)
    
    const [seleccionado, setSeleccionado] = useState(false)
    const [opciones, setOpciones] = useState([])

    const onInput = (value) => {
        dispatch(actions.searchOcupacion(value))
    }

    const mapOcupacion = data && data.map( data => { return data } )

    if (data && setDataTareaAccidente) {
        setDataTareaAccidente(data)
    }

    return (
        <AutoSuggest
            onInput={onInput}
            minType={3}
            list={mapOcupacion && mapOcupacion}
            setSeleccionado={setSeleccionado}
            valueAutoSuggest={valueOcupacion}
            setValueAutoSuggest={setValueOcupacion}
            textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
            textoError={TAREA_NO_ENCONTRADA}
            label={label}
            shrink={true}
            opciones={opciones}
            setOpciones={setOpciones}
            tipeo={tipeo}
            placeholder={placeholder}
            nombreVariable={'descripcion'}
            denuncia={denuncia}
            loading={loadingAutosuggestTarea}
            error={errorAutosuggestTarea}
            errorLoc={error}
        />
    )
}

Tarea.propTypes = {
    valueOcupacion: PropTypes.any,
    setValueOcupacion: PropTypes.any,
    label: PropTypes.any,
    tipeo: PropTypes.any,
    denuncia: PropTypes.any,
    setDataTareaAccidente: PropTypes.any
}

export default Tarea