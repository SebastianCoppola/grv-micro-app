import React from "react";
import { Box, IconButton, makeStyles, Typography, Grid, CircularProgress } from "@material-ui/core";
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'
import { getArchivoSolicitudGenerica } from '../../../redux/actions/importarExportar'
//Utils:
import { SNACK_VERTICAL, SNACK_SEVERITY, SNACK_ERROR_DESCARGA } from '../../../Utils/const'
//Icons:
import { ReactComponent as PreviewIcon } from '../../../commons/assets/DenunciaCompleta/previewIcon.svg'
import { ReactComponent as PdfFileIcon } from '../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #dadce0',
        borderRadius: 5,
        padding: 10,
        '& div:nth-child(1)': {
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            borderRadius: 5,
            backgroundColor: 'rgba(255, 112, 82, 0.1)'
        },
        '& div:nth-child(2)': {
            flexGrow: 1
        }
    },
    verAdjunto: {
        borderRadius: 5,
        border: '1px solid  #d3d3d3',
        padding: 7
    }
}));

const ArchivoAdjunto = ({ nombre, peso, masInfo }) => {
    const classes = useStyles();
    //Redux:
    const dispatch = useDispatch()
    const loadingImprimirPdfInicioSg = useSelector(state => state.importarExportar.loadingImprimirPdfInicioSg)
    //Descargar PDF:
    const handleDescargarArchivo = () => {
        let req = {
            nombreArchivo: nombre,
            accion: masInfo ? "MAS INFO" : "INICIO"
        }
        dispatch(getArchivoSolicitudGenerica(req, errorCallbackDescargarArchivo, nombre))
    }

    //Error Callback DescargarArchivo:
    let errorCallbackDescargarArchivo = (boolean) => {
        if (boolean) {
            dispatch(actions.setSnackBar({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                message: SNACK_ERROR_DESCARGA,
                vertical: SNACK_VERTICAL.TOP
            }))
        }
    }
    return (
        <Box display="flex" alignItems="center" className={classes.root}>
            <Box mr={2}><PdfFileIcon /></Box>
            <Box mr={2}>
                <Typography style={{ fontSize: 12, maxWidth: 150, overflow: 'hidden', overflowY: 'hidden', textOverflow: 'ellipsis' }}><b>{nombre}</b></Typography>
                <Typography style={{ fontSize: 12 }}>{peso}</Typography>
            </Box>
            {loadingImprimirPdfInicioSg ?
                <Grid style={{ minWidth: 10, textAlign: 'center', marginTop: '5px' }}>
                    <CircularProgress open={true} />
                </Grid>
                :
                <>
                    <IconButton
                        className={classes.verAdjunto}
                        onClick={handleDescargarArchivo}
                    >
                        <PreviewIcon />
                    </IconButton>
                </>
            }
        </Box>
    );
};

export default ArchivoAdjunto;