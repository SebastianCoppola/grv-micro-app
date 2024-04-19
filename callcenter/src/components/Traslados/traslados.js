import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Utils:
import { COMPONENT_TRASLADOS } from '../../Utils/const'
import Utils from '../../Utils/utils'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Mui:
import { Grid, makeStyles } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
//Componentes:
import HeaderFiltros from '../commons/Header/HeaderFiltros'
import Drawer2 from '../commons/CustomDrawer/Drawer'
import TablaTraslado from '../DenunciaCompleta/SolapaTraslados/TablaTraslado'
import CustomLoading from '../commons/Loading/CustomLoading'
import AdminSlide from '../commons/Slider/AdminSlide'
import IdaPaso1 from '../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso1'
import IdaPaso2 from '../TrasladosDrawer/AmbulanciaIda/ambulanciaIdaPaso2'
import IdaPaso3 from '../TrasladosDrawer/AmbulanciaIda/Paso3'
import IdaPaso4 from '../TrasladosDrawer/AmbulanciaIda/Paso4'
import NuevoContacto from '../ConsultasyReclamos/ComponentDrawer/nuevoContacto'
import PasoConfirmacionReserva from '../TrasladosDrawer/AmbulanciaIda/PasoConfirmacionReserva'
import IconSearch from '../BuscadorFlotante/IconSearch'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
})

const TrasladosSolapaPrincipal = (props) => {
    
    const { setMiniMenu, setNavegacion, setTituloHeader, open2, usuarioActivo, setOpenBuscador } = props
        
    const classes = useStyles()
    const dispatch = useDispatch()
    
    const denuncia = useSelector(state => state.documentos.denuncia)
    const datos = useSelector(state => state.traslados.trasladosGeneral.objetos ? state.traslados.trasladosGeneral.objetos : null)
    const cantidadTotal = useSelector(state => state.traslados.trasladosGeneral.cantidadTotal ? state.traslados.trasladosGeneral.cantidadTotal : 0)
    const loading = useSelector(state => state.traslados.loading)

    const [data, setData] = useState([])
    const [actualizarData, setActualizarData] = useState(false)
    const [fechaTraslado, setFechaTraslado] = useState(new Date())
    const [valTipoTraslado, setValTipoTraslado] = useState(null)
    const [valTipoTrasladoEspontaneo, setValTipoTrasladoEspontaneo] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [sectorTraslado, setSectorTraslado] = useState(false)
    const [valueDenuncia, setValueDenuncia] = useState(null)
    const [request, setRequest] = useState(null)
    const [dataCMedico, setDataCMedico] = useState(null)
    const [horaTraslado, setHoraTraslado] = useState(new Date().toString().substring(16, 21))
    const [soloCarga, setSoloCarga] = useState(false)
    const [openDrawer, setOpenDrawer] = useState({top: false, left: false, bottom: false, right: false})
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''})
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))
    const [valueHabilitado, setValueHabilitado] = useState(false)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    useEffect(() => {
        if (datos && datos.length > 0) {
            const dataRellenar = [];
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
        }else{ 
            setData([])
        }
    }, [datos])
    
    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setTituloHeader('Traslados');
    }, [])
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(true)
    }

    const handleButton = () => {
        setOpenDrawer({ ...openDrawer, 'right': true });
        setOpenBuscador(false)
    }

    const contenido = [
        { texto: 
            <NuevoContacto 
                value={valueDenuncia}
                openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar}
                valueHabilitado={true}
                setValueHabilitado={setValueHabilitado}
                setValue={setValueDenuncia}
                text={'Por favor, busca la denuncia que necesitas agregar un nuevo traslado.'}
                marginTralado={true}
            />
        },
        { texto: 
            <IdaPaso1 
                setValueHabilitado={setValueHabilitado}
                valTipoTraslado={valTipoTraslado}
                setValTipoTraslado={setValTipoTraslado}
                horaTraslado={horaTraslado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                setValTipoTrasladoEspontaneo={setValTipoTrasladoEspontaneo}
                denuncia={denuncia}
                setFechaTraslado={setFechaTraslado}
                setHoraTraslado={setHoraTraslado} request={request}
                setDataCMedico={setDataCMedico}
                dataCMedico={dataCMedico}
                setRequest={setRequest} 
            />
        },
        { texto: 
            <IdaPaso2 
                setValueHabilitado={setValueHabilitado}
                activeStep={activeStep}
                ida={valTipoTraslado === 1 ? true : false}
                vuelta={valTipoTraslado === 3 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false} denuncia={denuncia}
                valTipoTraslado={valTipoTraslado}
                valTipoTrasladoEspontaneo={valTipoTrasladoEspontaneo}
                dataCMedico={dataCMedico}
                request={request} setRequest={setRequest} 
            />
        },
        { texto: 
            <IdaPaso3 
                soloCarga={soloCarga} 
                sectorTraslado={sectorTraslado}
                tipoTraslado={valTipoTrasladoEspontaneo === 1 ? true : false}
                idaYvuelta={valTipoTraslado === 2 ? true : false} 
                idTipoTraslado={valTipoTrasladoEspontaneo}
                request={request} setRequest={setRequest} 
            />
        },
        { texto: 
            <PasoConfirmacionReserva 
                sectorTraslado={sectorTraslado} 
                soloCarga={soloCarga}
            /> 
        },
        { texto: 
            <IdaPaso4 /> 
        },
    ]

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false }); 
        setSectorTraslado(false)
        setOpenBuscador(true)
        setSoloCarga(false)
    }

    const maxSteps = contenido.length

    useEffect(() => {
        setValueHabilitado(false)
        if (activeStep === 0 || activeStep === 1) {
            setValueHabilitado(true)
        }
    }, [activeStep])

    const handleBack = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setSoloCarga(false)
        setValueHabilitado(false)
    }

    const validarCentroMedico = (centroDenuncia,centroSeleccionado) =>{
        let result = false
        if(centroSeleccionado && centroSeleccionado.id !==921){
            result = true
        }else if(centroSeleccionado ===null && centroDenuncia 
                && centroDenuncia.centroPrimerAsistencia 
                && centroDenuncia.centroPrimerAsistencia.id !== 921)
        {
            result = true
        }
        return result
    }

    const handleNext = () => {
        if (activeStep === maxSteps - 2) { 
            let request2 = request
            let serviciosList = request2 && request2.serviciosSolicitados!==null ? [...request2.serviciosSolicitados  ] : []
            let listClone = []
            serviciosList.forEach((item) => {
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
                tipoTrasladoIdTipoTrasladoRegreso: valTipoTraslado === 2 ? valTipoTrasladoEspontaneo : null,
                serviciosSolicitados: listClone,
                responsableCreacion: usuarioActivo.id,
                confirmaCEM: !sectorTraslado,
                soloCarga: soloCarga
            }
            dispatch(actions.creacionTraslado(req, successCreacion))
            
        }
        else if(activeStep === 1 && !validarCentroMedico(denuncia,dataCMedico)){
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'El centro médico no pueder ser "A DETERMINAR". Por favor elija otro centro médico para continuar'
            })} 
        else if (activeStep === 0 && valueDenuncia) {
            let valueSplit = valueDenuncia.split("-")
            const idDenuncia = valueSplit[0] ? valueSplit[0] : null;
            const estadoCEM = valueSplit[1] ? parseInt(valueSplit[1]) : null;
            dispatch(actions.searchDenunciaById(idDenuncia, estadoCEM, callbackSearhId))
           
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const callbackSearhId = (succes) => {
        if(succes){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'Hubo un problema al recuperar la denuncia. Por favor intente nuevamente.',
            })
        }
    }

    const successCreacion = (data, result, message) => {
        if (data) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (sectorTraslado) {
                setSectorTraslado(false)
            }
        }
        setActualizarData(data=> !data)
        setOpenSnackBar({
            open: true,
            severity: result,
            title: message,
        })
        setOpenDrawer({ ...openDrawer, 'right': false }); 
        setSectorTraslado(false)
        setSoloCarga(false)
        setOpenBuscador(true)
    }

    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    useEffect(() => {
        if (!openDrawer.right) {
            setActiveStep(0);
            setValTipoTraslado(null)
            setValTipoTrasladoEspontaneo(null)
            setSectorTraslado(false)
            setValueDenuncia(null)
            dispatch(actions.serchTipoTraslado())
            dispatch(actions.serchTipoViaje()) 
            setSectorTraslado(false)
            setSoloCarga(false)
        }
    }, [openDrawer])

    const handleVolver = () => {
        if (sectorTraslado) {
            setActiveStep((prevActiveStep) => prevActiveStep - 2);
            setSectorTraslado(false)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            if(soloCarga ){
                setSoloCarga(false)
            }
        }
    }

    const handleCuarto = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
        
    }

    const onClickSectorTraslado = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 2);
        setSectorTraslado(true)
    }

    const onClickSoloCarga = () => {
        setSoloCarga(true)
        handleNext()
    }

    return (
        <div className={classes.root}>

            <CustomLoading loading={loading} />

            { openDrawer && openDrawer.right && <IconSearch open={openDrawer && openDrawer.right} usuarioActivo={usuarioActivo}/> }

            <Grid item container spacing={2}>
                <Grid item xs={12}>
                    <HeaderFiltros
                        showOperadores={true}
                        showBuscador={true} 
                        estadosCEM={[
                            { codigo: 0, descripcion: 'Incompleto' },
                            { codigo: 1, descripcion: 'Completo' },
                            { codigo: 2, descripcion: 'Borrador' }
                        ]}
                        isTraslados={true} 
                        labelButton={'Traslado'}
                        variantButton={'contained'} 
                        colorButton={'primary'} iconButton = {<AddIcon htmlColor='white' />}
                        align={'center'} 
                        openMenu={open2} 
                        openMenuSiniestros={true} 
                        handleButton={handleButton}
                        component={COMPONENT_TRASLADOS} 
                        actualizarData={actualizarData}
                        page={page} 
                        rowsPerPage={rowsPerPage} 
                        siniestrosHoy={false} 
                        fechaConsulta={false}
                        //Tipo de Fecha
                        esFechaCarga={true} 
                        esFechaOcurrencia={false} 
                        esFechaContacto={false}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TablaTraslado
                        open2 = {open2}
                        data = {data}
                        cantidadTotal = {cantidadTotal}
                        setData = {setData}
                        menuGeneral = {true}
                        setActualizarData = {setActualizarData}
                        actualizarData = {actualizarData}
                        setPage = {setPage}
                        setRowsPerPage = {setRowsPerPage}
                        page = {page}
                        rowsPerPage = {rowsPerPage}
                        opcionesPaginacion={opcionesPaginacion}
                    />
                </Grid>
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
                title={'Nuevo Traslado'}
                width={'650px'}
                height={ activeStep === maxSteps - 2 || activeStep ===maxSteps -6 ? '-webkit-fill-available' : 'fit-content'}
                justify={true}
            >
                <AdminSlide
                    getStep={true}
                    contenido={contenido}
                    buttonCancelar={
                        (activeStep === 1 && !soloCarga)
                        || (activeStep === maxSteps - 4 && !soloCarga)
                        || activeStep === maxSteps - 2
                        || activeStep === maxSteps - 1
                        ? true 
                        : false
                    }
                    backBoton={true}
                    handleBack={
                        activeStep === maxSteps - 2
                        || activeStep === maxSteps - 3
                        || activeStep === maxSteps - 4
                        ? handleVolver 
                        : handleBack
                    }
                    disabled={valueHabilitado}
                    valueHabilitadoSiguiente={valueHabilitado}
                    variantBackBoton={'outlined'}
                    labelButtonCancelar={ (activeStep === 1) ? 'Solo Carga' 
                        : (activeStep === maxSteps - 4 && !soloCarga) ? 'Pedir al sector traslados' 
                        : 'Cancelar'
                    }
                    labelButtonSiguiente={ 
                        ((activeStep === maxSteps - 3) &&  !soloCarga) ? 'Hacer reserva de traslado'
                        : ((activeStep === maxSteps - 3) &&  soloCarga) ? 'Guardar Traslado'
                        : (activeStep === maxSteps - 2 && !soloCarga) ? 'Hacer Reserva' 
                        : activeStep === maxSteps - 2 && soloCarga ? 'Guardar'
                        : activeStep === maxSteps - 1 ? 'Cerrar' 
                        : 'Siguiente'
                    }
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    onClickCancelar={ (activeStep === 1) ? onClickSoloCarga 
                        : (activeStep === maxSteps - 4) ? onClickSectorTraslado 
                        : onClickCancelar
                    }
                    handleNext={activeStep !== maxSteps - 1 ? handleNext : handleGuardar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                    isAction={true}
                    confirmacionTraslado={true}
                    labelBackBoton={
                        activeStep === maxSteps - 2 
                        || activeStep === maxSteps - 3
                        || activeStep === maxSteps - 4
                        ? 'Volver' 
                        : 'Cancelar'
                    }
                    stepper={true}
                    cuartoBoton={
                        (activeStep === maxSteps - 3)
                        || activeStep === maxSteps - 4
                        ? true 
                        : false
                    }
                    labelCuartoBoton={'Cancelar'}
                    variantCuartoBoton={'outlined'}
                    handleCuarto={handleCuarto}
                />
            </Drawer2>

            {openSnackBar.open && 
                <CustomSnackBar 
                    handleClose={()=>setOpenSnackBar({open:false})} 
                    open={openSnackBar.open} 
                    title={openSnackBar.title}
                    severity={openSnackBar.severity} 
                /> 
            }
        </div>
    )
}

TrasladosSolapaPrincipal.propTypes = {
    open2: PropTypes.any,
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any
}

export default TrasladosSolapaPrincipal