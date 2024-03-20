import { Grid, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useState } from 'react';
import CustomButton from '../../../../../../../commons/Button/CustomButton';
import CustomTypography from '../../../../../../../commons/Typography/CustomTypography';
import imgSubirArchivo from '../../../../../../../../commons/assets/Contrataciones/Proveedores/upFile.svg'
import imgExcel from '../../../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconExcel.svg'
import imgDelete from '../../../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'

const useStyles = makeStyles((theme) => ({
    cabecera: {
        padding: '6% 0%',
        borderLeft: '2px solid #1473e6',
        backgroundColor: '#f5f5f5',
        marginBottom: '8px',
        marginRight: '2%'
    },
    text: {
        fontSize: '14px',
        marginLeft: '8%',
        marginRight: '18%',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    updateFile: {
        padding: '10% 0%',
        border: '2px dashed #dadce0',
        marginRight: '2%'
    },
    textFile: {
        lineHeight: 1.27,
        color: '#505050',
        fontSize: '12px',
        textAlign: 'center',
        fontWeight: 500,
    },
    imgUp: {
        marginLeft: '41%',
        textAlign: 'center',
        marginBottom: '4%',
    },
    activeDragArea: {
        backgroundColor: '#b8d4fe',
        color: 'black',
        border: '2px dashed #618ac9'
    },
    areaExcelFile: {
        padding: '4% 3%',
        border: '2px solid #dadce0',
        marginRight: '2%',
    },
    nameFile: {
        fontWeight: 'bold',
        fontSize: '13px',
        color: '#505050',
    },
    sizeFile: {
        color: '#959595',
        fontSize: '12px'
    },
    iconDelete: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '2px solid #dadce0',
        width: "38px",
        height: "38px",
    }
}));

const text1 = `El archivo NO debe tener títulos, solo datos.
Debe tener la columna de ID de la localidad.`
const DrawerImportarLocalidades = (props) => {
const {setDisableButton, file, setFile, setDataImportarlocalidad, setOpenSnackBar } = props
const classes = useStyles(props);
const inputFileRef = React.useRef(null);
const [activeDragLeve, setActiveDragLeve] = useState(false)

const handleSubirArchivo = (e) => {
    inputFileRef.current.click();
}

const onFileChange = (e, file) => {
    if (e.target.files.length > 0) {
        if (e.target.files[0].name.split(".").pop() === "xlsx") {
            const excelFile = e.target.files[0];
            setFile({ name: excelFile.name, size: excelFile.size, view: true })
            setDataImportarlocalidad(excelFile) 
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>{'El archivo a cargar debe ser un Excel'}</div>
            })
        }
    }
}

const dragLeaveFile = (e) => {
    e.stopPropagation();
    e.preventDefault()
    setActiveDragLeve(false)
}
const dragOverFile = (e) => {
    e.stopPropagation();
    e.preventDefault()
    setActiveDragLeve(true)
}
const dropFile = (e) => {
    e.preventDefault()
    setActiveDragLeve(false)
}

const onClickDelete = () => {
    setFile({})
    setDisableButton(true)
}
useEffect(() => {
    if (file && file.view) {
        setDisableButton(false)
    }
}, [file])

return (
    <Grid container spacing={2}>
        <Grid item container justify='center' spacing={2} >
            <Grid item xs={12}>
                {
                    file === null || !file.view ?
                        <div className={`${classes.updateFile}  ${activeDragLeve && classes.activeDragArea}`} onDragLeave={dragLeaveFile} onDragOver={dragOverFile} onDropFile={dropFile}>
                            <input type='file'
                                name='file'
                                ref={inputFileRef}
                                id="file"
                                onChange={(e) => onFileChange(e)}
                                style={{ width: '391px', height: '176px', position: 'absolute', opacity: 0 }}
                                accept=".xlsx"
                            />
                            <img className={classes.imgUp} src={imgSubirArchivo} style={{ paddingRight: '10px' }} />
                            <CustomTypography className={classes.textFile}
                                text={'Subir o arrastrar archivo aquí.'} />
                            <CustomButton
                                label={'Seleccionar archivo'}
                                styleButton={{
                                    width: '146px',
                                    height: '33px',
                                    marginLeft: '30%',
                                    marginTop: '5%'
                                }}
                                styleLabel={{
                                    fontSize: '13px',
                                    fontWeight: 'normal',
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 1.24,
                                    letterSpacing: 'normal',
                                    textAlign: 'left',
                                    color: '#505050'
                                }}
                                variant={'outlined'}
                                onClik={handleSubirArchivo}
                            >
                            </CustomButton>
                        </div>
                        :
                        <div className={classes.areaExcelFile}>
                            <Grid container justify='center' alignItems='center'>
                                <Grid item xs={2}>
                                    <img src={imgExcel} className={classes.imgExcel} />
                                </Grid>
                                <Grid item xs={8} >
                                    <Grid item xs={12}>
                                        <CustomTypography
                                            className={classes.nameFile}
                                            text={file ? file.name : null}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomTypography
                                            className={classes.sizeFile}
                                            text={file ? file.size : null}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <IconButton className={classes.iconDelete} style={{ marginLeft: '10px' }} size="small" onClick={onClickDelete} >
                                        <img src={imgDelete} style={{ width: '21px', color: '#747474' }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                }
            </Grid>

            <Grid item xs={12}>
                <div className={classes.cabecera}>
                    <CustomTypography className={classes.text} text={text1} />
                </div>
            </Grid>
        </Grid>
    </Grid>

)
}

export default DrawerImportarLocalidades