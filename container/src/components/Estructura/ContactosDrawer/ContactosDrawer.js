import React from 'react'
//Mui:
import { Box, IconButton } from '@material-ui/core'
//Icons
import SVGcontact from '../../../assets/Otros/Contact.svg'

const ContactosDrawer = () => {
    return (
        <Box style={{position:'relative'}}>
            <IconButton style={{color:'#1473e6'}} onClick={()=>{}}>
                <img src={SVGcontact} />
            </IconButton>
        </Box>
    )
}

export default ContactosDrawer