import React, { useEffect, useState } from 'react'
//Redux:
import * as actions from '../../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
//Utils:
import Utils from '../../../Utils/utils'
import { COMPONENT_OBSERVACIONES, EDITAR_OBSERVACION, GUARDAR, NUEVA_OBSERVACION } from '../../../Utils/const'
import avatarJPG from '../../../commons/assets/DenunciaCompleta/seguimiento/Avatar.jpg'
//Mui:
import { Grid, IconButton, Input, makeStyles } from '@material-ui/core'
import { Edit, DeleteOutlineOutlined, ChatBubble } from "@material-ui/icons"
//Componentes
import CustomButton from '../../commons/Button/CustomButton'
import CustomTable from '../../commons/Table/CustomTable'
import EditarCargaObservacion from './EditarCargaObservacion'
import DrawerRight from '../../commons/CustomDrawer/DrawerRight'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'

const useStyles = makeStyles({
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
})

const TablaObservaciones = (props) => {

    const { idDenuncia, idOperador, setOpenBuscador, disableEdition } = props;

    const classes = useStyles(props)
    const dispatch = useDispatch()

    const dataObservaciones = useSelector(state => state.consultasReclamos.observaciones)
    const loadingObservacion = useSelector(state => state.consultasReclamos.loadingObservaciones)
    
    //Table:
    const [data, setData] = useState()
    const [dataSelect, setDataSelect] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Drawer:
    const [drawer, setDrawer] = useState({ open: false, title: '' })
    const [actualizarData, setActualizarData] = useState(false)
    const [disableGuardar, setDisableGuardar] = useState(true)
    const [editarObservacion, setEditarObservacion] = useState({ idObservacion: null, fecha: "", hora: "", observacion: "" })
    //Snack:
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })

    //On Change Pagination:
    useEffect(() => {
        setDataSelect([])
        buscarObservaciones()
    }, [page, rowsPerPage])

    //Ordenar Data Tabla
    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (dataObservaciones && dataObservaciones.cantidadTotal && dataObservaciones.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        const dataApi = dataObservaciones && dataObservaciones.objetos ? dataObservaciones.objetos.map(newData => {
            return ({
                idObservacion: newData && newData.idObservacion ? newData.idObservacion : null,
                responsable: newData && newData.responsable ? newData.responsable : '',
                avatarResponsable: avatarJPG,
                fechaCarga: newData && newData.fechaObservacion ? Utils.dateFormat(newData.fechaObservacion) : '',
                horaCarga: newData && newData.fechaObservacion ? Utils.time24h(newData.fechaObservacion) : '',
                observacion: newData && newData.comentario ? newData.comentario : '',
                imagenResponsable: newData && newData.imagenResponsable
            })
        }) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (dataObservaciones && dataObservaciones.cantidadTotal && lengthData < dataObservaciones.cantidadTotal) {
            for (let index = lengthData; index < dataObservaciones.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])
    }, [dataObservaciones])
    
    //Buscar Observaciones
    const buscarObservaciones = () => {
        const requestObservaciones = {
            limit: rowsPerPage,
            offset: (page * rowsPerPage),
            idDenuncia: idDenuncia && idDenuncia,
        }
        dispatch(actions.searchObservaciones(requestObservaciones))
    }

    //Drawer Editar Observación:
    const handleEditar = (row) => {
        setEditarObservacion({
            idObservacion: row.idObservacion,
            fecha: Utils.dateFormat2(row.fechaCarga),
            hora: row.horaCarga,
            observacion: row.observacion
        })
        setDrawer({ open: true, title: EDITAR_OBSERVACION})
        setOpenBuscador(false)
    }

    //Drawer Agregar Observación:
    const handleAgregar = () => {
        setEditarObservacion({ idObservacion: null, fecha: "", hora: "", observacion: "" })
        setDrawer({ open: true, title: NUEVA_OBSERVACION})
        setOpenBuscador(false)
    }

    //Drawer Close
    const handleCloseDrawer = () => {
        setDrawer({ open: false, title: '' })
        setOpenBuscador(true)
    }

    //Eliminar Observación: 
    const handleEliminar = () => {
        let callBackEliminar = (succes, message) => {
            setOpenSnackBar({
                open: true,
                severity: succes ? 'success' : 'error',
                vertical: succes ? 'bottom' : 'top',
                title: message,
            })
            setDataSelect([])
            buscarObservaciones()
        }
        const requestDeleteObservaciones = { idsObservacion: dataSelect }
        dispatch(actions.eliminarObservaciones(requestDeleteObservaciones, callBackEliminar))
    }

    const columnasTabla = [
        {
            title: "RESPONSABLE", field: "responsable",
            cellStyle: { width: '15%', fontSize: '12px' }, headerStyle: { fontSize: '12px' },
            render: row =>
                <Grid container alignItems='center'>
                    <Grid item >
                        {Utils.deserializeImagenToBlob(row.imagenResponsable, row.avatarResponsable)}
                    </Grid>
                    <Grid item style={{ wordBreak: 'break-word', padding: '0px 7px' }}>
                        <span>{row.responsable}</span>
                    </Grid>
                </Grid>,
            editComponent: editProps => (
                <Input
                    autoFocus={true}
                    onChange={e => editProps.onChange(e.target.value)}
                />
            )
        },
        {
            title: "FECHA", field: "fechaCarga",
            cellStyle: { width: '15%', fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "HORA", field: "horaCarga",
            cellStyle: { width: '15%', fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "OBSERVACIÓN", field: "observacion",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "ACCIONES", field: "acciones",
            cellStyle: { width: '0%', fontSize: '12px' },
            render: row =>
                <IconButton
                    disabled={disableEdition}
                    className={classes.iconBnt}
                    size="small"
                    onClick={() => handleEditar(row)}
                >
                    <Edit htmlColor={'#747474'} />
                </IconButton>
        }
    ]
    
    const contenidoDrawer = [
        <EditarCargaObservacion
            buscarObservaciones={buscarObservaciones}
            actualizarData={actualizarData}
            setActualizarData={setActualizarData}
            setOpenSnackBar={setOpenSnackBar}
            idDenuncia={idDenuncia && idDenuncia}
            idOperador={idOperador}
            setDisableGuardar={setDisableGuardar}
            editarObservacion={editarObservacion}
            setEditarObservacion={setEditarObservacion}
            drawer={drawer}
            setDrawer={setDrawer}
        />
    ]

    const botonesDrawer = [
        <Grid container justify='flex-end'>
            <CustomButton
                onClik={ () => setActualizarData(true) }
                disabled={disableGuardar}
                label={GUARDAR}
                isAction={true}
                color={'primary'}
                variant={"contained"}
            />
        </Grid>
    ]

    return (
        <div>
            <Grid container direction={'row'} alignItems={'center'} spacing={2}>
                <Grid item xs={12} container justify='flex-end'>
                    <CustomButton
                        label='Nueva Observación'
                        onClik={handleAgregar}
                        startIcon={<ChatBubble />}
                        disabled={disableEdition}
                        variant='outlined'
                        styleButton={{ minWidth: '200px' }}
                    />
                    <CustomButton
                        label={"Eliminar"}
                        onClik={handleEliminar}
                        startIcon={<DeleteOutlineOutlined />}
                        disabled={disableEdition || dataSelect.length === 0}
                        variant='outlined'
                        styleButton={{ minWidth: '100px', marginLeft: '10px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        data={data} setData={setData}
                        cantTotal={dataObservaciones && dataObservaciones.cantidadTotal && dataObservaciones.cantidadTotal}
                        loading={loadingObservacion}
                        columnas={columnasTabla}
                        page={page} setPage={setPage}
                        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                        selection={!disableEdition}
                        dataSelect={dataSelect}
                        setDataSelect={setDataSelect}
                        component={COMPONENT_OBSERVACIONES}
                    />
                </Grid>
                <DrawerRight 
                    openDrawer={drawer.open}
                    closeDrawer={handleCloseDrawer}
                    contenido={[contenidoDrawer]}
                    stepper={null}
                    botones={[botonesDrawer]}
                    title={drawer.title}
                    width={500}
                />
            </Grid>

            <CustomSnackBar
                handleClose={() => setOpenSnackBar({ open: false })}
                open={openSnackBar.open}
                vertical={openSnackBar.vertical}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
        </div>
    )
}

export default TablaObservaciones
