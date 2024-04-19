import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Utils from '../../../Utils/utils'
//material-ui
import { Divider, Grid } from '@material-ui/core';
//estilo
import { makeStyles } from '@material-ui/core/styles';
//componentes
import CustomTypography from '../../commons/Typography/CustomTypography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CustomRadio from '../../commons/Radio/CustomRadio';
import CustomText from '../../commons/TextField/CustomText';
import Localidades from '../../Autosuggest/localidades';
import Provincia from '../../Autosuggest/provincia';
//iconos 
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        marginTop: '20px'
    },
    color: {
        color: '#2dc76d'
    },
    textoRecorrido: {
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    contenedorRecorrido: {
        display: 'flex',
        padding: '10px 0px',
        width: '500px',
        alignItems: 'center'
    }
}))
const IdaPaso2 = (props) => {
    const classes = useStyles(props);
    const { activeStep, ida, idaYvuelta, setValueHabilitado, vuelta, denuncia, setRequest, request,
        valTipoTraslado, valTipoTrasladoEspontaneo, dataCMedico, valueCentroMedico, setValueCentroMedico } = props
    const [valueDireccion, setValueDireccion] = useState('')
    const [valueLocalidad, setValueLocalidad] = useState('')
    const [valueMedico, setValueMedico] = useState('')
    const [valueDireccionDestino, setValueDireccionDestino] = useState('')
    const [valueLocalidadDestino, setValueLocalidadDestino] = useState('')
    const [valueMedicoDestino, setValueMedicoDestino] = useState('')
    const [valueMedicoDestinoIdaVuelta, setValueMedicoDestinoIdaVuelta] = useState('')
    const [valueObservaciones, setValueObservaciones] = useState('')
    const [valueObservacionesIdaVuelta, setValueObservacionesIdaVuelta] = useState('')
    //
    const [valueAutoSuggestDireccion, setValueAutoSuggestDireccion] = useState('');
    const [valueAutoSuggestLocalidad, setValueAutoSuggestLocalidad] = useState('');
    const [valueAutoSuggestDireccionDestino, setValueAutoSuggestDireccionDestino] = useState('');
    const [valueAutoSuggestLocalidadDestino, setValueAutoSuggestLocalidadDestino] = useState('');
    const [valueAutoSuggestDireccionIdaVuelta, setValueAutoSuggestDireccionIdaVuelta] = useState('');
    const [valueAutoSuggestLocalidadIdaVuelta, setValueAutoSuggestLocalidadIdaVuelta] = useState('');

    //radio
    const [valueRadioIda, setValueRadioIda] = useState('1');
    const [valueRadio, setValueRadio] = useState('1');
    //destino
    const [valueRadioDestino, setValueRadioDestino] = useState('1')
    const [seleccionado, setSeleccionado] = useState(false)
    //vuelta
    const [valueHabitacion, setValueHabitacion] = useState('')
    const [valueCama, setValueCama] = useState('')
    const [provincia1, setProvincia1] = useState(null)
    const [provincia2, setProvincia2] = useState(null)
    const [provincia3, setProvincia3] = useState(null)
    const [localidad1, setLocalidad1] = useState(null)
    const [localidad2, setLocalidad2] = useState(null)
    const [localidad3, setLocalidad3] = useState(null)
    const [dataProvincia1, setDataProvincia1] = useState('')
    const [dataProvincia2, setDataProvincia2] = useState('')
    const [dataProvincia3, setDataProvincia3] = useState('')
    const [dataLocalidad1, setDataLocalidad1] = useState('')
    const [dataLocalidad2, setDataLocalidad2] = useState('')
    const [dataLocalidad3, setDataLocalidad3] = useState('')
    const [cambioProv1, setCambioProv1] = useState(false)
    const [cambioLoc1, setCambioLoc1] = useState(false)
    const [cambio1, setCambio1] = useState(false)
    const [cambioProv2, setCambioProv2] = useState(false)
    const [cambioLoc2, setCambioLoc2] = useState(false)
    const [cambio2, setCambio2] = useState(false)
    const [cambioProv3, setCambioProv3] = useState(false)
    const [cambioLoc3, setCambioLoc3] = useState(false)
    const [cambio3, setCambio3] = useState(false)
    const newCentroMedico = dataCMedico && dataCMedico !== null ? { centroPrimerAsistencia: { ...dataCMedico } } : null;

    useEffect(() => {
        setValueRadio('1')
        setValueRadioIda('1')
    }, [activeStep])

    useEffect(() => {
        if (!cambioProv1) {
            setLocalidad1(null)
        }
        else {
            setLocalidad1('')
            setCambio1(true)
        }
    }, [provincia1])

    useEffect(() => {
        if (!cambioProv2) {
            setLocalidad2(null)
        }
        else {
            setLocalidad2('')
            setCambio2(true)
        }
    }, [provincia2])

    useEffect(() => {
        if (!cambioProv3) {
            setLocalidad3(null)
        }
        else {
            setLocalidad3('')
            setCambio3(true)
        }
    }, [provincia3])

    const getIdLocalidad = (info, local) => {
        let idLoc = info && info.filter(it => it.descripcion === local)
        const codLocaliad = idLoc && idLoc[0] && idLoc[0].codigo ? idLoc[0].codigo : null;
        return codLocaliad;
    }

    useEffect(() => {
        setRequest({
            ...request,
            localidadOrigenIdaIdLocalidad: getIdLocalidad(dataLocalidad1, localidad1)
        })
    }, [localidad1])

    useEffect(() => {
        if (idaYvuelta) {
            setRequest({
                ...request,
                localidadDestinoVueltaIdLocalidad: getIdLocalidad(dataLocalidad3, localidad3)
            })

        } else {
            setRequest({
                ...request,
                localidadDestinoIdaIdLocalidad: getIdLocalidad(dataLocalidad3, localidad3)
            })
        }
    }, [localidad3])

    useEffect(() => {
        //if (idaYvuelta) {
        setRequest({
            ...request,
            localidadDestinoIdaIdLocalidad: getIdLocalidad(dataLocalidad2, localidad2)
        })
        //}
    }, [localidad2])

    const handleChange = (event) => {
        const value = event.target.value
        setValueRadio(value);
        if (ida || vuelta) {
            setRequest({
                ...request,
                direccionDestino: denuncia && value === '1' && vuelta ? getDomicilioAccidentadoTraslado(denuncia)
                    : denuncia && value === '1' && !vuelta && newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico)
                        : denuncia && value === '1' && !vuelta ? Utils.getCentroMedicoCompleto(denuncia) : null,
                localidadDestinoIdaIdLocalidad: denuncia && value === '1' && vuelta ? Utils.getIdLocalidadDomicilio(denuncia)
                    : denuncia && value === '1' && !vuelta && newCentroMedico ? Utils.getIdLocalidadCentroMedico(newCentroMedico)
                        : denuncia && value === '1' && !vuelta ? Utils.getIdLocalidadCentroMedico(denuncia) : null,
            })
        } else {
            setRequest({
                ...request,
                direccionDestinoRegreso: denuncia &&
                    value === '1' ? getDomicilioAccidentadoTraslado(denuncia)
                    : null,
                localidadDestinoVueltaIdLocalidad: denuncia &&
                    value === '1' ? Utils.getIdLocalidadDomicilio(denuncia) : null,
            })
        }

    };


    const handleChangeIda = (event) => {
        const value = event.target.value
        setValueRadioIda(value);
        setRequest({
            ...request,
            direccionOrigen: denuncia &&
                value === '1' ? getDomicilioAccidentadoTraslado(denuncia)
                : value === '2' ? getDireccionSedeCompletoTraslado(denuncia)
                    : value === '3' ? getLugarAccidenteCompletoTraslado(denuncia) : value === 'Otro' ? valueAutoSuggestDireccion : null,
            localidadOrigenIdaIdLocalidad: denuncia &&
                value === '1' ? Utils.getIdLocalidadDomicilio(denuncia)
                : value === '2' ? Utils.getIdLocalidadTrabajo(denuncia)
                    : value === '3' ? Utils.getIdLocalidadItinere(denuncia) : value === 'Otro' ? getIdLocalidad(dataLocalidad3, localidad3) : null,
        })
    };

    const handleChangeDestino = (event) => {
        const value = event.target.value
        setValueRadioDestino(value);
        if (vuelta) {
            setRequest({
                ...request,
                direccionOrigen: denuncia && value === '1' && newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico)
                    : denuncia && value === '1' ? Utils.getCentroMedicoCompleto(denuncia) : null,
                localidadOrigenIdaIdLocalidad: denuncia && value === '1' && newCentroMedico ? Utils.getIdLocalidadCentroMedico(newCentroMedico)
                    : denuncia && value === '1' ? Utils.getIdLocalidadCentroMedico(denuncia) : null
            })
        } else {
            setRequest({
                ...request,
                direccionDestino: denuncia && value === '1' && newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico)
                    : denuncia && value === '1' ? Utils.getCentroMedicoCompleto(denuncia) : null,
                localidadDestinoIdaIdLocalidad: denuncia && value === '1' && newCentroMedico ? Utils.getIdLocalidadCentroMedico(newCentroMedico)
                    : denuncia && value === '1' ? Utils.getIdLocalidadCentroMedico(denuncia) : null
            })
        }
    };
    const onChangeValueDireccion = (event) => {
        setValueDireccion(event.target.value)
    }
    const onChangeValueMedico = (event) => {
        setValueMedico(event.target.value)
        setRequest({
            ...request,
            medicoEntregaIda: event.target.value
        })
    }
    const onChangeValueMedicoDestino = (event) => {
        setValueMedicoDestino(event.target.value)
        setRequest({
            ...request,
            medicoRecibeIda: event.target.value
        })
    }
    //ida y vuelta
    const onChangeValueMedicoDestinoIdaVuelta = (event) => {
        setValueMedicoDestinoIdaVuelta(event.target.value)
        setRequest({
            ...request,
            medicoRecibeIda: event.target.value
        })
    }
    const onChangeValueObservaciones = (event) => {
        setValueObservaciones(event.target.value)
        setRequest({
            ...request,
            observaciones: event.target.value
        })
    }
    //ida y vuelta
    const onChangeValueObservacionesIdaVuelta = (event) => {
        setValueObservacionesIdaVuelta(event.target.value)
    }
    //vuelta
    const onChangeValueHabitacion = (event) => {
        setValueHabitacion(event.target.value)
    }
    const onChangeValueCama = (event) => {
        setValueCama(event.target.value)
    }

    useEffect(() => {
        setValueHabilitado(false)
        setRequest({
            ...request,
            idCentroMedico: newCentroMedico ? Utils.getIdCentroMedico(newCentroMedico) : denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.id ? denuncia.centroPrimerAsistencia.id : null,
            centroMedico: newCentroMedico && newCentroMedico.centroPrimerAsistencia ? newCentroMedico.centroPrimerAsistencia.centroMedico : denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.centroMedico : null,
            direccionOrigen: denuncia && !vuelta ? getDomicilioAccidentadoTraslado(denuncia) : denuncia && vuelta && newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) : denuncia && vuelta ? Utils.getCentroMedicoCompleto(denuncia) : null,
            direccionDestino: denuncia && vuelta ? getDomicilioAccidentadoTraslado(denuncia) : denuncia && !vuelta && newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) : denuncia && !vuelta ? Utils.getCentroMedicoCompleto(denuncia) : null,
            localidadOrigenIdaIdLocalidad: denuncia && !vuelta ? Utils.getIdLocalidadDomicilio(denuncia) : denuncia && vuelta && newCentroMedico ? Utils.getIdLocalidadCentroMedico(newCentroMedico) : denuncia && vuelta ? Utils.getIdLocalidadCentroMedico(denuncia) : null,
            localidadDestinoIdaIdLocalidad: denuncia && vuelta ? Utils.getIdLocalidadDomicilio(denuncia) : denuncia && !vuelta && newCentroMedico ? Utils.getIdLocalidadCentroMedico(newCentroMedico) : denuncia && !vuelta ? Utils.getIdLocalidadCentroMedico(denuncia) : null,
            direccionDestinoRegreso: denuncia && idaYvuelta ? getDomicilioAccidentadoTraslado(denuncia) : null,
            localidadDestinoVueltaIdLocalidad: denuncia && idaYvuelta ? Utils.getIdLocalidadDomicilio(denuncia) : null,
            observaciones: null,
            medicoRecibeIda: null,
            medicoEntregaIda: null

        })
    }, [])

    const onChangeDireccionDestino = (event) => {
        setValueAutoSuggestDireccionDestino(event.target.value)
        if (idaYvuelta) {
            setRequest({
                ...request,
                direccionDestinoRegreso: idaYvuelta && valueRadio === 'Otro' ? event.target.value + " / " + localidad3.toString() + " - " + provincia3.toString() : null
            })
        } else {
            setRequest({
                ...request,
                direccionDestino: !idaYvuelta && valueRadio === 'Otro' ? event.target.value + "/" + localidad2.toString() + " - " + provincia2.toString() : null
            })
        }

    }

    const onChangeDireccionIdaYVuelta = (event) => {
        setValueAutoSuggestDireccionIdaVuelta(event.target.value)
        if (valueRadioDestino === 'Otro') {
            setRequest({
                ...request,
                direccionDestino: event.target.value + "/" + localidad2.toString() + " - " + provincia2.toString()
            })
        }
    }
    const onChangeDireccion = (event) => {
        setValueAutoSuggestDireccion(event.target.value)
        if (valueRadioIda === 'Otro' || valueRadioDestino === 'Otro') {
            setRequest({
                ...request,
                direccionOrigen: event.target.value + "/" + localidad1.toString() + " - " + provincia1.toString()
            })
        }
    }
    const getDomicilioAccidentadoTraslado = (denuncia) => {

        if (denuncia && denuncia.accidentado) {
            let direccion = Utils.stringNull(denuncia.accidentado.calle) + ' ' + Utils.stringNull(denuncia.accidentado.numero)
            if (denuncia.accidentado.piso) {
                direccion += ' Piso: ' + Utils.stringNull(denuncia.accidentado.piso);
            }
            if (denuncia.accidentado.depto) {
                direccion += ' Depto: ' + Utils.stringNull(denuncia.accidentado.depto);
            }
            direccion += ' ' + Utils.stringNull(denuncia.accidentado.localidadNombre) + ' - ' + Utils.stringNull(denuncia.accidentado.localidadProvinciaNombre)
            return direccion
        }
        return null
    }
    const getDireccionSedeCompletoTraslado = (denuncia) => {
        if (denuncia && denuncia.sede) {
            let direccion = Utils.stringNull(denuncia.sede.direccion) + ' ' + Utils.stringNull(denuncia.sede.nro)
            direccion += ' - ' + Utils.stringNull(denuncia.sede.localidadesDescripcion) + '  ' + Utils.stringNull(denuncia.sede.localidadesProvinciaNombre)
            return direccion
        }
        return null
    }
    const getLugarAccidenteCompletoTraslado = (denuncia) => {
        if (denuncia && denuncia.calleOcurrenciaItinere) {
            let direccion = Utils.stringNull(denuncia.calleOcurrenciaItinere) + ' ' + Utils.stringNull(denuncia.numeroOcurrenciaItinere)
            direccion += ' - ' + Utils.stringNull(denuncia.localidadItinereNombre) + ' - ' + Utils.stringNull(denuncia.localidadItinereProvinciaNombre)

            return direccion
        }
        return '-'
    }
    return (
        <Grid container spacing={2} direction={'row'} >
            {!idaYvuelta ?
                <Grid item xs={2} container alignItems='center' direction='column' className={classes.root}>
                    <Grid item>
                        <HomeOutlinedIcon htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item className={classes.color}>
                        <CustomTypography
                            text={'Origen'}
                            variant={'body2'} />
                    </Grid>
                    <Grid item>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={ida ? { height: '550px', backgroundColor: '#5151d3' } : { height: '480px', backgroundColor: '#5151d3' }} />
                    </Grid>
                    <Grid item>
                        <LocationOnOutlinedIcon htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item className={classes.color}>
                        <CustomTypography
                            text={'Destino'}
                            variant={'body2'} />
                    </Grid>
                </Grid>
                :
                <Grid item xs={2} container alignItems='center' direction='column' className={classes.root}>
                    <Grid item>
                        <HomeOutlinedIcon htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item className={classes.color}>
                        <CustomTypography
                            text={'Origen'}
                            variant={'body2'} />
                    </Grid>
                    <Grid item>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={{ height: '408px', backgroundColor: '#5151d3' }}
                        />
                    </Grid>
                    <Grid item>
                        <LocationOnOutlinedIcon htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item className={classes.color}>
                        <CustomTypography
                            text={'Destino'}
                            variant={'body2'} />
                    </Grid>
                    <Grid item>
                        <Divider
                            orientation="vertical"
                            flexItem
                            style={{ height: '374px', backgroundColor: '#5151d3' }}
                        />
                    </Grid>
                    <Grid item>
                        <LocationOnOutlinedIcon htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item className={classes.color}>
                        <CustomTypography
                            text={'Retorno'}
                            variant={'body2'} />
                    </Grid>
                </Grid>
            }

            <Grid item xs={10} container spacing={2}>
                <Grid item xs={12}>
                    <CustomTypography
                        text={'Recorrido'}
                        variant={'h6'} />
                </Grid>
                {ida || idaYvuelta ?
                    <Grid item xs={12} >
                        {/* DOMICLIO IDA */}
                        <FormControl component="fieldset" >
                            <RadioGroup aria-label="gender" name="gender1" value={valueRadioIda} onChange={handleChangeIda}>
                                <FormControlLabel
                                    value="1"
                                    control={<CustomRadio />}
                                    label={<Grid container className={classes.contenedorRecorrido} alignItems='start'>
                                        <Grid item xs={2} style={{ paddingRight: '10px', fontWeight: 500, paddingTop: '5px' }}>
                                            <CustomTypography
                                                text={'Domicilio:'}
                                                variant='subtitle2' />
                                        </Grid>
                                        <Grid item xs={10} className={classes.textoRecorrido} style={{ paddingTop: '5px' }} >
                                            <CustomTypography
                                                text={denuncia ? getDomicilioAccidentadoTraslado(denuncia) : ''}
                                                variant='subtitle2' />
                                        </Grid>
                                    </Grid>}

                                />
                                <FormControlLabel
                                    value="2"
                                    control={<CustomRadio style={{ paddingTop: '17px' }} />}
                                    label={<Grid container className={classes.contenedorRecorrido} >
                                        <Grid item xs={3} style={{ paddingRight: '10px', fontWeight: 500, paddingTop: '10px' }} >
                                            <CustomTypography
                                                text={'Lugar de trabajo:'}
                                                variant='subtitle2' />
                                        </Grid>
                                        <Grid item xs={9} className={classes.textoRecorrido} style={{ paddingTop: '7px' }}>
                                            <CustomTypography
                                                text={denuncia ? getDireccionSedeCompletoTraslado(denuncia) : ''}
                                                variant='subtitle2'
                                            />
                                        </Grid>
                                    </Grid>}
                                />
                                <FormControlLabel
                                    value="3"
                                    control={<CustomRadio />}
                                    label={<Grid container className={classes.contenedorRecorrido}>
                                        <Grid item xs={4} style={{ flexBasis: '28%', paddingRight: '10px', fontWeight: 500 }} >
                                            <CustomTypography
                                                text={'Lugar de accidente:'}
                                                variant='subtitle2'
                                            />
                                        </Grid>
                                        <Grid item xs={8} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                            <CustomTypography
                                                text={denuncia ? getLugarAccidenteCompletoTraslado(denuncia) : ''}
                                                variant='subtitle2'
                                            />
                                        </Grid>
                                    </Grid>}

                                />
                                <FormControlLabel
                                    value="Otro"
                                    control={<CustomRadio />}
                                    label={<Grid container lassName={classes.contenedorRecorrido}>
                                        <Grid item xs={4} style={{ paddingRight: '10px', fontWeight: 500 }} >
                                            <CustomTypography
                                                text={'Otro'}
                                                variant={'subtitle2'} />
                                        </Grid>
                                    </Grid>}
                                />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                    :
                    <Grid item xs={11} >
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={valueRadioDestino} onChange={handleChangeDestino}>
                                <FormControlLabel
                                    value="1"
                                    control={<CustomRadio />}
                                    label={<Grid container className={classes.contenedorRecorrido} alignItems='start'>
                                        <Grid item xs={4} style={{ flexBasis: '22%', paddingRight: '10px', fontWeight: 500 }} >
                                            <CustomTypography
                                                text={' Centro Médico:'}
                                                variant={'subtitle2'}
                                            />
                                        </Grid>
                                        <Grid item xs={8} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                            <CustomTypography
                                                text={newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) :
                                                    denuncia ? Utils.getCentroMedicoCompleto(denuncia) : ''}
                                                variant='subtitle2'
                                            />
                                        </Grid>
                                    </Grid>
                                    }
                                />
                                <FormControlLabel
                                    value="Otro"
                                    control={<CustomRadio />}
                                    label={<Grid container lassName={classes.contenedorRecorrido}>
                                        <Grid item xs={4} style={{ paddingRight: '10px', fontWeight: 500 }} >
                                            <CustomTypography
                                                text={'Otro'}
                                                variant={'subtitle2'}
                                            />
                                        </Grid>
                                    </Grid>
                                    }
                                />
                            </RadioGroup>
                        </FormControl>

                    </Grid>
                }
                <Grid item xs={6}>
                    <Provincia
                        valueProvincia={provincia1}
                        setValueProvincia={setProvincia1}
                        setDataProvincia={setDataProvincia1}
                        denuncia={denuncia}
                        setCambioProv={setCambioProv1}
                        disabled={(vuelta && valueRadioDestino !== 'Otro')
                            || ((ida || idaYvuelta) && valueRadioIda !== 'Otro')
                            ? true : false}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Localidades
                        valueLocalidades={localidad1}
                        setValueLocalidades={setLocalidad1}
                        dataProvincia={dataProvincia1}
                        disabledLocalidad={!provincia1 ? true : false}
                        denuncia={denuncia}
                        setCambioLoc={setCambioLoc1}
                        prov={provincia1}
                        cambioProv={cambioProv1}
                        cambio={cambio1}
                        setDataLocalidad={setDataLocalidad1} />
                </Grid>
                <Grid item xs={12}>
                    <CustomText
                        label={'Dirección'}
                        value={valueAutoSuggestDireccion}
                        id={'direccion'}
                        shrink={true}
                        disabled={(vuelta && valueRadioDestino !== 'Otro')
                            || ((ida || idaYvuelta) && valueRadioIda !== 'Otro')
                            ? true : false}
                        onChange={(event) => onChangeDireccion(event)} />
                </Grid>
                {valTipoTrasladoEspontaneo !== 1 ?
                    <Grid item xs={6}>
                        <CustomText
                            label={'Médico entrega'}
                            value={valueMedico}
                            id={'medico'}
                            shrink={true}
                            placeholder={'nombre médico'}
                            fullwidth={true}
                            onChange={(event) => onChangeValueMedico(event)} />
                    </Grid>
                    : null}
                <Grid item xs={12}></Grid>

                {!ida && !idaYvuelta ?
                    <>
                        <Grid item xs={4}>
                            <CustomText
                                label={'Habitación'}
                                value={valueHabitacion}
                                id={'Habitacion'}
                                shrink={true}
                                //placeholder={'nombre médico'}
                                fullwidth={true}
                                onChange={(event) => onChangeValueHabitacion(event)} />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomText
                                label={'Cama'}
                                value={valueCama}
                                id={'Cama'}
                                shrink={true}
                                //placeholder={'nombre médico'}
                                fullwidth={true}
                                onChange={(event) => onChangeValueCama(event)} />
                        </Grid>
                    </>

                    : null}

                {idaYvuelta && valTipoTrasladoEspontaneo !== 1 ?
                    <>
                        {/* COMPONENTE RADIO CENTRO MEDICO */}
                        < Grid item xs={11} >
                            <FormControl component="fieldset" >
                                <RadioGroup aria-label="gender" name="gender1" value={valueRadioDestino} onChange={handleChangeDestino}>
                                    <FormControlLabel
                                        value="1"
                                        control={<CustomRadio />}
                                        label={<Grid container className={classes.contenedorRecorrido} alignItems='start'>
                                            <Grid item xs={4} style={{ flexBasis: '28%', paddingRight: '10px', fontWeight: 500 }} >
                                                <CustomTypography
                                                    text={'Centro Médico:'}
                                                    variant='subtitle2'
                                                />
                                            </Grid>
                                            <Grid item xs={8} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                                <CustomTypography
                                                    text={newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) :
                                                        denuncia ? Utils.getCentroMedicoCompleto(denuncia) : ''}
                                                    variant='subtitle2'
                                                />
                                            </Grid>
                                        </Grid>
                                        }
                                    />
                                    <FormControlLabel
                                        value="Otro"
                                        control={<CustomRadio />}
                                        label={<Grid container className={classes.contenedorRecorrido}>
                                            <Grid item xs={4} style={{ paddingRight: '10px', fontWeight: 500 }} >
                                                <CustomTypography
                                                    text={'Otro'}
                                                    variant={'subtitle2'}
                                                />
                                            </Grid>
                                        </Grid>
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                        {/* QUE SOY: SOY DESTINO IDA Y VUELTA */}
                        <Grid item xs={6}>
                            <Provincia
                                valueProvincia={provincia2}
                                setValueProvincia={setProvincia2}
                                setDataProvincia={setDataProvincia2}
                                denuncia={denuncia}
                                setCambioProv={setCambioProv2}
                                disabled={valueRadioDestino !== 'Otro' ? true : false
                                    ? true : false}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Localidades
                                valueLocalidades={localidad2}
                                setValueLocalidades={setLocalidad2}
                                dataProvincia={dataProvincia2}
                                disabledLocalidad={!provincia2 ? true : false}
                                denuncia={denuncia}
                                setCambioLoc={setCambioLoc2}
                                prov={provincia2}
                                cambioProv={cambioProv2}
                                cambio={cambio2}
                                setDataLocalidad={setDataLocalidad2} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomText
                                label={'Dirección'}
                                value={valueAutoSuggestDireccionIdaVuelta}
                                id={'direccion'}
                                shrink={true}
                                disabled={valueRadioDestino !== 'Otro' ? true : false}
                                onChange={(event) => onChangeDireccionIdaYVuelta(event)} />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomText
                                label={'Médico recibe'}
                                value={valueMedicoDestinoIdaVuelta}
                                id={'medicoDestino'}
                                placeholder={'nombre médico'}
                                shrink={true}
                                fullwidth={true}
                                onChange={(event) => onChangeValueMedicoDestinoIdaVuelta(event)} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomText
                                label={'Observaciones'}
                                value={valueObservacionesIdaVuelta}
                                id={'Observaciones'}
                                placeholder={'ingresar observaciones'}
                                shrink={true}
                                fullwidth={true}
                                onChange={(event) => onChangeValueObservacionesIdaVuelta(event)} />
                        </Grid>
                    </>
                    : idaYvuelta && valTipoTrasladoEspontaneo === 1 ?
                        <>
                            {/* COMPONENTE RADIO CENTRO MEDICO */}
                            < Grid item xs={11} >
                                <FormControl component="fieldset" >
                                    <RadioGroup aria-label="gender" name="gender1" value={valueRadioDestino} onChange={handleChangeDestino}>
                                        <FormControlLabel
                                            value="1"
                                            control={<CustomRadio />}
                                            label={<Grid container className={classes.contenedorRecorrido} alignItems='start'>
                                                <Grid item xs={4} style={{ flexBasis: '28%', paddingRight: '10px', fontWeight: 500 }} >
                                                    <CustomTypography
                                                        text={'Centro Médico:'}
                                                        variant='subtitle2'
                                                    />
                                                </Grid>
                                                <Grid item xs={8} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                                    <CustomTypography
                                                        text={newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) :
                                                            denuncia ? Utils.getCentroMedicoCompleto(denuncia) : ''}
                                                        variant='subtitle2'
                                                    />
                                                </Grid>
                                            </Grid>
                                            }
                                        />
                                        <FormControlLabel
                                            value="Otro"
                                            control={<CustomRadio />}
                                            label={<Grid container className={classes.contenedorRecorrido}>
                                                <Grid item xs={4} style={{ paddingRight: '10px', fontWeight: 500 }} >
                                                    <CustomTypography
                                                        text={'Otro'}
                                                        variant={'subtitle2'}
                                                    />
                                                </Grid>
                                            </Grid>
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>

                            {/* QUE SOY: SOY DESTINO IDA Y VUELTA */}
                            <Grid item xs={6}>
                                <Provincia
                                    valueProvincia={provincia2}
                                    setValueProvincia={setProvincia2}
                                    setDataProvincia={setDataProvincia2}
                                    denuncia={denuncia}
                                    setCambioProv={setCambioProv2}
                                    disabled={valueRadioDestino !== 'Otro' ? true : false
                                        ? true : false}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Localidades
                                    valueLocalidades={localidad2}
                                    setValueLocalidades={setLocalidad2}
                                    dataProvincia={dataProvincia2}
                                    disabledLocalidad={!provincia2 ? true : false}
                                    denuncia={denuncia}
                                    setCambioLoc={setCambioLoc2}
                                    prov={provincia2}
                                    cambioProv={cambioProv2}
                                    cambio={cambio2}
                                    setDataLocalidad={setDataLocalidad2} />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomText
                                    label={'Dirección'}
                                    value={valueAutoSuggestDireccionIdaVuelta}
                                    id={'direccion'}
                                    shrink={true}
                                    disabled={valueRadioDestino !== 'Otro' ? true : false}
                                    onChange={(event) => onChangeDireccionIdaYVuelta(event)} />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomText
                                    label={'Observaciones'}
                                    value={valueObservacionesIdaVuelta}
                                    id={'Observaciones'}
                                    placeholder={'ingresar observaciones'}
                                    shrink={true}
                                    fullwidth={true}
                                    onChange={(event) => onChangeValueObservacionesIdaVuelta(event)} />
                            </Grid>
                        </>
                        : null}
                <Grid item xs={12}> <div style={{ height: '25px' }}></div></Grid>
                <Grid item xs={12} >
                    <FormControl component="fieldset" style={{ width: 'max-content' }}>
                        <RadioGroup aria-label="gender" name="gender1" value={valueRadio} onChange={handleChange}>
                            <FormControlLabel
                                value="1"
                                control={<CustomRadio />}
                                label={<Grid container className={classes.contenedorRecorrido} alignItems='start'>
                                    {ida ?
                                        <>
                                            <Grid item xs={4} style={{ flexBasis: '22%', paddingRight: '10px', fontWeight: 500 }} >
                                                <CustomTypography
                                                    text={'Centro Médico:'}
                                                    variant='subtitle2' />
                                            </Grid>

                                            <Grid item xs={8} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                                <CustomTypography
                                                    text={newCentroMedico ? Utils.getCentroMedicoCompleto(newCentroMedico) :
                                                        denuncia ? Utils.getCentroMedicoCompleto(denuncia) : ''}
                                                    variant='subtitle2'
                                                />
                                            </Grid>
                                        </>
                                        :
                                        <>
                                            <Grid item xs={2} style={{ paddingRight: '10px', fontWeight: 50, paddingTop: '5px' }}>
                                                <CustomTypography
                                                    text={'Domicilio:'}
                                                    variant='subtitle2'
                                                />
                                            </Grid>
                                            <Grid item xs={10} style={{ textTransform: 'uppercase', fontSize: '12px', }}>
                                                <CustomTypography
                                                    text={denuncia ? getDomicilioAccidentadoTraslado(denuncia) : ''}
                                                />
                                            </Grid>
                                        </>
                                    }
                                </Grid>
                                }
                            />

                            <FormControlLabel
                                value="Otro"
                                control={<CustomRadio />}
                                label={<CustomTypography
                                    text={'Otro'}
                                    variant={'subtitle2'} />}
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* QUE SOY: SOY DESTINO EN IDA, SOY DESTINO EN VUELTA Y SOY RETORNO EN IDA Y VUELTA */}

                <Grid item xs={6}>
                    <Provincia
                        valueProvincia={provincia3}
                        setValueProvincia={setProvincia3}
                        setDataProvincia={setDataProvincia3}
                        denuncia={denuncia}
                        setCambioProv={setCambioProv3}
                        disabled={valueRadio !== 'Otro' ? true : false}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Localidades
                        valueLocalidades={localidad3}
                        setValueLocalidades={setLocalidad3}
                        dataProvincia={dataProvincia3}
                        disabledLocalidad={!provincia3 ? true : false}
                        denuncia={denuncia}
                        setCambioLoc={setCambioLoc3}
                        prov={provincia3}
                        cambioProv={cambioProv3}
                        cambio={cambio3}
                        setDataLocalidad={setDataLocalidad3} />
                </Grid>
                <Grid item xs={12}>
                    <CustomText
                        label={'Dirección'}
                        value={valueAutoSuggestDireccionDestino}
                        id={'direccion'}
                        shrink={true}
                        disabled={valueRadio !== 'Otro' ? true : false}
                        onChange={(event) => onChangeDireccionDestino(event)} />
                </Grid>
                {valTipoTrasladoEspontaneo !== 1 && ida ?
                    <Grid item xs={6}>
                        <CustomText
                            label={'Médico recibe'}
                            value={valueMedicoDestino}
                            id={'medicoDestino'}
                            placeholder={'nombre médico'}
                            shrink={true}
                            fullwidth={true}
                            onChange={(event) => onChangeValueMedicoDestino(event)} />
                    </Grid>
                    : null
                }
                <Grid item xs={12}>
                    <CustomText
                        label={'Observaciones'}
                        value={valueObservaciones}
                        id={'Observaciones'}
                        placeholder={'ingresar observaciones'}
                        shrink={true}
                        fullwidth={true}
                        onChange={(event) => onChangeValueObservaciones(event)} />
                </Grid>
            </Grid >
            <Grid item xs={12}></Grid>

        </Grid >

    )
}
IdaPaso2.propTypes = {
    activeStep: PropTypes.any,
    ida: PropTypes.any,
    idaYvuelta: PropTypes.any,
    setValueHabilitado: PropTypes.any,
    vuelta: PropTypes.any
};
export default IdaPaso2