import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
  circularProgress:{
    color:'#1473e6',
  }
}));

const Loader = (props ) => {
  const classes = useStyles(props);
  const { loading }= props; 

  return (
    loading ?
      <div className={classes.root}>
          <div className={classes.placeholder}>
              <Fade in={loading}>
                  <CircularProgress className={classes.circularProgress} />
              </Fade>
          </div>
      </div>
      : null
  );

}
Loader.propTypes = {
    loading: PropTypes.bool,
}
export default  Loader;