import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const EstadoInternacion = props => {
    const { handleChangeSelectEstadoInternacion, valEstadoInternacion, error, helperTextSelect, colorHelper, disableEdition } = props;
    const data = useSelector(state => state.listados.estadoInternacion)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.searchEstadoInternacion())
    }, [])

    return (
        <CustomSelect
            titulo = {'Estado de internación'}
            data = {data && data}
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectEstadoInternacion(event)}
            val = {valEstadoInternacion ? valEstadoInternacion : ""}
            error = {error}
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
            disabled={disableEdition}
        />
    );
};
EstadoInternacion.propTypes = {
    handleChangeSelectEstadoInternacion: PropTypes.any,
    valEstadoInternacion: PropTypes.any,
};

export default EstadoInternacion;
