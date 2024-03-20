import React, { useEffect, useState } from 'react';
import { Grid, IconButton } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import CustomTypography from '../../../../../commons/Typography/CustomTypography';
import imgSubirArchivo from '../../../../../../commons/assets/Contrataciones/Proveedores/upFile.svg'
import imgExcel from '../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconExcel.svg'
import imgDelete from '../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'
import CustomButton from '../../../../../commons/Button/CustomButton';
import CustomSnackBar from '../../../../../commons/SnackBar/CustomSnackBar';
//import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//import * as XLSX from 'xlsx'
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
    imgExcel: {
        // marginLeft:'5%'
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
Debe respetar el siguiente orden en las
columnas:`
const text2 = `Cuit (solo números) - Razon Social - Direccion - Id Localidad (solo números) - 
Telefono- Email- Id Tipo Proveedor (1: Prestador Médico / 2: Farmacia)(solo números).`

const DrawerImportarSubPrestador = (props) => {
    const { disableButton, setDisableButton, file, setFile, setDataImportarSubprestador, openSnackBar, setOpenSnackBar } = props
    const classes = useStyles(props);
    const inputFileRef = React.useRef(null);
    const [activeDragLeve, setActiveDragLeve] = useState(false)
    //const [fileReader, setFileReader] = useState(null)
    //const [data, setData] = useState(null)
    let files;

    const handleSubirArchivo = (e) => {
        inputFileRef.current.click();
    }
    // function convertToJson(csv) {
    //     var lines = csv.split("\n");
    //     var result = [];
    //     var headers = lines[0].split(",");
    //     for (var i = 1; i < lines.length; i++) {
    //         var obj = {};
    //         var currentline = lines[i].split(",");
    //         for (var j = 0; j < headers.length; j++) {
    //             obj[headers[j]] = currentline[j];
    //         }
    //         result.push(obj);
    //     }
    //     return JSON.stringify(result); //JSON
    // }
    // const handleFile = (file) => {
    //     const reader = new FileReader();
    //     const rABS = !!reader.readAsBinaryString;
    //     reader.onload = e => {
    //         /* Parse data */
    //         const bstr = e.target.result;
    //         const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" }); //SI VA PARA EL EXPORTAR -VER ERROR 
    //         /* Get first worksheet */
    //         const wsname = wb.SheetNames[0]; //SI VA PARA EL EXPORTAR
    //         const ws = wb.Sheets[wsname]; //SI VA PARA EL EXPORTAR
    //         /* Convert array of arrays */
    //         const data = XLSX.utils.sheet_to_json(ws, { header: 1 });//SI VA PARA EL EXPORTAR -VER ERROR          
    //     };
    //     if (rABS) reader.readAsBinaryString(file);
    //     else reader.readAsArrayBuffer(file);
    // }
    //se usa
    const onFileChange = (e, file) => {
        if (e.target.files.length > 0) {
            if (e.target.files[0].name.split(".").pop() === "xlsx") {
                const excelFile = e.target.files[0];
                setFile({ name: excelFile.name, size: excelFile.size, view: true })
                setDataImportarSubprestador(excelFile)
            } else {
                setOpenSnackBar({
                    open: true,
                    severity: 'error',
                    title: <div>{'El archivo a cargar debe ser un Excel'}</div>
                })
            }
        }
        //const files = e.target.files;
        // //para convertir datos en json
        // if (files && files[0]) {
        //     handleFile(files[0])
        // }
        // if (e.target.files && e.target.files.length > 0) {
        //     var f = e.target.files[0];
        //     // var name = f.name;
        //     const reader = new FileReader();
        //     reader.onload = (evt) => {
        //         // evt = on_file_select event
        //         /* Parse data */
        //         const bstr = evt.target.result;
        //         //const wb = XLSX.read(bstr, { type: "binary" }); SI VA PARA EL EXPORTARV- VER ERROR 
        //         /* Get first worksheet */
        //         //const wsname = wb.SheetNames[0]; SI VA PARA EL EXPORTAR
        //         // const ws = wb.Sheets[wsname]; SI VA PARA EL EXPORTAR
        //         /* Convert array of arrays */
        //         //const data = XLSX.utils.sheet_to_csv(ws, { header: 1 }); SI VA PARA EL EXPORTAR -VER ERROR 
        //         /* Update state */
        //         //console.log("Data>>>" + data); // shows that excel data is read
        //         let rJson = convertToJson(data);
        //         // console.log("rJson", rJson); // shows data in json format
        //         let toJson = JSON.parse(rJson);
        //         toJson.pop()
        //         // console.log("toJson", toJson);
        //         setDataImportarSubprestador(toJson.map((i, index2) => {
        //             return (
        //                 { ...i, direccionValidad: false }
        //             )
        //         }))
        //         // data: toJson,direccionValidad: false
        //         //setData({ data: toJson,direccionValidad: false});
        //         setFile(data => ({ name: f.name, size: f.size, view: true }))
        //     };
        //     setActiveDragLeve(false)
        //     reader.readAsBinaryString(f);
        // } else {
        //     setData({ data: [] });
        // }
    }

    //PARA MANTENER EXCCEL
    // const validExtensions = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    // let hojas = []
    // // if(target.name ==='file')
    // console.log(e,'eeee')
    // for (var i = 0, f; f = e.file[i]; i++) {
    //     if (validExtensions.includes(f.type)) {
    //         setFile(data => ({ name: f.name, size: f.size, view: true }))
    //     }
    //     else {
    //         setOpenSnackBar({
    //             open: true,
    //             severity: 'error',
    //             title: 'No es un archivo válido. Debe ser un archivo xlsx'
    //         })
    //     }
    //     //  })   }
    // }}

    const showFile = (files, e) => {
        //solo estoy subiendo un archivo
        if (files.length === undefined) {
            //proccesFile(files, e)
        } else {
            //mando mas de un archivo
            for (const file of files) {
                //proccesFile(file, e)
            }
        }
    }
    //event agarra y arrastrar archivo
    const dragLeaveFile = (e) => {
        e.stopPropagation();
        e.preventDefault()
        setActiveDragLeve(false)
    }
    // evnet arrastrando dentro del campo
    const dragOverFile = (e) => {
        e.stopPropagation();
        e.preventDefault()
        setActiveDragLeve(true)
    }
    //event arrastrar y soltar archivo (cuando no se necesita cambiar los datos)
    const dropFile = (e) => {
        e.preventDefault()
        files = e.dataTransfer.files
        showFile(files, e)
        setActiveDragLeve(false)
    }
    // //procesa el archivo cuando no nesesita parsear los datos a json
    // const proccesFile = (file, e) => {
    //     const docType = file.type;
    //     const validExtensions = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    //     if (validExtensions.includes(docType)) {
    //         //archivo valido
    //         const fileRead = new FileReader()
    //         const id = `file-${Math.random().toString(32).substring(7)}`
    //         fileRead.readAsDataURL(file)
    //         //  uploadFile(file, id)
    //         setFileReader(fileRead)
    //         setFile(data => ({ name: file.name, size: file.size, view: true }))
    //     } else {
    //         //no es un archivo valido
    //         //mostrar snack var (NO ES UN ARCHIVO VALIDO. DEBE SER XLS O XLSX)
    //         setOpenSnackBar({
    //             open: true,
    //             severity: 'error',
    //             title: <div>
    //                 {'Ocurrió un error. Por favor intente nuevamente'}
    //             </div>
    //         })
    //     }
    // }
    const onClickDelete = () => {
        setFile({})
        setDisableButton(true)
        //setData({ data: [] });
    }
    useEffect(() => {
        if (file && file.view) {
            setDisableButton(false)
        }
    }, [file])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

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
                                    // hidden
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
                        <CustomTypography className={classes.text} text={text2} style={{ marginTop: '5%' }} />
                    </div>
                </Grid>
            </Grid>
        </Grid>

    )
}

export default DrawerImportarSubPrestador
