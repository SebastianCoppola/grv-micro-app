import {
  SET_PROVINCIAS,
  SET_LOCALIDADES,
  SET_CALLE,
  SET_CODIGO_POSTAL,
  SET_CODIGO_POSTAL_CABA,
  SET_LOCALIDADES_SELECT,

  ERROR_AUTOSUGGEST_PROVINCIA,
  ERROR_AUTOSUGGEST_LOCALIDADES,
  ERROR_AUTOSUGGEST_CALLE,
  ERROR_AUTOSUGGEST_CODIGO_POSTAL,

  LOADING_AUTOSUGGEST_PROVINCIA,
  LOADING_AUTOSUGGEST_LOCALIDADES,
  LOADING_AUTOSUGGEST_CALLE,
  LOADING_AUTOSUGGEST_CODIGO_POSTAL,
} from '../actionTypes'

const initialState = {
    findProvincias: [],
    findLocalidades: [],
    calle: [],
    codigoPostal: [],
    codigoPostalCABA : [],
    localidadesSelect: null ,

    errorAutosuggestProvincia: false,
    errorAutosuggestLocalidades: false,
    errorAutosuggestCalle: false,
    errorAutosuggestCodigoPostal: false,

    loadingAutosuggestProvincia: false,
    loadingAutosuggestLocalidades: false,
    loadingAutosuggestCalle:false,
    loadingAutosuggestCodigoPostal:false,
}

const ubicacion = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROVINCIAS:
            return {
                ...state,
                findProvincias: action.payload
            }
            break;
        case SET_LOCALIDADES:
            return {
                ...state,
                findLocalidades: action.payload
            }
            break;
        case SET_CALLE:
            return {
                ...state,
                calle: action.payload
            }
            break;
        case SET_CODIGO_POSTAL:
            return {
                ...state,
                codigoPostal: action.payload
            }
            break;
        case SET_CODIGO_POSTAL_CABA:
            return {
                ...state,
                codigoPostalCABA: action.payload
            }
            break;
        case  SET_LOCALIDADES_SELECT:
            return {
                ...state,
                localidadesSelect: action.payload
            }
            break;
       
        case ERROR_AUTOSUGGEST_PROVINCIA:
            return {
                ...state,
                errorAutosuggestProvincia: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_LOCALIDADES:
            return {
                ...state,
                errorAutosuggestLocalidades: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_CALLE:
            return {
                ...state,
                errorAutosuggestCalle: action.payload
            }
            break;
        case ERROR_AUTOSUGGEST_CODIGO_POSTAL:
            return {
                ...state,
                errorAutosuggestCodigoPostal: action.payload
            }
            break;

        case LOADING_AUTOSUGGEST_PROVINCIA:
                return {
                    ...state,
                    loadingAutosuggestProvincia: action.payload
                }
                break;
        case LOADING_AUTOSUGGEST_LOCALIDADES:
            return {
                ...state,
                loadingAutosuggestLocalidades: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_CALLE:
            return {
                ...state,
                loadingAutosuggestCalle: action.payload
            }
            break;
        case LOADING_AUTOSUGGEST_CODIGO_POSTAL:
            return {
                ...state,
                loadingAutosuggestCodigoPostal: action.payload
            }
            break;
            default:
                return state;
    }
}
export default ubicacion