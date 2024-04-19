import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { AGENTE_EP_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const AgenteCausante = (props) => {
    const { valueAgenteCausante, setValueAgenteCausante, denuncia, setDataAgenteCausante, error, disableEdition } = props;
    const data = useSelector(state => state.listados.agenteCausante)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestAgenteCausante = useSelector(state => state.listados.loadingAutosuggestAgenteCausante)
    const errorAutosuggestAgenteCausante = useSelector(state => state.listados.errorAutosuggestAgenteCausante)
    const [valorEnterSeleccionado, setValorEnterSeleccionado] = React.useState(false)
    
    const dispatch = useDispatch()

    const onInput = (value) => {
        dispatch(actions.searchAgenteCausante(value))
    }

    const mapAgenteCausante = data && data.map(data => {
        return data
    })
    if (data && setDataAgenteCausante) {
        setDataAgenteCausante(data)
    }

    return (
        <>
            <AutoSuggest
                setValorEnterSeleccionado={setValorEnterSeleccionado}
                onInput= {onInput}
                minType= {3}
                list= {mapAgenteCausante}
                setSeleccionado= {setSeleccionado}
                valueAutoSuggest= {valueAgenteCausante}
                setValueAutoSuggest= {setValueAgenteCausante}
                textoSugerencia= {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError= {AGENTE_EP_NO_ENCONTRADO}
                label= {'Agente causante EP'}
                shrink= {true}
                opciones= {opciones}
                setOpciones= {setOpciones}
                denuncia= {denuncia}
                nombreVariable={'descripcion'}
                loading= {loadingAutosuggestAgenteCausante}
                error= {errorAutosuggestAgenteCausante}
                errorLoc = {error}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
AgenteCausante.propTypes = {
    valueAgenteCausante: PropTypes.any,
    setValueAgenteCausante: PropTypes.any,
    denuncia:PropTypes.any,
    setDataAgenteCausante:PropTypes.any
};
export default AgenteCausante