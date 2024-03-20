import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FormControlLabel, Grid, Switch, TextField, Typography } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import CustomButton from '../../../commons/Button/CustomButton'
import CustomDialogoPlano from '../../../commons/Dialogo/CustomDialogoPlano'
import CustomTypography from '../../../commons/Typography/CustomTypography'


const Versionar = props => {
    const { nuevosCambios, setNuevosCambios, setOpenModal, setValue, setOpenAlert2,
        setVersionarFuturo1, versionarFuturo2, onClickSaveActual, dateValue, setDateValue } = props

    const history = useHistory()
    const dateHoy = new Date()
    const [switchValue, setSwitchValue] = useState(false)
    const [saveConvenioFuturo, setSaveConvenioFuturo] = useState(false)
    const [showCartel, setShowCartel] = useState(true)
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    const [labelVersionarConEdicionFecha,setLabelVersionarConEdicionFecha] = useState('Guardar convenio a futuro')
    //Cierro Alert Versionar al reenderizar el componente.
    useEffect(() => {
        setOpenAlert2((prevStatus) => ({ ...prevStatus, "open": false }))
    }, [])

    //Reinicializo el componente al salir del segundo Modal de versionar futuro.  
    useEffect(() => {
        if (!versionarFuturo2) {
            setSwitchValue(false)
            setSaveConvenioFuturo(false)
        }
    }, [versionarFuturo2])
    //Manejo el label del boton cuando el switch para editar la fecha se modifica:
    //Set showCartel TRUE/FALSE.  
    useEffect(() => {
        let hoy = dateHoy.getFullYear() + '-' 
            + (dateHoy.getMonth()+1 > 9 ? (dateHoy.getMonth()+1) : '0' + (dateHoy.getMonth()+1)) + '-' 
            + dateHoy.getDate()
        let formatedDateValue = Math.ceil(new Date(dateValue).getTime() / 1000 / 60 / 60 / 24)
        let formatedDateHoy = Math.floor(dateHoy.getTime() / 1000 / 60 / 60 / 24)
        let esFuturo = formatedDateHoy < formatedDateValue
        if (switchValue){
            console.log('entro '+switchValue)
            console.log('entro esfuturo '+esFuturo)  
            esFuturo ? setLabelVersionarConEdicionFecha('Guardar convenio a futuro') :
            setLabelVersionarConEdicionFecha ('Versionar convenio actual')
        }
        if(dateValue === hoy){setShowCartel(true)}
        else{setShowCartel(false)}
    }, [dateValue,switchValue])

    //ChangeDate
    const handleChangeDate = (e) => {
        setDateValue(e.target.value)
        if (dateValue !== null) {
            setSaveConvenioFuturo(true)
        }
    }

    //Botones convenio futuro 
    const onClickCancelFuturo = () => {
                setSwitchValue(!switchValue)
    }
    const onClickSaveFuturo = () => {
        let formatedDateValue = Math.ceil(new Date(dateValue).getTime() / 1000 / 60 / 60 / 24)
        let formatedDateHoy = Math.floor(dateHoy.getTime() / 1000 / 60 / 60 / 24)
        let esFuturo = formatedDateHoy < formatedDateValue
        let title = esFuturo ? 'Confirmar convenio a futuro' : 'Confirmar convenio actual'
        let text = esFuturo
            ? `Los cambios del convenio se harán efectivos desde el ${(dateValue.split('-').reverse()).toString().replaceAll(',', '/')} .`
            : `Al confirmar, el convenio entrará en vigencia automáticamente, ya que la fecha elegida es igual o anterior al día de hoy.`
        setVersionarFuturo1(true)
        setOpenModal({
            "open": true,
            "title": title,
            "text": text,
            'button1': 'Volver',
            'button2': 'Confirmar'
        })
    }

    //Botones convenio actual
    const onClickCancelActual = () => {
        history.push({ pathname: '/home/proveedores/' })
    }

    return (
        <Grid xs={12}>
            {(convenioActual && convenioActual.fechaVigenciaDesde) || nuevosCambios ?
                <>
                    <Grid xs={12} style={{ minHeight: '250px' }}>
                        <Typography>Los cambios que se realicen en el convenio se harán efectivos desde:</Typography>
                        <Grid container alignItems='baseline' xs={12} style={{ margin: '20px 0' }}>
                            <Grid item xs={3} container alignItems='baseline' style={{ margin: '0 30px 0 0' }}>
                                <TextField
                                    type='date'
                                    label="Fecha"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={!switchValue}
                                    value={dateValue}
                                    onChange={handleChangeDate}
                                />
                            </Grid>
                            <Grid item xs={3} container alignItems='baseline'>
                                <FormControlLabel
                                    label="Habilitar edición de fecha."
                                    control={
                                        <Switch
                                            checked={switchValue}
                                            name="checkedB"
                                            color="primary"
                                            onChange={() => setSwitchValue(!switchValue)}
                                            disabled={!nuevosCambios}
                                        />
                                    }
                                />
                            </Grid>
                            {switchValue && showCartel ?
                                <Grid item xs={3} container spacing={2} style={{ border: '2px solid #5151d3', backgroundColor: 'rgba(47, 97, 213, 0.1)' }}>
                                    <Grid item container xs={2}  >
                                        <InfoIcon htmlColor='#5151d3' />
                                    </Grid>
                                    <Grid item xs={10} container >
                                        <CustomTypography
                                            text={`Fecha aplicada al día de hoy ${dateHoy.toLocaleDateString()}. Se puede modificar para guardar un convenio a futuro.`}
                                            variant='body2' color='#5151d3'
                                        />
                                    </Grid>
                                </Grid>
                                : null
                            }
                        </Grid>
                        <Grid container alignItems='baseline' xs={12} style={{ margin: '20px 0' }}>
                            {switchValue ?
                                <Grid container xs={5} justify='flex-end' spacing={2}>
                                    <Grid item>
                                        <CustomButton
                                            size="medium"
                                            variant='outlined'
                                            isAction={true}
                                            label='Cancelar'
                                            onClik={onClickCancelFuturo}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <CustomButton
                                            size="medium"
                                            variant='contained'
                                            color='primary'
                                            label={labelVersionarConEdicionFecha}
                                            isAction={true}
                                            onClik={onClickSaveFuturo}
                                            disabled={dateValue ? false : true}
                                        />
                                    </Grid>
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Grid>
                    <Grid container xs={12} justify='flex-end' spacing={2}>
                        <Grid item>
                            <CustomButton
                                size="medium"
                                variant='outlined'
                                isAction={true}
                                label='Cancelar'
                                disabled={saveConvenioFuturo ? true : false}
                                onClik={onClickCancelActual}
                            />
                        </Grid>
                        <Grid item>
                            <CustomButton
                                size="medium"
                                variant='contained'
                                color='primary'
                                label='Versionar convenio actual'
                                isAction={true}
                                disabled={!nuevosCambios || switchValue ? true : false}
                                onClik={onClickSaveActual}
                            />
                        </Grid>
                    </Grid>
                </>
                :
                <CustomDialogoPlano
                    text1='Vigencia del convenio'
                    text2='Para obtener una fecha de vigencia deberás configurar las prestaciones y/o módulos que tendrá el convenio.'
                    button1={true}
                    button1Action={() => setValue(1)}
                    button1Label='Comenzar'
                    button1Variant='contained'
                    button2={false}
                />
            }
        </Grid>
    )
}

export default Versionar