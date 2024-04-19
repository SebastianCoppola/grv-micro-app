import Cliente from "../../../Selects/Cliente";
import Tramitador from "../../../Autosuggest/tramitador";
import EstadoMedico from "../../../Selects/EstadoMedico";
import CustomPeriodo from "../../DatePickerPeriodo/CustomPeriodo";
import Prestador from "../../../Selects/Prestador";
import { Grid, Tooltip } from "@material-ui/core";
import React, { useState, useRef } from "react";
import Provincia from "../../../Selects/Provincia";
import BusquedaCentroMedico from "../../../Selects/BusquedaCentroMedico";
import CustomButtonGroup from "../../ButtonGroup/CustomButtonGroup";
import TipoSiniestro from "../../../Selects/TipoSiniestro";
import DiagnosticoCIE10 from "../../../Autosuggest/diagnosticoCIE10";
import SeveridadDenuncia from "../../../Selects/SeveridadDenuncia";
import BusquedaEmpleador from "../../../Autosuggest/busquedaEmpleador";
import CustomCheck from "../../CustomCheck/CustomChek";
import HeaderFiltrosAvanzadosPiePagina from "./HeaderFiltrosAvanzadosPiePagina";
import { FormHelperText } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchDenuncias } from "../../../../redux/actions";
import Utils from "../../../../Utils/utils";
import { CLIENTE_PROVINCIA_ART_DESCRIPCION, TOOLTIP_TEXTO_SINIESTROS_SIN_INTEGRACION } from "../../../../Utils/const";

const HeaderFiltrosAvanzadosSupervisor = (props) => {
  const {
    setFiltrosSupervisor, handleClickComprimir, clienteValue, valueEmpleador, tramitador, estadoMedico,
    dataProvincia, prestador, centroPrimeraAsistencia, errorHasta, setErrorHasta, selectedDenunciaDesde,
    setSelectedDenunciaDesde, selectedDenunciaHasta, setSelectedDenunciaHasta, selectedAltaDesde,
    setSelectedAltaDesde, selectedAltaHasta, setSelectedAltaHasta, selectedDate, selectedCargaAltaDesde,
    setSelectedCargaAltaDesde, selectedCargaAltaHasta, setSelectedCargaAltaHasta, valueDiagnosticoCie10,
    setValueDiagnosticoCie10, dataDiagnosticoCie10, setDataDiagnosticoCie10, idEmpleadorValidar,
    fechaOcurrenciaValidar, tipoSiniestro, severidadDenuncia, checkNoIncluiDesc, setCheckNoIncluirDesc,
    checkSoloPreDenun, setCheckSoloPreDenun, checkSoloSuspe, setCheckSoloSuspen, checkRechazados,
    setCheckRechazados, checkSinBajaLaboral, setCheckSinBajaLaboral, checkDictamen, setCheckDictamen, checkTelegrama, setCheckTelegrama,
    reingresoValidar, setSeleccionado, setCodigoSeleccionado, setContactosVencidos, setTipoSiniestro,
    setSeveridadDenuncia, seleccion, setSeleccion, setTramitador, setEstadoMedico, setDataProvincia,
    setPrestador, setCentroPrimeraAsistencia, setSelectedDate, setFechaOcurrenciaValidar,
    setValueEmpleador, handleChipsInternacion, internacion2, color, handleChangeSelectTramitador,
    handleChangeEstadoMedico, handleChangeTipoSiniestro, handleChangeSeveridadDenuncia,
    handleChangeCliente, handleChangeProvincia, handleChangePrestador, handleChangeCentroMedicos,
    limpiarChips, quirurgico, trazadora, reingreso, internacion, selectedPeriodoHasta,
    selectedPeriodoDesde, selectedHasta, limit, offset, pendientes, selectCEM, dniHeader,
    tipoDniHeader, setMostrarMenuAplicacion, setMostrarFiltroAvanzado, setCustomButtonStatus,
    setLimpiarChips, setClienteValue, setQuirurgicos, setTrazadora, setReingresos, setInternacion, limpiarFiltros,
    setLimpiarFiltros, inputDNIRef, selectOperado, nroDenunciaCompletoRef, setRequest, request,
    filtrosSupervisor, datosChip, setDatosChip, cambioCliente, setCambioCliente, selectedDesde,
    tipoDniConsulta, checkSiniestrosIntegracion, setCheckSiniestrosIntegracion, handleSelectSiniestrosSinIntegracion
  } = props;

  const dispatch = useDispatch()
  //const[request,setRequest]=useState({})
  const [codigoIdDiagnosticoCie10, setCodigoIdDiagnosticoCie10] = useState(null)
  const [tramitadorCodigo, setTramitadorCodigo] = useState()
  const [clienteCodigo, setClienteCodigo] = useState(null)
  const [estadoMedicoCodigo, setEstadoMedicoCodigo] = useState(request && request.estadoMedicoIdEstadoMedico ? request.estadoMedicoIdEstadoMedico : null)
  const [provinciaCodigo, setProvinciaCodigo] = useState(null)
  const [prestadorCodigo, setPrestadorCodigo] = useState(null)
  const [centMedPrimeraAsistenciaCodigo, setCentMedPrimeraAsistenciaCodigo] = useState(null)
  const [tipoSiniestroCodigo, setTipoSiniestroCodigo] = useState(null)
  const [severidadCodigo, setSeveridadCodigo] = useState(null)
  const [internacionCodigo, setInternacionCodigo] = useState(null)
  const [reingresoCodigo, setReingresoCodigo] = useState(null)
  const [quirurgicoCodigo, setQuirurgicoCodigo] = useState(null)
  const [selectClientesDisabled, setSelectClientesDisabled] = useState(false)
  const [clienteDescripcion, setClienteDescripcion] = useState(null)
  let a = null

  useEffect(() => {
    if (internacion2.length < 4) {
      a = internacion2.push({ codigo: null, descripcion: 'Todos' })
    }
  }, [])

  const [valueChip, setValueChip] = React.useState([
    {
      titulo: 'Quirurgico', nombre: 'quirurgico',
      value: datosChip && (datosChip && datosChip.quirurgico === undefined) ? null : datosChip.quirurgico,
      id: 'id1',
      data: [{ codigo: 1, descripcion: "Si" }, { codigo: 0, descripcion: "No" },
      { codigo: null, descripcion: "Todos" }]
    },
    {
      titulo: "Trazadora", nombre: 'trazadora',
      value: datosChip && (datosChip && datosChip.trazadora === undefined) ? null : datosChip.trazadora,
      id: 'id2',
      data: [{ codigo: true, descripcion: "Si" }, { codigo: false, descripcion: "No" }]
    },
    {
      titulo: "Reingreso", nombre: 'reingreso',
      value: datosChip && (datosChip && datosChip.reingreso === undefined) ? null : datosChip.reingreso,
      id: 'id2',
      data: [{ codigo: 0, descripcion: "Sin reingresos" }, { codigo: 1, descripcion: "Solo reingresos" },
      { codigo: null, descripcion: "Todos" }]
    },
    {
      titulo: "Internacion", nombre: 'estadoInternacionIdEstadoInternacion',
      value: datosChip && datosChip.estadoInternacionIdEstadoInternacion ? datosChip.estadoInternacionIdEstadoInternacion : null,
      id: 'id3',
      data: internacion2
    },
  ])

  const serchIdAutocompletar = (valueCampo, dataCampo, setIdCampo, idCampo) => {
    if (valueCampo && (dataCampo !== null)) {
      let id = dataCampo && dataCampo.filter(it => it.descripcion === valueCampo)
      setIdCampo(id && id[0] ? id[0].codigo : idCampo)
    }
  }

  useEffect(() => { serchIdAutocompletar(valueDiagnosticoCie10, dataDiagnosticoCie10, setCodigoIdDiagnosticoCie10, codigoIdDiagnosticoCie10) }, [valueDiagnosticoCie10])

  function formatoFecha(fecha, formato) {
    const map = {
      dd: fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate(),
      mm:
        fecha.getMonth() + 1 < 10
          ? `0${fecha.getMonth() + 1}`
          : fecha.getMonth() + 1,
      yy: fecha.getUTCFullYear().toString().slice(-2),
      yyyy: fecha.getUTCFullYear(),
    };

    return formato.replace(/dd|mm|yyyy|yy/gi, (matched) => map[matched]);
  }


  const setearFechas = (dato) => {
    if (dato) {
      let fechaInvertida = dato.toString().substr(4, 11).replaceAll(" ", ",").split(",")
      let fechaCorrecta = [fechaInvertida[1], fechaInvertida[0], fechaInvertida[2]].toString()
        .replaceAll(",", "-")
      return fechaCorrecta
    } else {
      return null
    }
  }


  useEffect(() => {
    setRequest({
      ...request,
      // "denunciasConPendientes": pendientes.conPendientes,
      //"denunciasSinVerificar": pendientes.sinVerificar,
      //"nroDoc": inputDNIRef && inputDNIRef.current && inputDNIRef.current.value !== ''
      // ? parseInt(inputDNIRef.current.value) : null,
      //"tipoDoc": tipoDniHeader ? tipoDniHeader : 1,
      // "nroDenunciaCompleto": nroDenunciaCompletoRef && nroDenunciaCompletoRef.current
      //   && nroDenunciaCompletoRef.current.value !== ''
      //   ? nroDenunciaCompletoRef.current.value : null,
      // "fechaExacta": selectedDate !== null && selectedDate !== undefined && 
      //   errorHasta==="" ?
      //   Utils.dateFormato2(selectedDate, "yyyy-mm-dd")
      //   : null,
      // "fechaInicio": selectedPeriodoDesde !== null && selectedPeriodoDesde !== undefined ?
      //   Utils.dateFormato2(selectedDesde, "yyyy-mm-dd")
      //   : null,
      // "fechaFin": selectedPeriodoHasta !== null && selectedPeriodoHasta !== undefined
      //   && errorHasta === "" ?
      //   Utils.dateFormato2(selectedHasta, "yyyy-mm-dd")
      //   : null,
      //"idOperador": selectOperado === "" ? null : selectOperado,
      //"estadoCem": selectCEM === "" ? null : selectCEM,
      "tipoDoc": tipoDniConsulta,
      "idCliente": clienteValue ? clienteValue : null,
      "idEmpleador": Array.isArray(valueEmpleador) ? valueEmpleador.map(it => (it.codigo)) : null,
      "tramitadorIdPersona": tramitador ? tramitador : null,
      "estadoMedicoIdEstadoMedico": estadoMedico ? estadoMedico : null,
      "provincia": dataProvincia ? dataProvincia : null,
      "proveedorCentroDerivadoId": prestador ? prestador : null,
      "proveedorCentroMedicoPrimerAsistenciaId": centroPrimeraAsistencia ? centroPrimeraAsistencia : null,
      "fechaDenunciaInicio": selectedDenunciaDesde ? Utils.dateFormato2(selectedDenunciaDesde, "yyyy-mm-dd") : null,
      "fechaDenunciaFin": selectedDenunciaHasta ? Utils.dateFormato2(selectedDenunciaHasta, "yyyy-mm-dd") : null,
      "fechaAltaDesde": selectedAltaDesde ? Utils.dateFormato2(selectedAltaDesde, "yyyy-mm-dd") : null,
      "fechaAltaHasta": selectedAltaHasta ? Utils.dateFormato2(selectedAltaHasta, "yyyy-mm-dd") : null,
      "fechaCargaAltaDesde": selectedCargaAltaDesde ? Utils.dateFormato2(selectedCargaAltaDesde, "yyyy-mm-dd") : null,
      "fechaCargaAltaHasta": selectedCargaAltaHasta ? Utils.dateFormato2(selectedCargaAltaHasta, "yyyy-mm-dd") : null,
      "quirurgico": datosChip ? datosChip.quirurgico : null,
      "trazadora": datosChip ? datosChip.trazadora : null,
      "reingreso": datosChip ? datosChip.reingreso : null,
      "estadoInternacionIdEstadoInternacion": datosChip && datosChip.estadoInternacionIdEstadoInternacion ? datosChip.estadoInternacionIdEstadoInternacion : null,
      "tipoSiniestroIdTipoSiniestro": tipoSiniestro ? tipoSiniestro : null,
      "diagnosticoCie10Codigo": valueDiagnosticoCie10 && codigoIdDiagnosticoCie10 ? codigoIdDiagnosticoCie10 : null,
      "severidadIdSeveridad": severidadDenuncia ? severidadDenuncia : null,
      "descartadoPorError": checkNoIncluiDesc ? checkNoIncluiDesc : false,
      "isPredenuncia": checkSoloPreDenun ? checkSoloPreDenun : false,
      "suspendido": checkSoloSuspe ? checkSoloSuspe : false,
      "rechazadoPorArt": checkRechazados ? checkRechazados : false,
      "esSinBajaLaboral": checkSinBajaLaboral ? checkSinBajaLaboral : false,
      "dictamen": checkDictamen ? checkDictamen : false,
      "recibidoTelegrama": checkTelegrama ? checkTelegrama : false,
      "siniestrosSinIntegracion": checkSiniestrosIntegracion ? checkSiniestrosIntegracion : false,
      "limit": limit,
      "offset": offset * limit
    })
  }, [clienteValue, valueEmpleador, tramitador, estadoMedico, dataProvincia, prestador,
    centroPrimeraAsistencia, selectedDenunciaDesde, selectedDenunciaHasta, selectedAltaDesde,
    selectedAltaHasta, selectedCargaAltaDesde, selectedCargaAltaHasta,
    quirurgico, trazadora, reingreso, internacion, tipoSiniestro,
    valueDiagnosticoCie10, codigoIdDiagnosticoCie10, severidadDenuncia, checkNoIncluiDesc, checkSoloPreDenun,
    checkSoloSuspe,
    checkRechazados, checkSinBajaLaboral,tipoDniConsulta, checkDictamen, datosChip, checkTelegrama, checkSiniestrosIntegracion])

  useEffect(() => {
    if (limpiarFiltros) {
      handleClickLimpiarFiltros()
      setLimpiarFiltros(false)
    }
  }, [limpiarFiltros])

  const handleClickLimpiarFiltros = () => {
    setValueDiagnosticoCie10(null)
    setLimpiarChips(true);
    setSeleccion(null);
    setCheckNoIncluirDesc(false);
    setCheckSoloPreDenun(false);
    setCheckSoloSuspen(false);
    setCheckRechazados(false);
    setCheckSinBajaLaboral(false);
    setCheckDictamen(false);
    setCheckTelegrama(false);
    setSeleccionado(false);
    setCodigoSeleccionado(null);
    setFechaOcurrenciaValidar(null);
    setContactosVencidos(null);
    setTipoSiniestro(null);
    setDataDiagnosticoCie10(null);
    setSeveridadDenuncia(null);
    setContactosVencidos(null);
    setSelectedCargaAltaDesde(null);
    setSelectedCargaAltaHasta(null);
   // setSelectedDate(null);
    setErrorHasta(null);
    setSelectedDenunciaDesde(null);
    setSelectedDenunciaHasta(null);
    setSelectedAltaDesde(null);
    setSelectedAltaHasta(null);
    setTramitador(null);
    setEstadoMedico(null);
    setClienteValue(null);
    setValueEmpleador([]);
    setSeleccionado(false)
    setDataProvincia(null);
    setPrestador(null);
    setCentroPrimeraAsistencia(null);
    setQuirurgicos(null);
    setTrazadora(null);
    setReingresos(null);
    setInternacion(null);
    setInternacionCodigo(null)
    setTramitadorCodigo(null)
    setEstadoMedicoCodigo(null)
    setProvinciaCodigo(null)
    setPrestadorCodigo(null)
    setCentMedPrimeraAsistenciaCodigo(null)
    setTipoSiniestroCodigo(null)
    setSeveridadCodigo(null)
    setLimpiarChips(true)
    setCheckSiniestrosIntegracion(false)
    setDatosChip({
      quirurgico: null,
      trazadora: null,
      reingreso: null,
      internacion: null,
    })
    setRequest({
      ...request,
      "idCliente": null,
      "idEmpleador": null,
      "tramitadorIdPersona": null,
      "estadoMedicoIdEstadoMedico": null,
      "provincia": null,
      "proveedorCentroMedicoDerivadoId": null,
      "proveedorCentroMedicoPrimeraAsistenciaId": null,
      "fechaDenunciaInicio": null,
      "fechaDenunciaFin": null,
      "fechaAltaDesde": null,
      "fechaAltaHasta": null,
      "fechaCargaAltaDesde": null,
      "fechaCargaAltaHasta": null,
      "estadoInternacionIdEstadoInternacion": null,
      "tipoSiniestroIdTipoSiniestro": null,
      "diagnosticoCie10Codigo": "",
      "severidadIdSeveridad": null,
      "descartadoPorError": false,
      "isPredenuncia": false,
      "suspendido": false,
      "rechazadoPorArt": false,
      "esSinBajaLaboral": false,
      "dictamen": false,
    })
  }

  const ChipNombre = (data) => {
    let quirurgico = null
    let trazadora = null
    let reingreso = null
    let internacion = null
    data.map((it) => {
      if (it.nombre === 'quirurgico') {
        if (it.value === 1) {
          quirurgico = 'Sí'
        } else if (it.value === 0) {
          quirurgico = 'No'
        } else if (it.value === null) {
          quirurgico = 'Todos'
        }

      }

      if(it.nombre === 'trazadora'){
        if (it.value === true) {
          quirurgico = 'Sí'
        } else if (it.value === false) {
          quirurgico = 'No'
        }
      }

      if (it.nombre === 'reingreso') {
        if (it.value === 1) {
          reingreso = "Solo reingresos"
        } else if (it.value === 0) {
          reingreso = 'Sin reingresos'
        } else if (it.value === null) {
          reingreso = 'Todos'
        }

      }
      if (it.nombre === 'estadoInternacionIdEstadoInternacion') {
        if (it.value === 1) {
          internacion = 'Ambulatorio'
        } else if (it.value === 2) {
          internacion = 'Internado'
        } else if (it.value === 3) {
          internacion = 'Externado'
        } else if (it.value === null) {
          internacion = 'Todos'
        }
      }

    })
    return { quirurgico: quirurgico, trazadora: trazadora, reingreso: reingreso, internacion: internacion }
  }
  const [dataChipNombre, setDataChipNombre] = useState(null)

  useEffect(() => {
    setDataChipNombre(ChipNombre(valueChip))
  }, [valueChip])


  const handleClickAplicarFiltrosSupervisor = () => {
    if (request) {
      dispatch(searchDenuncias(request))
    }


    let tramita = tramitadorCodigo && tramitadorCodigo.map((it) => {
      return it.descripcion
    })

    let client = clienteCodigo && clienteCodigo.map((it) => {
      return it.descripcion
    })

    let estadoMed = estadoMedicoCodigo && estadoMedicoCodigo.map(it => {
      return it.descripcion
    })

    let prov = provinciaCodigo && provinciaCodigo.map(it => {
      return it.descripcion
    })

    let prest = prestadorCodigo && prestadorCodigo.map(it => {
      return it.descripcion
    })

    let cenMedPrimerAsistencia = centMedPrimeraAsistenciaCodigo && centMedPrimeraAsistenciaCodigo.map(it => {
      return it.descripcion
    })

    let internacionChip = internacionCodigo && internacionCodigo.map(it => {
      return it.descripcion
    })

    let tipSin = tipoSiniestroCodigo && tipoSiniestroCodigo.map(it => {
      return it.descripcion
    })

    let severidad = severidadCodigo && severidadCodigo.map(it => {
      return it.descripcion
    })

    let empleadorValor = valueEmpleador && valueEmpleador.map((it, i) => ({
      key: i + 1, nombre: 'idEmpleador', label: it.descripcion, value: it.codigo, descripcion: 'Empleador',
    }
    ))
    const req = [
      {
        key: 0,
        nombre: "idCliente",
        descripcion: 'Cliente',
        value: clienteValue ? clienteValue : null,
        label: clienteValue ? client[0] : null
      },
      ...empleadorValor && empleadorValor.filter(it => (it)),
      {
        key: 10,
        descripcion: 'Tramitador',
        nombre: "tramitadorIdPersona",
        value: tramitador ? tramitador : null,
        label: tramitador ? tramita[0] : null
      },
      {
        key: 11,
        nombre: "estadoMedicoIdEstadoMedico",
        descripcion: 'Estado Médico',
        value: estadoMedico ? estadoMedico : null,
        label: estadoMedico ? estadoMed[0] : null
      },
      {
        key: 12,
        nombre: "provincia",
        descripcion: 'Provincia',
        value: dataProvincia ? dataProvincia : null,
        label: dataProvincia ? prov[0] : null
      },
      {
        key: 13,
        nombre: "proveedorCentroDerivadoId",
        descripcion: 'Prestador',
        value: prestador ? prestador : null,
        label: prestador ? prest[0] : null
      },
      {
        key: 14,
        nombre: "proveedorCentroMedicoPrimerAsistenciaId",
        descripcion: 'Centro Primera Asistencia',
        value: centroPrimeraAsistencia ? centroPrimeraAsistencia : null,
        label: centroPrimeraAsistencia ? cenMedPrimerAsistencia[0] : null
      },
      {
        key: 15,
        nombre: "fechaDenunciaFin",
        descripcion: 'Fecha Denuncia Desde - Fecha Denuncia Hasta',
        value: selectedDenunciaDesde ? Utils.dateFormato2(selectedDenunciaDesde, "yyyy-mm-dd") : null,
        label: selectedDenunciaDesde !== null && selectedDenunciaHasta !== null
          ? `${setearFechas(selectedDenunciaDesde)} - ${setearFechas(selectedDenunciaHasta)}` : null,
      },
      // {
      //   key: 16,
      //   nombre: "selectedDenunciaHasta",
      //   descripcion:'Fecha Denuncia Hasta',
      //   value: selectedDenunciaHasta ? Utils.dateFormato2(selectedDenunciaHasta, "yyyy-mm-dd") : null,
      //   label: setearFechas(selectedDenunciaHasta),
      // },
      {
        key: 17,
        nombre: "fechaAltaDesde",
        descripcion: 'Fecha Alta desde - Fecha Alta hasta',
        label: selectedAltaDesde !== null && selectedAltaHasta !== null
          ? `${setearFechas(selectedAltaDesde)} - ${setearFechas(selectedAltaHasta)}` : null,
        value: selectedAltaDesde ? Utils.dateFormato2(selectedAltaDesde) : null,
        // label: setearFechas(selectedAltaDesde),
      },
      // {
      //   key: 18,
      //   nombre: "selectedAltaHasta",
      //   descripcion: 'Fecha Alta hasta',
      //   value: selectedAltaHasta ? Utils.dateFormato2(selectedAltaHasta) : null,
      //   label: setearFechas(selectedAltaHasta),
      // },
      {
        key: 19,
        nombre: "fechaCargaAltaDesde",
        descripcion: 'Fecha carga desde - Fecha carga hasta',
        value: selectedCargaAltaDesde ? Utils.dateFormato2(selectedCargaAltaDesde) : null,
        label: selectedCargaAltaDesde !== null && selectedCargaAltaHasta !== null
          ? `${setearFechas(selectedCargaAltaDesde)} - ${setearFechas(selectedCargaAltaHasta)}` : null,
      },
      // {
      //   key: 20,
      //   nombre: "selectedCargaAltaHasta",
      //   descripcion: 'Fecha carga hasta',
      //   value: selectedCargaAltaHasta ? Utils.dateFormato2(selectedCargaAltaHasta) : null,
      //   label: setearFechas(selectedCargaAltaHasta),
      // },
      {
        key: 21,
        nombre: "quirurgico",
        descripcion: 'Quirúrgico',
        value: datosChip && (datosChip && datosChip.quirurgico === undefined) ? null : datosChip.quirurgico,
        label: datosChip && datosChip.quirurgico !== null && dataChipNombre.quirurgico !== 'Todos'
          ? dataChipNombre.quirurgico : null
      },
      {
        key: 21,
        nombre: "trazadora",
        descripcion: 'Trazadora',
        value: datosChip && (datosChip && datosChip.trazadora === undefined) ? null : datosChip.trazadora,
        label: datosChip && datosChip.trazadora !== null ? dataChipNombre.trazadora : null
      },
      {
        key: 22,
        nombre: "reingreso",
        descripcion: 'Reingreso',
        value: datosChip && (datosChip && datosChip.reingreso === undefined) ? null : datosChip.reingreso,
        label: datosChip && datosChip.reingreso !== null && dataChipNombre.reingreso !== 'Todos'
          ? dataChipNombre.reingreso : null
      },
      {
        key: 23,
        descripcion: 'Estado Internación',
        nombre: "estadoInternacionIdEstadoInternacion",
        value: datosChip && datosChip.estadoInternacionIdEstadoInternacion
          ? datosChip.estadoInternacionIdEstadoInternacion : null,
        label: datosChip && datosChip.estadoInternacionIdEstadoInternacion !== null
          && dataChipNombre.internacion !== 'Todos' && dataChipNombre.internacion
          ? dataChipNombre.internacion : null
      },
      {
        key: 24,
        descripcion: 'Tipo Siniestro',
        nombre: "tipoSiniestroIdTipoSiniestro",
        value: tipoSiniestro ? tipoSiniestro : null,
        label: tipoSiniestro ? tipSin[0] : null
      },
      {
        key: 25,
        descripcion: 'DiagnósticoCIE10',
        nombre: "diagnosticoCie10Codigo",
        value: valueDiagnosticoCie10 && codigoIdDiagnosticoCie10 ? codigoIdDiagnosticoCie10 : null,
        label: valueDiagnosticoCie10 ? valueDiagnosticoCie10 : null
      },
      {
        key: 26,
        nombre: "severidadIdSeveridad",
        descripcion: 'Severidad Denuncia',
        value: severidadDenuncia ? severidadDenuncia : null,
        label: severidadDenuncia ? severidad[0] : null
      },
      {
        key: 27,
        nombre: "descartadoPorError",
        descripcion: 'Descartados por error',
        value: checkNoIncluiDesc ? checkNoIncluiDesc : false,
        label: checkNoIncluiDesc ? "No incluir descartados por error" : null
      },
      {
        key: 28,
        nombre: "checkSoloPreDenun",
        descripcion: 'Predenuncias',
        value: checkSoloPreDenun ? checkSoloPreDenun : false,
        label: checkSoloPreDenun ? "Solo denuncias Pre-denuncias" : null
      },
      {
        key: 29,
        nombre: "checkSoloSuspe",
        descripcion: 'Suspendidos',
        value: checkSoloSuspe ? checkSoloSuspe : false,
        label: checkSoloSuspe ? "Solo Suspendidos" : null
      },
      {
        key: 30,
        nombre: "checkRechazados",
        descripcion: 'Rechazados',
        value: checkRechazados ? checkRechazados : false,
        label: checkRechazados ? "Rechazados" : null
      },
      {
        key: 31,
        nombre: "checkSinBajaLaboral",
        descripcion: 'Sin Baja Laboral',
        value: checkSinBajaLaboral ? checkSinBajaLaboral : false,
        label: checkSinBajaLaboral ? "Sin Baja Laboral" : null
      },
      {
        key: 32,
        nombre: "checkDictamen",
        descripcion: 'Dictamen',
        value: checkDictamen ? checkDictamen : false,
        label: checkDictamen ? "Dictamen" : null
      },
      {
        key: 34,
        nombre: "checkTelegrama",
        descripcion: 'Recibido por Telegrama',
        value: checkTelegrama ? checkTelegrama : false,
        label: checkTelegrama ? "Recibido por Telegrama" : null
      },
      {
        key: 33,
        nombre: "checkSiniestrosIntegracion",
        descripcion: 'Siniestros sin Integracion',
        value: checkSiniestrosIntegracion ? checkSiniestrosIntegracion : null,
        label: checkSiniestrosIntegracion ? 'Siniestros sin Integracion' : null
      }
    ]

    setFiltrosSupervisor(req.filter(it => it.label !== null && it.label !== undefined && it.label !== false))
    setMostrarMenuAplicacion(true);
    setMostrarFiltroAvanzado(false);
    setCustomButtonStatus(false);
  }

  const handleCheckSiniestrosIntegracion = (selected) => {
    if(selected){
      setCheckSiniestrosIntegracion(true)
      setSelectClientesDisabled(true)
      setClienteDescripcion(CLIENTE_PROVINCIA_ART_DESCRIPCION)
      handleSelectSiniestrosSinIntegracion(selected)
    }else{
      setCheckSiniestrosIntegracion(false)
      setSelectClientesDisabled(false)
      setClienteDescripcion(null)
      handleSelectSiniestrosSinIntegracion(selected)
    }
  }
  
  return (
    <Grid container xs={12} justify={"flex-start"}>
      <Grid
        item
        container
        xs={12}
        alignItems={"flex-end"}
        spacing={2}
        style={{ marginTop: "7px" }}
      >
        <Grid item xs={3}>
          <Cliente
            titulo={"Cliente"}
            fullWidth={"607px"}
            height={"40px"}
            isOutline={true}
            seleccione={true}
            Clientvalue={clienteValue}
            setClienteValue={setClienteValue}
            handleChangeCliente={handleChangeCliente}
            filtros={true}
            setClienteCodigo={setClienteCodigo}
            disabled={selectClientesDisabled}
            clienteDescripcion={clienteDescripcion}
          ></Cliente>
        </Grid>
        <Grid item xs={9} style={{ marginTop: "10px" }}>
          <BusquedaEmpleador
            multiple={true}
            valueEmpleador={valueEmpleador}
            setValueEmpleador={setValueEmpleador}
            setSeleccionado={setSeleccionado}
            seleccion={seleccion}
            setCodigoSeleccionado={setCodigoSeleccionado}
            fechaOcurrenciaValidar={fechaOcurrenciaValidar}
            idEmpleadorValidar={idEmpleadorValidar}
            reingresoValidar={reingresoValidar}
            fullWidth={true}
            idCliente={clienteValue}
            cambioCliente={cambioCliente} setCambioCliente={setCambioCliente}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems={"flex-end"}
        spacing={2}
        style={{ marginTop: "7px" }}
      >
        <Grid item xs={4}>
          <Tramitador
            titulo={"Tramitador"}
            valTramitador={tramitador}
            height={"40px"}
            isOutline={true}
            seleccione={true}
            filtros={true}
            cambioCliente={cambioCliente} setCambioCliente={setCambioCliente}
            handleChangeSelectTramitador={handleChangeSelectTramitador}
            setTramitadorCodigo={setTramitadorCodigo}
          ></Tramitador>
        </Grid>
        <Grid item xs={4}>
          <EstadoMedico
            valEstadoMedico={estadoMedico}
            titulo={"Estado Medico"}
            isOutline={true}
            handleChangeSelectEstadoMedico={handleChangeEstadoMedico}
            setEstadoMedicoCodigo={setEstadoMedicoCodigo}
          />
        </Grid>
        <Grid item xs={4}>
          <Provincia
            titulo={"Provincia"}
            fullWidth={true}
            isOutline={true}
            seleccione={true}
            val={dataProvincia}
            handleChangeProvincia={handleChangeProvincia}
            setProvinciaCodigo={setProvinciaCodigo}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems={"flex-end"}
        spacing={2}
        style={{ marginTop: "5px" }}
      >
        <Grid item xs={6}>
          <Prestador
            titulo={"Prestador"}
            fullWidth={true}
            isOutline={true}
            seleccione={true}
            value={prestador}
            handleChangePrestador={handleChangePrestador}
            filtros={true}
            setPrestadorCodigo={setPrestadorCodigo}
          />
        </Grid>
        <Grid item xs={6}>
          <BusquedaCentroMedico
            titulo={"Cent. Med. PrimeraAsistencia"}
            fullWidth={true}
            isOutline={true}
            seleccione={true}
            value={centroPrimeraAsistencia}
            filtros={true}
            handleChangeCentrosMedicos={handleChangeCentroMedicos}
            setCentMedPrimeraAsistenciaCodigo={setCentMedPrimeraAsistenciaCodigo}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        alignItems={"flex-end"}
        spacing={2}
        style={{ marginTop: "2px" }}
      >
        <Grid item xs={4}>
          <CustomPeriodo
            fontSize={"13px"}
            label={"Fecha Denuncia"}
            selectedDate={selectedDate}
            selectedDesde={selectedDenunciaDesde}
            setSelectedDesde={setSelectedDenunciaDesde}
            selectedHasta={selectedDenunciaHasta}
            setSelectedHasta={setSelectedDenunciaHasta}
            setErrorHasta={setErrorHasta}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomPeriodo
            fontSize={"13px"}
            label={"Fecha Alta"}
            selectedDate={selectedDate}
            selectedDesde={selectedAltaDesde}
            setSelectedDesde={setSelectedAltaDesde}
            selectedHasta={selectedAltaHasta}
            setSelectedHasta={setSelectedAltaHasta}
            setErrorHasta={setErrorHasta}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomPeriodo
            fontSize={"13px"}
            label={"Fecha Carga Alta"}
            selectedDate={selectedDate}
            selectedDesde={selectedCargaAltaDesde}
            setSelectedDesde={setSelectedCargaAltaDesde}
            selectedHasta={selectedCargaAltaHasta}
            setSelectedHasta={setSelectedCargaAltaHasta}
            setErrorHasta={setErrorHasta}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: "12px" }}>
        <CustomButtonGroup
          valueChip={valueChip} setValueChip={setValueChip}
          datosChip={datosChip} setDatosChip={setDatosChip}
          limpiarChips={limpiarChips}
        />

      </Grid>
      <Grid
        container
        xs={12}
        justify={"space-between"}
        alignItems={"flex-end"}
        spacing={2}
        style={{ marginTop: "10px" }}
      >
        <Grid item xs={4}>
          <TipoSiniestro
            titulo={"Tipo Siniestro"}
            fullWidth={true}
            isOutline={true}
            valSiniestro={tipoSiniestro}
            handleChangeSelectSiniestro={handleChangeTipoSiniestro}
            filtros={true}
            setTipoSiniestroCodigo={setTipoSiniestroCodigo}
          />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "12px" }}>
          <FormHelperText>Diagnostico Cie10</FormHelperText>
          <DiagnosticoCIE10
            valueDiagnosticoCie10={valueDiagnosticoCie10}
            setValueDiagnosticoCie10={setValueDiagnosticoCie10}
            setDataDiagnosticoCie10={setDataDiagnosticoCie10}
            esFiltro={true}
            variant={"outlined"}
            tipoBusqueda={1}
          />
        </Grid>
        <Grid item xs={4}>
          <SeveridadDenuncia
            titulo={"Severidad"}
            filtros={true}
            fullWidth={true}
            isOutline={true}
            valSeveridadDenuncia={severidadDenuncia}
            handleChangeSeveridadDenuncia={handleChangeSeveridadDenuncia}
            setSeveridadCodigo={setSeveridadCodigo}
          />
        </Grid>
      </Grid>
      <Grid
        container
        xs={12}
        justify={"space-between"}
        spacing={2}
        style={{ marginTop: "19px" }}
      >
        <CustomCheck
          handleChange={() =>
            checkNoIncluiDesc
              ? setCheckNoIncluirDesc(false)
              : setCheckNoIncluirDesc(true)
          }
          texto={"No incluir descartados por error"}
          checked={checkNoIncluiDesc}
        />
        <CustomCheck
          handleChange={() =>
            checkSoloPreDenun
              ? setCheckSoloPreDenun(false)
              : setCheckSoloPreDenun(true)
          }
          texto={"Solo denuncias de Pre-denuncias"}
          checked={checkSoloPreDenun}
        />
        <CustomCheck
          handleChange={() =>
            checkSoloSuspe
              ? setCheckSoloSuspen(false)
              : setCheckSoloSuspen(true)
          }
          texto={"Solo suspendidos"}
          checked={checkSoloSuspe}
        />
        <CustomCheck
          handleChange={() =>
            checkRechazados
              ? setCheckRechazados(false)
              : setCheckRechazados(true)
          }
          texto={"Rechazados"}
          checked={checkRechazados}
        />
        <CustomCheck
          handleChange={() =>
            checkSinBajaLaboral
              ? setCheckSinBajaLaboral(false)
              : setCheckSinBajaLaboral(true)
          }
          texto={"Sin Baja Laboral"}
          checked={checkSinBajaLaboral}
        />
        <CustomCheck
          handleChange={() =>
            checkDictamen ? setCheckDictamen(false) : setCheckDictamen(true)
          }
          texto={"Dictamen"}
          checked={checkDictamen}
        />
        <CustomCheck
          handleChange={() =>
            checkTelegrama ? setCheckTelegrama(false) : setCheckTelegrama(true)
          }
          texto={"Recibido por Telegrama"}
          checked={checkTelegrama}
        />
        <Tooltip title = {TOOLTIP_TEXTO_SINIESTROS_SIN_INTEGRACION}>
          <Grid>
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
        </Tooltip>
      </Grid>
      <HeaderFiltrosAvanzadosPiePagina
        color={color}
        handleClickComprimir={handleClickComprimir}
        handleClickAplicarFiltros={handleClickAplicarFiltrosSupervisor}
        handleClickLimpiarFiltros={handleClickLimpiarFiltros}
      ></HeaderFiltrosAvanzadosPiePagina>
    </Grid>
  );
};

export default HeaderFiltrosAvanzadosSupervisor;
