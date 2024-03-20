import React, { useState, useEffect } from 'react'
//Mui:
import Grid from '@material-ui/core/Grid'
import WarningIcon from "@material-ui/icons/Warning"
//Components:
import CustomText from '../../../../commons/TextField/CustomText'
import Localidades from '../../../../commons/CustomAutosuggest/localidades'
import Loader from '../../../../commons/Loading/Loader'
//Redux:
import { useDispatch } from 'react-redux'
//Utils:
import Utils from '../../../../../Utils/utils'

const PersonaFisica = (props) => {
    const { data, setData, itemLoc, itemCod, text, setText, text2, setText2, checkedSwitch,
        borrar, setBorrar, changeCuit, cuit, setCuit, errorCuit, setErrorCuit,
        mensajeErrorCuit, setMensajeErrorCuit, loadingValidarCuit, proveedor } = props
    const dispatch = useDispatch()
    const [localidad, setLocalidad] = useState(proveedor ? proveedor.localidad :data && data.localidadProvincia!==null ? data.localidadProvincia  : null)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    const [codPostal, setCodPostal] = useState(data ? data.codigoPostal : null)
    //const [dataCodigoPostal, setDataCodigoPostal] = useState('')
    //const [codigoIdCodigoPostal, setCodigoIdCodigoPostal] = useState(data ? data.codigoPostal : null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = useState(data ? data.idLocalidad : null)
    const [errorDni, setErrorDni] = React.useState(false)
    const [mensajeErrorDni, setMensajeErrorDni] = React.useState(null)

    useEffect(() => {
        if (!data || data === null) {
            setLocalidad(data && data.localidadDescripcion ? data.localidadDescripcion :proveedor ? proveedor.localidad : null)
            setDataLocalidad(null)
            setCodPostal(data ? data.codPostalDescripcion : null)
            //setDataCodigoPostal('')
            //setCodigoIdCodigoPostal(data ? data.codigoPostal : null)
            setCodigoIdLocalidad(data ? data.idLocalidad : null)
            setErrorDni(false)
            setMensajeErrorDni(null)
        }
    }, [data, proveedor])
    const borrado = () => {
        setCuit('')
        setErrorCuit(false)
        setLocalidad(null)
        setCodPostal('')
    }
    useEffect(() => {
        if (borrar) {
            borrado()
            setBorrar(false)
        }
    }, [borrar])

    //maneja el estado de los custom text de la primera linea
    const changeText = (event, value) => {
        if (value.nombre === 'dni' && ((event.target.value).length < 8 || !(event.target.value).match(/^[0-9]+$/))) {
            setErrorDni(true)
            setMensajeErrorDni(DNI_FORMATO_INVALIDO)
        } else {
            setErrorDni(false)
            setMensajeErrorDni(null)
            value.dni = event.target.value
        }
        setText(data2 => {
            return data2.map((item) => {
                if (setData) {
                    setData({
                        ...data,
                        [value.nombre]: event.target.value !== '' ? event.target.value : null,
                    })
                }
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        [value.nombre]: event.target.value,
                        titulo: value.titulo,
                        placeholder: value.placeholder,
                        item: value.item,

                    }

                }
                else {
                    return item
                }

            })

        })
    }

    const changeText2 = (event, value) => {
        setText2(data2 => {
            if (setData) {
                setData({
                    ...data,
                    [value.nombre]: event.target.value !== '' ? event.target.value : null,
                })
            }
            return data2.map((item) => {
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        [value.nombre]: event.target.value,
                        titulo: value.titulo,
                        placeholder: value.placeholder,
                        item: value.item,
                        type: value.type,
                        pattern: value.pattern,
                    }
                }
                else {
                    return item
                }
            })
        })
    }

    const serchIdAutocompletar = (valueCampo, dataCampo, setIdCampo, idCampo, setValueCampo, campoDenuncia, idCampoDenuncia) => {
        if (valueCampo && (dataCampo !== null)) {
            let id = dataCampo && dataCampo.filter(it => it.descripcion === valueCampo)
            setIdCampo(id && id[0] ? id[0].codigo : idCampo)
        }
    }
    //BUSQUEDA ID AUTOCOMPLETAR
    //QUEDA COMENTADO POR SI VUELVEN A PEDIR QUE EL COD POSTAL SEA AUTOSUGGEST
    // useEffect(() => {
    //     serchIdAutocompletar(codPostal, dataCodigoPostal, setCodigoIdCodigoPostal, codigoIdCodigoPostal, setCodPostal)
    //     if (codigoIdCodigoPostal) {
    //         setData({
    //             ...data,
    //             codigoPostal: codPostal && codigoIdCodigoPostal ? codigoIdCodigoPostal : null,
    //             codPostalDescripcion: codPostal
    //         })
    //     }
    // }, [codigoIdCodigoPostal, codPostal])

    const onChangeCodPostal = (e) => {
        setCodPostal(e.target.value)
        setData({
            ...data,
            "codigoPostal": e.target.value !== '' ? e.target.value : null
        })
    }
    //BUSQUEDA ID AUTOCOMPLETAR
    useEffect(() => {
        serchIdAutocompletar(localidad, dataLocalidad, setCodigoIdLocalidad, codigoIdLocalidad, setLocalidad)
        if (codigoIdLocalidad) {
            const locProv = dataLocalidad && dataLocalidad
                .find(x => x.codigo !== null && codigoIdLocalidad !== null && x.codigo === codigoIdLocalidad)
            setData({
                ...data,
                idLocalidad: localidad && codigoIdLocalidad ? codigoIdLocalidad : null,
                idProvincia: locProv && locProv.idProvincia ? locProv.idProvincia : null,
                localidadProvincia: localidad ? localidad : null,
            })
        }
    }, [localidad, codigoIdLocalidad])

    return (
        <Grid container alignItems='center' spacing={3}>
            <Grid item alignItems={'end'} container spacing={2}>
                <Grid item xs={5}>
                    <CustomText
                        label={'CUIT *'}
                        value={cuit}
                        placeholder={'Ingresar cuit sin guiones'}
                        onChange={changeCuit}
                        id={'cuit'}
                        name={'cuit'}
                        fontSize={'12px'}
                        shrink={true}
                        width={'100%'}
                        fullwidth={true}
                        inputComponente={true}
                        maxCaracteres={11}
                        error={errorCuit && cuit !== ''}
                        helperText={errorCuit && cuit !== '' ? mensajeErrorCuit : null}
                        endAdornment={loadingValidarCuit ?
                            <Loader loading={loadingValidarCuit} />
                            : !errorCuit && cuit && cuit.length === 11 ?
                                <CheckCircleIcon htmlColor={"#2d9d78"} />
                                : errorCuit && cuit && cuit.length === 11 ?
                                    <WarningIcon htmlColor={"#e34850"} />
                                    : null}
                    />
                </Grid>
                {text ? text.map((text) => (
                    <>
                        {/* <Grid item xs={text && text.item}> */}
                        <Grid item xs={5}>
                            <CustomText
                                label={text && text.titulo}
                                value={text && text.value === undefined ? text[text.nombre] : text.value}
                                placeholder={text && text.placeholder}
                                onChange={(event) => changeText(event, text)}
                                id={text && text.nombre}
                                name={text && text.nombre}
                                fontSize={'12px'}
                                shrink={true}
                                width={'100%'}
                                //inputComponente={(text && text.nombre === 'dni') ? true :false}
                                maxCaracteres={text && text.nombre === 'dni' ? 8 : null}
                                error={text && text.nombre === 'dni' ? errorDni && text[text.nombre] !== '' : null}
                                helperText={text && text.nombre === 'dni' && errorDni && text[text.nombre] !== '' ? mensajeErrorDni : null}
                                fullwidth={true} />
                        </Grid>
                    </>
                )) : null}

                <Grid item xs={itemLoc}>
                    <Localidades
                        valueLocalidades={localidad}
                        setValueLocalidades={setLocalidad}
                        setDataLocalidad={setDataLocalidad}
                        sinProv={true}
                        denuncia={data || proveedor}
                        label={"Localidad *"}
                        disabledLocalidad={checkedSwitch} 
                        error = {Utils.validarCamposEditar(localidad,1) }/>
                </Grid>
                <Grid item xs={itemCod}>
                    <CustomText
                        disabled={checkedSwitch}
                        label={'Cod. Postal *'}
                        id={'codPostal'}
                        shrink={true}
                        fullwidth={true}
                        value={codPostal === null ? '' : codPostal}
                        fontSize={'12px'}
                        width={'100%'}
                        onChange={(e) => onChangeCodPostal(e)}
                        error={Utils.validarCamposEditar(codPostal,1)}
                        helperText={Utils.validarCamposEditar(codPostal, 1) ? 'Campo Requerido' : null}
                    />
                    {/* <CodigoPostal
                        valueCodigoPostal={codPostal}
                        setValueCodigoPostal={setCodPostal}
                        setDataCodigoPostal={setDataCodigoPostal}
                        denuncia={data}
                        label={"Cod. Postal *"}
                        disabled={checkedSwitch}
                    /> */}
                </Grid>

                <Grid item alignItems={'center'} container spacing={2}>
                    {text2 ? text2.map((text) => (
                        <Grid item xs={text && text.item}>
                            <CustomText
                                label={text && text.titulo}
                                value={text && text.value === undefined ? text[text.nombre] : text.value}
                                placeholder={text && text.placeholder}
                                onChange={(event) => changeText2(event, text)}
                                id={text && text.nombre}
                                name={text && text.nombre}
                                type={text && text.type}
                                pattern={text && text.pattern}
                                fontSize={'12px'}
                                shrink={true}
                                width={'100%'}
                                fullwidth={true}
                                disabled={checkedSwitch} 
                                error={Utils.validarCamposEditar( text && text.value ===undefined ? text[text.nombre] : text.value,  text.id)}
                                helperText={Utils.validarCamposEditar( text && text.value ===undefined ? text[text.nombre] : text.value, text.id) ? 'Campo Requerido' : null}/>
                        </Grid>
                    )) : null}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default PersonaFisica
