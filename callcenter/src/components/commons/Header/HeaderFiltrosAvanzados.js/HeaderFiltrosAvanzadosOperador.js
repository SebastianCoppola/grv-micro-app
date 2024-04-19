import React, { useEffect, useState,  useRef } from "react";
import { useDispatch } from "react-redux";
import { FormHelperText, Grid, Tooltip, makeStyles } from "@material-ui/core";
import Tramitador from "../../../Autosuggest/tramitador";
import EstadoMedico from "../../../Selects/EstadoMedico";
import CustomPeriodo from "../../DatePickerPeriodo/CustomPeriodo";
import CustomTextBordered from "../../TextField/CustomTextBordered";
import HeaderFiltrosAvanzadosPiePagina from "./HeaderFiltrosAvanzadosPiePagina";
import CustomText from "../../TextField/CustomText";
import * as actions from "../../../../redux/actions/index";
import Utils from "../../../../Utils/utils";
import CustomCheck from "../../CustomCheck/CustomChek";
import { TOOLTIP_TEXTO_SINIESTROS_SIN_INTEGRACION } from "../../../../Utils/const";

const useStyles = makeStyles({
  text: {
    fontSize: '13px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    margin: '6px 5px',
    color: '#6e6e6e',
    '&.MuiFormLabel-root.Mui-focused': {
        color: '#6e6e6e',
    },
  },
})


const HeaderFiltrosAvanzadosOperador = (props) => {
  const {
    nroDenuncia,
    nroCuil,
    dataBuscador,
    selectOperado,
    selectCEM,
    pendientes,
    tramitador,
    estadoMedico,
    selectedPeriodoDesde,
    selectedPeriodoHasta,
    limpiarFiltros,
    setLimpiarFiltros,
    setSelectedDate,
    setTramitador,
    setEstadoMedico,
    filtrosOperador,
    request,
    setRequest,
    errorHasta,
    setMostrarMenuAplicacion,
    setMostrarFiltroAvanzado,
    setFiltrosOperador,
    setCustomButtonStatus,
    selectedDate,
    inputDNIRef,
    nroDenunciaCompletoRef,
    limit,
    offset,
    apellido,
    nombre,
    dniHeader,
    tipoDniHeader,
    denunciaDesde,
    denunciaHasta,
    altaDesde,
    altaHasta,
    //handleClickLimpiarFiltros,
    onChangeNroDenuncia,
    handleChangeSelectTramitador,
    handleChangeEstadoMedico,
    onChangeApellido,
    onChangeNombre,
    setSelectedDenunciaDesde,
    setSelectedDenunciaHasta,
    selectedHasta,
    selectedDesde,
    setSelectedAltaDesde,
    setSelectedAltaHasta,
    setErrorHasta,
    handleClickComprimir,
    //handleClickAplicarFiltrosOperador,
    valueNroDenunciaContiene, setValueNroDenunciaContiene,
    checkSiniestrosIntegracion, setCheckSiniestrosIntegracion,handleSelectSiniestrosSinIntegracion,
    checkConPedienteDeVerificacion, handleCheckConPendientesDeVerificacion,

    nroCuilRef,
    apellidoRef,
    nombreRef,
    cuilNro,
    valueDenuncia,

    tipoDniConsulta
  } = props;

  const color = "#1473e6";
  const [valueCuil, setValueCuil] = React.useState(request && request.nroCuil? request.nroCuil :  null)
  const [valueApellido, setValueApellido] = React.useState(request && request.apellido? request.apellido : null)
  const [valueNombre, setValueNombre] = React.useState(request && request.nombre ? request.nombre : null)
  //const [valueNroDenunciaContiene, setValueNroDenunciaContiene] = React.useState(request && request.nroDenunciaContiene? request.nroDenunciaContiene : null)
  const [tramitadorCodigo, setTramitadorCodigo] = React.useState()
  const[estadoMedicoCodigo,setEstadoMedicoCodigo]=useState()
  const [selectClientesDisabled, setSelectClientesDisabled] = useState(false)
  const [clienteDescripcion, setClienteDescripcion] = useState(null)
  const dispatch = useDispatch();
  const classes = useStyles(props);


  const setearFechas = (dato) => {
    let fechaInvertida = dato.toString().substr(4, 11).split(" ");
    let fechaReal = [fechaInvertida[1], fechaInvertida[0], fechaInvertida[2]]
    .toString()
    .replaceAll(",", "-");
    return fechaReal;
  }

  useEffect(() => {
    setRequest({
      ...request,
      // "nroDenunciaCompleto":  nroDenunciaCompletoRef && nroDenunciaCompletoRef.current
      //         && nroDenunciaCompletoRef.current.value !== ''
      //       ? nroDenunciaCompletoRef.current.value : null,
      // "nroDoc": inputDNIRef && inputDNIRef.current && inputDNIRef.current.value !== ''
      //   ? parseInt(inputDNIRef.current.value) : null,
       "tipoDoc": tipoDniConsulta,
       "nroDoc": dniHeader,
      // "fechaFin": selectedPeriodoHasta !== null && selectedPeriodoHasta !== undefined&&
      // errorHasta===""?
      // Utils.dateFormato2(selectedHasta)
      //   : null,
      // "fechaInicio": selectedPeriodoDesde !== null && selectedPeriodoDesde !== undefined ?
      //   Utils.dateFormato2(selectedDesde)
      //   : null,
      // "fechaExacta": selectedDate !== null && selectedDate !== undefined ?
      //   Utils.dateFormato2(selectedDate)
      //   : null,
       "fechaDenunciaFin": denunciaHasta ? Utils.dateFormato2(denunciaHasta) : null,
       "fechaDenunciaInicio": denunciaDesde ? Utils.dateFormato2(denunciaDesde) : null,
      // "idOperador": selectOperado === "" ? null : selectOperado,
      // "estadoCem": selectCEM === "" ? null : selectCEM,
      // "denunciasConPendientes": pendientes.conPendientes,
      // "denunciasSinVerificar": pendientes.sinVerificar,
      "tramitadorIdPersona": tramitador ? tramitador : null,
      "estadoMedicoIdEstadoMedico": estadoMedico ? estadoMedico : null,
      "fechaAltaDesde": altaDesde ? Utils.dateFormato2(altaDesde) : null,
      "fechaAltaHasta": altaHasta ? Utils.dateFormato2(altaHasta) : null,
      "siniestrosSinIntegracion": checkSiniestrosIntegracion ? checkSiniestrosIntegracion : false,
      "offset": offset,
      "limit": limit,
    })
  }, [tramitador, estadoMedico,dniHeader, tipoDniConsulta, altaHasta, altaDesde, denunciaDesde, denunciaHasta, checkSiniestrosIntegracion])

    const handleClickLimpiarFiltros = () => {
    setErrorHasta(null);
    setValueCuil('')
    setValueNombre('')
    setValueApellido('')
    setValueNroDenunciaContiene('')
    setSelectedDenunciaDesde(null);
    setSelectedDenunciaHasta(null);
    setSelectedAltaDesde(null);
    setSelectedAltaHasta(null);
    setTramitador(null);
    setEstadoMedico(null);
    setCheckSiniestrosIntegracion(false)
    setRequest({
      ...request,
      "nombre": null,
      "nroDenunciaContiene": null,
      "apellido": null,
      "nroCuil": null,
      "fechaAltaHasta": null,
      "fechaAltaDesde": null,
      "fechaDenunciaFin": null,
      "fechaDenunciaInicio": null,
    })
  };

  useEffect(() => {
    if(limpiarFiltros){
    handleClickLimpiarFiltros()
    setLimpiarFiltros(false)
    }
  }, [limpiarFiltros])

  const handleClickAplicarFiltrosOperador = () => {
    if (request) {
      dispatch(actions.searchDenuncias(request))
    }

    let tramita = tramitadorCodigo && tramitadorCodigo.map((it) => {
      return (
        it.descripcion
      )
    })
    let estadoMed=estadoMedicoCodigo && estadoMedicoCodigo.map(it=>{
      return it.descripcion
    })

    const req = [
      {
        key: 1,
        nombre: "nroDenunciaContiene" ,
        descripcion: 'Nro de Denuncia Contiene',
        value: valueNroDenunciaContiene && valueNroDenunciaContiene !== '' ? valueNroDenunciaContiene : null,
        label: valueNroDenunciaContiene && valueNroDenunciaContiene !== '' ? valueNroDenunciaContiene : null },
      {
        key: 2,
        nombre: "nroCuil",
        descripcion:'Nro Cuil',
        value: valueCuil !== '' ? valueCuil : null ,
        label: valueCuil !== '' ? valueCuil : null
      },
      {
        key: 3,
        nombre: "tramitadorIdPersona",
        descripcion:'Tramitado',
        value: tramitador ? tramitador : null,
        label: tramitador ? tramita[0] : null
      },
      {
        key: 4,
        nombre: "estadoMedicoIdEstadoMedico",
        descripcion:'Estado Médico',
        value: estadoMedico ? estadoMedico : null,
        label: estadoMedico ? estadoMed[0] : null
      },
      { key: 5,
        nombre: "apellido" ,
        descripcion:'Apellido',
        value: valueApellido ? valueApellido : null,
        label: valueApellido !== '' ? valueApellido : null
      },
      {
        key: 6,
        nombre: "nombre",
        descripcion:'Nombre',
        value: valueNombre ? valueNombre : null,
        label: valueNombre != '' ? valueNombre : null
      },
      { key: 7,
        nombre: "fechaDenunciaFin",
        descripcion: 'Fecha Denuncia Inicio - Fecha Denuncia Fin',
        value: denunciaDesde && denunciaHasta ? denunciaDesde : null,
        label: denunciaDesde!==null &&  denunciaHasta !== null
              ? `${setearFechas(denunciaDesde)} - ${setearFechas(denunciaHasta)}` : null
      },
      { key: 8,
        nombre: "fechaAltaDesde",
        descripcion: 'Fecha Alta desde - Fecha Alta hasta',
        value: altaDesde && altaHasta ? altaDesde : null,
        label: altaDesde !== null && altaHasta!==null
              ? `${setearFechas(altaDesde)} - ${setearFechas(altaHasta)}` : null
      },
      {
        key: 9,
        nombre: "checkSiniestrosIntegracion",
        descripcion: 'Siniestros sin Integracion',
        value: checkSiniestrosIntegracion ? checkSiniestrosIntegracion : null,
        label: checkSiniestrosIntegracion ? 'Siniestros sin Integracion' : null
      }
    ]
    setFiltrosOperador(req.filter((it) => it.label !== null))
    setMostrarMenuAplicacion(true);
    setMostrarFiltroAvanzado(false);
    setCustomButtonStatus(false);
  }


  const ChangeNroCuil = (event) => {
    setValueCuil(event.target.value)
    setRequest({
      ...request,
      "nroCuil": event.target.value === '' ? null : event.target.value
    })
  }

  const ChangeApellido = (event) => {
    setValueApellido(event.target.value)
    setRequest({
      ...request,
      "apellido": event.target.value === '' ? null : event.target.value
    })
  }

  const ChangeNombre = (event) => {
    setValueNombre(event.target.value)
    setRequest({
      ...request,
      "nombre": event.target.value === '' ? null : event.target.value
    })
  }

  const ChangeNroDenuncia = (event) => {
    setValueNroDenunciaContiene(event.target.value)
    setRequest({
      ...request,
      "nroDenunciaContiene": event.target.value === '' ? null : event.target.value
    })
  }

  const handleCheckSiniestrosIntegracion = (selected) => {
    if(selected){
      setCheckSiniestrosIntegracion(true)
      handleSelectSiniestrosSinIntegracion(selected)
    }else{
      setCheckSiniestrosIntegracion(false)
      handleSelectSiniestrosSinIntegracion(selected)
    }
  }

  return (
    <Grid container xs={12} justify={"flex-start"}>
      <Grid
        item
        container
        xs={12}
        justify={"flex-start"}
        spacing={2}
        alignItems={"flex-end"}
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={3}>
          <FormHelperText className={classes.text}>
            {"Apellido"}
          </FormHelperText>
          <CustomText
            borderRadius='20px'
            fullwidth={true}
            variant='outlined'
            value={valueApellido}
            radius={'20px'}
            // inputRef={apellidoRef}
            shrink={true}
            onChange={ChangeApellido}
          />
        </Grid>
        <Grid item xs={3}>
          <FormHelperText className={classes.text}>
            {"Nombre"}
          </FormHelperText>
          <CustomText
            borderRadius='20px'
            fullwidth={true}
            variant='outlined'
            value={valueNombre}
            radius={'20px'}
            shrink={true}
            // inputRef={nombreRef}
            onChange={ChangeNombre}
          />
        </Grid>
        <Grid item xs={3} style={{height: '83px'}}>
          <Tramitador
            titulo={"Tramitador"}
            isOutline={true}
            seleccione={true}
            valTramitador={tramitador}
            handleChangeSelectTramitador={handleChangeSelectTramitador}
            //filtros={true}
            setTramitadorCodigo={setTramitadorCodigo}
            fontSize={'13px'}
            height={'39px'}
          ></Tramitador>
        </Grid>
        <Grid item xs={3} style={{height: '83px'}}>
          <EstadoMedico
            titulo={"Estado Medico"}
            isOutline={true}
            valEstadoMedico={estadoMedico}
            handleChangeSelectEstadoMedico={handleChangeEstadoMedico}
            setEstadoMedicoCodigo={setEstadoMedicoCodigo}
            fontSize={'13px'}
            height={'39px'}
           // filtros={true}
          ></EstadoMedico>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        justify={"flex-start"}
        spacing={2}
        alignItems={"flex-end"}
      >
        <Grid item xs={3}>
          <FormHelperText className={classes.text}>
            {"Nro. Denuncia contiene"}
          </FormHelperText>
          <CustomText
            borderRadius='20px'
            fullwidth={true}
            variant='outlined'
            value={valueNroDenunciaContiene}
            radius={'20px'}
            shrink={true}
            //inputRef={nroDenunciaRef}
            onChange={ChangeNroDenuncia}
          />
        </Grid>
        <Grid item xs={3}>
          <FormHelperText className={classes.text}>
            {"Nro. Cuil"}
          </FormHelperText>
          <CustomText
            borderRadius='20px'
            fullwidth={true}
            variant='outlined'
            value={valueCuil}
            radius={'20px'}
            shrink={true}
            //inputRef={nroCuilRef}
            onChange={ChangeNroCuil}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomPeriodo
            fontSize={"13px"}
            label={"Fecha Denuncia"}
            selectedDate={selectedDate}
            selectedDesde={denunciaDesde}
            setSelectedDesde={setSelectedDenunciaDesde}
            selectedHasta={denunciaHasta}
            setSelectedHasta={setSelectedDenunciaHasta}
            setErrorHasta={setErrorHasta}
            height={'36px'}
          />
        </Grid>
        <Grid item xs={3}>
          <CustomPeriodo
            fontSize={"13px"}
            label={"Fecha Alta"}
            selectedDate={selectedDate}
            selectedDesde={altaDesde}
            setSelectedDesde={setSelectedAltaDesde}
            selectedHasta={altaHasta}
            setSelectedHasta={setSelectedAltaHasta}
            setErrorHasta={setErrorHasta}
            height={'36px'}
          />
        </Grid>
        <Tooltip title = {TOOLTIP_TEXTO_SINIESTROS_SIN_INTEGRACION}>
          <Grid item container spacing={3} xs={8}>
            <Grid item>
              <CustomCheck
                handleChange={() =>
                  checkSiniestrosIntegracion
                  ? handleCheckSiniestrosIntegracion(false)
                  : handleCheckSiniestrosIntegracion(true)
                }
                texto={"Siniestros pendientes de integración"}
                checked={checkSiniestrosIntegracion}
              />
            </Grid>
            <Grid item>
              <CustomCheck
                checked={checkConPedienteDeVerificacion}
                handleChange={handleCheckConPendientesDeVerificacion}
                texto={"Siniestros con pendientes"}
              />
            </Grid>
          </Grid>
        </Tooltip>
      </Grid>
      <HeaderFiltrosAvanzadosPiePagina
        color={color}
        handleClickComprimir={handleClickComprimir}
        handleClickLimpiarFiltros={handleClickLimpiarFiltros}
        handleClickAplicarFiltros={handleClickAplicarFiltrosOperador}
      ></HeaderFiltrosAvanzadosPiePagina>
    </Grid>
  );
};

export default HeaderFiltrosAvanzadosOperador;
