import React from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Components:
import AutoSuggest from '../Autosuggest/Autosuggest'
//Utils:
import { LOCALIDAD_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../../Utils/const'

const Localidades = (props) => {

    const { valueLocalidades, setValueLocalidades, disabledLocalidad, denuncia, setCambioLoc,
        prov, cambio, setDataLocalidad, sede, error, label, placeholder } = props;
    
    const data = useSelector(state => state.ubicacion.findLocalidades)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])

    const loadingAutosuggestLocalidades = useSelector(state => state.ubicacion.loadingAutosuggestLocalidades)
    const errorAutosuggestLocalidades = useSelector(state => state.ubicacion.errorAutosuggestLocalidades)
    const dispatch = useDispatch()

    const onInput = (value) => {
        let request = {
            descripcion: value
        }
        dispatch(actions.searchLocalidades(request))
    }

    const mapLocalidades = data && data.map(data => {
        return data
    })
    if (data && setDataLocalidad) {
        setDataLocalidad(data)
    }

    return (
        <>
            <AutoSuggest
                onInput={onInput}
                minType={3}
                placeholder={placeholder}
                list={mapLocalidades}
                setSeleccionado={setSeleccionado}
                valueAutoSuggest={valueLocalidades}
                setValueAutoSuggest={setValueLocalidades}
                textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError={LOCALIDAD_NO_ENCONTRADA}
                label={label ? label : 'Localidad *'}
                shrink={true}
                opciones={opciones}
                setOpciones={setOpciones}
                disabledAutosuggest={disabledLocalidad}
                denuncia={denuncia || sede}
                setCambio={setCambioLoc}
                cambio={cambio}
                nombreVariable={'descripcion'}
                loading={loadingAutosuggestLocalidades}
                error={errorAutosuggestLocalidades}
                errorLoc={(prov && !valueLocalidades || error) ? true : false}
            />
        </>
    )
}
Localidades.propTypes = {
    valueLocalidades: PropTypes.any,
    setValueLocalidades: PropTypes.any,
    dataProvincia: PropTypes.any,
    disabledLocalidad: PropTypes.any,
    denuncia: PropTypes.any,
    setCambioLoc: PropTypes.any,
    prov: PropTypes.any,
    cambioProv: PropTypes.any,
    cambio: PropTypes.any,
    setDataLocalidad: PropTypes.any,
    idProv: PropTypes.any,
    label: PropTypes.string
};
export default Localidades