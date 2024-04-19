import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CustomSelect from '../commons/Select/customSelect'
import * as actions from '../../redux/actions/index'

const ModalidadTrabajo = (props) => {
    const { handleChangeSelectModalidadTrabajo, valModalidadTrabajo, colorHelper, helperTextSelect, error, placeholder } = props;
    const data = useSelector(state => state.listados.listadoModalidadTrabajo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getListadoModalidadTrabajo())
    }, [])

    return (
        <CustomSelect
            titulo={'Modalidad de Trabajo'}
            data={data && data}
            fullwidth={true}
            seleccione={true}
            handleChangeSelect={(event) => handleChangeSelectModalidadTrabajo(event.target.value, data)}
            val={valModalidadTrabajo ? valModalidadTrabajo : ""}
            error={error}
            helperTextSelect={helperTextSelect}
            colorHelper={colorHelper}
            placeholder={placeholder}
        />
    )
}
export default ModalidadTrabajo

// const data = [
//     {codigo:1, descripcion: 'Presencial'},
//     {codigo:2, descripcion: 'Remoto'},
//     {codigo:3, descripcion: 'Mixto'}
// ]