import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const LugarAccidente = props => {
    const { handleChangeLugarAccidente, valueLugarAccidente, error, helperTextSelect, colorHelper, disableEdition } = props;
    const data = useSelector(state => state.listados.lugarAccidente)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.searchLugarAccidente())
    }, [])

    return (
        <CustomSelect
            seleccione = {true}
            titulo = {'Lugar accidente'}
            data = {data && data}
            fullwidth = {true}
            handleChangeSelect = {(event) => handleChangeLugarAccidente(event)}
            val = {valueLugarAccidente ? valueLugarAccidente :""}
            error = {error}
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
            disabled={disableEdition}
        />
    );
};
LugarAccidente.propTypes = {
    handleChangeLugarAccidente: PropTypes.any,
    valueLugarAccidente: PropTypes.any
};

export default LugarAccidente;
