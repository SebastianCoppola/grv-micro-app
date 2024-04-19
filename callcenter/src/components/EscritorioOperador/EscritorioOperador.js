import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import Utils from "../../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/index";
import {
  PAGINACION_SIZE_SINIESTROS,
  ERROR_SEARCH_BY_ID,
  ERROR_SEARCH_BY_ID_REDIRECCION,
  estadosCEM,
} from "../../Utils/const";
//estilo
import { makeStyles } from "@material-ui/core/styles";
//material-ui
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import TablePagination from "@material-ui/core/TablePagination";
//componentes
import CustomTypography from "../commons/Typography/CustomTypography";
import CustomButton from "../commons/Button/CustomButton";
import CustomChip from "../commons/Chip/CustomChip";
import CustomCard from "../commons/Card/CustomCard";
import CardOperador from "./CardOperador";
import PasarSiniestroPendientes from "./PasarSiniestroPendientes";
import AdminSlide from "../commons/Slider/AdminSlide";
import CustomSnackBar from "../commons/SnackBar/CustomSnackBar";
import Drawer2 from "../commons/CustomDrawer/Drawer";
import CustomLoading from "../commons/Loading/CustomLoading";
import IconSearch from "../BuscadorFlotante/IconSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.text.secondary,
    borderRadius: "8px",
    height: "76vh",
    overflow: "auto",
    overflowX: "hidden",
    boxShadow: "none",
    backgroundColor: "#f5f5f5",
    paddingBottom: "5px",
  },
  titulo: {
    fontSize: "19px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.3,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#2c2c2c",
    margin: "17px 0px 0px 20px",
  },
  cuerpo: {
    padding: "0px 10px 0px 10px",
    marginTop: "5px",
  },
  tituloColumna: {
    fontSize: "15px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.3,
    letterSpacing: "normal",
    textAlign: "left",
    color: "#4b4b4b",
  },
  column: {
    paddingLeft: "13px",
    paddingRight: "13px",
    paddingTop: "10px",
  },
  list: {
    maxWidth: 447,
    height: "100%",
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      width: 467,
    },
  },
}))

let date = Utils.formatoFecha(new Date(), "yyyy-mm-dd");
const pageSize = PAGINACION_SIZE_SINIESTROS;

const EscritorioOperador = (props) => {
  
  const { setActivarAlarmas, setIdDenuncia, openBuscador, setOpenBuscador } = props

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const anchor = "right";

  const rutas = useSelector(state => state.generalConfig.rutas)
  console.log(rutas)

  const cantBorrador = useSelector(state => state.documentos.cantidadBorrador)
  const cantIncompleto = useSelector(state => state.documentos.cantidadIncompleto)
  const cantCompleto = useSelector(state => state.documentos.cantidadCompleto)
  const loadingCards = useSelector((state) => state.documentos.loadingCards)
  const usuarioActivo = useSelector(state => state.generalConfig.usuarioActivo)

  const [inc, setInc] = React.useState(null);
  const [borr, setBorr] = React.useState(null);
  const [compl, setCompl] = React.useState(null);

  const [openDrawer, setOpenDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    title: "",
    severity: "",
  });

  const [pageCompletos, setPageCompletos] = useState(0);
  const [pageIncompleto, setPageIncompleto] = useState(0);
  const [pageBorrador, setPageBorrador] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [valMultiline, setValMultiline] = useState(null);
  const [alarmasSeleccionadas, setAlarmasSeleccionadas] = useState([]);

  useEffect(() => {
    buscarDenunciasTableroTodos();
  }, []);

  useEffect(() => buscarDenunciasTableroTodos(), [])

  const buscarDenunciasTableroTodos = () => {
    buscarBorrador();
    buscarCompleto();
    buscarIncompleto();
  };

  useEffect(() => {
    buscarCompleto();
  }, [pageCompletos]);

  useEffect(() => {
    buscarIncompleto();
  }, [pageIncompleto]);

  useEffect(() => {
    buscarBorrador();
  }, [pageBorrador]);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const buscarBorrador = () => {
    if (usuarioActivo && usuarioActivo.id) {
      const requestBorrador = {
        fechaDenunciaExacta: date,
        estadoCem: 2,
        limit: pageSize,
        offset: pageBorrador * pageSize,
        idOperador: usuarioActivo && usuarioActivo.id
      };
      // BORRADOR
      dispatch(
        actions.searchTableroDenuncias(requestBorrador, estadosCEM.BORRADOR, callBack)
      );
    }
  };
  const buscarIncompleto = () => {
    if (usuarioActivo && usuarioActivo.id) {
      const requestIncompleto = {
        fechaDenunciaExacta: date,
        estadoCem: 0,
        limit: pageSize,
        offset: pageIncompleto * pageSize,
        idOperador: usuarioActivo && usuarioActivo.id,
      };
      // INCOMPLETO
      dispatch(
        actions.searchTableroDenuncias(requestIncompleto, estadosCEM.INCOMPLETO, callBack)
      );
    }
  };
  const buscarCompleto = () => {
    if (usuarioActivo && usuarioActivo.id) {
      const requestCompleto = {
        fechaDenunciaExacta: date,
        estadoCem: 1,
        limit: pageSize,
        offset: pageCompletos * pageSize,
        idOperador: usuarioActivo && usuarioActivo.id,
      };
      // COMPLETO
      dispatch(
        actions.searchTableroDenuncias(requestCompleto, estadosCEM.COMPLETO, callBack)
      );
    }
  };
  const callBack = (succes, data5, estado) => {
    if (succes) {
      if (estado === estadosCEM.COMPLETO) {
        setCompl(data5);
      } else if (estado === estadosCEM.INCOMPLETO) {
        setInc(data5);
      } else if (estado === estadosCEM.BORRADOR) {
        setBorr(data5);
      }
    }
  };

  const toggleDrawer = (anchor, open, data) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSelectedRow(data);
    setOpenDrawer({ ...state, [anchor]: open });
    setOpenBuscador(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar({ open: false });
  };

  const handleClickCard = (data) => (event) => {
    event.stopPropagation();
    let id = data && data.estadoCEM && data.estadoCEM;
    if (data && data.idDenuncia) {
      dispatch(actions.searchDenunciaById(data.idDenuncia, id, callBackSearch));
    }
    setIdDenuncia(null);
    //  dispatch(actions.searchDenunciaById(data.idDenuncia, data.estadoCEM))
  };
  const callBackSearch = (success) => {
    if (success) {
      history.push("/home/editar");
    } else {
      setOpenSnackBar({
        open: true,
        severity: "error",
        title: (
          <div>
            <div>{`${ERROR_SEARCH_BY_ID} 
                    ${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
            <div>Por favor intente nuevamente.</div>
          </div>
        ),
      });
    }
  };
  const showLabelAccidentado = (data) => {
    return data && data.accidentado
      ? Utils.stringNull(data.accidentado.apellido) +
      " " +
      Utils.stringNull(data.accidentado.nombre) +
      " [" +
      Utils.stringNull(data.accidentado.nroDoc) +
      "]"
      : null;
  };
  const tieneAlarmas = (data) => {
    if (data && data.alarmas && data.alarmas.length > 0) {
      return true;
    }
    return false;
  };
  const cantidadAlarmas = (data) => {
    return data && data.alarmas ? data.alarmas.length : 0;
  };
  const onClickCancelar = () => {
    setOpenDrawer({ ...state, [anchor]: false });
    setOpenBuscador(true);
  };

  //SLIDER
  const contenido = [
    {
      texto: (
        <PasarSiniestroPendientes
          alarmas={
            selectedRow && selectedRow.alarmas ? selectedRow.alarmas : null
          }
          onClickCancelar={onClickCancelar}
          setValMultiline={setValMultiline}
        />
      ),
    },
  ];
  const enviarAPendientes = (event) => {
    let alarmasSinPendientes = [];
    selectedRow.alarmas.map((item) => {
      if (!item.pendiente) {
        alarmasSinPendientes.push({ codigo: item.codigo });
      }
    });
    let request = {
      idDenuncia: selectedRow.idDenuncia,
      idOperador: usuarioActivo && usuarioActivo.id,
      mensaje: valMultiline,
      alarmas: alarmasSinPendientes,
    };
    dispatch(actions.enviarPendientes(request, succesPendientes));
    event.preventDefault();
    event.stopPropagation();
  };
  const succesPendientes = (mensaje, success) => {
    setOpenSnackBar({
      open: true,
      severity: success,
      title: mensaje,
    });
    setOpenDrawer({ ...state, [anchor]: false });
    setOpenBuscador(true);
    buscarDenunciasTableroTodos();
  };
  const buttons = () => {
    return (
      <Fragment>
        <Grid item>
          <CustomButton
            styleLabel={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#ffffff",
            }}
            styleButton={{ backgroundColor: "#1473e6" }}
            startIcon={false}
            width={"90px"}
            height={"40px"}
            label={"Enviar"}
            onClik={enviarAPendientes}
            variant={"contained"}
            isAction={true}
          />
        </Grid>{" "}
      </Fragment>
    );
  };
  const handleChangeCompleto = (event, newPage) => {
    setPageCompletos(newPage);
  };
  const handleChangeIncompleto = (event, newPage) => {
    setPageIncompleto(newPage);
  };
  const handleChangeBorrador = (event, newPage) => {
    setPageBorrador(newPage);
  };

  const openPendiente = (event, data) => {
    setOpenDrawer({ ...openDrawer, right: true });
    setSelectedRow(data);
    setOpenBuscador(false);
  };

  return (
    <div className={classes.root}>
      <CustomLoading loading={loadingCards} />
      {!openBuscador ?
        <IconSearch open={openBuscador} usuarioActivo={usuarioActivo}/>
        : null}
      {/* Encabezado*/}
      <Grid container justify={"space-between"} alignItems="center" spacing={1}>
        <Grid item xs={5}>
          <CustomTypography
            className={classes.titulo}
            text={"Tablero de Denuncias"}
          />
        </Grid>
        <Grid container xs={7} justify={"flex-end"} item spacing={2}>
          <Grid item>
            <CustomButton
              startIcon={
                <SearchOutlinedIcon
                  style={{ fontSize: "25px", color: "#747474" }}
                />
              }
              label={"Consultas"}
              variant={"contained"}
              width={"139px"}
              height={"40px"}
              isAction={true}
              styleLabel={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#747474",
              }}
              styleButton={{
                border: "solid 2px #747474",
                backgroundColor: "#ffffff",
              }}
              onClik={() => history.push("/home/consultaSolicitudes")}
            />
          </Grid>
          <Grid item style={{ paddingRight: "28px" }}>
            <CustomButton
              styleLabel={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              styleButton={{ backgroundColor: "#1473e6" }}
              startIcon={false}
              width={"157px"}
              height={"40px"}
              label={"Nueva Denuncia"}
              variant={"contained"}
              isAction={true}
              onClik={() => history.push("/home/agregar")}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Cuerpo*/}
      <Grid container className={classes.cuerpo} spacing={2}>
        {/* Columna 1*/}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid
              className={classes.column}
              container
              justify={"space-between"}
              alignItems="center"
              spacing={1}
            >
              <Grid container item xs={10}>
                <CustomTypography
                  className={classes.tituloColumna}
                  text={"Borradores"}
                />
              </Grid>
              <Grid container item xs={2} justify={"flex-end"}>
                <CustomChip
                  isCount={true}
                  label={`${cantBorrador}`}
                  color={"#747474"}
                  colorLabel={"#ffffff"}
                />
              </Grid>
              {/* Cards*/}
              {borr
                ? borr.objetos.map((data, index) => {
                  return (
                    <Grid item xs={12}>
                      <CustomCard
                        click={true}
                        key={index}
                        isVariante={"horizontal"}
                        color={"#747474"}
                        handleClickCard={handleClickCard(data)}
                        body={
                          <CardOperador
                            showAsignado={true}
                            color={"#2f61d5"}
                            countAlarm={cantidadAlarmas(data)}
                            backgroundColor={"#e9f9f0"}
                            accidentado={showLabelAccidentado(data)}
                            denuncia={
                              data ? Utils.nroAsignadoProvisorio(data) : ""
                            }
                            img={data.img}
                            alarmas={
                              data && data.alarmas ? data.alarmas : null
                            }
                            onClick={(event) => openPendiente(event, data)}
                            data={data}
                          />
                        }
                      ></CustomCard>
                    </Grid>
                  );
                })
                : null}
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <TablePagination
              component="div"
              count={cantBorrador}
              page={pageBorrador}
              onChangePage={handleChangeBorrador}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
              SelectProps={{
                inputProps: {
                  "aria-label": "Filas",
                },
                native: true,
              }}
            />
          </Grid>
        </Grid>
        {/* Columna 2*/}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid
              className={classes.column}
              container
              justify={"space-between"}
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={10}>
                <Grid item>
                  <CustomTypography
                    className={classes.tituloColumna}
                    text={"Mis denuncias incompletas"}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={2} justify={"flex-end"}>
                <CustomChip
                  isCount={true}
                  label={`${cantIncompleto}`}
                  color={"#2f61d5"}
                  colorLabel={"#ffffff"}
                />
              </Grid>
              {/* Cards*/}
              {inc
                ? inc.objetos.map((data, index) => (
                  <Grid item xs={12}>
                    <CustomCard
                      click={true}
                      key={index}
                      isVariante={"horizontal"}
                      color={"#2f61d5"}
                      handleClickCard={handleClickCard(data)}
                      body={
                        <CardOperador
                          showAsignado={false}
                          accion={tieneAlarmas(data)}
                          color={"#2f61d5"}
                          alarmas={data && data.alarmas ? data.alarmas : null}
                          backgroundColor={"rgba(47, 97, 213, 0.1)"}
                          countAlarm={cantidadAlarmas(data)}
                          accidentado={showLabelAccidentado(data)}
                          denuncia={
                            data ? Utils.nroAsignadoProvisorio(data) : ""
                          }
                          onClick={(event) => openPendiente(event, data)}
                          data={data}
                          setActivarAlarmas={setActivarAlarmas}
                        />
                      }
                    ></CustomCard>
                  </Grid>
                ))
                : null}
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <TablePagination
              component="div"
              count={cantIncompleto}
              page={pageIncompleto}
              onPageChange={handleChangeIncompleto}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </Grid>
        </Grid>
        {/* Columna 3*/}
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Grid
              className={classes.column}
              container
              justify={"space-between"}
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={10}>
                <Grid item>
                  <CustomTypography
                    className={classes.tituloColumna}
                    text={"Mis denuncias completas"}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={2} justify={"flex-end"}>
                <CustomChip
                  isCount={true}
                  label={`${cantCompleto}`}
                  color={"#2dc76d"}
                  colorLabel={"#ffffff"}
                />
              </Grid>
              {/* Cards*/}
              {compl
                ? compl.objetos.map((data, index) => (
                  <Grid item xs={12}>
                    <CustomCard
                      click={true}
                      key={index}
                      isVariante={"horizontal"}
                      color={"#2dc76d"}
                      handleClickCard={handleClickCard(data)}
                      body={
                        <CardOperador
                          accion={tieneAlarmas(data)}
                          setActivarAlarmas={setActivarAlarmas}
                          showAsignado={false}
                          alarmas={data && data.alarmas ? data.alarmas : null}
                          color={"#2dc76d"}
                          countAlarm={cantidadAlarmas(data)}
                          backgroundColor={"#e9f9f0"}
                          accidentado={showLabelAccidentado(data)}
                          denuncia={
                            data ? Utils.nroAsignadoProvisorio(data) : ""
                          }
                          onClick={(event) => openPendiente(event, data)}
                          data={data}
                        />
                      }
                    ></CustomCard>
                  </Grid>
                ))
                : null}
            </Grid>
          </Paper>
          <Grid item xs={12}>
            <TablePagination
              component="div"
              count={cantCompleto}
              page={pageCompletos}
              onPageChange={handleChangeCompleto}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[]}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Drawer2
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        anchor="right"
        toggleDrawer={toggleDrawer}
        label={"Ver denuncia completa"}
        variant={"contained"}
        button={false}
        handleButton={null}
        title={`Denuncia  ${selectedRow ? Utils.nroAsignadoProvisorio(selectedRow) : ""
          }`}
      >
        <AdminSlide
          contenido={contenido}
          labelButtonSiguiente={null}
          variantButtonCancelar={"outlined"}
          variantButtonSiguiente={"contained"}
          handleNext={null}
          activeStep={0}
          setActiveStep={0}
          maxSteps={0}
          buttons={buttons()}
        />
      </Drawer2>

      {openSnackBar.open ? (
        <CustomSnackBar
          handleClose={handleClose}
          open={openSnackBar.open}
          title={openSnackBar.title}
          severity={openSnackBar.severity}
        />
      ) : null}
    </div>
  );
};

export default EscritorioOperador;
