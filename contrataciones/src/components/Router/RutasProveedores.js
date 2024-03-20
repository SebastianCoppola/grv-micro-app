import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
//Redux:
import { useSelector } from 'react-redux'
//Router:
import { Switch, Router } from "react-router-dom"
//Components:
// import SolicitudesGenericas from '../components/SolicitudesGenericas/SolicitudesGenericas'
import PrestacionesNomencladas from '../Contrataciones/Prestaciones/PrestacionesNomencladas/PrestacionesNomencladas'
import PrestacionesNoNomencladas from '../Contrataciones/Prestaciones/PrestacionesNoNomencladas/PrestacionesNoNomencladas'
import Modulos from '../Contrataciones/Modulos/Modulos'
import ConsultaProveedor from '../Contrataciones/ConsultaProveedor/ConsultaProveedor'
import AltaProveedores from '../Contrataciones/AltaProveedor/AltaProveedores'
import General from '../Contrataciones/ProveedorCompleto/General/General'
import ConvenioActual from '../Contrataciones/ProveedorCompleto/ConvenioActual/ConvenioActual'
import HistoricosConvenios from '../Contrataciones/ProveedorCompleto/HistoricoConvenios/HistoricosConvenios'
import ConveniosFuturos from '../Contrataciones/ProveedorCompleto/ConveniosFuturos/ConveniosFuturos'
import ConvenioActualTraslado from '../Contrataciones/ProveedorCompleto/ConvenioActualTraslado/ConvenioActualTraslado'
//Utils: 
import RutasInternas from '../../Utils/rutasInternas'


const RutasProveedores = props => {

    const { history, setMiniMenu, setNavegacion, setTituloHeader, usuarioActivo, openMenu } = props

    const proveedorTrasladoSeleccionado = useSelector(state=>state.proveedor.setProveedorTrasladoActivo)
    
    const [proveedor, setProveedor] = useState(null)

    return (
        <Router history={history}>
            <Switch>
                <Route path={RutasInternas.PROVEEDORES} exact>
                    <ConsultaProveedor
                        open2={openMenu}
                        setMiniMenu={setMiniMenu}
                        setNavegacion={setNavegacion}
                        setTituloHeader={setTituloHeader}
                        usuarioActivo={usuarioActivo}
                        setProveedor={setProveedor}
                    />
                </Route>
                <Route path={RutasInternas.ALTA_PROVEEDOR} exact>
                    <AltaProveedores
                        setTituloHeader={setTituloHeader}
                        usuarioActivo={usuarioActivo}
                        setProveedor={setProveedor} 
                    />
                </Route>
                <Route path={RutasInternas.PRESTACIONES_NOMENCLADAS} exact >
                    <PrestacionesNomencladas setTituloHeader={setTituloHeader} />
                </Route>
                <Route path={RutasInternas.PRESTACIONES_NO_NOMENCLADAS} exact >
                    <PrestacionesNoNomencladas setTituloHeader={setTituloHeader} />
                </Route>
                <Route path={RutasInternas.MODULOS} exact >
                    <Modulos setTituloHeader={setTituloHeader} />
                </Route>
                <Route path={RutasInternas.SOLICITUDES_GENERICAS}>
                    <div>Solicitudes Genéricas</div>
                    {/* <SolicitudesGenericas
                        setMiniMenu={setMiniMenu}
                        setNavegacion={setNavegacion}
                        setTituloHeader={setTituloHeader}
                        usuarioActivo={usuarioActivo}
                        esOperador={usuarioActivo.isOperador}
                        openBuscador={openBuscador}
                        setOpenBuscador={setOpenBuscador}
                    /> */}
                </Route>
                <Route path={RutasInternas.CONSULTA_SINIESTROS}>
                    <div>Consulta Solicitudes</div>
                </Route>
                <Route path={RutasInternas.PROVEEDOR_GENERAL}>
                    <General
                        setMiniMenu={setMiniMenu}
                        proveedor={proveedor}
                        setProveedor={setProveedor}
                        setTituloHeader={setTituloHeader}
                        usuarioActivo={usuarioActivo}
                    />
                </Route>
                <Route path={RutasInternas.PROVEEDOR_CONVENIO_ACTUAL} exact >
                    {proveedorTrasladoSeleccionado && proveedorTrasladoSeleccionado.provedorTrasladoSeleccionado?(
                        <ConvenioActualTraslado
                            setMiniMenu={setMiniMenu}
                            setTituloHeader={setTituloHeader}
                            proveedor={proveedor}
                            usuarioActivo={usuarioActivo}
                        />
                    ):( 
                        <ConvenioActual
                            setMiniMenu={setMiniMenu}
                            setTituloHeader={setTituloHeader}
                            proveedor={proveedor}
                            usuarioActivo={usuarioActivo}
                        />
                    )}
                </Route>
                <Route path={RutasInternas.PROVEEDOR_CONVENIO_HISTORICO} exact >
                    <HistoricosConvenios
                        setMiniMenu={setMiniMenu}
                        setTituloHeader={setTituloHeader}
                        proveedor={proveedor}
                        usuario={usuarioActivo}
                    />
                </Route>
                <Route path={RutasInternas.PROVEEDOR_CONVENIO_FUTURO} exact >
                    <ConveniosFuturos
                        setMiniMenu={setMiniMenu}
                        setTituloHeader={setTituloHeader}
                        proveedor={proveedor}
                        usuarioActivo={usuarioActivo}
                    />
                </Route>
                <Redirect to={RutasInternas.PROVEEDORES} />
            </Switch>
        </Router>
    )
}

export default RutasProveedores
