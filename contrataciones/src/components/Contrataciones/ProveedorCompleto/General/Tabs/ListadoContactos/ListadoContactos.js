import React, { useState, useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions/index'
//Components:
import TablaListadoContactos from './TablaListadoContactos'

const ListadoContactos = ({ idProveedor, usuarioActivo }) => {
    
    const dispatch = useDispatch()

    const data = useSelector(state => state.proveedor.contactosByProveedor)
    
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    useEffect(() => {
        buscarContactos()
    }, [rowsPerPage, page])

    const buscarContactos = () => {
        if (idProveedor !== null) {
            dispatch(actions.busquedaContactos({
                idProveedor: idProveedor,
                limit: rowsPerPage,
                offset: page * rowsPerPage
            }))
        }
    }

    return (
        <>
            {data &&
                <TablaListadoContactos
                    data={data}
                    idProveedor={idProveedor}
                    usuarioActivo={usuarioActivo}
                    buscarContactos={buscarContactos}
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                />
            }
        </>
    )
}

export default ListadoContactos
