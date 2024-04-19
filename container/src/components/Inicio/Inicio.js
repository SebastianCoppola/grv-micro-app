import React, { lazy, Suspense, useState, useEffect } from 'react'
//Utils:
import Utils from '../../utils/utils'
import { MODULO_AUDITORIA_MEDICA, MODULO_CEM, MODULO_CONTRATACIONES } from '../../utils/const'
//JWT:
import jwt_decode from "jwt-decode"
//Components:
import CustomLoading from '../Commons/Loading/CustomLoading'
import Estructura from '../Estructura/Estructura'
//Rutas:
import { rutasAuditoriaMedica, rutasCallCenter, rutasProveedores } from '../../utils/rutas'
//Mui:
import { Grid } from '@material-ui/core'
//Apps:
const LoginApp = lazy( () => import('../MicroApps/LoginApp') )
const CallCenterApp = lazy( () => import('../MicroApps/CallCenterApp') )
const ContratacionesApp = lazy( () => import('../MicroApps/ContratacionesApp') )

const Inicio = () => {

	const [loading, setLoading] = useState(true)
	const [openDrawer, setOpenDrawer] = useState(false)
	
	const [usuarioActivo, setUsuarioActivo] = useState({
		id: '',
		nombre: '',
		apellido: '',
		roles: [],
		isOperador: false,
		apps: [],
		area: []
	})

	const defaultStyles = {
		appBarHeight: '56px',
		drawerWidthClosed: '70px',
		drawerWidthOpened: '280px',
		drawerWidth: openDrawer ? '280px' : '70px',
	}

	//Compruebo si existe cookie del login:
	useEffect(() => {
		searchExistingToken()
	}, [])

	//Loading false cuando se define el usuario:
	useEffect(() => {
		if(usuarioActivo.id) setLoading(false)
	}, [usuarioActivo])

	//Busca token existente en cookies:
	const searchExistingToken = async () => {
		//let cookie = Utils.getCookieByName("datos_usuario")
		let cookie = document.cookie.split('; ').find(row => row.startsWith('datos_usuario='))?.split('=')[1]
		if(cookie){
			let jsonCookie = await JSON.parse(cookie)
			let decodedToken = await jwt_decode(jsonCookie.token)
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				Utils.deleteCookieByName('datos_usuario')
				Utils.deleteCookieByName('user_image')
				window.location.href = 'http://localhost:8070/'
			} else {
				setUsuarioActivo({
					id: decodedToken.idpersona ?? '',
					nombre: decodedToken.given_name ?? '',
					apellido: decodedToken.family_name ?? '',
					roles: decodedToken.realm_access.roles ?? '',
					isOperador: decodedToken.realm_access.roles[0] === "Operador" ? true : false,
					apps: decodedToken.apps ?? '',
					area: decodedToken.area[0] ?? ''
				})
			}
		}else{
			setLoading(false)
		}
	}

	//Devuelve la app para el usuario logueado: 
	const handleShowUserApp = (app) => {
		switch(app){
			case MODULO_CEM: 
				return <CallCenterApp usuarioActivo={usuarioActivo} rutas={rutasCallCenter}/>
			case MODULO_CONTRATACIONES: 
				return <ContratacionesApp usuarioActivo={usuarioActivo} rutas={{rutasProveedores, rutasCallCenter}}/>
			case MODULO_AUDITORIA_MEDICA:
				return <div>AUDITORIA MEDICA APP</div>
			default:
				return <LoginApp />
		}
	}

	//Devuelve la app para el usuario logueado: 
	const handleSelectUserRoutes = (app) => {
		switch(app){
			case MODULO_CEM: 
				return rutasCallCenter
			case MODULO_CONTRATACIONES: 
				return rutasProveedores
			case MODULO_AUDITORIA_MEDICA:
				return rutasAuditoriaMedica
			default:
				return null
		}
	}

	return (
		<Grid style={{maxHeight:'100vh'}}>
			{ loading ? 
				<CustomLoading loading={true} />
			: usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 ?
				<Suspense fallback={<CustomLoading loading={true} />}>
					<Estructura 
						usuario={usuarioActivo} 
						navLinks={handleSelectUserRoutes(usuarioActivo.apps[0])}
						defaultStyles={defaultStyles}
						open={openDrawer}
						setOpen={setOpenDrawer}
					/>
					<Grid
						style={{
							marginLeft: openDrawer ? defaultStyles.drawerWidthOpened : defaultStyles.drawerWidthClosed,
							marginTop: defaultStyles.appBarHeight,
							transition: 'margin 0.2s ease-in-out',
							padding:'20px',
							overflowX:'hidden',
							maxHeight:'100%',
							overflowY:'auto',
							scrollbarWidth: 'thin',
							// '&::-webkit-scrollbar': {width: '0.4em'},
							// '&::-webkit-scrollbar-track': {background: "#f1f1f1"},
							// '&::-webkit-scrollbar-thumb': {backgroundColor: '#888'},
							// '&::-webkit-scrollbar-thumb:hover': {background: '#555'},
						}}
					>
						{ handleShowUserApp(usuarioActivo.apps[0]) }
					</Grid>					
				</Suspense>
			: 
				<Suspense fallback={<CustomLoading loading={true} />}>
					<LoginApp />
				</Suspense>
			}
		</Grid>
	)
}

export default Inicio
