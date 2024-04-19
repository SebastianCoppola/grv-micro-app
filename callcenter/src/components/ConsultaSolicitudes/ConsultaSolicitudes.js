import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
//Redux:
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../redux/actions/index"
//Utils:
import { COMPONENT_SINIESTROS, SNACK_VERTICAL } from "../../Utils/const"
//Material:
import { Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
//Componentes:
import HeaderFiltros from "../commons/Header/HeaderFiltros"
import CustomLoading from "../commons/Loading/CustomLoading"
import TablaConsultaSolicitudes from "./tablaConsultaSolicitudes"
import IconSearch from '../BuscadorFlotante/IconSearch'
import Utils from "../../Utils/utils"

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: "5px",
        border: "1px solid #d3d3d3",
        width: "40px",
        height: "40px",
        marginLeft: "4px",
    },
})

const operadores = [
    { codigo: 125, descripcion: "Cintia Mastroberti" },
    { codigo: 305, descripcion: "Magali Iglesias" },
    { codigo: 458, descripcion: "Mariano Miñarro" },
    { codigo: 407, descripcion: "Javier Cisneros" },
    { codigo: 724, descripcion: "Facundo Piperno" },
    { codigo: 529, descripcion: "Catalina Dewey Muller" },
    { codigo: 412, descripcion: "Melina Lomba" },
]

const estadosCEM = [
    { codigo: 0, descripcion: "Incompleto" },
    { codigo: 1, descripcion: "Completo" },
    { codigo: 2, descripcion: "Borrador" },
]

const ConsultaSolicitudes = (props) => {
    const classes = useStyles(props)
    const {
        open2,
        setMiniMenu,
        setNavegacion,
        setTituloHeader,
        setActivarAlarmas,
        usuarioActivo,
        setIdDenuncia,
        openBuscador,
        setOpenBuscador,
        denuncia,
        disableEdition
    } = props
    const [actualizarData, setActualizarData] = useState(false)
    const data = useSelector((state) => state.documentos.denuncias)
    const loadingDenuncia = useSelector(state => state.documentos.loadingDenuncia)
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))
    const [ordenDenuncia, setOrdenDenuncia] = useState(null) //Manejo para ordenar la lista por Denuncias.

    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setTituloHeader("Consultas de Siniestros")
        dispatch(actions.setDenuncias([]))
    }, [])

    return (
        <div className={classes.root}>
            <CustomLoading loading={loadingDenuncia} />
            {!openBuscador ? <IconSearch open={openBuscador} usuarioActivo={usuarioActivo}/> : null}
            <Grid container alignItems="center" justify="center" spacing={1}>
                <Grid item xs={12}>
                    <Paper elevation={0}>
                        <HeaderFiltros
                            component={COMPONENT_SINIESTROS}
                            showBuscador={true}
                            showSiestrosCheck={true}
                            showEstadoCEM={true}
                            showOperadores={true}
                            operadores={operadores}
                            estadosCEM={estadosCEM}
                            align={"flex-start"}
                            openMenu={open2}
                            actualizarData={actualizarData}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            setPage={setPage}
                            siniestrosHoy={false}
                            fechaConsulta={true}
                            seccionConsultas={true}
                            denuncia={denuncia}
                            exportar={!usuarioActivo.isOperador && data?.length != 0}
                            //Tipo de Fecha
                            esFechaCarga={false}
                            esFechaOcurrencia={true}
                            esFechaContacto={false}
                            setOrdenDenuncia={setOrdenDenuncia}
                            ordenDenuncia={ordenDenuncia}
                            usuarioActivo={usuarioActivo}
                            positionSnackBar={SNACK_VERTICAL.BOTTOM}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <TablaConsultaSolicitudes
                        esOperador={usuarioActivo.isOperador}
                        setIdDenuncia={setIdDenuncia}
                        dataDenuncias={data}
                        setActivarAlarmas={setActivarAlarmas}
                        setActualizarData={setActualizarData}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        usuarioActivo={usuarioActivo}
                        openBuscador={openBuscador}
                        setOpenBuscador={setOpenBuscador}
                        disableEdition={disableEdition}
                        setOrdenDenuncia={setOrdenDenuncia}
                        ordenDenuncia={ordenDenuncia}
                        siniestrosHoy={false}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

ConsultaSolicitudes.propTypes = {
    open2: PropTypes.any,
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    usuarioActivo: PropTypes.object,
}

export default ConsultaSolicitudes
