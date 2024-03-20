import React, { lazy, useState, useEffect } from 'react'
//Utils:
import Utils from '../../utils/utils'
import { MODULO_AUDITORIA_MEDICA, MODULO_CEM, MODULO_CONTRATACIONES } from '../../utils/const'
//JWT:
import jwt_decode from "jwt-decode"
//Components:
import CustomLoading from '../Commons/CustomLoading'
import ContratacionesApp from '../MicroApps/ContratacionesApp'
import LoginApp from '../MicroApps/LoginApp'


const Inicio = () => {

	const [loading, setLoading] = useState(true)
	
	const [usuarioActivo, setUsuarioActivo] = useState({
		id: '',
		nombre: '',
		apellido: '',
		roles: '',
		isOperador: false,
		apps: [],
		area: []
	})

	//Compruebo si existe cookie del login:
	useEffect(() => {
		searchExistingToken()
	}, [])

	//Busca token existente en cookies:
	const searchExistingToken = async () => {
		let cookie = Utils.getCookieByName('datos_usuario')
		if(cookie){
			let jsonCookie = await JSON.parse(cookie)
			let decodedToken = await jwt_decode(jsonCookie.token)
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				Utils.deleteCookieByName("datos_usuario")
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
		}
		setLoading(false)
	}

	//Devuelve la app para el usuario logueado: 
	const handleShowUserApp = (app) => {
		switch(app){
			case MODULO_CEM: 
				return <div> CALL CENTER APP </div>
			case MODULO_CONTRATACIONES:
				return <ContratacionesApp usuarioActivo={usuarioActivo}/>
			case MODULO_AUDITORIA_MEDICA:
				return <div> AUDITORIA MEDICA APP </div>
			default:
				return <LoginApp />
		}
	}

	return (
		<div>
			{ loading ? 
				<CustomLoading loading={true} />
			: usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 ?
				handleShowUserApp(usuarioActivo.apps[0])
			: 
				<LoginApp />
			}
		</div>
	)
}

export default Inicio
