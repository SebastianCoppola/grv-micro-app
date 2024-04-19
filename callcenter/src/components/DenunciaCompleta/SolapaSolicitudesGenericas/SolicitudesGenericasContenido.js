import React, { useState, useEffect } from "react"
//Router:
import { useHistory } from "react-router-dom"
//Material:
import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
//Components:
import TablaSolicitudesGenericas from "./TablaSolicitudesGenericas"
import CustomButton from "../../commons/Button/CustomButton"
import CustomSnackBar from "../../commons/SnackBar/CustomSnackBar"
import CustomLoading from "../../commons/Loading/CustomLoading"
//Redux:
import { useDispatch, useSelector } from "react-redux"
import { searchSolicitudesGenericas, setSnackBar } from "../../../redux/actions/solicitudesGenericas"
import Utils from "../../../Utils/utils"

const useStyles = makeStyles({
    sinRegistros: {
        width: 380,
        height: 180,
        padding: 24,
        margin: '60px auto',
        border: '2px solid #dadce0',
        borderRadius: 5,
        boxSizing: 'border-box',
        fontSize: 14,
        '& h2': {
            fontSize: 19,
            margin: 10
        }
    },
    tituloCardNoData: {
        fontSize: "19px",
        color: "#323232"
    },
    text: {
        fontSize: 14,
        color: "grey"
    }
})

const SolicitudesGenericasContenido = (props) => {
    
    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, 
        denuncia, usuarioActivo, setIdSolicitud 
        // esOperador, disableEdition,
        // setGuardarContenedor, guardarContenedor, 
        // setDataSiniestroCompleto, dataSiniestroCompleto,
    } = props
    
    const classes = useStyles(props)
    const history = useHistory()
    const dispatch = useDispatch()
    
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar)
    const actualizarData = useSelector(state => state.solicitudesGenericas.actualizarData)
    const loading = useSelector(state => state.solicitudesGenericas.loading)
    const data = useSelector(state => state.solicitudesGenericas.solicitudesGenericas);
    
    const [openMenuSiniestros, setOpenMenuSiniestros] = useState(true)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)
    const [req, setReq] = useState(null)
    const [isAsc, setIsAsc] = useState(null)

    useEffect(() => {
        setTituloNavegacionSiniestro('Solicitudes Genéricas')
        setMiniMenu(true)
        setNavegacion(true)
    }, [])

    useEffect(() => {
        setReq({
            denuncia: denuncia && denuncia.nroAsignado ? denuncia.nroAsignado : denuncia.nroProvisorio,
            idOperador: usuarioActivo && usuarioActivo.id,
            ordenarDesc: !isAsc,
            filtroPersonaLogueada: false,
            offset: page * rowsPerPage,
            limit: rowsPerPage
        })
    }, [page, rowsPerPage, isAsc])

    useEffect(() => {
        if (req) dispatch(searchSolicitudesGenericas(req))
    }, [req, actualizarData])

    const nuevaSolicitudHandler = () => {
        history.push("/home/editar/solicitudesGenericas/nueva")
    }

    return (
        <Grid container justify='center' style={{padding:'10px 20px'}}>
            <Grid item xs={12}>
                { loading ?
                    <CustomLoading loading={loading} />               
                : data && data.objetos && data.objetos.length > 0 ? 
                    <>
                        <Box display="flex" justifyContent="flex-end" m={1}>
                            <CustomButton
                                variant="contained"
                                isAction
                                width={160}
                                height={40}
                                styleLabel={{ fontSize: 14 }}
                                startIcon={<AddIcon />}
                                onClik={nuevaSolicitudHandler}
                                label="Nueva Solicitud"
                                color="primary" 
                            />
                        </Box>
                        <TablaSolicitudesGenericas
                            data={data}
                            openMenuSiniestros={openMenuSiniestros}
                            setIdSolicitud={setIdSolicitud}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            isAsc={isAsc}
                            setIsAsc={setIsAsc}
                            opcionesPaginacion={opcionesPaginacion}
                        />
                        <CustomSnackBar
                            handleClose={() => dispatch(setSnackBar({ open: false }))}
                            open={snackbar.open}
                            title={snackbar.message}
                            severity={snackbar.severity}
                            vertical="bottom" 
                        />
                    </>
                : 
                    <Box className={classes.sinRegistros}>
                        <Typography className={classes.tituloCardNoData}><b>Solicitudes Genéricas</b></Typography>
                        <Divider />
                        <Typography className={classes.text} style={{ marginTop: "20px" }}>No hay solicitudes registradas para este siniestro.</Typography>
                        <Box display="flex" justifyContent="flex-end" style={{ marginTop: "20px" }}>
                            <CustomButton
                                variant="contained"
                                isAction
                                width={160}
                                height={40}
                                styleLabel={{ fontSize: 14 }}
                                startIcon={<AddIcon />}
                                onClik={nuevaSolicitudHandler}
                                label="Nueva Solicitud"
                                color="primary" 
                            />
                        </Box>
                    </Box>
                }
            </Grid>
        </Grid>
    )
}

export default SolicitudesGenericasContenido