import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const PatologiaTrazadora = props => {
    const { handleChangeSelectPatologia, valPatologia, disableEdition } = props;
    const data = useSelector(state => state.listados.patologiaTrazadora)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(actions.searchPatologiaTrazadora())
    }, [])
    
    return (
        <CustomSelect
            titulo = {'Patología trazadora'}
            data = {data && data}
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectPatologia(event)}
            val = {valPatologia}
            disabled={disableEdition}
        />
    );
};
PatologiaTrazadora.propTypes = {
    handleChangeSelectPatologia: PropTypes.any,
    valPatologia: PropTypes.any
};

export default PatologiaTrazadora;
