import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { setDayWithOptions } from 'date-fns/fp';
//material-ui
import { IconButton, Menu, MenuItem, withStyles } from '@material-ui/core';
import MuiMenuItem from '@material-ui/core/MenuItem'
//estilos
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
menu:{
    '& .MuiMenu-paper':{
        left:'1000px'
    }
}
}))


const IconButtonMenu = props => {
    const classes = useStyles(props);
    const { icon, options, className, size, onClickItem, disabled, disabledMenu, disableSiniestroConPendientes,disableEditar } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      //  event.stopPropagation()
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment >
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                disabled={disabled}
                className={className}
                size={size}
            >
                {icon}
            </IconButton>
            
            <Menu 
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                 
                open={open}
                onClose={handleClose} 
            >
                {options ? options.map((option, index) => (
                    <MenuItem   key={index}  
                                disabled={ index !==0 && disabledMenu ? true : 
                                           index ===4 && disableSiniestroConPendientes ? true :
                                           index ===0 && disableEditar ? true : false}  
                                value={index} 
                                selected={option==='Pyxis'} 
                                onClick={onClickItem} 
                                className={classes.menu}
                    >
                        {option}
                    </MenuItem>
                )) : null}
            </Menu>
        </Fragment>
    );
};

IconButtonMenu.propTypes = {
    icon: PropTypes.element,
    options: PropTypes.array,
    className: PropTypes.any,
    size: PropTypes.string,
    onClickItem:PropTypes.any,
    disabled:PropTypes.any,
    disabledMenu:PropTypes.any,
};

export default IconButtonMenu;