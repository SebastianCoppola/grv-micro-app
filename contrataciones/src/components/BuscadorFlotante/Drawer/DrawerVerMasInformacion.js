import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import CustomTypography from "../../commons/Typography/CustomTypography";
import CustomCardBuscador from "./CustomCardBuscador";

const useStyles = makeStyles({
    espacio: {
        paddingTop: '10px'
    },
    card: {
        padding: '5px 0px'
    },
    tipografia: {
        fontSize: '13px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.27',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: 'var(--505050)',
    }
})

const DrawerVerMasInformacion = (props) => {
    const classes = useStyles(props);
    const { data } = props
    
    return (
        <Grid container >
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Centro Médico Propio: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.centroMedicoPropio === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Convenio Activo: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.convenioActivo ===1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>

            <Grid item xs={10}>
                <CustomCardBuscador>
                    <Grid item container spacing={2} className={classes.card}>
                        <CustomTypography
                            style={{ lineHeight: '20px' }}
                            className={classes.tipografia}
                            text={`Observaciones: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.observaciones ? data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.observaciones : ''}`}
                            variant="body2" />
                    </Grid>
                </CustomCardBuscador>
            </Grid>
            <Grid item xs={10}>
                <CustomCardBuscador>
                    <Grid item container spacing={2}>
                        <CustomTypography
                            style={{ lineHeight: '20px' }}
                            className={classes.tipografia}
                            text={`Notas: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.notas ? data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.notas : ''}`}
                            variant="body2" />
                    </Grid>
                </CustomCardBuscador>
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Tipo: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.tipoCentroMedico ? data.prestadorMedicoDTO.tipoCentroMedico : ''}`} className={classes.tipografia} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Código Tango: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.codigoTango ? data.prestadorMedicoDTO.codigoTango : ''}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12} className={classes.espacio}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red Colonia Suiza: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redColoniaSuiza ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red GCC ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redGcc === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red GPBA: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redGpba ===1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red MZA: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redMza === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red Provart: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redProvart === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12} >
                <CustomTypography
                    className={classes.tipografia}
                    text={`Red Catamarca: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.redCatamarca === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12} className={classes.espacio}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Primera Asistencia: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.primeraAsistencia === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Tiene RMN: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.tieneRmn === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Tiene TAC: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.tieneTac === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Servicio 24 hs: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.servicio24h === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    className={classes.tipografia}
                    text={`Visible en Cartilla: ${data && data.prestadorMedicoDTO && data.prestadorMedicoDTO.visibleEnCartilla === 1 ? 'Sí' : 'No'}`} variant={'body2'} />
            </Grid>
        </Grid>
    )
}
export default DrawerVerMasInformacion