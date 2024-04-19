import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTiposContactosSelect } from '../../redux/actions/listados';
import Utils from '../../Utils/utils';
import CustomSelect from '../commons/Select/customSelect';

const TipoContacto = (props) => {
  const { handleChangeSelectTipoContacto, tipoContacto, disabled } = props;
  const dispatch = useDispatch();
  const data = useSelector(state => state.listados.tiposContactosSelect)

  useEffect(() => {
    dispatch(fetchTiposContactosSelect())
  }, [])
  return (
    <CustomSelect
      titulo={'Tipo de contacto *'}
      disabled={disabled}
      data={data}
      fullwidth={true}
      placeholder={'Seleccionar'}
      seleccione={true}
      handleChangeSelect={handleChangeSelectTipoContacto}
      val={tipoContacto}
      error={Utils.validarCamposEditar((tipoContacto !== "") ? tipoContacto : null, 1)}
      helperTextSelect={Utils.validarCamposEditar((tipoContacto !== "") ? tipoContacto : null, 1) ? 'Campo Requerido' : null}
      colorHelper={Utils.validarCamposEditar((tipoContacto !== "") ? tipoContacto : null, 1) ? 'red' : null}
    />
  )
}

export default TipoContacto
