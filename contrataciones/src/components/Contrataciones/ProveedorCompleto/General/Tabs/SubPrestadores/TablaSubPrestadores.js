import React, { useEffect, useState } from 'react'
//Mui:
import { Grid, IconButton, makeStyles } from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons/'
//Icons:
import IconExcel from '../../../../../../commons/assets/Contrataciones/file-excel-box-outline.png'
//Components:
import CustomTableContrataciones from '../../../../../commons/Table/CustomTableContrataciones'
import CustomSwitch from '../../../../../commons/Switch/CustomSwitch'
import CustomTypography from '../../../../../commons/Typography/CustomTypography'
import Drawer2 from '../../../../../commons/CustomDrawer/Drawer'
import AdminSlide from '../../../../../commons/Slider/AdminSlide'
import DrawerSubPrestadores from './DrawerSubPrestadores'
import CustomButton from '../../../../../commons/Button/CustomButton'
import CustomConfirmacion from '../../../../../commons/Dialogo/CustomConfirmacion'
import DrawerImportarSubPrestador from './DrawerImportarSubPrestador'
import BuscadorContrataciones from '../../../../../commons/Buscador/BuscadorContrataciones'
import CustomSnackBar from '../../../../../commons/SnackBar/CustomSnackBar'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions'
//Utils:
import { SNACK_SEVERITY, SNACK_VERTICAL } from '../../../../../../Utils/const'

const useStyles = makeStyles({
    iconAction: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '15px'
    },
    switchInactivo: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        boxSizing: 'border-box',
    },
    switchActivo: {
        fontWeight: 'inherit',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        color: '#03bb85'
    },
})

const initialSubPrestador = {
    idTipoSubPrestador: null,
    nombre: null,
    cuit: null,
    direccion: null,
    telefono: null,
    email: null,
    estado: true,
    ubicacionValidada: false,
}

const TablaSubPrestadores = props => {
    
    const { data, datos, idProveedor, page, setPage, rowsPerPage, setRowsPerPage, 
        openSnackBar, setOpenSnackBar, actualizarData, setActualizarData, buscador, setBuscador } = props

    const classes = useStyles(props)
    const dispatch = useDispatch()

    const loading = useSelector(state => state.proveedor.loadingBusquedaListadoSubprestadores)

    const [dataSubPrestadores, setDataSubPrestadores] = useState(datos.objetos ? datos.objetos : null)
    const [subPrestador, setSubPrestador] = useState(initialSubPrestador)
    const [guardarData, setGuardarData] = useState(false)
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [modo, setModo] = useState(null)
    const [disableButton, setDisableButton] = useState(true)
    const [importarSubPrestador, setImportarSubPrestador] = useState(false)
    const [dataImportSubPrestador, setDataImportarSubprestador] = useState(null)
    const [file, setFile] = useState(null)
    const [openDrawer, setOpenDrawer] = useState({top: false, left: false, bottom: false, right: false})

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (datos && datos.cantidadTotal && datos.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = datos && datos.objetos ? datos.objetos : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (datos && datos.cantidadTotal && lengthData < datos.cantidadTotal) {
            for (let index = lengthData; index < datos.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setDataSubPrestadores([...dataRellenar, ...dataApi, ...dataRestante])
    }, [datos])

    const headerTablaListadoContacto = [
        {
            title: "TIPO", field: "tipoSubPrestador", cellStyle: { color: '#505050', fontSize: '14px' }, headerStyle: { color: '#747474' }
        },
        {
            title: "NOMBRE", field: "nombre", cellStyle: { color: '#505050', fontSize: '14px' }, headerStyle: { color: '#747474' }
        },
        { 
            title: "TELÉFONO", field: "telefono", cellStyle: { color: '#505050', fontSize: '14px' }, headerStyle: { color: '#747474' } 
        },
        {
            title: "DOMICILIO Y LOCALIDAD", field: "domicilioLocalidad", cellStyle: { color: '#505050', fontSize: '14px', minWidth: '190px' }, headerStyle: { color: '#747474' },
        },
        {
            title: "ESTADO", field: "estadoActivo", cellStyle: { color: '#505050' }, headerStyle: { color: '#747474' }, render: (data) => (
                <Grid container alignItems={"center"}>
                    <Grid item >
                        <CustomSwitch
                            color={'#747474'}
                            checked={data && data.estado === 1 ? true : false}
                            onChange={() => handleSwitch(data)}
                        />
                    </Grid>
                    <Grid item >
                        <CustomTypography
                            className={data && data.estado === 1 ? classes.switchActivo : classes.switchInactivo}
                            text={data && data.estado === 1 ? "Activo" : "Inactivo"} />
                    </Grid>
                </Grid>
            )
        },
        {
            title: "ACCIONES", field: "acciones", cellStyle: { color: '#505050', fontSize: '14px', width: '5%', padding: '5px' }, headerStyle: { color: '#747474' }, render: row => (
                <Grid container alignItems='center'>
                    <Grid item>
                        <IconButton className={classes.iconAction} size="small" onClick={() => onClickEditar(row)} >
                            <Edit htmlColor={'#323232'} />
                        </IconButton>
                    </Grid>
                </Grid>
            )
        },
    ]

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setSubPrestador(initialSubPrestador)
        setModo(null)
        setOpenDrawer({ ...openDrawer, [anchor]: open })
    }

    //CONTENIDO PARA AGREGAR Y EDITAR SUB-PRESTADOR
    const contenido = [
        {
            texto: <DrawerSubPrestadores
                setSubPrestador={setSubPrestador}
                subPrestador={subPrestador}
                guardarData={guardarData}
                setGuardarData={setGuardarData}
                setOpenConfirmacion={setOpenConfirmacion}
                setDisableButton={setDisableButton}
                disableButton={disableButton}
                modo={modo}
                idProveedor={idProveedor}
            />
        }
    ]

    //CONTENIDO PARA AGREGAR Y EDITAR SUB-PRESTADOR
    const contenido2 = [
        {
            texto: <DrawerImportarSubPrestador
                disableButton={disableButton} setDisableButton={setDisableButton}
                subPrestador={subPrestador} setSubPrestador={setSubPrestador}
                file={file} setFile={setFile}
                setDataImportarSubprestador={setDataImportarSubprestador}
                openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar}
            />
        }
    ]

    //BUSCA EN EL LISTADO DE SUB-PRESTADORES
    const handleBuscador = (data) => {
        setBuscador(data)
    }

    //ABRE EL DRAWER PARA AGREGAR UN NUEVO SUB-PRESTADOR
    const handleAgregarSubPrestador = (data) => {
        setImportarSubPrestador(false)
        setModo('agregar');
        setOpenDrawer({ ...openDrawer, 'right': true });
        setActualizarData(false)
    }

    //ABRE EL DRAWER PARA EDITAR UN SUB-PRESTADOR
    const onClickEditar = (selectedRow) => {
        setSubPrestador(selectedRow)
        setImportarSubPrestador(false)
        setModo('editar')
        setOpenDrawer({ ...openDrawer, 'right': true });
    }

    const handleImportar = (event, data) => {
        setImportarSubPrestador(true)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }

    //CAMBIA EL ESTADO DE UN SUBPRESTADOR (ACTIVO/INACTIVO)
    const handleSwitch = (row) => {
        setActualizarData(false)
        let callbackSwitch = (success, row) => {
            if (success) setActualizarData(true)
            setOpenSnackBar({
                open: true,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.BOTTOM,
                title: success 
                    ? <div> Se ha {row && row.estado === 1 ? 'desactivado' : 'activado'} correctamente el prestador.</div>
                    : <div> No se pudo {row && row.estado === 1 ? 'desactivar' : 'activar'} el prestador. Por favor intente nuevamente.</div>
            })
        }
        let request = {
            idSubprestador: row && row.idSubPrestador,
            activar: row.estado === 1 ? 0 : 1
        }
        dispatch(actions.cambiarEstadoSubPrestador(request, callbackSwitch, row))
    }

    //CIERRA EL DRAWER
    const handleCancelar = () => {
        setSubPrestador(initialSubPrestador)
        setFile(null)
        setDataImportarSubprestador(null)
        setModo(null)
        setOpenDrawer({ ...openDrawer, 'right': false });
    }

    //BOTON EDITAR O AGREGAR UN SUBPRESTADOR
    const agregarSubPrestador = () => {
        if (importarSubPrestador && dataImportSubPrestador && data && data.idProveedor) {
            const formData = new FormData();
            formData.set("excelFile", dataImportSubPrestador)
            formData.set("proveedor", data.idProveedor)
            const callbackImportar = (success) => {
                setOpenSnackBar({
                    open: true,
                    severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                    vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                    title: success ? 'Subprestadores importados correctamente.' 
                        : 'Error al guardar Archivo Excel.'
                })
                if (success) {
                    setOpenDrawer({ ...openDrawer, 'right': false })
                    setDataImportarSubprestador(null)
                    setFile(null)
                    setActualizarData(!actualizarData)
                } 
            }
            dispatch(actions.importarSubprestadores(formData, callbackImportar))
        } else {
            setGuardarData(true)
        }
    }

    //CANCELA LA CONFIRMACION DE AGREGAR O EDITAR UN SUBPRESTADOR
    const cancelarConfirmacion = () => {
        setOpenConfirmacion(false)
    }

    //CONFIRMA LA CREACION O LA EDICION DE UN SUBPRESTADOR
    const handleAceptarConfirmacion = () => {
        let callback = (success) => {
            let severity = success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR
            let vertical = success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP
            let title = !success ? 'Ocurrio un error, vuelva a intentarlo.'
                : success && importarSubPrestador ? 'Subprestadores importados correctamente.'
                : `Subprestador ${modo === 'agregar' ? 'AGREGADO.' : 'MODIFICADO.'}.`
            setOpenSnackBar({ open: true, severity, vertical, title })
            if (success) {
                setActualizarData(!actualizarData)
                setOpenDrawer({ ...openDrawer, 'right': false })
                setSubPrestador(initialSubPrestador)
            }
        }
        setOpenConfirmacion(false)
        if (modo === "agregar") {
            const request = {
                idProveedor: idProveedor,
                nombre: subPrestador.nombre,
                cuit: subPrestador.cuit,
                idLocalidad: subPrestador.idLocalidad,
                direccion: subPrestador.direccion,
                latitudMaps: subPrestador.latitudMaps,
                longitudMaps: subPrestador.longitudMaps,
                telefono: subPrestador.telefono,
                email: subPrestador.email,
                idTipoSubPrestador: subPrestador.idTipoSubPrestador
            }
            dispatch(actions.saveSubPrestador(request, callback))
        }
        if (modo === "editar") {
            const request = {
                idSubPrestador: subPrestador.idSubPrestador,
                idProveedor: idProveedor,
                nombre: subPrestador.nombre,
                cuit: subPrestador.cuit,
                idLocalidad: subPrestador.idLocalidad,
                direccion: subPrestador.direccion,
                latitudMaps: subPrestador.latitudMaps,
                longitudMaps: subPrestador.longitudMaps,
                telefono: subPrestador.telefono,
                email: subPrestador.email,
                idTipoSubPrestador: subPrestador.idTipoSubprestador
            }
            dispatch(actions.updateSubPrestador(request, callback))
        }
    }
    
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
                    onClik={agregarSubPrestador}
                    color={'primary'}
                    startIcon={false}
                    disabled={disableButton}
                    width={'105px'}
                    height={'40px'}
                    label={importarSubPrestador ? 'Importar' : modo === 'agregar' ? "Agregar" : "Guardar"}
                    variant={"contained"}
                    isAction={true}
                    tipe
                />
            </Grid> </>)
    }

    const botonesHeader = [
        {
            cabecera: <Grid container spacing={2} justify='space-between' alignItems='flex-end'>
                <Grid item xs={3}>
                    <BuscadorContrataciones
                        onClick={handleBuscador}
                        placeholder={'Buscar'}
                        value={buscador}
                    />
                </Grid>
                <Grid item>
                    <Grid item container >
                        <CustomButton
                            label='Importar'
                            styleButton={{ width: '150px', height: '35px', marginRight: '20px' }}
                            startIcon={<img src={IconExcel} style={{ marginTop: '2px', color: '#505050' }} />}
                            styleLabel={{
                                fontSize: '15px',
                                fontWeight: 'normal',
                                fontStretch: 'normal',
                                fontStyle: 'normal',
                                lineHeight: 1.24,
                                letterSpacing: 'normal',
                                textAlign: 'left',
                                color: '#505050'
                            }}
                            color='primary'
                            variant='outlined'
                            onClik={handleImportar}
                            isAction={true}
                        />
                        <Grid item>
                            <CustomButton
                                label='Agregar sub prestador'
                                styleButton={{ height: '35px', marginRight: '20px' }}
                                startIcon={<Add style={{ color: '#505050' }} />}
                                styleLabel={{
                                    fontSize: '15px',
                                    fontWeight: 'normal',
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: 1.24,
                                    letterSpacing: 'normal',
                                    textAlign: 'left',
                                    color: '#505050'
                                }}
                                color='primary'
                                variant='outlined'
                                onClik={handleAgregarSubPrestador}
                                isAction={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        }
    ]

    return (
        <Grid container alignItems='center' justify={'center'} spacing={0}>
            
            {/* TABLA SUBPRESTADORES */}
            <Grid item xs={12}>
                <CustomTableContrataciones
                    botonesHeader={botonesHeader}
                    toolbar={true}
                    add={true}
                    buscador={true}
                    handleBuscador={handleBuscador}
                    data={dataSubPrestadores}
                    setData={setDataSubPrestadores}
                    cantTotal={datos && datos.cantidadTotal}
                    colorAvatar={false}
                    columnas={headerTablaListadoContacto}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    mensaje={false}
                    pagination={true}
                />
            </Grid>
            
            {/* DRAWER EDITAR SUBPRESTADOR */}
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                title={importarSubPrestador ? 'Importar sub prestador desde Excel' :
                    modo === 'editar' ? 'Editar sub prestador' : 'Agregar nuevo sub prestador'}
                width={importarSubPrestador ? null : '650px'}
            >
                <AdminSlide
                    contenido={importarSubPrestador ? contenido2 : contenido}
                    labelButtonSiguiente={null}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    activeStep={0}
                    setActiveStep={0}
                    maxSteps={0}
                    buttons={buttons()}
                />
            </Drawer2>
            
            {/* CONFIRMACION */}
            {openConfirmacion ?
                <CustomConfirmacion
                    openConfirmacion={openConfirmacion}
                    title={modo === 'agregar' ? 'Confirmar nuevo sub prestador' : 'Confirmar edición de sub prestador'}
                    text={modo === 'agregar' ?
                        <div>
                            ¿Desea confirmar la creación del nuevo sub prestador?
                        </div>
                        :
                        <div>
                            ¿Desea confirmar la edición del sub prestador?
                        </div>
                    }
                    handleCancelar={cancelarConfirmacion}
                    handleConfirmar={handleAceptarConfirmacion}
                />
            : null}
            
            {/* SNACK BAR */}
            <CustomSnackBar
                handleClose={()=>setOpenSnackBar({ open: false })}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity} 
                vertical={openSnackBar.vertical}
            />

        </Grid>
    )
}

TablaSubPrestadores.propTypes = {

}

export default TablaSubPrestadores