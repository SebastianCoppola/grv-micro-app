import React, { useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";
import PropTypes from "prop-types";
//material-ui
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Typography } from "@material-ui/core";
//estilo
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    "& .MuiInputBase-root": {
      fontSize: (props) => (props.fontSize ? props.fontSize : null),
    },
  },
  desde: {
    maxWidth: "150px",
    height: props => props.height ?? "37px",
    borderRadius: "20px",
    borderBottomRightRadius: "0px",
    borderTopRightRadius: "0px",
    border: props => props.border ?? "solid 2px rgba(202, 202, 202)",
    borderRight: "solid 0px",
    backgroundColor: "#ffffff",

    "& label.Mui-focused": {
      color: "#747474",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#747474",
      borderBottom: "0px solid",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0px solid",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "0px solid",
    },
    "& .MuiInputBase-root": {
      marginTop: "5px",
      marginLeft: "10px",
      color: "gray"
    },
    "& .MuiIconButton-root": {
      width: "40px",
      height: "40px",
      marginRight: "2px",
      color: "#323232",
    },
  },
  title: {
    flexWrap: "nowrap",
    fontSize: (props) => (props.fontSize ? props.fontSize : "14px"),
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.27",
    letterSpacing: "normal",
    textAlign: "left",
    margin: props => props.titleMargin ?? "15px 0px 6px 5px",
    color: "#747474",
  },

  hasta: {
    maxWidth: "150px",
    height: props => props.height ?? "37px",
    borderRadius: "20px",
    borderBottomLeftRadius: "0px",
    borderTopLeftRadius: "0px",
    border: props => props.border ?? "solid 2px rgba(202, 202, 202)",

    backgroundColor: "#ffffff",

    "& label.Mui-focused": {
      color: "#747474",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#747474",
      borderBottom: "0px solid",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0px solid",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "0px solid",
    },
    "& .MuiInputBase-root": {
      marginTop: "5px",
      marginLeft: "10px",
      color: "gray"
    },
    "& .MuiIconButton-root": {
      width: "40px",
      height: "40px",
      marginRight: "2px",
      color: "#323232",
    },
  },
});

const CustomPeriodo = (props) => {
  const {
    label,
    selectedDesde,
    setSelectedDesde,
    selectedHasta,
    setSelectedHasta,
    setErrorHasta,
    selectedDate,
    placeholder,
    noFutureDates,
    minDateToday,
    deshabilitarTeclado,
    minDate
  } = props;
  const classes = useStyles(props);
  const [dateDesde, setDateDesde] = React.useState(
    selectedDesde ? selectedDesde : null
  );
  const [dateHasta, setDateHasta] = React.useState(
    selectedHasta ? selectedHasta : null
  );

  const handleDateChangeDesde = (date) => {
    setDateDesde(date);
    if (date === null || date.toString() === "Invalid Date") {
      setDateHasta(null);
      setSelectedHasta(null);
    }
    if (date === null || date.toString() !== "Invalid Date") {
      setDateHasta(null);
      setSelectedHasta(null);
      setSelectedDesde && setSelectedDesde(date);
    }
  };

  const handleDateChangeHasta = (date) => {
    setDateHasta(date);
    if (date === null || date.toString() !== "Invalid Date") {
      setSelectedHasta && setSelectedHasta(date);
    }
  };

  useEffect(() => {
    if (
      selectedDate !== null &&
      selectedDate !== undefined &&
      selectedDate.toString() !== ""
    ) {
      handleDateChangeHasta(null);
      handleDateChangeDesde(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    handleDateChangeDesde(selectedDesde);
  }, [selectedDesde]);

  useEffect(() => {
    handleDateChangeHasta(selectedHasta);
  }, [selectedHasta]);

  const handleDateChangeHastaError = (date) => {
    if (setErrorHasta) {
      setErrorHasta(date);
    }
  };

  const disableKeyboardEntry = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Typography className={classes.title}>
        {label ? label : "Período"}
      </Typography>
      <div className={classes.root}>
        <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
          <KeyboardDatePicker
            // disableToolbar
            views={["year", "month", "date"]}
            variant="inline"
            format={"dd/MM/yyyy"}
            placeholder={placeholder ?? "Desde"}
            autoComplete="off"
            //margin="normal"
            inputVariant="standard"
            className={classes.desde}
            id={"fecha-supervisor-desde"}
            //label='Fecha'
            value={dateDesde}
            maxDateMessage={"El periodo no puede ser mayor a 6 meses"}
            //clearable={false}
            invalidDateMessage={"Formato Inválido"}
            autoOk={true}
            //fullWidth
            onChange={handleDateChangeDesde}
            KeyboardButtonProps={{
              "aria-label": "change fecha",
            }}
            maxDate={noFutureDates ? new Date() : undefined}
            onKeyDown={deshabilitarTeclado ? disableKeyboardEntry : null}
            minDate={minDate ?? undefined}
          />
          <KeyboardDatePicker
            //disableToolbar
            views={["year", "month", "date"]}
            variant="inline"
            format={"dd/MM/yyyy"}
            placeholder={placeholder ?? "Hasta"}
            autoComplete="off"
            //margin="normal"
            inputVariant="standard"
            maxDate={noFutureDates ? new Date() :
              dateDesde !== null && dateDesde.toString() !== "Invalid Date"
                ? new Date(
                  new Date(dateDesde).setMonth(
                    new Date(dateDesde).getMonth() + 6
                  )
                )
                : null}
            maxDateMessage={"El periodo no puede ser mayor a 6 meses"}
            className={classes.hasta}
            id={"fecha-supervisor-hasta"}
            minDate={minDateToday ? new Date(dateDesde) || new Date() :
              dateDesde !== null && dateDesde.toString() !== "Invalid Date"
                ? new Date(
                  new Date(dateDesde).setDate(
                    new Date(dateDesde).getDate() + 1
                  )
                )
                : null
            }
            minDateMessage={"Debe ser mayor la fecha Desde"}
            //label='Fecha'
            disabled={
              dateDesde === null || dateDesde == "Invalid Date" || dateDesde.Date === new Date() ? true : false
            }
            value={dateHasta}
            //clearable={false}
            invalidDateMessage={"Formato Inválido"}
            autoOk={true}
            onError={handleDateChangeHastaError}
            //fullWidth
            onChange={handleDateChangeHasta}
            KeyboardButtonProps={{
              "aria-label": "change fecha",
            }}
            onKeyDown={deshabilitarTeclado ? disableKeyboardEntry : null}
          />
        </MuiPickersUtilsProvider>
      </div>
    </>
  );
};

CustomPeriodo.propTypes = {
  label: PropTypes.string,
  selectedDesde: PropTypes.any,
  setSelectedDesde: PropTypes.any,
  selectedHasta: PropTypes.any,
  setSelectedHasta: PropTypes.any,
  fontSize: PropTypes.any,
};

export default CustomPeriodo;
