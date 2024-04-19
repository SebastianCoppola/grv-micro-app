import { InputLabel, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import Loader from "../Loading/Loader";
import CheckIcon from "@material-ui/icons/Check";
import WarningIcon from "@material-ui/icons/Warning";
//estilo
import { makeStyles } from "@material-ui/styles";
import CustomTypography from "../Typography/CustomTypography";

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
      borderBottom: "none",
    },
    "&& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
});

const MultipleAutocomplete = (props) => {
  const {
    list, label, textoError, textoSugerencia, disabledAutosuggest, onInput, opciones, setOpciones,
    error, loading, errorLoc, valueSuggest, setValueSuggest,
  } = props;
  const classes = useStyles(props);
  const [valueAuto, setValueAuto] = React.useState()

  const handleChange = (event, value) => {
    setValueSuggest(value)
  };

  const onSeleccion = () => {
    setValueAuto(null)
  }
  const clearEscape = () => { };

  return (
    <>
      <Autocomplete
        //{...defaultProps}
        multiple
        size="small"
        limitTags={1}
        id="tags-filled"
        autoHighlight
        includeInputInList
        loading={loading}
        options={valueAuto && valueAuto.length > 2 && !loading && list ? list : []}
        onClose={onSeleccion}
        getOptionLabel={(option) => option.descripcion}
        value={valueSuggest}
        filterSelectedOptions
        clearOnEscape={clearEscape}
        //onClose={onSeleccion}
        onChange={(event, value) => handleChange(event, value)}
        freeSolo
        onInput={(event) => {
          setValueAuto(event.target.value);
          if (event.target.value.length > 2) {
            onInput(event.target.value);
            if (setOpciones) {
              setOpciones(list);
            }

          } else {
            if (setOpciones) {
              setOpciones([]);
            }

          }
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <div style={option && option.estado === false ? { color: 'red' } : null}>
              {option.descripcion}
            </div>
          </React.Fragment>
        )}
        renderInput={(params) => (
          <>
            <InputLabel shrink>{label}</InputLabel>
            <TextField
              error={errorLoc}
              {...params}
              disabled={disabledAutosuggest}
              helperText={
                (!valueAuto || (valueAuto && valueAuto.length < 2)) &&
                  errorLoc &&
                  !loading
                  ? "Campo Requerido"
                  : valueAuto &&
                  valueAuto.length > 2 &&
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
              //  label = {label}

              className={`${classes.texto}  
                    ${valueAuto &&
                valueAuto.length > 2 &&
                !loading &&
                (!error
                  ? classes.colorTextCheck
                  : error
                    ? classes.colorTextError
                    : classes.texto)
                }`}
              placeholder={"Minimo 3 caracteres"}
              variant={"outlined"}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {valueAuto && valueAuto.length > 2 ? (
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
          </>
        )}
      />
    </>
  );
};
export default MultipleAutocomplete;
