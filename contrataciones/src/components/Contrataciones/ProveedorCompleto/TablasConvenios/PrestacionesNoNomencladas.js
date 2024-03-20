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

const PrestacionesNoNomencladas = props => {
    const { dataConvenio, setDrawerNro, setEditRow, seleccion, setSeleccion, setOpenAlert1, proveedor, objectCriterioBusqueda, setObjectCriterioBusqueda } = props
    const [loadingComponent, setLoadingComponent] = useState(true)
    //Redux:
    const dispatch = useDispatch()
    const dataBack = useSelector(state => state.convenio.pnn)
    const errorDataBack = useSelector(state => state.convenio.errorPNN)
    const request = useSelector(state => state.convenio.request)
    const loadingImportar = useSelector(state => state.importarExportar.loadingImportar)
    //Tabla:
    const [data, setData] = useState(null)
    const [page, setPage] = useState(0)
    const [loadingTabla, setLoadingTabla] = useState(true)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //Stepper:
    const [step1, setStep1] = useState(false)
    //Buscar:
    const [criterioBusqueda, setCriterioBusqueda] = useState(objectCriterioBusqueda && objectCriterioBusqueda.pnn ? objectCriterioBusqueda.pnn : "")
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
            if (request && request.prestacionesNoNomencladas && request.prestacionesNoNomencladas.length > 0) setStep1(false)
            setObjectCriterioBusqueda({...objectCriterioBusqueda, pnn: criterioBusqueda})
            setLoadingTabla(true)

            //REQUEST: 
            let idNoNomencladasEliminadas = request && request.prestacionesNoNomencladas
                ? request.prestacionesNoNomencladas.filter(it => it.eliminarPrestacion === true).map(it => { return it.idPrestacion })
                : []

            let cantidadAgregadas
            if(request && request.prestacionesNoNomencladas && request.prestacionesNoNomencladas.length){
                let arrayAgregadas = request.prestacionesNoNomencladas.filter(it => it.agregarPrestacion === true)
                if(criterioBusqueda){
                    cantidadAgregadas = Utils.aplicarCriterioBusquedaConvenio(arrayAgregadas, criterioBusqueda).length
                }else{
                    cantidadAgregadas = arrayAgregadas.length
                }
            }else{
                cantidadAgregadas = 0
            }

            let offset = (rowsPerPage * page) - cantidadAgregadas

            let req = {
                idConvenio: dataConvenio.idConvenio,
                idProveedor: proveedor.idProveedor,
                offset: offset > 0 ? offset : 0,
                limit: rowsPerPage,
                criterioBusqueda: criterioBusqueda !== "" ? criterioBusqueda : "",
                idNoNomencladasEliminadas: idNoNomencladasEliminadas,
                eliminarNoNomencladasCriterio: request && request.eliminarNoNomencladasCriterio ? request.eliminarNoNomencladasCriterio : null,
            }


            if (request && request.eliminarTodasNoNomencladas) {
                dispatch(actions.clearPNNConvenio())
                setData(Utils.procesarDataTablasConvenio(2, [], request, criterioBusqueda, page, rowsPerPage))
            } else {
                dispatch(actions.getPNNConvenio(req))
            }

        } else {
            setData(Utils.procesarDataTablasConvenio(2, dataBack, request, criterioBusqueda, page, rowsPerPage))
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
                setData(Utils.procesarDataTablasConvenio(2, dataBack, request, criterioBusqueda, page, rowsPerPage))
            }
        }
    }, [dataBack])

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
                            text1='Prestaciones No Nomencladas'
                            text2='No hay prestaciones registradas para este convenio. Para incorporarlas podrás importarlas desde un Excel o agregarlas.'
                            button1={true}
                            button1Action={() => setDrawerNro(5)}
                            button1Label='Agregar prestación'
                            button1Variant='contained'
                            button2={true}
                            button2Action={() => setDrawerNro(12)}
                            button2Label='Importar'
                            button2Variant='outlined'
                        />
                        :
                        <TablasConvenio
                            pnn={true}
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

export default PrestacionesNoNomencladas