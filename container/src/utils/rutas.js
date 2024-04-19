import SVGsiniestrosHoy from '../assets/IconsMenu/SiniestrosHoy.svg'
import SVGpreDenuncias from '../assets/IconsMenu/PreDenuncias.svg'
import SVGsolicitudes from '../assets/IconsMenu/Solicitudes.svg'
import SVGsiniestrosPendientes from '../assets/IconsMenu/SiniestrosPendientes.svg'
import ICOPrimeraAsistencia from '../assets/IconsMenu/ICOPrimeraAsistencia.png'
import ICOSolicitudesGenericas from '../assets/IconsMenu/ICOSolicitudesGenericas.svg'
import SVGnoNomencladas from '../assets/IconsMenu/noNomencladas.svg'
import SVGmodulos from '../assets/IconsMenu/modulos.svg'
import SVGgeneral from '../assets/IconsMenu/general.svg'
import SVGconvenioActual from '../assets/IconsMenu/convenioActual.svg'
import SVGhistoricoConvenios from '../assets/IconsMenu/historicoConvenios.svg'
import SVGconveniosFuturos from '../assets/IconsMenu/conveniosFuturos.svg'
import SVGconsulta from '../assets/IconsMenu/Consultas.svg'
import SVGconsultasReclamos from '../assets/IconsMenu/ConsultasReclamos.svg'
import SVGhome from '../assets/IconsMenu/Home.svg'
import ICOConsultasyReclamos from '../assets/IconsMenu/ICOConsultasyReclamos.png'
import ICOGeneral from '../assets/IconsMenu/ICOGeneral.png'
import ICOLugarAccidente from '../assets/IconsMenu/ICOLugarAccidente.png'
import ICOSeguimiento from '../assets/IconsMenu/ICOSeguimiento.png'
import ICOtraslado from '../assets/IconsMenu/ICOtraslado.png'
import MenuDenuncia from '../assets/IconsMenu/MenuDenuncia.png'
import SVGtraslados from '../assets/IconsMenu/Traslados.svg'
import SVGsolicitudesGenericas from '../assets/IconsMenu/solicitudesGenericas.svg'
import SVGproveedores from '../assets/IconsMenu/proveedores.svg'
import SVGnomencladas from '../assets/IconsMenu/nomencladas.svg'




export const rutasProveedores = {
    rutasPrimarias: {
        PROVEEDORES: {path: '/home/proveedores', title: 'Proveedores', headerTitle: 'Proveedores', icon: SVGproveedores},
        PRESTACIONES_NOMENCLADAS: {path: '/home/prestacionesNomencladas', title: 'Prestaciones Nomencladas', headerTitle: 'Prestaciones Nomencladas',  icon: SVGnomencladas},
        PRESTACIONES_NO_NOMENCLADAS: {path: '/home/prestacionesNoNomencladas', title: 'Prestaciones No Nomencladas', headerTitle: 'Prestaciones No Nomencladas', icon: SVGnoNomencladas},
        MODULOS: {path: '/home/modulos', title: 'Módulos', headerTitle: 'Módulos', icon: SVGmodulos},
        SOLICITUDES_GENERICAS: {path: '/home/solicitudesGenericas', title: 'Solicitudes Genéricas', headerTitle: 'Solicitudes Genéricas', icon: SVGsolicitudesGenericas},
        CONSULTA_SINIESTROS: {path: '/home/consultaSolicitudes', title: 'Consulta de Siniestros', headerTitle: 'Consulta de Siniestros', icon: SVGconsulta},    
    },
    otrasRutasPrimarias: {
        ALTA_PROVEEDOR: {path: '/home/altaProveedor', title: 'Nuevo Proveedor', headerTitle: 'Nuevo Proveedor', icon: null},
    },
    rutasSecundarias: {
        PROVEEDOR_GENERAL: {path: '/home/proveedores/general', title: 'General', headerTitle:'Proveedor - General', icon:SVGgeneral},
        PROVEEDOR_CONVENIO_ACTUAL: {path: '/home/proveedores/convenioActual', title: 'Convenio Actual', headerTitle:'Proveedor - Convenio Actual', icon:SVGconvenioActual},
        PROVEEDOR_CONVENIO_HISTORICO: {path: '/home/proveedores/historicoConvenios', title: 'Histórico Convenios', headerTitle:'Proveedor - Histórico Convenios', icon:SVGhistoricoConvenios},
        PROVEEDOR_CONVENIO_FUTURO: {path: '/home/proveedores/conveniosFuturos', title: 'Convenios Futuros', headerTitle:'Proveedor - Convenios Futuros', icon:SVGconveniosFuturos},
    }
}

export const rutasCallCenter = {
    rutasPrimarias: {
        HOME: {path:'/home', title:'Inicio', headerTitle:'Sistema de Administración de Siniestros', icon:SVGhome},
        CONSULTA_SOLICITUDES: {path:'/home/consultaSolicitudes', title:'Consulta', headerTitle:'Consulta de siniestros', icon:SVGconsulta},
        SINIESTROS_HOY: {path:'/home/siniestrosDeHoy', title:'Siniestros de hoy', headerTitle:'Siniestros de hoy', icon:SVGsiniestrosHoy},
        PREDENUNCIAS: {path:'/home/preDenuncias', title:'Pre denuncias', headerTitle:'Pre denuncias', icon:SVGpreDenuncias},
        SOLICITUDES_GENERICAS: {path:'/home/solicitudesGenericas', title:'Solicitudes Genéricas', headerTitle:'Solicitudes Genéricas', icon:SVGsolicitudes},
        SINIESTROS_CON_PENDIENTES: {path:'/home/siniestrosConPendientes', title:'Siniestros con pendientes', headerTitle:'Siniestros con pendientes', icon:SVGsiniestrosPendientes},
        CONSULTAS_RECLAMOS: {path:'/home/consultasyreclamos', title:'Consultas y reclamos', headerTitle:'Consultas y reclamos', icon: SVGconsultasReclamos},
        TRASLADOS: {path:'/home/traslados', title:'Traslados', headerTitle:'Traslados', icon:SVGtraslados},
    },
    otrasRutasPrimarias: {
        AGREGAR: {path:'/home/agregar', title:'Nueva Denuncia', headerTitle:'Nueva Denuncia', icon:''},
    }, 
    rutasSecundarias: {
        EDITAR: {path:'/home/editar', title:'', headerTitle:'Detalle Denuncia', icon:MenuDenuncia},
        EDITAR_GENERALES: {path:'/home/editar/generales', title:'General', headerTitle:'General', icon:ICOGeneral},
        EDITAR_PRIMERA_ASISTENCIA: {path:'/home/editar/primeraAsistencia', title:'Primera Asistencia', headerTitle:'Primera Asistencia', icon:ICOPrimeraAsistencia},
        EDITAR_LUGAR_ACCIDENTE: {path:'/home/editar/lugarAccidente', title:'Lugar del accidente', headerTitle:'Lugar del accidente', icon:ICOLugarAccidente},
        EDITAR_SEGUIMIENTO: {path:'/home/editar/seguimiento', title:'Seguimiento', headerTitle:'Seguimiento', icon:ICOSeguimiento},
        EDITAR_TRASLADOS: {path:'/home/editar/traslados', title:'Traslados', headerTitle:'Traslados', icon:ICOtraslado},
        EDITAR_CONSULTAS_RECLAMOS: {path:'/home/editar/consultasyReclamos', title:'Consultas y Reclamos', headerTitle:'Consultas y Reclamos', icon:ICOConsultasyReclamos},
        EDITAR_SOLICITUDES_GENERICAS: {path:'/home/editar/solicitudesGenericas', title:'Solicitudes Genéricas', headerTitle:'Solicitudes Genéricas', icon:ICOSolicitudesGenericas},
    }
}

export const rutasAuditoriaMedica = {
    rutasPrimarias: [
        {path: '/home/proveedores', title: 'Proveedores', icon: SVGproveedores},
        {path: '/home/prestacionesNomencladas', title: 'Prestaciones Nomencladas', icon: SVGnomencladas},
        {path: '/home/prestacionesNoNomencladas', title: 'Prestaciones No Nomencladas', icon: SVGnoNomencladas},
        {path: '/home/modulos', title: 'Módulos', icon: SVGmodulos},
        {path: '/home/solicitudesGenericas', title: 'Solicitudes Genéricas', icon: SVGsolicitudesGenericas},
        {path: '/home/consultaSolicitudes', title: 'Consulta de Siniestros', icon: SVGconsulta},
    ],
    otrasRutasPrimarias: [
        {path: '/home/altaProveedor', title: 'Nuevo Proveedor', icon: null},
    ], 
    rutasSecundarias: [
        {path: '/home/proveedores/general', title: 'General'},
        {path: '/home/proveedores/convenioActual', title: 'Convenio Actual'},
        {path: '/home/proveedores/historicoConvenios', title: 'Histórico Convenios'},
        {path: '/home/proveedores/conveniosFuturos', title: 'Convenios Futuros'},
    ]
}