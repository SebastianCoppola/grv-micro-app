import { useState } from "react"
//Mui:
import { Box, Divider, Drawer, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import { Close } from "@material-ui/icons"
//Icons:
import InformarIcon from '../../../../../commons/assets/IconsAuditoriaMedica/Otros/icon-observacion.svg'
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'
import CustomText from "../../../../commons/TextField/CustomText"

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

const PedidoCitacion = props => {
    
    const [openDrawer, setOpenDrawer] = useState(false)
    const [observacion, setObservacion] = useState("")

    const classes = useStyles()

    const handleClickGuardar = () => {
        clearDrawer()
    }

    const clearDrawer = () => {
        setObservacion("")
        setOpenDrawer(false)
    }

    return (
        <>
            <Grid container justify='flex-end'>
                <CustomButton
                    label={(
                        <Grid style={{display:'flex', gap:'7px', justifyContent:'space-between', alignItems:'center'}}>
                            <img src={InformarIcon} className={classes.icons} alt='observacion icon'/>
                            <Typography style={{color:'#505050', fontSize:'15px'}}>Pedido de Citación</Typography>
                        </Grid>
                    )}
                    onClik={() => setOpenDrawer(true)}
                    variant='outlined'
                />
            </Grid>

            <Drawer anchor="right" open={openDrawer} onClose={clearDrawer}>
                <Box display="flex" className={classes.drawerContent}>
                    <Grid container direction="column" justify="space-between">                    
                        <Grid item container direction="column">
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h1" className={classes.drawerTitle}>
                                        Pedido de citación de auditoría
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
                                <Typography style={{ fontSize: "15px", color: "#747474" }}>Observacion*</Typography>
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
                                    onClik={() => handleClickGuardar()}
                                    disabled={observacion ? false : true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
            
        </>
    )
}

export default PedidoCitacion