import React, { useState, useRef, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Components;
import CustomTableContrataciones from '../../../commons/Table/CustomTableContrataciones'
import BuscadorContrataciones from '../../../commons/Buscador/BuscadorContrataciones';
import CustomButton from '../../../commons/Button/CustomButton';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
//Material:
import { Grid, IconButton, TextField, Typography, ClickAwayListener } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//Tippy:
import { Tooltip as TippyTooltip } from 'react-tippy';
//Icons: 
import { Create, Delete, Add, Check, NotInterested, FilterNoneSharp, Warning, Close } from '@material-ui/icons';
import IconExcel from '../../../../commons/assets/Contrataciones/Modulos/file-excel-outline-modulos.png'
import SVGiconInclusion from '../../../../commons/assets/Contrataciones/Modulos/format-list-bulleted-square.svg'
import Utils from '../../../../Utils/utils';

const useStyles = makeStyles((theme) => ({
    iconAction: {
        width: '35px',
        height: '35px',
        margin: '0 3px',
        padding: '0',
        border: '1px solid grey',
        borderRadius: '15%'
    },
    qxFalse: {
        width: '35px',
        height: '35px',
        margin: '0 3px',
        padding: '0',
        border: '1px solid grey',
        borderRadius: '15%',
        "&:nth-child(1)": {
            fontSize: '8px',
        },
    },
    qxTrue: {
        width: '35px',
        height: '35px',
        margin: '0 3px',
        padding: '0',
        border: '1px solid #2dc76d',
        borderRadius: '15%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "&:nth-child(1)": {
            fontSize: '8px',
            color: '#2dc76d'
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
    },
    cabecera: {
        fontSize: "10px",
        color: "#747474",
    },
    textoAvatar: {
        color: "#505050",
        fontSize: "14px"
    },
    tooltip: {
        width: '330px',
        margin: '10px 125px 0 0',
        padding: '10px 25px 10px 15px',
        border: '1px solid orange',
        backgroundColor: 'white',
    }
}))


const TablasConvenio = props => {
    const { pn, pnn, pnbu, modulos, dataBack, esEditar, convenioHistorico,
        data, loadingDataTabla, errorDataTabla,
        page, setPage, rowsPerPage, setRowsPerPage,
        valueNBU, setValueNBU,
        setDrawerNro, setEditRow,
        setOpenAlert1,
        criterioBusqueda, setCriterioBusqueda,
        seleccion, setSeleccion,
        setFirstRenderBusqueda } = props
    const classes = useStyles();
    const [openSnackBar, setOpenSnackBar] = useState({ 'open': errorDataTabla, 'title': 'Hubo un error en el sistema. Por favor intente nuevamente.', 'severity': 'error' });
    //Redux: 
    const dispatch = useDispatch()
    const request = useSelector(state => state.convenio.request)
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    //Convenio: 
    const convenio = convenioHistorico !== undefined ? convenioHistorico : convenioActual
    //Tabla:
    const [dataTabla, setDataTabla] = useState(data.objetos)
    const [loadingExportar, setLoadingExportar] = useState(false)
    const [loadingTabla, setLoadingTabla] = useState(true)
    //NBU: 
    const [valorNBUTabla, setValorNBUTabla] = useState(valueNBU ? valueNBU : '')
    const [errorValueNBU, setErrorValueNBU] = useState(false)
    const [disableAplicar, setDisableAplicar] = useState(true)
    const noMostrarWarning = document.cookie ? true : false;
    const [showWarningNBU, setShowWarningNBU] = useState(false)
    const editNBURef = useRef();
    const inputRef = useRef();
    //Exportar:
    const [warningExportar, setWarningExportar] = useState({ open: false, text: '', warning: false })

    useEffect(() => {
        setTimeout(() => {
            setLoadingTabla(false)
        }, 400)
    }, [loadingDataTabla])

    useEffect(() => {
        if (errorValueNBU) {
            setDisableAplicar(true)
        }
    }, [errorValueNBU])

    //Cargo dataTabla segun seleccion: 
    useEffect(() => {
        let seleccionadas = pn ? "nomencladas" : pnn ? "noNomencladas" : "modulos"
        let noSeleccionadas = pn ? "nomencladasNoSeleccionadas" : pnn ? "noNomencladasNoSeleccionadas" : "modulosNoSeleccionados"
        let id = pn || pnn ? "idPrestacion" : "idModulo"
        let arr = []
        if (seleccionadas && seleccion && seleccion[seleccionadas]) {
            if (seleccion[noSeleccionadas]) {
                data.objetos.forEach(dato => {
                    if (seleccion[noSeleccionadas].filter(it => it[id] === dato[id]).length > 0) {
                        arr.push({ ...dato, tableData: { ...dato.tableData, checked: false } })
                    } else {
                        arr.push({ ...dato, tableData: { ...dato.tableData, checked: true } })
                    }
                })
            } else {
                data.objetos.forEach(dato => {
                    if (seleccion[seleccionadas].filter(it => it[id] === dato[id]).length > 0) {
                        arr.push({ ...dato, tableData: { ...dato.tableData, checked: true } })
                    } else {
                        arr.push(dato)
                    }
                })
            }
            setDataTabla({ ...data, objetos: arr })
        } else {
            data && data.objetos && data.objetos.forEach(dato => {
                arr.push({ ...dato, tableData: { ...dato.tableData, checked: false } })
            })
            setDataTabla({ ...data, objetos: arr })
        }
    }, [data])


    //SetQx cuando se selecciona algo. SetDataTabla cuando selection pasa a null:
    useEffect(() => {
        //DataTabla:
        if (dataTabla && dataTabla.objetos && dataTabla.objetos.length > 0 && seleccion === null) {
            let arr = [];
            dataTabla.objetos.map(it => {
                arr.push({ ...it, tableData: { ...it.tableData, checked: false } })
            })
            setDataTabla({ ...dataTabla, objetos: arr })
        }
    }, [seleccion])


    //Handle Seleccion Tabla
    const handleClick3 = (rows, row) => {
        let seleccionadas = pn ? "nomencladas" : pnn ? "noNomencladas" : pnbu ? "pnbu" : "modulos"
        let noSeleccionadas = pn ? "nomencladasNoSeleccionadas" : pnn ? "noNomencladasNoSeleccionadas" : pnbu ? "pnbuNoSeleccionadas" : "modulosNoSeleccionados"
        let id = pn || pnn || pnbu ? "idPrestacion" : "idModulo"
        //Selecciono o desseleccionar una por una. Si no está la agrego. Si está la saco:
        if (row && row !== undefined) {
            if (seleccion && seleccion[seleccionadas]) {
                if (seleccion[noSeleccionadas]) {
                    if (seleccion[noSeleccionadas].filter(it => it[id] === row[id]).length === 0) {
                        setSeleccion({
                            ...seleccion,
                            [noSeleccionadas]: [...seleccion[noSeleccionadas], row],
                        })
                    } else {
                        setSeleccion({
                            ...seleccion,
                            [noSeleccionadas]: seleccion[noSeleccionadas].filter(it => it[id] !== row[id]),
                        })
                    }
                } else {
                    if (seleccion[seleccionadas].filter(it => it[id] === row[id]).length === 0) {
                        setSeleccion({ ...seleccion, [seleccionadas]: [...seleccion[seleccionadas], row] })
                    } else {
                        setSeleccion({ ...seleccion, [seleccionadas]: seleccion[seleccionadas].filter(it => it[id] !== row[id]) })
                    }
                }
            } else {
                setSeleccion({ ...seleccion, [seleccionadas]: [row] })
            }
            //Select All 
        } else if (rows.length === dataTabla.cantidadTotal && row === undefined) {
            setSeleccion({ ...seleccion, [seleccionadas]: rows, [noSeleccionadas]: [] })
            //Deselect All
        } else if (rows.length === 0 && row === undefined) {
            setSeleccion({ ...seleccion, [seleccionadas]: [], [noSeleccionadas]: null })
        }
    }


    //Acciones botones tabla:
    const handleDeleteOne = (row) => {
        if (pn) {
            let dato = { ...row, eliminarPrestacion: true }
            if (dato.agregarPrestacion) {
                dispatch(actions.setRequestConvenio({
                    ...request,
                    prestacionesNomencladas: [...(request.prestacionesNomencladas.filter(it => it.idPrestacion !== dato.idPrestacion))]
                }))
            } else {
                if (request && request.prestacionesNomencladas && request.prestacionesNomencladas.filter(it => it.idPrestacion === dato.idPrestacion).length > 0) {
                    dispatch(actions.setRequestConvenio({
                        ...request, prestacionesNomencladas: [
                            ...request.prestacionesNomencladas.filter(it => it.idPrestacion !== dato.idPrestacion),
                            dato
                        ]
                    }))
                }
                else if (request && request.prestacionesNomencladas && request.prestacionesNomencladas.filter(it => it.idPrestacion === dato.idPrestacion).length === 0) {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNomencladas: [...request.prestacionesNomencladas, dato] }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNomencladas: [dato] }))
                }
            }
            setOpenAlert1({ "open": true, "mensaje": 'Prestación ELIMINADA.' })
        }
        if (pnn) {
            let dato = { ...row, eliminarPrestacion: true }
            if (dato.agregarPrestacion) {
                dispatch(actions.setRequestConvenio({
                    ...request,
                    prestacionesNoNomencladas: [...(request.prestacionesNoNomencladas.filter(it => it.idPrestacion !== dato.idPrestacion))]
                }))
            } else {
                if (request && request.prestacionesNoNomencladas && request.prestacionesNoNomencladas.filter(it => it.idPrestacion === dato.idPrestacion).length > 0) {
                    dispatch(actions.setRequestConvenio({
                        ...request, prestacionesNoNomencladas: [
                            ...request.prestacionesNoNomencladas.filter(it => it.idPrestacion !== dato.idPrestacion),
                            dato
                        ]
                    }))
                }
                else if (request && request.prestacionesNoNomencladas && request.prestacionesNoNomencladas.filter(it => it.idPrestacion === dato.idPrestacion).length === 0) {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNoNomencladas: [...request.prestacionesNoNomencladas, dato] }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, prestacionesNoNomencladas: [dato] }))
                }
            }
            setOpenAlert1({ "open": true, "mensaje": 'Prestación ELIMINADA.' })
        }
        if (modulos) {
            let dato = { ...row, eliminarModulo: true }
            if (dato.agregarModulo) {
                dispatch(actions.setRequestConvenio({
                    ...request,
                    modulos: [...(request.modulos.filter(it => it.idModulo !== dato.idModulo))]
                }))
            } else {
                if (request && request.modulos && request.modulos.filter(it => it.idModulo === dato.idModulo).length > 0) {
                    dispatch(actions.setRequestConvenio({
                        ...request, modulos: [
                            ...request.modulos.filter(it => it.idModulo !== dato.idModulo),
                            dato
                        ]
                    }))
                }
                else if (request && request.modulos && request.modulos.filter(it => it.idModulo === dato.idModulo).length === 0) {
                    dispatch(actions.setRequestConvenio({ ...request, modulos: [...request.modulos, dato] }))
                } else {
                    dispatch(actions.setRequestConvenio({ ...request, modulos: [dato] }))
                }
            }
            setOpenAlert1({ "open": true, "mensaje": 'Módulo ELIMINADO.' })
        }
    }
    const handleDeleteMany = () => {
        let seleccionadas = pn ? "nomencladas" : pnn ? "noNomencladas" : "modulos"
        let req = pn ? "prestacionesNomencladas" : pnn ? "prestacionesNoNomencladas" : "modulos"
        let noSeleccionadas = pn ? "nomencladasNoSeleccionadas" : pnn ? "noNomencladasNoSeleccionadas" : "modulosNoSeleccionados"
        let id = pn || pnn ? "idPrestacion" : "idModulo"
        let add1 = pn || pnn ? "agregarPrestacion" : "agregarModulo"
        let delete1 = pn || pnn ? "eliminarPrestacion" : "eliminarModulo"
        let deleteAll = pn ? "eliminarTodasNomencladas" : pnn ? "eliminarTodasNoNomencladas" : "eliminarTodosModulos"
        let criterios = pn ? "eliminarNomencladasCriterio" : pnn ? "eliminarNoNomencladasCriterio" : "eliminarModulosCriterio"

        if (seleccion[seleccionadas].length === dataTabla.cantidadTotal) {

            let tempRequest = { [req]: [], [criterios]: request && request[criterios] ? request[criterios] : [], [deleteAll]: null }

            //Proceso el array de registros no seleccionados:
            if (request && request[req] && request[req].length > 0) {
                request[req].forEach(dato => {
                    if (seleccion[noSeleccionadas] && seleccion[noSeleccionadas].filter(it => it[id] === dato[id]).length > 0) {
                        tempRequest[req].push({ ...dato, [add1]: true, tableData: { checked: false } })
                    }
                    else if (criterioBusqueda) {
                        if (!Utils.matchCriterioBusqueda(dato, criterioBusqueda)) {
                            tempRequest[req].push({ ...dato, tableData: { checked: false } })
                        }
                    }
                })
                seleccion[noSeleccionadas] && seleccion[noSeleccionadas].forEach(dato => {
                    if (tempRequest[req].filter(it => it[id] === dato[id]).length === 0) {
                        tempRequest[req].push({ ...dato, [add1]: true, tableData: { checked: false } })
                    }
                })
            } else {
                if (seleccion[noSeleccionadas]) {
                    tempRequest[req].push(...seleccion[noSeleccionadas].map(it => { return { ...it, agregarPrestacion: true } }))
                }
            }

            //Proceso el array de criterios de búsqueda:
            if (criterioBusqueda) {
                tempRequest[criterios].push(criterioBusqueda)
                tempRequest[deleteAll] = false
            } else {
                tempRequest[criterios] = []
                tempRequest[deleteAll] = true
            }

            dispatch(actions.setRequestConvenio({ ...request, ...tempRequest }))

            setOpenAlert1({
                "open": true,
                "mensaje": dataTabla && dataTabla.length > 0 && seleccion !== null && seleccion[seleccionadas].length > 1 ?
                    `${seleccion[seleccionadas].length - seleccion[noSeleccionadas].length} ${pn || pnn ? 'prestaciones fueron ELIMINADAS.' : 'módulos fueron ELIMINADOS.'}`
                    : `${pn || pnn ? 'Prestación ELIMINADA.' : 'Módulo ELIMINADO'}`
            })

        } else {
            let newDatos = []
            let oldDatos = []
            newDatos = seleccion[seleccionadas].map(it => ({ ...it, [delete1]: true }))
            if (request && request[req] && request[req].length > 0) {
                request[req].forEach(it => {
                    if (newDatos.filter(dato => dato[id] === it[id]).length === 0) {
                        oldDatos.push(it)
                    }
                })
                dispatch(actions.setRequestConvenio({
                    ...request,
                    [req]: [...oldDatos, ...newDatos.filter(it => it[add1] !== true)]
                }))
            } else {
                dispatch(actions.setRequestConvenio({ ...request, [req]: newDatos }))
            }
            setOpenAlert1({
                "open": true,
                "mensaje": seleccion[seleccionadas].length > 1 ?
                    `${seleccion[seleccionadas].length} ${pn || pnn ? 'prestaciones fueron ELIMINADAS.' : 'módulos fueron ELIMINADOS.'}`
                    : `${pn || pnn ? 'Prestación ELIMINADA.' : 'Módulo ELIMINADO'}`
            })
        }
        setSeleccion({ ...seleccion, [seleccionadas]: null, [noSeleccionadas]: null })
    }
    const handleOneQX = (row) => {
        let dato = { ...row, esPrQx: !row.esPrQx, tableData: { ...row.tableData, checked: false } }
        let req = pn ? "prestacionesNomencladas" : "prestacionesNBU"
        if (request && request[req] && request[req].length > 0) {
            let arr = [];
            if (request[req].filter(it => it.idPrestacion === dato.idPrestacion).length === 0) {
                arr.push(...request[req], dato)
            } else {
                request[req].forEach(it => {
                    if (it.idPrestacion !== dato.idPrestacion) {
                        arr.push(it)
                    } else {
                        arr.push(dato)
                    }
                })
            }
            dispatch(actions.setRequestConvenio({ ...request, [req]: arr }))
        } else {
            dispatch(actions.setRequestConvenio({ ...request, [req]: [dato] }))
        }
    }
    const handleManyQX = () => {
        let selec = pn ? "nomencladas" : "pnbu"
        let req = pn ? "prestacionesNomencladas" : "prestacionesNBU"
        let noSelecc = pn ? "nomencladasNoSeleccionadas" : "pnbuNoSeleccionadas"
        let id = "idPrestacion"
        let setAll = pn ? "marcarPrQxTodasNomencladas" : "marcarPrQxTodasNBU"
        let setCriterio = pn ? "prQxNomencladasCriterio" : "prQxNBUCriterio"

        //Seteo isPreQx
        let isPreQx
        for (let i = 0; i < seleccion[selec].length; i++) {
            if (seleccion[selec][i][id] && seleccion[selec][i].tableData.checked === true) {
                isPreQx = typeof seleccion[selec][i].esPrQx === 'boolean' ? !seleccion[selec][i].esPrQx : true
                break
            }
        }

        if (seleccion && seleccion[selec] && seleccion[selec].length === dataTabla.cantidadTotal) {
            let tempRequest = []
            if (criterioBusqueda) {
                if (request && request[req] && request[req].length > 0) {
                    request[req].forEach(dato => {
                        if (seleccion[noSelecc] && seleccion[noSelecc].filter(it => it[id] === dato[id]).length > 0) {
                            tempRequest.push({ ...dato, tableData: { checked: false } })
                        }
                        else if (Utils.matchCriterioBusqueda(dato, criterioBusqueda)) {
                            tempRequest.push({ ...dato, esPrQx: isPreQx, tableData: { checked: false } })
                        } else if (!Utils.matchCriterioBusqueda(dato, criterioBusqueda)) {
                            tempRequest.push({ ...dato, tableData: { checked: false } })
                        }
                    })
                    seleccion[noSelecc] && seleccion[noSelecc].forEach(dato => {
                        if (tempRequest.filter(it => it[id] === dato[id]).length === 0) {
                            tempRequest.push({ ...dato, esPrQx: !isPreQx, tableData: { checked: false } })
                        }
                    })
                } else {
                    if (seleccion[noSelecc]) {
                        tempRequest.push(...seleccion[noSelecc])
                    }
                }

                let tempCriterioValores = []
                if (request && request[setCriterio] && request[setCriterio].length > 0) {
                    if (request[setCriterio].filter(it => it.criterio === criterioBusqueda).length) {
                        request[setCriterio].forEach(it => {
                            if (it.criterio === criterioBusqueda) {
                                tempCriterioValores.push({ criterio: criterioBusqueda, prQx: isPreQx })
                            } else {
                                tempCriterioValores.push(it,)
                            }
                        })
                    } else {
                        tempCriterioValores = [...request[setCriterio], { criterio: criterioBusqueda, prQx: isPreQx }]
                    }

                } else {
                    tempCriterioValores = [{ criterio: criterioBusqueda, prQx: isPreQx }]
                }

                dispatch(actions.setRequestConvenio({
                    ...request,
                    [req]: tempRequest,
                    [setCriterio]: tempCriterioValores
                }))
            } else {
                if (request && request[req] && request[req].length > 0) {
                    request[req].forEach(dato => {
                        if (seleccion[noSelecc] && seleccion[noSelecc].filter(it => it[id] === dato[id]).length > 0) {
                            tempRequest.push({ ...dato, tableData: { checked: false } })
                        } else {
                            tempRequest.push({ ...dato, esPrQx: isPreQx, tableData: { checked: false } })
                        }
                    })
                    seleccion[noSelecc] && seleccion[noSelecc].forEach(dato => {
                        if (tempRequest.filter(it => it[id] === dato[id]).length === 0) {
                            tempRequest.push({ ...dato, esPrQx: !isPreQx, tableData: { checked: false } })
                        }
                    })
                } else {
                    if (seleccion[noSelecc]) {
                        tempRequest.push(...seleccion[noSelecc])
                    }
                }
                dispatch(actions.setRequestConvenio({
                    ...request,
                    [setAll]: isPreQx,
                    [req]: tempRequest,
                    [setCriterio]: null
                }))
            }

        } else {
            let newDatos = []
            let allDatos = []
            newDatos = seleccion[selec].map(it => ({ ...it, esPrQx: isPreQx, tableData: { ...it.tableData, checked: false } }))
            if (request && request[req] && request[req].length > 0) {
                request[req].forEach(oldDato => {
                    let presRepe = newDatos.filter(it => it[id] === oldDato[id])[0]
                    if (presRepe) {
                        allDatos.push(presRepe)
                        newDatos = newDatos.filter(it => it[id] !== presRepe[id])
                    } else {
                        allDatos.push(oldDato)
                    }
                })
                allDatos.push(...newDatos)
                dispatch(actions.setRequestConvenio({ ...request, [req]: allDatos }))
            } else {
                dispatch(actions.setRequestConvenio({ ...request, [req]: newDatos }))
            }
        }
        setSeleccion({ ...seleccion, [selec]: null, [noSelecc]: null })
    }
    const handleAdd = (row) => {
        if (pn) setDrawerNro(4)
        if (pnn) setDrawerNro(5)
        if (modulos) setDrawerNro(8)
    }
    const handleEditRow = (row) => {
        setEditRow(row)
        if (pn) setDrawerNro(6)
        if (pnn) setDrawerNro(14)
        if (modulos) setDrawerNro(10)
    }
    const onChangeValueNBU = (e) => {
        var regEx1 = /^([0-9]{1,4}\.?)$/
        var regEx2 = /^([0-9]{1,4}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,4}\.)$/

        if (request && request.valorNBU === e.target.value) {
            setValueNBU(e.target.value)
            setErrorValueNBU(false)
            setDisableAplicar(true)
            setTimeout(() => { editNBURef.current.focus() }, 50)
        }
        else if ((!request || !request.valorNBU) && convenio && convenio.valorNbu === parseFloat(e.target.value)) {
            setValueNBU(e.target.value)
            setErrorValueNBU(false)
            setDisableAplicar(true)
            setTimeout(() => { editNBURef.current.focus() }, 50)
        }
        else if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
            setValueNBU(e.target.value)
            setDisableAplicar(false)
            setValueNBU(e.target.value)
            setTimeout(() => { editNBURef.current.focus() }, 50)
            if (regEx3.test(e.target.value)) { setErrorValueNBU(true) }
            else { setErrorValueNBU(false) }
        }

        if (e.target.value === '') {
            setErrorValueNBU(true)
            setValueNBU(e.target.value)
            setDisableAplicar(true)
        }

        if (!isNaN(e.target.value) && e.target.value.includes(".")) {
            let string = e.target.value.split(".")
            let enteros = string[0].length <= 4;
            let decimales = string[1].length <= 2;
            let decimalesNumeros = regEx1.test(string[1])
            if (enteros && decimales && decimalesNumeros) {
                setValueNBU(e.target.value)
                setDisableAplicar(false)
                setValueNBU(e.target.value)
            } else {
                setValueNBU(e.target.value)
                setErrorValueNBU(false)
                setDisableAplicar(true)
            }
        }

        if (e.target.value === "0" || e.target.value.startsWith("0")) {
            setDisableAplicar(true)
            setErrorValueNBU(true)
        }

    }
    const onClickAplicarValueNBU = () => {
        if (noMostrarWarning) {
            aplicarValueNBU()
        } else {
            setShowWarningNBU(true)
        }
    }
    const aplicarValueNBU = () => {
        if (!noMostrarWarning) {
            if (inputRef.current.checked) {
                document.cookie = "stop-warning=true"
            }
        }
        setShowWarningNBU(false)
        setDisableAplicar(true)
        dispatch(actions.setRequestConvenio({ ...request, valorNBU: valueNBU }))
        setValorNBUTabla(valueNBU)
    }
    const cancelarValueNBU = () => {
        setShowWarningNBU(false)
    }
    const handleVerInclusiones = (row) => {
        setEditRow(row)
        setDrawerNro(9)
    }
    const handleImportar = () => {
        if (pn) setDrawerNro(11)
        if (pnn) setDrawerNro(12)
        if (modulos) setDrawerNro(13)
    }
    const callBackExportar2 = (boolean) => {
        if (boolean) {
            setOpenSnackBar({
                "open": true,
                "title": 'Hubo un error al exportar. Por favor intente nuevamente.',
                "severity": 'error'
            })
            setLoadingExportar(false)
        } else {
            setLoadingExportar(false)
        }
    }
    const callbackExportar1 = (boolean, datos) => {
        if (boolean) {
            let nombreArchivo = pn ? 'Convenio - Nomencladas.xlsx' : pnn ? 'Convenio - No Nomencladas.xlsx' : 'Convenio - Modulos.xlsx'
            let tituloArchivo = pn ? `Prestaciones nomencladas` : pnn ? `Prestaciones no nomencladas` : `Módulos`
            let titulos = pn || pnn ? ['CODIGO', 'DESCRIPCION', 'PRECIO'] : ['CODIGO', 'NOMBRE', 'DESCRIPCION', 'PRECIO', 'INCLUSIONES']
            let arr = []
            if (pn || pnn) {
                datos && datos.objetos && datos.objetos.length > 0 && datos.objetos.forEach(it => {
                    arr.push([it.codigo, it.descripcion, `$${parseFloat(it.precio).toFixed(2)}`])
                })
            } else {
                if (datos && datos.length > 0) {
                    arr = datos
                }
            }
            let datosExportar = {
                "tituloArchivo": tituloArchivo,
                "titulos": titulos,
                "datosFilas": arr
            }
            dispatch(actions.exportarConsultaGenerica(datosExportar, nombreArchivo, callBackExportar2))
        } else {
            setOpenSnackBar({
                "open": true,
                "title": 'Hubo un error en el servidor. Por favor intente nuevamente.',
                "severity": 'error'
            })
            setLoadingExportar(false)
        }
    }
    const handleExportar = () => {
        if (dataBack) {
            let req = pn ? 'prestacionesNomencladas' : pnn ? 'prestacionesNoNomencladas' : 'modulos'
            let deleteAll = pn ? 'eliminarTodasNomencladas' : pnn ? 'eliminarTodasNoNomencladas' : 'eliminarTodosModulos'
            let ajustarAll = pn ? 'ajustarTodasNomenclada' : pnn ? 'ajustarTodasNoNomenclada' : 'ajustarTodosModulos'
            let qxAll = 'marcarPrQxTodasNomencladas'
            let registros = pn ? 'las prestaciones nomencladas' : pnn ? 'las prestaciones no nomencladas' : 'los modulos'
            if (request && ((request[req] && request[req].length > 0) || request[deleteAll] || request[ajustarAll] || request[qxAll])) {
                setWarningExportar({
                    open: true,
                    text: `Se exportarán ${registros} de la versión actual. Si desea exportar los cambios realizados, es necesario versionar.`,
                    warning: true
                })
            }
        } else {
            let registros = pn ? 'prestaciones nomencladas asociadas' : pnn ? 'prestaciones no nomencladas asociadas' : 'modulos asociados'
            setWarningExportar({
                open: true,
                text: !convenio
                    ? 'Aun no existe versión actual del convenio. No es posible realizar la exportación.'
                    : `Aun no hay ${registros} a la versión actual del convenio. No es posible realizar la exportación.`,
                warning: true
            })
        }
        if (convenio && convenio.idConvenio && dataBack) {
            setLoadingExportar(true)
            let datosExportar = pn ? 0 : pnn ? 1 : 2
            let req = {
                idConvenio: convenio && convenio.idConvenio,
                limit: '',
                offset: 0
            }
            dispatch(actions.getDatosExportar(req, datosExportar, callbackExportar1))
        }
    }


    //Alert & SnackBar & Tooltip:
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };
    const handleCloseWarning = (event) => {
        if (event.isTrusted) setWarningExportar({ open: false })
    }


    //Buscar:
    const handleBuscar = e => {
        if (e !== null && setFirstRenderBusqueda && page !== 0) setFirstRenderBusqueda(true)

        let seleccionadas = pn ? "nomencladas" : pnn ? "noNomencladas" : pnbu ? "pnbu" : "modulos"
        let noSeleccionadas = pn ? "nomencladasNoSeleccionadas" : pnn ? "noNomencladasNoSeleccionadas" : pnbu ? "pnbuNoSeleccionadas" : "modulosNoSeleccionados"
        setSeleccion({ ...seleccion, [seleccionadas]: null, [noSeleccionadas]: null })

        setCriterioBusqueda(e)
    }


    //Tooltip dejar de mostrar warning NBU:
    const openWarningNBU = (
        <Grid container className={classes.tooltip}>
            <Grid item xs={1}>
                <FilterNoneSharp size='small' style={{ color: '#f39f3a' }} />
            </Grid>
            <Grid item xs={11} style={{ paddingLeft: '10px' }}>
                <Typography style={{ fontSize: '13px', color: '#f39f3a', fontWeight: '600' }}>
                    Modificar valor
                </Typography>
                <Typography style={{ fontSize: '13px', marginTop: '10px' }}>
                    El cambio de valor se aplica a todas las prácticas NBU del convenio actual.
                </Typography>
                <Grid container xs={12} style={{ marginTop: '10px' }}>
                    <input ref={inputRef} type='checkbox' label='No volver a mostrar este mensaje'></input>
                    <Typography style={{ fontSize: '13px', marginLeft: '10px' }}>No volver a mostrar este mensaje</Typography>
                </Grid>
                <Grid container xs={12} justify='flex-end'>
                    <Typography
                        style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '30px', marginRight: '25px' }}
                        onClick={cancelarValueNBU}
                    >
                        Cancelar
                    </Typography>
                    <Typography
                        style={{ fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginTop: '30px' }}
                        onClick={aplicarValueNBU}
                    >
                        Confirmar
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )

    //Tooltip Exportar:
    const WarningExportar = props => {
        return (
            <div style={{
                position: 'absolute', top: '40px', left: "-80px", zIndex: '1000',
                padding: '10px 15px 10px 15px',
                border: '1px solid orange',
                backgroundColor: 'white',
                boxShadow: '0px 1px 5px #adacac',
                width: '300px',
                minHeight: '60px'
            }}>
                <ClickAwayListener onClickAway={handleCloseWarning}>
                    <Grid container xs={12} justify='space-between' style={{}}>
                        <Grid item xs={2}>
                            {props.warning ?
                                <Warning size='small' style={{ color: '#f39f3a' }} />
                                :
                                <FilterNoneSharp size='small' style={{ color: '#f39f3a' }} />
                            }
                        </Grid>
                        <Grid item xs={8}>
                            <Typography style={{ width: '100%', fontSize: '13px' }}>
                                {props.text}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} container justify='flex-end'>
                            <Close onClick={handleCloseWarning} />
                        </Grid>
                    </Grid>
                </ClickAwayListener>
            </div>
        )
    }


    //BOTONES TABLA     
    const botonesHeader = [{
        cabecera:
            <Grid container xs={12}>
                <Grid item style={{ width: '20%' }}>
                    <BuscadorContrataciones
                        onClick={handleBuscar}
                        placeholder='Buscar'
                        value={criterioBusqueda}
                    />
                </Grid>
                <Grid item style={{ width: '80%' }} container justify='flex-end' alignItems='baseline'>
                    {pn || pnbu ?
                        <CustomButton
                            label='Marcar como pr qx'
                            onClik={handleManyQX}
                            startIcon={<Check />}
                            variant='outlined'
                            styleLabel={{ fontSize: '12px' }}
                            styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                            disabled={
                                seleccion && (
                                    (seleccion.nomencladas && seleccion.nomencladas.length > 0)
                                    || (seleccion.pnbu && seleccion.pnbu.length > 0)
                                ) ? false : true
                            }
                        />
                        : null
                    }
                    {pn || pnn || modulos ?
                        <>
                            <CustomButton
                                label='Eliminar'
                                onClik={handleDeleteMany}
                                startIcon={<Delete />}
                                variant='outlined'
                                styleLabel={{ fontSize: '12px' }}
                                styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                                disabled={
                                    seleccion && (
                                        (pn && seleccion.nomencladas && seleccion.nomencladas.length > 0)
                                        || (pnn && seleccion.noNomencladas && seleccion.noNomencladas.length > 0)
                                        || (modulos && seleccion.modulos && seleccion.modulos.length > 0)
                                    ) ? false : true
                                }
                            />
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <CustomButton
                                    label='Exportar'
                                    onClik={handleExportar}
                                    startIcon={<img src={IconExcel} style={{ height: '20px' }} />}
                                    variant='outlined'
                                    styleLabel={{ fontSize: '12px' }}
                                    styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                                />
                                {warningExportar.open ?
                                    <WarningExportar text={warningExportar.text} warning={warningExportar.warning} />
                                    : null
                                }
                            </div>
                            <CustomButton
                                label='Importar'
                                onClik={handleImportar}
                                startIcon={<img src={IconExcel} style={{ height: '20px' }} />}
                                variant='outlined'
                                styleLabel={{ fontSize: '12px' }}
                                styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                            />
                            <CustomButton
                                label={pn || pnn ? 'Agregar prestación' : 'Agregar módulo'}
                                onClik={handleAdd}
                                startIcon={<Add />}
                                variant='outlined'
                                styleLabel={{ fontSize: '12px' }}
                                styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                            />
                        </>
                        : null
                    }
                    {pnbu ?
                        <>
                            <CustomButton
                                label='Dejar de usar NBU'
                                onClik={() => setDrawerNro(7)}
                                startIcon={<NotInterested />}
                                variant='outlined'
                                styleLabel={{ fontSize: '12px' }}
                                styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                            />
                            <TextField
                                label='Valor NBU'
                                type='text'
                                placeholder='0.00'
                                style={{ width: '150px', maxWidth: '150px', fontSize: '13px', margin: '0 5px' }}
                                InputLabelProps={{ shrink: true }}
                                value={valueNBU}
                                error={errorValueNBU}
                                onChange={(e) => onChangeValueNBU(e)}
                                inputRef={editNBURef}
                            />
                            <TippyTooltip
                                position="bottom"
                                theme="light"
                                html={openWarningNBU}
                                disabled={noMostrarWarning}
                                open={showWarningNBU}
                            >
                                <CustomButton
                                    label='Aplicar'
                                    variant='contained'
                                    color='primary'
                                    styleLabel={{ fontSize: '13px' }}
                                    styleButton={{ margin: '0 5px', maxHeight: '40px' }}
                                    disabled={disableAplicar}
                                    onClik={onClickAplicarValueNBU}
                                />
                            </TippyTooltip>
                        </>
                        : null
                    }
                </Grid>
            </Grid>
    }]


    //Columnas 1 Tabla:
    let columnas1 = [
        {
            title: "CÓDIGO",
            field: "codigo",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '100px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
        },
        {
            title: "DESCRIPCIÓN",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '450px', maxWidth: '480px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' }}>
                    {row.descripcion}
                </div>
            )
        },
        {
            title: "PRECIO",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '120px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 0' },
            render: row => '$' + parseFloat(row.precio).toFixed(2)
        },
        {
            title: "ACCIONES",
            field: "acciones",
            headerStyle: { padding: '5px 0', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '150px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 0' },
            render: row => (
                <Grid container justify='center' >
                    {pn || pnbu ?
                        <IconButton
                            size="small"
                            onClick={() => handleOneQX(row)}
                            className={row.esPrQx ? classes.qxTrue : classes.qxFalse} >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Check style={{ maxWidth: '20px' }} />
                                <p style={{ padding: '0', margin: '0' }}>PR.QX</p>
                            </div>
                        </IconButton>
                        : null
                    }
                    {pn || pnn || modulos ?
                        <>
                            <IconButton
                                className={classes.iconAction}
                                size="small"
                                onClick={() => handleEditRow(row)}
                            >
                                <Create style={{ maxWidth: '20px' }} />
                            </IconButton>
                            <IconButton
                                className={classes.iconAction}
                                size="small"
                                onClick={() => handleDeleteOne(row)}
                            >
                                <Delete style={{ maxWidth: '20px' }} />
                            </IconButton>
                        </>
                        : null
                    }
                </Grid>
            )
        }
    ];
    (pnbu && (columnas1 = [
        columnas1[0],
        columnas1[1],
        {
            title: "CANTIDAD",
            field: "cantidadNbu",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '100px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
        },
        {
            title: "PRECIO",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '100px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
            render: row => '$' + parseFloat(row.cantidadNbu * valorNBUTabla).toFixed(2)
        },
        columnas1[3],
    ]));
    (modulos && (columnas1 = [
        columnas1[0],
        {
            title: "NOMBRE",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '100px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.nombre}
                </div>
            )
        },
        {
            title: "DESCRIPCIÓN",
            headerStyle: { padding: '5px 0', fontSize: '12px' },
            cellStyle: { minWidth: '300px', maxWidth: '480px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 10px 5px 0' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.descripcion}
                </div>
            )
        },
        columnas1[2],
        {
            title: <div style={{ cursor: "auto" }}>INCLUSIONES</div>,
            field: "inclusiones",
            headerStyle: { padding: '5px 0', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '50px', maxWidth: '50px', padding: '5px 0', textAlign: 'center' },
            render: row => (
                <div>
                    <IconButton
                        className={classes.iconAction}
                        size="small"
                        onClick={() => handleVerInclusiones(row)}>
                        <img src={SVGiconInclusion} style={{ maxWidth: '20px' }} />
                    </IconButton>
                </div>
            )
        },
        columnas1[3],
    ]));

    //Columnas 2 Tabla:
    let columnas2 = [
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>CÓDIGO</Typography>,
            field: "codigo",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '50px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', height: '40px' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>C. EXTERNO</Typography>,
            render: row => row.codigoExterno ? row.codigoExterno : "-",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '50px', maxWidth: '70px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>DESCRIPCIÓN</Typography>,
            field: "descripcion",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '340px', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.descripcion}
                </div>
            )
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>AUTORIZACIÓN</Typography >,
            field: "nivelAutorizacion",
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '20px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>CANTIDAD</Typography>,
            field: "cantidad",
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '20px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>TOTAL</Typography>,
            field: "total",
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '20px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRE. QX</Typography>,
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '25px', maxWidth: '25px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <Grid container justify='center'>
                    {row.esPrQx ?
                        <IconButton
                            disabled={true}
                            size="small"
                            className={classes.qxTrue} >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Check style={{ maxWidth: '20px' }} />
                                <p style={{ padding: '0', margin: '0' }}>PR.QX</p>
                            </div>
                        </IconButton>
                        : "-"
                    }
                </Grid>
            )
        }

    ];
    (pnn && (columnas2 = [
        columnas2[0],
        columnas2[1],
        columnas2[2],
        columnas2[4],
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRECIO</Typography>,
            cellStyle: { maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' },
            render: row => "$" + row.precio
        },
        columnas2[5]
    ]));
    (pnbu && (columnas2 = [
        columnas2[0],
        columnas2[2],
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>CANTIDAD</Typography>,
            field: "cantidadNbu",
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '20px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },


        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRECIO</Typography>,
            field: "precio",
            cellStyle: { maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' },

        },
        columnas2[6]
    ]));
    (modulos && (columnas2 = [
        columnas2[0],
        columnas2[1],
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>NOMBRE</Typography>,
            field: "nombre",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '120px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.nombre}
                </div>
            )
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>DESCRIPCIÓN</Typography>,
            field: "descripcion",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '300px', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.descripcion}
                </div>
            )
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRECIO</Typography>,
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '50px', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => "$" + (row.precio ? row.precio : " - ")
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>INCLUSIONES</Typography>,
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '50px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },
            render: row => (
                <div>
                    <IconButton
                        className={classes.iconAction}
                        size="small"
                        onClick={() => handleVerInclusiones(row)}>
                        <img src={SVGiconInclusion} style={{ maxWidth: '20px' }} />
                    </IconButton>
                </div>
            )
        },
    ]));


    return (
        <Grid xs={12} style={{ height: '100%' }}>
            {!errorDataTabla ?
                <CustomTableContrataciones
                    //Data:
                    data={dataTabla && dataTabla.objetos}
                    cantTotal={dataTabla && dataTabla.cantidadTotal}
                    //Cols & Toolbars:
                    columnas={esEditar ? columnas1 : columnas2}
                    toolbar={true}
                    botonesHeader={esEditar ? botonesHeader : null}
                    //Pagination:
                    pagination={true}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    //Selection:
                    selection={esEditar ? true : false}
                    convenios={true}
                    handleClick3={handleClick3}
                    //Others:
                    noSorting={true}
                    loading={loadingDataTabla || loadingExportar || loadingTabla}
                    //Avatar:
                    colorAvatar={esEditar && (pn || pnn)}
                    avatar={[{ textoRedondo: 'Tiene costo extra', clase: 'textoAvatar', claseAvatar: 'avatarPrioridad' }]}
                />
                :
                null
            }
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
        </Grid>
    )
}

export default TablasConvenio