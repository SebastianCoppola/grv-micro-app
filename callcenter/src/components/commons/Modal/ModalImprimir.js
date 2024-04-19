import { Dialog, DialogTitle } from '@material-ui/core'
import React from 'react'

const ModalImprimir = (props) => {
    const { children, openModal, handleClose, maxWidth, fullScreen } = props
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            onClose={handleClose}
            open={openModal}
            maxWidth={maxWidth}
            fullWidth
            fullScreen ={fullScreen}
        >
            <DialogTitle id="draggable-dialog-title">
                {children}
            </DialogTitle>
        </Dialog>
    )
}
export default ModalImprimir