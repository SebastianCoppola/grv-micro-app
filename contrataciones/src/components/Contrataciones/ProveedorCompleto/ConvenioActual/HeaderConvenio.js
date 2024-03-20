import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
//Img:
import ClipboardClock from '../../../../commons/assets/clipboard-clock-outline.png';
//Material:
import { Checkbox, FormControlLabel, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
//Components:
import CustomButton from '../../../commons/Button/CustomButton';
import Tooltip from '@material-ui/core/Tooltip';
import DrawerAjustarPorcentajes from '../Drawers/DrawerAjustarPorcentajes';

const useStyles = makeStyles((theme) => ({
    headerBox: {
        width: '100%',
        minHeight: '130px',
        height: '130px',
        margin: '0',
        padding: '15px 15px 30px 15px',
        backgroundColor: '#f5f5f5',
    },
    celdasHeader: {
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px'
    },
    celdasTitles: {
        color: 'grey',
        marginRight: '5px',
        fontSize: '13px'
    },
    celdasData: {
        fontSize: '13px'
    },
    checkbox: {
        '& .MuiFormControlLabel-label': { fontSize: '12px' }
    }

}))

const HeaderConvenio = props => {
    const { editarConvenioFuturo, seleccion, setSeleccion, data, aplicoValoresPrestacionesUnit,convenioActualTraslado } = props;
    const classes = useStyles(props);
    const request = useSelector(state => state.convenio.request)
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    const convenio = editarConvenioFuturo ? data : convenioActual
    const [checkSeleccion, setCheckSeleccion] = useState(true);

    //Pasar checkSelection a true cada vez que cambia:
    useEffect(() => {
        if (seleccion) setCheckSeleccion(true)
    }, [seleccion])

    //Actions Header:
    const editarVigencia = () => {
        //setDrawerNro(1)
    }
    const ajustarValores = () => {
        //setDrawerNro(2)
    }
    const verPreQX = () => {
        //setDrawerNro(3)
    }
    const handleCheckSeleccion = () => {
        setCheckSeleccion(false)
        setSeleccion(null)
    }

    return (
        <Grid xs={12} className={classes.headerBox}>
            <Grid container xs={12}>
                <Grid item className={classes.celdasHeader}>
                    <Typography>
                        <b>{editarConvenioFuturo ? "Datos de convenio futuro." : "Datos versión actual."}</b>
                    </Typography>
                </Grid>
                <Grid item className={classes.celdasHeader}>
                    {editarConvenioFuturo ?
                        <Grid container alignItems='center'>
                            <img src={ClipboardClock} style={{ border: '1px solid #f29423', padding: '6px', borderRadius: '50%', backgroundColor: '#f7e9d9' }} />
                            <Typography style={{ color: '#f29423', marginLeft: '5px', fontSize: '14px' }}>
                                Se activará en {
                                    request && request.diasActivacion !== null
                                        ? (request.diasActivacion > 0 ? request.diasActivacion : 0)
                                        : convenio && convenio.diasActivacion
                                } días.
                            </Typography>
                        </Grid>
                        : null
                    }
                </Grid>
            </Grid>

            <Grid container xs={12}>
                <Grid item style={{ width: '17%' }}>
                    <Grid container className={classes.celdasHeader}>
                        <Typography className={classes.celdasTitles}>Versión</Typography>
                        <Typography className={classes.celdasData}>{convenio && convenio.version ? convenio.version : '-'}</Typography>
                    </Grid>
                    <Grid container className={classes.celdasHeader}>
                        <Typography className={classes.celdasTitles}>Fecha carga</Typography>
                        <Typography className={classes.celdasData}>{convenio && convenio.fechaCarga ? convenio.fechaCarga : '-'}</Typography>
                    </Grid>
                </Grid>

                <Grid item style={{ width: '28%' }}>
                    <Grid container className={classes.celdasHeader}>
                        <Typography className={classes.celdasTitles}>Fecha vigencia desde</Typography>
                        <Typography className={classes.celdasData}>
                            {request && request.fechaVigenciaDesde
                                ? request.fechaVigenciaDesde.split('-')[2] + '/' + request.fechaVigenciaDesde.split('-')[1] + '/' + request.fechaVigenciaDesde.split('-')[0]
                                : convenio && convenio.fechaVigenciaDesde
                                    ? convenio.fechaVigenciaDesde : '-'}
                        </Typography>
                        {editarConvenioFuturo ?
                            <CustomButton
                                label={<CreateIcon />}
                                onClik={editarVigencia}
                                variant='outlined'
                                styleButton={{ padding: '3px', marginLeft: '10px', minWidth: '0', display: 'flex', alignItems: 'center' }}
                                styleLabel={{ padding: '0px', margin: '0', display: 'flex', alignItems: 'center' }}
                            />
                            : null
                        }
                    </Grid>
                    <Grid container className={classes.celdasHeader}>
                        <Typography className={classes.celdasTitles}>Fecha vigencia hasta</Typography>
                        <Typography className={classes.celdasData}>{convenio && convenio.fechaVigenciaHasta ? convenio.fechaVigenciaHasta : '-'}</Typography>
                    </Grid>
                </Grid>

                {convenioActualTraslado ? null : (
                    <Grid item style={{ width: '13%' }}>
                        <Grid container className={classes.celdasHeader}>
                            <Typography className={classes.celdasTitles}>Valor NBU</Typography>
                            <Typography className={classes.celdasData}>
                                {request && (request.valorNBU || request.valorNBU === 0)
                                    ? (request.valorNBU ? '$' + request.valorNBU : "-")
                                    : convenio && convenio.valorNbu
                                    ? '$' + convenio.valorNbu
                                    : '-'
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                )}
               

               {convenioActualTraslado ?   
               <>
                <Grid item container style={{ width: '50%' }} justifyContent="flex-end" alignContent='flex-end' justify="flex-end">
                    <DrawerAjustarPorcentajes/>
                </Grid>
               </>
                
                : (
                    <Grid item container style={{ width: '42%' }}>
                        <Grid container justify='flex-start' spacing={2} style={{ marginTop: '0' }}>
                            <Grid item>
                                { (request && request.porcentajeAumento) || aplicoValoresPrestacionesUnit ?
                                        <Tooltip title={editarConvenioFuturo ? "Para volver a aplicar un nuevo porcentaje es necesario guardar cambios." : "Para volver a aplicar un nuevo porcentaje es necesario Versionar."}>
                                            <span>
                                                <CustomButton
                                                    label='Ajustar valores por porcentaje'
                                                    disabled={true}
                                                    onClik={ajustarValores}
                                                    startIcon={<CheckIcon style={{ width: '12px' }} />}
                                                    variant='outlined'
                                                    styleLabel={{ fontSize: '12px' }}
                                                    styleButton={{ padding: '3px 10px' }}

                                                />
                                            </span>
                                        </Tooltip>
                                        : 
                                        seleccion && (
                                            seleccion.nomencladas && seleccion.nomencladas.length > 0 ||
                                            seleccion.noNomencladas && seleccion.noNomencladas.length > 0 ||
                                            seleccion.modulos && seleccion.modulos.length > 0) ?
                                            (<CustomButton
                                                label='Ajustar valores por porcentaje'
                                                disabled={false}
                                                onClik={ajustarValores}
                                                startIcon={<CheckIcon style={{ width: '12px' }} />}
                                                variant='outlined'
                                                styleLabel={{ fontSize: '12px' }}
                                                styleButton={{ padding: '3px 10px' }}

                                            />) : (
                                                <CustomButton
                                                    label='Ajustar valores por porcentaje'
                                                    disabled={true}
                                                    onClik={ajustarValores}
                                                    startIcon={<CheckIcon style={{ width: '12px' }} />}
                                                    variant='outlined'
                                                    styleLabel={{ fontSize: '12px' }}
                                                    styleButton={{ padding: '3px 10px' }}

                                                />)
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                {convenioActualTraslado ? null : (
                    <Grid item xs={5}>
                        <CustomButton
                            label='Ver las Pre. QX'
                            onClik={verPreQX}
                            startIcon={<CheckIcon style={{ width: '12px' }} />}
                            variant='outlined'
                            styleLabel={{ fontSize: '12px' }}
                            styleButton={{ padding: '3px 10px' }}
                        />
                    </Grid>
                )}
                <Grid container justify='flex-start'>
                    {seleccion && (
                        seleccion.nomencladas && seleccion.nomencladas.length > 0 ||
                        seleccion.noNomencladas && seleccion.noNomencladas.length > 0 ||
                        seleccion.modulos && seleccion.modulos.length > 0) ?
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkSeleccion}
                                    onChange={handleCheckSeleccion}
                                    color="Desmarcar seleccionadas para ajuste"
                                />
                            }
                            label="Desmarcar seleccionadas para ajuste"
                            className={classes.checkbox}
                        />
                            : null
                        }
                    </Grid>
                </Grid>
        </Grid>
    )
}

export default HeaderConvenio;

