import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'
	
const EstadoCivil = props => {
    const { handleChangeSelectCivil, valCivil, error, helperTextSelect, colorHelper } = props;
    const data = useSelector(state => state.listados.estadoCivil)
    const dispatch = useDispatch()
    
    useEffect(() => {
	    dispatch(actions.searchEstadoCivil())
	}, [])
	

	const mapEstadoCivil = data.map(data => { 
        return{descripcion: data.descripcion, id: data.idEstadoCivil}
    })
     
    return (
        <CustomSelect
            titulo = {'Estado Civil'}
            data = {data && data}
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectCivil(event, data)}
            val = {valCivil ? valCivil : ""}
            error = {error}
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
	    />
	)
}

	EstadoCivil.propTypes = {
	    handleChangeSelectCivil: PropTypes.any,
	    valCivil: PropTypes.any
	};
	
export default EstadoCivil;