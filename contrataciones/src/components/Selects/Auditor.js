import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomText from '../commons/TextField/CustomText';

const Auditor = (props) => {
    const { codigo, titulo, valAuditor, setValueAuditor } = props;
    const data = useSelector(state => state.listados.auditor)

    const dispatch = useDispatch()
    useEffect(() => {
        if (codigo) {
            dispatch(actions.searchAuditor(codigo, callback))
        }
    }, [codigo])

    const callback = (succes, data) => {
        if (succes) {
            setValueAuditor(data && data.codigo ? data.codigo : null)
        }
    }

    return (
        <CustomText
            label={titulo}
            shrink={true}
            disabled={true}
            fullwidth={true}
            value={data && data.descripcion ? data.descripcion : " "}
            id='auditor'
        />
    )
}
Auditor.propTypes = {
    codigo: PropTypes.any,
    titulo: PropTypes.any
};
export default Auditor