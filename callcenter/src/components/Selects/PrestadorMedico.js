import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const PrestadorMedico = props => {
    const { handleChangePrestadorMedico, valPrestadorMedico } = props;
    const data = useSelector(state => state.listados.prestadorMedicoTipos)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.getListadoPrestadorMedicoTiposSelect())
    }, [])
    
    return (
        <CustomSelect
            titulo = {'Tipo prestador médico'}
            data = {data && data}
            fullwidth = {true}
            placeholder='Todos'
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangePrestadorMedico(event)}
            isOutline={true}
            val = {valPrestadorMedico ? valPrestadorMedico: null}
        />
    );
};


export default PrestadorMedico;
