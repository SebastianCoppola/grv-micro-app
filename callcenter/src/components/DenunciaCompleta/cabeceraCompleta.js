import React, { useEffect, useState } from 'react'
//Utils:
import Utils from '../../Utils/utils'
import { ERROR_SERVICIO_VERIFICAR } from '../../Utils/const'
import { getImage } from '../../Utils/icons'
//Mui:
import { makeStyles, Grid, IconButton, Tooltip } from '@material-ui/core'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
import InfoIcon from '@material-ui/icons/Info'
//Components:
import CustomTypography from '../commons/Typography/CustomTypography'
import Chip2 from '../commons/Chip/chip2'
import CustomCheck from '../commons/CustomCheck/CustomChek'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import CustomLoading from '../commons/Loading/CustomLoading'
import SiniestroMultiple from '../Form/SiniestroMultiple/SiniestroMultiple'
//Redux;
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'

const useStyles = makeStyles({
    chip2: {
        borderRadius: '5px',
        height: '30px',
        width: '74px',
        backgroundColor: 'white',

    },
    titulo: {
        fontSize: '13px',
        marginRight: '5px'
    },
    texto: {
        fontSize: '15px',
    },
    tituloCentroMedico: {
        fontSize: '13px',
        marginRight: '5px',
        color: 'black'
    },
    textoTitulo: {
        color: '#747474'
    },
    texto2: {
        marginLeft: '5px',
    },
    textoChip: {
        marginLeft: '5px',
    },
    contenedor: {
        backgroundColor: '#f5f5f5',
        border: 'solid 1px #dadce0',
        padding: '15px 20px',
    },
    tooltip: {
        backgroundColor: ' #2F61D5',
    },
    arrow: {
        color: ' #2F61D5'
    }
})

const tooltip = makeStyles({
    tooltip: {
        backgroundColor: ' white',
        border: '2px solid #2F61D5'
    },
    arrow: {
        color: ' white',
    }
})

const CabeceraCompleta = (props) => {

    const { denuncia, usuarioActivo, esOperador, dataSiniestroCompleto, setDataSiniestroCompleto,
        setOpenBuscador, idCausa, setIdCausa, disableEdition, disabledCheck } = props

    const classes = useStyles(props)
    const classesTooltip = tooltip()
    const dispatch = useDispatch()

    let accidentado = Utils.getNombreYApellidoAccidentado(denuncia)
    let celular = denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : ''
    let telefono = denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : ''
    let direccion = Utils.getDomicilioAccidentado(denuncia)
    let nroDenuncia = denuncia ? Utils.nroAsignadoProvisorio(denuncia) : ''
    let fechaDenuncia = denuncia ? Utils.dateFormat5(denuncia ? denuncia.fechaCreacion : null) : ''
    let preDenuncia = denuncia && denuncia.preDenunciaIdPreDenuncia ? 'SI' : 'NO'
    let empleador = denuncia ? denuncia.empleadorRazonSocial : ''
    let cuitEmpleador = denuncia ? denuncia.empleadorCuit : ''
    let centroMedico = denuncia && denuncia.centroPrimerAsistencia ? denuncia.centroPrimerAsistencia.razonSocial : ''
    let direccionCentroMedico = `${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.domicilioCalle !== null ? denuncia.centroPrimerAsistencia.domicilioCalle : ''}
        ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.domicilioNumero !== null ? denuncia.centroPrimerAsistencia.domicilioNumero : ''} ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadNombre !== null ? denuncia.centroPrimerAsistencia.localidadNombre : ''},
        ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.provinciaNombre !== null ? denuncia.centroPrimerAsistencia.provinciaNombre : ''}`
    let vip = denuncia && denuncia.empleadorEsVIP
    let telCentroMedico = denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.telefono !== null ? denuncia.centroPrimerAsistencia.telefono : ''
    let dni = denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc !== null ? denuncia.accidentado.nroDoc : ''
    let fechaOcurrenciaEditar = dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral && dataSiniestroCompleto.datosCompletarGeneral.fechaOcurrencia

    const [checkedDenuncia, setCheckedDenuncia] = useState(denuncia && denuncia.esVerificadoSupervisor ? true : false)
    const [loading, setLoading] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(
        dataSiniestroCompleto && dataSiniestroCompleto.siniestroMultiple
            ? dataSiniestroCompleto.siniestroMultiple.checked
            : denuncia && denuncia.siniestroMultiple
            ? denuncia.siniestroMultiple
            : false
    )

    useEffect(() => {
        if (setDataSiniestroCompleto) {
            setDataSiniestroCompleto({
                ...dataSiniestroCompleto,
                siniestroMultiple: { checked: checkedSiniestroMultiple }
            })
        }
    }, [checkedSiniestroMultiple])

    const handleCheckedDenuncia = (event) => {
        let request = {
            idDenuncia: denuncia.idDenuncia,
            idPersona: usuarioActivo.id,
            idRol: 1
        }
        setLoading(true)
        dispatch(actions.marcarVerificado(request, callBack))
    }

    const callBack = (succes) => {
        if (succes) {
            setCheckedDenuncia(true);
            let id = denuncia && denuncia.idDenuncia
            let estadoCem = denuncia && denuncia.estadoCEM
            if (denuncia && denuncia.idDenuncia) {
                dispatch(actions.searchDenunciaById(denuncia.idDenuncia, estadoCem, callbackDenuncia))
            }
            setOpenSnackBar({
                open: true,
                severity: 'success',
                title: 'Se verificó correctamente la denuncia'
            })
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: ERROR_SERVICIO_VERIFICAR
            })
            setLoading(false)
        }
    }

    const callbackDenuncia = (succes) => {
        if (succes) {
            setLoading(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    return (

        <Grid container className={classes.contenedor} xs={12} justify='space-around' >
            <CustomLoading loading={loading} />

            <Grid item container xs={5} spacing={1} >
                <Grid item xs={12}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Accidentado:</div>
                                <div className={classes.texto2}>{accidentado}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>DNI:</div>
                                <div className={classes.texto2}>{dni}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Celular:</div>
                                <div className={classes.texto2}>{celular}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Teléfono:</div>
                                <div className={classes.texto2}>{telefono}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Dirección:</div>
                                <div className={classes.texto2}>{direccion ? direccion : null}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
            </Grid>
            <Grid item container xs={4} justify='center'>
                <Grid item xs={10}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Denuncia:</div>
                                <div className={classes.texto2}>{nroDenuncia}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Fecha de Denuncia:</div>
                                <div className={classes.texto2}>{fechaDenuncia}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Chip2 margin={true}
                        size={"medium"}
                        label={
                            <Grid container alignItems='center' spacing={2} className={classes.textoChip}>
                                <Grid item> Centro Médico</Grid>
                                <Grid item>
                                    <Tooltip
                                        classes={classesTooltip}
                                        title={
                                            <>
                                                {denuncia && denuncia.centroPrimerAsistencia !== null ?
                                                    <Grid container spacing={2}>
                                                        <Grid item>
                                                            <CustomTypography
                                                                text={<div style={{ display: 'flex' }}>
                                                                    <div style={{ paddingRight: '20px', color: 'black' }}>
                                                                        Centro Médico:
                                                                    </div>
                                                                    <div >
                                                                        <strong>{centroMedico}</strong>
                                                                    </div>
                                                                </div>}
                                                                variant={'body1'} className={classes.tituloCentroMedico} />
                                                        </Grid>
                                                        <Grid item>
                                                            <CustomTypography
                                                                text={<div style={{ display: 'flex' }}>
                                                                    <div style={{ paddingRight: '20px', color: 'black' }}>
                                                                        Dirección:
                                                                    </div>
                                                                    <div >
                                                                        {direccionCentroMedico}
                                                                    </div>
                                                                </div>}
                                                                variant={'body1'} className={classes.tituloCentroMedico} />
                                                        </Grid>
                                                        <Grid item>
                                                            <CustomTypography
                                                                text={<div style={{ display: 'flex' }}>
                                                                    <div style={{ paddingRight: '20px', color: 'black' }}>
                                                                        Teléfono:
                                                                    </div>
                                                                    <div >
                                                                        {telCentroMedico}
                                                                    </div>
                                                                </div>}
                                                                variant={'body1'} className={classes.tituloCentroMedico} />
                                                        </Grid>
                                                    </Grid>
                                                    :
                                                    <Grid container spacing={2}>
                                                        <Grid item style={{ color: 'black', padding: '10px' }}>
                                                            <CustomTypography text={'No hay centro médico seleccionado'}
                                                                variant={'body2'} />
                                                        </Grid>
                                                    </Grid>
                                                } </>}>
                                        <IconButton aria-label="delete" size={'small'}>
                                            <InfoIcon
                                                color={'primary'} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>}

                        variant={'contained'} />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div className={classes.textoTitulo}>Pre-Denuncia:</div>
                                <div className={classes.texto2}>{preDenuncia}</div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                {disabledCheck ? null : (
                    <Grid item xs={10} >

                        <CustomCheck
                            checked={checkedDenuncia}
                            handleChange={handleCheckedDenuncia}
                            disabled={(Utils.isBorrador(denuncia) || (denuncia && denuncia.esVerificadoSupervisor) || checkedDenuncia) || esOperador || disableEdition}
                            texto={((denuncia && denuncia.esVerificadoSupervisor) || checkedDenuncia) ? 'Denuncia completa verificada' : 'Denuncia Completa'} />
                    </Grid>
                )}
            </Grid>
            <Grid item container xs={3} spacing={1} justify='center' >
                <Grid item xs={7} >
                    {denuncia && denuncia.nombreLogo ?
                        <img src={getImage(denuncia && denuncia.nombreLogo)}
                            style={{ width: '150px' }} />
                        : null}
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div className={classes.textoTitulo}>Empleador:</div>
                                    <div className={classes.texto2}>{empleador}</div>
                                </div>
                            }
                            variant={'body1'}
                            className={classes.titulo}
                        />
                    </Grid>
                    {vip ?
                        <Grid item xs={3}>
                            <Chip2 size={"small"} className={classes.chip2} avatar={<StarOutlineIcon style={{ color: '#f29423' }} />} label={'VIP'} variant={'outlined'} />

                        </Grid>
                        : null}
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div className={classes.textoTitulo}>CUIT:</div>
                                    <div className={classes.texto2}>{cuitEmpleador}</div>
                                </div>
                            }
                            variant={'body1'}
                            className={classes.titulo}
                        />
                    </Grid>
                </Grid>

            </Grid>
            {disabledCheck ? null : (
                <Grid item xs={12}>
                    <SiniestroMultiple
                        home={false}
                        fechaOcurrencia={fechaOcurrenciaEditar !== undefined ? fechaOcurrenciaEditar : denuncia && denuncia.fechaOcurrencia}
                        denuncia={denuncia}
                        disableEdition={disableEdition}
                        setOpenBuscador={setOpenBuscador}
                        idCausa={idCausa}
                        setIdCausa={setIdCausa}
                        checkedSiniestroMultiple={checkedSiniestroMultiple}
                        setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                    />
                </Grid>
            )}
            {openSnackBar.open ? <CustomSnackBar handleClose={handleClose} open={openSnackBar.open} title={openSnackBar.title}
                severity={openSnackBar.severity} /> : null}
        </Grid>
    )
}
export default CabeceraCompleta