import React from 'react'
//Mui:
import { IconButton } from '@material-ui/core/'
import { Search } from '@material-ui/icons/'


const IconSearch = ({ cabeceraIcon, flotanteIcon, usuarioActivo }) => {
    
    return (
        <>
            {cabeceraIcon && 
                <IconButton 
                    style={{ 
                        backgroundColor: '#1473e6' 
                    }} 
                    variant='contained'
                    color='primary'
                    aria-label='search'
                    size='medium' 
                >
                    <Search size='small' htmlColor='white' />
                </IconButton>
            }
        </>
    )
}

export default IconSearch