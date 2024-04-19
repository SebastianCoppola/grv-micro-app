import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchTodasSG, clearTodasSG, searchTipoDNI } from '../../../redux/actions/index'
import { Box, FormControl, FormControlLabel, FormHelperText, Grid, InputBase, makeStyles, Paper, Radio, RadioGroup } from '@material-ui/core';
import CustomText from '../../commons/TextField/CustomText';
import CustomSelect from '../../commons/Select/customSelect';
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker';
import CustomButton from '../../commons/Button/CustomButton';
import AutoSuggest from '../../commons/Autosuggest/Autosuggest';
import { searchAreaGestion, searchEstadoSolicitudGenerica, searchTipoSolicitudGenerica } from '../../../redux/actions/listados';
import { guardarBusquedaSGRetorno } from "../../../redux/actions/index";
import { searchPersonasByArea } from '../../../redux/actions/solicitudesGenericas';
import Utils from '../../../Utils/utils';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 3
    },
    autocompleteSelf: {
        background: "white",
        width: "250px",
        maxHeight: "55px",
        border: "2px #d3d3d3 solid",
        borderRadius: "20px",
        padding: '2px 10px 0 10px',
        boxSizing: 'border-box',
        fontSize: '5px',
        '&& .MuiInput-underline:before': {
            borderBottom: "none",
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
        },
    },
    root: {
        width: 230,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: props => props.height || '32px',
        borderRadius: '20px',
        border: '1px solid  #d3d3d3',
        boxShadow: 'none',
        '&.MuiInputBase-root': {
            fontSize: '13px'
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        borderRadius: '50px',
        '&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            appearance: 'none',
            margin: 0,
        },
        '&.MuiInputBase-root': {
            fontSize: '13px'
        }
    },
}));

const dataBuscadorInicial = {
    idSolicitud: null,
    denuncia: null,
    idAreaSolicitante: null,
    idSolicitante: null,
    idTipoSolicitudGenerica: null,
    idAreaGestion: null,
    idGestorSolicitudGenerica: null,
    idEstadoSolicitudGenerica: null,
    reabierto: null,
    porVencer: null,
    vencido: null,
    nroDoc: null,
    tipoDoc: 1,
    filtroPersonaLoguea: false,
    areaOperador: null,
    nombrePaciente: null,
    apellidoPaciente: null,
    fechaExacta: null
}

const CabeceraFiltrosSG = (props) => {
    const { usuarioActivo, rowsPerPage, page, setPage, setRowsPerPage, isAsc, setIsAsc } = props
    const classes = useStyles()
    //Redux:
    const dispatch = useDispatch()
    const optionsTipos = useSelector(state => state.listados.tiposSolicitudesGenericas)
    const optionsAreas = useSelector(state => state.listados.areaGestionSolicitudes)
    const optionsEstado = useSelector(state => state.listados.estadoSolicitudesGenericas)
    const optionsSolicitanteGestor = useSelector(state => state.solicitudesGenericas.personasByArea)
    const optionsTipoDoc = useSelector(state => state.listados.tipoDNI)
    const consultaPreDefinida = useSelector(state => state.solicitudesGenericas.busquedaConRetorno)
    //Request buscar:
    const [dataBuscador, setDataBuscador] = useState(consultaPreDefinida != null ? consultaPreDefinida :
        { ...dataBuscadorInicial, idOperador: parseInt(usuarioActivo && usuarioActivo.id) })
    //AutoSuggest:   
    const [idAreaSolicitante, setIdAreaSolicitante] = useState(dataBuscador && dataBuscador.idAreaSolicitante)
    const [idAreaGestion, setIdAreaGestion] = useState(dataBuscador && dataBuscador.idAreaGestion)
    const [seleccionado, setSeleccionado] = useState(false)
    const [opcionesAutosuggest, setOpcionesAutosuggest] = useState([])
    const loadingAutoSuggest = useSelector(state => state.solicitudesGenericas.loadingAutoSuggest)
    const [solicitante, setSolicitante] = useState(null)
    const [gestor, setGestor] = useState(null)
    //Radio Group
    const [reabierto, setReabierto] = useState(3)
    const [porVencer, setPorVencer] = useState(3)
    const [vencido, setVencido] = useState(3)
    const [noFiltro, setNoFiltro] = useState(consultaPreDefinida ? false : true)

    useEffect(() => {
        dispatch(searchTipoDNI())
        dispatch(searchAreaGestion())
        dispatch(searchTipoSolicitudGenerica())
        dispatch(searchEstadoSolicitudGenerica())
        if (consultaPreDefinida !== null) dispatch(searchTodasSG(consultaPreDefinida))
    }, [])

    useEffect(() => setDataBuscador({ ...dataBuscador, offset: page * rowsPerPage, limit: rowsPerPage }), [page, rowsPerPage])

    useEffect(() => {
        if (noFiltro) {
            dispatch(searchTodasSG({
                ...dataBuscadorInicial,
                idOperador: parseInt(usuarioActivo && usuarioActivo.id),
                ordenarDesc: !isAsc,
                limit: rowsPerPage,
                offset: rowsPerPage * page
            }))
        } else {
            dispatch(searchTodasSG({
                ...dataBuscador,
                limit: rowsPerPage,
                ordenarDesc: !isAsc,
                offset: rowsPerPage * page
            }))
        }
        dispatch(guardarBusquedaSGRetorno({
            ...dataBuscador,
            limit: rowsPerPage,
            ordenarDesc: !isAsc,
            offset: rowsPerPage * page
        }))
    }, [rowsPerPage, page, isAsc])

    useEffect(() => {
        setIdAreaSolicitante(dataBuscador && dataBuscador.idAreaSolicitante)
        setIdAreaGestion(dataBuscador && dataBuscador.idAreaGestion)
    }, [dataBuscador])

    useEffect(() => optionsSolicitanteGestor && optionsSolicitanteGestor.filter(it => {
        if (it.nombreApellido === solicitante) {
            setDataBuscador({ ...dataBuscador, idSolicitante: it.idPersona })
        }
    }), [solicitante])

    useEffect(() => optionsSolicitanteGestor && optionsSolicitanteGestor.filter(it => {
        if (it.nombreApellido === gestor) {
            setDataBuscador({ ...dataBuscador, idGestorSolicitudGenerica: it.idPersona })
        }
    }), [gestor])

    useEffect(() => {
        switch (reabierto) {
            case 1:
                setDataBuscador({ ...dataBuscador, reabierto: true })
                break;
            case 2:
                setDataBuscador({ ...dataBuscador, reabierto: false })
                break;
            case 3:
                setDataBuscador({ ...dataBuscador, reabierto: null })
                break;
        }
    }, [reabierto])

    useEffect(() => {
        switch (porVencer) {
            case 1:
                setDataBuscador({ ...dataBuscador, porVencer: true })
                break;
            case 2:
                setDataBuscador({ ...dataBuscador, porVencer: false })
                break;
            case 3:
                setDataBuscador({ ...dataBuscador, porVencer: null })
                break;
        }
    }, [porVencer])

    useEffect(() => {
        switch (vencido) {
            case 1:
                setDataBuscador({ ...dataBuscador, vencido: true })
                break;
            case 2:
                setDataBuscador({ ...dataBuscador, vencido: false })
                break;
            case 3:
                setDataBuscador({ ...dataBuscador, vencido: null })
                break;
        }
    }, [vencido])


    const onChangeDataBuscador = (e, type) => {
        switch (type) {
            case "numeroSolicitud":
                setDataBuscador({ ...dataBuscador, idSolicitud: e.target.value })
                break
            case "numeroDenuncia":
                setDataBuscador({ ...dataBuscador, denuncia: e.target.value })
                break
            case "nombrePaciente":
                setDataBuscador({ ...dataBuscador, nombrePaciente: e.target.value.length > 0 ? e.target.value : null })
                break
            case "apellidoPaciente":
                setDataBuscador({ ...dataBuscador, apellidoPaciente: e.target.value.length > 0 ? e.target.value : null })
                break
            case "tipoDocumento":
                setDataBuscador({ ...dataBuscador, tipoDoc: e.target.value })
                break
            case "numeroDocumento":
                setDataBuscador({ ...dataBuscador, nroDoc: e.target.value.length > 0 ? e.target.value : null })
                break
            case "areaSolicitante":
                setDataBuscador({ ...dataBuscador, idAreaSolicitante: e.target.value })
                break
            case "solicitante":
                setSolicitante(e)
                break
            case "tipoSolicitud":
                setDataBuscador({ ...dataBuscador, idTipoSolicitudGenerica: e.target.value })
                break
            case "areaGestion":
                setDataBuscador({ ...dataBuscador, idAreaGestion: e.target.value })
                break
            case "gestor":
                setGestor(e)
                break
            case "estado":
                setDataBuscador({ ...dataBuscador, idEstadoSolicitudGenerica: e.target.value })
                break
            case "fechaSolicitud":
                setDataBuscador({ ...dataBuscador, fechaExacta: Utils.dateHourFormat(e) })
                break
            case "reabierto":
                setReabierto(parseInt(e.target.value))
                break
            case "porVencer":
                setPorVencer(parseInt(e.target.value))
                break
            case "vencido":
                setVencido(parseInt(e.target.value))
                break
        }
    }

    const onClickLimpiar = () => {
        setPage(0)
        setRowsPerPage(5)
        setIsAsc(false)
        setSolicitante(null)
        setGestor(null)
        setReabierto(3)
        setPorVencer(3)
        setVencido(3)
        setDataBuscador({ ...dataBuscadorInicial, idOperador: parseInt(usuarioActivo && usuarioActivo.id), offset: page * rowsPerPage, limit: rowsPerPage })
        dispatch(searchTodasSG({
            ...dataBuscadorInicial,
            idOperador: parseInt(usuarioActivo && usuarioActivo.id),
            ordenarDesc: true,
            limit: rowsPerPage,
            offset: rowsPerPage * page
        }))
        dispatch(guardarBusquedaSGRetorno({
            ...dataBuscadorInicial,
            idOperador: parseInt(usuarioActivo && usuarioActivo.id),
            ordenarDesc: true,
            limit: rowsPerPage,
            offset: rowsPerPage * page
        }))
        setNoFiltro(true)
    }
    const onClickFiltrar = () => {
        setNoFiltro(false)
        setPage(0)
        setRowsPerPage(5)
        dispatch(searchTodasSG(
            {
                ...dataBuscador,
                ordenarDesc: true,
                offset: page * rowsPerPage,
                limit: rowsPerPage
            }))
        dispatch(guardarBusquedaSGRetorno({
            ...dataBuscador, offset: page * rowsPerPage, limit: rowsPerPage, ordenarDesc: true
        }))
    }

    //Autosuggest:
    const onInput = (value) => {
        let req = {
            idArea: null,
            criterioBusqueda: value
        }
        dispatch(searchPersonasByArea(req))
    }

    const mapOptionsAutosuggest =
        optionsSolicitanteGestor && optionsSolicitanteGestor.map(it => { return it })


    return (
        <Grid container>
            {/* PRIMERA FILA */}
            <Grid item container xs={12} justify='space-between' alignItems='flex-end' spacing={1} style={{ marginBottom: 7}}>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText >Nro. solicitud</FormHelperText>
                        <CustomText
                            inputStyle={{ fontSize: 15 }}
                            borderRadius="20px"
                            width="190px"
                            variant="outlined"
                            value={dataBuscador && dataBuscador.idSolicitud ? dataBuscador.idSolicitud : ""}
                            onChange={(e) => onChangeDataBuscador(e, 'numeroSolicitud')}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText >Nro. denuncia</FormHelperText>
                        <CustomText
                            inputStyle={{ fontSize: 15 }}
                            borderRadius="20px"
                            width="180px"
                            variant="outlined"
                            placeholder="300000006"
                            value={dataBuscador && dataBuscador.denuncia ? dataBuscador.denuncia : ""}
                            onChange={(e) => onChangeDataBuscador(e, 'numeroDenuncia')}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText>Nombre del paciente</FormHelperText>
                        <CustomText
                            inputStyle={{ fontSize: 14 }}
                            borderRadius="20px"
                            width="250px"
                            variant="outlined"
                            placeholder="Nombre"
                            value={dataBuscador && dataBuscador.nombrePaciente ? dataBuscador.nombrePaciente : ""}
                            onChange={(e) => onChangeDataBuscador(e, 'nombrePaciente')}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText>Apellido del paciente</FormHelperText>
                        <CustomText
                            inputStyle={{ fontSize: 14 }}
                            borderRadius="20px"
                            width="250px"
                            variant="outlined"
                            placeholder="Apellido"
                            value={dataBuscador && dataBuscador.apellidoPaciente ? dataBuscador.apellidoPaciente : ""}
                            onChange={(e) => onChangeDataBuscador(e, 'apellidoPaciente')}
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <Paper component="form" className={classes.root}>
                            <CustomSelect
                                estilo={true}
                                data={optionsTipoDoc ? optionsTipoDoc : ''}
                                handleChangeSelect={(e) => { onChangeDataBuscador(e, 'tipoDocumento') }}
                                val={dataBuscador.tipoDoc}
                                variantTitulo={''}
                            />
                            <InputBase
                                className={classes.input}
                                value={dataBuscador.nroDoc ? dataBuscador.nroDoc : ''}
                                onChange={(e) => onChangeDataBuscador(e, 'numeroDocumento')}
                                type={'number'}
                                pattern="^[0-9,$]*$"
                                placeholder={'Tipo/numero documento'}
                            />
                        </Paper>
                    </FormControl>
                </Grid>
            </Grid>
            {/* SEGUNDA FILA */}
            <Grid item container xs={12} justify='space-between' alignItems='flex-end' spacing={1} style={{ marginBottom: 7}}>
                <Grid item >
                    <Box width={190}>
                        <CustomSelect
                            estilo={true}
                            titulo="Área solicitante"
                            fontSize="12px"
                            textStyles={{ color: '#747474', marginBottom: 3 }}
                            fullwidth
                            isOutline
                            val={dataBuscador.idAreaSolicitante}
                            data={optionsAreas}
                            handleChangeSelect={(e) => { onChangeDataBuscador(e, 'areaSolicitante') }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <FormHelperText>Solicitante</FormHelperText>
                    <AutoSuggest
                        minType={3}
                        onInput={onInput}
                        list={mapOptionsAutosuggest}
                        setSeleccionado={setSeleccionado}
                        valueAutoSuggest={solicitante}
                        setValueAutoSuggest={(e) => onChangeDataBuscador(e, 'solicitante')}
                        opciones={opcionesAutosuggest}
                        setOpciones={setOpcionesAutosuggest}
                        nombreVariable={'nombreApellido'}
                        underline={true}
                        style={{
                            width: '155px',
                            border: '2px solid #cacaca',
                            borderRadius: '20px',
                            padding: '2px 15px 0 10px',
                            marginBottom: '4px',
                        }}
                        loading={loadingAutoSuggest}
                        // error={errorAutosuggestModulos}
                        textoError={"No se encontraron opciones."}
                    />
                </Grid>
                <Grid item>
                    <Box width={255}>
                        <CustomSelect
                            titulo="Tipo"
                            fontSize="12px"
                            textStyles={{ color: '#747474', marginBottom: 3 }}
                            fullwidth
                            isOutline
                            val={dataBuscador.idTipoSolicitudGenerica}
                            data={optionsTipos}
                            handleChangeSelect={(e) => { onChangeDataBuscador(e, 'tipoSolicitud') }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box width={255}>
                        <CustomSelect
                            titulo="Área gestión"
                            fontSize="12px"
                            textStyles={{ color: '#747474', marginBottom: 3 }}
                            fullwidth
                            isOutline
                            val={dataBuscador.idAreaGestion}
                            data={optionsAreas}
                            handleChangeSelect={(e) => { onChangeDataBuscador(e, 'areaGestion') }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <FormHelperText>Gestor</FormHelperText>
                    <AutoSuggest
                        minType={3}
                        onInput={onInput}
                        list={mapOptionsAutosuggest}
                        setSeleccionado={setSeleccionado}
                        valueAutoSuggest={gestor}
                        setValueAutoSuggest={(e) => onChangeDataBuscador(e, 'gestor')}
                        opciones={opcionesAutosuggest}
                        setOpciones={setOpcionesAutosuggest}
                        nombreVariable={'nombreApellido'}
                        underline={true}
                        style={{
                            width: '210px',
                            border: '2px solid #cacaca',
                            borderRadius: '20px',
                            padding: '2px 10px 0 10px',
                            marginBottom: '4px',
                        }}
                        loading={loadingAutoSuggest}
                        // error={errorAutosuggestModulos}
                        textoError={"No se encontraron opciones."}
                    />
                </Grid>
            </Grid>
            {/* TERCERA FILA */}
            <Grid item container xs={12} justify='space-between' alignItems='flex-end' spacing={1} style={{ marginBottom: 10 }}>
                <Grid item>
                    <Box width={190}>
                        <CustomSelect
                            titulo="Estado"
                            fontSize="12px"
                            textStyles={{ color: '#747474', marginBottom: 3 }}
                            fullwidth
                            isOutline
                            val={dataBuscador.idEstadoSolicitudGenerica}
                            data={optionsEstado}
                            handleChangeSelect={(e) => { onChangeDataBuscador(e, 'estado') }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <CustomDatePicker
                        setSelectedDate={(e) => onChangeDataBuscador(e, 'fechaSolicitud')}
                        selectedDate={dataBuscador.fechaExacta}
                        title="Fecha de solicitud"
                        isOutline
                        fontSize="12px"
                        maxWidth={180}
                        fullwidth
                    />
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText >Reabierto</FormHelperText>
                        <RadioGroup row name="reabierto" value={reabierto} onChange={(e) => onChangeDataBuscador(e, 'reabierto')}>
                            <FormControlLabel value={1} control={<Radio color="primary" />} label="Sí" />
                            <FormControlLabel value={2} control={<Radio color="primary" />} label="No" />
                            <FormControlLabel value={3} control={<Radio color="primary" />} label="Todos" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText >Por vencer</FormHelperText>
                        <RadioGroup row name="por-vencer" value={porVencer} onChange={(e) => onChangeDataBuscador(e, 'porVencer')}>
                            <FormControlLabel value={1} control={<Radio color="primary" />} label="Sí" />
                            <FormControlLabel value={2} control={<Radio color="primary" />} label="No" />
                            <FormControlLabel value={3} control={<Radio color="primary" />} label="Todos" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <FormHelperText>Vencido</FormHelperText>
                        <RadioGroup row name="vencido" value={vencido} onChange={(e) => onChangeDataBuscador(e, 'vencido')}>
                            <FormControlLabel value={1} control={<Radio color="primary" />} label="Sí" />
                            <FormControlLabel value={2} control={<Radio color="primary" />} label="No" />
                            <FormControlLabel value={3} control={<Radio color="primary" />} label="Todos" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
            {/* CUARTA FILA */}
            <Grid item container xs={12} justify="flex-end" alignItems='flex-end' spacing={1} style={{ marginBottom: 10 }}>
                <Grid item>
                    <CustomButton
                        variant="contained"
                        label="Limpiar"
                        styleLabel={{ color: '#747474' }}
                        isAction
                        onClik={onClickLimpiar}
                    />
                </Grid>
                <Grid item>
                    <CustomButton
                        color="primary"
                        variant="contained"
                        label="Filtrar"
                        isAction
                        onClik={onClickFiltrar}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CabeceraFiltrosSG