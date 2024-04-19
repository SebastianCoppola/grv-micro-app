import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../.././../../redux/actions'
//Mui:
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Block } from '@material-ui/icons'
//Components:
import TablaAuditoriaMedica from '../../../../AuditoriasMedicas/commons/TablaAuditoriaMedica'
import AprobarAutorizacionDrawer from '../../Drawers/DictaminarAutorizacion/AprobarAutorizacionDrawer'
//Icons:
import PdfIcon from "../../../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg"
import CustomSnackBar from '../../../../commons/SnackBar/CustomSnackBar'

const useStyles = makeStyles({
    iconBnt: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    chipEstado: {
        display: 'inline',
        padding: '5px 8px',
        border: 'solid 1px',
        borderRadius: '5px',
        fontSize: '12px',
    },
    chipEstadoPendienteAprobacion: {
        borderColor: "#fdc800",
        color: "#fdc800",
        backgroundColor: "rgba(255, 205, 113, 0.27)",
    },
    chipEstadoAprobado: {
        borderColor: "#2dc76d",
        color: "#2dc76d",
        backgroundColor: "#e9f9f0",
    },
    chipEstadoPreAprobado: {
        borderColor: "#5151d3",
        color: "#5151d3",
        backgroundColor: "rgba(47, 97, 213, 0.1)",
    },
    chipEstadoRechazado: {
        borderColor: "#e34850",
        color: "#e34850",
        backgroundColor: "rgba(255, 112, 82, 0.1)",
    },
    chipEstadoAprobadoSinTraslado: {
        borderColor: "#2dc76d",
        color: "#2dc76d",
        backgroundColor: "#e9f9f0",
    },
    chipEstadoDefault: {
        borderColor: "#2dc76d",
        color: "#2dc76d",
        backgroundColor: "#e9f9f0",
    },
})

const AutorizacionesPendientes = (props) => {
    const { denuncia } = props
    const classes = useStyles()
    //Table:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Reducers:
    const dispatch = useDispatch()
    const loadingPracticasPendientesAutorizacion = useSelector(state => state.auditoriaMedica.loadingPracticasPendientesAutorizacion)
    const dataPracticasPendientesAutorizacion = useSelector(state => state.auditoriaMedica.dataPracticasPendientesAutorizacion)
    //Snackbar
    const snackBarAuditoria = useSelector(state => state.auditoriaMedica.snackBarAuditoria)

    //Get data tabla cuando cambia page o rowsPerPage FILTROS:
    useEffect(() => {
        const errorCallback = (bool) => {
            if (bool) {
                dispatch(actions.setSnackBarAuditoria({
                    open: true,
                    severity: 'error',
                    message: 'Ocurrió un error al intentar cargar los datos de la tabla.',
                    vertical: 'top'
                }))
            }
        }
        let req = { "idDenuncia": denuncia && denuncia.idDenuncia, offset: page * rowsPerPage, limit: rowsPerPage }
        dispatch(actions.getDataPracticasPendientesAutorizacion(req, errorCallback))
    }, [page, rowsPerPage])

    //Action PDF
    const handlePDF = (row) => {
        console.log("PDF for: ", row)
    }

    //Action Block
    const handleBlock = (row) => {
        console.log("Block for: ", row)
    }

    //Devuelve la clase para el chip estadoDescripcion según el estado de la autorización. 
    const getChipClassName = (idEstado) => {
        switch (idEstado) {
            case 1: return classes.chipEstadoPendienteAprobacion
            case 2: return classes.chipEstadoAprobado
            case 4: return classes.chipEstadoPreAprobado
            case 3: return classes.chipEstadoRechazado
            case 3: return classes.chipEstadoAprobadoSinTraslado
            default: return classes.chipEstadoDefault
        }
    }

    //Columnas Tabla:
    const columnasTabla = [
        {
            title: "AUDITORÍA", field: "nroAutorizacion", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px' },
            render: row => (row && row.nroAutorizacion ? row.nroAutorizacion : "-")
        },
        {
            title: "TIPO", field: "tipo", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px' },
            render: row => (row && row.tipo ? row.tipo : "-")
        },
        {
            title: "FECHA AUTORIZADA", field: "fechaAutorizada", width: '10%', sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px' },
            render: row => (row && row.fechaAutorizada ? row.fechaAutorizada : "-")
        },
        {
            title: "FECHA TURNO", field: "fechaTurno", width: '10%', sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px' },
            render: row => (row && row.fechaTurno ? row.fechaTurno : "-")
        },
        {
            title: "CENTRO MEDICO", field: "centroMedico", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px' },
            render: row => (row && row.centroMedico ? row.centroMedico : "-")
        },
        {
            title: "ESTADO", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { fontSize: '12px', padding: '5px 10px', width: 'auto' },
            render: row =>
                <div>
                    <Typography className={`${classes.chipEstado} ${getChipClassName(row.idEstadoAutorizacion)}`}>
                        {row.estadoAutorizacion}
                    </Typography>
                </div>
        },
        {
            title: "ACCIONES", field: "acciones", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700' },
            cellStyle: { boxSizing: 'inherit', fontSize: '12px', padding: '5px 10px' },
            render: row =>
                <div style={{ display: 'flex' }}>

                    <AprobarAutorizacionDrawer autorizacionPendiente={row} denuncia={denuncia} />

                    <IconButton size='small' onClick={() => handlePDF(row)} className={classes.iconBnt}>
                        <img src={PdfIcon} />
                    </IconButton>

                    <IconButton size='small' onClick={() => handleBlock(row)} className={classes.iconBnt}>
                        <Block />
                    </IconButton>

                </div>
        }
    ]

    return (
        <Grid container xs={12} justify='center' alignItems='center' style={{ minHeight: '300px' }}>
            <Grid item xs={12}>
                <TablaAuditoriaMedica
                    data={dataPracticasPendientesAutorizacion && dataPracticasPendientesAutorizacion.objetos && dataPracticasPendientesAutorizacion.objetos.length ? dataPracticasPendientesAutorizacion.objetos : []}
                    cantTotal={dataPracticasPendientesAutorizacion && dataPracticasPendientesAutorizacion.cantidadTotal ? dataPracticasPendientesAutorizacion.cantidadTotal : 0}
                    columnas={columnasTabla}
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                    loading={loadingPracticasPendientesAutorizacion}
                />
            </Grid>
            <CustomSnackBar
                handleClose={() => dispatch(actions.setSnackBarAuditoria({ open: false }))}
                open={snackBarAuditoria.open}
                title={snackBarAuditoria.message}
                severity={snackBarAuditoria.severity}
                vertical={snackBarAuditoria.vertical ? snackBarAuditoria.vertical : 'bottom'}
            />
        </Grid>
    )
}

export default AutorizacionesPendientes