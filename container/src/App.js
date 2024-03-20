import React from 'react'
//Mui:
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
//Components:
import Inicio from './components/Inicio/Inicio'
//Router
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1473e6'
		},
		secondary: {
			main: '#747474'
		}
	}
})

function App() {

	const history = createBrowserHistory()

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter history={history}>
				<Inicio />
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
