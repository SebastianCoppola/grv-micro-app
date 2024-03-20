import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';



const classes = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  }   
}));

const Loader = (props) => {
  const { loading } = props;

  return (
    loading ?
      <div sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div sx={{
          height: 40
        }}>
          <Fade in={loading}>
            <CircularProgress sx={{
              color: '#1473e6'
            }} />
          </Fade>
        </div>
      </div>
      : null
  );

}
Loader.propTypes = {
  loading: PropTypes.bool,
}
export default Loader;