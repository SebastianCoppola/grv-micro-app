import React, { useReducer, useState, useEffect, useCallback } from 'react'
import { Grid } from '@material-ui/core'
import CustomAcordion2 from '../../../../../commons/CustomAccordion/CustomAcordion2'
import PrestadorMedico from './Acordion/PrestadorMedico/PrestadorMedicoAcordion'
import Farmacia from './Acordion/Farmacia/Farmacia'
import Hoteles from './Acordion/Hoteles/Hoteles'
import InsumosOrtopedicos from './Acordion/InsumosOrtopedicos/InsumosOrtopedicos'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../../../../../redux/actions'
import TipoProveedor from '../../../../AltaProveedor/DatosProveedor/TipoProveedor/TipoProveedor'
import Utils from '../../../../../../Utils/utils'
import WarningIcon from '@material-ui/icons/Warning';

const initialState = [false, false, false, false, false];
function reducer(state, { type, index }) {
    switch (type) {
        case "expand-all":
            return [true, true, true, true, true];
        case "collapse-all":
            return [false, false, false, false, false];
        case "toggle":
            state[index] = !state[index];
            return [...state];

        default:
            throw new Error();
    }
}

const AcordionTipoProveedor = (props) => {
    const { data, setData, proveedor, proveedorSeleccionado, setProveedorSeleccionado, 
        dataTipoProveedor, setTiposActuales, tiposActuales  } = props
    const [state, dispatch] = useReducer(reducer, initialState);
    const tiposSeleccionados = proveedorSeleccionado.filter(data => (data.seleccionado == true && data.codigo === 5) || (data.seleccionado == true && data.codigo === 10) || (data.seleccionado == true && data.codigo === 9) || (data.seleccionado == true && data.codigo === 8))
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos);
    const [valTipo, setValTipo] = React.useState(null)
    const [especialidadesElegidas, setEspecialidadesElegidas] = React.useState(null)
    
    useEffect(() => {
        if (tiposActuales) {
            setTiposActuales({ ...tiposActuales, ...tiposProveedorDatos })
        }
    }, [tiposProveedorDatos])

    useEffect(() => {
        proveedorSeleccionado.map(element => {
            // var tipoAsociado = data && data.idTiposProveedor && data.idTiposProveedor.filter(idBack => idBack === element.codigo);
            //if( tipoAsociado && tipoAsociado.length == 0 && element ){
            Utils.createTipoDTO(element, setTiposActuales, tiposProveedorDatos);
            //}
        })
    }, [proveedorSeleccionado])

    const handleToggleAccordeon = (value) => {
        dispatch({ type: "toggle", index: value && value.codigo })
    }

    return (
        <Grid >
            <Grid container alignItems='center' spacing={3}>
                {tiposSeleccionados ? tiposSeleccionados.map(it => (

                    <Grid item xs={12} style={{ padding: '0px' }}>
                        <CustomAcordion2
                            // hasta que el back devuelva el id tipo prov, descomentar y probar:
                            titulo={<strong>
                                <Grid container alignItems='center' >
                                    <Grid item xs={4}>{it.descripcion}</Grid>
                                    {(Utils.validarCamposEditar((valTipo !== "") ? valTipo : null, 1)
                                        || (valTipo === 5 && Utils.validarCamposEditar((especialidadesElegidas && especialidadesElegidas.length === 0 ? null : especialidadesElegidas), 1))
                                    )
                                        && it.codigo === 5 ?
                                        <Grid item > <WarningIcon htmlColor={"#e34850"} /></Grid> : null}
                                </Grid></strong>}
                            isOpen={state[it && it.codigo]}
                            onToggle={() => handleToggleAccordeon(it)}
                            estilo={true}

                        >
                            < >
                                {it.codigo === 5 ?
                                    <PrestadorMedico
                                        valTipo={valTipo} setValTipo={setValTipo}
                                        proveedorSeleccionado={proveedorSeleccionado}
                                        tiposActuales={tiposActuales}
                                        setTiposActuales={setTiposActuales}
                                        especialidadesElegidas={especialidadesElegidas}
                                        setEspecialidadesElegidas={setEspecialidadesElegidas} />
                                    : it.codigo === 10 ?
                                        <Farmacia proveedorSeleccionado={proveedorSeleccionado} data={data} setData={setData} tiposActuales={tiposActuales} setTiposActuales={setTiposActuales} />
                                            : it.codigo === 9 ?
                                                <Hoteles proveedorSeleccionado={proveedorSeleccionado} data={data} setData={setData} tiposActuales={tiposActuales} setTiposActuales={setTiposActuales} />
                                                : it.codigo === 8 ?
                                                    <InsumosOrtopedicos proveedorSeleccionado={proveedorSeleccionado} tiposActuales={tiposActuales} setTiposActuales={setTiposActuales} />
                                                    : null}
                            </>
                        </CustomAcordion2>
                    </Grid>
                ))
                    : null}

            </Grid>
        </Grid>
    )
}
export default AcordionTipoProveedor