import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { useHistory } from 'react-router';
import { TRASLADOS, CONSULTAS, VERIFICADOS } from '../../Utils/const'
//estilos
import { makeStyles } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
//material-ui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
//componentes
import CardEstadsitica from './cards/CardEstadsitica'
import CardCount from './cards/CardCount';
import SVGcompletos from '../../commons/assets/Cards/Completos.svg'
import SVGincompletos from '../../commons/assets/Cards/Incompletos.svg'
import SVGborradores from '../../commons/assets/Cards/Borradores.svg'
import SVGpendientes from '../../commons/assets/Cards/Pendientes.svg'
import SVGtotal from '../../commons/assets/Cards/Total.svg'
import CustomPeriodo from '../commons/DatePickerPeriodo/CustomPeriodo'
import CustomDatePicker from "../commons/DatePicker/CustomDatePicker";
import CustomCard from "../commons/Card/CustomCard";
import Operadores from "../Selects/Operadores";
import Utils from "../../Utils/utils";
import CustomLoading from "../commons/Loading/CustomLoading";
import { setUsuarioActivo } from "../../redux/actions/solicitudesGenericas";

const useStyles = makeStyles({
  root: {
    width: '97%',
    margin: "10px 20px 0px 2px",
    padding: "1px 15px 0px 18px",
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",

  },
  cardCuerpo: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
  },
  fechas: {
    marginRight: '4%',
  },
  separador: {
    backgroundColor: '#dadce0',
    height: '1px',
    width: '100%',
    border: 'none',
    flexShrink: 0,
    margin: 0,
    marginTop: 8,
    marginBottom: 10
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.46',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#323232',
    margin: '0 0px 23px 0',
    flexGrow: 1
  },
  p: {
    "& + #show ": {
      display: "none"
    },
    "&:hover + #show": {
      backgroundColor: "#ccc",
      display: "block"
    }
  }

});


const EscritorioSupervisor = () => {

  const classes = useStyles();

  const [selectedDesde, setSelectedDesde] = useState(null)
  const [selectedHasta, setSelectedHasta] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectOperado, setselectOperado] = useState('')
  const [errorHasta, setErrorHasta] = useState('')
  const cantidades = useSelector(state => state.documentos.cantidadDenuncias)
  const graficosData = useSelector(state => state.documentos.graficosData)
  const [loading, setLoading] = useState({
    loadingCantidad: false,
    loadingGraficos: false,
  });
  const [traslados, setTraslados] = useState(Estadistica1)
  const [verificados, setVerificados] = useState(Estadistica2)
  const [solicitudes, setSolicitudes] = useState(Estadistica3)
  const [botonSelectVerificados, setBotonSelectVerificados] = useState('dia');
  const [botonSelectTraslados, setBotonSelectTraslados] = useState('dia');
  const [botonSelectConsultas, setBotonSelectConsultas] = useState('dia');
  const dispatch = useDispatch()
  const history = useHistory();

  const usuarioActivo = useSelector(state => state.generalConfig.usuarioActivo)


  useEffect(() => {
    fetchTableroGraficos(false, true, true, true);
    dispatch(setUsuarioActivo(usuarioActivo))
  }, [])

  useEffect(() => {
    if (graficosData) {
      if (graficosData.traslados) {
        let newList = []
        Estadistica1.forEach(obj => {
          newList.push(
            obj.nombre === "Borrador" ? { ...obj, porcentaje: graficosData.traslados.borrador * 100, cant: graficosData.traslados.total } :
              obj.nombre === "Confirmados" ? { ...obj, porcentaje: graficosData.traslados.confirmados * 100, cant: graficosData.traslados.total } : obj
          )
        })
        setTraslados(newList);
      }
      if (graficosData.verificados) {
        let newList = []
        Estadistica2.forEach(obj => {
          newList.push(
            obj.nombre === "No Verificados" ? { ...obj, porcentaje: graficosData.verificados.noVerificados * 100, cant: graficosData.verificados.total } :
              obj.nombre === "Verificados" ? { ...obj, porcentaje: graficosData.verificados.verificados * 100, cant: graficosData.verificados.total } : null
          )
        })
        setVerificados(newList);
      }
      if (graficosData.consultas) {
        let newList = []
        Estadistica3.forEach(obj => {
          newList.push(
            obj.nombre === "Activo" ? { ...obj, porcentaje: graficosData.consultas.activo * 100, cant: graficosData.consultas.total } :
              obj.nombre === "Vencido" ? { ...obj, porcentaje: graficosData.consultas.vencido * 100, cant: graficosData.consultas.total } :
                obj.nombre === "Cerrado" ? { ...obj, porcentaje: graficosData.consultas.cerrado * 100, cant: graficosData.consultas.total } : null
          );
        });
        setSolicitudes(newList);
      }
    }
  }, [graficosData])

  const buscarCantidadDenuncias = () => {

    let newDate = null;
    let newDateDesde = null;
    let newDateHasta = null;

    if (selectedDate !== null && selectedDate !== undefined) {
      newDate = Utils.formatoFecha(selectedDate, 'yyyy-mm-dd');
    }

    if (selectedDesde !== null && selectedDesde !== undefined) {
      newDateDesde = Utils.formatoFecha(selectedDesde, 'yyyy-mm-dd');
    }
    if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === '') {
      newDateHasta = Utils.formatoFecha(selectedHasta, 'yyyy-mm-dd');
    }

    let request = {
      fechaDenunciaExacta: newDate,
      fechaDenunciaInicio: newDateDesde,
      fechaDenunciaFin: newDateHasta,
      idOperador: selectOperado !== '' ? selectOperado : null,
    }
    if ((newDateDesde !== null && newDateHasta !== null && newDate === null) || (newDate !== null && newDateDesde === null && newDateHasta === null)) {
      setLoading(data => ({ ...data, loadingCantidad: true }))
      dispatch(actions.searchCantidadDenuncias(request, callback2))
    }
  }

  const callback2 = (succes) => {
    setLoading(data => ({ ...data, loadingCantidad: succes }))
  }

  useEffect(() => {
    buscarCantidadDenuncias()
  }, [selectedDate, selectedDesde, selectedHasta, selectOperado, errorHasta])

  const handleSelectOperador = (event) => {
    setselectOperado(event.target.value)
  }

  const Item = styled(Paper)(({ theme }) => ({
    borderRadius: "8px",
    textAlign: 'center',

  }));
  const getCantidadPorEstado = (title) => {
    switch (title) {
      case 'Completos':
        return cantidades ? cantidades.denunciasCompletas : 0
      case 'Incompletos':
        return cantidades ? cantidades.denunciasIncompletas : 0
      case 'Borradores':
        return cantidades ? cantidades.denunciasBorradores : 0
      case 'Con tareas pendientes':
        return cantidades ? cantidades.denunciasConPendientes : 0
      case 'Total':
        return cantidades ? cantidades.denunciasTotal : 0
      default:
        break;
    }
  }

  const fetchTableroGraficos = (semana, traslados, verificados, consultas) => {
    let request = {
      semana: semana,
      traslados: traslados,
      verificados: verificados,
      consultas: consultas
    }
    setLoading(data => ({ ...data, loadingGraficos: true }))
    dispatch(actions.fetchTableroGraficos(request, callback))
  }

  const callback = succes => {
    setLoading(data => ({ ...data, loadingGraficos: succes }))
  }

  const changeDay = (semana, traslados, verificados, consultas, props) => {
    fetchTableroGraficos(semana, traslados, verificados, consultas);
    if (traslados) {
      setBotonSelectTraslados(props)
    }
    if (verificados) {
      setBotonSelectVerificados(props)
    }
    if (consultas) {
      setBotonSelectConsultas(props)
    }
  }
  const verTodo = (props) => {
    if (props) {
        if (props === VERIFICADOS){
            if (botonSelectVerificados === 'semana'){
                history.push({
                    pathname: '/home/consultaSolicitudes',
                    state: {
                        estado: '', ejecutarConsulta: true, fechaDesde: Utils.getLastDayOfWeekFromDate(new Date),
                        fechaHasta: new Date(), selectedDate: selectedDate, operador: selectOperado, tareasPendientes: false
                    }
                })
            }
            if (botonSelectVerificados === 'dia'){
                history.push({
                    pathname: '/home/siniestrosDeHoy'
                    })
            }
        }else{
            let url = '/home/';
            url += props === TRASLADOS ? 'traslados' : props === CONSULTAS ? 'consultasyreclamos' : ''
            history.push({
                pathname: url
            })
        }
    }
  }

  const verDetalle = (estado) => {
    let codEstado = estado === 'Completos' ? 1 : estado === 'Borradores' ? 2 : estado === 'Incompletos' ? 0 : ''
    history.push({
      pathname: '/home/siniestrosDeHoy',
      state: {
        estado: codEstado, ejecutarConsulta: true, fechaDesde: selectedDesde,
        fechaHasta: selectedHasta, selectedDate: selectedDate, operador: selectOperado, tareasPendientes: estado === 'Con tareas pendientes' ? true : false
      }
    })
  }
  return (
    <>
      <div className={classes.root}>
        <CustomLoading loading={loading.loadingCantidad === false && loading.loadingGraficos === false ? false : true} />
        <div className={classes.cardHeader}>
          <Typography className={classes.title}>Tablero de Siniestros CEM</Typography>
          <Operadores
            isOutline={true}
            titulo={'Operadores'}
            placeholder={'Seleccionar Operador'}
            val={selectOperado}
            handleChangeSelect={handleSelectOperador}
            seleccione={true}
          />
        </div>
        <hr className={classes.separador} />
        <div className={classes.cardCuerpo}>
          <div className={classes.fechas} style={{ marginBottom: 20 }}>
            <CustomDatePicker
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              title={'Fecha de Carga'}
              placeholder={'Fecha'}
              isOutline={true}
              selectedHasta={selectedHasta}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 15 }}>
              <CustomPeriodo
                selectedDesde={selectedDesde}
                setSelectedDesde={setSelectedDesde}
                selectedHasta={selectedHasta}
                setSelectedHasta={setSelectedHasta}
                setErrorHasta={setErrorHasta}
                selectedDate={selectedDate}
                label='Período de Carga'
              />
            </div>
          </div>
          {cards.map((card, i) => (
            <CustomCard
              estilo={i === 4 ? { marginRight: '15px' } : null}
              key={i}
              id={i}
              isVariante={'vertical'}
              color={card.color}
              body={<CardCount color={card.color} count={getCantidadPorEstado(card.title)} title={card.title} icon={card.icon} verDetalle={verDetalle} />}
            />
          ))}
        </div>
      </div>
      <div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item>
              <CardEstadsitica title={'Traslados'} estados={traslados} tipo={TRASLADOS} changeDay={changeDay} botonSelect={botonSelectTraslados} verTodo={verTodo} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardEstadsitica title={'Verificados'} estados={verificados} tipo={VERIFICADOS} changeDay={changeDay} botonSelect={botonSelectVerificados} verTodo={verTodo} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardEstadsitica title={'Consultas'} estados={solicitudes} tipo={CONSULTAS} changeDay={changeDay} botonSelect={botonSelectConsultas} verTodo={verTodo} />
            </Item>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EscritorioSupervisor;

const cards = [{ color: '#2dc76d', count: 157, title: 'Completos', icon: SVGcompletos },
{ color: '#2f61d5', count: 684, title: 'Incompletos', icon: SVGincompletos },
{ color: '#dadce0', count: 381, title: 'Borradores', icon: SVGborradores },
{ color: '#3fb6dc', count: 157, title: 'Con tareas pendientes', icon: SVGpendientes },
{ color: '#ff7052', count: 1379, title: 'Total', icon: SVGtotal },
]

const operadores = [{ codigo: 125, descripcion: 'Cintia Mastroberti' },
{ codigo: 305, descripcion: 'Magali Iglesias' },
{ codigo: 458, descripcion: 'Mariano Miñarro' },
{ codigo: 407, descripcion: 'Javier Cisneros' },
{ codigo: 724, descripcion: 'Facundo Piperno' },
{ codigo: 529, descripcion: 'Catalina Dewey Muller' },
{ codigo: 412, descripcion: 'Melina Lomba' },
];

const Estadistica1 = [
  { nombre: 'Borrador', porcentaje: 75, color: '#3fb6dc', id: 1, text: 'Traslados', cant: 0, tipo: TRASLADOS },
  { nombre: 'Confirmados', porcentaje: 25, color: '#2f61d5', id: 2, text: 'Solicitudes', cant: 0, tipo: TRASLADOS },
]
const Estadistica2 = [
  { nombre: 'No Verificados', porcentaje: 20, color: '#3fb6dc', id: 1, text: 'Solicitudes', cant: 0, tipo: VERIFICADOS },
  { nombre: 'Verificados', porcentaje: 80, color: '#f29423', id: 2, text: 'Solicitudes', cant: 0, tipo: VERIFICADOS },
]
const Estadistica3 = [
  { nombre: 'Activo', porcentaje: 40, color: '#3fb6dc', id: 1, text: 'Consultas', cant: 0, tipo: CONSULTAS },
  { nombre: 'Vencido', porcentaje: 25, color: '#2f61d5', id: 2, text: 'Consultas', cant: 0, tipo: CONSULTAS },
  { nombre: 'Cerrado', porcentaje: 35, color: '#ff7052', id: 3, text: 'Consultas', cant: 0, tipo: CONSULTAS },
]