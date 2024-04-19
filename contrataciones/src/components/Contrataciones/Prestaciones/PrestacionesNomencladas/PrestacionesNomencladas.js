import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../redux/actions/index'
//Components:
import CustomPrestaciones from '../CustomPrestaciones'

const PrestacionesNomencladas = () => {

    const dispatch = useDispatch()
    const dataNomencladas = useSelector(state => state.prestaciones.prestacionesNomencladas)

    const [request, setRequest] = useState(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [requestIncluir, setRequestIncluir] = useState(null)
    const [data, setData] = useState({ objetos: [] })
    const [tipoOrdenamiento, setTipoOrdenamiento] = useState(1)
    const [criterioOrdenamiento, setCriterioOrdenamiento] = useState(1)
    const [criterioBusqueda, setCriterioBusqueda] = useState("")
    const [updateTable, setUpdateTable] = useState(false)

    useEffect(() => setData(dataNomencladas), [dataNomencladas])

    useEffect(() => {
        let requestListar = {
            offset: page * rowsPerPage,
            limit: rowsPerPage,
            tipoOrdenamiento: tipoOrdenamiento,
            criterioOrdenamiento: criterioOrdenamiento,
            criterioBusqueda: criterioBusqueda != "" ? criterioBusqueda : ""
        }
        dispatch(actions.listarPrestacionesNomencladas(requestListar, true))
    }, [page, rowsPerPage, tipoOrdenamiento, criterioOrdenamiento, criterioBusqueda, updateTable])

    return (
        <CustomPrestaciones
            data={data}
            setData={setData}
            noNomenclada={false}
            request={request}
            setRequest={setRequest}
            requestIncluir={requestIncluir}
            setRequestIncluir={setRequestIncluir}
            tipoOrdenamiento={tipoOrdenamiento}
            setTipoOrdenamiento={setTipoOrdenamiento}
            criterioOrdenamiento={criterioOrdenamiento}
            setCriterioOrdenamiento={setCriterioOrdenamiento}
            criterioBusqueda={criterioBusqueda}
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

PrestacionesNomencladas.propTypes = {}

export default PrestacionesNomencladas
