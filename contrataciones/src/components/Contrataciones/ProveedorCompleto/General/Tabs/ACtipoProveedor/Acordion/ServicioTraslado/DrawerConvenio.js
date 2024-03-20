import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Grid, TextField } from '@material-ui/core'
import MaskedInput from 'react-text-mask';
import CustomSelect from "../../../../../../../commons/Select/customSelect";
import CustomInformacionProveedor from "../../../../../../AltaProveedor/DatosProveedor/InformacionProveedor/CustomInformacionProveedor";
import CustomText from "../../../../../../../commons/TextField/CustomText";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Provincia from "../../../../../../../Selects/Provincia"
import * as actions from "../../../../../../../../redux/actions/listados";

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            //thousandSeparator
            decimalScale={2}
            suffix=""
            decimalSeparator="."
            allowNegative={true}
            fixedDecimalScale={true}
            //allowEmptyFormatting={false}
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const DrawerConvenio = (props) => {
    const { dataConvenio, setDataConvenio,
        guardarData, setGuardarData,
        disableButton, setDisableButton, actualizarData, setActualizarData,
        setOpenConfirmacion } = props

    const [idProvincia, setIdProvincia] = useState(dataConvenio && dataConvenio.idProvincia ? dataConvenio.idProvincia : null)
    const [provincia, setProvincia] = useState(dataConvenio && dataConvenio.provincia ? dataConvenio.provincia : null)
    const [valChip, setValChip] = useState(
        dataConvenio && dataConvenio.idTipoDeValor ?
            [
                { descripcion: 'Por KM fijo', codigo: 1, verificado: dataConvenio && dataConvenio.idTipoDeValor === 1 },
                { descripcion: 'Por zonificación', codigo: 2, verificado: dataConvenio && dataConvenio.idTipoDeValor === 2 }
            ]
            :
            [
                { descripcion: 'Por KM fijo', codigo: 1, verificado: true },
                { descripcion: 'Por zonificación', codigo: 2, verificado: false }
            ]
    )
    const [valueKMFijo, setValueKMFijo] = useState(dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona ? dataConvenio.valorZonaKmConvenioTraslado.valorZona : null)
    const [valueKmExcedente, setValueKmExcedente] = useState(dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorKmExcedente ? dataConvenio.valorZonaKmConvenioTraslado.valorKmExcedente : null)
    const [fechaDesde, setFechaDesde] = useState(dataConvenio && dataConvenio.fechaDesde ? `${dataConvenio.fechaDesde.split('/')[2]}-${dataConvenio.fechaDesde.split('/')[1]}-${dataConvenio.fechaDesde.split('/')[0]}` : null)
    const [fechaHasta, setFechaHasta] = useState(dataConvenio && dataConvenio.fechaHasta ? `${dataConvenio.fechaHasta.split('/')[2]}-${dataConvenio.fechaHasta.split('/')[1]}-${dataConvenio.fechaHasta.split('/')[0]}` : null)
    const [text, setText] = React.useState([
        { titulo: 'Valor del km Zona 1 *', nombre: 'valorZona1', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona1 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona1 : null, helperText: 'Hasta 12 km' },
        { titulo: 'Valor del km Zona 2 *', nombre: 'valorZona2', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona2 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona2 : null, helperText: 'Desde km 13 hasta km 24' },
        { titulo: 'Valor del km Zona 3 *', nombre: 'valorZona3', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona3 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona3 : null, helperText: 'Desde km 25 hasta km 36' },
        { titulo: 'Valor del km Zona 4 *', nombre: 'valorZona4', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona4 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona4 : null, helperText: 'Desde km 37 hasta km 48' },
        { titulo: 'Valor del km Zona 5 *', nombre: 'valorZona5', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona5 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona5 : null, helperText: 'Desde km 49 hasta km 60' },
        { titulo: 'Valor del km Zona 6 *', nombre: 'valorZona6', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona6 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona6 : null, helperText: 'Desde km 61 hasta km 72' },
        { titulo: 'Valor del km Zona 7 *', nombre: 'valorZona7', value: dataConvenio && dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona7 ? dataConvenio.valorZonaKmConvenioTraslado.valorZona7 : null, helperText: 'Desde km 73 hasta km 84' },
    ])

    //provincias redux:
    const dispatch = useDispatch()
    const listadoProvincias = useSelector(state => state.listados.provincias)
    useEffect(() => {
        dispatch(actions.listarProvincias())
    }, [actualizarData])

    //Guardar Data:
    useEffect(() => {
        if (guardarData) {
            setDataConvenio({
                ...dataConvenio,
            })
            setOpenConfirmacion(true)
            setGuardarData(false)
        }
    }, [guardarData])

    //Validar campos y habilitar el botón de guardado:
    useEffect(() => {
        if (dataConvenio) {
            if (dataConvenio.idTipoDeValor === 1 && dataConvenio.tipoValor &&
                dataConvenio.idProvincia && dataConvenio.provincia && dataConvenio.valorZonaKmConvenioTraslado &&
                dataConvenio.valorZonaKmConvenioTraslado.valorZona && dataConvenio.fechaDesde && dataConvenio.fechaHasta) {
                setDisableButton(false);
            }
            else if (dataConvenio.idTipoDeValor === 2 && dataConvenio.tipoValor &&
                dataConvenio.idProvincia && dataConvenio.provincia &&
                dataConvenio.valorZonaKmConvenioTraslado && dataConvenio.valorZonaKmConvenioTraslado.valorZona1 &&
                dataConvenio.valorZonaKmConvenioTraslado.valorZona2 && dataConvenio.valorZonaKmConvenioTraslado.valorZona3 &&
                dataConvenio.valorZonaKmConvenioTraslado.valorZona4 && dataConvenio.valorZonaKmConvenioTraslado.valorZona5 &&
                dataConvenio.valorZonaKmConvenioTraslado.valorZona6 && dataConvenio.valorZonaKmConvenioTraslado.valorZona7 &&
                dataConvenio.valorZonaKmConvenioTraslado.valorKmExcedente && dataConvenio.fechaDesde && dataConvenio.fechaHasta) {
                setDisableButton(false)
            } else {
                setDisableButton(true)
            }
        } else {
            setDisableButton(true)
        }
    }, [dataConvenio])

    //onChanges:
    const handleChangeSelectProvincia = (event, descripcion) => {
        setIdProvincia(event.target.value)
        let a = descripcion.filter((item) => {
            if (item.codigo === event.target.value) {
                return (item.descripcion)
            }
        })
        setDataConvenio({
            ...dataConvenio,
            "provincia": a && a[0] && a[0].descripcion,
            "idProvincia": event.target.value,
        })
    }
    const onClickChip = (event, codigo) => {
        setDataConvenio({
            ...dataConvenio,
            "tipoValor": codigo === 1 ? 'Por KM fijo' : 'Por zonificación',
            "idTipoDeValor": codigo === 1 ? 1 : 2
        })
        setValChip([
            { descripcion: 'Por KM fijo', codigo: 1, verificado: codigo === 1 },
            { descripcion: 'Por zonificación', codigo: 2, verificado: codigo === 2 }
        ])
    }
    const changeTextKMFijo = (event) => {
        setValueKMFijo(event.target.value)
        setDataConvenio({
            ...dataConvenio,
            "valorZonaKmConvenioTraslado": {
                ...dataConvenio && dataConvenio.valorZonaKmConvenioTraslado,
                "valorZona": parseFloat(event.target.value)
            }
        })
    }
    const changeKmExcedente = (event) => {
        setValueKmExcedente(event.target.value)
        setDataConvenio({
            ...dataConvenio,
            "valorKmExcedenteString": `$${event.target.value}`,
            "valorZonaKmConvenioTraslado": {
                ...dataConvenio.valorZonaKmConvenioTraslado,
                "valorKmExcedente": parseFloat(event.target.value)
            }
        })
    }
    const changeFechaDesde = (event) => {
        let value = event.target.value.split('-');
        let fechaSave = `${value[2]}/${value[1]}/${value[0]}`
        setFechaDesde(event.target.value)
        setDataConvenio({
            ...dataConvenio,
            "fechaDesde": fechaSave,
            "vigenciaTabla": `${fechaSave} ${dataConvenio.fechaHasta ? dataConvenio.fechaHasta : '-'}`
        })
    }
    const changeFechaHasta = (event) => {
        let value = event.target.value.split('-');
        let fechaSave = `${value[2]}/${value[1]}/${value[0]}`
        setFechaHasta(event.target.value)
        setDataConvenio({
            ...dataConvenio,
            "fechaHasta": fechaSave,
            "vigenciaTabla": `${dataConvenio.fechaDesde ? dataConvenio.fechaDesde : '-'} ${fechaSave}`
        })
    }
    const changeText = (event, value) => {
        setText(data2 => {
            return data2.map((item) => {
                if (setDataConvenio) {
                    setDataConvenio({
                        ...dataConvenio,
                        "valorZonaKmConvenioTraslado": {
                            ...dataConvenio.valorZonaKmConvenioTraslado,
                            [value.nombre]: parseFloat(event.target.value),
                        },
                    })
                }
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        value: parseFloat(event.target.value),
                        titulo: value.titulo,
                        helperText: value.helperText,
                    }
                }
                else {
                    return item
                }
            })
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2} >
                <Grid item spacing={3} container xs={12} style={{ margin: '3px 0px' }}>
                    <Grid item xs={6} style={{ margin: '3px 0px' }}>
                        <Provincia
                            titulo={"Provincia *"}
                            fullWidth={true}
                            val={idProvincia}
                            seleccione={true}
                            handleChangeProvincia={(event) => handleChangeSelectProvincia(event, listadoProvincias)}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ margin: '3px 0px' }}>
                        <CustomInformacionProveedor
                            valChip={valChip}
                            item={6}
                            onClickChip={onClickChip} />
                    </Grid>
                </Grid>
                <Grid item spacing={3} container xs={12} style={{ margin: '3px 0px', paddingRight: '0px' }}>
                    {valChip && valChip.map((it) => (
                        it.codigo === 1 && it.verificado ?
                            <Grid container item xs={12} spacing={3} justify={"space-between"}>
                                <Grid xs={3}>
                                    <TextField
                                        label={'Valor km fijo *'}
                                        id='valorKM'
                                        name={'valorKM'}
                                        value={valueKMFijo}
                                        onChange={(event) => changeTextKMFijo(event)}
                                        fullwidth={true}
                                        width={'100%'}
                                        InputProps={{ inputComponent: NumberFormatCustom }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <TextField
                                        label={'Fecha desde *'}
                                        id='fecha_desde'
                                        name={'fechaDesde'}
                                        value={fechaDesde}
                                        onChange={(event) => changeFechaDesde(event)}
                                        fullwidth={true}
                                        width={'100%'}
                                        InputLabelProps={{ shrink: true }}
                                        type="date"
                                    />
                                </Grid>
                                <Grid xs={3}>
                                    <TextField
                                        label={'Fecha hasta *'}
                                        id='fechaHasta'
                                        name={'fechaHasta'}
                                        value={fechaHasta}
                                        onChange={(event) => changeFechaHasta(event)}
                                        fullwidth={true}
                                        width={'100%'}
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                            : it.codigo === 2 && it.verificado ?
                                <>
                                    {text ? text.map((text) => (
                                        <>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label={text && text.titulo}
                                                    value={text && text.value}
                                                    placeholder={text && text.placeholder}
                                                    onChange={(event) => changeText(event, text)}
                                                    id={text && text.nombre}
                                                    name={text && text.nombre}
                                                    fontSize={'12px'}
                                                    width={'100%'}
                                                    helperText={text && text.helperText}
                                                    fullwidth={true}
                                                    InputProps={{ inputComponent: NumberFormatCustom }}
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                        </>
                                    )) : null}
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Valor del km excedente *"
                                            value={valueKmExcedente}
                                            onChange={(event) => changeKmExcedente(event)}
                                            id="valorKmExcedente"
                                            name="valorKmExcedente"
                                            fontSize={'12px'}
                                            width={'100%'}
                                            fullwidth={true}
                                            InputProps={{ inputComponent: NumberFormatCustom }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label={'Fecha desde *'}
                                            id='fecha_desde'
                                            name={'fechaDesde'}
                                            value={fechaDesde}
                                            onChange={(event) => changeFechaDesde(event)}
                                            InputLabelProps={{ shrink: true }}
                                            type="date"
                                            width={'100%'}
                                            fullwidth={true}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label={'Fecha hasta *'}
                                            id='fechaHasta'
                                            name={'fechaHasta'}
                                            value={fechaHasta}
                                            onChange={(event) => changeFechaHasta(event)}
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            width={'100%'}
                                            fullwidth={true}
                                        />
                                    </Grid>
                                </>
                                : null
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default DrawerConvenio
