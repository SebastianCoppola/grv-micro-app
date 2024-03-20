import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types"
//Redux:
import { useDispatch } from 'react-redux'
import { setSnackBar } from '../../../redux/actions/solicitudesGenericas'
//Mui:
import { Box, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
//Icons:
// import { ReactComponent as UploadFileIcon } from '../../../commons/assets/DenunciaCompleta/uploadFileIcon.svg';
// import { ReactComponent as DeleteIcon } from '../../../commons/assets/DenunciaCompleta/deleteIcon.svg';
// import { ReactComponent as PdfFileIcon } from '../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg';
import PdfFileIcon from '../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg'
import UploadFileIcon from '../../../commons/assets/DenunciaCompleta/uploadFileIcon.svg'
import DeleteIcon from '../../../commons/assets/DenunciaCompleta/deleteIcon.svg'
//Components:
import CustomButton from '../Button/CustomButton'

const useStyles = makeStyles((theme) => ({
    root: {
        width: ({ isVerticalAlign }) => isVerticalAlign ? 'inheret' : 400,
        border: ({ fileExists, dragActive }) => fileExists
            ? '1px solid #d3d3d3'
            : `2px dashed ${dragActive ? '#1473e6' : '#d3d3d3'}`,
        borderRadius: 5,
        boxSizing: 'border-box'
    },
    icon: {
        width: 50,
        height: 50,
        padding: 13,
        boxSizing: 'border-box',
        borderRadius: 5,
    },
    firstIcon: {
        backgroundColor: ({ fileExists }) => fileExists
            ? 'rgba(255, 112, 82, 0.1)'
            : 'rgba(47, 97, 213, 0.1)'
    },
    lastIcon: {
        width: 40,
        height: 40,
        padding: 0,
        border: ({ fileExists }) => fileExists ? '1px solid #d3d3d3' : 'none'
    }
}));

const CustomUploadFile = (props) => {
    const { isVerticalAlign = false, onChangeHandler = () => { }, setArchivo } = props;
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const classes = useStyles({ fileExists: !!file, isVerticalAlign, dragActive });
    const inputRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        onChangeHandler(file);
    }, [file, onChangeHandler]);

    const onSelectFileHandler = () => {
        inputRef.current?.click();
    };

    const validacionExtension = (event, bool) => {
        let extensionesDisponibles = ["pdf", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx"]
        let archivoSeleccionado = event.target && event.target.files && event.target.files[0] && event.target.files[0].name ? event.target.files[0].name : null
        let archivoDrageado = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0] && event.dataTransfer.files[0].name ? event.dataTransfer.files[0].name : null
        let nombreArchivo = bool ? archivoSeleccionado && archivoSeleccionado.split(".") : archivoDrageado && archivoDrageado.split(".")
        let path = nombreArchivo && nombreArchivo[1]
        let extensionCorrecta = extensionesDisponibles.includes(path)
        if (extensionCorrecta) {
            bool ? setFile(event.target.files[0]) : setFile(event.dataTransfer.files[0])
            bool ? setArchivo(event.target.files[0]) : setArchivo(event.dataTransfer.files[0])
        } else {
            dispatch(setSnackBar({
                open: true,
                message: 'Formato de archivo invalido.',
                severity: 'error'
            }));
            setFile(null)
            setArchivo(null)
        }
    }

    const onFileChangedHandler = (event) => {
        validacionExtension(event, true)
    };

    const dragHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            validacionExtension(event, false)
        }
    };

    let dragAndDropProps = {};
    if (!file) {
        dragAndDropProps = {
            onDragEnter: dragHandler,
            onDragLeave: dragHandler,
            onDragOver: dragHandler,
            onDrop: dropHandler
        }
    }

    const verticalProps = isVerticalAlign
        ? {
            spacing: 2,
            direction: 'column',
            alignItems: 'center'
        }
        : null;


    if (file) return (
        <Box className={classes.root} p={2}>
            <Grid container spacing={2} alignItems="center"
                {...dragAndDropProps}>
                <Grid item>
                    <Box className={[classes.icon, classes.firstIcon].join(' ')}>
                        {/* <PdfFileIcon /> */}
                        <img src={PdfFileIcon} alt="icon" />
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Typography style={{ fontSize: 14 }}>{file.name}</Typography>
                    <Typography style={{ fontSize: 14 }}>{`${file.size / 1000} Kb`}</Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        className={[classes.icon, classes.lastIcon].join(' ')}
                        onClick={() => setFile(null)}>
                        {/* <DeleteIcon /> */}
                        <img src={DeleteIcon} alt="icon" />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );



    return (
        <Box className={classes.root} p={2}>
            <Grid container {...verticalProps} spacing={2}
                {...dragAndDropProps}>
                <Grid item>
                    <Box className={[classes.icon, classes.firstIcon].join(' ')}>
                        {/* <UploadFileIcon /> */}
                        <img src={UploadFileIcon} alt="icon" />
                    </Box>
                </Grid>
                <Grid item container {...verticalProps} xs={8}>
                    <Grid item>
                        <Typography style={{ fontSize: 14 }}>Subir o arrastrar archivo aquí.</Typography>
                    </Grid>
                    <Grid item>
                        <CustomButton
                            variant="outlined"
                            onClik={onSelectFileHandler}
                            label='Seleccionar archivo'
                            size='small'
                            styleLabel={{ fontSize: 13 }}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <input
                type="file"
                onChange={onFileChangedHandler}
                ref={inputRef}
                style={{ display: 'none' }} />
        </Box>
    );
};

CustomUploadFile.propTypes = {
    isVerticalAlign: PropTypes.bool,
    onChangeHandler: PropTypes.func
};


export default CustomUploadFile;