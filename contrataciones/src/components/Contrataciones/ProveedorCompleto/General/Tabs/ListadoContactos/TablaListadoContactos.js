import React, { useState, useEffect } from 'react'
//Utils:
import { ACCIONES_CONTACTO, AGREGAR, CANCELAR, EDITAR, SNACK_SEVERITY, SNACK_VERTICAL } from '../../../../../../Utils/const'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions/index'
//Mui:
import { Grid, IconButton } from '@material-ui/core'
import { Edit, Add, DeleteOutline } from "@material-ui/icons"
//Components:
import CustomTableContrataciones from "../../../../../../components/commons/Table/CustomTableContrataciones"
import DrawerRight from '../../../../../commons/CustomDrawer/DrawerRight'
import CustomButton from '../../../../../commons/Button/CustomButton'
import DrawerListadoContactos from './DrawerListadoContactos'
import CustomConfirmacion from '../../../../../commons/Dialogo/CustomConfirmacion'
import BuscadorContrataciones from '../../../../../commons/Buscador/BuscadorContrataciones'
import CustomSnackBar from '../../../../../commons/SnackBar/CustomSnackBar'
//Icons:
import SVGadministrativo from "../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/Administrativo.svg"
import SVGmedico from "../../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/Medico.svg"

const TablaListadoContactos = props => {

    const { data, usuarioActivo, idProveedor, buscarContactos,
        page, setPage, rowsPerPage, setRowsPerPage } = props
    
    const dispatch = useDispatch()

    const dataVisibilidad = useSelector(state => state.listados.tipoVisibilidad)
    const loading = useSelector(state => state.proveedor.loadingBusquedaListadoContactos)
   
    const initialContacto = {
        idTipoContacto: null,
        nombre: '',
        telefono: '',
        mail: '',
        idTipoVisibilidad: null,
        esAdministrativoPrincipal: false
    }

    const cantidad = data.cantidadTotal ? data.cantidadTotal : null
    const [dataListadoContacto, setDataListadoContacto] = useState(data.objetos ? data.objetos : null)

    const [buscador, setBuscador] = useState(null)
    const [contacto, setContacto] = useState(initialContacto)
    const [confirmarEliminar, setConfirmarEliminar] = useState(false)
    const [snackbar, setSnackbar] = useState({open:false, title:'', severity:'', vertical:''})
    const [drawer, setDrawer] = useState({open: false, title: '', isEditar: false})
    

    useEffect(() => {
        dispatch(actions.searchTipoVisibilidad())
    }, [])

    useEffect(() => {
        const dataRellenar = []
        const dimension = page * rowsPerPage
        if (data && data.cantidadTotal && data.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = data && data.objetos ? data.objetos : []
        const dataRestante = []
        const lengthData = dataRellenar.length + dataApi.length
        if (data && data.cantidadTotal && lengthData < data.cantidadTotal) {
            for (let index = lengthData; index < data.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setDataListadoContacto([...dataRellenar, ...dataApi, ...dataRestante])
    }, [data])

    const handleBuscador = (data) => {
        setBuscador(data)
        let request = null
        if (idProveedor !== null) {
            request = {
                idProveedor: idProveedor,
                limit: rowsPerPage,
                offset: page * rowsPerPage,
                criterioBusqueda: data
            }
            dispatch(actions.busquedaContactos(request))
        }
    }

    const handleAgregarContacto = () => {
        let callback = (success) => {
            setSnackbar({
                open: true,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                title: success ? ACCIONES_CONTACTO.AGREGADO : ACCIONES_CONTACTO.AGREGADO_ERROR
            })
            if (success) {
                setDrawer({open: false, isEditar: false, title: ''})
                setContacto(initialContacto)
                buscarContactos()
            }
        }
        let req = {
            ...contacto,
            idProveedor: idProveedor,
            idResponsable: usuarioActivo.id
        }
        dispatch(actions.saveContacto(req, callback))
    }

    const handleEditarContacto = () => {
        let callback = (success) => {
            setSnackbar({
                open: true,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                title: success ? ACCIONES_CONTACTO.EDITADO : ACCIONES_CONTACTO.EDITADO_ERROR
            })
            if (success) {
                setDrawer({open: false, isEditar: false, title: ''})
                setContacto(initialContacto)
                buscarContactos()
            }
        }
        let req = {
            ...contacto,
            idProveedor: idProveedor,
            idResponsable: usuarioActivo.id,
        }
        dispatch(actions.updateContacto(req, callback))
    }

    const handleEliminarContacto = () => {
        let callback = (success) => {
            setSnackbar({
                open: true,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                title: success ? ACCIONES_CONTACTO.ELIMINADO : ACCIONES_CONTACTO.ELIMINADO_ERROR
            })
            if (success) {
                setConfirmarEliminar(false)
                setContacto(initialContacto)
                buscarContactos()
            }
        }
        let request = { idProveedor: idProveedor, idContacto: contacto.idContacto }
        dispatch(actions.deleteContacto(request, callback))
    }

    const handleDisableAceptar = () => {
        let { idTipoContacto, nombre, telefono, mail, idTipoVisibilidad } = contacto
        let disabled = idTipoContacto !== 4 ? 
            !(idTipoContacto && nombre && telefono && mail && idTipoVisibilidad)
            : !(idTipoContacto && nombre && telefono && mail)
        return disabled
    }

    const columnasTabla = [
        {
            title: "TIPO DE CONTACTO", field: "tipoContacto",
            cellStyle: { color: '#505050', fontSize: '12px', minWidth: '150px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <Grid container alignItems={'center'} >
                    {row.idVisibilidad === 1 ?
                        (<Grid item style={{ margin: '5px' }} >
                            <img src={SVGadministrativo} ></img>
                        </Grid>)
                        :
                        (<Grid item style={{ margin: '5px', }}>
                            <img src={SVGmedico} ></img>
                        </Grid>)
                    }
                    <Grid item style={{ marginLeft: '8px' }}>
                        {row.tipoContacto}
                    </Grid>
                </Grid>
            )
        },
        {
            title: "NOMBRE", field: "nombreContacto",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "TELÉFONO", field: "telefonoContacto",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "MAIL", field: "mailContacto",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "ACCIONES", field: "acciones",
            cellStyle: { color: '#505050', fontSize: '12px', width: '10%' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <Grid container >
                    <Grid item>
                        <IconButton 
                            style={{
                                "&:hover": { backgroundColor: "transparent"},
                                borderRadius: '5px',
                                border: '1px solid #d3d3d3',
                                width: "40px",
                                height: "40px",
                                marginLeft: '4px'
                            }} 
                            size="small" 
                            onClick={()=>{
                                setContacto({
                                    idContacto: row.idContacto,
                                    idTipoVisibilidad: row.idVisibilidad,
                                    idTipoContacto: row.idTipoContacto,
                                    nombre: row.nombreContacto,
                                    telefono: row.telefonoContacto,
                                    mail: row.mailContacto,
                                })
                                setDrawer({open: true, title: 'Editar contacto', isEditar: true})
                            }} 
                        >
                            <Edit htmlColor={'#323232'} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton 
                            style={{
                                "&:hover": { backgroundColor: "transparent"},
                                borderRadius: '5px',
                                border: '1px solid #d3d3d3',
                                width: "40px",
                                height: "40px",
                                marginLeft: '10px',
                            }} 
                            size="small" 
                            disabled={row && row.esAdministrativoPrincipal} 
                            onClick={() => {
                                setConfirmarEliminar(true)
                                setContacto({
                                    tipoContacto: row && row.idTipoContacto,
                                    visibilidad: row && row.idVisibilidad,
                                    nombre: row && row.nombreContacto,
                                    telefono: row && row.telefonoContacto,
                                    mail: row && row.mailContacto,
                                    idContacto: row && row.idContacto
                                })
                            }} 
                        >
                            <DeleteOutline />
                        </IconButton>
                    </Grid>
                </Grid>)
        },
    ]

    const headerTabla = [{
        button: (
            <CustomButton
                label='Agregar contacto'
                styleButton={{ width: '173px', height: '35px', }}
                startIcon={<Add style={{ marginTop: '2px', color: '#505050' }} />}
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
                variant='outlined'
                onClik={()=>setDrawer({ open: true, isEditar: false, 'title': 'Agregar nuevo contacto' })}
            />
        ),
        buscador: (
            <BuscadorContrataciones
                onClick={handleBuscador}
                placeholder={"Buscar"}
                value={buscador}
            />
        )
    }]

    const contenidoDrawer = [
        <DrawerListadoContactos 
            dataVisibilidad={dataVisibilidad}
            drawer={drawer}
            contacto={contacto} 
            setContacto={setContacto}
        />
    ]

    const botonesDrawer = [
        <Grid container justify='flex-end'>
            <CustomButton
                onClik={()=>{
                    setDrawer({open: false, title: '', isEditar: false})
                    setContacto(initialContacto)
                }}
                disabled={false}
                label={CANCELAR}
                isAction={true}
                color='secondary'
                variant="outlined"
                styleButton={{marginRight:15}}
            />
            <CustomButton
                onClik={drawer.isEditar ? handleEditarContacto : handleAgregarContacto}
                disabled={handleDisableAceptar()}
                label={drawer.isEditar ? EDITAR : AGREGAR}
                isAction={true}
                color='primary'
                variant='contained'
                styleButton={{marginRight:15}}
            />
        </Grid>
    ]

    return (
        <Grid container alignItems='center' justify={'center'} spacing={0}>
            
            <Grid item xs={12}>
                <CustomTableContrataciones
                    data={dataListadoContacto}
                    setData={setDataListadoContacto}
                    cantTotal={cantidad}
                    columnas={columnasTabla}
                    colorAvatar={false}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    botonesHeader={headerTabla}
                    toolbar={true}
                    add={true}
                    buscador={true}
                    handleBuscador={handleBuscador}
                    loading={loading}
                    pagination={true}
                />
            </Grid>

            <DrawerRight 
                openDrawer={drawer.open}
                closeDrawer={()=>{
                    setDrawer({open: false, title: ''})
                    setContacto(initialContacto)
                }}
                contenido={[contenidoDrawer]}
                stepper={null}
                botones={[botonesDrawer]}
                title={drawer.title}
                width={500}
            />

            <CustomConfirmacion
                openConfirmacion={confirmarEliminar}
                title='Confirmar eliminacion de contacto'
                text={<div>¿Desea eliminar el contacto?</div>}
                handleCancelar={() => setConfirmarEliminar(false)}
                handleConfirmar={handleEliminarContacto}
            />
            
            <CustomSnackBar
                handleClose={()=>setSnackbar({open: false})}
                open={snackbar.open}
                title={snackbar.title}
                severity={snackbar.severity} 
                vertical={snackbar.vertical}
            />

        </Grid>
    )
}

export default TablaListadoContactos
