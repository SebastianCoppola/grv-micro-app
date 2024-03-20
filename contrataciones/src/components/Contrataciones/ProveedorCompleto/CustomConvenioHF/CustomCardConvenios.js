import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid, Icon } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearDatosExportarPDF, getDatosExportarPDF } from '../../../../redux/actions/convenio';
import { exportarPDF } from '../../../../redux/actions/importarExportar';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    text: {
        fontSize: "14px",
        color: "grey"
    },
    titles: {
        fontSize: "14px",
        color: "#2c2c2c"
    },
    iconActions: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "30px",
        height: "30px",
        marginLeft: '4px'
    },
    typography: {
        padding: theme.spacing(2),
    },
    tituloCardNoData: {
        fontSize: "19px",
        color: "#323232"
    }
})
);

//CustomCardConvenio -> Card customizable donde se puede agregar titulo, subtitulo, fecha de carga
//fecha carga desde, fecha carga hasta. Tambien sirve para la pantalla de convenios futuros donde los iconos y las
//Opciones son distintas a la de las pantallas de convenio historico.
/**
 * Props:
 *  id=> Devuelve el id del item/card que clickea el usuario
 *  historicoConvenio=> boolean:false Se utiliza para cambiar el color a tono anaranjado debido a que en la pantalla de convenios Futuros, 
 *  se diferencia el color del titulo a la pantalla de historico convenio, tambien se utiliza para cambiar los iconos segun la pantalla
 *  handleClickCustomCard=> para cambiar los datos de las tablas segun la version del convenio, tambien sirve para bordear la card a un tono azulado
 *  convenioSeleccionado => devuelve el item o la card que el usuario fue clickeando.
 *  handleClickEditar => Cuando el usuario clickea la parte del editar en convenios futuros, se muestra otra pantalla,
 *  bodyText => Texto dentro del body de la card, se utiliza cuando no hay convenios historicos ni futuros, se eliminan los iconos y los botones
 *  handleClickEliminar=> Eliminar convenio futuros
*/
const CustomCardConvenios = (props) => {
    const {
        titulo,
        subtitulo,
        carga,
        id,
        desde,
        hasta,
        icon,
        historicoConvenio,
        handleClickCustomCard,
        convenioSeleccionado,
        handleClickEditar,
        bodyText,
        handleClickEliminar,
        setLoadingComponente,
        setLoadingTablas,
        proveedor,
        usuario
    } = props

    const classes = useStyles();

    //Abrir opciones card Convenios Futuros (editar,eliminar) Popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl)
    const idPopover = open ? "Simple Popover" : undefined
    //Redux
    const dispatch = useDispatch()
    //Open SnackBar
    const [openSnackBar, setOpenSnackBar] = useState({ 'open': false, 'title': 'Hubo un error en el sistema. Por favor intente nuevamente.', 'severity': 'error' });

    const handleClickOption = (e) => {
        setAnchorEl(e.currentTarget)
        setLoadingTablas(false)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // Pasos para descargar o exportar archivo en formato pdf, objeto el => element, una vez
    // llamado a las apis de convenio-historico. se rellena los datos de este objeto, para luego
    //setearlo en la request que se envia al endpoint para exportar con la action exportarPDF()
    const handleClickPDF = () => {
        let conCostos = usuario.roles.includes("VISUALIZAR_PRECIOS_CONVENIO")
        let request = {
            "conCosto": conCostos,
            "nombrePDF": conCostos 
            ? convenioSeleccionado.nombrePDFCostos.replaceAll("\\", "").replaceAll("\"", "")
            : convenioSeleccionado.nombrePDFSinCostos.replaceAll("\\", "").replaceAll("\"", "")
        };
        dispatch(exportarPDF(request, callbackPDF, convenioSeleccionado.idConvenio, proveedor.idProveedor))
    }

    //Callback luego del export
    const callbackPDF = (bool) => {
        console.log(bool)
        if (bool) {
            setOpenSnackBar({
                "open": true,
                "title": 'Hubo un error al exportar. Por favor intente nuevamente.',
                "severity": 'error'
            })
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    return (
        <Grid item style={bodyText ? { marginTop: "50%" } : { marginTop: "4px" }}>
            <Card
                className={classes.root}
                style={bodyText ? { cursor: "auto", border: "1px solid grey" } : convenioSeleccionado.idConvenio === id ? { cursor: "pointer", border: "1px solid #1473e6" } : { cursor: "pointer", border: "1px solid #FFFF" }}
                onClick={handleClickCustomCard}
            >
                <CardContent>
                    <Grid item container style={{ display: "flex" }}>
                        {!bodyText ? (
                            <img src={icon} alt="icon" style={{ width: "24px", height: "24px" }} />
                        ) : null}
                        <Grid item style={{ marginLeft: "2px" }}>
                            <Typography className={bodyText ? classes.tituloCardNoData : classes.titles} style={historicoConvenio === false ? { color: "#f29423" } : null}>{titulo}</Typography>
                            <Typography className={classes.text} style={{ color: "#2DC76D" }}>{subtitulo}</Typography>
                        </Grid>
                        {!bodyText ? (
                            <IconButton
                                className={classes.iconActions}
                                size="small"
                                style={{ marginLeft: "auto", zIndex: "1000" }}
                                onClick={historicoConvenio === false ? handleClickOption : handleClickPDF}
                            >
                                {historicoConvenio === false ? (<MoreVertIcon />) : (<PictureAsPdfIcon />)}
                            </IconButton>
                        ) : null}

                        {open ? (
                            <Popover
                                id={idPopover}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography style={{ cursor: "pointer" }} className={classes.typography} onClick={handleClickEditar}>Editar</Typography>
                                <Typography style={{ cursor: "pointer" }} className={classes.typography} onClick={handleClickEliminar}>Eliminar</Typography>
                            </Popover>
                        ) : undefined}
                    </Grid>
                    <hr />
                    {bodyText ? (
                        <Typography className={classes.text}>{bodyText}</Typography>
                    ) : (
                        <div>
                            <Typography className={classes.text}>Fecha de Carga:{carga}</Typography>
                            <Typography className={classes.text}>Fecha vigencia desde:{desde}</Typography>
                            <Typography className={classes.text}>Fecha vigencia hasta:{hasta ? hasta : ' - '}</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
            {openSnackBar.open ? 
                <CustomSnackBar 
                    handleClose = {handleCloseSnackBar} 
                    open = {openSnackBar.open} 
                    title = {openSnackBar.title}
                    severity = {openSnackBar.severity} /> : null}
        </Grid >
    )
}

export default CustomCardConvenios
