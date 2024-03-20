import React, { useEffect, useState } from 'react'
//Material:
import { makeStyles } from '@material-ui/styles'
import { Divider, Grid, TextField, Typography } from '@material-ui/core'
//Components:
import CustomTypography from '../../../commons/Typography/CustomTypography'
import PercentIcon from '../../../../commons/assets/percentIcon.png'

const useStyles = makeStyles((theme) => ({
    cabecera: {
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '10px 20px',
    },
    text: {
        fontSize: '14px',
        color: '#4b4b4b',
        margin: '10px 0 10px 0'
    },
}))

const DrawerAjustarValores = props => {
    const { setDeshabilitarSiguiente, setDatosGuardar, seleccion } = props
    const classes = useStyles()
    const text1 = '*El aumento porcentual se aplica a todas las prácticas nomencladas, no nomencladas y de los módulos seleccionadas del convenio actual.'
    const text2 = 'No aplica a las NBU.'
    const [porcentaje, setPorcentaje] = useState('')
    const cantidadNomencladas = (
        seleccion.nomencladasNoSeleccionadas ?
            seleccion.nomencladas && seleccion.nomencladas.length - seleccion.nomencladasNoSeleccionadas.length
            : seleccion.nomencladas ? seleccion.nomencladas.length : 0)
    const cantidadNoNomencladas = (
        seleccion.noNomencladasNoSeleccionadas ?
            seleccion.noNomencladas && seleccion.noNomencladas.length - seleccion.noNomencladasNoSeleccionadas.length
            : seleccion.noNomencladas ? seleccion.noNomencladas.length : 0)
    const cantidadModulos = (
        seleccion.modulosNoSeleccionados ?
            seleccion.modulos && seleccion.modulos.length - seleccion.modulosNoSeleccionados.length
            : seleccion.modulos ? seleccion.modulos.length : 0)

    //Input on change
    const onChangePorcentaje = (e) => {
        if (isNaN(e.target.value) || e.target.value === " " || e.target.value.includes(" ") || e.target.value === "0") {
            setPorcentaje(porcentaje)
        } else {
            setPorcentaje(e.target.value)
        }
    }

    //Habilitar botón aplicar
    useEffect(() => {
        if (porcentaje) {
            setDatosGuardar({ ...seleccion, porcentaje: porcentaje })
            setDeshabilitarSiguiente(false)
        } else {
            setDeshabilitarSiguiente(true)
        }
    }, [porcentaje])

    return (
        <Grid xs={12} style={{ padding: '0 0 0 0px' }}>
            <Grid xs={10} className={classes.cabecera}>
                <CustomTypography className={classes.text} text={text1} />
                <CustomTypography className={classes.text} text={text2} />
            </Grid>
            <Grid xs={10} style={{ padding: '30px 0' }}>
                <TextField
                    label='Aumento porcentual'
                    type='text'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ endAdornment: <img src={PercentIcon} /> }}
                    value={porcentaje}
                    onChange={onChangePorcentaje}
                    style={{ width: '200px' }}
                    placeholder='0'
                />
            </Grid>
            <Grid xs={10} style={{ border: '1px solid #c4c4c4', borderRadius: '10px', padding: '10px 20px' }}>
                <Typography className={classes.text}>
                    Prácticas nomencladas: {cantidadNomencladas}
                </Typography>
                <Divider />
                <Typography className={classes.text}>
                    Prácticas no nomencladas: {cantidadNoNomencladas}
                </Typography>
                <Divider />
                <Typography className={classes.text}>
                    Módulos: {cantidadModulos}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default DrawerAjustarValores