import React from 'react';
import { Box, Divider, Drawer, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CustomButton from '../../commons/Button/CustomButton';

//estilo para todas las acciones: rechazar, derivar, asignar
export const useAccionStyles = makeStyles((theme) => ({
    closeIcon: {
        padding: 7
    },
    drawerContent: {
        padding: '16px 24px',
        maxWidth: 450,
        width: 450,
        flexGrow: 1,
        boxSizing: 'border-box'
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    formControl: {
        width: '100%',
        '& p,label': {
            color: '#747474'
        }
    },
    label: {
        fontSize: 14,
        color: '#747474',
        marginRight: 5
    }
}));


export const botonConfirmacionConfigFn = (enabled, label, color, onClickHandler) => ({
    label,
    buttonStyles: enabled
        ? { border: `2px solid ${color}`, backgroundColor: color }
        : null,
    labelStyles: enabled ? { color: 'white' } : null,
    enabled,
    onClickHandler
});

const Accion = ({ children, titulo, open, closeHandler, botonConfirmacionConfig }) => {
    const classes = useAccionStyles();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={closeHandler}>
            <Box display="flex" className={classes.drawerContent} >
                <Grid container direction="column" justify="space-between" >
                    <Grid container item direction="column" spacing={1}>
                        <Grid container item justify="space-between" alignItems="center">
                            <Grid item><Typography variant="h1" className={classes.titulo}>{titulo}</Typography></Grid>
                            <Grid item>
                                <IconButton className={classes.closeIcon} onClick={closeHandler}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item><Divider /></Grid>
                        <Grid item>
                            <Box mt={2}>{children}</Box>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="flex-end">
                            <CustomButton
                                label="Cancelar"
                                styleButton={{ border: '1px solid #747474', borderRadius: 20, marginRight: 10 }}
                                styleLabel={{ color: '#747474' }}
                                onClik={closeHandler}
                            />
                            <CustomButton
                                label={botonConfirmacionConfig.label}
                                styleButton={{
                                    borderRadius: 20,
                                    backgroundColor: '#f4f4f4',
                                    ...botonConfirmacionConfig.buttonStyles
                                }}
                                styleLabel={{
                                    ...botonConfirmacionConfig.labelStyles
                                }}
                                disabled={!botonConfirmacionConfig.enabled}
                                onClik={botonConfirmacionConfig.onClickHandler} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default Accion;
