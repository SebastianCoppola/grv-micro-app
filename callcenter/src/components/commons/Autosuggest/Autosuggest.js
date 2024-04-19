import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
//material-ui
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";
//estilo
import { makeStyles } from "@material-ui/styles";
import Loader from "../Loading/Loader";
import { useDispatch, useSelector } from "react-redux";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles({
  contenedor: {
    backgroundColor: "white",
  },
  colorTextError: {
    color: "#e34850",
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e34850",
    },
  },
  colorTextCheck: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#747474",
    },
    "& label.Mui-focused": {
      color: "#747474",
    },
  },
  texto: {
    '&& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      borderRadius: "25px",
      height: (props) => (props.variant === "outlined" ? "37px" : null),
      padding: (props) => (props.variant === "outlined" ? "3px" : null),
    },
    "&& .MuiInput-underline:before": {
      borderBottom: (props) => (props.esFiltro ? "none" : null),
    },
    "&& .MuiInput-underline:after": {
      borderBottom: (props) => (props.esFiltro ? "none" : null),
    },
  },
});

const styles = (theme) => ({
  popper: {
    maxWidth: "fit-content",
  },
});

const AutoSuggest = (props) => {
  const { list, label, shrink, setSeleccionado, textoError, textoSugerencia, valueAutoSuggest,
    setValueAutoSuggest, variant, disabledAutosuggest, tipeo, onInput, opciones, setOpciones,
    denuncia, codigoPostal, setCambio, codigoPostalCABA2, seleccion, cambio, error, loading, cambioModulo, setCambioModulo,
    calle, errorLoc, nombreVariable, nombreBusqueda, style, placeholder, esFiltro, valueDiagnostico, underline, stopAutoHighlight, clearEscape } = props;
  const classes = useStyles(props);
  const [valueSuggest, setValueSuggest] = React.useState("");
  const [sel, setSel] = useState(false);
  const [test, setTest] = useState(false);
  const dispatch = useDispatch();
  const [error2, setError2] = useState(error ? error : false);
  const defaultProps = {
    options:
      valueSuggest && valueSuggest.length >= 3 && !loading && list ? list : [],
    getOptionLabel: (option) =>
      (valueSuggest && valueSuggest.length > 2) ||
        tipeo ||
        denuncia ||
        codigoPostalCABA2 ||
        valueDiagnostico ||
        (codigoPostal && valueSuggest && valueSuggest >= 3)
        ? option[nombreBusqueda]
          ? option[nombreBusqueda]
          : option[nombreVariable]
            ? option[nombreVariable]
            : option
        : "",
  };

  let dato =
    opciones &&
    opciones.find((com) => {
      const lowerCaseQuery =
        typeof com === "string" ? valueSuggest.toLowerCase() : null;
      com = typeof com === "number" ? com.toString() : com;

      if (!valueSuggest) {
        return true;
      } else {
        return (
          typeof com === "string" && com.toLowerCase().includes(lowerCaseQuery)
        );
      }
    });

  useEffect(() => {
    if (!seleccion) {
      setValueSuggest("");
    }
  }, [seleccion]);

  useEffect(() => {
    if (cambio) {
      setValueSuggest("");
    }
  }, [cambio]);

  const onClearSelection = () => {
    setSel(false);
  };
  const onSeleccion = () => {
    setSel(true);
  };

  if (sel && valueSuggest) {
    setSeleccionado(true);
  } else if (valueSuggest === "" || (dato === undefined && sel)) {
    setSeleccionado(false);
  }
  const handleChange = (event, value) => {
    if (value && value[nombreVariable]) {
      setValueAutoSuggest(value[nombreVariable]);
    } else setValueAutoSuggest(value);

    setTest(!test);
    if (setCambioModulo) {
      setCambioModulo(!cambioModulo)
    }
    if (setCambio) {
      setCambio(true);
    }
  };
  useEffect(() => {
    if (valueAutoSuggest === null) {
      setValueSuggest("");
    }
  }, [test, valueAutoSuggest]);

  const PopperMy = function (props) {
    return <Popper {...props} style={styles.popper} placement="bottom-start" />;
  };

  return (
    <Autocomplete
      disabled={disabledAutosuggest}
      {...defaultProps}
      id="debug"
      key={valueAutoSuggest}
      PopperComponent={calle ? PopperMy : undefined}
      autoComplete
      value={valueAutoSuggest ? valueAutoSuggest : ""}
      freeSolo
      autoHighlight={stopAutoHighlight ? false : true}
      includeInputInList
      clearOnBlur={clearEscape}
      loading={loading}
      clearOnEscape={clearEscape}
      onClose={onSeleccion}
      onChange={(event, value) => handleChange(event, value)}
      onInput={(event) => {
        setValueSuggest(event.target.value);
        if (codigoPostal && event.target.value.length > 2) {
          onInput(event.target.value);
          if (setOpciones) {
            setOpciones(list);
          }
        } else if (!codigoPostal && event.target.value.length > 2) {
          onInput(event.target.value);
          if (setOpciones) {
            setOpciones(list);
          }
        } else {
          if (setOpciones) {
            setOpciones([]);
          }
          if (onClearSelection) {
            onClearSelection();
          }
        }
      }}
      renderInput={(params) => (
        <TextField
          error={errorLoc}
          {...params}
          disabled={disabledAutosuggest}
          style={style}
          helperText={
            (!valueSuggest || (valueSuggest && valueSuggest.length < 2)) &&
              errorLoc &&
              !loading
              ? "Campo Requerido"
              : valueSuggest &&
              valueSuggest.length > 2 &&
              !loading &&
              (!error ? (
                ""
              ) : error ? (
                <div className={classes.colorTextError}>{textoError}</div>
              ) : (
                textoSugerencia
              ))
          }
          labelwidth={label ? 10 : 0}
          label={label}
          className={`${classes.texto}  
                    ${valueSuggest &&
            valueSuggest.length > 2 &&
            !loading &&
            (!error
              ? classes.colorTextCheck
              : error
                ? classes.colorTextError
                : classes.texto)
            }`}
          placeholder={placeholder ? placeholder : "Mínimo 3 caracteres"}
          variant={variant}
          InputLabelProps={{
            shrink: shrink,
          }}
          InputProps={{
            ...params.InputProps,
            disableUnderline: underline ? underline : false,
            endAdornment: (
              <>
                {valueSuggest && valueSuggest.length > 2 ? (
                  loading ? (
                    <Loader loading={loading} />
                  ) : !error ? (
                    <CheckIcon htmlColor={"#2d9d78"} />
                  ) : error ? (
                    <WarningIcon htmlColor={"#e34850"} />
                  ) : null
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
AutoSuggest.propTypes = {
  minType: PropTypes.number,
  list: PropTypes.array,
  setSeleccionado: PropTypes.string,
  valueAutoSuggest: PropTypes.any,
  setValueAutoSuggest: PropTypes.any,
  variant: PropTypes.string,
  textoSugerencia: PropTypes.any,
  textoError: PropTypes.any,
  label: PropTypes.string,
  shrink: PropTypes.bool,
  disabledAutosuggest: PropTypes.any,
  onInput: PropTypes.any,
  setOpciones: PropTypes.any,
  opciones: PropTypes.any,
  tipeo: PropTypes.any,
  denuncia: PropTypes.any,
  codigoPostal: PropTypes.any,
  setCambio: PropTypes.any,
  codigoPostalCABA2: PropTypes.any,
  dataDenuncia: PropTypes.any,
  seleccion: PropTypes.any,
  cambio: PropTypes.any,
};
export default AutoSuggest;
