import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import {AGENTE_MATERIAL_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const AgenteMaterial = (props) => {
    const { valueAgenteMaterial, setValueAgenteMaterial, denuncia, setDataAgenteMaterial, error, disableEdition } = props;
    const data = useSelector(state => state.listados.agenteMaterial)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestAgenteMaterial = useSelector(state => state.listados.loadingAutosuggestAgenteMaterial)
    const errorAutosuggestAgenteMaterial = useSelector(state => state.listados.errorAutosuggestAgenteMaterial)
    const dispatch = useDispatch()
    
    const onInput = (value) => {
        dispatch(actions.searchAgenteMaterial(value))
    }
    
    const mapAgenteMaterial = data && data.map(data => {
        return  data
    })
    if (data && setDataAgenteMaterial) {
        setDataAgenteMaterial(data)
    }
    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapAgenteMaterial}
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueAgenteMaterial}
                setValueAutoSuggest = {setValueAgenteMaterial}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {AGENTE_MATERIAL_NO_ENCONTRADO}
                label = {'Agente Material asociado'}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                denuncia = {denuncia}
                nombreVariable = {'descripcion'}
                loading = {loadingAutosuggestAgenteMaterial}
                error = {errorAutosuggestAgenteMaterial}
                errorLoc = {error}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
AgenteMaterial.propTypes = {
    valueAgenteMaterial: PropTypes.any,
    setValueAgenteMaterial: PropTypes.any,
    denuncia:PropTypes.any,
    setDataAgenteMaterial:PropTypes.any
};
export default AgenteMaterial