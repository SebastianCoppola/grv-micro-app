import React, { useState } from 'react'
import PropTypes from 'prop-types'
//estilo
import { makeStyles } from '@material-ui/core/styles'
//material-ui
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import TipoDNI from '../../Selects/tipoDNI'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: props => props.height || '30px',
        borderRadius: '20px',
        border: 'solid 2px rgba(202, 202, 202)',
        '&.MuiInputBase-root': {
            fontSize: props => props.cabeceraTabla ? '13px' : null
        }
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        borderRadius: '50px',
        '&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            appearance: ' none',
            margin: 0,
        },
        '&.MuiInputBase-root': {
            fontSize: '13px'
        }
    },
    select: {
        paddingLeft: 2,
        paddingBottom: 7,
    },
}))

const Buscador = (props) => {

    const { data, onClik, cabeceraTabla, estilo, inputRef, setDNIHeader, request, setRequest, setTipoDniConsulta } = props

    const classes = useStyles(props)

    const [dni, setDni] = useState(data && data.nroDoc)
    const [dataDoc, setDataDoc] = useState('')
    const [valTipoDni, setValTipoDni] = useState(data && data.tipoDoc && data.tipoDoc)

    const handleChangeDni = (event) => {
        if (setDNIHeader) {
            setDNIHeader(event.target.value)
        }
        if (event.target.value === '') {
            setDni(null)
            if (setDNIHeader) setDNIHeader(null)
            // if (setTipoDniConsulta) { setTipoDniConsulta(null) }
            onClik(valTipoDni, null)
            if (setRequest) { setRequest({ ...request, nroDoc: null }) }
        } else {
            setDni(event.target.value)
        }
    }

    const onKey = (event) => {
        if (event.keyCode === 69) {
            event.preventDefault()
        }
    }

    const handleChangeSelectTipoDni = (event) => {
        setValTipoDni(event.target.value);
        if (setTipoDniConsulta) setTipoDniConsulta(event.target.value)
    }

    return (
        <Paper component="form" style={estilo} className={classes.root}>
            <div className={!cabeceraTabla ? classes.select : null}>
                <TipoDNI
                    valTipoDni={valTipoDni}
                    handleChangeSelectTipoDni={handleChangeSelectTipoDni}
                    estilo={true}
                    variantTitulo={cabeceraTabla ? 'body2' : ''}
                    titulo={false}
                    setDataDoc={setDataDoc}
                />
            </div>
            <InputBase
                onWheel={(e) => e.target.blur()}
                className={classes.input}
                placeholder={`Ingrese el ${dataDoc && dataDoc[valTipoDni - 1] && dataDoc[valTipoDni - 1].descripcion} `}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={dni}
                onChange={(event) => handleChangeDni(event)}
                type={'number'}
                inputRef={inputRef}
                pattern="^[0-9,$]*$"
                onKeyDown={onKey}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={() => onClik(valTipoDni, dni)}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

Buscador.propTypes = {
    onClik: PropTypes.any,
    variant: PropTypes.any,
    cabeceraTabla: PropTypes.bool,
    estilo: PropTypes.any,
    height: PropTypes.string
}

export default Buscador

// const dataTipoDoc = [
//     { codigo: 1, descripcion: 'DNI' },
//     { codigo: 2, descripcion: 'CI' },
//     { codigo: 3, descripcion: 'LE' },
//     { codigo: 4, descripcion: 'LC' },
// ]