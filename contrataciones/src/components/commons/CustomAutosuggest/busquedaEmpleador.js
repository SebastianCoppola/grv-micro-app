import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import AutoSuggest from "../commons/Autosuggest/Autosuggest";
import MultipleAutocomplete from "../commons/Autosuggest/MultipleAutocomplete";
import {
  EMPLEADOR_NO_ENCONTRADO,
  SUGERENCIA_BUSQUEDA,
} from "../../Utils/const";

const BusquedaEmpleador = (props) => {
  const { valueEmpleador, setValueEmpleador, setSeleccionado, setCodigoSeleccionado, seleccion,
    fechaOcurrenciaValidar, reingresoValidar, style, multiple, referencia, idCliente,
    cambioCliente, setCambioCliente } = props;
  const data = useSelector((state) => state.persona.empleador);
  const dataTodos = useSelector((state) => state.persona.empleadorTodos)
  const [opciones, setOpciones] = React.useState([]);

  const loadingAutosuggestBusquedaEmpleador = useSelector(
    (state) => state.persona.loadingAutosuggestBusquedaEmpleador
  );
  const loadingAutosuggestBusquedaEmpleadorTodos = useSelector(
    (state) => state.persona.loadingAutosuggestBusquedaEmpleadorTodos
  );
  const errorAutosuggestBusquedaEmpleador = useSelector(
    (state) => state.persona.errorAutosuggestBusquedaEmpleador
  );
  const errorAutosuggestBusquedaEmpleadorTodos = useSelector(
    (state) => state.persona.errorAutosuggestBusquedaEmpleadorTodos
  );
  const dispatch = useDispatch();

  const onInput = (value) => {
    let request = {
      descripcion: value,
      fechaOcurrencia: fechaOcurrenciaValidar,
      reingreso: reingresoValidar,
      idCliente: idCliente ? idCliente : null
    };
    dispatch(actions.searchEmpleador(request));
  };
  const onInputTodos = (value) => {
    let request = {
      descripcion: value,
      idCliente: idCliente ? idCliente : null
    };
    dispatch(actions.searchEmpleadorTodos(request));
  };
  const mapEmpleador =
    data &&
    data.map((data) => {
      return data;
    });

  const mapEmpleadorTodos =
    dataTodos &&
    dataTodos.map((data) => {
      return data;
    });

  useEffect(() => {
    if (valueEmpleador && data && !multiple) {
      setCodigoSeleccionado(
        data.filter((data) => {
          return data.descripcion === valueEmpleador;
        })
      );
    } else if (valueEmpleador && dataTodos && multiple) {
      setCodigoSeleccionado(
        dataTodos.filter((data) => {
          return data.descripcion === valueEmpleador;
        })
      );
    }
  }, [valueEmpleador]);

  useEffect(() => {
    if (mapEmpleador.length === 0) {
      setSeleccionado(false);
    }
  }, [mapEmpleador]);

  useEffect(() => {
    if (mapEmpleadorTodos.length === 0) {
      setSeleccionado(false);
    }
  }, [mapEmpleadorTodos]);

  useEffect(() => {
    if (idCliente && multiple && cambioCliente) {
      setValueEmpleador([]) 
    }
    if(cambioCliente){
      setCambioCliente(false)
    }
  }, [idCliente])

  return (
    <>
      {multiple ? (
        <MultipleAutocomplete
          onInput={onInputTodos}
          minType={3}
          list={mapEmpleadorTodos}
          setSeleccionado={setSeleccionado}
          valueSuggest={valueEmpleador}
          setValueSuggest={setValueEmpleador}
          textoSugerencia={SUGERENCIA_BUSQUEDA}
          textoError={EMPLEADOR_NO_ENCONTRADO}
          label={"Búsqueda Empleador"}
          shrink={true}
          opciones={opciones}
          setOpciones={setOpciones}
          seleccion={seleccion}
          nombreVariable={"descripcion"}
          loading={loadingAutosuggestBusquedaEmpleadorTodos}
          error={errorAutosuggestBusquedaEmpleadorTodos}
          style={style}
        //inputRef={referencia}
        />
      ) : (
        <AutoSuggest
          onInput={onInput}
          minType={3}
          list={mapEmpleador}
          setSeleccionado={setSeleccionado}
          valueAutoSuggest={valueEmpleador}
          setValueAutoSuggest={setValueEmpleador}
          textoSugerencia={SUGERENCIA_BUSQUEDA}
          textoError={EMPLEADOR_NO_ENCONTRADO}
          label={"Búsqueda Empleador"}
          shrink={true}
          opciones={opciones}
          setOpciones={setOpciones}
          seleccion={seleccion}
          nombreVariable={"descripcion"}
          loading={loadingAutosuggestBusquedaEmpleador}
          error={errorAutosuggestBusquedaEmpleador}
          style={style}
        />
      )}
    </>
  );
};
BusquedaEmpleador.propTypes = {
  valueEmpleador: PropTypes.any,
  setValueEmpleador: PropTypes.any,
  setSeleccionado: PropTypes.any,
  setCodigoSeleccionado: PropTypes.any,
  seleccion: PropTypes.any,
};
export default BusquedaEmpleador;
