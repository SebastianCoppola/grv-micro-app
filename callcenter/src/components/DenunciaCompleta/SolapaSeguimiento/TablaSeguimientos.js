import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { Grid } from '@material-ui/core'
//Componentes:
import avatarJPG from '../../../commons/assets/DenunciaCompleta/seguimiento/Avatar.jpg'
import CustomTable from '../../commons/Table/CustomTable'
import CustomAvatar from '../../commons/Avatar/CustomAvatar'
//Utils:
import Utils from '../../../Utils/utils'

const TablaSeguimientos = ({ idDenuncia }) => {
    
    const dispatch = useDispatch()
    const dataEvolucion = useSelector(state => state.consultasReclamos.evoluciones);
    const loadingEvolucion = useSelector(state => state.consultasReclamos.loadingEvolucion);
    const [data, setData] = useState()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const headerTabla = [
        {
            title: "RESPONSABLE", field: "responsable",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
            render: row => <Grid container alignItems='center'>
                <Grid item >
                    <CustomAvatar src={row.avatarResponsable} style={{ width: '40px', height: '40px' }} />
                </Grid>
                <Grid item style={{ wordBreak: 'break-word', padding: '0px 7px' }}>
                    <span>{row.responsable}</span>
                </Grid>
            </Grid>
        },
        {
            title: "F. CARGA", field: "fechaCarga",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "F. EVOLUCIÓN", field: "fechaEvolucion",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "PROX. CONTACTO", field: "proximoContacto",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "OBSERVACIÓN", field: "observacion", width: '20%',
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
    ]

    const buscarEvoluciones = () => {
        const requestEvoluciones = {
            limit: rowsPerPage,
            offset: (page * rowsPerPage),
            idDenuncia: idDenuncia && idDenuncia,
        }
        dispatch(actions.searchEvoluciones(requestEvoluciones))
    }

    useEffect(() => {
        buscarEvoluciones()
    }, [page, rowsPerPage])

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (dataEvolucion && dataEvolucion.cantidadTotal && dataEvolucion.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }

        const dataApi = dataEvolucion && dataEvolucion.objetos ? dataEvolucion.objetos.map(newData => {
            return ({
                responsable: newData && newData.responsable ? newData.responsable : '',
                avatarResponsable: avatarJPG,
                fechaCarga: newData && newData.fechaCarga ? Utils.dateFormat5(newData.fechaCarga) : '',
                fechaEvolucion: newData && newData.fechaEvolucion ? Utils.dateFormat5(newData.fechaEvolucion) : '',
                proximoContacto: newData && newData.fechaProxContacto ? Utils.dateFormat5(newData.fechaProxContacto) : '',
                observacion: newData && newData.observacion ? newData.observacion : '',
            })
        }) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (dataEvolucion && dataEvolucion.cantidadTotal && lengthData < dataEvolucion.cantidadTotal) {
            for (let index = lengthData; index < dataEvolucion.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])
    }, [dataEvolucion])

    return (
        <div>
            <Grid container direction={'row'} alignItems={'center'} spacing={2} >
                <Grid item xs={12}>
                    <CustomTable
                        cantTotal={dataEvolucion && dataEvolucion.cantidadTotal && dataEvolucion.cantidadTotal}
                        data={data}
                        setData={setData}
                        columnas={headerTabla}
                        page={page}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        loading={loadingEvolucion}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default TablaSeguimientos
