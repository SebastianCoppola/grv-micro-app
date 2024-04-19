import { useEffect, useState } from 'react'
//Material:
import { Grid, makeStyles, CircularProgress } from '@material-ui/core'
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'
import AuditoriaBox from './Contenido/AuditoriaBox'
import DatosDenunciaBox from './Contenido/DatosDenunciaBox'
import ExcedentesIltBox from './Contenido/ExcedentesIltBox'
import IndicacionesBox from './Contenido/IndicacionesBox'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/'
// import Loader from '../../../../commons/Loading/Loader'
import Loader from '../../../../commons/Loading/CustomLoading'
import { setGuardarDatosAuditoria } from '../../../../../redux/actions/auditoriaMedica'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    contenedor: {
        border: '1px solid #d3d3d3',
        borderRadius: '10px',
        margin: '10px 20px',
        padding: '10px 20px',
    }
})

const DatosGenerales = ({ denuncia }) => {

    const classes = useStyles()
    //Redux:
    const dispatch = useDispatch()
    // const datosDenunciaAuditoria = useSelector(state => state.auditoriaMedica.datosDenunciaAuditoria)
    const loadingDatosDenunciaAuditoria = useSelector(state => state.documentos.loadingDenuncia)
    //Request:
    const [request, setRequest] = useState({
        "idDenuncia": denuncia.idDenuncia,
        "fechaProxContactoAM": denuncia.fechaProxContactoAM,
        "observacionProxContactoAM": denuncia.observacionProxContactoAM,
        "patologiaInculpable": denuncia.patologiaInculpable,
        "idRegionPatologia": denuncia.idRegionPatologia,
        "patologia": denuncia.patologia,
        "alarmaEstudiosPendientes": denuncia.alarmaEstudiosPendientes,
        "fechaAlarmaEstudiosPendientes": denuncia.fechaAlarmaEstudiosPendientes,
        "suspendido": denuncia.suspendido,
        "dictamen": denuncia.dictamen,
        "rechazadoART": denuncia.rechazadoPorArt,
        "codigoDiagnosticoCie10": denuncia.diagnosticoCie10Codigo,
        "diagnosticoCie10": denuncia.diagnosticoCie10Descripcion,
        "idSeveridad": denuncia.idSeveridad,
        "multipleCie10": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0,
        "diagnosticoCie102": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].descripcionCodigoCie10 : null,
        "codigoDiagnosticoCie102": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].codigoCie10 : null,
        "naturalezaSiniestro2": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].descripcionNaturalezaLesion : null,
        "idNaturalezaSiniestro2": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].naturalezaLesion : null,
        "zonaAfectada2": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].descripcionZonaAfectada : null,
        "idZonaAfectada2": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 0 
                        ? denuncia.denunciaCie10[0].zonaAfectada : null,
        "diagnosticoCie103": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].descripcionCodigoCie10 : null,
        "codigoDiagnosticoCie103": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].codigoCie10 : null,
        "naturalezaSiniestro3": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].descripcionNaturalezaLesion : null,
        "idNaturalezaSiniestro3": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].naturalezaLesion : null,
        "zonaAfectada3": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].descripcionZonaAfectada : null,
        "idZonaAfectada3": denuncia.denunciaCie10 && denuncia.denunciaCie10.length > 1 
                        ? denuncia.denunciaCie10[1].zonaAfectada : null,
        "diagnosticoCerteza": denuncia.diagnosticoDeCerteza,
        "idSeveridadDenuncia": denuncia.severidadDenunciaIdSeveridadDenuncia,
        "incapacidadPresunta": denuncia.incapacidadPresunta,
        "porcentajeIncapacidad": denuncia.porcentajeIncapacidad,
        "incapacidad": denuncia.incapacidad,
        "comunicacionReconocimientoMedico": denuncia.comunicacionReconocimientoMedico,
        "relatoSiniestro": denuncia.relato,
        "excedenteILTRevisado": denuncia.excedenteILTRevisado,
        "idRazonExcedenteILT": denuncia.idRazonExcedenteILT,
        "idSubCausa": denuncia.idSubCausa,
        "observacionExcedenteILT": denuncia.observacionExcedenteILT,
    })

    //History
    const history = useHistory()

    //Form:


    //Callback para cuando se trae datos de la denuncia
    let errorCallback = (bool) => {
        if (!bool) {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                vertical: 'top',
                severity: 'error',
                message: 'Ocurrió un error al intentar cargar los datos de la denuncia.'
            }))
        }
    }

    //Callback para guardar datos para guardar Normal
    let cb = bool => {
        if (bool) {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: "success",
                message: "Cambios GUARDADOS"
            }))
            dispatch(actions.searchDenunciaById(denuncia && denuncia.idDenuncia, denuncia && denuncia.estadoCEM, errorCallback))
        } else {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: "error",
                message: "Error al guardar cambios"
            }))
        }
    }

    //Handle Guardar Datos Normal
    let handleGuardarDatos = () => {
        if (request && request.idDenuncia) {
            dispatch(setGuardarDatosAuditoria(request, cb))
        }
    }

    const validarDatos = () => {
        if (request && request.diagnosticoCerteza && request.diagnosticoCie10 && request.idSeveridadDenuncia && request.idSeveridad) {
            if(request.excedenteILTRevisado && !request.idRazonExcedenteILT){
                return false
            }else if(request.multipleCie10){
                if(!request.zonaAfectada2 || !request.zonaAfectada3 || !request.diagnosticoCie102 || !request.diagnosticoCie103
                    || !request.idNaturalezaSiniestro2 || !request.idNaturalezaSiniestro3 ) {
                    return false
                }
                return true
            }else {
                return true
            }
        } else{
            return false
        }
    }

    //Handle Salir
    const callbackGetDenuncia = (bool) => {
        if (bool) {
            history.push('/home/editar')
        } else {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: 'error',
                message: 'Ocurrió un error al intentar abrir la denuncia.',
                vertical: 'top'
            }))
        }
    }

    //Callback para grabar y salir
    let cbSalir = (bool) => {
        if (bool) {
            dispatch(actions.searchDenunciaById(denuncia.idDenuncia, denuncia.estadoCEM, callbackGetDenuncia))
        } else {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: "error",
                message: "Error al guardar cambios"
            }))
        }
    }

    //Handle Guardar y Salir
    const handleGuardarSalir = () => {
        if (request && request.idDenuncia) {
            dispatch(setGuardarDatosAuditoria(request, cbSalir))
        }
    }


    return (
        <Grid container xs={12} justify='center' alignItems='center' style={{ minHeight: '300px' }}>
            {loadingDatosDenunciaAuditoria ?
                <Grid item xs={12} container justify='center'>
                    <CircularProgress />
                </Grid>
                :
                <>
                    <Grid item xs={12} container spacing={1} className={classes.contenedor}>
                        <AuditoriaBox
                            denuncia={denuncia}
                            request={request}
                            setRequest={setRequest}
                        />
                    </Grid>
                    <Grid item xs={12} container spacing={1} className={classes.contenedor}>
                        <DatosDenunciaBox
                            denuncia={denuncia}
                            request={request}
                            setRequest={setRequest}
                        />
                    </Grid>
                    <Grid item xs={12} container spacing={1} className={classes.contenedor}>
                        <ExcedentesIltBox
                            denuncia={denuncia}
                            request={request}
                            setRequest={setRequest}
                        />
                    </Grid>
                    {request && request.excedenteILTRevisado &&
                        <Grid item xs={12} container spacing={1} className={classes.contenedor}>
                            <IndicacionesBox
                                denuncia={denuncia}
                                request={request}
                                setRequest={setRequest}
                            />
                        </Grid>
                    }
                    <Grid item xs={12} style={{ margin: '20px 0', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <CustomButton
                            label='Cancelar'
                            onClik={() => history.push('/home/')}
                            styleButton={{ border: 'none', borderRadius: '40px' }}
                            styleLabel={{ color: '#505050', fontWeight: '700' }}
                        />
                        <CustomButton
                            label='Grabar y salir'
                            onClik={() => handleGuardarSalir()}
                            variant='outlined'
                            styleButton={validarDatos() ? { border: '2px solid #505050', borderRadius: '40px' }
                                : { border: '2px solid #a19f9f', borderRadius: '40px' }}
                            styleLabel={validarDatos() ? { color: '#505050', fontWeight: '700' }
                                : { color: '#a19f9f', fontWeight: '700' }}
                            disabled={validarDatos() ? false : true}
                        />
                        <CustomButton
                            label='Guardar cambios'
                            onClik={() => handleGuardarDatos()}
                            variant='contained'
                            styleButton={validarDatos() ? { border: '2px solid #1473e6', borderRadius: '40px', background: '#1473e6' }
                                : { border: '2px solid #3283e6', borderRadius: '40px', background: '#3283e6' }}
                            styleLabel={{ color: '#ffff', fontWeight: '700' }}
                            disabled={validarDatos() ? false : true}
                        />
                    </Grid>
                </>
            }
        </Grid>
    )
}

export default DatosGenerales