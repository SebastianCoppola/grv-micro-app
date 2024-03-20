import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Material:
import { Divider, Grid, IconButton, AppBar, Tabs, Tab, Typography, Menu, CircularProgress } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { Alert } from '@material-ui/lab'
import SubjectIcon from '@material-ui/icons/Subject'
//Components:
import BusquedaModulos from '../../commons/CustomAutosuggest/BusquedaModulos'
import CustomTypography from '../../commons/Typography/CustomTypography'
import CustomButton from '../../commons/Button/CustomButton'
import CustomTableContrataciones from '../../commons/Table/CustomTableContrataciones'

const useStyles = makeStyles((theme) => ({
    noBack: {
        boxShadow: 'none',
        backgroundColor: '#fff',
        margin: '0',
        padding: '0'
    },
    tab: {
        fontSize: '12px',
        textTransform: 'none',
    },
    listaPrestacionesOK: {
        width: '100%',
        maxWidth: '400px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        backgroundColor: '#e9f3fd',
        padding: '10px 15px 10px 15px',
        fontSize: '11px',
        margin: '5px 0'
    },
    listaPrestacionesERR: {
        fontSize: '11px',
        width: '100%',
        maxWidth: '400px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cabecera: {
        padding: '6% 0%',
        borderLeft: '2px solid #1473e6',
        backgroundColor: '#f5f5f5',
        marginBottom: '8px',
        marginRight: '2%'
    },
    textNotSelect: {
        fontSize: '14px',
        marginLeft: '8%',
        marginRight: '18%',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    textSelect: {
        fontSize: '11px',
        marginLeft: '3%',
        marginRight: '5%',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    moreInfoFalse: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    moreInfoTrue: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #1473e6',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    scrollBarGrid: {
        maxHeight: '40vh',
        overFlow: 'hidden',
        overflowY: 'auto',
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <Grid xs={12}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        > {value === index && (children)} </Grid>
    );
}

const DrawerIncluirAModulo = (props) => {
    const { modoIncluir, saveIncluir, noNomenclada, prestacionesSeleccionadas,
        setRequestIncluir, aceptarGrabar, cancelarGrabar, moduloSeleccionado, setModuloSeleccionado } = props;
    const classes = useStyles(props);
    //Redux:
    const dispatch = useDispatch();
    const inclusionesModulo = useSelector(state => state.moduloConvenio.inclusionesModulo)
    const inclusionesRepetidas = useSelector(state => state.moduloConvenio.inclusionesRepetidas)
    const loadingInclusionesModulo = useSelector(state => state.moduloConvenio.loadingInclusionesModulo)
    const loadingInclucionesRepetidas = useSelector(state => state.moduloConvenio.loadingInclucionesRepetidas)
    //Busqueda:
    const [moduloOpciones, setModuloOpciones] = useState(null);
    const [valueModulo, setValueModulo] = useState(null);
    //AppBarTabs:
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => { setTabValue(newValue) };
    //MoreInfoButton
    const [anchorEl, setAnchorEl] = React.useState(null);
    const showMoreInfo = (event) => { setAnchorEl(event.currentTarget) }
    const hideMoreInfo = () => { setAnchorEl(null) };
    //Tabla Old Inclusiones: 
    const [oldInclusiones, setOldInclusiones] = useState([]);

    useEffect(() => setModuloSeleccionado(null), [])

    //Dispatch get inclusiones repetidas: 
    useEffect(() => {
        if (moduloSeleccionado !== null && modoIncluir) {
            if (noNomenclada) {
                dispatch(actions.getInclusionesRepetidasPNN({
                    "idModuloSeleccionado": moduloSeleccionado.idModulo,
                    "idPrestacionesAIncluir": prestacionesSeleccionadas.length > 0 && prestacionesSeleccionadas.map(item => item.idPrestacion)
                }))
            } else {
                dispatch(actions.getInclusionesRepetidasPN({
                    "idModuloSeleccionado": moduloSeleccionado.idModulo,
                    "idPrestacionesAIncluir": prestacionesSeleccionadas.length > 0 && prestacionesSeleccionadas.map(it => it.idPrestacion)
                }))
            }
            setTabValue(0)
        }
    }, [moduloSeleccionado])

    //Set request incluir a modulo:
    useEffect(() => {
        if (moduloSeleccionado && inclusionesRepetidas) {
            setRequestIncluir({
                "idModuloSeleccionado": moduloSeleccionado.idModulo,
                "idPrestacionesAIncluir": inclusionesRepetidas.filter(it => it.incluida !== true).map(it => it.idPrestacion),
            })
        }
    }, [inclusionesRepetidas])
    useEffect(() => {
        if (moduloSeleccionado && prestacionesSeleccionadas) {
            setRequestIncluir({
                "idPrestacionesAIncluir": prestacionesSeleccionadas.length > 0 && prestacionesSeleccionadas.map(it => { return it.idPrestacion }),
            })
        } else {
            setRequestIncluir(null)
        }
    }, [prestacionesSeleccionadas, moduloSeleccionado])

    //Dispatch get inclusiones de modulo:
    useEffect(() => {
        if (moduloSeleccionado !== null && tabValue === 1) {
            dispatch(actions.getInclusionesModulo({ "idModulo": moduloSeleccionado.idModulo }))
        }
    }, [tabValue])

    //Seteo Old Inclusiones:
    useEffect(() => {
        setOldInclusiones(
            inclusionesModulo.map(inclusion => {
                return {
                    "codigoDescripcion": `${inclusion.codigo} ${inclusion.descripcion}`,
                    "tipoPrestacion": inclusion.idPrestacionNoNomenclada ? "No Nomenclada" : "Nomenclada",
                }
            })
        )
    }, [inclusionesModulo])

    //Columnas Tabla Prestaciones:
    const headerTablaPrestacionesModulo = [
        {
            title: "PRÁCTICA", field: "tipoPrestacion",
            cellStyle: { color: '#505050', fontSize: '11px', maxWidth: '100px' },
            headerStyle: { color: '#747474', fontSize: '10px', maxWidth: '10px' }
        },
        {
            title: "CÓDIGO Y DESCRIPCIÓN", field: "codigoDescripcion",
            cellStyle: { color: '#505050', fontSize: '11px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' },
            headerStyle: { color: '#747474', fontSize: '10px' }
        }
    ]

    return (
        !saveIncluir ?

            <Grid container xs={12} alignItems='flex-center' spacing={3}>
                <Grid item xs={12}>
                    <BusquedaModulos
                        denuncia={inclusionesModulo}
                        prestacionesSeleccionadas={prestacionesSeleccionadas}
                        moduloOpciones={moduloOpciones} setModuloOpciones={setModuloOpciones}
                        moduloSeleccionado={moduloSeleccionado} setModuloSeleccionado={setModuloSeleccionado}
                        valueModulo={valueModulo} setValueModulo={setValueModulo}
                    />
                </Grid>
                <Grid container item xs={12} style={{ width: '100%' }}>
                    <AppBar position="static" className={classes.noBack}>
                        <Tabs
                            value={tabValue}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab className={classes.tab} label="Prestaciones seleccionadas" />
                            <Tab className={classes.tab} label="Módulo seleccionado" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0} xs={12}>
                        <Typography style={{ fontSize: '10px', padding: '20px 0 10px 20px' }} color='secondary'>
                            CÓDIGO Y DESCRIPCIÓN
                        </Typography>
                        {
                            moduloSeleccionado === null || moduloSeleccionado === undefined ?
                                prestacionesSeleccionadas && prestacionesSeleccionadas.map(prestacion => (
                                    <Grid item xs={12} className={classes.listaPrestacionesOK}>
                                        {prestacion && prestacion.codigo}&nbsp;{prestacion && prestacion.descripcion}
                                    </Grid>
                                ))
                                : moduloSeleccionado && loadingInclucionesRepetidas ?
                                    <Grid container xs={12} justify="center" style={{ marginTop: '50px' }}>
                                        <CircularProgress />
                                    </Grid>
                                    : inclusionesRepetidas && inclusionesRepetidas.length > 0 ?
                                        inclusionesRepetidas && inclusionesRepetidas.map(inclusion =>
                                            inclusion.incluida ? (
                                                <Grid item xs={12} className={classes.listaPrestacionesERR}>
                                                    <Alert severity="error">
                                                        <p style={{ fontSize: "11px", margin: '0', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            {inclusion && inclusion.codigo}&nbsp;{inclusion && inclusion.descripcion}<br />
                                                            <strong>Prestacion ya incluida en el modulo</strong>
                                                        </p>
                                                    </Alert>
                                                </Grid>
                                            ) : (
                                                <Grid item xs={12} className={classes.listaPrestacionesOK}>
                                                    {inclusion && inclusion.codigo}&nbsp;{inclusion && inclusion.descripcion}
                                                </Grid>
                                            )
                                        )
                                        : prestacionesSeleccionadas && prestacionesSeleccionadas.map(prestacion => (
                                            <Grid item xs={12} className={classes.listaPrestacionesOK}>
                                                {prestacion && prestacion.codigo}&nbsp;{prestacion && prestacion.descripcion}
                                            </Grid>
                                        ))
                        }
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Grid item xs={12}>
                            {moduloSeleccionado !== null && moduloSeleccionado !== undefined ?
                                <Grid xs={12}>
                                    <Grid item container alignItems='center' className={classes.cabecera} xs={12}>
                                        <Grid item xs={10}>
                                            <CustomTypography
                                                className={classes.textSelect}
                                                text={<b>Inclusiones del módulo {moduloSeleccionado.codigo} - {moduloSeleccionado.nombre}</b>}
                                            />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <IconButton className={anchorEl ? classes.moreInfoTrue : classes.moreInfoFalse} onClick={showMoreInfo}>
                                                <SubjectIcon />
                                            </IconButton>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={hideMoreInfo}
                                                getContentAnchorEl={null}
                                                style={{ left: '-100px' }}
                                            >
                                                <Typography style={{ fontSize: '11px', width: '150px', padding: '10px' }}>
                                                    <b>Descripcion</b><br />
                                                    <i>{moduloSeleccionado && moduloSeleccionado.descripcion}</i>
                                                </Typography>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} className={classes.scrollBarGrid} style={{ maxHeight: '40vh', overFlow: 'hidden', overflowY: 'auto' }}>
                                        {loadingInclusionesModulo ?
                                            <Grid container xs={12} justify="center" style={{ marginTop: '50px' }}>
                                                <CircularProgress />
                                            </Grid>
                                            :
                                            <CustomTableContrataciones
                                                data={moduloSeleccionado && oldInclusiones ? oldInclusiones : []}
                                                colorAvatar={false}
                                                columnas={headerTablaPrestacionesModulo}
                                                page={0}
                                                styleAdd={true}
                                                loading={loadingInclusionesModulo}
                                            />
                                        }
                                    </Grid>
                                </Grid>
                                :
                                <Grid item className={classes.cabecera} xs={12} style={{ marginTop: '20px' }}>
                                    <CustomTypography
                                        className={classes.textNotSelect}
                                        text="No hay módulo seleccionado. Podrás buscar uno y ver sus inclusiones."
                                    />
                                </Grid>
                            }
                        </Grid>
                    </TabPanel>
                </Grid>
            </Grid>

            : saveIncluir && moduloSeleccionado ?

                <Grid container justify="center" alignItems="center" style={{ height: '70vh' }}>
                    <Grid style={{ width: '85%', padding: '30px 30px', border: '1px solid', borderRadius: '5px', maxWidth: '70%' }}>
                        <Typography style={{ marginBottom: '15px', fontSize: '14px' }}><b>Confirmar Inclusión</b></Typography>
                        <Divider />
                        <Typography style={{ marginTop: '15px', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {inclusionesRepetidas && inclusionesRepetidas.filter(it => it.incluida !== true).length > 1 ?
                                <>
                                    Se incluirán las prestaciones
                                    {inclusionesRepetidas && inclusionesRepetidas.filter(it => it.incluida !== true).map(it => (" " + it.codigo + ", "))}
                                    al módulo {moduloSeleccionado && moduloSeleccionado.codigo}.
                                    ¿Desea confirmar la inclusión?
                                </>
                                :
                                <>
                                    Se incluirá la prestación
                                    {inclusionesRepetidas && inclusionesRepetidas.filter(it => it.incluida !== true).map(it => (" " + it.codigo + ", "))}
                                    al módulo {moduloSeleccionado && moduloSeleccionado.codigo}.
                                    ¿Desea confirmar la inclusión?
                                </>
                            }
                        </Typography>
                        <Grid style={{ marginTop: '30px', fontSize: '13px', gap: '10px' }} container justify='flex-end'>
                            <CustomButton
                                label='Volver'
                                variant={'outlined'}
                                isAction={true}
                                onClik={cancelarGrabar}
                            />
                            <CustomButton
                                label={'Confirmar'}
                                variant={'contained'}
                                isAction={true}
                                color={'primary'}
                                onClik={aceptarGrabar}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                : null
    )
}

export default DrawerIncluirAModulo;

