import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//MATERIAL
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
//COMPONENTS
import CustomButton from '../../commons/Button/CustomButton';
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion';
import { ReactComponent as ReasignarIcon } from '../../../commons/assets/IconsSolicitudesGenericas/reasignarIcon.svg';
import * as actions from '../../../redux/actions/';
//ICOS 
import { AccountCircle } from '@material-ui/icons';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';



const CambiarGestor = (props) => {
    const { esModoEdicion, gestorActual, dataSolicitud, actualizarData } = props
    const classes = useAccionStyles();
    const [open, setOpen] = useState(false);
    const [gestor, setGestor] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    //Redux
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const dataBackSolicitud = useSelector(state => state.solicitudesGenericas.datosSolicitud)
    const operadores = useSelector(state => state.solicitudesGenericas.solicitanteGestorArea)
    const usuarioGestor = { idPersona: parseInt(usuarioActivo && usuarioActivo.id), nombreApellido: "Asignarme a Mí" }
    const operadoresValidacion = operadores && operadores.length > 0 ? operadores.filter(it => it.idPersona !== usuarioGestor.idPersona) : []
    const operadoresMasYo = [usuarioGestor, ...operadoresValidacion]
    const [gestorTest, setGestorTest] = useState(null)

    //Llamada a la API para rellenar el listados de personas por area
    useEffect(() => {
        if (open && open === true) {
            setGestor(null)
            setGestorTest(null)
            dispatch(actions.searchSolicitanteGestorArea({ "idOperador": usuarioActivo && usuarioActivo.id }))
        }
    }, [open])


    //Primero agrego el value del radio button a gestor Test para luego pasarlo al gestor que se enviara 
    //por request debido a que si  seteo al gestor de una desde idPersona, no se pinta el circuito.
    useEffect(() => {
        operadoresMasYo && operadoresMasYo.length > 0 && operadoresMasYo.forEach(it => {
            if (it.nombreApellido === gestorTest) {
                setGestor(it.idPersona)
            }
        })
    }, [gestorTest])

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(gestor),
        'Confirmar cambio',
        '#1473e6',
        () => {
            let req = {
                "idSolicitudes": [dataBackSolicitud && dataBackSolicitud.nroSolicitud],
                "idOperador": gestor,
                "idGestor": usuarioActivo && usuarioActivo.id && Number(usuarioActivo.id)
            }
            let cb = (bool) => {
                let message = bool 
                    ? `Cambio de gestor de la solicitud #${dataBackSolicitud && dataBackSolicitud.nroSolicitud} CONFIRMADO`
                    : `Hubo un error al cambiar el gestor de la solicitud #${dataBackSolicitud && dataBackSolicitud.nroSolicitud}`
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                dispatch(actions.setSnackBar({open:true, message:message, severity:severity, vertical:vertical}))
                if (bool) {
                    setOpen(false)
                    dispatch(actions.actualizarDataSG(!actualizarData))
                    history.push('/home/solicitudesGenericas')
                } 
            }
            dispatch(actions.asignarSolicitudesGenericas(req, cb))
        }
    )

    const closeHandler = () => {
        setOpen(false);
        setGestor('');
    };

    const getButtonProps = () => {
        const buttonProps = {
            label: "Sin asignar",
            height: 30,
            width: 'fit-content',
            styleButton: { boxSizing: 'border-box', border: '1px solid #cacaca', backgroundColor: '#f5f5f5' },
            styleLabel: { textTransformation: 'none', color: '#6e6e6e' },
            disabled: esModoEdicion && dataSolicitud.puedeReasignarse ? false : true
        };
        if (gestorActual) {
            buttonProps.label = gestorActual.nombre;
            buttonProps.startIcon = gestorActual.avatar
                ? <img src={gestorActual.avatar} alt="gestor-actual" style={{ width: 20, height: 20 }} />
                : <AccountCircle style={{ width: 20, height: 20, color: 'grey' }} />
        }
        if (esModoEdicion && dataSolicitud.puedeReasignarse) {
            buttonProps.endIcon = <ReasignarIcon style={{ marginLeft: 5, width: 20, height: 20 }} />;
            buttonProps.onClik = () => setOpen(true);
        }
        return buttonProps;
    };


    return (
        <>
            <CustomButton {...getButtonProps()} />
            <Accion
                titulo="Cambiar Gestor"
                botonConfirmacionConfig={botonConfirmacionConfig}
                open={open}
                closeHandler={closeHandler}>
                <FormControl className={classes.formControl}>
                    <RadioGroup name="gestor" value={gestorTest} onChange={({ target }) => setGestorTest(target.value)}>
                        {
                            operadoresMasYo && operadoresMasYo.length > 0 && operadoresMasYo.map((gestor, i) => (
                                <Box key={i} display="flex" justifyContent="space-between" p={1} mb={2} style={{
                                    borderRadius: 4,
                                    border: '1px solid #eaeaea'
                                }}>
                                    <Box display="flex" alignItems="center">
                                        {gestor && gestor.avatar
                                            ? <img src={gestor.avatar} alt="responsable-avatar" style={{ width: 50, marginRight: 10 }} />
                                            : <AccountCircle style={{ width: 50, marginRight: 10, color: 'grey' }} />
                                        }
                                        <Typography style={{ width: 160, fontSize: 15 }}>{gestor.nombreApellido}</Typography>
                                    </Box>
                                    <FormControlLabel value={gestor.nombreApellido} control={<Radio color="primary" />} />
                                </Box>
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </Accion>
        </>
    );
};

export default CambiarGestor;
