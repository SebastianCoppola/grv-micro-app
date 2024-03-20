import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
//estilo 
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const classes = {
    root: {
        color: props => props.color,
        fontStretch: ' normal',
        fontStyle: 'normal',
        lineHeight: 1.3,
        letterSpacing: 'normal',
        '&.MuiTypography-h5': {
            fontSize: '27px',
            fontWeight: props => props.bold ? 'bold' : props.fontweight ? props.fontweight : 'normal',

        }
    }
};
const CustomTypography = props => {
    const { text, variant, component, gutterBottom, fontweight, sx, style } = props; 
    return (
        <Fragment>
            <Typography variant={variant} component={component}
                gutterBottom={gutterBottom} sx={{
                    color: props.color,
                    fontStretch: ' normal',
                    fontStyle: 'normal',
                    lineHeight: 1.3,
                    letterSpacing: 'normal',
                    '&.MuiTypography-h5': {
                        fontSize: '27px',
                        fontWeight: props.bold ? 'bold' : props.fontweight ? props.fontweight : 'normal',

                    }
                }} > {text} </Typography>
        </Fragment >
    );
};

CustomTypography.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.string,
    component: PropTypes.string,
    gutterBottom: PropTypes.bool,
    color: PropTypes.string,
    bold: PropTypes.bool,
    fontweight: PropTypes.string,
    sx: PropTypes.any,
    style: PropTypes.object,
};

export default CustomTypography;