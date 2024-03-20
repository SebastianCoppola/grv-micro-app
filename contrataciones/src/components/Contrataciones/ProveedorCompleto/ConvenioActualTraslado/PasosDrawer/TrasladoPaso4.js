import React from 'react'
//Utils_
import { AGREGADO_CON_EXITO, AGREGAR_OTRO_CONVENIO, CONVENIO_TRASLADO_AGREGADO_CON_EXITO, 
    VARIANT_BUTTON } from '../../../../../Utils/const'
//Mui:
import { Box, Divider, Grid, Typography } from '@material-ui/core'
//Assets:
import Check from "../../../../../commons/assets/Contrataciones/ConvenioTraslado/Check.svg"
import CustomButton from '../../../../commons/Button/CustomButton'

const TrasladoPaso4 = ({ agregarOtroConvenio }) => {
  
    return (
        <Box style={{width: 500, padding:'25px 30px', margin:'auto', border:'1px solid #dadce0', borderRadius:8}}>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12} container>
                    <img src={Check} style={{marginTop:2}}/>
                    <Typography variant="h6" style={{fontWeight: 700, marginLeft: 10}}>
                        {AGREGADO_CON_EXITO}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {CONVENIO_TRASLADO_AGREGADO_CON_EXITO}
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='flex-end' spacing={2} style={{marginTop:15}}>
                    <Grid item>
                        <CustomButton 
                            variant={VARIANT_BUTTON.OUTLINED}
                            label={AGREGAR_OTRO_CONVENIO}
                            onClik={agregarOtroConvenio}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TrasladoPaso4
