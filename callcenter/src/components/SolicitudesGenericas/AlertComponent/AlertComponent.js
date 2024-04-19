import React from 'react';
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";

import { ReactComponent as AlertIcon } from '../../../commons/assets/IconsSolicitudesGenericas/alertIcon.svg';

export const useStyles = makeStyles((theme) => ({
    alert: {
        border: '1px solid',
        borderRadius: 5,
    },
    info: {
        borderColor: '#5151d3',
        color: '#5151d3',
        backgroundColor: '#eff4fc',
    },
    error: {
        borderColor: '#ff7052',
        color: '#ff7052',
        backgroundColor: 'rgba(255, 112, 82, 0.1)'
    }
}));

const AlertComponent = ({ severidad, texto }) => {
    const classes = useStyles();

    return (
        <Box display="flex" alignItems="center" p={1} className={[classes.alert].concat(classes[severidad]).join(' ')}>
            <Box mr={1}><AlertIcon /></Box>
            <Typography style={{fontSize:14}}>{texto}</Typography>
        </Box>
    );
};

AlertComponent.propTypes = {
    severidad: PropTypes.oneOf(['info', 'error']).isRequired,
    texto: PropTypes.string
};

export default AlertComponent;
