import React, { useState, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Utils:
import Utils from '../../Utils/utils'
import { ERROR_BUSCADOR, GUARDAR_DENUNCIA_ERROR } from '../../Utils/const'
//Router:
import { useHistory } from 'react-router'
//Material
import { Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
//Componentes
import Cabecera from './Cabecera/cabecera'
import DatosContacto from './Secciones/DatosDelPaciente/datosContacto'
import DatosPersonales from './Secciones/DatosDelPaciente/datosPersonales'
import Domicilio from './Secciones/DatosDelPaciente/domicilio'
import DatosEmpleado from './Secciones/DatosLugarTrabajo/datosEmpleado'
import DatosSedeLaboral from './Secciones/DatosLugarTrabajo/datosSedeLaboral'
import CustomAlert from '../commons/CustomAlert/customAlert'
import SeccionCentroMedico from './Secciones/CentroMedico/SeccionCentroMedico'
import CustomButton from '../commons/Button/CustomButton'
import Buscador from '../commons/Buscador/buscador'
import CustomLoading from '../commons/Loading/CustomLoading'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import ModalCamposFaltantes from './ModalCamposFaltantes/ModalCamposFaltantes'
import IconSearch from '../BuscadorFlotante/IconSearch'
import CustomTypography from '../commons/Typography/CustomTypography'
import HistoricoSiniestros from './Secciones/DatosDelPaciente/HistoricoDrawer/HistoricoSiniestros'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    contenedor: {
        backgroundColor: 'white',
        borderBottom: 'solid 1px #dadce0',
        padding: '0vh 18vh',
    }
})

const PantallaLesionLeve = (props) => {

    const { setNewFormClasico, vip, form, idDenunciaForm, usuario, denuncia2, 
        openBuscador, setOpenBuscador, dataBuscadorReingreso } = props

    const classes = useStyles(props)
    const history = useHistory()
    const dispatchs = useDispatch()

    //Cabecera
    const dataDenuncia = useSelector(state => state.documentos.denuncia)
    const [textRelato, setTextRelato] = useState('')
    const [valSiniestro, setValSiniestro] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [hora, setHora] = useState('')
    const [valueEmpleador, setValueEmpleador] = useState(null)
    const [checkedReingreso, setCheckedReingreso] = useState(false)
    //Datos completos para guarda la nueva denuncia
    const [datosPersonalesCompleto, setDatosPersonalesCompleto] = useState(null)
    const [datosContactoCompleto, setDatosContactoCompleto] = useState(null)
    const [datosDomicilioCompleto, setDatosDomicilioCompleto] = useState(null)
    const [datosEmpleadoCompleto, setDatosEmpleadoCompleto] = useState(null)
    const [datosSedeLaboralCompleto, setDatosSedeLaboralCompleto] = useState(null)
    const [dataSeccionCentroMedico, setDataSeccionCentroMedico] = useState(null)
    //Seccion centro medico
    const [valueCentroMedico, setValueCentroMedico] = useState(null)
    const [dataCentromedico, setDataCentroMedico] = useState(null)
    const [seleccionado2, setSeleccionado2] = useState(false)
    const [openHistorico, setOpenHistorico] = useState(false)
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(denuncia2 ? denuncia2.siniestroMultiple : false)
    const [checkedIntercurrencia, setCheckedIntercurrencia] = useState(false)
    const [idCausa, setIdCausa] = useState(null)
    //Guardar Denuncia:
    const loadingUpdate = useSelector(state => state.documentos.loadingUpdate)
    const [camposFaltantes, setCamposFaltantes] = useState([])
    const [openModal, setOpenModal] = useState({ open: false, tipo: '', data: [] })
    const [idAccidentado, setIdAccidentado] = useState(null);
    //Buscar Accidentado x Documento:
    const [openAlertNoDocumento, setOpenAlertNoDocumento] = useState(false)
    const [dataBuscador, setDataBuscador] = useState({ tipoDoc: 1, nroDoc: null })
    const [denuncia, setDenuncia] = useState(null)
    const loadingNuevaDenuncia = useSelector(state => state.documentos.loadingNuevaDenuncia)
    const [cleanDatosAccidentado, setCleanDatosAccidentado] = useState(false)
    //SnackBar:
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })

    useEffect(() => {
        setDataCentroMedico(null)
        setSeleccionado2(false)
        dispatchs(actions.setCentroMedicoSugerido([]))
        setDatosContactoCompleto(null)
        setDatosPersonalesCompleto(null)
        setDatosDomicilioCompleto(null)
        setDatosEmpleadoCompleto(null)
        setDatosSedeLaboralCompleto(null)
        setDataSeccionCentroMedico(null)
    }, [])

    //Buscador Accidentado x Documento:
    const handleBuscadorAccidentado = (tipoDoc, nroDoc) => {
        setDataBuscador(dataBuscador => ({ ...dataBuscador, tipoDoc: tipoDoc, nroDoc: nroDoc }))
        if (nroDoc && form) {
            setDenuncia(null)
            setCleanDatosAccidentado(false)
            dispatchs(actions.searchAccidentado(tipoDoc, nroDoc, form.empleadorIdEmpleador, callBackBuscadorAcidentado))
        }
    }

    //En caso que se hay buscado en la pantalla anterior datos por dni, se busque datos por dni del mismo accidentado 
    useEffect(() => {
        if (dataBuscadorReingreso && dataBuscadorReingreso.nroDoc !== null) {
            setDenuncia(null)
            setCleanDatosAccidentado(false)
            dispatchs(actions.searchAccidentado(dataBuscadorReingreso.tipoDoc, dataBuscadorReingreso.nroDoc, form.empleadorIdEmpleador, callBackBuscadorAcidentado))
        }
    }, [dataBuscadorReingreso])

    //Callback Buscador Accidentado
    const callBackBuscadorAcidentado = (data) => {
        if (data) {
            setIdAccidentado(data.accidentado && data.accidentado.idAccidentado)
            // updateAccidentado(data.accidentado && data.accidentado.idAccidentado)
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
        let requestCamposRequeridos = setRequestCamposRequeridos()
        dispatchs(actions.camposRequeridosDenuncia(requestCamposRequeridos, callBackCamposRequeridos))
    }

    //CallBack Guardar:
    const callBackCamposRequeridos = (success, data) => {
        if (success) {
            let camposFaltantes = data && data.camposFaltantes
            if (datosSedeLaboralCompleto && datosSedeLaboralCompleto.openNuevaSede && camposFaltantes && camposFaltantes.length > 0) {
                camposFaltantes = camposFaltantes.filter(it => it.nombre !== 'sedeIdSede')
            }
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
        setNewFormClasico(false)
        setDataCentroMedico(null)
        setSeleccionado2(false)
        dispatchs(actions.setCentroMedicoSugerido([]))
        setDatosContactoCompleto(null)
        setDatosPersonalesCompleto(null)
        setDatosDomicilioCompleto(null)
        setDatosEmpleadoCompleto(null)
        setDatosSedeLaboralCompleto(null)
        setDataSeccionCentroMedico(null)
    }

    //UpdateDenuncia:
    const updateDenuncia = () => {
        if (datosSedeLaboralCompleto && datosSedeLaboralCompleto.openNuevaSede) {
            let requestNuevaSede = {
                idTipoSede: datosSedeLaboralCompleto && datosSedeLaboralCompleto.tipoSede ? datosSedeLaboralCompleto.tipoSede.idTipoSede : null,
                nombre: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.sede : null,
                direccion: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.direccion : null,
                nro: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.nroCalle : null,
                localidadesIdLocalidad: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idLocalidad : null,
                localidadesProvinciaIdProvincia: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idProvincia : null,
                codigoPostalIdCodigoPostal: datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idCodigoPostal : null,
            }
            dispatchs(actions.guardarNuevaSede(requestNuevaSede, callBackGuardarNuevaSede))
        } else {
            let requestUpdateDenuncia = setRequestUpdateDenuncia()
            dispatchs(actions.updateDenuncia(requestUpdateDenuncia, callBackUpdateDenuncia))
        }
        setOpenModal(data => ({ ...data, open: false }))
    }

    //CallBack Guardar Nueva Sede:
    const callBackGuardarNuevaSede = (success, idSede, tipo) => {
        if (success) {
            let requestUpdateDenuncia = setRequestUpdateDenuncia()
            requestUpdateDenuncia = {
                ...requestUpdateDenuncia,
                'denuncia': {
                    ...requestUpdateDenuncia.denuncia,
                    'sede': {
                        ...requestUpdateDenuncia.denuncia.sede,
                        'idSede': idSede,
                        "nombre": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.sede : null,
                        "direccion": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.direccion : null,
                        "nro": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.nroCalle : null,
                        "localidadesIdLocalidad": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idLocalidad : null,
                        "localidadesProvinciaIdProvincia": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idProvincia : null,
                        "codigoPostalIdCodigoPostal": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idCodigoPostal : null
                    }
                }
            }
            dispatchs(actions.updateDenuncia(requestUpdateDenuncia, callBackUpdateDenuncia, tipo))
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'Ocurrió un error al guardar la nueva sede.'
            })
        }
    }

    //CallBack UpdateDenuncia:
    const callBackUpdateDenuncia = (succes, tipo, data) => {
        if (succes) {
            let estadoCem = data && data.estadoCEM
            let idDenuncia2 = data && data.idDenuncia
            dispatchs(actions.searchDenunciaById(idDenuncia2, estadoCem, callbackSearchDenunciaById))
            dispatchs(actions.searchCampanaNotificaciones())
            dispatchs(actions.setPresentaCovid(null))
            dispatchs(actions.setReduxDenunciaSnackBar({
                open: true,
                severity: 'success',
                vertical: 'bottom',
                title: 'La denuncia fue guardada con éxito.'
            }))
            history.push({
                pathname: '/home/editar',
                state: { redireccion: true }
            })
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: GUARDAR_DENUNCIA_ERROR
            })
        }
    }

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

    //SET RequestCamposRequeridos:
    const setRequestCamposRequeridos = () => {
        let response = {
            "estadoCEM": 2,
            "riesgoMuerteIdRiesgoMuerte": false,
            "empleadorEsVIP": vip && vip,
            "accidentado": {
                "idAccidentado": idAccidentado !== null ? idAccidentado : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                "tipoDocumentoIdTipoDocumento": 1,
                "apellido": datosPersonalesCompleto && datosPersonalesCompleto.apellido ? datosPersonalesCompleto.apellido : null,
                "nombre": datosPersonalesCompleto && datosPersonalesCompleto.nombre ? datosPersonalesCompleto.nombre : null,
                "sexo": datosPersonalesCompleto && datosPersonalesCompleto.sexo ? datosPersonalesCompleto.sexo : null,
                "fechaNacimiento": datosPersonalesCompleto && datosPersonalesCompleto.fechaNacimiento ? datosPersonalesCompleto.fechaNacimiento : null,
                "nroDoc": datosPersonalesCompleto && datosPersonalesCompleto.nroDoc ? datosPersonalesCompleto.nroDoc : null,
                "nroCuil": datosPersonalesCompleto && datosPersonalesCompleto.nroCuil ? datosPersonalesCompleto.nroCuil : null,
                "estadoCivilIdEstadoCivil": datosPersonalesCompleto && datosPersonalesCompleto.estadoCivil ? datosPersonalesCompleto.estadoCivil : null,
                "nacionalidadCodigo": datosPersonalesCompleto && datosPersonalesCompleto.nacionalidad ? datosPersonalesCompleto.nacionalidad : null,
                "email": datosContactoCompleto && datosContactoCompleto.email ? datosContactoCompleto.email : null,
                "telefono": datosContactoCompleto && datosContactoCompleto.telefono ? datosContactoCompleto.telefono : null,
                "telefonoSecundario": datosContactoCompleto && datosContactoCompleto.telefonoSecundario ? datosContactoCompleto.telefonoSecundario : null,
                "codigoAreaCelular": datosContactoCompleto && datosContactoCompleto.codigoAreaCelular ? datosContactoCompleto.codigoAreaCelular : null,
                "numeroCelular": datosContactoCompleto && datosContactoCompleto.numeroCelular ? datosContactoCompleto.numeroCelular : null,
                "codigoPaisCelular": datosContactoCompleto && datosContactoCompleto.codigoPaisCelular !== '' ? datosContactoCompleto.codigoPaisCelular : '+54',
                "whatsapp": datosContactoCompleto && datosContactoCompleto.whatsapp ? datosContactoCompleto.whatsapp : false,
                "numero": datosDomicilioCompleto && datosDomicilioCompleto.numero ? datosDomicilioCompleto.numero : null,
                "piso": datosDomicilioCompleto && datosDomicilioCompleto.piso ? datosDomicilioCompleto.piso : null,
                "depto": datosDomicilioCompleto && datosDomicilioCompleto.depto ? datosDomicilioCompleto.depto : null,
                "aclaraciones": datosDomicilioCompleto && datosDomicilioCompleto.aclaraciones ? datosDomicilioCompleto.aclaraciones : null,
                "calle": datosDomicilioCompleto && datosDomicilioCompleto.calle ? datosDomicilioCompleto.calle : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.calle ? denuncia2.accidentado.calle : null,
                "idCalleIdCalle": datosDomicilioCompleto && datosDomicilioCompleto.calleId ? datosDomicilioCompleto.calleId : null,
                "ascensor": datosDomicilioCompleto && datosDomicilioCompleto.ascensor ? datosDomicilioCompleto.ascensor : null,
                "localidadIdLocalidad": datosDomicilioCompleto && datosDomicilioCompleto.localidadIdLocalidad ? datosDomicilioCompleto.localidadIdLocalidad : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.localidadIdLocalidad ? denuncia2.accidentado.localidadIdLocalidad : null,
                "localidadProvinciaIdProvincia": datosDomicilioCompleto && datosDomicilioCompleto.localidadProvinciaIdProvincia ? datosDomicilioCompleto.localidadProvinciaIdProvincia : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.localidadProvinciaIdProvincia ? denuncia2.accidentado.localidadProvinciaIdProvincia : null,
                "codigoPostalIdCodigoPostal": datosDomicilioCompleto && datosDomicilioCompleto.codigoPostalIdCodigoPostal ? datosDomicilioCompleto.codigoPostalIdCodigoPostal : null,
            },
            "centroPrimerAsistencia": dataSeccionCentroMedico && dataSeccionCentroMedico.id !== null ? {
                "id": dataSeccionCentroMedico ? dataSeccionCentroMedico.id : null,
                "centroMedico": dataSeccionCentroMedico ? dataSeccionCentroMedico.centroMedico : null,

            } : null,
            "fechaOcurrencia": selectedDate ? Utils.dateFormat2(selectedDate) : form ? form.fechaOcurrencia : null,
            "horaOcurrencia": hora ? hora : form ? form.horaOcurrencia : null,
            "relato": textRelato ? textRelato : form ? form.relato : null,
            "diagnosticoCie10Codigo": denuncia2 && denuncia2.diagnosticoCie10Codigo !== null ? denuncia2.diagnosticoCie10Codigo : null,
            "estadoMedicoIdEstadoMedico": denuncia2 ? denuncia2.estadoMedicoIdEstadoMedico : null,
            "tipoSiniestroIdTipoSiniestro": denuncia2 && denuncia2.tipoSiniestroIdTipoSiniestro !== null ? denuncia2.tipoSiniestroIdTipoSiniestro : valSiniestro ? valSiniestro : form ? form.tipoSiniestroIdTipoSiniestro : null,
            "diagnosticoDeCerteza": denuncia2 && denuncia2.diagnosticoDeCerteza !== null ? denuncia2.diagnosticoDeCerteza : null,
            "reingreso": form && form.reingreso ? form.reingreso : false,
            "cortopunzante": null,
            "denuncianteAutorizado": null,
            "fechaPCR": null,
            "nroRoam": null,
            "fechaBaja": null,
            "responsableIngreso": null,
            "asistenciaExterna": null,
            "empleadorIdEmpleador": form && form.empleadorIdEmpleador ? form.empleadorIdEmpleador : null,
            "fechaIngresoLaboral": datosEmpleadoCompleto && datosEmpleadoCompleto.fechaIngresoLaboral ? datosEmpleadoCompleto.fechaIngresoLaboral : denuncia2 && denuncia2.fechaIngresoLaboral !== null ? denuncia2.fechaIngresoLaboral : null,
            "horarioLaboral": datosEmpleadoCompleto && datosEmpleadoCompleto.horarioLaboral ? datosEmpleadoCompleto.horarioLaboral : null,
            "telefonoLaboral": datosEmpleadoCompleto && datosEmpleadoCompleto.telefonoLaboral ? datosEmpleadoCompleto.telefonoLaboral : denuncia2 && denuncia2.horarioLaboral !== null ? denuncia2.horarioLaboral : null,
            "tareaDuranteAccidenteIdOcupacion": datosEmpleadoCompleto && datosEmpleadoCompleto.idTareaAccidente ? datosEmpleadoCompleto.idTareaAccidente : denuncia2 && denuncia2.tareaDuranteAccidenteIdOcupacion !== null ? denuncia2.tareaDuranteAccidenteIdOcupacion : null,
            "ocupacionIdOcupacion": datosEmpleadoCompleto && datosEmpleadoCompleto.idOcupacion ? datosEmpleadoCompleto.idOcupacion : denuncia2 && denuncia2.ocupacionIdOcupacion ? denuncia2.ocupacionIdOcupacion : null,
            "franquero": datosEmpleadoCompleto && datosEmpleadoCompleto.franquero ? datosEmpleadoCompleto.franquero : false,
            "idModalidadTrabajo": datosEmpleadoCompleto ? datosEmpleadoCompleto.idModalidadTrabajo : null,
            "patologiaTrazadoraIdPatologiaTrazadora": null,
            "formaAccidenteIdFormaAccidente": denuncia2 && denuncia2.formaAccidenteIdFormaAccidente ? denuncia2.formaAccidenteIdFormaAccidente : null,
            "zonaAfectadaIdZonaAfectada": denuncia2 && denuncia2.zonaAfectadaIdZonaAfectada !== null ? denuncia2.zonaAfectadaIdZonaAfectada : null,
            "naturalezasSiniestroIdNaturalezaSiniestro": denuncia2 && denuncia2.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia2.naturalezasSiniestroIdNaturalezaSiniestro : null,
            "agenteCausanteEpIdAgenteCausanteEp": denuncia2 && denuncia2.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia2.agenteCausanteEpIdAgenteCausanteEp : null,
            "agenteMaterialAsociadoIdAgenteMaterialAsociado": denuncia2 && denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
            "rechazadoPorArt": false,
            "ameritaInvestigacion": false,
            "siniestroMixto": false,
            "recibePrestacionesEnDomicilio": false,
            "esCortoPunzante": false,
            "esSinBajaLaboral": false,
            "validarDiagnostico": false,
            "suspendido": false,
            "esVerificadoSupervisor": false,
            "diagnosticoValidado": false,
            "preDenunciaIdPreDenuncia": null,
            "fechaInternacionDesde": null,
            "fechaInternacionHasta": null,
            "circunstanciaItinereIdCircunstancia": denuncia2 && denuncia2.circunstanciaItinereIdCircunstancia ? denuncia2.circunstanciaItinereIdCircunstancia : null,
            "lugarAccidenteIdLugarAccidente": denuncia2 && denuncia2.lugarAccidenteIdLugarAccidente ? denuncia2.lugarAccidenteIdLugarAccidente : null,
            "localidadItinereIdLocalidad": denuncia2 && denuncia2.localidadItinereIdLocalidad ? denuncia2.localidadItinereIdLocalidad : null,
            "localidadItinereProvinciaIdProvincia": denuncia2 && denuncia2.localidadItinereProvinciaIdProvincia ? denuncia2.localidadItinereProvinciaIdProvincia : null,
            "calleOcurrenciaItinere": denuncia2 && denuncia2.calleOcurrenciaItinere ? denuncia2.calleOcurrenciaItinere : null,
            "idCalleOcurrenciaItinere": denuncia2 && denuncia2.idCalleOcurrenciaItinere ? denuncia2.idCalleOcurrenciaItinere : null,
            "numeroOcurrenciaItinere": denuncia2 && denuncia2.numeroOcurrenciaItinere ? denuncia2.numeroOcurrenciaItinere : null,
            "codigoPostalItinereIdCodigoPostal": denuncia2 && denuncia2.codigoPostalItinereIdCodigoPostal ? denuncia2.codigoPostalItinereIdCodigoPostal : null,
            "auditorMedicoIdPersona": null,
            "dictamen": false,
            "severidadDenunciaIdSeveridadDenuncia": denuncia2?.severidadDenunciaIdSeveridadDenuncia ?? null,
            "estadoInternacionIdEstadoInternacion": null,
            "fechaPrimeraManifestacion": null,
            "siniestroOriginalIdDenuncia": denuncia2 && denuncia2.siniestroOriginalIdDenuncia ? denuncia2.siniestroOriginalIdDenuncia : null,
            "idSiniestroIntercurrencia": denuncia2 && denuncia2.idSiniestroIntercurrencia ? denuncia2.idSiniestroIntercurrencia : null,
            "siniestroMultiple": checkedSiniestroMultiple,
            "nroAsignadoOrigen": denuncia2 && denuncia2.nroAsignadoOrigen ? denuncia2.nroAsignadoOrigen : null,
            "tipoSede": datosSedeLaboralCompleto && datosSedeLaboralCompleto.tipoSede ? datosSedeLaboralCompleto.tipoSede : null,
            "sede": {
                "idSede": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idSede : null,
                "nombre": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.sede : null,
                "direccion": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.direccion : null,
                "nro": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.nroCalle : null,
                "localidadesIdLocalidad": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idLocalidad : null,
                "localidadesProvinciaIdProvincia": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idProvincia : null,
                "codigoPostalIdCodigoPostal": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idCodigoPostal : null
            },
        }
        return response
    }

    //SET RequestUpdateDenuncia:
    const setRequestUpdateDenuncia = () => {
        let response = {
            "idDenuncia": idDenunciaForm,
            "idOperador": usuario.id,
            "denuncia": {
                "estadoCEM": 2,
                "riesgoMuerteIdRiesgoMuerte": false,
                "empleadorEsVIP": vip && vip,
                "accidentado": {
                    "idAccidentado": idAccidentado !== null ? idAccidentado : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                    "tipoDocumentoIdTipoDocumento": 1,
                    "estadoCivilIdEstadoCivil": datosPersonalesCompleto && datosPersonalesCompleto.estadoCivil ? datosPersonalesCompleto.estadoCivil : null,
                    "nacionalidadCodigo": datosPersonalesCompleto && datosPersonalesCompleto.nacionalidad ? datosPersonalesCompleto.nacionalidad : null,
                    "apellido": datosPersonalesCompleto && datosPersonalesCompleto.apellido ? datosPersonalesCompleto.apellido : null,
                    "nombre": datosPersonalesCompleto && datosPersonalesCompleto.nombre ? datosPersonalesCompleto.nombre : null,
                    "sexo": datosPersonalesCompleto && datosPersonalesCompleto.sexo ? datosPersonalesCompleto.sexo : null,
                    "fechaNacimiento": datosPersonalesCompleto && datosPersonalesCompleto.fechaNacimiento ? datosPersonalesCompleto.fechaNacimiento : null,
                    "nroDoc": datosPersonalesCompleto && datosPersonalesCompleto.nroDoc ? datosPersonalesCompleto.nroDoc : null,
                    "nroCuil": datosPersonalesCompleto && datosPersonalesCompleto.nroCuil ? datosPersonalesCompleto.nroCuil : null,
                    "numero": datosDomicilioCompleto && datosDomicilioCompleto.numero ? datosDomicilioCompleto.numero : null,
                    "piso": datosDomicilioCompleto && datosDomicilioCompleto.piso ? datosDomicilioCompleto.piso : null,
                    "depto": datosDomicilioCompleto && datosDomicilioCompleto.depto ? datosDomicilioCompleto.depto : null,
                    "aclaraciones": datosDomicilioCompleto && datosDomicilioCompleto.aclaraciones ? datosDomicilioCompleto.aclaraciones : null,
                    "calle": datosDomicilioCompleto && datosDomicilioCompleto.calle ? datosDomicilioCompleto.calle : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.calle ? denuncia2.accidentado.calle : null,
                    "localidadIdLocalidad": datosDomicilioCompleto && datosDomicilioCompleto.localidadIdLocalidad ? datosDomicilioCompleto.localidadIdLocalidad : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.localidadIdLocalidad ? denuncia2.accidentado.localidadIdLocalidad : null,
                    "localidadProvinciaIdProvincia": datosDomicilioCompleto && datosDomicilioCompleto.localidadProvinciaIdProvincia ? datosDomicilioCompleto.localidadProvinciaIdProvincia : denuncia2 && denuncia2.accidentado && denuncia2.accidentado.localidadProvinciaIdProvincia ? denuncia2.accidentado.localidadProvinciaIdProvincia : null,
                    "codigoPostalIdCodigoPostal": datosDomicilioCompleto && datosDomicilioCompleto.codigoPostalIdCodigoPostal ? datosDomicilioCompleto.codigoPostalIdCodigoPostal : null,
                    "idCalleIdCalle": datosDomicilioCompleto && datosDomicilioCompleto.calleId ? datosDomicilioCompleto.calleId : null,
                    "ascensor": datosDomicilioCompleto && datosDomicilioCompleto.ascensor ? datosDomicilioCompleto.ascensor : null,
                    "telefono": datosContactoCompleto && datosContactoCompleto.telefono ? datosContactoCompleto.telefono : null,
                    "telefonoSecundario": datosContactoCompleto && datosContactoCompleto.telefonoSecundario ? datosContactoCompleto.telefonoSecundario : null,
                    "codigoAreaCelular": datosContactoCompleto && datosContactoCompleto.codigoAreaCelular ? datosContactoCompleto.codigoAreaCelular : null,
                    "numeroCelular": datosContactoCompleto && datosContactoCompleto.numeroCelular ? datosContactoCompleto.numeroCelular : null,
                    "codigoPaisCelular": datosContactoCompleto && datosContactoCompleto.codigoPaisCelular !== '' ? datosContactoCompleto.codigoPaisCelular : '+54',
                    "email": datosContactoCompleto && datosContactoCompleto.email ? datosContactoCompleto.email : null,
                    "whatsapp": datosContactoCompleto && datosContactoCompleto.whatsapp ? datosContactoCompleto.whatsapp : false,
                },
                "centroPrimerAsistencia": dataSeccionCentroMedico && dataSeccionCentroMedico.id !== null ? { "id": dataSeccionCentroMedico ? dataSeccionCentroMedico.id : null, "centroMedico": dataSeccionCentroMedico ? dataSeccionCentroMedico.centroMedico : null } : null,
                "fechaOcurrencia": selectedDate ? Utils.dateFormat2(selectedDate) : form ? form.fechaOcurrencia : null,
                "horaOcurrencia": hora ? hora : form ? form.horaOcurrencia : null,
                "relato": textRelato ? textRelato : form ? form.relato : null,
                "reingreso": form ? form.reingreso : false,
                "empleadorIdEmpleador": form ? form.empleadorIdEmpleador : null,
                "siniestroMultiple": checkedSiniestroMultiple,
                "diagnosticoCie10Codigo": denuncia2 && denuncia2.diagnosticoCie10Codigo !== null ? denuncia2.diagnosticoCie10Codigo : null,
                "estadoMedicoIdEstadoMedico": denuncia2 ? denuncia2.estadoMedicoIdEstadoMedico : null,
                "tipoSiniestroIdTipoSiniestro": denuncia2 && denuncia2.tipoSiniestroIdTipoSiniestro !== null ? denuncia2.tipoSiniestroIdTipoSiniestro : valSiniestro ? valSiniestro : form ? form.tipoSiniestroIdTipoSiniestro : null,
                "diagnosticoDeCerteza": denuncia2 && denuncia2.diagnosticoDeCerteza !== null ? denuncia2.diagnosticoDeCerteza : null,
                "formaAccidenteIdFormaAccidente": denuncia2 && denuncia2.formaAccidenteIdFormaAccidente ? denuncia2.formaAccidenteIdFormaAccidente : null,
                "zonaAfectadaIdZonaAfectada": denuncia2 && denuncia2.zonaAfectadaIdZonaAfectada !== null ? denuncia2.zonaAfectadaIdZonaAfectada : null,
                "naturalezasSiniestroIdNaturalezaSiniestro": denuncia2 && denuncia2.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia2.naturalezasSiniestroIdNaturalezaSiniestro : null,
                "agenteCausanteEpIdAgenteCausanteEp": denuncia2 && denuncia2.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia2.agenteCausanteEpIdAgenteCausanteEp : null,
                "agenteMaterialAsociadoIdAgenteMaterialAsociado": denuncia2 && denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia2.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
                "circunstanciaItinereIdCircunstancia": denuncia2 && denuncia2.circunstanciaItinereIdCircunstancia ? denuncia2.circunstanciaItinereIdCircunstancia : null,
                "lugarAccidenteIdLugarAccidente": denuncia2 && denuncia2.lugarAccidenteIdLugarAccidente ? denuncia2.lugarAccidenteIdLugarAccidente : null,
                "localidadItinereIdLocalidad": denuncia2 && denuncia2.localidadItinereIdLocalidad ? denuncia2.localidadItinereIdLocalidad : null,
                "localidadItinereProvinciaIdProvincia": denuncia2 && denuncia2.localidadItinereProvinciaIdProvincia ? denuncia2.localidadItinereProvinciaIdProvincia : null,
                "calleOcurrenciaItinere": denuncia2 && denuncia2.calleOcurrenciaItinere ? denuncia2.calleOcurrenciaItinere : null,
                "idCalleOcurrenciaItinere": denuncia2 && denuncia2.idCalleOcurrenciaItinere ? denuncia2.idCalleOcurrenciaItinere : null,
                "numeroOcurrenciaItinere": denuncia2 && denuncia2.numeroOcurrenciaItinere ? denuncia2.numeroOcurrenciaItinere : null,
                "codigoPostalItinereIdCodigoPostal": denuncia2 && denuncia2.codigoPostalItinereIdCodigoPostal ? denuncia2.codigoPostalItinereIdCodigoPostal : null,
                "siniestroOriginalIdDenuncia": denuncia2 && denuncia2.siniestroOriginalIdDenuncia ? denuncia2.siniestroOriginalIdDenuncia : null,
                "idSiniestroIntercurrencia": denuncia2 && denuncia2.idSiniestroIntercurrencia ? denuncia2.idSiniestroIntercurrencia : null,
                "nroAsignadoOrigen": denuncia2 ? denuncia2.nroAsignadoOrigen : null,
                "cortopunzante": null,
                "denuncianteAutorizado": null,
                "fechaPCR": null,
                "nroRoam": null,
                "fechaBaja": null,
                "responsableIngreso": null,
                "asistenciaExterna": null,
                "rechazadoPorArt": false,
                "ameritaInvestigacion": false,
                "siniestroMixto": false,
                "recibePrestacionesEnDomicilio": false,
                "esCortoPunzante": false,
                "esSinBajaLaboral": false,
                "validarDiagnostico": false,
                "suspendido": false,
                "esVerificadoSupervisor": false,
                "diagnosticoValidado": false,
                "preDenunciaIdPreDenuncia": null,
                "fechaInternacionDesde": null,
                "fechaInternacionHasta": null,
                "auditorMedicoIdPersona": null,
                "dictamen": false,
                "severidadDenunciaIdSeveridadDenuncia": denuncia2?.severidadDenunciaIdSeveridadDenuncia ?? null,
                "estadoInternacionIdEstadoInternacion": null,
                "fechaPrimeraManifestacion": null,
                "patologiaTrazadoraIdPatologiaTrazadora": null,
                "fechaIngresoLaboral": datosEmpleadoCompleto ? datosEmpleadoCompleto.fechaIngreso : denuncia2 && denuncia2.fechaIngresoLaboral !== null ? denuncia2.fechaIngresoLaboral : null,
                "horarioLaboral": datosEmpleadoCompleto ? datosEmpleadoCompleto.horarioLaboral : null,
                "telefonoLaboral": datosEmpleadoCompleto ? datosEmpleadoCompleto.telefonoLaboral : null,
                "tareaDuranteAccidenteIdOcupacion": datosEmpleadoCompleto ? datosEmpleadoCompleto.idTareaAccidente : denuncia2 && denuncia2.tareaDuranteAccidenteIdOcupacion !== null ? denuncia2.tareaDuranteAccidenteIdOcupacion : null,
                "ocupacionIdOcupacion": datosEmpleadoCompleto ? datosEmpleadoCompleto.idOcupacion : denuncia2 && denuncia2.ocupacionIdOcupacion ? denuncia2.ocupacionIdOcupacion : null,
                "franquero": datosEmpleadoCompleto ? datosEmpleadoCompleto.franquero : false,
                "idModalidadTrabajo": datosEmpleadoCompleto ? datosEmpleadoCompleto.idModalidadTrabajo : null,
                "tipoSede": datosSedeLaboralCompleto && datosSedeLaboralCompleto.tipoSede && datosSedeLaboralCompleto.tipoSede.idTipoSede ? datosSedeLaboralCompleto.tipoSede : null,
                "sede": datosSedeLaboralCompleto && datosSedeLaboralCompleto.idSede ? {
                    "idSede": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idSede : null,
                    "nombre": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.sede : null,
                    "direccion": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.direccion : null,
                    "nro": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.nroCalle : null,
                    "localidadesIdLocalidad": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idLocalidad : null,
                    "localidadesProvinciaIdProvincia": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idProvincia : null,
                    "codigoPostalIdCodigoPostal": datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idCodigoPostal : null
                } : null,
            }
        }
        return response
    }

    return (
        <div className={classes.root}>

            {!openBuscador ?
                <IconSearch open={openBuscador} usuarioActivo={usuario}/>
            : null}

            <Grid container xs={12} direction='column' spacing={3} style={{ margin: '0px' }}>
                <Grid item container className={classes.contenedor} alignItems='center' justify='center' >
                    <Grid item xs={11} >
                        <Cabecera
                            idCausa={idCausa} setIdCausa={setIdCausa}
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
                            checkedSiniestroMultiple={checkedSiniestroMultiple}
                            setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                            setCheckedIntercurrencia={setCheckedIntercurrencia}
                            checkedIntercurrencia={checkedIntercurrencia}
                        />
                    </Grid>
                </Grid>

                <Grid item container spacing={openHistorico ? 2 : null} justify={'center'} alignItems='center' >
                    <Buscador
                        onClik={handleBuscadorAccidentado}
                        data={dataBuscadorReingreso ? dataBuscadorReingreso : dataBuscador}
                        setDataBuscador={setDataBuscador}
                    />
                    <CustomLoading loading={loadingNuevaDenuncia || loadingUpdate} />
                    {openHistorico ?
                        <span style={{ marginLeft: 10 }}>
                            <HistoricoSiniestros
                                dni={denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : ''}
                                denuncia={denuncia}
                                setOpenBuscador={setOpenBuscador}
                            />
                        </span>
                        : null}
                </Grid>

                {openAlertNoDocumento ?
                    <Grid item container justify='center' alignItems='center'>
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
                    : null}

                <Grid item container justify='center' alignItems='center' spacing={2}>

                    {/* DATOS DEL ACCIDENTADO */}
                    <Grid item xs={8} container spacing={2} alignItems={'center'}
                        style={{
                            marginTop: '25px',
                            border: '1px solid #dadce0',
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                    >
                        <Grid item xs={12}>
                            <CustomTypography
                                text={<strong>Datos del Accidentado</strong>}
                                variant={'subtitle1'}
                                fontweight={'600'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 50 }}>
                            <CustomTypography
                                style={{ fontSize: '15px', marginBottom: '20px' }}
                                text={<strong>Datos Personales:</strong>}
                                variant={'subtitle2'}
                            />
                            <DatosPersonales
                                isEditar={true}
                                setDatosPersonalesCompleto={setDatosPersonalesCompleto}
                                denuncia={denuncia}
                                dniBuscador={dataBuscador} openBuscador={setOpenAlertNoDocumento} cleanDatosAccidentado={cleanDatosAccidentado}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 50 }}>
                            <CustomTypography
                                style={{ fontSize: '15px', marginBottom: '20px' }}
                                text={<strong>Domicilio:</strong>}
                                variant={'subtitle2'}
                            />
                            <Domicilio
                                isEditar={true}
                                denuncia={denuncia}
                                setDatosDomicilioCompleto={setDatosDomicilioCompleto}
                                datosDomicilioCompleto={datosDomicilioCompleto}
                                cleanDatosAccidentado={cleanDatosAccidentado}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <CustomTypography
                                style={{ fontSize: '15px', marginBottom: '20px' }}
                                text={<strong>Datos de Contacto:</strong>}
                                variant={'subtitle2'}
                            />
                            <DatosContacto
                                isEditar={true}
                                denuncia={denuncia}
                                datosContactoCompleto={datosContactoCompleto}
                                setDatosContactoCompleto={setDatosContactoCompleto}
                                cleanDatosAccidentado={cleanDatosAccidentado}
                            />
                        </Grid>
                    </Grid>

                    {/* DATOS DEL TRABAJO */}
                    <Grid item xs={8} container spacing={2} alignItems={'center'}
                        style={{
                            marginTop: '25px',
                            border: '1px solid #dadce0',
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                    >
                        <Grid item xs={12}>
                            <CustomTypography
                                text={<strong>Sección Trabajo</strong>}
                                variant={'subtitle1'}
                                fontweight={'600'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 50 }}>
                            <CustomTypography
                                style={{ fontSize: '15px', marginBottom: '20px' }}
                                text={<strong>Datos del Empleado:</strong>}
                                variant={'subtitle2'}
                            />
                            <DatosEmpleado
                                isEditar={true}
                                denuncia={denuncia}
                                setDatosEmpleadoCompleto={setDatosEmpleadoCompleto}
                                cleanDatosAccidentado={cleanDatosAccidentado}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: 20 }}>
                            <CustomTypography
                                style={{ fontSize: '15px', marginBottom: '20px' }}
                                text={<strong>Datos Sede Laboral:</strong>}
                                variant={'subtitle2'}
                            />
                            <DatosSedeLaboral
                                isEditar={true}
                                denuncia={denuncia}
                                dataDenuncia={dataDenuncia}
                                setDatosSedeLaboralCompleto={setDatosSedeLaboralCompleto}
                            />
                        </Grid>
                    </Grid>

                    {/* DATOS CENTRO MEDICO */}
                    <Grid item xs={8} container spacing={2} alignItems={'center'}
                        style={{
                            marginTop: '25px',
                            border: '1px solid #dadce0',
                            padding: '10px',
                            borderRadius: '10px',
                            marginBottom: 30
                        }}
                    >
                        <Grid item xs={12}>
                            <CustomTypography
                                text={<strong>Sección Centro Médico</strong>}
                                variant={'subtitle1'}
                                style={{ fontWeight: 600 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={11} style={{ display: 'flex', justifyContent: 'center' }}>
                            <SeccionCentroMedico
                                denuncia={denuncia}
                                dataDenuncia={dataDenuncia}
                                valueCentroMedico={valueCentroMedico}
                                setValueCentroMedico={setValueCentroMedico}
                                dataCentromedico={dataCentromedico}
                                setDataCentroMedico={setDataCentroMedico}
                                seleccionado2={seleccionado2}
                                setSeleccionado2={setSeleccionado2}
                                setDataSeccionCentroMedico={setDataSeccionCentroMedico}
                            />
                        </Grid>
                    </Grid>

                    {/* BOTONES */}
                    <Grid item container xs={8}>
                        <Grid item xs={6}>
                            <CustomButton
                                isAction={true}
                                label={'Volver'}
                                variant={'outlined'}
                                onClik={handleCancelar}
                                size={'large'}
                            />
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end', gap: 5 }}>
                            <CustomButton
                                isAction={true}
                                label={'Cancelar'}
                                variant={'outlined'}
                                onClik={handleCancelar}
                                size={'large'}
                            />
                            <CustomButton
                                isAction={true} color={'primary'}
                                label={'Guardar'}
                                variant={'contained'}
                                //disabled={disabledLocalidad()}                      
                                onClik={handleGuardar}
                                size={'large'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={() => setOpenSnackBar({ open: false })}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                    vertical={'bottom'}
                />
                : null}

            {openModal.open ?
                <ModalCamposFaltantes
                    openConfirmacion={openModal.open}
                    title={`Campos faltantes requeridos para pasar a ${openModal.data.estadoCEM === 2 ? 'INCOMPLETO' : 'COMPLETO'}`}
                    campos={camposFaltantes}
                    handleConfirmar={updateDenuncia}
                    handleVolver={() => setOpenModal({ open: false, tipo: '', data: [] })}
                />
            : null}

        </div>
    )
}

export default PantallaLesionLeve
