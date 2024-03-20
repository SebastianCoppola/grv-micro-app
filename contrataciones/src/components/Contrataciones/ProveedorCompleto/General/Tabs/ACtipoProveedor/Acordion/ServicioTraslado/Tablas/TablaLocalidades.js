import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../../../../redux/actions/index'
//Material:
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core'
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
//Components:
import IconButtonMenu from "../../../../../../../../commons/Menu/IconButtonMenu";
import CustomButton from "../../../../../../../../commons/Button/CustomButton";
import IconExcel from '../../../../../../../../../commons/assets/Contrataciones/file-excel-box-outline.png'
import AdminSlide from "../../../../../../../../commons/Slider/AdminSlide";
import Drawer2 from "../../../../../../../../commons/CustomDrawer/Drawer";
import DrawerImportarLocalidades from "../DrawerImportarLocalidades";
import CustomAlert from "../../../../../../../../commons/CustomAlert/customAlert";
import CustomSnackBar from '../../../../../../../../commons/SnackBar/CustomSnackBar';
import LocalidadesRowTable from '../../../../../../../../Autosuggest/LocalidadesRowTable';


const useStyles = makeStyles((theme) => ({
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '2px'
    },
    focused: {
        border: '2px solid #378ef0',
        borderRadius: '5px'
    },
    root: {
        flex: 1,
        border: '1px solid #d3d3d3',
        borderRadius: '5px',
    },
    cell: {
        color: '#505050', fontSize: '14px',
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rowsTab: {
        fontSize: '12px',
        textAlign: 'center'
    },
    rows: {
        textAlign: 'left'
    },
    opacity: {
        opacity: '0.5'
    },
    noData: {
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'start',
        padding: '0 0 0 20px',
        alignItems: 'center',
        minHeight: '50px',
        fontSize: '14px',
        color: '#e34850'
    },
}));

const TablaLocalidades = (props) => {
    const { mensaje, setMensaje, data,
        actualizarData, setActualizarData,
        dataLocalidades, setDataLocalidades,
        localidadesEliminadas, setLocalidadesEliminadas,
        setOpenSnackBar, openSnackBar } = props

    const dispatch = useDispatch()
    const classes = useStyles(props);
    const options = ['Editar', 'Eliminar']
    const [openAlert, setOpenAlert] = useState({ "open": false, "mensaje": null });

    //Importar Localidades
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false });
    const [file, setFile] = useState(null)
    const [dataImportLocalidades, setDataImportarLocalidades] = useState(null)
    const [disableButton, setDisableButton] = useState(true);

    //Localidades Redux:
    const loadingAutosuggestLocalidades = useSelector(state => state.ubicacion.loadingAutosuggestLocalidades)
    const errorAutosuggestLocalidades = useSelector(state => state.ubicacion.errorAutosuggestLocalidades)
    const localidadesRedux = useSelector(state => state.ubicacion.findLocalidades)
    const [localidadesOptions, setLocalidadesOptions] = useState([]);

    //Localidades Table:
    const [editLocalidad, setEditLocalidad] = useState(false);
    const [addLocalidad, setAddLocalidad] = useState(false);
    const [localidadAEditar, setLocalidadAEditar] = useState(null);
    const [inputAutocomplete, setInputAutocomplete] = useState("");
    const [valueAutocomplete, setValueAutocomplete] = useState(null);
    const localidadesImportadas = useSelector(state => state.importarExportar.localidadesImportadas)

    //Cambia el valor VALUE del AutoComplete:
    const changeValueAutoComplete = (event, value) => {
        setValueAutocomplete(value)
    }
    //Cambia el valor INPUT del AutoComplete SAVE:
    const changeInputAutoComplete = (event, value) => {
        setInputAutocomplete(value)
        if (value && value.length >= 3) {
            let request = {
                descripcion: value
            }
            dispatch(actions.searchLocalidades(request))
        }
    }
    useEffect(() => {
        setLocalidadesOptions(localidadesRedux)
    }, [localidadesRedux])

    useEffect(() => {
        if (localidadesImportadas && localidadesImportadas.length > 0) {
            if (dataLocalidades.data && dataLocalidades.data !== null) {
                setDataLocalidades({
                    cantidad: 0,
                    data: [...dataLocalidades.data,
                    ...localidadesImportadas
                    ]
                })
            } else {
                setDataLocalidades({
                    cantidad: 0,
                    data: [
                        ...localidadesImportadas
                    ]
                })
            }
        }
    }, [localidadesImportadas])

    //Botones AutoComplete:
    const cancelAddEditLocalidad = () => {
        if (addLocalidad) {
            setAddLocalidad(false)
        }
        if (editLocalidad) {
            setEditLocalidad(false)
            setInputAutocomplete(null)
            setLocalidadAEditar(null)
            let newArray = [];
            for (let i = 0; i < (dataLocalidades.data).length; i++) {
                newArray.push({
                    "descripcion": dataLocalidades.data[i].descripcion,
                    "idLocalidad": dataLocalidades.data[i].idLocalidad,
                    "eliminarRelacion": dataLocalidades.data[i].eliminarRelacion,
                    "idProveedorTrasladoLocalidad": dataLocalidades.data[i].idProveedorTrasladoLocalidad,
                    "modoEdicion": false,
                })
            }
            setDataLocalidades({ cantidad: 0, data: [...newArray] })
        }
        setValueAutocomplete(null)
        setLocalidadesOptions([])
    }
    const saveAddEditLocalidad = () => {
        if (valueAutocomplete) {
            if (dataLocalidades && dataLocalidades.data && dataLocalidades.data.length > 0) {
                let arrayRepe = dataLocalidades && dataLocalidades.data && dataLocalidades.data.filter(it => it.idLocalidad === valueAutocomplete.codigo);
                if (arrayRepe.length === 0) {
                    if (addLocalidad) {
                        setAddLocalidad(false)
                        setDataLocalidades({
                            cantidad: 0,
                            data: [...dataLocalidades.data, {
                                eliminarRelacion: false,
                                idLocalidad: valueAutocomplete.codigo,
                                descripcion: valueAutocomplete.descripcion,
                                modoEdicion: false
                            }]
                        })
                        setOpenAlert({ "open": true, "mensaje": "Localidad agregada correctamente." })
                    }
                    if (editLocalidad) {
                        setEditLocalidad(false)
                        setInputAutocomplete(null)
                        let newArray = [];
                        for (let i = 0; i < (dataLocalidades.data).length; i++) {
                            if (dataLocalidades.data[i].idLocalidad === localidadAEditar.idLocalidad) {
                                newArray.push({
                                    eliminarRelacion: false,
                                    idProveedorTrasladoLocalidad: localidadAEditar.idProveedorTrasladoLocalidad,
                                    idLocalidad: valueAutocomplete.codigo,
                                    descripcion: valueAutocomplete.descripcion,
                                    modoEdicion: false
                                })
                            } else {
                                newArray.push(dataLocalidades.data[i])
                            }
                        }
                        setLocalidadAEditar(null)
                        setDataLocalidades({ cantidad: 0, data: [...newArray] })
                        setOpenAlert({ "open": true, "mensaje": "Localidad editada correctamente." })
                    }
                    setValueAutocomplete(null)
                    setLocalidadesOptions([])
                } else {
                    setOpenSnackBar({
                        open: true,
                        severity: 'error',
                        title: <div>{'La localidad ya existe.'}</div>,
                        vertical: 'bottom'
                    })
                }
            } else {
                setAddLocalidad(false)
                setDataLocalidades({
                    cantidad: 0,
                    data: [{
                        eliminarRelacion: false,
                        idLocalidad: valueAutocomplete.codigo,
                        descripcion: valueAutocomplete.descripcion,
                        modoEdicion: false
                    }]
                })
                setOpenAlert({ "open": true, "mensaje": "Localidad agregada correctamente." })
                setValueAutocomplete(null)
            }
        }
    }

    //OnClick Table Options
    const onClickItem = (event, row, value) => {
        //CASE EDITAR:
        if (event.target.value === 0) {
            setLocalidadAEditar(row)
            setInputAutocomplete(row)
            let newArray = [];
            for (let i = 0; i < (dataLocalidades.data).length; i++) {
                if (dataLocalidades.data[i].idLocalidad === row.idLocalidad) {
                    newArray.push({
                        "descripcion": dataLocalidades.data[i].descripcion,
                        "idLocalidad": dataLocalidades.data[i].idLocalidad,
                        "eliminarRelacion": dataLocalidades.data[i].eliminarRelacion,
                        "idProveedorTrasladoLocalidad": dataLocalidades.data[i].idProveedorTrasladoLocalidad,
                        "modoEdicion": true,
                    })
                } else {
                        newArray.push(dataLocalidades.data[i])
                    }
            }
            setDataLocalidades({ cantidad: 0, data: [...newArray] })
            setEditLocalidad(true);
        }
        //CASE ELIMINAR:
        if (event.target.value === 1) {
            let newArray = [];
            if(row.idProveedorTrasladoLocalidad){
                let deleted = null;
                for (let i = 0; i < (dataLocalidades.data).length; i++) {
                    if (dataLocalidades.data[i].idLocalidad === row.idLocalidad) {
                        deleted = {
                            "idLocalidad": dataLocalidades.data[i].idLocalidad,
                            "eliminarRelacion": true,
                            "idProveedorTrasladoLocalidad": dataLocalidades.data[i].idProveedorTrasladoLocalidad,
                        }
                    } else {
                        newArray.push(dataLocalidades.data[i])
                    }
                }
                setLocalidadesEliminadas([...localidadesEliminadas, deleted])
            }else{
                for (let i = 0; i < (dataLocalidades.data).length; i++) {
                    if (dataLocalidades.data[i].idLocalidad !== row.idLocalidad) {
                        newArray.push(dataLocalidades.data[i])
                    }
                }
            }
            setDataLocalidades({ cantidad: 0, data: [...newArray] })
            setOpenAlert({ "open": true, "mensaje": "Localidad eliminada correctamente." })
        }
    }

    //AGREGAR LOCALIDAD BOTON:
    const agregarLocalidad = () => {
        setMensaje(false)
        setAddLocalidad(!addLocalidad)
    }

    //IMPORTAR:
    const onClickImportar = () => {
        setOpenDrawer({ ...openDrawer, 'right': true });
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    }
    const importarLocalidadesExcel = () => {
        if (dataImportLocalidades && data && data.idProveedor) {
            const formData = new FormData();
            formData.set("excelFile", dataImportLocalidades)
            formData.set("proveedor", data.idProveedor)
            const callbackImportar = (success, data) => {
                if (success) {
                    if (data) {
                        setOpenAlert({ "open": true, "mensaje": "" + data + ", las demas localidades han sido agregadas correctamente" })
                        setOpenDrawer({ ...openDrawer, 'right': false });
                        setDataImportarLocalidades(null)
                        setFile(null)
                        setActualizarData(!actualizarData)
                    } else {
                        setOpenAlert({ "open": true, "mensaje": "Localidades importados correctamente" })
                        setOpenDrawer({ ...openDrawer, 'right': false });
                        setDataImportarLocalidades(null)
                        setFile(null)
                        setActualizarData(!actualizarData)
                    }
                } else {
                    setOpenAlert(false)
                    setOpenSnackBar({
                        open: true,
                        severity: 'error',
                        title: <div>{'No se ha podido guardar. Por favor intente nuevamente.'}</div>
                    })
                }
            }
            dispatch(actions.importarLocalidades(formData, callbackImportar))
        }
    }
    const contenido = [
        {
            texto: <DrawerImportarLocalidades
                setDisableButton={setDisableButton}
                file={file}
                setFile={setFile}
                setDataImportarlocalidad={setDataImportarLocalidades}
                setOpenSnackBar={setOpenSnackBar}
            />
        }
    ]
    const buttons = () => {
        return (<>
            <Grid item>
                <CustomButton
                    label={"Cancelar"}
                    variant={"contained"}
                    width={'102px'}
                    height={'40px'}
                    isAction={true}
                    styleLabel={{ fontSize: '14px', fontWeight: 'bold', color: '#747474' }}
                    styleButton={{ border: 'solid 2px #747474', backgroundColor: '#ffffff', marginRight: '15px' }}
                    onClik={handleCancelar}
                />
                <CustomButton
                    onClik={importarLocalidadesExcel}
                    color={'primary'}
                    startIcon={false}
                    disabled={disableButton}
                    width={'105px'}
                    height={'40px'}
                    label={"Importar"}
                    variant={"contained"}
                    isAction={true}
                />
            </Grid> </>)
    }
    const handleCancelar = () => {
        setFile(null)
        setDataImportarLocalidades(null)
        setOpenDrawer({ ...openDrawer, 'right': false });
    }
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    const handleCloseSnakBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };
    return (
        <Grid container xs={12} style={{ marginTop: "20px" }}>
            <Grid item xs={12} style={{ height: "70px" }} container justify="space-between">
                <Grid item>
                    <Typography>Listado de localidades asociadas</Typography>
                </Grid>
                <Grid item>
                    <CustomButton
                        disabled={editLocalidad}
                        startIcon={<img src={IconExcel} />}
                        label='Importar'
                        styleLabel={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontStretch: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 1.24,
                            letterSpacing: 'normal',
                            textAlign: 'left',
                            color: '#505050',
                        }}
                        variant='outlined'
                        onClik={onClickImportar}
                        isAction={false}
                        styleButton={{ width: '125px', height: '30px', marginRight: '10px' }}
                    />
                    <CustomButton
                        disabled={editLocalidad}
                        startIcon={<AddIcon />}
                        label='Agregar Localidad'
                        styleLabel={{
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontStretch: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 1.24,
                            letterSpacing: 'normal',
                            textAlign: 'left',
                            color: '#505050',
                        }}
                        variant='outlined'
                        onClik={agregarLocalidad}
                        isAction={false}
                        styleButton={{ width: '190px', height: '30px', }}
                    />
                </Grid>
            </Grid>

            <Grid container xs={12}>
                <div className={classes.list}>
                    <List component="ul" aria-label="main mailbox folders" xs={12} width="100%">
                        <ListItem>
                            <Grid item xs={2}>
                                <ListItemText disableTypography className={classes.rowsTab} primary="ID LOCALIDAD" />
                            </Grid>
                            <Grid item xs={9}>
                                <ListItemText disableTypography className={classes.rowsTab} primary="LOCALIDAD Y PROVINCIA" />
                            </Grid>
                            <Grid item xs={3}>
                                <ListItemText disableTypography className={classes.rowsTab} primary="ACCIONES" />
                            </Grid>
                        </ListItem>
                        <Divider />
                        {addLocalidad ?
                            <LocalidadesRowTable
                                rowsWidth={[2,9,3]}
                                valueAutocomplete={valueAutocomplete}
                                localidadesOptions={localidadesOptions}
                                optionLabel='descripcion'
                                changeInputAutoComplete={changeInputAutoComplete}
                                changeValueAutoComplete={changeValueAutoComplete}
                                inputAutocomplete={inputAutocomplete}
                                localidadAEditar={localidadAEditar}
                                cancelAddEditLocalidad={cancelAddEditLocalidad}
                                saveAddEditLocalidad={saveAddEditLocalidad}
                            />
                        : null}
                        {dataLocalidades && dataLocalidades.data && dataLocalidades.data.length > 0 ?
                            dataLocalidades.data.map(it => (
                                it.modoEdicion ?  
                                <>
                                    <LocalidadesRowTable
                                        rowsWidth={[2,9,3]}
                                        valueAutocomplete={valueAutocomplete}
                                        localidadesOptions={localidadesOptions}
                                        optionLabel='descripcion'
                                        changeInputAutoComplete={changeInputAutoComplete}
                                        changeValueAutoComplete={changeValueAutoComplete}
                                        inputAutocomplete={inputAutocomplete}
                                        localidadAEditar={localidadAEditar}
                                        cancelAddEditLocalidad={cancelAddEditLocalidad}
                                        saveAddEditLocalidad={saveAddEditLocalidad}
                                    />
                                    <Divider />
                                </>    
                                :
                                <>
                                    <ListItem sx={12} className={it.modoEdicion ? classes.autocompleteRow : (editLocalidad && it.modoEdicion === false) || addLocalidad ? classes.opacity : null}>
                                        <Grid item xs={2}>
                                            <ListItemText disableTypography className={classes.rowsTab} primary={it.idLocalidad} />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <ListItemText disableTypography className={classes.rowsTab}>
                                                {it.descripcion}
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText disableTypography className={classes.rowsTab}>
                                                <IconButtonMenu
                                                    icon={<MoreVertOutlinedIcon style={{ color: '#747474' }} />}
                                                    className={classes.iconBnt}
                                                    size="small"
                                                    options={options}
                                                    onClickItem={(event) => onClickItem(event, it)}
                                                    disabled={(editLocalidad && it.modoEdicion === false) || addLocalidad ? true : false}
                                                />
                                            </ListItemText>
                                        </Grid>
                                    </ListItem>
                                    <Divider />
                                </>
                            ))
                            :
                            <Typography className={classes.noData}>
                                No hay convenios de traslados agregados.
                            </Typography>
                        }
                    </List>
                </div>
            </Grid>

            <Grid item xs={12}>
                <Drawer2
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    anchor='right'
                    toggleDrawer={toggleDrawer}
                    title={"Importar localidad/es desde Excel"}
                >
                    <AdminSlide
                        contenido={contenido}
                        labelButtonSiguiente={null}
                        variantButtonCancelar={'outlined'}
                        variantButtonSiguiente={'contained'}
                        activeStep={0}
                        setActiveStep={0}
                        maxSteps={0}
                        buttons={buttons()}
                    />
                </Drawer2>
                {
                    <CustomAlert
                        message={openAlert.mensaje}
                        onClose={handleCloseAlert}
                        variant={'filled'}
                        severity='success'
                        open={openAlert.open}
                        snack={true}
                    />
                }
                {openSnackBar.open ?
                    <CustomSnackBar
                        handleClose={handleCloseSnakBar}
                        open={openSnackBar.open}
                        title={openSnackBar.title}
                        severity={openSnackBar.severity} />
                    : null
                }
            </Grid>
        </Grid>
    )
}

export default TablaLocalidades;
