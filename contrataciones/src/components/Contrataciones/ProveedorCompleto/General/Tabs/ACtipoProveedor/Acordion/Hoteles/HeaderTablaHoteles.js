import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from '@material-ui/core'
import CustomText from "../../../../../../../commons/TextField/CustomText";
import CustomSelect from "../../../../../../../commons/Select/customSelect";
import { searchTipoHabitacionHoteles } from "../../../../../../../../redux/actions/listados";

const HeaderTablaHoteles = (props) => {
    const { tiposActuales, setTiposActuales,
        proveedorSeleccionado,
        valorLavanderia, setValorLavanderia,
        valorPensionCompleta, setValorPensionCompleta,
        valorHabitacionSimple, setValorHabitacionSimple,
        valorHabitacionDoble, setValorHabitacionDoble,
        valorHabitacionTriple, setValorHabitacionTriple,
        valorHabitacionCuadruple, setValorHabitacionCuadruple } = props
    const dispatch = useDispatch()
    const tipoHabitacionHoteles = useSelector(state => state.listados.tipoHabitacion)
    const [tipoHabitacionSeleccionada, setTipoHabitacionSeleccionada] = useState()
    const [valorHabitacion, setValorHabitacion] = useState("")

    useEffect(() => {
        dispatch(searchTipoHabitacionHoteles())
    }, [])

    // useEffect(() => { setValorHabitacion("0") }, [tipoHabitacionSeleccionada])

    const onChangeValorLavanderia = (event) => {
        setValorLavanderia(event.target.value)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorHotelDTO": {
                    ...tiposActuales.proveedorHotelDTO,
                    "valorLavanderia": parseInt(event.target.value),
                    //"eliminarRelacion": element.seleccionado
                }
            })
        })
    }
    const onChangeValorPension = (event) => {
        setValorPensionCompleta(event.target.value)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorHotelDTO": {
                    ...tiposActuales.proveedorHotelDTO,
                    "valorPensionCompleta": parseInt(event.target.value),
                    //"eliminarRelacion": element.seleccionado
                }
            })
        })
    }
    const onChangeValorHabitacion = (event) => {
        setValorHabitacion(event.target.value)
        switch (tipoHabitacionSeleccionada) {
            case 1:
                setValorHabitacionSimple(event.target.value)
                proveedorSeleccionado.map(element => {
                    setTiposActuales({
                        ...tiposActuales,
                        "proveedorHotelDTO": {
                            ...tiposActuales.proveedorHotelDTO,
                            "valorHabitacionSimple": parseInt(event.target.value)
                            //"eliminarRelacion": element.seleccionado
                        }
                    })
                })
                break;
            case 2:
                setValorHabitacionDoble(event.target.value)
                proveedorSeleccionado.map(element => {
                    setTiposActuales({
                        ...tiposActuales,
                        "proveedorHotelDTO": {
                            ...tiposActuales.proveedorHotelDTO,
                            "valorHabitacionDoble": parseInt(event.target.value)
                            //"eliminarRelacion": element.seleccionado
                        }
                    })
                })
                break;
            case 3:
                setValorHabitacionTriple(event.target.value)
                proveedorSeleccionado.map(element => {
                    setTiposActuales({
                        ...tiposActuales,
                        "proveedorHotelDTO": {
                            ...tiposActuales.proveedorHotelDTO,
                            "valorHabitacionTriple": parseInt(event.target.value)
                            //"eliminarRelacion": element.seleccionado
                        }
                    })
                })
                break;
            case 4:
                setValorHabitacionCuadruple(event.target.value)
                proveedorSeleccionado.map(element => {
                    setTiposActuales({
                        ...tiposActuales,
                        "proveedorHotelDTO": {
                            ...tiposActuales.proveedorHotelDTO,
                            "valorHabitacionCuadruple": parseInt(event.target.value)
                            //"eliminarRelacion": element.seleccionado
                        }
                    })
                })
                break;
            default:
                break;
        }
    }
    const handleChangeSelectTipoHabitacion = (event) => {
        setTipoHabitacionSeleccionada(event.target.value)
        switch (event.target.value) {
            case 1:
                setValorHabitacion(valorHabitacionSimple ? valorHabitacionSimple : "0")
                break;
            case 2:
                setValorHabitacion(valorHabitacionDoble ? valorHabitacionDoble : "0")
                break;
            case 3:
                setValorHabitacion(valorHabitacionTriple ? valorHabitacionTriple : "0")
                break;
            case 4:
                setValorHabitacion(valorHabitacionCuadruple ? valorHabitacionCuadruple : "0")
                break;
            case "":
                setValorHabitacion("0");
                break;
            default:
                setValorHabitacion("0");
                break;
        }
    }

    return (
        <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={3}>
                <CustomText
                    label={'Valor lavandería'}
                    value={valorLavanderia ? valorLavanderia : null}
                    onChange={onChangeValorLavanderia}
                    id='valorLavanderia'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomText
                    label={'Valor Pensión completa'}
                    value={valorPensionCompleta ? valorPensionCompleta : null}
                    onChange={onChangeValorPension}
                    id='valorPension'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomSelect
                    titulo={"Tipo habitación"}
                    data={tipoHabitacionHoteles ? tipoHabitacionHoteles : null}
                    fullwidth={true}
                    seleccione={true}
                    placeholder={'Seleccionar tipo'}
                    handleChangeSelect={handleChangeSelectTipoHabitacion}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomText
                    label={'Valor habitación'}
                    value={valorHabitacion ? valorHabitacion : null}
                    onChange={onChangeValorHabitacion}
                    id='valorHabitacion'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'} />
            </Grid>
        </Grid>
    )
}
export default HeaderTablaHoteles
