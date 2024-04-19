import React from 'react'
//Mui:
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
//Compoenents:
import Login from './components/login/Login'
//Cookie:
import { CookiesProvider } from 'react-cookie'
//Router:
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const theme = createTheme({
    typography: {
        "textAlign": 'left',
    },
    palette: {
        primary: {
            main: '#1473e6',
            secondary: '#4b4b4b',
        },
        secondary: {
            main: '#747474',
        },
    }
})

const App = () => {

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Navigate to='/login' replace />}/>
            <Route path='/*' element={<Navigate to='/login' replace />}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </CookiesProvider>
  )
}

export default App
