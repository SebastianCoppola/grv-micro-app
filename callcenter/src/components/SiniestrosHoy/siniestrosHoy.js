import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { COMPONENT_SINIESTROS } from "../../Utils/const";
//estilo
import { makeStyles } from "@material-ui/core/styles";
//material-ui
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
//componentes
import HeaderFiltros from "../commons/Header/HeaderFiltros";
import CustomLoading from "../commons/Loading/CustomLoading";
import TablaConsultaSolicitudes from "../ConsultaSolicitudes/tablaConsultaSolicitudes";
import IconSearch from "../BuscadorFlotante/IconSearch";
import Utils from "../../Utils/utils";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
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
}));

const estadosCEM = [
  { codigo: 0, descripcion: "Incompleto" },
  { codigo: 1, descripcion: "Completo" },
  { codigo: 2, descripcion: "Borrador" },
];

const SiniestrosHoy = (props) => {
  const classes = useStyles(props);
  const {
    open2,
    setMiniMenu,
    setNavegacion,
    setTituloHeader,
    setActivarAlarmas,
    usuarioActivo,
    setIdDenuncia,
    openBuscador,
    setOpenBuscador
  } = props;
  const [esOperador, setEsOperador] = useState(false);
  const [actualizarData, setActualizarData] = useState(false);
  const data = useSelector((state) => state.documentos.denuncias);
  const loadingDenuncia = useSelector(
    (state) => state.documentos.loadingDenuncia
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo));
  const [ordenDenuncia, setOrdenDenuncia] = useState(null); //Hook para el manejo de la request para ordernar por Denuncia.
  useEffect(() => {
    setMiniMenu(false);
    setNavegacion(false);
    setTituloHeader("Siniestros de hoy");
  }, []);

  return (
    <div className={classes.root}>
      <CustomLoading loading={loadingDenuncia} />
      {!openBuscador ?
                <IconSearch open={openBuscador} usuarioActivo={usuarioActivo} /> 
            : null}
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={0}>
            <HeaderFiltros
              component={COMPONENT_SINIESTROS}
              showBuscador={true}
              showSiestrosCheck={true}
              showEstadoCEM={true}
              showOperadores={true}
              estadosCEM={estadosCEM}
              align={"center"}
              openMenu={open2}
              actualizarData={actualizarData}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              siniestrosHoy={true}
              fechaConsulta={false}
              //Tipo de Fecha
              esFechaCarga={true} 
              esFechaOcurrencia={false} 
              esFechaContacto={false}
              setOrdenDenuncia={setOrdenDenuncia}
              ordenDenuncia={ordenDenuncia}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TablaConsultaSolicitudes
            esOperador={usuarioActivo.isOperador}
            dataDenuncias={data}
            setActivarAlarmas={setActivarAlarmas}
            setActualizarData={setActualizarData}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            setIdDenuncia={setIdDenuncia}
            usuarioActivo={usuarioActivo}
            openBuscador={openBuscador}
            setOpenBuscador={setOpenBuscador}
            setOrdenDenuncia={setOrdenDenuncia}
            ordenDenuncia={ordenDenuncia}
            siniestrosHoy={true}
          />
        </Grid>
      </Grid>
    </div>
  );
};
SiniestrosHoy.propTypes = {
  open2: PropTypes.any,
  setMiniMenu: PropTypes.any,
  setNavegacion: PropTypes.any,
  usuarioActivo: PropTypes.object,
};
export default SiniestrosHoy;
