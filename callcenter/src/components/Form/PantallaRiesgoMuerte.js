import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Utils:
import Utils from '../../Utils/utils'
import { ERROR_BUSCADOR } from '../../Utils/const'
//Router:
import { useHistory } from 'react-router'
//material-ui
import { Grid, Paper, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
//Componentes
import CustomButton from '../commons/Button/CustomButton'
import Cabecera from './Cabecera/cabecera'
import Buscador from '../commons/Buscador/buscador'
import CustomAlert from '../commons/CustomAlert/customAlert'
import CustomTypography from '../commons/Typography/CustomTypography'
import DatosEscenciales from './Secciones/DatosEscenciales/datosEscenciales'
import Ambulancias from './Secciones/Ambulancias/ambulancias'
import CustomLoading from '../commons/Loading/CustomLoading'
import CompletarLugarAccidente from '../DenunciaCompleta/SolapaLugarDelAccidente/completarLugarAccidente'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import ModalCamposFaltantes from './ModalCamposFaltantes/ModalCamposFaltantes'
import HistoricoSiniestros from './Secciones/DatosDelPaciente/HistoricoDrawer/HistoricoSiniestros'

const useStyles = makeStyles({
    contenedor: {
        backgroundColor: 'white',
        borderBottom: 'solid 1px #dadce0',
        padding: '0vh 18vh',
    }
})

const PantallaRiesgoMuerte = (props) => {
    const { setFormRiesgoMuerte, form, idDenunciaForm, usuario, vip, 
        denuncia2, checkUrgencia, setCheckUrgencia, setOpenBuscador, dataBuscadorReingreso } = props

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    //Cabecera
    const dataDenuncia = useSelector(state => state.documentos.denuncia)
    const [textRelato, setTextRelato] = useState('')
    const [valSiniestro, setValSiniestro] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [hora, setHora] = useState(selectedDate && selectedDate.toString().substring(16, 21))
    const [valueEmpleador, setValueEmpleador] = useState(null);
    const [checkedReingreso, setCheckedReingreso] = useState(false)
    //Datos completos para guarda la nueva denuncia
    const [datosEscencialesCompleto, setDatosEscencialesCompleto] = useState(null)
    const [datosLugarAccidenteCompleto, setDatosLugarAccidenteCompleto] = useState(null)
    const [openHistorico, setOpenHistorico ] = useState(false)
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(denuncia2 ? denuncia2.siniestroMultiple : false)
    const [checkedIntercurrencia, setCheckedIntercurrencia] = useState(false)
    //Guardar Denuncia:
    const [camposFaltantes, setCamposFaltantes] = useState([])
    const [openModal, setOpenModal] = useState({ open: false, tipo: '', data: [] })
    const [idAccidentado, setIdAccidentado] = useState(null)
    const loadingUpdate = useSelector(state => state.documentos.loadingUpdate)
    const loadingCamposRequeridos = useSelector(state => state.documentos.loadingCamposRequeridos)
    //Buscar Accidentado x Documento:
    const [dataBuscador, setDataBuscador] = useState({ tipoDoc: 1, nroDoc: null })
    const [openAlertNoDocumento, setOpenAlertNoDocumento] = useState(false)
    const loadingNuevaDenuncia = useSelector(state => state.documentos.loadingNuevaDenuncia)
    const [denuncia, setDenuncia] = useState(null)
    const [cleanDatosAccidentado, setCleanDatosAccidentado] = useState(false)
    //SnackBar:
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })

    useEffect(() => {
        setDatosEscencialesCompleto(null)
        setDatosLugarAccidenteCompleto(null)
    }, [])

    //Buscar Accidentado x Documento:
    const handleBuscadorAccidentado = (tipoDoc, nroDoc) => {
        setDataBuscador(dataBuscador => ({ ...dataBuscador, tipoDoc: tipoDoc, nroDoc: nroDoc }))
        if (nroDoc) {
            setDenuncia(null)
            setCleanDatosAccidentado(false)
            dispatch(actions.searchAccidentado(tipoDoc, nroDoc, form.empleadorIdEmpleador, callBackBuscadorAcidentado))
        }
    }

    //Callback Buscar Accidentado x Documento:
    const callBackBuscadorAcidentado = (data) => {
        if (data) {
            setIdAccidentado(data.accidentado && data.accidentado.idAccidentado);
            setDenuncia(data)
            setOpenHistorico(true)
            setOpenAlertNoDocumento(false)
        } else {
            setCleanDatosAccidentado(true)
            setOpenAlertNoDocumento(true)
            setOpenHistorico(false)
        }
    }

    //Handle Guardar:
    const handleGuardar = () => {
        let request = {
            "estadoCEM": 2,
            "riesgoMuerteIdRiesgoMuerte": true,
            "empleadorEsVIP": vip && vip,
            "accidentado": {
                "idAccidentado": idAccidentado !== null ? idAccidentado : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                "apellido": datosEscencialesCompleto ? datosEscencialesCompleto.apellido : null,
                "nombre": datosEscencialesCompleto ? datosEscencialesCompleto.nombre : null,
                "email": denuncia && denuncia.accidentado ? denuncia.accidentado.email : null,
                "sexo": denuncia && denuncia.accidentado ? denuncia.accidentado.sexo : null,
                "fechaNacimiento": denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento : null,
                "nroDoc": datosEscencialesCompleto ? datosEscencialesCompleto.nroDoc : null,
                "nroCuil": denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil : null,
                "numero": denuncia && denuncia.accidentado ? denuncia.accidentado.numero : null,
                "piso": denuncia && denuncia.accidentado ? denuncia.accidentado.piso : null,
                "telefono": datosEscencialesCompleto ? datosEscencialesCompleto.telefono : null,
                "telefonoSecundario": denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario : null,
                "codigoAreaCelular": datosEscencialesCompleto ? datosEscencialesCompleto.codigoAreaCelular : null,
                "numeroCelular": datosEscencialesCompleto ? datosEscencialesCompleto.numeroCelular : null,
                "codigoPaisCelular": datosEscencialesCompleto && datosEscencialesCompleto.codigoPaisCelular !== '' ? datosEscencialesCompleto.codigoPaisCelular : '+54',
                "depto": denuncia && denuncia.accidentado ? denuncia.accidentado.depto : null,
                "aclaraciones": denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones : null,
                "calle": denuncia && denuncia.accidentado ? denuncia.accidentado.calle : null,
                "idCalleIdCalle": denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle : null,
                "ascensor": denuncia && denuncia.accidentado ? denuncia.accidentado.ascensor : null,
                "whatsapp": datosEscencialesCompleto ? datosEscencialesCompleto.whatsapp : false,
                "estadoCivilIdEstadoCivil": denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil : null,
                "tipoDocumentoIdTipoDocumento": 1,
                "localidadIdLocalidad": denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad : null,
                "localidadProvinciaIdProvincia": denuncia && denuncia.accidentado ? denuncia.accidentado.localidadProvinciaIdProvincia : null,
                "nacionalidadCodigo": denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo : null,
                "codigoPostalIdCodigoPostal": denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal : null,
            },
            "proveedorCentroPrimerAsistencia": null,
            "fechaOcurrencia": selectedDate ? Utils.dateFormat2(selectedDate) : form ? form.fechaOcurrencia : null,
            "horaOcurrencia": hora ? hora : form ? form.horaOcurrencia : null,
            "relato": textRelato ? textRelato : form ? form.relato : null,
            "diagnosticoCie10Codigo": denuncia2 && denuncia2.diagnosticoCie10Codigo !== null ? denuncia2.diagnosticoCie10Codigo : null,
            "estadoMedicoIdEstadoMedico": denuncia2 ? denuncia2.estadoMedicoIdEstadoMedico : null,
            "tipoSiniestroIdTipoSiniestro": denuncia2 && denuncia2.tipoSiniestroIdTipoSiniestro !== null ? denuncia2.tipoSiniestroIdTipoSiniestro : valSiniestro ? valSiniestro : form ? form.tipoSiniestroIdTipoSiniestro : null,
            "diagnosticoDeCerteza": denuncia2 && denuncia2.diagnosticoDeCerteza !== null ? denuncia2.diagnosticoDeCerteza : null,
            "reingreso": form ? form.reingreso : false,
            "sede": null,
            "cortopunzante": null,
            "tipoSede": dataDenuncia && dataDenuncia.tipoSede && dataDenuncia.tipoSede.idTipoSede !== null ? dataDenuncia.tipoSede : null,
            "denuncianteAutorizado": null,
            "proveedorCentroSugerido": null,
            "fechaIngresoLaboral": null,
            "horarioLaboral": null,
            "telefonoLaboral": null,
            "fechaPCR": null,
            "nroRoam": null,
            "fechaBaja": null,
            "responsableIngreso": null,
            "asistenciaExterna": null,
            "empleadorIdEmpleador": form ? form.empleadorIdEmpleador : null,
            "tareaDuranteAccidenteIdOcupacion": null,
            //numero
            "ocupacionIdOcupacion": null,
            "patologiaTrazadoraIdPatologiaTrazadora": null,
            "formaAccidenteIdFormaAccidente": denuncia2 && denuncia2.formaAccidenteIdFormaAccidente ? denuncia2.formaAccidenteIdFormaAccidente : null,
            "zonaAfectadaIdZonaAfectada": denuncia2 && denuncia2.zonaAfectadaIdZonaAfectada !== null ? denuncia2.zonaAfectadaIdZonaAfectada : null,
            "naturalezasSiniestroIdNaturalezaSiniestro": denuncia2 && denuncia2.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia2.naturalezasSiniestroIdNaturalezaSiniestro : null,
            "agenteCausanteEpIdAgenteCausanteEp": denuncia2 && denuncia2.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia2.agenteCausanteEpIdAgenteCausanteEp : null,
            "agenteMaterialAsociadoIdAgenteMaterialAsociado": denuncia2 && denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
            "severidadDenunciaDescripcion": null,
            "rechazadoPorArt": false,
            "ameritaInvestigacion": false,
            "siniestroMixto": false,
            "recibePrestacionesEnDomicilio": false,
            "esCortoPunzante": false,
            "esSinBajaLaboral": false,
            "validarDiagnostico": false,
            "suspendido": false,
            "franquero": false,
            "esVerificadoSupervisor": false,
            "diagnosticoValidado": false,
            "preDenunciaIdPreDenuncia": null,
            "fechaInternacionDesde": null,
            "fechaInternacionHasta": null,
            "circunstanciaItinereIdCircunstancia": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.circunstanciaItinereIdCircunstancia : null,
            "lugarAccidenteIdLugarAccidente": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.lugardeAccidente : null,
            "localidadItinereIdLocalidad": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereIdLocalidad : null,
            "localidadItinereProvinciaIdProvincia": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereProvinciaIdProvincia : null,
            "calleOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleOcurrenciaItinere : null,
            "idCalleOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleId : null,
            "numeroOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.numeroOcurrenciaItinere : null,
            "codigoPostalItinereIdCodigoPostal": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.codigoPostalItinereIdCodigoPostal : null,
            "auditorMedicoIdPersona": null,
            "dictamen": false,
            "severidadDenunciaIdSeveridadDenuncia": null,
            "estadoInternacionIdEstadoInternacion": null,
            "fechaPrimeraManifestacion": null,
            "siniestroOriginalIdDenuncia": denuncia2 && denuncia2.siniestroOriginalIdDenuncia ? denuncia2.siniestroOriginalIdDenuncia : null,
            "idSiniestroIntercurrencia": denuncia2 && denuncia2.idSiniestroIntercurrencia ? denuncia2.idSiniestroIntercurrencia : null,
            "siniestroMultiple": checkedSiniestroMultiple,
            "nroAsignadoOrigen": denuncia2 ? denuncia2.nroAsignadoOrigen : null
        }
        dispatch(actions.camposRequeridosDenuncia(request, callBackCamposRequeridos))
    }

    //CallBack Guardar:
    const callBackCamposRequeridos = (success, data) => {
        if (success) {
            let camposFaltantes = data && data.camposFaltantes;
            if (camposFaltantes && camposFaltantes.length === 0) {
                updateDenuncia()
            } else {
                setCamposFaltantes(camposFaltantes)
                setOpenModal({ ...openModal, open: true, data: data && data })
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'error al corroborar campos requeridos'
            })
        }
    }

    //Handle Cancelar:
    const handleCancelar = () => {
        setFormRiesgoMuerte(false)
        setDatosEscencialesCompleto(null)
        setDatosLugarAccidenteCompleto(null)
    }

    //Update Denuncia:
    const updateDenuncia = () => {
        let request = {
            "idDenuncia": idDenunciaForm,
            "idOperador": usuario.id,
            "denuncia": {
                "estadoCEM": 2,
                "riesgoMuerteIdRiesgoMuerte": true,
                "esDenuncianteNoAutorizado": checkUrgencia,
                "empleadorEsVIP": vip && vip,
                "accidentado": {
                    "idAccidentado": idAccidentado !== null ? idAccidentado : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                    "apellido": datosEscencialesCompleto ? datosEscencialesCompleto.apellido : null,
                    "nombre": datosEscencialesCompleto ? datosEscencialesCompleto.nombre : null,
                    "email": denuncia && denuncia.accidentado ? denuncia.accidentado.email : null,
                    "sexo": denuncia && denuncia.accidentado ? denuncia.accidentado.sexo : null,
                    "fechaNacimiento": denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento : null,
                    "nroDoc": datosEscencialesCompleto ? datosEscencialesCompleto.nroDoc : null,
                    "nroCuil": denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil : null,
                    "numero": denuncia && denuncia.accidentado ? denuncia.accidentado.numero : null,
                    "piso": denuncia && denuncia.accidentado ? denuncia.accidentado.piso : null,
                    "telefono": datosEscencialesCompleto ? datosEscencialesCompleto.telefono : null,
                    "telefonoSecundario": denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario : null,
                    "codigoAreaCelular": datosEscencialesCompleto ? datosEscencialesCompleto.codigoAreaCelular : null,
                    "numeroCelular": datosEscencialesCompleto ? datosEscencialesCompleto.numeroCelular : null,
                    "codigoPaisCelular": datosEscencialesCompleto && datosEscencialesCompleto.codigoPaisCelular !== '' ? datosEscencialesCompleto.codigoPaisCelular : '+54',
                    "depto": denuncia && denuncia.accidentado ? denuncia.accidentado.depto : null,
                    "aclaraciones": denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones : null,
                    "calle": denuncia && denuncia.accidentado ? denuncia.accidentado.calle : null,
                    "idCalleIdCalle": denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle : null,
                    "ascensor": denuncia && denuncia.accidentado ? denuncia.accidentado.ascensor : null,
                    "whatsapp": datosEscencialesCompleto ? datosEscencialesCompleto.whatsapp : false,
                    "estadoCivilIdEstadoCivil": denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil : null,
                    "tipoDocumentoIdTipoDocumento": 1,
                    "localidadIdLocalidad": denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad : null,
                    "localidadProvinciaIdProvincia": denuncia && denuncia.accidentado ? denuncia.accidentado.localidadProvinciaIdProvincia : null,
                    "nacionalidadCodigo": denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo : null,
                    "codigoPostalIdCodigoPostal": denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal : null,
                },
                "proveedorCentroPrimerAsistencia": null,
                "fechaOcurrencia": selectedDate ? Utils.dateFormat2(selectedDate) : form ? form.fechaOcurrencia : null,
                "horaOcurrencia": hora ? hora : form ? form.horaOcurrencia : null,
                "relato": textRelato ? textRelato : form ? form.relato : null,
                "diagnosticoCie10Codigo": denuncia2 && denuncia2.diagnosticoCie10Codigo !== null ? denuncia2.diagnosticoCie10Codigo : null,
                "estadoMedicoIdEstadoMedico": denuncia2 ? denuncia2.estadoMedicoIdEstadoMedico : null,
                "tipoSiniestroIdTipoSiniestro": denuncia2 && denuncia2.tipoSiniestroIdTipoSiniestro !== null ? denuncia2.tipoSiniestroIdTipoSiniestro : valSiniestro ? valSiniestro : form ? form.tipoSiniestroIdTipoSiniestro : null,
                "diagnosticoDeCerteza": denuncia2 && denuncia2.diagnosticoDeCerteza !== null ? denuncia2.diagnosticoDeCerteza : null,
                "reingreso": form ? form.reingreso : false,
                "sede": null,
                "cortopunzante": null,
                "tipoSede": dataDenuncia && dataDenuncia.tipoSede && dataDenuncia.tipoSede.idTipoSede !== null ? dataDenuncia.tipoSede : null,
                "denuncianteAutorizado": null,
                "proveedorCentroSugerido": null,
                "fechaIngresoLaboral": null,
                "horarioLaboral": null,
                "telefonoLaboral": null,
                "fechaPCR": null,
                "nroRoam": null,
                "fechaBaja": null,
                "responsableIngreso": null,
                "asistenciaExterna": null,
                "empleadorIdEmpleador": form ? form.empleadorIdEmpleador : null,
                "tareaDuranteAccidenteIdOcupacion": null,
                //numero
                "ocupacionIdOcupacion": null,
                "patologiaTrazadoraIdPatologiaTrazadora": null,
                "formaAccidenteIdFormaAccidente": denuncia2 && denuncia2.formaAccidenteIdFormaAccidente ? denuncia2.formaAccidenteIdFormaAccidente : null,
                "zonaAfectadaIdZonaAfectada": denuncia2 && denuncia2.zonaAfectadaIdZonaAfectada !== null ? denuncia2.zonaAfectadaIdZonaAfectada : null,
                "naturalezasSiniestroIdNaturalezaSiniestro": denuncia2 && denuncia2.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia2.naturalezasSiniestroIdNaturalezaSiniestro : null,
                "agenteCausanteEpIdAgenteCausanteEp": denuncia2 && denuncia2.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia2.agenteCausanteEpIdAgenteCausanteEp : null,
                "agenteMaterialAsociadoIdAgenteMaterialAsociado": denuncia2 && denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
                "severidadDenunciaDescripcion": null,
                "rechazadoPorArt": false,
                "ameritaInvestigacion": false,
                "siniestroMixto": false,
                "recibePrestacionesEnDomicilio": false,
                "esCortoPunzante": false,
                "esSinBajaLaboral": false,
                "validarDiagnostico": false,
                "suspendido": false,
                "franquero": false,
                "esVerificadoSupervisor": false,
                "diagnosticoValidado": false,
                "preDenunciaIdPreDenuncia": null,
                "fechaInternacionDesde": null,
                "fechaInternacionHasta": null,
                "circunstanciaItinereIdCircunstancia": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.circunstanciaItinereIdCircunstancia : null,
                "lugarAccidenteIdLugarAccidente": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.lugardeAccidente : null,
                "localidadItinereIdLocalidad": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereIdLocalidad : null,
                "localidadItinereProvinciaIdProvincia": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereProvinciaIdProvincia : null,
                "calleOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleOcurrenciaItinere : null,
                "idCalleOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleId : null,
                "numeroOcurrenciaItinere": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.numeroOcurrenciaItinere : null,
                "codigoPostalItinereIdCodigoPostal": datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.codigoPostalItinereIdCodigoPostal : null,
                "auditorMedicoIdPersona": null,
                "dictamen": false,
                "severidadDenunciaIdSeveridadDenuncia": null,
                "estadoInternacionIdEstadoInternacion": null,
                "fechaPrimeraManifestacion": null,
                "siniestroOriginalIdDenuncia": denuncia2 && denuncia2.siniestroOriginalIdDenuncia ? denuncia2.siniestroOriginalIdDenuncia : null,
                "idSiniestroIntercurrencia": denuncia2 && denuncia2.idSiniestroIntercurrencia ? denuncia2.idSiniestroIntercurrencia : null,
                "siniestroMultiple": checkedSiniestroMultiple,
                "nroAsignadoOrigen": denuncia2 ? denuncia2.nroAsignadoOrigen : null,
            }
        }
        if (checkUrgencia) setCheckUrgencia(false)
        dispatch(actions.updateDenuncia(request, callBackUpdateDenuncia))
    }

    //CallBack Update Denuncia:
    const callBackUpdateDenuncia = (succes, tipo, data) => {
        if (succes) {
            let estadoCem = data && data.estadoCEM
            let idDenuncia2 = data && data.idDenuncia
            dispatch(actions.searchDenunciaById(idDenuncia2, estadoCem, callbackSearchDenunciaById))
            dispatch(actions.searchCampanaNotificaciones())
            dispatch(actions.setPresentaCovid(null))
            dispatch(actions.setReduxDenunciaSnackBar({
                open: true,
                severity: 'success',
                vertical: 'bottom',
                title: 'La denuncia fue guardada con éxito'
            }))
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'Le pedimos disculpas, no se pudo crear la denuncia. Por favor intente nuevamente'
            })
        }
    }

    //En caso que se hay buscado en la pantalla anterior datos por dni, se busque datos por dni del mismo accidentado 
    useEffect(() => {
        if (dataBuscadorReingreso && dataBuscadorReingreso.nroDoc !== null) {
            setDenuncia(null)
            setCleanDatosAccidentado(false)
            dispatch(actions.searchAccidentado(dataBuscadorReingreso.tipoDoc, dataBuscadorReingreso.nroDoc, form.empleadorIdEmpleador, callBackBuscadorAcidentado))
        }
    }, [dataBuscadorReingreso])

    //CallBack Search Denuncia x Id:
    const callbackSearchDenunciaById = (succes) => {
        if (succes) {
            history.push({
                pathname: '/home/editar',
                state: {
                    redireccion: true
                }
            })
        } else {
            history.push({ pathname: '/home' })
        }
    }

    return (
        <Grid container xs={12} direction='column' spacing={3} style={{ margin: '0px' }}>

            <CustomLoading loading={loadingNuevaDenuncia || loadingUpdate || loadingCamposRequeridos} />

            <Grid item container className={classes.contenedor} alignItems='center' justify='center' >
                <Grid item xs={11} >
                    <Cabecera
                        cabecera={true}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        textRelato={textRelato}
                        setTextRelato={setTextRelato}
                        valSiniestro={valSiniestro}
                        setValSiniestro={setValSiniestro}
                        hora={hora}
                        setHora={setHora}
                        valueEmpleador={valueEmpleador}
                        setValueEmpleador={setValueEmpleador}
                        dataDenuncia={dataDenuncia}
                        checkedReingreso={checkedReingreso}
                        setCheckedReingreso={setCheckedReingreso}
                        vip={vip}
                        checkedSiniestroMultiple={checkedSiniestroMultiple}
                        setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                        setCheckedIntercurrencia={setCheckedIntercurrencia}
                        checkedIntercurrencia={checkedIntercurrencia}
                    />
                </Grid>
            </Grid>

            <Grid item container spacing={openHistorico ? 2 : null} justify='center' alignItems='center'>
                <Buscador
                    data={dataBuscadorReingreso ? dataBuscadorReingreso : dataBuscador}
                    setDataBuscador={setDataBuscador}
                    onClik={handleBuscadorAccidentado}
                />
                {openHistorico ?
                    <span style={{ marginLeft: 10 }}>
                        <HistoricoSiniestros
                            dni={denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : ''}
                            denuncia={denuncia}
                            setOpenBuscador={setOpenBuscador}
                        />
                    </span>
                    : null}
                {openAlertNoDocumento &&
                    <Grid item container justify='center' alignItems='center' style={{ marginTop: 20 }}>
                        <Grid item xs={6}>
                            <CustomAlert
                                message={ERROR_BUSCADOR}
                                onClose={() => setOpenAlertNoDocumento(false)}
                                variant={'outlined'}
                                severity='error'
                                open={openAlertNoDocumento}
                            />
                        </Grid>
                    </Grid>
                }
            </Grid>

            <Grid justify='center' direction={'row'} item container xs={12}   >
                <Grid item container alignItems='center' justify='center' spacing={2}  >

                    {/* DATOS ESCENCIALES */}
                    <Grid item xs={7}>
                        <Paper style={{ padding: 20 }} variant={'outlined'} >
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTypography text={'Datos Escenciales'} variant={'subtitle1'} fontweight={'600'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <DatosEscenciales
                                        denuncia={denuncia}
                                        setDatosEscencialesCompleto={setDatosEscencialesCompleto}
                                        dniBuscador={dataBuscador}
                                        openBuscador={openAlertNoDocumento}
                                        riesgoDeMuerte={true}
                                        cleanDatosAccidentado={cleanDatosAccidentado}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* LUGAR DEL ACCIDENTE */}
                    <Grid item xs={7}>
                        <Paper style={{ padding: 20 }} variant={'outlined'} >
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTypography text={'Lugar donde se encuentra el accidentado'} variant={'subtitle1'} fontweight={'600'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <CompletarLugarAccidente
                                        denuncia={denuncia}
                                        denuncia2={denuncia2}
                                        setDatosLugarAccidenteCompleto={setDatosLugarAccidenteCompleto}
                                        datosLugarAccidenteCompleto={datosLugarAccidenteCompleto}
                                        cleanDatosAccidentado={cleanDatosAccidentado}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* AMBULANCIAS */}
                    <Grid item xs={7}>
                        <Paper style={{ padding: 20 }} variant={'outlined'}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTypography text={'Listado ambulancias'} variant={'subtitle1'} fontweight={'600'} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Ambulancias />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item container xs={7} justify='space-between'>
                        <Grid item>
                            <CustomButton
                                isAction={true}
                                label={'Volver'}
                                variant={'outlined'}
                                onClik={handleCancelar}
                                size={'large'}
                            />
                        </Grid>
                        <Grid item>
                            <CustomButton
                                isAction={true}
                                label={'Cancelar'}
                                variant={'outlined'}
                                onClik={handleCancelar}
                                size={'large'}
                                styleButton={{ marginRight: 10 }}
                            />
                            <CustomButton
                                isAction={true}
                                color={'primary'}
                                label={'Guardar'}
                                variant={'contained'}
                                onClik={handleGuardar}
                                size={'large'}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>

            {openSnackBar.open &&
                <CustomSnackBar
                    handleClose={() => setOpenSnackBar({ open: false })}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                    vertical={'bottom'}
                />
            }

            {openModal.open &&
                <ModalCamposFaltantes
                    openConfirmacion={openModal.open}
                    title={`Campos faltantes requeridos para pasar a ${openModal.data.estadoCEM === 2 ? 'INCOMPLETO' : 'COMPLETO'}`}
                    campos={camposFaltantes}
                    handleConfirmar={updateDenuncia}
                    handleVolver={() => setOpenModal({ open: false, tipo: '', data: [] })}
                    denunciaUrgente={checkUrgencia}
                />
            }

        </Grid>
    )
}

PantallaRiesgoMuerte.propTypes = {
    setNewFormClasico: PropTypes.bool,
    form: PropTypes.any,
    idDenunciaForm: PropTypes.any
}

export default PantallaRiesgoMuerte
