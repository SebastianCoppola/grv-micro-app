import { Box, Divider, Drawer, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import CustomButton from "../../../../commons/Button/CustomButton";
import CustomText from "../../../../commons/TextField/CustomText";
import Observacion from "./Observacion";
import { CircularProgress } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/'

const useStyles = makeStyles((theme) => ({
    drawerContent: {
        padding: '16px 24px',
        maxWidth: 450,
        width: 450,
        flexGrow: 1,
        boxSizing: 'border-box'
    },
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)',
    },
    iconBnt: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        color: '#5e5e5d',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    closeIcon: {
        padding: 7
    },
    drawerTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    drawerSubTitle: {
        fontSize: 15,
        fontWeight: '700'
    },
    drawerData: {
        fontSize: 14,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))

const AgregarObservacion = (props) =>{

    const classes = useStyles()
    const dispatch = useDispatch()
    const { idCirugia, usuarioActivo } = props
    const {openDrawerObservaciones, setOpenDrawerObservaciones} = props
    const [observacion, setObservacion] = useState("")
    const observaciones = useSelector(state=>state.cirugias.observaciones)
    const loadingObservacionesCirugia = useSelector(state=>state.cirugias.loadingObservacionesCirugia)

    useEffect(()=>{
        if(openDrawerObservaciones && idCirugia){
            getObservacionesPorCirugia()
        }
    },[openDrawerObservaciones])

    //Get observaciones:
    const getObservacionesPorCirugia = () => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar cargar las observaciones.'
                }))
            }
        }
        let req = { idCirugia: idCirugia }
        dispatch(actions.getObservacionesPorCirugia(req, errorCallback))
    }

    const clearDrawer = () => {
        setObservacion("")
        setOpenDrawerObservaciones(false)
    }

    const handleGuardar = () => {
        let req = { idCirugia: idCirugia,
                    observacion:  observacion,
                    idOperadorLogueado: parseInt(usuarioActivo.id)}
        dispatch(actions.guardarObservacionCirugia(req, callbackGuardarObservacion))
    }

    const callbackGuardarObservacion = (succes) => {
        if (succes) {
            dispatch(actions.setSnackBarAuditoria({
                open: true, 
                vertical: 'bottom',
                severity: 'success', 
                message: 'Observacion guardada correctamente.'
            }))
            clearDrawer()
        } else {
            dispatch(actions.setSnackBarAuditoria({
                open: true, 
                vertical: 'top',
                severity: 'error', 
                message: 'Ocurrió un error al intentar cargar las observaciones.'
            }))
        }
    }

    return(
        <>
            <Typography onClick={() => setOpenDrawerObservaciones(true)}
                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
            </Typography>
            
            <Drawer anchor="right" open={openDrawerObservaciones} onClose={clearDrawer}>
                <Box display="flex" className={classes.drawerContent}>
                <Grid container direction="column" justify="space-between"> 
                    {loadingObservacionesCirugia ?
                        <Grid item xs={12} container justify='center'>
                            <CircularProgress />
                        </Grid>
                    :  
                    <>                
                        <Grid item container direction="column">
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h1" className={classes.drawerTitle}>
                                        Observaciones de cirugía
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.closeIcon} onClick={clearDrawer}>
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            <Grid item style={{marginTop:'20px'}}>
                                <Typography style={{ fontSize: "15px", color: "#747474" }}>Nueva observación</Typography>
                                <CustomText
                                    inputStyle={{ fontSize: 14 }}
                                    type='text'
                                    placeholder="Completar"
                                    fullwidth
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    maxCaracteres={50}
                                />
                            </Grid>
                            <Grid item style={{marginTop:'20px'}} spacing={1}>
                                {observaciones && observaciones.length ? 
                                    observaciones.map((row) => (
                                        <Grid item style={{marginTop:'5px'}}>
                                            <Observacion fecha={row.fecha} responsable={row.responsable} observacion={row.observacion}/>
                                        </Grid> 
                                    )) : null}
                            </Grid>
                        </Grid>
                        <Grid item container justify='flex-end' spacing={1} style={{marginTop:'20em'}}>
                            <Grid item>
                                <CustomButton
                                    label={'Cancelar'}
                                    styleButton={{ height: 35, borderRadius: "20px", border: "1px solid #747474", background: "rgba(200,0,0,0)" }}
                                    variant="contained"
                                    onClik={clearDrawer}
                                />
                            </Grid>
                            <Grid item>
                                <CustomButton
                                    label={'Guardar'}
                                    styleButton={{ height: 35, borderRadius: "20px" }}
                                    color="primary"
                                    variant="contained"
                                    onClik={handleGuardar}
                                    disabled={observacion ? false : true}
                                />
                            </Grid>
                        </Grid>
                    </> }
                    </Grid>
                </Box>
            </Drawer>
        </>
    ) 
}

export default AgregarObservacion;