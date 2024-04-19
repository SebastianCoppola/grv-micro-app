import React, { useState, useEffect } from 'react'
//Mui:
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
//Components: 
import CustomButton from '../../commons/Button/CustomButton'
import Accion, { botonConfirmacionConfigFn, useAccionStyles } from './Accion'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'

const AsignarGestor = (props) => {
    const { gestor, setGestor, buttonLabel, titulo, confirmarHandler = () => { }, actualizarData, masInfoSeleccionada } = props
    const classes = useAccionStyles();
    const [open, setOpen] = useState(false);
    //Data oesde el Back
    const dispatch = useDispatch()
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const operadores = useSelector(state => state.solicitudesGenericas.solicitanteGestorArea)
    const usuarioGestor = { idPersona: parseInt(usuarioActivo && usuarioActivo.id), nombreApellido: "Asignarme a Mí" }
    const operadoresValidacion = operadores && operadores.length > 0 ? operadores.filter(it => it.idPersona !== usuarioGestor.idPersona) : []
    const operadoresMasYo = [usuarioGestor, ...operadoresValidacion]
    const [gestorTest, setGestorTest] = useState(null)
    const [gestorDescripcion, setGestorDescripcion] = useState(null)

    //Limpio gestor al iniciar componente
    useEffect(() => {
        if (open && open === true) {
            setGestor(null)
            dispatch(actions.searchSolicitanteGestorArea({ "idOperador": usuarioActivo && usuarioActivo.id }))
            setGestorTest(null)
        }
    }, [open])

    //Primero agrego el value del radio button a gestor Test para luego pasarlo al gestor que se enviara 
    //por request debido a que si  seteo al gestor de una desde idPersona, no se pinta el circuito.
    useEffect(()=>{
        operadoresMasYo && operadoresMasYo.length > 0 && operadoresMasYo.forEach(it => {
            if(it.nombreApellido === gestorTest){
                setGestor(it.idPersona)
            }
        })
    },[gestorTest])

    //Llamada a la API para rellenar el listados de personas por area
    useEffect(() => {
        if(open && usuarioActivo){
            dispatch(actions.searchSolicitanteGestorArea({
                "idOperador": usuarioActivo && usuarioActivo.id 
            }))
        }
    }, [open])

    useEffect(() => {
        setGestorDescripcion(operadores && operadores.length > 0 && operadores.filter(it => it.idPersona === gestor))
    },[gestor])

    const botonConfirmacionConfig = botonConfirmacionConfigFn(
        Boolean(gestor),
        'Confirmar asignación',
        '#1473e6',
        () => {
            setOpen(false)
            confirmarHandler()
            let cb = (bool) => {
                let message = bool 
                    ? `Solicitud +INFO ASIGNADA a ${gestorDescripcion && gestorDescripcion.length > 0 && gestorDescripcion[0] && gestorDescripcion[0].nombreApellido}.`
                    : 'Hubo un error al intentar asignar la solicitud +INFO.'
                let severity = bool ? 'success' : 'error'
                let vertical = bool ? 'bottom' : 'top'
                setGestor(null)
                dispatch(actions.setSnackBar({open:true, message:message, severity:severity, vertical:vertical}))
                dispatch(actions.actualizarDataSG(!actualizarData))
                dispatch(actions.actualizarDataMasInfo())
            }
            let req = {
                "idSolicitudMasInfo": masInfoSeleccionada.idSolicitudMasInfo,
                "idGestorSolicitado": gestor
            }
            dispatch(actions.asignarGestorSolicitudMasInfo(req, cb))
        }
    );

    const closeHandler = () => {
        setOpen(false);
    };

    return (
        <>
            <CustomButton
                variant="contained"
                color="primary"
                styleButton={{ borderRadius: 20, border: '1px solid #1473e6' }}
                label={buttonLabel}
                onClik={() => setOpen(true)} 
            />
            <Accion
                titulo={titulo}
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
                                        <AccountCircle style={{ marginRight: 10, width: '36px', height: '36px', color: 'grey' }} />
                                        <Typography style={{ width: 160 }}>{gestor.nombreApellido}</Typography>
                                    </Box>
                                    <FormControlLabel value={gestor.nombreApellido} control={<Radio color='primary' />} />
                                </Box>
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </Accion>
        </>
    );
};

export default AsignarGestor;
