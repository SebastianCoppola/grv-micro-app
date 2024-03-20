import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import CustomSelect from "../commons/Select/customSelect";

const EstadoMedico = (props) => {
  const {
    handleChangeSelectEstadoMedico,
    valEstadoMedico,
    error,
    helperTextSelect,
    colorHelper,
    titulo,
    isOutline,
    setEstadoMedicoCodigo, 
    disableEdition
  } = props;
  const data = useSelector((state) => state.listados.estadoMedico);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.searchEstadoMedico());
  }, []);

  useEffect(()=>{
    if(setEstadoMedicoCodigo){
      setEstadoMedicoCodigo(data.filter(it=>it.codigo===valEstadoMedico))
    }
  },[valEstadoMedico])

  return (
    <CustomSelect
      titulo={titulo ? titulo : "Estado médico activo"}
      data={data}
      fullwidth={true}
      seleccione={true}
      handleChangeSelect={(event) => handleChangeSelectEstadoMedico(event)}
      val={valEstadoMedico ? valEstadoMedico : ""}
      error={error}
      helperTextSelect={helperTextSelect}
      colorHelper={colorHelper}
      isOutline={isOutline}
      disabled={disableEdition}
    />
  );
};
EstadoMedico.propTypes = {
  handleChangeSelectEstadoMedico: PropTypes.any,
  valEstadoMedico: PropTypes.any,
};

export default EstadoMedico;
