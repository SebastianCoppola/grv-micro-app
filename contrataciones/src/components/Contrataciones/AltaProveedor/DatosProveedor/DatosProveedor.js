import React, { useEffect, useState } from 'react'
//material-ui
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
//estilo
import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';
import CustomChip from '../../../commons/Chip/CustomChip';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import Utils from '../../../../Utils/utils';
import PersonaJuridica from './Persona/PersonaJuridica';
import PersonaFisica from './Persona/PersonaFisica';
import CustomCheck from '../../../commons/CustomCheck/CustomChek';
import TipoProveedor from './TipoProveedor/TipoProveedor';
import InformacionDelProveedor from './InformacionProveedor/CustomInformacionProveedor';
import CustomInformacionProveedor from './InformacionProveedor/CustomInformacionProveedor';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../../redux/actions/index'
import CustomAlert from '../../../commons/CustomAlert/customAlert';
import WarningIcon from "@material-ui/icons/Warning";
import { CUIT_FORMATO_INVALIDO } from '../../../../Utils/const';

const useStyles = makeStyles({
    contenedor: {
        backgroundColor: 'white',
        border: 'solid 1px #dadce0',
        borderRadius: '8px',
    },
    form: {
        marginTop: '10vh',

    },
    seleccionar: {
        paddingLeft: '0px'
    },
    hora: {
        marginTop: '9px'
    },
    texto2: {
        // paddingRight:'10px',
        paddingLeft: '5px'
    }
})

const DatosProveedor = (props) => {
    const classes = useStyles(props);
    const { data, setData, item,
        text, setText, text2, setText2,
        textJuridica, setTextJuridica, tipoPersona,
        borrar, setBorrar, setVerificacionSeleccionado, verificacionSeleccionado } = props
    const dispatch = useDispatch()
    const [valChip, setValChip] = useState(tipoPersona ? tipoPersona : null)
    const [checkedPrioridad, setCheckedPrioridad] = useState(false)
    const [cuit, setCuit] = React.useState(null)
    const [errorCuit, setErrorCuit] = React.useState(false)
    const [mensajeErrorCuit, setMensajeErrorCuit] = React.useState(null)
    const loadingValidarCuit = useSelector(state => state.proveedor.loadingValidarCuit)
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState()
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });
    const [proveedorSeleccionadoAlta, setProveedorSeleccionadoAlta] = useState([])
    const [datosPreviosSeleccionAlta, setDatosPreviosSelecionAlta] = useState([])

    useEffect(() => {
        setValChip(tipoPersona)
    }, [tipoPersona])

    useEffect(() => {
        setData({ ...data, tipoProveedor: proveedorSeleccionadoAlta })
    }, [proveedorSeleccionadoAlta])


    useEffect(() => {
        if (!data || data === null) {
            setValChip(tipoPersona ? tipoPersona : null)
            setCheckedPrioridad(false)
            setCuit(null)
            setErrorCuit(false)
            setMensajeErrorCuit(null)
        }
    }, [data])

    useEffect(() => {
        if (borrar) {
            setCheckedPrioridad(false)
            setErrorCuit(false)
            setMensajeErrorCuit(null)
        }
    }, [borrar])

    const onClickChip = (event, codigo) => {
        setData({
            ...data,
            idTipoPersonaProveedor: codigo,
            razonSocial: null,
            nombreCorto: null
        })

        setValChip(valChip.map((i, index2) => {
            if (i && (codigo === i.codigo)) {
                return (
                    { ...i, verificado: true }
                )
            } else {
                return { ...i, verificado: false }
            }
        })
        )
        setText(item => item.map(i => ({
            ...i,
            razonSocial: '',
            nombreCorto: ''
        })))
        setTextJuridica(item => item.map(i =>
            ({ ...i, razonSocial: '', nombreCorto: '' })))
    }
    const changeCuit = (event) => {
        setCuit(event.target.value)
        setData({
            ...data,
            cuit: event.target.value !== '' ? event.target.value : null

        })
        setErrorCuit(false)
        setMensajeErrorCuit(null)
        setOpenSnackBar({ open: false });
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
                setOpenSnackBar({ open: false });
            } else if (mensj && mensj.estado !== 0) {
                setErrorCuit(true)
                setMensajeErrorCuit(mensj.mensaje)
                setData({
                    ...data,
                    cuit: null

                })
                setOpenSnackBar({
                    open: true,
                    severity: 'error',
                    title: <div>
                        {mensj && mensj.estado === 1 ? `${mensj && mensj.mensaje}. Por favor, ingresar otro que no haya sido registrado.` :
                            `${mensj && mensj.mensaje}. `}
                    </div>
                })
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    {'Ocurrió un error. Por favor intente nuevamente'}
                </div>
            })
        }
    }
    const handleCheckedPrioridad = (event) => {
        setCheckedPrioridad(event.target.checked)
        setData({
            ...data,
            esPrioritario: checkedPrioridad ? 0 : 1
        })
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    return (
        <Container maxWidth='lg' className={classes.form}>
            <Grid container xs={12} direction='column' alignItems='center' justify='center' >
                <Grid item container xs={item} className={classes.contenedor} spacing={6}>
                    <Grid item container spacing={2} >
                        <Grid item xs={11}>
                            <CustomTypography text={<strong> Datos del proveedor </strong>} variant={''} />
                        </Grid>
                        <Grid item xs={11}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            {openSnackBar.open ?
                                <CustomAlert
                                    message={openSnackBar.title}
                                    onClose={handleCloseSnackBar}
                                    color={true}
                                    severity={openSnackBar.severity}
                                    open={openSnackBar.open}
                                    icon={<WarningIcon htmlColor={"#e34850"} />} />
                                : null}
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTypography text={'Persona'} variant={'subtitle1'} />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInformacionProveedor
                                valChip={valChip}
                                onClickChip={onClickChip}
                                item={2} />
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                        {valChip && valChip.map((it) => {
                            return (
                                it && it.codigo === 1 && it.verificado ?
                                    <Grid item xs={11}>
                                        <PersonaFisica
                                            text={text} setText={setText}
                                            text2={text2} setText2={setText2}
                                            itemLoc={6} itemCod={6}
                                            data={data}
                                            setData={setData}
                                            cuit={cuit} setCuit={setCuit}
                                            errorCuit={errorCuit} setErrorCuit={setErrorCuit}
                                            mensajeErrorCuit={mensajeErrorCuit}
                                            setMensajeErrorCuit={setMensajeErrorCuit}
                                            loadingValidarCuit={loadingValidarCuit}
                                            changeCuit={changeCuit}
                                            borrar={borrar}
                                            setBorrar={setBorrar}
                                        />
                                    </Grid>
                                    :
                                    it && it.codigo === 2 && it.verificado ?
                                        <Grid item xs={11}>
                                            <PersonaJuridica
                                                item={1}
                                                data={data}
                                                setData={setData}
                                                textJuridica={textJuridica} setTextJuridica={setTextJuridica}
                                                text2Juridica={text2} setText2Juridica={setText2}
                                                cuit={cuit} setCuit={setCuit}
                                                errorCuit={errorCuit} setErrorCuit={setErrorCuit}
                                                mensajeErrorCuit={mensajeErrorCuit}
                                                setMensajeErrorCuit={setMensajeErrorCuit}
                                                loadingValidarCuit={loadingValidarCuit}
                                                changeCuit={changeCuit}
                                                borrar={borrar}
                                                setBorrar={setBorrar}
                                            />
                                        </Grid>

                                        : null
                            )
                        })}

                    </Grid>
                    <Grid item xs={12}>
                        <CustomCheck
                            checked={checkedPrioridad}
                            handleChange={handleCheckedPrioridad}
                            texto={'Es prioritario'} />
                    </Grid>
                    <Grid item xs={12}>
                        <TipoProveedor
                            data={data} setData={setData}
                            borrar={borrar}
                            setBorrar={setBorrar}
                            proveedorSeleccionado={proveedorSeleccionado}
                            setProveedorSeleccionado={setProveedorSeleccionado}
                            setProveedorSeleccionadoAlta={setProveedorSeleccionadoAlta}
                            proveedorSeleccionadoAlta={proveedorSeleccionadoAlta}
                            datosPreviosSeleccionAlta={datosPreviosSeleccionAlta}
                            setDatosPreviosSelecionAlta={setDatosPreviosSelecionAlta}
                        />
                    </Grid>
                </Grid>
            </Grid>

        </Container>
    )
}
export default DatosProveedor