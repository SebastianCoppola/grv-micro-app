import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../redux/actions/index'
//Components:
import CustomPrestaciones from '../CustomPrestaciones'

const PrestacionesNoNomencladas = () => {

    const dispatch = useDispatch()

    const dataNoNomencladas = useSelector(state => state.prestaciones.prestacionesNoNomencladas)

    const [request, setRequest] = useState(null)
    const [requestListar, setRequestListar] = useState(null)
    const [requestIncluir, setRequestIncluir] = useState(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [data, setData] = useState({ objetos: [] })
    const [tipoOrdenamiento, setTipoOrdenamiento] = useState(1)
    const [criterioOrdenamiento, setCriterioOrdenamiento] = useState(1)
    const [criterioBusqueda, setCriterioBusqueda] = useState("")
    const [updateTable, setUpdateTable] = useState(false)

    useEffect(() => setData(dataNoNomencladas), [dataNoNomencladas])

    useEffect(() => {
        let requestListar = {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
            tipoOrdenamiento: tipoOrdenamiento,
            criterioOrdenamiento: criterioOrdenamiento,
            criterioBusqueda: criterioBusqueda != "" ? criterioBusqueda : ""
        }

        dispatch(actions.listarPrestacionesNoNomencladas(requestListar, true))
    }, [page, rowsPerPage, tipoOrdenamiento, criterioOrdenamiento, criterioBusqueda, updateTable])

    return (
        <CustomPrestaciones
            data={data}
            setData={setData}
            noNomenclada={true}
            request={request}
            setRequest={setRequest}
            requestIncluir={requestIncluir}
            setRequestIncluir={setRequestIncluir}
            requestListar={requestListar}
            setRequestListar={setRequestListar}
            tipoOrdenamiento={tipoOrdenamiento}
            criterioOrdenamiento={criterioOrdenamiento}
            criterioBusqueda={criterioBusqueda}
            setTipoOrdenamiento={setTipoOrdenamiento}
            setCriterioOrdenamiento={setCriterioOrdenamiento}
            setCriterioBusqueda={setCriterioBusqueda}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            updateTable={updateTable}
            setUpdateTable={setUpdateTable}
        />
    )
}

PrestacionesNoNomencladas.propTypes = {}

export default PrestacionesNoNomencladas
