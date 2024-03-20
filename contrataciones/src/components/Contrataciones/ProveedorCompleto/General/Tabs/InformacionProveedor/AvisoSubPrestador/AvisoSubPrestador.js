import React from 'react'
import { Grid } from '@material-ui/core'
import CustomTypography from '../../../../../../commons/Typography/CustomTypography'
import InfoIcon from '@material-ui/icons/Info';
import { AVISO_SOLAPA_SUBPRESTADOR } from '../../../../../../../Utils/const'
const AvisoSubPrestador = (props) => {
    return (
        <Grid container xs={12}  spacing={2} style={{border:'2px solid #5151d3', backgroundColor:'rgba(47, 97, 213, 0.1)'}}>
            <Grid item container xs={2}  >
                <InfoIcon htmlColor='#5151d3'/>
            </Grid>
            <Grid item xs={10} container >
                <Grid item xs={12}>
                    <CustomTypography
                        text={AVISO_SOLAPA_SUBPRESTADOR} 
                        variant='body2' color='#5151d3' />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default AvisoSubPrestador