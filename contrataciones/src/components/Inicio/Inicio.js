import React, { useEffect } from 'react'
//Components:
import RutasProveedores from '../Router/RutasProveedores'
//Mui:
import { Grid } from '@material-ui/core'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'

const Inicio = ({ usuarioActivo, history, rutasProveedores, rutasCallCenter }) => {

	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(actions.setUsuarioActivo(usuarioActivo))
		dispatch(actions.setRutas(rutasProveedores))
		dispatch(actions.setRutasCallCenter(rutasCallCenter))
	},[])

	return (
		<Grid container>
			<RutasProveedores history={history}/>
		</Grid>
	)
}

export default Inicio
