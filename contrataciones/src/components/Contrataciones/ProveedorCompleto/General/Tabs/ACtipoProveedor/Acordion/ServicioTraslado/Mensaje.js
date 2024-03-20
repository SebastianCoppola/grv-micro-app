import React from 'react'
import { Grid } from '@material-ui/core'
import CustomTypography from '../../../../../../../commons/Typography/CustomTypography'

const Mensaje = (props) => {
    const { textoMensaje } = props
    return(
        <Grid container style={{backgroundColor:'#f5f5f5'}}>
            <Grid item xs={12} style={{padding:'20px', textAlign:'initial'}}>
                <CustomTypography
                    text= {textoMensaje}
                    color= '#e34850'
                    variant='body2'/>
            </Grid>
        </Grid>
    )
}
export default Mensaje