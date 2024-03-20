import React, { useState, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//Material: 
import { Divider, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
//Componentes:
import CustomTypography from '../../../commons/Typography/CustomTypography'
import CustomButton from '../../../commons/Button/CustomButton'


const useStyles = makeStyles((theme) => ({
    cabecera: {
        padding: '20px 20px',
        borderLeft: '3px solid #f7c281',
        backgroundColor: '#f5f5f5',
        margin: '20px 10px 10px 10px',
    },
    text: {
        fontSize: '14px',
        color: '#4b4b4b',
    },
    textBody: {
        fontSize: "14px",
        color: "black"
    }
}))

const DrawerFechaVigencia = (props) => {
    const {
        confirmarFechaVigencia,
        setConfirmarFechaVigencia,
        setOpenAlert1,
        drawerCancelar,
        convenioSeleccionado,
        setDeshabilitarSiguiente
    } = props

    const classes = useStyles(props)
    //Redux
    const dispatch = useDispatch();
    const request = useSelector(state => state.convenio.request)
    //Fecha para el drawer
    const [error, setError] = useState(false)
    const [textError, setTextError] = useState(null)
    const [firstRender, setFirstRender] = useState(true)
    const fechaVigenciaDesdeInicial = request && request.fechaVigenciaDesde 
        ? request.fechaVigenciaDesde.split("-")[2] + '/' + request.fechaVigenciaDesde.split("-")[1] + '/' + request.fechaVigenciaDesde.split("-")[0] 
        : convenioSeleccionado.fechaVigenciaDesde
    const [fechaVigenciaDesde, setFechaVigenciaDesde] = useState(fechaVigenciaDesdeInicial)
    
    const fechaVigenciaHasta = convenioSeleccionado && convenioSeleccionado.fechaVigenciaHasta
    //Textos del drawer:
    const [esActual, setEsActual] = useState(false)
    const text1 = "Importante"
    const text2 = "Solo se podrá editar la 'fecha vigencia desde'. La 'fecha vigencia hasta' estará completa si existe un convenio futuro que entre en vigencia al día siguiente."
    const text3 = "Los cambios que se realicen en el convenio se harán efectivos desde la fecha indicada."
    const text4 = `Los cambios del convenio se harán efectivos desde el ${fechaVigenciaDesde}.`
    const text5 = `La fecha ${fechaVigenciaDesde} es igual o anterior a la fecha de hoy. Si confirma y luego guarda los cambios, el convenio entrará en vigencia automáticamente.`
    const text6 = `Confirmar vigencia convenio futuro.`
    const text7 = `Confirmar vigencia convenio actual.`

    //Métodos para convertir los String Date al formato que lea el textfield y viceversa. 
    const dateToTextfield = (fecha) => {
        let res = fecha.split("/")[2] + '-' + fecha.split("/")[1] + '-' + fecha.split("/")[0]
        return res
    }
    const textfieldToDate = (fecha) => {
        let res = fecha.split("-")[2] + '/' + fecha.split("-")[1] + '/' + fecha.split("-")[0]
        return res
    }
    const handleChangeDate = (e) => {
        let hoy1 = new Date()
        let hoy2 = hoy1.getFullYear() + '-' + (hoy1.getMonth()+1 > 9 ? (hoy1.getMonth()+1) : '0' + (hoy1.getMonth()+1)) + '-' + hoy1.getDate()
        if(e.target.value <= hoy2){
            setEsActual(true)
        }else{
            setEsActual(false)
        }
        setFechaVigenciaDesde(textfieldToDate(e.target.value))
    }

    // setError && habilitarSiguiente
    useEffect(() => {
        let desde = new Date(fechaVigenciaDesde.split("/")[2],fechaVigenciaDesde.split("/")[1]-1,fechaVigenciaDesde.split("/")[0])
        let hasta = fechaVigenciaHasta ? new Date(fechaVigenciaHasta.split("/")[2],fechaVigenciaHasta.split("/")[1]-1,fechaVigenciaHasta.split("/")[0]) : null
        
        var regEx1 = /^\b\d{2}\b[\/]\b\d{2}\b[\/]\b\d{4}\b$/

        if((fechaVigenciaDesde === fechaVigenciaDesdeInicial || (hasta && desde >= hasta)) && !firstRender){
            setTextError("La fecha es igual o posterior a la 'fecha vigencia hasta'.")
            setError(true)       
        }
        else if(!regEx1.test(fechaVigenciaDesde)){
            setTextError("Ingrese una fecha válida.")
            setError(true)       
        }
        else if(!firstRender){
            setError(false)
            setDeshabilitarSiguiente(false)
        }     
        if(firstRender){
            setFirstRender(false)
        }
    }, [fechaVigenciaDesde])
    useEffect(()=>{
        if(error){
            setDeshabilitarSiguiente(true)
        }
        else if (!error && !firstRender){
            setDeshabilitarSiguiente(false)
        }
    },[error])

    //Actions confirmar fecha de vigencia:
    const handleVolver = () => {
        setConfirmarFechaVigencia(false)
    }
    const handleGuardar = () => {
        dispatch(actions.setRequestConvenio({
            ...request,
            fechaVigenciaDesde: dateToTextfield(fechaVigenciaDesde),
            diasActivacion: Math.ceil((new Date(dateToTextfield(fechaVigenciaDesde)) - new Date()) / 1000 / 60 / 60 / 24)
        }))
        setConfirmarFechaVigencia(false)
        drawerCancelar()
        setOpenAlert1({open: true, mensaje: "Fecha Vigencia EDITADA."})
    }

    return (
        <>
            { !confirmarFechaVigencia ? 
                <Grid container>
                    <Grid xs={12} className={classes.cabecera}>
                        <CustomTypography className={classes.text} text={<b>{text1}</b>} />
                        <CustomTypography className={classes.text} text={text2} />
                    </Grid>
                    <CustomTypography style={{ marginLeft: "10px" }} className={classes.textBody} text={text3} />
                    <Grid item xs={12} style={{ marginTop: "20px", marginLeft: "10px" }}>
                        <TextField
                            type='date'
                            label="Fecha vigencia desde*"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dateToTextfield(fechaVigenciaDesde)}
                            onChange={handleChangeDate}
                            error={error}
                            helperText={error ? textError : null}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "20px", marginLeft: "10px" }}>
                        <TextField
                            type='date'
                            label="Fecha vigencia hasta"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            disabled={true}
                            value={fechaVigenciaHasta ? dateToTextfield(fechaVigenciaHasta) : ''}
                        />
                    </Grid>
                </Grid>
             : 
                <Grid container xs={12} justify='center' alignItems='center' style={{ minHeight: '400px' }}>
                    <Grid style={{ width: '400px', heigh: '200px', padding: '20px 20px', border: '1px solid #c4c4c4', borderRadius: '10px' }}>
                        <Typography style={{ margin: '0 0 10px 0' }}><b>{ !esActual ? text6 : text7 }</b></Typography>
                        <Divider />
                        <Typography style={{ margin: '10px 0 40px 0', fontSize: '14px' }}>{ !esActual ? text4 : text5 }</Typography>
                        <Grid container xs={12} justify='flex-end' spacing={1}>
                            <Grid item>
                                <CustomButton label='Volver' variant='outlined' onClik={handleVolver} size='small'/>
                            </Grid>
                            <Grid item>
                                <CustomButton label='Confirmar' variant='contained' color='primary' onClik={handleGuardar} size='small'/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }

        </>
    )
}

export default DrawerFechaVigencia