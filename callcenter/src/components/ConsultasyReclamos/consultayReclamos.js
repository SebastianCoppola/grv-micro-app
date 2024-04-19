import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Utils:
import { SNACK_SEVERITY, COMPONENT_CONSULTA_RECLAMOS_GENERAL, ERROR_SEARCH_BY_ID, ERROR_SEARCH_BY_ID_REDIRECCION } from '../../Utils/const'
import Utils from '../../Utils/utils'
//Mui:
import { Grid } from '@material-ui/core'
//Componentes:
import HeaderFiltros from '../commons/Header/HeaderFiltros'
import TablaConsultasyReclamos from './tablaConsultasyReclamos'
import Drawer2 from '../commons/CustomDrawer/Drawer'
import AdminSlide from '../commons/Slider/AdminSlide'
import NuevoContacto from './ComponentDrawer/nuevoContacto'
import CargarNuevoContacto from './ComponentDrawer/cargarNuevoContacto'
import GuardarNuevoContacto from './ComponentDrawer/Guardar'
import CustomLoading from '../commons/Loading/CustomLoading'
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar'
import IconSearch from '../BuscadorFlotante/IconSearch'


const ConsultasyReclamos = (props) => {
    const { open2, setMiniMenu, setNavegacion, setTituloHeader, usuarioActivo,
        openBuscador, setOpenBuscador } = props

    const denuncia = useSelector(state => state.documentos.denuncia)
    const [selectedDesde, setSelectedDesde] = useState(null)
    const [selectedHasta, setSelectedHasta] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectCEM, setSelectCEM] = useState('')
    const [value, setValue] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const [selectedFecha, setSelectedFecha] = useState(new Date())
    const [selectedHora, setSelectedHora] = useState(selectedFecha && selectedFecha.toString().substring(16, 21))
    const [openDrawer, setOpenDrawer] = useState({top: false, left: false, bottom: false, right: false})
    const [request, setRequest] = useState(null)
    const [actualizarData, setActualizarData] = useState(false)
    const [nuevoReclamo, setNuevoReclamo] = useState(null)
    const [valTramitador, setValTramitador] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''})
    const [esOperador, setEsOperador] = useState(true)
    //Redux:
    const loading = useSelector(state => state.consultasReclamos.loading)
    const datos = useSelector(state => state.consultasReclamos.reclamosGeneral ? state.consultasReclamos.reclamosGeneral.objetos : [])
    const cantidadTotal = useSelector(state => state.consultasReclamos.reclamosGeneral ? state.consultasReclamos.reclamosGeneral.cantidadTotal : 0)
    //Pagination:
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))

    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setTituloHeader('Consultas y reclamos')
    }, [])

    useEffect(() => {
        const dataRellenar = []
        const dimension = page * rowsPerPage
        if (cantidadTotal && cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }

        let dataApi = datos && datos.length ? datos : []

        const dataRestante = []
        const lengthData = dataRellenar.length + dataApi.length
        if (cantidadTotal && lengthData < cantidadTotal) {
            for (let index = lengthData; index < cantidadTotal; index++) {
                dataRestante.push({})
            }
        }

        setData([...dataRellenar, ...dataApi, ...dataRestante])
    }, [datos])

    const handleSelectCEM = (event) => {
        setSelectCEM(event.target.value)
    }

    const handleNuevaConsulta = () => {
        setOpenDrawer({ ...openDrawer, 'right': true });
        setOpenBuscador(false)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setOpenBuscador(true)
        setValTramitador(null)
    }

    useEffect(() => {
        setActiveStep(0);
        setValue(null)
        setNuevoReclamo(null)
        setRequest(null)
        setSelectedFecha(new Date())
        setSelectedHora(selectedFecha && selectedFecha.toString().substring(16, 21));
    }, [openDrawer])

    const contenido = [
        {
            texto:
                <NuevoContacto
                    openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar}
                    valueHabilitado={false}
                    value={value}
                    setValue={setValue}
                    text={'Por favor, busca la denuncia que necesitas agregar una nueva consulta o reclamo.'}
                />
        },
        {
            texto:
                <CargarNuevoContacto
                    denuncia={denuncia}
                    setRequest={setRequest} usuarioActivo={usuarioActivo}
                    setSelectedDate={setSelectedFecha} selectedDate={selectedFecha}
                    setSelectedHora={setSelectedHora} selectedHora={selectedHora}
                    valTramitador={valTramitador} setValTramitador={setValTramitador}
                    
                />
        },
        { texto: <GuardarNuevoContacto nuevoReclamo={nuevoReclamo} /> }
    ]

    const maxSteps = contenido.length

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    const ValidarRequest = () => {
        let exitoRequest = true
        if (activeStep === 0 && value !== null) {
            exitoRequest = false
        }
        if (activeStep === 1 && denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc
            && denuncia.accidentado && selectedFecha && Utils.dateFormat3(selectedFecha)
            && selectedHora && valTramitador
            && denuncia.idDenuncia
            && usuarioActivo && usuarioActivo.id
            && request && request.idTipoContacto && request.proceso && request.mensaje) {
            exitoRequest = false

        }
        return exitoRequest
    }

    const handleNext = () => {
        if (activeStep === maxSteps - 2) {
            let req = {
                telefono: denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : '+54 - ',
                fecha: Utils.dateFormat3(selectedFecha),
                hora: selectedHora,
                tramitador: valTramitador ? valTramitador : null,
                ...request,
                idDenuncia: denuncia ? denuncia.idDenuncia : null,
                idOperador: usuarioActivo.id,
            }
            dispatch(actions.crearConsultaReclamo(req, success))
        }
        else if (activeStep === 0 && value) {
            let valueSplit = value.split("-")
            const idDenuncia = valueSplit[0] ? valueSplit[0] : null;
            const estadoCEM = valueSplit[1] ? parseInt(valueSplit[1]) : null;
            if (idDenuncia) {
                dispatch(actions.searchDenunciaById(idDenuncia, estadoCEM, callBackSearch))
            }
        }
    }

    const callBackSearch = (succes) => {
        if (succes) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title:
                    <div>
                        <div>
                            {`${ERROR_SEARCH_BY_ID} ${ERROR_SEARCH_BY_ID_REDIRECCION}`}
                        </div>
                        <div>
                            Por favor intente nuevamente.
                        </div>
                    </div>
            })
        }
    }

    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    const success = (response, message, id) => {
        if (response === SNACK_SEVERITY.SUCCESS) {
            setNuevoReclamo(id)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setActualizarData(!actualizarData)
        }
        setOpenSnackBar({
            open: true,
            severity: response,
            title: message,
        })
    }

    const handleBack = () => {
        setValue(null)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackBar({ open: false });
        setValTramitador(null)
        setOpenBuscador(true)
    }

    return (
        <div>
            <CustomLoading loading={loading} />

            {!openBuscador ?
                <IconSearch open={openBuscador} usuarioActivo={usuarioActivo}/>
            : null}

            <Grid container direction='column' alignItems='center'>
                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <HeaderFiltros
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate} selectedDesde={selectedDesde}
                            setSelectedDesde={setSelectedDesde} selectedHasta={selectedHasta}
                            setSelectedHasta={setSelectedHasta}
                            tituloEstado={'Estado'} showBuscador={true}
                            showEstadoCEM={true} estadosCEM={estadosCEM} handleSelectCEM={handleSelectCEM}
                            align={'flex-start'} openMenu={open2} nuevaDenuncia={true} showButton={true}
                            labelButton={'Nueva Consulta'} variantButton={'contained'} colorButton={'primary'}
                            handleButton={handleNuevaConsulta} siniestrosHoy={false}
                            component={COMPONENT_CONSULTA_RECLAMOS_GENERAL} actualizarData={actualizarData}
                            fechaConsulta={false}
                            showOperadores={true}
                            consultasReclamos={true}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            data={data}
                            //Tipo de Fecha
                            esFechaCarga={false}
                            esFechaOcurrencia={false}
                            esFechaContacto={true}
                            usuarioActivo={usuarioActivo}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TablaConsultasyReclamos
                            esOperador={esOperador}
                            setEsOperador={setEsOperador}
                            open2={open2}
                            data={data} setData={setData}
                            cantidadTotal={cantidadTotal}
                            denuncia={denuncia}
                            page={page} setPage={setPage}
                            rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                            usuarioActivo={usuarioActivo}
                        />
                    </Grid>
                </Grid>
            </Grid>


            <Drawer2
                openDrawer={openDrawer}
                toggleDrawer={toggleDrawer}
                // setOpenDrawer={setOpenDrawer}
                anchor='right'
                variant={'contained'}
                title={activeStep === maxSteps - 2 ? 'Cargar Nuevo Contacto' : activeStep === maxSteps - 1 ? 'Confirmacion  ' : 'Nuevo Contacto'}
                height={'100%'}
                width={'500px'}
                titleStyleJustify='start'
                titleStyleMargin={{marginLeft:'17px'}}
            >
                <AdminSlide
                    buttonCancelar={true}
                    backBoton={activeStep === 0 ? false : true}
                    labelBackBoton={'Volver'}
                    handleBack={handleBack}
                    contenido={contenido}
                    labelButtonCancelar={'Cancelar'}
                    labelButtonSiguiente={activeStep === maxSteps - 2 ? 'Guardar' : activeStep === maxSteps - 1 ? 'Cerrar' : 'Siguiente'}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    onClickCancelar={onClickCancelar}
                    valueHabilitadoSiguiente={activeStep === 0 || activeStep === 1 ? ValidarRequest() : false}
                    handleNext={activeStep !== maxSteps - 1 ? handleNext : handleGuardar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                />
            </Drawer2>
            
            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={handleClose}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                />
            : null}
        </div>
    )
}
ConsultasyReclamos.propTypes = {
    open2: PropTypes.any,
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any
};
export default ConsultasyReclamos
const estadosCEM = [{ codigo: 1, descripcion: 'Activo' },
{ codigo: 2, descripcion: 'Cerrado' },
{ codigo: 3, descripcion: 'Vencido' }
]