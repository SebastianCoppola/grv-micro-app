import { 
    SET_BUSQUEDA_EMPLEADOR,
    SET_BUSQUEDA_EMPLEADOR_TODOS,
    ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
    ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
    LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
    LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
    SET_DATOS_PACIENTE, 
    SET_LOADING_DATOS_PACIENTE
 } from '../actionTypes'

 const initialState = {
    empleador : [],
    empleadorTodos : [],
    errorAutosuggestBusquedaEmpleador: false,
    errorAutosuggestBusquedaEmpleadorTodos: false,
    loadingAutosuggestBusquedaEmpleador: false,
    loadingAutosuggestBusquedaEmpleadorTodos: false,
    datosPaciente: null, 
    loadingDatosPaciente: false,
}

const persona = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                empleador: action.payload
            }
            break;
        case SET_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                empleadorTodos: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                errorAutosuggestBusquedaEmpleador: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                errorAutosuggestBusquedaEmpleadorTodos: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                loadingAutosuggestBusquedaEmpleador: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                loadingAutosuggestBusquedaEmpleadorTodos: action.payload
                }
            break;
        case     SET_DATOS_PACIENTE:
            return {
                ...state,
                datosPaciente: action.payload
                }
            break;
        case SET_LOADING_DATOS_PACIENTE:
            return {
                ...state,
                loadingDatosPaciente: action.payload
                }
            break;
        default:
            return state;
    }
}



export default persona
