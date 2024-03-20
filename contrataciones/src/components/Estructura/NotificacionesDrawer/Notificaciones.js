import React, { useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Router:
import { useHistory } from 'react-router-dom'
//Utils:
import { FECTH_URL_NOTIFICACIONES, FECTH_URL_MARCAR_VISTA_NOTIFICACION, FECTH_URL_ELIMINAR_NOTIFICACION } from '../../../Utils/urls'
import { MENSAJE_ERROR_NOTIFICACIONES, MENSAJE_ERROR_MARCAR_VISTA, CERRAR, NOTIFICACIONES, 
    NOTIFICACIONES_NOT_FOUND, tiposNotificaciones, SNACK_VERTICAL, NOTIFICACION_SOLICITUD_GENERICA_INDEX, 
    SNACK_SEVERITY } from '../../../Utils/const'
//Mui:
import { Grid, IconButton, Avatar, Box, makeStyles, Typography } from '@material-ui/core'
import { NotificationsNoneOutlined } from '@material-ui/icons/'
//Components:
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import Loader from '../../commons/Loading/Loader'
import Notificacion from './Notificacion'
import DrawerRight from '../../commons/CustomDrawer/DrawerRight'
import CustomButton from '../../commons/Button/CustomButton'

const useStyles = makeStyles({
    notificacion: {
        color: '#1473e6',
    },
    dotNotification: {
        width: '17px',
        height: '17px',
        position: 'absolute',
        top: 0,
        right: 0,
        border: 'solid 1px rgba(0, 0, 0, 0)',
        backgroundColor: '#f29423',
        fontSize: '11px',
    },
    notFound: {
        width: '100%',
        backgroundColor: '#dfdfdf',
        color: '#505050',
        fontSize: 14,
        padding: '20px 0px',
        margin: '10px 10px 0 10px',
        textAlign: 'center',
        borderRadius: 2,
    }
})

const Notificaciones = (props) => {

    const { usuarioActivo, campanaNotificaciones, setOpenBuscador } = props

    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ mensaje: null, notificaciones: null })
    const [errorNotificaciones, setErrorNotificaciones] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })
    const [openDrawer, setOpenDrawer] = useState(false)

    //Buscar notificaciones:
    const buscarNotificaciones = () => {
        setLoading(true)
        fetch(FECTH_URL_NOTIFICACIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idPersona: usuarioActivo ? usuarioActivo.id : null }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            setErrorNotificaciones({ mensaje: null, error: false })
                            setData({ notificaciones: data ? data.body : null })
                        } else if (data.status === 204) {
                            setErrorNotificaciones({ mensaje: null, error: false })
                            setData({ mensaje: data && data.message ? data.message : null })
                        } else {
                            setErrorNotificaciones({ mensaje: null, error: false })
                            setData({ mensaje: null, notificaciones: null })
                        }
                        setLoading(false)
                    })
                    .catch(err => {
                        setErrorNotificaciones({ mensaje: MENSAJE_ERROR_NOTIFICACIONES, error: true })
                        setLoading(false)
                    })
            })
            .catch(err => {
                setErrorNotificaciones({ mensaje: MENSAJE_ERROR_NOTIFICACIONES, error: true })
                setLoading(false)
            })
    }

    //Eliminar Notificación:
    const eliminarNotificacion = (idNotificacion) => {
        let callback = (bool) => {
            if(bool){
                buscarNotificaciones()
                if (usuarioActivo.id !== null) {
                    dispatch(actions.searchCampanaNotificaciones({ idPersona: usuarioActivo.id }))
                }
            }else{
                setOpenSnackBar({
                    open: true, 
                    title: MENSAJE_ERROR_MARCAR_VISTA,
                    severity: SNACK_SEVERITY.ERROR,
                    vertical: SNACK_VERTICAL.TOP
                })
            }
        }
        fetch(FECTH_URL_ELIMINAR_NOTIFICACION, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idNotificacion: idNotificacion }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) callback(true)
                        else callback(false)
                    })
                    .catch(() => { 
                        callback(false)
                    })
            })
            .catch(() => {
                callback(false)
            })
    }

    //Notificación Vista:
    const marcarVista = (idNotificacion) => {
        let callback = (bool) => {
            if(bool){
                buscarNotificaciones()
                if (usuarioActivo.id !== null) {
                    dispatch(actions.searchCampanaNotificaciones({ idPersona: usuarioActivo.id }))
                }
            }else{
                setOpenSnackBar({
                    open: true, 
                    title: MENSAJE_ERROR_MARCAR_VISTA,
                    severity: SNACK_SEVERITY.ERROR,
                    vertical: SNACK_VERTICAL.TOP
                })
            }
        }
        fetch(FECTH_URL_MARCAR_VISTA_NOTIFICACION, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idNotificacion: idNotificacion }),
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200)callback(true)
                        else callback(false)
                    })
                    .catch(() => {
                        callback(false)
                    })
            })
            .catch(() => {
                callback(false)
            })
    }

    //On Click Notificación:
    const handleClickNotificacion = (notification) => {
        let idTipoNotificacion = notification.tipoNotificacionIdTipoNotificacion

        switch (idTipoNotificacion) {
            case tiposNotificaciones.ALARMA_AMBULANCIA:
                buscarDenuncia(notification, '/traslados')
                break
            case tiposNotificaciones.ALARMA_CORTOPUNZANTE: 
            case tiposNotificaciones.ALARMA_DIAGNOSTICO: 
                buscarDenuncia(notification, '/generales')
                break
            case tiposNotificaciones.SG_CERRADA: 
            case tiposNotificaciones.SG_RECHAZADA: 
            case tiposNotificaciones.SG_ASIGNADA: 
            case tiposNotificaciones.SG_DERIVADA: 
                buscarSG(notification)
                break
            case tiposNotificaciones.DENUNCIA_URGENTE:
                buscarDenuncia(notification, '')
                break
            default:
                break
        }
    }

    //Buscar Denuncia y Redirigir:
    const buscarDenuncia = (notification, requestedPath) => {
        let callbackSearchDenunciaById = (succes) => {
            if (succes) {
                history.push({ pathname: `/home/editar${requestedPath}`, state: { redireccion: true } })
            } else {
                setOpenSnackBar({
                    open: true,
                    title: 'Ocurrió un error al intentar cargar la Denuncia.',
                    severity: 'error'
                })
            }
        }
        let idDenuncia1 = notification.titulo.split(" ")[1].match(/[a-z]+|[^a-z]+/gi)
        let idDenuncia2 = idDenuncia1 && idDenuncia1.length 
            && !isNaN(idDenuncia1[0]) ? idDenuncia1[0] : idDenuncia1[1]
        if (!isNaN(idDenuncia2)) {
            dispatch(actions.searchDenunciaById(idDenuncia2, 0, callbackSearchDenunciaById))
            setOpenDrawer(false)
        } else {
            callbackSearchDenunciaById(false)
        }
    }

    //Buscar SG y Redirigir:
    const buscarSG = (notification) => {
        marcarVista(notification.idNotificacion)
        dispatch(actions.setNotificacionesGenerales(true))
        if (!notification.idSolicitudGenerica) {
            notification.idSolicitudGenerica = notification.titulo.slice(NOTIFICACION_SOLICITUD_GENERICA_INDEX)
        }
        if (notification.idSolicitudGenerica && usuarioActivo.id){
            dispatch(actions.marcarComoVista({idSolicitud: notification.idSolicitudGenerica , idOperador: usuarioActivo.id}))
        }
        dispatch(actions.seleccionarSG({ idSolicitud: notification.idSolicitudGenerica }))
        history.push('/home/solicitudesGenericas/editar')
        setOpenDrawer(false)
    }

    //Abre el drawer Notificaciones:
    const handleOpenNotificaciones = () => {
        buscarNotificaciones()
        setOpenDrawer(true)
        setOpenBuscador(false)
    }

    //Cierra el drawer Notificaciones:
    const handleCloseNotificaciones = () => {
        setOpenBuscador(true)
        setOpenDrawer(false)
    }

    const contenidoDrawer = [
        <Grid container spacing={4} justify={'center'} style={{ padding: '5px 15px' }}>
            {loading ?
                <Grid item>
                    <Loader loading={loading} />
                </Grid>
            : data && data.mensaje ?
                <Grid item>
                    {data.mensaje}
                </Grid>
            : errorNotificaciones !== null && errorNotificaciones.error ?
                <Grid item>
                    {errorNotificaciones.mensaje}
                </Grid>
            : data && data.notificaciones && data.notificaciones.length > 0 ?
                data.notificaciones.map((notification) => (
                    <Grid item>
                        <Notificacion
                            key={notification.idNotificacion}
                            notification={notification}
                            marcarVista={marcarVista}
                            eliminarNotificacion={eliminarNotificacion}
                            handleClickNotificacion={handleClickNotificacion}
                        />
                    </Grid>
                ))
            :
                <Grid item container>
                    <Typography className={classes.notFound}>{NOTIFICACIONES_NOT_FOUND}</Typography>
                </Grid>
            }
        </Grid>
    ]

    const botonesDrawer = [
        <Grid container justify='flex-end'>
            <CustomButton
                variant='contained'
                label={CERRAR}
                styleButton={{ borderRadius: 25 }}
                styleLabel={{ color: '#505050' }}
                onClik={handleCloseNotificaciones}
            />
        </Grid>
    ]

    return (
        <>
            {/* NOTIFICACIONES ICON  */}
            <Box style={{ position: 'relative' }}>
                <IconButton className={classes.notificacion} onClick={handleOpenNotificaciones}>
                    <NotificationsNoneOutlined />
                    {campanaNotificaciones && campanaNotificaciones.cantidadNotificacionesSinVer > 0 ?
                        <Avatar className={classes.dotNotification}>
                            {campanaNotificaciones && campanaNotificaciones.notificacionesSinVer
                                ? campanaNotificaciones.cantidadNotificacionesSinVer
                                : 0
                            }
                        </Avatar>
                        : null}
                </IconButton>
            </Box>

            {/* NOTIFICACIONES DRAWER  */}
            <DrawerRight
                openDrawer={openDrawer}
                closeDrawer={handleCloseNotificaciones}
                contenido={[contenidoDrawer]}
                stepper={null}
                botones={[botonesDrawer]}
                title={NOTIFICACIONES}
                width={500}
            />

            {/* SNACKBAR */}
            <CustomSnackBar
                handleClose={() => setOpenSnackBar({ open: false })}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
                vertical={openSnackBar.vertical}
            />

        </>
    )
}

Notificaciones.propTypes = {
    usuarioActivo: PropTypes.any,
    campanaNotificaciones: PropTypes.any
}

export default Notificaciones

