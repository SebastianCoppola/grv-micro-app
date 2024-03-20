import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialogo = (props) => {
  const { handleAceptar, handleCancelar, openDialogo, titulo, texto, dialogoOk } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);

  };

  return (
    <div>
      <Dialog
        open = {openDialogo ? openDialogo : open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {titulo ?
          <DialogTitle id="alert-dialog-title">
            {titulo}
          </DialogTitle>
          : null
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {texto}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!dialogoOk ?
            <Button onClick={handleCancelar ? handleCancelar : handleClose}>Cancelar</Button>
            : null
          }
          <Button onClick={handleAceptar ? handleAceptar : handleClose} autoFocus>
            {dialogoOk ? "OK" : "ACEPTAR"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomDialogo
