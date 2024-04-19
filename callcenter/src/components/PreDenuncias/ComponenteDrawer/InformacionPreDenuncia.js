import { Grid, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import CustomTypography from '../../commons/Typography/CustomTypography';
import Utils from '../../../Utils/utils';

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#505050',
        fontSize: '17px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
    },
    texto: {
        color: '#4b4b4b',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        textAlign: 'left',
    }
}));

const InformacionPreDenuncia = props => {
    const { data, dataInfo } = props;
    const classes = useStyles(props);
    return (
        <Fragment>
            <Grid item xs={12}>
                <CustomTypography text={'Datos médicos'} className={classes.title} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography style={{ marginTop: '8px' }} text={`Fecha de ocurrencia: ${data ? Utils.dateFormat6(data.fechaOcurrencia, data.horaOcurrencia) : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Tipo de siniestro: ${data && data.tipoSiniestro ? data.tipoSiniestro : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Centro médico primera asistencia: ${data && data.medico ? data.medico : ''}`} className={classes.texto} />
            </Grid>

            <Grid item xs={12}>
                <CustomTypography text={`Relato del caso: ${data && data.relatoCaso ? data.relatoCaso : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text='Datos del empleado' style={{ marginTop: '20px' }} className={classes.title} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography style={{ marginTop: '8px' }} text={`DNI: ${data && data.dni ? data.dni : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Nombre: ${data && data.nombre ? data.nombre : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Dirección: ${data && data.direccion ? data.direccion : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Teléfono: ${data && data.telefono ? data.telefono : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Empleador: ${dataInfo && dataInfo.empleador ? dataInfo.empleador : ''}`} className={classes.texto} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography text={`Cuit empleador: ${data && data.cuitEmpleador ? data.cuitEmpleador : ''}`} className={classes.texto} />
            </Grid>
        </Fragment>
    );
};

export default InformacionPreDenuncia;