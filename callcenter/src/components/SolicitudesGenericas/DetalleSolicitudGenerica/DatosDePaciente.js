import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Divider, Drawer, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CustomButton from '../../commons/Button/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions/';
import Utils from '../../../Utils/utils';

export const useStyles = makeStyles((theme) => ({
    closeIcon: {
        padding: 7
    },
    drawerContent: {
        padding: 24,
        maxWidth: 450,
        width: 450,
        height: '100%',
        boxSizing: 'border-box'
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    label: {
        width: 'fit-content',
        marginRight: 12,
        fontSize: 14,
        color: '#747474'
    },
    dataValue: {
        fontSize: 14
    },
    icon: {
        borderRadius: 5,
        backgroundColor: 'white',
        border: '1px solid  #d3d3d3',
        padding: 7
    }
}));

const DatosDePaciente = ({ smallButton = false, denuncia }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const datosPaciente = useSelector(state => state.persona.datosPaciente)
    const loadingDatosPaciente = useSelector(state => state.persona.loadingDatosPaciente)

    //Error Callback:
    const errorCallback = (boolean) => {
        if (boolean) {
            dispatch(actions.setSnackBar({
                message: 'Ocurrió un error al intentar recuperar los datos del paciente.',
                severity: 'error',
                vertical: 'top',
                open: true,
            }))
        }
    }

    //Llamada Api:
    useEffect(() => {
        if (open) {
            let req = {
                nroDoc: denuncia && denuncia.nroDoc,
                tipoDoc: denuncia && denuncia.tipoDoc ? denuncia.tipoDoc : denuncia && denuncia.tipoDocumentoIdTipoDocumento
            }
            dispatch(actions.getDatosPaciente(req, errorCallback))
        }
    }, [open])

    //Close Handler:
    const closeHandler = () => {
        setOpen(false)
        dispatch(actions.clearDatosPaciente())
    }

    return (
        <>
            {
                smallButton
                    ? (
                        <IconButton className={classes.icon} onClick={() => setOpen(true)}>
                            <PersonAddIcon />
                        </IconButton>)
                    : (
                        <CustomButton
                            variant="contained"
                            label="Datos del paciente"
                            styleLabel={{ textTransform: 'none' }}
                            styleButton={{ backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                            onClik={() => setOpen(true)} 
                            disabled={denuncia ? false : true}
                        />
                    )
            }
            <Drawer
                anchor="right"
                open={open}
                onClose={closeHandler}
            >
                <Box display="flex" className={classes.drawerContent} >
                    <Grid container direction="column" justify="space-between" wrap="nowrap">
                        <Grid container item direction="column" spacing={1}>
                            <Grid container item justify="space-between" alignItems="center">
                                <Grid item><Typography variant="h6" className={classes.titulo}>Datos del paciente</Typography></Grid>
                                <Grid item>
                                    <IconButton className={classes.closeIcon} onClick={closeHandler}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item><Divider /></Grid>
                            {loadingDatosPaciente ?
                                <Grid container justify='center' style={{ paddingTop: 50 }}>
                                    <CircularProgress />
                                </Grid>
                                : datosPaciente ?
                                    <Grid container item direction="column" spacing={2} style={{ marginTop: 10 }}>
                                        <Grid item><Typography><b>Datos filiatorios</b></Typography></Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Nombre completo:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.nombre + ' ' + datosPaciente.apellido}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Documento:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.tipoDocumentoDescripcion} {datosPaciente.nroDoc}</Typography></Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Fecha nacimiento:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.fechaNacimiento ? Utils.dateFormat7(datosPaciente.fechaNacimiento) : ' - '}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container wrap="nowrap">
                                            <Grid item><Typography className={classes.label}>Dirección:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.calle + ' '
                                                    + datosPaciente.numero + ' '
                                                    + datosPaciente.piso + ','
                                                    + datosPaciente.localidadNombre + ' ('
                                                    + datosPaciente.localidadProvinciaNombre + ')'
                                                }
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Ascensor:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {typeof datosPaciente.ascensor === 'boolean' ? (datosPaciente.ascensor ? 'Dispone' : 'No dispone') : ' - '}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container wrap="nowrap">
                                            <Grid item><Typography className={classes.label}>Teléfono:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.telefono ? datosPaciente.telefono : ' - '}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Otros Teléfonos:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.telefonoSecundario ? datosPaciente.telefonoSecundario : ' - '}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item container>
                                            <Grid item><Typography className={classes.label}>Email:</Typography></Grid>
                                            <Grid item><Typography className={classes.dataValue}>
                                                {datosPaciente.email ? datosPaciente.email : ' - '}
                                            </Typography></Grid>
                                        </Grid>
                                        <Grid item><Typography><b>Datos médicos</b></Typography></Grid>
                                        <Grid item container>
                                            <Grid item container direction="column" spacing={2} xs={6}>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>Altura:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {datosPaciente.altura ? datosPaciente.altura : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>Peso:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {datosPaciente.peso ? datosPaciente.peso : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>Miembro hábil:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {datosPaciente.miembroHabil ? datosPaciente.miembroHabil : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>Impl. metálicos:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {typeof datosPaciente.implMetalicos === 'boolean' ? (datosPaciente.implMetalicos ? 'SI' : 'NO') : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item container direction="column" spacing={2} xs={6}>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>HTA</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {typeof datosPaciente.hta === 'boolean' ? (datosPaciente.hta ? 'SI' : 'NO') : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>DBT:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {typeof datosPaciente.dbt === 'boolean' ? (datosPaciente.dbt ? 'SI' : 'NO') : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                                <Grid container item>
                                                    <Grid item><Typography className={classes.label}>Claustrofobia:</Typography></Grid>
                                                    <Grid item><Typography className={classes.dataValue}>
                                                        {typeof datosPaciente.claustrofobia === 'boolean' ? (datosPaciente.claustrofobia ? 'SI' : 'NO') : ' - '}
                                                    </Typography></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    : null
                            }
                        </Grid>
                        <Grid item>
                            <Box display="flex" justifyContent="flex-end" mb={3}>
                                <CustomButton
                                    variant="contained"
                                    styleLabel={{ color: '#ffffff' }}
                                    styleButton={{ borderRadius: 20, border: '2px solid #1473e6', backgroundColor: '#1473e6' }}
                                    label="Cerrar"
                                    onClik={closeHandler} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </>
    );
};

export default DatosDePaciente;
