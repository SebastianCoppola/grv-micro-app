import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const Circunstancia = props => {

    const { handleChangeSelectCircunstacia, valCircunstacia, error, helperTextSelect, colorHelper, disableEdition} = props;
    const data = useSelector(state => state.listados.circunstancia)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.searchCircunstancia())
    }, [])

    return (
        <CustomSelect
            titulo = {'Circunstancia'}
            data = {data && data }
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectCircunstacia(event)}
            val = {valCircunstacia ? valCircunstacia: ""}
            error = {error}
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
            disabled={disableEdition}
        />
    );
};
Circunstancia.propTypes = {
    handleChangeSelectCircunstacia: PropTypes.any,
    valCircunstacia: PropTypes.any
};

export default Circunstancia;
