import React from 'react'
import Utils from '../../../Utils/utils'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
// Material UI
import { Divider, FormControlLabel, Grid, makeStyles, Radio } from '@material-ui/core';
import * as actions from '../../../redux/actions/index';
//Componentes
import CustomChip from '../../commons/Chip/CustomChip';
import CustomTypography from '../../commons/Typography/CustomTypography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '9px 19px 4px 8px',
        borderRadius: '4px',
        border: props => `solid 2px ${props.valueActual == props.value ? '#1473e6' : '#eaeaea'}`,
        backgroundColor: "#ffffff",
        marginTop: props => props.index === 0 ? '12px' : '4px',
        marginBottom: '4px',
        paddingBottom: '8px'
    },
    nroSiniestro: {
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#1473e6',
        textDecoration: 'underline',
    },
    radio: {
        marginLeft: '5px',
        marginRight: '2px'
    },
    fechaTitulo: {
        fontSize: '15px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.27,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#747474',
        marginLeft: '5px',
        marginBottom: '5px'
    },
    fecha: {
        fontSize: '14px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
        marginBottom: '5px'
    },
    nombreTitulo:{
        fontSize: '15px',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
        marginLeft: '5px',
        
    },
    nombre:{
        fontSize: '14px',
        fontWeight: 600,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
    }

}));

const SiniestosAnteriores = (props) => {
    const { data, value, radioButton, DatosAmpliados } = props;
    const classes = useStyles(props);
    const history = useHistory();
    const dispatch = useDispatch()
    const colorChip = (colorEstadoMedico) => {
        switch (colorEstadoMedico) {
            case 0:
                return 'Gris'
            case 1:
                return 'Verde'
            case 2:
                return 'Rojo'
            default:  
                return 'Gris'
        }
    }
    const click = (event) => {       
    
        if(event.type ==='click'){
            dispatch(actions.searchDenunciaById(data.idDenuncia, data.estadoCEM, callbackRedireccionDenuncia))
        }
        event.preventDefault()
    }
 
    const callbackRedireccionDenuncia = (succes, event) => {
        if (succes ) {
                history.push({
                    pathname: '/home/editar'
                })
            }     
    }

    return (
        <Grid container alignItems={'center'} className={classes.root}>
            <Grid item xs={12} container alignItems={'center'} justify={'space-between'} >
                {radioButton ? 
                    <Grid item >
                        <FormControlLabel onChange={click}
                            value={value.toString()} 
                            className={classes.nroSiniestro} 
                            control={<Radio color="default" className={classes.radio} />}
                            label={
                                <div onClick={(event)=>click(event)}> 
                                    {data ? Utils.nroAsignadoProvisorio(data) : ''} 
                                </div>
                            } 
                        />
                    </Grid> 
                
                : 
                    <Grid item>
                        <CustomTypography className={classes.fechaTitulo} text={value} />
                    </Grid>
                }
                
                {DatosAmpliados ?
                    data && data.estadoMedicoDescripcion !== null ?
                        <Grid item>
                            <CustomChip
                                fontSize={true}
                                label={data && data.estadoMedicoDescripcion !== null ? data.estadoMedicoDescripcion : null}
                                colorLabel={colorChip(data && data.colorEstadoMedico)}
                            />
                        </Grid>
                    : null
                :
                    <Grid item>
                        <CustomChip
                            fontSize={true}
                            label={data && data.estadoCEM === 0 ? 'Incompleto' : data && data.estadoCEM === 1 ? 'Completo' : data && data.estadoCEM === 2 ? 'Borrador' : ''}
                            colorLabel={data && data.estadoCEM === 0 ? 'Incompleto' : data && data.estadoCEM === 1 ? 'Completo' : data && data.estadoCEM === 2 ? 'Borrador' : ''}
                        />
                    </Grid>
                }
            </Grid>
            <Grid item xs={12} style={{ marginTop: '5px', marginBottom: '8px' }}>
                <Divider />
            </Grid>
            <Grid item xs={2}>
                <CustomTypography className={classes.fechaTitulo} text={"Fecha: "} />
            </Grid>
            <Grid item xs={10}>
                <CustomTypography className={classes.fecha} text={data && Utils.dateFormat5(data.fechaOcurrencia)} />
            </Grid> 
            {DatosAmpliados ?
                <>
                    <Grid item xs={3}>
                        <CustomTypography className={classes.fechaTitulo} text={"Empleador: "} />
                    </Grid>

                    <Grid item xs={8}>
                        <CustomTypography 
                            className={classes.fecha} 
                            text={data && data.empleadorRazonSocial ? data.empleadorRazonSocial : ''} 
                            />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTypography className={classes.fechaTitulo} text={"Cliente: "} />
                    </Grid>

                    <Grid item xs={8}>
                        <CustomTypography 
                            className={classes.fecha} 
                            text={data && data.clienteRazonSocial ? data.clienteRazonSocial : ''} />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTypography className={classes.nombreTitulo} text={"Paciente: "} />
                    </Grid>

                    <Grid item >
                        <CustomTypography 
                            className={classes.nombre} 
                            text={data  ? Utils.getNombreYApellidoAccidentado(data) : ''} />
                    </Grid>
                </>
                : null}
        </Grid>
    )
}

export default SiniestosAnteriores
