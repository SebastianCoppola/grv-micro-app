import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import Utils from '../../../Utils/utils'
import { COMPONENT_CONSULTA_RECLAMOS_COMPLETO, SNACK_SEVERITY } from '../../../Utils/const'
//Mui:
import { Grid } from '@material-ui/core'
//Componentes:
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'
import HeaderFiltros from '../../commons/Header/HeaderFiltros'
import CargarNuevoContacto from '../../ConsultasyReclamos/ComponentDrawer/cargarNuevoContacto'
import GuardarNuevoContacto from '../../ConsultasyReclamos/ComponentDrawer/Guardar'
import TablaConsultasyReclamos from '../../ConsultasyReclamos/tablaConsultasyReclamos'
import AdminSlide from '../../commons/Slider/AdminSlide'
import Drawer2 from '../../commons/CustomDrawer/Drawer'
import CustomLoading from '../../commons/Loading/CustomLoading'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import IconSearch from '../../BuscadorFlotante/IconSearch'

const SolapaConsultasyReclamos = (props) => {

    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, open2, denuncia,
        usuarioActivo, esOperador, setOpenBuscador, disableEdition,
        dataSiniestroCompleto, setDataSiniestroCompleto, 
        guardarContenedor, setGuardarContenedor } = props
        
    const dispatch = useDispatch()

    const loading = useSelector(state => state.consultasReclamos.loading)
    const datos = useSelector(state => state.consultasReclamos.reclamosCompleto ? state.consultasReclamos.reclamosCompleto.objetos : [])
    const cantidadTotal = useSelector(state => state.consultasReclamos.reclamosCompleto ? state.consultasReclamos.reclamosCompleto.cantidadTotal : 0)

    const [open, setOpen] = useState(true);
    const [selectedDesde, setSelectedDesde] = useState(null)
    const [selectedHasta, setSelectedHasta] = useState(null)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedFecha, setSelectedFecha] = useState(new Date())
    const [selectedHora, setSelectedHora] = useState(new Date().toString().substring(16, 21))
    const [selectCEM, setSelectCEM] = useState('')
    const [value, setValue] = useState(null)
    const [activeStep, setActiveStep] = useState(0)
    const [data, setData] = useState([])
    const [openDrawer, setOpenDrawer] = useState({top: false, left: false, bottom: false, right: false})
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(Utils.setRowsTables(usuarioActivo))
    const [request, setRequest] = useState(null)
    const [actualizarData, setActualizarData] = useState(false)
    const [nuevoReclamo, setNuevoReclamo] = useState(null)
    const [valTramitador, setValTramitador] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''})

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(false)
        setTituloNavegacionSiniestro('Consultas y Reclamos')
    }, [])

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
    }

    useEffect(() => {
        setActiveStep(0)
        setValue(null)
        setNuevoReclamo(null)
        setRequest(null)
        setSelectedFecha(new Date())
        setSelectedHora(selectedFecha && selectedFecha.toString().substring(16, 21))
    }, [openDrawer])

    const contenido = [
        {
            texto: <CargarNuevoContacto
                denuncia={denuncia} request={request} setRequest={setRequest}
                usuarioActivo={usuarioActivo}
                setSelectedDate={setSelectedFecha} selectedDate={selectedFecha}
                setSelectedHora={setSelectedHora} selectedHora={selectedHora}
                valTramitador={valTramitador} setValTramitador={setValTramitador} />
        },
        { texto: <GuardarNuevoContacto nuevoReclamo={nuevoReclamo} /> }
    ]

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
    }

    const ValidarRequest = () => {
        let exitoRequest = true
        if (denuncia && denuncia.accidentado && denuncia.accidentado.nroDoc
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
        let req = {
            telefono: denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : '+54 - ',
            fecha: Utils.dateFormat3(selectedFecha),
            hora: selectedHora,
            tramitador: valTramitador,
            ...request,
            idDenuncia: denuncia ? denuncia.idDenuncia : null,
            idOperador: usuarioActivo.id,

        }
        dispatch(actions.crearConsultaReclamo(req, success))
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

    const handleGuardar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setOpenBuscador(true)
        setRequest(null)
    }

    const maxSteps = contenido.length

    useEffect(() => {
        setData(datos)
    }, [datos])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    useEffect(() => {
        if (setDataSiniestroCompleto) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
            }))
        }
    }, [])

    return (
        <Fragment>

            <CustomLoading loading={loading} />

            {openDrawer && openDrawer.right &&
                <IconSearch open={openDrawer && openDrawer.right} usuarioActivo={usuarioActivo}/>
            }

            <ContenedorMenuSiniestroCompleto
                openMenuSiniestros={open}
                setOpenMenuSiniestros={setOpen}
                dataSiniestroCompleto={dataSiniestroCompleto}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                denuncia={denuncia}
                usuarioActivo={usuarioActivo}
                esOperador={esOperador}
                setGuardarContenedorAhora={setGuardarContenedor}
                guardarContenedorAhora={guardarContenedor}
                disableEdition={disableEdition}
                setOpenBuscador={setOpenBuscador}
            >
                <Grid container spacing={3} alignItems='center' style={{ padding: '15px' }}>
                    <Grid item xs={12}>
                        <HeaderFiltros
                            setSelectedDate={setSelectedDate}
                            selectedDate={selectedDate}
                            selectedDesde={selectedDesde}
                            setSelectedDesde={setSelectedDesde}
                            selectedHasta={selectedHasta}
                            setSelectedHasta={setSelectedHasta}
                            tituloEstado={'Estado'}
                            showEstadoCEM={true} estadosCEM={estadosCEM}
                            handleSelectCEM={handleSelectCEM}
                            align={'center'} openMenu={open2} nuevaDenuncia={true} showButton={true}
                            labelButton={'Nueva Consulta'} variantButton={'contained'}
                            colorButton={'primary'}
                            handleButton={handleNuevaConsulta}
                            component={COMPONENT_CONSULTA_RECLAMOS_COMPLETO}
                            idDenuncia={denuncia ? denuncia.idDenuncia : null}
                            actualizarData={actualizarData}
                            fechaConsulta={false}
                            disableEdition={disableEdition}
                            //Tipo de Fecha
                            esFechaCarga={false}
                            esFechaOcurrencia={false}
                            esFechaContacto={true}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TablaConsultasyReclamos
                            esOperador={esOperador}
                            open2={open2}
                            data={data} setData={setData}
                            cantidadTotal={cantidadTotal}
                            setPage={setPage}
                            setRowsPerPage={setRowsPerPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            usuarioActivo={usuarioActivo}
                        />
                    </Grid>
                    <Drawer2
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                        anchor='right'
                        width={'450px'}
                        toggleDrawer={toggleDrawer}
                        variant={'contained'}
                        title={activeStep === maxSteps - 2 ? 'Cargar Nuevo Contacto' : activeStep === maxSteps - 1 ? 'Confirmacion  ' : 'Nuevo Contacto'}
                        height={'100%'}
                    >
                        <AdminSlide
                            buttonCancelar={false}
                            backBoton={activeStep === 0 ? true : false}
                            handleBack={onClickCancelar}
                            labelBackBoton={'Cancelar'}
                            isAction={true}
                            contenido={contenido}
                            labelButtonCancelar={'Cancelar'}
                            labelButtonSiguiente={activeStep === maxSteps - 2 ? 'Guardar' : 'Cerrar'}
                            variantButtonCancelar={'outlined'}
                            valueHabilitadoSiguiente={ValidarRequest()}
                            variantButtonSiguiente={'contained'}
                            onClickCancelar={onClickCancelar}

                            handleNext={activeStep !== maxSteps - 1 ? handleNext : handleGuardar}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            maxSteps={maxSteps} />

                    </Drawer2>
                </Grid>
            </ContenedorMenuSiniestroCompleto>

            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={handleClose}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity} />
            : null}
            
        </Fragment>
    )
}
SolapaConsultasyReclamos.propTypes = {
    open2: PropTypes.any,
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any,
    usuarioActivo: PropTypes.any
};
export default SolapaConsultasyReclamos
const estadosCEM = [{ codigo: 0, descripcion: 'Activo' },
{ codigo: 1, descripcion: 'Vencido' },
{ codigo: 2, descripcion: 'Cerrado' }
]