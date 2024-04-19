import React, { Fragment } from 'react';
import PropTypes, { func } from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import CancelIcon from '@material-ui/icons/Cancel';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core';
/*
    severity: error
    severity: warning
    severity: info
    severity: success
*/
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '&.MuiAlert-outlinedError': {
            backgroundColor: "#ffe3e4"
        },
        '&.MuiAlert-outlinedSuccess': {
            backgroundColor: "#fcfff5"
        },
        '&.MuiAlert-outlinedWarning': {
            backgroundColor: "#fff7eb"
        },
        '&.MuiAlert-outlinedInfo': {
            backgroundColor: "#dff3ff"
        }
    }
}));
const CustomAlert = props => {
    const classes = useStyles();
    let icon = null;
    let title = 'Info';
    const [close, setClose] = React.useState(true);
    const closeAlert = () => {
        setClose(!close);
    }
    switch (props.severity) {
        case "error":
            icon = <CancelIcon />;
            title = 'Ha ocurrido un error';
            break;
        case "warning":
            icon = <WarningIcon />
            title = 'Advertencia';
            break;
        case "info":
            icon = <InfoIcon />
            title = 'Info';
            break;
        case "success":
            icon = <CheckCircleIcon />
            title = 'Todo está correcto';
            break;
        default:
            return <InfoIcon />;
    }
    return (
        <Fragment>
            {close ?
                <Alert variant="outlined" severity={props.severity}
                    style={{ marginBottom: "5px" }}
                    icon={icon}
                    className={classes.root}
                    onClose={props.hasClosed ? props.onClose ? props.onClose : closeAlert : undefined}>
                    {props.title ? <AlertTitle>{title}</AlertTitle> : null}
                    {props.subtitle}
                </Alert>
                : null}
        </Fragment>
    );
};

export default CustomAlert;
CustomAlert.propTypes = {
    severity: PropTypes.string,
    hasClosed: PropTypes.bool,
    title: PropTypes.bool,
    subtitle: PropTypes.string,
    onClose: PropTypes.func
};