import React from 'react'
import { Snackbar } from '@material-ui/core'
import CustomAlert from '../Alert/CustomAlert'

const CustomSnackBar = (props) => {

    const { autoHideDuration, title, vertical, severity, open, handleClose } = props

    return (
        <Snackbar 
            open={open} 
            autoHideDuration={autoHideDuration ?? 6000} 
            disableWindowBlurListener={true}
            onClose={handleClose}
            anchorOrigin={{ vertical: vertical ?? 'top', horizontal: 'center' }}
        >
            <CustomAlert 
                severity={severity} 
                onClose={handleClose} 
                hasClosed={true} 
                title={false}
                subtitle={title} 
            />
        </Snackbar>
    )
}

export default CustomSnackBar