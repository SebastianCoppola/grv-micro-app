import React, { useState, useEffect } from 'react';
//Mui:
import { Box, Grid, Typography } from '@material-ui/core';
//Components:
import CustomButton from '../../commons/Button/CustomButton';
import { ReactComponent as RestoreIcon } from '../../../commons/assets/IconsSolicitudesGenericas/restoreIcon.svg';
import { Asterisco } from '../../DenunciaCompleta/SolapaSolicitudesGenericas/FormularioNuevaSolicitudGenerica';
import AlertComponent from '../AlertComponent/AlertComponent';
import CustomSelect from '../../commons/Select/customSelect';
//Action & Redux:
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
import { useSelector, useDispatch } from 'react-redux';
import { clearDatosCantidadSolicitudes, reasignarSolcitud, searchCantidadSolicitudesPorGestor, searchSolicitanteGestorArea, setSnackBar } from '../../../redux/actions/solicitudesGenericas';

const SeleccionRolNuevoForm = (props) => {
    const {rol, rolActual, rolNuevo, setRolActual, setRolNuevo, data, setDescripcionActual, setDescripcionNuevo } = props
    
    if (!rol) return null;

    const config = {
        texto: rol === 'GESTOR'
            ? 'Mover las solicitudes asignadas de'
            : 'Mover las solicitudes pedidas de',
        primerSelect: {
            label: rol === 'GESTOR' ? 'Gestor actual' : 'Solicitante actual',
            value: rolActual,
            onchangedHandler: ({ target }) => {
                setRolActual(target.value)
                setDescripcionActual(data && data.length > 0 && data.filter(it => it.idPersona === target.value))
            }
        },
        segundoSelect: {
            label: rol === 'GESTOR' ? 'Gestor nuevo' : 'Solicitante nuevo',
            value: rolNuevo,
            onchangedHandler: ({ target }) => {
                setRolNuevo(target.value)
                setDescripcionNuevo(data && data.length > 0 && data.filter(it => it.idPersona === target.value))
            }
        }
    };

    return (
        <Grid container direction="column" spacing={3} style={{ marginTop: 10 }}>
            <Grid item><Typography style={{ fontSize: 14 }}>{config.texto}</Typography></Grid>
            <Grid item>
                <CustomSelect
                    titulo={<Typography style={{ fontSize: 15 }}>{config.primerSelect.label}{<Asterisco />}</Typography>}
                    data={data}
                    solicitudGenerica={true}
                    handleChangeSelect={config.primerSelect.onchangedHandler}
                    val={config.primerSelect.value}
                    fullwidth />
            </Grid>
            <Grid item>
                <CustomSelect
                    titulo={<Typography style={{ fontSize: 14 }}>{config.segundoSelect.label}{<Asterisco />}</Typography>}
                    data={data}
                    solicitudGenerica={true}
                    handleChangeSelect={config.segundoSelect.onchangedHandler}
                    val={config.segundoSelect.value}
                    fullwidth />
            </Grid>
        </Grid>
    );
};

const Reasignar = (props) => {
    const classes = useAccionStyles();
    const [open, setOpen] = useState(false);
    const [rol, setRol] = useState('');
    const [rolActual, setRolActual] = useState('');
    const [rolNuevo, setRolNuevo] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const dispatch = useDispatch();
    const [descripcionActual, setDescripcionActual] = useState(null)
    const [descripcionNuevo, setDescripcionNuevo] = useState(null)
    const solicitanteGestor = useSelector(state => state.solicitudesGenericas.solicitanteGestorArea)
    const cantidadSolicitudes = useSelector(state => state.solicitudesGenericas.cantidadSolicitudes)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)

    const clearData = () => {
        dispatch(clearDatosCantidadSolicitudes())
        setRol(null)
        setRolActual(null)
        setRolNuevo(null)
    }

    useEffect(() => {
        if (open && open === true) {
            clearData()
            dispatch(searchSolicitanteGestorArea({ "idOperador": usuarioActivo && usuarioActivo.id }))
        }
    }, [open])

    useEffect(() => {
        if (rol && rolActual) {
            dispatch(searchCantidadSolicitudesPorGestor({ "idOperador": rolActual, "esGestor": rol === "GESTOR" ? true : false }))
        }
    }, [rolActual])

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(rolActual && rolNuevo),
        'Confirmar reasignación',
        '#1473e6',
        () => {
            //LLAMADA API
            let req = {
                tipoReasignacion: rol,
                idViejo: rolActual,
                idNuevo: rolNuevo
            }

            const callback = bool => {
                if (bool) {
                    dispatch(setSnackBar({
                        open: true,
                        message: `Solicitudes Genéricas del gestor ${descripcionActual && descripcionActual.length > 0 && descripcionActual[0].nombreApellido} REASIGNADAS a  ${descripcionNuevo && descripcionNuevo.length > 0 && descripcionNuevo[0].nombreApellido}.`,
                        severity: 'success'
                    }));
                    setOpen(false)
                    clearData()
                } else {
                    dispatch(setSnackBar({
                        open: true,
                        message: 'Hubo un error, intente nuevamente!',
                        severity: 'error'
                    }));
                    setOpen(false)
                    clearData()
                }
            }

            dispatch(reasignarSolcitud(req, callback))
        }
    );

    const seleccionRolHandler = (seleccion) => {
        setRol(prevSeleccion => prevSeleccion === seleccion ? '' : seleccion);
        setRolActual('');
        setRolNuevo('');
    };

    const resetState = () => {
        setOpen(false)
        setRol('');
        setRolActual('');
        setRolNuevo('');
    }

    const closeHandler = () => {
        resetState();
    };

    return (
        <>
            <CustomButton
                startIcon={<RestoreIcon />}
                label="Reasignar"
                height={40}
                styleButton={{ borderRadius: 20, border: '1px solid #747474', marginRight: 16 }}
                styleLabel={{ color: '#747474' }}
                onClik={() => setOpen(true)}
            />
            <Accion
                titulo="Reasignar solicitudes"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label}>Área:</Typography>
                            <Typography style={{ fontSize: 14 }}>Contrataciones</Typography>
                        </Box>
                    </Grid>
                    <Grid item style={{ marginTop: 10 }}><Typography style={{ fontSize: 14 }}>Seleccionar las de</Typography></Grid>
                    <Grid item>
                        <CustomButton height={40} label="Gestor"
                            styleLabel={{ fontSize: 14 }}
                            styleButton={{ marginRight: 12, backgroundColor: 'white', border: `2px solid ${rol === 'GESTOR' ? '#1473e6' : '#d3d3d3'}` }}
                            onClik={() => seleccionRolHandler('GESTOR')} />
                        <CustomButton height={40} label="Solicitante"
                            styleLabel={{ fontSize: 14 }}
                            styleButton={{ backgroundColor: 'white', border: `2px solid ${rol === 'SOLICITANTE' ? '#1473e6' : '#d3d3d3'}` }}
                            onClik={() => seleccionRolHandler('SOLICITANTE')} />
                    </Grid>
                    <Grid item>
                        <SeleccionRolNuevoForm
                            rol={rol}
                            rolActual={rolActual}
                            rolNuevo={rolNuevo}
                            setRolActual={setRolActual}
                            setRolNuevo={setRolNuevo}
                            classes={classes}
                            data={solicitanteGestor}
                            setDescripcionActual={setDescripcionActual}
                            setDescripcionNuevo={setDescripcionNuevo}
                        />
                    </Grid>
                    <Grid item>
                        {rol && rolActual && cantidadSolicitudes !== null && cantidadSolicitudes.cantidadSolicitudesGenericas > 0 ? (
                            <Box mt={2}>
                                <AlertComponent
                                    severidad="info"
                                    texto={`El ${rol.toLowerCase()} seleccionado posee ${cantidadSolicitudes.cantidadSolicitudesGenericas} solicitudes pedidas.`} />
                            </Box>
                        ) : null}
                    </Grid>
                </Grid>
            </Accion>
        </>
    );
};

export default Reasignar;
