import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import { MODULO_NO_ENCONTRADO } from '../../../Utils/const'
//Components:
import AutoSuggest from '../Autosuggest/Autosuggest'
//Material:
import { Typography } from '@material-ui/core'

const BusquedaModulos = (props) => {
    const { denuncia, moduloOpciones, setModuloOpciones, moduloSeleccionado, setModuloSeleccionado, valueModulo, setValueModulo } = props;
    //Redux:
    const dispatch = useDispatch()
    const modulosBack = useSelector(state => state.moduloConvenio.modulos);
    const loadingAutosuggestModulos = useSelector(state => state.moduloConvenio.loadingAutosuggestModulos)
    const errorAutosuggestModulos = useSelector(state => state.moduloConvenio.errorAutosuggestModulos)
    const [cambioModulo, setCambioModulo] = useState(false)
    const [valueModulo2, setvalueModulo2] = useState(null);
    const [seleccionado, setSeleccionado] = React.useState(null)

    //On 3 characters input:
    const onInput = (value) => {
        let request = {
            "nombreOrCodigo": value
        }
        dispatch(actions.getModulos(request))
    }

    //Mapea los módulos que devuelve la db:
    const mapModulos = moduloOpciones && moduloOpciones.map(modulo => {
        return modulo
    })

    //Setea Modulo Opciones:
    useEffect(()=>{
        setModuloOpciones(
            modulosBack.map(it=>{
                return {
                    "codigo":it.codigo,
                    "descripcion":it.descripcion,
                    "idModulo":it.idModulo,
                    "nombre":it.nombre,
                    "codigoNombre":`${it.codigo} ${it.nombre}`
                }
            })
        )
    },[modulosBack])
    
    //Limpio inclusionesModulo, inclusionesRepetidas, moduloSeleccionado y valueModulo2 si hay ERROR al buscar un módulo.
    useEffect(()=>{
        if(errorAutosuggestModulos){
            dispatch(actions.clearInclusionesRepetidas());
            dispatch(actions.clearInclusionesModulo());
            dispatch(actions.clearModulos());
            setModuloSeleccionado(null)
            setvalueModulo2(null)
        }
    }, [errorAutosuggestModulos])
    
    //Seteo historyModulo cuando cambia la selección:
    useEffect(() => {
        setvalueModulo2(valueModulo)
    },[cambioModulo])

    //Seteo moduloSeleccionado:
    useEffect(() => {
        if (valueModulo2 && moduloOpciones !== null && moduloOpciones.length > 0) {
            let selectedModulo = moduloOpciones && moduloOpciones.filter(it => it.codigoNombre === valueModulo2)[0]
            if(selectedModulo !== null && selectedModulo !== undefined){
                setModuloSeleccionado(selectedModulo);
            }
        }
        if(valueModulo2 === null){
            setModuloSeleccionado(null)
        }
    },[valueModulo2])

    //Seteo valueModulo2:
    useEffect(() => {
        if (moduloSeleccionado === null) {
            setvalueModulo2(null);
        }
    },[moduloSeleccionado])

    return (
        <>
            <Typography style={{ fontSize: '12px', marginBottom: '10px' }}>
                Buscar módulo por código o nombre
            </Typography>
            <AutoSuggest
                minType={3}
                onInput={onInput}
                list={mapModulos}
                setSeleccionado={setSeleccionado}
                valueAutoSuggest={valueModulo}
                setValueAutoSuggest={setValueModulo}
                opciones={moduloOpciones}
                setOpciones={setModuloOpciones}
                nombreVariable={'codigoNombre'}
                underline={true}
                cambioModulo={cambioModulo}
                setCambioModulo={setCambioModulo}
                style={{
                    border: '1px solid',
                    borderRadius: '20px',
                    padding: '0 20px 0 20px',
                }}
                loading={loadingAutosuggestModulos}
                error={errorAutosuggestModulos}
                textoError={MODULO_NO_ENCONTRADO}
                denuncia={denuncia}
            />
        </>
    )
}
BusquedaModulos.propTypes = {
    valueModulo: PropTypes.any,
    setValueModulo: PropTypes.any,
    dataProvincia: PropTypes.any,
    disabledLocalidad: PropTypes.any,
    denuncia: PropTypes.any,
    setCambioLoc: PropTypes.any,
    prov: PropTypes.any,
    cambioProv: PropTypes.any,
    cambio: PropTypes.any,
    setModuloOpciones: PropTypes.any,
    idProv: PropTypes.any,
    label: PropTypes.string
};
export default BusquedaModulos;