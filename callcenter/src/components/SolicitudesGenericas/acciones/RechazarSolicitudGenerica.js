import React, { useState } from 'react';
import { Box, FormControl, Grid, TextField, Typography } from '@material-ui/core';

import CustomButton from '../../commons/Button/CustomButton';
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
import CustomText from '../../commons/TextField/CustomText';
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actualizarDataSG, rechazarSolicitud, setSnackBar } from '../../../redux/actions/solicitudesGenericas';
import { useSelector } from 'react-redux';

const RechazarSolicitudGenerica = (props) => {
    const { actualizarData } = props
    const classes = useAccionStyles();
    const [observacion, setObservacion] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(observacion),
        'Confirmar rechazo',
        '#e34850',
        () => {
            setOpen(false);
            //Llamada API
            let req = {
                idSolicitudGenerica: dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                idPersona: parseInt(usuarioActivo && usuarioActivo.id),
                areaPersona: usuarioActivo && usuarioActivo.area,
                mensaje: observacion
            }
            const cb = (boolean, mensaje) => {
                if (boolean) {
                    history.goBack();
                    dispatch(actualizarDataSG(!actualizarData))
                    dispatch(setSnackBar({
                        open: true,
                        message: 'Solicitud Genérica RECHAZADA.',
                        severity: 'success'
                    }));
                } else {
                    history.goBack();
                    dispatch(setSnackBar({
                        open: true,
                        message: mensaje,
                        severity: 'error'
                    }));
                }
            }
            dispatch(rechazarSolicitud(req, cb))
        }
    );

    const closeHandler = () => {
        setOpen(false);
        setObservacion('');
    };

    return (
        <>
            <CustomButton
                variant="contained"
                size="medium"
                styleLabel={{ color: '#d7373f' }}
                styleButton={{ borderRadius: 20, border: '1px solid #d7373f', backgroundColor: 'white' }}
                label="Rechazar"
                onClik={() => setOpen(true)}
            />
            <Accion
                titulo="Rechazar Solicitud"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={5}>
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
                </Grid>
            </Accion>
        </>
    );
};

export default RechazarSolicitudGenerica;
