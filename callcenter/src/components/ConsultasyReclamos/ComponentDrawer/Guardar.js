import React from 'react'
import { Divider, Grid } from '@material-ui/core';
import CustomTypography from '../../commons/Typography/CustomTypography';

const GuardarNuevoContacto = (props) => {
    const { nuevoReclamo } = props

    return (
        <Grid container
            spacing = {2}
            direction = 'column'
            justify = 'center'
            style = {{ width: '400px', height: '200px', backgroundColor: '#f5f5f5' }}
            alignItems = 'center' >
            
            <Grid item container spacing={2} alignItems='center' justify='center'>
                <Grid item xs={10}>
                    <CustomTypography
                        text = {<strong> Consulta generada </strong>}
                        variant = {'subtitle1'} />
                </Grid>
                <Grid item xs={10}>
                    <Divider />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography
                        text = {<div> La consulta <strong>#{nuevoReclamo}</strong> ha sido generada correctamente</div>}
                        variant = {'subtitle2'} />
                </Grid>
            </Grid>
        </Grid>
    )
}
GuardarNuevoContacto.propTypes = {


};
export default GuardarNuevoContacto