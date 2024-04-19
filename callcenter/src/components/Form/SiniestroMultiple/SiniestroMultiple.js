import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { makeStyles, Grid } from '@material-ui/core/'
//Utils:
import Utils from '../../../Utils/utils'
import { ALERT_CAMBIO_VINCULACION, ALERT_NUEVA_CAUSA, ALERT_NUEVA_CAUSA_CREADA_VINCULADA, ALERT_SELECCION_CAUSA } from '../../../Utils/const'
//Compoents:
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import CustomTypography from '../../commons/Typography/CustomTypography'
import AdminSlide from '../../commons/Slider/AdminSlide'
import Drawer2 from '../../commons/CustomDrawer/Drawer'
import DrawerSiniestroMultiple from './DrawerSiniestroMultiple'
import BotonVincular from './BotonVincular/BotonVincular'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import CustomLoading from '../../commons/Loading/CustomLoading'

const useStyles = makeStyles({
    texto2: {
        marginLeft: '5px',
    },
    titulo: {
        fontSize: '13px',
        marginRight: '5px'
    },
})

const SiniestroMultiple = (props) => {

    const { estilo, fechaOcurrencia, denuncia, home, disableEdition, setIdCausa, 
        setOpenBuscador, checkedSiniestroMultiple, setCheckedSiniestroMultiple } = props

    const dispatch = useDispatch()
    const classes = useStyles()

    const [textoSiniestroMultiple, setTextoSiniestroMultiple] = useState(null)
    const [descripcionSiniestroMultiple, setDescripcionSiniestroMultiple] = useState(null)
    const [tituloCausa, setTituloCausa] = useState(denuncia?.causaSiniestroMultipleTitulo ?? null)
    const [dataSeleccionada, setDataSeleccionada] = useState(undefined)
    const [showFormCausa, setShowFormCausa] = useState(false)
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const [activeStep, setActiveStep] = useState(0)
    const [fechaCausa, setFechaCausa] = useState(fechaOcurrencia)
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, title: '', severity: '' })
    const loadingSave = useSelector(state => state.documentos.loadingSiniestrosMultiplesSave)
    
    useEffect(()=>{
        if(openDrawer && openDrawer.right){
            searchCausasSiniestroMultiple()
        }
    },[fechaCausa])
    
    useEffect(()=>{
        setFechaCausa(fechaOcurrencia)
    },[fechaOcurrencia])

    useEffect(() => {
        setTituloCausa(denuncia && denuncia.siniestroMultiple ? denuncia.causaSiniestroMultipleTitulo : null)
    }, [denuncia])


    const handleCheckedSiniestroMultiple = (event) => {
        setCheckedSiniestroMultiple(!checkedSiniestroMultiple)
        setDataSeleccionada(undefined)
        setShowFormCausa(false)
    }

    const onClickVincularCausa = () => {
        setOpenDrawer({ ...openDrawer, 'right': true })
        if(setOpenBuscador) setOpenBuscador(false)
        if(setTextoSiniestroMultiple) setTextoSiniestroMultiple(null)
        setDescripcionSiniestroMultiple(null)
        setDataSeleccionada(undefined)
        searchCausasSiniestroMultiple()
    }

    const searchCausasSiniestroMultiple = () => {
        let request = { fechaOcurrencia: new Date(fechaCausa) }
        dispatch(actions.searchSiniestrosMultiples(request))
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        if(setOpenBuscador) setOpenBuscador(true)
        setShowFormCausa(false)
    }

    const onClickCancelar = () => {
        setDescripcionSiniestroMultiple(null)
        setDataSeleccionada(undefined)
        setOpenDrawer({ ...openDrawer, 'right': false });
        if(setOpenBuscador) setOpenBuscador(true)
        setShowFormCausa(false)
    }

    const handleGuardar = () => {
        //guarda una fila de la tabla o una nuva causa dependiendo
        //validacionMensaje(home, dataSeleccionada, tituloCausa)
        if (dataSeleccionada !== undefined && home === false) {
            setTituloCausa(dataSeleccionada.titulo)
            setIdCausa(dataSeleccionada.idCausaSiniestroMultiple)
            let request = {
                idCausaSiniestroMultiple: dataSeleccionada && dataSeleccionada.idCausaSiniestroMultiple,
                idDenuncia: denuncia && denuncia.idDenuncia,
                denunciaEstadoCEM: denuncia && denuncia.estadoCEM,
            }
            dispatch(actions.saveDenunciaSiniestrosMultiples(request, callbackSaveDenuncia))
        } else if (dataSeleccionada !== undefined && home) {
            setTituloCausa(dataSeleccionada.titulo)
            setIdCausa(dataSeleccionada.idCausaSiniestroMultiple)
            validacionMensaje(home, dataSeleccionada, tituloCausa)
            setOpenDrawer({ ...openDrawer, 'right': false });
            if(setOpenBuscador) setOpenBuscador(true)
        }
        else {
            setTituloCausa(textoSiniestroMultiple)
            setDataSeleccionada(undefined)
            let request = {
                titulo: textoSiniestroMultiple,
                descripcion: descripcionSiniestroMultiple,
                fechaOcurrencia: Utils.dateFormato2(fechaOcurrencia)
            }
            dispatch(actions.saveSiniestrosMultiples(request, callback))
        }
    }

    const snackBar = (open, severity, title) => {
        if (open) {
            setOpenSnackBar({
                open: true,
                severity: severity,
                title: title
            })
        }
    }

    const validacionMensaje = (stayHome, filaSeleccionada, vinculacionPrevia) => {
        if (stayHome && filaSeleccionada && vinculacionPrevia === false) {
            snackBar(true, 'success', ALERT_SELECCION_CAUSA)

        } else if (stayHome && filaSeleccionada && vinculacionPrevia) {
            snackBar(true, 'success', ALERT_CAMBIO_VINCULACION)
        }
        else if (stayHome && filaSeleccionada === undefined) {
            snackBar(true, 'success', ALERT_NUEVA_CAUSA_CREADA_VINCULADA)
        }
        else if (stayHome === false && filaSeleccionada && vinculacionPrevia) {
            snackBar(true, 'success', ALERT_CAMBIO_VINCULACION)
        } else if (stayHome === false && filaSeleccionada === undefined && vinculacionPrevia === false) {
            snackBar(true, 'success', ALERT_NUEVA_CAUSA)
        }
        else if (stayHome === false && filaSeleccionada === undefined && vinculacionPrevia) {
            snackBar(true, 'success', ALERT_NUEVA_CAUSA_CREADA_VINCULADA)
        }
    }

    const callback = (succes, data) => {
        if (succes) {
            setIdCausa(data.idCausaSiniestroMultiple)

            if (denuncia) {
                let request = {
                    idCausaSiniestroMultiple: data.idCausaSiniestroMultiple,
                    idDenuncia: denuncia && denuncia.idDenuncia,
                    denunciaEstadoCEM: denuncia && denuncia.estadoCEM,
                }
                dispatch(actions.saveDenunciaSiniestrosMultiples(request, callbackSaveDenuncia))
            }
            validacionMensaje(home, dataSeleccionada, tituloCausa)
            if (home) {
                setOpenDrawer({ ...openDrawer, 'right': false });
                if(setOpenBuscador) setOpenBuscador(true)
            }
        } else {
            snackBar(true, 'error', 'No se pudo asociar la causa')

        }
        setShowFormCausa(false)
    }

    const callbackSaveDenuncia = (success) => {
        if (success) {
            let estadoCem = denuncia && denuncia.estadoCEM
            let idDenuncia2 = denuncia && denuncia.idDenuncia
            dispatch(actions.searchDenunciaById(idDenuncia2, estadoCem, callbackSearch))
            validacionMensaje(home, dataSeleccionada, tituloCausa)
            setOpenDrawer({ ...openDrawer, 'right': false });
        } else {
            snackBar(true, 'error', 'No se pudo VINCULAR la causa')
        }
    }

    const callbackSearch = (succes) => {
        
    }

    const contenido = [{
        texto: <DrawerSiniestroMultiple
                    textoSiniestroMultiple={textoSiniestroMultiple} setTextoSiniestroMultiple={setTextoSiniestroMultiple}
                    descripcionSiniestroMultiple={descripcionSiniestroMultiple} setDescripcionSiniestroMultiple={setDescripcionSiniestroMultiple}
                    dataSeleccionada={dataSeleccionada} setDataSeleccionada={setDataSeleccionada}
                    showFormCausa={showFormCausa} setShowFormCausa={setShowFormCausa}
                    fechaCausa={fechaCausa} setFechaCausa={setFechaCausa}
                />
    }]
    
    const maxSteps = contenido.length
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }
    
    return (
        <Grid item container alignItems='center' style={estilo ? { display: 'block' } : null} spacing={2}>

            <Grid item>
                <CustomCheck
                    checked={checkedSiniestroMultiple}
                    handleChange={handleCheckedSiniestroMultiple}
                    texto={'Siniestro Múltiple'}
                    disabled={disableEdition}
                />
            </Grid>

            {checkedSiniestroMultiple && tituloCausa &&
                <Grid item>
                    <CustomTypography
                        text={'Título de la causa: ' + tituloCausa}
                        variant={'body1'} 
                        className={classes.titulo}
                    />
                </Grid>
            }

            {checkedSiniestroMultiple &&
                <BotonVincular
                    textoButtonSiniestroMultiple={ tituloCausa ? "Cambiar vinculación" : "Vincular a una causa"}
                    onClickSiniestroMultiple={onClickVincularCausa} 
                />
            }

            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                variant={'contained'}
                title={'Siniestros múltiples'}
                height={'100%'}
                width={'650px'}
                titleStyleJustify='start'
                titleStyleMargin={{marginLeft:'15px'}}
            >
                <AdminSlide
                    buttonCancelar={true}
                    contenido={contenido}
                    labelButtonCancelar={'Cancelar'}
                    labelButtonSiguiente={'Guardar'}
                    valueHabilitadoSiguiente={((textoSiniestroMultiple !== null && descripcionSiniestroMultiple !== null) || (dataSeleccionada !== undefined)) ? false : true}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    onClickCancelar={onClickCancelar}
                    handleNext={handleGuardar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                />
            </Drawer2>

            <CustomSnackBar 
                vertical={'bottom'} 
                handleClose={handleClose} 
                open={openSnackBar.open} 
                title={openSnackBar.title}
                severity={openSnackBar.severity} 
            /> 

            <CustomLoading loading={loadingSave} />

        </Grid>
    )
}
export default SiniestroMultiple