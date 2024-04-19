import React, { useState } from 'react'
//Mui:
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, AppBar, Typography, IconButton, Grid } from '@material-ui/core/'
import { Menu, MenuOpen } from '@material-ui/icons'
//Components:
import NavMenu from './NavMenu/NavMenu'
import IconSearch from '../BuscadorFlotante/IconSearch'
import NotificacionesDrawer from './NotificacionesDrawer/NotificacionesDrawer'
import ContactosDrawer from './ContactosDrawer/ContactosDrawer'
import MasInfoDrawer from './MasInfoDrawer/MasInfoDrawer'
//Assets:
import PNGlogo from '../../assets/Otros/logoCompleto.png'
import SVGlogoCompleto from '../../assets/Otros/svgLogoCompleto.svg'
import SVGlogout from '../../assets/Otros/Logout.svg'
import PNGavatar from '../../assets/Otros/avatar.jpg'
//Utils:
import Utils from '../../utils/utils'
//Router:
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
	logo: {
		width: '140px',
		height: '45px',
		marginLeft: '25px',
	}
})

const Estructura = (props) => {

	const { usuario, navLinks, defaultStyles, open, setOpen } = props
	
	const classes = useStyles()
	const location = useLocation()

	const [fixedMenu, setFixedMenu] = useState(false)

	const { nombre, apellido, roles } = usuario

	const handleLogOut = () => {
		Utils.deleteCookieByName('datos_usuario')
		Utils.deleteCookieByName('user_image')
		window.location.href = 'http://localhost:8070/'
	}

	const getHeaderTitle = () => {
		let pathname = location.pathname
		// Busca el path en las rutas primarias
		for (const rutaKey in navLinks.rutasPrimarias) {
			if (navLinks.rutasPrimarias[rutaKey].path === pathname) {
				return navLinks.rutasPrimarias[rutaKey].headerTitle
			}
		}
		// Busca el path en las otras rutas primarias
		for (const rutaKey in navLinks.otrasRutasPrimarias) {
			if (navLinks.otrasRutasPrimarias[rutaKey].path === pathname) {
				return navLinks.otrasRutasPrimarias[rutaKey].headerTitle
			}
		}
		// Busca el path en las rutas secundarias
		for (const rutaKey in navLinks.rutasSecundarias) {
			if (navLinks.rutasSecundarias[rutaKey].path === pathname) {
				return navLinks.rutasSecundarias[rutaKey].headerTitle
			}
		}
		// Si no se encuentra el path, devuelve null o un valor predeterminado según necesites
		return ''
	}

	const getBreadCrumbs = () => {
		let pathname = location.pathname ?? ''
		if(pathname.includes('home/editar')){
			return (
				<Typography style={{
					fontSize:'11px',
					lineHeight:1.3,
					textAlign:'left',
					color:'#323232',
					minWidth:100
				}}> 
					{'Inicio   >   Consultas   >   Detalle Denuncia'}					
				</Typography>
			)
		}
	}

	return (
		<>

			{/* APP BAR */}
			<AppBar style={{height:defaultStyles.appBarHeight, backgroundColor:'#ffffff', width:'100%'}} position="fixed">
				<Grid container alignItems='center' justifyContent='space-between' style={{overflow:'hidden'}}>
					<Grid item xs={7} style={{display:'flex', alignItems:'center', flexWrap:'nowrap'}}>
						<div style={{width: defaultStyles.drawerWidthOpened, paddingLeft: defaultStyles.drawerWidthClosed, boxSizing:'border-box'}}>
							<img alt='Colonia Suiza' className={classes.logo} src={PNGlogo} />
						</div>
						<span style={{
							width: '2px',
							height: defaultStyles.appBarHeight,
							backgroundColor: '#70efde',
							color: '#70efde'
						}}/>
						<div style={{display:'flex', flexDirection:'column', marginLeft:'20px'}}>
							{ getBreadCrumbs() }
							<Typography style={{
								fontSize:'20px',
								fontWeight:'bold',
								lineHeight:1.3,
								textAlign:'left',
								color:'#323232',
								minWidth:100
							}}> 
								{ getHeaderTitle() }
							</Typography>
						</div>
				</Grid>
					<Grid item xs={5} style={{display:'flex', justifyContent:'flex-end', alignItems:'center', flexWrap:'nowrap'}}>
						<Grid item style={{marginRight:'20px'}}>
							<IconSearch cabeceraIcon={true} usuarioActivo={usuario} />
						</Grid>
						<span style={{
							width: '2px',
							height: defaultStyles.appBarHeight,
							backgroundColor: '#70efde',
							color: '#70efde'
						}}/>
						<Grid item style={{display:'flex', paddingRight:'20px'}}>
							<NotificacionesDrawer />
							<ContactosDrawer />
							<MasInfoDrawer />
						</Grid>
						<Grid item>
							<Typography style={{
								color: '#25265e',
								textTransform: "capitalize",
								fontSize: '16px',
								letterSpacing: '0.14px',
								textAlign: 'right'
							}}>{`${apellido} ${nombre}`}</Typography>
							<Typography style={{
								color: '#787993',
								fontSize: '12px',
								fontWeight: '500',
								lineHeight: '1.71',
								letterSpacing: '0.1px',
								textAlign: 'right'
							}}>{roles && roles[0] ? roles[0] : ''}</Typography>
						</Grid>
						<Grid item>
							{Utils.deserializeImagenToBlob(
								Utils.getCookieByName('user_image') !== 'null' ? JSON.parse(Utils.getCookieByName('user_image')) : null,
								PNGavatar
							)}
						</Grid>
						<Grid item>
							<IconButton 
								onClick={handleLogOut}
								style={{
									width: '40px',
									height: '40px',
									color: '#1473e6',
									margin: '0px 15px 0px 7px'
								}} 
							>
								<img src={SVGlogout} />
							</IconButton>
						</Grid>
					</Grid>
				</Grid>
			</AppBar>

			{/* MENÚ LATERAL */}
			<Drawer
				onMouseLeave={() => !fixedMenu ? setOpen(false) : null}
				onMouseOver={() => !fixedMenu ? setOpen(true) : null}
				variant='permanent'
				PaperProps={{ 
					style: { 
						width: defaultStyles.drawerWidth, 
						backgroundColor:'#124680',
						padding:'0px 10px',
						boxSizing:'border-box',
						transition: 'width 0.2s ease-in-out',
						overflow:'hidden'
					} 
				}}
				style={{margin:0, padding:0}}
			>
				<Grid container justifyContent='flex-start' alignItems='center' style={{height: defaultStyles.appBarHeight, overFlow:'hidden', display:'flex', flexWrap:'nowrap'}}>
					<IconButton
						style={{color:'#f5f5f5'}}
						onClick={()=>{
							setFixedMenu(!fixedMenu)
							if(!fixedMenu) setOpen(true)
						}}
					>
						{!open ? <Menu /> : <MenuOpen style={{transform: fixedMenu ? 'rotate(180deg)' : 'none', transition:'transform 0.3s ease-in-out'}} />}
					</IconButton>
					{ open && <img alt='Colonia Suiza' className={classes.logo} src={SVGlogoCompleto} /> }
				</Grid>
				<NavMenu open={open} navLinks={navLinks} />
			</Drawer>

		</>
	)
}

export default Estructura
