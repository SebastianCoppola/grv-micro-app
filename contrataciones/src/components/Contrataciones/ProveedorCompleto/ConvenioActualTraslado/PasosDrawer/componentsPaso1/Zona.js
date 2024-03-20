import React, { useReducer, useEffect, useState } from 'react'
//Utils:
import { ASTERISCO, BLANK_SPACE, DESTINO_FRECUENTE, EMPTY_STRING, INGRESE_LOCALIDADES, 
    LOCALIDADES_ZONA, PESOS, POR_ZONA, VALOR_DEL_KM_ZONA, VARIANT_BUTTON 
} from '../../../../../../Utils/const'
//Redux: 
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions'
//Mui:
import { Checkbox, CircularProgress, FormHelperText, Grid, TextField, Typography, makeStyles, withStyles } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons/'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { green } from '@material-ui/core/colors'
//Components:
import CustomAcordion2 from '../../../../../commons/CustomAccordion/CustomAcordion2'
import CustomText from '../../../../../commons/TextField/CustomText'

const useStyles = makeStyles({
    arrow:{
        transition: 'transform 0.3s ease'
    },
    arrowRotated:{
        transform: 'rotate(-180deg)',
        transition: 'transform 0.3s ease'
    }
})

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

const localidades = [
    {idLocalidad:1, localidad:"CABA"},
    {idLocalidad:2, localidad:"Cordoba"},
    {idLocalidad:3, localidad:"Mendoza"}
]

const Zona = ({request, setRequest}) => {
    
    const reduxDispatch = useDispatch()

    const classes = useStyles()

    const listadoDestinosFrecuentes = useSelector(state=>state.listados.listadoDestinoFrecuentes)
    const loadingDestinoFrecuentes = useSelector(state=>state.listados.loadingListadoDestinosFrecuentes) 

    const [state, dispatch] = useReducer(reducer, [false, false])
    const [selectedDestino, setSelectedDestino] = useState(null)

    useEffect(()=>{
        getListadoDestinosFrecuentes()
    },[])

    //Get Listado Destinos Frecuentes:
    const getListadoDestinosFrecuentes = () => {
        let cbSuccess = (success) => {
            //if(!success) //throwError
        }
        reduxDispatch(actions.getListadoDestinoFrecuentes(cbSuccess))
    }

    //Toogle Accordion:
    const handleToggleAccordeon = (value) => {
        dispatch({ type: "toggle", index: value })
    }

    //Checkbox
    const GreenCheckbox = withStyles({
        root: { color: green[400], '&$checked': { color: green[600] } },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />)

    //Autocomplete:
    const AutoCompleteAltaTraslado = ({nroZona}) => {
        return (
            <Autocomplete
                multiple
                id="tags-outlined"
                filterSelectedOptions
                options={localidades && localidades.length > 0 && localidades}
                getOptionLabel={(option)=>option.localidad}
                size='small'
                onChange={(event, selectedValue) => {
                    let oldDestinos = request.destinosFrecuentes.filter(it => it.idDestinoFrecuente !== selectedDestino)
                    let newDestino = request.destinosFrecuentes.find(it => it.idDestinoFrecuente === selectedDestino)
                    let oldZonas = newDestino.zonas.filter(it => it.idZona !== nroZona)
                    let newZona = {
                        idZona: nroZona, 
                        idLocalidades: selectedValue.map(it => it.idLocalidad),
                        idDescripcionLocalidades: selectedValue
                    }
                    setRequest({
                        ...request,
                        destinosFrecuentes: [
                            ...oldDestinos,
                            {idDestinoFrecuente: selectedDestino, zonas: [ ...oldZonas, newZona ]}
                        ]
                    })
                }}
                value={((request.destinosFrecuentes.find(it => it.idDestinoFrecuente === selectedDestino).zonas)
                    .find(it => it.idZona === nroZona))?.idDescripcionLocalidades
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant={VARIANT_BUTTON.OUTLINED}
                        placeholder={INGRESE_LOCALIDADES}
                        style={{backgroundColor:'white'}}
                    />
                )}
            />
        )
    }

    //Check destino frecuente:
    const handleCheckDestinoFrecuente = codigo => {
        if(request.destinosFrecuentes.some(it => it.idDestinoFrecuente === codigo)){
            setRequest({
                ...request,
                destinosFrecuentes: request.destinosFrecuentes.filter(it => it.idDestinoFrecuente !== codigo)
            })
            if(selectedDestino === codigo) setSelectedDestino(null)
        }else{
            setRequest({
                ...request,
                destinosFrecuentes: [
                    ...request.destinosFrecuentes, 
                    {idDestinoFrecuente: codigo, zonas: []}
                ]
            })
        }
    }

    //Is checked destino frecuente:
    const isChecked = codigo => {
        return request.destinosFrecuentes.some(it => it.idDestinoFrecuente === codigo)
    }

    return (
        <Grid style={{margin:'20px 0 0 0'}}>
            <CustomAcordion2
                titulo={<strong>{POR_ZONA}</strong>}
                isOpen={state[1]}
                onToggle={()=>handleToggleAccordeon(1)}
                estilo={true}
            >
                <Grid container>
                    {/* Valores x Zona */}
                    <Grid item xs={12} container spacing={2}>
                        {request.valorZonas.map( (zona, index) => (
                            <Grid item xs={3} key={index}>
                                <CustomText
                                    label={
                                        <Typography>
                                            {VALOR_DEL_KM_ZONA}
                                            {BLANK_SPACE}
                                            {zona.zona}
                                            {BLANK_SPACE}
                                            <span style={{color:'red'}}>{zona.zona === '1' ? ASTERISCO : EMPTY_STRING}</span>
                                        </Typography>
                                    }
                                    shrink={true}
                                    placeholder={`${PESOS}0`}
                                    focus={true}
                                    value={zona.valor}
                                    onChange={e => setRequest({
                                        ...request,
                                        valorZonas: request.valorZonas.map(it => 
                                            it.zona !== zona.zona ? it : {zona: zona.zona, valor: e.target.value} 
                                        )
                                    })}
                                    disabled={false}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    
                    {/* Listado Destinos Frecuentes */}
                    <Grid item xs={12} container style={{margin:'20px 0 0 0'}}>
                        {loadingDestinoFrecuentes ? (
                            <Grid container justify='center' style={{padding:'20px 0'}}>
                                <CircularProgress loading={true} />
                            </Grid>
                        ):(
                            <>
                                <Grid item xs={12} style={{margin:'20px 0'}}>
                                    <Typography style={{fontSize:'13px', fontWeight:700}}>
                                        {DESTINO_FRECUENTE}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    {listadoDestinosFrecuentes && listadoDestinosFrecuentes.length > 0 && (
                                        listadoDestinosFrecuentes.map(it => (
                                            <Grid item container style={{padding:'10px 15px', borderRadius:'15px 0 0 15px', backgroundColor: (selectedDestino === it.codigo) ? '#F5F5F5' : '#ffff' }}>
                                                <Grid item xs={2} container alignItems='center'>
                                                    <GreenCheckbox 
                                                        onChange={() => handleCheckDestinoFrecuente(it.codigo)} 
                                                        checked={isChecked(it.codigo)} 
                                                        disabled={request.valorZonas.find(zona => zona.zona === '1').valor !== "" ? false : true }
                                                    />
                                                </Grid>
                                                <Grid item xs={8} container justify='center' direction='column'>
                                                    <Typography style={{fontSize:'13px', fontWeight:700}}>{it && it.descripcion}</Typography>
                                                    <Typography style={{fontSize:'12px'}}>{it && it.direccion}</Typography>
                                                </Grid>
                                                <Grid item xs={2} container alignItems='center' justify='flex-end'>
                                                    {isChecked(it.codigo) && (
                                                        <ArrowForwardIos 
                                                            fontSize='small' 
                                                            onClick={()=> (selectedDestino === it.codigo) ? setSelectedDestino(null) : setSelectedDestino(it.codigo) }
                                                            style={{cursor:'pointer'}}
                                                            className={(selectedDestino === it.codigo) ? classes.arrowRotated : classes.arrow }
                                                        />
                                                    )}
                                                </Grid>
                                            </Grid>            
                                        ))
                                    )}
                                </Grid>
                                {selectedDestino && (
                                    <Grid item xs={6} container style={{padding: '10px 35px', borderRadius:'0 15px 15px 0', backgroundColor:"#F5F5F5",display:"block"}}>
                                        { request.valorZonas.map((it, index) => {
                                            if(it.valor && it.valor !== ''){
                                                return (
                                                    <Grid item xs={12} style={{marginBottom:'15px'}} key={index}>
                                                        <FormHelperText>
                                                            {LOCALIDADES_ZONA}
                                                            {BLANK_SPACE}
                                                            {it.zona}
                                                            {BLANK_SPACE}
                                                            <span style={{color:'red'}}>{ASTERISCO}</span>
                                                        </FormHelperText>
                                                        <AutoCompleteAltaTraslado nroZona={it.zona} />
                                                    </Grid>
                                                )
                                            }
                                        })}
                                    </Grid>
                                )}
                            </>
                        )}
                    </Grid>
                </Grid>
            </CustomAcordion2>
        </Grid>
    )
}

export default Zona
