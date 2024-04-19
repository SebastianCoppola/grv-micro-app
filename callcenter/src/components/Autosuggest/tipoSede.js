import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import AutoSuggest from '../commons/Autosuggest/Autosuggest';
import {TIPO_SEDE_NO_ENCONTRADA, SUGERENCIA_BUSQUEDA_NOMBRE } from '../../Utils/const'


const TipoSede = (props) => {
    const { valueTipoSede, setValueTipoSede, denuncia, dataDenuncia, setSedeSeleccionado, 
        setDataTipoSede, error } = props;
    const data = useSelector(state => state.documentos.tipoSede)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueSuggestWrite, setValueSuggestWrite] = React.useState('')
    const loadingAutosuggestTipoSede = useSelector(state => state.documentos.loadingAutosuggestTipoSede)
    const errorAutosuggestTipoSede = useSelector(state => state.documentos.errorAutosuggestTipoSede)
    const dispatch = useDispatch()
        
    const idEmpleador=denuncia && ((dataDenuncia !== undefined && dataDenuncia!==null) ? ( denuncia.empleadorIdEmpleador === dataDenuncia.empleadorIdEmpleador) : denuncia.empleadorIdEmpleador )
                    ? denuncia.empleadorIdEmpleador :null
    
    const onInput = (value) => {
        if(denuncia && idEmpleador!==null){
            dispatch(actions.searchTipoSede(idEmpleador,value))
        }
        else if (dataDenuncia ){
            let idEmpleadorForm = dataDenuncia && dataDenuncia.empleadorIdEmpleador ? dataDenuncia.empleadorIdEmpleador : null
            dispatch(actions.searchTipoSede(idEmpleadorForm,value))
        }
    }
    
    const mapTipoSede = data && data.map(data => {
        return  data
    })
    
    useEffect(()=>{
        if(valueTipoSede && data ){
            setSedeSeleccionado(data.filter((data)=>{
                return data.nombre===valueTipoSede
            }))
        }
    },[valueTipoSede])
    
    if (data && setDataTipoSede) {
        setDataTipoSede(data)
    }

    return (
        <>
            <AutoSuggest
                onInput = {onInput}
                minType = {3}
                list = {mapTipoSede && mapTipoSede  }
                setSeleccionado = {setSeleccionado}
                valueAutoSuggest = {valueTipoSede}
                setValueAutoSuggest = {setValueTipoSede}
                textoSugerencia = {SUGERENCIA_BUSQUEDA_NOMBRE}
                textoError = {TIPO_SEDE_NO_ENCONTRADA}
                label = {'Tipo Sede'}
                shrink = {true}
                opciones = {opciones}
                setOpciones = {setOpciones}
                denuncia = {denuncia}
                nombreVariable = {'nombre'}
                loading = {loadingAutosuggestTipoSede}
                error = {errorAutosuggestTipoSede}
                errorLoc = {error}
            />
        </>
    )
}
TipoSede.propTypes = {
    valueTipoSede: PropTypes.any,
    setValueTipoSede: PropTypes.any,
    denuncia:PropTypes.any,
    dataDenuncia:PropTypes.any,
    setSedeSeleccionado:PropTypes.any,
    setDataTipoSede:PropTypes.any,
    nuevaSede:PropTypes.any
};
export default TipoSede