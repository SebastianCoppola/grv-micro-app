import React, { Fragment, useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'
import { SNACK_SEVERITY, SNACK_VERTICAL } from '../../../Utils/const'
//Date:
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
//Mui:
import { Grid } from '@material-ui/core'
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
//Components:
import CustomText from '../../commons/TextField/CustomText'
import CustomLoading from '../../commons/Loading/CustomLoading'
import Reloj from "../../../commons/assets/IconsMenuDenunciaCompleta/reloj.svg"


const EditarCargaObservacion = props => {
    
    const { actualizarData, setOpenSnackBar, buscarObservaciones, setActualizarData, idDenuncia, idOperador,
        setDisableGuardar, editarObservacion, setDrawer, setEditarObservacion } = props
    
    const dispatch = useDispatch()
    
    const [valMensaje, setValMensaje] = useState(editarObservacion.observacion !== "" ? editarObservacion.observacion : "")
    const [selectedDate, setSelectedDate] = useState(editarObservacion.fecha !== "" ? new Date(editarObservacion.fecha) : new Date())
    const [selectedHora, setSelectedHora] = useState(editarObservacion.hora !== "" ? editarObservacion.hora : new Date())
    
    const loadingEditarObservaciones = useSelector(state => state.consultasReclamos.loadingEditarObservaciones)
    const loadingNuevaObservacion = useSelector(state => state.consultasReclamos.loadingNuevaObservacion)

    useEffect(() => {
        if (editarObservacion && editarObservacion.fecha && editarObservacion.hora) {
            let date = new Date(editarObservacion.fecha)
            let hora = editarObservacion.hora.split(":")[0]
            let minutos = editarObservacion.hora.split(":")[1]
            date.setHours(hora)
            date.setMinutes(minutos)
            setSelectedHora(date)
        } else {
            let date = new Date()
            setSelectedHora(date)
        }
    }, [editarObservacion])

    useEffect(() => {
        if (actualizarData) {
            if(editarObservacion.idObservacion !== null) editObservacion()
            else saveObservacion()
        }
    }, [actualizarData])

    useEffect(()=>{
        let disableGuardar = valMensaje === "" || !valMensaje || !selectedDate || !selectedHora
        setDisableGuardar(disableGuardar)
    },[valMensaje, selectedDate, selectedHora])

    const callBackSave = (success, message) => {
        setOpenSnackBar({
            open: true,
            title: message,
            severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
            vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP
        })
        if (success) {
            if (editarObservacion.idObservacion === null) {
                setValMensaje("")
            }
            if (editarObservacion.idObservacion !== null) {
                setEditarObservacion({
                    idObservacion: null,
                    fecha: "",
                    hora: "",
                    observacion: ""
                })
            }
            buscarObservaciones()
            setActualizarData(false)
            setDrawer({ open: false, 'title': '' })
        } else {
            setActualizarData(false)
        }
    }

    const saveObservacion = () => {
        const date = Utils.formatoFecha(selectedDate, 'yyyy-mm-dd')
        let test = selectedHora && selectedHora.toString().split(" ")[4].split(":")
        let horaString = test[0] + ":" + test[1]
        const requestNuevaObservacion = {
            comentario: valMensaje ? valMensaje : "",
            fecha: date ? date : null,
            hora: horaString ? horaString : null,
            idDenuncia: idDenuncia && idDenuncia,
            idOperador: idOperador && idOperador,
            tipoObservacion: 1,
        }
        dispatch(actions.nuevaObservacion(requestNuevaObservacion, callBackSave))
    }

    const editObservacion = () => {
        const date = Utils.formatoFecha(selectedDate, 'yyyy-mm-dd');
        let test = selectedHora && selectedHora.toString().split(" ")[4].split(":")
        let horaString = test[0] + ":" + test[1]
        const requestEditarObservacion = {
            idObservacion: editarObservacion.idObservacion,
            comentario: valMensaje ? valMensaje : "",
            fecha: date ? date.toString() : null,
            hora: horaString ? horaString : null,
        }
        dispatch(actions.editarObservacion(requestEditarObservacion, callBackSave))
    }

    return (
        <Fragment>
            <CustomLoading loading={loadingEditarObservaciones || loadingNuevaObservacion} />
            <Grid item container style={{ padding: '20px' }}>
                <Grid item container spacing={2}>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justifyContent="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Fecha"
                                    value={selectedDate}
                                    onChange={ value => setSelectedDate(value) }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justifyContent="space-around">
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Hora"
                                    value={selectedHora}
                                    onChange={ value => setSelectedHora(value) }
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                    keyboardIcon={<img src={Reloj} alt="reloj" />}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomText
                            label={'Mensaje'}
                            id={'Mensaje'}
                            shrink={true}
                            fullwidth={true}
                            value={valMensaje}
                            onChange={(e) => setValMensaje(e.target.value)}
                            multiline={true} 
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default EditarCargaObservacion