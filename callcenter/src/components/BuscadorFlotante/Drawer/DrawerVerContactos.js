import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from '@material-ui/styles';
import contactoPrivado from '../../../commons/assets/BuscadorFlotante/contactoPrivado.png'
import contactoPublico from '../../../commons/assets/BuscadorFlotante/contactoPublico.png'
import CustomCardBuscador from "./CustomCardBuscador";
import CustomTypography from "../../commons/Typography/CustomTypography";
import CustomAlert from '../../commons/CustomAlert/customAlert';

const useStyles = makeStyles({
    card: {
        padding: '5px 0px'
    }
})

const DrawerVerContactos = (props) => {
    const classes = useStyles(props);
    const { data } = props

    return (
        <Grid container >
            {data && data.proveedorContactoDTO ? data.proveedorContactoDTO.map((it) => (
                <CustomCardBuscador >
                    <Grid item xs={2}>
                        <img src={it && it.visibilidad === 'Público' ?  contactoPublico : contactoPrivado } />
                    </Grid>
                    <Grid item container xs={9} className={classes.card} spacing={2}>
                        <Grid item xs={12}>
                            <CustomTypography
                                text={`Tipo de contacto: ${it && it.tipoContacto}`}
                                variant={'body2'} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography
                                text={`Nombre: ${it && it.nombreContacto}`}
                                variant={'body2'} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography
                                text={`Teléfono: ${it && it.telefonoContacto}`}
                                variant={'body2'} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography
                                text={`Mail: ${it && it.mailContacto}`}
                                variant={'body2'} />
                        </Grid>
                    </Grid>
                </CustomCardBuscador>
            ))
                : 
                <CustomAlert
                        message={'No se encontraron contactos registrados.'}
                       // onClose={handleClose}
                        variant={'outlined'}
                        severity='error'
                        //open={operError} 
                        />
              
            }

        </Grid>
    )
}
export default DrawerVerContactos