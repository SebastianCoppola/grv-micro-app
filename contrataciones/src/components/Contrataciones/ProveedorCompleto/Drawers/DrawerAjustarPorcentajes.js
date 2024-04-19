import React, { useState } from 'react';
import PercentageSheetIcon from '../../../../commons/assets/Contrataciones/ConvenioTraslado/file-percent-outline.svg';
import { Box, Drawer, Grid, IconButton, Typography, makeStyles } from '@material-ui/core';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomButton from '../../../commons/Button/CustomButton';

const useStyles = makeStyles((theme) => ({
    iconBnt: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        color: '#5e5e5d',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    drawerTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    drawerContent: {
        padding: '16px 24px',
        maxWidth: 450,
        width: 450,
        flexGrow: 1,
        boxSizing: 'border-box'
    },
    cabecera: {
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '10px 20px',
    },
    text: {
        fontSize: '14px',
        color: '#4b4b4b',
        margin: '10px 0 10px 0'
    },
}))

const DrawerAjustarPorcentajes = props => {

    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
            {/* BUTTON DRAWER */}
            <CustomButton
                label='Ajustar valores por porcentaje'
                startIcon={< img src={PercentageSheetIcon}/>}
                onClik={() => setOpenDrawer(true)}
                variant='outlined'
                styleLabel={{ fontSize: '12px' }}
                styleButton={{ padding: '3px 10px' }}
                
            />

            {/* DRAWER AJUSTAR PORCENTAJES */}
            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box display="flex" className={classes.drawerContent} >
                    <Grid container direction="column" justify="space-between" >
                        <Grid container item direction="column" spacing={1}>
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h1" className={classes.drawerTitle}>
                                        Ajustar Precio
                                    </Typography>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item mt={5}>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <CustomButton
                                    label={'Cerrar'}
                                    styleButton={{ borderRadius: 20, height: '35px', padding: '0 15px' }}
                                    color='primary'
                                    variant="contained"
                                    onClik={() => setOpenDrawer(false)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    )
}

export default DrawerAjustarPorcentajes