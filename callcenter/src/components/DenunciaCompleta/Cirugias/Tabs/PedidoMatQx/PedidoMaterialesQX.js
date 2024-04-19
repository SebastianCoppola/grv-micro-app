import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'
//Mui:
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Check } from '@material-ui/icons'
//Icons:
import PdfIcon from "../../../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg"
//Components:
import TablaAuditoriaMedica from '../../../../AuditoriasMedicas/commons/TablaAuditoriaMedica'
import ValidarMateriales from '../../Drawers/ValidarMateriales/ValidarMateriales'
import Utils from '../../../../../Utils/utils'
import { ID_CERRADO_PED_MATERIALES_QX } from '../../../../../Utils/const'

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
    iconBtnChecked: {
        borderRadius: '5px',
        border: '1px solid #2dc76d',
        background: '#e9f9f0',
        width: '40px',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    iconChecked: {
        background:'#2dc76d', 
        borderRadius:'50px', 
        color:'#ffff', 
        fontSize:'20px', 
        padding:'2px'
    },
    estadoBoxCerrado: {
        display:'inline',
        padding: '5px 9px',
        border: '1px solid #2dc76d',
        background: '#e9f9f0',
        color: '#2dc76d',
        borderRadius: '5px',
        fontSize: '10px'
    },
    estadoBoxCancelado: {
        display:'inline',
        padding: '5px 9px',
        border: '1px solid #bcbcbc',
        background: '#eaeaea',
        color: '#bcbcbc',
        borderRadius: '5px',
        fontSize: '10px'
    },
    estadoBoxRechazado: {
        display:'inline',
        padding: '5px 9px',
        border: '1px solid #e34850',
        background: 'rgba(255, 112, 82, 0.1)',
        color: '#e34850',
        borderRadius: '5px',
        fontSize: '10px'
    },
    estadoBoxGenerico: {
        display:'inline',
        padding: '5px 0px',
        border: '1px solid #5151d3',
        background: '#e9f3fd',
        color: '#5151d3',
        borderRadius: '5px',
        fontSize: '10px'
    },
})

const PedidoMaterialesQX = (props) => {
    const { denuncia, usuarioActivo } = props
    const classes = useStyles(props)
    //Tabla:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Redux:
    const dispatch = useDispatch()
    const [pedidoValidado, setPedidoValidado] = useState(false)
    const dataPedidoMaterialesQX = useSelector(state => state.auditoriaMedica.dataPedidoMaterialesQX)
    const loadingPedidoMaterialesQX = useSelector(state => state.auditoriaMedica.loadingPedidoMaterialesQX)
    const loadingDescargarPdfOrdenMedica = useSelector(state => state.importarExportar.loadingDescargarPdfOrdenMedica)

    useEffect(()=>{
        getDataPedidoMaterialesQX()
    },[])

    useEffect(()=>{
        getDataPedidoMaterialesQX()
    },[rowsPerPage, page])

    useEffect(()=>{
        if(pedidoValidado){
          getDataPedidoMaterialesQX()
          setPedidoValidado(false)
        }
      },[pedidoValidado])
    
    //Get Data Tabla:
    const getDataPedidoMaterialesQX = () => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar cargar los pedidos.'
                }))
            }
        }
        let req = {
            // idDenuncia: 200791,
            idDenuncia: denuncia && denuncia.idDenuncia,
            limit : rowsPerPage,
            offset: rowsPerPage * page
        }
        dispatch(actions.getDataPedidoMaterialesQX(req, errorCallback))
    }
    
    //Handle PDF:
    const handlePDF = (row) => {
        let errorCallBack = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar descargar la orden médica.'
                }))
            }
        }
        let req = {nombrePDF: row.archivoOrdenMedica}
        dispatch(actions.getPdfOrdenMedica(req, errorCallBack))
    }


    //Select className 
    const classNamePicker = (idEstado) => {
        switch(idEstado){
            case 3: return classes.estadoBoxRechazado
            case 4: return classes.estadoBoxCerrado
            case 5: return classes.estadoBoxCancelado
            default: return classes.estadoBoxGenerico
        }
    }

    //Columnas Tabla:
    const columnasTabla = [
        {
            title: '#PEDIDO', sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row && row.idPedidoMaterialQuirurgico ? row.idPedidoMaterialQuirurgico : "-")
        },
        {
            title: "#AUTO", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row && row.idAutorizacion ? row.idAutorizacion : "-")
        },
        {
            title: "#AUTO CIRUGÍA", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row && row.idAutorizacionCirugia ? row.idAutorizacionCirugia : "-")
        },
        {
            title: "FECHA PEDIDO", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row && row.fechaCreacionPedido ? Utils.formatoFecha(new Date(row.fechaCreacionPedido), 'dd/mm/yyyy') : "-")
        },
        {
            title: "FECHA CIRUGÍA", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row && row.fechaCirugia ? Utils.formatoFecha(new Date(row.fechaCirugia), 'dd/mm/yyyy') : "-")
        },
        {
            title: "ESTADO", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0 10px' },
            cellStyle: { fontSize: '12px', alignContent: 'left', padding: '5px 10px' },
            render: row => (
                <Typography className={classNamePicker(row.idEstado)} noWrap>
                    {row.descripcionEstado ? row.descripcionEstado : '-'}
                </Typography>
            )
        },
        {
            title: "FECHA CIERRE", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (row.fechaCierre ? Utils.formatoFecha(new Date(row.fechaCierre), 'dd/mm/yyyy') : "-")
        },
        {
            title: "ORDEN M.", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0 10px' },
            cellStyle: { fontSize: '12px', alignContent: 'left', padding: '5px 10px' },
            render: row => (
                <span style={{ display: "flex" }}>
                    <IconButton className={classes.iconBnt} size="small" onClick={()=>handlePDF(row)} >
                        <img src={PdfIcon} />
                    </IconButton>
                </span>
            )
        },
        {
            title: "ACCIONES", sorting: false,
            headerStyle: { fontSize: '12px', color: '#747474', fontWeight: '700', padding: '0px 10px 0px 0px' },
            cellStyle: { fontSize: '12px', padding: '5px 10px 5px 0' },
            render: row => (
                <ValidarMateriales pedido={row} denuncia={denuncia} usuarioActivo={usuarioActivo} validado={row.idEstado === ID_CERRADO_PED_MATERIALES_QX}
                                   setPedidoValidado={setPedidoValidado}/> 
            )
        }
    ]

    return (
        <Grid container xs={12} justify='center' alignItems='center' style={{ minHeight: '300px' }}>
            <Grid item xs={12}>
                <TablaAuditoriaMedica
                    data={dataPedidoMaterialesQX && dataPedidoMaterialesQX.objetos && dataPedidoMaterialesQX.objetos.length ? dataPedidoMaterialesQX.objetos : []}
                    cantTotal={dataPedidoMaterialesQX && dataPedidoMaterialesQX.cantidadTotal}
                    columnas={columnasTabla}
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                    loading={loadingPedidoMaterialesQX || loadingDescargarPdfOrdenMedica}
                />
            </Grid>
        </Grid>
    )
}

export default PedidoMaterialesQX