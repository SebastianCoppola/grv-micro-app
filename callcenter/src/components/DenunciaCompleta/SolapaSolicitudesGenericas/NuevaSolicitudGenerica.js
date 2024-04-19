import React, { useState } from 'react';
import { Box, Divider, Drawer, makeStyles, Typography } from '@material-ui/core';

import CabeceraDatosDenuncia from '../../SolicitudesGenericas/DetalleSolicitudGenerica/CabeceraDatosDenuncia';
import FormularioNuevaSolicitudGenerica from './FormularioNuevaSolicitudGenerica';
import CustomButton from '../../commons/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { actualizarDataSG, setNuevaSolicitud, setSnackBar } from '../../../redux/actions/solicitudesGenericas';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    drawerContent: {
        padding: 24,
        maxWidth: 450
    },
    titulo: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    dialog: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 220,
        boxSizing: 'border-box',
        border: '1px solid #dadce0'
    }
}));

const NuevaSolicitudGenerica = (props) => {
    const { denuncia, usuarioActivo, actualizarData } = props
    const classes = useStyles();
    const [showDrawer, setShowDrawer] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [reqNuevaSolicitud, setReqNuevaSolicitud] = useState(null)
    const [areaGestion, setAreaGestion] = useState(null)
    const [areaGestionDescripcion, setAreaGestionDescripcion] = useState(null)
    const [archivo, setArchivo] = useState(null)

    const enviarSolicitudHandler = () => {
        setShowDrawer(true);
    };

    const confirmarHandler = () => {
        setShowDrawer(false);
        //LLAMADA API
        const cb = (bool) => {
            if (bool) {
                dispatch(setSnackBar({
                    open: true,
                    message: 'Nueva solicitud genérica ENVIADA.',
                    severity: 'success'
                }));
                history.goBack();
                dispatch(actualizarDataSG(!actualizarData))
            } else {
                dispatch(setSnackBar({
                    open: true,
                    message: 'Ocurrio un Error, Intentelo Nuevamente..',
                    severity: 'error'
                }));
                history.goBack();
            }
        }
        if (reqNuevaSolicitud) {
            let formData = new FormData()
            formData.set("json", JSON.stringify(reqNuevaSolicitud))
            formData.set("file", archivo !== null ? archivo : '')
            dispatch(setNuevaSolicitud(formData, cb))
        }
    };

    const cancelarHandler = () => {
        history.goBack()
        setShowDrawer(false)
    }

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center">
                <CabeceraDatosDenuncia denuncia={denuncia} />
                <Box m={2}>
                    <FormularioNuevaSolicitudGenerica
                        enviarSolicitudHandler={enviarSolicitudHandler}
                        cancelarHandler={cancelarHandler}
                        setReqNuevaSolicitud={setReqNuevaSolicitud}
                        setAreaGestion={setAreaGestion}
                        areaGestion={areaGestion}
                        setAreaGestionDescripcion={setAreaGestionDescripcion}
                        usuarioActivo={usuarioActivo}
                        denuncia={denuncia}
                        setArchivo={setArchivo}
                    />
                </Box>
            </Box>
            <Drawer
                anchor="right"
                open={showDrawer}
                onClose={() => setShowDrawer(false)}>
                <Box className={classes.drawerContent} >
                    <Typography variant="h6" className={classes.titulo}>Alta de solicitud</Typography>
                    <Box mt={2} mb={5}><Divider /></Box>
                    <Box p={3} className={classes.dialog}>
                        <Typography variant="h6" className={classes.titulo}>Confirmar envío</Typography>
                        <Divider />
                        <Typography variant="body2">La Solicitud Genérica de la denuncia {denuncia && denuncia.nroProvisorio} se enviará al área de {areaGestionDescripcion && areaGestionDescripcion[0] && areaGestionDescripcion[0].descripcion}.</Typography>
                        <Box display="flex" justifyContent="flex-end">
                            <CustomButton
                                variant="contained"
                                width={112}
                                height={40}
                                label="Volver"
                                styleButton={{ border: '2px solid #747474', backgroundColor: 'white', marginRight: 16 }}
                                styleLabel={{ textTransformation: 'none', fontWeight: 'bold', color: '#747474' }}
                                isAction
                                onClik={() => setShowDrawer(false)} />
                            <CustomButton
                                color="primary"
                                variant="contained"
                                width={112}
                                height={40}
                                label="Confirmar"
                                styleLabel={{ textTransformation: 'none', fontWeight: 'bold' }}
                                isAction
                                onClik={confirmarHandler} />
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default NuevaSolicitudGenerica;