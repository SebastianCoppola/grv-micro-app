import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'
import { MENSAJE_ERROR_DESACTIVAR_ALARMA, MENSAJE_OK_DESACTIVAR_ALARMA,
    SNACK_SEVERITY, SNACK_VERTICAL, MODULO_CEM } from '../../../Utils/const'
//Mui:
import { Grid } from '@material-ui/core/'
//Componentes:
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'
import TablaTraslado from './TablaTraslado'
import Drawer2 from '../../commons/CustomDrawer/Drawer'
import AdminSlide from '../../commons/Slider/AdminSlide'
import IdaPaso1 from '../../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso1'
import IdaPaso2 from '../../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso2'
import IdaPaso3 from '../../TrasladosDrawer/AmbulanciaIda/Paso3'
import IdaPaso4 from '../../TrasladosDrawer/AmbulanciaIda/Paso4'
import PasoConfirmacionReserva from '../../TrasladosDrawer/AmbulanciaIda/PasoConfirmacionReserva'
import CustomLoading from '../../commons/Loading/CustomLoading'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import IconSearch from '../../BuscadorFlotante/IconSearch'
import FiltrosTraslado from './FiltrosTraslado'

const Traslados = (props) => {

    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, denuncia,
        usuarioActivo, idDenuncia, dataSiniestroCompleto, esOperador,
        setDataSiniestroCompleto, setGuardarContenedor, guardarContenedor,
        setOpenBuscador, disableEdition } = props

    const dispatch = useDispatch()

    const datos = useSelector(state => state.traslados.trasladosGeneral !== null ? state.traslados.trasladosCompleto.objetos : [])
    const cantidadTotal = useSelector(state => state.traslados.trasladosGeneral ? state.traslados.trasladosCompleto.cantidadTotal : 0)
    const loading = useSelector(state => state.traslados.loading)
    
    //Tabla:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 && usuarioActivo.apps[0] === MODULO_CEM ? 15 : 5)
    //Ida o Vuelta:
    const [valTipoTraslado, setValTipoTraslado] = useState(null)
    //Remis o Ambulancia:
    const [valTipoTrasladoEspontaneo, setValTipoTrasladoEspontaneo] = useState(null)
    //Sector Traslado:
    const [sectorTraslado, setSectorTraslado] = useState(false)
    //Fecha Traslado:
    const [fechaTraslado, setFechaTraslado] = useState(new Date())
    //Hora Traslado:
    const [horaTraslado, setHoraTraslado] = useState(new Date().toString().substring(16, 21))
    //Slide:
    const [activeStep, setActiveStep] = useState(0)
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })
    const [dataCMedico, setDataCMedico] = useState(null)
    const [actualizarData, setActualizarData] = useState(false)
    const [soloCarga, setSoloCarga] = useState(false)
    const [request, setRequest] = useState(null)
    const [open, setOpen] = useState(true)
    const [data, setData] = useState([])
    const [valueHabilitado, setValueHabilitado] = useState(false)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setTituloNavegacionSiniestro('Traslados')
        setRequest({
            ...request,
            diagnosticoPresuntivo: denuncia ? denuncia.diagnosticoDeCerteza : null,
            idCentroMedico: denuncia && denuncia.centroPrimerAsistencia ? denuncia && denuncia.centroPrimerAsistencia.id : null
        })
        dispatch(actions.serchTipoTraslado())
        dispatch(actions.serchTipoViaje())
        if (setDataSiniestroCompleto) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
            }))
        }
    }, [])

    useEffect(() => {
        if (datos && datos.length > 0) {

            const dataRellenar = []
            const dimension = page * rowsPerPage
            if (cantidadTotal !== 0) {
                for (let index = 0; index < dimension; index++) {
                    dataRellenar.push({})
                }
            }

            const dataApi = datos ? datos : [];

            const dataRestante = [];
            const lengthData = dataRellenar.length + dataApi.length
            if (lengthData < cantidadTotal) {
                for (let index = lengthData; index < cantidadTotal; index++) {
                    dataRestante.push({})
                }
            }

            setData([...dataRellenar, ...dataApi, ...dataRestante])
        } else {
            setData([])
        }
    }, [datos])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(false)
    }

    const addTraslado = () => {
        setOpenDrawer({ ...openDrawer, 'right': true })
        setOpenBuscador(true)
    }

    const contenido = [
        {
            texto: <IdaPaso1 setValueHabilitado={setValueHabilitado}
                valTipoTraslado={valTipoTraslado}
                setValTipoTraslado={setValTipoTraslado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                setValTipoTrasladoEspontaneo={setValTipoTrasladoEspontaneo}
                denuncia={denuncia}
                setFechaTraslado={setFechaTraslado}
                setHoraTraslado={setHoraTraslado}
                request={request}
                setDataCMedico={setDataCMedico}
                dataCMedico={dataCMedico}
                setRequest={setRequest}
                horaTraslado={horaTraslado} />
        },
        {
            texto: <IdaPaso2 setValueHabilitado={setValueHabilitado}
                activeStep={activeStep}
                ida={valTipoTraslado === 1 ? true : false}
                vuelta={valTipoTraslado === 3 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false}
                valTipoTraslado={valTipoTraslado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                denuncia={denuncia}
                dataCMedico={dataCMedico}
                request={request} setRequest={setRequest} />
        },
        {
            texto: <IdaPaso3 soloCarga={soloCarga} sectorTraslado={sectorTraslado}
                tipoTraslado={valTipoTrasladoEspontaneo === 1 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false}
                idTipoTraslado={valTipoTrasladoEspontaneo}
                request={request} setRequest={setRequest} />
        },
        { texto: <PasoConfirmacionReserva sectorTraslado={sectorTraslado} soloCarga={soloCarga} /> },
        { texto: <IdaPaso4 /> },
    ]

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(false)
        setSectorTraslado(false)
        setSoloCarga(false)
    }

    const maxSteps = contenido.length

    const handleBack = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setSoloCarga(false)
        setOpenBuscador(false)
    }

    const validarCentroMedico = (centroDenuncia, centroSeleccionado) => {
        let result = false
        if (centroSeleccionado && centroSeleccionado.id !== 921) {
            result = true
        } else if (centroSeleccionado === null && centroDenuncia
            && centroDenuncia.centroPrimerAsistencia
            && centroDenuncia.centroPrimerAsistencia.id !== 921) {
            result = true
        }
        return result
    }

    const handleNext = () => {
        if (activeStep === maxSteps - 2) {
            let serviciosList = valTipoTrasladoEspontaneo === 2 ? [...request.serviciosSolicitados] : null
            let listClone = []
            serviciosList && serviciosList.forEach((item) => {
                if (item.verificado) {
                    listClone.push(item.codigo)
                }
            })
            let req = {
                ...request,
                horaTraslado: horaTraslado,
                fechaTraslado: Utils.dateFormat3(fechaTraslado),
                idDenuncia: idDenuncia ? idDenuncia : denuncia ? denuncia.idDenuncia : null,
                idTipoViaje: valTipoTraslado,
                tipoTrasladoIdTipoTraslado: valTipoTrasladoEspontaneo,
                tipoTrasladoIdTipoTrasladoRegreso: valTipoTraslado === 2 ? valTipoTrasladoEspontaneo : null,
                serviciosSolicitados: valTipoTrasladoEspontaneo === 2 ? listClone : null,
                responsableCreacion: usuarioActivo.id,
                confirmaCEM: !sectorTraslado,
                soloCarga: soloCarga
            }
            dispatch(actions.creacionTraslado(req, successCreacion))
        }
        else if (activeStep === 0 && !validarCentroMedico(denuncia, dataCMedico)) {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'El centro médico no pueder ser "A DETERMINAR". Por favor elija otro centro médico para continuar'
            })
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const successCreacion = (data, result, message) => {
        if (data) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            setOpenDrawer({ ...openDrawer, 'right': false })
        }
        setOpenSnackBar({ open: true, severity: result, title: message })
        setActualizarData(!actualizarData)
        setSectorTraslado(false)
        setSoloCarga(false)
        let id = idDenuncia ? idDenuncia : denuncia ? denuncia.idDenuncia : null
        let estadoCem = denuncia && denuncia.estadoCEM
        let callbackSearch = (succes) => { }
        dispatch(actions.searchDenunciaById(id, estadoCem, callbackSearch))
    }

    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(false)
    }

    useEffect(() => {
        if (!openDrawer.right) {
            setActiveStep(0);
            setValTipoTraslado(null)
            setValTipoTrasladoEspontaneo(null)
            setValueHabilitado(false)
            setSectorTraslado(false)
            setSoloCarga(false)
        }
    }, [openDrawer])

    useEffect(() => {
        setValueHabilitado(false)
        if (activeStep === 0) {
            setValueHabilitado(true)
        }
    }, [activeStep])

    const handleVolver = () => {
        if (sectorTraslado) {
            setActiveStep((prevActiveStep) => prevActiveStep - 2);
            setSectorTraslado(false)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            if (soloCarga) {
                setSoloCarga(false)
            }
        }
    }

    const handleCuarto = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(false)
    }

    const onClickSectorTraslado = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
        setSectorTraslado(true)
    }

    useEffect(() => {
        if (!openDrawer.right) {
            setActualizarData(!actualizarData)
        }
    }, [openDrawer])

    useEffect(() => {
        if (denuncia && denuncia.alarmas && denuncia.alarmas.length > 0) {
            dispatch(actions.searchCampanaNotificaciones())
        }
    }, [denuncia])

    const handleApagarAlarma = () => {
        let callbackApagarAlarma = (success) => {
            if (success) {
                let callbackSearchDenunciaById = (success) => {
                    let severity = success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR
                    let title = success ? MENSAJE_OK_DESACTIVAR_ALARMA : MENSAJE_ERROR_DESACTIVAR_ALARMA
                    let vertical = success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP
                    setOpenSnackBar({ open: true, vertical, severity, title })
                }
                let id = idDenuncia ? idDenuncia : denuncia ? denuncia.idDenuncia : null
                let estadoCem = denuncia && denuncia.estadoCEM
                dispatch(actions.searchDenunciaById(id, estadoCem, callbackSearchDenunciaById))
                setActualizarData(!actualizarData)
            } else {
                setOpenSnackBar({
                    open: true,
                    vertical: SNACK_VERTICAL.TOP,
                    severity: SNACK_SEVERITY.ERROR,
                    title: MENSAJE_ERROR_DESACTIVAR_ALARMA
                })
            }
        }
        let request = {
            idDenuncia: idDenuncia ? idDenuncia : denuncia ? denuncia.idDenuncia : null,
            idPersona: usuarioActivo.id
        }
        dispatch(actions.desactivarAlarmaTraslado(request, callbackApagarAlarma))
    }

    const onClickSoloCarga = () => {
        setSoloCarga(true)
        handleNext()
    }

    return (
        <div>
            <div style={{ zIndex: +5 }}>
                <CustomLoading loading={loading} />
            </div>

            {openDrawer && openDrawer.right ?
                <IconSearch open={openDrawer && openDrawer.right} usuarioActivo={usuarioActivo} />
            : null}

            <ContenedorMenuSiniestroCompleto justify='center'
                openMenuSiniestros={open}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                dataSiniestroCompleto={dataSiniestroCompleto}
                setOpenMenuSiniestros={setOpen}
                denuncia={denuncia}
                usuarioActivo={usuarioActivo}
                esOperador={esOperador}
                setGuardarContenedorAhora={setGuardarContenedor}
                guardarContenedorAhora={guardarContenedor}
                disableEdition={disableEdition}
                setOpenBuscador={setOpenBuscador}
            >
                <Grid container direction='column' alignItems='center' style={{ padding: '10px' }}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} container>
                            <FiltrosTraslado
                                handleButton={addTraslado}
                                denuncia={denuncia}
                                disableEdition={disableEdition}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                handleApagarAlarma={handleApagarAlarma}
                                actualizarData={actualizarData}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TablaTraslado
                                menuGeneral={false}
                                data={data} setData={setData}
                                cantidadTotal={cantidadTotal}
                                actualizarData={actualizarData} setActualizarData={setActualizarData}
                                page={page} setPage={setPage}
                                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                                opcionesPaginacion={opcionesPaginacion}
                            />
                        </Grid>

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
                            width={'660px'}
                            height={activeStep === maxSteps - 2 ? '-webkit-fill-available' : 'fit-content'}
                            justify={true}
                        >
                            <AdminSlide
                                contenido={contenido}
                                buttonCancelar={(activeStep === maxSteps - 5) || ((activeStep === maxSteps - 4) && !soloCarga && valTipoTrasladoEspontaneo === 1)
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
                                labelButtonCancelar={(activeStep === 0) ?
                                    'Solo Carga' : (activeStep === maxSteps - 4) && !soloCarga && valTipoTrasladoEspontaneo === 1 ?
                                        'Pedir al sector traslados'
                                        : 'Cancelar'}
                                labelButtonSiguiente={(activeStep === maxSteps - 3 && !soloCarga) ?
                                    'Hacer reserva de traslado'
                                    : (activeStep === maxSteps - 3 && soloCarga) ?
                                        'Guardar Traslado'
                                        : (activeStep === maxSteps - 2 && !soloCarga) ?
                                            'Hacer Reserva'
                                            : (activeStep === maxSteps - 2 && soloCarga) ?
                                                'Guardar'
                                                : activeStep === maxSteps - 1
                                                    ? 'Cerrar' : 'Siguiente'}
                                variantButtonCancelar={'outlined'}
                                variantButtonSiguiente={'contained'}
                                onClickCancelar={(activeStep === maxSteps - 5) ?
                                    onClickSoloCarga :
                                    ((activeStep === maxSteps - 4) && !soloCarga)
                                        ? onClickSectorTraslado
                                        : onClickCancelar}
                                handleNext={activeStep !== maxSteps - 1 ? handleNext : handleGuardar}
                                activeStep={activeStep}
                                setActiveStep={setActiveStep}
                                maxSteps={maxSteps}
                                isAction={true}
                                labelBackBoton={activeStep === maxSteps - 2
                                    || activeStep === maxSteps - 3
                                    || activeStep === maxSteps - 4
                                    ? 'Volver' : 'Cancelar'}
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

                    </Grid>
                </Grid>
            </ContenedorMenuSiniestroCompleto>

            <CustomSnackBar
                handleClose={()=>setOpenSnackBar({open:false})}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
        </div>
    )
}

export default Traslados