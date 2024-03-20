import React, { useEffect, useState } from "react";
import { Grid } from '@material-ui/core'
import CustomText from "../../../../../../../commons/TextField/CustomText";
import CustomCheck from "../../../../../../../commons/CustomCheck/CustomChek";
import { useSelector } from "react-redux";

const InsumosOrtopedicos = (props) => {
    const { proveedorSeleccionado, tiposActuales, setTiposActuales, } = props
    const [horarioAtencion, setHorarioAtencion] = useState(null)
    const [cierraTarde, setCierraTarde] = useState(false)
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos);

    useEffect(() => {
        setHorarioAtencion(tiposActuales && tiposActuales.proveedorInsumosOrtopedicosDTO && tiposActuales.proveedorInsumosOrtopedicosDTO.horarioAtencion)
        setCierraTarde(tiposActuales && tiposActuales.proveedorInsumosOrtopedicosDTO && tiposActuales.proveedorInsumosOrtopedicosDTO.cierraTarde)
    }, [tiposActuales])

    const onChangeHorarioAtencion = (event) => {
        setHorarioAtencion(event.target.value)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorInsumosOrtopedicosDTO": {
                    ...tiposActuales.proveedorInsumosOrtopedicosDTO,
                    "horarioAtencion": event.target.value,
                   // eliminarRelacion: !element.seleccionado
                }
            })
        })
    }
    const handleCierraTarde = (event) => {
        setCierraTarde(event.target.checked)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorInsumosOrtopedicosDTO": {
                    ...tiposActuales.proveedorInsumosOrtopedicosDTO,
                    "cierraTarde": event.target.checked,
                    //eliminarRelacion: element.seleccionado
                }
            })
        })
    }

    useEffect(() => {
        if(tiposActuales){
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorInsumosOrtopedicosDTO": {
                        ...tiposActuales.proveedorInsumosOrtopedicosDTO,
                        //"eliminarRelacion": !element.seleccionado
                    }
                })
    
            })
        }
    }, [proveedorSeleccionado])
    return (
        <Grid container xs={12} spacing={4} alignItems="flex-end">
            <Grid item xs={6}>
                <CustomText
                    label={'Horarios de atención'}
                    value={horarioAtencion}
                    onChange={onChangeHorarioAtencion}
                    maxCaracteres={300}
                    id='horarioAtencion'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                    placeholder="Ingresar horarios"
                />
            </Grid>
            <Grid item xs={6}>
                <CustomCheck
                    checked={cierraTarde}
                    handleChange={handleCierraTarde}
                    texto={'Cierra tarde'}
                />
            </Grid>
        </Grid>
    )
}
export default InsumosOrtopedicos