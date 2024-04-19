import { combineReducers } from 'redux'
import listados from './listados'
import documentos from './documentos'
import ubicacion from './ubicacion'
import persona from './persona'
import solicitudesGenericas from './solicitudesGenericas'
import traslados from './traslados'
import consultasReclamos from './consultasReclamos'
import siniestrosPendientes from './siniestrosPendientes'
import contactos from './contactos'
import proveedor from './proveedor'
import importarExportar from './importarExportar'
import moduloConvenio from './moduloConvenio'
import prestaciones from './prestaciones'
import convenio from './convenio'
import auditoriaMedica from './auditoriaMedica'
import loginTools from './loginTools'
import turnos from './turnos'
import cirugias from './cirugias'
import generalConfig from './generalConfig'

export default combineReducers({
    listados: listados,
    documentos: documentos,
    ubicacion: ubicacion,
    persona: persona,
    solicitudesGenericas: solicitudesGenericas,
    traslados: traslados,
    consultasReclamos: consultasReclamos,
    traslados: traslados,
    siniestrosPendientes: siniestrosPendientes,
    contactos: contactos,
    proveedor: proveedor,
    importarExportar: importarExportar,
    moduloConvenio: moduloConvenio,
    prestaciones: prestaciones,
    convenio: convenio,
    auditoriaMedica: auditoriaMedica,
    loginTools: loginTools,
    turnos: turnos,
    cirugias: cirugias,
    generalConfig: generalConfig
})