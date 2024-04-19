import React, { useEffect, useState } from 'react'
//Router:
import { Redirect, Route, Switch, Router } from "react-router-dom"
//Redux:
import { useSelector } from 'react-redux'
//Components:
import EscritorioSupervisor from '../EscritorioSupervisor/EscritorioSupervisor'
import EscritorioOperador from '../EscritorioOperador/EscritorioOperador'
import ConsultaSolicitudes from '../ConsultaSolicitudes/ConsultaSolicitudes'
import SiniestrosHoy from '../SiniestrosHoy/siniestrosHoy'
import PreDenuncias from '../PreDenuncias/PreDenuncias'
import TrasladosSolapaPrincipal from '../Traslados/traslados'
import ConsultasyReclamos from '../ConsultasyReclamos/consultayReclamos'
import SiniestrosConPendientes from '../SiniestrosConPendientes/SiniestrosConPendientes'
import SolicitudesGenericas from '../SolicitudesGenericas/SolicitudesGenericas'
import SolapaConsultasyReclamos from '../DenunciaCompleta/SolapaConsultasReclamos/consultasReclamos'
import Traslados from '../DenunciaCompleta/SolapaTraslados/traslados'
import Seguimiento from '../DenunciaCompleta/SolapaSeguimiento/Seguimiento'
import LugarDelAccidente from '../DenunciaCompleta/SolapaLugarDelAccidente/lugarDelAccidente'
import PrimeraAsistencia from '../DenunciaCompleta/SolapaPrimeraAsistencia/primeraAsistencia'
import CompletoGeneral from '../DenunciaCompleta/General/completoGeneral'
import PrimeraPantalla from '../DenunciaCompleta/PrimeraPantalla/primeraPantalla'
import Home from '../Home/Home'
import SolicitudesGenericasPorDenuncia from '../DenunciaCompleta/SolapaSolicitudesGenericas/SolicitudesGenericasPorDenuncia'
// import NuevaSolicitudGenerica from '../DenunciaCompleta/SolapaSolicitudesGenericas/NuevaSolicitudGenerica'
// import VerSolicitudGenerica from '../DenunciaCompleta/SolapaSolicitudesGenericas/VerSolicitudGenerica'
// import EditarSolicitudGenerica from '../DenunciaCompleta/SolapaSolicitudesGenericas/EditarSolicitudGenerica'

const RutasCallCenter = ({ usuarioActivo, history, rutas }) => {

    const denuncia = useSelector(state => state.documentos.denuncia)
    const actualizarData = useSelector(state => state.solicitudesGenericas.actualizarData)

    const [dataSiniestroCompleto, setDataSiniestroCompleto] = useState(null)
    const [guardarContenedor, setGuardarContenedor] = useState(false)
    const [idDenuncia, setIdDenuncia] = useState(null)
    const [activarAlarmas, setActivarAlarmas] = useState({
        cortoPunzante: false,
        diagnosticoMedico: false,
        seguimientoMedico: false,
    })

    useEffect(() => {
        setDataSiniestroCompleto( data => ({...data}) )
    }, [denuncia])

    //Disable Edition en caso de que el usuario sea "OPERADOR" y la denuncia "FIN ILT":
    const disableEdition = () => {
        let isOperador = usuarioActivo && usuarioActivo.isOperador
        let isFinILT = denuncia && denuncia.estadoMedicoIdEstadoMedico && denuncia.estadoMedicoIdEstadoMedico === 9
        return isOperador && isFinILT
    }

    return (
        <Router history={history}>
            <Switch>
                {/* Rutas Primarias */}
                <Route path={rutas?.rutasPrimarias.HOME.path} exact>
                    {usuarioActivo?.isOperador ? (
                        <EscritorioOperador
                            setActivarAlarmas={setActivarAlarmas}
                            setIdDenuncia={setIdDenuncia}
                            openBuscador={false}
                            setOpenBuscador={()=>{}}
                        />
                    ) : (
                        <EscritorioSupervisor />
                    )}
                </Route>
                <Route path={rutas?.rutasPrimarias.CONSULTA_SOLICITUDES.path} exact>
                    <ConsultaSolicitudes
                        usuarioActivo={usuarioActivo}
                        setIdDenuncia={setIdDenuncia}
                        setActivarAlarmas={setActivarAlarmas}
                        denuncia={denuncia}
                        open2={false}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.SINIESTROS_HOY.path} exact>
                    <SiniestrosHoy
                        setIdDenuncia={setIdDenuncia}
                        setActivarAlarmas={setActivarAlarmas}
                        usuarioActivo={usuarioActivo}
                        open2={false}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.PREDENUNCIAS.path} exact>
                    <PreDenuncias
                        usuarioActivo={usuarioActivo}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        openMenu={false}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.SOLICITUDES_GENERICAS.path} exact>
                    <SolicitudesGenericas
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.SINIESTROS_CON_PENDIENTES.path} exact>
                    <SiniestrosConPendientes
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        setActivarAlarmas={setActivarAlarmas}
                        usuarioActivo={usuarioActivo}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.CONSULTAS_RECLAMOS.path} exact>
                    <ConsultasyReclamos
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasPrimarias.TRASLADOS.path} exact>
                    <TrasladosSolapaPrincipal
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloHeader={()=>{}}
                        usuarioActivo={usuarioActivo}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                {/* Otras Rutas Primarias */}
                <Route path={rutas?.otrasRutasPrimarias.AGREGAR.path} exact>
                    <Home
                        setTituloHeader={()=>{}}
                        setNavegacion={()=>{}}
                        usuarioActivo={usuarioActivo}
                        denuncia2={denuncia}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                {/* Rutas Secundarias */}
                <Route path={rutas?.rutasSecundarias.EDITAR.path} exact>
                    <PrimeraPantalla
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        guardarContenedor={guardarContenedor}
                        setGuardarContenedor={setGuardarContenedor}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                        disableEdition={disableEdition()}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_GENERALES.path} exact>
                    <CompletoGeneral
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        setGuardarContenedor={setGuardarContenedor}
                        guardarContenedor={guardarContenedor}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        activarAlarmas={activarAlarmas}
                        setActivarAlarmas={setActivarAlarmas}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        disableEdition={disableEdition()}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_PRIMERA_ASISTENCIA.path} exact>
                    <PrimeraAsistencia
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        setGuardarContenedor={setGuardarContenedor}
                        guardarContenedor={guardarContenedor}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                        disableEdition={disableEdition()}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_LUGAR_ACCIDENTE.path} exact >
                    <LugarDelAccidente
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        setGuardarContenedor={setGuardarContenedor}
                        guardarContenedor={guardarContenedor}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        disableEdition={disableEdition()}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_SEGUIMIENTO.path} exact >
                    <Seguimiento
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        denuncia={denuncia}
                        idOperador={usuarioActivo.id}
                        esOperador={usuarioActivo.isOperador}
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        usuarioActivo={usuarioActivo}
                        setGuardarContenedor={setGuardarContenedor}
                        guardarContenedor={guardarContenedor}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                        disableEdition={disableEdition()}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_TRASLADOS.path} exact  >
                    <Traslados
                        idDenuncia={idDenuncia}
                        open2={false}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setGuardarContenedor={setGuardarContenedor}
                        guardarContenedor={guardarContenedor}
                        esOperador={usuarioActivo.isOperador}
                        disableEdition={disableEdition()}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_CONSULTAS_RECLAMOS.path} exact  >
                    <SolapaConsultasyReclamos
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        guardarContenedor={guardarContenedor}
                        setGuardarContenedor={setGuardarContenedor}
                        disableEdition={disableEdition()}
                        open2={false}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        openBuscador={false}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_SOLICITUDES_GENERICAS.path} exact >
                    <SolicitudesGenericasPorDenuncia
                        dataSiniestroCompleto={dataSiniestroCompleto}
                        setDataSiniestroCompleto={setDataSiniestroCompleto}
                        guardarContenedor={guardarContenedor}
                        setGuardarContenedor={setGuardarContenedor}
                        denuncia={denuncia}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        disableEdition={disableEdition}
                        setMiniMenu={()=>{}}
                        setNavegacion={()=>{}}
                        setTituloNavegacionSiniestro={()=>{}}
                        setOpenBuscador={()=>{}}
                    />
                </Route>
                {/* <Route path={rutas?.rutasSecundarias.EDITAR_NUEVA_SG.path} exact >
                    <NuevaSolicitudGenerica 
                        denuncia={denuncia} 
                        usuarioActivo={usuarioActivo} 
                        actualizarData={actualizarData} 
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_VER_SG.path} exact >
                    <VerSolicitudGenerica 
                        denuncia={denuncia} 
                        usuarioActivo={usuarioActivo} 
                        actualizarData={actualizarData} 
                    />
                </Route>
                <Route path={rutas?.rutasSecundarias.EDITAR_EDITAR_SG.path} exact >
                    <EditarSolicitudGenerica 
                        denuncia={denuncia} 
                        usuarioActivo={usuarioActivo} 
                        actualizarData={actualizarData} 
                    />
                </Route> */}
                {/* Redirect */}
                <Redirect to={rutas?.rutasPrimarias.HOME.path} />
            </Switch>
        </Router>
    )
}

export default RutasCallCenter
