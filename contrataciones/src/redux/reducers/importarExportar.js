import {
    SET_LOCALIDADES_IMPORTADAS,
    SET_LOADING_IMPORTAR,
} from "../actionTypes"

const initialState = {
    localidadesImportadas: null,
    loadingImportar: false,
}

const importarExportar = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALIDADES_IMPORTADAS:
            return {
                ...state,
                localidadesImportadas: action.payload
            }
        case SET_LOADING_IMPORTAR:
            return {
                ...state,
                loadingImportar: action.payload
            }
        default:
            return state
    }
}

export default importarExportar