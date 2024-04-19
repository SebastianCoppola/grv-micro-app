import {
    SET_ESTADO_CIVIL,
    SET_NACIONALIDAD,
    SET_ESTADO_MEDICO,
    SET_ESTADO_SEVERIDAD_DENUNCIA,
    SET_TIPO_SINIESTRO,
    SET_CIRCUNSTANCIA,
    SET_LUGAR_ACCIDENTE,
    SET_PATOLOGIA_TRAZADORA,
    SET_AGENTE_CAUSANTE,
    SET_AGENTE_MATERIAL,
    SET_DIAGNOSTICO_CIE10,
    SET_DIAGNOSTICO_CIE10_2,
    SET_DIAGNOSTICO_CIE10_3,
    SET_OCUPACION,
    SET_EXTRACCIONISTA,
    SET_ZONA_AFECCION,
    SET_ZONA_AFECCION_2,
    SET_ZONA_AFECCION_3,
    SET_NATURALEZA_SINIESTRO,
    SET_NATURALEZA_SINIESTRO_2,
    SET_NATURALEZA_SINIESTRO_3,
    SET_TRAMITADOR,
    SET_TIPO_DNI,
    SET_TAREA,
    SET_SEXO,
    SET_DENUNCIANTE_VIP,
    SET_LOADING_DENUNCIANTE_VIP,
    SET_LOADING_ADD_PERSONAL_VIP,
    SET_PRESENTA_COVID,
    SET_OPERADORES,
    SET_TIPO_VIAJE,
    SET_CODIGO_AMBULANCIA,
    SET_TIPO_TRASLADOS,
    SET_FORMA_ACCIDENTE,
    SET_TIPO_CONTACTO,
    SET_PROCESOS,
    SET_AMBULANCIAS,
    LOADING_AMBULANCIAS,
    SET_ESTADO_INTERNACION,
    SET_PROVEEDOR_TRASLADOS,
    SET_AUDITOR,
    SET_TRAMITADOR_SUGERIR,
    GET_LISTADO_SINIESTROS_MULTIPLES,
    SET_LISTADO_MODALIDAD_TRABAJO,
    SET_PROVINCIAS_SELECT,
    SET_LISTADO_TIPO_PRESTADOR_SELECT,
    SET_LISTADO_ESTADO_SELECT,
    SET_LISTADO_PRESTADOR_MEDICO_TIPOS_SELECT,
    SET_TIPOS_CONTACTOS,
    SET_TIPO_PERSONAS,
    SET_TIPO_HABITACION,
    SET_TIPO_SUBPRESTADOR,
    ERROR_AUTOSUGGEST_AGENTE_MATERIAL,
    ERROR_AUTOSUGGEST_AGENTE_CAUSANTE,
    ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10,
    ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
    ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
    ERROR_AUTOSUGGEST_FORMA_ACCIDENTE,
    ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO,
    ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_2,
    ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_3,
    ERROR_AUTOSUGGEST_ZONA_AFECCION,
    ERROR_AUTOSUGGEST_ZONA_AFECCION_2,
    ERROR_AUTOSUGGEST_ZONA_AFECCION_3,
    ERROR_AUTOSUGGEST_OCUPACION,
    ERROR_AUTOSUGGEST_TAREA,
    ERROR_AUTOSUGGEST_PROVEEDOR_TRASLADO,
    ERROR_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
    LOADING_AUTOSUGGEST_AGENTE_CAUSANTE,
    LOADING_AUTOSUGGEST_AGENTE_MATERIAL,
    LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10,
    LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
    LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
    LOADING_AUTOSUGGEST_FORMA_ACCIDENTE,
    LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO,
    LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_2,
    LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_3,
    LOADING_AUTOSUGGEST_ZONA_AFECCION,
    LOADING_AUTOSUGGEST_ZONA_AFECCION_2,
    LOADING_AUTOSUGGEST_ZONA_AFECCION_3,
    LOADING_AUTOSUGGEST_OCUPACION,
    LOADING_AUTOSUGGEST_TAREA,
    LOADING_AUTOSUGGEST_PROVEEDOR_TRASLADO,
    LOADING_SINIESTROS_MULTIPLES_TABLE,
    LOADING_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
    SET_ESTADO_TRASLADO,
    SET_ESTADO_CONSULTAS_Y_RECLAMOS,
    LISTAR_PROVINCIAS,
    LISTAR_PRIMERA_ASISTENCIA,
    LISTAR_PRESTADOR,
    LISTAR_CLIENTES,
    SET_TIPO_CONTACTOS_SELECT,
    LISTAR_TIPO_PRESTADOR_MEDICO,
    LISTAR_CENTROS_MEDICOS_PROPIOS,
    SET_ESPECIALIDADES_MEDICAS,
    SET_VISIBILIDAD_CONTACTO,
    GET_PRESTACIONES_CATEGORIAS,
    GET_PRESTACIONES_CATEGORIAS_CONTRATACIONES,
    GET_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES,
    SET_TIPOS_SOLICITUDES_GENERICAS,
    SET_AREA_GESTION,
    SET_ESTADOS_SOLICITUDES_GENERICA,
    SET_ESTADOS_RESPUESTA_MAS_INFO,
    SET_LISTADOS_PROVINCIA_VALORES_PREDETERMINADOS,
    SET_LISTADOS_ESTADOS_VALORES_PREDETERMINADOS,
    SET_LISTASDOS_MOTIVOS_VALORES_PREDETERMINADOS,
    SET_LISTADO_INDICADORES_SINIESTROS,
    SET_LOADING_LISTADO_INDICADORES_SINIESTROS,
    SET_LISTADO_TIPOS_TURNOS,
    SET_LISTADO_TRAMITADORES_POR_AUDITOR,
    SET_LISTADO_EMPLEADORES_POR_AUDITOR,
    SET_DATA_LISTADO_MATERIALES_QX,
    SET_LOADING_LISTADO_MATERIALES_QX,
    SET_ERROR_LISTADO_MATERIALES_QX,
    SET_DATA_LISTADO_REGION_PATOLOGICA,
    SET_LOADING_LISTADO_REGION_PATOLOGICA,
    SET_LISTADO_SEVERIDAD,
    SET_LISTADO_CAUSA_ILT,
    SET_LISTADO_SUB_CAUSA_ILT,
    SET_DATA_LISTADO_ESTADOS_CIRUGIAS,
    SET_LOADING_LISTADO_ESTADOS_CIRUGIAS,
    SET_DATA_LISTADO_MOTIVOS_ANULACION_CIRUGIAS,
    SET_LOADING_LISTADO_MOTIVOS_ANULACION_CIRUGIAS,
    SET_DATA_TIPO_VALOR_VIAJE_NEGATIVO,
    LOADING_DATA_TIPOS_VALOR_VIAJE_NEGATIVO,
    SET_DATA_LISTADO_DESTINOS_FRECUENTES,
    LOADING_LISTADO_DESTINOS_FRECUENTES
} from '../actionTypes'

const initialState = {
    estadoCivil: [],
    nacionalidad: [],
    estadoMedico: [],
    severidadDenuncia: [],
    tipoSiniestro: [],
    circunstancia: [],
    lugarAccidente: [],
    patologiaTrazadora: [],
    agenteCausante: [],
    agenteMaterial: [],
    diagnosticoCIE10: [],
    diagnosticoCIE10_2: [],
    diagnosticoCIE10_3: [],
    ocupacion: [],
    tarea: [],
    extraccionista: [],
    zonaAfeccion: [],
    zonaAfeccion_2: [],
    zonaAfeccion_3: [],
    naturalezaSiniestro: [],
    naturalezaSiniestro_2: [],
    naturalezaSiniestro_3: [],
    tramitador: [],
    tramitadorSugerido: null,
    auditor: null,
    tipoDNI: [],
    sexo: [],
    prestador: null,
    presentaCovid: null,
    denuncianteVIP: [],
    loadingDenuncianteVIP: false,
    loadingAddPersonalVIP: false,
    operadores: [],
    tipoTraslados: [],
    tipoViaje: [],
    codigoAmbulancia: [],
    formaAccidente: [],
    tipoContacto: [],
    procesos: null,
    provincias: null,
    ambulancias: [],
    loadingAmbulancias: false,
    estadoInternacion: [],
    proveedorServicios: [],
    estadoTraslado: [],
    estadoConsultasYReclamos: [],
    listadoSiniestroMultiples: [],
    listadoModalidadTrabajo: [],
    provinciaSelect: null,
    tipoPrestadorSelect: null,
    estadoSelect: null,
    prestadorMedicoTipos: null,
    tiposContactos: [],
    tipoPersonas: [],
    tiposContactosSelect: [],
    tiposPrestadorMedicos: [],
    centrosMedicosPropios: [],
    especialidadesMedicas: [],
    tipoHabitacion: [],
    tipoSubprestador: [],
    tipoVisibilidad: [],
    tipoHabitacion: [],
    prestacionesCategorias: [],
    prestacionesCategoriasContrataciones: [],
    prestacionesSubCategoriasContrataciones: [],
    errorAutosuggestAgenteMaterial: false,
    errorAutosuggestAgenteCausante: false,
    errorAutosuggestDiagnosticoCIE10: false,
    errorAutosuggestDiagnosticoCIE10_2: false,
    errorAutosuggestDiagnosticoCIE10_3: false,
    errorAutosuggestFormaAccidente: false,
    errorAutosuggestNaturalezaSiniestro: false,
    errorAutosuggestNaturalezaSiniestro_2: false,
    errorAutosuggestNaturalezaSiniestro_3: false,
    errorAutosuggestZonaAfeccion: false,
    errorAutosuggestZonaAfeccion_2: false,
    errorAutosuggestZonaAfeccion_3: false,
    errorAutosuggestOcupacion: false,
    errorAutosuggestTarea: false,
    errorAutosuggestProveedorTraslado: false,
    errorAutosuggestEspecialidadMedica: false,
    clientes: null,
    loadingAutosuggestAgenteCausante: false,
    loadingAutosuggestAgenteMaterial: false,
    loadingAutosuggestDiagnosticoCIE10: false,
    loadingAutosuggestDiagnosticoCIE10_2: false,
    loadingAutosuggestDiagnosticoCIE10_3: false,
    loadingAutosuggestFormaAccidente: false,
    loadingAutosuggestNaturalezaSiniestro: false,
    loadingAutosuggestNaturalezaSiniestro_2: false,
    loadingAutosuggestNaturalezaSiniestro_3: false,
    loadingAutosuggestZonaAfeccion: false,
    loadingAutosuggestZonaAfeccion_2: false,
    loadingAutosuggestZonaAfeccion_3: false,
    loadingAutosuggestOcupacion: false,
    loadingAutosuggestTarea: false,
    loadingAutosuggestProveedorTraslado: false,
    loadingSiniestrosMultiplesTable: false,
    loadingAutosuggestEspecialidadMedica: false,
    primeraAsistencia: null,
    tiposSolicitudesGenericas: null,
    areaGestionSolicitudes: null,
    estadoSolicitudesGenericas: null,
    estadosRespuestaMasInfo: null,
    estadoValoresPredeterminado: null,
    motivosValoresPredeterminados: null,
    provinciasValoresPredeterminados: null,
    listadoIndicadoresSiniestro: [],
    loadingListadoIndicadoresSiniestro: false,
    listadoTiposTurnos: null,
    listadoEmpleadoresPorAuditor: null,
    listadoTramitadoresPorAuditor: null,
    listadoMaterialesQx: null,
    loadingListadoMaterialesQx: false,
    errorListadoMaterialesQx: false,
    dataListadoRegionPatologica: [],
    loadingListadoRegionPatologica: false,
    severidad: [],
    causaILT: [],
    subCausaILT: [],
    dataListadoEstadosCirugias: [],
    loadingListadoEstadosCirugias: false,
    dataListadoMotivosAnulacionCirugias: [],
    loadingListadoMotivosAnulacionCirugias: false,
    tipoValorViajeNegativo:[],
    listadoDestinoFrecuentes:[],
    loadingDataTipoValorViajeNegativo:false,
    loadingListadoDestinosFrecuentes: false
}

const listados = (state = initialState, action) => {
    switch (action.type) {
        case SET_ESTADO_CIVIL:
            return {
                ...state,
                estadoCivil: action.payload
            }
            break;
        case SET_NACIONALIDAD:
            return {
                ...state,
                nacionalidad: action.payload
            }
            break;
        case SET_ESTADO_MEDICO:
            return {
                ...state,
                estadoMedico: action.payload
            }
            break;
        case SET_ESTADO_SEVERIDAD_DENUNCIA:
            return {
                ...state,
                severidadDenuncia: action.payload
            }
            break;

        case SET_TIPO_SINIESTRO:
            return {
                ...state,
                tipoSiniestro: action.payload
            }
            break;
        case SET_CIRCUNSTANCIA:
            return {
                ...state,
                circunstancia: action.payload
            }
            break;
        case SET_LUGAR_ACCIDENTE:
            return {
                ...state,
                lugarAccidente: action.payload
            }
            break;
        case SET_PATOLOGIA_TRAZADORA:
            return {
                ...state,
                patologiaTrazadora: action.payload
            }
            break;
        case SET_AGENTE_CAUSANTE:
            return {
                ...state,
                agenteCausante: action.payload
            }
            break;
        case SET_AGENTE_MATERIAL:
            return {
                ...state,
                agenteMaterial: action.payload
            }
            break;
        case SET_DIAGNOSTICO_CIE10:
            return {
                ...state,
                diagnosticoCIE10: action.payload
            }
            break;
        case SET_DIAGNOSTICO_CIE10_2:
            return {
                ...state,
                diagnosticoCIE10_2: action.payload
            }
            break;
        case SET_DIAGNOSTICO_CIE10_3:
            return {
                ...state,
                diagnosticoCIE10_3: action.payload
            }
            break;
        case SET_OCUPACION:
            return {
                ...state,
                ocupacion: action.payload
            }
            break;
        case SET_TAREA:
            return {
                ...state,
                tarea: action.payload
            }
            break;
        case SET_EXTRACCIONISTA:
            return {
                ...state,
                extraccionista: action.payload
            }
            break;
        case SET_ZONA_AFECCION:
            return {
                ...state,
                zonaAfeccion: action.payload
            }
            break;
        case SET_ZONA_AFECCION_2:
            return {
                ...state,
                zonaAfeccion_2: action.payload
            }
            break;
        case SET_ZONA_AFECCION_3:
            return {
                ...state,
                zonaAfeccion_3: action.payload
            }
            break;
        case SET_NATURALEZA_SINIESTRO:
            return {
                ...state,
                naturalezaSiniestro: action.payload
            }
            break;
        case SET_NATURALEZA_SINIESTRO_2:
            return {
                ...state,
                naturalezaSiniestro_2: action.payload
            }
            break;
        case SET_NATURALEZA_SINIESTRO_3:
            return {
                ...state,
                naturalezaSiniestro_3: action.payload
            }
            break;
        case SET_TRAMITADOR:
            return {
                ...state,
                tramitador: action.payload
            }
            break;
        case SET_TRAMITADOR_SUGERIR:
            return {
                ...state,
                tramitadorSugerido: action.payload
            }
            break;
        case SET_AUDITOR:
            return {
                ...state,
                auditor: action.payload
            }
            break;
        case SET_TIPO_DNI:
            return {
                ...state,
                tipoDNI: action.payload
            }
            break;
        case SET_SEXO:
            return {
                ...state,
                sexo: action.payload
            }
            break;
        case SET_LISTADO_MODALIDAD_TRABAJO:
            return {
                ...state,
                listadoModalidadTrabajo: action.payload
            }
            break;
        case SET_DENUNCIANTE_VIP:
            return {
                ...state,
                denuncianteVIP: action.payload
            }
            break;
        case SET_LOADING_DENUNCIANTE_VIP:
            return {
                ...state,
                loadingDenuncianteVIP: action.payload
            }
            break;
        case SET_LOADING_ADD_PERSONAL_VIP:
            return {
                ...state,
                loadingAddPersonalVIP: action.payload
            }
            break;
        case SET_PRESENTA_COVID:
            return {
                ...state,
                presentaCovid: action.payload
            }
            break;
        case SET_OPERADORES:
            return {
                ...state,
                operadores: action.payload
            }
            break;
        case SET_TIPO_TRASLADOS:
            return {
                ...state,
                tipoTraslados: action.payload
            }
            break;
        case SET_TIPO_VIAJE:
            return {
                ...state,
                tipoViaje: action.payload
            }
            break;
        case SET_CODIGO_AMBULANCIA:
            return {
                ...state,
                codigoAmbulancia: action.payload
            }
            break;
        case SET_FORMA_ACCIDENTE:
            return {
                ...state,
                formaAccidente: action.payload
            }
            break;
        case SET_TIPO_CONTACTO:
            return {
                ...state,
                tipoContacto: action.payload
            }
            break;
        case SET_PROCESOS:
            return {
                ...state,
                procesos: action.payload
            }
            break;
        case SET_AMBULANCIAS:
            return {
                ...state,
                ambulancias: action.payload
            }
            break;
        case LOADING_AMBULANCIAS:
            return {
                ...state,
                loadingAmbulancias: action.payload
            }
            break;
        case SET_ESTADO_INTERNACION:
            return {
                ...state,
                estadoInternacion: action.payload
            }
            break;
        case SET_PROVEEDOR_TRASLADOS:
            return {
                ...state,
                proveedorServicios: action.payload
            }
            break;

        case SET_PROVINCIAS_SELECT:
            return {
                ...state,
                provinciaSelect: action.payload
            }
            break;

        case SET_LISTADO_TIPO_PRESTADOR_SELECT:
            return {
                ...state,
                tipoPrestadorSelect: action.payload
            }
            break;
        case SET_LISTADO_ESTADO_SELECT:
            return {
                ...state,
                estadoSelect: action.payload
            }
            break;
        case SET_LISTADO_PRESTADOR_MEDICO_TIPOS_SELECT:
            return {
                ...state,
                prestadorMedicoTipos: action.payload
            }
            break;
        case SET_TIPOS_CONTACTOS:
            return {
                ...state,
                tiposContactos: action.payload
            }
        case SET_TIPO_PERSONAS:
            return {
                ...state,
                tipoPersonas: action.payload
            }

        case ERROR_AUTOSUGGEST_AGENTE_MATERIAL:
            return {
                ...state,
                errorAutosuggestAgenteMaterial: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_AGENTE_CAUSANTE:
            return {
                ...state,
                errorAutosuggestAgenteCausante: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10:
            return {
                ...state,
                errorAutosuggestDiagnosticoCIE10: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_2:
            return {
                ...state,
                errorAutosuggestDiagnosticoCIE10_2: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_3:
            return {
                ...state,
                errorAutosuggestDiagnosticoCIE10_3: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_FORMA_ACCIDENTE:
            return {
                ...state,
                errorAutosuggestFormaAccidente: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO:
            return {
                ...state,
                errorAutosuggestNaturalezaSiniestro: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_2:
            return {
                ...state,
                errorAutosuggestNaturalezaSiniestro_2: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_3:
            return {
                ...state,
                errorAutosuggestNaturalezaSiniestro_3: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_ZONA_AFECCION:
            return {
                ...state,
                errorAutosuggestZonaAfeccion: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_ZONA_AFECCION_2:
            return {
                ...state,
                errorAutosuggestZonaAfeccion_2: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_ZONA_AFECCION_3:
            return {
                ...state,
                errorAutosuggestZonaAfeccion_3: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_OCUPACION:
            return {
                ...state,
                errorAutosuggestOcupacion: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_TAREA:
            return {
                ...state,
                errorAutosuggestTarea: action.payload
            }
            break
        case ERROR_AUTOSUGGEST_PROVEEDOR_TRASLADO:
            return {
                ...state,
                errorAutosuggestProveedorTraslado: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_ESPECIALIDAD_MEDICA:
            return {
                ...state,
                errorAutosuggestEspecialidadMedica: action.payload
            }


        case LOADING_AUTOSUGGEST_AGENTE_CAUSANTE:
            return {
                ...state,
                loadingAutosuggestAgenteCausante: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_AGENTE_MATERIAL:
            return {
                ...state,
                loadingAutosuggestAgenteMaterial: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10:
            return {
                ...state,
                loadingAutosuggestDiagnosticoCIE10: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_2:
            return {
                ...state,
                loadingAutosuggestDiagnosticoCIE10_2: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_3:
            return {
                ...state,
                loadingAutosuggestDiagnosticoCIE10_3: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_FORMA_ACCIDENTE:
            return {
                ...state,
                loadingAutosuggestFormaAccidente: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO:
            return {
                ...state,
                loadingAutosuggestNaturalezaSiniestro: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_2:
            return {
                ...state,
                loadingAutosuggestNaturalezaSiniestro_2: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_3:
            return {
                ...state,
                loadingAutosuggestNaturalezaSiniestro_3: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_ZONA_AFECCION:
            return {
                ...state,
                loadingAutosuggestZonaAfeccion: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_ZONA_AFECCION_2:
            return {
                ...state,
                loadingAutosuggestZonaAfeccion_2: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_ZONA_AFECCION_3:
            return {
                ...state,
                loadingAutosuggestZonaAfeccion_3: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_OCUPACION:
            return {
                ...state,
                loadingAutosuggestOcupacion: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_TAREA:
            return {
                ...state,
                loadingAutosuggestTarea: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_PROVEEDOR_TRASLADO:
            return {
                ...state,
                loadingAutosuggestProveedorTraslado: action.payload
            }
            break;
        case LOADING_SINIESTROS_MULTIPLES_TABLE:
            return {
                ...state,
                loadingSiniestrosMultiplesTable: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_ESPECIALIDAD_MEDICA:
            return {
                ...state,
                loadingAutosuggestEspecialidadMedica: action.payload
            }

        case SET_ESTADO_TRASLADO:
            return {
                ...state,
                estadoTraslado: action.payload
            }
            break;
        case SET_ESTADO_CONSULTAS_Y_RECLAMOS:
            return {
                ...state,
                estadoConsultasYReclamos: action.payload
            }
            break;
        case GET_LISTADO_SINIESTROS_MULTIPLES:
            return {
                ...state,
                listadoSiniestroMultiples: action.payload
            }
            break;
        case LISTAR_PROVINCIAS:
            return {
                ...state,
                provincias: action.payload
            }
        case LISTAR_PRESTADOR:
            return {
                ...state,
                prestador: action.payload
            }
        case LISTAR_CLIENTES:
            return {
                ...state,
                clientes: action.payload
            }
        case LISTAR_PRIMERA_ASISTENCIA:
            return {
                ...state,
                primeraAsistencia: action.payload
            }
        case SET_TIPO_CONTACTOS_SELECT:
            return {
                ...state,
                tiposContactosSelect: action.payload
            }
        case LISTAR_TIPO_PRESTADOR_MEDICO:
            return {
                ...state,
                tiposPrestadorMedicos: action.payload
            }
        case LISTAR_CENTROS_MEDICOS_PROPIOS:
            return {
                ...state,
                centrosMedicosPropios: action.payload
            }
        case SET_ESPECIALIDADES_MEDICAS:
            return {
                ...state,
                especialidadesMedicas: action.payload
            }
        case SET_TIPO_HABITACION:
            return {
                ...state,
                tipoHabitacion: action.payload
            }
        case SET_TIPO_SUBPRESTADOR:
            return {
                ...state,
                tipoSubprestador: action.payload
            }
        case LISTAR_PROVINCIAS:
            return {
                ...state,
                provincias: action.payload
            }
        case LISTAR_PRESTADOR:
            return {
                ...state,
                prestador: action.payload
            }
        case LISTAR_CLIENTES:
            return {
                ...state,
                clientes: action.payload
            }
        case LISTAR_PRIMERA_ASISTENCIA:
            return {
                ...state,
                primeraAsistencia: action.payload
            }
        case SET_TIPO_CONTACTOS_SELECT:
            return {
                ...state,
                tiposContactosSelect: action.payload
            }
        case LISTAR_TIPO_PRESTADOR_MEDICO:
            return {
                ...state,
                tiposPrestadorMedicos: action.payload
            }
        case LISTAR_CENTROS_MEDICOS_PROPIOS:
            return {
                ...state,
                centrosMedicosPropios: action.payload
            }
        case SET_ESPECIALIDADES_MEDICAS:
            return {
                ...state,
                especialidadesMedicas: action.payload
            }
        case SET_VISIBILIDAD_CONTACTO:
            return {
                ...state,
                tipoVisibilidad: action.payload
            }
        case SET_TIPO_HABITACION:
            return {
                ...state,
                tipoHabitacion: action.payload
            }
        case GET_PRESTACIONES_CATEGORIAS:
            return {
                ...state,
                prestacionesCategorias: action.payload
            }
        case GET_PRESTACIONES_CATEGORIAS_CONTRATACIONES:
            return {
                ...state,
                prestacionesCategoriasContrataciones: action.payload
            }
        case GET_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES:
            return {
                ...state,
                prestacionesSubCategoriasContrataciones: action.payload
            }
        case SET_TIPOS_SOLICITUDES_GENERICAS:
            return {
                ...state,
                tiposSolicitudesGenericas: action.payload
            }
        case SET_AREA_GESTION:
            return {
                ...state,
                areaGestionSolicitudes: action.payload
            }
        case SET_ESTADOS_SOLICITUDES_GENERICA:
            return {
                ...state,
                estadoSolicitudesGenericas: action.payload
            }
        case SET_ESTADOS_RESPUESTA_MAS_INFO:
            return {
                ...state,
                estadosRespuestaMasInfo: action.payload
            }
        case SET_LISTADOS_ESTADOS_VALORES_PREDETERMINADOS:
            return {
                ...state,
                estadoValoresPredeterminado: action.payload
            }
        case SET_LISTADOS_PROVINCIA_VALORES_PREDETERMINADOS:
            return {
                ...state,
                provinciasValoresPredeterminados: action.payload
            }
        case SET_LISTASDOS_MOTIVOS_VALORES_PREDETERMINADOS:
            return {
                ...state,
                motivosValoresPredeterminados: action.payload
            }
        case SET_LISTADO_INDICADORES_SINIESTROS:
            return {
                ...state,
                listadoIndicadoresSiniestro: action.payload
            }
        case SET_LOADING_LISTADO_INDICADORES_SINIESTROS:
            return {
                ...state,
                loadingListadoIndicadoresSiniestro: action.payload
            }
        case SET_LISTADO_TIPOS_TURNOS:
            return {
                ...state,
                listadoTiposTurnos: action.payload
            }
        case SET_LISTADO_EMPLEADORES_POR_AUDITOR:
            return {
                ...state,
                listadoEmpleadoresPorAuditor: action.payload
            }
        case SET_LISTADO_TRAMITADORES_POR_AUDITOR:
            return {
                ...state,
                listadoTramitadoresPorAuditor: action.payload
            }
        case SET_DATA_LISTADO_MATERIALES_QX:
            return {
                ...state,
                listadoMaterialesQx: action.payload
            }
        case SET_LOADING_LISTADO_MATERIALES_QX:
            return {
                ...state,
                loadingListadoMaterialesQx: action.payload
            }
        case SET_ERROR_LISTADO_MATERIALES_QX:
            return {
                ...state,
                errorListadoMaterialesQx: action.payload
            }
        case SET_DATA_LISTADO_REGION_PATOLOGICA:
            return {
                ...state,
                dataListadoRegionPatologica: action.payload
            }
        case SET_LOADING_LISTADO_REGION_PATOLOGICA:
            return {
                ...state,
                loadingListadoRegionPatologica: action.payload
            }
        case SET_LISTADO_SEVERIDAD:
            return {
                ...state,
                severidad: action.payload
            }
        case SET_LISTADO_CAUSA_ILT:
            return {
                ...state,
                causaILT: action.payload
            }
        case SET_LISTADO_SUB_CAUSA_ILT:
            return {
                ...state,
                subCausaILT: action.payload
            }
        case SET_DATA_LISTADO_ESTADOS_CIRUGIAS: 
            return {
                ...state,
                dataListadoEstadosCirugias: action.payload
            }
        case SET_LOADING_LISTADO_ESTADOS_CIRUGIAS: 
            return {
                ...state,
                loadingListadoEstadosCirugias: action.payload
            }    
        case SET_DATA_LISTADO_MOTIVOS_ANULACION_CIRUGIAS: 
            return {
                ...state,
                dataListadoMotivosAnulacionCirugias: action.payload
            }
        case SET_LOADING_LISTADO_MOTIVOS_ANULACION_CIRUGIAS: 
            return {
                ...state,
                loadingListadoMotivosAnulacionCirugias: action.payload
            }
        case SET_DATA_TIPO_VALOR_VIAJE_NEGATIVO:
            return{
                ...state,
                tipoValorViajeNegativo: action.payload
            }
        case SET_DATA_LISTADO_DESTINOS_FRECUENTES:
            return{
                ...state,
                listadoDestinoFrecuentes:action.payload
            }
        case LOADING_DATA_TIPOS_VALOR_VIAJE_NEGATIVO:
            return{
                ...state,
                loadingDataTipoValorViajeNegativo:action.payload
            }
        case LOADING_LISTADO_DESTINOS_FRECUENTES:
            return{
                ...state,
                loadingListadoDestinosFrecuentes: action.payload
            }    
        default:
            return state;
    }
}
export default listados
