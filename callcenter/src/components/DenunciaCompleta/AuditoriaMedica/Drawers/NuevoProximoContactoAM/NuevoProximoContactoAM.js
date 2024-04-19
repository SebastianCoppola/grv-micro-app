import { useState } from 'react'
//Mui:
import { Box, CircularProgress, Divider, Drawer, Grid, IconButton, makeStyles, TextField, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'
import CustomText from '../../../../commons/TextField/CustomText'
//Icons:
import CalendarRightIcon from '../../../../../commons/assets/IconsAuditoriaMedica/Indicadores/calendar-arrow-right.svg'
//Utils:
import Utils from '../../../../../Utils/utils'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/'
import CustomDatePicker from '../../../../commons/DatePicker/CustomDatePicker'

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

const NuevoProximoContactoAM = ({denuncia, setRequest, request}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const loadingNuevoProximoContacto = useSelector(state => state.auditoriaMedica.loadingNuevoProximoContacto)
    //Drawer:
    const [openDrawer, setOpenDrawer] = useState(false)
    //Form:
    const [date, setDate] = useState('')
    const [observacion, setObservacion] = useState("")

    //Handle Close:
    const handleClose = () => {
        setOpenDrawer(false)
        setDate('')
        setObservacion('')
    }

    //Handle Save:
    let handleSave = () => {
        let callback = (bool) => {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                vertical: bool ? 'bottom' : 'top',
                severity: bool ? 'success' : 'error',
                message: bool ? 'Nuevo próximo contacto A.M. guardado.' : 'Ocurrió un error al guardar un nuevo próximo contacto.'
            }))
            if (bool) handleClose()
        }
        let req = {
            idDenuncia: denuncia.idDenuncia,
            fechaProximoContactoAudMed: date,
            observacionProximoContactoAuditoriaMedica: observacion
        }
        dispatch(actions.saveNuevoProximoContacto(req, callback))

        let newRequest = request
        newRequest.observacionProxContactoAM = observacion
        newRequest.fechaProxContactoAM = date
        setRequest(newRequest)
    }

    return (
        <>
            <CustomButton
                label={(
                    <Grid style={{ display: 'flex', gap: '7px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <img src={CalendarRightIcon} className={classes.icons} alt='calendar icon right' />
                        <Typography style={{ color: '#505050', fontSize: '15px' }}>Nuevo próximo contacto A.M.</Typography>
                    </Grid>
                )}
                onClik={() => setOpenDrawer(true)}
                variant='outlined'
            />

            {/* Drawer */}
            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box display="flex" className={classes.drawerContent} >
                    <Grid container direction="column" justify="space-between" >
                        <Grid container item direction="column" spacing={1}>
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h1" className={classes.drawerTitle}>
                                        Nuevo Próximo Contacto AM.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.closeIcon} onClick={() => handleClose()}>
                                        <Close />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Divider />
                            </Grid>
                            {/* Contenido */}
                                <>
                                    <Grid item style={{ marginTop: "15px" }}>
                                    <CustomDatePicker
                                        isOutline={true}
                                        styleFiltrosAuditoria={true}
                                        setSelectedDate={setDate}
                                        selectedDate={date}
                                        placeholder={"Fecha"}
                                        title={"Nueva fecha *"}
                                        fontSize={"13px"}
                                        fullwidth={true}
                                        minDate={new Date()}
                                    />
                                    </Grid>
                                    <Grid item style={{ marginTop: "20px" }}>
                                        <Typography style={{ fontSize: "15px", color: "#747474" }}>Observación*</Typography>
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
                                    <Grid item container justify='flex-end' style={{ marginTop: '20em' }}>
                                        <CustomButton
                                            label={'Cancelar'}
                                            styleButton={{ height: 35, borderRadius: "20px", border: "1px solid #747474", background: "rgba(200,0,0,0)" }}
                                            variant="contained"
                                            onClik={() => handleClose()}
                                        />
                                        <CustomButton
                                            label={'Guardar'}
                                            styleButton={{ height: 35, borderRadius: '20px', marginLeft: 5 }}
                                            color="primary"
                                            variant="contained"
                                            onClik={() => handleSave()}
                                            disabled={Boolean(observacion === "" || date === "")}
                                        />
                                    </Grid>
                                </>                          
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>

        </>
    )
}

export default NuevoProximoContactoAM