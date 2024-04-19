import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { ROJO, VERDE, AMARILLO } from '../../../Utils/const'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions/index'
//material-ui
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
//estilo
import { makeStyles } from '@material-ui/core/styles';
//componentes
import CustomText from '../../commons/TextField/CustomText';
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker';
import CustomSelect from '../../commons/Select/customSelect';
import CustomTypography from '../../commons/Typography/CustomTypography';
import CustomChip from '../../commons/Chip/CustomChip';
import CustomRadio from '../../commons/Radio/CustomRadio';
import BusquedaCentroMedico from '../../Autosuggest/BusquedaCentrosMedicos';

const useStyles = makeStyles((theme) => ({
    iconoRojo: {
        color: 'red'
    },
    iconoVerde: {
        color: 'green',
    },
    titleRadio: {
        '&.MuiFormLabel-root': {
            fontSize: '0.75rem',
            letterSpacing: '0.033em',
            lineHeight: 1.66
        }
    }
}))

const IdaPaso1 = (props) => {
    const classes = useStyles(props);
    const { valTipoTraslado, setValTipoTraslado, setValTipoTrasladoEspontaneo,
        valTipoTrasladoEspontaneo, setValueHabilitado, denuncia, setFechaTraslado, setHoraTraslado, fechaTraslado, horaTraslado,
        setRequest, request, ida, dataCMedico, setDataCMedico, valueCentroMedico, setValueCentroMedico } = props
    const [valueCentroMedico2, setValueCentroMedico2] = useState(denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.razonSocial : '')
    //CENTRO MEDICO
    const [dataCentromedico, setDataCentroMedico] = useState(null)
    const [codigoIdProvincia, setCodigoIdProvincia] = useState(null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = useState(null)
    const [seleccionado2, setSeleccionado2] = useState(false)
    const servicios = useSelector(state => state.traslados.serviciosTraslados ? state.traslados.serviciosTraslados : null)
    const tipoTraslados = useSelector(state => state.listados.tipoTraslados ? state.listados.tipoTraslados : null)
    const tipoViaje = useSelector(state => state.listados.tipoViaje ? state.listados.tipoViaje : null)
    const codigoAmbulancia = useSelector(state => state.listados.codigoAmbulancia ? state.listados.codigoAmbulancia : null)
    const [valChip, setValChip] = useState()
    const [valueOtrosServicios, setValueOtrosServicios] = useState('')
    const [valueDiagnósticoPresuntivo, setValueDiagnósticoPresuntivo] = useState(denuncia ? denuncia.diagnosticoDeCerteza : null)
    const [valServicio, setValServicio] = useState(servicios)
    const dispatch = useDispatch()

    useEffect(() => {
        if (denuncia) {
            setValueCentroMedico2(denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.razonSocial : '')
            setValueDiagnósticoPresuntivo(denuncia ? denuncia.diagnosticoDeCerteza : null)
        }
    }, [denuncia])

    const onChangeValueCentroMedico = (event) => {
        setValueCentroMedico2(event.target.value)
    }

    useEffect(() => {
        setHoraTraslado(new Date().toString().substring(16, 21))
        dispatch(actions.serchTipoTraslado())
        dispatch(actions.serchTipoViaje())
    }, [])

    const onChangeHoraTraslado = (event) => {
        setHoraTraslado(event.target.value)
    }
    const handleChangeSelectTipoTraslado = (event) => {
        setValTipoTraslado(parseInt(event.target.value))
    }

    const handleChangeSelectTipoTrasladoEspontaneo = (event) => {
        setValTipoTrasladoEspontaneo(event.target.value)
    }
    const onClickChip = (event, it) => {
        setValChip(it.codigo)
        setRequest({
            ...request,
            codigoTrasladoAmbulanciaIda: it.codigo,
            codigoTrasladoAmbulanciaVuelta: it.codigo
        })
    }
    const onChangeValueOtrosServicios = (event) => {
        setValueOtrosServicios(event.target.value)
        setRequest({
            ...request,
            otroServicio: event.target.value
        })
    }
    const onChangeValueDiagnósticoPresuntivo = (event) => {
        setValueDiagnósticoPresuntivo(event.target.value)
        setRequest({
            ...request,
            diagnosticoPresuntivo: event.target.value
        })

    }
    const onClickServicios = (codigo) => {
        let solicitado = []
        setValServicio(valServicio.map((i, index2) => {
            if (codigo === i.codigo) {
                return (
                    { ...i, verificado: !i.verificado }
                )
            } else {
                return { ...i }
            }
        })
        )
        // setRequest({
        //     ...request,
        //     serviciosSolicitados: valServicio
        // })
    }

    if (valTipoTrasladoEspontaneo !== null && valTipoTraslado !== null && (valueCentroMedico || valueCentroMedico2)) {
        setValueHabilitado(false)
    } else {
        setValueHabilitado(true)

    }

    useEffect(() => {
        setValTipoTraslado(null)
        if (valTipoTrasladoEspontaneo === 2) {
            dispatch(actions.fetchServicios())
            dispatch(actions.serchCodigoAmbulancia())
        }
    }, [valTipoTrasladoEspontaneo])

    useEffect(() => {
        setValServicio(servicios)
        setRequest({
            ...request,
            serviciosSolicitados: valServicio
        })
    }, [servicios])
    useEffect(() => {
        //setValServicio(servicios)
        setRequest({
            ...request,
            serviciosSolicitados: valServicio
        })
    }, [valServicio])
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    useEffect(() => {
        if ((valueCentroMedico || valueCentroMedico2) && dataCentromedico) {
            const centoSeleccionado = dataCentromedico.filter(it => it.razonSocial === valueCentroMedico || it.razonSocial === valueCentroMedico2);
            setDataCMedico(centoSeleccionado && centoSeleccionado.length > 0 ? centoSeleccionado[0] : null)
        } else {
            setDataCMedico(null)
        }
    }, [dataCentromedico, valueCentroMedico2])

    return (
        <Grid container spacing={2} alignItems='flex-end' style={{ margin: '5px 10px' }}>
            <Grid item xs={4}>
                <CustomDatePicker
                    selectedDate={fechaTraslado}
                    setSelectedDate={setFechaTraslado}
                    title={'Fecha'}
                    label={'Fecha'}
                    shrink={true}
                    fontSize={'13px'}
                />
            </Grid>
            <Grid item xs={4}>
                <CustomText
                    defaultValue={horaTraslado}
                    type={'time'}
                    id='time'
                    width={'100%'}
                    value={horaTraslado}
                    onChange={(event) => onChangeHoraTraslado(event)}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    style={{ color: 'rgba(0, 0, 0, 0.54)', paddingBottom: '50%' }}
                    text={'Centro médico'}
                    variant={'caption'}
                />

            </Grid>
            <Grid item xs={8}>
                <BusquedaCentroMedico
                    sinLocalidad={true}
                    valueCentroMedico={valueCentroMedico2 ? valueCentroMedico2 : valueCentroMedico ? valueCentroMedico : valueCentroMedico2}
                    setValueCentroMedico={setValueCentroMedico2}
                    dataDenuncia={denuncia}
                    idProvincia={codigoIdProvincia}
                    idLocalidad={codigoIdLocalidad}
                    denuncia={denuncia}
                    seleccionado2={seleccionado2}
                    setSeleccionado2={setSeleccionado2}
                    setDataCentroMedico={setDataCentroMedico}
                />
            </Grid>
            <Grid item xs={7}>
                <CustomSelect
                    titulo={'Tipo de Traslado'}
                    placeholder={'Seleccionar'}
                    data={tipoTraslados}
                    fullwidth={true}
                    handleChangeSelect={(event) => handleChangeSelectTipoTrasladoEspontaneo(event)}
                    val={valTipoTrasladoEspontaneo ? valTipoTrasladoEspontaneo : ""} />
            </Grid>

            <Grid item xs={7}>
                <FormControl component="fieldset" style={{ width: 'max-content' }}>
                    <FormLabel className={classes.titleRadio} focused={false} component="legend">Tipo de Viaje</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={valTipoTraslado}
                        onChange={(event, item) => handleChangeSelectTipoTraslado(event)}>
                        {tipoViaje ? tipoViaje.map((item) => {
                            return (
                                <FormControlLabel
                                    value={item.codigo}
                                    control={<CustomRadio />}
                                    label={item.descripcion}

                                />
                            )
                        }) : null}
                    </RadioGroup>
                </FormControl>
            </Grid>

            {valTipoTrasladoEspontaneo === 2 ?
                <>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={'Seleccionar código'}
                            variant={'subtitle2'}
                        />
                    </Grid>
                    {codigoAmbulancia && codigoAmbulancia.map((it, index) => {
                        return (
                            <Grid item key={index}>
                                <CustomChip
                                    fontSize={true}
                                    avatar={<FiberManualRecordIcon
                                        style={valChip === it.codigo && it.descripcion === ROJO ? { color: '#e34850' } :
                                            valChip === it.codigo && it.descripcion === VERDE ? { color: ' #2DC76D' } :
                                                valChip === it.codigo && it.descripcion === AMARILLO ? { color: '#FDC800' } : null} />}
                                    colorLabel={valChip === it.codigo ? capitalize(it.descripcion) : null}
                                    label={capitalize(it.descripcion)}
                                    onClick={(event,) => onClickChip(event, it)}
                                    style={valChip === it.codigo && it.descripcion === ROJO ? { backgroundColor: 'white', color: '#e34850' } :
                                        valChip === it.codigo && it.descripcion === VERDE ? { backgroundColor: 'white', color: ' #2DC76D' } :
                                            valChip === it.codigo && it.descripcion === AMARILLO ? { backgroundColor: 'white', color: '#FDC800' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                                />
                            </Grid>
                        )
                    })
                    }

                    <Grid item xs={12}>
                        <CustomTypography
                            text={'Seleccionar Servicios solicitados'}
                            variant={'subtitle2'} />
                    </Grid>
                    {valServicio ? valServicio.map((it, index) => {
                        return (
                            <Grid item >
                                <CustomChip
                                    onClick={() => onClickServicios(it.codigo)}
                                    style={it && it.verificado ? { border: '2px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                                    fontSize={true}
                                    label={it.descripcion}
                                    avatar={<FiberManualRecordIcon />} />
                            </Grid>
                        )
                    })
                        : null
                    }

                    <Grid item xs={10}>
                        <CustomText
                            label={'Otros servicios'}
                            value={valueOtrosServicios}
                            id={'OtrosServicios'}
                            shrink={true}
                            fullwidth={true}
                            onChange={(event) => onChangeValueOtrosServicios(event)} />
                    </Grid>

                    <Grid item xs={10}>
                        <CustomText
                            label={'Diagnóstico presuntivo'}
                            value={valueDiagnósticoPresuntivo}
                            id={'DiagnósticoPresuntivo'}
                            shrink={true}
                            fullwidth={true}
                            disabled={true}
                            onChange={(event) => onChangeValueDiagnósticoPresuntivo(event)} />
                    </Grid>
                </>
                : null}

        </Grid >

    )
}
IdaPaso1.propTypes = {
    valTipoTraslado: PropTypes.any,
    setValTipoTraslado: PropTypes.any,
    setValTipoTrasladoEspontaneo: PropTypes.any,
    setValueHabilitado: PropTypes.any
};
export default IdaPaso1

