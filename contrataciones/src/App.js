import React from 'react'
//Mui:
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
//Components:
import Inicio from './components/Inicio/Inicio'

const theme = createTheme({
	typography: {
		"textAlign": 'left',
	},
	palette: {
		primary: {
			main: '#1473e6',
			secondary:'#4b4b4b',
		},
		secondary: {
			main: '#747474',
		},
	}
})

function App({ usuarioActivo, history, rutasProveedores, rutasCallCenter }) {

	return (
		<ThemeProvider theme={theme}>		
			<Inicio 
				usuarioActivo={usuarioActivo} 
				history={history} 
				rutasProveedores={rutasProveedores}
				rutasCallCenter={rutasCallCenter}
			/>
		</ThemeProvider>
	)
}

export default App
