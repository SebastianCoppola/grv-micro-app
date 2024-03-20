import { combineReducers } from 'redux'

import listados from './listados'
import documentos from './documentos'
import ubicacion from './ubicacion'
import persona from './persona'
import contactos from './contactos'
import proveedor from './proveedor'
import importarExportar from './importarExportar'
import moduloConvenio from './moduloConvenio'
import prestaciones from './prestaciones'
import convenio from './convenio'

export default combineReducers({
    listados: listados,
    documentos: documentos,
    ubicacion: ubicacion,
    persona: persona,
    contactos: contactos,
    proveedor: proveedor,
    importarExportar: importarExportar,
    moduloConvenio: moduloConvenio,
    prestaciones: prestaciones,
    convenio: convenio,
})