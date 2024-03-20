import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Snackbar, MuiAlert, Alert } from '@mui/material';
import CustomAlert from '../CustomAlert/customAlert';

const CustomSnackBar = (props) => {
    const [state, setState] = useState({
        vertical: props.vertical ? props.vertical : 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }}
            open={props.open} autoHideDuration={6000} disableWindowBlurListener={true}
            onClose={props.handleClose}
        >
            <Alert severity={props.severity} onClose={props.handleClose} hasClosed={true} title={false}
                subtitle={props.title} />
        </Snackbar>
    );
}
export default CustomSnackBar;
CustomSnackBar.propTypes = {
    title: PropTypes.string,
    severity: PropTypes.string,
    open: PropTypes.bool
};