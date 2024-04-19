import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import AutoSuggest from "../commons/Autosuggest/Autosuggest";
import {
  PROVINCIA_NO_ENCONTRADA,
  SUGERENCIA_BUSQUEDA_NOMBRE,
} from "../../Utils/const";
import MultipleAutocomplete from "../commons/Autosuggest/MultipleAutocomplete";

const Provincia = (props) => {
  const {
    valueProvincia,
    setValueProvincia,
    setDataProvincia,
    denuncia,
    setCambioProv,
    disabled,
    sede,
    cambio,
    multiple,
    style,
  } = props;
  const data = useSelector((state) => state.ubicacion.findProvincias);
  const [seleccionado, setSeleccionado] = React.useState(false);
  const [opciones, setOpciones] = React.useState([]);
  const [valueSuggestWrite, setValueSuggestWrite] = React.useState("");
  const loadingAutosuggestProvincia = useSelector(
    (state) => state.ubicacion.loadingAutosuggestProvincia
  );
  const errorAutosuggestProvincia = useSelector(
    (state) => state.ubicacion.errorAutosuggestProvincia
  );
  const dispatch = useDispatch();

  const onInput = (value) => {
    dispatch(actions.searchProvincias(value));
  };

  const mapProvincias =
    data &&
    data.map((data) => {
      return data;
    });

  if (data && setDataProvincia) {
    setDataProvincia(data);
  }
  return (
    <>
      {multiple ? (
        <MultipleAutocomplete
          onInput={onInput}
          minType={3}
          setSeleccionado={setSeleccionado}
          label={"Provincia"}
          shrink={true}
          opciones={opciones}
          setOpciones={setOpciones}
          nombreVariable={"descripcion"}
          style={style}
        />
      ) : (
        <AutoSuggest
          onInput={onInput}
          minType={3}
          list={mapProvincias}
          setSeleccionado={setSeleccionado}
          valueAutoSuggest={valueProvincia}
          setValueAutoSuggest={setValueProvincia}
          textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
          textoError={PROVINCIA_NO_ENCONTRADA}
          label={"Provincia"}
          shrink={true}
          disabledAutosuggest={disabled}
          setOpciones={setOpciones}
          denuncia={denuncia || sede}
          setCambio={setCambioProv}
          cambio={cambio}
          nombreVariable={"descripcion"}
          loading={loadingAutosuggestProvincia}
          error={errorAutosuggestProvincia}
          cambio={cambio}
          style={style}
        />
      )}
    </>
  );
};
Provincia.propTypes = {
  valueProvincia: PropTypes.any,
  setValueProvincia: PropTypes.any,
  setDataProvincia: PropTypes.any,
  denuncia: PropTypes.any,
  setCambioProv: PropTypes.any,
  disabled: PropTypes.bool,
};
export default Provincia;
