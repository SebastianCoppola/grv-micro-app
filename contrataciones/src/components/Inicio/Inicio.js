import React, { useState, Fragment } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Material:
import { makeStyles } from '@material-ui/core/styles'
//Components:
import Estructura from '../Estructura/Estructura'
import RutasProveedores from '../Router/RutasProveedores'

const useStyles = makeStyles((theme) => ({
	root: {
		display: (props) => (props.openMenu ? 'flex' : 'block'),
	},
	content: {
		marginLeft: (props) =>
			props.openMenu || props.miniMenu ? '0px' : theme.spacing(9) + 4,
		flexGrow: 1,
		padding: theme.spacing(2),
		alignItems: 'center',
		justifyContent: 'center',
	},
	toolbar: {
		height: '56px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const Inicio = ({ usuarioActivo, history }) => {

	const classes = useStyles()

	const campanaNotificaciones = useSelector(state => state.contactos.campanaNotificaciones)

	const [openMenu, setOpenMenu] = useState(false)
	const [miniMenu, setMiniMenu] = useState(false)
	const [navegacion, setNavegacion] = useState(false)
	const [tituloHeader, setTituloHeader] = useState('Sistema de Administracion de Siniestros')
	const [openBuscador, setOpenBuscador] = useState(true)

	//Función para navegar por la APP:
	const handleRouter = (url) => {
		history.push({pathname: url})
	}

	return (
		<div className={classes.root}>
			<Fragment>
				<Estructura
					usuario={usuarioActivo}
					handleRouter={handleRouter}
					setOpenMenu={setOpenMenu}
					openMenu={openMenu}
					miniMenu={miniMenu}
					navegacion={navegacion}
					tituloHeader={tituloHeader}
					campanaNotificaciones={campanaNotificaciones}
					setOpenBuscador={setOpenBuscador}
					history={history}
				/>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<RutasProveedores
						history={history}
						setMiniMenu={setMiniMenu}
						setNavegacion={setNavegacion}
						setTituloHeader={setTituloHeader}
						usuarioActivo={usuarioActivo}
						openMenu={openMenu}
					/>
				</main>
			</Fragment>
		</div>
	)
}

export default Inicio
