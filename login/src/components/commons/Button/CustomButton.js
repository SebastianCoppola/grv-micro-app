import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//material-ui 
//estilo 
import { Button, Typography } from '@mui/material'; 
const CustomButton = props => {
    const { variant, label, disabled, href, onChange, color, startIcon, endIcon, onClik, size, styleLabel, styleButton } = props

    return (
        <Fragment>
            <Button onChange={onChange} size={size} variant={variant} disabled={disabled} href={href} color={color} onClick={onClik}
                startIcon={startIcon} endIcon={endIcon} sx={{
                    borderRadius: props.isAction ? "20px" : "6px",
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontSize: '15px',
                    width: props.width,
                    height: props.height,
                    '&..MuiIconButton-colorInherit': {
                        backgroundColor: 'red'
                    },
                    '&.MuiButton-containedPrimary': {
                        color: "#fff",
                        backgroundColor: "#1473e6",

                        '&:hover': {
                            backgroundColor: "#0d66d0",
                        },
                        "&.Mui-disabled": {
                            background: "#f4f4f4",
                            color: "#bcbcbc",
                            border: "none",
                        },
                    }
                }} style={styleButton}>
                <Typography style={styleLabel} sx={{
                    fontSize: '15px'
                }}>{label}</Typography></Button>
        </Fragment>
    );
};

CustomButton.propTypes = {
    variant: PropTypes.string,
    label: PropTypes.string,
    action: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    color: PropTypes.string,
    startIcon: PropTypes.any,
    endIcon: PropTypes.any,
    onClik: PropTypes.any,
    size: PropTypes.string,
    width: PropTypes.string,
    actionTable: PropTypes.bool,
    onChange: PropTypes.any,
    height: PropTypes.string,
    actionTable: PropTypes.bool,
    styleLabel: PropTypes.any,
    styleButton: PropTypes.object,

};

export default CustomButton;