import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import * as actions from '../../../redux/actions/index'
import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
//componentes
import CustomTypography from '../../commons/Typography/CustomTypography';
//iconos
import contactPhone from '../../../commons/assets/contactPhone.png'
import badgeBlack from '../../../commons/assets/badgeBlack.png'
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import CustomChip from '../../commons/Chip/CustomChip';
import Utils from '../../../Utils/utils'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%'
    },
    iconCommentFailed: {
        backgroundColor: 'rgba(255, 112, 82, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px',

    },
    iconComment: {
        backgroundColor: 'rgba(47, 97, 213, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px',
    },
    subtexto: {
        fontSize: '9px',
        color: '#959595'
    }
}));

const Resumen = (props) => {
    const classes = useStyles(props);
    const { datos, denuncia } = props
    const detalle = useSelector(state => state.consultasReclamos.detalleReclamo ? state.consultasReclamos.detalleReclamo : [])
    const dispatch = useDispatch()

    let nombreApellido = detalle ? `${Utils.stringNull(detalle.apellidoAccidentado)} ${Utils.stringNull(detalle.nombreAccidentado)}` : ''

    useEffect(() => {
        if (datos) {
            dispatch(actions.searchDetalleReclamo(datos ? datos.idContactoCallCenter : null))
        }
    }, [])

    return (
        <Grid container spacing={1} >
            <Grid item spacing={1} container style={{ backgroundColor: '#f5f5f5', padding: '20px', }}>
                <Grid item container spacing={2} justify='space-between'>
                    <Grid item xs={4}>
                        <CustomTypography text={<div style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '10px', fontWeight: 500 }}>
                                Denuncia:
                            </div>
                            <div >
                                {
                                    datos ? Utils.nroAsignadoProvisorio2(datos) : ''}</div>
                        </div>}
                            variant={'subtitle1'} />
                    </Grid>
                    <Grid item >
                        <CustomChip
                            isCount={true}
                            // fontSize={true}
                            style={{ backgroundColor: '#ffffff' }}
                            color={'#ffffff'}
                            colorLabel={'#2dc76d'}
                            label={datos && datos.estadoMedico ? datos.estadoMedico : ''} />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div >
                            <img src={contactPhone} style={{ paddingRight: '10px' }} />
                        </div>
                        <div > Accidentado: {nombreApellido}</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div >
                            <img src={contactPhone} style={{ paddingRight: '10px' }} />
                        </div>
                        <div > Tel: {datos && datos.telefono ? datos.telefono : ''}</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
                <Grid item>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div >
                            <img src={badgeBlack} style={{ paddingRight: '10px' }} />
                        </div>
                        <div >Documento: {datos && datos.nroDocAccidentado ? datos.nroDocAccidentado : ''}</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
            </Grid>

            <Grid container
                style={{ padding: '5px', border: '1px solid #eaeaea', margin: '15px 0px' }}
                alignItems='flex-start'
            >
                <Grid item container direction='column' xs={2} style={{ display: 'block' }} >

                    {datos && datos.failed ?
                        <Grid container alignItems='center' >
                            <Grid item className={classes.iconCommentFailed}>
                                <SmsFailedOutlinedIcon fontSize='large' htmlColor={'#ff7052'} />
                            </Grid>
                        </Grid>
                        :
                        <Grid container alignItems='center'>
                            <Grid item className={classes.iconComment}>
                                <SmsOutlinedIcon htmlColor={'#2f61d5'} />
                            </Grid>
                        </Grid>
                    }
                </Grid>

                <Grid item container direction='column' xs={10} spacing={1}>
                    <Grid item>
                        <CustomTypography
                            text={<strong> Mensaje </strong>}
                            variant='body2'
                            fontweight={'600'} />
                    </Grid>
                    <Grid item>
                        <CustomTypography
                            text={<div> {detalle && detalle.mensaje ? detalle.mensaje : ''} </div>}
                            variant='body2' />
                    </Grid>
                    <Grid item className={classes.subtexto}>
                        <CustomTypography
                            text={<div> {datos && datos.fecha ? datos.fecha : ''} </div>}
                            variant='body2' />
                    </Grid>
                    <Grid item className={classes.subtexto}>
                        <CustomTypography
                            text={<div style={{ display: 'flex' }}>
                                <div style={{ paddingRight: '5px' }}>
                                    Operador:
                                </div>
                                <div> {datos && datos.operador ? datos.operador : ''} </div>
                            </div>}
                            variant='body2' />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    text={<strong> Respuesta </strong>}
                    variant='body2'
                    fontweight='600' />
            </Grid>
            {detalle && detalle.observaciones ? detalle.observaciones.map((item) => {
                return (
                    <Fragment>

                        <Grid item xs={12}>
                            <CustomTypography
                                text={<div> {item && item.comentario ? item.comentario : ''} </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12} className={classes.subtexto}>
                            <CustomTypography
                                text={<div> {item && item.fechaCarga ? Utils.dateFormat5(item.fechaCarga) : ''} </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12} className={classes.subtexto}>
                            <CustomTypography
                                text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '5px' }}>
                                        Responsable:
                                    </div>
                                    <div> {item && item.responsable ? item.responsable : ''} </div>
                                </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12} className={classes.subtexto}>
                            <CustomTypography
                                text={<div> {datos && datos.sector ? datos.sector : ''} </div>}
                                variant='body2' />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Fragment>
                )
            }) : '-'}

        </Grid>
    )
}
Resumen.propTypes = {
    datos: PropTypes.any
};
export default Resumen