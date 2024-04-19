import React from "react";
import PropTypes from "prop-types";
//material-ui
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
//estilo
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const useStyles = makeStyles({
  seleccionar: {
    paddingLeft: "0px",
  },
  contenedor: {
    width: "max-content",
  },
});
const GreenCheckbox = withStyles({
  root: {
    // color: green[400],
    "&$checked": {
      color: "#2dc76d",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CustomCheck = (props) => {
  const classes = useStyles(props);
  const { checked, color, handleChange, texto, disabled, style, textStyle} = props;
  return (
    <Grid container alignItems="center" className={classes.contenedor}>
      <GreenCheckbox
        className={classes.seleccionar}
        style={style}
        checked={checked}
        color={color}
        onChange={handleChange}
        disabled={disabled}
        inputProps={{ "aria-label": "controlled" }}
      />
      <span style={textStyle ?? { fontSize: "12px", wordBreak: "break-all" }}>{texto}</span>
    </Grid>
  );
};
CustomCheck.propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
  handleChange: PropTypes.any,
  texto: PropTypes.string,
  disabled: PropTypes.bool,
};
export default CustomCheck;
