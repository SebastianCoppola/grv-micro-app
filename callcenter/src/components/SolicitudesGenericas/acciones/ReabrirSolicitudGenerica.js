import React, { useState, useEffect } from 'react'
//Context
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion'
//Router:
import { useHistory } from 'react-router-dom'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/'
//Mui
import { FormControl, Grid, Typography } from '@material-ui/core'
//Components
import CustomButton from '../../commons/Button/CustomButton'
import CustomSelect from '../../commons/Select/customSelect'
import CustomText from '../../commons/TextField/CustomText'
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica'

const ReabrirSolicitudGenerica = ({ actualizarData }) => {
    
    const classes = useAccionStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const dataAreaGestion = useSelector(state => state.listados.areaGestionSolicitudes)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)

    const [open, setOpen] = useState(false)
    const [area, setArea] = useState('')
    const [observacion, setObservacion] = useState('')

    useEffect(() => {
        if (open && dataBackSolicitud && usuarioActivo) {
            const errorCallback = (bool) => {
                if (bool) {
                    dispatch(actions.setSnackBar({
                        open: true,
                        message: 'Ocurrió un error al intentar recuperar las areas de gestión.',
                        severity: 'error',
                        vertical: 'top'
                    }));
                }
            }
            dispatch(actions.searchAreaGestion(errorCallback))
        }
    }, [open])

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(area && observacion),
        'Confirmar reapertura',
        '#1473e6',
        () => {
            const cb = (bool, mensaje) => {
                let message = bool ? `La solicitud #${dataBackSolicitud.nroSolicitud} fue REABIERTA.` : '' + mensaje + ""
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
                if (bool) {
                    setOpen(false)
                    history.goBack()
                    dispatch(actions.actualizarDataSG(!actualizarData))
                } else {
                    setOpen(false)
                }
            }
            let req = {
                idSolicitudGenerica: dataBackSolicitud.nroSolicitud,
                idAreaADerivar: area,
                observacion: observacion,
                idSolicitante: parseInt(usuarioActivo && usuarioActivo.id)
            }
            dispatch(actions.reabrirSolicitud(req, cb))
        }
    )

    const closeHandler = () => {
        setOpen(false)
        setArea('')
        setObservacion('')
        dispatch(actions.clearAreasDeGestion())
    }

    return (
        <>
            <CustomButton
                variant="contained"
                styleLabel={{ color: '#747474' }}
                styleButton={{ borderRadius: 20, border: '1px solid #747474', backgroundColor: 'white' }}
                label="Reabrir solicitud"
                onClik={() => setOpen(true)}
            />
            <Accion
                titulo="Reabrir solicitud"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <CustomSelect
                            titulo={<Typography style={{ fontSize: 14 }}>Área Gestión{<Asterisco />}</Typography>}
                            data={dataAreaGestion}
                            handleChangeSelect={({ target }) => setArea(target.value)}
                            val={area}
                            fullwidth
                            textSize='16px'
                            disabled={dataAreaGestion === null || (dataAreaGestion && dataAreaGestion.length === 0)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Typography style={{ fontSize: 14 }}>Añadir observación{<Asterisco />}</Typography>
                            <CustomText
                                placeholder="Escribir texto"
                                value={observacion}
                                onChange={({ target }) => setObservacion(target.value)}
                                fullwidth
                                maxCaracteres={1999}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Accion>
        </>
    )
}

export default ReabrirSolicitudGenerica
