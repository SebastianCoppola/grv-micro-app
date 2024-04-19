import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTodasSG, searchSolicitudesGenericas, searchTodasSG, clearBusquedaSGRetorno } from '../../../redux/actions/index'
import { Box, Dialog, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CustomButton from '../../commons/Button/CustomButton';
import { ReactComponent as RestoreIcon } from '../../../commons/assets/IconsSolicitudesGenericas/restoreIcon.svg';
import CabeceraFiltrosSG from './CabeceraFiltrosSG';
import TablaSolicitudesGenericas from '../TablaSolicitudesGenericas/TablaSolicitudesGenericas';
import Utils from '../../../Utils/utils';

const useStyles = makeStyles((theme) => ({
    drawerContent: {
        padding: '5px 36px 10px ',
        boxSizing: 'border-box'
    },
    formControl: {
        marginBottom: 3
    }
}));

const FiltroSolicitudesGenericas = ({ usuarioActivo }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    //Tabla:
    const todasSG = useSelector(state => state.solicitudesGenericas.todasSG)
    const consultaPreDefinida = useSelector(state => state.solicitudesGenericas.busquedaConRetorno)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [isAsc, setIsAsc] = useState(false)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    const closeHandler = () => {
        setOpen(false)
        dispatch(clearTodasSG())
        dispatch(clearBusquedaSGRetorno())
    };
    useEffect (() => {
        if(consultaPreDefinida !== null) setOpen(true) 
    },[]);

    return (
        <>
            <CustomButton
                startIcon={<RestoreIcon />}
                label="Consultar todas las SG"
                eight={40}
                styleButton={{ borderRadius: 20, border: '1px solid #747474' }}
                styleLabel={{ color: '#747474' }}
                onClik={() => setOpen(true)}
            />

            <Dialog
                aria-labelledby="simple-dialog-title"
                onClose={closeHandler}
                open={open}
                fullWidth
                maxWidth={'xl'}
                fullScreen={false}
            >
                <Box className={classes.drawerContent} >
                    <Grid container direction="column" spacing={1}>
                        {/* CABECERA */}
                        <Grid item container justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="h6"><b>Consultar todas las Solicitudes Genéricas</b></Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={closeHandler}><CloseIcon /></IconButton>
                            </Grid>
                        </Grid>
                        <Grid item><Divider /></Grid>
                        {/* FILTROS */}
                        <Grid item>
                            <CabeceraFiltrosSG
                                usuarioActivo={usuarioActivo}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                page={page}
                                setPage={setPage}
                                isAsc={isAsc}
                                setIsAsc={setIsAsc}

                            />
                        </Grid>
                        <Grid item><Divider /></Grid>
                        {/* TABLA */}
                        <Grid item>
                            <TablaSolicitudesGenericas
                                data={todasSG}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                page={page}
                                setPage={setPage}
                                mensajeNotFound='No se encontraron Solicitudes Genéricas.'
                                isAsc={isAsc}
                                setIsAsc={setIsAsc}
                                opcionesPaginacion={opcionesPaginacion}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    );
};

FiltroSolicitudesGenericas.propTypes = {};

export default FiltroSolicitudesGenericas;