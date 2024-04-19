import React, { useEffect } from 'react'
//Components:
import RutasCallCenter from '../Router/RutasCallCenter'
//Mui:
import { Grid } from '@material-ui/core'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'

const Inicio = ({ usuarioActivo, history, rutas }) => {

	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(actions.setActiveUser(usuarioActivo))
		dispatch(actions.setRutas(rutas))
	},[])

	console.log(rutas)
	console.log(history)
	console.log(usuarioActivo)

	return (
		<Grid container>
			<RutasCallCenter
				usuarioActivo={usuarioActivo}
				history={history}
				rutas={rutas}
			/>
		</Grid>
	)
}

export default Inicio
