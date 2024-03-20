import React, { useEffect, useState } from 'react'
//Material:
import { makeStyles } from '@material-ui/styles'
import { Grid, TextField } from '@material-ui/core'
//Components: 
import CustomTypography from '../../../commons/Typography/CustomTypography'
import CostoExtra from './CostoExtra'

const useStyles = makeStyles((theme) => ({
    cabecera: {
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        padding: '25px 15px',
    },
    text: {
        fontSize: '14px',
        color: '#4b4b4b',
    },
}))

const DrawerEditarPrestacion = props => {
    const { setDeshabilitarSiguiente, editRow, datosGuardar, setDatosGuardar } = props
    const classes = useStyles()
    //Inputs:
    const [errorPrecio, setErrorPrecio] = useState(false)
    const [precio, setPrecio] = useState(editRow && editRow.precio ? editRow.precio : '')
    const [codigoExterno, setCodigoExterno] = useState(editRow && editRow.codigoExterno ? editRow.codigoExterno : '')
    const [listadoCostosExtra, setListadoCostosExtra] = useState(
        editRow && editRow.costosExtras && editRow.costosExtras.length > 0 ?
            editRow.costosExtras.map(it => { return { ...it, tableData: { checked: true }, disableSelection: true } })
            : []
    )

    //Set datos Guardar:
    useEffect(() => {
        setDatosGuardar(editRow)
    }, [])

    //OnChangeInputs: 
    useEffect(() => {
        if (datosGuardar) {
            if (listadoCostosExtra.length > 0) {
                setDatosGuardar({
                    ...datosGuardar,
                    costosExtras: listadoCostosExtra,
                    tieneCostosExtras: listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true).length > 0
                })
            } else {
                setDatosGuardar({
                    ...datosGuardar,
                    costosExtras: listadoCostosExtra,
                    tieneCostosExtras: false
                })
            }
        }
    }, [listadoCostosExtra])

    const handleChangePrecio = (e) => {
        var regEx1 = /^([0-9]{1,10}\.?)$/
        var regEx2 = /^([0-9]{1,10}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,10}\.)$/
        if (e.target.value === "0") {
            setErrorPrecio(true)
        } else
            if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
                setPrecio(e.target.value)
                setDatosGuardar({ ...datosGuardar, precio: e.target.value })
                if (regEx3.test(e.target.value)) { setErrorPrecio(true) }
                else { setErrorPrecio(false) }
            }
        if (e.target.value === '') {
            setErrorPrecio(true)
            setPrecio(e.target.value)
        }
    }

    const handleChangeCodigoExterno = (e) => {
        setCodigoExterno(e.target.value)
        setDatosGuardar({ ...datosGuardar, codigoExterno: e.target.value })
    }

    //Compara los costosExtra que vienen del back con los nuevos y devuelve true si son iguales.     
    const compareListadosCostosExtras = () => {
        let arr1 = editRow && editRow.costosExtras ?
            editRow.costosExtras.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
            : []
        let arr2 = listadoCostosExtra ?
            listadoCostosExtra.filter(it => it.eliminarCostoExtra !== true).map(it => { return it.idPrestacion })
            : []
        arr1 && arr1.sort();
        arr2 && arr2.sort();
        if (arr1 && arr2) {
            return arr1.length === arr2.length && arr1.every(function (v, i) { return v === arr2[i] })
        } else {
            return true
        }
    }

    //Habilito el botón siguiente:
    useEffect(() => {
        if (datosGuardar && !errorPrecio && (
            parseFloat(datosGuardar.precio) != editRow.precio ||
            datosGuardar.codigoExterno !== editRow.codigoExterno ||
            (datosGuardar.costosExtras && !compareListadosCostosExtras())
        )) {
            setDeshabilitarSiguiente(false)
        } else {
            setDeshabilitarSiguiente(true)
        }
    }, [datosGuardar])

    return (
        <Grid xs={12}>
            <Grid xs={12} className={classes.cabecera}>
                <CustomTypography className={classes.text} text={'Código: ' + editRow.codigo} />
                <CustomTypography className={classes.text} text={'Descripción: ' + editRow.descripcion} style={{ marginTop: '5px' }} />
            </Grid>

            <Grid container xs={12} style={{ marginTop: '30px' }}>
                <TextField
                    label='Precio'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={precio}
                    onChange={handleChangePrecio}
                    error={errorPrecio}
                    onBlur={() => { precio === '' || precio === null ? setErrorPrecio(true) : setErrorPrecio(false) }}
                />
                <TextField
                    label='Cantidad'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={1}
                    disabled={true}
                />
                <TextField
                    label='Código Externo'
                    type='text'
                    style={{ margin: '0 5px' }}
                    InputLabelProps={{ shrink: true }}
                    value={codigoExterno}
                    onChange={handleChangeCodigoExterno}
                />
            </Grid>

            <CostoExtra listadoCostosExtra={listadoCostosExtra} setListadoCostosExtra={setListadoCostosExtra} />

        </Grid>
    )
}

export default DrawerEditarPrestacion