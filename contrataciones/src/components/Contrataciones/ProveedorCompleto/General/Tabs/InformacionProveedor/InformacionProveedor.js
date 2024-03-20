import React, { useEffect, useState } from 'react'
//Utils:
import Utils from '../../../../../../Utils/utils'
import { CUIT_FORMATO_INVALIDO, SNACK_SEVERITY, SNACK_MESSAGE, SNACK_VERTICAL} from '../../../../../../Utils/const'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions/index'
//Router:
import { useHistory } from 'react-router'
//Maps:
import credentials from './Maps/ComponenteMapa/credentials'
import Geocode from "react-geocode"
//Mui:
import { Grid } from '@material-ui/core'
import { Warning } from "@material-ui/icons/"
//Components:
import CustomInformacionProveedor from '../../../../AltaProveedor/DatosProveedor/InformacionProveedor/CustomInformacionProveedor'
import PersonaJuridica from '../../../../AltaProveedor/DatosProveedor/Persona/PersonaJuridica'
import PersonaFisica from '../../../../AltaProveedor/DatosProveedor/Persona/PersonaFisica'
import CustomTypography from '../../../../../commons/Typography/CustomTypography'
import CustomButton from '../../../../../commons/Button/CustomButton'
import TipoProveedor from '../../../../AltaProveedor/DatosProveedor/TipoProveedor/TipoProveedor'
import ComponenteMapa from './Maps/ComponenteMapa'
import AcordionTipoProveedor from '../ACtipoProveedor/AcordionTipoProveedor'
import CustomCheck from '../../../../../commons/CustomCheck/CustomChek'
import CustomAlert from '../../../../../commons/CustomAlert/customAlert'
import CustomSnackBar from '../../../../../commons/SnackBar/CustomSnackBar'
import CustomConfirmacion from '../../../../../commons/Dialogo/CustomConfirmacion'
import CustomLoading from '../../../../../commons/Loading/CustomLoading'

const InformacionProveedor = ({ proveedor, data, setData, usuarioActivo }) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const tipoPersona = useSelector(state => state.listados.tipoPersonas)
    const loadingValidarCuit = useSelector(state => state.proveedor.loadingValidarCuit)
    const dataTipoProveedor = useSelector(state => state.listados.tipoPrestadorSelect)
    const loadingSaveProveedor = useSelector(state=> state.proveedor.loadingSaveProveedor)

    const [confirmacionCancelar, setConfirmacionCancelar] = useState(false)
    const [alertWarning, setAlertWarning] = useState({open: false, title: '', severity: '', vertical:''})
    const [snackbarSave, setSnackbarSave] = useState({open: false, title: '', severity: '', vertical:''})
    const [valChip, setValChip] = useState(tipoPersona ? tipoPersona : null)
    const [viewMap, setViewMap] = useState(false)
    const [checkedSwitch, setCheckedSwitch] = useState(proveedor && proveedor.ubicacionValidada ? proveedor.ubicacionValidada : false)
    const [checkedPrioridad, setCheckedPrioridad] = useState(proveedor && proveedor.prioritario === 1 ? true : false)
    const [cuit, setCuit] = useState(proveedor ? proveedor.cuit : null)
    const [errorCuit, setErrorCuit] = useState(false)
    const [mensajeErrorCuit, setMensajeErrorCuit] = useState(null)
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(dataTipoProveedor ? dataTipoProveedor : [])
    const [tiposActuales, setTiposActuales] = useState(null)
    
    //Datos del customText de persona fisica:
    const [text, setText] = useState([
        {
            titulo: 'DNI *', nombre: 'dni',
            value: proveedor ? proveedor.dni : null, placeholder: '', item: 4, id: 1
        },
        {
            titulo: 'Nombre y Apellido *', nombre: 'razonSocial',
            value: proveedor ? proveedor.razonSocial : null, placeholder: '', item: 4, id: 1
        },
        {
            titulo: 'Nombre Corto', nombre: 'nombreCorto',
            value: proveedor ? proveedor.nombreCorto : null, placeholder: '', item: 4, id: 1
        },
    ])
    const [text2, setText2] = useState([
        {
            titulo: 'Calle *', nombre: 'domicilioCalle', type: null, pattern: null, id: 1,
            value: proveedor ? proveedor.domicilioCalle : null, placeholder: '', item: 5
        },
        {
            titulo: 'Nro *', nombre: 'domicilioNumero', type: 'number', pattern: "^[0-9,$]*$", id: 1,
            value: proveedor ? proveedor.domicilioNumero : null, placeholder: '', item: 2
        },
        {
            titulo: 'Piso', nombre: 'domicilioPiso', type: null, pattern: null,
            value: proveedor ? proveedor.domicilioPiso : null, placeholder: '', item: 2
        },
        {
            titulo: 'Dpto.', nombre: 'domicilioDepto', type: null, pattern: null,
            value: proveedor ? proveedor.domicilioDepto : null, placeholder: '', item: 2
        },

    ])
    //Datos del customText de persona jurídica:
    const [textJuridica, setTextJuridica] = useState([
        {
            titulo: 'Razón Social *', nombre: 'razonSocial', id: 1,
            value: proveedor ? proveedor.razonSocial : null, placeholder: '', item: 4
        },
        {
            titulo: 'Nombre de fantasía', nombre: 'nombreCorto',
            value: proveedor ? proveedor.nombreCorto : null, placeholder: '', item: 3
        },
    ])
    const [text2Juridica, setText2Juridica] = useState([
        {
            titulo: 'Calle *', nombre: 'domicilioCalle', type: null, pattern: null, id: 1,
            value: proveedor ? proveedor.domicilioCalle : null, placeholder: '', item: 7
        },
        {
            titulo: 'Nro *', nombre: 'domicilioNumero', type: 'number', pattern: "^[0-9,$]*$", id: 1,
            value: proveedor ? proveedor.domicilioNumero : null, placeholder: '', item: 2
        },
        {
            titulo: 'Piso', nombre: 'domicilioPiso', type: null, pattern: null,
            value: proveedor ? proveedor.domicilioPiso : null, placeholder: '', item: 1
        },
        {
            titulo: 'Dpto.', nombre: 'domicilioDepto', type: null, pattern: null,
            value: proveedor ? proveedor.domicilioDepto : null, placeholder: '', item: 1
        },
    ])
    //GeoLoc:
    const [coordenadas, setCoordenadas] = useState({})
    Geocode.setApiKey(credentials.mapsKey)
    const adress = data ? Utils.AdressContratacion(data) : ''
    const [dataGeocode, setDataGeocode] = useState(null)


    useEffect(() => {
        dispatch(actions.serchTipoPersonas())
    }, [])

    useEffect(() => {
        setValChip(tipoPersona)
        actualizarChip()
    }, [tipoPersona])

    useEffect(() => {
        actualizarChip()
    }, [proveedor])

    useEffect(() => {
        Geocode.fromAddress(adress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setDataGeocode(response.results[0].geometry.location)
                setCoordenadas({
                    lat: lat,
                    lng: lng
                })
            },
            (error) => {
                console.error(error)
            }
        )
    }, [adress])

    useEffect(() => {
        if (checkedSwitch) {
            setData({
                ...data,
                latitudMaps: dataGeocode && dataGeocode.lat,
                longitudMaps: dataGeocode && dataGeocode.lng
            })
        } else {
            setData({
                ...data,
                latitudMaps: null,
                longitudMaps: null
            })
        }
    }, [checkedSwitch, dataGeocode])
   
    //Maneja el click de los chips Física/Jurídica:
    const onClickChip = (event, codigo) => {
        setData({ ...data, idTipoPersona: codigo })
        setValChip(tipoPersona.map((i, index2) => {
            if (i && (codigo === i.codigo)) {
                return { ...i, verificado: true }
            } else {
                return { ...i, verificado: false }
            }
        })
        )
    }
    
    const actualizarChip = () => {
        if (proveedor) {
            setValChip(tipoPersona.map((i, index2) => {
                if (i && (proveedor.idTipoPersona === i.codigo)) {
                    return { ...i, verificado: true }
                } else {
                    return { ...i, verificado: false }
                }
            }))
        }
    }  

    const handleUbicacion = () => {
        setViewMap(!viewMap)
    }

    const handleCheckedPrioridad = (event) => {
        setCheckedPrioridad(event.target.checked)
        setData({
            ...data,
            prioritario: event.target.checked ? 1 : 0
        })
    }

    const changeCuit = (event) => {
        setCuit(event.target.value)
        setData({
            ...data,
            cuit: event.target.value !== '' ? event.target.value : null
        })
        setErrorCuit(false)
        setMensajeErrorCuit(null)
        setAlertWarning({ open: false });
        if ((event.target.value).length === 11) {
            let request = {
                cuit: event.target.value
            }
            dispatch(actions.validacionCuit(request, callbackCuit))
        } else {
            setErrorCuit(true)
            setMensajeErrorCuit(CUIT_FORMATO_INVALIDO)
        }
    }

    const callbackCuit = (succes, mensj) => {
        if (succes) {
            if (mensj && mensj.estado === 0) {
                setErrorCuit(false)
                setMensajeErrorCuit(null)
                setAlertWarning({ open: false });
            } else if (mensj && mensj.estado !== 0) {
                setErrorCuit(true)
                setMensajeErrorCuit(mensj.mensaje)
                setData({
                    ...data,
                    cuit: null
                })
                setAlertWarning({
                    open: true,
                    severity: 'error',
                    title: <div>
                        {mensj && mensj.estado === 1 ? `${mensj && mensj.mensaje}. Por favor, ingresar otro que no haya sido registrado.` :
                            `${mensj && mensj.mensaje}. `}
                    </div>
                })
            }
        } else {
            setAlertWarning({
                open: true,
                severity: 'error',
                title: <div>
                    {'Ocurrió un error. Por favor intente nuevamente'}
                </div>
            })
        }
    }

    //VALIDACIONES:
    const validarCuitDni = () => {
        let error = false
        if (data.idTipoPersona === 1) {
            text && text.forEach(text => {
                if (text.nombre === 'dni') {
                    if ((cuit != null && cuit.length === 11) && (text.dni != null && text.dni.length === 8 || text.value != null && text.value.length === 8)) {
                        error = false
                    } else {
                        error = true
                    }
                }
            })
        }
        if (data.idTipoPersona === 2) {
            if (cuit != null && cuit.length === 11) {
                error = false
            } else {
                error = true
            }
        }
        return error
    }

    const permitidoGuardar = () => {
        let validarGuardarSave = Utils.validarGuardar(data, tiposActuales)
        let validarEspecialidades = Utils.ValidarEspecialidadesPrestador(tiposActuales)
        let errrorCuitDni = validarCuitDni()
        
        if (validarGuardarSave || validarEspecialidades) {
            setSnackbarSave({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                vertical: SNACK_VERTICAL.TOP,
                title: SNACK_MESSAGE.ERROR_CAMPOS_REQUERIDOS
            })
            return false
        } else if ( errrorCuitDni ){
            setSnackbarSave({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                vertical: SNACK_VERTICAL.TOP,
                title: SNACK_MESSAGE.ERROR_CUIT_DNI
            })
            return false
        }else{
            return true
        }
    }

    //ACCIONES:
    const onGrabarSalir = () => {

        let callback = (success) => {
            if (success) {
                history.push('/home/proveedores')
            }else{
                setSnackbarSave({
                    open: true,
                    severity: SNACK_SEVERITY.ERROR,
                    vertical: SNACK_VERTICAL.TOP,
                    title: SNACK_MESSAGE.ERROR_AL_GURADAR
                })
            }
        }

        if(permitidoGuardar()){
            let request = { ...data, "tipoProveedores": { ...tiposActuales }, "idResponsable": usuarioActivo && usuarioActivo.id }
            dispatch(actions.saveProveedorEdit(request, callback))
        }
    }

    const onGuardar = () => {

        let callback = (success) => {

            setSnackbarSave({
                open: true,
                severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
                vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP,
                title: success ? SNACK_MESSAGE.GUARDAR_PROVEEDOR : SNACK_MESSAGE.ERROR_AL_GURADAR
            })

            if (success) {
                proveedorSeleccionado && proveedorSeleccionado.map((it) => {
                    if (it.seleccionado) {
                        const req = {
                            idProveedor: data && data.idProveedor,
                            idTipoProveedor: it.codigo
                        }
                        dispatch(actions.findTiposProveedorDatos(req))
                    }
                })
            }
            
        }

        if(permitidoGuardar()){
            let request = { 
                ...data, 
                'tipoProveedores': { ...tiposActuales }, 
                'idResponsable': usuarioActivo && usuarioActivo.id 
            }
            dispatch(actions.saveProveedorEdit(request, callback))
        }
    }

    return (
        <Grid container justify='flex-start' alignItems='center' spacing={6} >

            <Grid item xs={12}>
                {alertWarning.open &&
                    <CustomAlert
                        message={alertWarning.title}
                        onClose={()=>setAlertWarning({ open: false })}
                        color={true}
                        severity={alertWarning.severity}
                        open={alertWarning.open}
                        icon={<Warning htmlColor={"#e34850"} />} 
                    />
                }
            </Grid>

            <Grid item xs={12}>
                <CustomTypography text={'Persona'} variant={'subtitle1'} />
            </Grid>

            <Grid item xs={12}>
                <CustomInformacionProveedor
                    valChip={valChip}
                    onClickChip={onClickChip}
                />
            </Grid>

            <Grid item container spacing={2}>
                {valChip && valChip.map((it) => {
                    return (
                        it && it.codigo === 2 && it.verificado ?
                            <Grid item xs={11}>
                                <PersonaJuridica
                                    proveedor={proveedor}
                                    item={1}
                                    textJuridica={textJuridica} setTextJuridica={setTextJuridica}
                                    text2Juridica={text2Juridica} setText2Juridica={setText2Juridica}
                                    data={data} setData={setData}
                                    checkedSwitch={checkedSwitch}
                                    cuit={cuit} setCuit={setCuit}
                                    errorCuit={errorCuit} setErrorCuit={setErrorCuit}
                                    mensajeErrorCuit={mensajeErrorCuit}
                                    setMensajeErrorCuit={setMensajeErrorCuit}
                                    loadingValidarCuit={loadingValidarCuit}
                                    changeCuit={changeCuit} />
                            </Grid>
                        :
                            it && it.codigo === 1 && it.verificado ?
                                <Grid item xs={11}>
                                    <PersonaFisica
                                        text={text}
                                        setText={setText}
                                        text2={text2}
                                        setText2={setText2}
                                        itemLoc={5}
                                        itemCod={6}
                                        data={data}
                                        setData={setData}
                                        checkedSwitch={checkedSwitch}
                                        cuit={cuit} setCuit={setCuit}
                                        errorCuit={errorCuit} setErrorCuit={setErrorCuit}
                                        mensajeErrorCuit={mensajeErrorCuit}
                                        setMensajeErrorCuit={setMensajeErrorCuit}
                                        loadingValidarCuit={loadingValidarCuit}
                                        changeCuit={changeCuit}
                                        proveedor={proveedor} />
                                </Grid>
                        : null
                    )
                })}

            </Grid>

            <ComponenteMapa
                gridLat={7}
                gridMapa={9}
                gridSwitch={5}
                handleUbicacion={handleUbicacion}
                checkedSwitch={checkedSwitch}
                setCheckedSwitch={setCheckedSwitch}
                adress={adress}
                coordenadas={coordenadas}
                viewMap={viewMap}
                data={data} setData={setData}
            />

            <Grid item xs={12}>
                <CustomCheck
                    checked={checkedPrioridad}
                    handleChange={handleCheckedPrioridad}
                    texto={'Es prioritario'} 
                />
            </Grid>

            <Grid item xs={11}>
                <TipoProveedor
                    data={data}
                    setData={setData}
                    subPrestador={true}
                    proveedorSeleccionado={proveedorSeleccionado}
                    setProveedorSeleccionado={setProveedorSeleccionado}
                    dataTipoProveedor={dataTipoProveedor}
                />
            </Grid>

            <Grid item xs={11}>
                <AcordionTipoProveedor
                    tiposActuales={tiposActuales}
                    setTiposActuales={setTiposActuales}
                    proveedor={proveedor}
                    data={data}
                    setData={setData}
                    proveedorSeleccionado={proveedorSeleccionado}
                    setProveedorSeleccionado={setProveedorSeleccionado}
                    dataTipoProveedor={dataTipoProveedor}
                />
            </Grid>

            <Grid container style={{margin: '100px 0 50px 0'}} xs={12} direction='column' alignItems='center' justify='center' >
                <Grid item container xs={9} justify={'flex-end'} spacing={1}>
                    <Grid item>
                        <CustomButton
                            label={'Cancelar'}
                            isAction={true}
                            color={'secondary'}
                            onClik={()=>setConfirmacionCancelar(true)}
                        />
                    </Grid>
                    <Grid item>
                        <CustomButton
                            label={'Grabar y salir'}
                            variant={'outlined'}
                            isAction={true}
                            color={'secondary'}
                            onClik={onGrabarSalir}
                        />
                    </Grid>
                    <Grid item>
                        <CustomButton
                            label={'Guardar cambios'}
                            variant={'contained'}
                            isAction={true}
                            color={'primary'}
                            onClik={onGuardar}
                        />
                    </Grid>
                </Grid>

            </Grid>

            <CustomSnackBar
                handleClose={()=> setSnackbarSave({open: false})}
                open={snackbarSave.open}
                title={snackbarSave.title}
                severity={snackbarSave.severity} 
                vertical={snackbarSave.vertical}
            />

            <CustomConfirmacion
                openConfirmacion={confirmacionCancelar}
                title='Cancelar edición'
                text='Volverás a la pantalla anterior sin guardar cambios.'
                handleCancelar={()=>setConfirmacionCancelar(false)}
                handleConfirmar={()=>history.push('/home/proveedores')}
            />

            <CustomLoading loading={loadingSaveProveedor} />

        </Grid>
    )
}

export default InformacionProveedor