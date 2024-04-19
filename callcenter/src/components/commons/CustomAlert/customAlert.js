import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CustomButton from '../Button/CustomButton';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
//estilo
import { makeStyles } from '@material-ui/core/styles';
import CustomSwitch from '../CustomSwitch/customSwitch';

const useStyles = makeStyles({
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
  },
  alertaColor:{
    color:'#ff7052',
    border: '1px solid #ff7052'
  }
})

const CustomAlert = (props) => {
  const classes = useStyles(props)
  const { open, onClose, severity, message, variant, snack, boton, handleClickAlert, customStyle,
    recordatorioAlert, tituloRecordatorio, nameSwitch, handleChangeSwitch,
    checkedSwitch, labelSwitch, icon, color, autoHideDuration, disableEdition, vertical } = props

  return (
    message ?
      <div className={classes.root}>
        {snack ?
          <Snackbar open={open} autoHideDuration={autoHideDuration ? autoHideDuration : 6000} onClose={onClose} >

            <Alert onClose={onClose} variant={variant} severity={severity} style={customStyle ? customStyle : null} vertical={vertical ?? 'bottom'}
              action={
                boton ?
                  <>
                    <CustomButton variant='contained' label={'Aceptar'} onClik={handleClickAlert} />
                    <IconButton onClick={onClose}>
                      <CloseIcon />
                    </IconButton>
                  </>
                  : null
              }
            >
              {message}
            </Alert>
          </Snackbar>
          : recordatorioAlert ?
            <Grid container className={classes.switch}>
              <Grid item xs={2}>
                <AccessAlarmsIcon htmlColor={'#f29423'} />
              </Grid>
              <Grid item xs={8} className={classes.textoSwitch}>
                {tituloRecordatorio}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<CustomSwitch
                              checkedSwitch={checkedSwitch}
                              handleChangeSwitch={handleChangeSwitch}
                              nameSwitch={nameSwitch} 
                              disabled={disableEdition}
                            />
                          }
                  label={labelSwitch}
                />
              </Grid>
            </Grid> :
            <Alert icon={icon} className={color ? classes.alertaColor : null} color={color ? severity : null} onClose={onClose} variant={variant} severity={severity}>{message}</Alert>
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

