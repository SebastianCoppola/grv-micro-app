import React, { useDebugValue, useEffect, useState } from 'react'
//material-ui
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DatosProveedor from './DatosProveedor/DatosProveedor';
import DatosDeContacto from './DatosContacto/DatosDeContacto';
import CustomButton from '../../commons/Button/CustomButton';
import Confirmacion from './DatosProveedor/Confirmacion/Confirmacion';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
import { NUEVO_PROVEEDOR } from '../../../Utils/const';
import { useHistory } from 'react-router';
import CustomAlert from '../../commons/CustomAlert/customAlert';

const AltaProveedores = (props) => {
    const { setTituloHeader, usuarioActivo, setProveedor } = props;
    const history = useHistory();
    useEffect(() => {
        setTituloHeader(NUEVO_PROVEEDOR);
    }, []);


    const dispatch = useDispatch()
    const [openConfirmacion, setOpenConfirmacion] = React.useState(false)
    const [data, setData] = React.useState({ idTipoPersonaProveedor: 2, idResponsable: usuarioActivo && usuarioActivo.id, idTipoContacto: 2, esPrioritario: 0 })
    const tipoPersona = useSelector(state => state.listados.tipoPersonas)
    const dataBusquedaPrestador = useSelector(state => state.documentos.dataPrestadores)
    const [alertRedireccion, setAlertRedireccion] = useState(false)
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open: false,
        title: '',
        severity: ''
    });

    const snackBar = (open, severity, title) => {
        if (open) {
            setOpenSnackBar({
                open: true,
                severity: severity,
                title: title
            })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    const [text, setText] = React.useState([
        { titulo: 'DNI *', nombre: 'dni', value: null, placeholder: '', item: 4 },
        { titulo: 'Nombre y Apellido *', nombre: 'razonSocial', value: null, placeholder: '', item: 4 },
        { titulo: 'Nombre Corto', nombre: 'nombreCorto', value: null, placeholder: '', item: 4 },
    ])
    const [text2, setText2] = React.useState([
        { titulo: 'Calle *', nombre: 'domicilioCalle', value: null, placeholder: '', item: 6 },
        { titulo: 'Nro. *', nombre: 'domicilioNumero', value: null, placeholder: '', item: 2 },
        { titulo: 'Piso', nombre: 'domicilioPiso', value: null, placeholder: '', item: 2 },
        { titulo: 'Dpto.', nombre: 'domicilioDepto', value: null, placeholder: '', item: 2 },

    ])
    const [textJuridica, setTextJuridica] = React.useState([
        { titulo: 'Razón Social *', nombre: 'razonSocial', value: null, placeholder: '', item: 5 },
        { titulo: 'Nombre de fantasía', nombre: 'nombreCorto', value: null, placeholder: '', item: 3 },
    ])
    // const [text2Juridica, setText2Juridica] = React.useState([
    //     { titulo: 'Calle *', nombre: 'domicilioCalle', value: null, placeholder: '', item: 8 },
    //     { titulo: 'Nro *', nombre: 'domicilioNumero', value: null, placeholder: '', item: 1 },
    //     { titulo: 'Piso', nombre: 'domicilioPiso', value: null, placeholder: '', item: 1 },
    //     { titulo: 'Dpto.', nombre: 'domicilioDepto', value: null, placeholder: '', item: 1 },

    // ])

    // useEffect(() => console.log(data), [data])

    const Grabar = () => {
        if (data && data.idTipoPersonaProveedor === 2) {
            if (data.cuit.length < 11) {
                setOpenSnackBar({
                    open: true,
                    severity: 'error',
                    title: <div>{'CUIT Invalido'}</div>
                })
            } else {
                setData({
                    ...data,
                    "idResponsable": usuarioActivo ? usuarioActivo.id : null
                })
                setOpenConfirmacion(true)
            }
        }

        if (data && data.idTipoPersonaProveedor === 1) {
            if (data.cuit.length < 11 || data.dni.length < 8) {
                setOpenSnackBar({
                    open: true,
                    severity: 'error',
                    title: <div>{'CUIT o DNI Invalido'}</div>
                })
            } else {
                setData({
                    ...data,
                    "idResponsable": usuarioActivo ? usuarioActivo.id : null
                })
                setOpenConfirmacion(true)
            }
        }

    }
    useEffect(() => {
        dispatch(actions.getListadoTipoPrestadorSelect())
        dispatch(actions.serchTipoPersonas())
        //Elimino el proveedor cargado anteriormente de editar:
        dispatch(actions.setTipoProveedorDatosNull())
    }, [])
    const [borrar, setBorrar] = useState(false)
    const borrado = () => {
        setText(item => item.map(i => ({ ...i, [i.nombre]: "" })))
        setText2(item => item.map(i => ({ ...i, [i.nombre]: "" })))
        setTextJuridica(item => item.map(i => ({ ...i, [i.nombre]: "" })))
        // setText2Juridica(item => item.map(i => ({ ...i, [i.nombre]: "" })))
        setData({ idTipoPersonaProveedor: 2, idResponsable: usuarioActivo && usuarioActivo.id, idTipoContacto: 2, esPrioritario: 0 })
    }
    const onCancelar = () => {
        setBorrar(true)
        borrado()
    }
    const clikCompletarEdicion = () => {
        const request = {
            cuit: data && data.cuit,
            tipoProveedor: data && data.tipoProveedor[0],
            limit: 1,
            offset: 0
        }
        dispatch(actions.busquedaPrestador(request, callbackBusquedaEdicion))
    }
    const callbackBusquedaEdicion = (succes, data) => {
        if (!succes) {
            setProveedor(data && data.objetos[0])
            history.push({
                pathname: '/home/proveedores/general',

            })
        } else {
            setAlertRedireccion(true)
        }
    }
    const handleCloseAlert = () => {
        setAlertRedireccion(false)
    }
    return (
        <Container maxWidth='lg' >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DatosProveedor
                        text={text} setText={setText}
                        text2={text2} setText2={setText2}
                        textJuridica={textJuridica} setTextJuridica={setTextJuridica}
                        item={9}
                        data={data}
                        setData={setData}
                        tipoPersona={tipoPersona}
                        borrar={borrar}
                        setBorrar={setBorrar}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DatosDeContacto
                        data={data} setData={setData}
                        borrar={borrar}
                        setBorrar={setBorrar}
                    />
                </Grid>
                <Grid container xs={12} direction='column' alignItems='center' justify='center' >
                    <Grid item container xs={9} spacing={4}>
                        <Grid item container justify={'flex-end'} spacing={2} >
                            <Grid item >
                                <CustomButton
                                    label={'Cancelar'}
                                    variant={'outlined'}
                                    isAction={true}
                                    color={'secondary'}
                                    onClik={onCancelar}
                                />
                            </Grid>
                            <Grid item >
                                <CustomButton
                                    label={'Grabar'}
                                    variant={'contained'}
                                    isAction={true}
                                    color={'primary'}
                                    disabled={data === null ? true
                                        : data !== null
                                            && (data.idTipoPersonaProveedor === 1 ?
                                                data.dni && data.cuit
                                                : data.cuit
                                            )
                                            && data.razonSocial
                                            && data.codigoPostal && data.idLocalidad
                                            && data.domicilioCalle && data.domicilioNumero
                                            && data.idTipoContacto
                                            && data.nombreContacto && data.telefono
                                            && data.email && data.idTipoVisibilidad
                                            && (data.tipoProveedor && data.tipoProveedor.length > 0) ? false
                                            : true}
                                    onClik={Grabar}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {openConfirmacion ?
                    <Confirmacion
                        data={data}
                        openConfirmacion={openConfirmacion}
                        setOpenConfirmacion={setOpenConfirmacion}
                        snackBar={snackBar}
                        clikCompletarEdicion={clikCompletarEdicion}
                        setProveedor={setProveedor}
                    />
                    : null}
                {openSnackBar.open ?
                    <CustomSnackBar
                        handleClose={handleClose}
                        open={openSnackBar.open}
                        title={openSnackBar.title}
                        severity={openSnackBar.severity} />
                    : null}
                {
                    <CustomAlert
                        message={'Le pedimos disculpas, no se pudo realizar la redirección hacia Editar'}
                        onClose={handleCloseAlert}
                        variant={'filled'}
                        severity='error'
                        open={alertRedireccion}
                        snack={true}
                    />
                }
            </Grid>
        </Container>

    )
}
export default AltaProveedores