import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import CustomSelect from "../commons/Select/customSelect";

const Tramitador = (props) => {
  const {
    valTramitador,
    handleChangeSelectTramitador,
    titulo,
    error,
    helperTextSelect,
    placeholder,
    height,
    isOutline,
    seleccione,
    filtros,
    setTramitadorCodigo,
    disableEdition,
    fontSize
  } = props;

  const dispatch = useDispatch();
  const data = useSelector((state) => state.listados.tramitador);
  const descripcion = useSelector((state) =>
    state.listados.tramitador.map((item) => ({
      codigo: item.descripcion,
      descripcion: item.descripcion,
    }))
  );

  useEffect(() => {
    dispatch(actions.searchTramitador());
  }, []);

useEffect(()=>{
  if(setTramitadorCodigo){
    setTramitadorCodigo(data.filter((it)=> it.codigo===valTramitador))
  }
},[valTramitador])

  return (
    <CustomSelect
      titulo={titulo}
      data={data}
      fullwidth={true}
      handleChangeSelect={(event) => handleChangeSelectTramitador(event)}
      val={valTramitador ? valTramitador : ""}
      error={error}
      helperTextSelect={helperTextSelect}
      placeholder={placeholder}
      height={height}
      isOutline={isOutline}
      seleccione={seleccione}
      filtros={filtros}
      disabled={disableEdition}
      fontSize={fontSize}
    />
  );
};
Tramitador.propTypes = {
  valTramitador: PropTypes.any,
  handleChangeSelectTramitador: PropTypes.func,
  titulo: PropTypes.any,
};
export default Tramitador;
