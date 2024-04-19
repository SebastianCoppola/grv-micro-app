import {
  SET_ZONA_AFECCION,
  SET_ZONA_AFECCION_2,
  SET_ZONA_AFECCION_3,
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
  SET_OCUPACION,
  SET_EXTRACCIONISTA,
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
  SET_TIPO_TRASLADOS,
  SET_TIPO_VIAJE,
  SET_CODIGO_AMBULANCIA,
  SET_FORMA_ACCIDENTE,
  SET_PROCESOS,
  SET_TIPO_CONTACTO,
  SET_AMBULANCIAS,
  LOADING_AMBULANCIAS,
  SET_ESTADO_INTERNACION,
  SET_PROVEEDOR_TRASLADOS,
  SET_AUDITOR,
  SET_TRAMITADOR_SUGERIR,
  SET_ESTADO_CONSULTAS_Y_RECLAMOS,
  SET_DIAGNOSTICO_CIE10_2,
  SET_DIAGNOSTICO_CIE10_3,
  GET_LISTADO_SINIESTROS_MULTIPLES,
  SET_LISTADO_MODALIDAD_TRABAJO,
  SET_PROVINCIAS_SELECT,
  SET_LISTADO_TIPO_PRESTADOR_SELECT,
  SET_LISTADO_ESTADO_SELECT,
  SET_LISTADO_PRESTADOR_MEDICO_TIPOS_SELECT,
  SET_TIPOS_CONTACTOS,
  SET_TIPO_PERSONAS,
  SET_TIPO_CONTACTOS_SELECT,
  SET_TIPO_HABITACION,
  SET_TIPO_SUBPRESTADOR,
  SET_LISTADOS_ESTADOS_VALORES_PREDETERMINADOS,
  SET_LISTADOS_PROVINCIA_VALORES_PREDETERMINADOS,
  SET_LISTASDOS_MOTIVOS_VALORES_PREDETERMINADOS,
  SET_ESTADOS_RESPUESTA_MAS_INFO,
  SET_LISTADO_INDICADORES_SINIESTROS,
  SET_LOADING_LISTADO_INDICADORES_SINIESTROS,
  ERROR_AUTOSUGGEST_AGENTE_MATERIAL,
  ERROR_AUTOSUGGEST_AGENTE_CAUSANTE,
  ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10,
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
  ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
  ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
  ERROR_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
  LOADING_AUTOSUGGEST_AGENTE_CAUSANTE,
  LOADING_AUTOSUGGEST_AGENTE_MATERIAL,
  LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10,
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
  LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
  LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
  LOADING_SINIESTROS_MULTIPLES_TABLE,
  LOADING_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
  SET_ESTADO_TRASLADO,
  LISTAR_PROVINCIAS,
  LISTAR_PRIMERA_ASISTENCIA,
  LISTAR_PRESTADOR,
  LISTAR_CLIENTES,
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
  SET_LISTADO_TIPOS_TURNOS,
  SET_LISTADO_EMPLEADORES_POR_AUDITOR,
  SET_LISTADO_TRAMITADORES_POR_AUDITOR,
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
  SET_DATA_LISTADO_DESTINOS_FRECUENTES,
  LOADING_DATA_TIPOS_VALOR_VIAJE_NEGATIVO,
  LOADING_LISTADO_DESTINOS_FRECUENTES
} from '../actionTypes';

import {
  FETCH_URL_LISTADO_PRIMERA_ASISTENCIA,
  FECTH_URL_PROVINCIAS_SELECT,
  FETCH_URL_LISTADO_CLIENTES,
  FETCH_URL_LISTADO_PRESTADOR,
  FETCH_URL_LISTADO_MODALIDAD_TRABAJO,
  FETCH_URL_LISTADO_SINIESTRO_MULTIPLE,
  FETCH_URL_ESTADOS_CONSULTAS_Y_RECLAMOS,
  FETCH_URL_TIPO_CONTACTO,
  FETCH_URL_PROCESOS,
  FETCH_URL_AMBULANCIAS,
  FETCH_URL_ESTADO_INTERNACION,
  FETCH_BUSCAR_PROVEEDORES,
  FETCH_URL_ESTADOS_TRASLADO,
  FETCH_URL_DENUNCIANTE_VIP,
  FETCH_URL_FORMA_ACCIDENTE,
  FETCH_URL_CODIGO_AMBULANCIA,
  FETCH_URL_TIPO_VIAJE,
  FETCH_URL_TIPO_TRASLADOS,
  FECTH_URL_OPERADORES,
  FETCH_URL_PRESENTA_COVID,
  FECTH_URL_TRAMITADOR,
  FECTH_URL_TIPO_DNI,
  FETCH_URL_SEXO,
  FETCH_URL_AUDITOR,
  FECTH_URL_NATURALEZA_SINIESTRO,
  FECTH_URL_ZONA_AFECCION,
  FECTH_URL_EXTRACCIONISTA,
  FECTH_URL_OCUPACION,
  FECTH_URL_DIAGNOSTICO_CIE10,
  FECTH_URL_AGENTE_MATERIAL,
  FECTH_URL_AGENTE_CAUSANTE,
  FECTH_URL_PATOLOGIA_TRAZADORA,
  FECTH_URL_LUGAR_ACCIDENTE,
  FECTH_URL_CIRCUNSTANCIA,
  FECTH_URL_TIPO_SINIESTRO,
  FECTH_URL_SEVERIDAD_DENUNCIA,
  FECTH_URL_ESTADO_MEDICO,
  FECTH_URL_NACIONALIDAD,
  FECTH_URL_ESTADO_CIVIL,
} from '../../Urls/callCenter'

import {
  URL_FETCH_LISTADO_TIPO_TURNO,
  URL_FETCH_LISTADO_EMPLEADORES_POR_AUDITOR,
  URL_FETCH_LISTADO_TRAMITADORES_POR_AUDITOR,
  URL_FETCH_LISTADO_MATERIALES_QUIRURGICOS,
  FETCH_URL_GET_LISTADO_TIPO_SOLICITUDES_GENERICAS,
  FETCH_URL_GET_LISTADO_ESTADO_SOLICITUDES_GENERICAS,
  FETCH_URL_GET_LISTADO_AREA_GESTION_SOLICITUDES_GENERICAS,
  URL_FETCH_VALORES_PREDETERMINADOS,
} from '../../Urls/auditoriaMedica'

import {
  FETCH_URL_LISTADO_TIPO_HABITACION_HOTELES,
  FETCH_URL_ESPECIALIDADES_MEDICAS,
  FETCH_URL_VISIBILIDAD_CONTACTO,
  FETCH_URL_PRESTACIONES_CATEGORIAS,
  FETCH_URL_PRESTACIONES_CATEGORIAS_CONTRATACIONES,
  FETCH_URL_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES,
  FETCH_URL_LISTADO_TIPO_SUBPRESTADORES,
  FETCH_URL_LISTADO_TIPO_PRESTADOR_SELECT,
  FETCH_URL_CENTROS_MEDICOS_PROPIOS,
  FETCH_URL_TIPO_PRESTADOR_MEDICO_SELECT,
  FETCH_URL_LISTADO_TIPOS_PERSONAS_SELECT,
  FETCH_URL_LISTADO_TIPOS_CONTACTOS_SELECT,
  FETCH_URL_PRESTADOR_MEDICO_TIPOS_SELECT,
  FETCH_URL_LISTADO_ESTADO_SELECT,
  FETCH_URL_LISTADO_PROVINCIA,
  FETCH_URL_LISTADO_TIPO_VALOR_VIAJE_NEGATIVO,
  FETCH_URL_LISTADO_DESTINO_FRECUENTE
} from '../../Urls/contrataciones'

import {
  URL_FETCH_LISTADO_REGION_PATOLOGICA,
  URL_FETCH_LISTADO_SEVERIDAD,
  URL_FETCH_LISTADO_CAUSA_ILT,
  URL_FETCH_LISTADO_SUB_CAUSA_ILT,
  URL_FETCH_LISTADO_ESTADOS_CIRUGIAS,
  URL_FETCH_LISTADO_MOTIVOS_ANULACION_CIRUGIAS
} from '../../Urls/auditoriaMedica'

import { OCUPACION } from '../../Utils/const'


//Estado Civil:
const setEstadoCivil = (data) => {
  return {
    type: SET_ESTADO_CIVIL,
    payload: data,
  };
}
export const searchEstadoCivil = () => {
  return (dispatch) => {
    fetch(FECTH_URL_ESTADO_CIVIL, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setEstadoCivil(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Nacionalidad:
const setNacionalidad = (data) => {
  return {
    type: SET_NACIONALIDAD,
    payload: data,
  };
}
export const searchNacionalidad = () => {
  return (dispatch) => {
    fetch(FECTH_URL_NACIONALIDAD, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setNacionalidad(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Estado Médico:
const setEstadoMedico = (data) => {
  return {
    type: SET_ESTADO_MEDICO,
    payload: data,
  };
}
export const searchEstadoMedico = () => {
  return (dispatch) => {
    fetch(FECTH_URL_ESTADO_MEDICO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setEstadoMedico(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Tipo Siniestro:
const setTipoSiniestro = (data) => {
  return {
    type: SET_TIPO_SINIESTRO,
    payload: data,
  };
}
export const searchTipoSiniestro = () => {
  return (dispatch) => {
    fetch(FECTH_URL_TIPO_SINIESTRO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoSiniestro(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Severidad Denuncia:
const setSeveridadDenuncia = (data) => {
  return {
    type: SET_ESTADO_SEVERIDAD_DENUNCIA,
    payload: data,
  };
}
export const searchSeveridadDenuncia = () => {
  return (dispatch) => {
    fetch(FECTH_URL_SEVERIDAD_DENUNCIA, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 200) {
            dispatch(setSeveridadDenuncia(data.body));
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Circunstancia:
const setCircunstancia = (data) => {
  return {
    type: SET_CIRCUNSTANCIA,
    payload: data,
  };
}
export const searchCircunstancia = () => {
  return (dispatch) => {
    fetch(FECTH_URL_CIRCUNSTANCIA, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setCircunstancia(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Lugar Accidente:
const setLugarAccidente = (data) => {
  return {
    type: SET_LUGAR_ACCIDENTE,
    payload: data,
  };
}
export const searchLugarAccidente = () => {
  return (dispatch) => {
    fetch(FECTH_URL_LUGAR_ACCIDENTE, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setLugarAccidente(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Patologia Trazadora:
const setPatologiaTrazadora = (data) => {
  return {
    type: SET_PATOLOGIA_TRAZADORA,
    payload: data,
  };
}
export const searchPatologiaTrazadora = () => {
  return (dispatch) => {
    fetch(FECTH_URL_PATOLOGIA_TRAZADORA, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setPatologiaTrazadora(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Agente Causante:
const setAgenteCausante = (data) => {
  return {
    type: SET_AGENTE_CAUSANTE,
    payload: data,
  };
}
const errorAutosuggestAgenteCausante = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_AGENTE_CAUSANTE,
    payload: data,
  };
}
const loadingAutosuggestAgenteCausante = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_AGENTE_CAUSANTE,
    payload: data,
  };
}
export const searchAgenteCausante = (descripcion) => {
  return (dispatch) => {
    dispatch(loadingAutosuggestAgenteCausante(true));
    fetch(FECTH_URL_AGENTE_CAUSANTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setAgenteCausante(data.body));
              dispatch(errorAutosuggestAgenteCausante(false));
              dispatch(loadingAutosuggestAgenteCausante(false));
            } else {
              dispatch(errorAutosuggestAgenteCausante(true));
              dispatch(loadingAutosuggestAgenteCausante(false));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(errorAutosuggestAgenteCausante(true));
            dispatch(loadingAutosuggestAgenteCausante(false));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAutosuggestAgenteCausante(true));
        dispatch(loadingAutosuggestAgenteCausante(false));
      });
  };
}


//Agente Material:
const setAgenteMaterial = (data) => {
  return {
    type: SET_AGENTE_MATERIAL,
    payload: data,
  };
}
const errorAutosuggestAgenteMaterial = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_AGENTE_MATERIAL,
    payload: data,
  };
}
const loadingAutosuggestAgenteMaterial = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_AGENTE_MATERIAL,
    payload: data,
  };
}
export const searchAgenteMaterial = (descripcion) => {
  return (dispatch) => {
    dispatch(loadingAutosuggestAgenteMaterial(true));
    fetch(FECTH_URL_AGENTE_MATERIAL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setAgenteMaterial(data.body));
              dispatch(errorAutosuggestAgenteMaterial(false));
              dispatch(loadingAutosuggestAgenteMaterial(false));
            } else {
              dispatch(errorAutosuggestAgenteMaterial(true));
              dispatch(loadingAutosuggestAgenteMaterial(false));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(errorAutosuggestAgenteMaterial(true));
            dispatch(loadingAutosuggestAgenteMaterial(false));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAutosuggestAgenteMaterial(true));
        dispatch(loadingAutosuggestAgenteMaterial(false));
      });
  };
}


//Diagnóstico CIE10:
const setDiagnosticoCIE10 = (data) => {
  return {
    type: SET_DIAGNOSTICO_CIE10,
    payload: data,
  };
}
const setDiagnosticoCIE103 = (data) => {
  return {
    type: SET_DIAGNOSTICO_CIE10_3,
    payload: data,
  };
}
const setDiagnosticoCIE102 = (data) => {
  return {
    type: SET_DIAGNOSTICO_CIE10_2,
    payload: data,
  };
}
const errorAutosuggestDiagnosticoCIE10 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10,
    payload: data,
  };
}
const errorAutosuggestDiagnostico2 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
    payload: data,
  };
}
const errorAutosuggestDiagnostico3 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
    payload: data,
  };
}
const loadingAutosuggestDiagnosticoCIE10 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10,
    payload: data,
  };
}
const loadingAutosuggestDiagnosticoCIE102 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_2,
    payload: data,
  };
}
const loadingAutosuggestDiagnosticoCIE103 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_DIAGNOSTICO_CIE10_3,
    payload: data,
  };
}
export const searchDiagnosticoCIE10 = (descripcion, tipoBusqueda) => {
  return (dispatch) => {
    if (tipoBusqueda === 1) {
      dispatch(loadingAutosuggestDiagnosticoCIE102(true));
    } else if (tipoBusqueda === 2) {
      dispatch(loadingAutosuggestDiagnosticoCIE103(true));
    } else if (tipoBusqueda === 0) {
      dispatch(loadingAutosuggestDiagnosticoCIE10(true));
    }
    fetch(FECTH_URL_DIAGNOSTICO_CIE10, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestDiagnostico2(false));
                dispatch(loadingAutosuggestDiagnosticoCIE102(false));
                dispatch(setDiagnosticoCIE102(data.body));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestDiagnostico3(false));
                dispatch(loadingAutosuggestDiagnosticoCIE103(false));
                dispatch(setDiagnosticoCIE103(data.body));
              }
              if (tipoBusqueda === 0) {
                dispatch(errorAutosuggestDiagnosticoCIE10(false));
                dispatch(loadingAutosuggestDiagnosticoCIE10(false));
                dispatch(setDiagnosticoCIE10(data.body));
              }
            } else {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestDiagnostico2(true));
                dispatch(loadingAutosuggestDiagnosticoCIE102(false));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestDiagnostico3(true));
                dispatch(loadingAutosuggestDiagnosticoCIE103(false));
              }
              if (tipoBusqueda === 0) {
                dispatch(errorAutosuggestDiagnosticoCIE10(true));
                dispatch(loadingAutosuggestDiagnosticoCIE10(false));
              }
            }
          })
          .catch((err) => {
            if (tipoBusqueda === 1) {
              dispatch(errorAutosuggestDiagnostico2(true));
              dispatch(loadingAutosuggestDiagnosticoCIE102(false));
            } else if (tipoBusqueda === 2) {
              dispatch(errorAutosuggestDiagnostico3(true));
              dispatch(loadingAutosuggestDiagnosticoCIE103(false));
            } else {
              dispatch(errorAutosuggestDiagnosticoCIE10(true));
              dispatch(loadingAutosuggestDiagnosticoCIE10(false));
            }
          });
      })
      .catch((err) => {
        if (tipoBusqueda === 1) {
          dispatch(errorAutosuggestDiagnostico2(true));
          dispatch(loadingAutosuggestDiagnosticoCIE102(false));
        } else if (tipoBusqueda === 2) {
          dispatch(errorAutosuggestDiagnostico3(true));
          dispatch(loadingAutosuggestDiagnosticoCIE103(false));
        } else {
          dispatch(errorAutosuggestDiagnosticoCIE10(true));
          dispatch(loadingAutosuggestDiagnosticoCIE10(false));
        }
      });
  };
}


//Ocupación:
const loadingAutosuggestOcupacion = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_OCUPACION,
    payload: data,
  };
}
const loadingAutosuggestTarea = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_TAREA,
    payload: data,
  };
}
const setOcupacion = (data) => {
  return {
    type: SET_OCUPACION,
    payload: data,
  };
}
const setTarea = (data) => {
  return {
    type: SET_TAREA,
    payload: data,
  };
}
const errorAutosuggestOcupacion = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_OCUPACION,
    payload: data,
  };
}
const errorAutosuggestTarea = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_TAREA,
    payload: data,
  };
}
export const searchOcupacion = (descripcion, tipoBusqueda) => {
  return (dispatch) => {
    if (tipoBusqueda === OCUPACION) {
      dispatch(loadingAutosuggestOcupacion(true));
    } else {
      dispatch(loadingAutosuggestTarea(true));
    }
    fetch(FECTH_URL_OCUPACION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              if (tipoBusqueda === OCUPACION) {
                dispatch(setOcupacion(data.body));
                dispatch(errorAutosuggestOcupacion(false));
                dispatch(loadingAutosuggestOcupacion(false));
              } else {
                dispatch(setTarea(data.body));
                dispatch(errorAutosuggestTarea(false));
                dispatch(loadingAutosuggestTarea(false));
              }
            } else {
              if (tipoBusqueda === OCUPACION) {
                dispatch(errorAutosuggestOcupacion(true));
                dispatch(loadingAutosuggestOcupacion(false));
              } else {
                dispatch(errorAutosuggestTarea(true));
                dispatch(loadingAutosuggestTarea(false));
              }
            }
          })
          .catch((err) => {
            console.log(err);
            if (tipoBusqueda === OCUPACION) {
              dispatch(errorAutosuggestOcupacion(true));
              dispatch(loadingAutosuggestOcupacion(false));
            } else {
              dispatch(errorAutosuggestTarea(true));
              dispatch(loadingAutosuggestTarea(false));
            }
          });
      })
      .catch((err) => {
        console.log(err);
        if (tipoBusqueda === OCUPACION) {
          dispatch(errorAutosuggestOcupacion(true));
          dispatch(loadingAutosuggestOcupacion(false));
        } else {
          dispatch(errorAutosuggestTarea(true));
          dispatch(loadingAutosuggestTarea(false));
        }
      });
  };
}


//Extraccionista:
const setExtraccionista = (data) => {
  return {
    type: SET_EXTRACCIONISTA,
    payload: data,
  };
}
export const searchExtraccionista = () => {
  return (dispatch) => {
    fetch(FECTH_URL_EXTRACCIONISTA, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setExtraccionista(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Zona Afección:
const loadingAutosuggestZonaAfeccion = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_ZONA_AFECCION,
    payload: data,
  };
}
const loadingAutosuggestZonaAfeccion_2 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_ZONA_AFECCION_2,
    payload: data,
  };
}
const loadingAutosuggestZonaAfeccion_3 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_ZONA_AFECCION_3,
    payload: data,
  };
}
const errorAutosuggestZonaAfeccion = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_ZONA_AFECCION,
    payload: data,
  };
}
const errorAutosuggestZonaAfeccion_2 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_ZONA_AFECCION_2,
    payload: data,
  };
}
const errorAutosuggestZonaAfeccion_3 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_ZONA_AFECCION_3,
    payload: data,
  };
}
const setZonaAfeccion = (data) => {
  return {
    type: SET_ZONA_AFECCION,
    payload: data,
  };
}
const setZonaAfeccion_2 = (data) => {
  return {
    type: SET_ZONA_AFECCION_2,
    payload: data,
  };
}
const setZonaAfeccion_3 = (data) => {
  return {
    type: SET_ZONA_AFECCION_3,
    payload: data,
  };
}
export const searchZonaAfeccion = (descripcion, tipoBusqueda) => {
  return (dispatch) => {
    if (tipoBusqueda === 1) {
      dispatch(loadingAutosuggestZonaAfeccion_2(true));
    } else if (tipoBusqueda === 2) {
      dispatch(loadingAutosuggestZonaAfeccion_3(true));
    } else if (tipoBusqueda === 0) {
      dispatch(loadingAutosuggestZonaAfeccion(true));
    }

    fetch(FECTH_URL_ZONA_AFECCION, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestZonaAfeccion_2(false));
                dispatch(loadingAutosuggestZonaAfeccion_2(false));
                dispatch(setZonaAfeccion_2(data.body));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestZonaAfeccion_3(false));
                dispatch(loadingAutosuggestZonaAfeccion_3(false));
                dispatch(setZonaAfeccion_3(data.body));
              }
              if (tipoBusqueda === 0) {
                dispatch(setZonaAfeccion(data.body));
                dispatch(errorAutosuggestZonaAfeccion(false));
                dispatch(loadingAutosuggestZonaAfeccion(false));
              }
            } else {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestZonaAfeccion_2(true));
                dispatch(loadingAutosuggestZonaAfeccion_2(false));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestZonaAfeccion_3(true));
                dispatch(loadingAutosuggestZonaAfeccion_3(false));
              }
              if (tipoBusqueda === 0) {
                dispatch(errorAutosuggestZonaAfeccion(true));
                dispatch(loadingAutosuggestZonaAfeccion(false));
              }
            }
          })
          .catch((err) => {
            if (tipoBusqueda === 1) {
              dispatch(errorAutosuggestZonaAfeccion_2(true));
              dispatch(loadingAutosuggestZonaAfeccion_2(false));
            } else if (tipoBusqueda === 2) {
              dispatch(errorAutosuggestZonaAfeccion_3(true));
              dispatch(loadingAutosuggestZonaAfeccion_3(false));
            } else {
              dispatch(errorAutosuggestZonaAfeccion(true));
              dispatch(loadingAutosuggestZonaAfeccion(false));
            }
          });
      })
      .catch((err) => {
        if (tipoBusqueda === 1) {
          dispatch(errorAutosuggestZonaAfeccion_2(true));
          dispatch(loadingAutosuggestZonaAfeccion_2(false));
        } else if (tipoBusqueda === 2) {
          dispatch(errorAutosuggestZonaAfeccion_3(true));
          dispatch(loadingAutosuggestZonaAfeccion_3(false));
        } else {
          dispatch(errorAutosuggestZonaAfeccion(true));
          dispatch(loadingAutosuggestZonaAfeccion(false));
        }
      });
  };
}


//Naturaleza Siniestro:
const loadingAutosuggestNaturalezaSiniestro = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO,
    payload: data,
  };
}
const loadingAutosuggestNaturalezaSiniestro_2 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_2,
    payload: data,
  };
}
const loadingAutosuggestNaturalezaSiniestro_3 = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_NATURALEZA_SINIESTRO_3,
    payload: data,
  };
}
const errorAutosuggestNaturalezaSiniestro = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO,
    payload: data,
  };
}
const errorAutosuggestNaturalezaSiniestro_2 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_2,
    payload: data,
  };
}
const errorAutosuggestNaturalezaSiniestro_3 = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_NATURALEZA_SINIESTRO_3,
    payload: data,
  };
}
const setNaturalezaSiniestro = (data) => {
  return {
    type: SET_NATURALEZA_SINIESTRO,
    payload: data,
  };
}
const setNaturalezaSiniestro_2 = (data) => {
  return {
    type: SET_NATURALEZA_SINIESTRO_2,
    payload: data,
  };
}
const setNaturalezaSiniestro_3 = (data) => {
  return {
    type: SET_NATURALEZA_SINIESTRO_3,
    payload: data,
  };
}
export const searchNaturalezaSiniestro = (descripcion, tipoBusqueda) => {
  return (dispatch) => {
    if (tipoBusqueda === 1) {
      dispatch(loadingAutosuggestNaturalezaSiniestro_2(true));
    } else if (tipoBusqueda === 2) {
      dispatch(loadingAutosuggestNaturalezaSiniestro_3(true));
    } else if (tipoBusqueda === 0) {
      dispatch(loadingAutosuggestNaturalezaSiniestro(true));
    }

    fetch(FECTH_URL_NATURALEZA_SINIESTRO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: descripcion }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestNaturalezaSiniestro_2(false));
                dispatch(loadingAutosuggestNaturalezaSiniestro_2(false));
                dispatch(setNaturalezaSiniestro_2(data.body));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestNaturalezaSiniestro_3(false));
                dispatch(loadingAutosuggestNaturalezaSiniestro_3(false));
                dispatch(setNaturalezaSiniestro_3(data.body));
              }
              if (tipoBusqueda === 0) {
                dispatch(errorAutosuggestNaturalezaSiniestro(false));
                dispatch(loadingAutosuggestNaturalezaSiniestro(false));
                dispatch(setNaturalezaSiniestro(data.body));
              }
            } else {
              if (tipoBusqueda === 1) {
                dispatch(errorAutosuggestNaturalezaSiniestro_2(true));
                dispatch(loadingAutosuggestNaturalezaSiniestro_2(false));
              }
              if (tipoBusqueda === 2) {
                dispatch(errorAutosuggestNaturalezaSiniestro_3(true));
                dispatch(loadingAutosuggestNaturalezaSiniestro_3(false));
              }
              if (tipoBusqueda === 0) {
                dispatch(errorAutosuggestNaturalezaSiniestro(true));
                dispatch(loadingAutosuggestNaturalezaSiniestro(false));
              }
            }
          })
          .catch((err) => {
            if (tipoBusqueda === 1) {
              dispatch(errorAutosuggestNaturalezaSiniestro_2(true));
              dispatch(loadingAutosuggestNaturalezaSiniestro_2(false));
            } else if (tipoBusqueda === 2) {
              dispatch(errorAutosuggestNaturalezaSiniestro_3(true));
              dispatch(loadingAutosuggestNaturalezaSiniestro_3(false));
            } else {
              dispatch(errorAutosuggestNaturalezaSiniestro(true));
              dispatch(loadingAutosuggestNaturalezaSiniestro(false));
            }
          });
      })
      .catch((err) => {
        if (tipoBusqueda === 1) {
          dispatch(errorAutosuggestNaturalezaSiniestro_2(true));
          dispatch(loadingAutosuggestNaturalezaSiniestro_2(false));
        } else if (tipoBusqueda === 2) {
          dispatch(errorAutosuggestNaturalezaSiniestro_3(true));
          dispatch(loadingAutosuggestNaturalezaSiniestro_3(false));
        } else {
          dispatch(errorAutosuggestNaturalezaSiniestro(true));
          dispatch(loadingAutosuggestNaturalezaSiniestro(false));
        }
      });
  };
}


//Tramitador:
const setTramitador = (data) => {
  return {
    type: SET_TRAMITADOR,
    payload: data,
  };
}
export const searchTramitador = () => {
  return (dispatch) => {
    fetch(FECTH_URL_TRAMITADOR, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTramitador(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Auditor:
export const setAuditor = (data) => {
  return {
    type: SET_AUDITOR,
    payload: data,
  };
}
export const searchAuditor = (codigo, callback) => {
  return (dispatch) => {
    fetch(FETCH_URL_AUDITOR, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: codigo }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data && data.status === 200) {
              dispatch(setAuditor(data.body));
              callback(true, data.body);
            } else {
              dispatch(setAuditor(null));
              callback(true, null);
            }
          })
          .catch((err) => {
            dispatch(setAuditor(null));
            callback(true, null);
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setAuditor(null));
        callback(true, null);
      });
  };
}


//Tipo DNI:
const setTipoDNI = (data) => {
  return {
    type: SET_TIPO_DNI,
    payload: data,
  };
}
export const searchTipoDNI = () => {
  return (dispatch) => {
    fetch(FECTH_URL_TIPO_DNI, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoDNI(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Sexo:
const setSexo = (data) => {
  return {
    type: SET_SEXO,
    payload: data,
  };
}
export const searchSexo = () => {
  return (dispatch) => {
    fetch(FETCH_URL_SEXO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setSexo(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Denuncia VIP:
const setLoadingDenuncianteVIP = (data) => {
  return {
    type: SET_LOADING_DENUNCIANTE_VIP,
    payload: data,
  };
}
const setDenuncianteVIP = (data) => {
  return {
    type: SET_DENUNCIANTE_VIP,
    payload: data,
  };
}
export const searchDenuncianteVIP = (idEmpleador, errorCalback) => {
  return (dispatch) => {
    dispatch(setLoadingDenuncianteVIP(true));
    fetch(FETCH_URL_DENUNCIANTE_VIP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idEmpleador: idEmpleador,
      }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setDenuncianteVIP(data.body))
              if (errorCalback) errorCalback(false)
              dispatch(setLoadingDenuncianteVIP(false))
            } else {
              dispatch(setDenuncianteVIP([]))
              if (errorCalback) errorCalback(true)
              dispatch(setLoadingDenuncianteVIP(false))
            }
          })
          .catch((err) => {
            dispatch(setDenuncianteVIP([]))
            if (errorCalback) errorCalback(true)
            dispatch(setLoadingDenuncianteVIP(false))
          })
      })
      .catch(() => {
        dispatch(setDenuncianteVIP([]))
        if (errorCalback) errorCalback(false)
        dispatch(setLoadingDenuncianteVIP(false))
      });
  };
}

//Presenta COVID:
export const setPresentaCovid = (data) => {
  return {
    type: SET_PRESENTA_COVID,
    payload: data,
  };
}
export const searchPresentaCovid = (fecha) => {
  return (dispatch) => {
    fetch(FETCH_URL_PRESENTA_COVID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fechaOcurrencia: fecha }),
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setPresentaCovid(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Operadores:
const setOperadores = (data) => {
  return {
    type: SET_OPERADORES,
    payload: data,
  };
}
export const serchOperadores = () => {
  return (dispatch) => {
    fetch(FECTH_URL_OPERADORES, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setOperadores(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Tipo traslado:
const setTipoTraslados = (data) => {
  return {
    type: SET_TIPO_TRASLADOS,
    payload: data,
  };
}
export const serchTipoTraslado = () => {
  return (dispatch) => {
    fetch(FETCH_URL_TIPO_TRASLADOS, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoTraslados(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Tipo viaje:
const setTipoViaje = (data) => {
  return {
    type: SET_TIPO_VIAJE,
    payload: data,
  };
}
export const serchTipoViaje = () => {
  return (dispatch) => {
    fetch(FETCH_URL_TIPO_VIAJE, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoViaje(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Codigo Ambulancia:
const setCodigoAmbulancia = (data) => {
  return {
    type: SET_CODIGO_AMBULANCIA,
    payload: data,
  };
}
export const serchCodigoAmbulancia = () => {
  return (dispatch) => {
    fetch(FETCH_URL_CODIGO_AMBULANCIA, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setCodigoAmbulancia(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Forma de accidente:
const setFormaAccidente = (data) => {
  return {
    type: SET_FORMA_ACCIDENTE,
    payload: data,
  };
}
const loadingAutosuggestFormaAccidente = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_FORMA_ACCIDENTE,
    payload: data,
  };
}
const errorAutosuggestFormaAccidente = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_FORMA_ACCIDENTE,
    payload: data,
  };
}
export const searchFormaAccidente = (request) => {
  return (dispatch) => {
    dispatch(loadingAutosuggestFormaAccidente(true));
    fetch(FETCH_URL_FORMA_ACCIDENTE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: request }),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setFormaAccidente(data.body));
              dispatch(errorAutosuggestFormaAccidente(false));
              dispatch(loadingAutosuggestFormaAccidente(false));
            } else {
              dispatch(errorAutosuggestFormaAccidente(true));
              dispatch(loadingAutosuggestFormaAccidente(false));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(errorAutosuggestFormaAccidente(true));
            dispatch(loadingAutosuggestFormaAccidente(false));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAutosuggestFormaAccidente(true));
        dispatch(loadingAutosuggestFormaAccidente(false));
      });
  };
}


//Tipos COntactos Select:
const setTiposContactosSelect = data => {
  return {
    type: SET_TIPO_CONTACTOS_SELECT,
    payload: data
  }
}
export const fetchTiposContactosSelect = () => {
  return dispatch => {
    fetch(FETCH_URL_LISTADO_TIPOS_CONTACTOS_SELECT)
      .then(response => response.json()
        .then(data => {
          dispatch(setTiposContactosSelect(data.body))
        })
        .catch(error => console.log(error))
      )
  }
}


//Tipo Contacto:
const setTipoContacto = (data) => {
  return {
    type: SET_TIPO_CONTACTO,
    payload: data,
  };
}
export const fetchTipoContacto = () => {
  return (dispatch) => {
    fetch(FETCH_URL_TIPO_CONTACTO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoContacto(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Procesos:
const setProcesos = (data) => {
  return {
    type: SET_PROCESOS,
    payload: data,
  };
}
export const fetchProcesos = () => {
  return (dispatch) => {
    fetch(FETCH_URL_PROCESOS, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setProcesos(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Ambulancias:
const setAmbulancias = (data) => {
  return {
    type: SET_AMBULANCIAS,
    payload: data,
  };
}
const loadingAmbulancias = (data) => {
  return {
    type: LOADING_AMBULANCIAS,
    payload: data,
  };
}
export const fetchAmbulancias = (request) => {
  return (dispatch) => {
    dispatch(loadingAmbulancias(true));
    fetch(FETCH_URL_AMBULANCIAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setAmbulancias(data.body));
              dispatch(loadingAmbulancias(false));
            } else {
              dispatch(loadingAmbulancias(false));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(loadingAmbulancias(false));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(loadingAmbulancias(false));
      });
  };
}


//Estado Internaciones:
const setEstadoInternacion = (data) => {
  return {
    type: SET_ESTADO_INTERNACION,
    payload: data,
  };
}
export const searchEstadoInternacion = () => {
  return (dispatch) => {
    fetch(FETCH_URL_ESTADO_INTERNACION, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          if (data.status === 200) {
            dispatch(setEstadoInternacion(data.body));
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Proveedor Traslado: 
const setProveedorTraslados = (data) => {
  return {
    type: SET_PROVEEDOR_TRASLADOS,
    payload: data,
  };
}
const errorAutosuggestProveedorTraslado = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_PROVEEDOR_TRASLADO,
    payload: data,
  };
}
const loadingAutosuggestProveedorTraslado = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_PROVEEDOR_TRASLADO,
    payload: data,
  };
}
export const searchProveedorTraslado = (request) => {
  return (dispatch) => {
    dispatch(loadingAutosuggestProveedorTraslado(true));
    fetch(FETCH_BUSCAR_PROVEEDORES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status === 200) {
              dispatch(setProveedorTraslados(data.body.objetos));
              dispatch(errorAutosuggestProveedorTraslado(false));
              dispatch(loadingAutosuggestProveedorTraslado(false));
            } else {
              dispatch(errorAutosuggestProveedorTraslado(true));
              dispatch(loadingAutosuggestProveedorTraslado(false));
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch(errorAutosuggestProveedorTraslado(true));
            dispatch(loadingAutosuggestProveedorTraslado(false));
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch(errorAutosuggestProveedorTraslado(true));
        dispatch(loadingAutosuggestProveedorTraslado(false));
      });
  };
}


//Estados Traslados: 
const setEstadoTraslado = (data) => {
  return {
    type: SET_ESTADO_TRASLADO,
    payload: data,
  };
}
export const serchEstadosTraslado = () => {
  return (dispatch) => {
    fetch(FETCH_URL_ESTADOS_TRASLADO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setEstadoTraslado(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Estado Consultas y Reclamos:
const setEstadoConsultasYReclamos = (data) => {
  return {
    type: SET_ESTADO_CONSULTAS_Y_RECLAMOS,
    payload: data,
  };
}
export const serchEstadosConsultasYReclamos = () => {
  return (dispatch) => {
    fetch(FETCH_URL_ESTADOS_CONSULTAS_Y_RECLAMOS, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setEstadoConsultasYReclamos(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Siniestro Múltiple:
const getListadoSiniestroMultiples = (data) => {
  return {
    type: GET_LISTADO_SINIESTROS_MULTIPLES,
    payload: data,
  };
}
const loadingSiniestrosMultiplesTable = (data) => {
  return {
    type: LOADING_SINIESTROS_MULTIPLES_TABLE,
    payload: data,
  };
}
export const searchSiniestrosMultiples = (request) => {
  return (dispatch) => {
    dispatch(loadingSiniestrosMultiplesTable(true));
    fetch(FETCH_URL_LISTADO_SINIESTRO_MULTIPLE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    })
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.status == 200) {
              dispatch(loadingSiniestrosMultiplesTable(false));
              dispatch(getListadoSiniestroMultiples(data.body));
            } else {
              dispatch(getListadoSiniestroMultiples([]));
              dispatch(loadingSiniestrosMultiplesTable(false));
            }
          })
          .catch((error) => {
            dispatch(getListadoSiniestroMultiples([]));
            dispatch(loadingSiniestrosMultiplesTable(false));
          });
      })
      .catch((err) => {
        dispatch(getListadoSiniestroMultiples([]));
        dispatch(loadingSiniestrosMultiplesTable(false));
        console.log(err);
      });
  };
}


//Modalidad Trabajo: 
const setListadoModalidadTrabajo = (data) => {
  return {
    type: SET_LISTADO_MODALIDAD_TRABAJO,
    payload: data
  }
}
export const getListadoModalidadTrabajo = () => {
  return (dispatch) => {
    fetch(FETCH_URL_LISTADO_MODALIDAD_TRABAJO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setListadoModalidadTrabajo(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


//Provincias:
const setListarProvincias = (data) => {
  return {
    type: LISTAR_PROVINCIAS,
    payload: data
  }
}
export const listarProvincias = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(FETCH_URL_LISTADO_PROVINCIA)
      const data = await res.json()
      dispatch(setListarProvincias(data.body))
    } catch (err) {
      console.log(err)
    }
  }
}


//Prestadores:
const setListarPrestador = (data) => {
  return {
    type: LISTAR_PRESTADOR,
    payload: data
  }
}
export const listarPrestador = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(FETCH_URL_LISTADO_PRESTADOR)
      const data = await res.json()
      dispatch(setListarPrestador(data.body))
    } catch (err) {
      console.log(err)
    }
  }
}


//Clientes:
const setListarClientes = (data) => {
  return {
    type: LISTAR_CLIENTES,
    payload: data
  }
}
export const listarClientes = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(FETCH_URL_LISTADO_CLIENTES)
      const data = await res.json()
      dispatch(setListarClientes(data.body))
    } catch (err) {
      console.log(err)
    }
  }
}


//Primera Asistencia:
const setListarPrimeraAsistencia = (data) => {
  return {
    type: LISTAR_PRIMERA_ASISTENCIA,
    payload: data
  }
}
export const listarPrimeraAsistencia = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(FETCH_URL_LISTADO_PRIMERA_ASISTENCIA)
      const data = await res.json()
      dispatch(setListarPrimeraAsistencia(data.body))
    } catch (err) {
      console.log(err)
    }
  }
}


//Provincia Select:
const setListadoProvinciaSelect = (data) => {
  return {
    type: SET_PROVINCIAS_SELECT,
    payload: data
  }
}
export const getListadoProvinciaSelect = () => {
  return dispatch => {
    fetch(FECTH_URL_PROVINCIAS_SELECT, {
      method: 'GET'
    })
      .then((response) => {
        response.json()
          .then(data => {
            dispatch(setListadoProvinciaSelect(data.body))
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Tipo Prestador Select:
const setListadoTipoPrestadorSelect = (data) => {
  let list = []
  for (var i in data) {
    let clone = {
      ...data[i],
      seleccionado: false
    }
    list.push(clone);
  }
  return {
    type: SET_LISTADO_TIPO_PRESTADOR_SELECT,
    payload: list
  }
}
export const getListadoTipoPrestadorSelect = () => {
  return dispatch => {
    fetch(FETCH_URL_LISTADO_TIPO_PRESTADOR_SELECT, {
      method: 'GET'
    })
      .then((response) => {
        response.json()
          .then(data => {
            dispatch(setListadoTipoPrestadorSelect(data.body))
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Estado tipo Select:
const setListadoEstadoSelect = (data) => {
  return {
    type: SET_LISTADO_ESTADO_SELECT,
    payload: data
  }
}
export const getListadoEstadoSelect = () => {
  return dispatch => {
    fetch(FETCH_URL_LISTADO_ESTADO_SELECT, {
      method: 'GET'
    })
      .then((response) => {
        response.json()
          .then(data => {
            dispatch(setListadoEstadoSelect(data.body))
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Prestador Medico tipo Select:
const setListadoPrestadorMedicoTiposSelect = (data) => {
  return {
    type: SET_LISTADO_PRESTADOR_MEDICO_TIPOS_SELECT,
    payload: data
  }
}
export const getListadoPrestadorMedicoTiposSelect = () => {
  return dispatch => {
    fetch(FETCH_URL_PRESTADOR_MEDICO_TIPOS_SELECT, {
      method: 'GET'
    })
      .then((response) => {
        response.json()
          .then(data => {
            dispatch(setListadoPrestadorMedicoTiposSelect(data.body))
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Tipos Contactos:
const setTiposContactos = (data) => {
  return {
    type: SET_TIPOS_CONTACTOS,
    payload: data,
  }
}
export const serchTiposContactos = () => {
  return (dispatch) => {
    fetch(FETCH_URL_LISTADO_TIPOS_CONTACTOS_SELECT, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTiposContactos(data.body));
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


//Tipo Personas:
const setTiposPersonas = (data) => {
  let list = []
  let clone = {};
  for (var i in data) {
    clone = {
      ...data[i],
      verificado: data[i].codigo == 2
    }
    list.push(clone);
  }
  return {
    type: SET_TIPO_PERSONAS,
    payload: list,
  }
}
export const serchTipoPersonas = () => {
  return (dispatch) => {
    fetch(FETCH_URL_LISTADO_TIPOS_PERSONAS_SELECT, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTiposPersonas(data.body));
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


//Tipo prestador Médico:
const setTiposPrestadorMedico = (data) => {
  return {
    type: LISTAR_TIPO_PRESTADOR_MEDICO,
    payload: data,
  }
}
export const searchTiposPrestadorMedico = () => {
  return (dispatch) => {
    fetch(FETCH_URL_TIPO_PRESTADOR_MEDICO_SELECT, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTiposPrestadorMedico(data.body));
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


//Centros Medicos Propios:
const setCentrosMedicosPropios = (data) => {
  return {
    type: LISTAR_CENTROS_MEDICOS_PROPIOS,
    payload: data,
  }
}
export const searchCentrosMedicosPropios = () => {
  return (dispatch) => {
    fetch(FETCH_URL_CENTROS_MEDICOS_PROPIOS, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setCentrosMedicosPropios(data.body));
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}


//Tipo Habitación Hoteles:
const setTipoHabitacionHoteles = data => {
  return {
    type: SET_TIPO_HABITACION,
    payload: data
  }
}
export const searchTipoHabitacionHoteles = () => {
  return dispatch => {
    fetch(FETCH_URL_LISTADO_TIPO_HABITACION_HOTELES)
      .then(response => response.json()
        .then(data => dispatch(setTipoHabitacionHoteles(data.body))))
      .catch(err => console.log(err))
  }
}



//Autosuggest Especialidades Medicas:
const setEspecialidadesMedicas = (data) => {
  return {
    type: SET_ESPECIALIDADES_MEDICAS,
    payload: data.body,
  }
}
const errorAutosuggestEspecialidadMedica = (data) => {
  return {
    type: ERROR_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
    payload: data
  }
}
const loadingAutosuggestEspecialidadMedica = (data) => {
  return {
    type: LOADING_AUTOSUGGEST_ESPECIALIDAD_MEDICA,
    payload: data
  }
}
export const searchEspecialidadesMedicas = (request) => {
  return (dispatch) => {
    dispatch(loadingAutosuggestEspecialidadMedica(true))
    fetch(FETCH_URL_ESPECIALIDADES_MEDICAS, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    })
      .then((response) => {
        response.json()
          .then(data => {
            if (data.status === 200) {
              dispatch(setEspecialidadesMedicas(data))
              dispatch(errorAutosuggestEspecialidadMedica(false))
              dispatch(loadingAutosuggestEspecialidadMedica(false))
            } else {
              dispatch(errorAutosuggestEspecialidadMedica(true))
              dispatch(loadingAutosuggestEspecialidadMedica(false))
            }
          }).catch(err => {
            console.log(err)
            dispatch(errorAutosuggestEspecialidadMedica(true))
            dispatch(loadingAutosuggestEspecialidadMedica(false))
          })
      })
      .catch(err => {
        console.log(err)
        dispatch(errorAutosuggestEspecialidadMedica(true))
        dispatch(loadingAutosuggestEspecialidadMedica(false))
      })
  };
}


//Tipo Visibilidad:
const setTipoVisibilidad = (data) => {
  let list = []
  let clone = {}
  for (var i in data) {
    clone = {
      ...data[i],
      verificado: false
    }
    list.push(clone);

  }
  return {
    type: SET_VISIBILIDAD_CONTACTO,
    payload: list,
  }
}
export const searchTipoVisibilidad = () => {
  return (dispatch) => {
    fetch(FETCH_URL_VISIBILIDAD_CONTACTO, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data) => {
          dispatch(setTipoVisibilidad(data.body));
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Tipo SUbprestador:
const setTipoSubprestadores = data => {
  return {
    type: SET_TIPO_SUBPRESTADOR,
    payload: data
  }
}
export const searchTipoSubprestadores = () => {
  return dispatch => {
    fetch(FETCH_URL_LISTADO_TIPO_SUBPRESTADORES)
      .then(response => response.json()
        .then(data => dispatch(setTipoSubprestadores(data.body))))
      .catch(err => console.log(err))
  }
}


//Categoria Prestaciones:
const setPrestacionesCategorias = data => {
  return {
    type: GET_PRESTACIONES_CATEGORIAS,
    payload: data
  }
}
export const getPrestacionesCategorias = () => {
  return (dispatch) => {
    fetch(FETCH_URL_PRESTACIONES_CATEGORIAS, {
      method: "GET",
    })
      .then((res) => {
        res.json()
          .then((data) => {
            dispatch(setPrestacionesCategorias(data.body));
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Categoria Prestaciones Contrataciones: 
const setPrestacionesCategoriasContrataciones = data => {
  return {
    type: GET_PRESTACIONES_CATEGORIAS_CONTRATACIONES,
    payload: data
  }
}
export const getPrestacionesCategoriasContrataciones = () => {
  return (dispatch) => {
    fetch(FETCH_URL_PRESTACIONES_CATEGORIAS_CONTRATACIONES, {
      method: "GET",
    })
      .then((res) => {
        res.json()
          .then((data) => {
            dispatch(setPrestacionesCategoriasContrataciones(data.body));
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Sub Categoria Prestaciones COntrataciones:
const setPrestacionesSubCategoriasContrataciones = data => {
  return {
    type: GET_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES,
    payload: data
  }
}
export const getPrestacionesSubCategoriasContrataciones = () => {
  return (dispatch) => {
    fetch(FETCH_URL_PRESTACIONES_SUBCATEGORIAS_CONTRATACIONES, {
      method: "GET",
    })
      .then((res) => {
        res.json()
          .then((data) => {
            dispatch(setPrestacionesSubCategoriasContrataciones(data.body));
          })
      })
      .catch((err) => {
        console.log(err);
      });
  };
}


//Tipo SG:
const setListadoTipoSolicitudesGenericas = data => {
  return {
    type: SET_TIPOS_SOLICITUDES_GENERICAS,
    payload: data
  }
}
export const searchTipoSolicitudGenerica = () => {
  return dispatch => {
    fetch(FETCH_URL_GET_LISTADO_TIPO_SOLICITUDES_GENERICAS)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setListadoTipoSolicitudesGenericas(data.body))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Area Gestión:
const setListadoAreaGestion = data => {
  return {
    type: SET_AREA_GESTION,
    payload: data
  }
}
export const searchAreaGestion = (errorCallback) => {
  return dispatch => {
    fetch(FETCH_URL_GET_LISTADO_AREA_GESTION_SOLICITUDES_GENERICAS)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          if (errorCallback) errorCallback(false)
          dispatch(setListadoAreaGestion(data.body))
        } else {
          if (errorCallback) errorCallback(true)
          dispatch(setListadoAreaGestion(null))
        }
      })
      .catch(err => {
        console.log(err)
        if (errorCallback) errorCallback(true)
        dispatch(setListadoAreaGestion(null))
      })
  }
}


//Estado SG:
const setEstadoSolicitudGenerica = data => {
  return {
    type: SET_ESTADOS_SOLICITUDES_GENERICA,
    payload: data
  }
}
export const searchEstadoSolicitudGenerica = () => {
  return dispatch => {
    fetch(FETCH_URL_GET_LISTADO_ESTADO_SOLICITUDES_GENERICAS)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setEstadoSolicitudGenerica(data.body))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


//Provincia Prestador
const setProvinciaPrestador = data => {
  return {
    type: SET_LISTADOS_PROVINCIA_VALORES_PREDETERMINADOS,
    payload: data
  }
}
export const setListadoProvinciaPrestador = (req) => {
  return dispatch => {
    fetch(URL_FETCH_VALORES_PREDETERMINADOS, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setProvinciaPrestador(data.body))
        }
      })
      .catch(err => console.log(err))
  }
}


//Estado Prestador:
const setEstadoPrestador = data => {
  return {
    type: SET_LISTADOS_ESTADOS_VALORES_PREDETERMINADOS,
    payload: data
  }
}
export const setListadoEstadoPrestador = (req) => {
  return dispatch => {
    fetch(URL_FETCH_VALORES_PREDETERMINADOS, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setEstadoPrestador(data.body))
        }
      })
      .catch(err => console.log(err))
  }
}


//Motivo Prestador:
const setMotivoPrestador = data => {
  return {
    type: SET_LISTASDOS_MOTIVOS_VALORES_PREDETERMINADOS,
    payload: data
  }
}
export const setListadoMotivoPrestador = (req) => {
  return dispatch => {
    fetch(URL_FETCH_VALORES_PREDETERMINADOS, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setMotivoPrestador(data.body))
        }
      })
      .catch(err => console.log(err))
  }
}


//Listado Indicadores Siniestro
const setListadoIndicadoresSiniestro = data => {
  return {
    type: SET_LISTADO_INDICADORES_SINIESTROS,
    payload: data
  }
}
const setLoadingListadoIndicadoresSiniestro = bool => {
  return {
    type: SET_LOADING_LISTADO_INDICADORES_SINIESTROS,
    payload: bool
  }
}
export const getListadoIndicadoresSiniestro = (errorCallback) => {
  let inidcadoresHardcode = [
    {idIndicador:1, tipo: 'Cantidad de casos asignados'}, //ex "Pedido de estudios pendientes"
    {idIndicador:4, tipo: 'Sin evolucionar'},
    {idIndicador:11, tipo: 'Sin baja laboral (exp. serológicos)'},
    {idIndicador:12, tipo: 'Fecha de próximo contacto vencido'},
    {idIndicador:13, tipo: 'Sin fecha de baja'},
    {idIndicador:14, tipo: 'Probable fin ILT vencido no revisados'},
    {idIndicador:16, tipo: 'Sin Cie10'},
    {idIndicador:17, tipo: 'Si fecha probable fin ILT'},
    {idIndicador:18, tipo: 'Protocolos Qx. pendientes'},
    {idIndicador:19, tipo: 'Tratamiento suspendido'},
    {idIndicador:25, tipo: 'Citaciones auditoría pendientes'},
    {idIndicador:28, tipo: 'Sin evolucionar por más de 72 hs'},
    {idIndicador:30, tipo: 'Indicaciones pendientes'},
  ]
  return dispatch => {
    dispatch(setLoadingListadoIndicadoresSiniestro(true))
    setTimeout(()=>{
      dispatch(setListadoIndicadoresSiniestro(inidcadoresHardcode))
      if(errorCallback) errorCallback(false)
      dispatch(setLoadingListadoIndicadoresSiniestro(false))
    },1000)
  }
}
export const clearListadoIndicadoresSiniestro = () => {
  return dispatch => {
      dispatch(setListadoIndicadoresSiniestro([]))
  }
}


//Listado Tipos de Turnos
const setListadoTiposTurnos = (data) => {
  return {
    type: SET_LISTADO_TIPOS_TURNOS,
    payload: data
  }
}
export const getListadoTiposTurnos = (errorCallback, tipo) => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_TIPO_TURNO, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setListadoTiposTurnos(data.body))
          if (errorCallback) errorCallback(false)
        } else {
          if (errorCallback) errorCallback(true, tipo)
          dispatch(setListadoTiposTurnos(null))
        }
      })
      .catch(() => {
        if (errorCallback) errorCallback(true, tipo)
        dispatch(setListadoTiposTurnos(null))
      })
  }
}


//Listado Empleadores Por Auditor
const setListadoEmpleadoresPorAuditor = (data) => {
  return {
    type: SET_LISTADO_EMPLEADORES_POR_AUDITOR,
    payload: data
  }
}
export const getListadoEmpleadoresPorAuditor = (req, errorCallback, tipo) => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_EMPLEADORES_POR_AUDITOR, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setListadoEmpleadoresPorAuditor(data.body))
          if (errorCallback) errorCallback(false)
        } else if (data.status === 204) {
          dispatch(setListadoEmpleadoresPorAuditor(null))
          if (errorCallback) errorCallback(false)
        } else {
          if (errorCallback) errorCallback(true, tipo)
          dispatch(setListadoEmpleadoresPorAuditor(null))
        }
      })
      .catch(() => {
        if (errorCallback) errorCallback(true, tipo)
        dispatch(setListadoEmpleadoresPorAuditor(null))
      })
  }
}


//Listado Tramitadores Por Auditor
const setListadoTramitadoresPorAuditor = (data) => {
  return {
    type: SET_LISTADO_TRAMITADORES_POR_AUDITOR,
    payload: data
  }
}
export const getListadoTramitadoresPorAuditor = (req, errorCallback, tipo) => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_TRAMITADORES_POR_AUDITOR, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch(setListadoTramitadoresPorAuditor(data.body))
          if (errorCallback) errorCallback(false)
        } else if (data.status === 204) {
          dispatch(setListadoTramitadoresPorAuditor(null))
          if (errorCallback) errorCallback(false)
        } else {
          if (errorCallback) errorCallback(true, tipo)
          dispatch(setListadoTramitadoresPorAuditor(null))
        }
      })
      .catch(() => {
        if (errorCallback) errorCallback(true, tipo)
        dispatch(setListadoTramitadoresPorAuditor(null))
      })
  }
}


//Listado Materiales QX:
const setDataListadoMaterialesQx = (data) => {
  return {
    type: SET_DATA_LISTADO_MATERIALES_QX,
    payload: data
  }
}
const setLoadingListadoMaterialesQx = (bool) => {
  return {
    type: SET_LOADING_LISTADO_MATERIALES_QX,
    payload: bool
  }
}
const setErrorListadoMaterialesQx = (bool) => {
  return {
    type: SET_ERROR_LISTADO_MATERIALES_QX,
    payload: bool
  }
}
export const getListadoMaterialesQx = (req) => {
  return dispatch => {
    dispatch(setErrorListadoMaterialesQx(false))
    dispatch(setLoadingListadoMaterialesQx(true))
    fetch(URL_FETCH_LISTADO_MATERIALES_QUIRURGICOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    })
      .then((response) => {
        response.json()
          .then(data => {
            if (data.status === 200) {
              dispatch(setDataListadoMaterialesQx(data.body))
              dispatch(setErrorListadoMaterialesQx(false))
              dispatch(setLoadingListadoMaterialesQx(false))
            } else if (data.status === 204) {
              dispatch(setDataListadoMaterialesQx(null))
              dispatch(setErrorListadoMaterialesQx(true))
              dispatch(setLoadingListadoMaterialesQx(false))
            } else {
              dispatch(setDataListadoMaterialesQx(null))
              dispatch(setErrorListadoMaterialesQx(true))
              dispatch(setLoadingListadoMaterialesQx(false))
            }
          })
      })
      .catch(err => {
        dispatch(setDataListadoMaterialesQx(null))
        dispatch(setErrorListadoMaterialesQx(true))
        dispatch(setLoadingListadoMaterialesQx(false))
      })
  }
}


//GET LISTADO REGION PATOLOGICA:
const setDataListadoRegionPatologica = (data) => {
  return {
    type: SET_DATA_LISTADO_REGION_PATOLOGICA,
    payload: data
  }
}
const setLoadingListadoRegionPatologica = (bool) => {
  return {
    type: SET_LOADING_LISTADO_REGION_PATOLOGICA,
    payload: bool
  }
}
export const getDataListadoRegionPatologica = (errorCallback) => {
  return dispatch => {
    dispatch(setLoadingListadoRegionPatologica(true))
    fetch(URL_FETCH_LISTADO_REGION_PATOLOGICA)
      .then((response) => {
        response.json()
          .then(data => {
            if (data.status === 200) {
              dispatch(setDataListadoRegionPatologica(data.body))
              if (errorCallback) errorCallback(false)
              dispatch(setLoadingListadoRegionPatologica(false))
            } else if (data.status === 204) {
              dispatch(setDataListadoRegionPatologica([]))
              if (errorCallback) errorCallback(true)
              dispatch(setLoadingListadoRegionPatologica(false))
            } else {
              dispatch(setDataListadoRegionPatologica([]))
              if (errorCallback) errorCallback(true)
              dispatch(setLoadingListadoRegionPatologica(false))
            }
          })
      })
      .catch(() => {
        dispatch(setDataListadoRegionPatologica([]))
        if (errorCallback) errorCallback(true)
        dispatch(setLoadingListadoRegionPatologica(false))
      })
  }
}


//GET LISTADO SEVERIDAD:
const setListadoSeveridad = data => {
  return {
    type: SET_LISTADO_SEVERIDAD,
    payload: data
  }
}
export const fetchListadoSeveridad = () => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_SEVERIDAD)
      .then(res => res.json()
        .then(data => {
          if (data.status === 200) {
            dispatch(setListadoSeveridad(data.body))
          } else {
            dispatch(setListadoSeveridad([]))
          }
        })).catch(err => {
          dispatch(setListadoSeveridad([]))
        })
  }
}


//CAUSA ILT
const setListadoCausaILT = (data) => {
  return {
    type: SET_LISTADO_CAUSA_ILT,
    payload: data
  }
}
export const getListadoCausaILT = () => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_CAUSA_ILT)
      .then(res => res.json()
        .then(data => {
          if (data.status === 200) {
            dispatch(setListadoCausaILT(data.body))
          } else {
            dispatch(setListadoCausaILT([]))
          }
        }))
      .catch(() => {
        dispatch(setListadoCausaILT([]))
      })
  }
}


//SUBCAUSA ILT
const setListadoSubCausaILT = data => {
  return {
    type: SET_LISTADO_SUB_CAUSA_ILT,
    payload: data
  }
}
export const getListadoSubCausaILT = req => {
  return dispatch => {
    fetch(URL_FETCH_LISTADO_SUB_CAUSA_ILT, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    }).then(res => res.json()
      .then(data => {
        if (data.status === 200) {
          dispatch(setListadoSubCausaILT(data.body))
        } else {
          dispatch(setListadoSubCausaILT([]))
        }
      })).catch(() => {
        dispatch(setListadoSubCausaILT([]))
      })
  }
}


//Listado Estados Cirugias:
const setDataListadoEstadosCirugias = (data) => {
  return {
      type: SET_DATA_LISTADO_ESTADOS_CIRUGIAS,
      payload: data
  }
}
const setLoadingEstadosCirugias = (bool) => {
  return {
      type: SET_LOADING_LISTADO_ESTADOS_CIRUGIAS,
      payload: bool
  }
}
export const getListadoEstadosCirugias = (errorCallback) => {
  return dispatch => {
      dispatch(setLoadingEstadosCirugias(true))
      fetch(URL_FETCH_LISTADO_ESTADOS_CIRUGIAS)
          .then((response) => {
              response.json()
                  .then(data => {
                      if (data.status === 200) {
                          dispatch(setDataListadoEstadosCirugias(data.body))
                          if(errorCallback) errorCallback(false)
                          dispatch(setLoadingEstadosCirugias(false))
                      } else if (data.status === 204) {
                          dispatch(setDataListadoEstadosCirugias([]))
                          if(errorCallback) errorCallback(true)
                          dispatch(setLoadingEstadosCirugias(false))
                      } else {
                          dispatch(setDataListadoEstadosCirugias([]))
                          if(errorCallback) errorCallback(true)
                          dispatch(setLoadingEstadosCirugias(false))
                      }
                  })
              })
          .catch(() => {
              dispatch(setDataListadoEstadosCirugias([]))
              if(errorCallback) errorCallback(true)
              dispatch(setLoadingEstadosCirugias(false))
          }) 
  }
}


//Listado Motivos Anulacion Cirugias
const setDataListadoMotivosAnulacionCirugias = (data) => {
  return {
      type: SET_DATA_LISTADO_MOTIVOS_ANULACION_CIRUGIAS,
      payload: data
  }
}
const setLoadingMotivosAnulacionCirugias = (bool) => {
  return {
      type: SET_LOADING_LISTADO_MOTIVOS_ANULACION_CIRUGIAS,
      payload: bool
  }
}
export const getListadoMotivosAnulacionCirugias = (errorCallback) => {
  return dispatch => {
    dispatch(setLoadingMotivosAnulacionCirugias(true))
    fetch(URL_FETCH_LISTADO_MOTIVOS_ANULACION_CIRUGIAS)
      .then((response) => {
        response.json()
          .then(data => {
            if (data.status === 200) {
              dispatch(setDataListadoMotivosAnulacionCirugias(data.body))
              if(errorCallback) errorCallback(false)
              dispatch(setLoadingMotivosAnulacionCirugias(false))
          } else if (data.status === 204) {
              dispatch(setDataListadoMotivosAnulacionCirugias([]))
              if(errorCallback) errorCallback(true)
              dispatch(setLoadingMotivosAnulacionCirugias(false))
          } else {
              dispatch(setDataListadoMotivosAnulacionCirugias([]))
              if(errorCallback) errorCallback(true)
              dispatch(setLoadingMotivosAnulacionCirugias(false))
          }
        })
      })
      .catch(() => {
        dispatch(setDataListadoMotivosAnulacionCirugias([]))
        if(errorCallback) errorCallback(true)
        dispatch(setLoadingMotivosAnulacionCirugias(false))
      }) 
  }
}

//Listado Tipo Valor Negativo:
const setListadoTipoValorViajeNegativo = (data) => {
  return{
    type: SET_DATA_TIPO_VALOR_VIAJE_NEGATIVO,
    payload: data
  }
}
const setLoadingTipoValorViajeNegativo = (bool) => {
  return {
    type: LOADING_DATA_TIPOS_VALOR_VIAJE_NEGATIVO,
    payload: bool
  }
}
export const getListadoTipoValorViajeNegativo = (cbSuccess) => {
  return dispatch => {
    dispatch(setLoadingTipoValorViajeNegativo(true))
    fetch(FETCH_URL_LISTADO_TIPO_VALOR_VIAJE_NEGATIVO)
    .then(res => {
      res.json()
      .then(data => {
        if(data.status === 200){
          dispatch(setListadoTipoValorViajeNegativo(data.body))
          cbSuccess(true)
          dispatch(setLoadingTipoValorViajeNegativo(false))
        }else{
          dispatch(setListadoTipoValorViajeNegativo([]))
          cbSuccess(false)
          dispatch(setLoadingTipoValorViajeNegativo(false))
        }
      })
    })
    .catch(()=>{
      dispatch(setListadoTipoValorViajeNegativo([]))
      cbSuccess(false)
      dispatch(setLoadingTipoValorViajeNegativo(false))
    })
  }
}

//Listado Destinos Frecuentes:
const setListadoDestinoFrecuente = data => {
  return{
    type:SET_DATA_LISTADO_DESTINOS_FRECUENTES,
    payload:data
  }
}
const setLoadingListadoDestinosFrecuentes = bool => {
  return{
    type: LOADING_LISTADO_DESTINOS_FRECUENTES,
    payload: bool
  }
}
export const getListadoDestinoFrecuentes = (cbSuccess)=>{
  return dispatch => {
    dispatch(setLoadingListadoDestinosFrecuentes(true))
    fetch(FETCH_URL_LISTADO_DESTINO_FRECUENTE)
    .then(res => {
      res.json()
      .then(data => {
        if(data.status === 200){
          dispatch(setListadoDestinoFrecuente(data.body))
          dispatch(setLoadingListadoDestinosFrecuentes(false))
          cbSuccess(true)
        }else{
          dispatch(setListadoDestinoFrecuente([]))
          dispatch(setLoadingListadoDestinosFrecuentes(false))
          cbSuccess(false)
        }
      })
    })
    .catch(()=>{
      dispatch(setListadoDestinoFrecuente([]))
      dispatch(setLoadingListadoDestinosFrecuentes(false))
      cbSuccess(false)
    })
  }
}