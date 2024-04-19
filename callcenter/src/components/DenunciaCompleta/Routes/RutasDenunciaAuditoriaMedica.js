import React, { useState, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'
//Router:
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import MenuDenunciaAuditoriaMedica from './MenuDenunciaAuditoriaMedica'
import CompletoGeneral from '../General/completoGeneral'
import PrimeraAsistencia from '../SolapaPrimeraAsistencia/primeraAsistencia'
import CabeceraCompleta from '../cabeceraCompleta'
import FormPrimeraPantalla from '../PrimeraPantalla/formPrimeraPantalla'
import SolicitudesGenericasPorDenuncia from '../SolapaSolicitudesGenericas/SolicitudesGenericasPorDenuncia'
import NuevaSolicitudGenerica from '../SolapaSolicitudesGenericas/NuevaSolicitudGenerica'
import VerSolicitudGenerica from '../SolapaSolicitudesGenericas/VerSolicitudGenerica'
import EditarSolicitudGenerica from '../SolapaSolicitudesGenericas/EditarSolicitudGenerica'
import AuditoriaMedicaDenuncia from '../AuditoriaMedica/AuditoriaMedicaDenuncia'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import Cirugias from '../Cirugias/Cirugias'
import SolicitudesGenericasContenido from '../SolapaSolicitudesGenericas/SolicitudesGenericasContenido'

const RutasDenunciaAuditoriaMedica = props => {

    const { path, denuncia, usuarioActivo, dataSiniestroCompleto, setDataSiniestroCompleto,
        guardarContenedor, setGuardarContenedor, setMiniMenu, setNavegacion,
        setTituloNavegacionSiniestro, esOperador, openBuscador, setOpenBuscador, actualizarData
    } = props

    const snackBarAuditoria = useSelector(state => state.auditoriaMedica.snackBarAuditoria)
    const dispatch = useDispatch()
    const location = useLocation()
    
    const [activarCortoPunzante, setActivarCortoPunzante] = useState('')
    const [activarAlarmas, setActivarAlarmas] = useState({cortoPunzante: false, diagnosticoMedico: false,seguimientoMedico: false})
    const [idCausa, setIdCausa] = useState(null)
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(false)
    const [mostrarCabecera, setMostrarCabecera] = useState(false)

    useEffect(() => {
        switch(location.pathname){
            case '/home/editar':
                setMostrarCabecera(false)
                break
            case '/home/editar/':
                setMostrarCabecera(false)
                break
            case '/home/editar/solicitudesGenericas/ver':
                setMostrarCabecera(false)
                break
            case '/home/editar/solicitudesGenericas/nueva':
                setMostrarCabecera(false)
                break
            case '/home/editar/solicitudesGenericas/editar':
                setMostrarCabecera(false)
                break
            default:
                setMostrarCabecera(true)
                break
        }
    }, [location.pathname])

    return (
        <div style={{ display: 'flex', height: '85vh' }}>

            <MenuDenunciaAuditoriaMedica usuarioActivo={usuarioActivo} denuncia={denuncia} path={path} />

            <main style={{
                flexGrow: 1,
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
            }}>
                <div>
                    <Grid container alignItems='center' alignContent={'flex-end'} spacing={2} style={{ padding: '8px' }}>
                        {mostrarCabecera &&
                            <Grid item xs={12} style={{ padding: 0 }}>
                                <CabeceraCompleta
                                    setNavegacion={setNavegacion}
                                    denuncia={denuncia}
                                    dataSiniestroCompleto={dataSiniestroCompleto}
                                    usuarioActivo={usuarioActivo}
                                    esOperador={esOperador}
                                    idCausa={idCausa} setIdCausa={setIdCausa}
                                    checkedSiniestroMultiple={checkedSiniestroMultiple}
                                    setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                                    setOpenBuscador={setOpenBuscador}
                                    disabledCheck={true}
                                />
                            </Grid>
                        }
                        <Grid item xs={12} style={{ padding: 0 }}>
                            <Switch>
                                <Route path={`${path}`} exact>
                                    <Grid container justify='center' spacing={'2'}>
                                        <Grid item xs={11}>
                                            <FormPrimeraPantalla
                                                esOperador={esOperador}
                                                usuarioActivo={usuarioActivo}
                                                setDataSiniestroCompleto={setDataSiniestroCompleto}
                                                dataSiniestroCompleto={dataSiniestroCompleto}
                                                guardarContenedor={guardarContenedor}
                                                denuncia={denuncia}
                                                openBuscador={openBuscador}
                                                setOpenBuscador={setOpenBuscador}
                                                setTituloNavegacionSiniestro={setTituloNavegacionSiniestro}
                                            />
                                        </Grid>
                                    </Grid>
                                </Route>
                                <Route path={`${path}/general`} exact>
                                    <CompletoGeneral
                                        dataSiniestroCompleto={dataSiniestroCompleto}
                                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                                        setGuardarContenedor={setGuardarContenedor}
                                        guardarContenedor={guardarContenedor}
                                        setMiniMenu={setMiniMenu}
                                        setNavegacion={setNavegacion}
                                        setTituloNavegacionSiniestro={setTituloNavegacionSiniestro}
                                        activarCortoPunzante={activarCortoPunzante}
                                        setActivarCortoPunzante={setActivarCortoPunzante}
                                        activarAlarmas={activarAlarmas}
                                        setActivarAlarmas={setActivarAlarmas}
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        esOperador={usuarioActivo.isOperador}
                                        path={path}
                                        disableEdition={true}
                                    />
                                </Route>
                                <Route path={`${path}/primeraAsistencia`} exact>
                                    <PrimeraAsistencia
                                        dataSiniestroCompleto={dataSiniestroCompleto}
                                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                                        setGuardarContenedor={setGuardarContenedor}
                                        guardarContenedor={guardarContenedor}
                                        setMiniMenu={setMiniMenu}
                                        setNavegacion={setNavegacion}
                                        setTituloNavegacionSiniestro={setTituloNavegacionSiniestro}
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        esOperador={usuarioActivo.isOperador}
                                        openBuscador={openBuscador}
                                        setOpenBuscador={setOpenBuscador}
                                    />
                                </Route>
                                <Route path={`${path}/auditoriamedica`} exact>
                                    <AuditoriaMedicaDenuncia 
                                        denuncia={denuncia} 
                                        setTituloNavegacionSiniestro={setTituloNavegacionSiniestro} 
                                    />
                                </Route>
                                <Route path={`${path}/turnos`} exact>
                                    TURNOS
                                </Route>
                                <Route path={`${path}/cirugias`} exact>
                                    <Cirugias denuncia={denuncia} usuarioActivo={usuarioActivo}/>
                                </Route>
                                <Route path={`${path}/requerimientos`} exact>
                                    REQUERIMIENTO
                                </Route>
                                <Route path={`${path}/seguimientos`} exact>
                                    SEGUIMIENTOS
                                </Route>
                                <Route path={`${path}/solicitudesGenericas`} exact>
                                    <SolicitudesGenericasContenido 
                                        setTituloNavegacionSiniestro={setTituloNavegacionSiniestro}
                                        setMiniMenu={setMiniMenu}
                                        setNavegacion={setNavegacion}
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        esOperador={usuarioActivo.isOperador}
                                        // dataSiniestroCompleto={dataSiniestroCompleto}
                                        // setDataSiniestroCompleto={setDataSiniestroCompleto}
                                        // setGuardarContenedor={setGuardarContenedor}
                                        // guardarContenedor={guardarContenedor}
                                    />
                                </Route>
                                <Route path={`${path}/solicitudesGenericas/nueva`} exact>
                                    <NuevaSolicitudGenerica
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        actualizarData={actualizarData}
                                    />
                                </Route>
                                <Route path={`${path}/solicitudesGenericas/ver`} exact>
                                    <VerSolicitudGenerica
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        actualizarData={actualizarData}
                                    />
                                </Route>
                                <Route path={`${path}/solicitudesGenericas/editar`} exact>
                                    <EditarSolicitudGenerica
                                        denuncia={denuncia}
                                        usuarioActivo={usuarioActivo}
                                        actualizarData={actualizarData}
                                    />
                                </Route>
                                {/* REDIRECT */}
                                <Redirect to={`${path}`} />
                            </Switch>
                        </Grid>
                    </Grid>
                </div>
            </main>

            <CustomSnackBar
                handleClose={() => dispatch(actions.setSnackBarAuditoria({ open: false }))}
                open={snackBarAuditoria.open}
                title={snackBarAuditoria.message}
                severity={snackBarAuditoria.severity}
                vertical={snackBarAuditoria.vertical ? snackBarAuditoria.vertical : 'bottom'}
            />

        </div>
    )
}

export default RutasDenunciaAuditoriaMedica