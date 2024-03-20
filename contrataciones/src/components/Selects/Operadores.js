import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import CustomSelect from "../commons/Select/customSelect";

const Operadores = (props) => {
  const {
    disabled,
    isOutline,
    titulo,
    placeholder,
    val,
    handleChangeSelect,
    variant,
    fontSize,
    seleccione,
    fullwidth,
  } = props;
  const data = useSelector((state) => state.listados.operadores);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.serchOperadores());
  }, []);

  const mapOperadores =
    data &&
    data.map((data) => {
      return { descripcion: data.descripcion, codigo: data.codigo };
    });

  return (
    <CustomSelect
      disabled={disabled}
      titulo={titulo}
      data={mapOperadores && mapOperadores}
      fullwidth={fullwidth}
      seleccione={seleccione}
      handleChangeSelect={handleChangeSelect}
      val={val}
      isOutline={isOutline}
      placeholder={placeholder}
      variant={variant}
      fontSize={fontSize}
    />
  );
};

Operadores.propTypes = {
  disabled: PropTypes.bool,
  isOutline: PropTypes.bool,
  titulo: PropTypes.any,
  placeholder: PropTypes.any,
  val: PropTypes.any,
  handleChangeSelect: PropTypes.any,
  variant: PropTypes.any,
  fontSize: PropTypes.any,
  seleccione: PropTypes.any,
  fullwidth: PropTypes.any,
};

export default Operadores;
