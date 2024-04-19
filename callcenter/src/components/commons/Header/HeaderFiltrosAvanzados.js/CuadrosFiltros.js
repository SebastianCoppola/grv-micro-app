import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import { Chip } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    margin:'10px'
  },
  chip: {
    //width: "121px",
    height: "30px",
    padding: "6px 7px 7px 10px",
    borderRadius: "5px",
    backgroundColor:'white',
    
  },
}));

export default function CuadroFiltros(props) {
  const { filtros, anchorEl, placement, open, setFiltros, setFiltrar} = props;
  const classes = useStyles();
  const [data, setData] = useState(filtros);
  const handleDelete = (chipToDelete, i) => () => {
    setData((chips) => chips.filter((chip) => chip[i] !== chipToDelete[i]));
    data.splice(i, 1);
    setFiltros(data);
    setFiltrar(true)
  };

  return (
    <div className={classes.root}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} style={{ display: "block" }} timeout={350}>
            <Paper style={{backgroundColor:'white', padding:'5px'}}>
              {data.map((data, i) => {
                while (i >= 7) {
                  return (
                    <Chip
                      key={data.key}
                      label={data.label}
                      onDelete={handleDelete(data, i)}
                      className={classes.chip}
                      style={{ display: "block", margin:'5px' }}
                    />
                  );
                }
              })}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
