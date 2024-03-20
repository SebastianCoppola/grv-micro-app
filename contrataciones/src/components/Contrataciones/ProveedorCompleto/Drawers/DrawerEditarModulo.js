import React, { useEffect, useState } from 'react'
//Material
import { makeStyles } from '@material-ui/styles'
import { Grid, TextField } from '@material-ui/core'
//Components: 
import CustomTypography from '../../../commons/Typography/CustomTypography'


const useStyles = makeStyles((theme) => ({
    cabecera: {
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '15px 10px',
    },
    text: {
        fontSize: '14px',
        color: '#4b4b4b',
    },
}))

const DrawerEditarModulo = props => {
    const { setDeshabilitarSiguiente, editRow, setDatosGuardar } = props
    const classes = useStyles()

    //Campos Form
    const [precio, setPrecio] = useState('')
    const [errorPrecio, setErrorPrecio] = useState(false)

    //OnChange FORM:
    const onChangePrecio = (e) => {
        var regEx1 = /^([0-9]{1,10}\.?)$/
        var regEx2 = /^([0-9]{1,10}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,10}\.)$/

        if (e.target.value === "0") {
            setErrorPrecio(true)
        } else
            if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
                setPrecio(e.target.value)
                if (regEx3.test(e.target.value)) { setErrorPrecio(true) }
                else { setErrorPrecio(false) }
            }
        if (e.target.value === '' || parseFloat(e.target.value) === editRow.precio) {
            setErrorPrecio(true)
            setPrecio(e.target.value)
        }
    }

    //Habilitar desabilitar boton siguiente:
    useEffect(() => {
        setDatosGuardar({ ...editRow, precio: precio })
        if (precio && !errorPrecio) {
            setDeshabilitarSiguiente(false)
        } else {
            setDeshabilitarSiguiente(true)
        }
    }, [precio])

    return (
        <Grid xs={12} style={{ marginTop: '10px' }}>
            <Grid xs={12} className={classes.cabecera} >
                <CustomTypography className={classes.text} text={'Costo actual: $' + editRow.precio} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <TextField
                    label='Nuevo precio *'
                    type='text'
                    InputLabelProps={{ shrink: true }}
                    value={precio}
                    onChange={onChangePrecio}
                    error={errorPrecio}
                    onBlur={() => { precio === '' || precio === null ? setErrorPrecio(true) : setErrorPrecio(false) }}
                />
            </Grid>
        </Grid>
    )
}

export default DrawerEditarModulo