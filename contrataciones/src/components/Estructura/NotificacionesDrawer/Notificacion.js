import React from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Avatar, Grid, IconButton } from '@material-ui/core'
import { Close, FiberManualRecord } from '@material-ui/icons'
//Utils:
import { tiposNotificaciones } from '../../../Utils/const'
//Components:
import CustomTypography from '../../commons/Typography/CustomTypography'
//Icos:
import icoCortoPunzante from '../../../commons/assets/Notificaciones/ico-corto-punzante.png'
import icoValidarDiagnostico from '../../../commons/assets/Notificaciones/ico-validar-diagnostico.png'
import icoTraslado from '../../../commons/assets/Notificaciones/ico-traslado.png'
import icoCallCenter from '../../../commons/assets/Notificaciones/ico-callcenter.png'
import icoSgRechazada from '../../../commons/assets/Notificaciones/ico-sg-rechazada.png'
import icoSgCerrada from '../../../commons/assets/Notificaciones/ico-sg-cerrada.png'
import icoSgPendiente from '../../../commons/assets/Notificaciones/ico-sg-pendiente.png'

const Notificacion = (props) => {

    const { notification, marcarVista, eliminarNotificacion, handleClickNotificacion } = props
       
    const selectAvatar = (idTipoNotificacion) => {
        switch(idTipoNotificacion){
            case tiposNotificaciones.ALARMA_AMBULANCIA: return icoTraslado
            case tiposNotificaciones.ALARMA_CORTOPUNZANTE: return icoCortoPunzante
            case tiposNotificaciones.ALARMA_DIAGNOSTICO: return icoValidarDiagnostico
            case tiposNotificaciones.SG_CERRADA: return icoSgCerrada
            case tiposNotificaciones.SG_RECHAZADA: return icoSgRechazada
            case tiposNotificaciones.SG_ASIGNADA: return icoSgPendiente
            case tiposNotificaciones.SG_DERIVADA: return icoSgPendiente
            default: return icoCallCenter
        }
    }

    return (
        <Grid container spacing={2} style={{border:'1px solid #eaeaea', padding:8}}>
            
            <Grid item onClick={()=>handleClickNotificacion(notification)} style={{cursor:'pointer'}}>
                <Avatar variant="square" src={ notification ? selectAvatar(notification.tipoNotificacionIdTipoNotificacion) : ''} />
            </Grid>

            <Grid item md container>
                <Grid item container justify='space-between' alignItems='center'>
                    <Grid item onClick={()=>handleClickNotificacion(notification)} style={{cursor:'pointer'}}>
                        <CustomTypography text={<strong>{notification.titulo}</strong>} variant="body2" />
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'flex-end', gap:10}}>
                        <IconButton style={{padding:0}} onClick={()=>marcarVista(notification.idNotificacion)} >
                            <FiberManualRecord htmlColor={notification && !notification.vista ? 'red': '#6e6e6'} />
                        </IconButton>
                        <IconButton style={{padding:0}} onClick={()=> eliminarNotificacion(notification.idNotificacion)}>
                            <Close htmlColor='#6e6e6' />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop:10}} >
                    <CustomTypography text={notification.mensaje} variant="body2" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography text={notification.tiempoDesdeCreacion} variant="caption" />
                </Grid>
            </Grid>

        </Grid>

    )
}

Notificacion.propTypes = {
    notification: PropTypes.any,
    marcarVista: PropTypes.func,
    eliminarNotificacion: PropTypes.func
}

export default Notificacion