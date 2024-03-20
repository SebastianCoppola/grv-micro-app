import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomRadio from '../../../commons/Radio/CustomRadio';

export default function RadioEsPrioridad(props) {
    const { datos, setDatos, consulta, gridRadio, style, setLimpiarFiltros, limpiarFiltros } = props
    const [radioPrioridad, setRadioPrioridad] = useState('todos')

    useEffect(() => {
        setDatos({
            ...datos,
            'esPrioritario': null
        })
    }, [])
    useEffect(() => {
        if(limpiarFiltros){
            setRadioPrioridad('todos')
            setDatos({
                ...datos,
                'esPrioritario': null
            })
        }
    }, [limpiarFiltros])
    const handleChangeRadioPrioridad = (event, valor) => {
        setRadioPrioridad(valor)
        setDatos({
            ...datos,
            'esPrioritario': valor === 'todos' ? null : valor === 'si' ? true : false
        })
    }
    return (
        <Grid item xs={consulta && gridRadio ? gridRadio : 6} style={consulta ? style : null}>
            <CustomTypography text={'Es prioridad'} />
            <FormControl component="fieldset" >
                <RadioGroup
                    /* style={valTipoPrestador === 5 ? { flexDirection: 'row' } : { flexDirection: 'row', width: 'max-content' }} */
                    style={{ flexDirection: 'row' }}
                    aria-label="gender"
                    name="gender1"
                    value={radioPrioridad}  >
                    <FormControlLabel
                        value={'si'}
                        control={<CustomRadio />}
                        label={'Sí'}
                        onChange={(event) => handleChangeRadioPrioridad(event, 'si')}
                    />
                    <FormControlLabel
                        value={'no'}
                        control={<CustomRadio />}
                        label={'No'}
                        onChange={(event) => handleChangeRadioPrioridad(event, 'no')}
                    />
                    <FormControlLabel
                        value={'todos'}
                        control={<CustomRadio />}
                        label={'Todos'}
                        onChange={(event) => handleChangeRadioPrioridad(event, 'todos')}
                    />
                </RadioGroup>
            </FormControl>
        </Grid>
    )
}
