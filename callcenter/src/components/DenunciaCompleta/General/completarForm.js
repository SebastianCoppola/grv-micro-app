import React from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'
//Mui:
import { FormControlLabel, Grid, Typography, makeStyles } from '@material-ui/core'
import { Check, Warning, PriorityHigh } from '@material-ui/icons'
//Utils:
import Utils from '../../../Utils/utils'
import { ALERTA_SWITCH_SINIESTRO, ALERT_INVESTIGACION, ALERT_VALIDAR_DIAGNOSTICO, ENVIO_EMAIL, GUARDAR_EMAIL_ALERT, MAIL_CORTO_PUNZANTES_ANTERIORES_ACTIVOS } from '../../../Utils/const'
//Components:
import Tramitador from '../../Autosuggest/tramitador'
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import CustomSwitch from '../../commons/CustomSwitch/customSwitch'
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker'
import CustomText from '../../commons/TextField/CustomText'
import Auditor from '../../Selects/Auditor'
import EstadoInternacion from '../../Selects/EstadoInternacion'
import EstadoMedico from '../../Selects/EstadoMedico'
import Extraccionista from '../../Selects/extraccionista'
import PatologiaTrazadora from '../../Selects/PatologiaTrazadora'
import SeveridadDenuncia from '../../Selects/SeveridadDenuncia'
import TipoSiniestro from '../../Selects/TipoSiniestro'
import AlarmaCortoPunzante from './alarmaCortoPunzante/alarmaCortoPunzante'
import AutocompleteCompletar from './AutocompleteCompletar/AutocompleteCompletar'
import Multiple10Row from './Multiple10/multiple10Row'
import Row from './Reingreso/RowReingreso/Row'
import CustomAlert from '../../commons/CustomAlert/customAlert'
import CustomButton from '../../commons/Button/CustomButton'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'

const useStyles = makeStyles({
    cortoPunzante: {
        backgroundColor: 'rgba(255, 205, 113, 0.25)',
        padding: '12px 81px 28px 24px',
        margin: '10px 0px 10px 0px',
        border: 'dotted 1px #707070',
        borderRadius: '4px',
    },
    cortoPunzantePrevioActivo: {
        border: '1px solid #F29423',
        borderRadius: '4px',
        margin: '10px 0px 10px 0px',
        padding: '10px 20px 10px 20px',
    },
    cortoPunzantePrevioEnviado: {
        background:'#eff4fc',
        border: '1px solid #5151D3',
        borderRadius: '5px',
        margin: '10px 0px 10px 0px',
        padding: '10px 20px 10px 20px',
        display:'flex',
        gap:'20px',
        alignItems:'center'
    }, 
    iconCortoPunzanteEnviado: {
        width:15,
        height:15,
        color:'#ffff',
        background:'#5151D3',
        borderRadius:'45px',
        padding:4,
    }
})

const CompletarForm = (props) => {

    const { valueResponsable, denuncia, campos, 
        valEstadoMedico, handleChangeValEstadoMedico, 
        checkedART, handleCheckedART, 
        checkedDictamen, handleCheckedDictamen, 
        telegrama, handleCheckedTelegrama, 
        checkedCortoPunzante, handleCheckedCortoPunzante, 
        checkedBajaLaboral, handleCheckedBajaLaboral, 
        valPatologia, handleChangeSelectPatologia,
        estadoDisabledSwitchS, fechaMail, switchS, handleChangeSwitch,
        clickButonAlert, clickAlert, handleCloseSwitch, selectedHoraExtraccion, selectedHoraValidacion, valExtraccionista,
        handleHoraExtraccion, handleChangeSelectExtraccionista, handleHoraValidacion, 
         onChangeRoam, valueRoam, checkedReingreso,
        handleCheckedReingreso, handleIntercurrencia, checkedIntercurrencia, setReingresoIdSiniestro,
        reingresoIdSiniestro, setReingresoNroSiniestro, reingresoNroSiniestro, setIntercurrenciaIdSiniestro,
        setIntercurrenciaNroSiniestro, intercurrenciaIdSiniestro, intercurrenciaNroSiniestro,
        selectedDateOcurrencia, setSelectedDateOcurrencia, horaOcurrencia, onChangeHora, selectedDateBaja,
        setSelectedDateBaja, fechaRecepcion, setFechaRecepcion, valTramitador, handleChangeSelectTramitador,
        setValAuditor, valAuditor, handleChangeSelectEstadoInternacion, valEstadoInternacion,
        selectedDateInternacionD, setSelectedDateInternacionD, selectedDateInternacionH,
        setSelectedDateInternacionH, checkedPrestaciones, handleCheckedPrestaciones, valSiniestro,
        handleChangeSelectSiniestro, selectedDatePrimeraManifestacion, setSelectedDatePrimeraManifestacion,
        valueAccidente, setValueAccidente, setDataFormaAccidente, valueZonaAfectada, setValueZonaAfectada,
        setDataZonaAfectada, valueNaturaleza, setValueNaturaleza, setDataNaturaleza, valueAgenteCausante,
        setValueAgenteCausante, setDataAgenteCausante, valueAgenteMaterial, setValueAgenteMaterial,
        setDataAgenteMaterial, valueDiagnosticoCie10, setValueDiagnosticoCie10, setDataDiagnosticoCie10,
        multipleCie10, handleCheckedMultipleCie10, dataSiniestroCompleto, setDataSiniestroCompleto,
        diagnostico, naturaleza, zona, datosMultipleCIE10, setDatosMultipleCIE10, datosMultipleCIE10_2,
        setDatosMultipleCIE10_2, datosArrayMultiple10, setDatosArrayMultiple10, valueDiagnosticoCerteza,
        onChangeDiagnosticoCerteza, handleChangeSeveridadDenuncia, valSeveridadDenuncia, valMultiline,
        changeMultiline, recordatorio, checkedValidarDiagnOstico, handleCheckedValidarDiagnOstico,
        alertValidarDiagnostico, handleChangeSwitchAlert, checkedSwitchAlert, handleCloseValidarDiagnostico,
        valueAsistenciaExterna, onChangeAsistenciaExterna, fechaMailInvestigacion, checkedInvestigacion,
        handleChangeInvestigacion, clickInvestigacion, handleClickInvestigacion, handleCloseInvestigacionAlert,
        checkedInvestigacionAlert, disableEdition, usuarioActivo,
        mailCortopunzanteEnviado, setMailCortopunzanteEnviado,
        alertCortopunzante, setAlertCortoPunzante,
        snackbar, setSnackbar, fechaAlta
    } = props

    const {t} = useTranslation()
    const classes = useStyles(props)

    const dispatch = useDispatch()
    
    const cortoPunzanteAnteriorActivo = useSelector(state => state.documentos.cortoPunzanteAnteriorActivo)

    let handleClickEnviarMailCortopunzante = () => {
        let cb = (bool) => {
            setSnackbar({
                message: bool ? 'Mail enviado con exito' : 'Error al enviar el mail.', 
                vertical: 'top', 
                severity: bool ? 'success' : 'error', 
                open: true
            })
            if(bool) setMailCortopunzanteEnviado(true)
        }
        let req = {
            destinatarios: [MAIL_CORTO_PUNZANTES_ANTERIORES_ACTIVOS],
            idOperador: usuarioActivo && usuarioActivo.id,
            nombreApellidoOperador: usuarioActivo && usuarioActivo.nombre && usuarioActivo.apellido ?  usuarioActivo.nombre + " " + usuarioActivo.apellido : null,
            cortoPunzanteAnteriorDTO: {
                numeroSiniestro: cortoPunzanteAnteriorActivo && cortoPunzanteAnteriorActivo.nroSiniestro,
                empleador: cortoPunzanteAnteriorActivo && cortoPunzanteAnteriorActivo.empleadorRazonSocial,
                fechaOcurrencia: cortoPunzanteAnteriorActivo && cortoPunzanteAnteriorActivo.fechaOcurrencia,
                horaOcurrencia: horaOcurrencia && horaOcurrencia
            },
            denuncia: {
                idDenuncia: denuncia.idDenuncia,
                empleadorIdEmpleador: denuncia && denuncia.empleadorIdEmpleador,
                empleadorRazonSocial: denuncia && denuncia.empleadorRazonSocial,
                nroAsignado: denuncia && denuncia.nroAsignado ? denuncia.nroAsignado : denuncia.nroProvisorio,
                accidentado: {
                    nombre: denuncia && denuncia.accidentado && denuncia.accidentado.apellido && denuncia.accidentado.nombre ? denuncia.accidentado.apellido + " " + denuncia.accidentado.nombre : "",
                    nroDoc: denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc ? denuncia.accidentado.nroDoc : null,
                }
            }
        }
        dispatch(actions.enviarMailCortoPunzantesAnterioresActivos(req, cb))
    }

    return (
        <Grid container spacing={3} alignItems='end'>

            <Grid item xs={3}>
                <CustomText
                    label={'Responsable ingreso'}
                    value={valueResponsable}
                    id={'responsable'}
                    shrink={true}
                    disabled={true}
                    fullwidth={true}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomText
                    label={'Denunciante autorizado'}
                    value={Utils.getNombreYApellidoVIP(denuncia)}
                    id={'denuncianteAutorizado'}
                    shrink={true}
                    disabled={true}
                />
            </Grid>

            <Grid item xs={6}>
            </Grid>

            <Grid item xs={3}>
                <EstadoMedico
                    handleChangeSelectEstadoMedico={handleChangeValEstadoMedico}
                    valEstadoMedico={valEstadoMedico}
                    error={Utils.validarCampos(campos, 'estadoMedicoIdEstadoMedico', valEstadoMedico)}
                    helperTextSelect={Utils.validarCampos(campos, 'estadoMedicoIdEstadoMedico', valEstadoMedico) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'estadoMedicoIdEstadoMedico', valEstadoMedico) ? 'red' : null}
                    disableEdition={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomCheck
                    checked={checkedART}
                    disabled={disableEdition}
                    handleChange={handleCheckedART}
                    texto={'Rechazado por ART'}
                />
            </Grid>

            <Grid item xs={2}>
                <CustomCheck
                    checked={checkedDictamen}
                    handleChange={handleCheckedDictamen}
                    texto={'Dictamen'}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={2}>
                <CustomCheck
                    checked={telegrama}
                    handleChange={handleCheckedTelegrama}
                    texto={'Recibido por Telegrama'}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomCheck
                    disabled={Utils.isBorrador(denuncia) || denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaValidacion || disableEdition}
                    checked={checkedCortoPunzante}
                    handleChange={handleCheckedCortoPunzante}
                    texto={'Corto Punzante'}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomCheck
                    checked={checkedBajaLaboral}
                    handleChange={handleCheckedBajaLaboral}
                    texto={'Sin baja laboral'}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                <FormControlLabel
                    disabled={estadoDisabledSwitchS || fechaMail || disableEdition}
                    control={
                        <CustomSwitch
                            disabled={estadoDisabledSwitchS || fechaMail}
                            checkedSwitch={switchS}
                            handleChangeSwitch={handleChangeSwitch}
                            nameSwitch="switchSiniestro"
                        />
                    }
                    label="Siniestro Mixto"
                />
            </Grid>

            {clickButonAlert && switchS ?
                <Grid item xs={3} style={{ color: 'blue' }} >
                    <CustomAlert
                        message={ENVIO_EMAIL}
                        variant={'outlined'}
                        severity='info'
                        open={clickAlert && switchS}
                    />
                </Grid>
            : null}

            {fechaMail ?
                <Grid item xs={3}>
                    <CustomAlert 
                        message={`${GUARDAR_EMAIL_ALERT} ${Utils.dateFormat5(fechaMail)}`} 
                        variant={'outlined'} 
                        severity='info' 
                        open={fechaMail} 
                    />
                </Grid>
            :
                <Grid item xs={3}>
                </Grid>
            }

            {clickAlert ?
                <CustomAlert
                    message={ALERTA_SWITCH_SINIESTRO}
                    onClose={handleCloseSwitch}
                    variant={'filled'}
                    severity='info'
                    open={clickAlert}
                    snack={true}
                />
            : null}

            {/* FORM ALARMA CORTOPUNZANTE */}
            {checkedCortoPunzante &&
                <Grid item xs={11} container className={classes.cortoPunzante} spacing={2}>
                    <AlarmaCortoPunzante
                        focus={checkedCortoPunzante ? true : false}
                        textoHora={'Hora pedido extraccción'}
                        border ={selectedHoraExtraccion === ''}
                        selectedHoraExtraccion={selectedHoraExtraccion}
                        selectedHoraValidacion={selectedHoraValidacion}
                        valExtraccionista={valExtraccionista}
                        valuePlaceholder = {'13.30hs'}
                        defaultValue={selectedHoraExtraccion && Utils.time24h(selectedHoraExtraccion) === 'Invalid date' ? selectedHoraExtraccion.toString().substring(0,5) : selectedHoraExtraccion.toString().substring(16,21)}
                        handleChange={handleHoraExtraccion}
                        id='horaExtraccion'
                        denuncia={denuncia}
                        valueHelperText={selectedHoraExtraccion === ""}
                        disableEdition={disableEdition}
                    />
                    <Grid item xs={4} >
                        <Extraccionista
                            denuncia={denuncia}
                            valExtraccionista={valExtraccionista}
                            handleChangeSelectExtraccionista={handleChangeSelectExtraccionista}
                            disableEdition={disableEdition}
                        />
                    </Grid>
                    <AlarmaCortoPunzante
                        border={valExtraccionista && selectedHoraExtraccion && !selectedHoraValidacion && valExtraccionista !== 1 ? true : false}
                        textoHora={'Hora validación extracción'}
                        selectedHoraExtraccion={selectedHoraExtraccion}
                        selectedHoraValidacion={selectedHoraValidacion}
                        valExtraccionista={valExtraccionista}
                        value={selectedHoraValidacion ? selectedHoraValidacion.toString().substring(0,5) : Utils.hora(selectedHoraValidacion, 16, 18, 18, 21, 0)}
                        valueHelperText={valExtraccionista && selectedHoraExtraccion && !selectedHoraValidacion && valExtraccionista !== 1 ? <div style={{ backgroundColor: 'none', color: '#323232' }}><strong>{`Hora límite ${Utils.time24h(selectedHoraExtraccion) === 'Invalid date' ? Utils.hora(selectedHoraExtraccion, 0, 2, 2, 5, 3) : Utils.hora(selectedHoraExtraccion, 16, 18, 18, 21, 3)}`}</strong></div> : null}
                        handleChange={handleHoraValidacion}
                        id='horaValidacion'
                        endAdornment={
                            valExtraccionista && selectedHoraExtraccion && !selectedHoraValidacion && valExtraccionista !== 1 ?
                                <Warning htmlColor='#d7373f' />
                            : valExtraccionista && selectedHoraExtraccion && selectedHoraValidacion ?
                                <Check htmlColor='#2d9d78' />
                            : null
                        }
                        denuncia={denuncia}
                        disableEdition={disableEdition}
                    />
                </Grid>
            }

            {/* SEND MAIL CORTOPUNZANTE */}
            {checkedCortoPunzante && cortoPunzanteAnteriorActivo?.cortoPunzanteAnteriorActivo &&
                (mailCortopunzanteEnviado ?
                    <Grid item xs={11} container style={{margin:0, padding:0}}>
                        <Grid item className={classes.cortoPunzantePrevioEnviado} spacing={2}>
                            <PriorityHigh size='small' className={classes.iconCortoPunzanteEnviado}/>
                            <Typography style={{color:'#5151D3', fontWeight:400, fontSize:14}}>
                                Mail corto punzante previo enviado.
                            </Typography>
                        </Grid>
                    </Grid>
                :
                    <Grid item xs={11} container justify='space-between' className={classes.cortoPunzantePrevioActivo} spacing={2} >
                        <Grid item xs={1} container alignItems='center' justify='center'>
                            <PriorityHigh size='small' style={{color:'#ffff',background:'#F29423',borderRadius:'45px', padding:4}}/>
                        </Grid>
                        <Grid item xs={9} container>
                            <Grid item xs={12}>
                                <Typography style={{color:'#F29423', fontWeight:700, fontSize:14}}>
                                    Corto punzante previo activo
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{color:'#505050', fontWeight:400, fontSize:13}}>
                                    El paciente del presente siniestro posee un corto punzante activo previo.<br/>
                                    Se requiere envio mail.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2} container justify='center'>
                            <CustomButton
                                size='small'
                                label='Enviar Mail'
                                onClik={handleClickEnviarMailCortopunzante}
                                styleLabel={{color:'#505050', fontWeight:700, fontSize:14}}
                                styleButton={{display:'flex', flexWrap:'no-wrap'}}
                            />
                        </Grid>
                    </Grid>
                )
            }

            {/* ALERT CORTOPUNZANTE */}
            <CustomAlert
                message={alertCortopunzante.message}
                onClose={()=>setAlertCortoPunzante({open:false})}
                severity={alertCortopunzante.severity}
                open={alertCortopunzante.open}
                variant='filled'
                snack={true}
            />

            <Grid item xs={3}>
                <PatologiaTrazadora
                    handleChangeSelectPatologia={handleChangeSelectPatologia}
                    valPatologia={valPatologia}
                    disableEdition={disableEdition}
                />
            </Grid>

            <Grid item xs={3} style={{ marginTop: '10px' }}>
                <CustomText
                    label={'Roam'}
                    value={valueRoam}
                    id={'Roam'}
                    fullwidth={true}
                    shrink={true}
                    disabled={valPatologia === 0 || disableEdition}
                    onChange={(event) => onChangeRoam(event)}
                    error={Utils.validarCampos(campos, 'nroRoam', valueRoam)}
                    helperText={Utils.validarCampos(campos, 'nroRoam', valueRoam) ? 'Campo Requerido' : null}
                />
            </Grid>

            <Grid item xs={6}>
            </Grid>

            <Row
                checkedReingreso={checkedReingreso}
                handleCheckedReingreso={handleCheckedReingreso}
                denuncia={denuncia}
                handleIntercurrencia={handleIntercurrencia}
                checkedIntercurrencia={checkedIntercurrencia}
                setReingresoIdSiniestro={setReingresoIdSiniestro}
                reingresoIdSiniestro={reingresoIdSiniestro}
                setReingresoNroSiniestro={setReingresoNroSiniestro}
                reingresoNroSiniestro={reingresoNroSiniestro}
                setIntercurrenciaIdSiniestro={setIntercurrenciaIdSiniestro}
                setIntercurrenciaNroSiniestro={setIntercurrenciaNroSiniestro}
                intercurrenciaIdSiniestro={intercurrenciaIdSiniestro}
                intercurrenciaNroSiniestro={intercurrenciaNroSiniestro}
                disableEdition={disableEdition}
            />

            <Grid item xs={3}>
                <CustomDatePicker
                    label={'Fecha de Ocurrencia'}
                    selectedDate={selectedDateOcurrencia}
                    setSelectedDate={setSelectedDateOcurrencia}
                    shrink={true}
                    error={Utils.validarCampos(campos, 'fechaOcurrencia', selectedDateOcurrencia)}
                    helperText={Utils.validarCampos(campos, 'fechaOcurrencia', selectedDateOcurrencia) ? 'Campo Requerido' : null}
                    disabledPicker={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomText
                    label={'Hora'}
                    value={horaOcurrencia}
                    type={'time'}
                    id='time'
                    fullwidth={true}
                    onChange={onChangeHora}
                    error={Utils.validarCampos(campos, 'horaOcurrencia', horaOcurrencia)}
                    helperText={Utils.validarCampos(campos, 'horaOcurrencia', horaOcurrencia) ? 'Campo Requerido' : null}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={6}>
            </Grid>

            <Grid item xs={3}>
                <CustomDatePicker
                    label={'Fecha baja médica'}
                    selectedDate={selectedDateBaja}
                    setSelectedDate={setSelectedDateBaja}
                    shrink={true}
                    error={Utils.validarCampos(campos, 'fechaBaja', selectedDateBaja)}
                    helperText={Utils.validarCampos(campos, 'fechaBaja', selectedDateBaja) ? 'Campo Requerido' : null}
                    disabledPicker={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomDatePicker
                    label={'Fecha Recepción'}
                    selectedDate={fechaRecepcion}
                    setSelectedDate={setFechaRecepcion}
                    shrink={true}
                    error={Utils.validarCampos(campos, 'fechaRecepcion', fechaRecepcion)}
                    helperText={Utils.validarCampos(campos, 'fechaRecepcion', fechaRecepcion) ? 'Campo Requerido' : null}
                    disabledPicker={disableEdition}
                />
            </Grid>
            { fechaAlta != null ? 
                <Grid item xs={6}>
                    <Grid item xs={4}>
                        <CustomDatePicker
                            label={'Fecha de Alta'}
                            selectedDate={fechaAlta}
                            shrink={true}
                            disabledPicker={true}
                        />
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            : 
                <Grid item xs={5}>
                </Grid>
            }

            <Grid item xs={3}>
                <Tramitador
                    titulo={'Tramitador'}
                    valTramitador={valTramitador}
                    handleChangeSelectTramitador={handleChangeSelectTramitador}
                    error={Utils.validarCampos(campos, 'tramitadorIdPersona', valTramitador)}
                    helperTextSelect={Utils.validarCampos(campos, 'tramitadorIdPersona', valTramitador) ? 'Campo Requerido' : null}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={3} style={{marginTop: '10px'}}>
                <Auditor
                    setValueAuditor={setValAuditor}
                    valAuditor={valAuditor}
                    titulo={t('callCenter.auditor')}
                    fullwidth={true}
                    seleccione={true}
                    codigo={valTramitador}
                />
            </Grid>

            <Grid item xs={6}>
            </Grid>

            <Grid item xs={3}>
                <EstadoInternacion
                    handleChangeSelectEstadoInternacion={handleChangeSelectEstadoInternacion}
                    valEstadoInternacion={valEstadoInternacion}
                    error={Utils.validarCampos(campos, 'estadoInternacionIdEstadoInternacion', valEstadoInternacion)}
                    helperTextSelect={Utils.validarCampos(campos, 'estadoInternacionIdEstadoInternacion', valEstadoInternacion) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'estadoInternacionIdEstadoInternacion', valEstadoInternacion) ? 'red' : null}
                    disableEdition={disableEdition}
                />
            </Grid>

            <Grid item xs={8}>
            </Grid>

            <Grid item xs={3}>
                <CustomDatePicker
                    disabledPicker={valEstadoInternacion === 1 || disableEdition ? true : false}
                    label={'Fecha internación desde'}
                    error={Utils.validarCampos(campos, 'fechaInternacionDesde', selectedDateInternacionD)}
                    helperText={Utils.validarCampos(campos, 'fechaInternacionDesde', selectedDateInternacionD) ? 'Campo Requerido' : null}
                    selectedDate={selectedDateInternacionD}
                    setSelectedDate={setSelectedDateInternacionD}
                    shrink={true}
                />
            </Grid>

            <Grid item xs={3}>
                <CustomDatePicker
                    disabledPicker={valEstadoInternacion === 1 || disableEdition ? true : false}
                    label={'Fecha internación hasta'}
                    error={Utils.validarCampos(campos, 'fechaInternacionHasta', selectedDateInternacionH)}
                    helperText={Utils.validarCampos(campos, 'fechaInternacionHasta', selectedDateInternacionH) ? 'Campo Requerido' : null}
                    selectedDate={selectedDateInternacionH}
                    setSelectedDate={setSelectedDateInternacionH}
                    shrink={true}
                />
            </Grid>

            <Grid item xs={4}>
                <CustomCheck
                    disabled={true}
                    checked={checkedPrestaciones}
                    handleChange={handleCheckedPrestaciones}
                    texto={'Recibe prestaciones en domicio'}
                />
            </Grid>

            {/* <Grid item xs={12}>
                <CustomButton
                    size='small'
                    variant='outlined'
                    //isAction={true}
                    onClik={onClickPresentaCovid}
                    label='Presenta COVID'
                    startIcon={<img src={coronavirus} style={{ color: '#747474' }} />}
                    disabled={disableEdition}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomDatePicker
                    label={'Fecha de PCR'}
                    selectedDate={selectedDatePCR}
                    setSelectedDate={setSelectedDatePCR}
                    shrink={true}
                    disabledPicker={disableEdition}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomText
                    fullwidth={true}
                    label={'Días desde PCR'}
                    value={valueDiasPCR}
                    id={'DiasPCR'}
                    shrink={true}
                    onChange={(event) => onChangeDiasPCR(event)}
                    disabled={disableEdition}
                />
            </Grid>
            <Grid item xs={6}></Grid> */}

            <Grid item xs={3}>
                <TipoSiniestro
                    valSiniestro={valSiniestro}
                    handleChangeSelectSiniestro={handleChangeSelectSiniestro}
                    error={Utils.validarCampos(campos, 'tipoSiniestroIdTipoSiniestro', valSiniestro)}
                    helperTextSelect={Utils.validarCampos(campos, 'tipoSiniestroIdTipoSiniestro', valSiniestro) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'tipoSiniestroIdTipoSiniestro', valSiniestro) ? 'red' : null}
                    disableEdition={disableEdition}
                />
            </Grid>

            <Grid item xs={3}>
                {valSiniestro === 6 ?
                    <CustomDatePicker
                        labelWidth={true}
                        label={'Fecha de Primera Manifestación'}
                        selectedDate={selectedDatePrimeraManifestacion}
                        setSelectedDate={setSelectedDatePrimeraManifestacion}
                        shrink={true}
                    />
                : null}
            </Grid>

            <Grid item xs={6}>
            </Grid>

            <AutocompleteCompletar
                valueAccidente={valueAccidente} setValueAccidente={setValueAccidente}
                setDataFormaAccidente={setDataFormaAccidente}
                denuncia={denuncia}
                valueZonaAfectada={valueZonaAfectada} setValueZonaAfectada={setValueZonaAfectada}
                setDataZonaAfectada={setDataZonaAfectada}
                valueNaturaleza={valueNaturaleza} setValueNaturaleza={setValueNaturaleza}
                setDataNaturaleza={setDataNaturaleza}
                valueAgenteCausante={valueAgenteCausante} setValueAgenteCausante={setValueAgenteCausante}
                setDataAgenteCausante={setDataAgenteCausante}
                valueAgenteMaterial={valueAgenteMaterial}  setValueAgenteMaterial={setValueAgenteMaterial}
                setDataAgenteMaterial={setDataAgenteMaterial}
                valueDiagnosticoCie10={valueDiagnosticoCie10} setValueDiagnosticoCie10={setValueDiagnosticoCie10}
                setDataDiagnosticoCie10={setDataDiagnosticoCie10}
                disableEdition={disableEdition}
            />

            <Grid item xs={4}>
            </Grid>

            <Grid item xs={12}>
                <CustomCheck
                    checked={multipleCie10}
                    handleChange={handleCheckedMultipleCie10}
                    texto={'múltiples CIE10'}
                    fullwidth={true}
                    disabled={disableEdition}
                />
            </Grid>

            {multipleCie10 ?
                <Multiple10Row
                    denuncia={denuncia}
                    dataSiniestroCompleto={dataSiniestroCompleto}
                    setDataSiniestroCompleto={setDataSiniestroCompleto}
                    diagnostico={diagnostico}
                    naturaleza={naturaleza}
                    zona={zona}
                    datosMultipleCIE10={datosMultipleCIE10}
                    setDatosMultipleCIE10={setDatosMultipleCIE10}
                    datosMultipleCIE10_2={datosMultipleCIE10_2}
                    setDatosMultipleCIE10_2={setDatosMultipleCIE10_2}
                    datosArrayMultiple10={datosArrayMultiple10}
                    setDatosArrayMultiple10={setDatosArrayMultiple10}
                    campos={campos}
                    disableEdition={disableEdition}
                />
            : null}

            <Grid item xs={6}>
                <CustomText
                    label={'Diagnóstico de Certeza'}
                    value={valueDiagnosticoCerteza}
                    id={'DiagnósticoCerteza'}
                    shrink={true}
                    fullwidth={true}
                    placeholder='completar'
                    onChange={(event) => onChangeDiagnosticoCerteza(event)}
                    error={Utils.validarCampos(campos, 'diagnosticoDeCerteza', valueDiagnosticoCerteza)}
                    helperText={Utils.validarCampos(campos, 'diagnosticoDeCerteza', valueDiagnosticoCerteza) ? 'Campo Requerido' : null}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={4}>
            </Grid>

            <Grid item xs={3}>
                <SeveridadDenuncia
                    handleChangeSeveridadDenuncia={handleChangeSeveridadDenuncia}
                    valSeveridadDenuncia={valSeveridadDenuncia}
                    error={Utils.validarCampos(campos, 'severidadDenunciaIdSeveridadDenuncia', (valSeveridadDenuncia !== 0 ? valSeveridadDenuncia : null))}
                    helperTextSelect={Utils.validarCampos(campos, 'severidadDenunciaIdSeveridadDenuncia', (valSeveridadDenuncia !== 0 ? valSeveridadDenuncia : null)) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'severidadDenunciaIdSeveridadDenuncia', (valSeveridadDenuncia !== 0 ? valSeveridadDenuncia : null)) ? 'red' : null}
                    disableEdition={disableEdition}
                />
            </Grid>

            <Grid item xs={8}>
            </Grid>

            <Grid item xs={6}>
                <CustomText
                    label={'¿Qué sucedió? Relato del siniestro'}
                    multiline={true}
                    error={Utils.validarCampos(campos, 'relato', valMultiline)}
                    helperText={Utils.validarCampos(campos, 'relato', valMultiline) ? 'Campo Requerido - Comente lo sucedido' : 'Comente lo sucedido'}
                    fullwidth={true}
                    id='relato'
                    shrink={true}
                    onChange={(event) => changeMultiline(event)}
                    value={valMultiline}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={4}>
            </Grid>

            <Grid item xs={recordatorio || checkedValidarDiagnOstico ? 4 : 12}>
                <CustomCheck
                    disabled={Utils.isBorrador(denuncia) || disableEdition}
                    checked={checkedValidarDiagnOstico}
                    handleChange={handleCheckedValidarDiagnOstico}
                    texto={'validar diagnóstico'}
                />
            </Grid>

            {recordatorio || checkedValidarDiagnOstico ?
                <Grid item xs={4}>
                    <CustomAlert
                        message={'Alarma Diagnostico'}
                        variant={'filled'}
                        severity='warning'
                        open={alertValidarDiagnostico || checkedValidarDiagnOstico}
                        recordatorioAlert={true}
                        tituloRecordatorio={'Alarma Diagnóstico'}
                        nameSwitch={'Alarma Diagnóstico'}
                        handleChangeSwitch={(event) => handleChangeSwitchAlert(event)}
                        checkedSwitch={checkedSwitchAlert}
                        labelSwitch={'He validado el diagnóstico del paciente'}
                        disableEdition={disableEdition}
                    />
                </Grid>
            : null}

            {alertValidarDiagnostico ?
                <CustomAlert
                    message={ALERT_VALIDAR_DIAGNOSTICO}
                    onClose={handleCloseValidarDiagnostico}
                    variant={'filled'}
                    severity='info'
                    open={alertValidarDiagnostico}
                    snack={true}
                />
            : null}

            <Grid item xs={6}>
                <CustomText
                    label={'Asistencia externa'}
                    value={valueAsistenciaExterna}
                    id={'AsistenciaExterna'}
                    error={Utils.validarCampos(campos, 'asistenciaExterna', valueAsistenciaExterna)}
                    helperText={Utils.validarCampos(campos, 'asistenciaExterna', valueAsistenciaExterna) ? 'Campo Requerido - completar' : 'completar'}
                    shrink={true}
                    fullwidth={true}
                    onChange={(event) => onChangeAsistenciaExterna(event)}
                    disabled={disableEdition}
                />
            </Grid>

            <Grid item xs={4}>
            </Grid>

            <Grid item xs={4}>
                <FormControlLabel
                    disabled={Utils.isBorrador(denuncia) || fechaMailInvestigacion || disableEdition}
                    control={
                        <CustomSwitch
                            checkedSwitch={checkedInvestigacion}
                            handleChangeSwitch={handleChangeInvestigacion}
                            nameSwitch="checkedInvestigacion"
                        />
                    }
                    label="Amerita investigación"
                />
            </Grid>

            {checkedInvestigacion && fechaMailInvestigacion === null ?
                <Grid item xs={4}>
                    <CustomAlert
                        message={ENVIO_EMAIL}
                        variant={'outlined'}
                        severity='info'
                        open={clickInvestigacion && fechaMailInvestigacion === null}
                    />
                </Grid>
            : null}

            {fechaMailInvestigacion ?
                <Grid item xs={4}>
                    <CustomAlert 
                        message={`${GUARDAR_EMAIL_ALERT} ${Utils.dateFormat5(fechaMailInvestigacion)}`} 
                        variant={'outlined'} 
                        severity='info' 
                        open={fechaMailInvestigacion} />
                </Grid>
            : null}

            {checkedInvestigacionAlert ?
                <CustomAlert
                    message={ALERT_INVESTIGACION}
                    handleClickAlert={handleClickInvestigacion}
                    onClose={handleCloseInvestigacionAlert}
                    variant={'filled'}
                    boton={true}
                    severity='info'
                    open={checkedInvestigacionAlert}
                    snack={true}
                />
            : null}

            {/* SNACKBAR */}
            <CustomSnackBar
                vertical={snackbar.vertical}
                open={snackbar.open}
                onClose={()=>setSnackbar({open:false})}
                title={snackbar.message}
                severity={snackbar.severity}
            />

        </Grid>
    )
}
export default CompletarForm