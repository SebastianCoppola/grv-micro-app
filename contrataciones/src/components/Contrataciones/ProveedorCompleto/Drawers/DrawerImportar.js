import React, { useEffect, useState } from 'react'
//Material:
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
//Components:
import CustomButton from '../../../commons/Button/CustomButton';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
//Img:
import imgSubirArchivo from '../../../../commons/assets/Contrataciones/Proveedores/upFile.svg'
import imgExcel from '../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconExcel.svg'
import imgDelete from '../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'

const useStyles = makeStyles((theme) => ({
    cabecera: {
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '10px 15px',
        margin: '30px 0 0 0',
    },
    text1: {
        fontSize: '13px',
        color: '#4b4b4b',
        margin:'15px 0'
    },
    text2: {
        fontSize: '13px',
        color: '#4b4b4b',
        fontStyle: 'italic',
        margin:'15px 0'

    },
    updateFile: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:'10px',
        padding: '5% 0%',
        border: '2px dashed #dadce0',
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

const DrawerImportar = props => {
    const {setDeshabilitarSiguiente, textCol, importFile, setImportFile} = props
    const classes = useStyles()
    const [openSnackBar, setOpenSnackBar] = useState({"open":false, "title":'', "severity":''})
    //texts: 
    const text1 = 'El archivo NO debe tener títulos, solo datos, con el siguiente orden en las columnas'
    const text2 = '*La columna de Código externo es opcional'
    //file:
    const [file, setFile] = useState(null)
    const inputFileRef = React.useRef(null)
    const [activeDragLeve, setActiveDragLeve] = useState(false)

    const handleSubirArchivo = (e) => {
        inputFileRef.current.click();
    }
    
    const onFileChange = (e, file) => {
        if (e.target.files.length > 0) {
            if (e.target.files[0].name.split(".").pop() === "xlsx") {
                const excelFile = e.target.files[0]
                setFile({ name: excelFile.name, size: excelFile.size, view: true })
                setImportFile(excelFile)
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
        // setDisableButton(true)
    }
    useEffect(() => {
        if (file && file.view) {
            setDeshabilitarSiguiente(false)
        }else{
            setDeshabilitarSiguiente(true)
        }
    }, [file])
    
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };


    return (
        <Grid container xs={12} justify='center' style={{maxHeight:'600px'}}>
            <Grid xs={11} style={{margin:'20px 0 0 0'}}>
                { file === null || !file.view ?
                    <div className={`${classes.updateFile}  ${activeDragLeve && classes.activeDragArea}`} 
                        onDragLeave={dragLeaveFile} 
                        onDragOver={dragOverFile} 
                        onDropFile={dropFile}
                    >
                        <input type='file'
                            name='file'
                            ref={inputFileRef}
                            id="file"
                            onChange={(e) => onFileChange(e)}
                            style={{ width: '391px', height: '176px', position: 'absolute', opacity: 0 }}
                            accept=".xlsx"
                        />
                        <img src={imgSubirArchivo} />
                        <Typography style={{color:'#505050', fontSize:'12px'}}>
                            Subir o arrastrar archivo aquí.
                        </Typography>
                        <CustomButton
                            label={'Seleccionar archivo'}
                            styleButton={{width:'150px', height:'33px'}}
                            styleLabel={{fontSize:'13px', fontStretch:'normal', color: '#505050'}}
                            variant={'outlined'}
                            onClik={handleSubirArchivo}
                        />
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

                <Grid xs={12} className={classes.cabecera}>
                    <CustomTypography className={classes.text1} text={text1} />
                    <CustomTypography className={classes.text1} text={textCol} />
                    <CustomTypography className={classes.text2} text={text2} />
                </Grid>

                <CustomSnackBar
                    handleClose={handleCloseSnackBar}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                />

            </Grid>
        </Grid>
    )
}

export default DrawerImportar