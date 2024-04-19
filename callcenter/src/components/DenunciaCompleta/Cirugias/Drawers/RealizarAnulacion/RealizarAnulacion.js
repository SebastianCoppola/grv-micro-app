import { useState } from "react"
import { Box, Divider, Drawer, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import { Close } from "@material-ui/icons"
import CustomButton from '../../../../commons/Button/CustomButton'
import CustomSelect from "../../../../commons/Select/customSelect"
import CustomText from "../../../../commons/TextField/CustomText";
import * as actions from '../../../../../redux/actions/'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
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
    drawerContent: {
        padding: '16px 24px',
        maxWidth: 450,
        width: 450,
        flexGrow: 1,
        boxSizing: 'border-box'
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

const RealizarAnulacion = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { idCirugia, usuarioActivo } = props
    const {openDrawerAnular, setOpenDrawerAnular, setCirugiaAnulada} = props
    const [comentario, setComentario] = useState("")
    const [motivo, setMotivo] = useState("")
    const motivos = useSelector(state=>state.listados.dataListadoMotivosAnulacionCirugias)
    
    useEffect(()=>{
        getListaMotivosAnulacion();
    },[])

    const getListaMotivosAnulacion = () => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar cargar la lista de motivos de anulacion de la cirugia.'
                }))
            }
        }
        dispatch(actions.getListadoMotivosAnulacionCirugias(errorCallback))
    }

    const handleGuardar = () => {
        let req = { idCirugia: idCirugia,
            observacion:  comentario,
            idMotivo : motivo,
            idOperadorLogueado: parseInt(usuarioActivo.id)}
        dispatch(actions.anularCirugia(req, callbackAnularCirugia))
    }

    const callbackAnularCirugia = (succes) => {
        if (succes) {
            dispatch(actions.setSnackBarAuditoria({
                open: true, 
                vertical: 'bottom',
                severity: 'success', 
                message: 'Cirugia anulada correctamente.'
            }))
            setCirugiaAnulada(true)
            clearDrawer()
        } else {
            dispatch(actions.setSnackBarAuditoria({
                open: true, 
                vertical: 'top',
                severity: 'error', 
                message: 'Ocurrió un error al intentar anular la cirugia.'
            }))
        }
    }

    const clearDrawer = () => {
        setComentario("")
        setMotivo("")
        setOpenDrawerAnular(false)
    }

    return (
        <>
            <Typography onClick={() => setOpenDrawerAnular(true)}
                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}>
            </Typography>

            <Drawer anchor="right" open={openDrawerAnular} onClose={clearDrawer}>
                <Box display="flex" className={classes.drawerContent}>
                    <Grid container direction="column" justify="space-between">                    
                        <Grid item container direction="column">
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h1" className={classes.drawerTitle}>
                                        Realizar anulación
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
                                <Typography style={{ fontSize: "15px", color: "#747474" }}>Comentario</Typography>
                                <CustomText
                                    inputStyle={{ fontSize: 14 }}
                                    type='text'
                                    placeholder="Completar"
                                    fullwidth
                                    value={comentario}
                                    onChange={(e) => setComentario(e.target.value)}
                                    maxCaracteres={50}
                                />
                            </Grid>
                            <Grid item style={{marginTop:'20px'}}>
                                <Typography style={{ fontSize: "15px", color: "#747474" }}>Motivo de anulación</Typography>
                                <CustomSelect
                                    variant="outlined"
                                    auditoriaMedica
                                    fullwidth
                                    seleccione={true}
                                    data={motivos}
                                    val={motivo}
                                    handleChangeSelect={(e) => setMotivo(e.target.value)}
                                />
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
                                    label={'Anular'}
                                    styleButton={{ height: 35, borderRadius: "20px" }}
                                    color="primary"
                                    variant="contained"
                                    onClik={() => handleGuardar()}
                                    disabled={motivo && comentario ? false : true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}

export default RealizarAnulacion