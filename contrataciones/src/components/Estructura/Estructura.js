import React, { useState } from 'react'
import clsx from 'clsx'
//Mui:
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, AppBar, Toolbar, Typography, IconButton, Menu, Box } from '@material-ui/core/'
//Components:
import CustomTypography from '../commons/Typography/CustomTypography'
import Proveedores from './ItemsMenu/Proveedores'
import IconSearch from '../BuscadorFlotante/IconSearch'
import Notificaciones from './NotificacionesDrawer/Notificaciones'
import Contactos from './AgendaContactos/Contactos'
// import NotificacionesMasInformacion from './MasInfo/NotificacionesMasInformacion'
//Assets:
import PNGlogo from '../../commons/assets/logoCompleto.png'
import PNGavatar from '../../commons/assets/avatar.jpg'
import SVGlogoCompleto from '../../commons/assets/svgLogoCompleto.svg'
import SVGlogout from '../../commons/assets/Header/Logout.svg'
import SVGmenuOpen from '../../commons/assets/Header/MenuOpen.svg'
//Utils:
import Utils from '../../Utils/utils'
import { MODULO_AUDITORIA_MEDICA } from '../../Utils/const'
//import { URL_PATH_LOGIN } from '../../Urls/login'

const withToolBar = '56px'
const drawerWidth = 280

const useStyles = makeStyles((theme) => ({
	root: {
		'& > .MuiDrawer-root > .MuiPaper-root': {
			height: propStyle => !propStyle.open && propStyle.miniMenu ? '56px' : null,
			boxShadow: propStyle => !propStyle.open && propStyle.miniMenu ?
				'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
				: null,
		}
	},
	appBar: {
		backgroundColor: '#ffffff',
		height: withToolBar,
		marginLeft: '77px',
		width: `calc(100% - 77px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	toolbar: {
		height: withToolBar,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cabecera: {
		display: 'flex',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		flexGrow: 1,
		height: withToolBar
	},
	menuButton: {
		color: '#f5f5f5',
	},
	logo: {
		width: '140.1px',
		height: '45px',
		margin: '0px 18.9px 0px',
	},
	title: {
		fontSize: propStyle => propStyle.navegacion ? '19px' : '22px',
		fontSize: "20px",
		fontWeight: 'bold',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: 1.3,
		letterSpacing: 'normal',
		textAlign: 'left',
		color: '#323232',
		minWidth: 100
	},
	linea: {
		width: '2px',
		height: withToolBar,
		margin: '0 5px 0 0',
		backgroundColor: '#70efde',
		color: '#70efde'
	},
	nombreUsuario: {
		margin: '0px 0px 0px 0px',
		color: '#25265e',
		textTransform: "capitalize",
		fontSize: '16px',
		fontWeight: 'normal',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.5',
		letterSpacing: '0.14px',
		textAlign: 'right',
	},
	rolUsuario: {
		margin: '0px 1px 0 0px',
		color: '#787993',
		fontSize: '12px',
		fontWeight: '500',
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: '1.71',
		letterSpacing: '0.1px',
		textAlign: 'right',
	},
	fotoUsuario: {
		width: '40px',
		height: '40px',
		margin: '0px 0px 0 16px',
		backgroundColor: '#ffffff',
	},
	loguot: {
		width: '40px',
		height: '40px',
		color: '#1473e6',
		margin: '0px 15px 0px 7px'
	},
	drawer: {
		width: drawerWidth,
		whiteSpace: 'nowrap',
		flexShrink: 0,
	},
	drawerOpen: {
		backgroundColor: '#124680',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: 'hidden',
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	drawerClose: {
		backgroundColor: '#124680',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		overflowY: 'hidden',
		width: theme.spacing(9) + 4,
	},
	navigator: {
		display: 'flex',
		flexDirection: 'column',
		margin: '0px 0px 0px 2%',
		flexGrow: 1
	}
}))

const Estructura = (props) => {

	const { usuario, handleRouter, setOpenMenu, openMenu, miniMenu, navegacion, tituloHeader,
		campanaNotificaciones, setOpenBuscador, history } = props

	const [open, setOpen] = useState(false)

	const propStyle = { miniMenu: miniMenu, open: open, navegacion: navegacion }

	const classes = useStyles(propStyle)

	const { nombre, apellido, roles } = usuario

	const rutaActual = history.location.pathname

	const handleDrawerOpen = () => {
		if(!openMenu) setOpen(true)
	}

	const handleDrawerClose = () => {
		if(!openMenu) setOpen(false)
	}

	const handleDrawer = () => {
		if(!openMenu){
			setOpen(true)
			setOpenMenu(!openMenu)
		}else{
			setOpenMenu(!openMenu)
		}
	}

	const handleLogOut = () => {
		Utils.deleteCookieByName("datos_usuario")
		Utils.deleteCookieByName("user_image")
		//window.location.href = URL_PATH_LOGIN
	}

	let base64String = Utils.getCookieByName("user_image")
	let base64JSONImage = base64String !== "null" ? JSON.parse(base64String) : null

	return (
		<div className={classes.root}>

			{/* APP BAR */}
			<AppBar className={clsx(classes.appBar, { [classes.appBarShift]: open, })} position="fixed">
				<Toolbar className={classes.toolbar} disableGutters={true} variant='dense'>
					<div className={classes.cabecera}>

						{!open ?
							<img alt='Colonia Suiza' className={classes.logo} src={PNGlogo} />
						: null}

						<span className={classes.linea}></span>

						<div className={classes.navigator}>
							<Typography className={classes.title}>
								{tituloHeader}
							</Typography>
						</div>

						<div style={{ margin: '20px' }}>
							<IconSearch cabeceraIcon={true} usuarioActivo={usuario} />
						</div>

						<span className={classes.linea}></span>

						<Box display="flex" justifyContent="center" mr={2} style={{ minWidth: '10%' }}>
							<Notificaciones
								usuarioActivo={usuario}
								campanaNotificaciones={campanaNotificaciones}
								setOpenBuscador={setOpenBuscador}
							/>
							{usuario && usuario.apps && usuario.apps.length === 1 && usuario.apps[0] !== MODULO_AUDITORIA_MEDICA &&
								<Contactos setOpenBuscador={setOpenBuscador} />
							}
							{/* <NotificacionesMasInformacion usuarioActivo={usuario} setOpenBuscador={setOpenBuscador} /> */}
						</Box>

						<div>
							<CustomTypography text={`${apellido} ${nombre}`} className={classes.nombreUsuario} />
							<CustomTypography text={roles && roles[0] ? roles[0] : ''} className={classes.rolUsuario} />
						</div>

						{Utils.deserializeImagenToBlob(base64JSONImage, PNGavatar)}

						<IconButton className={classes.loguot} onClick={handleLogOut}>
							<img src={SVGlogout} />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			{/* MENÚ LATERAL */}
			<Drawer
				onMouseLeave={handleDrawerClose}
				onMouseOver={handleDrawerOpen}
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					{!open ?
						<IconButton className={classes.menuButton} onClick={handleDrawer}>
							<Menu />
						</IconButton>
					:
						<>
							<IconButton className={classes.menuButton} onClick={handleDrawer}>
								<img src={SVGmenuOpen} />
							</IconButton>
							<img alt='Colonia Suiza' className={classes.logo} src={SVGlogoCompleto} />
						</>
					}
				</div>
				{miniMenu && !open ? null :
					<Proveedores
						open={open}
						handleRouter={handleRouter}
						rutaActual={rutaActual}
					/>
				}
			</Drawer>

		</div>
	)
}

export default Estructura
