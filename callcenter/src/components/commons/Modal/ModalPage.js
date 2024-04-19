import React, { Fragment } from "react"
import { Grid, Dialog, DialogActions,Divider, DialogContent, DialogTitle, DialogContentText, Backdrop, CircularProgress } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
/*ICONS*/

import PropTypes from 'prop-types';
/**
 * 
 * Modal Genérico: 
 * fullWidth: sirve para indicar si el modal debe ser del tamaño de la pantalla
 * maxWidth: sirve para indicar que el modal tiene un tamaño máximo. 
 * body: contenido del Modal
 * actions: actiones que puede contener el modal (como cancelar/aceptar)
 * open: abrir o no el modal
 */
const useStyles = makeStyles((theme) => ({
    container: {
        //padding: theme.spacing(2),
        backgroundColor: "#fffff",
        minWidth: 120,
    },
    container1: {
        padding: theme.spacing(2),
        backgroundColor: "#f7f7f7"
    },
    subtitle: {
        color: "rgba(0, 0, 0, 0.54)"
    },
    title:{
        padding:'15px 24px 5px 24px'
    }
}));
const ModalPage = (props) => {
    const classes = useStyles();
    const {divisor} = props
    return (
        <Fragment>
            <Dialog
                aria-labelledby="max-width-dialog-title"
                fullWidth={props.fullWidth} 
                scroll='paper' 
                open={props.open} 
                maxWidth={props.maxWidth} 
                
            >
                {props.title ? 
                    <DialogTitle className={props.styleTitle ? classes.title : null} id="max-width-dialog-title">
                        {props.title}
                    </DialogTitle> 
                    : null
                }
                {divisor ? 
                    <Grid container alignItems='center' justify='center'>
                        <Grid item xs={11}> 
                            <Divider/>
                        </Grid>
                    </Grid>
                    : null
                }
                <DialogContent className={props.backgroundColor ? classes.container1 : classes.container}>
                    <Backdrop open={props.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Grid container style={props.noBodyPadding ? null : {paddingLeft:'16px'}}  justify= {divisor ? "flex-start": "center"}>
                        {props.subtitle ? <DialogContentText className={classes.subtitle}> {props.subtitle} </DialogContentText> : null}
                    </Grid>
                    <Grid container  justify="center">
                        {props.body}
                    </Grid>
                </DialogContent>
                <DialogActions className={props.backgroundColor ? classes.container1 : classes.container}>
                    <Grid container justify={props.buttonsCentered ? "center" : "flex-end"} alignItems="flex-end" spacing={2} >
                        {props.actions.map((el, i) => (
                            <Grid key={i} item>
                                {el}
                            </Grid>
                        ))}
                    </Grid>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}
export default ModalPage;
ModalPage.propTypes = {
    body: PropTypes.any,
    actions: PropTypes.any,
    open: PropTypes.bool,
    fullWidth: PropTypes.bool,
    maxWidth: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    backgroundColor: PropTypes.bool,
    loading : PropTypes.bool,
    divisor:PropTypes.bool
};