import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'

const TipoDNI = props => {
    const { handleChangeSelectTipoDni, valTipoDni,
        estilo , variantTitulo, titulo, setDataDoc } = props;
    const data = useSelector(state => state.listados.tipoDNI)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.searchTipoDNI())
    }, [])

    if(data){
       setDataDoc(data)
    }

    return (
        <CustomSelect
            estilo = {estilo}
            titulo = {titulo ? 'Tipo' : null}
            data = {data}
            fullwidth = {true}
            handleChangeSelect = {handleChangeSelectTipoDni}
            val = {valTipoDni ? valTipoDni : ""}
            variantTitulo = {variantTitulo}
        />
    );
};
TipoDNI.propTypes = {
    handleChangeSelectTipoDni: PropTypes.any,
    valTipoDni: PropTypes.any,
    variantTitulo: PropTypes.any,
    estilo: PropTypes.any,
    titulo:PropTypes.any,
    setTipoDni:PropTypes.any,
    setDataDoc:PropTypes.any
};

export default TipoDNI;
