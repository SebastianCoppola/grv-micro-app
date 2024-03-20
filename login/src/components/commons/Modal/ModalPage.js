import React, { Fragment } from "react"
import {
    Grid, Dialog, DialogActions, Divider, DialogContent, DialogTitle,
    DialogContentText, Backdrop, CircularProgress, createTheme
} from "@mui/material"

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
const theme = createTheme({
    spacing: 4,
});
const ModalPage = (props) => {
    const { divisor } = props
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
                    <DialogTitle sx={props.styleTitle ? { padding: '15px 24px 5px 24px' } : null} id="max-width-dialog-title">
                        {props.title}
                    </DialogTitle>
                    : null
                }
                {divisor ?
                    <Grid container alignItems='center' justify='center'>
                        <Grid item xs={11}>
                            <Divider />
                        </Grid>
                    </Grid>
                    : null
                }
                <DialogContent sx={props.backgroundColor ? {
                    padding: theme.spacing(2),
                    backgroundColor: "#f7f7f7"
                } : {
                    backgroundColor: "#fffff",
                    minWidth: 120,
                }}>
                    <Backdrop open={props.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Grid container style={props.noBodyPadding ? null : { paddingLeft: '16px' }} justify={divisor ? "flex-start" : "center"}>
                        {props.subtitle ? <DialogContentText sx={{ color: "rgba(0, 0, 0, 0.54)" }}> {props.subtitle} </DialogContentText> : null}
                    </Grid>
                    <Grid container justify="center">
                        {props.body}
                    </Grid>
                </DialogContent>
                {props.actions ? <DialogActions sx={props.backgroundColor ? {
                    padding: theme.spacing(2),
                    backgroundColor: "#f7f7f7"
                } : {
                    backgroundColor: "#fffff",
                    minWidth: 120,
                }}>
                    <Grid container justify={props.buttonsCentered ? "center" : "flex-end"} alignItems="flex-end" spacing={2} >
                        {props.actions.map((el, i) => (
                            <Grid key={i} item>
                                {el}
                            </Grid>
                        ))}
                    </Grid>
                </DialogActions> : null}
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
    loading: PropTypes.bool,
    divisor: PropTypes.bool
};