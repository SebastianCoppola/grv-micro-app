import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import CustomSelect from "../commons/Select/customSelect";

const SeveridadDenuncia = (props) => {
  const {
    titulo,
    handleChangeSeveridadDenuncia,
    valSeveridadDenuncia,
    error,
    helperTextSelect,
    colorHelper,
    isOutline,
    filtros,
    setSeveridadCodigo,
    disableEdition
  } = props;
  const data = useSelector((state) => state.listados.severidadDenuncia);
  const descripcion = useSelector((state) =>
    state.listados.severidadDenuncia.map((item) => ({
      codigo: item.descripcion,
      descripcion: item.descripcion,
    }))
  );
  const dispatch = useDispatch();
    useEffect(()=>{
      if(setSeveridadCodigo){
        setSeveridadCodigo(data.filter(it=>it.codigo===valSeveridadDenuncia))
      }
    },[valSeveridadDenuncia])
  useEffect(() => {
    dispatch(actions.searchSeveridadDenuncia());
  }, []);

  const mapSeveridadDenuncia = data.map((data) => {
    return {
      descripcion: data.descripcion,
      codigoProvart: data.codigoProvart,
      id: data.idSeveridadDenuncia,
    };
  });

  return (
    <CustomSelect
      titulo={titulo ? titulo : "Severidad denuncia"}
      data={data && data}
      fullwidth={true}
      seleccione={true}
      handleChangeSelect={(event) => handleChangeSeveridadDenuncia(event)}
      val={valSeveridadDenuncia ? valSeveridadDenuncia : ""}
      error={error}
      helperTextSelect={helperTextSelect}
      colorHelper={colorHelper}
      isOutline={isOutline}
      disabled={disableEdition}
    />
  );
};
SeveridadDenuncia.propTypes = {
  handleChangeSeveridadDenuncia: PropTypes.any,
  valSeveridadDenuncia: PropTypes.any,
};

export default SeveridadDenuncia;
