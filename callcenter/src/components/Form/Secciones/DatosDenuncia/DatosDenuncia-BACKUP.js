import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
import Utils from '../../../../Utils/utils'
//material-ui
import Grid from '@material-ui/core/Grid';
import Chip2 from '../../../commons/Chip/chip2';
//estilo
import { makeStyles } from '@material-ui/styles';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import { Divider, Paper } from '@material-ui/core';
import CustomButton from '../../../commons/Button/CustomButton';
import PrintIcon from '@material-ui/icons/Print';
import ModalImprimir from '../../../commons/Modal/ModalImprimir';

const useStyles = makeStyles({
    chip2: {
        borderRadius: '5px',
        height: '30px',
        width: '74px'
    },
    titulo: {
        fontSize: '13px',
        marginRight: '5px'
    },
    texto: {
        fontSize: '15px',
        //   wordBreak:'break-all',
    },
    espacio: {
        paddingTop: '10px'
    },
    divider: {
        paddingBottom: '10px'
    },
    breack: {
        wordBreak: 'break-all'
    },
    container: {
        border: '1px solid #dadce0',
        padding: '10px',
        borderRadius: '10px'
    }
})

const DatosDenuncia = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { expandido, setExpandido, onClick, onClickContraer, state, type, denuncia, noContraerExpandir} = props
    const [checkedPreDenuncia, setCheckedPreDenuncia] = React.useState(false);
    const [checkedDenuncia, setCheckedDenuncia] = React.useState(false)
    const [documentoImprimir, setDocumentoImprimir] = React.useState(null)
    const [codigoBarras, setCodigoBarras] = React.useState(null)
    const [openModal, setOpenModal] = React.useState(false)
    
    const handleCheckedPreDenuncia = (event) => {
        setCheckedPreDenuncia(event.target.checked);
    }

    const handleCheckedDenuncia = (event) => {
        setCheckedDenuncia(event.target.checked);
    }

    const handleExpandir = (panel) => (event, newExpanded) => {
        setExpandido(!expandido);

    };

    let direccion = Utils.getDomicilioAccidentado(denuncia)
    let celular = Utils.getTelefonoCompleto(denuncia)
    let sedeDireccion = Utils.getDireccionSede(denuncia)


    const onClickImprimir = () => {
        let request = {
            "cliente": denuncia && denuncia.clienteRazonSocial,
            "nroDenuncia": denuncia && denuncia.idDenuncia,
            "fechaOcurrencia": Utils.dateFormat(denuncia && denuncia.fechaOcurrencia),
            "empleador": denuncia && denuncia.empleadorRazonSocial,
            "tipoDenuncia": denuncia && denuncia.tipoSiniestroDescripcion,
            "documento": denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc,
            "nroCuil": denuncia && denuncia.accidentado && denuncia.accidentado.nroCuil,
            "paciente": denuncia && denuncia.accidentado && denuncia.accidentado.nombre ? `${denuncia.accidentado.apellido} ${denuncia.accidentado.nombre}` : null,
            "fechaNacimiento": Utils.dateFormat(denuncia && denuncia.accidentado && denuncia.accidentado.fechaNacimiento),
            "estadoCivil": denuncia && denuncia.accidentado && denuncia.accidentado.estadoCivilDescripcion,
            "direccion": direccion ? direccion : null,
            "telefonoPrincipal": denuncia && denuncia.accidentado && denuncia.accidentado.telefono,
            "telefonoSecundario": denuncia && denuncia.accidentado && denuncia.accidentado.telefonoSecundario,
            "telefonoCelular": celular ? celular : null,
            "lugarTrabajo": denuncia && denuncia.sede && denuncia.sede.nombre ? denuncia.sede.nombre : null,
            "direccionTrabajo": sedeDireccion ? sedeDireccion : null,
            "localidadTrabajo": denuncia && denuncia.sede && denuncia.sede.localidadesNombre ? denuncia.sede.localidadesNombre : null,
            "ocupacion": denuncia && denuncia.ocupacionDescripcion ? denuncia.ocupacionDescripcion : null,
            "fechaIngreso": Utils.dateFormat(denuncia && denuncia.fechaIngresoLaboral),
            "horarioLaboral": denuncia && denuncia.horarioLaboral ? denuncia.horarioLaboral : null,
            "telefonoLaboral": denuncia && denuncia.telefonoLaboral ? denuncia.telefonoLaboral : null,
            "estadoMedico": denuncia && denuncia.estadoMedicoDescripcion ? denuncia.estadoMedicoDescripcion : null,
            "diagnosticoCIE10": denuncia && denuncia.diagnosticoCie10Descripcion ? denuncia.diagnosticoCie10Descripcion : null,
            "diagnosticoCerteza": denuncia && denuncia.diagnosticoDeCerteza ? denuncia.diagnosticoDeCerteza : null,
            "relato": denuncia && denuncia.relato ? denuncia.relato : null,
            "nroAsignado": denuncia && denuncia.nroAsignado ? denuncia.nroAsignado : null,
            "nroProvisorio": denuncia && denuncia.nroProvisorio ? denuncia.nroProvisorio : null,
        }
        dispatch(actions.importarDocumento(request, callback))
        let requestCodigoBarras = {
            inputString: denuncia && denuncia.idDenuncia
        }
        dispatch(actions.importarCodigoBarras(requestCodigoBarras, callbackCodigo))
    }

    const callback = (succes, data) => {
        if (succes) {
            setDocumentoImprimir(data)
            setOpenModal(true)
        }
    }

    const callbackCodigo = (succes, data) => {
        if (succes) {
            setCodigoBarras(data)
        }
    }
    
    const handleClose = () => {
        setOpenModal(false)
    }

    return (

        <Grid container spacing={2} alignItems={'center'} className={classes.container} >
            <Grid item container alignItems='center' justify='space-between' >
                <Grid item xs={7}>
                    <CustomTypography text='Datos de la Denuncia' variant='subtitle1' fontweight='600' />
                </Grid>
                {!noContraerExpandir ? 
                    <>
                        <Grid item >
                            <CustomButton
                                size = 'small'
                                label = {'Expandir Todo'}
                                variant = {'outlined'}
                                onClik = {onClick}
                                disabled = {state ? true : false}
                            />
                        </Grid>
                        <Grid item >
                            <CustomButton
                                size = 'small'
                                label = {'Contraer Todo'}
                                variant = {'outlined'}
                                onClik = {onClickContraer}
                                disabled = {!state ? true : false}
                            />
                        </Grid>
                    </>
                : null}
                <Grid item >
                    <CustomButton
                        size = 'small'
                        label = {'Imprimir'}
                        variant = {'outlined'}
                        onClik = {onClickImprimir}
                        startIcon = {<PrintIcon />} />
                </Grid>

            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            {denuncia && denuncia.empleadorEsVIP ?
                <Grid item xs={1} className={classes.titulo}>
                    <Chip2 size={"small"} className={classes.chip2} avatar={<StarOutlineIcon style={{ color: '#f29423' }} />} label={'VIP'} variant={'outlined'} />
                </Grid>
                : null}
            <Grid item xs={denuncia && denuncia.empleadorEsVIP ? 7 : 7} style={{ minWidth: '100px' }}>
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div >
                        Empleador:
                    </div>
                    <div className={classes.texto2}>{denuncia ? denuncia.empleadorRazonSocial : ''}</div>
                </div>}
                    variant={'body1'} className={classes.titulo}


                />
            </Grid>

            <Grid item xs={3}>
               {/*  <img src={provincia} style={{ width: '150px' }} /> */}
            </Grid>

            <Grid item xs={4} >
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div >
                        Accidentado:
                    </div>
                    <div>{Utils.getNombreYApellidoAccidentado(denuncia)}</div>
                </div>}
                    variant={'body1'} className={classes.titulo} />
            </Grid>

        
            <Grid item xs={4} >
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div>
                        Nro. Asignado:
                    </div>
                    <div>{denuncia && denuncia.nroAsignado ? denuncia.nroAsignado : ''} </div>
                </div>} variant={'body1'} className={classes.titulo} />
            </Grid>


            <Grid item xs={4}>
                {/* <CustomCheck
                    checked={checkedDenuncia}
                    handleChange={handleCheckedDenuncia}
                    disabled={true}
                    texto={'Denuncia Completa'} /> */}
            </Grid>


            <Grid item xs={4} >
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div>
                        Ocurrencia:
                    </div>
                    <div>{Utils.dateFormat(denuncia ? denuncia.fechaOcurrencia : null)}</div>
                </div>}
                    variant={'body1'} className={classes.titulo} />
            </Grid>

            <Grid item xs={4} >
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div>
                        Nro. Provisorio:
                    </div>
                    <div>{denuncia ? denuncia.nroProvisorio : ''} </div>
                </div>}
                    variant={'body1'} className={classes.titulo} />
            </Grid>

            <Grid item xs={6} className={classes.espacio}>
                <CustomTypography text={<div style={{ display: 'flex' }}>
                    <div>
                        Tipo Siniestro:
                    </div>
                    <div>{denuncia ? denuncia.tipoSiniestroDescripcion : ''}</div>
                </div>} variant={'body2'} className={classes.titulo} />
            </Grid>

            <Grid item xs={12} style={{ paddingTop: '25px' }}>
                <CustomTypography text={'¿Qué sucedió? Relato del siniestro'} variant={'body2'} className={classes.titulo} />
            </Grid>

            <Grid item xs={8}>
                <CustomTypography text={denuncia ? denuncia.relato : ''} variant={'body2'} />
            </Grid>
            <Grid item xs={8}><Divider /></Grid>
            {documentoImprimir !== null ?
                <ModalImprimir openModal={openModal} handleClose={handleClose} maxWidth={'md'}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: Utils.busquedaCodigo(documentoImprimir, codigoBarras)
                        }} >

                    </div>
                </ModalImprimir>
                : null}

        </Grid>

    )
}
DatosDenuncia.propTypes = {
    expandido: PropTypes.any,
    setExpandido: PropTypes.any,
    denuncia: PropTypes.any,
    onClick: PropTypes.any,
    onClickContraer: PropTypes.any,
    state: PropTypes.any,
    type: PropTypes.any
};
export default DatosDenuncia