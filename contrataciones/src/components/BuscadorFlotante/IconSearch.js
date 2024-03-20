import React, { useEffect, useState } from 'react'
//Mui:
import { makeStyles, IconButton, Fab } from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'
//Components:
import ModalImprimir from '../commons/Modal/ModalImprimir'
import BuscadorFlotante from './BuscadorFlotante'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1300,
    }
}));

const IconSearch = props => {
    
    const { cabeceraIcon, flotanteIcon, usuarioActivo } = props
    
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const [openBuscador, setOpenBuscador] = useState(false)
    

    const handleClose = () => {
        setOpenBuscador(false)
    }

    const openSearch = () => {
        setOpenBuscador(true)
    }

    useEffect(()=>{
        if(openBuscador){
            dispatch(actions.getListadoProvinciaSelect())
            dispatch(actions.getListadoEstadoSelect())
        }
    },[openBuscador])
    
   
    return (
        <>
            {cabeceraIcon && 
                <IconButton 
                    style={{ backgroundColor: '#1473e6' }} 
                    className={classes.prueba} 
                    onClick={openSearch} 
                    variant="contained" 
                    color="primary" 
                    aria-label="search" 
                    size='medium' >
                        <SearchIcon size='small' htmlColor='white' />
                </IconButton>
            }
            {flotanteIcon &&
                <div style={{ position: "fixed", top: "15%", left: 100 }} className={classes.backdrop}>
                    <Fab 
                        color="primary" 
                        style={openBuscador ? { display: 'none' } : null} 
                        aria-label="search" 
                        onClick={openSearch} 
                        size='medium' 
                    >
                            <SearchIcon />
                    </Fab>
                </div>
            }
            <ModalImprimir openModal={openBuscador} maxWidth='xl' fullScreen={false}>
                <BuscadorFlotante handleClose={handleClose} usuarioActivo={usuarioActivo} />
            </ModalImprimir>
        </>
    )
}

export default IconSearch