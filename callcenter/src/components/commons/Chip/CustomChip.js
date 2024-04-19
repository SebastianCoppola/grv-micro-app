import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import Chip from '@material-ui/core/Chip';
//estilo
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {

    "& > *": {
      fontSize: props => props.fontSize ? '12px' :"16px",
      fontWeight: props => props.fontWeight ? "bold" : "normal",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: 1.3,
      letterSpacing: "normal",
      borderRadius: props => props.isCount ? "16px" : "5px",
      height: props => props.isCount ? '24px' : props.height,
      backgroundColor: props => props.colorLabel === 'Abierto' || props.colorLabel === 'Incompleto' || props.colorLabel === 'En Gestión' ? 'rgba(47, 97, 213, 0.1)' : 
                                props.colorLabel === 'Cerrado' || props.colorLabel === 'Completo' || props.colorLabel==='Confirmado' || props.colorLabel==='Verde' ?  '#e9f9f0' :
                                props.colorLabel === 'Borrador' || props.colorLabel === 'Gris' ? '#f5f5f5' :
                                props.colorLabel === 'Rojo' ? 'rgba(255, 112, 82, 0.1)':
                                props.colorLabel === 'Amarillo' ? 'rgba(255, 205, 113, 0.27)':
                                props.color,

      color: props => props.colorLabel === 'Abierto' || props.colorLabel === 'Incompleto' || props.colorLabel === 'En Gestión' ? '#2f61d5' : 
                      props.colorLabel === 'Cerrado' || props.colorLabel === 'Completo' || props.colorLabel==='Confirmado' || props.colorLabel==='Verde' ? '#2dc76d' : 
                      props.colorLabel === 'Borrador' || props.colorLabel === 'Gris' ? '#959595' :
                      props.colorLabel==='Rojo'? '#e34850' : 
                      props.colorLabel==='Amarillo' ? '#FDC800': props.colorLabel ,

      border: props => `solid 1px 
        ${props.colorLabel === 'Abierto' || props.colorLabel === 'Incompleto' || props.colorLabel === 'En Gestión' ? '#2f61d5' 
        : props.colorLabel === 'Cerrado' || props.colorLabel === 'Completo' || props.colorLabel==='Confirmado' || props.colorLabel==='Verde' ? '#2dc76d' 
        : props.colorLabel === 'Borrador' || props.colorLabel === 'Gris' ? '#959595'
        : props.colorLabel=== 'Rojo'? '#e34850' :
        props.colorLabel==='Amarillo' ? '#FDC800' :  props.color}`
    },
  },
  action: {
    width: '48px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: props => props.color,
    fontSize: "11px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.7,
    letterSpacing: 0.78,
    color: props => props.colorLabel,

    '& .MuiChip-clickable:hover, .MuiChip-clickable:focus': {
      backgroundColor: props => props.color,
    },
    '& .MuiChip-clickable:visible': {
      border: props => `2px solid ${props.colorLabel}`,
    },
  }
}));

const CustomChip = (props) => {
  const { avatar, label, variant, size, isAction, onClick, style, icon, handleDelete, id,disabled } = props;
  const classes = useStyles(props);

  return (
    <div className={isAction ? classes.action : classes.root}>
      <Chip 
        disabled={disabled} 
        onClick={onClick} 
        id={id} 
        size={size}
        style={style} 
        avatar={avatar} 
        label={label} 
        variant={variant} 
        className={isAction ? classes.action : null} 
        deleteIcon={icon} 
        onDelete={handleDelete && handleDelete}
      />
    </div>
  )
}

CustomChip.propTypes = {
  avatar: PropTypes.any,
  label: PropTypes.string,
  variant: PropTypes.string,
  isCount: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  colorLabel: PropTypes.string,
  isAction: PropTypes.bool,
  style: PropTypes.any,
  fontWeight: PropTypes.any,
  fontSize:PropTypes.bool,
  id:PropTypes.any,
  disabled:PropTypes.any
};

export default CustomChip