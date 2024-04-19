import React from "react";
import CustomButton from '../../../commons/Button/CustomButton';
import IconoSiniestro from '../../../../commons/assets/iconoSiniestroMultiple/iconoSiniestro.png'
import { Grid } from "@material-ui/core";

const BotonVincular = (props) => {
    const { textoButtonSiniestroMultiple, onClickSiniestroMultiple, disableEdition } = props

    return (
        <Grid item xs={3}>
            <CustomButton
                label={textoButtonSiniestroMultiple}
                variant={'outlined'}
                width='200px'
                height='30px'
                size='small'
                styleButton={{backgroundColor:'white'}}
                onClik={onClickSiniestroMultiple}
                startIcon={<img src={IconoSiniestro} />} 
                disabled={disableEdition}
            />
        </Grid>
    )
}
export default BotonVincular