import React, { useState, useEffect } from 'react';
//Router:
import { useHistory } from 'react-router-dom';
//Mui:
import { Box, Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@material-ui/core';
//Components:
import CustomButton from '../../commons/Button/CustomButton';
import CustomUploadFile from '../../commons/Adjunto/CustomUploadFile';
import CustomSelect from '../../commons/Select/customSelect';
import CustomText from '../../commons/TextField/CustomText';
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import { ReactComponent as SolicitarMasInfoIcon } from '../../../commons/assets/IconsSolicitudesGenericas/solicitarMasInfoIcon.svg';
//Context:
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
//Utils:
import Utils from '../../../Utils/utils';
//Redux:
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';


const SolicitarMasInfo = () => {
    const classes = useAccionStyles()
    const [open, setOpen] = useState(false)
    const history = useHistory()
    //Inputs:
    const [enviarAlSolicitante, setEnviarAlSolicitante] = useState(false);
    const [areaGestion, setAreaGestion] = useState('');
    const [observacion, setObservacion] = useState('');
    const [file, setFile] = useState(null)
    //Redux:
    const dispatch = useDispatch();
    const dataAreaGestion = useSelector(state => state.listados.areaGestionSolicitudes)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)



    useEffect(() => {
        if (open && dataBackSolicitud && usuarioActivo) {
            const errorCallback = (bool) => {
                dispatch(actions.setSnackBar({
                    open: bool ? true : false,
                    message: bool ? 'Ocurrió un error al intentar recuperar las areas de gestión.' : null,
                    severity: bool ? 'error' : null,
                    vertical: bool ? 'top' : 'bottom'
                }));
            }
            dispatch(actions.searchAreaGestion(errorCallback))
        }
    }, [open])


    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean((enviarAlSolicitante || areaGestion) && observacion),
        'Confirmar envío',
        '#1473e6',
        () => {
            let req = {
                "idSolicitudGenerica": dataBackSolicitud.nroSolicitud,
                "idSolicitante": parseInt(usuarioActivo.id),
                "idGestorSolicitado": enviarAlSolicitante ? dataBackSolicitud.idSolicitante : null,
                "idAreaGestion": areaGestion ? areaGestion : null,
                "observacion": observacion,
            }
            let cb = bool => {
                let message = bool ? 'Nueva solicitud de + información ENVIADA.' : 'Ocurrió un error al intentar crear una nueva solicitud + información.'
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(actions.setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
                if (bool) {
                    setOpen(false)
                    closeHandler()
                    dispatch(actions.actualizaNotificaciones())
                    history.goBack()
                }
            }
            var formData = new FormData();
            formData.set("file", file ? file : null)
            formData.set("json", JSON.stringify(req))
            dispatch(actions.createSolicitudMasInfo(formData, cb))
        }
    )

    const closeHandler = () => {
        setOpen(false)
        setEnviarAlSolicitante(false)
        setAreaGestion('')
        setObservacion('')
        setFile(null)
        dispatch(actions.clearAreasDeGestion())
    }

    const onChangeHandler = (file) => setFile(file);

    return (
        <>
            <CustomButton
                height={40}
                width={170}
                startIcon={<SolicitarMasInfoIcon />}
                label="Solicitar + info"
                styleButton={{ border: '1px solid #d3d3d3' }}
                styleLabel={{ textTransformation: 'none', color: '#505050' }}
                onClik={() => setOpen(true)} />
            <Accion
                titulo="Solicitar + información"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label}>Fecha de seguimiento:</Typography>
                            <Typography style={{ fontSize: 14 }}>{Utils.convertFechaActualToString()}</Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={enviarAlSolicitante}
                                    onChange={({ target }) => {
                                        setEnviarAlSolicitante(target.checked)
                                        setAreaGestion('')
                                    }}
                                    color="primary" />
                            }
                            label={<Typography style={{ fontSize: 14 }}>Enviar al solicitante</Typography>}
                        />
                    </Grid>
                    <Grid item>
                        <CustomSelect
                            titulo={
                                <Typography style={{ fontSize: 14 }}>
                                    Área Gestión{
                                        <Asterisco notVisible={enviarAlSolicitante} />
                                    }
                                </Typography>
                            }
                            data={dataAreaGestion}
                            handleChangeSelect={({ target }) => setAreaGestion(target.value)}
                            val={areaGestion}
                            fullwidth
                            disabled={enviarAlSolicitante || dataAreaGestion === null || (dataAreaGestion && dataAreaGestion.length === 0)}
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

export default SolicitarMasInfo;
