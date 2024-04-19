import React from 'react'
//Mui:
import { IconButton, Avatar, Box } from '@material-ui/core'
import { NotificationsNoneOutlined } from '@material-ui/icons/'

const NotificacionesDrawer = () => {

    return (
        <Box style={{position:'relative'}}>
            <IconButton style={{color:'#1473e6'}} onClick={()=>{}}>
                <NotificationsNoneOutlined />
                <Avatar style={{
                    width: '17px',
                    height: '17px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    border: 'solid 1px rgba(0, 0, 0, 0)',
                    backgroundColor: '#f29423',
                    fontSize: '11px',
                }}>
                    5
                </Avatar>
            </IconButton>
        </Box>
    )
}

export default NotificacionesDrawer

