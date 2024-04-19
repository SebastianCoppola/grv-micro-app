import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const LocalidadesSelect = props => {

    const { handleChangeLocalidadesSelect, valLocalidadesSelect, setValLocalidadesSelect, setDatos, datos, idProv, error, helperTextSelect, colorHelper} = props;
    const dataLocalidades = useSelector(state => state.ubicacion.localidadesSelect)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(idProv!==null || idProv!==''){
            let request = {
                "idProvincia": idProv
            }
            dispatch(actions.searchLocalidadesSelect(request))
        } 
        setValLocalidadesSelect(null)
    },[idProv])
   

    return (
        <CustomSelect
            titulo = {'Localidad'}
            data = {dataLocalidades && dataLocalidades }
            fullwidth = {true}
            seleccione = {true}
            disabled ={idProv === null || idProv === ''}
            handleChangeSelect = {(event) => handleChangeLocalidadesSelect(event)}
            val = {valLocalidadesSelect ? valLocalidadesSelect : ""}
            error = {error}
            isOutline={true}
            placeholder = 'Seleccionar Localidad'
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
        />
    );
};


export default LocalidadesSelect;
