import { Grid, Typography } from '@material-ui/core'
import React from 'react'

const DrawerStopNBU = () => {
    return (
        <Grid xs={12} style={{padding: '40px 0'}}>
            <Typography style={{fontSize:'13px'}}>
                Ya no estarán las prestaciones NBU en este convenio.
            </Typography>
            <Typography style={{fontSize:'13px', marginTop:'10px'}}>
                ¿Desea confirmar la baja del NBU?
            </Typography>
        </Grid>
    )
}

export default DrawerStopNBU