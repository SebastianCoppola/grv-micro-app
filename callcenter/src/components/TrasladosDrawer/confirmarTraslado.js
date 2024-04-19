import React, { useState } from 'react'
//Utils:
import Utils from '../../Utils/utils'
import { INFORMACION_SERVICIO_TRASLADO_CONFIRMACION, SNACK_MESSAGE, SNACK_SEVERITY, SNACK_VERTICAL } from '../../Utils/const'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
//Mui:
import { RadioGroup, FormControl, Divider, Grid, FormControlLabel } from '@material-ui/core'
import { HomeOutlined, LocationOnOutlined } from '@material-ui/icons/'
//componentes:
import CustomTypography from '../commons/Typography/CustomTypography'
import CustomRadio from '../commons/Radio/CustomRadio'
import CustomText from '../commons/TextField/CustomText'
import CustomButton from '../commons/Button/CustomButton'

const ConfirmarTraslado = (props) => {

    const { data, valAgencia, setValAgencia, detalleTraslado, setSnackbar } = props
    
    const dispatch = useDispatch()
    
    const [valueObservaciones, setValueObservaciones] = useState('')
    
    const handleChangeSelectAgencia = (event) => {
        setValAgencia(parseInt(event.target.value))
    }

    const onChangeValueObservaciones = (event) => {
        setValueObservaciones(event.target.value)
    }

    const onGuardarObservacion = () => {
        let cb = (success) => {
            setSnackbar({
                open: true, 
                title: success ? SNACK_MESSAGE.SAVE_OBS_TRASLADO_SUCCESS : SNACK_MESSAGE.SAVE_OBS_TRASLADO_ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR
            })
        }
        let request = {
            idTraslado : data.idTraslado,
            observacion : valueObservaciones
        }
        dispatch(actions.fetchSaveObservacion(request, cb))
    }

    return (
        <Grid spacing={4} container style={{ flexGrow: 1 }}>

            <Grid item xs={12} >
                <Grid item spacing={1} container justify='space-between' xs={12} style={{ backgroundColor: '#f5f5f5', padding: '15px' }}>
                    <Grid item >
                        <CustomTypography text={<div style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '10px' }}>
                                Denuncia:
                            </div>
                            <div >
                                <strong>{data ? Utils.nroAsignadoProvisorio3(data): ''}
                                </strong>
                            </div>
                        </div>} variant='body2' />
                    </Grid>
                    <Grid item >
                        <CustomTypography text={<div style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '10px' }}>
                                Accidentado:
                            </div>
                            <div ><strong>{data ? data.nombreAccidentado : ''}</strong></div>
                        </div>} variant='body2' />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid item spacing={2} container style={{ border: '1px solid #dadce0' }}>
                    <Grid item xs={12}>
                        <CustomTypography text={'Datos Traslado'} variant='h6' fontweight='500' />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={7} spacing={1} >
                        <Grid item xs={12}>
                            <CustomTypography 
                                text={
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ paddingRight: '10px' }}>
                                            Fecha:
                                        </div>
                                        <div>
                                            <strong>
                                                {detalleTraslado && detalleTraslado.fechaTraslado ? Utils.dateFormat(detalleTraslado.fechaTraslado) : ''}
                                            </strong>
                                        </div>
                                    </div>
                                } 
                                variant='body2' 
                            />
                        </Grid>
                        <Grid item>
                            <CustomTypography text={<div style={{ display: 'flex' }}>
                                <div style={{ paddingRight: '10px' }}>
                                    Hora:
                                </div>
                                <div ><strong>{detalleTraslado && detalleTraslado.horaTraslado ? detalleTraslado.horaTraslado : ''}</strong></div>
                            </div>} variant='body2' />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography text={<div style={{ display: 'flex' }}>
                                <div style={{ paddingRight: '10px' }}>
                                    Centro Médico:
                                </div>
                                <div ><strong>{detalleTraslado && detalleTraslado.centroMedico ? detalleTraslado.centroMedico : ''}</strong></div>
                            </div>} variant='body2' />
                        </Grid>
                        <Grid item>
                            <CustomTypography text={<div style={{ display: 'flex' }}>
                                <div style={{ paddingRight: '10px' }}>
                                    Tipo Traslado:
                                </div>
                                <div ><strong>{data && data.tipoTrasladoDescripcion ? data.tipoTrasladoDescripcion : ''}</strong></div>
                            </div>} variant='body2' />
                        </Grid>

                    </Grid>
                    <Grid item container xs={5} justify='center' spacing={1} >
                        <Grid item xs={12} >
                            <CustomTypography
                                text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        Tipo Viaje:
                                    </div>
                                    <div >
                                        <strong>{data && data.tipoViajeDescripcion ? data.tipoViajeDescripcion : ''}</strong>
                                    </div>
                                </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomTypography
                                text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        Estado del Viaje:
                                    </div>
                                    <div >
                                        <strong>{data && data.estadoTrasladoDescripcion ? data.estadoTrasladoDescripcion : ''}</strong>
                                    </div>
                                </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography
                                text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        Código:
                                    </div>
                                    <div style={detalleTraslado && detalleTraslado.codigoIda === 'ROJO' ? { color: '#e34850' } :
                                        detalleTraslado && detalleTraslado.codigoIda === 'VERDE' ? { color: '#2dc76d' } :
                                            detalleTraslado && detalleTraslado.codigoIda === 'AMARILLO' ? { color: '#FDC800' } : null}>
                                        <strong>{detalleTraslado && detalleTraslado.codigoIda ? detalleTraslado.codigoIda : ''}</strong>
                                    </div>
                                </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12} >
                            <CustomTypography
                                text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        Diagnóstico Presuntivo:
                                    </div>
                                    <div >
                                        <strong>{detalleTraslado && detalleTraslado.diagnosticoPresuntivo ? detalleTraslado.diagnosticoPresuntivo : ''}</strong>
                                    </div>
                                </div>}
                                variant='body2' />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid item spacing={2} alignItems='center' container style={{ border: '1px solid #dadce0' }}>
                    <Grid item xs={12}>
                        <CustomTypography text={'Recorrido'} variant='h6' fontweight='500' />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={1}>
                        <HomeOutlined htmlColor={'#2dc76d'} />
                    </Grid>
                    <Grid item xs={11}>
                        <CustomTypography
                            text={<strong> Origen: {data && data.direccionOrigen ? data.direccionOrigen : ''}</strong>}
                            variant='body2' />
                    </Grid>
                    {detalleTraslado && detalleTraslado.direccionDestinoRegreso !== null ?
                        <>
                            <Grid item xs={1}>
                                <LocationOnOutlined htmlColor={'#2dc76d'} />
                            </Grid>
                            <Grid item xs={11}>
                                <CustomTypography
                                    text={<strong>Destino: {detalleTraslado && detalleTraslado.direccionDestino ? detalleTraslado.direccionDestino : ''}</strong>}
                                    variant='body2' />
                            </Grid>
                        </>
                        : null}

                    <Grid item xs={1}>
                        {detalleTraslado && detalleTraslado.direccionDestinoRegreso !== null ? <HomeOutlined htmlColor={'#2dc76d'} /> : <LocationOnOutlined htmlColor={'#2dc76d'} />}
                    </Grid>
                    <Grid item xs={11}>
                        <CustomTypography
                            text={<strong>{detalleTraslado && detalleTraslado.direccionDestinoRegreso !== null ? 'Regreso: ' : 'Destino: '} 
                            {data && data.direccionDestinoRegreso ? data.direccionDestinoRegreso : data && data.direccionDestino ? data.direccionDestino : ''}</strong>}
                            variant='body2' />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid item spacing={2} container style={{ border: '1px solid #dadce0' }}>
                    <Grid item xs={12}>
                        <CustomTypography text={'Servicio traslado'} variant='h6' fontweight='500' />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    { data && data.idEstadoTraslado === 11 ?
                        <Grid item xs={12}>
                            <CustomTypography
                                text={INFORMACION_SERVICIO_TRASLADO_CONFIRMACION}
                                variant='body2' 
                            />
                        </Grid>
                    : null }
                    <Grid item xs={12}>
                        <FormControl component="fieldset" style={{ width: 'max-content' }}>
                            <RadioGroup 
                                aria-label="gender" 
                                name="gender1" 
                                value={((data && data.idEstadoTraslado ===2) || (data && data.idEstadoTraslado === 1)) ? 1 :valAgencia}
                                onChange={(event, item) => handleChangeSelectAgencia(event)}
                            >
                                {detalleTraslado && detalleTraslado.servicios &&
                                    detalleTraslado.servicios.map((agencia, index) => {
                                        return (
                                            <FormControlLabel
                                                key={index}
                                                control={<CustomRadio />}
                                                value={((data && data.idEstadoTraslado ===2) || (data && data.idEstadoTraslado === 1))? 1 :agencia.codigo}
                                                label={agencia.razonSocial}
                                            />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid item spacing={2} container style={{ border: '1px solid #dadce0' }}>
                    <Grid item xs={12}>
                        <CustomTypography text={'Observaciones'} variant='h6' fontweight='500' />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomText
                            value={valueObservaciones}
                            placeholder={detalleTraslado && detalleTraslado.observaciones ? detalleTraslado.observaciones : ''}
                            shrink={true}
                            fullwidth={true}
                            onChange={(event) => onChangeValueObservaciones(event)} 
                        />
                    </Grid>
                    <Grid item xs={12} container justify='flex-end'>
                        <CustomButton
                            label={'Guardar observacion'}
                            variant={'outlined'}
                            isAction={true}
                            color={'secondary'}
                            onClik={onGuardarObservacion}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ConfirmarTraslado