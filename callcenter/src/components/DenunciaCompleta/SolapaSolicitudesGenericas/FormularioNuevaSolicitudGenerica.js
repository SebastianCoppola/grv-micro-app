import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types'
import CustomUploadFile from '../../commons/Adjunto/CustomUploadFile';
import CustomButton from '../../commons/Button/CustomButton';
import CustomSelect from '../../commons/Select/customSelect';
import CustomText from '../../commons/TextField/CustomText';
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker';
import AutoSuggest from '../../commons/Autosuggest/Autosuggest';
import { SET_TIPO_CONTACTOS_SELECT } from '../../../redux/actionTypes';
import { useEffect } from 'react';
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar';
import { clearAreasDeGestion, getAreasDeGestion, searchPersonasByArea, searchTipoSolicitud, setSnackBar } from '../../../redux/actions/solicitudesGenericas';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../Utils/utils';
import { getListadoProvinciaSelect, searchAreaGestion, searchEstadoSolicitudGenerica, searchTipoSolicitudGenerica, setListadoEstadoPrestador, setListadoMotivoPrestador, setListadoPrestador, setListadoProvinciaPrestador } from '../../../redux/actions/listados';
import { searchLocalidades } from '../../../redux/actions';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 860,
        border: '1px solid #dadce0',
        borderRadius: 5
    },
    titulo: {
        fontSize: 18,
        margin: '16px 0'
    },
    data: {
        backgroundColor: '#f5f5f5'
    },
    dataLabel: {
        width: 'fit-content',
        marginRight: 12,
        fontSize: 14,
        color: '#747474'
    },
    value: {
        fontSize: 14
    },
    formControl: {
        width: '100%',
        '& p,label': {
            color: '#747474'
        }
    },
    accordion: {
        '& .MuiAccordionSummary-root.Mui-expanded': {
            borderBottom: '1px solid blue',
            paddingLeft: 0
        },
        '& .MuiAccordionDetails-root': {
            padding: '16px 0'
        }
    }
}));

export const Asterisco = ({ notVisible }) => (
    <span style={{
        fontSize: 20,
        color: 'red',
        marginLeft: 5,
        visibility: notVisible ? 'hidden' : 'visible'
    }}>*</span>
);

const FormularioNuevaSolicitudGenerica = (props) => {
    const { enviarSolicitudHandler, cancelarHandler, setAreaGestionDescripcion, setReqNuevaSolicitud, areaGestion, setAreaGestion, denuncia, setArchivo } = props;
    const classes = useStyles();
    const [tipoSolicitud, setTipoSolicitud] = useState(null);
    const [gestor, setGestor] = useState(null);
    const [observacion, setObservacion] = useState(null);
    const [fechaVencimiento, setFechaVencimiento] = useState(null);
    const [fechaAdvertencia, setFechaAdvertencia] = useState(null);
    const [provincia, setProvincia] = useState(null);
    const [ciudadTest, setCiudadTest] = useState('')
    const [ciudad, setCiudad] = useState(null);
    const [motivo, setMotivo] = useState(null);
    const [subclasificacion, setSubclasificacion] = useState(null);
    const [estado, setEstado] = useState(null);
    const [tipoResolucion, setTipoResolucion] = useState(null);
    const dispatch = useDispatch()
    const snackbar = useSelector(state => state.solicitudesGenericas.snackbar);
    //Listados
    const dataProvinciaSelect = useSelector(state => state.listados.provinciasValoresPredeterminados)
    const dataTipoSolicitudes = useSelector(state => state.solicitudesGenericas.tipoSolicitud)
    const dataAreaGestion = useSelector(state => state.solicitudesGenericas.areasDeGestion)
    const dataEstadoPrestador = useSelector(state => state.listados.estadoValoresPredeterminado)
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const dataMotivoPrestador = useSelector(state => state.listados.motivosValoresPredeterminados)
    const solicitanteGestor = useSelector(state => state.solicitudesGenericas.solicitanteGestorArea)
    const personasByArea = useSelector(state => state.solicitudesGenericas.personasByArea)

    const enableEnviarSolicitud = tipoSolicitud && tipoSolicitud === 4 ? Boolean(tipoSolicitud && areaGestion && observacion
        && fechaVencimiento && fechaAdvertencia && provincia && ciudad && motivo && estado) : Boolean(tipoSolicitud && areaGestion && observacion && fechaVencimiento && fechaAdvertencia)

    const onInput = (value) => {
        console.log(value)
    }

    //Dispatch Listados
    useEffect(() => {
        dispatch(setListadoProvinciaPrestador({ "valorPredeterminado": "PROVINCIAS" }))
        let cb = (bool) => {
            if (bool) {
                dispatch(setSnackBar({
                    open: true,
                    message: 'Hubo un error, intente nuevamente',
                    severity: "error"
                }))
            }
        }
        dispatch(searchTipoSolicitud({ idOperador: usuarioActivo && usuarioActivo.id }, cb))
        dispatch(setListadoEstadoPrestador({ "valorPredeterminado": "ESTADOS" }))
        dispatch(setListadoMotivoPrestador({ "valorPredeterminado": "MOTIVOS" }))
        dispatch(clearAreasDeGestion())
    }, [])

    const handleChangeCiudad = (e) => {
        setCiudadTest(e.target.value)
    }

    useEffect(() => {
        if (tipoSolicitud) {
            let cb = (bool) => {
                if (bool) {
                    dispatch(setSnackBar({
                        open: true,
                        message: 'Hubo un error, intente nuevamente',
                        severity: "error"
                    }))
                }
            }
            dispatch(getAreasDeGestion({
                idOperador: usuarioActivo && usuarioActivo.id,
                idTipoSolicitud: tipoSolicitud
            }, cb))
        }
    }, [tipoSolicitud])

    useEffect(() => {
        if (ciudadTest.length >= 3) {
            setCiudad(ciudadTest)
        } else {
            setCiudad(null)
        }
    }, [ciudadTest])

    useEffect(() => {
        setAreaGestionDescripcion(dataAreaGestion && dataAreaGestion.length > 0 && dataAreaGestion.filter(it => it.codigo === areaGestion ? (it) : null))
        dispatch(searchPersonasByArea({ "idArea": areaGestion }))
    }, [areaGestion])

    useEffect(() => {
        if (enableEnviarSolicitud) {
            setReqNuevaSolicitud({
                idDenuncia: denuncia && denuncia.idDenuncia,
                idSolicitante: parseInt(usuarioActivo && usuarioActivo.id),
                areaOrigen: usuarioActivo && usuarioActivo.area,
                idGestor: gestor,
                idTipoSolicitud: tipoSolicitud,
                idAreaGestion: areaGestion,
                observaciones: observacion,
                fechaAdvertenciaCustom: Utils.dateHourFormat(fechaAdvertencia, 'yyyy-MM-dd[T]HH:mm:ss'),
                fechaVencimientoCustom: Utils.dateHourFormat(fechaVencimiento, 'yyyy-MM-dd[T]HH:mm:ss'),
                solicitudGenericaAtributoRequestDT0: [
                    {
                        idAtributo: 1,
                        idValorSelect: provincia,
                        valor: null
                    },
                    {
                        idAtributo: 2,
                        idValorSelect: null,
                        valor: ciudad
                    },
                    {
                        idAtributo: 3,
                        idValorSelect: motivo,
                        valor: null,
                    },
                    {
                        idAtributo: 4,
                        idValorSelect: null,
                        valor: subclasificacion
                    },
                    {
                        idAtributo: 5,
                        idValorSelect: estado,
                        valor: null
                    },
                    {
                        idAtributo: 6,
                        idValorSelect: null,
                        valor: tipoResolucion
                    }
                ]
            })
        }
    }, [enableEnviarSolicitud])

    return (
        <>
            <Box p={3} className={classes.root}>
                <Typography className={classes.titulo}>Datos de la solicitud</Typography>
                <Box display="flex" justifyContent="space-between" p={2} mb={3} className={classes.data}>
                    <Box display="flex">
                        <Typography className={classes.dataLabel}>Fecha de solicitud</Typography>
                        <Typography className={classes.value}>{Utils.convertFechaActualToString()}</Typography>
                    </Box>
                    <Box display="flex" style={{ marginLeft: !tipoSolicitud || tipoSolicitud && tipoSolicitud !== 4 ? "10px" : null }}>
                        <Typography className={classes.dataLabel}>Solicitante</Typography>
                        <Typography className={classes.value}>{usuarioActivo ? usuarioActivo.nombre + " " + usuarioActivo.apellido : "Nazareno Toledo"}</Typography>
                    </Box>
                    <Box display="flex" style={{ marginLeft: !tipoSolicitud || tipoSolicitud && tipoSolicitud !== 4 ? "10px" : null }}>
                        <Typography className={classes.dataLabel}>Área Origen</Typography>
                        <Typography className={classes.value}>{usuarioActivo ? usuarioActivo.area : "-"}</Typography>
                    </Box>
                </Box>
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={10}>
                        <CustomSelect
                            titulo={<Typography className={classes.dataLabel}>Tipo Solicitud{<Asterisco />}</Typography>}
                            data={dataTipoSolicitudes}
                            handleChangeSelect={({ target }) => setTipoSolicitud(target.value)}
                            val={tipoSolicitud}
                            fullwidth />
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={5}>
                            <CustomSelect
                                titulo={<Typography className={classes.dataLabel}>Área Gestión{<Asterisco />}</Typography>}
                                data={dataAreaGestion}
                                handleChangeSelect={({ target }) => {
                                    setAreaGestion(target.value)
                                }}
                                val={areaGestion}
                                disabled={tipoSolicitud !== null ? false : true}
                                fullwidth />
                        </Grid>
                        <Grid item xs={5}>
                            <CustomSelect
                                titulo={<Typography className={classes.dataLabel}>Gestor{<Asterisco notVisible />}</Typography>}
                                disabled={!areaGestion ? true : false}
                                data={personasByArea && personasByArea.length > 0 && personasByArea}
                                solicitudGenerica={true}
                                handleChangeSelect={({ target }) => setGestor(target.value)}
                                val={gestor}
                                fullwidth />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            <Typography className={classes.dataLabel}>Añadir observación{<Asterisco />}</Typography>
                            <CustomText
                                placeholder="Escribir texto"
                                value={observacion}
                                onChange={({ target }) => setObservacion(target.value)}
                                fullwidth
                                multiline
                                maxCaracteres={1999}
                            />
                        </FormControl>
                    </Grid>
                    <Grid container item spacing={3}>
                        <Grid item xs={5}>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.dataLabel}>Fecha de vencimiento{<Asterisco />}</Typography>
                                <CustomDatePicker
                                    setSelectedDate={setFechaVencimiento}
                                    selectedDate={fechaVencimiento}
                                    placeholder="dd/mm/aaaa"
                                    isOutline={false}
                                    fullwidth />
                            </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl className={classes.formControl}>
                                <Typography className={classes.dataLabel}>Fecha de advertencia{<Asterisco />}</Typography>
                                <CustomDatePicker
                                    setSelectedDate={setFechaAdvertencia}
                                    selectedDate={fechaAdvertencia}
                                    placeholder="dd/mm/aaaa"
                                    isOutline={false}
                                    fullwidth />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <CustomUploadFile setArchivo={setArchivo} />
                    </Grid>
                    {tipoSolicitud && tipoSolicitud === 4 ? (
                        <Grid item>
                            <Accordion className={classes.accordion} elevation={0}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b>Datos del prestador</b></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container alignItems="flex-end" spacing={3}>
                                        <Grid item xs={6}>
                                            <CustomSelect
                                                titulo={<Typography className={classes.dataLabel}>Provincia{<Asterisco />}</Typography>}
                                                data={dataProvinciaSelect}
                                                handleChangeSelect={(e) => setProvincia(e.target.value)}
                                                val={provincia}
                                                fullwidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl} margin="dense">
                                                <Typography className={classes.dataLabel}>Ciudad/Localidad{<Asterisco />}</Typography>
                                                <CustomText
                                                    placeholder="Minimo 3 caracteres"
                                                    value={ciudadTest}
                                                    onChange={handleChangeCiudad}
                                                    fullwidth
                                                    maxCaracteres={199}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomSelect
                                                titulo={<Typography className={classes.dataLabel}>Motivo del caso{<Asterisco />}</Typography>}
                                                data={dataMotivoPrestador}
                                                handleChangeSelect={({ target }) => setMotivo(target.value)}
                                                val={motivo}
                                                fullwidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl} margin="dense">
                                                <Typography className={classes.dataLabel}>Subclasificación{<Asterisco notVisible />}</Typography>
                                                <CustomText
                                                    placeholder="Escribir subclasificación"
                                                    value={subclasificacion}
                                                    onChange={({ target }) => setSubclasificacion(target.value)}
                                                    fullwidth
                                                    maxCaracteres={199}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <CustomSelect
                                                titulo={<Typography className={classes.dataLabel}>Estado{<Asterisco />}</Typography>}
                                                data={dataEstadoPrestador}
                                                handleChangeSelect={({ target }) => setEstado(target.value)}
                                                val={estado}
                                                fullwidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl} margin="dense">
                                                <Typography className={classes.dataLabel}>Tipo de Resolución{<Asterisco notVisible />}</Typography>
                                                <CustomText
                                                    placeholder="Escribir tipo"
                                                    value={tipoResolucion}
                                                    onChange={({ target }) => setTipoResolucion(target.value)}
                                                    fullwidth
                                                    maxCaracteres={199}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ) : null}
                </Grid>
                <Box display="flex" justifyContent="flex-end" mt={3}>
                    <CustomButton
                        variant="contained"
                        styleLabel={{ fontSize: 14, color: '#747474', fontWeight: 'bold' }}
                        styleButton={{ marginRight: 16, borderRadius: 20, border: '2px solid #747474', backgroundColor: 'white' }}
                        label="Cancelar"
                        onClik={cancelarHandler} />
                    <CustomButton
                        variant="contained"
                        styleLabel={{
                            fontSize: 14,
                            color: enableEnviarSolicitud ? '#ffffff' : '#bcbcbc',
                            fontWeight: 'bold'
                        }}
                        styleButton={{
                            borderRadius: 20,
                            border: `2px solid ${enableEnviarSolicitud ? '#1473e6' : '#f4f4f4'}`,
                            backgroundColor: enableEnviarSolicitud ? '#1473e6' : '#f4f4f4'
                        }}
                        label="Enviar solicitud"
                        onClik={enviarSolicitudHandler}
                        disabled={!enableEnviarSolicitud} />
                </Box>
            </Box>
            <CustomSnackBar
                handleClose={() => dispatch(setSnackBar({ open: false }))}
                open={snackbar.open}
                title={snackbar.message}
                severity={snackbar.severity}
                vertical="bottom" />
        </>
    );
};

FormularioNuevaSolicitudGenerica.propTypes = {
    enviarSolicitudHandler: PropTypes.func.isRequired
}

export default FormularioNuevaSolicitudGenerica;