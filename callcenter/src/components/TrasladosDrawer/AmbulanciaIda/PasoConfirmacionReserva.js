import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
//estilo
import { makeStyles } from '@material-ui/core/styles';
//compontentes 
import CustomTypography from '../../commons/Typography/CustomTypography';

const useStyles = makeStyles({
    contenedor: {
        border: '2px solid #dadce0',
        padding: '25px'
    }
})

const PasoConfirmacionReserva = (props) => {
    const classes = useStyles(props);
    const { sectorTraslado, soloCarga } = props
    const nuevoReclamo = 'B2B36784'

    return (
        <Grid container alignItems='center' spacing={2} className={classes.contenedor}>
            <Grid item xs={12}>
                <CustomTypography
                    variant={'subtitle1'}
                    fontweight={'600'}
                    text={<strong>Traslado</strong>} />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {sectorTraslado ?
                <Grid item xs={12}>
                    <CustomTypography
                        variant='subtitle2'
                        text={'¿Está seguro que desea realizar la solicitud al Sector Traslados?'} />
                </Grid>
                :
                <Grid item xs={12}>
                    <CustomTypography
                        variant='subtitle2'
                        text={soloCarga ? '¿Está seguro que desea guardar el traslado?' : '¿Está seguro que desea realizar la reserva?'} />
                </Grid>}
        </Grid>
    )
}
PasoConfirmacionReserva.propTypes = {
    sectorTraslado: PropTypes.any

};
export default PasoConfirmacionReserva