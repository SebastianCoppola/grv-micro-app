import React from 'react'
import { Box, Divider, Grid, Typography, makeStyles } from '@material-ui/core';
import CustomButton from '../../../commons/Button/CustomButton';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 20,
    margin: "auto",
    borderRadius: 8,
    border: '1px solid #dadce0',
    minHeight: 110,
  }
}));

const ServicioDeTraslados = (props) => {
  const{ addTraslado } = props
  const classes = useStyles();

  return (
    <>
      <Box p={3} className={classes.card} style={{ width: 500 , marginBottom: 70 }}>
          <Grid container direction="column" spacing={2}>
              <Grid container justify="space-between" item>
                  <Grid item>
                      <Typography variant="h6"><b>Convenio de Traslado</b></Typography>
                  </Grid>
              </Grid>
              <Grid item><Divider /></Grid>
              <Grid item>
                  <Typography className={classes.descripcion}>No posee un convenio actual. ¿Desea agregar uno?</Typography>
                  {/* DRAWER AGREGAR CONVENIO */}
              </Grid>
              <Grid item container>
                <Grid item style={{marginLeft:"auto"}}>
                  <CustomButton 
                    variant={'contained'}
                    color='primary'
                    onClik={()=>addTraslado()}
                    label={"Agregar Convenio"}
                  />
                </Grid>
              </Grid>
          </Grid>
      </Box>
    </>
  )
}

export default ServicioDeTraslados
