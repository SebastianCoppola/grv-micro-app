import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core'
import HeaderListadoConvenio from "./HeaderListadoConvenio";
import Mensaje from "./Mensaje";
import AddIcon from '@material-ui/icons/Add';
import TablaConvenio from "./Tablas/TablaConvenio";
import TablaLocalidades from './Tablas/TablaLocalidades';

const ServicioTraslado = (props) => {
    const { data, setData, proveedorSeleccionado, tiposActuales, setTiposActuales } = props
    const [actualizarData, setActualizarData] = useState(false);

    //redux:
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos);
    //coonvenios
    const [dataListadoConvenio, setDataListadoConvenio] = useState({ data: [], cantidad: 0 })
    const [dataConvenio, setDataConvenio] = useState(null)
    const [conveniosEliminados, setConveniosEliminados] = useState([]);
    const [convenioEditar, setConvenioEditar] = useState(null)
    const [selectedRow, setSelectedRow] = useState(null)
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(null)
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false, });
    //localidades:
    const [dataLocalidades, setDataLocalidades] = useState({ data: [], cantidad: 0 })
    const [localidadesEliminadas, setLocalidadesEliminadas] = useState([]);
    const [mensaje, setMensaje] = React.useState(dataLocalidades && dataLocalidades.data && dataLocalidades.data.length < 1 ? true : false)
    const [openSnackBar, setOpenSnackBar] = React.useState({ open: false, title: '', severity: '' });


    //Actualizar toda la data de traslados cuando se realiza el dispatch:
    useEffect(() => {
        if (tiposProveedorDatos && tiposProveedorDatos.proveedorServicioTrasladoDTO) {
            setDataLocalidades({
                "cantidad": tiposProveedorDatos.proveedorServicioTrasladoDTO.localidades ? tiposProveedorDatos.proveedorServicioTrasladoDTO.localidades.length : 0,
                "data": tiposProveedorDatos.proveedorServicioTrasladoDTO.localidades ? mapearLocalidadesBack(tiposProveedorDatos.proveedorServicioTrasladoDTO.localidades) : null,
            })
            setDataListadoConvenio({
                "cantidad": tiposProveedorDatos.proveedorServicioTrasladoDTO.conveniosTraslado ? tiposProveedorDatos.proveedorServicioTrasladoDTO.conveniosTraslado.length : 0,
                "data": tiposProveedorDatos.proveedorServicioTrasladoDTO.conveniosTraslado ? mapearConveniosBack(tiposProveedorDatos.proveedorServicioTrasladoDTO.conveniosTraslado) : [],

            })
            setTiposActuales({
                ...tiposActuales,
                "proveedorServicioTrasladoDTO": {
                    ...tiposProveedorDatos.proveedorServicioTrasladoDTO,
                }
            })
        }
    }, [tiposProveedorDatos])

    //Asociar y Desasociar Convenios de tiposActuales (SAVE)
    useEffect(() => {
        let newArraySave = [];
        if (dataListadoConvenio.data) { newArraySave.push(...dataListadoConvenio.data) };
        if (conveniosEliminados) { newArraySave.push(...conveniosEliminados) };
        if (newArraySave) {
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorServicioTrasladoDTO": {
                        ...tiposActuales && tiposActuales.proveedorServicioTrasladoDTO,
                        conveniosTraslado: [...newArraySave],
                        convenioTrasladoSave: [...newArraySave]
                    }
                })
            })
        }
    }, [dataListadoConvenio, conveniosEliminados])

    //Asociar y Desasociar Localidades de tiposActuales (SAVE)
    useEffect(() => {
        let newArraySave = [];
        if (dataLocalidades.data) { newArraySave.push(...dataLocalidades.data) };
        if (localidadesEliminadas) { newArraySave.push(...localidadesEliminadas) };
        if (newArraySave) {
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorServicioTrasladoDTO": {
                        ...tiposActuales && tiposActuales.proveedorServicioTrasladoDTO,
                        localidades: [...newArraySave]
                    }
                })
            })
        }
    }, [dataLocalidades, localidadesEliminadas])

    //Mapea el array de convenios que vienen del back en un nuevo array con la info para la request.
    const mapearConveniosBack = (arrayBack) => {
        let newArrayFront = [];
        arrayBack.map(it => {
            newArrayFront.push({
                "idConvenioTraslado": it.idConvenioTraslado ? it.idConvenioTraslado : null,
                "eliminarRelacion": false,
                "idProvincia": it.idProvincia ? it.idProvincia : null,
                "provincia": it.provincia ? it.provincia : null,
                "idTipoDeValor": it.idTipoDeValor ? it.idTipoDeValor : null,
                "tipoValor": it.tipoValor ? it.tipoValor : null,
                "valorKM": it.valorKM ? it.valorKM : null,
                "valorKmExcedenteString": it.valorKmExcedenteString ? it.valorKmExcedenteString : null,
                "fechaDesde": it.fechaDesde ? it.fechaDesde : null,
                "fechaHasta": it.fechaHasta ? it.fechaHasta : null,
                "vigenciaTabla": `${it && it.fechaDesde ? it.fechaDesde : null} ${it && it.fechaHasta ? it.fechaHasta : null}`,
                "valorZonaKmConvenioTraslado": {
                    "valorZona": it.valorZona ? it.valorZona : null,
                    "valorZona1": it.valorZona2 ? it.valorZona2 : null,
                    "valorZona2": it.valorZona3 ? it.valorZona3 : null,
                    "valorZona3": it.valorZona4 ? it.valorZona4 : null,
                    "valorZona4": it.valorZona5 ? it.valorZona5 : null,
                    "valorZona5": it.valorZona6 ? it.valorZona6 : null,
                    "valorZona6": it.valorZona7 ? it.valorZona7 : null,
                    "valorZona7": it.valorZona8 ? it.valorZona8 : null,
                    "valorKmExcedente": it.valorKmExcedente ? it.valorKmExcedente : null
                }
            })
        })
        return newArrayFront
    }
    //Mapea el array de localidades que vienen del back en un nuevo array con la info para la request.
    const mapearLocalidadesBack = (arrayBack) => {
        let newArrayFront = [];
        arrayBack.map(it => {
            newArrayFront.push({
                "idProveedorTrasladoLocalidad": it.idProveedorTrasladoLocalidad ? it.idProveedorTrasladoLocalidad : null,
                "eliminarRelacion": false,
                "idLocalidad": it.idLocalidad ? it.idLocalidad : null,
                "descripcion": it.descripcion ? it.descripcion : null,
                "modoEdicion": false,
            })
        })
        return newArrayFront
    }
 

    return (
        <Grid container xs={12} spacing={4} alignItems="flex-end">
            <Grid item xs={12}>
                <HeaderListadoConvenio
                    marginLeft='59px'
                    data={data} setData={setData}
                    actualizarData={actualizarData} setActualizarData={setActualizarData}
                    proveedorSeleccionado={proveedorSeleccionado}
                    tiposActuales={tiposActuales} setTiposActuales={setTiposActuales}
                    dataListadoConvenio={dataListadoConvenio} setDataListadoConvenio={setDataListadoConvenio}
                    conveniosEliminados={conveniosEliminados} setConveniosEliminados={setConveniosEliminados}
                    modoEdicion={modoEdicion} setModoEdicion={setModoEdicion}
                    openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}
                    dataConvenio={dataConvenio} setDataConvenio={setDataConvenio}
                    textHeader={"Listado de convenios"}
                    selectedRow={selectedRow}
                    openConfirmacion={openConfirmacion} setOpenConfirmacion={setOpenConfirmacion}
                    botones={[
                        {
                            onClick: 'agregarNuevoListadoConvenio',
                            startIcon: <AddIcon />,
                            width: '190px',
                            height: '30px',
                            label: 'Agregar convenio',
                            variant: "outlined",
                            gridContenedor: 'space-between',
                            gridTitulo: 8,
                        }
                    ]}
                />
            </Grid>
            {dataListadoConvenio && dataListadoConvenio.data && dataListadoConvenio.data.length < 1 ?
                <Grid item xs={12}>
                    <Mensaje textoMensaje='No hay convenios de traslados agregados.' />
                </Grid>
                :
                <Grid item xs={12}>
                    <TablaConvenio
                        dataListadoConvenio={dataListadoConvenio} setDataListadoConvenio={setDataListadoConvenio}
                        modoEdicion={modoEdicion} setModoEdicion={setModoEdicion}
                        openDrawer={openDrawer} setOpenDrawer={setOpenDrawer}
                        selectedRow={selectedRow} setSelectedRow={setSelectedRow}
                        setConvenioEditar={setConvenioEditar} convenioEditar={convenioEditar}
                        dataConvenio={dataConvenio} setDataConvenio={setDataConvenio}
                        openConfirmacion={openConfirmacion} setOpenConfirmacion={setOpenConfirmacion}
                    />
                </Grid>
            }
            <Grid item xs={12}>
                <TablaLocalidades
                    mensaje={mensaje} setMensaje={setMensaje}
                    dataLocalidades={dataLocalidades} setDataLocalidades={setDataLocalidades}
                    setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar}
                    localidadesEliminadas={localidadesEliminadas} setLocalidadesEliminadas={setLocalidadesEliminadas}
                    data={data}
                    actualizarData={actualizarData} setActualizarData={setActualizarData}
                />
            </Grid>
        </Grid>
    )
}
export default ServicioTraslado;