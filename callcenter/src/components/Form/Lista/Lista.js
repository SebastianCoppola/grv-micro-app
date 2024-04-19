import React from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Grid, Paper, Divider, FormControlLabel, Radio, makeStyles } from '@material-ui/core'
//Utils
import Utils from '../../../Utils/utils'
//Components:
import CustomTypography from '../../commons/Typography/CustomTypography'
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import Chip from '../../commons/Chip/Chip'

const useStyles = makeStyles({
    root: {
        padding: '9px 19px 4px 8px',
        borderRadius: '4px',
        border: props => `solid 2px ${props.valueActual === props.value ? '#1473e6' : '#eaeaea'}`,
        backgroundColor: "#ffffff",
        marginTop: props => props.index === 0 ? '12px' : '4px',
        marginBottom: '4px',
        paddingBottom: '8px'
    },
    nombreTitulo: {
        fontSize: '15px',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
    },
    nombre: {
        fontSize: '14px',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
    }
})

const Lista = (props) => {
    
    const classes = useStyles(props)
    
    const { datos, valueForm } = props
    
    return (
        <Paper variant='outlined' style={{ padding: '10px' }} className={classes.root}>
            <Grid container alignItems='center' spacing={2}>
                <Grid container alignItems='center' justify='space-between'>
                    <Grid item container xs={1} alignItems='center' spacing={2}>
                        <Grid item style={{ marginLeft: '10px' }}>
                            <FormControlLabel 
                                value={(valueForm).toString()} 
                                control={<Radio color="default" />}
                                label={<strong>{datos ? Utils.nroAsignadoProvisorio(datos) : ''}</strong>} 
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={7} alignItems='center' justify='flex-end' spacing={2}>
                        <Grid item style={{ paddingRight: '20px' }}>
                            <CustomTypography
                                text={
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ paddingRight: '5px' }}>
                                            Fecha de Ocurrencia:
                                        </div>
                                        <div> 
                                            {Utils.dateFormat(datos && datos.fechaOcurrencia)}
                                        </div>
                                    </div>
                                }
                                variant='body2' 
                            />
                        </Grid>
                        <Grid item style={{ paddingRight: '20px' }}>
                            <Chip 
                                size={"small"}
                                style={Utils.getEstiloByEstadoMedico(
                                    datos && datos.estadoMedicoIdEstadoMedico, 
                                    datos && datos.rechazadoPorArt
                                )}
                                label={datos && datos.estadoMedicoDescripcion} 
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={3}>
                    <CustomTypography text={'Diagnóstico de certeza:'} variant='subtitle2' />
                </Grid>
                <Grid item xs={9}>
                    <CustomTypography variant='body2' text={datos && datos.diagnosticoDeCerteza ? datos.diagnosticoDeCerteza : "-"} />
                </Grid>
                <Grid item xs={1}>
                    <CustomTypography text={'CIE10:'} variant='subtitle2' />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography text={datos && datos.diagnosticoCie10Descripcion ? datos.diagnosticoCie10Descripcion : "-"} variant='subtitle2' />
                </Grid>
                <Grid item xs={2}>
                    <CustomTypography text={'Tipo Accidente:'} variant='subtitle2' />
                </Grid>
                <Grid item xs={3}>
                    <CustomTypography text={datos && datos.tipoSiniestroDescripcion ? datos.tipoSiniestroDescripcion : "-"} variant='subtitle2' />
                </Grid>
                <Grid item xs={3}>
                    <CustomTypography text={'Fecha Alta Médica:'} variant='subtitle2' />
                </Grid>
                <Grid item xs={3}>
                    <CustomTypography text={datos && datos.fechaAltaMedica ? Utils.dateFormat(datos && datos.fechaAltaMedica) : "-"} variant='subtitle2' />
                </Grid>
                <Grid item xs={6}>
                    <CustomCheck
                        checked={datos && datos.rechazadoPorArt}
                        disabled={true}
                        texto={"Rechazo"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <CustomCheck
                        checked={datos && datos.dictamen}
                        disabled={true}
                        texto={"Dictamen"}
                    />
                </Grid>
                <Grid item xs={2}>
                    <CustomTypography className={classes.nombreTitulo} text={"Paciente: "} />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography
                        className={classes.nombre}
                        text={datos ? Utils.getNombreYApellidoAccidentado(datos) : ''}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

Lista.propTypes = {
    datos: PropTypes.any,
    checkReingresoForm: PropTypes.bool,
    setCheckReingresoForm: PropTypes.any,
    handleCheckedReingresoForm: PropTypes.any,
    listaReingreso: PropTypes.any,
    index: PropTypes.any,
    valueForm: PropTypes.any
}

export default Lista