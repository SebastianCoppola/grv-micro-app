import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
//estilo
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    
      "& > *": {
        margin: props => !props.margin ? theme.spacing(0.5) :0,
        borderRadius:'5px',
        backgroundColor: props => props.color  ==='Abierto' ? '#2F61D52B' : props.color ==='Cerrado' ? '#e9f9f0': '#ffffff', 
        color:props=> props.color ==='Abierto' ? '#2f61d5': props.color ==='Cerrado' ? '#2dc76d':null
      }
    }
  }));
  
const Chip2 = (props) => {
    const { avatar, label, variant, color, size, margin } = props
    const classes = useStyles(props);
    return(
        <div className={classes.root}>
            <Chip  size={size} color={color}  avatar={avatar} label={label} variant={variant} />
            </div>
    )

}
Chip2.propTypes = {
    avatar:PropTypes.any,
    label:PropTypes.string,
    variant:PropTypes.string,
    color:PropTypes.string,
    size:PropTypes.string,
    margin:PropTypes.any
};
export default Chip2