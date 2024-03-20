import React from "react";
import { Grid } from '@material-ui/core'
import CustomText from "../../../../../../../commons/TextField/CustomText";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Farmacia = (props) => {
    const { data, setData, proveedorSeleccionado, tiposActuales, setTiposActuales, } = props
    const [observaciones, setObservaciones] = React.useState(null)
    const [notas, setNotas] = React.useState(null)
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos);

    useEffect(() => {
        setObservaciones(tiposActuales && tiposActuales.proveedorFarmaciaDTO && tiposActuales.proveedorFarmaciaDTO.observaciones)
        setNotas(tiposActuales && tiposActuales.proveedorFarmaciaDTO && tiposActuales.proveedorFarmaciaDTO.notas)
    }, [tiposActuales])

    const onChangeObservaciones = (event) => {
        setObservaciones(event.target.value)
        if(tiposActuales){
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorFarmaciaDTO": {
                        ...tiposActuales.proveedorFarmaciaDTO,
                        "observaciones": event.target.value,
                        //eliminarRelacion: element.seleccionado
                    }
                })
            })
        }
    }
    const onChangeNotas = (event) => {
        setNotas(event.target.value)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorFarmaciaDTO": {
                    ...tiposActuales.proveedorFarmaciaDTO,
                    "notas": event.target.value,
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
                    "proveedorFarmaciaDTO": {
                        ...tiposActuales.proveedorFarmaciaDTO,
                        //"eliminarRelacion": element.seleccionado
                    }
                })

            })
        }
    }, [proveedorSeleccionado])

    return (
        <Grid container xs={12} spacing={4} alignItems="flex-end">
            <Grid item xs={6}>
                <CustomText
                    label={'Observaciones'}
                    value={observaciones}
                    onChange={onChangeObservaciones}
                    id='Observaciones'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                    placeholder="Ingresar observaciones"
                />
            </Grid>
            <Grid item xs={6}>
                <CustomText
                    label={'Notas'}
                    value={notas}
                    onChange={onChangeNotas}
                    id='Notas'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                    placeholder="Ingresar notas" />
            </Grid>

        </Grid>
    )
}
export default Farmacia