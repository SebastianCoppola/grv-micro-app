import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core'

//estilos
import { makeStyles } from "@material-ui/core/styles";
import TablaHoteles from "./TablaHoteles";
import HeaderTablaHoteles from "./HeaderTablaHoteles";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({

}));
const Hoteles = (props) => {
    const { data, setData, proveedorSeleccionado, tiposActuales, setTiposActuales, } = props
    const classes = useStyles(props);
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos)
    const [conConvenio, setConConvenio] = useState(false)
    const [valorLavanderia, setValorLavanderia] = useState()
    const [valorPensionCompleta, setValorPensionCompleta] = useState()
    const [valorHabitacionSimple, setValorHabitacionSimple] = useState()
    const [valorHabitacionDoble, setValorHabitacionDoble] = useState()
    const [valorHabitacionTriple, setValorHabitacionTriple] = useState()
    const [valorHabitacionCuadruple, setValorHabitacionCuadruple] = useState()
    const [dataListado, setDataListado] = useState([])
    const [datoBancario, setDatoBancario] = useState([])
    
    useEffect(() => {
        if(tiposProveedorDatos && tiposProveedorDatos.proveedorHotelDTO){
            setDatoBancario(tiposProveedorDatos.proveedorHotelDTO.datoBancario)
            setConConvenio(tiposProveedorDatos.proveedorHotelDTO.conConvenio)
            setValorLavanderia(tiposProveedorDatos.proveedorHotelDTO.valorLavanderia)
            setValorPensionCompleta(tiposProveedorDatos.proveedorHotelDTO.valorPensionCompleta)
            setValorHabitacionSimple(tiposProveedorDatos.proveedorHotelDTO.valorHabitacionSimple)
            setValorHabitacionDoble(tiposProveedorDatos.proveedorHotelDTO.valorHabitacionDoble)
            setValorHabitacionTriple(tiposProveedorDatos.proveedorHotelDTO.valorHabitacionTriple)
            setValorHabitacionCuadruple(tiposProveedorDatos.proveedorHotelDTO.valorHabitacionCuadruple)
        }
    },[tiposProveedorDatos])
    
    useEffect(() => {
        setDataListado(datoBancario)
    }, [datoBancario])

    return (
        <Grid container xs={12} spacing={4} alignItems="flex-end">
            <Grid item xs={12}>
                <TablaHoteles
                    proveedorSeleccionado={proveedorSeleccionado}
                    tiposActuales={tiposActuales} setTiposActuales={setTiposActuales}
                    dataListado={dataListado} setDataListado={setDataListado}
                    conConvenio={conConvenio} setConConvenio={setConConvenio}
                    valorLavanderia={valorLavanderia} setValorLavanderia={setValorLavanderia}
                    valorPensionCompleta={valorPensionCompleta} setValorPensionCompleta={setValorPensionCompleta}
                    valorHabitacionSimple={valorHabitacionSimple} setValorHabitacionSimple={setValorHabitacionSimple}
                    valorHabitacionDoble={valorHabitacionDoble} setValorHabitacionDoble={setValorHabitacionDoble}
                    valorHabitacionTriple={valorHabitacionTriple} setValorHabitacionTriple={setValorHabitacionTriple} 
                    valorHabitacionCuadruple={valorHabitacionCuadruple} setValorHabitacionCuadruple={setValorHabitacionCuadruple}
                />
            </Grid>
        </Grid>
    )
}

export default Hoteles