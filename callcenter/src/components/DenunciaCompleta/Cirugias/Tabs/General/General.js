import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core';
import { MoreVertOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import TablaAuditoriaMedica from '../../../../AuditoriasMedicas/commons/TablaAuditoriaMedica';
import IconButtonMenu from '../../../../commons/Menu/IconButtonMenu';
import PdfIcon from "../../../../../commons/assets/DenunciaCompleta/pdfFileIcon.svg";
import FiltrosCirugiaGeneral from './FiltrosCirugiaGeneral';
import TooltipAsignacionAnulada from './TooltipAsignacionAnulada';
import AgregarObservacion from '../../Drawers/AgregarObservacion/AgregarObservacion';
import { CircularProgress } from '@material-ui/core'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/'
import RealizarAnulacion from '../../Drawers/RealizarAnulacion/RealizarAnulacion';
import Utils from "../../../../../Utils/utils"

const useStyles = makeStyles({

  icons: {
      filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)'
  },
  iconBnt: {
      borderRadius: '5px',
      border: '1px solid #d3d3d3',
      width: "40px",
      color: '#5e5e5d',
      marginLeft: '2px',
      "&:hover": {
          backgroundColor: "transparent"
      },
  },
  iconBntObs: {
    borderRadius: '5px',
    border: '1px solid #d3d3d3',
    width: "83px",
    color: '#5e5e5d',
    marginLeft: '2px',
    "&:hover": {
        backgroundColor: "transparent"
    },
  },
  chipEstadoProgramada: {
    backgroundColor: "rgba(47, 97, 213, 0.1)",
    color: "#2f61d5",
    borderColor: "#2f61d5",
    border: 'solid 1px',
    borderRadius: '5px',
    padding: '5px 0px',
    fontSize: '10px',
    textAlign: 'center'
  },
  chipEstadoAnulada: {
      backgroundColor: "#f4f4f4",
      color: "#707070",
      borderColor: "#707070",
      border: 'solid 1px',
      borderRadius: '5px',
      padding: '5px 0px',
      fontSize: '10px',
      textAlign: 'center'
  },
  chipEstadoRealizada: {
    backgroundColor: "#e9f9f0",
    color: "#2dc76d",
    borderColor: "#2dc76d",
    border: 'solid 1px',
    borderRadius: '5px',
    padding: '5px 0px',
    fontSize: '10px',
    textAlign: 'center'
},
chipEstadoNoRealizada: {
  backgroundColor: "rgba(255, 112, 82, 0.1)",
  color: "#e34850",
  borderColor: "#e34850",
  border: 'solid 1px',
  borderRadius: '5px',
  padding: '5px 0px',
  fontSize: '10px',
  textAlign: 'center'
},
  chipEstadoDefault: {
      backgroundColor: "#e9e7e7",
      color: "#00000",
      borderColor: "#00000",
      border: 'solid 1px',
      borderRadius: '5px',
      padding: '5px 8px',
      fontSize: '12px',
      textAlign: 'center'
  }
})

const General = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const { denuncia, usuarioActivo } = props
    const [idCirugia, setIdCirugia] = useState(0);
    const [openDrawerObservaciones, setOpenDrawerObservaciones] = useState(false)
    const [openDrawerAnular, setOpenDrawerAnular] = useState(false)
    const [cirugiaAnulada, setCirugiaAnulada] = useState(false)
    const loadingDatosCirugiasPorDenuncia = useSelector(state=>state.cirugias.loadingDatosCirugiasPorDenuncia)
    const dataCirugiasGeneral = useSelector(state=>state.cirugias.dataCirugiasGeneral)
    const [requestFiltrosCirugias, setRequestFiltrosCirugias] = useState({
      idDenuncia: denuncia && denuncia.idDenuncia
    });
    //id para habilitar o no el boton de anular
    const idEstadoAnulada = 2;

    console.log(dataCirugiasGeneral)

    useEffect(()=>{
      getDatosCirugiasPorDenuncia()
    },[requestFiltrosCirugias])

    useEffect(()=>{
      if(cirugiaAnulada){
        getDatosCirugiasPorDenuncia()
        setCirugiaAnulada(false)
      }
    },[cirugiaAnulada])

    const getDatosCirugiasPorDenuncia = () => {
      let errorCallback = (bool) => {
          if(bool){
              dispatch(actions.setSnackBarAuditoria({
                  open: true, 
                  vertical: 'top',
                  severity: 'error', 
                  message: 'Ocurrió un error al intentar cargar los datos de las cirugias.'
              }))
          }
      }
      dispatch(actions.getDatosCirugiasPorDenuncia(requestFiltrosCirugias, errorCallback))
    }

    //Handle VER PDF
    const handleVerPDFpMedico = (row) => {
        console.log("PDF P. Medico for: ", row)
    }

    const handleVerPDFrxControl = (row) => {
        console.log("PDF rx Control for: ", row)
    }

    const handleObservaciones = (row) => {
      setIdCirugia(row.idCirugia)
      setOpenDrawerObservaciones(true)
    }

    const handleAnular = (row) => {
      setIdCirugia(row.idCirugia)
      setOpenDrawerAnular(true)
    }

    //Obtener estilo para el chip del estado
    const getChipClassName = (estado) => {
        switch (estado) {
            case 1 : return classes.chipEstadoProgramada
            case 2 : return classes.chipEstadoAnulada
            case 3 : return classes.chipEstadoRealizada
            case 5 : return classes.chipEstadoNoRealizada
            default: return classes.chipEstadoDefault
        }
    }

    const columnasTabla = [
        {
          title: "#AUTO",
          sorting: false,
          sorting: false,
          headerStyle: {
            fontSize: "12px",
            color: "#747474",
            fontWeight: "700",
            padding: "0px 10px 0px",
          },
          cellStyle: { fontSize: "12px", padding: "20px 10px 20px" },
          render: (row) => (row && row.numeroAutorizacion ? row.numeroAutorizacion : "-"),
        },
        {
          title: "FECHA AUTO",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.fechaAutorizacion ? Utils.dateFormato(row.fechaAutorizacion) : "-"),
        },
        {
          title: "FECHA CIRUGIA",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.fechaCirugia ? Utils.dateFormato(row.fechaCirugia) : "-"),
        },
        {
          title: "FECHA INDICACIÓN",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.fechaIndicacion ? Utils.dateFormato(row.fechaIndicacion) : "-"),
        },
        {
          title: "CENTRO MÉDICO",
          width: "10%",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.centroMedico ? row.centroMedico : "-"),
        },
        {
          title: "PRESTACIÓN",
          width: "10%",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.prestacion ? row.prestacion : "-"),
        },
        {
          title: "OBSERVACIÓN",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px" },
          render: (row) => (row && row.observacion ? row.observacion : "-"),
        },
        {
          title: "ESTADO",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: { fontSize: "12px", padding: "5px 10px", paddingRight: "20px"},
          render: (row) => (
            <div>
              <Typography className={getChipClassName(row.idEstado)} 
                  style={{ paddingLeft: "5px",paddingRight: "5px" }}
              >{row.estado}
              </Typography>
            </div>
          ),
        },
        {
          title: "ACCIONES",
          sorting: false,
          headerStyle: { fontSize: "12px", color: "#747474", fontWeight: "700" },
          cellStyle: {
            boxSizing: "inherit",
            fontSize: "12px",
            padding: "5px 10px",
          },
          render: (row) => (
            <span style={{ display: "flex" }}>
                    {row.idEstado === 2 ?
                       <TooltipAsignacionAnulada 
                          motivo={row.motivoAnulacionDescripcion}
                          comentario={row.observacionesAnulacion}/>
                    : null}
                    <IconButtonMenu
                        icon={<MoreVertOutlined />}
                        className={classes.iconBnt}
                        size="small"
                        options={ row.idEstado !== idEstadoAnulada ? [
                            <Typography onClick={() => handleVerPDFpMedico(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            ><img src={PdfIcon} />Ver P. Médico</Typography>,
                            <Typography onClick={() => handleVerPDFrxControl(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            ><img src={PdfIcon} />Ver Rx. Control</Typography>,
                            <Typography onClick={() => handleObservaciones(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            >Observaciones de cirugia</Typography>,
                            <Typography onClick={() => handleAnular(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            >Anular</Typography>
                        ] : [
                          <Typography onClick={() => handleVerPDFpMedico(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            ><img src={PdfIcon} />Ver P. Médico</Typography>,
                            <Typography onClick={() => handleVerPDFrxControl(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            ><img src={PdfIcon} />Ver Rx. Control</Typography>,
                            <Typography onClick={() => handleObservaciones(row)}
                                style={{ fontSize: '12px', display: 'flex', alignItems: 'center' }}
                            >Observaciones de cirugia</Typography>
                        ]
                        }></IconButtonMenu>
            </span>
          )
        },
      ];

    return (
        <Grid container xs={12} justify='center' alignItems='center'  style={{ minHeight: '200px' }}>
              <Grid item xs={12}>
                  <FiltrosCirugiaGeneral 
                    requestFiltrosCirugias={requestFiltrosCirugias}                      
                    setRequestFiltrosCirugias={setRequestFiltrosCirugias}/>
              </Grid>
              <Grid item xs={12} style = {{ marginTop : '20px' }}>
                  <TablaAuditoriaMedica
                      data={dataCirugiasGeneral && dataCirugiasGeneral.objetos && dataCirugiasGeneral.objetos.length ? dataCirugiasGeneral.objetos : []}
                      cantTotal={dataCirugiasGeneral && dataCirugiasGeneral.cantidadTotal}
                      columnas={columnasTabla}
                      page={page} setPage={setPage}
                      rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                      loading={loadingDatosCirugiasPorDenuncia}
                  />
              </Grid>
              <AgregarObservacion 
                  idCirugia={idCirugia}
                  openDrawerObservaciones={openDrawerObservaciones}
                  setOpenDrawerObservaciones={setOpenDrawerObservaciones}
                  usuarioActivo={usuarioActivo}
              />
              <RealizarAnulacion 
                  idCirugia={idCirugia}
                  openDrawerAnular={openDrawerAnular}
                  setOpenDrawerAnular={setOpenDrawerAnular}
                  setCirugiaAnulada={setCirugiaAnulada}
                  usuarioActivo={usuarioActivo}
              />
        </Grid>    
    )
}

export default General