import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//estilo
import { TextField, createTheme } from '@mui/material';
import * as NumberFormat from "react-number-format"
 
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
  const { label, id, placeholder, defaultValue, rowMax, multiline, type, width, disabled,
    fullwidth, onChange, value, shrink, padding, helperText, onKey, variant, endAdornment, ref, focus, error,
    name, onwhel, inputComponente } = props

  return (
    <Fragment>
      <TextField
        autoFocus={focus}
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        fullWidth={fullwidth}
        sx={{
          width: props.width,
          paddingTop: props.padding,

          height: props.height,
          '& .MuiOutlinedInput-input': {
            padding: '10px',
            backgroundColor: 'white',
          },
          '& label.Mui-focused': {
            color: props.error ? 'red' : '#747474',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: props.error ? 'red' : '#747474',
          },
          '& .MuiFormHelperText-root': {
            fontSize: '0.6rem'
          },
          '&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            appearance: ' none',
            margin: 0,
          },
          '& .MuiOutlinedInput-adornedEnd': {
            backgroundColor: 'white'
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: props.border ? '2px solid red' : null
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: props.border ? '2px solid red' : null
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: props.border ? '2px solid red' : null
          }
        }}
        defaultValue={defaultValue}
        helperText={helperText}
        id={id}

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
          endAdornment: endAdornment,
          inputComponent: inputComponente && NumberFormatCustom,
        }}
        InputLabelProps={{
          shrink: shrink,

        }}
        error={error} />
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
  error: PropTypes.any

};

export default CustomText;