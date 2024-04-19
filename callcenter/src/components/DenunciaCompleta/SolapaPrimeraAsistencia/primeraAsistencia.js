import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Utils from '../../../Utils/utils'
//material-ui
import Grid from '@material-ui/core/Grid';
//componentes
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu';
import CustomTab from '../../commons/Tab/tab';
import CompletarPrimeraAsistencia from './completarPrimeraAsistencia';
//componetnes-slider
import Drawer2 from '../../commons/CustomDrawer/Drawer';
import AdminSlide from '../../commons/Slider/AdminSlide';
import IdaPaso1 from '../../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso1';
import IdaPaso2 from '../../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso2';
import IdaPaso3 from '../../TrasladosDrawer/AmbulanciaIda/Paso3';
import IdaPaso4 from '../../TrasladosDrawer/AmbulanciaIda/Paso4';
import PasoConfirmacionReserva from '../../TrasladosDrawer/AmbulanciaIda/PasoConfirmacionReserva';
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
import IconSearch from '../../BuscadorFlotante/IconSearch';
import CustomLoading from '../../commons/Loading/CustomLoading';

const PrimeraAsistencia = (props) => {
    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, denuncia,
        guardarContenedor, setDataSiniestroCompleto, dataSiniestroCompleto,
        setGuardarContenedor, usuarioActivo, esOperador, openBuscador, setOpenBuscador, disableEdition } = props
    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(null);
    const [dataCMedico, setDataCMedico] = useState(null)
    const [valueCentroMedico, setValueCentroMedico] = useState(null)
    //ida o vuelta?
    const [valTipoTraslado, setValTipoTraslado] = useState(null)
    //remis o ambulancia?
    const [valTipoTrasladoEspontaneo, setValTipoTrasladoEspontaneo] = useState(null)
    const [dataSeccionCentroMedico, setDataSeccionCentroMedico] = useState(null)
    const [request, setRequest] = useState(null)
    // Fecha Traslado
    const [fechaTraslado, setFechaTraslado] = useState(new Date())// Hora Traslado
    const [horaTraslado, setHoraTraslado] = useState(fechaTraslado && fechaTraslado.toString().substring(16, 21))
    //sector traslado
    const [sectorTraslado, setSectorTraslado] = useState(false)
    //validacion denuncia
    const [valueDenuncia, setValueDenuncia] = useState(null);
    //habilitacion boton siguiente
    //slide
    const [activeStep, setActiveStep] = useState(0);
    const [openDrawer, setOpenDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });
    const dispatch = useDispatch()
    //Loading
    const loading = useSelector(state => state.traslados.loading)

    useEffect(() => setValueCentroMedico(denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.razonSocial ? denuncia.centroPrimerAsistencia.razonSocial : null), [])

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(true)
        setTituloNavegacionSiniestro('Primera asistencia')
    }, [])

    const onClickTraslado = () => {
        setOpenDrawer({ ...openDrawer, 'right': true });
        setOpenBuscador(false)
    }

    //slider
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(true)
    }

    const [valueHabilitado, setValueHabilitado] = useState(false)

    const contenido = [
        {
            texto: <IdaPaso1 setValueHabilitado={setValueHabilitado}
                valTipoTraslado={valTipoTraslado}
                setValTipoTraslado={setValTipoTraslado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                setValTipoTrasladoEspontaneo={setValTipoTrasladoEspontaneo}
                denuncia={denuncia}
                setFechaTraslado={setFechaTraslado}
                setDataCMedico={setDataCMedico}
                dataCMedico={dataCMedico}
                setHoraTraslado={setHoraTraslado} request={request}
                setRequest={setRequest}
                valueCentroMedico={valueCentroMedico}
                setValueCentroMedico={setValueCentroMedico}
            />
        },
        {
            texto: <IdaPaso2 setValueHabilitado={setValueHabilitado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                activeStep={activeStep}
                ida={valTipoTraslado === 1 ? true : false}
                vuelta={valTipoTraslado === 3 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false} denuncia={denuncia}
                dataCMedico={dataCMedico}
                request={request} setRequest={setRequest}
                valueCentroMedico={valueCentroMedico}
                setValueCentroMedico={setValueCentroMedico} />
        },
        {
            texto: <IdaPaso3 sectorTraslado={sectorTraslado}
                tipoTraslado={valTipoTrasladoEspontaneo === 1 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false}
                idTipoTraslado={valTipoTrasladoEspontaneo}
                request={request} setRequest={setRequest} />
        },
        { texto: <PasoConfirmacionReserva sectorTraslado={sectorTraslado} /> },
        { texto: <IdaPaso4 /> },
    ]

    const maxSteps = contenido.length;

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }
    const handleBack = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }
    const handleNext = () => {
        if (activeStep === maxSteps - 2) {
            let serviciosList = request && request.serviciosSolicitados && [...request.serviciosSolicitados]
            let listClone = []
            serviciosList && serviciosList.length > 0 && serviciosList.forEach((item) => {
                if (item.verificado) {
                    listClone.push(item.codigo)
                }
            });
            let req = {
                ...request,
                idCentroMedico: denuncia && denuncia.centroPrimerAsistencia ? denuncia && denuncia.centroPrimerAsistencia.id : null,
                horaTraslado: horaTraslado,
                fechaTraslado: Utils.dateFormat3(fechaTraslado),
                idDenuncia: denuncia ? denuncia.idDenuncia : null,
                idTipoViaje: valTipoTraslado,
                tipoTrasladoIdTipoTraslado: valTipoTrasladoEspontaneo,
                serviciosSolicitados: listClone && listClone.length > 0 ? listClone : [],
                confirmaCEM: !sectorTraslado,
                responsableCreacion: usuarioActivo.id,
            }
            dispatch(actions.creacionTraslado(req, successCreacion))
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }

    };
    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    useEffect(() => {
        setActiveStep(0);
        setValTipoTraslado(null)
        setValTipoTrasladoEspontaneo(null)
        setValueHabilitado(false)
    }, [openDrawer])

    useEffect(() => {
        setValueHabilitado(false)
        if (activeStep === 0) {
            setValueHabilitado(true)
        }
    }, [activeStep])

    const handleVolver = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleCuarto = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }
    const onClickSectorTraslado = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSectorTraslado(true)
    }

    useEffect(() => {
        if (setDataSiniestroCompleto && dataSeccionCentroMedico) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
                dataSeccionCentroMedico: dataSeccionCentroMedico
            }))
        }
    }, [dataSeccionCentroMedico])

    const successCreacion = (data, result, message) => {
        if (data) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (sectorTraslado) {
                setSectorTraslado(false)
            }
        }
        setOpenSnackBar({
            open: true,
            severity: result,
            title: message,
        })
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
        setOpenBuscador(true)
    };
    const tabs = [
        {
            label: 'Primera asistencia',
            component: <>
                <CompletarPrimeraAsistencia
                    usuarioActivo={usuarioActivo}
                    setDataSeccionCentroMedico={setDataSeccionCentroMedico}
                    dataSiniestroCompleto={dataSiniestroCompleto}
                    onClickTraslado={onClickTraslado} denuncia={denuncia}
                    disableEdition={disableEdition}
                    valueCentroMedico={valueCentroMedico}
                    setValueCentroMedico={setValueCentroMedico}
                />

                <Drawer2
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    anchor='right'
                    toggleDrawer={toggleDrawer}
                    label={'Asociar denuncia existente'}
                    label2={'Generar denuncia'}
                    disabled2={true}
                    button={false}
                    variant={'contained'}
                    title={''}
                    width={'650px'}
                    justify={true}
                >
                    <AdminSlide
                        contenido={contenido}
                        buttonCancelar={(activeStep === maxSteps - 3)
                            || activeStep === maxSteps - 2
                            || activeStep === maxSteps - 1
                            ? true : false}
                        backBoton={true}
                        handleBack={activeStep === maxSteps - 2
                            || activeStep === maxSteps - 3
                            || activeStep === maxSteps - 4
                            ? handleVolver : handleBack}
                        valueHabilitadoSiguiente={valueHabilitado}
                        variantBackBoton={'outlined'}
                        labelButtonCancelar={(activeStep === maxSteps - 3)
                            ? 'Pedir al sector traslados'
                            : 'Cancelar'}
                        labelButtonSiguiente={(activeStep === maxSteps - 3)
                            ? 'Hacer reserva de traslado' :
                            activeStep === maxSteps - 2 ?
                                'Hacer Reserva'
                                : activeStep === maxSteps - 1
                                    ? 'Cerrar'
                                    : 'Siguiente'}
                        variantButtonCancelar={'outlined'}
                        variantButtonSiguiente={'contained'}
                        onClickCancelar={(activeStep === maxSteps - 3) ?
                            onClickSectorTraslado
                            : onClickCancelar}
                        handleNext={activeStep !== maxSteps - 1 ? handleNext : handleGuardar}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        maxSteps={maxSteps}
                        isAction={true}
                        labelBackBoton={activeStep === maxSteps - 2
                            || activeStep === maxSteps - 3
                            || activeStep === maxSteps - 4
                            ? 'Volver'
                            : 'Cancelar'}
                        stepper={true}
                        confirmacionTraslado={true}
                        cuartoBoton={(activeStep === maxSteps - 3)
                            || activeStep === maxSteps - 4
                            ? true : false}
                        labelCuartoBoton={'Cancelar'}
                        variantCuartoBoton={'outlined'}
                        handleCuarto={handleCuarto}
                    />
                </Drawer2>
            </>,
            view: true,
        },
    ]

    if (usuarioActivo && usuarioActivo.area ===
        "AUDITORIA MEDICA") {
        return (<Grid container justify='center' alignItems='center' >
            <CustomTab
                data={tabs}
            />
        </Grid>)
    } else {
        return (
            <div>
                <div style={{ zIndex: +5 }}>
                    <CustomLoading loading={loading} />
                </div>
                <div>
                    {!openBuscador ? <IconSearch open={openBuscador} usuarioActivo={usuarioActivo}/> : null}

                    <ContenedorMenuSiniestroCompleto
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        setGuardarContenedorAhora={setGuardarContenedor}
                        guardarContenedorAhora={guardarContenedor}
                        openMenuSiniestros={open}
                        setOpenMenuSiniestros={setOpen}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={esOperador}
                        disableEdition={disableEdition}
                        setOpenBuscador={setOpenBuscador}
                    >
                        <Grid container justify='center' alignItems='center' >
                            <CustomTab
                                data={tabs}
                            />
                        </Grid>
                    </ContenedorMenuSiniestroCompleto>

                    {openSnackBar.open ?
                        <CustomSnackBar
                            handleClose={handleClose}
                            open={openSnackBar.open}
                            title={openSnackBar.title}
                            severity={openSnackBar.severity} /> : null}
                </div>
            </div>
        )
    }
}

PrimeraAsistencia.propTypes = {
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    openMenuSiniestros: PropTypes.any,
    setOpenMenuSiniestros: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any
};
export default PrimeraAsistencia