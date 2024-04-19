import React from 'react'
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
    root: {
        color: props =>  props.estado === 'Activo' ? '#2dc76d' 
                        : props.estado==='Vencido' ? '#959595'
                        : '#e34850',
        fontWeight:'normal'
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    }
}));


const EstadoTabla = (props) => {
    const classes = useStyles(props);
    const { estado, demora } = props
    return(
        <div>
            <Grid container >
                <Grid item xs={12} className={classes.root}>
                   {estado}
                </Grid>
                <Grid item xs={12}>
                    {demora}
                </Grid>
            </Grid>
        </div>
    )
}
EstadoTabla.propTypes = {
    estado: PropTypes.any,
   demora: PropTypes.any,
    
};
export default EstadoTabla