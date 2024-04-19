import React, { useState } from 'react'
import { FormControl, Grid, Typography } from '@material-ui/core'
import CustomButton from '../../commons/Button/CustomButton'
import CustomText from '../../commons/TextField/CustomText'
import CustomUploadFile from '../../commons/Adjunto/CustomUploadFile'
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica'
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion'
import { ReactComponent as SeguimientoIcon } from '../../../commons/assets/IconsSolicitudesGenericas/seguimientoIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { nuevoSeguimiento, setSnackBar, searchDatosSeguimiento } from '../../../redux/actions/solicitudesGenericas'
import Utils from '../../../Utils/utils'

const NuevoSeguimiento = () => {
    const classes = useAccionStyles()
    const [open, setOpen] = useState(false)
    const [observacion, setObservacion] = useState('')
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)


    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(observacion),
        'Confirmar',
        '#1473e6',
        () => {
            let req = {
                "idSolicitudGenerica": dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                "idResponsableSeguimiento": usuarioActivo && usuarioActivo.id,
                "observaciones": observacion
            }
            let cb = bool => {
                let message = bool ? 'Nuevo seguimiento AÑADIDO a la Solicitud Genérica.' : 'Ocurrió un error al intentar guardar el nuevo seguimiento.'
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(setSnackBar({ open: true, message: message, severity: severity, vertical: vertical }));
                if (bool) {
                    setOpen(false)
                    resetState()
                    dispatch(searchDatosSeguimiento({
                        idSolicitud: dataBackSolicitud && dataBackSolicitud.nroSolicitud,
                        offset: 0,
                        limit: 5
                    }))
                }
            }
            var formData = new FormData();
            formData.set("file", file ? file : null)
            formData.set("json", JSON.stringify(req))
            dispatch(nuevoSeguimiento(formData, cb))
        }
    );

    const closeHandler = () => {
        resetState();
    };

    const resetState = () => {
        setOpen(false);
        setObservacion('');
        setFile(null);
    };

    const onChangeHandler = (file) => setFile(file)


    return (
        <>
            <CustomButton
                height={40}
                width={180}
                startIcon={<SeguimientoIcon />}
                label="Nuevo seguimiento"
                styleButton={{ border: '1px solid #d3d3d3' }}
                styleLabel={{ fontSize: 14, color: '#505050' }}
                onClik={() => setOpen(true)} />
            <Accion
                titulo="Nuevo seguimiento"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={3}>
                    <Grid container item>
                        <Grid item><Typography className={classes.label}>Fecha de seguimiento:</Typography></Grid>
                        <Grid item><Typography style={{ fontSize: 14 }}>{Utils.convertFechaActualToString()}</Typography></Grid>
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

export default NuevoSeguimiento;