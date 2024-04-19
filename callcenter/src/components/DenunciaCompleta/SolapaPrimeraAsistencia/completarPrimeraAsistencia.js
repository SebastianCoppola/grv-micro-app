import React, { useEffect, useState } from 'react'
//Redux: 
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'
//Mui:
import { Grid, Button, FormControl, FormControlLabel, RadioGroup, Typography } from '@material-ui/core'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import Brightness1Icon from '@material-ui/icons/Brightness1'
import Check from '@material-ui/icons/Check'
//Icons:
import hospital2 from '../../../commons/assets/hospital2.png'
//Components:
import CustomButton from '../../commons/Button/CustomButton'
import ModalPage from '../../commons/Modal/ModalPage'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import CustomCard from '../../commons/Card/CustomCard'
import CardObrasSociales from '../../Form/Secciones/CentroMedico/CardObrasSociales'
import Localidades from '../../Autosuggest/localidades'
import Provincia from '../../Autosuggest/provincia'
import BusquedaCentroMedico from '../../Autosuggest/BusquedaCentrosMedicos'
import CustomTypography from '../../commons/Typography/CustomTypography'
import CustomRadio from '../../commons/Radio/CustomRadio'

const CompletarPrimeraAsistencia = (props) => {
    
    const { usuarioActivo, denuncia, 
        onClickTraslado, disableEdition,
        dataSiniestroCompleto, setDataSeccionCentroMedico,
        valueCentroMedico, setValueCentroMedico } = props
    
    const dispatch = useDispatch()

    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    const dataCentroMedicoSugerido = useSelector(state => state.documentos.centroSugerido)  
    
    //Provincia:
    const [provincia, setProvincia] = useState(null)
    const [codigoIdProvincia, setCodigoIdProvincia] = useState(null)
    const [dataProvincia, setDataProvincia] = useState('')
    //Localidad: 
    const [localidad, setLocalidad] = useState(null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = useState(null)
    const [dataLocalidad, setDataLocalidad] = useState('')
    //Autosuggest Centro Medico: 
    const [seleccionado2, setSeleccionado2] = useState(false)
    const [dataCentromedico, setDataCentroMedico] = useState(null)
    //A determinar:
    const [valueRadio, setValueRadio] = useState(null)
    const [centroMedicoADeterminarCentro, setCentroMedicoADeterminarCentro] = useState(false)
    const [idCentroMedicoADeterminar, setIdCentroMedicoADeterminar] = useState(null)
    //Enviar mail:
    const [openConfirmarEnvio, setOpenConfirmarEnvio] = useState(false)
    const [mailEnviado, setMailEnviado] = useState(
        dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.envioMailPrimeraAsistencia !== null
        ? dataSiniestroCompleto.dataSeccionCentroMedico.envioMailPrimeraAsistencia
        : false
    )
    //Centro medico sugerido:
    const [value2, setValue] = useState()
    const [value2Card, setValueCard] = useState(null);
    const [dataCMedico, setDataCMedico] = useState(null)
    const [dataCMedicoID, setDataCMedicoID] = useState(null)
    const [centroMedicoS, setCentroMedicoS] = useState(false)
    //Otros:
    const [cambioProv, setCambioProv] = useState(false)
    const [cambioLoc, setCambioLoc] = useState(false)
    const [cambio, setCambio] = useState(false)
    //SnackBar:
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''})
    
    useEffect(() => {
        setValueCard(value2)
    }, [value2])
   
    const handleChangeRadio = () => {
        setValueRadio(921)
        setValueCard(null)
        setCentroMedicoS(false)
        setValue(null)
        dispatch(actions.centroMedicoADeterminar(callbackADeterminar))
        setValueCentroMedico(null)
        setDataCMedico(null)
    }

    const callbackADeterminar = (succes, data) => {
        let severity = succes ? 'success' : 'error'
        let title = succes ? 'Al elegir esta opción podrá completar mas adelante el Centro Médico elegido' : 'Le pedimos disculpas hubo un problema. Por favor intente nuevamente.'
        setOpenSnackBar({'open': true, 'severity': severity, 'title': title})       
        if(succes && data){
            setIdCentroMedicoADeterminar(data.id)
            setCentroMedicoADeterminarCentro(data.centroMedico)
        }
    }

    useEffect(() => {
        if (!cambioProv || seleccionado2) {
            setLocalidad(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.localidadDescripcion !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.localidadDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadNombre !== null ? denuncia.centroPrimerAsistencia.localidadNombre : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadNombre : null)
        }
        else {
            setLocalidad(null)
            setCambio(true)
        }
    }, [provincia])

    useEffect(() => {
        setCambio(false)
        if (localidad === null) {
            setCodigoIdLocalidad(null)
            setLocalidad(null)
        }
        if (provincia === null) {
            setCodigoIdProvincia(null)
            setProvincia(null)
        }
    }, [localidad, provincia])

    useEffect(() => {
        setProvincia(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.provinciaDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.provinciaNombre ? denuncia.centroPrimerAsistencia.provinciaNombre : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadProvinciaNombre : undefined)
        setLocalidad(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.localidadDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadNombre ? denuncia.centroPrimerAsistencia.localidadNombre : denuncia && denuncia.accidentado && denuncia.accidentado.localidadNombre !== null ? denuncia.accidentado.localidadNombre : null)
        setCodigoIdLocalidad(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.localidadId !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.localidadId : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadIdLocalidad ? denuncia.centroPrimerAsistencia.localidadIdLocalidad : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad : null)
        setCodigoIdProvincia(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.provinciaID : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.idProvincia ? denuncia.centroPrimerAsistencia.idProvincia : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadProvinciaIdProvincia : null)
        setDataCMedicoID(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.id : denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.id : null)
        setCentroMedicoS(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.centroMedico : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.centroMedico ? denuncia.centroPrimerAsistencia.centroMedico : null)
        setValueCentroMedico(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.dataMedicoDescripcion !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.dataMedicoDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.razonSocial ? denuncia.centroPrimerAsistencia.razonSocial : false)
        setDataCMedico(dataCMedico ? dataCMedico : null)
        setValueCard(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id !== 921 ? dataSiniestroCompleto.dataSeccionCentroMedico.id : null)
        setValueRadio(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.id : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id !== null && denuncia.centroPrimerAsistencia.id === 921 ? denuncia.centroPrimerAsistencia.id : null)
        setCentroMedicoADeterminarCentro(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id !== null && dataSiniestroCompleto.dataSeccionCentroMedico.id === 921 && dataSiniestroCompleto.dataSeccionCentroMedico.centroMedico ? true : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id !== null && denuncia.centroPrimerAsistencia.id === 921 && denuncia.centroPrimerAsistencia.centroMedico ? denuncia.centroPrimerAsistencia.centroMedico : false)
        setValue(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.id !== 921 ? dataSiniestroCompleto.dataSeccionCentroMedico.id : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id !== null ? denuncia.centroPrimerAsistencia.id : null)
        setMailEnviado(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.envioMailPrimeraAsistencia !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.envioMailPrimeraAsistencia :denuncia && denuncia.envioMailPrimeraAsistencia !== null ? denuncia.envioMailPrimeraAsistencia : false)
    }, [denuncia])

    useEffect(() => {
        if (provincia && dataProvincia) {
            let idProv = dataProvincia && dataProvincia.filter(it => it.descripcion === provincia)
            setCodigoIdProvincia(idProv && idProv[0] ? idProv[0].codigo : codigoIdProvincia)
        }
        if (localidad && dataLocalidad) {
            let idLoc = dataLocalidad && dataLocalidad.filter(it => it.descripcion === localidad)
            setCodigoIdLocalidad(idLoc && idLoc[0] && idLoc[0].codigo ? idLoc[0].codigo : codigoIdLocalidad)
        }
    }, [provincia, dataProvincia, localidad, dataLocalidad])

    useEffect(() => {
        if (valueCentroMedico && dataCentromedico) {
            setDataCMedico(dataCentromedico.filter(it => it.razonSocial === valueCentroMedico))
            let idCMedico = dataCentromedico.filter(it => it.razonSocial === valueCentroMedico)
            setDataCMedicoID(idCMedico && idCMedico[0] && idCMedico[0].id ? idCMedico[0].id : idCMedico)
            setCentroMedicoS(idCMedico && idCMedico[0] && idCMedico[0].centroMedico)
        }
    }, [dataCentromedico, valueCentroMedico])

    useEffect(() => {
        if (!seleccionado2) {
            setValueCentroMedico(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.dataMedicoDescripcion !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.dataMedicoDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.razonSocial ? denuncia.centroPrimerAsistencia.razonSocial : null)
            setDataCMedico(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.dataMedico !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.dataMedico : null)
            setProvincia(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.provinciaDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.provinciaNombre !== null ? denuncia.centroPrimerAsistencia.provinciaNombre : denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaNombre !== null ? denuncia.accidentado.localidadProvinciaNombre : null)
            setLocalidad(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.localidadDescripcion : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadNombre !== null ? denuncia.centroPrimerAsistencia.localidadNombre : denuncia && denuncia.accidentado && denuncia.accidentado.localidadNombre !== null ? denuncia.accidentado.localidadNombre : null)
            dispatch(actions.setBusquedaCentroMedicos(null))
            setCodigoIdProvincia(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico ? dataSiniestroCompleto.dataSeccionCentroMedico.provinciaID : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.idProvincia !== null ? denuncia.centroPrimerAsistencia.idProvincia : denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaIdProvincia !== null ? denuncia.accidentado.localidadProvinciaIdProvincia : null)
            setCodigoIdLocalidad(dataSiniestroCompleto && dataSiniestroCompleto.dataSeccionCentroMedico && dataSiniestroCompleto.dataSeccionCentroMedico.idLocalidad !== null ? dataSiniestroCompleto.dataSeccionCentroMedico.idLocalidad : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadIdLocalidad !== null ? denuncia.centroPrimerAsistencia.localidadIdLocalidad : denuncia && denuncia.accidentado && denuncia.accidentado.localidadIdLocalidad !== null ? denuncia.accidentado.localidadIdLocalidad : null)
            setDataCMedicoID(null)
        }
    }, [seleccionado2])

    useEffect(() => {
        setDataSeccionCentroMedico({
            provinciaID: provincia && codigoIdProvincia ? codigoIdProvincia : null,
            provinciaDescripcion: provincia && codigoIdProvincia ? provincia : null,
            localidadId: localidad && codigoIdLocalidad ? codigoIdLocalidad : null,
            localidadDescripcion: localidad && codigoIdLocalidad ? localidad : null,
            dataMedico: dataCMedico ? dataCMedico : null,
            dataMedicoDescripcion: dataCMedico && dataCMedico[0] && dataCMedico[0].razonSocial !== null ? dataCMedico[0].razonSocial : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.razonSocial !== null ? denuncia.centroPrimerAsistencia.razonSocial : null,
            id: dataCMedicoID ? dataCMedicoID : valueRadio ? valueRadio : denuncia !== null && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.id : null,
            centroMedico: valueRadio === 921 ? centroMedicoADeterminarCentro : dataCMedico ? centroMedicoS : denuncia !== null && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.centroMedico,
            envioMailPrimeraAsistencia: mailEnviado
        })
    }, [dataCentroMedicoSugerido, provincia, denuncia, dataCMedico, dataCMedicoID, centroMedicoS, localidad, codigoIdLocalidad, codigoIdProvincia, centroMedicoADeterminarCentro, valueRadio, mailEnviado])

    //Enviar Mail:
    const aceptarEnvio = () => {
        const request = {
            idCentroMedico: denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.id : null,
            centroMedico: denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.centroMedico : null,
            idDenuncia: denuncia ? denuncia.idDenuncia : null,
            idOperador: usuarioActivo.id
        }
        dispatch(actions.enviarMailPrimeraAsistencia(request, callbackAceptarEnvio))
        setOpenConfirmarEnvio(false)
    }

    //Callback Enviar Mail:
    const callbackAceptarEnvio = (severity, mensaje, bool) => {
        setOpenSnackBar({open: true, severity: severity, title: mensaje})
        if(bool) setMailEnviado(true)
    }

    //Disable Enviar Mail:
    const disableEnviarMail = () => {
        let isIdCentroMedico = denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id ? true : false
        return disableEdition || mailEnviado || !isIdCentroMedico || !valueCentroMedico ? true : false
    }

    return (
        <Grid container spacing={2} style={{height:'100%'}}>

            <Grid item xs={12}>
                <CustomTypography variant={'body2'} text={'Buscar Centro Médico'} />
            </Grid>
                            
            {/* PROVINCIA - LOCALIDAD */}
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={3}>
                    <Provincia
                        valueProvincia={provincia}
                        setValueProvincia={setProvincia}
                        setDataProvincia={setDataProvincia}
                        denuncia={denuncia}
                        setCambioProv={setCambioProv}
                        cambio={cambio}
                        disabled={disableEdition}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Localidades
                        valueLocalidades={localidad}
                        setValueLocalidades={setLocalidad}
                        dataProvincia={dataProvincia}
                        disabledLocalidad={!provincia || disableEdition ? true : false}
                        denuncia={denuncia}
                        idProv={codigoIdProvincia}
                        setCambioLoc={setCambioLoc}
                        prov={provincia}
                        cambioProv={cambioProv}
                        cambio={cambio}
                        setDataLocalidad={setDataLocalidad}
                    />
                </Grid>

            </Grid>

            {/* CENTRO MEDICO */}
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                    <BusquedaCentroMedico
                        valueCentroMedico={valueCentroMedico}
                        setValueCentroMedico={setValueCentroMedico}
                        dataDenuncia={denuncia}
                        idProvincia={codigoIdProvincia}
                        idLocalidad={codigoIdLocalidad}
                        denuncia={denuncia}
                        seleccionado2={seleccionado2}
                        setSeleccionado2={setSeleccionado2}
                        setDataCentroMedico={setDataCentroMedico}
                        error={Utils.validarCampos(camposRequeridos, 'id', (value2Card || valueRadio || value2))}
                        disableEdition={disableEdition}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="gender" name="gender1" value={(valueRadio === 921) ? valueRadio : null} onChange={handleChangeRadio}>
                            <FormControlLabel
                                disabled={disableEdition}
                                value={921}
                                control={<CustomRadio />}
                                label={<div>A determinar</div>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            {/* ENVIAR MAIL */}
            <Grid item xs={12}>
                <Button
                    disabled={disableEnviarMail()}
                    onClick={() => setOpenConfirmarEnvio(true)}
                    variant={mailEnviado ? 'outlined' : 'contained'}
                >
                    {mailEnviado ? 
                        <Typography style={{display:'flex', alignItems:'center', gap:'15px', fontSize:13, color:'#505050', fontWeight:700}}>
                            <Check style={{background:'#86CF5A', color:'#ffff', borderRadius:'40px'}} />
                            Mail Enviado
                        </Typography>
                    : 
                        <Typography style={{fontSize:13,color:'#505050'}}>
                            Enviar Mail
                        </Typography>
                    }
                </Button>
            </Grid>

                
            {/* SUGERIDO EMPLEADOR */}
            <Grid item xs={3}>
                <Typography style={{display:'flex', alignItems:'center', gap:'5px', padding:'5px 7px', backgroundColor:'rgb(182, 208, 226)', borderRadius:'10px'}}>
                    <StarOutlineIcon htmlColor={'#f29423'} />
                    <CustomTypography text={'Sugerido Empleador'} variant={'body1'} />
                </Typography>
            </Grid>

            {/* CENTROS MEDICOS */}
            <Grid item xs={12} container>
                {dataCMedico ?
                    dataCMedico.map((datos) => (
                        <Grid item xs={4}>
                            <CustomCard
                                click={true}
                                value2={value2Card}
                                setValue={setValueCard}
                                data={datos}
                                ambulancia={false}
                                body={
                                    <CardObrasSociales
                                        form={true}
                                        click={true}
                                        icon={hospital2}
                                        value2={value2Card}
                                        datos={datos}
                                        ambulancia={false}
                                        setValueRadio={setValueRadio}
                                        setValue={setValueCard}
                                    />
                                } 
                            />
                        </Grid>
                    ))
                : denuncia && denuncia.centroPrimerAsistencia !== null && denuncia.centroPrimerAsistencia.id !== 921 ?
                    <Grid item xs={4}>
                        <CustomCard
                            click={true}
                            data={denuncia && denuncia.centroPrimerAsistencia}
                            ambulancia={false}
                            value2={valueRadio === 921 ? null : value2}
                            setValue={setValue}
                            body={
                                <CardObrasSociales
                                    click={true}
                                    ambulancia={false}
                                    icon={hospital2}
                                    datos={denuncia && denuncia.centroPrimerAsistencia}
                                    denuncia={denuncia}
                                    value2={value2}
                                    setValueRadio={setValueRadio} 
                                    form={false}
                                    setValue={setValue}
                                    // form={true}
                                />
                            }
                        />
                    </Grid>
                : null}
            </Grid>
            
            {/* TRAMITAR TRASLADO */}
            <Grid item xs={12}>
                <CustomButton
                    label={'Tramitar traslado'}
                    variant={'outlined'}
                    color={'secondary'}
                    onClik={onClickTraslado}
                    disabled={Utils.isBorrador(denuncia) || disableEdition}
                    startIcon={<Brightness1Icon htmlColor={'#747474'} />} 
                />
            </Grid>
          
            {/* MODAL CONFIMACION MAIL */}
            { openConfirmarEnvio ?
                <>
                    <ModalPage
                        open={openConfirmarEnvio}
                        fullWidth={true}
                        maxWidth={'xs'}
                        title='Enviar Mail'
                        subtitle='¿Está seguro que desea enviar mails de Primera Asistencia?'
                        actions={[
                            <CustomButton
                                variant={'outlined'}
                                isAction={true}
                                label='Cancelar'
                                onClik={() => setOpenConfirmarEnvio(false)}
                            />,
                            <CustomButton
                                label={'Aceptar'}
                                variant={'contained'}
                                color={'primary'}
                                onClik={aceptarEnvio}
                                size={'large'}
                                isAction={true}
                            />
                        ]}
                    />
                </>
            : null}

            {/*SNACK BAR*/}
            {openSnackBar.open ?
                <>
                    <CustomSnackBar
                        handleClose={()=>setOpenSnackBar({open:false})}
                        open={openSnackBar.open}
                        title={openSnackBar.title}
                        severity={openSnackBar.severity} 
                    /> 
                </>
            : null}

        </Grid>
        // <Grid container justify='space-between' spacing={2} style={{ height: '100%' }}>
            
        //     <Grid item spacing={2} container direction='row' justify='flex-start' alignItems='flex-end'>
                
        //         <Grid item container xs={12} direction='row' style={{ display: 'contents' }} spacing={2}>
        //             {/* PROVINCIA - LOCALIDAD */}
        //             <Grid item container xs={6} spacing={2}>
        //                 <Grid item xs={12}>
        //                     <CustomTypography variant={'body2'} text={'Buscar Centro Médico'} />
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <Provincia
        //                         valueProvincia={provincia}
        //                         setValueProvincia={setProvincia}
        //                         setDataProvincia={setDataProvincia}
        //                         denuncia={denuncia}
        //                         setCambioProv={setCambioProv}
        //                         cambio={cambio}
        //                         disabled={disableEdition}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <Localidades
        //                         valueLocalidades={localidad}
        //                         setValueLocalidades={setLocalidad}
        //                         dataProvincia={dataProvincia}
        //                         disabledLocalidad={!provincia || disableEdition ? true : false}
        //                         denuncia={denuncia}
        //                         idProv={codigoIdProvincia}
        //                         setCambioLoc={setCambioLoc}
        //                         prov={provincia}
        //                         cambioProv={cambioProv}
        //                         cambio={cambio}
        //                         setDataLocalidad={setDataLocalidad}
        //                     />
        //                 </Grid>

        //             </Grid>
        //             {/* CENTRO MEDICO */}
        //             <Grid container justify='space-between'>
        //                 <Grid item xs={6}>
        //                     <BusquedaCentroMedico
        //                         valueCentroMedico={valueCentroMedico}
        //                         setValueCentroMedico={setValueCentroMedico}
        //                         dataDenuncia={denuncia}
        //                         idProvincia={codigoIdProvincia}
        //                         idLocalidad={codigoIdLocalidad}
        //                         denuncia={denuncia}
        //                         seleccionado2={seleccionado2}
        //                         setSeleccionado2={setSeleccionado2}
        //                         setDataCentroMedico={setDataCentroMedico}
        //                         error={Utils.validarCampos(camposRequeridos, 'id', (value2Card || valueRadio || value2))}
        //                         disableEdition={disableEdition}
        //                     />
        //                 </Grid>
        //                 <Grid item xs={5}>
        //                     <FormControl component="fieldset">
        //                         <RadioGroup aria-label="gender" name="gender1" value={(valueRadio === 921) ? valueRadio : null} onChange={handleChangeRadio}>
        //                             <FormControlLabel
        //                                 disabled={disableEdition}
        //                                 value={921}
        //                                 control={<CustomRadio />}
        //                                 label={<div>A determinar</div>}
        //                             />
        //                         </RadioGroup>
        //                     </FormControl>
        //                 </Grid>
        //             </Grid>
        //             {/* ENVIAR MAIL */}
        //             <Grid item mt={4}>
        //                 <Button
        //                     disabled={disableEnviarMail()}
        //                     onClick={() => setOpenConfirmarEnvio(true)}
        //                     variant={'contained'}
        //                 >
        //                     {mailEnviado ? 
        //                         <Typography style={{fontSize:13,color:'#505050'}}>
        //                             Mail Enviado
        //                         </Typography>
        //                     : 
        //                         <Typography style={{fontSize:13,color:'#505050'}}>
        //                             Enviar Mail
        //                         </Typography>
        //                     }
        //                 </Button>
        //             </Grid>
        //         </Grid>
                
        //         {/* SUGERIDO EMPLEADOR */}
        //         <Grid item container justify='flex-start' spacing={2}>
        //             <Grid item container spacing={1} xs={4} style={{borderTop:'2px solid powderblue', borderBottom:'2px solid powderblue', margin:'5px', padding:'2px', backgroundColor:'rgb(182, 208, 226)', borderRadius:'10px', display:'flex', alignItems:'center'}}>
        //                 <Grid item xss={1} >
        //                     <StarOutlineIcon htmlColor={'#f29423'} />
        //                 </Grid>
        //                 <Grid item xs={8} >
        //                     <CustomTypography
        //                         text={'Sugerido Empleador'}
        //                         variant={'body1'}
        //                     />
        //                 </Grid>
        //             </Grid>
        //         </Grid>

        //         {/* CENTROS MEDICOS */}
        //         <Grid item xs={12}>
        //             {dataCMedico ?
        //                 dataCMedico.map((datos) => (
        //                     <Grid item container xs={4}  >
        //                         <CustomCard
        //                             click={true}
        //                             value2={value2Card}
        //                             setValue={setValueCard}
        //                             data={datos}
        //                             ambulancia={false}
        //                             body={
        //                                 <CardObrasSociales
        //                                     form={true}
        //                                     click={true}
        //                                     icon={hospital2}
        //                                     value2={value2Card}
        //                                     setValue={setValueCard}
        //                                     datos={datos}
        //                                     ambulancia={false}
        //                                     setValueRadio={setValueRadio}
        //                                 />
        //                             } 
        //                         />
        //                     </Grid>
        //                 ))
        //             : denuncia && denuncia.centroPrimerAsistencia !== null && denuncia.centroPrimerAsistencia.id !== 921 ?
        //                 <Grid item container xs={4}>
        //                     <CustomCard
        //                         click={true}
        //                         data={denuncia && denuncia.centroPrimerAsistencia}
        //                         ambulancia={false}
        //                         value2={valueRadio === 921 ? null : value2}
        //                         setValue={setValue}
        //                         body={
        //                             <CardObrasSociales
        //                                 form={true}
        //                                 click={true}
        //                                 ambulancia={false}
        //                                 // form={false}
        //                                 icon={hospital2}
        //                                 datos={denuncia && denuncia.centroPrimerAsistencia}
        //                                 denuncia={denuncia}
        //                                 value2={value2}
        //                                 setValue={setValue}
        //                                 setValueRadio={setValueRadio} 
        //                             />
        //                         }
        //                     />
        //                 </Grid>
        //             : null}
        //         </Grid>
                
        //         {/* TRAMITAR TRASLADO */}
        //         <Grid item>
        //             <CustomButton
        //                 label={'Tramitar traslado'}
        //                 variant={'outlined'}
        //                 color={'secondary'}
        //                 onClik={onClickTraslado}
        //                 disabled={Utils.isBorrador(denuncia) || disableEdition}
        //                 startIcon={<Brightness1Icon htmlColor={'#747474'} />} />
        //         </Grid>

        //     </Grid>
            
        //     {/* MODAL CONFIMACION MAIL */}
        //     {openConfirmarEnvio ?
        //         <ModalPage
        //             open={openConfirmarEnvio}
        //             fullWidth={true}
        //             maxWidth={'xs'}
        //             title='Enviar Mail'
        //             subtitle='¿Está seguro que desea enviar mails de Primera Asistencia?'
        //             actions={[
        //                 <CustomButton
        //                     variant={'outlined'}
        //                     isAction={true}
        //                     label='Cancelar'
        //                     onClik={() => setOpenConfirmarEnvio(false)}
        //                 />,
        //                 <CustomButton
        //                     label={'Aceptar'}
        //                     variant={'contained'}
        //                     color={'primary'}
        //                     onClik={aceptarEnvio}
        //                     size={'large'}
        //                     isAction={true}
        //                 />
        //             ]}
        //         />
        //     : null}

        //     {/*SNACK BAR*/}
        //     {openSnackBar.open ?
        //         <CustomSnackBar
        //             handleClose={()=>setOpenSnackBar({open:false})}
        //             open={openSnackBar.open}
        //             title={openSnackBar.title}
        //             severity={openSnackBar.severity} 
        //         /> 
        //     : null}

        // </Grid>
    )
}

export default CompletarPrimeraAsistencia

