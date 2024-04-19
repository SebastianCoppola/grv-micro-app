import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
//estilo
import { makeStyles } from '@material-ui/core/styles';
import CustomTypography from '../../commons/Typography/CustomTypography';

const useStyles = makeStyles({
    contenedor: {
        border: '2px solid #dadce0',
        padding: '25px'
    }
})

const CustomAviso = (props) => {
    const classes = useStyles(props);
    const { titulo, contenido, children } = props

    return (
        <Grid container alignItems='center' spacing={2} className={classes.contenedor}>
            <Grid item xs={12}>
                <CustomTypography
                    variant={'subtitle1'}
                    fontweight={'600'}
                    text={<strong>{titulo}</strong>} />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    variant='subtitle2'
                    text={contenido} />
            </Grid>
            <Grid item container justify='flex-end'>
                {children}
            </Grid>
        </Grid>
    )
}
CustomAviso.propTypes = {
    titulo: PropTypes.string,
    contenido: PropTypes.any,
    children: PropTypes.any
};
export default CustomAviso