import React from 'react'
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomRadio from '../../../commons/Radio/CustomRadio';

const RadioPrestador = (props) => {
    const { radiosTipoPrestador, setRadiosTipoPrestador } = props
    const [radioProveedor, setRadioProveedor] = React.useState([
        {
            titulo: 'Contrato activo', nombre: 'ContratoActivo', value: false, id: 'id',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'Primera atención', nombre: 'PrimeraAtencion', value: false, id: 'id2',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'Servicio 24hs', nombre: 'Servicio24hs', value: false, id: 'id3',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'RMN', nombre: 'RMN', value: false, id: 'id4',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'TAC', nombre: 'TAC', value: false, id: 'id5',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'RED CSS', nombre: 'REDCSS', value: false, id: 'id6',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },
        {
            titulo: 'RED Provart', nombre: 'REDProvart', value: false, id: 'id7',
            data: [{ codigo: 1, descripcion: 'Sí' }, { codigo: 2, descripcion: 'No' },]
        },

    ])
    const handleChangeRadio2 = (event, it, value) => {
        setRadioProveedor(data => {
            return data.map((item) => {
                if (item.nombre === it.nombre) {
                    setRadiosTipoPrestador({
                        ...radiosTipoPrestador,
                        [it.nombre]: value.codigo === 1 ? true : false,
                    })
                    return {
                        nombre: it.nombre,
                        value: value.codigo === 1 ? true : false,
                        titulo: it.titulo,
                        id: it.id,
                        data: it.data,
                    }
                } else {
                    return item
                }
            })
        })  
    }

    return (
        <Grid item container spacing={2} style={{ display: 'contents' }}>

            {radioProveedor && radioProveedor.map((it) => (

                <Grid item xs={2} >
                    <Grid item container xs={12} justify='center' >
                        <CustomTypography text={it.titulo} />
                    </Grid>
                    <Grid item container xs={12} justify='center'>
                        <FormControl component="fieldset">
                            <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={it.value}  >
                                
                                {it && it.data.map((item) => (

                                    <Grid >
                                        <FormControlLabel
                                            value={item.codigo === 1 ? true : false}
                                            control={<CustomRadio />}
                                            label={item.descripcion}
                                            onChange={(event) => handleChangeRadio2(event, it, item)}
                                        />
                                    </Grid>
                                ))}

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}
export default RadioPrestador
