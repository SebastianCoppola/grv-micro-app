import { 
    URL_API, 
    PORT_ESTADO_CIVIL,
    CONTEXT_CONSULTAS_RECLAMOS,
    CONTEXTO_DOCUMENTOS,
    CONTEXT_TRASLADOS,
    CONTEXT_NOTIFICACIONES,
    CONTEXTO_DASHBOARD,
    CONTEXT_PERSONA,
    CONTEXTO_UBICACION,
    CONTEXTO_LISTADOS,
    CONTEXT_PROVEEDOR_CENTRO_MEDICO,
    CONTEXT_IMPORTAR,
} from './baseContextURL'

//WS CONSULTA Y RECLAMOS
export const FETCH_SERCH_EVOLUCIONES = `/api${CONTEXT_CONSULTAS_RECLAMOS}/evolucion`
export const FETCH_SERCH_OBSERVACIONES = `/api${CONTEXT_CONSULTAS_RECLAMOS}/observacion/id`
export const FECTH_URL_SEARCH_CONSULTAS_RECLAMOS = `/api${CONTEXT_CONSULTAS_RECLAMOS}/contactoCallcenter`
export const FECTH_URL_SEARCH_DETALLE_CONSULTAS_RECLAMOS = `/api${CONTEXT_CONSULTAS_RECLAMOS}/contactoCallcenter/id`
export const FECTH_URL_NUEVA_OBSERVACION = `/api${CONTEXT_CONSULTAS_RECLAMOS}/observacion`
export const FECTH_URL_ELIMINAR_OBSERVACIONES = `/api${CONTEXT_CONSULTAS_RECLAMOS}/observacion/eliminar`
export const FECTH_URL_EDITAR_OBSERVACION = `/api${CONTEXT_CONSULTAS_RECLAMOS}/observacion/editar`
export const FECTH_URL_CREAR_CONSULTAS_RECLAMOS = `/api${CONTEXT_CONSULTAS_RECLAMOS}/contactoCallcenter/save`
export const FECTH_URL_EXPORTAR_CONSULTA_RECLAMO = `/api${CONTEXT_CONSULTAS_RECLAMOS}/contactoCallcenter/exportar`

//WS SINIESTROS CON PENDIENTES
export const FECTH_URL_SEARCH_SINIESTROS_PENDIENTES = `/api${URL_API}${PORT_ESTADO_CIVIL}${CONTEXTO_DOCUMENTOS}/pendientes`
export const FECTH_URL_SEARCH_ASIGNAR_PENDIENTE = `/api${URL_API}${PORT_ESTADO_CIVIL}${CONTEXTO_DOCUMENTOS}/pendientes/id/asignar`
export const FECTH_URL_SEARCH_DESASIGNAR_PENDIENTES = `/api${URL_API}${PORT_ESTADO_CIVIL}${CONTEXTO_DOCUMENTOS}/pendientes/id/desasignar`

//WS DOCUMENTOS
export const FECTH_URL_ACCIDENTADO = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id/accidentado`
export const FECTH_URL_DENUNCIAS = `/api${CONTEXTO_DOCUMENTOS}/denuncias`
export const FECTH_URL_GET_DENUNCIA_BY_ID = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id`
export const MARCAR_VERIFICADA_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id/verificar`
export const FECTH_URL_PRE_DENUNCIAS = `/api${CONTEXTO_DOCUMENTOS}/predenuncias`
export const FECTH_URL_SAVE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id/save`
export const FECTH_URL_ASIGNAR_RESPONSABLE_PRE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/asignar`
export const FECTH_URL_DESASIGNAR_RESPONSABLE_PRE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/desasignar`
export const FECTH_URL_ENVIAR_PENDIENTES = `/api${CONTEXTO_DOCUMENTOS}/pendientes/id/enviar`
export const FETCH_URL_ASOCIAR_DENUNCIA_EXISTENTE = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/asociar`
export const FETCH_URL_UPDATE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id/update`
export const FETCH_URL_DESACTIVAR_ALARMA_TRASLADO = `/api${CONTEXTO_DOCUMENTOS}/denuncias/alarma/ambulancia/desactivar`
export const FETCH_URL_NUEVA_SEDE = `/api${CONTEXTO_DOCUMENTOS}/sede/save`
export const FETCH_URL_GENERAR_PRE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/generar`
export const FETCH_URL_CAMPOS_REQUERIDOS = `/api${CONTEXTO_DOCUMENTOS}/denuncias/camposrequeridos`
export const FETCH_URL_ANULAR_PRE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/anular`
export const FETCH_URL_GUARDAR_SINIESTROS_MULTIPLES = `/api${CONTEXTO_DOCUMENTOS}/causa-siniestro-multiple/save`
export const FETCH_URL_SINIESTROS_MULTIPLES_SAVE_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/denuncias/save-siniestro-multiple`
export const FETCH_URL_CLONAR_DENUNCIA_REINGRESO = `/api${CONTEXTO_DOCUMENTOS}/denuncias/clonar-denuncia`
export const FECTH_URL_DENUNCIAS_EXPORTAR = `/api${CONTEXTO_DOCUMENTOS}/denuncias/exportar`
export const FETCH_URL_CORTO_PUNZANTE_ANTERIOR_ACTIVO = `/api${CONTEXTO_DOCUMENTOS}/denuncias/denuncia-anterior-corto-punzante-activo`
export const FETCH_URL_CAMPOS_REQUERIDOS_DENUNCIA = `/api${CONTEXTO_DOCUMENTOS}/denuncias/campos-requeridos`
export const FETCH_URL_EXISTEN_PREDENUNCIAS_SIN_ASIGNAR = `/api${CONTEXTO_DOCUMENTOS}/predenuncias/existen-pre-denuncias-sin-asignar`

//TRASLADOS
export const FECTH_URL_SEARCH_TRASLADOS = `/api${CONTEXT_TRASLADOS}/traslado`
export const FETCH_URL_ELIMINAR_TRASLADO = `/api${CONTEXT_TRASLADOS}/traslado/id`
export const FETCH_URL_CONFIRMAR_TRASLADO = `/api${CONTEXT_TRASLADOS}/traslado/confirmar`
export const FETCH_URL_SERVICIOS_TRASLADOS = `/api${CONTEXT_TRASLADOS}/servicios`
export const FETCH_URL_GUARDAR_TRASLADO = `/api${CONTEXT_TRASLADOS}/traslado/save`
export const FETCH_URL_DETALLE_TRASLADOS = `/api${CONTEXT_TRASLADOS}/traslado/detalles/id`
export const FECTH_URL_TRASLADO_DESCARGAR = `/api${CONTEXT_TRASLADOS}/traslado/exportar/id`
export const FECTH_URL_TRASLADO_OBSERVACION = `/api${CONTEXT_TRASLADOS}/traslado/save/observacion`


//WS NOTIFICACIONES:
export const FETCH_URL_ENVIAR_MAIL_CORTO_PUNZANTES_ANTERIORES_ACTIVOS = `/api${CONTEXT_NOTIFICACIONES}/email/corto-punzantes-anteriores-activos`

//WS DASHBOARD:
export const FECTH_URL_CANTIDAD_DENUNCIAS = `/api${CONTEXTO_DASHBOARD}/tablero/cantidad`
export const FECTH_URL_SUPERVISOR_GRAFICOS = `/api${CONTEXTO_DASHBOARD}/tablero/graficos`

//WS PERSONA:
export const FECTH_URL_BUSQUEDA_EMPLEADOR = `/api${CONTEXT_PERSONA}/super/findEmpleadorByNameOrCuit`
export const FECTH_URL_VALIDAR_EMPLEADOR = `/api${CONTEXT_PERSONA}/super/empleadorValido`
export const FECTH_URL_CALCULAR_CUIL = `/api${CONTEXT_PERSONA}/super/calcularcuil`
export const FECTH_URL_BUSQUEDA_EMPLEADOR_TODOS = `/api${CONTEXT_PERSONA}/super/findEmpleadores`
export const FETCH_URL_DATOS_PACIENTE = `/api${CONTEXT_PERSONA}/super/accidentado/documento`

//WS UBICACION:
export const FECTH_URL_LOCALIDADES_SELECT = `/api${CONTEXTO_UBICACION}/localidades/id/provincias`
export const FECTH_URL_PROVINCIAS = `/api${CONTEXTO_UBICACION}/provincias`
export const FECTH_URL_LOCALIDADES = `/api${CONTEXTO_UBICACION}/localidades/provincia`
export const FECTH_URL_CALLE = `/api${CONTEXTO_UBICACION}/localidades/calle`
export const FECTH_URL_CODIGO_POSTAL = `/api${CONTEXTO_UBICACION}/codigopostal`
export const FECTH_URL_CODIGO_POSTAL_CABA = `/api${CONTEXTO_UBICACION}/codigopostal/caba`

//WS LISTADOS:
export const FETCH_URL_LISTADO_PRIMERA_ASISTENCIA = `/api${CONTEXTO_LISTADOS}${CONTEXT_PROVEEDOR_CENTRO_MEDICO}/primera-asistencia`
export const FECTH_URL_PROVINCIAS_SELECT = `/api${CONTEXTO_LISTADOS}/ubicacion/provincia`
export const FETCH_URL_LISTADO_CLIENTES = `/api${CONTEXTO_LISTADOS}/cliente`
export const FETCH_URL_LISTADO_MODALIDAD_TRABAJO = `/api${CONTEXTO_LISTADOS}/modalidadTrabajo`
export const FETCH_URL_LISTADO_SINIESTRO_MULTIPLE = `/api${CONTEXTO_LISTADOS}/causa-siniestro-multiple`
export const FETCH_URL_ESTADOS_CONSULTAS_Y_RECLAMOS = `/api${CONTEXTO_LISTADOS}/estadoContactoCallcenter`
export const FETCH_URL_LISTADO_PRESTADOR = `/api${CONTEXTO_LISTADOS}${CONTEXT_PROVEEDOR_CENTRO_MEDICO}/derivado`
export const FETCH_URL_TIPO_CONTACTO = `/api${CONTEXTO_LISTADOS}/tipo/contactocallcenter`
export const FETCH_URL_PROCESOS = `/api${CONTEXTO_LISTADOS}/proceso/contactocallcenter`
export const FETCH_URL_AMBULANCIAS = `/api${CONTEXTO_LISTADOS}/serviciotraslado/ambulancias`
export const FETCH_URL_ESTADO_INTERNACION = `/api${CONTEXTO_LISTADOS}/estadoInternacion`
export const FETCH_BUSCAR_PROVEEDORES = `/api${CONTEXTO_LISTADOS}/proveedor/traslado`
export const FETCH_URL_ESTADOS_TRASLADO = `/api${CONTEXTO_LISTADOS}/estadotraslado`
export const FETCH_URL_DENUNCIANTE_VIP = `/api${CONTEXTO_LISTADOS}/denunciante/idEmpleador`
export const FETCH_URL_FORMA_ACCIDENTE = `/api${CONTEXTO_LISTADOS}/formaaccidente`
export const FETCH_URL_CODIGO_AMBULANCIA = `/api${CONTEXTO_LISTADOS}/codigoambulancia`
export const FETCH_URL_TIPO_VIAJE = `/api${CONTEXTO_LISTADOS}/tipoviaje`
export const FETCH_URL_TIPO_TRASLADOS = `/api${CONTEXTO_LISTADOS}/tipotraslado`
export const FECTH_URL_OPERADORES = `/api${CONTEXTO_LISTADOS}/operador`
export const FETCH_URL_PRESENTA_COVID = `/api${CONTEXTO_LISTADOS}/presentacovid`
export const FECTH_URL_TRAMITADOR = `/api${CONTEXTO_LISTADOS}/tramitador`
export const FECTH_URL_TIPO_DNI = `/api${CONTEXTO_LISTADOS}/tipodocumento`
export const FETCH_URL_SEXO = `/api${CONTEXTO_LISTADOS}/sexo`
export const FETCH_URL_AUDITOR = `/api${CONTEXTO_LISTADOS}/tramitador/auditor`
export const FECTH_URL_NATURALEZA_SINIESTRO = `/api${CONTEXTO_LISTADOS}/naturalezasiniestro`
export const FECTH_URL_ZONA_AFECCION = `/api${CONTEXTO_LISTADOS}/zonaafeccion`
export const FECTH_URL_EXTRACCIONISTA = `/api${CONTEXTO_LISTADOS}/extraccionista`
export const FECTH_URL_OCUPACION = `/api${CONTEXTO_LISTADOS}/ocupacion`
export const FECTH_URL_DIAGNOSTICO_CIE10 = `/api${CONTEXTO_LISTADOS}/diagnosticocie10`
export const FECTH_URL_AGENTE_MATERIAL = `/api${CONTEXTO_LISTADOS}/agentematerialasociado`
export const FECTH_URL_AGENTE_CAUSANTE = `/api${CONTEXTO_LISTADOS}/agentecausanteep`
export const FECTH_URL_PATOLOGIA_TRAZADORA = `/api${CONTEXTO_LISTADOS}/patologiatrazadora`
export const FECTH_URL_LUGAR_ACCIDENTE = `/api${CONTEXTO_LISTADOS}/lugaraccidente`
export const FECTH_URL_CIRCUNSTANCIA = `/api${CONTEXTO_LISTADOS}/circunstanciaitinere`
export const FECTH_URL_SEVERIDAD_DENUNCIA = `/api${CONTEXTO_LISTADOS}/severidaddenuncia`
export const FECTH_URL_TIPO_SINIESTRO = `/api${CONTEXTO_LISTADOS}/tiposiniestro`
export const FECTH_URL_ESTADO_MEDICO = `/api${CONTEXTO_LISTADOS}/estadomedico`
export const FECTH_URL_NACIONALIDAD = `/api${CONTEXTO_LISTADOS}/nacionalidad`
export const FECTH_URL_ESTADO_CIVIL = `/api${CONTEXTO_LISTADOS}/estadocivil`

//WS IMPORTAR EXPORTAR:
export const FECTH_URL_IMPORTAR = `/api${CONTEXT_IMPORTAR}/reporte/generarReporte`
export const FECTH_URL_CODIGO_BARRAS = `/api${CONTEXT_IMPORTAR}/reporte/barcode64`
export const FECTH_URL_EXPORTAR_EXCEL = `/api${CONTEXT_IMPORTAR}/consultas-cruzadas/excel`
export const FECTH_URL_DESCARGAR_PDF_TRASLADO = `/api${CONTEXT_IMPORTAR}/pdf/traslado`