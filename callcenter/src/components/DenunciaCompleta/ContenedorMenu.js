import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Router:
import { useHistory } from 'react-router'
//Mui:
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
//Utils:
import { CAMPOS_REQUERIDOS_ERROR, GUARDAR_DENUNCIA_ERROR, GUARDAR_DENUNCIA_EXITO, 
    TEXTO_MODAL_CORTO_PUNZANTE, TEXTO_MODA_MULTIPLE10 } from '../../Utils/const'
//COmponents:
import MenuDenuncia from './MenuDenuncia'
import CabeceraCompleta from './cabeceraCompleta'
import CustomButton from '../commons/Button/CustomButton'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import CustomLoading from '../commons/Loading/CustomLoading'
import ModalCamposFaltantes from '../Form/ModalCamposFaltantes/ModalCamposFaltantes'
import CustomDialogo from '../commons/Dialogo/CustomDialogo'
import CustomTypography from '../commons/Typography/CustomTypography'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        height: '85vh'
    },
    content: {
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    }
})

const ContenedorMenuSiniestroCompleto = (props) => {
    const { usuarioActivo, esOperador, children,
        openMenuSiniestros, setOpenMenuSiniestros, 
        guardarContenedorAhora, setGuardarContenedorAhora, 
        dataSiniestroCompleto, setDataSiniestroCompleto,
        denuncia, denunciaBuscador, disableEdition, 
        justify, noHeader, showBotones, setId, id, setOpenBuscador } = props

    const classes = useStyles(props)
    const dispatchs = useDispatch()
    const history = useHistory()

    const [camposFaltantes, setCamposFaltantes] = useState([])
    const [estadoCemSucces, setEstadoCemSucces] = useState(null)
    const [idDenuncia, setIdDenuncia] = useState(null)
    const [idCausa, setIdCausa] = useState(null)
    const [tituloModal, setTituloModal] = useState({ open: false, titulo: '', texto: '' })
    const [openModal, setOpenModal] = useState({ open: false, tipo: '', data: [] })
    const [guardarSalir, setGuardarSalir] = useState(false)
    const [completado, setCompletado] = useState(false)
    
    const loadingUpdate = useSelector(state => state.documentos.loadingUpdate)
    const loadingCamposRequeridos = useSelector(state => state.documentos.loadingCamposRequeridos)
    const reduxDenunciaSnackBar = useSelector(state => state.documentos.reduxDenunciaSnackBar)
    
    useEffect(() => {
        if (history?.location?.state?.redireccion === undefined) {
            if ((denuncia && denuncia.idDenuncia) !== (dataSiniestroCompleto && dataSiniestroCompleto.idDenuncia)) {
                setDataSiniestroCompleto({})
            }
        }
    }, [denuncia, history])
    
    useEffect(() => {
        if(completado){
            if(guardarSalir){
                history.push('/home')
            }else{
                dispatchs(actions.setReduxDenunciaSnackBar({
                    open: true,
                    severity: 'success',
                    vertical: 'bottom',
                    title: GUARDAR_DENUNCIA_EXITO
                }))
                setCompletado(false)
            }
        }
    }, [completado, guardarSalir])

    //Genera una request para campos requeridos:
    const setRequestCamposRequeridos = () => {
        let response = {
            "estadoCEM": estadoCemSucces !== null ? estadoCemSucces : denuncia ? denuncia.estadoCEM : null,
            "riesgoMuerteIdRiesgoMuerte": denuncia && denuncia.riesgoMuerteIdRiesgoMuerte,
            "empleadorEsVIP": denuncia && denuncia.empleadorEsVIP,
            "denuncianteAutorizado": denuncia && denuncia.denuncianteAutorizado ? denuncia && denuncia.denuncianteAutorizado : null,
            "empleadorIdEmpleador": denuncia && denuncia.empleadorIdEmpleador ? denuncia.empleadorIdEmpleador : null,
            "esVerificadoSupervisor": denuncia ? denuncia.esVerificadoSupervisor : false,
            "preDenunciaIdPreDenuncia": denuncia ? denuncia.preDenunciaIdPreDenuncia : null,
            "siniestroOriginalIdDenuncia": denuncia && denuncia.siniestroOriginalIdDenuncia ? denuncia.siniestroOriginalIdDenuncia : null,
            "nroAsignadoOrigen": denuncia && denuncia.nroAsignadoOrigen ? denuncia.nroAsignadoOrigen : null,
            "nroAsignado": denuncia && denuncia.nroAsignado ? denuncia && denuncia.nroAsignado : null,
            "siniestroMultiple": dataSiniestroCompleto && dataSiniestroCompleto.siniestroMultiple ? dataSiniestroCompleto.siniestroMultiple.checked : denuncia.siniestroMultiple,
            "accidentado": {
                "idAccidentado": id ? id : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                "tipoDocumentoIdTipoDocumento": denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado && denuncia.accidentado.tipoDocumentoIdTipoDocumento !== null ? denuncia.accidentado.tipoDocumentoIdTipoDocumento : dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.tipoDocumento : denuncia && denuncia.accidentado ? denuncia.accidentado.tipoDocumentoIdTipoDocumento : 1,
                //DatosPersonales:
                "apellido": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.apellido : denuncia && denuncia.accidentado ? denuncia.accidentado.apellido : null,
                "nombre": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nombre : denuncia && denuncia.accidentado ? denuncia.accidentado.nombre : null,
                "sexo": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.sexo : denuncia && denuncia.accidentado ? denuncia.accidentado.sexo : null,
                "fechaNacimiento": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.fechaNacimiento : denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento : null,
                "nroDoc": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nroDoc : denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null,
                "nroCuil": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nroCuil : denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil : null,
                "estadoCivilIdEstadoCivil": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.estadoCivil : denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil : null,
                "nacionalidadCodigo": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nacionalidad : denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo : null,
                //DatosContactoCompleto:
                "email": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.email : denuncia && denuncia.accidentado ? denuncia.accidentado.email : null,
                "telefono": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.telefono : denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : null,
                "telefonoSecundario": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.telefonoSecundario : denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario : null,
                "codigoAreaCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.codigoAreaCelular : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular : null,
                "numeroCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.numeroCelular : denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular : null,
                "codigoPaisCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.codigoPaisCelular : denuncia && denuncia.accidentado && denuncia.accidentado.codigoPaisCelular ? `+${denuncia.accidentado.codigoPaisCelular}` : null,
                "whatsapp": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.whatsapp : denuncia && denuncia.accidentado && denuncia.accidentado.whatsapp ? denuncia.accidentado.whatsapp : false,
                //DatosDomicilioCompleto:
                "numero": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.numero : denuncia && denuncia.accidentado ? denuncia.accidentado.numero : null,
                "piso": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.piso : denuncia && denuncia.accidentado ? denuncia.accidentado.piso : null,
                "depto": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.depto : denuncia && denuncia.accidentado ? denuncia.accidentado.depto : null,
                "aclaraciones": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.aclaraciones : denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones : null,
                "calle": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.calle : denuncia && denuncia.accidentado && denuncia.accidentado.calle ? denuncia.accidentado.calle : null,
                "idCalleIdCalle": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.calleId : denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle : null,
                "ascensor": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.ascensor : denuncia && denuncia.accidentado && denuncia.accidentado.ascensor ? denuncia.accidentado.ascensor : false,
                "localidadIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.localidadIdLocalidad : denuncia && denuncia.accidentado && denuncia.accidentado.localidadIdLocalidad ? denuncia.accidentado.localidadIdLocalidad : null,
                "localidadProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.localidadProvinciaIdProvincia : denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaIdProvincia ? denuncia.accidentado.localidadProvinciaIdProvincia : null,
                "codigoPostalIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.codigoPostalIdCodigoPostal : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal : null,
            },
            //DataSeccionCentroMedico:
            "centroPrimerAsistencia": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && (dataSiniestroCompleto.dataSeccionCentroMedico.id !== null) ? {
                "id": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id,
                "centroMedico": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.centroMedico
            } : denuncia && denuncia.centroPrimerAsistencia !== null ? {
                "id": denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id,
                "centroMedico": denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.centroMedico
            } : null,
            //DatosCompletoGeneral:
            "fechaOcurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia : denuncia ? denuncia.fechaOcurrencia : null,
            "horaOcurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia : denuncia ? denuncia.horaOcurrencia : null,
            "relato": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.relato !== null ? dataSiniestroCompleto.datosCompletarGeneral.relato : denuncia ? denuncia.relato : null,
            "diagnosticoCie10Codigo": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID : denuncia && denuncia.diagnosticoCie10Codigo !== null ? denuncia.diagnosticoCie10Codigo : null,
            "estadoMedicoIdEstadoMedico": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico : denuncia && denuncia.estadoMedicoIdEstadoMedico !== null ? denuncia.estadoMedicoIdEstadoMedico : null,
            "tipoSiniestroIdTipoSiniestro": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro : denuncia && denuncia.tipoSiniestroIdTipoSiniestro ? denuncia && denuncia.tipoSiniestroIdTipoSiniestro : null,
            "diagnosticoDeCerteza": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza : denuncia && denuncia.diagnosticoDeCerteza !== null ? denuncia.diagnosticoDeCerteza : null,
            "reingreso": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idReingreso : denuncia && denuncia.reingreso ? denuncia.reingreso : false,
            "cortopunzante": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante : denuncia && denuncia.cortopunzante !== null ? denuncia.cortopunzante : null,
            "fechaPCR": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPCR : denuncia && denuncia.fechaPCR !== null ? denuncia.fechaPCR : null,
            "nroRoam": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.nroRoam : denuncia && denuncia.nroRoam !== null ? denuncia.nroRoam : null,
            "fechaBaja": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaBaja : denuncia && denuncia.fechaBaja !== null ? denuncia.fechaBaja : null,
            "fechaRecepcion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion : denuncia && denuncia.fechaRecepcion !== null ? denuncia.fechaRecepcion : null,
            "responsableIngreso": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso !== null ? dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso : denuncia && denuncia.responsableIngreso !== null ? denuncia.responsableIngreso : null,
            "asistenciaExterna": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.asistenciaExterna : denuncia && denuncia.asistenciaExterna !== null ? denuncia.asistenciaExterna : null,
            "patologiaTrazadoraIdPatologiaTrazadora": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idPatologiaTrazadora : denuncia && denuncia.patologiaTrazadoraIdPatologiaTrazadora !== null ? denuncia.patologiaTrazadoraIdPatologiaTrazadora : 0,
            "formaAccidenteIdFormaAccidente": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : denuncia && denuncia.formaAccidenteIdFormaAccidente !== null ? denuncia.formaAccidenteIdFormaAccidente : null,
            "zonaAfectadaIdZonaAfectada": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID : denuncia && denuncia.zonaAfectadaIdZonaAfectada !== null ? denuncia.zonaAfectadaIdZonaAfectada : null,
            "naturalezasSiniestroIdNaturalezaSiniestro": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID : denuncia && denuncia.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia.naturalezasSiniestroIdNaturalezaSiniestro : null,
            "agenteCausanteEpIdAgenteCausanteEp": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID : denuncia && denuncia.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia.agenteCausanteEpIdAgenteCausanteEp : null,
            "agenteMaterialAsociadoIdAgenteMaterialAsociado": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID : denuncia && denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
            "rechazadoPorArt": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.rechazadoPorArt : denuncia && denuncia.rechazadoPorArt ? denuncia.rechazadoPorArt : false,
            "siniestroMixto": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto : denuncia && denuncia.siniestroMixtoEmail ? denuncia.siniestroMixtoEmail.estado : false,
            "ameritaInvestigacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.ameritaInvestigacion : denuncia && denuncia.ameritaInvestigacionEmail ? denuncia.ameritaInvestigacionEmail.estado : false,
            "recibePrestacionesEnDomicilio": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.recibePrestacionesEnDomicilio : denuncia && denuncia.recibePrestacionesEnDomicilio ? denuncia.recibePrestacionesEnDomicilio : false,
            "esCortoPunzante": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante : denuncia && denuncia.esCortoPunzante ? denuncia.esCortoPunzante : false,
            "esSinBajaLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral : denuncia && denuncia.esSinBajaLaboral ? denuncia.esSinBajaLaboral : false,
            "validarDiagnostico": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.validarDiagnostico : denuncia && denuncia.validarDiagnostico ? denuncia.validarDiagnostico : false,
            "diagnosticoValidado": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoValidado : denuncia && denuncia.diagnosticoValidado ? denuncia.diagnosticoValidado : false,
            "fechaInternacionDesde": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionDesde : denuncia && denuncia.fechaInternacionDesde !== null ? denuncia.fechaInternacionDesde : null,
            "fechaInternacionHasta": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionHasta : denuncia && denuncia.fechaInternacionHasta !== null ? denuncia.fechaInternacionHasta : null,
            "tramitadorIdPersona": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.tramitadorIdPersona : denuncia && denuncia.tramitadorIdPersona !== null ? denuncia.tramitadorIdPersona : null,
            "auditorMedicoIdPersona": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.auditorMedicoIdPersona : denuncia && denuncia.auditorMedicoIdPersona !== null ? denuncia.auditorMedicoIdPersona : null,
            "dictamen": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.dictamen : denuncia && denuncia.dictamen ? denuncia.dictamen : false,
            "recibidoPorTelegrama": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.telegrama : denuncia && denuncia.recibidoPorTelegrama ? denuncia.recibidoPorTelegrama : false,
            "severidadDenunciaIdSeveridadDenuncia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.severidadDenunciaIdSeveridadDenuncia : denuncia && denuncia.severidadDenunciaIdSeveridadDenuncia !== null ? denuncia.severidadDenunciaIdSeveridadDenuncia : null,
            "estadoInternacionIdEstadoInternacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.estadoInternacionIdEstadoInternacion : denuncia && denuncia.estadoInternacionIdEstadoInternacion !== null ? denuncia.estadoInternacionIdEstadoInternacion : null,
            "fechaPrimeraManifestacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPrimeraManifestacion : denuncia && denuncia.fechaPrimeraManifestacion !== null ? denuncia.fechaPrimeraManifestacion : null,
            "denunciaCie10": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10 !== null && dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10[0] !== null ? dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10 : null,
            "idSiniestroIntercurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === false ? null : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === true ? dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro : denuncia && denuncia.idSiniestroIntercurrencia,
            "idSiniestroIntercurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === false ? null : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === true ? dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro : denuncia && denuncia.idSiniestroIntercurrencia,
            //DatosEmpleadoCompleto:
            "fechaIngresoLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.fechaIngreso : denuncia && denuncia.fechaIngresoLaboral !== null ? denuncia.fechaIngresoLaboral : null,
            "horarioLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.horarioLaboral : denuncia && denuncia.horarioLaboral !== null ? denuncia.horarioLaboral : null,
            "telefonoLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.telefonoLaboral : denuncia && denuncia.telefonoLaboral !== null ? denuncia.telefonoLaboral : null,
            "tareaDuranteAccidenteIdOcupacion": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idTareaAccidente : denuncia && denuncia.tareaDuranteAccidenteIdOcupacion !== null ? denuncia.tareaDuranteAccidenteIdOcupacion : denunciaBuscador && denunciaBuscador.tareaDuranteAccidenteIdOcupacion ? denunciaBuscador.tareaDuranteAccidenteIdOcupacion : null,
            "ocupacionIdOcupacion": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idOcupacion : denuncia && denuncia.ocupacionIdOcupacion !== null ? denuncia.ocupacionIdOcupacion : denunciaBuscador && denunciaBuscador.ocupacionIdOcupacion ? denunciaBuscador.ocupacionIdOcupacion : null,
            "idModalidadTrabajo": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idModalidadTrabajo : denuncia && denuncia.idModalidadTrabajo !== null ? denuncia.idModalidadTrabajo : denunciaBuscador && denunciaBuscador.idModalidadTrabajo ? denunciaBuscador.idModalidadTrabajo : null,
            "franquero": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.franquero : denuncia && denuncia.franquero ? denuncia.franquero : false,
            //DatosLugarAccidente:
            "circunstanciaItinereIdCircunstancia": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.circunstanciaItinereIdCircunstancia : denuncia && denuncia.circunstanciaItinereIdCircunstancia ? denuncia.circunstanciaItinereIdCircunstancia : null,
            "lugarAccidenteIdLugarAccidente": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.lugardeAccidente : denuncia && denuncia.lugarAccidenteIdLugarAccidente ? denuncia.lugarAccidenteIdLugarAccidente : 0, 
            "localidadItinereIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.localidadItinereIdLocalidad : denuncia && denuncia.localidadItinereIdLocalidad ? denuncia.localidadItinereIdLocalidad : null, 
            "localidadItinereProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.localidadItinereProvinciaIdProvincia : denuncia && denuncia.localidadItinereProvinciaIdProvincia ? denuncia.localidadItinereProvinciaIdProvincia : null, 
            "calleOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.calleOcurrenciaItinere : denuncia && denuncia.calleOcurrenciaItinere ? denuncia.calleOcurrenciaItinere : null, 
            "idCalleOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.calleId : denuncia && denuncia.idCalleOcurrenciaItinere ? denuncia.idCalleOcurrenciaItinere : null,
            "numeroOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.numeroOcurrenciaItinere : denuncia && denuncia.numeroOcurrenciaItinere ? denuncia.numeroOcurrenciaItinere : 0,
            "codigoPostalItinereIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.codigoPostalItinereIdCodigoPostal : denuncia && denuncia.codigoPostalItinereIdCodigoPostal ? denuncia.codigoPostalItinereIdCodigoPostal : null,
            //DatosSedeLaboral:
            "tipoSede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede && dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede.idTipoSede ? dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede 
                : denuncia && denuncia.tipoSede && denuncia.tipoSede && denuncia.tipoSede.idTipoSede ? denuncia.tipoSede 
                : null,
            "sede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto.idSede ? {
                "idSede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idSede : null,
                "nombre": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.sede : null,
                "direccion": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.direccion : null,
                "nro": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.nroCalle : null,
                "localidadesIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idLocalidad : null,
                "localidadesProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idProvincia : null,
                "codigoPostalIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idCodigoPostal : null,
            } : denuncia && denuncia.sede && denuncia.sede.idSede ? denuncia.sede : null,
        }
        return response            
    }

    //Genera una request para guardar la denuncia:
    const setRequestUpdate = () => {
        let response = {
            "idDenuncia": idDenuncia ? idDenuncia : denuncia ? denuncia.idDenuncia : null,
            "idOperador": usuarioActivo.id,
            "denuncia": {
                "estadoCEM": estadoCemSucces !== null ? estadoCemSucces : denuncia ? denuncia.estadoCEM : null,
                "riesgoMuerteIdRiesgoMuerte": denuncia && denuncia.riesgoMuerteIdRiesgoMuerte,
                "empleadorEsVIP": denuncia && denuncia.empleadorEsVIP,
                "denuncianteAutorizado": denuncia && denuncia.denuncianteAutorizado ? denuncia && denuncia.denuncianteAutorizado : null,
                "empleadorIdEmpleador": denuncia && denuncia.empleadorIdEmpleador ? denuncia.empleadorIdEmpleador : null,
                "esVerificadoSupervisor": denuncia ? denuncia.esVerificadoSupervisor : false,
                "preDenunciaIdPreDenuncia": denuncia ? denuncia.preDenunciaIdPreDenuncia : null,
                "siniestroOriginalIdDenuncia": denuncia && denuncia.siniestroOriginalIdDenuncia ? denuncia.siniestroOriginalIdDenuncia : null,
                "siniestroMultiple": dataSiniestroCompleto && dataSiniestroCompleto.siniestroMultiple ? dataSiniestroCompleto.siniestroMultiple.checked : denuncia.siniestroMultiple,
                "nroAsignadoOrigen": denuncia && denuncia.nroAsignadoOrigen ? denuncia.nroAsignadoOrigen : null,
                "nroAsignado": denuncia && denuncia.nroAsignado ? denuncia && denuncia.nroAsignado : null,
                "accidentado": {
                    "idAccidentado": id ? id : denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado ? denuncia.accidentado.idAccidentado : null,
                    "tipoDocumentoIdTipoDocumento": denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado && denuncia.accidentado.tipoDocumentoIdTipoDocumento !== null ? denuncia.accidentado.tipoDocumentoIdTipoDocumento : dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.tipoDocumento : denuncia && denuncia.accidentado ? denuncia.accidentado.tipoDocumentoIdTipoDocumento : 1,
                    //DatosPersonales:
                    "apellido": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.apellido : denuncia && denuncia.accidentado ? denuncia.accidentado.apellido : null,
                    "nombre": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nombre : denuncia && denuncia.accidentado ? denuncia.accidentado.nombre : null,
                    "sexo": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.sexo : denuncia && denuncia.accidentado ? denuncia.accidentado.sexo : null,
                    "fechaNacimiento": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.fechaNacimiento : denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento : null,
                    "nroDoc": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nroDoc : denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null,
                    "nroCuil": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nroCuil : denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil : null,
                    "estadoCivilIdEstadoCivil": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.estadoCivil : denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil : null,
                    "nacionalidadCodigo": dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales.nacionalidad : denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo : null,
                    //DatosDomicilioCompleto:
                    "numero": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.numero : denuncia && denuncia.accidentado ? denuncia.accidentado.numero : null,
                    "piso": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.piso : denuncia && denuncia.accidentado ? denuncia.accidentado.piso : null,
                    "depto": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.depto : denuncia && denuncia.accidentado ? denuncia.accidentado.depto : null,
                    "aclaraciones": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.aclaraciones : denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones : null,
                    "calle": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.calle : denuncia && denuncia.accidentado && denuncia.accidentado.calle ? denuncia.accidentado.calle : null,
                    "idCalleIdCalle": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.calleId : denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle : null,
                    "ascensor": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.ascensor : denuncia && denuncia.accidentado && denuncia.accidentado.ascensor ? denuncia.accidentado.ascensor : false,
                    "localidadIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.localidadIdLocalidad : denuncia && denuncia.accidentado && denuncia.accidentado.localidadIdLocalidad ? denuncia.accidentado.localidadIdLocalidad : null,
                    "localidadProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.localidadProvinciaIdProvincia : denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaIdProvincia ? denuncia.accidentado.localidadProvinciaIdProvincia : null,
                    "codigoPostalIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.codigoPostalIdCodigoPostal : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal : null,
                    "latitudMaps": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.latitud : denuncia && denuncia.accidentado ? denuncia.accidentado.latitudMaps : null,
                    "longitudMaps": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.longitud : denuncia && denuncia.accidentado ? denuncia.accidentado.longitudMaps : null,
                    "ubicacionRegistrada": dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto.ubicacionRegistrada : denuncia && denuncia.accidentado ? denuncia.accidentado.ubicacionRegistrada : null,
                    //DatosContactoCompleto:
                    "email": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.email : denuncia && denuncia.accidentado ? denuncia.accidentado.email : null,
                    "telefono": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.telefono : denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : null,
                    "telefonoSecundario": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.telefonoSecundario : denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario : null,
                    "codigoAreaCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.codigoAreaCelular : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular : null,
                    "numeroCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.numeroCelular : denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular : null,
                    "codigoPaisCelular": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.codigoPaisCelular : denuncia && denuncia.accidentado && denuncia.accidentado.codigoPaisCelular ? `+${denuncia.accidentado.codigoPaisCelular}` : null,
                    "whatsapp": dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto.whatsapp : denuncia && denuncia.accidentado && denuncia.accidentado.whatsapp ? denuncia.accidentado.whatsapp : false,
                },
                //DatosCentroMedico:
                "centroPrimerAsistencia": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && (dataSiniestroCompleto.dataSeccionCentroMedico.id !== null) ? {
                    "id": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id,
                    "centroMedico": dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.centroMedico
                } : denuncia && denuncia.centroPrimerAsistencia !== null ? {
                    "id": denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id,
                    "centroMedico": denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.centroMedico
                } : null,
                //DatosCompletoGeneral:
                "fechaOcurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia : denuncia ? denuncia.fechaOcurrencia : null,
                "horaOcurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia !== null ? dataSiniestroCompleto.datosCompletarGeneral.horaOcurrencia : denuncia ? denuncia.horaOcurrencia : null,
                "relato": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.relato !== null ? dataSiniestroCompleto.datosCompletarGeneral.relato : denuncia ? denuncia.relato : null,
                "diagnosticoCie10Codigo": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID : denuncia && denuncia.diagnosticoCie10Codigo !== null ? denuncia.diagnosticoCie10Codigo : null,
                "estadoMedicoIdEstadoMedico": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.estadoMedicoIdEstadoMedico : denuncia && denuncia.estadoMedicoIdEstadoMedico !== null ? denuncia.estadoMedicoIdEstadoMedico : null,
                "tipoSiniestroIdTipoSiniestro": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro !== null ? dataSiniestroCompleto.datosCompletarGeneral.tipoSiniestroIdTipoSiniestro : denuncia && denuncia.tipoSiniestroIdTipoSiniestro ? denuncia && denuncia.tipoSiniestroIdTipoSiniestro : null,
                "diagnosticoDeCerteza": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoDeCerteza : denuncia && denuncia.diagnosticoDeCerteza !== null ? denuncia.diagnosticoDeCerteza : null,
                "reingreso": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idReingreso : denuncia && denuncia.reingreso ? denuncia.reingreso : false,
                "cortopunzante": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante : denuncia && denuncia.cortopunzante !== null ? denuncia.cortopunzante : null,
                "fechaPCR": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPCR : denuncia && denuncia.fechaPCR !== null ? denuncia.fechaPCR : null,
                "nroRoam": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.nroRoam : denuncia && denuncia.nroRoam !== null ? denuncia.nroRoam : null,
                "fechaBaja": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaBaja : denuncia && denuncia.fechaBaja !== null ? denuncia.fechaBaja : null,
                "fechaRecepcion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion !== null ? dataSiniestroCompleto.datosCompletarGeneral.fechaRecepcion : denuncia && denuncia.fechaRecepcion !== null ? denuncia.fechaRecepcion : null,
                "responsableIngreso": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso !== null ? dataSiniestroCompleto.datosCompletarGeneral.responsableIngreso : denuncia && denuncia.responsableIngreso !== null ? denuncia.responsableIngreso : null,
                "patologiaTrazadoraIdPatologiaTrazadora": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.idPatologiaTrazadora : denuncia && denuncia.patologiaTrazadoraIdPatologiaTrazadora !== null ? denuncia.patologiaTrazadoraIdPatologiaTrazadora : 0,
                "formaAccidenteIdFormaAccidente": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.formaAccidente : denuncia && denuncia.formaAccidenteIdFormaAccidente !== null ? denuncia.formaAccidenteIdFormaAccidente : null,
                "zonaAfectadaIdZonaAfectada": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID : denuncia && denuncia.zonaAfectadaIdZonaAfectada !== null ? denuncia.zonaAfectadaIdZonaAfectada : null,
                "naturalezasSiniestroIdNaturalezaSiniestro": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID : denuncia && denuncia.naturalezasSiniestroIdNaturalezaSiniestro !== null ? denuncia.naturalezasSiniestroIdNaturalezaSiniestro : null,
                "agenteCausanteEpIdAgenteCausanteEp": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteCausanteEpID : denuncia && denuncia.agenteCausanteEpIdAgenteCausanteEp !== null ? denuncia.agenteCausanteEpIdAgenteCausanteEp : null,
                "agenteMaterialAsociadoIdAgenteMaterialAsociado": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.agenteMaterialAsociadoID : denuncia && denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado !== null ? denuncia.agenteMaterialAsociadoIdAgenteMaterialAsociado : null,
                "rechazadoPorArt": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.rechazadoPorArt : denuncia && denuncia.rechazadoPorArt ? denuncia.rechazadoPorArt : false,
                "siniestroMixto": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.siniestroMixto : denuncia && denuncia.siniestroMixtoEmail ? denuncia.siniestroMixtoEmail.estado : false,
                "ameritaInvestigacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.ameritaInvestigacion : denuncia && denuncia.ameritaInvestigacionEmail ? denuncia.ameritaInvestigacionEmail.estado : false,
                "recibePrestacionesEnDomicilio": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.recibePrestacionesEnDomicilio : denuncia && denuncia.recibePrestacionesEnDomicilio ? denuncia.recibePrestacionesEnDomicilio : false,
                "esCortoPunzante": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.esCortoPunzante : denuncia && denuncia.esCortoPunzante ? denuncia.esCortoPunzante : false,
                "esSinBajaLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.esSinBajaLaboral : denuncia && denuncia.esSinBajaLaboral ? denuncia.esSinBajaLaboral : false,
                "validarDiagnostico": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.validarDiagnostico : denuncia && denuncia.validarDiagnostico ? denuncia.validarDiagnostico : false,
                "asistenciaExterna": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.asistenciaExterna : denuncia && denuncia.asistenciaExterna !== null ? denuncia.asistenciaExterna : null,
                "diagnosticoValidado": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoValidado : denuncia && denuncia.diagnosticoValidado ? denuncia.diagnosticoValidado : false,
                "fechaInternacionDesde": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionDesde : denuncia && denuncia.fechaInternacionDesde !== null ? denuncia.fechaInternacionDesde : null,
                "fechaInternacionHasta": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaInternacionHasta : denuncia && denuncia.fechaInternacionHasta !== null ? denuncia.fechaInternacionHasta : null,
                "tramitadorIdPersona": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.tramitadorIdPersona : denuncia && denuncia.tramitadorIdPersona !== null ? denuncia.tramitadorIdPersona : null,
                "auditorMedicoIdPersona": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.auditorMedicoIdPersona : denuncia && denuncia.auditorMedicoIdPersona !== null ? denuncia.auditorMedicoIdPersona : null,
                "dictamen": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.dictamen : denuncia && denuncia.dictamen ? denuncia.dictamen : false,
                "recibidoPorTelegrama": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.telegrama : denuncia && denuncia.recibidoPorTelegrama ? denuncia.recibidoPorTelegrama : false,
                "severidadDenunciaIdSeveridadDenuncia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.severidadDenunciaIdSeveridadDenuncia : denuncia && denuncia.severidadDenunciaIdSeveridadDenuncia !== null ? denuncia.severidadDenunciaIdSeveridadDenuncia : null,
                "estadoInternacionIdEstadoInternacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.estadoInternacionIdEstadoInternacion : denuncia && denuncia.estadoInternacionIdEstadoInternacion !== null ? denuncia.estadoInternacionIdEstadoInternacion : null,
                "fechaPrimeraManifestacion": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral ? dataSiniestroCompleto.datosCompletarGeneral.fechaPrimeraManifestacion : denuncia && denuncia.fechaPrimeraManifestacion !== null ? denuncia.fechaPrimeraManifestacion : null,
                "denunciaCie10": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10 !== null && dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10[0] !== null ? dataSiniestroCompleto.datosCompletarGeneral.denunciaMultiple10 : null,
                "idSiniestroIntercurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === false ? null : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === true ? dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro : denuncia && denuncia.idSiniestroIntercurrencia,
                "idSiniestroIntercurrencia": dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === false ? null : dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.idIntercurrencia === true ? dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.intercurrenciaIdSiniestro : denuncia && denuncia.idSiniestroIntercurrencia,
                //DatosEmpleadoCompleto:
                "fechaIngresoLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.fechaIngreso : denuncia && denuncia.fechaIngresoLaboral !== null ? denuncia.fechaIngresoLaboral : null,
                "horarioLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.horarioLaboral : denuncia && denuncia.horarioLaboral !== null ? denuncia.horarioLaboral : null,
                "telefonoLaboral": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.telefonoLaboral : denuncia && denuncia.telefonoLaboral !== null ? denuncia.telefonoLaboral : null,
                "tareaDuranteAccidenteIdOcupacion": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idTareaAccidente : denuncia && denuncia.tareaDuranteAccidenteIdOcupacion !== null ? denuncia.tareaDuranteAccidenteIdOcupacion : denunciaBuscador && denunciaBuscador.tareaDuranteAccidenteIdOcupacion ? denunciaBuscador.tareaDuranteAccidenteIdOcupacion : null,
                "ocupacionIdOcupacion": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idOcupacion : denuncia && denuncia.ocupacionIdOcupacion !== null ? denuncia.ocupacionIdOcupacion : denunciaBuscador && denunciaBuscador.ocupacionIdOcupacion ? denunciaBuscador.ocupacionIdOcupacion : null,
                "idModalidadTrabajo": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.idModalidadTrabajo : denuncia && denuncia.idModalidadTrabajo !== null ? denuncia.idModalidadTrabajo : denunciaBuscador && denunciaBuscador.idModalidadTrabajo ? denunciaBuscador.idModalidadTrabajo : null,
                "franquero": dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto.franquero : denuncia && denuncia.franquero ? denuncia.franquero : false,
                //DatosLugarAccidente:
                "circunstanciaItinereIdCircunstancia": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.circunstanciaItinereIdCircunstancia : denuncia && denuncia.circunstanciaItinereIdCircunstancia ? denuncia.circunstanciaItinereIdCircunstancia : null,
                "lugarAccidenteIdLugarAccidente": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.lugardeAccidente : denuncia && denuncia.lugarAccidenteIdLugarAccidente ? denuncia.lugarAccidenteIdLugarAccidente : 0, 
                "localidadItinereIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.localidadItinereIdLocalidad : denuncia && denuncia.localidadItinereIdLocalidad ? denuncia.localidadItinereIdLocalidad : null, 
                "localidadItinereProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.localidadItinereProvinciaIdProvincia : denuncia && denuncia.localidadItinereProvinciaIdProvincia ? denuncia.localidadItinereProvinciaIdProvincia : null, 
                "calleOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.calleOcurrenciaItinere : denuncia && denuncia.calleOcurrenciaItinere ? denuncia.calleOcurrenciaItinere : null, 
                "idCalleOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.calleId : denuncia && denuncia.idCalleOcurrenciaItinere ? denuncia.idCalleOcurrenciaItinere : null,
                "numeroOcurrenciaItinere": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.numeroOcurrenciaItinere : denuncia && denuncia.numeroOcurrenciaItinere ? denuncia.numeroOcurrenciaItinere : 0,
                "codigoPostalItinereIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto.codigoPostalItinereIdCodigoPostal : denuncia && denuncia.codigoPostalItinereIdCodigoPostal ? denuncia.codigoPostalItinereIdCodigoPostal : null,
                //DatosSedeLaboral:
                "tipoSede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede && dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede.idTipoSede ? dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede 
                    : denuncia && denuncia.tipoSede && denuncia.tipoSede && denuncia.tipoSede.idTipoSede ? denuncia.tipoSede 
                    : null,
                "sede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto.idSede ? {
                    "idSede": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idSede : null,
                    "nombre": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.sede : null,
                    "direccion": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.direccion : null,
                    "nro": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.nroCalle : null,
                    "localidadesIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idLocalidad : null,
                    "localidadesProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idProvincia : null,
                    "codigoPostalIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idCodigoPostal : null,
                } : denuncia && denuncia.sede && denuncia.sede.idSede ? denuncia.sede : null,
            }
        }
        return response
    }

    //Handle Cancelar:
    const handleCancelar = () => {
        dispatchs(actions.setPresentaCovid(null))
        history.push('/home')
        setDataSiniestroCompleto({})
    }

    //Handle Guardar:
    const handleGuardar = (tipo) => {
        setCompletado(false)
        if (tipo === 'salir') setGuardarSalir(true)
        else setGuardarSalir(false)
        
        setGuardarContenedorAhora(true)
        
        if (dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral
            && (dataSiniestroCompleto.datosCompletarGeneral.multipleCie10Valido === false
                || (dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante
                    && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaPedido === null))){

            if (dataSiniestroCompleto.datosCompletarGeneral.multipleCie10Valido === false && (dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaPedido === null)) {
                setTituloModal({
                    open: true,
                    titulo:
                        <CustomTypography
                            text={<strong>Datos Requeridos: MultipleCie10 - Alarma CORTO PUNZANTE</strong>}
                            variant='subtitle1'
                        />,
                    texto:
                        <div>
                            <div style={{ paddingBottom: '20px' }}>
                                <CustomTypography variant='subtitle1' text={TEXTO_MODA_MULTIPLE10} />
                            </div>
                            <div>
                                <CustomTypography variant='subtitle1' text={TEXTO_MODAL_CORTO_PUNZANTE} />
                            </div>
                        </div>
                })
            } else if (dataSiniestroCompleto.datosCompletarGeneral.multipleCie10Valido === false) {
                setTituloModal({
                    open: true,
                    titulo: <CustomTypography text={<strong>Datos Requeridos: MultipleCie10 </strong>} variant='subtitle1' />,
                    texto: <CustomTypography variant='subtitle1' text={TEXTO_MODA_MULTIPLE10} />
                })
            } else if (dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante && dataSiniestroCompleto.datosCompletarGeneral.cortoPunzante.horaPedido === null) {
                setTituloModal({
                    open: true,
                    titulo: <CustomTypography text={<strong>Datos Requeridos: Alarma CORTO PUNZANTE</strong>} variant='subtitle1' />,
                    texto: <CustomTypography variant='subtitle1' text={TEXTO_MODAL_CORTO_PUNZANTE} />
                })
            }
        } else {
            let requestCamposRequeridos = setRequestCamposRequeridos()
            dispatchs(actions.camposRequeridosDenuncia(requestCamposRequeridos, callBackCamposRequeridos))
        }
    }

    //Callback Campos Requeridos:
    const callBackCamposRequeridos = (success, data) => {
        if (success) {
            let camposFaltantes = data && data.camposFaltantes
            if(dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto 
                    && dataSiniestroCompleto.datosSedeLaboralCompleto.openNuevaSede 
                    && camposFaltantes && camposFaltantes.length > 0){
                camposFaltantes = camposFaltantes.filter(it=>it.nombre !== 'sedeIdSede')
            }
            if (camposFaltantes === null || camposFaltantes.length === 0) {
                handleModalAceptar()
            } else {
                setCamposFaltantes(camposFaltantes)
                setOpenModal({ ...openModal, open: true, data: data && data })
            }
        } else {
            dispatchs(actions.setReduxDenunciaSnackBar({
                open: true,
                severity: 'error',
                vertical: 'top',
                title: CAMPOS_REQUERIDOS_ERROR
            }))
        }
    }

    //CallBack Nueva Sede:
    const callBackSaveNuevaSede = (success, idSede) => {
        if (success) {
            setDataSiniestroCompleto({
                ...dataSiniestroCompleto,
                'datosSedeLaboralCompleto': {
                    ...dataSiniestroCompleto.datosSedeLaboralCompleto,
                    'idSede': idSede,
                    'openNuevaSede': false
                }
            }) 
            let requestUpdate = setRequestUpdate()
            requestUpdate = {
                ...requestUpdate,
                'denuncia':{
                    ...requestUpdate.denuncia,
                    'sede': {
                        'idSede': idSede,
                        "nombre": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.sede : null,
                        "direccion": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.direccion : null,
                        "nro": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.nroCalle : null, 
                        "localidadesIdLocalidad": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idLocalidad : null,
                        "localidadesProvinciaIdProvincia": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idProvincia : null,
                        "codigoPostalIdCodigoPostal": dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idCodigoPostal : null
                    }
                }
            }
            dispatchs(actions.updateDenuncia(requestUpdate, callBackUpdateDenuncia))
        }
    }

    //Modal Cancelar:
    const handleVolver = () => {
        setGuardarSalir(false)
        setOpenModal({ open: false, tipo: '', data: [] })
    }

    //Modal Aceptar:
    const handleModalAceptar = () => {
        if (dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto.openNuevaSede) {
            let requestNuevaSede = {
                'idTipoSede': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.tipoSede.idTipoSede : null,
                'direccion': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.direccion : null,
                'nro': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.nroCalle : null,
                'localidadesIdLocalidad': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idLocalidad : null,
                'codigoPostalIdCodigoPostal': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.idCodigoPostal : null,
                'nombre': dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto.sede : null,
                'localidadesProvinciaIdProvincia': null,
            }
            dispatchs(actions.guardarNuevaSede(requestNuevaSede, callBackSaveNuevaSede))
        } else {
            let requestUpdate = setRequestUpdate()
            dispatchs(actions.updateDenuncia(requestUpdate, callBackUpdateDenuncia))
        }
        setOpenModal(data => ({ ...data, open: false }))
    }

    //CallBack Update Denuncia:
    const callBackUpdateDenuncia = (succes, tipo, data) => {
        if (succes) {
            dispatchs(actions.setPresentaCovid(null))
            if (guardarSalir) {
                setDataSiniestroCompleto({})
                history.push('/home')
            } else {
                let id2 = data && data.idAccidentado
                let estadoCem = data && data.estadoCEM
                let idDenuncia2 = data && data.idDenuncia
                setEstadoCemSucces(estadoCem)
                setDataSiniestroCompleto({})
                if(setId){
                    setId(id2)
                }
                setIdDenuncia(idDenuncia2)
                dispatchs(actions.searchDenunciaById(idDenuncia2, estadoCem, callBackSearchDenunciaById))
                setCompletado(true)
            }
        } else {
            dispatchs(actions.setReduxDenunciaSnackBar({
                open: true,
                severity: 'error',
                vertical: 'top',
                title: GUARDAR_DENUNCIA_ERROR
            }))
        }
    }

    //Callback Search Denuncia x Id:
    const callBackSearchDenunciaById = (succes) => {
        if (!succes) {
            dispatchs(actions.setReduxDenunciaSnackBar({
                open: true,
                severity: 'error',
                vertical: 'top',
                title: GUARDAR_DENUNCIA_ERROR
            }))
        }
    }

    //Aceptar Diálogo:
    const handleAceptarDialogo = () => {
        setTituloModal({
            open: false,
            titulo: 'MultipleCie10 - Alarma CORTO PUNZANTE',
            texto: `${TEXTO_MODA_MULTIPLE10} - ${TEXTO_MODAL_CORTO_PUNZANTE}`
        })
    }

    return (
        <div className={classes.root} >

            <MenuDenuncia />

            <main className={classes.content} >

                <div>
                    <Grid container alignItems='center' alignContent={'flex-end'} justify={justify} spacing={2}>
                        {!noHeader ?
                            <Grid item xs={12}>
                                <CabeceraCompleta
                                    dataSiniestroCompleto={dataSiniestroCompleto}
                                    setDataSiniestroCompleto={setDataSiniestroCompleto}
                                    denuncia={denuncia}
                                    esOperador={esOperador}
                                    idCausa={idCausa} setIdCausa={setIdCausa}
                                    usuarioActivo={usuarioActivo}
                                    disableEdition={disableEdition}
                                    setOpenBuscador={setOpenBuscador}
                                />
                            </Grid>
                        : null}
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </div>

                <CustomLoading loading={loadingUpdate || loadingCamposRequeridos} />

                {showBotones === false || disableEdition ?
                    null
                :
                    <div style={{ marginTop: '10px', marginRight: '30px' }}>
                        <Grid item xs={12} container spacing={2} justify='flex-end'>
                            <Grid item >
                                <CustomButton
                                    isAction={true}
                                    label={'Cancelar'}
                                    onClik={handleCancelar}
                                    size={'large'}
                                />
                            </Grid>
                            <Grid item >
                                <CustomButton
                                    isAction={true}
                                    label={'Grabar y Salir'}
                                    variant={'outlined'}
                                    onClik={() => handleGuardar('salir')}
                                    size={'large'}
                                />
                            </Grid>
                            <Grid item >
                                <CustomButton
                                    isAction={true}
                                    label={'Guardar Cambios'}
                                    variant={'contained'}
                                    color={'primary'}
                                    onClik={() => handleGuardar('quedarse')}
                                    size={'large'}
                                />
                            </Grid>
                        </Grid>
                    </div>
                }

            </main>

            {reduxDenunciaSnackBar.open ?
                <CustomSnackBar
                    handleClose={() => dispatchs(actions.setReduxDenunciaSnackBar({ open: false }))}
                    open={reduxDenunciaSnackBar.open}
                    title={reduxDenunciaSnackBar.title}
                    severity={reduxDenunciaSnackBar.severity}
                    vertical={reduxDenunciaSnackBar.vertical ?? 'bottom'}
                />
                : null}

            {openModal.open ?
                <ModalCamposFaltantes
                    openConfirmacion={openModal.open}
                    title={`Campos faltantes requeridos para pasar a ${denuncia.estadoCEM === 2 ? 'INCOMPLETO' : 'COMPLETO'}`}
                    campos={camposFaltantes}
                    handleConfirmar={handleModalAceptar}
                    handleVolver={handleVolver}
                />
            : null}

            {tituloModal && tituloModal.open ?
                <CustomDialogo
                    openDialogo={tituloModal && tituloModal.open}
                    handleAceptar={handleAceptarDialogo}
                    titulo={tituloModal.titulo}
                    texto={tituloModal.texto}
                    dialogoOk={true}
                />
                : null}

        </div>
    )
}

ContenedorMenuSiniestroCompleto.propTypes = {
    children: PropTypes.any,
    openMenuSiniestros: PropTypes.any,
    setOpenMenuSiniestros: PropTypes.any,
    justify: PropTypes.any,
    denuncia: PropTypes.any,
    completo: PropTypes.any,
    usuarioActivo: PropTypes.object
}

export default ContenedorMenuSiniestroCompleto