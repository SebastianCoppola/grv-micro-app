import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'
import { useDispatch, useSelector } from 'react-redux'

const Sexo = props => {
    const { handleChangeSelectSexo, valSexo,name, error, helperTextSelect, colorHelper } = props;
    const data = useSelector(state => state.listados.sexo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.searchSexo())
    }, [])

    return (
        <CustomSelect
            titulo = {'Sexo'}
            data = {data}
            name = {name}
            seleccione={true}
            error = {error}
            helperTextSelect = {helperTextSelect}
            fullwidth = {true}
            handleChangeSelect = {(event) => handleChangeSelectSexo(event)}
            val = {valSexo ? valSexo :""}
            colorHelper = {colorHelper}
        />
    );
};

Sexo.propTypes = {
    handleChangeSelectSexo: PropTypes.any,
    valSexo: PropTypes.any
};

export default Sexo;