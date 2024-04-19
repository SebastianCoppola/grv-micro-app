import React, { useEffect, useState } from 'react';
import { FormControl, Grid, makeStyles, Typography } from '@material-ui/core';
import CustomButton from '../../commons/Button/CustomButton';
import CustomUploadFile from '../../commons/Adjunto/CustomUploadFile';
import CustomText from '../../commons/TextField/CustomText';
import { respuestaSolicitudActionCreator, useRespuestaSolicitudContext } from './RespuestaSolicitudContext';
import { ESTADOS_RESPUESTA_MAS_INFO } from '../../../Utils/const'
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import { useSelector } from 'react-redux';


export const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%',
        '& label': {
            fontSize: 15,
            color: '#747474'
        },
        '& b': {
            color: 'red',
            marginLeft: 5
        }
    },
    label: {
        fontSize: 15,
        color: '#747474',
        marginRight: 5
    }
}));


const ResponderMasInfoForm = ({ showAsButton, solicitud, file, setFile }) => {
    const classes = useStyles();
    //Inputs:
    const [estado, setEstado] = useState('')
    const [observacion, setObservacion] = useState('')
    // const [file, setFile] = useState(null)
    const [respuesta, dispatch] = useRespuestaSolicitudContext()
    //Redux
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    useEffect(() => {
        if (!showAsButton) {
            dispatch(respuestaSolicitudActionCreator.updateRespuesta({
                idSolicitudGenericaMasInfo: solicitud.id,
                idSolicitante: usuarioActivo.id,
                observaciones: observacion,
                estadoRespuesta: estado,
                file: file
            }))
        }
    }, [estado, observacion, file]);

    const onChangeHandler = (file) => setFile(file);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography style={{ fontSize: 15 }}>Marcar como{<Asterisco />}</Typography>
            </Grid>
            <Grid item container spacing={1}>
                {ESTADOS_RESPUESTA_MAS_INFO.map(it => {
                    return (
                        <Grid item>
                            <CustomButton
                                size='small'
                                label={it}
                                styleLabel={{ fontSize: 14 }}
                                styleButton={{ border: `1px solid ${estado === it ? '#1473e6' : '#d3d3d3'}` }}
                                onClik={() => setEstado(it)}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item>
                <FormControl className={classes.formControl}>
                    <Typography style={{ fontSize: 15 }}>Añadir observación{<Asterisco />}</Typography>
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
                <CustomUploadFile onChangeHandler={onChangeHandler} setArchivo={setFile} />
            </Grid>
        </Grid>
    );
};

export default ResponderMasInfoForm;
