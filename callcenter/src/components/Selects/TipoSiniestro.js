import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import CustomSelect from "../commons/Select/customSelect";

const TipoSiniestro = (props) => {
  const {
    handleChangeSelectSiniestro,
    valSiniestro,
    error,
    helperTextSelect,
    colorHelper,
    isOutline,
    filtros,
    setTipoSiniestroCodigo,
    disableEdition
  } = props;
  const data = useSelector((state) => state.listados.tipoSiniestro);
  const descripcion = useSelector((state) =>
    state.listados.tipoSiniestro.map((item) => ({
      codigo: item.descripcion,
      descripcion: item.descripcion,
    }))
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    if(setTipoSiniestroCodigo){
      setTipoSiniestroCodigo(data.filter(it=>it.codigo===valSiniestro))
    }
  },[valSiniestro])
  useEffect(() => {
    dispatch(actions.searchTipoSiniestro());
  }, []);

  const mapTipoSiniestro =
    data &&
    data.map((data) => {
      return {
        descripcion: data.descripcion,
        codigoSRT: data.codigoSRT,
        id: data.idTipoSiniestro,
        codigoProvart: data.codigoProvart,
      };
    });

  return (
    <CustomSelect
      titulo={"Tipo Siniestro"}
      data={data && data}
      fullwidth={true}
      seleccione={true}
      handleChangeSelect={(event) => handleChangeSelectSiniestro(event)}
      val={valSiniestro ? valSiniestro : ""}
      error={error}
      helperTextSelect={helperTextSelect}
      colorHelper={colorHelper}
      isOutline={isOutline}
      disabled={disableEdition}
    />
  );
};
TipoSiniestro.propTypes = {
  handleChangeSelectSiniestro: PropTypes.any,
  valSiniestro: PropTypes.any,
};

export default TipoSiniestro;
