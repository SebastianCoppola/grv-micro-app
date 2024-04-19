//React:
import { useEffect, useState } from 'react'
//Mui:
import { Grid, makeStyles, Typography, Switch, TextField } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
//Tooltip:
import { Tooltip as TippyTooltip } from 'react-tippy'
//Icons:
import AlarmIcon from '../../../../../../commons/assets/IconsMenuDenunciaCompleta/reloj.svg'
import AlarmOffIcon from '../../../../../../commons/assets/IconsAuditoriaMedica/Otros/MDI _ alarm-off.svg'
import Utils from '../../../../../../Utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions/index'
//Utils
import CustomDatePicker from '../../../../../commons/DatePicker/CustomDatePicker'

const useStyles = makeStyles({
    tooltip: {
        width: '300px',
        // height: '130px',
        margin: '0px 0px 0px 0px',
        border: 'solid 1px #F29423',
        borderRadius: '5px',
        background: '#ffff',
        padding: '10px 11px 10px 14px',
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
    },
    tooltipIcon: {
        filter: 'invert(61%) sepia(86%) saturate(930%) hue-rotate(345deg) brightness(99%) contrast(92%)'
    },
    buttonIcons: {
        filter: 'invert(28%) sepia(12%) saturate(13%) hue-rotate(340deg) brightness(94%) contrast(82%)'
    },
    containerPosponer: {
        display: 'flex',
        gap: '7px',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const AlarmaModal = (props) => {
    const { esPosponer, request, setRequest, idDenuncia, fechaAlarmaEstudiosPendientes } = props
    const dispatch = useDispatch()
    //Styles:
    const classes = useStyles()
    //Tooltip:
    const [openTooltips, setOpenTooltips] = useState(false)
    //ACTION TYPES:
    const CANCELAR = 'CANCELAR'
    const POSPONER = 'POSPONER'
    const ALARMA_ON = 'ALARMA_ON'
    const ALARMA_OFF_SIN_SG = 'ALARMA_OFF_SIN_SG'
    const ALARMA_OFF_CON_SG = 'ALARMA_OFF_CON_SG'

    //Min Date para CustomDatePicker
    const setMinDate = () => {
        if(fechaAlarmaEstudiosPendientes){
            return  Utils.dateFormato(fechaAlarmaEstudiosPendientes);
        }else{
            let date1 = new Date()
            let date2 = date1.setDate(date1.getDate() + 1)
            return new Date(date2)
        }
    }

    //Form:
    const [dateAlarma, setDateAlarma] = useState(setMinDate())
    //Para alarmas off:
    const [alarmaOff, setAlarmaOff] = useState(null)

    useEffect(()=>{
        dispatch(actions.getAlarmaEstudiosPendientes({ "idDenuncia": idDenuncia }, callback))
    },[])

    const callback = (estadoAlarmaEstudiosPendientes, error) => {
        if (error) {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: "error",
                message: "Error al verificar la alarma de estudios pendientes",
                vertical: "top"
            }))
        } else {
            if (estadoAlarmaEstudiosPendientes) {
                setAlarmaOff(ALARMA_OFF_SIN_SG)
            } else {
                setAlarmaOff(ALARMA_OFF_CON_SG)
            }
        }
    }

    //Contenido del Tooltip según tipo:
    const dataTooltip = {
        POSPONER: (
            <Grid className={classes.tooltip}>
                <Grid container xs={12} alignItems='center' justify='space-between'>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={AlarmIcon} className={classes.tooltipIcon} alt='calendar icon right' />
                        <Typography style={{ fontSize: 14, color: '#F29423', marginLeft: 7 }}>Posponer alarma</Typography>
                    </Grid>
                    <CloseIcon size='small' style={{ cursor: 'pointer', color: '#505050' }} onClick={() => setOpenTooltips(false)} />
                </Grid>
                <Grid item xs={12} container style={{ marginTop: 15 }}>
                    <Typography style={{ fontSize: 14, color: '#505050' }}>
                        Modificar la fecha. Debe ser Posterior a la indicada.
                    </Typography>
                </Grid>
                <Grid item xs={12} container alignItems='flex-end' justify='space-between' style={{ marginTop: 15 }}>
                    <Grid item>
                        <CustomDatePicker
                           isOutline={true}
                           styleFiltrosAuditoria={true}
                           setSelectedDate={setDateAlarma}
                           selectedDate={dateAlarma}
                           placeholder={"Fecha"}
                           title={"Fecha de Alarma"}
                           fontSize={"13px"}
                           fullwidth={true}
                           minDate={setMinDate()}
                           onClick={()=>{setOpenTooltips(false)}}
                           onClose={()=>{setOpenTooltips(true)}}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            style={{ fontSize: 14, cursor: 'pointer', fontWeight: 700, color: '#505050' }}
                            onClick={() => handleConfirmar(POSPONER)}
                        >
                            Confirmar
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        ),
        ALARMA_ON: (
            <Grid className={classes.tooltip}>
                <Grid container xs={12} alignItems='center' justify='space-between'>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={AlarmIcon} className={classes.tooltipIcon} alt='calendar icon right' />
                        <Typography style={{ fontSize: 14, color: '#F29423', marginLeft: 7 }}>Activar alarma</Typography>
                    </Grid>
                    <CloseIcon size='small' style={{ cursor: 'pointer', color: '#505050' }} onClick={() => setOpenTooltips(false)} />
                </Grid>
                <Grid item xs={12} container justify='center' style={{ marginTop: 15 }}>
                    <Typography style={{ fontSize: 14, color: '#505050' }}>
                        ¿Confirma que desea activar la alarma?
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='flex-end' style={{ marginTop: 15 }}>
                    <Typography
                        style={{ fontSize: 14, cursor: 'pointer', fontWeight: 700, color: '#505050' }}
                        onClick={() => handleConfirmar(ALARMA_ON)}
                    >
                        Confirmar
                    </Typography>
                </Grid>
            </Grid>
        ),
        ALARMA_OFF_SIN_SG: (
            <Grid className={classes.tooltip}>
                <Grid container xs={12} alignItems='center' justify='space-between'>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={AlarmOffIcon} className={classes.tooltipIcon} alt='calendar icon right' />
                        <Typography style={{ fontSize: 14, color: '#F29423', marginLeft: 7 }}>Cierre de alarma de estudio</Typography>
                    </Grid>
                    <CloseIcon size='small' style={{ cursor: 'pointer', color: '#505050' }} onClick={() => setOpenTooltips(false)} />
                </Grid>
                <Grid item xs={12} container justify='center' style={{ marginTop: 15 }}>
                    <Typography style={{ fontSize: 14, color: '#505050' }}>
                        No se encontraron Solicitudes Genéricas para la alarma. ¿Desea cerrarla?
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='flex-end' style={{ marginTop: 15 }}>
                    <Typography
                        style={{ fontSize: 14, cursor: 'pointer', fontWeight: 700, color: '#505050' }}
                        onClick={() => handleConfirmar(ALARMA_OFF_SIN_SG)}
                    >
                        Confirmar
                    </Typography>
                </Grid>
            </Grid>
        ),
        ALARMA_OFF_CON_SG: (
            <Grid className={classes.tooltip}>
                <Grid container xs={12} alignItems='center' justify='space-between'>
                    <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={AlarmOffIcon} className={classes.tooltipIcon} alt='calendar icon right' />
                        <Typography style={{ fontSize: 14, color: '#F29423', marginLeft: 7 }}>Cierre de alarma de estudio</Typography>
                    </Grid>
                    <CloseIcon size='small' style={{ cursor: 'pointer', color: '#505050' }} onClick={() => setOpenTooltips(false)} />
                </Grid>
                <Grid item xs={12} container justify='center' style={{ marginTop: 15 }}>
                    <Typography style={{ fontSize: 14, color: '#505050' }}>
                        Se encontraron Solicitudes Genéricas para la alarma.
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    //Setea el contenido del Tooltip según tipo:
    const setDataTooltip = () => {
        if (esPosponer) {
            return dataTooltip[POSPONER]
        } else if (!request.alarmaEstudiosPendientes) {
            return dataTooltip[ALARMA_ON]
        } else {
            if (alarmaOff && alarmaOff === ALARMA_OFF_SIN_SG) {
                return dataTooltip[ALARMA_OFF_SIN_SG]
            } else {
                return dataTooltip[ALARMA_OFF_CON_SG]
            }
        }
    }
    //Handle Confirmar:
    const handleConfirmar = (type) => {
        setOpenTooltips(false)
        switch (type) {
            case CANCELAR:
                break
            case ALARMA_ON:
                setRequest({ ...request, alarmaEstudiosPendientes: true })
                break
            case ALARMA_OFF_SIN_SG || ALARMA_OFF_CON_SG:
                setRequest({ ...request, alarmaEstudiosPendientes: false })
                break
            case POSPONER:
                let date1 = new Date(dateAlarma)
                setRequest({ ...request, fechaAlarmaEstudiosPendientes: date1 })
                break
            default:
                break
        }
    }

    return (
        <TippyTooltip position="bottom" open={openTooltips} html={setDataTooltip()}>
            {esPosponer ?
                <Grid className={classes.containerPosponer} onClick={() => setOpenTooltips(true)}>
                    <img src={AlarmIcon} className={classes.buttonIcons} alt='calendar icon right' />
                    <Typography style={{ color: '#505050', fontSize: '15px' }}>Posponer</Typography>
                </Grid>
                :
                <Switch
                    checked={request.alarmaEstudiosPendientes}
                    onChange={() => setOpenTooltips(true)}
                    color="primary"
                />
            }
        </TippyTooltip>
    )
}

export default AlarmaModal