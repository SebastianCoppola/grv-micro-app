import React, { useState } from 'react';
import PropTypes from 'prop-types';
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//Utils:
import Utils from '../../../../Utils/utils'
import { getImage } from '../../../../Utils/icons';
//Mui:
import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import PrintIcon from '@material-ui/icons/Print';
//estilo
import Chip2 from '../../../commons/Chip/chip2';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomButton from '../../../commons/Button/CustomButton';
import ModalImprimir from '../../../commons/Modal/ModalImprimir';
import CustomCheck from '../../../commons/CustomCheck/CustomChek';
import SiniestroMultiple from '../../SiniestroMultiple/SiniestroMultiple'

const useStyles = makeStyles({
    vip: {
        borderRadius: '5px',
        height: '30px',
        width: '74px'
    },
    titulo: {
        fontSize: '13px',
        marginRight: '5px'
    },
    container: {
        border: '1px solid #dadce0',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: "#f9f9f9"
    }
})

const DatosDenuncia = (props) => {
    const classes = useStyles(props)
    const { denuncia, usuarioActivo, setSnackbar, setLoading, editar,
        setOpenBuscador, checkedSiniestroMultiple, setCheckedSiniestroMultiple } = props
    //Redux:
    const dispatch = useDispatch()
    //States
    const [checkedDenuncia, setCheckedDenuncia] = useState(denuncia && denuncia.esVerificadoSupervisor ? true : false)
    const [documentoImprimir, setDocumentoImprimir] = useState(null)
    const [codigoBarras, setCodigoBarras] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [idCausa, setIdCausa] = useState(null)
    let direccion = Utils.getDomicilioAccidentado(denuncia)
    let celular = Utils.getTelefonoCompleto(denuncia)
    let sedeDireccion = Utils.getDireccionSede(denuncia)
    let checkedPreDenuncia = denuncia && denuncia.preDenunciaIdPreDenuncia ? true : false

    const handleCheckedDenuncia = () => {
        //CALLBACK#2
        const callbackDenuncia = (succes) => {
            if (!succes) {
                setSnackbar({
                    open: true,
                    severity: 'error',
                    title: 'Ocurrió un error al intentar actualizar los datos de la denuncia.',
                    vertical: 'top'
                })
            }
        }
        //CALLBACK#1
        const callBackVerificar = (succes) => {
            if (succes) {
                setCheckedDenuncia(true)
                let id = denuncia && denuncia.idDenuncia
                let estadoCem = denuncia && denuncia.estadoCEM
                dispatch(actions.searchDenunciaById(id, estadoCem, callbackDenuncia))
            }
            //Open SnackBar:
            let severity = succes ? 'success' : 'error'
            let title = succes ? 'Se verificó correctamente la denuncia.' : 'Ha ocurrido un error al verificar la denuncia.'
            let vertical = succes ? 'bottom' : 'top'
            setSnackbar({ open: true, severity: severity, title: title, vertical: vertical })
            setLoading(false)
        }
        //ACTION
        let request = {
            idDenuncia: denuncia.idDenuncia,
            idPersona: usuarioActivo.id,
            idRol: 1
        }
        setLoading(true)
        dispatch(actions.marcarVerificado(request, callBackVerificar))
    }

    const onClickImprimir = () => {
        //IMPRIMIR
        const callbackImporta = (succes, data) => {
            if (succes) {
                setDocumentoImprimir(data)
                setOpenModal(true)
            }
        }
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
        dispatch(actions.importarDocumento(request, callbackImporta))
        //CODIGO DE BARRAS
        const callbackCodigo = (succes, data) => {
            if (succes) {
                setCodigoBarras(data)
            }
        }
        let requestCodigoBarras = {
            inputString: denuncia && denuncia.idDenuncia
        }
        dispatch(actions.importarCodigoBarras(requestCodigoBarras, callbackCodigo))
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    return (

        <Grid container spacing={2} alignItems={'center'} className={classes.container} >

            <Grid item container alignItems='center' justify='space-between' >
                <Grid item xs={3}>
                    <CustomTypography
                        text={<strong>Datos de la Denuncia</strong>}
                        variant='subtitle1'
                    />
                </Grid>
                <Grid item xs={3} >
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div style={{ color: 'grey' }}>
                                    Nro. Provisorio:
                                </div>
                                <div style={{ marginLeft: 8 }}>
                                    {denuncia ? denuncia.nroProvisorio : ''}
                                </div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTypography
                        text={
                            <div style={{ display: 'flex' }}>
                                <div style={{ color: 'grey' }}>
                                    Nro. Asignado:
                                </div>
                                <div style={{ marginLeft: 8 }}>
                                    {denuncia && denuncia.nroAsignado ? denuncia.nroAsignado : ''}
                                </div>
                            </div>
                        }
                        variant={'body1'}
                        className={classes.titulo}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <CustomButton
                        size='small'
                        label='Imprimir'
                        variant={'outlined'}
                        onClik={onClickImprimir}
                        startIcon={<PrintIcon />}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item container xs={12} style={{ display: "flex" }}>
                <Grid item container xs={9} style={{ display: 'flex' }}>
                    {denuncia && denuncia.empleadorEsVIP ?
                        <Grid item xs={12} className={classes.titulo}>
                            <Chip2
                                size={"small"}
                                className={classes.vip}
                                avatar={<StarOutlineIcon style={{ color: '#f29423' }} />}
                                label={'VIP'}
                                variant={'outlined'}
                            />
                        </Grid>
                        : null}
                    <Grid item container>
                        <Grid item xs={6} style={{ display: "flex" }} >
                            <CustomTypography
                                text={
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ color: 'grey' }}>
                                            Empleador:
                                        </div>
                                        <div style={{ marginLeft: 8 }}>
                                            <b>{denuncia ? denuncia.empleadorRazonSocial : ''}</b>
                                        </div>
                                    </div>
                                }
                                variant={'body1'}
                                className={classes.titulo}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CustomTypography
                                text={
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ color: 'grey' }}>
                                            Tipo Siniestro:
                                        </div>
                                        <div style={{ marginLeft: 8 }}>
                                            {denuncia ? denuncia.tipoSiniestroDescripcion : ''}
                                        </div>
                                    </div>
                                }
                                variant={'body2'}
                                className={classes.titulo}
                            />
                        </Grid>
                        <Grid item container style={{ marginTop: "20px" }}>
                            <Grid item xs={6} style={{ display: "flex" }}>
                                <CustomTypography
                                    text={
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ color: 'grey' }}>
                                                Accidentado:
                                            </div>
                                            <div style={{ marginLeft: 8 }}>
                                                {Utils.getNombreYApellidoAccidentado(denuncia)}
                                            </div>
                                        </div>
                                    }
                                    variant={'body1'}
                                    className={classes.titulo}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTypography
                                    text={
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ color: 'grey' }}>
                                                Ocurrencia:
                                            </div>
                                            <div style={{ marginLeft: 8 }}>
                                                {Utils.dateFormat(denuncia ? denuncia.fechaOcurrencia : null)}
                                            </div>
                                        </div>
                                    }
                                    variant={'body1'}
                                    className={classes.titulo}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={3}>
                    <Grid item xs={2}>
                        <img src={getImage(denuncia?.nombreLogo)}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '25px' }}>
                <CustomTypography
                    text={
                        <div style={{ color: 'grey' }}>
                            ¿Qué sucedió? Relato del siniestro:
                        </div>
                    }
                    variant={'body2'}
                    className={classes.titulo}
                />
            </Grid>

            <Grid item xs={12}>
                <CustomTypography
                    text={denuncia ? denuncia.relato : ''}
                    variant={'body2'}
                    className={classes.titulo}
                />
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} style={{display:"flex"}}>
                <Grid item xs={6}>
                    <SiniestroMultiple
                        home={false}
                        fechaOcurrencia={denuncia && denuncia.fechaOcurrencia}
                        denuncia={denuncia}
                        disableEdition={!editar}
                        setOpenBuscador={setOpenBuscador}
                        setIdCausa={setIdCausa}
                        checkedSiniestroMultiple={checkedSiniestroMultiple}
                        setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                    />
                </Grid>
                <Grid item xs={3} style={{marginTop:5}}>
                    <CustomCheck
                        style={{ padding: 0 }}
                        checked={checkedDenuncia}
                        handleChange={handleCheckedDenuncia}
                        disabled={checkedDenuncia || !editar}
                        texto={'Denuncia Completa'}
                    />
                </Grid>
                <Grid itemxs={3} style={{marginTop:5}}>
                    <CustomCheck
                        style={{ padding: 0 }}
                        checked={checkedPreDenuncia}
                        // handleChange={handleCheckedPreDenuncia}
                        disabled={true}
                        texto={'Pre Denuncia Completa'}
                    />
                </Grid>
            </Grid>

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