import React from 'react'
import PropTypes from 'prop-types';
import { Snackbar, Grid, FormControlLabel, IconButton, Alert } from '@mui/material';
import CustomButton from '../Button/CustomButton';
import CloseIcon from '@mui/icons-material/AccessAlarms';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import CustomSwitch from '../CustomSwitch/customSwitch';

const classes = {
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: 20,
    },
    '&& .MuiAlert-outlinedError': {
      color: '#ff7052'
    },
    '& .MuiAlert-outlinedInfo': {
      backgroundColor: 'rgba(47, 97, 213, 0.1)',
      color: '#5151d3'
    },
    '& .MuiAlert-outlinedInfo .MuiAlert-icon': {
      color: '#5151d3'
    }
  },
  switch: {
    width: '396px',
    borderRadius: '5px',
    border: 'solid 1px #f29423',
    padding: '10px',
    fontSize: '15px',

  },
  textoSwitch: {
    color: '#f29423'
  }
};

const CustomAlert = (props) => {
  const { open, onClose, severity, message, variant, snack, boton, handleClickAlert,
    recordatorioAlert, tituloRecordatorio, nameSwitch, handleChangeSwitch,
    checkedSwitch, labelSwitch } = props

  return (
    message ?
      <div sx={classes.root}>
        {
          <Alert onClose={onClose} variant={variant} severity={severity}>{message}</Alert>
        }
      </div>
      : null
  )
}
CustomAlert.propTypes = {
  open: PropTypes.any,
  severity: PropTypes.any,
  message: PropTypes.string,
  onClose: PropTypes.any,
  variant: PropTypes.string,
  snack: PropTypes.any,
  boton: PropTypes.bool,
  handleClickAlert: PropTypes.any,
  recordatorioAlert: PropTypes.any,
  tituloRecordatorio: PropTypes.string,
  nameSwitch: PropTypes.string,
  handleChangeSwitch: PropTypes.any,
  checkedSwitch: PropTypes.any,
  labelSwitch: PropTypes.string
};
export default CustomAlert

