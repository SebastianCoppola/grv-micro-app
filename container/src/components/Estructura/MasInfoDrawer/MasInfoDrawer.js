import React from 'react'
//Mui:
import { Avatar, Box, IconButton } from '@material-ui/core'
//Icons:
import MasInfoNotificacionesIcon from '../../../assets/Otros/masInfoNotificacionesIcon.svg'

const MasInfoDrawer = () => {
    return (
        <Box style={{position:'relative'}}>
            <IconButton onClick={()=>{}}>
                <img src={MasInfoNotificacionesIcon} />
                <Avatar style={{
                    width: 17,
                    height: 17,
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: '#f29423',
                    fontSize: 11
                }}>3</Avatar>
            </IconButton>
        </Box>
    )
}

export default MasInfoDrawer