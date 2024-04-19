import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Mui:
import { Grid } from '@material-ui/core'
//Utils:
import Utils from '../../../../Utils/utils'
//Componentes
import CustomText from '../../../commons/TextField/CustomText'
import CustomCheck from '../../../commons/CustomCheck/CustomChek'
import CustomTypography from '../../../commons/Typography/CustomTypography'

const DatosContacto = (props) => {
    const { isEditar, denuncia, datosContactoCompleto, setDatosContactoCompleto, cleanDatosAccidentado } = props

    const [firstRender, setFirstRender] = useState(true)
    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    const [errorEmail, setErrorEmail] = useState(false)
    //Form:
    const [codPais, setCodPais] = useState(null)
    const [codArea, setCodArea] = useState(null)
    const [valueCel, setValueCel] = useState(null)
    const [whatsapp, setWhatsapp] = useState(false)
    const [telefono, setTelefono] = useState(null)
    const [otroTelefono, setOtroTelefono] = useState(null)
    const [valEmail, setValEmail] = useState(null)

    //Cargo el form apenas re reenderiza el componente:
    useEffect(() => {
        setCodPais(
            datosContactoCompleto ? datosContactoCompleto.codigoPaisCelular
                : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPaisCelular
                    : null
        )
        setCodArea(
            datosContactoCompleto ? datosContactoCompleto.codigoAreaCelular
                : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular
                    : null
        )
        setValueCel(
            datosContactoCompleto ? datosContactoCompleto.numeroCelular
                : denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular
                    : null
        )
        setWhatsapp(
            datosContactoCompleto ? datosContactoCompleto.whatsapp
                : denuncia && denuncia.accidentado ? denuncia.accidentado.whatsapp
                    : false
        )
        setTelefono(
            datosContactoCompleto ? datosContactoCompleto.telefono
                : denuncia && denuncia.accidentado ? denuncia.accidentado.telefono
                    : null
        )
        setOtroTelefono(
            datosContactoCompleto ? datosContactoCompleto.telefonoSecundario
                : denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario
                    : null
        )
        setValEmail(
            datosContactoCompleto ? datosContactoCompleto.email
                : denuncia && denuncia.accidentado ? denuncia.accidentado.email
                    : null
        )
        setFirstRender(false)
    }, [])

    //Cargo el form cuando cambia la denuncia (guardado o busqueda de dni):
    useEffect(() => {
        if (!firstRender || cleanDatosAccidentado) {
            setCodPais(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPaisCelular : '+54')
            setCodArea(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoAreaCelular : '')
            setValueCel(denuncia && denuncia.accidentado ? denuncia.accidentado.numeroCelular : '')
            setWhatsapp(denuncia && denuncia.accidentado ? denuncia.accidentado.whatsapp : false)
            setTelefono(denuncia && denuncia.accidentado ? denuncia.accidentado.telefono : '')
            setOtroTelefono(denuncia && denuncia.accidentado ? denuncia.accidentado.telefonoSecundario : '')
            setValEmail(denuncia && denuncia.accidentado ? denuncia.accidentado.email : '')
        }
    }, [denuncia, cleanDatosAccidentado])

    //Seteo la request cuando hago cambios: 
    useEffect(() => {
        if (setDatosContactoCompleto) {
            setDatosContactoCompleto({
                codigoPaisCelular: codPais ? codPais : '',
                codigoAreaCelular: codArea ? codArea : null,
                numeroCelular: valueCel ? valueCel : null,
                whatsapp: whatsapp,
                telefono: telefono ? telefono : null,
                telefonoSecundario: otroTelefono ? otroTelefono : null,
                email: valEmail ? valEmail : null,
            })
        }
    }, [valueCel, valEmail, telefono, otroTelefono, codPais, codArea, whatsapp])

    //Validar Email:
    const validarEmail = (event) => {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (reg.test(event.target.value) && regOficial.test(event.target.value)) {
            setErrorEmail(false)
        } else if (reg.test(event.target.value)) {
            setErrorEmail(false)
        } else {
            setErrorEmail(true)
        }
        setValEmail(event.target.value)
    }

    //Telefono Completo Solo Lectura: 
    const getTelefonoCompleto = () => {
        let val1 = codPais ? codPais : ''
        let val2 = codArea ? codArea : ''
        let val3 = valueCel ? valueCel : ''
        return `${val1} ${val2} - ${val3}`
    }

    return (
        <>
            {isEditar ?
                <Grid container spacing={4} alignItems={'end'}>
                    <Grid item xs={1}>
                        <CustomText
                            width='55px'
                            label={'Cód. País'}
                            value={codPais}
                            id={'celularPais'}
                            shrink={true}
                            onChange={e => setCodPais(e.target.value)}
                            error={Utils.validarCampos(camposRequeridos, 'numeroCelular', codPais)}
                            helperText={Utils.validarCampos(camposRequeridos, 'telefono', codPais) ? 'Campo Requerido - Cód. País ' : 'Cód. País '}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomText
                            fullwidth={true}
                            label={'Cód. Área'}
                            id={'codArea'}
                            shrink={true}
                            value={codArea}
                            error={Utils.validarCampos(camposRequeridos, 'numeroCelular', codArea)}
                            helperText={Utils.validarCampos(camposRequeridos, 'telefono', codArea) ? 'Campo Requerido - Cod. Área ' : 'Cod. Área '}
                            inputComponente={true}
                            pattern="^[0-9,$]*$"
                            onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                            onChange={e => setCodArea(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            fullwidth
                            label={'Celular'}
                            id={'celular'}
                            shrink={true}
                            error={Utils.validarCampos(camposRequeridos, 'numeroCelular', valueCel)}
                            helperText={Utils.validarCampos(camposRequeridos, 'numeroCelular', valueCel) ? 'Campo Requerido - Número sin 15' : 'Número sin 15'}
                            value={valueCel}
                            inputComponente={true}
                            pattern="^[0-9,$]*$"
                            onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                            onChange={e => setValueCel(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CustomCheck
                            checked={whatsapp}
                            handleChange={e => setWhatsapp(e.target.checked)}
                            texto={'Whatsapp'}
                            style={{ padding: 0 }}
                            disabled={!isEditar}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            fullwidth
                            label={'Teléfono'}
                            id={'tel'}
                            error={Utils.validarCampos(camposRequeridos, 'telefono', telefono)}
                            helperText={Utils.validarCampos(camposRequeridos, 'telefono', telefono) ? 'Campo Requerido - Cod. Área + Número' : 'Cod. Área + Número'}
                            shrink={true}
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomText
                            fullwidth
                            label={'Otro Teléfono'}
                            id={'otroTel'}
                            error={Utils.validarCampos(camposRequeridos, 'telefonoSecundario', otroTelefono)}
                            helperTextSelect={Utils.validarCampos(camposRequeridos, 'telefonoSecundario', otroTelefono) ? 'Campo Requerido - Cod. Área + Número' : 'Cod. Área + Número'}
                            shrink={true}
                            value={otroTelefono}
                            onChange={e => setOtroTelefono(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            type={'email'}
                            fullwidth
                            label={'email'}
                            id={'email'}
                            error={Utils.validarCampos(camposRequeridos, 'email', valEmail)}
                            helperText={Utils.validarCampos(camposRequeridos, 'email', valEmail) && errorEmail ? 'Campo Requerido- Complete segun formato: abc@abc.com' : errorEmail ? <div style={{ color: '#ff7052' }}>Complete segun formato: abc@abc.com</div> : null}
                            shrink={true}
                            value={valEmail}
                            onChange={validarEmail}
                        />
                    </Grid>
                </Grid>
                :
                <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={4}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <div style={{ color: 'grey' }}>
                                        Celular:
                                    </div>
                                    <div>
                                        {getTelefonoCompleto()}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{ fontSize: 13 }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <CustomCheck
                            checked={whatsapp}
                            texto={'Whatsapp'}
                            disabled={!isEditar}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <div style={{ color: 'grey' }}>
                                        Teléfono:
                                    </div>
                                    <div>
                                        {telefono && telefono.length ? telefono : ' - '}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{ fontSize: 13 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <div style={{ color: 'grey' }}>
                                        Otro Teléfono:
                                    </div>
                                    <div>
                                        {otroTelefono && otroTelefono.length ? otroTelefono : ' - '}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{ fontSize: 13 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex', gap: 5 }}>
                                    <div style={{ color: 'grey' }}>
                                        Email:
                                    </div>
                                    <div>
                                        {valEmail && valEmail.length ? valEmail : ' - '}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{ fontSize: 13 }}
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default DatosContacto