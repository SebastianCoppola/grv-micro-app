import React, { useState, useEffect } from 'react';
//Router
import { useHistory } from 'react-router-dom';
//Mui
import { FormControl, Grid, Typography } from '@material-ui/core';
//Components
import CustomButton from '../../commons/Button/CustomButton';
import CustomSelect from '../../commons/Select/customSelect';
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import CustomText from '../../commons/TextField/CustomText';
//Context
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
//Redux:
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions/';


const DerivarSolicitudGenerica = (props) => {
    const { actualizarData } = props
    const classes = useAccionStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [area, setArea] = useState('');
    const [observacion, setObservacion] = useState('');
    const dispatch = useDispatch();
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const dataAreaGestion = useSelector(state => state.listados.areaGestionSolicitudes)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)

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
        'Confirmar derivación',
        '#1473e6',
        () => {
            const cb = (bool, mensaje) => {
                let message = bool ? `La solicitud #${dataBackSolicitud.nroSolicitud} fue DERIVADA.` : '' + mensaje + ''
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
                if (bool) {
                    setOpen(false);
                    history.goBack();
                    dispatch(actions.actualizarDataSG(!actualizarData))
                } else {
                    setOpen(false);
                }
            }
            let req = {
                idSolicitudGenerica: dataBackSolicitud.nroSolicitud,
                idAreaADerivar: area,
                observacion: observacion,
                idSolicitante: parseInt(usuarioActivo && usuarioActivo.id)
            }
            dispatch(actions.derivarSolicitud(req, cb))
        }
    );

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
                size="medium"
                styleLabel={{ color: '#747474' }}
                styleButton={{ borderRadius: 20, border: '1px solid #747474', backgroundColor: 'white' }}
                label="Derivar"
                onClik={() => setOpen(true)} />
            <Accion
                titulo="Derivar Solicitud"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <CustomSelect
                            titulo={<Typography style={{ fontSize: 14 }}>Área a derivar{<Asterisco />}</Typography>}
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
    );
};

export default DerivarSolicitudGenerica;
