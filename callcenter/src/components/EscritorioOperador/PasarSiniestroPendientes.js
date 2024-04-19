import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
//estilos
import { makeStyles } from '@material-ui/core/styles';
//material-ui
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
//componentes
import CustomTypography from '../commons/Typography/CustomTypography';
import SVGCortoPunzante from '../../commons/assets/Alarmas/CortoPunzante.svg'
import SVGDiagnostico from '../../commons/assets/Alarmas/Diagnostico.svg'
import SVGSeguimientoAmbulancia from '../../commons/assets/Alarmas/SeguimientoAmbulancia.svg'
import CustomText from '../commons/TextField/CustomText';
import CustomCheck from '../commons/CustomCheck/CustomChek';
import CustomLoading from '../commons/Loading/CustomLoading';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  titulo: {
    fontSize: '19px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#323232',

  },
  nota: {
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#747474',
  },
  aclaracion: {
    fontSize: '15px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'italic',
    lineHeight: 1.18,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#959595',
    margin: '8px 0 6px',
  },
  paper: {
    margin: '24px 0 20px',
    padding: '20px 0px 22px 12px',
    borderRadius: '4px',
    border: 'solid 1px #eaeaea',
    backgroundColor: '#ffffff',
    boxShadow: 'none'
  },
  card: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    margin: '4px 0 4px 0px'
  },
  imagen: {
    margin: '8px 0 0 8px'
  },
  tituloPaper: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#2c2c2c',
    marginBottom: '12px'
  },
  textPaper: {
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.29,
    letterSpacing: 'normal',
    textAlign: 'left',
    color: '#707070',
    marginLeft: 22
  }
});

const PasarSiniestroPendientes = (props) => {
  const classes = useStyles(props);
  const { alarmas, setValMultiline, valMultiline } = props;
  let loadingEnviarApendientes = useSelector(state => state.documentos.loadingEnviarApendientes)

  const changeMultiline = (event) => {
    if (setValMultiline) {
      setValMultiline(event.target.value)
    }
  }

  return (
    <div className={classes.root}>
      <CustomLoading loading={loadingEnviarApendientes}/>
      
      <Grid container justify={'center'} alignItems={'center'} style={{ margin: '20px 0px 0px 19px', paddingRight: '20px' }} >
        
        <Grid item xs={12}>
          <CustomTypography className={classes.nota} text={'Notas de ayuda'} />
        </Grid>
        
        <Grid item xs={12}>
          <CustomText
            multiline = {true}
            placeholder = {'Aquí puedes dejar escrito todos los datos que ayuden a continuar el seguimiento de este siniestro.'}
            fullwidth = {true}
            id = 'relato'
            shrink = {true}
            onChange = {(event) => changeMultiline(event)}
            value = {valMultiline}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Divider style={{ margin: '4px 0px 0px 0px', color: '#eaeaea', borderRadius: '1px' }} />
        </Grid>
        
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container alignItems={'center'}>
              <Grid item xs={12}>
                <CustomTypography className={classes.tituloPaper} text={'Alarmas activas sin pendientes'} />
              </Grid>
              {
                alarmas ? alarmas.map((item) => {
                  if (!item.pendiente) {
                    return (
                      <Fragment>
                        <Grid item xs={1}>
                          <Paper elevation={0} className={classes.card} style={{ backgroundColor: 'rgba(255, 112, 82, 0.1)' }} >
                            <img className={classes.imagen} src={item.codigo === 1 ? SVGCortoPunzante : item.codigo === 2 ? SVGDiagnostico : item.codigo === 3 ? SVGSeguimientoAmbulancia : null} alt={item.descripcion} />
                          </Paper>
                        </Grid>
                        <Grid item xs={11} >
                          <CustomTypography className={classes.textPaper} text={item.descripcion} />
                        </Grid>
                      </Fragment>
                    )
                  }
                })
                  : null}
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </div >
  );
}

export default PasarSiniestroPendientes
