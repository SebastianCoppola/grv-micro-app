import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    contenedor : {
        width: '400px',
        margin: '15.9px 1px 17px 0',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderLeft:'3px solid #1473e6'
    },
    card:{
        padding:'5px 0px'
    }
})

const CustomCardBuscador = (props) => {
    const classes = useStyles(props);
    const { children } = props

    return(
        <Grid item container className={classes.contenedor} >
            {children}
        </Grid>
    )
}
export default CustomCardBuscador