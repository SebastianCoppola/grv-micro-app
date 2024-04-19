import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
//Date:
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from "date-fns/locale/es";
//Mui:
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const useStyles = makeStyles({
  styleFiltrosAuditoria: {
    '& .MuiInputBase-root:not($focused)': {
      border: '1px solid rgba(202, 202, 202)',
      padding: '5px 10px 2px 10px',
      borderRadius: '45px',
      '&:hover:not($focused)': {
        border: '1px solid black',
      },
    },
    '& .MuiInputBase-root.Mui-focused': {
      border: '2px solid #1473e6',
    },
    "& .MuiInput-underline": {
      '&:after': {
        borderBottom: 'none',
      },
      "&:before": {
        borderBottom: 'none',
      },
      "&:hover:not($disabled):not($focused):not($error):before": {
        borderBottom: 'none',
      }
    },
    "& .MuiInputBase-root": {
      fontSize: '12px',
    },
  },
  root: {
    '& label': {
      width: props => props.labelWidth ? '245px' : 'auto',
    },
    '& label.Mui-focused': {
      color: props => props.error ? 'red' : '#747474',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: props => props.error ? 'red' : '#747474',
    },

  },
  form: {
    '& .MuiFormControl-marginNormal': {
      marginTop: '0px',
      marginBottom: '0px'
    },
  },
  outline: {
    maxWidth: props => props.maxWidth ?? '152px',
    minWidth: '50px',
    height: props => props.height ?? '37px',
    borderRadius: '20px',
    border: 'solid 2px rgba(202, 202, 202)',
    backgroundColor: '#ffffff',
    '& label.Mui-focused': {
      color: props => props.error ? 'red' : '#747474',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#747474',
      borderBottom: '0px solid'
    },
    '& .MuiInput-underline:before': {
      borderBottom: '0px solid'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '0px solid'
    },
    '& .MuiInputBase-root': {
      marginTop: '3px',
      marginLeft: '10px',
    },
    '& .MuiIconButton-root': {
      width: '40px',
      height: '40px',
      marginRight: '2px',
      color: '#323232',
    },
    '& .MuiInputBase-root': {
      fontSize: props => props.fontSize ?? null,
      padding: '5px',
      color: "gray"
    }
  },
  title: {
    flexWrap: 'nowrap',
    fontSize: props => props.fontSize ?? '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.27',
    letterSpacing: 'normal',
    textAlign: 'left',
    margin: '10px 0px 6px 5px',
    color: '#747474',
  }
})

const CustomDatePicker = (props) => {

  const { label, placeholder, setSelectedDate, selectedDate, shrink, title, isOutline,
    disabledPicker, selectedHasta, error, helperText, format, maxDate, minDate,
    deshabilitarTeclado, styleFiltrosAuditoria, onClick, onClose, height } = props

  const classes = useStyles(props)
  const [date, setDate] = useState(selectedDate ? selectedDate : null)

  const handleDateChange = (date) => {
    changedDate(date)
  }

  useEffect(() => {
    changedDate(selectedDate)
  }, [selectedDate])

  useEffect(() => {
    if (selectedHasta !== null && selectedHasta !== undefined && selectedHasta.toString() !== '') {
      changedDate(null)
    }
  }, [selectedHasta])

  const changedDate = (date) => {
    setDate(date)
    if (date !== undefined && (date === null || date.toString() !== 'Invalid Date')) {
      setSelectedDate && setSelectedDate(date)
    }
  }

  const disableKeyboardEntry = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      {isOutline && <Typography className={classes.title}>{title && title}</Typography>}
      <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
        <Grid container justify='space-between' alignItems='center' className={classes.form}>
          <KeyboardDatePicker
            //disableToolbar
            minDate={minDate}
            maxDate={maxDate}
            views={["year", "month", "date"]}
            disabled={disabledPicker}
            allowKeyboardControl
            variant="inline"
            error={error}
            helperText={helperText}
            placeholder={placeholder && placeholder}
            autoComplete='off'
            format={format ? format : "dd/MM/yyyy"}
            margin={"normal"}
            className={styleFiltrosAuditoria ? classes.styleFiltrosAuditoria : isOutline ? classes.outline : classes.root}
            id={"date-picker-inline"}
            label={label ?? ''}
            value={date}
            clearable={isOutline ? "false" : "true"}
            invalidDateMessage={'Formato Inválido'}
            autoOk
            fullWidth={isOutline ? false : true}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            InputLabelProps={{
              shrink: shrink,
            }}
            onKeyDown={deshabilitarTeclado ? disableKeyboardEntry : null}
            onClick={onClick}
            onClose={onClose}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  )
}

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  selectedDate: PropTypes.any,
  setSelectedDate: PropTypes.any,
  shrink: PropTypes.bool,
  isOutline: PropTypes.bool,
  title: PropTypes.string,
  fontSize: PropTypes.any,
  maxWidth: PropTypes.any,
  disabledPicker: PropTypes.any
}

export default CustomDatePicker