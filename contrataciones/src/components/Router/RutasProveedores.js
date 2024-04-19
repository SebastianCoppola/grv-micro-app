import React, { lazy, Suspense, useState }  from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Router:
import { Redirect, Route, Switch, Router } from "react-router-dom"
//Components:
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
import CustomLoading from '../commons/Loading/CustomLoading'
//Apps:
// import CallCenterApp from '../MicroApps/CallCenterApp'
const CallCenterApp = lazy( () => import('../MicroApps/CallCenterApp') )

const RutasProveedores = ({ history }) => {

    const proveedorTrasladoSeleccionado = useSelector(state => state.proveedor.setProveedorTrasladoActivo)
    const rutas = useSelector(state => state.generales.rutas)
    const rutasCallCenter = useSelector(state => state.generales.rutasCallCenter)
    const usuarioActivo = useSelector(state => state.generales.usuarioActivo)

    // console.log(rutasCallCenter)
    // console.log(rutas)
    
    const [proveedor, setProveedor] = useState(null)
  
    return (
        // <Suspense fallback={<CustomLoading loading={true} />}>
        //     <CallCenterApp usuarioActivo={usuarioActivo} rutas={rutasCallCenter} history={history}/>
        // </Suspense>
        <Router history={history}>
             <Switch>
                {/* Rutas Primarias */}
                <Route path={rutas?.rutasPrimarias.PROVEEDORES.path} exact>
                    <ConsultaProveedor usuarioActivo={usuarioActivo} setProveedor={setProveedor} />
                </Route>
                <Route path={rutas?.rutasPrimarias.PRESTACIONES_NOMENCLADAS.path} exact>
                    <PrestacionesNomencladas />
                </Route>
                <Route path={rutas?.rutasPrimarias.PRESTACIONES_NO_NOMENCLADAS.path} exact>
                    <PrestacionesNoNomencladas />
                </Route>
                <Route path={rutas?.rutasPrimarias.MODULOS.path} exact>
                    <Modulos />
                </Route>
                <Route path={rutas?.rutasPrimarias.SOLICITUDES_GENERICAS.path} exact>
                    <div>Solicitudes Genéricas</div>
                </Route>
                <Route path={rutas?.rutasPrimarias.CONSULTA_SINIESTROS.path} exact>
                    <Suspense fallback={<CustomLoading loading={true} />}>
                        <CallCenterApp usuarioActivo={usuarioActivo} rutas={rutasCallCenter}/>
                    </Suspense>
                </Route>
                {/* Otras Rutas Primarias */}
                <Route path={rutas?.otrasRutasPrimarias.ALTA_PROVEEDOR.path} exact>
                    <AltaProveedores usuarioActivo={usuarioActivo} setProveedor={setProveedor} />
                </Route>
                {/* Rutas Secundarias */}
                <Route path={rutas?.rutasSecundarias.PROVEEDOR_GENERAL.path} exact>
                    <General proveedor={proveedor} usuarioActivo={usuarioActivo} />
                </Route>
                <Route path={rutas?.rutasSecundarias.PROVEEDOR_CONVENIO_ACTUAL.path} exact>
                    {proveedorTrasladoSeleccionado && proveedorTrasladoSeleccionado.provedorTrasladoSeleccionado?(
                        <ConvenioActualTraslado />
                    ):( 
                        <ConvenioActual proveedor={proveedor} usuarioActivo={usuarioActivo}/>
                    )}
                </Route>
                <Route path={rutas?.rutasSecundarias.PROVEEDOR_CONVENIO_HISTORICO.path} exact >
                    <HistoricosConvenios proveedor={proveedor} usuario={usuarioActivo}/>
                </Route>
                <Route path={rutas?.rutasSecundarias.PROVEEDOR_CONVENIO_FUTURO.path} exact >
                    <ConveniosFuturos proveedor={proveedor} usuarioActivo={usuarioActivo}/>
                </Route>
                {/* Rutas Denuncia Completa */}
                <Route path={'/home/editar'}>
                    <Suspense fallback={<CustomLoading loading={true} />}>
                        <CallCenterApp usuarioActivo={usuarioActivo} rutas={rutasCallCenter}/>
                    </Suspense>
                </Route>
                {/* Redirect */}
                <Redirect to={rutas?.rutasPrimarias.PROVEEDORES.path} />
            </Switch>
        </Router>
    )
}

export default RutasProveedores
