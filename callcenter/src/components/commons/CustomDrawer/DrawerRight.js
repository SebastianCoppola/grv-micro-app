import React from 'react'
import { Drawer, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'

/*
* Recibe un array con el contenido. Si cuenta con más de un contenido, 
* se deberá pasarle el index del array a mostrar en la prop "stepper".
* Recibe un array con los botones.
*
*/
const DrawerRight = (props) => {

    const { openDrawer, closeDrawer, contenido, stepper, botones, title, width, sharedContent } = props
        
    return (
        <Drawer anchor='right' open={openDrawer} onClose={closeDrawer}>
            
            <Grid style={{width: width, maxWidth: width, padding:'10px 20px', height:'100vh'}} container alignItems='flex-start'>

                <Grid item xs={12} container alignItems='center' justify='space-between' tyle={{height:'10vh'}}>
                    <Typography style={{fontSize:'17px', fontWeight:600}}>
                        {title}
                    </Typography>

                    <IconButton onClick={closeDrawer}>
                        <Close />
                    </IconButton>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{height:'90vh', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                    <Grid item style={{margin:'0px 0px 10px 0px'}}>
                        {sharedContent !== null && sharedContent !== undefined  && sharedContent}
                        {contenido && contenido.length > 0 ? contenido[stepper ?? 0] : null}
                    </Grid>
                    <Grid item style={{margin:'10px 0px 0px 0px'}}>
                        {botones && botones.length > 0 ? botones : null}
                    </Grid>
                </Grid>

            </Grid>
            
        </Drawer>
    )
}

export default DrawerRight