import React, { useEffect } from 'react'
import * as actions from '../../../../redux/actions/index'
//Material-ui
import Grid from '@material-ui/core/Grid';

import { ROJO, VERDE, AMARILLO } from '../../../../Utils/const'
import { useDispatch, useSelector } from 'react-redux';
//iconos
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
//estilo
import { makeStyles } from '@material-ui/styles';
//componentes
import CustomCard from '../../../commons/Card/CustomCard';
import CardObrasSociales from '../CentroMedico/CardObrasSociales';
import ambulance from '../../../../commons/assets/ambulance.png'
import CustomChip from '../../../commons/Chip/CustomChip';
import Loader from '../../../commons/Loading/Loader';

const useStyles = makeStyles({

})

const Ambulancias = (props) => {
    const [valChip, setValChip] = React.useState([2, 3])
    const loadingAmbulancias = useSelector(state => state.listados.loadingAmbulancias)
    const dispatch = useDispatch()
    //codigo
    const codigoAmbulancia = useSelector(state => state.listados.codigoAmbulancia ? state.listados.codigoAmbulancia : null)
    const ambulancias = useSelector(state => state.listados.ambulancias)
    const [dataAmbulancia, setDataAmbulancia] = React.useState(ambulancias ? ambulancias : [])


    const onClickChip = (event, it) => {
        const existe = valChip.filter(iter => (iter === it.codigo))
        if (existe[0] !== it.codigo) {
            setValChip(data => ([
                ...data,
                it.codigo
            ]))

        } else {
            setValChip(data => (
                data.filter(dato => dato !== it.codigo)
            ))
        }
    }

    useEffect(() => {
        if (valChip && valChip.length > 0) {
            let codigo = {
                codigos: valChip
            }
            dispatch(actions.fetchAmbulancias(codigo))
        } else {
            setDataAmbulancia([])
        }
    }, [valChip])

    useEffect(() => {
        setDataAmbulancia(ambulancias)
    }, [ambulancias])

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
    }

    const coloresChip = (arr, codigo) => {
        let colorBol = false;
        arr && arr.forEach(element => {
            if (element === codigo) {
                colorBol = true
            }
        })
        return colorBol
    }

    return (
        <Grid container spacing={2} alignItems={'center'}>
            <Grid item xs={6} container spacing={2} >

                {codigoAmbulancia && codigoAmbulancia.map((it, index) => {
                    return (
                        <Grid item key={index}>
                            <CustomChip
                                fontSize={true}
                                avatar={<FiberManualRecordIcon
                                    style={coloresChip(valChip, it.codigo) && it.descripcion === ROJO ? { color: '#e34850' } :
                                        coloresChip(valChip, it.codigo) && it.descripcion === VERDE ? { color: ' #2DC76D' } :
                                            coloresChip(valChip, it.codigo) && it.descripcion === AMARILLO ? { color: '#FDC800' } : null}
                                />}
                                colorLabel={coloresChip(valChip, it.codigo) ? capitalize(it.descripcion) : null}
                                label={capitalize(it.descripcion)}
                                onClick={(event,) => onClickChip(event, it)}
                                style={coloresChip(valChip, it.codigo) && it.descripcion === ROJO ? { backgroundColor: 'white', color: '#e34850' } :
                                    coloresChip(valChip, it.codigo) && it.descripcion === VERDE ? { backgroundColor: 'white', color: ' #2DC76D' } :
                                        coloresChip(valChip, it.codigo) && it.descripcion === AMARILLO ? { backgroundColor: 'white', color: '#FDC800' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                            />

                        </Grid>
                    )
                })
                }
            </Grid>
            <Grid item xs={12}>
                <Loader loading={loadingAmbulancias} />
            </Grid>

            <Grid item >
                <Grid container spacing={4} spacing={2} >
                    {dataAmbulancia && dataAmbulancia.map((datos) => (
                        <Grid item container xs={4}  >
                            <CustomCard
                                ambulancia={true}
                                
                                color={datos && (datos.codigoTrasladoAmbulanciaIdCodigo===3 ? '#e34850' : 
                                datos.codigoTrasladoAmbulanciaIdCodigo===1 ?  '#2DC76D'
                                  :  datos.codigoTrasladoAmbulanciaIdCodigo===2 ? '#FDC800': null) }
                                
                                data={datos}
                                body={<CardObrasSociales  ambulancia={true} icon={ambulance}  datos={datos} />} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Ambulancias
