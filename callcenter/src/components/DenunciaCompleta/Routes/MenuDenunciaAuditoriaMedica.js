import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import Utils from '../../../Utils/utils'
//Mui:
import { Drawer, Divider, IconButton, ListItem, ListItemIcon, ListItemText, List, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
//Icos:
import MenuDenuncia from '../../../commons/assets/IconsMenuDenunciaCompleta/MenuDenuncia.png'
import ICOGeneral from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOGeneral.png'
import ICOPrimeraAsistencia from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOPrimeraAsistencia.png'
import ICOauditoriamedica from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOauditoriamedica.svg'
import ICOturnos from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOturnos.svg'
import ICOcirugia from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOcirugia.svg'
import ICORequerimientos from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOrequerimientos.svg'
import ICOSeguimiento from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOSeguimiento.png'
import ICOSolicitudesGenericas from '../../../commons/assets/IconsMenuDenunciaCompleta/ICOSolicitudesGenericas.svg'
import { useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '255px',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '&& .MuiDrawer-paperAnchorDockedLeft': {
            display: 'contents'
        }
    },
    drawerOpen: {
        width: '255px',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    textMenu: {
        color: '#1473e6',
        marginLeft: 5,
        fontSize: 10
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    list: {
        '& .MuiListItem-button:hover': {
            backgroundColor: 'transparent'
        }
    },
    boton: {
        marginTop: '15px',
        padding: '0px',
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent'
        }
    },
    itemSelected: {
        borderRight: '2px solid #1473e6',
    },
    fondo: {
        width: '97%',
        height: '13%',
        objectFit: 'cover',
        zIndex: '+1',
        position: 'absolute',
        backgroundColor: '#1473e6',
        opacity: '0.08',
        borderRadius: '25px'
    },
}))

const MenuDenunciaAuditoriaMedica = (props) => {
    const { path, denuncia, usuarioActivo } = props
    const classes = useStyles(props)
    const history = useHistory()
    const dispatch = useDispatch()
    const [openDrawer, setOpenDrawer] = useState(true)
    const [activeRoute, setActiveRoute] = useState(null)
    const nroDenuncia = denuncia ? Utils.nroAsignadoProvisorio(denuncia) : ''
    const initialRutas = {
        home: false,
        general: false,
        primeraAsistencia: false,
        auditoriaMedica: false,
        turnos: false,
        cirugias: false,
        requerimientos: false,
        seguimientos: false,
        solicitudesGenericas: false
    }
    const [colorGenerales, setColorGenerales] = React.useState(false)
    const [colorPrimeraAsistencia, setColorPrimeraAsistencia] = React.useState(false)
    const [colorAuditoriaMedica, setColorAuditoriaMedica] = React.useState(false)
    const [colorTurnos, setColorTurnos] = React.useState(false)
    const [colorCirugia, setColorCirugia] = React.useState(false)
    const [colorRequerimientos, setColorRequerimientos] = React.useState(false)
    const [colorSeguimiento, setColorSeguimiento] = React.useState(false)
    const [colorSolicitudesGenericas, setColorSolicitudesGenericas] = useState(false)

    const onClickRouter = (chosenRoute) => {
        setActiveRoute({ ...initialRutas, [chosenRoute]: true })
        history.push(`${path}/${chosenRoute}`)
        pintarFondoPestaña(chosenRoute)
    }
    const { pathname } = history.location

    useEffect(() => {
        let pathname = history.location.pathname.split("/")
        if (pathname[3]) {
            pintarFondoPestaña(pathname[3])
        }
        else {
            setColorGenerales(false)
            setColorPrimeraAsistencia(false)
            setColorAuditoriaMedica(false)
            setColorTurnos(false)
            setColorCirugia(false)
            setColorRequerimientos(false)
            setColorSeguimiento(false)
            setColorSolicitudesGenericas(false)
        }
    }, [pathname])

    //Metodo que segun pestaña elegida se pinta el fondo
    let pintarFondoPestaña = (data) => {
        switch (data) {
            case 'general':
                setColorGenerales(true)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'primeraAsistencia':
                setColorGenerales(false)
                setColorAuditoriaMedica(false)
                setColorPrimeraAsistencia(true)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'auditoriaMedica':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(true)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'turnos':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(true)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'cirugias':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(true)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'requerimientos':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(true)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
            case 'seguimientos':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(true)
                setColorSolicitudesGenericas(false)
                break;
            case 'solicitudesGenericas':
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(true)
                break;
            default:
                setColorGenerales(false)
                setColorPrimeraAsistencia(false)
                setColorAuditoriaMedica(false)
                setColorTurnos(false)
                setColorCirugia(false)
                setColorRequerimientos(false)
                setColorSeguimiento(false)
                setColorSolicitudesGenericas(false)
                break;
        }
    }

    return (
        <div >
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: openDrawer,
                    [classes.drawerClose]: !openDrawer,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: openDrawer,
                        [classes.drawerClose]: !openDrawer,
                    }),
                }}
            >
                <List style={{ minHeight: '400px', borderRight: '1px solid #dadce0' }} className={classes.list}>

                    <ListItem button onClick={() => onClickRouter('')} >
                        <ListItemIcon> <img src={MenuDenuncia} /></ListItemIcon>
                        <ListItemText primary={nroDenuncia} style={{ color: '#505050', fontWeight: '700', marginLeft: 5 }} />
                    </ListItem>

                    <div className={colorGenerales ? classes.fondo : null} onClick={() => onClickRouter('general')}></div>
                    <ListItem button onClick={() => onClickRouter('general')} className={activeRoute && activeRoute.general ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu}><img src={ICOGeneral} /></ListItemIcon>
                        <ListItemText primary={'General'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorPrimeraAsistencia ? classes.fondo : null} onClick={() => onClickRouter('primeraAsistencia')}></div>
                    <ListItem button onClick={() => onClickRouter('primeraAsistencia')} className={activeRoute && activeRoute.primeraAsistencia ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu}> <img src={ICOPrimeraAsistencia} /></ListItemIcon>
                        <ListItemText className={classes.textMenu} primary={'Primera Asistencia'} />
                    </ListItem>

                    <div className={colorAuditoriaMedica ? classes.fondo : null} onClick={() => onClickRouter('auditoriaMedica')}></div>
                    <ListItem button onClick={() => onClickRouter('auditoriaMedica')} className={activeRoute && activeRoute.auditoriaMedica ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu} > <img src={ICOauditoriamedica} /></ListItemIcon>
                        <ListItemText primary={'Auditoria Médica'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorTurnos ? classes.fondo : null} onClick={() => onClickRouter('turnos')}></div>
                    <ListItem button onClick={() => onClickRouter('turnos')} className={activeRoute && activeRoute.turnos ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu} > <img src={ICOturnos} /></ListItemIcon>
                        <ListItemText primary={'Turnos'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorCirugia ? classes.fondo : null} onClick={() => onClickRouter('cirugias')}></div>
                    <ListItem button onClick={() => onClickRouter('cirugias')} className={activeRoute && activeRoute.cirugias ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu}> <img src={ICOcirugia} /></ListItemIcon>
                        <ListItemText primary={'Cirugias'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorRequerimientos ? classes.fondo : null} onClick={() => onClickRouter('requerimientos')}></div>
                    <ListItem button onClick={() => onClickRouter('requerimientos')} className={activeRoute && activeRoute.requerimientos ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu}> <img src={ICORequerimientos} /></ListItemIcon>
                        <ListItemText primary={'Requerimientos'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorSeguimiento ? classes.fondo : null} onClick={() => onClickRouter('seguimientos')}></div>
                    <ListItem button onClick={() => onClickRouter('seguimientos')} className={activeRoute && activeRoute.seguimientos ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu}> <img src={ICOSeguimiento} /></ListItemIcon>
                        <ListItemText primary={'Seguimientos'} className={classes.textMenu} />
                    </ListItem>

                    <div className={colorSolicitudesGenericas ? classes.fondo : null} onClick={() => onClickRouter('solicitudesGenericas')}></div>
                    <ListItem button onClick={() => onClickRouter('solicitudesGenericas')} className={activeRoute && activeRoute.solicitudesGenericas ? classes.itemSelected : null}>
                        <ListItemIcon className={classes.textMenu} > <img src={ICOSolicitudesGenericas} /></ListItemIcon>
                        <ListItemText primary={'Solicitudes Genéricas'} className={classes.textMenu} />
                    </ListItem>

                </List>

                <Divider />

                <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.boton}>
                    <Menu style={{ marginRight: 10 }} />
                    <Typography style={{ fontSize: 15, fontWeight: 700 }}>{openDrawer ? 'Cerrar' : 'Abrir'}</Typography>
                </IconButton>

            </Drawer>

        </div>
    )
}

export default MenuDenunciaAuditoriaMedica