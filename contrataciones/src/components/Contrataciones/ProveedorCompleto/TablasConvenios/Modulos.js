import React, { useEffect, useState } from 'react'
import Utils from '../../../../Utils/utils'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Material:
import { CircularProgress, Grid } from '@material-ui/core'
//Components:
import TablasConvenio from '../TablasConvenios/TablasConvenio'
import CustomDialogoPlano from '../../../commons/Dialogo/CustomDialogoPlano'

const Modulos = props => {
    const { dataConvenio, setDrawerNro, setEditRow, seleccion, setSeleccion, setOpenAlert1, proveedor, objectCriterioBusqueda, setObjectCriterioBusqueda } = props
    const [loadingComponent, setLoadingComponent] = useState(true)
    //Redux:
    const dispatch = useDispatch()
    const dataBack = useSelector(state => state.convenio.modulos)
    const errorDataBack = useSelector(state => state.convenio.errorModulos)
    const request = useSelector(state => state.convenio.request)
    const loadingImportar = useSelector(state => state.importarExportar.loadingImportar)
    const [criterioBusqueda, setCriterioBusqueda] = useState(objectCriterioBusqueda && objectCriterioBusqueda.modulos ? objectCriterioBusqueda.modulos : "")
    //Tabla:
    const [data, setData] = useState(null)
    const [page, setPage] = useState(0)
    const [loadingTabla, setLoadingTabla] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Stepper:
    const [step1, setStep1] = useState(false)
    const [firstRenderBusqueda, setFirstRenderBusqueda] = useState(false)


    //Pantalla setStep1 en caso de que no haya convenio:
    useEffect(() => {
        if (!dataConvenio) {
            setStep1(true)
            setLoadingComponent(false)
        }
        setLoadingTabla(true)
    }, [])

    //Busca la data en la DB:
    useEffect(() => {
        if (dataConvenio && dataConvenio.idConvenio) {
            if (request && request.modulos && request.modulos.length > 0) setStep1(false)
            setObjectCriterioBusqueda({...objectCriterioBusqueda, modulos: criterioBusqueda})
            setLoadingTabla(true)

            //REQUEST: 
            let idModulosEliminados = request && request.modulos
                ? request.modulos.filter(it => it.eliminarModulo === true).map(it => { return it.idModulo })
                : []

            let cantidadAgregados
            if(request && request.modulos && request.modulos.length){
                let arrayAgregadas = request.modulos.filter(it => it.agregarModulo === true)
                if(criterioBusqueda){
                    cantidadAgregados = Utils.aplicarCriterioBusquedaConvenio(arrayAgregadas, criterioBusqueda).length
                }else{
                    cantidadAgregados = arrayAgregadas.length
                }
            }else{
                cantidadAgregados = 0
            }

            let offset = (rowsPerPage * page) - cantidadAgregados

            let req = {
                idConvenio: dataConvenio.idConvenio,
                idProveedor: proveedor.idProveedor,
                offset: offset > 0 ? offset : 0,
                limit: rowsPerPage,
                criterioBusqueda: criterioBusqueda !== "" ? criterioBusqueda : "",
                idModulosEliminados: idModulosEliminados,
                eliminarModulosCriterio: request && request.eliminarModulosCriterio ? request.eliminarModulosCriterio : null,
            }

            if (request && request.eliminarTodosModulos) {
                dispatch(actions.clearModulosConvenio())
                setData(Utils.procesarDataTablasConvenio(3, [], request, criterioBusqueda, page, rowsPerPage))
            } else {
                dispatch(actions.getModulosConvenio(req))
            }

        } else {
            setData(Utils.procesarDataTablasConvenio(3, dataBack, request, criterioBusqueda, page, rowsPerPage))
        }
    }, [page, rowsPerPage, request, criterioBusqueda])

    //Al cambiar dataBack o request:
    useEffect(() => {
        if (dataBack && (dataBack || request)) {
            setLoadingTabla(true)
            if (firstRenderBusqueda) {
                setData({ objetos: [], cantidadTotal: 0 })
                setFirstRenderBusqueda(false)
            } else {
                setData(Utils.procesarDataTablasConvenio(3, dataBack, request, criterioBusqueda, page, rowsPerPage))
            }
        }
    }, [dataBack])

    //Cambia Loading a FALSE al procesar la data. 
    useEffect(() => {
        if (data && data.objetos && data.objetos.length > 0) {
            setStep1(false)
            setLoadingTabla(false)
            setLoadingComponent(false)
        }
        else if (data && data.objetos && data.objetos.length === 0) {
            if (!criterioBusqueda) setStep1(true)
            setLoadingTabla(false)
            setLoadingComponent(false)
        }
    }, [data])

    return (
        <>
            {
                loadingComponent || loadingImportar ?
                    <Grid container justify='center' alignItems='center' style={{ width: '100%', minHeight: '200px' }}>
                        <CircularProgress color="primary" />
                    </Grid>
                    : step1 ?
                        <CustomDialogoPlano
                            text1='Módulos'
                            text2='No hay módulos registradas para este convenio. Para incorporarlos podrás importarlos desde un Excel o agregarlos.'
                            button1={true}
                            button1Action={() => setDrawerNro(8)}
                            button1Label='Agregar módulo'
                            button1Variant='contained'
                            button2={true}
                            button2Action={() => setDrawerNro(13)}
                            button2Label='Importar'
                            button2Variant='outlined'
                        />
                        :
                        <TablasConvenio
                            modulos={true}
                            esEditar={true}
                            setDrawerNro={setDrawerNro}
                            data={data}
                            dataBack={dataBack && dataBack.objetos && dataBack.objetos.length > 0}
                            setEditRow={setEditRow}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            setOpenAlert1={setOpenAlert1}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            loadingDataTabla={loadingTabla}
                            errorDataTabla={errorDataBack}
                            criterioBusqueda={criterioBusqueda}
                            setCriterioBusqueda={setCriterioBusqueda}
                            setFirstRenderBusqueda={setFirstRenderBusqueda}
                            convenioHistorico={dataConvenio}
                        />
            }
        </>
    )
}

export default Modulos