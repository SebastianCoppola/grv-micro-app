import React, { useEffect } from 'react';
import { Fragment } from 'react';
//material-ui
import { IconButton, Menu, MenuItem, Tooltip, withStyles } from '@material-ui/core';
import MuiMenuItem from '@material-ui/core/MenuItem'
//estilos
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    menu: {
        '& .MuiMenu-paper': {
            left: '1000px'
        }
    }
}))

// Componente del boton de acciones que se utiliza solo en los tableros de Auditoria Medica (Revisado,Contacto Vencido,Estudios Pendientes).
/*
 Props:
    icon: icono a usar para el boton, 
    option1: Primera opcion del menu,
    onClickItem1: accion a la primera opcion del menu,
    option2: Segunda Opcion del menu,
    onClickItem2: accion a la segunda opcion del menu,
    tooltipMensaje: Mensaje que se le adhiere al pasar el mouse por la 2da opcion del menu,
    option3: Tercera Opcion del menu,
    onClickItem3: accion a la tercera opcion del menu,
*/
const IconButtonMenuAM = props => {
    const classes = useStyles(props);
    const { icon, option1, option2, option3, className, size, onClickItem1, onClickItem2, onClickItem3, disabled, tooltipMensaje } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
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
                <MenuItem onClick={onClickItem1}>{option1}</MenuItem>
                <Tooltip
                    placement='left'
                    title={tooltipMensaje}
                >
                    <MenuItem onClick={onClickItem2}>{option2}</MenuItem>
                </Tooltip>
                <MenuItem onClick={onClickItem3}>{option3}</MenuItem>
            </Menu>
        </Fragment>
    );
};

export default IconButtonMenuAM