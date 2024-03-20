import { 
    SET_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR,
	ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS,
	SET_BUSQUEDA_EMPLEADOR_TODOS,
 } from '../actionTypes'

 const initialState = {
    empleador : [],
    errorAutosuggestBusquedaEmpleador: false,
    loadingAutosuggestBusquedaEmpleador: false,
    empleadorTodos : [],
    loadingAutosuggestBusquedaEmpleadorTodos: false,
    errorAutosuggestBusquedaEmpleadorTodos: false,
}

const persona = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                empleador: action.payload
            }
        case ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                errorAutosuggestBusquedaEmpleador: action.payload
            }
        case LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR:
            return {
                ...state,
                loadingAutosuggestBusquedaEmpleador: action.payload
            }
        case ERROR_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                errorAutosuggestBusquedaEmpleadorTodos: action.payload
            }
        case LOADING_AUTOSUGGEST_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                loadingAutosuggestBusquedaEmpleadorTodos: action.payload
            }
        case SET_BUSQUEDA_EMPLEADOR_TODOS:
            return {
                ...state,
                empleadorTodos: action.payload
            }
        default:
            return state
    }
}



export default persona
