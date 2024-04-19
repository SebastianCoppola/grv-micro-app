import { Grid, FormControl, FormHelperText, ButtonGroup, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import CustomChip from "../../commons/Chip/CustomChip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "&>*": {
      margin: theme.spacing(1),
    },
  },
}));

const CustomButtonGroup = (props) => {
  const { limpiarChips, valueChip, setValueChip, datosChip, setDatosChip } = props;

  // useEffect(() => {
  //   limpiarChips && setValChip();
  // }, [limpiarChips]);

  const classes = useStyles(props);
  const [valChip, setValChip] = useState();

  const onClickChip = (event, item2, data2) => {
    setValueChip(data => {
      return data.map((item) => {
        if (item.nombre === item2.nombre) {
          setDatosChip({
            ...datosChip,
            [item.nombre]: data2.codigo,
          })
          return {
            nombre: item2.nombre,
            value: data2.codigo,
            titulo: item2.titulo,
            id: item2.id,
            data: item2.data,
          }
        } else {
          return item
        }

      })
    })

  }


  return (
    <Grid item container justify="space-between" alignItems="end">
      {valueChip && valueChip.map((item, i) => {
        return (

          <FormControl xs={4} key={i}>
            <FormHelperText style={{ color: "#707070" }}>
              {item.titulo}
            </FormHelperText>

            <ButtonGroup
              arial-label={"outlined primary button group"}
              className={classes.root}
            >
              {item && item.data && item.data.map((datas) => (
                <Grid item>
                  <CustomChip
                    fontSize={true}
                    style={
                      item.value === datas.codigo
                        ? { border: "1px solid #2f61d5" }
                        : { boder: "1px solid #d3d3d3" }
                    }
                    label={datas.descripcion}
                    onClick={(event) => onClickChip(event, item, datas)}
                  />
                </Grid>
              ))}
            </ButtonGroup>

          </FormControl>
        );
      })
      }
    </Grid>
  )

};

export default CustomButtonGroup;
