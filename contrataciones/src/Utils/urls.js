export const CONTEXTO_LISTADOS = '/grv/listados'
export const CONTEXTO_DOCUMENTOS = '/grv/documento'
export const CONTEXTO_DASHBOARD = '/grv/dashboard'
export const CONTEXTO_UBICACION = '/grv/ubicacion'
export const CONTEXT_PERSONA = '/grv/persona'
export const CONTEXT_SOLICITUDES_GENERICAS = '/grv/solicitudgenerica'
export const CONTEXT_TRASLADOS = '/grv/traslados'
export const CONTEXT_CONSULTAS_RECLAMOS = '/grv/consultasreclamos'
export const CONTEXT_CONTACTO = '/grv/contactos'
export const CONTEXT_LOGIN = '/grv/login'
export const CONTEXT_NOTIFICACIONES = '/grv/notificaciones'
export const CONTEXT_PROVEEDOR = '/grv/proveedor'
export const CONTEXT_IMPORTAR = '/grv/importarexportar'
export const CONTEXT_PROVEEDOR_CENTRO_MEDICO = '/proveedor-centro-medico'
export const CONTEXT_PRESTACIONES = "/grv/prestaciones"
export const CONTEXT_MODULO_CONVENIO = "/grv/moduloconvenio"
export const CONTEXT_CONVENIO = "/grv/convenio"
export const CONTEXT_AUDITORIA_MEDICA = "/grv/auditoria"
export const CONTEXT_LOGIN_TOOLS = "/grv/logintools"
export const CONTEXT_TURNOS = "/grv/turnos"
export const CONTEXT_CIRUGIAS = "/grv/cirugias"

//WS PROVEEDOR
export const FECTH_URL_SEDE = `/api${CONTEXT_PROVEEDOR}/sedes/tiposede`
export const FETCH_URL_BUSQUEDA_CENTROS_MEDICOS = `/api${CONTEXT_PROVEEDOR}/centrosmedicos/super`
export const FETCH_URL_CENTROS_MEDICOS_A_DETERMINAR = `/api${CONTEXT_PROVEEDOR}/centrosmedicos/adeterminar`
export const FETCH_URL_CENTROS_MEDICOS_SUGERIDOS = `/api${CONTEXT_PROVEEDOR}/centrosmedicos/sugeridos`
export const FETCH_URL_ENVIAR_MAIL_PRIMERA_ASISTENCIA = `/api${CONTEXT_PROVEEDOR}/centrosmedicos/super/mail/primerasistencia`
export const FECTH_URL_TIPO_SEDE = `/api${CONTEXT_PROVEEDOR}/tipossedes/empleador`
export const FECTH_URL_BUSQUEDA_PRESTADOR = `/api${CONTEXT_PROVEEDOR}/proveedor`
export const FECTH_URL_CAMBIO_ESTADO_PROVEEDOR = `/api${CONTEXT_PROVEEDOR}/proveedor/cambiar-estado`
export const FECTH_URL_VALIDACION_CUIT = `/api${CONTEXT_PROVEEDOR}/proveedor/validar-cuit`
export const FECTH_URL_SAVE_PROVEEDOR = `/api${CONTEXT_PROVEEDOR}/proveedor/save`
export const FETCH_URL_FIND_TIPOS_PROVEEDOR_DATOS = `/api${CONTEXT_PROVEEDOR}/proveedor/tipo-proveedor-datos`
export const FETCH_URL_FIND_CONTACTOS = `/api${CONTEXT_PROVEEDOR}/contacto/findByProveedor`
export const FETCH_URL_SAVE_CONTACTOS = `/api${CONTEXT_PROVEEDOR}/contacto/save`
export const FETCH_URL_DELETE_CONTACTOS = `/api${CONTEXT_PROVEEDOR}/contacto/delete`
export const FETCH_URL_UPDATE_CONTACTOS = `/api${CONTEXT_PROVEEDOR}/contacto/update`
export const FETCH_URL_SAVE_ALL_PROVEEDOR = `/api${CONTEXT_PROVEEDOR}proveedor/editar-proveedor`
export const FETCH_URL_ESTADO_SUBPRESTADOR = `/api${CONTEXT_PROVEEDOR}/proveedor/cambiar-estado`
export const FETCH_URL_LISTAR_SUBPRESTADOR = `/api${CONTEXT_PROVEEDOR}/sub-prestador/find-by-proveedor`
export const FETCH_URL_SAVE_SUBPRESTADOR = `/api${CONTEXT_PROVEEDOR}sub-prestador/save`
export const FETCH_URL_UPDATE_SUBPRESTADOR = `/api${CONTEXT_PROVEEDOR}/sub-prestador/update`
export const FETCH_URL_PROVEEDOR_CONVENIO_ACTIVO = `/api${CONTEXT_PROVEEDOR}/proveedor/convenio-activo`

//WS PRESTACIONES
export const FETCH_URL_LISTADO_PRESTACIONES_NOMENCLADAS = `/api${CONTEXT_PRESTACIONES}/nomencladas`
export const FETCH_URL_LISTADO_PRESTACIONES_NO_NOMENCLADAS = `/api${CONTEXT_PRESTACIONES}/nonomencladas`
export const SAVE_URL_PRESTACION_NO_NOMENCLADA = `/api${CONTEXT_PRESTACIONES}/nonomencladas/save`
export const EDIT_URL_PRESTACION_NO_NOMENCLADA = `/api${CONTEXT_PRESTACIONES}/nonomencladas/update`
export const FETCH_URL_PRESTACIONES_PROVEEDOR = `/api${CONTEXT_PRESTACIONES}/prestaciones/proveedor`

//WS MODULOS
export const FETCH_URL_MODULOS = `/api${CONTEXT_MODULO_CONVENIO}/modulo/find`
export const FETCH_URL_INCLUSIONES_MODULO = `/api${CONTEXT_MODULO_CONVENIO}/modulo/find-prestaciones/by-modulo`
export const FETCH_URL_INCLUSIONES_REPETIDAS_PNN = `/api${CONTEXT_MODULO_CONVENIO}/prestacion-no-nomenclada/identificar-repetidas`
export const FETCH_URL_INCLUSIONES_REPETIDAS_PN = `/api${CONTEXT_MODULO_CONVENIO}/nomencladas/identificar-repetidas`
export const SAVE_URL_INCLUSIONES_MODULO_PNN = `/api${CONTEXT_MODULO_CONVENIO}/prestacion-no-nomenclada/incluir-a-modulo`
export const SAVE_URL_INCLUSIONES_MODULO_PN = `/api${CONTEXT_MODULO_CONVENIO}/nomencladas/incluir-a-modulo`
export const SAVE_URL_MODULO = `/api${CONTEXT_MODULO_CONVENIO}/modulo/save`
export const EDIT_URL_MODULO = `/api${CONTEXT_MODULO_CONVENIO}/modulo/editar`
export const FETCH_URL_GET_CONVENIOS_INCLUIDOS = `/api${CONTEXT_MODULO_CONVENIO}/modulo/convenios-incluido`
export const FETCH_URL_LISTADO_MODULOS = `/api${CONTEXT_MODULO_CONVENIO}/modulo`
export const FETCH_URL_IMPACTAR_CONVENIOS = `/api${CONTEXT_MODULO_CONVENIO}/convenio/editar-impactar-modulo`

//WS CONVENIO
export const URL_GET_CONVENIO_ACTUAL = `/api${CONTEXT_CONVENIO}/convenio-actual`
export const URL_GET_PN = `/api${CONTEXT_CONVENIO}/convenio-actual/prestaciones-nomencladas`
export const URL_GET_PNN = `/api${CONTEXT_CONVENIO}/convenio-actual/prestaciones-no-nomencladas`
export const URL_GET_PNBU = `/api${CONTEXT_CONVENIO}/convenio-actual/prestaciones-nbu`
export const URL_GET_MODULOS = `/api${CONTEXT_CONVENIO}/convenio-actual/modulos`
export const URL_GET_MODULOS_AND_INCLUSIONES = `/api${CONTEXT_CONVENIO}/convenio-actual/modulos/export`
export const URL_GET_VERSIONAR_CONVENIO = `/api${CONTEXT_CONVENIO}/convenio/versionar`
export const URL_IS_IN_CONVENIO = `/api${CONTEXT_CONVENIO}/convenio-actual/inclusiones`
export const FETCH_URL_PRESTACIONES_PREQUIRURGICAS = `/api${CONTEXT_CONVENIO}/convenio-actual/prestaciones-preqx`
export const URL_GET_CONVENIO_HISTORICO = `/api${CONTEXT_CONVENIO}/convenio-historico`
export const URL_GET_PN_HISTORICO = `/api${CONTEXT_CONVENIO}/convenio-historico/prestaciones-nomencladas`
export const URL_GET_PNN_HISTORICO = `/api${CONTEXT_CONVENIO}/convenio-historico/prestaciones-no-nomencladas`
export const URL_GET_PNBU_HISTORICO = `/api${CONTEXT_CONVENIO}/convenio-historico/prestaciones-nbu`
export const URL_GET_MODULOS_HISTORICOS = `/api${CONTEXT_CONVENIO}/convenio-historico/modulos`
export const URL_RESTAURAR_REVISION = `/api${CONTEXT_CONVENIO}/convenio-historico/restaurar-convenio`
export const URL_GET_CONVENIO_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/convenios`
export const URL_GET_PN_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/prestaciones-nomencladas`
export const URL_GET_PNN_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/prestaciones-no-nomencladas`
export const URL_GET_PNBU_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/prestaciones-nbu`
export const URL_GET_MODULOS_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/modulos`
export const URL_DELETE_CONVENIO_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/eliminar-convenio`
export const URL_SAVE_CONVENIO_FUTURO = `/api${CONTEXT_CONVENIO}/convenio-futuro/editar-convenio`
export const URL_IMPORTAR_PN = `/api${CONTEXT_CONVENIO}/importar/prestaciones-nomencladas`
export const URL_IMPORTAR_PNN = `/api${CONTEXT_CONVENIO}/importar/prestaciones-no-nomencladas`
export const URL_IMPORTAR_MODULOS = `/api${CONTEXT_CONVENIO}/importar/modulos`

//WS IMPORTAR EXPORTAR
export const FECTH_URL_EXPORTAR_CONSULTA_GENERICA = `/api${CONTEXT_IMPORTAR}/reporte/excel-generico`
export const FECTH_URL_IMPORTAR_SUBPRESTADORES = `/api${CONTEXT_IMPORTAR}/import/excel/subprestador`
export const FECTH_URL_IMPORTAR_LOCALIDADES = `/api${CONTEXT_IMPORTAR}/import/excel/localidad`
export const FETCH_URL_DESCARGAR_PDF_HISTORICO = `/api${CONTEXT_IMPORTAR}/pdf/descargar/convenio-historico`

//WS DOCUMENTO:
export const FECTH_URL_GET_DENUNCIA_BY_ID = `/api${CONTEXTO_DOCUMENTOS}/denuncias/id`

//WS PERSONA:
export const FECTH_URL_BUSQUEDA_EMPLEADOR = `/api${CONTEXT_PERSONA}/super/findEmpleadorByNameOrCuit`
export const FECTH_URL_BUSQUEDA_EMPLEADOR_TODOS = `/api${CONTEXT_PERSONA}/super/findEmpleadores`

//WS UBICACION:
export const FECTH_URL_LOCALIDADES_SELECT = `/api${CONTEXTO_UBICACION}/localidades/id/provincias`
export const FECTH_URL_PROVINCIAS = `/api${CONTEXTO_UBICACION}/provincias`
export const FECTH_URL_LOCALIDADES = `/api${CONTEXTO_UBICACION}/localidades/provincia`
export const FECTH_URL_CALLE = `/api${CONTEXTO_UBICACION}/localidades/calle`
export const FECTH_URL_CODIGO_POSTAL = `/api${CONTEXTO_UBICACION}/codigopostal`
export const FECTH_URL_CODIGO_POSTAL_CABA = `/api${CONTEXTO_UBICACION}/codigopostal/caba`

//WS CONTACTOS:
export const FECTH_URL_CONTACTOS = `/api${CONTEXT_CONTACTO}/contactos`

//WS NOTIFICACIONES:
export const FECTH_URL_NOTIFICACIONES = `/api${CONTEXT_NOTIFICACIONES}/notificacion/operador/all`
export const FECTH_URL_MARCAR_VISTA_NOTIFICACION = `/api${CONTEXT_NOTIFICACIONES}/notificacion/id/vista`
export const FECTH_URL_ELIMINAR_NOTIFICACION = `/api${CONTEXT_NOTIFICACIONES}/notificacion/id/delete`
export const FECTH_URL_CAMPANA_NOTIFICACIONES = `/api${CONTEXT_NOTIFICACIONES}/notificacion/operador/cantidad`

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
export const FETCH_URL_LISTADO_TIPO_HABITACION_HOTELES = `/api${CONTEXTO_LISTADOS}/hotel/tipo-habitacion`
export const FETCH_URL_ESPECIALIDADES_MEDICAS = `/api${CONTEXTO_LISTADOS}/especialidades-medicas`
export const FETCH_URL_VISIBILIDAD_CONTACTO = `/api${CONTEXTO_LISTADOS}/contacto/tipo-visibilidad`
export const FETCH_URL_PRESTACIONES_CATEGORIAS = `/api${CONTEXTO_LISTADOS}/prestaciones/categorias`
export const FETCH_URL_PRESTACIONES_CATEGORIAS_CONTRATACIONES = `/api${CONTEXTO_LISTADOS}/prestaciones/categorias-contrataciones`
export const FETCH_URL_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES = `/api${CONTEXTO_LISTADOS}/prestaciones/sub-categorias-contrataciones`
export const FETCH_URL_LISTADO_TIPO_SUBPRESTADORES = `/api${CONTEXTO_LISTADOS}/sub-prestador/tipo`
export const FETCH_URL_LISTADO_TIPO_PRESTADOR_SELECT = `/api${CONTEXTO_LISTADOS}/tipo-proveedor`
export const FETCH_URL_CENTROS_MEDICOS_PROPIOS = `/api${CONTEXTO_LISTADOS}/centros-medicos-propios`
export const FETCH_URL_TIPO_PRESTADOR_MEDICO_SELECT = `/api${CONTEXTO_LISTADOS}/tipos-centros-medicos`
export const FETCH_URL_LISTADO_TIPOS_PERSONAS_SELECT = `/api${CONTEXTO_LISTADOS}/tipo-persona`
export const FETCH_URL_LISTADO_TIPOS_CONTACTOS_SELECT = `/api${CONTEXTO_LISTADOS}/tipos-contactos`
export const FETCH_URL_PRESTADOR_MEDICO_TIPOS_SELECT = `/api${CONTEXTO_LISTADOS}/proveedor-centro-medico/tipo`
export const FETCH_URL_LISTADO_ESTADO_SELECT = `/api${CONTEXTO_LISTADOS}/estado`
export const FETCH_URL_LISTADO_PROVINCIA = `/api${CONTEXTO_LISTADOS}/ubicacion/provincia`
export const FETCH_URL_GET_LISTADOS_TIPO_PRESTACION = `/api${CONTEXTO_LISTADOS}/tipo-prestaciones`
export const FETCH_URL_LISTADO_TIPO_VALOR_VIAJE_NEGATIVO = `/api${CONTEXTO_LISTADOS}/convenio-traslado/listado-tipo-valor`
export const FETCH_URL_LISTADO_DESTINO_FRECUENTE = `/api${CONTEXTO_LISTADOS}/convenio-traslado/listado-destino-frecuente`