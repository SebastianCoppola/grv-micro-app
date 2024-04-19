import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { InputLabel, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import CustomButton from "../../Button/CustomButton";
import Restore from "../../../../commons/assets/Header/restore.svg";
import CuadroFiltros from "./CuadrosFiltros";
import Tooltip from '@material-ui/core/Tooltip';
import { CONTEXT_SOLICITUDES_GENERICAS } from "../../../../Urls/baseContextURL";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions/index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    width: "121px",
    height: "30px",
    padding: "6px 7px 7px 10px",
    borderRadius: "5px",
  },
}));

export default function AplicacionHeaderFiltrosAvanzados(props) {
  const {
    filtros,
    titulo,
    nombre,
    handleClickLimpiarFiltrosAvanzados,
    setFiltros,
    filtrar,
    setFiltrar,
    request,
    setRequest
  } = props;

  const dispatch = useDispatch()
  const [data, setData] = useState(filtros);
  const [mostrarCuadrito, setMostrarCuadrito] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (request) {
      setRequest(request)
      dispatch(actions.searchDenuncias(request))
    }
  }, [request])

  const handleDelete = (chipToDelete, i) => () => {
    setData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    data.splice(i, 1);
    setFiltros(data);
    setFiltrar(true)
    if (mostrarCuadrito) {
      setMostrarCuadrito(false)
      setOpen(false)
    }
  };

  const handleClick = (newPlacement) => (event) => {
    mostrarCuadrito === false ? setMostrarCuadrito(true) : setMostrarCuadrito(false)
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Paper component="ul" className={classes.root}>
      <Grid container justify={"flex-start"} alignItems={"flex-end"}>
        <InputLabel>{titulo}</InputLabel>
        <Grid
          item
          container
          xs={12}
          justify={"space-between"}
          alignItems={"flex-end"}
        >
          {data ? (
            data.map((data, i) => {
              while (i < 7) {
                return (
                  <li key={data.key}>
                    <Tooltip
                      arrow
                      placement="top"
                      //classes={classesTooltip}
                      title={<>
                        <Grid container justify='center' alignItems='center'>
                          {`${data && data.descripcion}: ${data && data.label}`}
                        </Grid>
                      </>}>
                      <Chip
                        label={data.label}
                        onDelete={handleDelete(data, i)}
                        className={classes.chip}
                      >
                      </Chip>
                    </Tooltip>
                  </li>
                );
              }
              if (i == 7) {
                return (
                  <li key={data.key}>
                    <CustomButton
                      label={"+".concat(filtros.length - i)}
                      styleButton={{
                        width: "49px",
                        borderRadius: "5px",
                        backgroundColor: "#d3d3d3",
                      }}
                      onClik={handleClick("bottom")}
                    />
                  </li>
                )
              } else if (filtros.length - i == 0) {
                return null
              }
            }
            )) :
            (
              <li>
                <Chip
                  label={nombre}
                  onDelete={handleDelete(nombre)}
                  className={classes.chip}
                />
              </li>
            )}
          <CustomButton
            label={"Limpiar filtros avanzados"}
            styleButton={{
              width: "233px",
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "#d3d3d3",
            }}
            startIcon={<img src={Restore} />}
            onClik={handleClickLimpiarFiltrosAvanzados}
          />
        </Grid>
      </Grid>
      {mostrarCuadrito ? (
        <CuadroFiltros
          filtros={filtros}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          setFiltros={setFiltros}
          setFiltrar={setFiltrar}
          mostrarCuadrito={mostrarCuadrito}
          setMostrarCuadrito={setMostrarCuadrito}
          setOpen={setOpen}
        />
      ) : null}
    </Paper>
  )
}
