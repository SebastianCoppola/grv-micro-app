import React from 'react'
//Utils:
import { COLOR, CONFIRMAR, CONVENIO_DE_TRASLADO, DESEA_CONFIRMAR_CONVENIO_DE_TRASLADO, 
    VARIANT_BUTTON, VOLVER } from '../../../../../Utils/const'
//Mui:
import { Box, Divider, Grid, Typography } from '@material-ui/core'
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'


const TrasladoPaso3 = ({ request, setDrawer }) => {
        
    const handleGuardar = () => {
        let callBack = (bool) => {
            if(bool) {
                setDrawer(prev => ({...prev, stepper: prev.stepper+1}))
            }
        }
        console.log('NEW CONVENIO: ', request)
        callBack(true)
    }

    return (
        <Box style={{width: 500, padding:'25px 30px', margin:'auto', border:'1px solid #dadce0', borderRadius:8}}>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight:700}}>
                        {CONVENIO_DE_TRASLADO}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {DESEA_CONFIRMAR_CONVENIO_DE_TRASLADO}
                    </Typography>
                </Grid>
                <Grid item xs={12} container justify='flex-end' spacing={2} style={{marginTop:15}}>
                    <Grid item>
                        <CustomButton 
                            variant={VARIANT_BUTTON.OUTLINED}
                            label={VOLVER}
                            onClik={()=>setDrawer(prev => ({...prev, stepper: prev.stepper-1}))}
                        />
                        <CustomButton 
                            variant={VARIANT_BUTTON.CONTAINED}
                            color={COLOR.PRIMARY}
                            label={CONFIRMAR}
                            styleButton={{marginLeft:5}}
                            onClik={handleGuardar}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default TrasladoPaso3
