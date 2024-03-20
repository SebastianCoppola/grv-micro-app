import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const Nacionalidad = props => {
    const { handleChangeSelectNac, valNacionalidad, error, helperTextSelect, colorHelper } = props;
    const data = useSelector(state => state.listados.nacionalidad)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.searchNacionalidad())
    }, [])

    const mapNacionalidad = data.map(data => { 
        return{descripcion: data.nombre, codigoPais: data.codigoPais, id:data.codigo }
    })

    return (
        <CustomSelect
            titulo = {'Nacionalidad'}
            data = {data}
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectNac(event, data)}
            val = {valNacionalidad ? valNacionalidad :""}
            error = {error}
            helperTextSelect = {helperTextSelect}
            colorHelper = {colorHelper}
        />
    );
};
Nacionalidad.propTypes = {
    handleChangeSelectNac: PropTypes.any,
    valNacionalidad: PropTypes.any
};

export default Nacionalidad;
