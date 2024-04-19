import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/'
import Utils from '../../../Utils/utils'
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion'
import { Box, FormControl, Grid, Typography } from '@material-ui/core'
import CustomButton from '../../commons/Button/CustomButton'
import CustomUploadFile from '../../commons/Adjunto/CustomUploadFile'
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica'
import CustomText from '../../commons/TextField/CustomText'
import { actualizarDataSG } from '../../../redux/actions/solicitudesGenericas'
import { useHistory } from 'react-router-dom'

const CerrarSolicitudGenerica = (props) => {
    const { actualizarData } = props
    const classes = useAccionStyles();
    const history = useHistory()
    //Drawer:    
    const [open, setOpen] = useState(false);
    //Fields:
    const [resuelta, setResuelta] = useState(null);
    const [observacion, setObservacion] = useState('');
    const [file, setFile] = useState(null);
    //Redux:    
    const dispatch = useDispatch()
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(resuelta !== null && observacion),
        'Confirmar cierre',
        '#1473e6',
        () => {
            let cb = (bool, mensaje) => {
                let message = bool ? `La Solicitud Genérica ${dataBackSolicitud && dataBackSolicitud.nroSolicitud} ha sido CERRADA.` : `Ocurrió un problema al intentar cerrar la Solicitud Genérica.`
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
                if (bool) {
                    setOpen(false)
                    resetState()
                    dispatch(actualizarDataSG(!actualizarData))
                    history.goBack()
                } else {
                    setOpen(false)
                }
            }
            let req = {
                "idSolicitud": dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                "idOperador": usuarioActivo.id,
                "areaGestionOperador": usuarioActivo.area,
                "mensaje": observacion,
                "resuelta": resuelta
            }
            var formData = new FormData();
            formData.set("file", file ? file : null)
            formData.set("json", JSON.stringify(req))
            dispatch(actions.cerrarSolicitudGenerica(formData, cb))
        }
    );

    const resetState = () => {
        setOpen(false)
        setResuelta(null)
        setObservacion('')
        setFile(null)
    }

    const closeHandler = () => {
        resetState();
    }

    const onChangeHandler = (file) => {
        setFile(file)
    }

    return (
        <>
            <CustomButton
                variant="contained"
                styleLabel={{ color: '#ffffff' }}
                styleButton={{ borderRadius: 20, border: '1px solid #1473e6', backgroundColor: '#1473e6' }}
                label="Cerrar Solicitud"
                onClik={() => setOpen(true)}
            />
            <Accion
                titulo="Cerrar Solicitud"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label} style={{ fontSize: 14 }}>Fecha de cierre:</Typography>
                            <Typography style={{ fontSize: 14 }}>{Utils.convertFechaActualToString()}</Typography>
                        </Box>
                    </Grid>
                    <Grid item><Typography style={{ fontSize: 14 }}>Marcar como</Typography></Grid>
                    <Grid item>
                        <CustomButton
                            height={40}
                            label={"RESUELTA"}
                            styleLabel={{ fontSize: 13 }}
                            styleButton={{ border: `1px solid ${resuelta === true ? '#1473e6' : '#d3d3d3'}`, marginRight: 10 }}
                            onClik={() => setResuelta(true)}
                        />
                        <CustomButton
                            height={40}
                            label={"NO RESUELTA"}
                            styleLabel={{ fontSize: 13 }}
                            styleButton={{ border: `1px solid ${resuelta === false ? '#1473e6' : '#d3d3d3'}` }}
                            onClik={() => setResuelta(false)}
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
                                multiline
                                maxCaracteres={1999}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <CustomUploadFile isVerticalAlign onChangeHandler={onChangeHandler} setArchivo={setFile} />
                    </Grid>
                </Grid>
            </Accion>
        </>
    );
};

export default CerrarSolicitudGenerica;
