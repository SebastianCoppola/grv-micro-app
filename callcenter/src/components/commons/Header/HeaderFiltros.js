import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
//Redux:
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../../redux/actions/index"
import { searchEstadoInternacion } from "../../../redux/actions/index"
import { busquedaDenunciasExportar } from "../../../redux/actions/documentos"
//Router:
import { useHistory } from "react-router"
import { COMPONENT_PREDENUNCIA, COMPONENT_SINIESTROS, COMPONENT_SOLICITUDES_GENERICAS, COMPONENT_TRASLADOS, COMPONENT_TRASLADO_SINIESTRO_COMPLETO, COMPONENT_CONSULTA_RECLAMOS_COMPLETO, COMPONENT_CONSULTA_RECLAMOS_GENERAL, COMPONENT_CONSULTA_SINIESTROS_PENDIENTES, SNACK_SEVERITY, SNACK_VERTICAL } from "../../../Utils/const";
//Mui:
import { FormHelperText, Grid, makeStyles, useMediaQuery } from "@material-ui/core"
import { NotificationsOff, CancelPresentationOutlined } from "@material-ui/icons/"
//Componentes:
import Buscador from "../Buscador/buscador"
import CustomDatePicker from "../DatePicker/CustomDatePicker"
import CustomPeriodo from "../DatePickerPeriodo/CustomPeriodo"
import CustomSelect from "../Select/customSelect"
import CustomCheck from "../CustomCheck/CustomChek"
import CustomButton from "../Button/CustomButton"
import Operadores from "../../Selects/Operadores"
import EstadoTraslado from "../../Selects/EstadoTraslado"
import EstadoConsultaYReclamos from "../../Selects/EstadoConsultaYReclamos"
import HeaderFiltrosAvanzadosOperador from "../Header/HeaderFiltrosAvanzados.js/HeaderFiltrosAvanzadosOperador"
import HeaderFiltrosAvanzadosSupervisor from "../Header/HeaderFiltrosAvanzados.js/HeaderFiltrosAvanzadosSupervisor"
import AplicacionHeaderFiltrosAvanzados from "./HeaderFiltrosAvanzados.js/AplicacionHeaderFiltrosAvanzados"
import CustomText from "../TextField/CustomText"
//Icons:
import filterPlus from "../../../commons/assets/Header/filterPlus.svg"
import SVGExcel from '../../../commons/assets/MDI _ file-excel.svg'

const useStyles = makeStyles((theme) => ({
	contenedor: {
		backgroundColor: "white",
		borderBottom: "solid 1px #dadce0",
		padding: "2px",
		paddingBottom: "10px"
	},
	buscador: {
		width: "240px",
		height: "40px",
		padding: 0
	},
	periodo: {
		width: "270px",
		height: "79px"
	},
	fecha: {
		width: "142px",
		height: "74px"
	},
}))

const HeaderFiltros = (props) => {

	const {
		usuarioActivo, component,
		//Condicionales:
		showBuscador, actualizarData, showOperadores, showEstadoCEM, showSiestrosCheck, showAsignarSolicitudes, showButton, openMenu, openMenuSiniestros,
		disableAsignarOperador, solicitudesGenericas, siniestrosHoy, fechaConsulta, seccionConsultas, exportar, consultasReclamos, disableEdition,
		esFechaCarga, esFechaOcurrencia, esFechaContacto,
		//Data
		dataSelect, estadosCEM, page, rowsPerPage, tipoDoc, idDenuncia, data, ordenDenuncia,
		//Handle:
		setDataSelect, setOrdenDenuncia, handleButton, onClickAsignarGestorMultiple, handleOffAlarm,
		//Style, texts
		align, tituloCheck1, tituloCheck2, tituloEstado,labelButton, variantButton, colorButton, iconButton, isTraslados, positionSnackBar,
	} = props

	const nroDenunciaRef = useRef()
	const nroCuilRef = useRef()
	const apellidoRef = useRef()
	const nombreRef = useRef()
	const cuilNro = useRef()
	let inputDNIRef = useRef()
	let nroDenunciaCompletoRef = useRef()
	const customButtonRef = useRef()

	const classes = useStyles(props)
	const history = useHistory()
	const isSmallDevice = useMediaQuery("(max-width:1280px)")
	const internacion2 = useSelector(state => state.listados.estadoInternacion)
	const dispatch = useDispatch()
	const esOperador = usuarioActivo && usuarioActivo.isOperador

	let fechaDesdeSolicitudesGenericas = new Date(new Date().setMonth(new Date().getMonth() - 1))
	let fechaDesdeTraslado = new Date(new Date().setMonth(new Date().getMonth() + 1))
	let idEmpleadorValidar = null
	let reingresoValidar = false
	const color = "#1473e6"

	const [request, setRequest] = useState({})
	const [selectedDate, setSelectedDate] = useState(fechaConsulta ? null : new Date())
	const [nroDenuncia, setNroDenuncia] = useState(null)
	const [nroCuil, setNroCuil] = useState(null)
	const [apellido, setApellido] = useState(null)
	const [nombre, setNombre] = useState(null)
	const [tramitador, setTramitador] = useState(request && request.tramitadorIdPersona ? request.tramitadorIdPersona : null)
	const [estadoMedico, setEstadoMedico] = useState(request && request.estadoMedicoIdEstadoMedico ? request.estadoMedicoIdEstadoMedico : null)
	const [mostrarMenuAplicacion, setMostrarMenuAplicacion] = useState(false)
	const [valueDenuncia, setValueDenuncia] = useState(null)
	const [datosChip, setDatosChip] = useState({
		quirurgico: request && (request && request.quirurgico === undefined) ? null : request.quirurgico,
		reingreso: request && (request && request.reingreso === undefined) ? null : request.reingreso,
		trazadora: request && (request && request.trazadora === undefined) ? null : request.trazadora,
		internacion: request && request.estadoInternacionIdEstadoInternacion ? request.estadoInternacionIdEstadoInternacion : undefined,
	})
	const [selectedDesde, setSelectedDesde] = useState(
		component === COMPONENT_SOLICITUDES_GENERICAS
			? fechaDesdeSolicitudesGenericas
			: null
	)
	const [selectedHasta, setSelectedHasta] = useState(component === COMPONENT_SOLICITUDES_GENERICAS ? new Date() : null)
	const [selectOperado, setSelectOperado] = useState("")
	const [selectCEM, setSelectCEM] = useState("")
	const [dataBuscador, setDataBuscador] = useState({ tipoDoc: tipoDoc ? tipoDoc : 1, nroDoc: null, busqueda: false })
	const [checkConPedienteSiVerificar, setcheckConPedienteSiVerificar] = useState({ conPendientes: false, sinVerificar: false })
	const [mostrarFiltroAvanzado, setMostrarFiltroAvanzado] = useState(null)
	const [customButtonStatus, setCustomButtonStatus] = useState(true)
	const [filtrosOperador, setFiltrosOperador] = useState([])
	const [filtrosSupervisor, setFiltrosSupervisor] = useState([])
	const [errorHasta, setErrorHasta] = useState("")
	const [valueNroDenunciaContiene, setValueNroDenunciaContiene] = React.useState(request && request.nroDenunciaContiene ? request.nroDenunciaContiene : null)
	const [selectedDenunciaDesde, setSelectedDenunciaDesde] = useState(request && request.fechaDenunciaInicio ? request.fechaDenunciaInicio : null)
	const [selectedDenunciaHasta, setSelectedDenunciaHasta] = useState(request && request.fechaDenunciaFin ? request.fechaDenunciaFin : null)
	const [selectedAltaDesde, setSelectedAltaDesde] = useState(request && request.fechaAltaDesde ? request.fechaAltaDesde : null)
	const [selectedAltaHasta, setSelectedAltaHasta] = useState(request && request.fechaAltaHasta ? request.fechaAltaHasta : null)
	const [fechaOcurrenciaValidar, setFechaOcurrenciaValidar] = useState(new Date())
	const [contactosVencidos, setContactosVencidos] = useState(null)
	const [tipoSiniestro, setTipoSiniestro] = useState(request && request.tipoSiniestroIdTipoSiniestro ? request.tipoSiniestroIdTipoSiniestro : null)
	const [severidadDenuncia, setSeveridadDenuncia] = useState(request && request.severidadIdSeveridad ? request.severidadIdSeveridad : null)
	const [checkNoIncluiDesc, setCheckNoIncluirDesc] = useState(false)
	const [checkSoloPreDenun, setCheckSoloPreDenun] = useState(false)
	const [checkSoloSuspe, setCheckSoloSuspen] = useState(false)
	const [checkRechazados, setCheckRechazados] = useState(false)
	const [checkSinBajaLaboral, setCheckSinBajaLaboral] = useState(false)
	const [checkDictamen, setCheckDictamen] = useState(false)
	const [checkTelegrama, setCheckTelegrama] = useState(false)
	const [checkSiniestrosIntegracion, setCheckSiniestrosIntegracion] = useState(false)
	const [clienteValue, setClienteValue] = useState(null)
	const [valueEmpleador, setValueEmpleador] = useState([])
	const [dataProvincia, setDataProvincia] = useState(request && request.provincia ? request.provincia : null)
	const [prestador, setPrestador] = useState(null)
	const [centroPrimeraAsistencia, setCentroPrimeraAsistencia] = useState(request && request.proveedorCentroMedicoPrimerAsistenciaId ? request.proveedorCentroMedicoPrimerAsistenciaId : null)
	const [selectedCargaAltaDesde, setSelectedCargaAltaDesde] = useState(null)
	const [selectedCargaAltaHasta, setSelectedCargaAltaHasta] = useState(null)
	const [valueDiagnosticoCie10, setValueDiagnosticoCie10] = useState()
	const [dataDiagnosticoCie10, setDataDiagnosticoCie10] = useState(null)
	const [seleccionado, setSeleccionado] = useState(false)
	const [codigoSeleccionado, setCodigoSeleccionado] = useState(null)
	const [seleccion, setSeleccion] = useState(false)
	const [quirurgicos, setQuirurgicos] = useState(null)
	const [trazadora, setTrazadora] = useState(null)
	const [reingresos, setReingresos] = useState(null)
	const [internacion, setInternacion] = useState(null)
	const [limpiarChips, setLimpiarChips] = useState(false)
	const [dniHeader, setDNIHeader] = useState(null)
	const [tipoDniHeader, setTipoDniHeader] = useState(null)
	const [cambioCliente, setCambioCliente] = useState(false)
	const [tipoDniConsulta, setTipoDniConsulta] = useState(1)
	const [datosExportar, setDatosExportar] = useState(null)
	const [disableNroDenunciaCompleto, setDisableNroDenunciaCompleto] = useState(false)
	const [contadorDen, setContadorDen] = useState(0)
	const [limpiarFiltros, setLimpiarFiltros] = useState(false)
	const [filtrar, setFiltrar] = useState(false)


	useEffect(() => {
		setLimpiarChips(false)
	}, [limpiarChips])

	useEffect(() => {
		dispatch(searchEstadoInternacion())
	}, [])

	useEffect(() => {
		if (component === COMPONENT_TRASLADO_SINIESTRO_COMPLETO) {
			setSelectedDesde(new Date())
			setSelectedHasta(fechaDesdeTraslado)
		}
	}, [])

	const handleChipsInternacion = (item) => {
		setInternacion(item.codigo)
	}

	const handleChangeEstadoMedico = (e) => {
		setEstadoMedico(e.target.value);
	}

	const handleChangeSelectTramitador = (e) => {
		setTramitador(e.target.value);
	}

	const handleChangeSelectCuil = (e) => {
		setNroCuil(e.target.value)
	}

	const handleChangeSelectDenuncia = (e) => {
		setNroDenuncia(e.target.value)
	}

	const handleChangeSelectApellido = (e) => {
		setApellido(e.target.value)
	}

	const handleChangeSelectNombre = (e) => {
		setNombre(e.target.value)
	}

	const handleClickFiltrosAvanzados = () => {
		setMostrarFiltroAvanzado(true);
		setCustomButtonStatus(false);
		setContadorDen(1)
		setMostrarMenuAplicacion(false)
	}

	const handleChangeTipoSiniestro = (e) => {
		setTipoSiniestro(e.target.value)
	}

	const handleChangeSeveridadDenuncia = (e) => {
		setSeveridadDenuncia(e.target.value);
	}

	const handleChangeCliente = (e) => {
		setClienteValue(e.target.value)
		setCambioCliente(true)
	}

	const handleChangeProvincia = (e) => {
		setDataProvincia(e.target.value)
	}

	const handleChangePrestador = (e) => {
		setPrestador(e.target.value)
	}

	const handleChangeCentroMedicos = (e) => {
		setCentroPrimeraAsistencia(e.target.value)
	}

	const handleChangeContactosVencidos = (e) => {
		setContactosVencidos(e.target.value)
	}

	const handleClickComprimir = () => {
		setMostrarFiltroAvanzado(false)
		setCustomButtonStatus(true)
		setContadorDen(1)
	}


	const handleSelectCEM = (event) => {
		setSelectCEM(event.target.value);
		setRequest({
			...request,
			estadoCem: event.target.value
		})
	}

	const handleSelectOperador = (event) => {
		setSelectOperado(event.target.value);
		setRequest({
			...request,
			idOperador: event.target.value
		})
	}

	const handleAsignarOperador = (event) => {
		let callback = (succes, message) => {
			dispatch(
				actions.setSnackbar({
					open: true,
					severity: succes ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
					message: message,
					vertical: positionSnackBar
				})
			)
			if (succes) {
				setDataSelect([])
				buscarPreDenuncias()
			}
		}
		let idOperador = event.target.value
		if (component === COMPONENT_SOLICITUDES_GENERICAS) {
			onClickAsignarGestorMultiple(idOperador)
		} else {
			let request = {
				idsPreDenuncias: dataSelect && dataSelect,
				idOperadorResponsable: idOperador && idOperador,
				idOperadorLogueado: usuarioActivo && usuarioActivo.id,
			}
			dispatch(actions.asignarResponsable(request, callback))
		}
	}

	const handleCheck1 = (event) => {
		setcheckConPedienteSiVerificar((data) => ({
			...data,
			conPendientes: !data.conPendientes,
		}));
		setRequest({
			...request,
			denunciasConPendientes: event.target.checked
		})
	}

	const handleCheck2 = (event) => {
		setcheckConPedienteSiVerificar((data) => ({ ...data, sinVerificar: !data.sinVerificar }))
		setRequest({
			...request,
			denunciasSinVerificar: event.target.checked
		})
	}

	const handleBuscador = (tipoDoc, nroDoc) => {
		setDataBuscador((dataBuscador) => ({
			...dataBuscador,
			tipoDoc: tipoDoc,
			nroDoc: nroDoc,
			busqueda: true,
		}))
		setRequest({
			...request,
			tipoDoc: tipoDniConsulta,
			nroDoc: dniHeader
		})
	}

	function formatoFecha(fecha, formato) {
		const map = {
			dd: fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate(),
			mm: fecha.getMonth() + 1 < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1,
			yy: fecha.getUTCFullYear().toString().slice(-2),
			yyyy: fecha.getUTCFullYear(),
		}
		return formato.replace(/dd|mm|yyyy|yy/gi, (matched) => map[matched]);
	}

	const exportarConsulta = () => {
		if (request) {
			dispatch(busquedaDenunciasExportar(request, callBackExportar))
		}
	}

	const callBackExportar = (bool) => {
		if (!bool) {
			dispatch(
				actions.setSnackbar({
					open: true,
					severity: SNACK_SEVERITY.ERROR,
					message: 'Ocurrió un error al intentar exportar PDF',
					vertical: positionSnackBar ?? SNACK_VERTICAL.TOP
				})
			)
		}
	}

	const buscarDenuncias = () => {
		let newDate = null
		let newDateDesde = null
		let newDateHasta = null
		let busquedaDni = false

		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}

		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}

		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd")
		}

		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }))
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}

		if ((busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
			|| (valueDenuncia) || (checkConPedienteSiVerificar.sinVerificar)
			|| (checkConPedienteSiVerificar.conPendientes)
			|| (selectCEM !== '')
			|| (selectOperado !== ''))
			&& !mostrarMenuAplicacion
		) {

			dispatch(actions.searchDenuncias({
				...request,
				estadoCem: selectCEM,
				limit: rowsPerPage,
				offset: page * rowsPerPage,
				[esFechaCarga ? "fechaDenunciaExacta" : "fechaExacta"]: selectedDate,
				[esFechaCarga ? "fechaDenunciaInicio" : "fechaInicio"]: selectedDesde,
				[esFechaCarga ? "fechaDenunciaFin" : "fechaFin"]: selectedHasta,
				ordenDenunciaDesc: siniestrosHoy ? ordenDenuncia : null,
			}))
		}
	}

	const setearRequest = () => {
		setRequest({
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaExacta: !siniestrosHoy ? selectedDate : null,
			fechaInicio: !siniestrosHoy ? selectedDesde : null,
			fechaFin: !siniestrosHoy ? selectedHasta : null,
			isPredenuncia: false,
			nroDenunciaCompleto: nroDenunciaCompletoRef && nroDenunciaCompletoRef.current
				&& nroDenunciaCompletoRef.current.value !== ''
				? nroDenunciaCompletoRef.current.value : null,
			denunciasSinVerificar: checkConPedienteSiVerificar.sinVerificar,
			denunciasConPendientes: checkConPedienteSiVerificar.conPendientes,
			estadoCem: selectCEM === " " ? null : selectCEM,
			idOperador: selectOperado === "" ? null : selectOperado,
			nroDoc: dataBuscador.nroDoc,
			tipoDoc: dataBuscador.tipoDoc,
		})
	}

	const handleClickLimpiarFiltrosAvanzadosOperador = () => {
		setFiltrosOperador(null);
		setMostrarMenuAplicacion(false);
		setCustomButtonStatus(true);
		setMostrarFiltroAvanzado(false);
		setearRequest()
		setLimpiarFiltros(true)
		setDatosChip({
			quirurgico: null,
			trazadora: null,
			reingreso: null,
			internacion: null,
		})
		setTramitador(null)
	}

	const handleClickLimpiarFiltrosAvanzadosSupervisor = () => {
		setFiltrosSupervisor(null)
		setTramitador(null)
		setearRequest()
		setDatosChip({
			quirurgico: null,
			trazadora: null,
			reingreso: null,
			internacion: null,
		})
		setMostrarMenuAplicacion(false)
		setCustomButtonStatus(true)
		setMostrarFiltroAvanzado(false)
		setLimpiarFiltros(true)
	}

	const buscarPreDenuncias = () => {
		let newDate = null;
		let newDateDesde = null;
		let newDateHasta = null;
		let busquedaDni = false;

		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}

		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}

		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd")
		}

		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }))
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}

		const requestPreDenuncias = {
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaExacta: newDate,
			fechaInicio: newDateDesde,
			fechaFin: newDateHasta,
			isPredenuncia: false,
			sinAsignaciones: checkConPedienteSiVerificar.sinVerificar,
			estadoCem: selectCEM === "" ? null : selectCEM,
			idOperador: checkConPedienteSiVerificar.conPendientes
				? usuarioActivo.id
				: null,
			nroDoc: dataBuscador.nroDoc,
			tipoDoc: dataBuscador.tipoDoc,
		}

		if (busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
		) {
			dispatch(actions.searchPreDenuncias(requestPreDenuncias))
		}
	}

	const buscarSolicitudesGenericas = () => {
		let newDate = null
		let newDateDesde = null
		let newDateHasta = null
		let busquedaDni = false

		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}

		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}

		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd")
		}

		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }));
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}

		const requestDenuncias = {
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaExacta: newDate,
			fechaInicio: newDateDesde,
			fechaFin: newDateHasta,
			sinAsignacion: checkConPedienteSiVerificar.sinVerificar,
			estadoCem: selectCEM && selectCEM === "" ? null : selectCEM,
			idOperador: checkConPedienteSiVerificar.conPendientes
				? usuarioActivo.id
				: null,
			nroDoc: dataBuscador.nroDoc,
			tipoDoc: dataBuscador.tipoDoc,
		}

		if (busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
		) {
			dispatch(actions.searchSolicitudesGenericas(requestDenuncias));
		}
	}

	useEffect(() => {
		switch (component) {
			case COMPONENT_PREDENUNCIA:
				buscarPreDenuncias()
				break
			case COMPONENT_SINIESTROS:
				if (siniestrosHoy) {
					if (setOrdenDenuncia) setOrdenDenuncia(null) //si el filtro es aplicado por el header, borro el orden por denuncia.
					if (!history?.location?.state?.ejecutarConsulta) {
						buscarDenuncias()
						break
					}
					break
				}
				if (!mostrarFiltroAvanzado && !siniestrosHoy) {
					buscarDenuncias()
				}
				break
			case COMPONENT_SOLICITUDES_GENERICAS:
				buscarSolicitudesGenericas()
				break
			case COMPONENT_TRASLADOS:
				buscarTraslados();
				break;
			case COMPONENT_TRASLADO_SINIESTRO_COMPLETO:
				buscarTraslados()
				break
			case COMPONENT_CONSULTA_RECLAMOS_COMPLETO:
				buscarConsultaReclamos()
				break
			case COMPONENT_CONSULTA_RECLAMOS_GENERAL:
				buscarConsultaReclamos()
				break
			case COMPONENT_CONSULTA_SINIESTROS_PENDIENTES:
				buscarSiniestrosPendientes()
				break
			default:
				break
		}
	}, [checkConPedienteSiVerificar, selectCEM, selectOperado, dataBuscador, selectedDate,
		selectedDesde, selectedHasta, valueDenuncia, actualizarData, rowsPerPage, page,
		request, mostrarFiltroAvanzado, errorHasta])

	//Efectúo la busqueda cuando se quiere ordenar por Denuncia.
	useEffect(() => {
		if (ordenDenuncia !== null) buscarDenuncias();
	}, [ordenDenuncia])

	const buscarTraslados = () => {
		let newDate = null;
		let newDateDesde = null;
		let newDateHasta = null;
		let busquedaDni = false;

		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}
		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}
		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd")
		}
		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }))
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}
		const request = {
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaTurnoExacta: newDate,
			fechaTurnoInicio: newDateDesde,
			fechaTurnoFin: newDateHasta,
			estadoCem: component === COMPONENT_TRASLADOS ? 11 : selectCEM.toString() === "" ? null : selectCEM,
			nroDoc: dataBuscador.nroDoc,
			tipoDoc: dataBuscador.tipoDoc,
			idDenuncia: COMPONENT_TRASLADO_SINIESTRO_COMPLETO ? idDenuncia : null,
			idResponsable: selectOperado.toString() === "" ? null : selectOperado,
		}
		if (busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
		) {
			if (component === COMPONENT_TRASLADO_SINIESTRO_COMPLETO) {
				dispatch(actions.searchtTrasladosCompleto(request))
			} else {
				dispatch(actions.searchtTrasladosGeneral(request))
			}
		}
	}

	function arrayCollectionToObject(collection) {
		const result = {}
		for (const item of collection) {
			result[item.nombre] = item.value
			result[item.descripcion] = item.label
		}
		return result
	}

	function arrayCollectionToObject2(collection, valor) {
		const result = []
		for (const item of collection) {
			valueEmpleador.map((it) => {
				if (it.descripcion === item.label) {
					if (valor) {
						result.push(it.codigo)
					} else {
						result.push(it)
					}
				}
			})
		}
		return result
	}

	useEffect(() => {
		if (filtrar) {
			let Filtro = arrayCollectionToObject(filtrosOperador)
			console.log(Filtro)
			let filt = filtrosOperador.filter((it) => it.nombre === 'idEmpleador')
			let empleador = arrayCollectionToObject2(filt, 'codigo')
			let requestFiltro = ({
				...request,
				"nombre": Filtro && Filtro.nombre ? Filtro.nombre : null,
				"nroDenunciaContiene": Filtro && Filtro.nroDenunciaContiene ? Filtro.nroDenunciaContiene : null,
				"apellido": Filtro && Filtro.apellido ? Filtro.apellido : null,
				"nroCuil": Filtro && Filtro.nroCuil ? Filtro.nroCuil : null,
				"severidadIdSeveridad": Filtro && Filtro.severidadIdSeveridad ? request.severidadIdSeveridad : null,
				"fechaAltaHasta": Filtro && Filtro.fechaAltaDesde ? request.fechaAltaHasta : null,
				"tipoSiniestroIdTipoSiniestro": Filtro && Filtro.tipoSiniestroIdTipoSiniestro ? request.tipoSiniestroIdTipoSiniestro : null,
				"fechaAltaDesde": Filtro && Filtro.fechaAltaDesde ? request.fechaAltaDesde : null,
				"fechaDenunciaFin": Filtro && Filtro.fechaDenunciaFin ? request.fechaDenunciaFin : null,
				"fechaDenunciaInicio": Filtro && Filtro.fechaDenunciaFin ? request.fechaDenunciaInicio : null,
				"fechaCargaAltaDesde": Filtro && Filtro.fechaCargaAltaDesde ? request.fechaCargaAltaDesde : null,
				"fechaCargaAltaHasta": Filtro && Filtro.fechaCargaAltaDesde ? request.fechaCargaAltaHasta : null,
				"estadoMedicoIdEstadoMedico": Filtro && Filtro.estadoMedicoIdEstadoMedico ? request.estadoMedicoIdEstadoMedico : null,
				"idEmpleador": Filtro && Filtro.idEmpleador ? empleador : null,
				"proveedorCentroDerivadoId": Filtro && Filtro.proveedorCentroDerivadoId ? request.proveedorCentroDerivadoId : null,
				"idCliente": Filtro && Filtro.idCliente ? request.idCliente : null,
				"provincia": Filtro && Filtro.provincia ? request.provincia : null,
				"proveedorCentroMedicoPrimerAsistenciaId": Filtro && Filtro.proveedorCentroMedicoPrimerAsistenciaId ? request.proveedorCentroMedicoPrimerAsistenciaId : null,
				"quirurgico": Filtro && Filtro.quirurgico ? Filtro.quirurgico : null,
				"trazadora": Filtro && Filtro.trazadora ? Filtro.trazadora : null,
				"reingreso": Filtro && Filtro.reingreso ? Filtro.reingreso : null,
				"tramitadorIdPersona": Filtro && Filtro.tramitadorIdPersona ? Filtro.tramitadorIdPersona : null,
				"estadoInternacionIdEstadoInternacion": Filtro && Filtro.estadoInternacionIdEstadoInternacion ? Filtro.estadoInternacionIdEstadoInternacion : null,
				"descartadoPorError": Filtro && Filtro.descartadoPorError ? Filtro.descartadoPorError : false,
				"isPredenuncia": Filtro && Filtro.checkSoloPreDenun ? Filtro.checkSoloPreDenun : false,
				"suspendido": Filtro && Filtro.checkSoloSuspe ? Filtro.checkSoloSuspe : false,
				"rechazadoPorArt": Filtro && Filtro.checkRechazados ? Filtro.checkRechazados : false,
				"esSinBajaLaboral": Filtro && Filtro.checkSinBajaLaboral ? Filtro.checkSinBajaLaboral : false,
				"dictamen": Filtro && Filtro.checkDictamen ? Filtro.checkDictamen : false,
				"recibidoTelegrama": Filtro && Filtro.checkTelegrama ? Filtro.checkTelegrama : null,
				"diagnosticoCie10Codigo": Filtro && Filtro.diagnosticoCie10Codigo ? request.diagnosticoCie10Codigo : null,
				"siniestrosSinIntegracion": Filtro && Filtro.checkSiniestrosIntegracion ? Filtro.checkSiniestrosIntegracion : null
			})
			setRequest(requestFiltro)
			borrarEstado(Filtro, request)
			dispatch(actions.searchDenuncias(requestFiltro))
		}
		setFiltrar(false)
	}, [filtrar])

	const borrarEstado = (Filtro, request) => {
		let filt = filtrosOperador.filter((it) => it.nombre === 'idEmpleador')
		let empleador = arrayCollectionToObject2(filt, false)
		setDatosChip({
			quirurgico: Filtro && !Filtro.quirurgico ? null : request.quirurgico,
			trazadora: Filtro && !Filtro.trazadora ? null : request.trazadora,
			reingreso: Filtro && !Filtro.reingreso ? null : request.reingreso,
			internacion: request && request.estadoInternacionIdEstadoInternacion ? request.estadoInternacionIdEstadoInternacion : null,
		})
		setValueNroDenunciaContiene(Filtro && !Filtro.nroDenunciaContiene ? null : request.nroDenunciaContiene)
		setValueEmpleador(Filtro && !Filtro.idEmpleador ? [] : empleador)
		setClienteValue(Filtro && !Filtro.idCliente ? null : request.idCliente)
		setPrestador(Filtro && !Filtro.proveedorCentroDerivadoId ? null : request.proveedorCentroDerivadoId)
		setDataProvincia(Filtro && !Filtro.provincia ? null : request.provincia)
		setValueDiagnosticoCie10(Filtro && !Filtro.diagnosticoCie10Codigo ? null : Filtro.DiagnosticoCIE10)
		setSeveridadDenuncia(Filtro && !Filtro.severidadIdSeveridad ? null : request.severidadIdSeveridad)
		setCentroPrimeraAsistencia(Filtro && !Filtro.proveedorCentroMedicoPrimerAsistenciaId ? null : request.proveedorCentroMedicoPrimerAsistenciaId)
		setTipoSiniestro(Filtro && !Filtro.tipoSiniestroIdTipoSiniestro ? null : request.tipoSiniestroIdTipoSiniestro)
		setTramitador(Filtro && !Filtro.tramitadorIdPersona ? null : request.tramitadorIdPersona)
		setEstadoMedico(Filtro && !Filtro.estadoMedicoIdEstadoMedico ? null : request.estadoMedicoIdEstadoMedico)
		setSelectedAltaDesde(Filtro && !Filtro.fechaAltaDesde ? null : request.fechaAltaDesde)
		setSelectedAltaHasta(Filtro && !Filtro.fechaAltaDesde ? null : request.fechaAltaHasta)
		setSelectedDenunciaDesde(Filtro && !Filtro.fechaDenunciaFin ? null : request.fechaDenunciaInicio)
		setSelectedDenunciaHasta(Filtro && !Filtro.fechaDenunciaFin ? null : request.fechaDenunciaFin)
		setCheckNoIncluirDesc(Filtro && !Filtro.descartadoPorError ? false : request.descartadoPorError)
		setCheckSoloPreDenun(Filtro && !Filtro.checkSoloPreDenun ? false : request.isPredenuncia)
		setCheckSoloSuspen(Filtro && !Filtro.checkSoloSuspe ? false : request.suspendido)
		setCheckRechazados(Filtro && !Filtro.checkRechazados ? false : request.rechazadoPorArt)
		setCheckSinBajaLaboral(Filtro && !Filtro.checkSinBajaLaboral ? false : request.esSinBajaLaboral)
		setCheckDictamen(Filtro && !Filtro.checkDictamen ? false : request.dictamen)
		setCheckTelegrama(Filtro && !Filtro.checkTelegrama ? false : request.telegrama)
		setSelectedCargaAltaDesde(Filtro && !Filtro.fechaCargaAltaDesde ? null : request.fechaCargaAltaDesde)
		setSelectedCargaAltaHasta(Filtro && !Filtro.fechaCargaAltaDesde ? null : request.fechaCargaAltaHasta)
		setCheckSiniestrosIntegracion(Filtro && !Filtro.checkSiniestrosIntegracion ? false : request.siniestrosSinIntegracion)
	}

	const buscarConsultaReclamos = () => {
		let newDate = null
		let newDateDesde = null
		let newDateHasta = null
		let busquedaDni = false
		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}
		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}
		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd")
		}
		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }))
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}
		const request = {
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaExacta: newDate,
			fechaInicio: newDateDesde,
			fechaFin: newDateHasta,
			estado: selectCEM === "" ? null : selectCEM,
			nroDoc: COMPONENT_CONSULTA_RECLAMOS_GENERAL ? dataBuscador.nroDoc : null,
			tipoDoc: COMPONENT_CONSULTA_RECLAMOS_GENERAL ? dataBuscador.tipoDoc : null,
			idDenuncia: COMPONENT_CONSULTA_RECLAMOS_COMPLETO ? idDenuncia : null,
			idOperador: selectOperado === "" ? null : selectOperado
		}
		setDatosExportar(request)
		if (busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
		) {
			if (component === COMPONENT_CONSULTA_RECLAMOS_COMPLETO) {
				dispatch(actions.searchReclamosByDenuncia(request));
			} else {
				dispatch(actions.searchReclamosGeneral(request));
			}
		}
	}

	const buscarSiniestrosPendientes = () => {
		let newDate = null
		let newDateDesde = null
		let newDateHasta = null
		let busquedaDni = false

		if (selectedDate !== null && selectedDate !== undefined) {
			newDate = formatoFecha(selectedDate, "yyyy-mm-dd")
		}
		if (selectedDesde !== null && selectedDesde !== undefined) {
			newDateDesde = formatoFecha(selectedDesde, "yyyy-mm-dd")
		}
		if (selectedHasta !== null && selectedHasta !== undefined && errorHasta.toString() === "") {
			newDateHasta = formatoFecha(selectedHasta, "yyyy-mm-dd");
		}
		if (dataBuscador.busqueda
			&& (dataBuscador.nroDoc === "" || dataBuscador.nroDoc === null)
			&& (newDate === null || (newDateDesde === null && newDateDesde === null))
		) {
			setDataBuscador((data) => ({ ...data, busqueda: false }))
		} else if (dataBuscador.busqueda) {
			busquedaDni = dataBuscador.busqueda
		}

		const request = {
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			fechaExacta: newDate,
			fechaInicio: newDateDesde,
			fechaFin: newDateHasta,
			estadoCem: selectCEM === "" ? null : selectCEM,
			idOperador: selectOperado === "" ? null : selectOperado,
			nroDoc: dataBuscador.nroDoc,
			tipoDoc: dataBuscador.tipoDoc,
		}
		if (busquedaDni
			|| (newDateDesde !== null && newDateHasta !== null && newDate === null)
			|| (newDate !== null && newDateDesde === null && newDateHasta === null)
		) {
			dispatch(actions.searchSiniestrosPendientes(request));
		}
	}

	useEffect(() => {
		if (history?.location?.state && history?.location?.state.ejecutarConsulta) {
			setSelectCEM(history?.location?.state.estado)
			if (history?.location?.state.selectedDate !== null) {
				setSelectedDate(new Date(history?.location?.state.selectedDate));
			} else {
				setSelectedDate(null)
			}
			if (history?.location?.state.fechaDesde !== null) {
				setSelectedDesde(new Date(history?.location?.state.fechaDesde))
			}
			if (history?.location?.state.fechaHasta !== null) {
				setSelectedHasta(new Date(history?.location?.state.fechaHasta))
			}
			if (history?.location?.state.operador !== "") {
				setSelectOperado(history?.location?.state.operador)
			}
			if (history?.location?.state.tareasPendientes !== false) {
				setcheckConPedienteSiVerificar((data) => ({
					...data,
					conPendientes: history?.location?.state.tareasPendientes,
				}))
			}
			history.push({ state: { ejecutarConsulta: false, tareasPendientes: true } })
		}
	}, [history])

	const ChangeNroDenuncia = (event) => {
		setValueDenuncia(event.target.value)
		if (COMPONENT_SINIESTROS && !siniestrosHoy) {
			setRequest({
				...request,
				nroDenunciaCompleto: event.target.value !== '' ? event.target.value : null
			})
		}
	}

	useEffect(() => {
		if ((selectedDate) || (selectedDesde && selectedHasta)) {
			setRequest({
				...request,
				[esFechaCarga ? "fechaDenunciaExacta" : "fechaExacta"]: selectedDate,
				[esFechaCarga ? "fechaDenunciaInicio" : "fechaInicio"]: selectedDesde,
				[esFechaCarga ? "fechaDenunciaFin" : "fechaFin"]: selectedHasta,
			})
		}
	}, [selectedDate, selectedDesde, selectedHasta])

	useEffect(() => {
		if (contadorDen !== 0 && COMPONENT_SINIESTROS && !siniestrosHoy) {
			let req = {
				...request,
				offset: page * rowsPerPage,
				limit: rowsPerPage
			}
			dispatch(actions.searchDenuncias(req))
		}

	}, [rowsPerPage, page, actualizarData])

	const exportarConsultaReclamo = () => {
		if (datosExportar != null) {
			dispatch(actions.exportarExcelConsultaReclamo(datosExportar, callBackExportar))
		}
	}

	const handleSelectSiniestrosSinIntegracion = (selected) => {
		if(selected){
			setValueDenuncia("")
			setDisableNroDenunciaCompleto(true)
		}else{
			setDisableNroDenunciaCompleto(false)
		}
	}

	return (
		<Grid container className={classes.contenedor} justify={align} spacing={1}>
			<Grid
				item
				xs={(solicitudesGenericas || (showButton && !isTraslados)) && !isSmallDevice ? 10 : 12}
				container
				alignItems={"flex-end"}
				justify={isSmallDevice || openMenu || openMenuSiniestros ? "flex-start" : align}
				spacing={1}
			>
				{showBuscador ?
					<Grid item className={classes.buscador}>
						<Buscador
							data={dataBuscador}
							onClik={handleBuscador}
							cabeceraTabla={true}
							inputRef={inputDNIRef}
							request={request}
							setRequest={setRequest}
							setDataBuscador={setDataBuscador}
							dniHeader={dniHeader}
							setDNIHeader={setDNIHeader}
							tipoDniHeader={tipoDniHeader} setTipoDniHeader={setDNIHeader}
							tipoDniConsulta={tipoDniConsulta} setTipoDniConsulta={setTipoDniConsulta}
						/>
					</Grid>
					: null}
				{seccionConsultas ?
					<Grid item style={{ width: "186px" }}>
						<FormHelperText>Nro. Denuncia Completo</FormHelperText>
						<CustomText
							borderRadius='20px'
							fullwidth={true}
							variant='outlined'
							value={valueDenuncia}
							radius={'20px'}
							shrink={true}
							inputRef={nroDenunciaCompletoRef}
							onChange={ChangeNroDenuncia}
							style={{ marginTop: "3px" }}
							height={33}
							disabled={disableNroDenunciaCompleto}
						/>
					</Grid>
					: null}
				<Grid item className={classes.fecha}>
					<CustomDatePicker
						setSelectedDate={setSelectedDate}
						selectedDate={selectedDate}
						placeholder={"Fecha"}
						title={
							esFechaCarga ? 'Fecha de Carga' :
								esFechaOcurrencia ? 'Fecha de Ocurrencia' :
									esFechaContacto ? 'Fecha de Contacto' : 'Fecha Exacta'
						}
						disabledPicker={siniestrosHoy ? !siniestrosHoy : false}
						isOutline={true}
						fontSize={"13px"}
						height={'36px'}
						selectedHasta={selectedHasta}
						fullwidth={true}
					/>
				</Grid>
				<Grid item className={classes.periodo}>
					<CustomPeriodo
						selectedDesde={selectedDesde}
						setSelectedDesde={setSelectedDesde}
						selectedHasta={selectedHasta}
						setSelectedHasta={setSelectedHasta}
						setErrorHasta={setErrorHasta}
						fontSize={"13px"}
						selectedDate={selectedDate}
						height={'36px'}
						label={
							esFechaCarga ? 'Periodo de Carga' :
								esFechaOcurrencia ? 'Periodo de Ocurrencia' :
									esFechaContacto ? 'Periodo de Contacto' : 'Periodo'
						}
					/>
				</Grid>
				{showOperadores ?
					<Grid item style={{ height: "70px" }}>
						<Operadores
							titulo={'Operadores'}
							fullwidth={true}
							seleccione={true}
							handleChangeSelect={handleSelectOperador}
							val={selectOperado}
							placeholder={'Seleccionar'}
							isOutline={true}
							fontSize={"13px"}
							height={'39px'}
						/>
					</Grid>
					: null}
				{showEstadoCEM && component === COMPONENT_TRASLADO_SINIESTRO_COMPLETO ?
					<Grid item>
						<EstadoTraslado
							titulo={tituloEstado ? tituloEstado : 'Estado CEM'}
							data={estadosCEM}
							fullwidth={true}
							seleccione={true}
							handleChangeSelect={handleSelectCEM}
							val={selectCEM}
							placeholder={'Seleccionar'}
							isOutline={true}
							fontSize={"13px"}
							height={'39px'}
						/>
					</Grid>
					: showEstadoCEM && (component === COMPONENT_CONSULTA_RECLAMOS_COMPLETO || component === COMPONENT_CONSULTA_RECLAMOS_GENERAL) ?
						<Grid item style={{ height: "70px" }}>
							<EstadoConsultaYReclamos
								titulo={tituloEstado ? tituloEstado : 'Estado CEM'}
								fullwidth={true}
								seleccione={true}
								handleChangeSelect={handleSelectCEM}
								val={selectCEM}
								placeholder={'Seleccionar'}
								isOutline={true}
								fontSize={"13px"}
								height={'39px'}
							/>
						</Grid>
						: showEstadoCEM ?
							<Grid item style={{ height: "70px" }}>
								<CustomSelect
									titulo={tituloEstado ? tituloEstado : 'Estado CEM'}
									data={estadosCEM}
									fullwidth={true}
									seleccione={true}
									handleChangeSelect={handleSelectCEM}
									val={selectCEM}
									placeholder={'Seleccionar'}
									isOutline={true}
									fontSize={"13px"}
									height={'39px'}
								/>
							</Grid>
							: null}
				{isTraslados ?
					<Grid item>
						<CustomButton
							label={labelButton}
							variant={variantButton}
							isAction={true}
							color={colorButton}
							startIcon={iconButton}
							onClik={handleButton}
							disabled={disableEdition}
						/>
					</Grid>
					: null}
				{component === COMPONENT_TRASLADO_SINIESTRO_COMPLETO ?
					<Grid item>
						<CustomButton
							label={'Apagar alarma'}
							variant={variantButton}
							isAction={true}
							startIcon={<NotificationsOff />}
							onClik={handleOffAlarm}
						/>
					</Grid>
					: null}
				{showSiestrosCheck && seccionConsultas ?
					<Grid
						item
						container
						className={classes.contenido}
						justify={esOperador ? "flex-end" : "space-between"}
						alignItems={"flex-end"}
						spacing={1}
						style={{ marginTop: esOperador && mostrarFiltroAvanzado ? 0 : "20px" }}
					>
						{!esOperador && (
							<Grid item container spacing={2} xs={8}>
								<Grid item xs={3}>
									<CustomCheck
										checked={checkConPedienteSiVerificar.conPendientes}
										handleChange={handleCheck1}
										texto={tituloCheck1 ? tituloCheck1 : 'Siniestros con pendientes'}
									/>
								</Grid>
								<Grid item xs={customButtonStatus ? 6 : 9}>
									<CustomCheck
										checked={checkConPedienteSiVerificar.sinVerificar}
										handleChange={handleCheck2}
										texto={tituloCheck2 ? tituloCheck2 : 'Siniestros sin verificar'}
									/>
								</Grid>
							</Grid>
						)}
						<Grid item container alignItems='flex-end' justify='flex-end' spacing={2}>
							{!mostrarFiltroAvanzado ?
								<Grid item >
									<CustomButton
										label={'Ver filtros Avanzados'}
										styleButton={{
											borderRadius: "5px",
											backgroundColor: "#f4f4f4",
											border: "1px solid #d3d3d3",
											width: "200px",
											height: "40px",
										}}
										startIcon={<img src={filterPlus} />}
										onClik={handleClickFiltrosAvanzados}
										referencia={customButtonRef}
									/>
								</Grid>
								: null}
							{exportar &&
								<Grid item>
									<CustomButton
										startIcon={<CancelPresentationOutlined />}
										label={'Exportar'}
										variant={"outlined"}
										onClik={exportarConsulta}
									/>
								</Grid>
							}
							</Grid>
					</Grid>
					: showSiestrosCheck && !seccionConsultas && !esOperador ?
						<Grid
							item
							className={classes.contenido}
							justify={"space-between"}
							alignItems={"flex-end"}
							spacing={1}
							style={{ marginTop: "10px", height: "75px" }}
						>
							<Grid item>
								<CustomCheck
									checked={checkConPedienteSiVerificar.conPendientes}
									handleChange={handleCheck1}
									texto={tituloCheck1 ? tituloCheck1 : 'Siniestros con pendientes'}
								/>
							</Grid>
							<Grid item>
								<CustomCheck
									checked={checkConPedienteSiVerificar.sinVerificar}
									handleChange={handleCheck2}
									texto={tituloCheck2 ? tituloCheck2 : 'Siniestros sin verificar'}
								/>
							</Grid>
						</Grid>
						: null}

			</Grid>

			{showButton ?
				<Grid item style={{ marginTop: "40px" }}>
					<CustomButton
						label={labelButton}
						variant={variantButton}
						isAction={true}
						color={colorButton}
						startIcon={iconButton}
						onClik={handleButton}
						disabled={disableEdition}
					/>
				</Grid>
				: null}

			{showAsignarSolicitudes ?
				<Grid item style={{ height: "20px", marginTop: "15px" }}>
					<Operadores
						disabled={disableAsignarOperador}
						placeholder={'Seleccionar Operador'}
						isOutline={true}
						val={selectOperado}
						handleChangeSelect={handleAsignarOperador}
						fullwidth={true}
						seleccione={true}
						titulo={'Asignar Solicitudes'}
					/>
				</Grid>
				: null}

			{esOperador && mostrarFiltroAvanzado ?
				<Grid>
					<HeaderFiltrosAvanzadosOperador
						nroDenuncia={nroDenuncia}
						selectOperado={selectOperado}
						valueDenuncia={valueDenuncia}
						selectedDesde={selectedDesde}
						nroCuil={nroCuil}
						dniHeader={dniHeader}
						inputDNIRef={inputDNIRef}
						nroDenunciaCompletoRef={nroDenunciaCompletoRef}
						limpiarFiltros={limpiarFiltros} setLimpiarFiltros={setLimpiarFiltros}
						filtrosOperador={filtrosOperador}
						valueNroDenunciaContiene={valueNroDenunciaContiene} setValueNroDenunciaContiene={setValueNroDenunciaContiene}
						tipoDniHeader={tipoDniHeader}
						selectedPeriodoDesde={selectedDesde}
						selectedPeriodoHasta={selectedHasta}
						setFiltrosOperador={setFiltrosOperador}
						request={request} setRequest={setRequest}
						errorHasta={errorHasta}
						limit={rowsPerPage}
						offset={page * rowsPerPage}
						setMostrarMenuAplicacion={setMostrarMenuAplicacion}
						setMostrarFiltroAvanzado={setMostrarFiltroAvanzado}
						setCustomButtonStatus={setCustomButtonStatus}
						selectCEM={selectCEM}
						pendientes={checkConPedienteSiVerificar}
						tramitador={tramitador} setTramitador={setTramitador}
						estadoMedico={estadoMedico} setEstadoMedico={setEstadoMedico}
						apellido={apellido}
						nombre={nombre}
						denunciaDesde={selectedDenunciaDesde}
						denunciaHasta={selectedDenunciaHasta}
						altaDesde={selectedAltaDesde}
						altaHasta={selectedAltaHasta}
						onChangeNroDenuncia={handleChangeSelectDenuncia}
						onChangeNroCuil={handleChangeSelectCuil}
						handleChangeSelectTramitador={handleChangeSelectTramitador}
						handleChangeEstadoMedico={handleChangeEstadoMedico}
						onChangeApellido={handleChangeSelectApellido}
						onChangeNombre={handleChangeSelectNombre}
						selectedDate={selectedDate} setSelectedDate={setSelectedDate}
						selectedHasta={selectedHasta}
						handleClickComprimir={handleClickComprimir}
						setSelectedDenunciaDesde={setSelectedDenunciaDesde}
						setSelectedDenunciaHasta={setSelectedDenunciaHasta}
						setSelectedAltaDesde={setSelectedAltaDesde}
						setSelectedAltaHasta={setSelectedAltaHasta}
						setErrorHasta={setErrorHasta}
						nroDenunciaRef={nroDenunciaRef}
						nroCuilRef={nroCuilRef}
						apellidoRef={apellidoRef}
						nombreRef={nombreRef}
						cuilNro={cuilNro}
						tipoDniConsulta={tipoDniConsulta}
						checkSiniestrosIntegracion={checkSiniestrosIntegracion}
						setCheckSiniestrosIntegracion={setCheckSiniestrosIntegracion}
						handleSelectSiniestrosSinIntegracion={handleSelectSiniestrosSinIntegracion}
						checkConPedienteDeVerificacion={checkConPedienteSiVerificar.conPendientes}
						handleCheckConPendientesDeVerificacion={handleCheck1}
					/>
				</Grid>
				: !esOperador && mostrarFiltroAvanzado ?
					<HeaderFiltrosAvanzadosSupervisor
						datosChip={datosChip} setDatosChip={setDatosChip}
						selectedDesde={selectedDesde}
						inputDNIRef={inputDNIRef}
						nroDenunciaCompletoRef={nroDenunciaCompletoRef}
						selectOperado={selectOperado}
						limpiarFiltros={limpiarFiltros}
						setLimpiarFiltros={setLimpiarFiltros}
						setLimpiarChips={setLimpiarChips}
						setMostrarMenuAplicacion={setMostrarMenuAplicacion}
						setMostrarFiltroAvanzado={setMostrarFiltroAvanzado}
						setCustomButtonStatus={setCustomButtonStatus}
						setFiltrosSupervisor={setFiltrosOperador}
						filtrosSupervisor={filtrosOperador}
						internacion2={internacion2}
						handleChipsInternacion={handleChipsInternacion}
						dniHeader={dniHeader}
						tipoDniHeader={tipoDniHeader}
						pendientes={checkConPedienteSiVerificar}
						selectCEM={selectCEM}
						selectedHasta={selectedHasta}
						selectedPeriodoHasta={selectedHasta}
						selectedPeriodoDesde={selectedDesde}
						limit={rowsPerPage}
						offset={page * rowsPerPage}
						quirurgico={quirurgicos}
						trazadora={trazadora}
						reingreso={reingresos}
						internacion={internacion}
						limpiarChips={limpiarChips}
						clienteValue={clienteValue}
						setClienteValue={setClienteValue}
						valueEmpleador={valueEmpleador}
						tramitador={tramitador}
						estadoMedico={estadoMedico}
						dataProvincia={dataProvincia}
						prestador={prestador}
						centroPrimeraAsistencia={centroPrimeraAsistencia}
						errorHasta={errorHasta}
						setErrorHasta={setErrorHasta}

						selectedDenunciaDesde={selectedDenunciaDesde}
						setSelectedDenunciaDesde={setSelectedDenunciaDesde}
						selectedDenunciaHasta={selectedDenunciaHasta}
						setSelectedDenunciaHasta={setSelectedDenunciaHasta}
						selectedAltaDesde={selectedAltaDesde}
						setSelectedAltaDesde={setSelectedAltaDesde}
						selectedAltaHasta={selectedAltaHasta}
						setSelectedAltaHasta={setSelectedAltaHasta}
						selectedDate={selectedDate}
						selectedCargaAltaDesde={selectedCargaAltaDesde}
						setSelectedCargaAltaDesde={setSelectedCargaAltaDesde}
						selectedCargaAltaHasta={selectedCargaAltaHasta}
						setSelectedCargaAltaHasta={setSelectedCargaAltaHasta}

						valueDiagnosticoCie10={valueDiagnosticoCie10}
						setValueDiagnosticoCie10={setValueDiagnosticoCie10}
						dataDiagnosticoCie10={dataDiagnosticoCie10}
						setDataDiagnosticoCie10={setDataDiagnosticoCie10}
						seleccionado={seleccionado}
						codigoSeleccionado={codigoSeleccionado}
						seleccion={seleccion}
						idEmpleadorValidar={idEmpleadorValidar}
						fechaOcurrenciaValidar={fechaOcurrenciaValidar}
						contactosVencidos={contactosVencidos}
						tipoSiniestro={tipoSiniestro}
						severidadDenuncia={severidadDenuncia}
						checkNoIncluiDesc={checkNoIncluiDesc}
						setCheckNoIncluirDesc={setCheckNoIncluirDesc}
						checkSoloPreDenun={checkSoloPreDenun}
						setCheckSoloPreDenun={setCheckSoloPreDenun}
						checkSoloSuspe={checkSoloSuspe}
						setCheckSoloSuspen={setCheckSoloSuspen}
						checkRechazados={checkRechazados}
						setCheckRechazados={setCheckRechazados}
						checkSinBajaLaboral={checkSinBajaLaboral}
						setCheckSinBajaLaboral={setCheckSinBajaLaboral}
						checkDictamen={checkDictamen}
						setCheckDictamen={setCheckDictamen}
						checkTelegrama={checkTelegrama}
						setCheckTelegrama={setCheckTelegrama}
						reingresoValidar={reingresoValidar}
						setSeleccionado={setSeleccionado}
						setCodigoSeleccionado={setCodigoSeleccionado}
						setContactosVencidos={setContactosVencidos}
						setTipoSiniestro={setTipoSiniestro}
						setSeveridadDenuncia={setSeveridadDenuncia}
						setSeleccion={setSeleccion}
						setTramitador={setTramitador}
						setReingresos={setReingresos}
						setQuirurgicos={setQuirurgicos}
						setTrazadora={setTrazadora}
						setEstadoMedico={setEstadoMedico}
						setDataProvincia={setDataProvincia}
						setPrestador={setPrestador}
						setCentroPrimeraAsistencia={setCentroPrimeraAsistencia}
						setSelectedDate={setSelectedDate}
						setFechaOcurrenciaValidar={setFechaOcurrenciaValidar}
						setValueEmpleador={setValueEmpleador}
						color={color}
						handleChangeEstadoMedico={handleChangeEstadoMedico}
						handleChangeTipoSiniestro={handleChangeTipoSiniestro}
						handleChangeSeveridadDenuncia={handleChangeSeveridadDenuncia}
						handleChangeCliente={handleChangeCliente}
						handleChangeProvincia={handleChangeProvincia}
						handleChangePrestador={handleChangePrestador}
						handleChangeCentroMedicos={handleChangeCentroMedicos}
						handleChangeContactosVencidos={handleChangeContactosVencidos}
						handleChangeSelectTramitador={handleChangeSelectTramitador}
						handleClickComprimir={handleClickComprimir}
						setInternacion={setInternacion}
						setRequest={setRequest}
						request={request}
						cambioCliente={cambioCliente} setCambioCliente={setCambioCliente}
						tipoDniConsulta={tipoDniConsulta}
						checkSiniestrosIntegracion={checkSiniestrosIntegracion}
						setCheckSiniestrosIntegracion={setCheckSiniestrosIntegracion}
						handleSelectSiniestrosSinIntegracion={handleSelectSiniestrosSinIntegracion}
					/>
					: null}

			{mostrarMenuAplicacion && filtrosOperador && filtrosOperador.length > 0 ?
				<AplicacionHeaderFiltrosAvanzados
					titulo={'Filtros Avanzados Aplicados'}
					filtros={filtrosOperador}
					setFiltros={setFiltrosOperador}
					handleClickLimpiarFiltrosAvanzados={handleClickLimpiarFiltrosAvanzadosOperador}
					request={request}
					setRequest={setRequest}
					esOperador={esOperador}
					filtrar={filtrar}
					setFiltrar={setFiltrar}
				/>
				: mostrarMenuAplicacion && filtrosSupervisor && filtrosSupervisor.length > 0 ?
					<AplicacionHeaderFiltrosAvanzados
						titulo={'Filtros Avanzados Aplicados'}
						filtros={filtrosSupervisor}
						setFiltros={filtrosOperador}
						handleClickLimpiarFiltrosAvanzados={handleClickLimpiarFiltrosAvanzadosSupervisor}
						request={request}
						setRequest={setRequest}
						esOperador={esOperador}
						filtrar={filtrar}
						setFiltrar={setFiltrar}
					/>
					: null}

			{consultasReclamos && !esOperador ?
				<Grid item container alignItems='flex-end' justify='flex-end'>
					<CustomButton
						startIcon={<img src={SVGExcel} style={{ height: '20px' }} />}
						label={'Descargar excel'}
						variant={"outlined"}
						disabled={!(data && data.length)}
						onClik={() => exportarConsultaReclamo()}
					/>
				</Grid>
				: null
			}

		</Grid>
	)
}

HeaderFiltros.propTypes = {
	usuarioActivo: PropTypes.object,
	component: PropTypes.string,
	showBuscador: PropTypes.bool,
	actualizarData: PropTypes.bool,
	showOperadores: PropTypes.bool,
	showEstadoCEM: PropTypes.bool,
	showSiestrosCheck: PropTypes.bool,
	showAsignarSolicitudes: PropTypes.bool,
	showButton: PropTypes.bool,
	openMenu: PropTypes.bool,
	openMenuSiniestros: PropTypes.bool,
	disableAsignarOperador: PropTypes.bool,
	solicitudesGenericas: PropTypes.bool,
	siniestrosHoy: PropTypes.bool,
	fechaConsulta: PropTypes.bool,
	seccionConsultas: PropTypes.bool,
	exportar: PropTypes.bool,
	consultasReclamos: PropTypes.bool,
	disableEdition: PropTypes.bool,
	esFechaCarga: PropTypes.bool,
	esFechaOcurrencia: PropTypes.bool,
	esFechaContacto: PropTypes.bool,
	isTraslados: PropTypes.bool,
	dataSelect: PropTypes.array,
	estadosCEM: PropTypes.array,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	tipoDoc: PropTypes.number,
	idDenuncia: PropTypes.number,
	data: PropTypes.any,
	ordenDenuncia: PropTypes.any,
	align: PropTypes.string,
	tituloCheck1: PropTypes.string,
	tituloCheck2: PropTypes.string,
	tituloEstado: PropTypes.string,
	labelButton: PropTypes.string,
	variantButton: PropTypes.string,
	colorButton: PropTypes.string,
	iconButton: PropTypes.any,
	positionSnackBar: PropTypes.string,
	handleButton: PropTypes.func,
	onClickAsignarGestorMultiple: PropTypes.func,
	handleOffAlarm: PropTypes.func,
	setDataSelect: PropTypes.func,
	setOrdenDenuncia: PropTypes.func,
}

export default HeaderFiltros


