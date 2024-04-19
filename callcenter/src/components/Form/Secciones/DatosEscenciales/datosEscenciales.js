import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Mui:
import { Grid } from '@material-ui/core/'
//Utils:
import Utils from '../../../../Utils/utils'
//Componentes
import CustomText from '../../../commons/TextField/CustomText'
import CustomCheck from '../../../commons/CustomCheck/CustomChek'

const DatosEscenciales = (props) => {
    const { denuncia, setDatosEscencialesCompleto, dniBuscador, openBuscador, riesgoDeMuerte, cleanDatosAccidentado } = props
    
    const campos = useSelector(state => state.documentos.camposRequeridos)

    const [checkedWhatsapp, setCheckedWhatsapp] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.whatsapp :false)
    const [doc, setDoc] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null)
    const [tel, setTel] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : null)
    const [codPais, setCodPais] = useState(denuncia &&  denuncia.accidentado ? denuncia.accidentado.codigoPaisCelular : '+54')
    const [codArea, setCodArea] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular : null)
    const [cel, setCel] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular : null)
    const [apellido, setApellido ] = useState(denuncia && denuncia.accidentado ? denuncia.accidentado.apellido :null)
    const [nombre, setNombre ] = useState( denuncia && denuncia.accidentado ? denuncia.accidentado.nombre : null)

    useEffect(()=>{
        if(denuncia == null && dniBuscador && dniBuscador.nroDoc ){
            setDoc(dniBuscador.nroDoc)
        } 
    },[dniBuscador, openBuscador])
    
    useEffect(() => {
        setCheckedWhatsapp(denuncia && denuncia.accidentado ? denuncia.accidentado.whatsapp :false);
        if (denuncia != null ) {setDoc(denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null)}
        setTel(denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : '')
        setCodPais(denuncia &&  denuncia.accidentado ? denuncia.accidentado.codigoPaisCelular : '+54')
        setCodArea(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular : '')
        setCel(denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular : '')
        setApellido(denuncia && denuncia.accidentado ? denuncia.accidentado.apellido :'')
        setNombre(denuncia && denuncia.accidentado ? denuncia.accidentado.nombre : '')

    }, [denuncia, cleanDatosAccidentado])

    useEffect(()=>{ 
        if(setDatosEscencialesCompleto){
            setDatosEscencialesCompleto({
                whatsapp: checkedWhatsapp ? checkedWhatsapp : false,
                nroDoc: doc ? doc : null,
                telefono: tel ? tel : null,
                codigoPaisCelular: codPais ? codPais : null,
                codigoAreaCelular: codArea ? codArea : null,
                numeroCelular: cel ? cel : null,
                apellido: apellido ? apellido : null,
                nombre: nombre ? nombre : null
            })
         }
     },[checkedWhatsapp, doc, tel, codPais, codArea, cel, apellido, nombre ])

     const handleChangeWhastapp = (event) => {
        setCheckedWhatsapp(event.target.checked)
    }

    const onChangeCodArea = (event) => {
        setCodArea(event.target.value)
    }

    const onChangeCodPais = (e) => {
        setCodPais(e.target.value)
    }

    const onChangeCelular = (e) => {
        const reCel = /^[0-9\b]+$/
        if (e.target.value === '' || reCel.test(e.target.value)) {
            setCel(e.target.value)
        }
    }

    const onChangeDoc = (e) => {
        const reDoc = /^[0-9\b]+$/
        if (e.target.value === '' || reDoc.test(e.target.value)) {
            setDoc(e.target.value)
        }
    }

    const onChangeTel = (e) => {
        const reTel = /^[0-9\b]+$/
        if (e.target.value === '' || reTel.test(e.target.value)) {
            setTel(e.target.value)
        }
    }

    const onChangeApellido = (event) => {
        setApellido(event.target.value)
    }

    const onChangeNombre = (event) => {
        setNombre(event.target.value)
    }

    return (
        <Grid container spacing={4} alignItems={'end'}>
            <Grid item xs={4}>
                <CustomText
                    label={'DNI'}
                    id={'DNI'}
                    error ={Utils.validarCampos(campos, 'nroDoc', doc) }
                    helperText={Utils.validarCampos(campos, 'nroDoc', doc) ? 'Campo Requerido' : null}
                    placeholder={'999999'}
                    shrink={true}
                    fullwidth={true}
                    value={doc}
                    inputComponente={true}
                    pattern="^[0-9,$]*$"
                    onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                    onChange={(event) => onChangeDoc(event)} 
                />
            </Grid>
            <Grid item xs={4}>
                <CustomText
                    label = {'Apellido'}
                    id = {'ape'}
                    error = {Utils.validarCampos(campos, 'apellido', apellido) }
                    helperText = {Utils.validarCampos(campos, 'apellido', apellido) ? 'Campo Requerido' : null}
                    placeholder = {'Completar'}
                    value = {apellido}
                    shrink = {true}
                    fullwidth = {true} 
                    onChange = {onChangeApellido}
                />
            </Grid>
            <Grid item xs={4}>
                <CustomText
                    label = {'Nombres'}
                    id = {'name'}
                    error = {Utils.validarCampos(campos, 'nombre', nombre) }
                    helperText = {Utils.validarCampos(campos, 'nombre', nombre) ? 'Campo Requerido' : null}
                    value = {nombre}
                    placeholder = {'Completar'}
                    shrink = {true}
                    fullwidth = {true} 
                    onChange = {onChangeNombre}
                />
            </Grid>
            {!riesgoDeMuerte && <><Grid item xs={1}>
                <CustomText
                    width = '55px'
                    label = {'Cód. País'}
                    value = {codPais ? codPais : '+54'}
                    id = {'celularPais'}
                    shrink = {true}
                    helperText = {'Cód.Pais '}
                    onChange = {(event) => onChangeCodPais(event)} 
                />
            </Grid>
            <Grid item xs={3}>
                    <CustomText
                        fullwidth = {true}
                        label = {'Cód. Área'}
                        id = {'codArea'}
                        error = {Utils.validarCampos(campos, 'numeroCelular', codArea)}
                        helperText = {Utils.validarCampos(campos, 'telefono', codArea) ? 'Campo Requerido - Cod. Área ' : 'Cod. Área '}
                        shrink = {true}
                        value = {codArea}
                        inputComponente = {true}
                        pattern = "^[0-9,$]*$"
                        onKey = {e => e.keyCode === 69 ? e.preventDefault() : null}
                        onChange = {(event) => onChangeCodArea(event)} 
                        />
                </Grid>
                <Grid item xs={4}>
                    <CustomText
                        fullwidth
                        label={'Celular'}
                        id={'celular'}
                        error={Utils.validarCampos(campos, 'numeroCelular', cel)}
                        helperText={Utils.validarCampos(campos, 'numeroCelular', cel) ? 'Campo Requerido - Número sin 15' : 'Número sin 15'}
                        shrink={true}
                        value={cel}
                        inputComponente={true}
                        pattern="^[0-9,$]*$"
                        onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                        onChange={(event) => onChangeCelular(event)} />
                </Grid><Grid item xs={4}>
                    <CustomCheck
                        checked={checkedWhatsapp}
                        handleChange={handleChangeWhastapp}
                        texto={'Whatsapp'} />
                </Grid></>}
            <Grid item xs={4}>
                <CustomText
                    fullwidth
                    label = {'Teléfono'}
                    id = {'tel'}
                    error = {Utils.validarCampos(campos, 'telefono', tel) }
                    helperText= {Utils.validarCampos(campos, 'telefono', tel) ? 'Campo Requerido - Cod. Área + Número' : 'Cod. Área + Número'}
                    shrink={true}
                    inputComponente={true}
                    pattern="^[0-9,$]*$"
                    onChange={(event) => onChangeTel(event)}
                    value={tel} 
                />
            </Grid>
        </Grid>
    )
}

export default DatosEscenciales

