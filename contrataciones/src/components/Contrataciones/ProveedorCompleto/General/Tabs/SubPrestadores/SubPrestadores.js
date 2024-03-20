import React from 'react'
import PropTypes from 'prop-types'
import TablaSubPrestadores from './TablaSubPrestadores'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchListarSubprestadores } from '../../../../../../redux/actions/proveedor'

const SubPrestadores = props => {
    const { data, idProveedor } = props
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [actualizarData, setActualizarData] = useState(false);
    const dispatch = useDispatch()
    const [buscador, setBuscador] = useState()
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open: false,
        title: '',
        severity: ''
    });

    useEffect(() => {
        let reqListado = null
        if (data.idProveedor != null) {
            reqListado = {
                idProveedor: data.idProveedor,
                limit: rowsPerPage,
                offset: buscador ? 0 : page * rowsPerPage,
                criterioBusqueda: buscador
            }
            dispatch(searchListarSubprestadores(reqListado, callBackListarSubprestadores))
        }
    }, [page, rowsPerPage, actualizarData, buscador])

    const callBackListarSubprestadores = (fail) => {
        if (fail) {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'No se han encontrado Subprestadores.',
            });
        }
    }

    const listadoSubPrestadoresData = useSelector(state => state.proveedor.listadoSubprestadores)

    return (
        <TablaSubPrestadores
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            idProveedor={idProveedor}
            setActualizarData={setActualizarData}
            actualizarData={actualizarData}
            setBuscador={setBuscador}
            buscador={buscador}
            data={data}
            openSnackBar={openSnackBar}
            setOpenSnackBar={setOpenSnackBar}
            datos={listadoSubPrestadoresData}
        />
    )
}

SubPrestadores.propTypes = {

}

export default SubPrestadores
