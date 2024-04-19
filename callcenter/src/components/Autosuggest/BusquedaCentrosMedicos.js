import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import { CENTRO_MEDICO_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'

const BusquedaCentroMedico = (props) => {
    const { valueCentroMedico, setValueCentroMedico, dataDenuncia, denuncia, 
        idProvincia, idLocalidad, setDataCentroMedico, error,  
        seleccionado2, setSeleccionado2,  sinLocalidad, disableEdition } = props;
    const data = useSelector(state => state.documentos.busquedaCentroMedico)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestCentrosMedicos = useSelector(state => state.documentos.loadingAutosuggestCentrosMedicos)
    const errorAutosuggestCentrosMedicos = useSelector(state => state.documentos.errorAutosuggestCentrosMedicos)
    const dispatch = useDispatch()
        

    const onInput = (value) => {
        if ((dataDenuncia || denuncia)) {
            let request = {
                idEmpleador: dataDenuncia ? dataDenuncia.empleadorIdEmpleador : 0,
                idLocalidad: sinLocalidad ? null : idLocalidad  ? idLocalidad :
                     null,
                idProvincia: sinLocalidad ? null : idProvincia ? idProvincia
                    : null,
                limit: 6,
                offset: 0
            }
            dispatch(actions.searchBusquedaCentroMedico(request, value))
        }
    }

    const mapCentroMedico = data &&  data.map(data => {
        return data
    })

    useEffect(()=>{
        if(data && setDataCentroMedico){
            setDataCentroMedico(data)
        }
    },[data])

    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapCentroMedico}
                setSeleccionado = {setSeleccionado2}
                valueAutoSuggest = {valueCentroMedico}
                setValueAutoSuggest = {setValueCentroMedico}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {CENTRO_MEDICO_NO_ENCONTRADO}
                shrink = {true}
                opciones = {opciones}
                variant = {'outlined'}
                setOpciones = {setOpciones}
                nombreVariable = {'razonSocial'}
                denuncia = {denuncia}
                loading = {loadingAutosuggestCentrosMedicos}
                error = {errorAutosuggestCentrosMedicos}
                errorLoc = {error}
                disabledAutosuggest={disableEdition}
            />
        </>
    )
}
BusquedaCentroMedico.propTypes = {
    valueCentroMedico: PropTypes.any,
    setValueCentroMedico: PropTypes.any,
    dataDenuncia: PropTypes.any,
    idProvincia: PropTypes.any,
    idLocalidad: PropTypes.any,
    denuncia: PropTypes.any,
    setDataCentroMedico:PropTypes.any,
    seleccionado2:PropTypes.any, 
    setSeleccionado2:PropTypes.any,
    sinLocalidad:PropTypes.bool,
};
export default BusquedaCentroMedico