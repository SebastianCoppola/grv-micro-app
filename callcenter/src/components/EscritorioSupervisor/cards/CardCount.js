import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Avatar, Button, Grid } from '@material-ui/core';
import CustomButton from '../../commons/Button/CustomButton';

const useStyles = makeStyles({
  avatar: {
    width: '48px',
    height: '48px',
    margin: '0 13px 10.5px',
    textAlign: 'center',
    backgroundColor: props => props.color
  },
  count: {
    fontSize: '22px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: 'normal',
    color: '#4b4b4b',
    textAlign: 'center'
  },
  title: {
    fontSize: '13.5px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#4b4b4b',
    textAlign: 'center'
  },
});

const CardCount = (props) => {
  const classes = useStyles(props);
  const { verDetalle, count, icon, title } = props;
  return (
    <Grid container direction={'row'} justify={'center'} alignContent={'center'} style={{ height: '100' }} >

      <Grid item >
        <Avatar className={classes.avatar} >
          <img src={icon} style={{ width: '25px', height: '25px' }} />
        </Avatar>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.count}>
          {count}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.title}>
          {title}
        </Typography>
      </Grid>
      <Grid id={"show"} item>
        <CustomButton
          styleLabel={{ fontSize: '11px', fontWeight: 'bold', color: '#ffffff' }}
          styleButton={{ backgroundColor: '#1473e6', marginTop: '7px' }}
          startIcon={false}
          width={'95px'}
          height={'30px'}
          label={"Ver Detalle"}
          onClik={() => verDetalle(title)}
          variant={"contained"}
          isAction={true}
        />
      </Grid>
    </Grid>

  );
}

export default CardCount
