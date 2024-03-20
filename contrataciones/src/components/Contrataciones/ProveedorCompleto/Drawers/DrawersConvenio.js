import React, { useState, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Drawers:
import Drawer from '../../../commons/CustomDrawer/Drawer'
import ContenidoDrawer from '../../../commons/CustomDrawer/ContenidoDrawer'
import DrawerPrQx from './DrawerPrQx'
import DrawerFechaVigencia from './DrawerFechaVigencia'
import DrawerAjustarValores from './DrawerAjustarValores'
import DrawerAgregarPrestacion from './DrawerAgregarPrestacion'
import DrawerEditarPrestacion from './DrawerEditarPrestacion'
import DrawerStopNBU from './DrawerStopNBU'
import DrawerInclusiones from '../../Modulos/DrawerInclusiones'
import DrawerAgregarModulo from './DrawerAgregarModulo'
import DrawerEditarModulo from './DrawerEditarModulo'
import DrawerImportar from './DrawerImportar'
import DrawerPrestacionNBU from './DrawerPrestacionNBU'
import Utils from '../../../../Utils/utils'

/**
 * props:
 * DrawerFechaVigencia
 * -fechaVigenciaDesde
 * -setFechaVigenciaDesde
 * -fechaVigenciaHasta
 * -setFechaVigenciaHasta
 */
const DrawersConvenio = props => {
    const {
        drawerNro, setDrawerNro,
        setOpenAlert1, setOpenAlert2,
        setOpenSnackBar,
        seleccion, setSeleccion,
        proveedor,
        editRow,
        convenioSeleccionado,
        editarConvenioFuturo,
        setUpdateTable,
        objectCriterioBusqueda,
        setAplicoValoresPrestacionesUnit
    } = props;

    //Drawers:
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false });
    const [deshabilitarSiguiente, setDeshabilitarSiguiente] = useState(true)
    const [confirmarFechaVigencia, setConfirmarFechaVigencia] = useState(false)
    const [datosGuardar, setDatosGuardar] = useState(null)
    //Redux: 
    const dispatch = useDispatch();
    const request = useSelector(state => state.convenio.request)
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    //Importar: 
    const [importFile, setImportFile] = useState(null);


    //Abrir drawer al cambiar drawerNro: 
    useEffect(() => {
        if (drawerNro !== null) {
            setOpenDrawer({ ...openDrawer, 'right': true })
            if(setOpenAlert1) setOpenAlert1({ open: false })
            if (setOpenAlert2) setOpenAlert2({ open: false })
        }
    }, [drawerNro])


    //CallbackImportar:
    const callbackImportar = (exito, response, tipo) => {
        let pn = tipo === "pn" ? true : false
        let pnn = tipo === "pnn" ? true : false
        let req = pn ? "prestacionesNomencladas" : pnn ? "prestacionesNoNomencladas" : "modulos"
        let id = pn || pnn ? "idPrestacion" : "idModulo"
        let deleteAll = pn ? "eliminarTodasNomencladas" : pnn ? "eliminarTodasNoNomencladas" : "eliminarTodosModulos"
        let deleteCriterio = pn ? "eliminarNomencladasCriterio" : pnn ? "eliminarNoNomencladasCriterio" : "eliminarModulosCriterio"
        let add = pn || pnn ? "agregarPrestacion" : "agregarModulo"

        if (exito) {
            let arrResponse = response.body.map((it) => {
                return {
                    ...it,
                    precio: parseFloat(it.precio).toFixed(2)
                }
            })
            let arrNuevos = []
            let arrRepetidos = []
            let arrRequest = []
            if (request && request[req] && !request[deleteAll] && !request[deleteCriterio]) {
                //Separo los registos que estaban y los que no estaban en la request:
                arrResponse.forEach(dato => {
                    if (request[req].filter(it => it[id] === dato[id]).length > 0) {
                        arrRepetidos.push(dato)
                    } else {
                        arrNuevos.push(dato)
                    }
                })
                //Mapeo todos los registros de la request. Si existe en response lo reemplazo. De lo contrario lo dejo:
                request[req].forEach(dato => {
                    if (arrRepetidos.filter(it => it[id] === dato[id]).length === 0) {
                        arrRequest.push(dato)
                    } else {
                        arrRequest.push(arrRepetidos.filter(it => it[id] === dato[id])[0])
                    }
                })
                //Seteo la request:
                dispatch(actions.setRequestConvenio({ ...request, [req]: [...arrNuevos, ...arrRequest] }))
            } else {
                //Preparo todos los registros devueltos con AGREGAR en TRUE o FALSE según corresponda:
                if(arrResponse.length){
                    if(request && request[deleteAll]){
                        arrNuevos = arrResponse.map(it=>{return{...it, [add]: true}})
                    }
                    else if(request && request[req] && request[deleteCriterio]){
                        arrResponse.forEach(it=>{
                            let registro = it
                            request[deleteCriterio].forEach(criterio=>{
                                if(Utils.matchCriterioBusqueda(it, criterio)){
                                    registro = {...registro, [add]: true}
                                }
                            })
                            arrNuevos.push(registro)
                        })
                    }
                    else{
                        arrNuevos = arrResponse
                    }                   
                } 
                //Mapeo todos los registros de la request. Si no existen en lo devuelto los monto en arrRequest:
                request && request[req] && request[req].forEach(dato => {
                    if (arrNuevos.filter(it => it[id] === dato[id]).length === 0) {
                        arrRequest.push(dato)
                    }
                })
                dispatch(actions.setRequestConvenio({ ...request, [req]: [...arrNuevos, ...arrRequest] }))
            }

            let mensajeExito = pn || pnn ? "Se agregaron o modificaron las prestaciones con código " : "Se agregaron o modificaron los módulos con código "
            let mensajeAgregados = arrResponse.map(it => { return ` ${it.codigo}` }).toString()
            let mensajeError = response.message.split("- ").join(" ")

            if (arrResponse.length > 0 && response.message === "") {
                setOpenAlert1({
                    "open": true,
                    "mensaje": <>{mensajeExito} {mensajeAgregados}.</>
                })
            }
            else if (arrResponse.length > 0 && response.message) {
                setOpenAlert1({
                    "open": true,
                    "severity": "warning",
                    "mensaje": (<>{mensajeExito} {mensajeAgregados}.<br />{mensajeError}</>)
                })
            }
            else {
                setOpenSnackBar({
                    open: true,
                    severity: "error",
                    title: "Todas las filas del archivo contienen errores."
                })
            }
        } else {
            setOpenSnackBar({ open: true, severity: "error", title: "Ocurrió un error al intentar importar." })
        }
    }


    //Actions Drawer:
    const toggleDrawer = () => () => {
        drawerCancelar()
    }
    const drawerCancelar = async () => {
        setOpenDrawer({ ...openDrawer, 'right': false })
        setDrawerNro(null)
        setDeshabilitarSiguiente(true)
        setDatosGuardar(null)
    }
    const drawerGuardar = (drawerNro) => {
        setSeleccion(null)
        switch (drawerNro) {
            //EDITAR FECHA DE VIGENCIA
            case 1:
                setConfirmarFechaVigencia(true)
                break

            //MODIFICAR VALORES POR %
            case 2:
                //Calcula el precio solicitado + el porcentaje de aumento:
                const calcularPorcentaje = (precio) => {
                    return (parseFloat(precio) + parseFloat(precio) * (parseFloat(datosGuardar.porcentaje) / 100)).toFixed(2)
                }
                //Ajusta los valores de las prestaciones o módulos solicitados: 
                const ajustarValores = (tipo) => {
                    let selected = (tipo === "pn") ? "nomencladas" : (tipo === "pnn") ? "noNomencladas" : "modulos"
                    let noSelected = (tipo === "pn") ? "nomencladasNoSeleccionadas" : (tipo === "pnn") ? "noNomencladasNoSeleccionadas" : "modulosNoSeleccionados"
                    let req = (tipo === "pn") ? "prestacionesNomencladas" : (tipo === "pnn") ? "prestacionesNoNomencladas" : "modulos"
                    let id = (tipo === "pn" || tipo === "pnn") ? "idPrestacion" : "idModulo"
                    let ajustarAll = (tipo === "pn") ? "ajustarTodasNomencladas" : (tipo === "pnn") ? "ajustarTodasNoNomencladas" : "ajustarTodosModulos"
                    let ajustarCriterio = (tipo === "pn") ? "ajustarNomencladasCriterio" : (tipo === "pnn") ? "ajustarNoNomencladasCriterio" : "ajustarModulosCriterio"
                    let response                  
                    
                    if (datosGuardar && !datosGuardar[noSelected]) {
                        let datosModificados = datosGuardar[selected] ? datosGuardar[selected].map(it => {
                            return { ...it, precio: calcularPorcentaje(it.precio) }
                        }) : []
                        if (request && request[req] && request[req].length > 0) {
                            let oldDatos = []
                            request[req].forEach(dato => {
                                if(datosModificados.filter(it => it[id] === dato[id]).length === 0){
                                    oldDatos.push(dato)
                                }else{
                                    oldDatos.push(datosModificados.filter(it => it[id] === dato[id])[0])
                                }
                            })
                            let newDatos = []
                            datosModificados.forEach(dato => {
                                if(oldDatos.filter(it => it[id] === dato[id]).length === 0){
                                    newDatos.push(dato)
                                }
                            })
                            response = { [req]: [...oldDatos, ...newDatos] }
                        } else {
                            response = { [req]: datosModificados }
                        }
                    } else {
                        let oldDatos = []
                        let newDatos = []
                        if(objectCriterioBusqueda[tipo]){
                            if (request && request[req] && request[req].length > 0) {
                                request[req].forEach(dato => {
                                    if (datosGuardar[noSelected].filter(it => it[id] === dato[id]).length === 0){
                                        if(Utils.matchCriterioBusqueda(dato,objectCriterioBusqueda[tipo])){
                                            oldDatos.push({ ...dato, precio: calcularPorcentaje(dato.precio) })
                                        }else{
                                            oldDatos.push(dato)
                                        }
                                    } else {
                                        oldDatos.push(dato)
                                    }
                                })
                            }
                            datosGuardar[noSelected].forEach(dato => {
                                if (request && request[req]) {
                                    if (request[req].filter(it => it[id] === dato[id]).length === 0) {
                                        newDatos.push(dato)
                                    }
                                } else {
                                    newDatos.push(dato)
                                }
                            })
                        }else{
                            if (request && request[req] && request[req].length > 0) {
                                request[req].forEach(dato => {
                                    if (datosGuardar[noSelected].filter(it => it[id] === dato[id]).length === 0) {
                                        oldDatos.push({ ...dato, precio: calcularPorcentaje(dato.precio) })
                                    } else {
                                        oldDatos.push(dato)
                                    }
                                })
                            }
                            datosGuardar[noSelected].forEach(dato => {
                                if (request && request[req]) {
                                    if (request[req].filter(it => it[id] === dato[id]).length === 0) {
                                        newDatos.push(dato)
                                    }
                                } else {
                                    newDatos.push(dato)
                                }
                            })
                        }
                        response = {
                            [req]: [...oldDatos, ...newDatos],
                            [ajustarAll]: objectCriterioBusqueda[tipo] ? false : true,
                            [ajustarCriterio]: objectCriterioBusqueda && objectCriterioBusqueda[tipo] ? objectCriterioBusqueda[tipo] : null,
                            porcentajeAumento: parseFloat(datosGuardar.porcentaje),
                        }
                    }
                    return response
                }
                
                //Seteo la request con los nuevos valores:
                const pnRequest = datosGuardar && datosGuardar.nomencladas ? ajustarValores("pn") : {}
                const pnnRequest = datosGuardar && datosGuardar.noNomencladas ? ajustarValores("pnn") : {}
                const modulosRequest = datosGuardar && datosGuardar.modulos ? ajustarValores("modulos") : {}
                const newRequest = {
                    ...request,
                    ...pnRequest,
                    ...pnnRequest,
                    ...modulosRequest
                }

                dispatch(actions.setRequestConvenio(newRequest))
                setAplicoValoresPrestacionesUnit(true)
                setOpenAlert1({
                    "open": true, "mensaje":
                        `${(datosGuardar.nomencladas && datosGuardar.nomencladas.length > 0
                            || datosGuardar.noNomencladas && datosGuardar.noNomencladas.length > 0)
                            && !datosGuardar.modulos || datosGuardar.modulos.length === 0
                            ? 'Prestaciones '
                            : datosGuardar.nomencladas && datosGuardar.nomencladas.length === 0
                                && datosGuardar.noNomencladas && datosGuardar.noNomencladas.length === 0
                                && datosGuardar.modulos && datosGuardar.modulos.length > 0
                                ? 'Módulos'
                                : (datosGuardar.nomencladas && datosGuardar.nomencladas.length > 0
                                    || datosGuardar.noNomencladas && datosGuardar.noNomencladas.length > 0)
                                    && !datosGuardar.modulos || datosGuardar.modulos.length > 0
                                    ? 'Prestaciones y módulos' : ''} 
                            del convenio con ajuste por porcentaje APLICADO.
                        `
                })
                drawerCancelar()
                setSeleccion(null)
                break

            //VER PR QX:
            case 3:
                drawerCancelar()
                break

            //AGREGAR PRESTACIONES NOMENCLADAS
            case 4:
                setUpdateTable(true)
                var newPrestaciones = datosGuardar.prestaciones.map(it => {
                    return {
                        ...it,
                        precio: parseFloat(datosGuardar.precio).toFixed(2),
                        codigoExterno: datosGuardar.codigoExterno,
                        agregarPrestacion: true,
                        tableData: null
                    }
                })
                if (request && request.prestacionesNomencladas) {
                    var newNewPrestaciones = newPrestaciones.map(it => {
                        if (request.prestacionesNomencladas.filter(n => n.idPrestacion === it.idPrestacion).length > 0) {
                            return { ...it, agregarPrestacion: false, eliminarPrestacion: false }
                        } else {
                            return it
                        }
                    })
                    var oldPrestaciones = []
                    request.prestacionesNomencladas.forEach(it => {
                        if (newPrestaciones.filter(n => n.idPrestacion === it.idPrestacion).length === 0) {
                            oldPrestaciones.push(it)
                        }
                    })
                    dispatch(actions.setRequestConvenio({
                        ...request,
                        prestacionesNomencladas: [...newNewPrestaciones, ...oldPrestaciones]
                    }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNomencladas: newPrestaciones }))
                }
                setOpenAlert1({ "open": true, "mensaje": "Prestaciones AGREGADAS" })
                drawerCancelar()
                break

            //AGREGAR PRESTACIONES NO NOMENCLADAS
            case 5:
                setUpdateTable(true)
                var newPrestaciones = datosGuardar.prestaciones.map(it => {
                    return {
                        ...it,
                        precio: parseFloat(datosGuardar.precio).toFixed(2),
                        codigoExterno: datosGuardar.codigoExterno,
                        agregarPrestacion: true,
                        tableData: null
                    }
                })
                if (request && request.prestacionesNoNomencladas) {
                    var newNewPrestaciones = newPrestaciones.map(it => {
                        if (request.prestacionesNoNomencladas.filter(n => n.idPrestacion === it.idPrestacion).length > 0) {
                            return { ...it, agregarPrestacion: false, eliminarPrestacion: false }
                        } else {
                            return it
                        }
                    })
                    var oldPrestaciones = []
                    request.prestacionesNoNomencladas.forEach(it => {
                        if (newPrestaciones.filter(n => n.idPrestacion === it.idPrestacion).length === 0) {
                            oldPrestaciones.push(it)
                        }
                    })
                    dispatch(actions.setRequestConvenio({
                        ...request,
                        prestacionesNoNomencladas: [...newNewPrestaciones, ...oldPrestaciones]
                    }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNoNomencladas: newPrestaciones }))
                }
                setOpenAlert1({ "open": true, "mensaje": "Prestaciones AGREGADAS." })
                drawerCancelar()

                break

            //EDITAR PRESTACIONES NOMENCLADAS
            case 6:
                var temp = []
                var compareListadosCostosExtras = (editRow, listadoCostosExtra) => {
                    let arr1 = editRow && editRow.costosExtras ?
                        editRow.costosExtras.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
                        : []
                    let arr2 = listadoCostosExtra ?
                        listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
                        : []
                    arr1 && arr1.sort();
                    arr2 && arr2.sort();
                    if (arr1 && arr2) {
                        return arr1.length === arr2.length && arr1.every(function (v, i) { return v === arr2[i] })
                    } else {
                        return true
                    }
                }
                if (request && request.prestacionesNomencladas) {
                    if (request.prestacionesNomencladas.filter(it => it.idPrestacion === datosGuardar.idPrestacion).length > 0) {
                        request.prestacionesNomencladas.forEach(it => {
                            if (it.idPrestacion !== datosGuardar.idPrestacion) {
                                temp.push(it)
                            } else {
                                temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                            }
                        })
                    } else {
                        temp.push(...request.prestacionesNomencladas, { ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                    }
                } else {
                    temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                }
                dispatch(actions.setRequestConvenio({ ...request, prestacionesNomencladas: temp }))
                setOpenAlert1({
                    'open': true,
                    'mensaje': `Prestación EDITADA. ${!compareListadosCostosExtras(editRow, datosGuardar.costosExtras) ? 'Costo extra MODIFICADO en la práctica ' + editRow.codigo + ' del proveedor ' + proveedor.cuit : ''}`
                })
                drawerCancelar()
                break

            //DEJAR DE USAR NBU
            case 7:
                dispatch(actions.setRequestConvenio({ ...request, valorNBU: 0, prestacionesNBU: [], setAllPnbuPrQx: false }))
                drawerCancelar()
                break

            //AGREGAR MODULO
            case 8:
                setUpdateTable(true)
                var newModulo = {
                    ...datosGuardar,
                    precio: parseFloat(datosGuardar.precio).toFixed(2),
                    agregarModulo: true,
                    tableData: null
                }
                if (request && request.modulos) {
                    var newReq = []
                    if (request.modulos.filter(it => it.idModulo === newModulo.idModulo).length > 0) {
                        newReq.push({ ...newModulo, eliminarModulo: false, agregarModulo: false })
                    } else {
                        newReq.push(newModulo)
                    }
                    newReq.push(...request.modulos.filter(it => it.idModulo !== newModulo.idModulo))
                    dispatch(actions.setRequestConvenio({ ...request, modulos: newReq }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, modulos: [newModulo] }))
                }
                setOpenAlert1({ "open": true, "mensaje": `Módulo ${datosGuardar.codigo} AGREGADO.` })
                drawerCancelar()
                break

            //VER INCLUSIONES MODULO: 
            case 9:
                drawerCancelar()
                break

            //EDITAR MODULO:     
            case 10:
                var temp = []
                if (request && request.modulos) {
                    if (request.modulos.filter(it => it.idModulo === datosGuardar.idModulo).length > 0) {
                        request.modulos.forEach(it => {
                            if (it.idModulo === datosGuardar.idModulo) { temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) }) }
                            else { temp.push(it) }
                        })
                    } else {
                        temp.push(...request.modulos, { ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                    }
                } else {
                    temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                }
                dispatch(actions.setRequestConvenio({ ...request, modulos: temp }))
                setOpenAlert1({ 'open': true, 'mensaje': `Precio del módulo ${datosGuardar.codigo} EDITADO` })
                drawerCancelar()
                break

            //IMPORTAR PN
            case 11:
                var idConvenio = convenioActual && convenioActual.idConvenio 
                    ? convenioActual.idConvenio 
                    : convenioSeleccionado && convenioSeleccionado.idConvenio 
                    ? convenioSeleccionado.idConvenio 
                    : ''
                var formData = new FormData();
                formData.set("excelFile", importFile)
                formData.set("idConvenio", idConvenio)
                dispatch(actions.importarPrestacionesNomencladas(formData, callbackImportar))
                drawerCancelar()
                break

            //IMPORTAR PNN
            case 12:
                var idConvenio = convenioActual && convenioActual.idConvenio 
                ? convenioActual.idConvenio 
                : convenioSeleccionado && convenioSeleccionado.idConvenio 
                ? convenioSeleccionado.idConvenio 
                : ''
                var formData = new FormData();
                formData.set("excelFile", importFile)
                formData.set("idConvenio", idConvenio)
                dispatch(actions.importarPrestacionesNoNomencladas(formData, callbackImportar))
                drawerCancelar()
                break

            //IMPORTAR MODULOS
            case 13:
                var idConvenio = convenioActual && convenioActual.idConvenio 
                ? convenioActual.idConvenio 
                : convenioSeleccionado && convenioSeleccionado.idConvenio 
                ? convenioSeleccionado.idConvenio 
                : ''
                var formData = new FormData();
                formData.set("excelFile", importFile)
                formData.set("idConvenio", idConvenio)
                dispatch(actions.importarModulos(formData, callbackImportar))
                drawerCancelar()
                break

            //EDITAR PRESTACIONES NO NOMENCLADAS
            case 14:
                var temp = []
                var compareListadosCostosExtras = (editRow, listadoCostosExtra) => {
                    let arr1 = editRow && editRow.costosExtras ?
                        editRow.costosExtras.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
                        : []
                    let arr2 = listadoCostosExtra ?
                        listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
                        : []
                    arr1 && arr1.sort();
                    arr2 && arr2.sort();
                    if (arr1 && arr2) {
                        return arr1.length === arr2.length && arr1.every(function (v, i) { return v === arr2[i] })
                    } else {
                        return true
                    }
                }
                if (request && request.prestacionesNoNomencladas) {
                    if (request.prestacionesNoNomencladas.filter(it => it.idPrestacion === datosGuardar.idPrestacion).length > 0) {
                        request.prestacionesNoNomencladas.forEach(it => {
                            if (it.idPrestacion !== datosGuardar.idPrestacion) {
                                temp.push(it)
                            } else {
                                temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                            }
                        })
                    } else {
                        temp.push(...request.prestacionesNoNomencladas, { ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                    }
                } else {
                    temp.push({ ...datosGuardar, precio: parseFloat(datosGuardar.precio).toFixed(2) })
                }
                dispatch(actions.setRequestConvenio({ ...request, prestacionesNoNomencladas: temp }))
                setOpenAlert1({
                    'open': true,
                    'mensaje': `Prestación EDITADA. ${!compareListadosCostosExtras(editRow, datosGuardar.costosExtras) ? 'Costo extra MODIFICADO en la práctica ' + editRow.codigo + ' del proveedor ' + proveedor.cuit : ''}`
                })
                drawerCancelar()
                break

            default:
                break
        }
    }

    //Contenido Drawers: 
    const contenidoDrawers = {
        1: {
            title: 'Editar Vigencia',
            texto: <DrawerFechaVigencia
                confirmarFechaVigencia={confirmarFechaVigencia}
                setConfirmarFechaVigencia={setConfirmarFechaVigencia}
                drawerCancelar={drawerCancelar}
                setOpenAlert1={setOpenAlert1}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                convenioSeleccionado={convenioSeleccionado}
            />,
            botonSiguiente: confirmarFechaVigencia ? false : true, botonSiguienteLabel: 'Continuar', botonSiguienteVariant: 'contained',
            botonCancelar: confirmarFechaVigencia ? false : true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined',
            width: "400px"
        },
        2: {
            title: 'Ajustar Precio',
            texto: <DrawerAjustarValores
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                setDatosGuardar={setDatosGuardar}
                seleccion={seleccion}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Aplicar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        3: {
            title: 'Ver practicas pre quirúrgicas',
            texto: <DrawerPrQx
                convenio={editarConvenioFuturo ? convenioSeleccionado : convenioActual}
            />,
            botonSiguiente: false,
            botonCancelar: true, botonCancelarLabel: 'Cerrar', botonCancelarVariant: 'contained'
        },
        4: {
            title: 'Agregar prestaciones nomencladas',
            texto: <DrawerAgregarPrestacion
                esNomenclada={true}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
                setOpenSnackBar={setOpenSnackBar}
                convenio={editarConvenioFuturo ? convenioSeleccionado : convenioActual}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Agregar seleccionadas', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        5: {
            title: 'Agregar prestaciones no nomencladas',
            texto: <DrawerAgregarPrestacion
                esNomenclada={false}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
                setOpenSnackBar={setOpenSnackBar}
                convenio={editarConvenioFuturo ? convenioSeleccionado : convenioActual}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Agregar seleccionadas', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        6: {
            title: 'Editar',
            texto: <DrawerEditarPrestacion
                editRow={editRow}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Guardar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        7: {
            title: 'Dejar de usar NBU', habilitarSiguiente: true, width: '400px',
            texto: <DrawerStopNBU
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Confirmar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        8: {
            title: 'Agregar módulo',
            texto: <DrawerAgregarModulo
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
                setOpenSnackBar={setOpenSnackBar}
                convenio={editarConvenioFuturo ? convenioSeleccionado : convenioActual}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Confirmar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        9: {
            title: `Inclusiones del módulo ${editRow && editRow.codigo}`,
            texto: <DrawerInclusiones convenios={true} request={editRow} />,
            botonSiguiente: false,
            botonCancelar: false,
        },
        10: {
            title: `Cargar costo módulo`, width: '400px',
            texto: <DrawerEditarModulo
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
                editRow={editRow}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Guardar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        11: {
            title: 'Importar prestaciones nomencladas desde Excel', width: '400px',
            texto: <DrawerImportar
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                textCol='Código / Precio / Código externo'
                importFile={importFile} setImportFile={setImportFile}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Importar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        12: {
            title: 'Importar prestaciones no nomencladas desde Excel', width: '400px',
            texto: <DrawerImportar
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                textCol='Código / Precio / Código externo'
                importFile={importFile} setImportFile={setImportFile}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Importar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        13: {
            title: 'Importar módulos desde Excel', width: '400px',
            texto: <DrawerImportar
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                textCol='Código / Precio / Código externo'
                importFile={importFile} setImportFile={setImportFile}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Importar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        14: {
            title: 'Editar',
            texto: <DrawerEditarPrestacion
                editRow={editRow}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
                datosGuardar={datosGuardar} setDatosGuardar={setDatosGuardar}
            />,
            botonSiguiente: true, botonSiguienteLabel: 'Guardar', botonSiguienteVariant: 'contained',
            botonCancelar: true, botonCancelarLabel: 'Cancelar', botonCancelarVariant: 'outlined'
        },
        15: {
            title: convenioSeleccionado ? "Prestaciones NBU - Convenio Version " + convenioSeleccionado.version : '',
            texto: <DrawerPrestacionNBU
                convenioSeleccionado={convenioSeleccionado}
                setDeshabilitarSiguiente={setDeshabilitarSiguiente}
            />,
            botonCancelar: true,
            botonCancelarLabel: 'Cerrar',
            botonCancelarVariant: 'contained',
        },
    }
    const maxSteps = contenidoDrawers.length;


    return (
        <Drawer
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            anchor='right'
            toggleDrawer={toggleDrawer}
            variant={'contained'}
            button={false}
            title={drawerNro && contenidoDrawers[drawerNro].title}
            titleStyleJustify='flex-start'
            titleStyleMargin={{ marginLeft: '20px' }}
            width={drawerNro && contenidoDrawers[drawerNro].width ? contenidoDrawers[drawerNro].width : '700px'}
        >
            <ContenidoDrawer
                contenido={drawerNro && contenidoDrawers[drawerNro]}
                //Cancelar
                botonCancelar={drawerNro && contenidoDrawers[drawerNro].botonCancelar}
                botonCancelarLabel={drawerNro && contenidoDrawers[drawerNro].botonCancelarLabel}
                botonCancelarDisabled={drawerNro && contenidoDrawers[drawerNro].botonCancelarDisabled}
                botonCancelarVariant={drawerNro && contenidoDrawers[drawerNro].botonCancelarVariant}
                handleCancelar={() => drawerCancelar(drawerNro)}
                //Siguiente
                botonSiguiente={drawerNro && contenidoDrawers[drawerNro].botonSiguiente}
                botonSiguienteLabel={drawerNro && contenidoDrawers[drawerNro].botonSiguienteLabel}
                botonSiguienteDisabled={drawerNro && contenidoDrawers[drawerNro].habilitarSiguiente ? false : deshabilitarSiguiente}
                botonSiguienteVariant={drawerNro && contenidoDrawers[drawerNro].botonSiguienteVariant}
                handleSiguiente={() => drawerGuardar(drawerNro)}
            />
        </Drawer>
    )
}

export default DrawersConvenio