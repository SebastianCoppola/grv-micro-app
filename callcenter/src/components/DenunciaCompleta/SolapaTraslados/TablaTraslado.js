import React, { useEffect, useState } from 'react'
//Utils:
import Utils from '../../../Utils/utils'
import { SNACK_SEVERITY, SNACK_ERROR_DESCARGA } from '../../../Utils/const'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { IconButton, Tooltip } from '@material-ui/core'
import { Create, Delete, Visibility } from '@material-ui/icons'
//Components:
import CustomTable from '../../commons/Table/CustomTable'
import Drawer2 from '../../commons/CustomDrawer/Drawer'
import AdminSlide from '../../commons/Slider/AdminSlide'
import ConfirmarTraslado from '../../TrasladosDrawer/confirmarTraslado'
import IdaPaso4 from '../../TrasladosDrawer/AmbulanciaIda/Paso4'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'

const TablaTraslado = (props) => {

    const { data, setData, menuGeneral, cantidadTotal, setActualizarData,
        page, rowsPerPage, setPage, setRowsPerPage, actualizarData, opcionesPaginacion } = props

    const dispatch = useDispatch()
    const datos = useSelector(state => state.traslados.detalleTraslado ? state.traslados.detalleTraslado : null)
    const trasladosDescargar = useSelector(state => state.traslados.exportarTraslados ? state.traslados.exportarTraslados : null)

    const [rowConfirm, setRowConfirm] = useState(false)
    const [dataRowConfirm, setRowDataConfirm] = useState(null)
    const [valAgencia, setValAgencia] = useState(null)
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const [snackbar, setSnackbar] = useState({open:false, title:'', severity:'', vertical:''})
    const [activeStep, setActiveStep] = useState(0)

    const iconButtonStyle = {
        borderRadius: '5px',
        color: '#5e5e5d',
        border: '1px solid #d3d3d3',
        width: "40px",
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    }

    const columnasMaestroTraslados = [
        {
            title: "ACCIDENTADO", field: "accidentado",
            cellStyle: { textAlign: 'flex-start', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? row.nombreAccidentado : '')
        },
        {
            title: "DENUNCIA", field: "denuncia",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? Utils.nroAsignadoProvisorio3(row) : '')
        },
        {
            title: "RESPONSABLE", field: "responsable",
            cellStyle: { textAlign: 'flex-start', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ?
                Utils.stringNull(row.responsableCreacionNombre)
                + ' '
                + Utils.stringNull(row.responsableCreacionApellido)
                : ' - ')
        },
        {
            title: "FECHA RESERVA", field: "fechaReserva",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? Utils.formatoFecha(new Date(row.fechaReserva), 'dd/mm/yyyy') + ', ' + row.horaTraslado : ' - ')
        },
        {
            title: "RECORRIDO", field: "recorrido",
            cellStyle: { textAlign: 'center', minWidth: '200px', heigth: '100%', display: 'table-cell', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ?
                Utils.stringNull(row.direccionOrigen)
                + ' / '
                + Utils.stringNull(row.direccionDestino)
                + ' / '
                + Utils.stringNull(row.direccionDestinoRegreso)
                : '')
        },
        {
            title: "FECHA TURNO", field: "fechaTurno",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? Utils.formatoFecha(new Date(row.fechaTurno), 'dd/mm/yyyy') + ', ' + row.horaTurno : ' - ')
        },
        {
            title: "TIPO VIAJE", field: "tipoViaje",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? row.tipoViajeDescripcion : '')
        },
        {
            title: "TRANSPORTE", field: "Transporte",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? row.tipoTrasladoDescripcion : '')
        },
        {
            title: "ESTADO CEM", field: "estadoTrasladoDescripcion",
            cellStyle: { textAlign: 'center', fontSize: '12px' },
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 }
        },
        {
            title: "ACCIONES",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (
                <td>
                    <Tooltip title='Eliminar'>
                        <IconButton
                            size='small'
                            onClick={() => eliminarTraslado(row)}
                            style={iconButtonStyle}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={row.idEstadoTraslado === 2 ? 'Ver' : 'Confirmar'}>
                        <IconButton
                            size='small'
                            onClick={() => {
                                setRowConfirm(row)
                                setRowDataConfirm(row)
                            }}
                            style={iconButtonStyle}
                        >
                            { row.idEstadoTraslado === 2 ? 
                                <Visibility /> 
                            : 
                                <Create />
                            }
                        </IconButton>
                    </Tooltip>
                </td>
            )
        },
    ]

    const columnasSolapaTraslados = [
        {
            title: "RESPONSABLE", field: "responsable",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (row ? 
                Utils.stringNull(row.responsableCreacionNombre) + ' ' + Utils.stringNull(row.responsableCreacionApellido)
                : ''
            )
        },
        {
            title: "RECORRIDO", field: "recorrido",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (row ?
                Utils.stringNull(row.direccionOrigen)
                + ' / '
                + Utils.stringNull(row.direccionDestino)
                + ' / '
                + Utils.stringNull(row.direccionDestinoRegreso)
                : '')
        },
        {
            title: "FECHA TURNO", field: "fechaTurno",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (row ? Utils.formatoFecha(new Date(row.fechaTurno), 'dd/mm/yyyy') + ', ' + row.horaTurno : ' - ')
        },
        {
            title: "TIPO VIAJE", field: "tipoViaje",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (row ? row.tipoViajeDescripcion : '')
        },
        {
            title: "TRANSPORTE", field: "Transporte",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (row ? row.tipoTrasladoDescripcion : '')
        },
        {
            title: "ESTADO CEM", field: "estadoTrasladoDescripcion",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
        },
        {
            title: "ACCIONES",
            headerStyle: {fontSize:'12px'},
            cellStyle: {fontSize:'12px', padding:'5px 10px 5px 0'},
            render: row => (
                <td>
                    <Tooltip title='Eliminar'>
                        <IconButton
                            size='small'
                            onClick={() => eliminarTraslado(row)}
                            style={iconButtonStyle}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={row.idEstadoTraslado === 2 ? 'Ver' : 'Confirmar'}>
                        <IconButton
                            size='small'
                            onClick={() => {
                                setRowConfirm(row)
                                setRowDataConfirm(row)
                            }}
                            style={iconButtonStyle}
                        >
                            { row.idEstadoTraslado === 2 ? 
                                <Visibility /> 
                            : 
                                <Create />
                            }
                        </IconButton>
                    </Tooltip>
                </td>
            )
        },
    ]

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setRowConfirm(false)
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setRowConfirm(false)
    }

    useEffect(() => {
        if (rowConfirm) {
            setOpenDrawer({ ...openDrawer, 'right': true });
        }
    }, [rowConfirm])

    const contenido = [
        { texto: 
            <ConfirmarTraslado
                valAgencia={valAgencia}
                setValAgencia={setValAgencia}
                data={dataRowConfirm}
                detalleTraslado={datos}
                setSnackbar={setSnackbar}
            />
        },
        { texto: 
            <IdaPaso4 dataConfirm={dataRowConfirm} /> 
        }
    ]

    const maxSteps = contenido.length;

    const handleNext = () => {
        let request = {
            idTraslado: dataRowConfirm && dataRowConfirm.idTraslado,
            idProveedorServicioTraslado: valAgencia
        }
        dispatch(actions.confirmarTraslado(request, callback2))
    }

    const callback2 = (status, mensaje) => {
        if (status === SNACK_SEVERITY.SUCCESS) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setSnackbar({
                open: true,
                severity: status,
                title: mensaje
            })
        }
    }

    const handleBack = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setRowConfirm(false)
    }

    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setRowConfirm(false)
    }

    useEffect(() => {
        if (trasladosDescargar) {
            dispatch(actions.clearExportarTraslado())
            dispatch(actions.descargarPDFTraslado(trasladosDescargar, callBackDescargar))
        }
    }, [trasladosDescargar])

    const handleDescargarPDF = () => {
        let request = { idTraslado: dataRowConfirm && dataRowConfirm.idTraslado }
        dispatch(actions.getTrasladosDescargar(request, callBackDescargar))
    }

    const callBackDescargar = (bool) => {
        if (bool) {
            setSnackbar({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                title: SNACK_ERROR_DESCARGA,
            })
        }
    }

    useEffect(() => {
        if (!openDrawer.right) {
            setActualizarData(!actualizarData)
        }
    }, [openDrawer])

    useEffect(() => {
        setActiveStep(0);
        setValAgencia(null)
        if (rowConfirm) {
            dispatch(actions.fetchDetalleTraslado(dataRowConfirm ? dataRowConfirm.idTraslado : null))
        }
    }, [openDrawer])

    const eliminarTraslado = (row) => {
        dispatch(actions.eliminarTraslado(row ? row.idTraslado : null, callback))
    }

    const callback = (status, mensaje) => {
        setSnackbar({
            open: true,
            severity: status,
            title: mensaje
        })
        if (status === SNACK_SEVERITY.SUCCESS) {
            setActualizarData(!actualizarData)
        }
    }

    return (
        <>
            <CustomTable
                data={data} setData={setData}
                cantTotal={cantidadTotal}
                columnas={menuGeneral ? columnasMaestroTraslados : columnasSolapaTraslados}
                page={page} setPage={setPage}
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                opcionesPaginacion={opcionesPaginacion}
            />

            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                label={'Confirmar traslado'}
                variant={'contained'}
                button={false}
                handleButton={handleClose}
                title={`Denuncia `}
                width={'620px'}
            >
                <AdminSlide
                    contenido={contenido}
                    backBoton={true}
                    isAction={true}
                    labelBackBoton={'Cancelar'}
                    labelButtonSiguiente={dataRowConfirm && dataRowConfirm.idEstadoTraslado === 11 ?
                        ( activeStep !== maxSteps - 1 ? 'Confirmar traslado' : 'Cerrar' )
                    : null}
                    labelButtonDescargarPDF={dataRowConfirm && dataRowConfirm.idEstadoTraslado === 2 ?
                        ( activeStep !== maxSteps - 1 ? 'Descargar' : null ) 
                    : null}
                    handleNext={(activeStep !== maxSteps - 1 ? handleNext : handleGuardar)}
                    handleBack={handleBack}
                    handleDescargarPDF={handleDescargarPDF}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    variantButtonDescargar={'contained'}
                    valueHabilitadoSiguiente={valAgencia === null}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                />
            </Drawer2>

            <CustomSnackBar
                handleClose={()=>setSnackbar({ open: false })}
                open={snackbar.open}
                title={snackbar.title}
                severity={snackbar.severity}
                vertical={snackbar.vertical}
            />
        </>
    )
}

export default TablaTraslado