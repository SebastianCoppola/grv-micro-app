import React, { useEffect, useState } from 'react'
//Mui:
import { Grid } from '@material-ui/core/'
import WarningIcon from "@material-ui/icons/Warning"
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
//Components:
import CustomText from '../../../../commons/TextField/CustomText'
import Localidades from '../../../../commons/CustomAutosuggest/localidades'
import Loader from '../../../../commons/Loading/Loader'
//Redux:
import { useDispatch } from 'react-redux'
//Utils:
import Utils from '../../../../../Utils/utils'

const PersonaJuridica = (props) => {
    const { data, setData, item, textJuridica, setTextJuridica, text2Juridica, setText2Juridica, checkedSwitch,
        cuit, setCuit, errorCuit, setErrorCuit, mensajeErrorCuit, setMensajeErrorCuit, loadingValidarCuit,
        changeCuit, borrar, setBorrar, proveedor
    } = props
    const dispatch = useDispatch()
    const [localidad, setLocalidad] = useState(proveedor ? proveedor.localidad  : data && data.localidadProvincia!==null ? data.localidadProvincia : null)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    const [codPostal, setCodPostal] = useState(data ? data.codigoPostal : null)
    //const [dataCodigoPostal, setDataCodigoPostal] = useState('')
    //const [codigoIdCodigoPostal, setCodigoIdCodigoPostal] = useState(data ? data.codigoPostal : null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = useState(data ? data.idLocalidad : null)

    useEffect(() => {
        if (!data || data === null) {
            setLocalidad(data ? data.idLocalidad : null )
            setDataLocalidad(null)
            setCodPostal(data ? data.codPostalDescripcion : null)
            //setDataCodigoPostal('')
            //setCodigoIdCodigoPostal(data ? data.codigoPostal : null)
            setCodigoIdLocalidad(data ? data.idLocalidad : null)
        }
    }, [data, proveedor])
    const borrado = () => {
        setCuit('')
            setErrorCuit(false)
            setCodPostal(null)
            setLocalidad(null)
    }
    useEffect(()=>{
        if(borrar){
           borrado()
            setBorrar(false)
        }
    },[borrar])
    //maneja el estado de los custom text de la primera linea
    const changeText = (event, value) => {
        setTextJuridica(data2 => {
            return data2.map((item) => {
                if (setData) {
                    setData({
                        ...data,
                        [value.nombre]: event.target.value !=='' ? event.target.value : null,
                    })
                }
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        [value.nombre]: event.target.value,
                        titulo: value.titulo,
                        placeholder: value.placeholder,
                        item: value.item,
                        id:value.id
                    }
                }
                else {
                    return item
                }
            })
        })
    }

    const changeText2 = (event, value) => {
        setText2Juridica(data2 => {
            if (setData) {
                setData({
                    ...data,
                    [value.nombre]: event.target.value !=='' ? event.target.value : null,
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
                        id:value.id
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
        // else if (valueCampo) {
        //     setValueCampo(denuncia ? campoDenuncia : null)
        //     setIdCampo(denuncia ? idCampoDenuncia : null)
        // }
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
                localidadProvincia: localidad ? localidad: null,
            })
        }
    }, [localidad, codigoIdLocalidad])

    return (
        <Grid container alignItems='center' spacing={3}>
            <Grid item alignItems={'end'} container spacing={2}>
                <Grid item xs={4}>
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
                        error={errorCuit && cuit !==''}
                        helperText={errorCuit && cuit !=='' ? mensajeErrorCuit : null}
                        endAdornment={loadingValidarCuit ?
                            <Loader loading={loadingValidarCuit} />
                            : !errorCuit && cuit && cuit.length === 11 ?
                                <CheckCircleIcon htmlColor={"#2d9d78"} />
                                : errorCuit && cuit && cuit.length === 11 ?
                                    <WarningIcon htmlColor={"#e34850"} />
                                    : null}
                    />
                </Grid>

                {textJuridica ? textJuridica.map((text) => (
                    <Grid item xs={text && text.item}>
                        <CustomText
                            label={text && text.titulo}
                            value={text && text.value ===undefined ? text[text.nombre] : text.value  }
                            placeholder={text && text.placeholder}
                            onChange={(event) => changeText(event, text)}
                            id={text && text.nombre}
                            name={text && text.nombre}
                            fontSize={'12px'}
                            shrink={true}
                            width={'100%'}
                            fullwidth={true} 
                            error={Utils.validarCamposEditar(text && text.value ===undefined ? text[text.nombre] : text.value, text.id)}
                            helperText={Utils.validarCamposEditar(text && text.value ===undefined ? text[text.nombre] : text.value , text && text.id) ? 'Campo Requerido' : null}/>
                    </Grid>
                )) : null}

                <Grid item xs={8 - item}>
                    <Localidades
                        valueLocalidades={localidad}
                        setValueLocalidades={setLocalidad}
                        setDataLocalidad={setDataLocalidad}
                        sinProv={true}
                        denuncia={proveedor}
                        label={"Localidad *"}
                        disabledLocalidad={checkedSwitch}
                        error = {Utils.validarCamposEditar(localidad,1) }
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomText
                        disabled={checkedSwitch}
                        label={'Cod. Postal *'}
                        id={'codPostal'}
                        shrink={true}
                        fullwidth={true}
                        value={ codPostal === null ? '' : codPostal }
                        fontSize={'12px'}
                        width={'100%'}
                        onChange={(e) => onChangeCodPostal(e)}
                        error={Utils.validarCamposEditar(codPostal,1)}
                        helperText={Utils.validarCamposEditar(codPostal, 1) ? 'Campo Requerido' : null}
                    />
                    {/* QUEDA COMENTADO POR SI VUELVEN A PEDIR QUE SEA AUTOSUGGEST
                     <CodigoPostal
                        valueCodigoPostal={codPostal}
                        setValueCodigoPostal={setCodPostal}
                        setDataCodigoPostal={setDataCodigoPostal}
                        denuncia={data}
                        label={"Cod. Postal *"}
                        disabled={checkedSwitch} /> */}
                </Grid>

                {text2Juridica ? text2Juridica.map((text) => (
                    <Grid item xs={text && text.item}>
                        <CustomText
                            label={text && text.titulo}
                            value={text && text.value ===undefined ? text[text.nombre] : text.value  }
                            placeholder={text && text.placeholder}
                            onChange={(event) => changeText2(event, text)}
                            id={text && text.nombre}
                            name={text && text.nombre}
                            fontSize={'12px'}
                            type={text && text.type}
                            pattern={text && text.pattern}
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
    )
}
export default PersonaJuridica