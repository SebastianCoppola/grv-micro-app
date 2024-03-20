import React, { useEffect, useReducer } from 'react'
//Utils:
import { CANTIDAD_HORA_ESPERA, INGRESE_UN_VALOR, MONTO_FIJO_EN_PESOS, PORCENTUAL, 
    POR_MONTO_FIJO, TIPO_VALOR_VIAJE_NEGATIVO, VALOR_HORA_ESPERA, VALOR_NEGATIVO, 
    VALOR_POR_KILOMETRO, VALOR_VIAJE 
} from '../../../../../../Utils/const'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import { getListadoTipoValorViajeNegativo } from '../../../../../../redux/actions/listados'
//Components:
import CustomText from '../../../../../commons/TextField/CustomText'
import CustomSelect from '../../../../../commons/Select/customSelect'
import CustomAcordion2 from '../../../../../commons/CustomAccordion/CustomAcordion2'
//Mui:
import { Grid } from '@material-ui/core'

const initialState = [false, false]

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

const MontoFijo = ({ request, setRequest }) => {
    
    const dispatchRedux = useDispatch()
    
    const dataBackTipoValor = useSelector(state=>state.listados.tipoValorViajeNegativo)
    
    const [state, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        dispatchRedux(getListadoTipoValorViajeNegativo())
    },[])
    
    const handleToggleAccordeon = (value) => {
        dispatch({ type: "toggle", index: value })
    }
  
    return (
        <Grid container style={{margin:'20px 0 0 0'}}>
            <CustomAcordion2
                titulo={<strong>{POR_MONTO_FIJO}</strong>}
                isOpen={state[0]}
                onToggle={()=>handleToggleAccordeon(0)}
                estilo={true}
            >
                <Grid container spacing={2} style={{padding:'0 20px 0 0'}}>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={VALOR_VIAJE}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            focus={true}
                            value={request.montoFijo.valorViaje}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    valorViaje: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3} style={{padding: 1}}>
                        <Grid item container>
                            <CustomSelect
                                fullwidth
                                titulo={TIPO_VALOR_VIAJE_NEGATIVO}
                                data={dataBackTipoValor}
                                value={request.montoFijo.tipoValorViajeNegativo}
                                handleChangeSelect={e => setRequest({
                                    ...request, 
                                    montoFijo: {
                                        ...request.montoFijo,
                                        tipoValorViajeNegativo: e
                                    }
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={VALOR_NEGATIVO}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.valorNegativo}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    valorNegativo: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={MONTO_FIJO_EN_PESOS}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.montoFijoPesos}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    montoFijoPesos: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={VALOR_POR_KILOMETRO}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.valorKm}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    valorKm: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={PORCENTUAL}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.porcentual}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    porcentual: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={VALOR_HORA_ESPERA}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.valorHoraEspera}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    valorHoraEspera: e.target.value
                                }
                            })}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth
                            label={CANTIDAD_HORA_ESPERA}
                            shrink={true}
                            placeholder={INGRESE_UN_VALOR}
                            value={request.montoFijo.cantidadHoraEspera}
                            onChange={e => setRequest({
                                ...request, 
                                montoFijo: {
                                    ...request.montoFijo,
                                    cantidadHoraEspera: e.target.value
                                }
                            })}
                        />
                    </Grid>
                </Grid>
            </CustomAcordion2>
        </Grid>
    )
}

export default MontoFijo
