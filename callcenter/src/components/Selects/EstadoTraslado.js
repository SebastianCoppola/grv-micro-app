import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const EstadoTraslado = props => {
    
    const {disabled, isOutline, titulo, placeholder, val, handleChangeSelect,
        variant, fontSize, seleccione, fullwidth, height } = props

    const dispatch = useDispatch()
    
    const data = useSelector(state => state.listados.estadoTraslado)
        
    useEffect(() => {
        dispatch(actions.serchEstadosTraslado())
    }, [])
    
    const mapOperadores = data && data.map(data => { 
        return{descripcion: data.descripcion, codigo: data.codigo}
    })
        
    return (
        <CustomSelect
            disabled = {disabled}
            titulo = {titulo}
            data = {mapOperadores && mapOperadores}
            fullwidth = {fullwidth}
            seleccione = {seleccione}
            handleChangeSelect = {handleChangeSelect}
            val = {val}
            isOutline = {isOutline}
            placeholder = {placeholder}
            variant = {variant}
            fontSize = {fontSize}
            height={height}
        />
    )
}

EstadoTraslado.propTypes = {
    disabled: PropTypes.bool,
    isOutline: PropTypes.bool, 
    titulo: PropTypes.any, 
    placeholder: PropTypes.any, 
    val: PropTypes.any, 
    handleChangeSelect: PropTypes.any,
    variant: PropTypes.any, 
    fontSize: PropTypes.any, 
    seleccione: PropTypes.any, 
    fullwidth: PropTypes.any, 
};

export default EstadoTraslado
