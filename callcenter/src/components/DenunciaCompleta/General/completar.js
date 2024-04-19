import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'
import { ALERTA_CHECK_CORTO_PUNZANTE, ALERTA_INFO_CORTO_PUNZANTE } from '../../../Utils/const'
//Componentes:
import CompletarForm from './completarForm'

const Completar = (props) => {

    const { usuarioActivo, disableEdition, dataSiniestroCompleto, setDataSiniestroCompleto, 
        setDatosCompletarGeneral, activarAlarmas, setActivarAlarmas } = props
        
    const dispatch = useDispatch()

    const denuncia = useSelector(state => state.documentos.denuncia)

    const [valueResponsable, setResponsable] = useState(denuncia && denuncia.responsableIngreso !== null ? denuncia.responsableIngreso : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso !== null ? dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso : null)
    const [valEstadoMedico, setValEstadoMedico] = useState(denuncia && denuncia.estadoMedicoIdEstadoMedico !== null ? denuncia.estadoMedicoIdEstadoMedico : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico !== null ? dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico : 1)
    const [checkedART, setCheckedART] = useState(false)
    const [checkedDictamen, setCheckedDictamen] = useState(denuncia && denuncia.dictamen ? denuncia.dictamen : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.dictamen ? dataSiniestroCompleto.datosCompletarGeneral.dictamen : false)
    const [checkedCortoPunzante, setCheckedCortoPunzante] = useState(denuncia && denuncia.esCortoPunzante ? denuncia.esCortoPunzante : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante ? dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante : false)
    const [checkedBajaLaboral, setCheckedBajaLaboral] = useState(denuncia ? denuncia.esSinBajaLaboral : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral ? dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral : false)
    const [valPatologia, setValPatologia] = useState(denuncia && denuncia.patologiaTrazadoraIdPatologiaTrazadora !== 0 ? denuncia.patologiaTrazadoraIdPatologiaTrazadora : 0)
    const [valueRoam, setValRoam] = useState(denuncia ? denuncia.nroRoam : null)
    const [checkedReingreso, setCheckedReingreso] = useState(denuncia && denuncia.reingreso ? denuncia.reingreso : false)
    const [reingresoIdSiniestro, setReingresoIdSiniestro] = useState()
    const [reingresoNroSiniestro, setReingresoNroSiniestro] = useState()
    const [intercurrenciaIdSiniestro, setIntercurrenciaIdSiniestro] = useState()
    const [intercurrenciaNroSiniestro, setIntercurrenciaNroSiniestro] = useState()
    const [selectedDateOcurrencia, setSelectedDateOcurrencia] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia : denuncia ? denuncia.fechaOcurrencia : null)
    const [horaOcurrencia, setHoraOcurrencia] = useState(denuncia ? denuncia.horaOcurrencia : null)
    const [selectedDateBaja, setSelectedDateBaja] = useState(denuncia ? denuncia.fechaBaja : null)
    const [fechaRecepcion, setFechaRecepcion] = useState(denuncia && denuncia.fechaRecepcion ? denuncia.fechaRecepcion : denuncia && denuncia.fechaCreacion ? denuncia.fechaCreacion : null)
    const [selectedDateInternacionD, setSelectedDateInternacionD] = useState(denuncia && denuncia.fechaInternacionDesde !== null ? denuncia.fechaInternacionDesde : null)
    const [selectedDateInternacionH, setSelectedDateInternacionH] = useState(denuncia ? denuncia.fechaInternacionHasta : null)
    const [selectedHoraExtraccion, setSelectedHoraExtraccion] = useState(denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaPedido !== null ? denuncia.cortopunzante.horaPedido : new Date())
    const [selectedHoraValidacion, setSelectedHoraValidacion] = useState(denuncia && denuncia.cortoPunzante && denuncia.cortopunzante.horaValidacion !== null ? denuncia.cortopunzante.horaValidacion : null)
    const [selectedDatePCR, setSelectedDatePCR] = useState(denuncia ? denuncia.fechaPCR : null)
    const [valTramitador, setValTramitador] = useState(null)
    const [valAuditor, setValAuditor] = useState(denuncia ? denuncia.auditorMedicoIdPersona : null)
    const [checkedPrestaciones, setCheckedPrestaciones] = useState(denuncia ? denuncia.recibePrestacionesEnDomicilio : false)
    const [valueDiasPCR, setValueDiasPCR] = useState(null)
    const [valSiniestro, setValSiniestro] = useState(denuncia ? denuncia.tipoSiniestroIdTipoSiniestro : 0)
    const [valueAccidente, setValueAccidente] = useState(null)
    const [valueZonaAfectada, setValueZonaAfectada] = useState(null)
    const [valueNaturaleza, setValueNaturaleza] = useState(null)
    const [valueAgenteCausante, setValueAgenteCausante] = useState(null)
    const [valueAgenteMaterial, setValueAgenteMaterial] = useState(null)
    const [valueDiagnosticoCie10, setValueDiagnosticoCie10] = useState(null)
    const [valueDiagnosticoCerteza, setValueDiagnosticoCerteza] = useState(denuncia ? denuncia.diagnosticoDeCerteza : null)
    const [valSeveridadDenuncia, setSeveridadDenuncia] = useState(denuncia ? denuncia.severidadDenunciaIdSeveridadDenuncia : 0)
    const [valMultiline, setValMultiline] = useState(denuncia ? denuncia.relato : '')
    const [checkedValidarDiagnOstico, setCheckedValidarDiagnOstico] = useState(denuncia ? denuncia.validarDiagnostico : false)
    const [valueAsistenciaExterna, setValueAsistenciaExterna] = useState(denuncia ? denuncia.asistenciaExterna : null)
    const [valExtraccionista, setValExtraccionista] = useState(denuncia && denuncia.cortoPunzante ? denuncia.cortoPunzante.extraccionista : '')
    const [switchS, setSwitchS] = useState(denuncia && denuncia.siniestroMixtoEmail && denuncia.siniestroMixtoEmail.estado ? denuncia.siniestroMixtoEmail.estado : false)
    const [checkedInvestigacion, setCheckedInvestigacion] = useState(denuncia && denuncia.ameritaInvestigacion && denuncia.ameritaInvestigacion.estado ? denuncia.ameritaInvestigacion.estado : false);
    const [clickAlert, setClickAlert] = useState(false)
    const [clickButonAlert, setClickButonAlert] = useState(false)
    const [alertValidarDiagnostico, setAlertValidarDiagnostico] = useState(false)
    const [recordatorio, setRecordatorio] = useState(false)
    const [checkedSwitchAlert, setCheckedSwitchAlert] = useState(denuncia ? denuncia.diagnosticoValidado : false)
    const [checkedInvestigacionAlert, setCheckedInvestigacionAlert] = useState(false)
    const [clickInvestigacion, setClickInvestigacion] = useState(denuncia ? denuncia.ameritaInvestigacion : false)
    const [selectedDatePrimeraManifestacion, setSelectedDatePrimeraManifestacion] = useState(denuncia && denuncia.fechaPrimeraManifestacion !== null ? denuncia.fechaPrimeraManifestacion : denuncia && denuncia.fechaOcurrencia ? denuncia.fechaOcurrencia : null)
    const [valEstadoInternacion, setValEstadoInternacion] = useState(denuncia && denuncia.estadoInternacionIdEstadoInternacion ? denuncia.estadoInternacionIdEstadoInternacion : 1)
    const dataPresentaCovid = useSelector(state => state.listados.presentaCovid)
    const fechaMail = denuncia && denuncia.siniestroMixtoEmail !== null && denuncia.siniestroMixtoEmail.estado && denuncia.siniestroMixtoEmail.fecha
    const fechaMailInvestigacion = denuncia && denuncia.ameritaInvestigacionEmail && denuncia.ameritaInvestigacionEmail !== null && denuncia.ameritaInvestigacionEmail.fecha
    const [estadoDisabledSwitchS, setEstadoDisabledSwitchS] = useState(false)
    const [multipleCie10, setMultipleCie10] = useState(false)
    const [datosMultipleCIE10, setDatosMultipleCIE10] = useState(null)
    const [datosMultipleCIE10_2, setDatosMultipleCIE10_2] = useState(null)
    const [telegrama, setTelegrama] = useState(denuncia ? denuncia.recibidoPorTelegrama : false)
    const campos = useSelector(state => state.documentos.camposRequeridos)
    const [checkedIntercurrencia, setCheckedIntercurrencia] = useState(false);
    let diagnostico = datosMultipleCIE10 !== null && datosMultipleCIE10.diagnosticoCIE10_2
    let naturaleza = datosMultipleCIE10 !== null && datosMultipleCIE10.naturaleza_2
    let zona = datosMultipleCIE10 !== null && datosMultipleCIE10.zonaAfectada_2
    const [datosArrayMultiple10, setDatosArrayMultiple10] = useState([])
    const [mailCortopunzanteEnviado, setMailCortopunzanteEnviado] = useState(denuncia?.mailCortopunzanteEnviado ? denuncia.mailCortopunzanteEnviado : dataSiniestroCompleto?.mailCortopunzanteEnviado ? dataSiniestroCompleto.mailCortopunzanteEnviado : false )
    const [alertCortopunzante, setAlertCortoPunzante] = useState({open: false})
    const [test, setTest] = useState({baja: checkedBajaLaboral, corto: checkedCortoPunzante, centro: Utils.getSiniestroMixto(denuncia, dataSiniestroCompleto)})
    //Utils: 
    const [snackbar, setSnackbar] = useState({message:'', vertical:'', variant:'', severity:'', open: false})
    const [firstRender, setFirstRender] = useState(true)


    const handleCheckedBajaLaboral = (event) => {
        setCheckedBajaLaboral(event.target.checked)
        setTest({ ...test, baja: event.target.checked })
    }

    const handleChangeSwitch = (event) => {
        setSwitchS(event.target.checked);
        if (!switchS) {
            setClickAlert(true)
        } else if (switchS) {
            setCheckedBajaLaboral(false)
            setClickButonAlert(false)
        }
    }

    useEffect(() => {
        if (checkedBajaLaboral && !fechaMail) {
            setSwitchS(false)
            setEstadoDisabledSwitchS(true)
        } else if (dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto) {
            setEstadoDisabledSwitchS(false)
            if (denuncia && denuncia.siniestroMixtoEmail && !denuncia.siniestroMixtoEmail.estado) {
                setClickButonAlert(true)
            }
        }
    }, [checkedBajaLaboral])

    useEffect(() => {
        if (test) {
            if (test && !test.baja && test.corto && test.centro) {
                setEstadoDisabledSwitchS(false)
            } else {
                setEstadoDisabledSwitchS(true)
            }
        }
    }, [test])

    const handleCheckedReingreso = (event) => {
        setCheckedReingreso(event.target.checked);
        setCheckedIntercurrencia(false)
        if (event.target.checked) {
            setReingresoIdSiniestro(denuncia && denuncia.siniestroOriginalIdDenuncia ? denuncia.siniestroOriginalIdDenuncia : null)
            setReingresoNroSiniestro(denuncia && denuncia.nroAsignadoOrigen ? denuncia.nroAsignadoOrigen : denuncia && denuncia.nroSiniestroOriginal ? denuncia.nroSiniestroOriginal : null)
        }
    }

    const handleCheckedValidarDiagnOstico = (event) => {
        setCheckedValidarDiagnOstico(event.target.checked)
        if (checkedValidarDiagnOstico === false) {
            setAlertValidarDiagnostico(true)
            setCheckedSwitchAlert(false)
        } if (event.target.checked === true) {
            setAlertValidarDiagnostico(true)
        }

    }

    useEffect(() => {
        if (!multipleCie10) {
            setDatosMultipleCIE10(null)
            setDatosMultipleCIE10_2(null)
            setDatosArrayMultiple10([])
        }
    }, [multipleCie10])

    const handleCloseValidarDiagnostico = () => {
        setAlertValidarDiagnostico(false)
        setRecordatorio(!recordatorio)
    }

    const handleChangeSwitchAlert = (event) => {
        setCheckedSwitchAlert(event.target.checked)
        setCheckedValidarDiagnOstico(true)
        setRecordatorio(false)
    }

    const handleChangeInvestigacion = (event) => {
        setCheckedInvestigacion(event.target.checked);
        if (!checkedInvestigacion) {
            setCheckedInvestigacionAlert(true)
        } else if (checkedInvestigacion) {
            setClickInvestigacion(false)
        }
    }

    const handleCloseInvestigacionAlert = (event) => {
        setCheckedInvestigacionAlert(false)
        setCheckedInvestigacion(false)
    }

    const handleClickInvestigacion = () => {
        setCheckedInvestigacionAlert(false)
        setClickInvestigacion(true)
    }

    const handleIntercurrencia = (event) => {
        setCheckedIntercurrencia(event.target.checked)
        setCheckedReingreso(false)
        if (event.target.checked) {
            setIntercurrenciaIdSiniestro(denuncia && denuncia.idSiniestroIntercurrencia ? denuncia.idSiniestroIntercurrencia : null)
            setIntercurrenciaNroSiniestro(denuncia && denuncia.nroSiniestroIntercurrencia ? denuncia.nroSiniestroIntercurrencia : null)
        }

    }

    //Handle Check Cortopunzante:
    const handleCheckedCortoPunzante = (event) => {
        setCheckedCortoPunzante(event.target.checked)
        setTest({ ...test, corto: event.target.checked, baja: true })
        if(event.target.checked){
            setCheckedBajaLaboral(true)
            getCortopunzantePrevio()
        }else{
            dispatch(actions.setCortoPunzanteAnteriorActivo(null))
        }
    }

    //Form Cortopunzante:
    const handleHoraExtraccion = (event) => {
        setSelectedHoraExtraccion(event.target.value)
        handleAlertCortopunzante(event.target.value, valExtraccionista, selectedHoraValidacion)
    }
    const handleChangeSelectExtraccionista = (event) => {
        setValExtraccionista(event.target.value)
        handleAlertCortopunzante(selectedHoraExtraccion, event.target.value, selectedHoraValidacion)
    }
    const handleHoraValidacion = (event) => {
        setSelectedHoraValidacion(event.target.value)
        handleAlertCortopunzante(selectedHoraExtraccion, valExtraccionista, event.target.value)
    }

    //Maneja cuando y que se muestra en el alert cortopunzante:
    const handleAlertCortopunzante = (horaExtraccion, extraccionista, horaValidacion) => {
        if(extraccionista && extraccionista !== 1 && horaExtraccion && !horaValidacion){
            setAlertCortoPunzante({
                message: ALERTA_INFO_CORTO_PUNZANTE,
                severity: 'info',
                open:'true'
            })
        }else if(extraccionista && extraccionista !== 1 && horaExtraccion && horaValidacion){
            setAlertCortoPunzante({
                message: ALERTA_CHECK_CORTO_PUNZANTE,
                severity: 'success',
                open:'true'
            })
        }
    }

    //Busca denuncias previas con cortopunzante activo para el mismo accidentado.
    const getCortopunzantePrevio = () => {
        let errorCallback = (error) => {
            if(error) {
                setSnackbar({
                    message:'Ocurrió un error al constatar si el paciente tenía cortopunzante anterior.', 
                    vertical:'top',
                    severity:'error', 
                    open: true
                })
            } 
        }
        let req = {
            nroDoc: denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc,
            fechaOcurrencia: denuncia && denuncia.fechaOcurrencia
        }
        dispatch(actions.fetchURLCortoPunzanteActivo(req, errorCallback))
    }

    const handleCloseSwitch = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setClickAlert(false)
        setClickButonAlert(true)
        setAlertCortoPunzante({open: false})
    }

    useEffect(() => {
        if (activarAlarmas.cortoPunzante) {
            setCheckedCortoPunzante(true)
            setActivarAlarmas({ ...activarAlarmas, ['cortoPunzante']: false });
        }
        if (activarAlarmas.diagnosticoMedico) {
            setActivarAlarmas({ ...activarAlarmas, ['diagnosticoMedico']: false });
            window.scroll(0, 1000000)
        }
        if (activarAlarmas.seguimientoMedico) {
            setActivarAlarmas({ ...activarAlarmas, ['seguimientoMedico']: false });
            window.scroll(0, 1000000)
        }
        if(denuncia?.esCortoPunzante) getCortopunzantePrevio()
    }, [])

    const validarNull = (value, setValue, setCodigo) => {
        if (value === null) {
            setValue(null)
            setCodigo(null)
        }
    }

    useEffect(() => {
        validarNull(valueZonaAfectada, setValueZonaAfectada, setCodigoIdZonaAfectada)
        validarNull(valueAccidente, setValueAccidente, setCodigoIdFormaAccidente)
        validarNull(valueNaturaleza, setValueNaturaleza, setCodigoIdNaturalezaSiniestro)
        validarNull(valueAgenteCausante, setValueAgenteCausante, setCodigoIdAgenteCausante)
        validarNull(valueAgenteMaterial, setValueAgenteMaterial, setCodigoIdAgenteMaterial)
        validarNull(valueDiagnosticoCie10, setValueDiagnosticoCie10, setCodigoIdDiagnosticoCie10)
    }, [valueZonaAfectada, valueAccidente, valueNaturaleza, valueAgenteCausante, valueAgenteMaterial, valueDiagnosticoCie10])

    const onClickPresentaCovid = () => {
        let fecha = denuncia ? denuncia.fechaOcurrencia : null
        dispatch(actions.searchPresentaCovid(fecha))
    }

    const [codigoIdZonaAfectada, setCodigoIdZonaAfectada] = useState(null)
    const [codigoIdAgenteCausante, setCodigoIdAgenteCausante] = useState(null)
    const [codigoIdAgenteMaterial, setCodigoIdAgenteMaterial] = useState(null)
    const [codigoIdDiagnosticoCie10, setCodigoIdDiagnosticoCie10] = useState(null)
    const [codigoIdNaturalezaSiniestro, setCodigoIdNaturalezaSiniestro] = useState(null)
    const [codigoIdFormaAccidente, setCodigoIdFormaAccidente] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.formaAccidente !== null ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : dataPresentaCovid && dataPresentaCovid.zonaAfeccion && dataPresentaCovid.formaAccidente.codigo)

    useEffect(() => {
        if(firstRender){
            //ENTRA APENAS CARGA LA PANTALLA:
            setResponsable(denuncia && denuncia.operadorNombreCompleto !== null ? denuncia.operadorNombreCompleto : null)
            setValEstadoMedico(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico !== null ? dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico : denuncia && denuncia.estadoMedicoIdEstadoMedico !== null ? denuncia.estadoMedicoIdEstadoMedico : 1)
            setCheckedART(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.rechazadoPorArt ? dataSiniestroCompleto.datosCompletarGeneral.rechazadoPorArt : denuncia && denuncia.rechazadoPorArt ? denuncia.rechazadoPorArt : false)
            setCheckedDictamen(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.dictamen : denuncia && denuncia.dictamen ? denuncia.dictamen : false)
            setTelegrama(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.telegrama : denuncia && denuncia.recibidoPorTelegrama ? denuncia.recibidoPorTelegrama : false)
            setCheckedCortoPunzante(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante ? dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante : denuncia && denuncia.esCortoPunzante ? denuncia.esCortoPunzante : false)
            setCheckedBajaLaboral(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral ? dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral : denuncia && denuncia.esSinBajaLaboral ? denuncia.esSinBajaLaboral : false);
            setSwitchS(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto && dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto ? dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto : denuncia && denuncia.siniestroMixtoEmail && denuncia.siniestroMixtoEmail.estado ? denuncia.siniestroMixtoEmail.estado : denuncia && denuncia.esCortoPunzantefalse && denuncia.esSinBajaLaboral ? true : false)
            setValPatologia(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idPatologiaTrazadora !== null ? dataSiniestroCompleto.datosCompletarGeneral.idPatologiaTrazadora : denuncia && denuncia.patologiaTrazadoraIdPatologiaTrazadora !== null ? denuncia.patologiaTrazadoraIdPatologiaTrazadora : 0)
            setValRoam(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.nroRoam !== null ? dataSiniestroCompleto.datosCompletarGeneral.nroRoam : denuncia && denuncia.nroRoam !== null ? denuncia.nroRoam : null)
            setCheckedReingreso(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idReingreso : denuncia && denuncia.reingreso ? denuncia.reingreso : false)
            setCheckedIntercurrencia(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia : denuncia && denuncia.idSiniestroIntercurrencia !== null ? true : false)
            setSelectedDateOcurrencia(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia : denuncia && denuncia.fechaOcurrencia !== null ? denuncia.fechaOcurrencia : null)
            setHoraOcurrencia(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia : denuncia ? denuncia.horaOcurrencia : null)
            setSelectedDateBaja(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaBaja !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaBaja : denuncia && denuncia.fechaBaja !== null ? denuncia.fechaBaja : null);
            setFechaRecepcion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion ? dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion : denuncia && denuncia.fechaRecepcion ? denuncia.fechaRecepcion : denuncia && denuncia.fechaCreacion !== null ? denuncia.fechaCreacion : null)
            setValTramitador(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.tramitadorIdPersona : denuncia && denuncia.tramitadorIdPersona !== null ? denuncia.tramitadorIdPersona : null)
            setValAuditor(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.auditorMedicoIdPersona !== null ? dataSiniestroCompleto.datosCompletarGeneral.auditorMedicoIdPersona : denuncia && denuncia.auditorMedicoIdPersona !== null ? denuncia.auditorMedicoIdPersona : null)
            setValEstadoInternacion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.estadoInternacionIdEstadoInternacion !== null ? dataSiniestroCompleto.datosCompletarGeneral.estadoInternacionIdEstadoInternacion : denuncia && denuncia.estadoInternacionIdEstadoInternacion !== null ? denuncia.estadoInternacionIdEstadoInternacion : 1)
            setSelectedDateInternacionD(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionDesde !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionDesde : denuncia && denuncia.fechaInternacionDesde !== null ? denuncia.fechaInternacionDesde : null)
            setSelectedDateInternacionH(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionHasta !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionHasta : denuncia && denuncia.fechaInternacionHasta !== null ? denuncia.fechaInternacionHasta : null)
            setCheckedPrestaciones(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.recibePrestacionesEnDomicilio ? dataSiniestroCompleto.datosCompletarGeneral.recibePrestacionesEnDomicilio : denuncia && denuncia.recibePrestacionesEnDomicilio ? denuncia.recibePrestacionesEnDomicilio : false)
            setSelectedDatePCR(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaPCR !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaPCR : denuncia && denuncia.fechaPCR !== null ? denuncia.fechaPCR : null)
            setValSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro : denuncia && denuncia.tipoSiniestroIdTipoSiniestro !== null ? denuncia.tipoSiniestroIdTipoSiniestro : null)
            setValueDiagnosticoCerteza(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza !== null ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza : denuncia && denuncia.diagnosticoDeCerteza !== null ? denuncia.diagnosticoDeCerteza : null)
            setSeveridadDenuncia(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.severidadDenunciaIdSeveridadDenuncia ? dataSiniestroCompleto.datosCompletarGeneral.severidadDenunciaIdSeveridadDenuncia : denuncia && denuncia.severidadDenunciaIdSeveridadDenuncia !== null && denuncia.severidadDenunciaIdSeveridadDenuncia !== 0 ? denuncia.severidadDenunciaIdSeveridadDenuncia : 0)
            setValMultiline(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.relato !== null ? dataSiniestroCompleto.datosCompletarGeneral.relato : denuncia && denuncia.relato !== null ? denuncia.relato : null)
            setCheckedValidarDiagnOstico(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.validarDiagnostico ? dataSiniestroCompleto.datosCompletarGeneral.validarDiagnostico : denuncia && denuncia.validarDiagnostico ? denuncia.validarDiagnostico : false)
            setValueAsistenciaExterna(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.asistenciaExterna !== null ? dataSiniestroCompleto.datosCompletarGeneral.asistenciaExterna : denuncia && denuncia.asistenciaExterna !== null ? denuncia.asistenciaExterna : null)
            setCheckedInvestigacion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.ameritaInvestigacion && dataSiniestroCompleto.datosCompletarGeneral.ameritaInvestigacion ? dataSiniestroCompleto.datosCompletarGeneral.ameritaInvestigacion : denuncia && denuncia.ameritaInvestigacionEmail && denuncia.ameritaInvestigacionEmail.estado ? denuncia.ameritaInvestigacionEmail.estado : false)
            setValueAccidente(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formAccidenteDescripcion : denuncia && denuncia.formaAccidenteDescripcion !== null ? denuncia.formaAccidenteDescripcion : null)
            setValueZonaAfectada(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion : denuncia ? denuncia.zonaAfectadaDescripcion : null)
            setValueAgenteCausante(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpDescripcion : denuncia && denuncia.agenteCausanteEpDescripcion ? denuncia.agenteCausanteEpDescripcion : null)
            setValueNaturaleza(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion : denuncia && denuncia.naturalezasSiniestroDescripcion ? denuncia.naturalezasSiniestroDescripcion : null)
            setValueAgenteMaterial(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoDescripcion : denuncia ? denuncia.agenteMaterialAsociadoDescripcion : null)
            setValueDiagnosticoCie10(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion : denuncia ? denuncia.diagnosticoCie10Descripcion : null)
            setCodigoIdDiagnosticoCie10(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID : denuncia ? denuncia.diagnosticoCie10Codigo : null)
            setCodigoIdAgenteMaterial(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID : denuncia ? denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado : null)
            setCodigoIdFormaAccidente(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : denuncia ? denuncia.formaAccidenteIdFormaAccidente : null)
            setCodigoIdZonaAfectada(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID : denuncia ? denuncia.zonaAfectadaIdZonaAfectada : null)
            setCodigoIdAgenteCausante(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID : denuncia ? denuncia.agenteCausanteEpIdAgenteCausanteEp : null)
            setCodigoIdNaturalezaSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID : denuncia ? denuncia.naturalezasSiniestroIdNaturalezaSiniestro : null)
            setSelectedHoraExtraccion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante !== null && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaPedido !== null ? dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaPedido : denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaPedido !== null ? denuncia.cortopunzante.horaPedido : new Date())
            setSelectedHoraValidacion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante !== null && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaValidacion !== null ? dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaValidacion : denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaValidacion !== null ? denuncia.cortopunzante.horaValidacion : null)
            setValExtraccionista(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante !== null && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.extraccionistaIdProveedorExtraccionista !== null ? dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.extraccionistaIdProveedorExtraccionista : denuncia && denuncia.cortopunzante && denuncia.cortopunzante.extraccionistaIdProveedorExtraccionista !== null ? denuncia.cortopunzante.extraccionistaIdProveedorExtraccionista : null)
            setSelectedDatePrimeraManifestacion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPrimeraManifestacion : denuncia && denuncia.fechaPrimeraManifestacion !== null ? denuncia.fechaPrimeraManifestacion : denuncia && denuncia.fechaOcurrencia ? denuncia.fechaOcurrencia : null)
            setCheckedSwitchAlert(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoValidado ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoValidado : denuncia && denuncia.diagnosticoValidado ? denuncia.diagnosticoValidado : false)
            setValueDiasPCR((dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diasDesdePCR !== null ? dataSiniestroCompleto.datosCompletarGeneral.diasDesdePCR : denuncia && denuncia.diasDesdePCR ? denuncia.diasDesdePCR : null))
            setMultipleCie10(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.multipleCIE10 : denuncia && denuncia.denunciaCie10 !== null && denuncia.denunciaCie10.length > 0 ? true : false)
            setReingresoIdSiniestro(denuncia && denuncia.siniestroOriginalIdDenuncia ? denuncia.siniestroOriginalIdDenuncia : null)
            setReingresoNroSiniestro(denuncia && denuncia.nroAsignadoOrigen ? denuncia.nroAsignadoOrigen : denuncia && denuncia.nroSiniestroOriginal ? denuncia.nroSiniestroOriginal : null)
            setIntercurrenciaIdSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro : denuncia && denuncia.idSiniestroIntercurrencia ? denuncia.idSiniestroIntercurrencia : null)
            setIntercurrenciaNroSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaNroSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaNroSiniestro : denuncia && denuncia.nroSiniestroIntercurrencia ? denuncia.nroSiniestroIntercurrencia : null)
            setFirstRender(false)
        }else{
            //ENTRA CUANDO SE TRAE NUEVAMENTE LA DENUNCIA EN REINGRESO:
            setDataSiniestroCompleto({
                ...dataSiniestroCompleto,
                datosPersonales:{
                    ...dataSiniestroCompleto.datosPersonales,
                    "apellido": denuncia?.accidentado?.apellido,
                    "nombre": denuncia?.accidentado?.nombre,
                    "sexo": denuncia?.accidentado?.sexo,
                    "fechaNacimiento": denuncia?.accidentado?.fechaNacimiento,
                    "nroDoc": denuncia?.accidentado?.nroDoc,
                    "nroCuil": denuncia?.accidentado?.nroCuil,
                    "estadoCivil": denuncia?.accidentado?.estadoCivilIdEstadoCivil,
                    "estadoCivilDescripcion": denuncia?.accidentado?.estadoCivilDescripcion,
                    "nacionalidad": denuncia?.accidentado?.nacionalidadCodigo,
                    "nacionalidadDescripcion": denuncia?.accidentado?.nacionalidadNombre,   
                }, 
                datosDomicilioCompleto:{
                    ...dataSiniestroCompleto.datosDomicilioCompleto,
                    "numero": denuncia?.accidentado?.numero,
                    "piso": denuncia?.accidentado?.piso,
                    "depto": denuncia?.accidentado?.depto,
                    "aclaraciones": denuncia?.accidentado?.aclaraciones,
                    "calle": denuncia?.accidentado?.calle,
                    "calleId": denuncia?.accidentado?.idCalleIdCalle,
                    "ascensor": denuncia?.accidentado?.ascensor,
                    "localidadNombre": denuncia?.accidentado?.localidadNombre,
                    "localidadIdLocalidad": denuncia?.accidentado?.localidadIdLocalidad,
                    "codigoPostalCodigo": denuncia?.accidentado?.codigoPostalCodigo,
                    "codigoPostalIdCodigoPostal": denuncia?.accidentado?.codigoPostalIdCodigoPostal,
                    "localidadProvinciaIdProvincia": denuncia?.accidentado?.localidadProvinciaIdProvincia,
                    "latitud": denuncia?.accidentado?.latitudMaps && parseFloat(denuncia.accidentado.latitudMaps),
                    "longitud": denuncia.accidentado.longitudMaps && parseFloat(denuncia.accidentado.longitudMaps),
                    "ubicacionRegistrada": denuncia?.accidentado?.ubicacionRegistrada,
                },
                datosContactoCompleto:{
                    ...dataSiniestroCompleto.datosContactoCompleto,
                    "email": denuncia?.accidentado?.email,
                    "telefono": denuncia?.accidentado?.telefono,
                    "telefonoSecundario": denuncia?.accidentado?.telefonoSecundario,
                    "codigoAreaCelular": denuncia?.accidentado?.codigoAreaCelular,
                    "numeroCelular": denuncia?.accidentado?.numeroCelular,
                    "codigoPaisCelular": denuncia?.accidentado?.codigoPaisCelular,
                    "whatsapp": denuncia?.accidentado?.whatsapp,
                },
                datosEmpleadoCompleto:{
                    ...dataSiniestroCompleto.datosEmpleadoCompleto,
                    "fechaIngreso": denuncia?.fechaIngresoLaboral,
                    "horarioLaboral": denuncia?.horarioLaboral,
                    "telefonoLaboral": denuncia?.telefonoLaboral,
                    "idTareaAccidente": denuncia?.tareaDuranteAccidenteIdOcupacion,
                    "tareaAccidente": denuncia?.tareaDuranteAccidenteDescripcion,
                    "ocupacion": denuncia?.ocupacionDescripcion,
                    "idOcupacion": denuncia?.ocupacionIdOcupacion,
                    "idModalidadTrabajo": denuncia?.idModalidadTrabajo,
                    "modalidadTrabajo": denuncia?.descripcionModalidadTrabajo,
                    "franquero": denuncia?.franquero,
                },
                datosSedeLaboralCompleto:{
                    ...dataSiniestroCompleto.datosSedeLaboralCompleto,
                    "tipoSede": {
                        "idTipoSede": denuncia?.tipoSede?.idTipoSede,
                        "tipoSede": denuncia?.tipoSede?.nombre,
                    },
                    "idSede": denuncia?.sede?.idSede,
                    "sede": denuncia?.sede?.nombre,
                    "direccion": denuncia?.sede?.direccion,
                    "nroCalle": denuncia?.sede?.nro,
                    "idLocalidad": denuncia?.sede?.localidadesIdLocalidad,
                    "localidad": denuncia?.sede?.localidadesNombre,
                    "idProvincia": denuncia?.sede?.localidadesProvinciaIdProvincia,
                    "idCodigoPostal": denuncia?.sede?.codigoPostalIdCodigoPostal,
                    "codigoPostal": denuncia?.sede?.codigoPostalCodigo
                },
                datosLugarAccidenteCompleto:{
                    ...dataSiniestroCompleto.datosLugarAccidenteCompleto,
                    "circunstanciaItinereIdCircunstancia": denuncia?.circunstanciaItinereIdCircunstancia,
                    "lugardeAccidente":  denuncia?.lugarAccidenteIdLugarAccidente, 
                    "localidadItinereIdLocalidad": denuncia?.localidadItinereIdLocalidad,
                    "localidadItinereLocalidadDescripcion": denuncia.localidadItinereNombre,
                    "localidadItinereProvinciaIdProvincia": denuncia?.localidadItinereProvinciaIdProvincia, 
                    "calleOcurrenciaItinere": denuncia?.calleOcurrenciaItinere, 
                    "calleId": denuncia?.idCalleOcurrenciaItinere,
                    "numeroOcurrenciaItinere": denuncia?.numeroOcurrenciaItinere,
                    "codigoPostalItinereCodigoPostalDescripcion": denuncia?.codigoPostalItinereCodigo,
                    "codigoPostalItinereIdCodigoPostal": denuncia?.codigoPostalItinereIdCodigoPostal,
                }
            })
            setCheckedReingreso(denuncia.reingreso)
            setSelectedDateOcurrencia(denuncia.fechaOcurrencia)
            setHoraOcurrencia(denuncia.horaOcurrencia)
            setValSiniestro(denuncia.tipoSiniestroIdTipoSiniestro)
            setCodigoIdFormaAccidente(denuncia.formaAccidenteIdFormaAccidente)
            setValueAccidente(denuncia.formaAccidenteDescripcion)
            setCodigoIdZonaAfectada(denuncia.zonaAfectadaIdZonaAfectada)
            setValueZonaAfectada(denuncia.zonaAfectadaDescripcion)
            setCodigoIdNaturalezaSiniestro(denuncia.naturalezasSiniestroIdNaturalezaSiniestro)
            setValueNaturaleza(denuncia.naturalezasSiniestroDescripcion)
            setCodigoIdAgenteCausante(denuncia.agenteCausanteEpIdAgenteCausanteEp)
            setValueAgenteCausante(denuncia.agenteCausanteEpDescripcion)
            setCodigoIdAgenteMaterial(denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado)
            setValueAgenteMaterial(denuncia.agenteMaterialAsociadoDescripcion)
            setCodigoIdDiagnosticoCie10(denuncia.diagnosticoCie10Codigo)
            setValueDiagnosticoCie10(denuncia.diagnosticoCie10Descripcion)
            setValueDiagnosticoCerteza(denuncia.diagnosticoDeCerteza)
            setMultipleCie10(denuncia.denunciaCie10 !== null && denuncia.denunciaCie10.length > 0 ? true : false)
            setSeveridadDenuncia(denuncia.severidadDenunciaIdSeveridadDenuncia)
            setReingresoNroSiniestro(denuncia.nroSiniestroOriginal)
        }
    }, [denuncia])

    useEffect(() => {
        if (dataPresentaCovid !== null) {
            setCodigoIdFormaAccidente(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.formaAccidente !== null ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : dataPresentaCovid && dataPresentaCovid.zonaAfeccion && dataPresentaCovid.formaAccidente.codigo)
            setCodigoIdZonaAfectada(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID !== null ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID : dataPresentaCovid && dataPresentaCovid.zonaAfeccion && dataPresentaCovid.zonaAfeccion.codigo)
            setCodigoIdNaturalezaSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID !== null ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID : dataPresentaCovid && dataPresentaCovid.naturalezaSiniestro && dataPresentaCovid.naturalezaSiniestro.codigo)
            setCodigoIdAgenteCausante(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID !== null ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID : dataPresentaCovid && dataPresentaCovid.agenteCausanteEp && dataPresentaCovid.agenteCausanteEp.codigo)
            setCodigoIdAgenteMaterial(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID !== null ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID : dataPresentaCovid && dataPresentaCovid.agenteMaterialAsociado && dataPresentaCovid.agenteMaterialAsociado.codigo)
            setCodigoIdDiagnosticoCie10(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID !== null ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID : dataPresentaCovid && dataPresentaCovid.diagnosticoCie10 && dataPresentaCovid.diagnosticoCie10.codigo)
            setValSiniestro(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro : dataPresentaCovid && dataPresentaCovid.tipoSiniestro && dataPresentaCovid.tipoSiniestro.codigo)
            setValueAccidente(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.formAccidenteDescripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.formAccidenteDescripcion : dataPresentaCovid && dataPresentaCovid.formaAccidente ? dataPresentaCovid.formaAccidente.descripcion : null)
            setValueZonaAfectada(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion : dataPresentaCovid && dataPresentaCovid.zonaAfeccion ? dataPresentaCovid.zonaAfeccion.descripcion : null)
            setValueNaturaleza(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion : dataPresentaCovid && dataPresentaCovid.naturalezaSiniestro ? dataPresentaCovid.naturalezaSiniestro.descripcion : null)
            setValueAgenteCausante(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpDescripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpDescripcion : dataPresentaCovid && dataPresentaCovid.agenteCausanteEp ? dataPresentaCovid.agenteCausanteEp.descripcion : null)
            setValueAgenteMaterial(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoDescripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoDescripcion : dataPresentaCovid && dataPresentaCovid.agenteMaterialAsociado ? dataPresentaCovid.agenteMaterialAsociado.descripcion : null)
            setValueDiagnosticoCie10(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion : dataPresentaCovid && dataPresentaCovid.diagnosticoCie10 ? `${dataPresentaCovid.diagnosticoCie10.descripcion} - ${dataPresentaCovid.diagnosticoCie10.codigo}` : null)
            setValueDiagnosticoCerteza(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza !== null ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza : dataPresentaCovid ? dataPresentaCovid.diagnosticoDeCerteza : null)
            setSelectedDatePCR(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaPCR !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaPCR : dataPresentaCovid ? new Date(dataPresentaCovid.fechaPCR) : null)
            setValueDiasPCR(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.diasDesdePCR !== null ? dataSiniestroCompleto.datosCompletarGeneral.diasDesdePCR : dataPresentaCovid ? dataPresentaCovid.diasDesdePCR : null)
            setSelectedDatePrimeraManifestacion(dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPrimeraManifestacion : denuncia && denuncia.fechaPrimeraManifestacion !== null ? denuncia.fechaPrimeraManifestacion :
                denuncia && denuncia.fechaOcurrencia ? denuncia.fechaOcurrencia : null)

        }
    }, [dataPresentaCovid])

    const [dataZonaAfectada, setDataZonaAfectada] = useState(null)
    const [dataNaturaleza, setDataNaturaleza] = useState(null)
    const [dataAgenteCausante, setDataAgenteCausante] = useState(null)
    const [dataAgenteMaterial, setDataAgenteMaterial] = useState(null)
    const [dataDiagnosticoCie10, setDataDiagnosticoCie10] = useState(null)
    const [dataFormaAccidente, setDataFormaAccidente] = useState(null)

    const serchIdAutocompletar = (valueCampo, dataCampo, setIdCampo, idCampo, setValueCampo, campoDenuncia, idCampoDenuncia, dataSiniestroCompletoID, dataSiniestroCompletoValue) => {
        if (valueCampo && (dataCampo !== null)) {
            let id = dataCampo && dataCampo.filter(it => it.descripcion === valueCampo)
            setIdCampo(id && id[0] ? id[0].codigo : idCampo)
        } else if (valueCampo) {
            setValueCampo(dataSiniestroCompletoValue ? dataSiniestroCompletoValue : denuncia ? campoDenuncia : null)
            setIdCampo(dataSiniestroCompletoID ? dataSiniestroCompletoID : denuncia ? idCampoDenuncia : null)
        }
    }

    useEffect(() => {
        serchIdAutocompletar(valueZonaAfectada, dataZonaAfectada, setCodigoIdZonaAfectada, codigoIdZonaAfectada, setValueZonaAfectada,
            denuncia ? denuncia.zonaAfectadaDescripcion : null,
            denuncia ? denuncia.zonaAfectadaIdZonaAfectada : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion : null)

        serchIdAutocompletar(valueAccidente, dataFormaAccidente, setCodigoIdFormaAccidente, codigoIdFormaAccidente, setValueAccidente,
            denuncia ? denuncia.formaAccidenteDescripcion : null,
            denuncia ? denuncia.formaAccidenteIdFormaAccidente : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formAccidenteDescripcion : null)

        serchIdAutocompletar(valueNaturaleza, dataNaturaleza, setCodigoIdNaturalezaSiniestro, codigoIdNaturalezaSiniestro, setValueNaturaleza,
            denuncia ? denuncia.naturalezasSiniestroDescripcion : null,
            denuncia ? denuncia.naturalezasSiniestroIdNaturalezaSiniestro : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion : null)

        serchIdAutocompletar(valueAgenteCausante, dataAgenteCausante, setCodigoIdAgenteCausante, codigoIdAgenteCausante, setValueAgenteCausante,
            denuncia ? denuncia.agenteCausanteEpDescripcion : null,
            denuncia ? denuncia.agenteCausanteEpIdAgenteCausanteEp : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpDescripcion : null)

        serchIdAutocompletar(valueAgenteMaterial, dataAgenteMaterial, setCodigoIdAgenteMaterial, codigoIdAgenteMaterial, setValueAgenteMaterial,
            denuncia ? denuncia.agenteMaterialAsociadoDescripcion : null,
            denuncia ? denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoDescripcion : null)

        serchIdAutocompletar(valueDiagnosticoCie10, dataDiagnosticoCie10, setCodigoIdDiagnosticoCie10, codigoIdDiagnosticoCie10, setValueDiagnosticoCie10,
            denuncia ? denuncia.diagnosticoCie10Descripcion : null,
            denuncia ? denuncia.diagnosticoCie10Codigo : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID : null,
            dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion : null)

    }, [valueZonaAfectada, valueAccidente, valueNaturaleza, valueAgenteCausante, valueAgenteMaterial, valueDiagnosticoCie10])

    const [multipleCie10Valido, setMultipleCie10Valido] = useState(true)

    const validacionMultiple = (data) => {
        let request = []
        setMultipleCie10Valido(true)
        if (multipleCie10 && data && data.length === 0) {
            setMultipleCie10Valido(false)
        }
        else {
            data !== undefined && data.length > 0 && data.map((it) => {
                if ((it.codigoCie10 !== null) && (it.zonaAfectada !== null) && (it.naturalezaLesion !== null)) {
                    request = [...request, { ...it, idDenuncia: denuncia.idDenuncia }]
                } else {
                    setMultipleCie10Valido(false)
                }
            })
        }
        return request
    }

    useEffect(() => {
        if (setDatosCompletarGeneral) {
            setDatosCompletarGeneral({
                responsableIngreso: valueResponsable ? valueResponsable : null,
                estadoMedicoIdEstadoMedico: valEstadoMedico ? valEstadoMedico : null,
                formaAccidente: valueAccidente ? codigoIdFormaAccidente : null,
                formAccidenteDescripcion: valueAccidente ? valueAccidente : null,
                dictamen: checkedDictamen ? checkedDictamen : false,
                telegrama: telegrama,
                rechazadoPorArt: checkedART ? checkedART : false,
                esSinBajaLaboral: checkedBajaLaboral ? checkedBajaLaboral : false,
                idPatologiaTrazadora: valPatologia,
                nroRoam: valueRoam ? valueRoam : null,
                idReingreso: checkedReingreso ? checkedReingreso : false,
                idIntercurrencia: checkedIntercurrencia ? checkedIntercurrencia : false,
                fechaOcurrencia: selectedDateOcurrencia ? (Utils.dateFormat2(selectedDateOcurrencia) === 'Invalid date' ?
                    selectedDateOcurrencia : Utils.dateFormat2(selectedDateOcurrencia)) : null,
                horaOcurrencia: horaOcurrencia ? horaOcurrencia : null,
                fechaBaja: selectedDateBaja ? (Utils.dateFormat2(selectedDateBaja) === 'Invalid date' ?
                    selectedDateBaja : Utils.dateFormat2(selectedDateBaja)) : null,
                fechaRecepcion: fechaRecepcion ? (Utils.dateFormat2(fechaRecepcion) === 'Invalid date' ?
                    fechaRecepcion : Utils.dateFormat2(fechaRecepcion)) : null,
                fechaInternacionDesde: selectedDateInternacionD ? (Utils.dateFormat2(selectedDateInternacionD) === 'Invalid date' ?
                    selectedDateInternacionD : Utils.dateFormat2(selectedDateInternacionD)) : null,
                fechaInternacionHasta: selectedDateInternacionH ? (Utils.dateFormat2(selectedDateInternacionH) === 'Invalid date' ?
                    selectedDateInternacionH : Utils.dateFormat2(selectedDateInternacionH)) : null,
                fechaPCR: selectedDatePCR ? (Utils.dateFormat2(selectedDatePCR) === 'Invalid date' ?
                    selectedDatePCR : Utils.dateFormat2(selectedDatePCR)) : null,
                tramitadorIdPersona: valTramitador ? valTramitador : null,
                auditorMedicoIdPersona: valAuditor ? valAuditor : null,
                recibePrestacionesEnDomicilio: checkedPrestaciones ? checkedPrestaciones : false,
                tipoSiniestroIdTipoSiniestro: valSiniestro ? valSiniestro : null,
                //AGREGO DIAS DE PCR Y FECHA DE PRIMERA MANIFESTACION
                diasDesdePCR: valueDiasPCR ? valueDiasPCR : null,
                zonaAfectadaID: valueZonaAfectada ? codigoIdZonaAfectada : null,
                zonaAfectadaDescripcion: valueZonaAfectada ? valueZonaAfectada : null,
                naturalezasSiniestroID: valueNaturaleza ? codigoIdNaturalezaSiniestro : null,
                naturalezasSiniestroDescripcion: valueNaturaleza ? valueNaturaleza : null,
                agenteCausanteEpID: valueAgenteCausante ? codigoIdAgenteCausante : null,
                agenteCausanteEpDescripcion: valueAgenteCausante ? valueAgenteCausante : null,
                agenteMaterialAsociadoID: valueAgenteMaterial ? codigoIdAgenteMaterial : null,
                agenteMaterialAsociadoDescripcion: valueAgenteMaterial ? valueAgenteMaterial : null,
                diagnosticoCie10ID: valueDiagnosticoCie10 ? codigoIdDiagnosticoCie10 : null,
                diagnosticoCie10Descripcion: valueDiagnosticoCie10 ? valueDiagnosticoCie10 : null,
                diagnosticoDeCerteza: valueDiagnosticoCerteza ? valueDiagnosticoCerteza : null,
                severidadDenunciaIdSeveridadDenuncia: valSeveridadDenuncia ? valSeveridadDenuncia : null,
                relato: valMultiline ? valMultiline : null,
                siniestroMixto: switchS,
                validarDiagnostico: checkedValidarDiagnOstico ? checkedValidarDiagnOstico : false,
                asistenciaExterna: valueAsistenciaExterna ? valueAsistenciaExterna : null,
                ameritaInvestigacion: checkedInvestigacion ? checkedInvestigacion : false,
                esCortoPunzante: checkedCortoPunzante ? checkedCortoPunzante : false,
                cortoPunzante: !checkedCortoPunzante ? null : {
                    horaPedido: selectedHoraExtraccion ? Utils.time24h(selectedHoraExtraccion) === 'Invalid date' ? selectedHoraExtraccion : Utils.time24h(selectedHoraExtraccion) : null,
                    horaValidacion: selectedHoraValidacion ? selectedHoraValidacion : null,
                    extraccionistaIdProveedorExtraccionista: valExtraccionista ? valExtraccionista : null
                },
                mailCortopunzanteEnviado: mailCortopunzanteEnviado,
                estadoInternacionIdEstadoInternacion: valEstadoInternacion ? valEstadoInternacion : null,
                fechaPrimeraManifestacion: valSiniestro === 6 && selectedDatePrimeraManifestacion ? selectedDatePrimeraManifestacion : null,
                diagnosticoValidado: checkedSwitchAlert ? checkedSwitchAlert : false,
                multipleCIE10: multipleCie10,
                diagnosticoCie10ID_2: datosMultipleCIE10 ? datosMultipleCIE10.diagnosticoCIE10_2_id : null,
                diagnosticoCie10Descripcion_2: datosMultipleCIE10 ? datosMultipleCIE10.diagnosticoCIE10_2 : null,
                naturalezasSiniestroID_2: datosMultipleCIE10 ? datosMultipleCIE10.naturaleza_2_id : null,
                naturalezasSiniestroDescripcion_2: datosMultipleCIE10 ? datosMultipleCIE10.naturaleza_2 : null,
                zonaAfectadaID_2: datosMultipleCIE10 ? datosMultipleCIE10.zonaAfectada_2_id : null,
                zonaAfectadaDescripcion_2: datosMultipleCIE10 ? datosMultipleCIE10.zonaAfectada_2 : null,
                diagnosticoCie10ID_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.diagnosticoCIE10_2_id ? datosMultipleCIE10_2.diagnosticoCIE10_2_id : null,
                diagnosticoCie10Descripcion_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.diagnosticoCIE10_2 ? datosMultipleCIE10_2.diagnosticoCIE10_2 : null,
                naturalezasSiniestroID_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.naturaleza_2_id ? datosMultipleCIE10_2.naturaleza_2_id : null,
                naturalezasSiniestroDescripcion_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.naturaleza_2 ? datosMultipleCIE10_2.naturaleza_2 : null,
                zonaAfectadaID_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.zonaAfectada_2_id ? datosMultipleCIE10_2.zonaAfectada_2_id : null,
                zonaAfectadaDescripcion_3: datosMultipleCIE10_2 && datosMultipleCIE10_2.zonaAfectada_2 ? datosMultipleCIE10_2.zonaAfectada_2 : null,
                denunciaMultiple10: validacionMultiple(datosArrayMultiple10).length === 0 ? null : validacionMultiple(datosArrayMultiple10),
                intercurrenciaIdSiniestro: intercurrenciaIdSiniestro ? intercurrenciaIdSiniestro : null,
                intercurrenciaNroSiniestro: intercurrenciaNroSiniestro ? intercurrenciaNroSiniestro : null,
                reingresoIdSiniestro: reingresoIdSiniestro ? reingresoIdSiniestro : null,
                reingresoNroSiniestro: reingresoNroSiniestro ? reingresoNroSiniestro : null,
                multipleCie10Valido: multipleCie10Valido
            })
        }
    }, [valEstadoMedico, checkedDictamen, telegrama, checkedART, checkedBajaLaboral, valueRoam, 
        checkedReingreso, selectedDateOcurrencia, valueAccidente, horaOcurrencia, selectedDateBaja, 
        fechaRecepcion, selectedDateInternacionD, selectedDateInternacionH, selectedDatePCR, valAuditor, 
        checkedPrestaciones, valSiniestro, valueDiasPCR, valueZonaAfectada, valueNaturaleza, 
        valueAgenteCausante, valueAgenteMaterial, valueDiagnosticoCie10, valueDiagnosticoCerteza, 
        valSeveridadDenuncia, valMultiline, checkedValidarDiagnOstico, valueAsistenciaExterna, 
        checkedInvestigacion, switchS, valEstadoInternacion, checkedCortoPunzante, valExtraccionista, 
        valPatologia, valueResponsable, selectedHoraValidacion, selectedDatePrimeraManifestacion, 
        checkedSwitchAlert, codigoIdAgenteCausante, codigoIdNaturalezaSiniestro, codigoIdZonaAfectada,
        codigoIdAgenteMaterial, codigoIdDiagnosticoCie10, codigoIdFormaAccidente, selectedHoraExtraccion, 
        valTramitador, multipleCie10, datosMultipleCIE10, datosMultipleCIE10_2, checkedIntercurrencia, 
        intercurrenciaIdSiniestro, intercurrenciaNroSiniestro, reingresoIdSiniestro, reingresoNroSiniestro, 
        datosArrayMultiple10, multipleCie10Valido, mailCortopunzanteEnviado])

    return (
        <CompletarForm
            disableEdition={disableEdition}
            usuarioActivo={usuarioActivo} valueResponsable={valueResponsable} 
            denuncia={denuncia} campos={campos}
            snackbar={snackbar} setSnackbar={setSnackbar}
            dataSiniestroCompleto={dataSiniestroCompleto} setDataSiniestroCompleto={setDataSiniestroCompleto}
            //Constantes:
            fechaAlta={denuncia && denuncia.fechaAlta ? denuncia.fechaAlta : null}
            //Estados:
            valEstadoMedico={valEstadoMedico} handleChangeValEstadoMedico={e => setValEstadoMedico(e.target.value)} 
            checkedART={checkedART} handleCheckedART={e => setCheckedART(e.target.checked)}
            checkedDictamen={checkedDictamen} handleCheckedDictamen={e => setCheckedDictamen(e.target.checked)} 
            telegrama={telegrama} handleCheckedTelegrama={e => setTelegrama(e.target.checked)} 
            checkedCortoPunzante={checkedCortoPunzante} handleCheckedCortoPunzante={handleCheckedCortoPunzante} 
            checkedBajaLaboral={checkedBajaLaboral} handleCheckedBajaLaboral={handleCheckedBajaLaboral} 
            valPatologia={valPatologia} handleChangeSelectPatologia={e => setValPatologia(e.target.value)}
            switchS={switchS} handleChangeSwitch={handleChangeSwitch} estadoDisabledSwitchS={estadoDisabledSwitchS}
            valExtraccionista={valExtraccionista} handleChangeSelectExtraccionista={handleChangeSelectExtraccionista}
            selectedHoraExtraccion={selectedHoraExtraccion} handleHoraExtraccion={handleHoraExtraccion} 
            selectedHoraValidacion={selectedHoraValidacion} handleHoraValidacion={handleHoraValidacion}
            valueRoam={valueRoam} onChangeRoam={e => setValRoam(e.target.value)} 
            valTramitador={valTramitador} handleChangeSelectTramitador={e => setValTramitador(e.target.value)}
            horaOcurrencia={horaOcurrencia} onChangeHora={e => setHoraOcurrencia(e.target.value)} 
            checkedPrestaciones={checkedPrestaciones} handleCheckedPrestaciones={e => setCheckedPrestaciones(e.target.checked)} 
            valueDiasPCR={valueDiasPCR} onChangeDiasPCR={e => setValueDiasPCR(e.target.value)} 
            valSiniestro={valSiniestro} handleChangeSelectSiniestro={e => setValSiniestro(e.target.value)}
            valEstadoInternacion={valEstadoInternacion} handleChangeSelectEstadoInternacion={e => setValEstadoInternacion(e.target.value)}
            valueDiagnosticoCerteza={valueDiagnosticoCerteza} onChangeDiagnosticoCerteza={e => setValueDiagnosticoCerteza(e.target.value)}
            valSeveridadDenuncia={valSeveridadDenuncia} handleChangeSeveridadDenuncia={e => setSeveridadDenuncia(e.target.value)}
            valMultiline={valMultiline} changeMultiline={e => setValMultiline(e.target.value)} 
            multipleCie10={multipleCie10} handleCheckedMultipleCie10={()=>setMultipleCie10(!multipleCie10)}
            valueAsistenciaExterna={valueAsistenciaExterna} onChangeAsistenciaExterna={e => setValueAsistenciaExterna(e.target.value)}
            checkedReingreso={checkedReingreso} handleCheckedReingreso={handleCheckedReingreso} 
            checkedIntercurrencia={checkedIntercurrencia} handleIntercurrencia={handleIntercurrencia}
            reingresoIdSiniestro={reingresoIdSiniestro} setReingresoIdSiniestro={setReingresoIdSiniestro}
            reingresoNroSiniestro={reingresoNroSiniestro} setReingresoNroSiniestro={setReingresoNroSiniestro}
            intercurrenciaIdSiniestro={intercurrenciaIdSiniestro} setIntercurrenciaIdSiniestro={setIntercurrenciaIdSiniestro}
            intercurrenciaNroSiniestro={intercurrenciaNroSiniestro} setIntercurrenciaNroSiniestro={setIntercurrenciaNroSiniestro}
            selectedDateOcurrencia={selectedDateOcurrencia} setSelectedDateOcurrencia={setSelectedDateOcurrencia}
            selectedDateBaja={selectedDateBaja} setSelectedDateBaja={setSelectedDateBaja} 
            fechaRecepcion={fechaRecepcion} setFechaRecepcion={setFechaRecepcion}
            valAuditor={valAuditor} setValAuditor={setValAuditor} 
            selectedDateInternacionD={selectedDateInternacionD} setSelectedDateInternacionD={setSelectedDateInternacionD}
            selectedDateInternacionH={selectedDateInternacionH} setSelectedDateInternacionH={setSelectedDateInternacionH} 
            selectedDatePCR={selectedDatePCR} setSelectedDatePCR={setSelectedDatePCR}
            selectedDatePrimeraManifestacion={selectedDatePrimeraManifestacion} setSelectedDatePrimeraManifestacion={setSelectedDatePrimeraManifestacion}
            datosArrayMultiple10={datosArrayMultiple10} setDatosArrayMultiple10={setDatosArrayMultiple10}
            datosMultipleCIE10={datosMultipleCIE10} setDatosMultipleCIE10={setDatosMultipleCIE10}
            datosMultipleCIE10_2={datosMultipleCIE10_2} setDatosMultipleCIE10_2={setDatosMultipleCIE10_2}
            //Autosuggests:
            valueAccidente={valueAccidente} setValueAccidente={setValueAccidente} setDataFormaAccidente={setDataFormaAccidente} 
            valueZonaAfectada={valueZonaAfectada} setValueZonaAfectada={setValueZonaAfectada} setDataZonaAfectada={setDataZonaAfectada}
            valueNaturaleza={valueNaturaleza} setValueNaturaleza={setValueNaturaleza} setDataNaturaleza={setDataNaturaleza}
            valueAgenteCausante={valueAgenteCausante} setValueAgenteCausante={setValueAgenteCausante} setDataAgenteCausante={setDataAgenteCausante} 
            valueAgenteMaterial={valueAgenteMaterial} setValueAgenteMaterial={setValueAgenteMaterial} setDataAgenteMaterial={setDataAgenteMaterial} 
            valueDiagnosticoCie10={valueDiagnosticoCie10} setValueDiagnosticoCie10={setValueDiagnosticoCie10} setDataDiagnosticoCie10={setDataDiagnosticoCie10}
            mailCortopunzanteEnviado={mailCortopunzanteEnviado} setMailCortopunzanteEnviado={setMailCortopunzanteEnviado}
            alertCortopunzante={alertCortopunzante} setAlertCortoPunzante={setAlertCortoPunzante}
            //Otros:
            fechaMail={fechaMail} 
            clickAlert={clickAlert} clickButonAlert={clickButonAlert} handleCloseSwitch={handleCloseSwitch}
            onClickPresentaCovid={onClickPresentaCovid}
            diagnostico={diagnostico} 
            naturaleza={naturaleza} 
            zona={zona}
            recordatorio={recordatorio}
            fechaMailInvestigacion={fechaMailInvestigacion}             
            checkedValidarDiagnOstico={checkedValidarDiagnOstico} handleCheckedValidarDiagnOstico={handleCheckedValidarDiagnOstico}
            alertValidarDiagnostico={alertValidarDiagnostico} handleChangeSwitchAlert={handleChangeSwitchAlert}
            checkedSwitchAlert={checkedSwitchAlert} handleCloseValidarDiagnostico={handleCloseValidarDiagnostico}
            checkedInvestigacion={checkedInvestigacion} handleChangeInvestigacion={handleChangeInvestigacion} 
            clickInvestigacion={clickInvestigacion} handleClickInvestigacion={handleClickInvestigacion}
            checkedInvestigacionAlert={checkedInvestigacionAlert} handleCloseInvestigacionAlert={handleCloseInvestigacionAlert}
        />
    )
}

export default Completar