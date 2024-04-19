import {
    SET_LISTADO_PRESTACIONES_NOMENCLADAS,
    SET_LISTADO_PRESTACIONES_NO_NOMENCLADAS,
    SET_LOADING_LISTAR_PRESTACIONES,
    SET_ERROR_LISTAR_PRESTACIONES,
    SET_LOADING_ADD_EDIT_PRESTACIONES_NO_NOMENCLADAS,
    SET_PRESTACIONES_PROVEEDOR,
    SET_LOADING_PRESTACIONES_PROVEEDOR,
    SET_ERROR_PRESTACIONES_PROVEEDOR,
    LOADING_BUSQUEDA_PRESTACIONES,
    SET_DATA_PRESTACIONES,
} from "../actionTypes"

import {
    FETCH_URL_LISTADO_PRESTACIONES_NOMENCLADAS,
    FETCH_URL_LISTADO_PRESTACIONES_NO_NOMENCLADAS,
    SAVE_URL_PRESTACION_NO_NOMENCLADA,
    EDIT_URL_PRESTACION_NO_NOMENCLADA,
    FETCH_URL_PRESTACIONES_PROVEEDOR,
} from '../../Urls/contrataciones'

import {
    FETCH_URL_FIND_ALL_PRESTACIONES,
} from '../../Urls/auditoriaMedica'


//Save & Edit Prestación No Nomenclada:
const setLoadingAddEditPrestacionesNoNomencladas = (data) => {
    return {
        type: SET_LOADING_ADD_EDIT_PRESTACIONES_NO_NOMENCLADAS,
        payload: data
    }
}
export const savePrestacionNoNomencladas = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingAddEditPrestacionesNoNomencladas(true))
        fetch(SAVE_URL_PRESTACION_NO_NOMENCLADA, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then((data) => {
                        if (data.status === 200) {
                            dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                            callback(true)
                        } else {
                            dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                            callback(false)
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                callback(false)
            })
    }
}
export const editPrestacionNoNomencladas = (req, callback) => {
    return dispatch => {
        dispatch(setLoadingAddEditPrestacionesNoNomencladas(true))
        fetch(EDIT_URL_PRESTACION_NO_NOMENCLADA, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then((res) => {
                res.json()
                    .then((data) => {
                        if (data.status === 200) {
                            dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                            callback(true)
                        } else {
                            dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                            callback(false)
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                dispatch(setLoadingAddEditPrestacionesNoNomencladas(false))
                callback(false)
            })
    }
}


//Set Listado Prestaciones: 
const setErrorListarPrestaciones = boolean => {
    return {
        type: SET_ERROR_LISTAR_PRESTACIONES,
        payload: boolean
    }
}
const setLoadingListarPrestaciones = (boolean) => {
    return {
        type: SET_LOADING_LISTAR_PRESTACIONES,
        payload: boolean
    }
}
export const setListadoPrestacionesNomencladas = data => {
    return {
        type: SET_LISTADO_PRESTACIONES_NOMENCLADAS,
        payload: data
    }
}
export const setListadoPrestacionesNoNomencladas = data => {
    return {
        type: SET_LISTADO_PRESTACIONES_NO_NOMENCLADAS,
        payload: data
    }
}
export const listarPrestacionesNomencladas = (req, listadoPrestacionesMenuAzul) => {
    return async dispatch => {
        dispatch(setLoadingListarPrestaciones(true))
        if(!listadoPrestacionesMenuAzul){
            dispatch(setListadoPrestacionesNomencladas([]))
        }
        try {
            const res = await fetch(FETCH_URL_LISTADO_PRESTACIONES_NOMENCLADAS, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req)
            })
            const data = await res.json()
            if (data.status === 200) {
                if (data.body === null) {
                    dispatch(setErrorListarPrestaciones(true))
                    dispatch(setListadoPrestacionesNomencladas([]))
                    dispatch(setLoadingListarPrestaciones(false))
                } else {
                    dispatch(setListadoPrestacionesNomencladas(data.body))
                    dispatch(setErrorListarPrestaciones(false))
                    dispatch(setLoadingListarPrestaciones(false))
                }
            } else {
                dispatch(setErrorListarPrestaciones(true))
                dispatch(setListadoPrestacionesNomencladas([]))
                dispatch(setLoadingListarPrestaciones(false))
            }
        } catch (err) {
            dispatch(setListadoPrestacionesNomencladas([]))
            dispatch(setErrorListarPrestaciones(true))
            dispatch(setLoadingListarPrestaciones(false))
        }
    }
}
export const listarPrestacionesNoNomencladas = (req, listadoPrestacionesMenuAzul) => {
    return dispatch => {
        dispatch(setLoadingListarPrestaciones(true))
        if(!listadoPrestacionesMenuAzul){
            dispatch(setListadoPrestacionesNoNomencladas([]))
        }
        fetch(FETCH_URL_LISTADO_PRESTACIONES_NO_NOMENCLADAS, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req)
        })
            .then(res => {
                res.json()
                    .then(data => {
                        if (data.status === 200) {
                            if (data.body === null) {
                                dispatch(setErrorListarPrestaciones(true))
                                dispatch(setListadoPrestacionesNoNomencladas([]))
                                dispatch(setLoadingListarPrestaciones(false))
                            } else {
                                dispatch(setErrorListarPrestaciones(false))
                                dispatch(setListadoPrestacionesNoNomencladas(data.body))
                                dispatch(setLoadingListarPrestaciones(false))
                            }
                        } else {
                            dispatch(setErrorListarPrestaciones(true))
                            dispatch(setListadoPrestacionesNoNomencladas([]))
                            dispatch(setLoadingListarPrestaciones(false))
                        }
                    })
                    .catch(err => {
                        dispatch(setListadoPrestacionesNoNomencladas([]))
                        dispatch(setErrorListarPrestaciones(true))
                        dispatch(setLoadingListarPrestaciones(false))
                    })
            })
    }
}
export const clearPrestacionesNomencladas = () => {
    return dispatch => {
        dispatch(setListadoPrestacionesNomencladas([]))
    }
}
export const clearPrestacionesNoNomencladas = () => {
    return dispatch => {
        dispatch(setListadoPrestacionesNoNomencladas([]))
    }
}


//Fetch Prestaciones Proveedor: 
const setPrestacionesProveedor = (data) => {
    return {
        type: SET_PRESTACIONES_PROVEEDOR,
        payload: data
    }
}
const setLoadingPrestacionesProveedor = (boolean) => {
    return {
        type: SET_LOADING_PRESTACIONES_PROVEEDOR,
        payload: boolean
    }
}
const setErrorPrestacionesProveedor = (boolean) => {
    return {
        type: SET_ERROR_PRESTACIONES_PROVEEDOR,
        payload: boolean
    }
}
export const fetchPrestacionesProveedor = (request) => {
    return dispatch => {
        dispatch(setLoadingPrestacionesProveedor(true))
        fetch(FETCH_URL_PRESTACIONES_PROVEEDOR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data && data.status === 200) {
                            dispatch(setPrestacionesProveedor(data.body))
                            dispatch(setErrorPrestacionesProveedor(false))
                            dispatch(setLoadingPrestacionesProveedor(false))
                        } else {
                            dispatch(setPrestacionesProveedor(null))
                            dispatch(setErrorPrestacionesProveedor(true))
                            dispatch(setLoadingPrestacionesProveedor(false))
                        }
                    })
            })
            .catch(err => {
                dispatch(setPrestacionesProveedor(null))
                dispatch(setErrorPrestacionesProveedor(true))
                dispatch(setLoadingPrestacionesProveedor(false))
            })
    }
}
export const clearPrestacionesProveedor = () => {
    return dispatch => {
        dispatch(setPrestacionesProveedor(null))
    }
}

//Busqueda Prestaciones:
const setLoadingBusquedaPrestaciones = (data) => {
    return {
        type: LOADING_BUSQUEDA_PRESTACIONES,
        payload: data
    }
}
const setDataPrestaciones = (data) => {
    return {
        type: SET_DATA_PRESTACIONES,
        payload: data
    }
}
export const busquedaPrestaciones = (request, callback) => {
    return dispatch => {
        dispatch(setLoadingBusquedaPrestaciones(true))
        fetch(FETCH_URL_FIND_ALL_PRESTACIONES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        })
            .then((response) => {
                response.json()
                    .then(data => {
                        if (data.status === 200) {
                            dispatch(setDataPrestaciones(data.body))
                            callback(false)
                        } else {
                            dispatch(setDataPrestaciones([]))
                            callback(false)
                        }
                        dispatch(setLoadingBusquedaPrestaciones(false))
                    }).catch(err => {
                        console.log(err)
                        callback(true)
                        dispatch(setLoadingBusquedaPrestaciones(false))
                    })
            })
            .catch(err => {
                console.log(err)
                callback(true)
            })
    }
}
