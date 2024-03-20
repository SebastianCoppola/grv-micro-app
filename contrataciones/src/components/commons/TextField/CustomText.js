import React, { Fragment } from "react";
import PropTypes from "prop-types";
//material-ui
import { TextField } from "@material-ui/core";
//estilo
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  root: {
    width: (props) => props.width,
    paddingTop: (props) => props.padding,
    height: (props) => props.height,

    "& .MuiOutlinedInput-input": {
      padding: "10px",
      backgroundColor: "white",
    },
    '& .MuiInputBase-root': {
      fontSize: props => props.fontSize,
      borderRadius: props => props.radius
    },
    '& label.Mui-focused': {
      color: (props) => (props.error ? "red" : "#747474"),
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: (props) => (props.error ? "red" : "#747474"),
    },
    "& .MuiFormHelperText-root": {
      fontSize: "0.6rem",
    },
    "&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
    {
      appearance: " none",
      margin: 0,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: (props) => props.borderRadius,
    },
    "& .MuiOutlinedInput-adornedEnd": {
      backgroundColor: "white",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: (props) => (props.border ? "2px solid red" : "solid 2px rgba(202, 202, 202)"),
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: (props) => (props.border ? "2px solid red" : "solid 2px rgba(202, 202, 202)"),
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: (props) => (props.border ? "2px solid red" : "solid 2px rgba(202, 202, 202)"),
    },
  },
});
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      decimalSeparator={null}
      displayType="input"
      type="text"
      thousandSeparator={false}
      allowNegative={false}
      isNumericString={false}
      allowLeadingZeros={true}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const CustomText = (props) => {
  const {
    label,
    id,
    placeholder,
    defaultValue,
    rowMax,
    multiline,
    type,
    width,
    disabled,
    fullwidth,
    onChange,
    value,
    shrink,
    padding,
    helperText,
    onKey,
    variant,
    endAdornment,
    ref,
    focus,
    error,
    name,
    onwhel,
    inputComponente,
    maxlenght,
    maxCaracteres,
    style,
    borderRadius,
    inputStyle,
    inputRef,
  } = props;
  const classes = useStyles(props);

  return (
    <Fragment>
      <TextField
        inputRef={inputRef}
        autoFocus={focus}
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        fullWidth={fullwidth}
        className={classes.root}
        defaultValue={defaultValue}
        helperText={helperText}
        id={id}
        style={style}
        label={label}
        type={type}
        onWheel={onwhel}
        multiline={multiline}
        rows={rowMax}
        placeholder={placeholder}
        onKeyDown={onKey}
        variant={variant}
        autoComplete="off"
        InputProps={{
          style: inputStyle,
          endAdornment: endAdornment,
          inputComponent: inputComponente && NumberFormatCustom,
        }}
        inputProps={{
          maxLength: maxCaracteres,
        }}
        InputLabelProps={{
          shrink: shrink,
        }}
        onInput={(e) => {
          e.target.value = maxlenght
            ? Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, maxlenght)
            : e.target.value;
        }}
        error={error}
      />
    </Fragment>
  );
};

CustomText.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  fullwidth: PropTypes.bool,
  width: PropTypes.string,
  shrink: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.any,
  value: PropTypes.any,
  shrink: PropTypes.bool,
  padding: PropTypes.string,
  helperText: PropTypes.string,
  rowMax: PropTypes.number,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onKey: PropTypes.any,
  variant: PropTypes.string,
  height: PropTypes.string,
  endAdornment: PropTypes.any,
  border: PropTypes.bool,
  disabled: PropTypes.any,
  ref: PropTypes.any,
  focus: PropTypes.any,
  error: PropTypes.any,
  fontSize: PropTypes.any

};

export default CustomText;
