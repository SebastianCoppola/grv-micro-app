import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { SEDE_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'


const Sede = (props) => {
    const { valueSede, setValueSede, denuncia, dataDenuncia, sedeSeleccionado,
        setDataSede, tipoSedeID, disabled, error, placeholder } = props;
    const dataSede = useSelector(state => state.documentos.sede)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestSede = useSelector(state => state.documentos.loadingAutosuggestSede)
    const errorAutosuggestSede = useSelector(state => state.documentos.errorAutosuggestSede)
    const dispatch = useDispatch()

    const idTipoSede = denuncia && denuncia.sede ? denuncia.sede.idTipoSede : null
    const onInput = (value) => {
        if (denuncia && denuncia.idTipoSede) {
            dispatch(actions.searchSede(idTipoSede, value))
        }
        else if (tipoSedeID) {
            dispatch(actions.searchSede(tipoSedeID, value))
        }
        else if (dataDenuncia) {
            dispatch(actions.searchSede(sedeSeleccionado[0].idTipoSede, value))
        }
    }

    const mapSede = dataSede && dataSede.map(data => {
        return data && data
    })
    if (dataSede && setDataSede) {
        setDataSede(dataSede)
    }

    return (
        <>
            <AutoSuggest
                onInput={onInput}
                minType={3}
                placeholder={placeholder}
                list={mapSede && mapSede}
                setSeleccionado={setSeleccionado}
                valueAutoSuggest={valueSede}
                setValueAutoSuggest={setValueSede}
                textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError={SEDE_NO_ENCONTRADA}
                label={'Sede'}
                shrink={true}
                opciones={opciones}
                setOpciones={setOpciones}
                denuncia={denuncia}
                nombreVariable={'nombre'}
                nombreBusqueda={'descripcion'}
                dataDenuncia={dataDenuncia}
                disabledAutosuggest={disabled}
                loading={loadingAutosuggestSede}
                error={errorAutosuggestSede}
                errorLoc={error}
            />
        </>
    )
}
Sede.propTypes = {
    valueSede: PropTypes.any,
    setValueSede: PropTypes.any,
    denuncia: PropTypes.any,
    dataDenuncia: PropTypes.any,
    sedeSeleccionado: PropTypes.any,
    setDataSede: PropTypes.any,
    tipoSedeID: PropTypes.any,
    disabled: PropTypes.bool
};
export default Sede