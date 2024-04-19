import { Grid, Chip } from "@material-ui/core";
import CustomButton from "../../Button/CustomButton";
import filterMinus from "../../../../commons/assets/Header/filterMinus.svg";

const HeaderFiltrosAvanzadosPiePagina = (props) => {
  const {
    color,
    handleClickComprimir,
    handleClickLimpiarFiltros,
    handleClickAplicarFiltros,
  } = props;
  return (
    <Grid
      container
      xs={12}
      justify={"space-between"}
      alignItems={"flex-end"}
      style={{ marginTop: "17px", marginBottom: "10px" }}
      spacing={2}
    >
      <Grid item xs={8}>
        <CustomButton
          label="Comprimir"
          styleButton={{
            borderRadius: "5px",
            backgroundColor: "#f4f4f4",
            border: "1px solid #d3d3d3",
            width: "203px",
            height: "40px",
          }}
          startIcon={<img src={filterMinus} />}
          onClik={handleClickComprimir}
        />
      </Grid>
      <Grid item xs={2}>
        <Chip
          label={"Limpiar Filtros"}
          variant="outline"
          style={{
            width: "145px",
            height: "40px",
            padding: "8px 22px 11px",
            borderRadius: "20px",
            border: "2px solid #747474",
          }}
          onClick={handleClickLimpiarFiltros}
        ></Chip>
      </Grid>
      <Grid item xs={2}>
        <Chip
          label={"Aplicar Filtros"}
          variant="default"
          style={{
            width: "136px",
            height: "40px",
            borderRadius: "20px",
            border: "2px solid #747474",
            backgroundColor: color,
            color: "white",
            padding: "9px 20px 10px",
          }}
          onClick={handleClickAplicarFiltros}
        ></Chip>
      </Grid>
    </Grid>
  );
};

export default HeaderFiltrosAvanzadosPiePagina;
