import React from 'react'
import { Grid } from '@material-ui/core'
import CustomTypography from '../../../../../../commons/Typography/CustomTypography'
import InfoIcon from '@material-ui/icons/Info';
import { AVISO_SOLAPA_TRASLADO } from '../../../../../../../Utils/const';

const AvisoTraslado = (props) => {
    return (
        <Grid container xs={12}  spacing={2}>
            <Grid item container xs={2}  >
                <InfoIcon htmlColor='#5151d3'/>
            </Grid>
            <Grid item xs={10} container >
                <Grid item xs={12}>
                    <CustomTypography
                        text={AVISO_SOLAPA_TRASLADO} 
                        variant='body2' color='#5151d3' 
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default AvisoTraslado