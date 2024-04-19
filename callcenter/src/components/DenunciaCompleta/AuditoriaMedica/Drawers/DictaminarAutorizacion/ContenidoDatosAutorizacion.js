import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'
//Mui:
import { Divider, FormControl, CircularProgress, FormHelperText, Grid, makeStyles, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { DirectionsCar, Check } from '@material-ui/icons'
//Icons:
import Printer from "../../../../../commons/assets/auditoriaMedica/printer.svg"
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'
import { getPdfAutorizacion } from '../../../../../redux/actions/importarExportar'

const useStyles = makeStyles({
    chipEstado1: {
        backgroundColor: "#e9f3fd",
        color: "#5151d3",
        borderColor: "#5151d3",
        border: 'solid 1px',
        borderRadius: '5px',
        padding: '5px 8px',
        fontSize: '12px',
        textAlign: 'center'
    },
    chipEstado2: {
        backgroundColor: "var(--e-9-f-9-f-0-1-b)",
        color: "#2dc76d",
        borderColor: "#2dc76d",
        border: 'solid 1px',
        borderRadius: '5px',
        padding: '5px 8px',
        fontSize: '12px',
        textAlign: 'center'
    },
    chipEstado3: {
        backgroundColor: "rgba(255, 205, 113, 0.27)",
        color: "#f29423",
        borderColor: "#f29423",
        border: 'solid 1px',
        borderRadius: '5px',
        padding: '5px 8px',
        fontSize: '12px',
        textAlign: 'center'
    },
    iconTrasladoSolicitado: {
        fontSize: '18px',
        fontWeight: 700,
        background: '#ffff',
        color: '#f5a547',
        borderRadius: 50,
        padding: 3
    },
    chipTrasladoSolicitado: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#f5a547',
        color: '#ffff',
        borderRadius: 5,
        fontSize: 14,
        padding: '8px 12px',
        letterSpacing: 1
    },
    scrollBar: {
        maxHeight: '400px',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            background: "#f1f1f1",
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        },
    }
})

const ContenidoDatosAutorizacion = (props) => {
    const { numeroAutorizacion, request, setRequest, setNumero } = props
    const classes = useStyles()
    //Redux:
    const dispatch = useDispatch()
    const dataBack = useSelector(state => state.auditoriaMedica.dataDetalleAutorizacionPendiente)
    const loadingData = useSelector(state => state.auditoriaMedica.loadingDetalleAutorizacionPendiente)
    const loadingImprimirPdfAutorizacion = useSelector(state => state.importarExportar.loadingImprimirPdfAutorizacion)
    //Estados:
    const [comentarioDictamen, setComentarioDictamen] = useState(null)

    useEffect(() => setNumero(dataBack && dataBack.nroAutorizacion), [dataBack])

    //Busco el detalle de la autorización: 
    useEffect(() => {
        dispatch(actions
            .getDataDetalleAutorizacionPendiente({
                idAutorizacion: numeroAutorizacion
            })
        )
    }, [])

    //Cargo comentario a la request: 
    useEffect(() => {
        setRequest({
            ...request,
            idAutorizacion: numeroAutorizacion,
            comentarioDictamen: comentarioDictamen
        })
    }, [comentarioDictamen])

    //Imprimir:
    const handleImprimir = () => {
        let req = {
            tituloArchivo: "Dictaminar autorizacion",
            items: [
                "Autorizacion",
                "Estado",
                "Fecha",
                "Solicitante",
                "Tipo",
                "Centro Medico",
                "Region Solicitada",
                "Internacion",
                "Receta",
                "Carta Documento",
                "Observaciones",
                "Diagnostico",
                "Traslado",
                "Prácticas autorizadas"
            ],
            contenidoItems: [
                dataBack && dataBack.nroAutorizacion ? dataBack.nroAutorizacion.toString() : "",
                dataBack && dataBack.estadoAutorizacion ? dataBack.estadoAutorizacion : "",
                dataBack && dataBack.fechaAutorizacion ? dataBack.fechaAutorizacion : "",
                dataBack && dataBack.apellidoNombreSolicitante ? dataBack.apellidoNombreSolicitante : "",
                dataBack && dataBack.tipoAutorizacion ? dataBack.tipoAutorizacion : "",
                dataBack && dataBack.centroMedico ? dataBack.centroMedico : "",
                dataBack && dataBack.regionSolicitada ? dataBack.regionSolicitada : "",
                dataBack && dataBack.internacion ? dataBack.internacion : "",
                dataBack && dataBack.archivoReceta ? dataBack.archivoReceta : "",
                dataBack && dataBack.cartaDocumento ? dataBack.cartaDocumento : "",
                dataBack && dataBack.observaciones ? dataBack.observaciones : "",
                dataBack && dataBack.diagnostico ? dataBack.diagnostico : "",
                dataBack && dataBack.traslado ? "Solicitado" : "No Solicitado",
                dataBack && dataBack.prestacionesModulos && dataBack.prestacionesModulos.length > 0 &&
                dataBack.prestacionesModulos.map(it => it.codigoDescripcion.toString())[0]
            ]
        }
        dispatch(getPdfAutorizacion(req, errorCallbackImprimir))
    }

    //Error Callback Imprimir:
    let errorCallbackImprimir = (boolean) => {
        if (boolean) {
            dispatch(actions.setSnackBarAuditoria({
                open: true,
                severity: 'error',
                message: 'Hubo un error al intentar imprimir el PDF.',
                vertical: 'top'
            }))
        }
    }

    let arrDato = dataBack && dataBack.fechaAutorizacion && dataBack.fechaAutorizacion.split("T")[0].split("-")
    let stringFecha = arrDato && arrDato.length > 0 && arrDato[2] + "/" + arrDato[1] + "/" + arrDato[0]
    
    return (
        <>
            {loadingData || loadingImprimirPdfAutorizacion ?
                <Grid style={{ minWidth: 450, textAlign: 'center', marginTop: '150px' }}>
                    <CircularProgress open={true} />
                </Grid>
                :
                <Grid container>
                    <Grid item xs={12} style={{ padding: '24px 24px 18px 18px', background: '#f5f5f5', marginBottom: 10 }}>
                        <Grid container justify='space-between' alignItems='center' style={{ marginBottom: 15 }}>
                            <Grid item>
                                <Typography style={{ fontSize: 16 }}>Autorizacion: {dataBack && dataBack.nroAutorizacion ? dataBack.nroAutorizacion : "-"}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.chipEstado1}>{dataBack && dataBack.estadoAutorizacion ? dataBack.estadoAutorizacion : "-"}</Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Typography style={{ fontSize: 13 }}>Fecha: {stringFecha ? stringFecha : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Solicitante:{dataBack && dataBack.apellidoNombreSolicitante ? dataBack.apellidoNombreSolicitante : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Tipo:{dataBack && dataBack.tipoAutorizacion ? dataBack.tipoAutorizacion : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Centro Médico: {dataBack && dataBack.centroMedico ? dataBack.centroMedico : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Región Solicitada: {dataBack && dataBack.regionSolicitada ? dataBack.regionSolicitada : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Internación: {dataBack && dataBack.internacion ? dataBack.internacion : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Receta: {dataBack && dataBack.archivoReceta ? dataBack.archivoReceta : "-"}</Typography>
                            <Typography style={{ fontSize: 13 }}>Carta Documento:{dataBack && dataBack.cartaDocumento ? dataBack.cartaDocumento : "-"}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ padding: "24px 24px 18px 18px", background: "#f5f5f5", marginBottom: 10 }}>
                        <Typography style={{ fontSize: 13 }}>Observaciones: {dataBack && dataBack.observaciones ? dataBack.observaciones : "-"}</Typography>
                    </Grid>

                    <Grid item xs={12} style={{ padding: "24px 24px 18px 18px", background: "#f5f5f5", marginBottom: 10 }}>
                        <Typography style={{ fontSize: 13 }}>Diagnostico: {dataBack && dataBack.diagnostico ? dataBack.diagnostico : "-"}</Typography>
                    </Grid>

                    <Grid item xs={12} style={{ padding: '24px 18px', background: '#f5f5f5', marginBottom: 10 }}>
                        <Grid container alignItems='center'>
                            <DirectionsCar fontSize='small' color="primary" style={{ marginRight: 8 }} />
                            <Typography style={{ fontSize: 13, marginRight: 8 }}>Traslado:</Typography>
                            {dataBack && dataBack.traslado ?
                                <Typography className={classes.chipTrasladoSolicitado}>
                                    <Check className={classes.iconTrasladoSolicitado} />
                                    Solicitado
                                </Typography>
                                :
                                <Typography style={{ fontSize: 13 }}>No solicitado</Typography>
                            }
                        </Grid>

                    </Grid>

                    <Grid item xs={12} container justify='flex-end' style={{ marginBottom: 10 }}>
                        <CustomButton
                            startIcon={<img src={Printer} alt='printer' />}
                            size="small"
                            variant={'contained'}
                            label={'Imprimir'}
                            styleButton={{ borderRadius: 5, border: '1px solid #747474', background: 'rgba(200,0,0,0)' }}
                            styleLabel={{ color: "#747474" }}
                            onClik={handleImprimir}
                        />
                    </Grid>

                    <Grid item xs={12} style={{ padding: '24px 18px', background: '#f5f5f5', marginBottom: 10, border: 'solid 1px var(--dadce-0-borde-card' }}>
                        <Typography variant='h1' style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                            Datos de prestaciones / Módulos
                        </Typography>
                        <Divider />
                        <Grid className={classes.scrollBar}>
                            <Table size='small'>
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="left" style={{ fontSize: 12, fontWeight: 700, color: '#747474', padding: '10px 0 10px 0' }}>
                                            CÓDIGO Y DESCRIPCIÓN
                                        </TableCell>
                                        <TableCell align="right" style={{ fontSize: 12, fontWeight: 700, color: '#747474', padding: '10px 5px 10px 0' }}>
                                            CANTIDAD
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataBack && dataBack.prestacionesModulos && dataBack.prestacionesModulos.length > 0 &&
                                        dataBack.prestacionesModulos.map(item => (
                                            <TableRow key={item.cantidad}>
                                                <TableCell align='left' style={{ fontSize: 13, padding: '10px 20px 10px 0' }}>
                                                    {item.codigoDescripcion}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {item.cantidad}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            {(!dataBack || !dataBack.prestacionesModulos || dataBack.prestacionesModulos.length === 0) &&
                                <Typography style={{ width: '100%', fontSize: 14, textAlign: 'center', marginTop: 20 }}>
                                    No hay datos para mostrar
                                </Typography>
                            }
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ padding: '0px 18px', marginBottom: 10 }}>
                        <FormControl fullWidth>
                            <FormHelperText>Comentario de Dictamen</FormHelperText>
                            <TextField
                                placeholder='Completar'
                                value={comentarioDictamen}
                                onChange={(e) => setComentarioDictamen(e.target.value)}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            }
        </>
    )
}

export default ContenidoDatosAutorizacion
