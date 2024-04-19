import React, { useEffect, useState } from 'react'
//Redux:
import * as actions from '../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
//Material:
import { FormControl, RadioGroup, Grid, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
//Utils:
import Utils from '../../Utils/utils'
import {
    TIPO_LESION,
    ERROR_CREACION_DENUNCIA,
    MENSAJE_REINGRESO,
    MENSAJE_REINGRESO2,
    ESTADO_CEM_BORRADOR,
    MENSAJE_ERROR_EMPLEADOR_NO_VALIDO,
    MENSAJE_REINGRESO3,
    MENSAJE_INTERCURRENCIA,
    ERROR_FIND_DENUNCIA,
    estadosCEM
} from '../../Utils/const'
//Componentes
import CustomTypography from '../commons/Typography/CustomTypography'
import CustomButton from '../commons/Button/CustomButton'
import Cabecera from '../Form/Cabecera/cabecera'
import Lista from '../Form/Lista/Lista'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import CustomAlert from '../commons/CustomAlert/customAlert'
import Loader from '../commons/Loading/Loader'
import CustomLoading from '../commons/Loading/CustomLoading'
import CustomDialogo from '../commons/Dialogo/CustomDialogo'
import SiniestroMultiple from '../Form/SiniestroMultiple/SiniestroMultiple'
import IconSearch from '../BuscadorFlotante/IconSearch'
//Pantallas:
import PantallaLesionLeve from '../Form/PantallaLesionLeve'
import PantallaRiesgoMuerte from '../Form/PantallaRiesgoMuerte'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    contenedor: {
        backgroundColor: 'white',
        border: 'solid 1px #dadce0',
        borderRadius: '8px',
    },
    form: {
        marginTop: '10vh',
    },
    hora: {
        marginTop: '9px'
    }
})

const Home = (props) => {

    const { setTituloHeader, setNavegacion, usuarioActivo, 
        denuncia2, openBuscador, setOpenBuscador } = props

    const classes = useStyles()
    const dispatch = useDispatch()

    const [seleccion, setSeleccion] = useState(false)
    //Pantalla:
    const [newFormLesionLeve, setNewFormLesionLeve] = useState(false)
    const [newFormRiesgoMuerte, setNewFormRiesgoMuerte] = useState(false)
    const [pasoPantalla, setPasoPantalla] = useState(false)
    const [warningUrgenciaLesionLeve, setWarningUrgenciaLesionLeve] = useState(false)
    //reingreso
    const [checkedReingreso, setCheckedReingreso] = useState(false)
    const [open, setOpen] = useState(false);
    const [codigoSeleccionado, setCodigoSeleccionado] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [textRelato, setTextRelato] = useState('')
    const [valSiniestro, setValSiniestro] = useState('')
    const [hora, setHora] = useState(selectedDate && selectedDate.toString().substring(16, 21))
    const [valueEmpleador, setValueEmpleador] = useState(null)
    //reingreso
    const [listaReingreso, setListaReingreso] = useState(null)
    const [valueForm, setValueForm] = useState(null)
    const [openDialogo, setOpenDialogo] = useState(false)
    const [textoDialogo, setTextoDialogo] = useState("")
    const [dialogoOK, setDialogoOK] = useState(false)
    //intercurrencia
    const [checkedIntercurrencia, setCheckedIntercurrencia] = useState(false)
    const [idCausa, setIdCausa] = useState(null)
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(false)
    const [errorReingreso, setErrorReingreso] = useState(false)
    const loadingDenunciasAnterioresReingreso = useSelector(state => state.documentos.loadingDenunciasAnterioresReingreso)
    const loadingSaveDenuncia = useSelector(state => state.documentos.loadingSaveDenuncia)
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })

    const mapEmpleador = codigoSeleccionado && codigoSeleccionado.map((data) => { return data.codigo })
    const mapEmpleadorVIP = codigoSeleccionado && codigoSeleccionado.map((data) => { return data.vip })
    let vipEmpleador = mapEmpleadorVIP && mapEmpleadorVIP.map((it) => it)
    let cod = mapEmpleador && mapEmpleador.map((it) => it)

    const [dataBuscadorReingreso, setDataBuscadorReingreso] = useState({ tipoDoc: 1, nroDoc: null })
    const [denuncianteAutorizado, setDenuncianteAutorizado] = useState(null)
    const [checkUrgencia, setCheckUrgencia] = useState(false)
    const [form, setForm] = useState(null)
    const [idDenunciaForm, setIdDenunciaForm] = useState(null)

    const dataTipoDoc = [
        { codigo: 1, descripcion: 'DNI' },
        { codigo: 2, descripcion: 'CI' },
        { codigo: 3, descripcion: 'LE' },
        { codigo: 4, descripcion: 'LC' },
    ]

    useEffect(() => {
        setTituloHeader(`Nueva Denuncia`)
        setNavegacion(false)
    }, [])

    //Cancelar:
    const onCancelar = () => {
        setTextRelato('')
        setValSiniestro(0)
        setValueEmpleador(null)
        setSeleccion(false)
        setCheckedReingreso(false);
        setCheckedIntercurrencia(false)
        setListaReingreso(null)
        setValueForm(null)
        setCodigoSeleccionado(null)
        setSelectedDate(new Date())
        setWarningUrgenciaLesionLeve(false)
        setHora(selectedDate && selectedDate.toString().substring(16, 21))
    }

    function formatoFecha(fecha, formato) {
        const map = {
            dd: fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate(),
            mm: (fecha.getMonth() + 1) < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1,
            yy: fecha.getUTCFullYear().toString().slice(-2),
            yyyy: fecha.getUTCFullYear()
        }
        return formato.replace(/dd|mm|yyyy|yy/gi, matched => map[matched])
    }

    let newDate = null

    if (selectedDate !== null && selectedDate !== undefined) {
        newDate = formatoFecha(selectedDate, 'yyyy-mm-dd');
    }

    useEffect(() => {
        if (!seleccion) {
            setTextRelato('')
            setValSiniestro(0)
            setValueEmpleador(null)
            setSeleccion(false)
            setCheckedReingreso(false);
            setValueForm(null)
            setCodigoSeleccionado(null)
            setSelectedDate(new Date())
            setHora(selectedDate && selectedDate.toString().substring(16, 21))
            setCheckUrgencia(false)
        }
    }, [seleccion])

    //SAVE DENUNCIA
    const saveDenuncia = (tipo) => {
        /* Limpio dataBuscadorReingreso si no se seleccionó ningún reingreso */
        if(!checkedReingreso || !valueForm){
            setDataBuscadorReingreso({ tipoDoc: 1, nroDoc: null })
        }

        if (tipo === 'lesionLeve' && checkUrgencia) {
            setWarningUrgenciaLesionLeve(true)
        } else {
            let request = {
                fechaOcurrencia: Utils.dateFormat2(selectedDate && selectedDate),
                horaOcurrencia: hora,
                relato: textRelato ? textRelato : null,
                empleadorIdEmpleador: cod[0],
                tipoSiniestroIdTipoSiniestro: valSiniestro,
                reingreso: (checkedReingreso && valueForm !== null ? true : false),
                siniestroOriginalIdDenuncia: checkedReingreso && valueForm ? parseInt(valueForm) : null,
                operadorIdPersona: usuarioActivo ? usuarioActivo.id : null,
                riesgoMuerteIdRiesgoMuerte: tipo === 'muerte' ? true : false,
                idSiniestroIntercurrencia: checkedIntercurrencia && valueForm && valueForm !== null ? parseInt(valueForm) : null,
                idCausaSiniestroMultiple: checkedSiniestroMultiple ? idCausa : null,
                siniestroMultiple: checkedSiniestroMultiple,
                idCausaSiniestroMultiple: idCausa,
                siniestroMultiple: checkedSiniestroMultiple,
                denuncianteAutorizado: !checkUrgencia && denuncianteAutorizado ? { "idDenuncianteAutorizado": denuncianteAutorizado && denuncianteAutorizado.id } : null,
            }
            setForm(request)
            dispatch(actions.saveDenuncia(request, callbackSaveDenuncia, tipo))
        }
    }

    //CallBack SAVE DENUNCIA
    const callbackSaveDenuncia = (succes, id, tipo) => {
        if (succes) {

            dispatch(actions.camposRequeridos({
                estadoCem: 'borrador',
                empleadorEsVip: vipEmpleador && vipEmpleador[0] ? true : false,
                riesgoMuerte: tipo === 'muerte' ? true : false
            }))

            let callbackSearchDenunciaById = (success) => {
                if (success) {
                    if (tipo === 'muerte') return setNewFormRiesgoMuerte(true), dispatch(actions.serchCodigoAmbulancia())
                    else return setNewFormLesionLeve(true)
                } else {
                    setOpenSnackBar({ open: true, severity: 'error', title: ERROR_FIND_DENUNCIA })
                }
            }

            setIdDenunciaForm(id && id.idDenuncia)
            dispatch(actions.searchDenunciaById(id && id.idDenuncia, ESTADO_CEM_BORRADOR, callbackSearchDenunciaById))

        } else {
            setOpenSnackBar({ open: true, severity: 'error', title: ERROR_CREACION_DENUNCIA })
        }
    }

    const actualizarValidar = (accidentado) => {
        const request = {
            idEmpleador: cod && cod[0],
            fechaOcurrencia: newDate,
            reingreso: true
        }
        dispatch(actions.validarEmpleador(request, callback))
    }

    const aceptarDialogo = () => {
        setOpenDialogo(false)
        setTextoDialogo("")
        setDialogoOK(false)
        if (actualizarValidar) {
            actualizarValidar()
        }
    }

    const cancelarDialogo = () => {
        setOpenDialogo(false)
        setTextoDialogo("")
        setDialogoOK(false)
        setValueForm(null)
    }

    const callback = (severity, mensaje, valido) => {
        if (!valido) {
            setOpenSnackBar({
                open: true,
                severity: severity,
                title: MENSAJE_ERROR_EMPLEADOR_NO_VALIDO
            })
            setValueForm(null)
        }
    }

    const habilitarDenuncia = () => {
        let deshabilitar = true;
        if (pasoPantalla && (checkedReingreso || checkedIntercurrencia) && valueForm !== null) {
            deshabilitar = false;
        }
        if (pasoPantalla && !checkedReingreso && !checkedIntercurrencia) {
            deshabilitar = false;
        }
        return deshabilitar;
    }

    const handleChangeReingreso = (event) => {
        setValueForm(event.target.value)
        let denunciaSeleccionada = null;

        listaReingreso && listaReingreso.objetos && listaReingreso.objetos.map(datos => {
            if (datos.idDenuncia == event.target.value) {
                denunciaSeleccionada = datos
            }
        })

        let resultado = null;
        if (checkedReingreso) {
            resultado = Utils.verificacionReingreso(denunciaSeleccionada.estadoMedicoIdEstadoMedico, denunciaSeleccionada.rechazadoPorArt, denunciaSeleccionada.dictamen);
        }
        if (checkedIntercurrencia) {
            resultado = Utils.verificacionIntercurrencia(denunciaSeleccionada.estadoMedicoIdEstadoMedico, denunciaSeleccionada.rechazadoPorArt, denunciaSeleccionada.dictamen);
        }

        if (resultado.mensaje !== null) {
            setTextoDialogo(resultado.mensaje)
            setOpenDialogo(true)
            setDialogoOK(resultado.continuar)

            if (!resultado.continuar) {
                setValueForm(null)
            } else {
                setValueForm(event.target.value)
            }
        } else {
            setValueForm(event.target.value)
            if (actualizarValidar) {
                actualizarValidar()
            }
        }
    }

    const handleCheckedIntercurrencia = (event) => {
        setCheckedIntercurrencia(event.target.checked);
        setCheckedReingreso(false)
        if (!checkedReingreso && !checkedIntercurrencia) {
            setListaReingreso(null)
            setValueForm(null)
        }
    }

    const handleBuscadorReingreso = (tipoDoc, nroDoc) => {
        setDataBuscadorReingreso(dataBuscador => ({ ...dataBuscador, tipoDoc: tipoDoc, nroDoc: nroDoc }))
        let callback = (data) => {
            if (data) {
                setOpen(true)
                setListaReingreso(data)
                setErrorReingreso(false)
                setValueForm(null)
            } else {
                setOpen(false)
                setErrorReingreso(true)
                setValueForm(null)
            }
        }
        let req = {                            
            nroDoc: nroDoc, 
            tipoDoc: tipoDoc,
            estadoCem: estadosCEM.NO_BORRADOR,
            idEmpleador: codigoSeleccionado && codigoSeleccionado.length ? [codigoSeleccionado[0].codigo] : null,
        }
        if (nroDoc) {
            dispatch(actions.searchDenunciasAnteriores(req, callback))
        }
    }

    const handleCloseReingreso = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorReingreso(false)
    }

    const handleChecked = (event) => {
        setCheckedReingreso(event.target.checked);
        setCheckedIntercurrencia(false)
        if (!checkedReingreso && !checkedIntercurrencia) {
            setListaReingreso(null)
            setValueForm(null)
        }
    }

    return (
        <div className={classes.root}>
            {newFormLesionLeve ?
                <PantallaLesionLeve
                    setNewFormClasico={setNewFormLesionLeve}
                    vip={vipEmpleador && vipEmpleador[0]}
                    idDenunciaForm={idDenunciaForm}
                    form={form}
                    usuario={usuarioActivo}
                    denuncia2={denuncia2}
                    openBuscador={openBuscador}
                    setOpenBuscador={setOpenBuscador}
                    dataBuscadorReingreso={dataBuscadorReingreso}
                />
            : newFormRiesgoMuerte ?
                <PantallaRiesgoMuerte
                    setFormRiesgoMuerte={setNewFormRiesgoMuerte}
                    form={form}
                    idDenunciaForm={idDenunciaForm}
                    usuario={usuarioActivo}
                    vip={vipEmpleador && vipEmpleador[0]}
                    denuncia2={denuncia2}
                    checkUrgencia={checkUrgencia}
                    setCheckUrgencia={setCheckUrgencia}
                    setOpenBuscador={setOpenBuscador}
                    dataBuscadorReingreso={dataBuscadorReingreso}
                />
            :
                <Container maxWidth='lg' className={classes.form}>

                    <CustomLoading loading={loadingSaveDenuncia} />

                    {!openBuscador ?
                        <IconSearch open={openBuscador} historicoGrid={true} usuarioActivo={usuarioActivo} />
                        : null}

                    <Grid container xs={12} direction='column' alignItems='center' justify='center' spacing={5}>
                        <Grid item container xs={8} className={classes.contenedor} spacing={2}>

                            <Grid item xs={12}>
                                <Cabecera
                                    checkedReingreso={checkedReingreso}
                                    setCheckedReingreso={setCheckedReingreso}
                                    handleChecked={handleChecked}
                                    vip={vipEmpleador && vipEmpleador[0]}
                                    idEmpleadorValidar={cod && cod[0]}
                                    fechaOcurrenciaValidar={newDate}
                                    reingresoValidar={(checkedReingreso && valueForm !== null ? true : false)}
                                    validacion={true}
                                    seleccion={seleccion}
                                    setSeleccion={setSeleccion}
                                    setPasoPantalla={setPasoPantalla}
                                    codigoSeleccionado={codigoSeleccionado}
                                    setCodigoSeleccionado={setCodigoSeleccionado}
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
                                    handleBuscadorReingreso={handleBuscadorReingreso}
                                    dataBuscadorReingreso={dataBuscadorReingreso}
                                    setDataBuscadorReingreso={setDataBuscadorReingreso}
                                    checkedIntercurrencia={checkedIntercurrencia}
                                    handleCheckedIntercurrencia={handleCheckedIntercurrencia}
                                    setCheckedIntercurrencia={setCheckedIntercurrencia}
                                    denuncianteAutorizado={denuncianteAutorizado}
                                    setDenuncianteAutorizado={setDenuncianteAutorizado}
                                    checkUrgencia={checkUrgencia}
                                    setCheckUrgencia={setCheckUrgencia}
                                    setOpenBuscador={setOpenBuscador}
                                />
                            </Grid>

                            {loadingDenunciasAnterioresReingreso &&
                                <Grid item xs={12}>
                                    <Loader loading={loadingDenunciasAnterioresReingreso} />
                                </Grid>
                            }

                            {(checkedReingreso || checkedIntercurrencia) && open ?
                                <>
                                    <Grid item>
                                        {listaReingreso && dataBuscadorReingreso?.tipoDoc &&  dataBuscadorReingreso?.nroDoc &&
                                            <CustomTypography
                                                text={
                                                    MENSAJE_REINGRESO
                                                    + ' ' 
                                                    + dataTipoDoc[dataBuscadorReingreso.tipoDoc - 1].descripcion 
                                                    + ' ' 
                                                    + dataBuscadorReingreso.nroDoc
                                                    + '. ' 
                                                    + (checkedReingreso ? MENSAJE_REINGRESO2 + MENSAJE_REINGRESO3 : MENSAJE_REINGRESO2 + MENSAJE_INTERCURRENCIA)
                                                }
                                                variant={'subtitle2'}
                                                fontweight={'600'}
                                            />
                                        }
                                    </Grid>
                                    <>
                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="listado de denuncias en reingreso" name="listadoDenunciasReingreso" value={valueForm} onChange={handleChangeReingreso}>
                                                {listaReingreso && listaReingreso.objetos && listaReingreso.objetos.map((datos, index) => (
                                                    <Grid item xs={12} >
                                                        <Lista
                                                            datos={datos}
                                                            valueForm={datos && datos.idDenuncia}
                                                        />
                                                    </Grid>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </>
                                </>
                            : null}

                            {errorReingreso ?
                                <Grid item container justify='flex-start' alignItems='center'>
                                    <Grid item xs={10}>
                                        <CustomAlert
                                            recordatorioAlert={false}
                                            message={`No hemos encontrado Siniestros anteriores para el paciente DNI ${dataBuscadorReingreso.nroDoc}`}
                                            onClose={handleCloseReingreso}
                                            variant={'outlined'}
                                            severity='error'
                                            open={errorReingreso}
                                        />
                                    </Grid>
                                </Grid>
                                : null}

                            {/* SINIESTRO MULTIPLE*/}
                            <Grid container xs={11}
                                alignItems='flex-end'
                                spacing={2}
                                style={{ margin: '0px' }}>
                                <SiniestroMultiple
                                    home={true}
                                    check={3}
                                    titulo={6}
                                    fechaOcurrencia={newDate}
                                    idCausa={idCausa} setIdCausa={setIdCausa}
                                    checkedSiniestroMultiple={checkedSiniestroMultiple}
                                    setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                                    openBuscador={openBuscador} setOpenBuscador={setOpenBuscador}
                                />
                            </Grid>

                            {/* BOTONES*/}
                            <Grid item container xs={12} spacing={2} style={{ margin: '0px' }}>
                                <Grid item xs={12}>
                                    <CustomTypography text={TIPO_LESION} variant={'subtitle2'} />
                                </Grid>
                                <Grid item >
                                    <CustomButton
                                        label={'Lesión Leve'}
                                        variant={'contained'}
                                        onClik={() => saveDenuncia('lesionLeve')}
                                        disabled={habilitarDenuncia()}
                                    />
                                </Grid>
                                <Grid item >
                                    <CustomButton
                                        label={'Riesgo de Muerte'}
                                        variant={'contained'}
                                        onClik={() => saveDenuncia('muerte')}
                                        disabled={habilitarDenuncia()}
                                    />
                                </Grid>
                                {warningUrgenciaLesionLeve &&
                                    <Grid item xs={12}>
                                        <CustomTypography
                                            text={'La gravedad seleccionada no amerita ingreso. Informar que deberá comunicarse un Autorizado a denunciar.'}
                                            style={{ color: '#ff3b26', fontWeight: 400 }}
                                            variant={'subtitle2'}
                                        />
                                    </Grid>
                                }
                            </Grid>

                            {/* CANCELAR*/}
                            <Grid item container justify='flex-end' spacing={2}>
                                <Grid item >
                                    <CustomButton
                                        label={'Cancelar'}
                                        variant={'contained'}
                                        isAction={true}
                                        color={'secondary'}
                                        onClik={onCancelar}
                                    />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                </Container>
            }

            <CustomSnackBar
                handleClose={() => setOpenSnackBar({ open: false })}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />

            <CustomDialogo
                handleAceptar={aceptarDialogo}
                handleCancelar={cancelarDialogo}
                openDialogo={openDialogo}
                texto={textoDialogo}
                dialogoOk={!dialogoOK}
            />
        </div>
    )
}

export default Home