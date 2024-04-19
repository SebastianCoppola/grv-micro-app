import React, { useState } from 'react';
import { FormControl, Grid, Typography } from '@material-ui/core';
import CustomButton from '../../commons/Button/CustomButton';
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import CustomText from '../../commons/TextField/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actualizarDataSG, setCalificarGestion, setSnackBar } from '../../../redux/actions/solicitudesGenericas';

const SI = 'Sí';
const NO = 'No';

const CalificarGestion = (props) => {
    const { actualizarData } = props
    const classes = useAccionStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [gestionSatisfactoria, setGestionSatisfactoria] = useState('');
    const [observacion, setObservacion] = useState('');
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(gestionSatisfactoria && observacion),
        'Confirmar calificación',
        '#1473e6',
        () => {
            let cb = (bool) => {
                let message = bool
                    ? `Calificación de gestión de la solicitud #${dataBackSolicitud && dataBackSolicitud.nroSolicitud} CONFIRMADA.`
                    : 'Ocurrió un error al intentar calificar la solicitud.'
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }))
                if (bool) {
                    setOpen(false)
                    history.push('/home/solicitudesGenericas')
                    dispatch(actualizarDataSG(!actualizarData))
                }
            }
            let req = {
                "idSolicitudGenerica": dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                satisfactoria: gestionSatisfactoria === SI ? true : false,
                observacion: observacion,
                idOperador: usuarioActivo && usuarioActivo.id
            }
            dispatch(setCalificarGestion(req, cb))
        }
    );

    const resetState = () => {
        setOpen(false)
        setGestionSatisfactoria('');
        setObservacion('');
    }

    const closeHandler = () => {
        resetState();
    };

    return (
        <>
            <CustomButton
                variant="contained"
                styleLabel={{ color: '#ffffff' }}
                styleButton={{ borderRadius: 20, border: '1px solid #1473e6', backgroundColor: '#1473e6' }}
                label="Calificar gestión"
                onClik={() => setOpen(true)}
            />
            <Accion
                titulo="Calificar gestión"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item><Typography style={{ fontSize: 14 }}>¿La gestión de la solicitud fue satisfactoria?</Typography></Grid>
                    <Grid item>
                        <CustomButton
                            label={SI}
                            styleButton={{ marginRight: 12, border: `1px solid ${gestionSatisfactoria === SI ? '#1473e6' : '#d3d3d3'}` }}
                            onClik={() => setGestionSatisfactoria(SI)}
                        />
                        <CustomButton
                            label={NO}
                            styleButton={{ border: `1px solid ${gestionSatisfactoria === NO ? '#1473e6' : '#d3d3d3'}` }}
                            onClik={() => setGestionSatisfactoria(NO)}
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
                </Grid>
            </Accion>
        </>
    );
};

export default CalificarGestion;
