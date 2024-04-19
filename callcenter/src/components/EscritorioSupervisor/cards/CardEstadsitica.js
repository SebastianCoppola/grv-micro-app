
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { TRASLADOS, CONSULTAS, VERIFICADOS } from '../../../Utils/const'
import Utils from '../../../Utils/utils'
import Graficos from "../graficos/Graficos";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: " 10px 0px 0px 0px",
    padding: "0 16px 9px 12px",
    borderRadius: "8px",
    border: 'solid 1px #dadce0',
    backgroundColor: "#ffffff",

  },
  cuerpo: {
    display: "flex",
    flexDirection: "row",
    paddingTop: '10px',
    alignContent: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: '1%',
    paddingLeft: '5px',
    display: "flex",
  },
  separador: {
    backgroundColor: '#dadce0',
    height: '1px',
    width: '100%',
    border: 'none',
    flexShrink: 0,
    margin: 0,
    marginTop: 8,
    marginBottom: 8
  },
  title: {
    fontSize: '22px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#4b4b4b',
    margin: '02% 0px 15px 0',
    flexGrow: 1
  },
  estadistica: {
    alignItems: 'start',
    alignContent: 'center'
  },
  texto: {
    alignItems: 'start',
    fontSize: '14px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#4b4b4b',
  },
  footer: {
    display: "flex",
    flexDirection: "column",

    alignItems: 'flex-end',
  },
  boton: {
    marginTop: '5px',
    height: '40px',
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#505050',
    padding: '2px',
    textTransform: "capitalize"
  },
  botonSelect: {
    color: '#323232',
    marginTop: '5px',
    height: '40px',
    padding: '0px',
    borderRadius: '5px',
    border: 'solid 2px #378ef0',
    backgroundColor: 'rgba(255, 0, 0, 0)',
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    textAlign: 'left',
    textTransform: "capitalize"
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    marginLeft: '40px',
    marginTop: '15px'
  },
  estados: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#4b4b4b',
    marginBottom: '5px',
  },
});

const CardEstadsitica = (props) => {
  const classes = useStyles(props);
  const { estados, changeDay, botonSelect, verTodo } = props;
  const changeSelect = (props) => {
    const tipoConsulta = estados[0].tipo;
    let semana = props === 'semana' ? true : false
    if (tipoConsulta === TRASLADOS) {
      changeDay(semana, true, false, false, props)
    }
    if (tipoConsulta === VERIFICADOS) {
      changeDay(semana, false, true, false, props)
    }
    if (tipoConsulta === CONSULTAS) {
      changeDay(semana, false, false, true, props)
    }
  }
  const calcularPeriodoAnalizado = () => {
    let date = botonSelect === 'semana' ? Utils.getLastDayOfWeekFromDate(new Date()) : new Date()
    let lastDayOfweek = Utils.dateFormat(date)
    let formatCurrentDate = Utils.dateFormat(new Date())
    return botonSelect === 'semana' ? `${formatCurrentDate} al  ${lastDayOfweek}` : formatCurrentDate
  }

  let porcion1 = null;
  let porcion2 = null;
  let porcion3 = null;
  let porcion4 = null;


  const porciones = (data) => {

    if (estados[0].porcentaje > 50) {
      porcion1 = { porcentaje: (50 * 360 / 100), color: estados[0].color }
      porcion2 = { porcentaje: ((estados[0].porcentaje - 50) * 360 / 100), color: estados[0].color }
      porcion3 = { porcentaje: (estados[1].porcentaje * 360 / 100), color: estados[1].color }
      porcion4 = estados[2] ? { porcentaje: (estados[2].porcentaje * 360 / 100), color: estados[2].color } : null
    }

    if (estados[1].porcentaje > 50) {
      porcion1 = { porcentaje: (estados[0].porcentaje * 360 / 100), color: estados[0].color }
      porcion2 = { porcentaje: (50 * 360 / 100), color: estados[1].color }
      porcion3 = { porcentaje: ((estados[1].porcentaje - 50) * 360 / 100), color: estados[1].color }
      porcion4 = estados[2] ? { porcentaje: (estados[2].porcentaje * 360 / 100), color: estados[2].color } : null
    }

    if (estados[2] && estados[2].porcentaje > 50) {
      porcion1 = { porcentaje: (estados[0].porcentaje * 360 / 100), color: estados[0].color }
      porcion2 = { porcentaje: (estados[1].porcentaje * 360 / 100), color: estados[1].color }
      porcion3 = { porcentaje: (50 * 360 / 100), color: estados[2].color }
      porcion4 = { porcentaje: ((estados[2].porcentaje - 50) * 360 / 100), color: estados[2].color }
    }

    if (estados && estados[0].porcentaje <= 50 && estados[1].porcentaje <= 50) {
      porcion1 = { porcentaje: (estados[0].porcentaje * 360 / 100), color: estados[0].color }
      porcion2 = { porcentaje: (estados[1].porcentaje * 360 / 100), color: estados[1].color }
      porcion3 = estados[2] ? { porcentaje: (estados[2].porcentaje * 360 / 100), color: estados[2].color } : null
    }

  }

  porciones(estados);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.title}>{props.title}</Typography>
        <Button onClick={() => changeSelect('dia')} className={botonSelect === 'dia' ? classes.botonSelect : classes.boton} >Día</Button>
        <Button onClick={() => changeSelect('semana')} className={botonSelect === 'semana' ? classes.botonSelect : classes.boton} style={{ width: '80px' }}>Semana</Button>
      </div>
      <hr className={classes.separador} />
      <div className={classes.cuerpo}>
        <Graficos porcion1={porcion1} porcion2={porcion2} porcion3={porcion3} porcion4={porcion4} estados={estados} />
        <div className={classes.lista}>
          <Typography className={classes.estados}>Estados</Typography>
          {estados.map((estado, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ backgroundColor: `${estado.color}`, height: '10px', width: '10px', marginTop: '5px', marginRight: '5px' }}></div>
              <Typography className={classes.texto}>{estado.nombre}</Typography>
            </div>
          ))}
        </div>
      </div>
      <Typography className={classes.texto}>Período analizado:  {calcularPeriodoAnalizado()}</Typography>
      <Typography className={classes.texto}> Incluye todos los operadores de todos los turnos.</Typography>
      <hr className={classes.separador} />
      <div className={classes.footer}>
        <Button style={{ marginTop: '0px', height: '25px', }} onClick={() => verTodo(estados && estados[0] ? estados[0].tipo : null)} className={classes.boton}>Ver todo</Button>
      </div>
    </div>
  )
}

export default CardEstadsitica
