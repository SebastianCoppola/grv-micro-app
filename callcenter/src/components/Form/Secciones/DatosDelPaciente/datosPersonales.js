import React, { Fragment, useState, useEffect } from 'react'
//Utils
import Utils from '../../../../Utils/utils'
//Redux:
import * as actions from '../../../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
//Mui
import Grid from '@material-ui/core/Grid'
//Traslation:
//Componentes
import CustomText from '../../../commons/TextField/CustomText'
import CustomDatePicker from '../../../commons/DatePicker/CustomDatePicker'
import CustomTypography from '../../../commons/Typography/CustomTypography'
import EstadoCivil from '../../../Selects/EstadoCivil'
import Nacionalidad from '../../../Selects/Nacionalidad'
import Sexo from '../../../Selects/Sexo'
import HistoricoSiniestros from '../../../Form/Secciones/DatosDelPaciente/HistoricoDrawer/HistoricoSiniestros'

const DatosPersonales = (props) => {
    
    const { isEditar, denuncia, datosPersonalesCompleto, setDatosPersonalesCompleto, 
        tipoDoc, dniBuscador, setOpenBuscador, cleanDatosAccidentado } = props

    //Redux:
    const dispatch = useDispatch()
    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    //Form:
    const [valDNI, setValDNI] = useState(null)
    const [valApellido, setValApellido] = useState(null)
    const [valNombre, setValNombre] = useState(null)
    const [valSexo, setValSexo] = useState(null)
    const [valSexoDescripcion, setValSexoDescripcion] = useState(null)
    const [valFechaNacimiento, setValFechaNacimiento] = useState(null)
    const [valCuil, setValCuil] = useState(null)
    const [valCivil, setValCivil] = useState(null)
    const [valCivilDescripcion, setValCivilDescripcion] = useState(null)
    const [valNacionalidad, setValNacionalidad] = useState(null)
    const [valNacionalidadDescripcion, setValNacionalidadDescripcion] = useState(null)
    //Helpers:
    const [firstRender, setFirstRender] = useState(true)
    
    useEffect(()=>{
        setValDNI(
            datosPersonalesCompleto ? datosPersonalesCompleto.nroDoc  
            : denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc 
            : null
        )
        setValApellido(
            datosPersonalesCompleto ? datosPersonalesCompleto.apellido  
            : denuncia && denuncia.accidentado ? denuncia.accidentado.apellido 
            : null
        )
        setValNombre(
            datosPersonalesCompleto ? datosPersonalesCompleto.nombre 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.nombre 
            : null
        )
        setValSexo(
            datosPersonalesCompleto ? datosPersonalesCompleto.sexo 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.sexo 
            : null
        )
        setValSexoDescripcion(
            datosPersonalesCompleto ? (datosPersonalesCompleto.sexo === 'M' ? 'Masculino' : datosPersonalesCompleto.sexo === 'F' ? 'Femenino' : null) 
            : denuncia && denuncia.accidentado ? (denuncia.accidentado.sexo === 'M' ? 'Masculino' : denuncia.accidentado.sexo === 'F' ? 'Femenino' : null)
            : null
        )
        setValFechaNacimiento(
            datosPersonalesCompleto ? datosPersonalesCompleto.fechaNacimiento 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento   
            : null
        )
        setValCuil(
            datosPersonalesCompleto ? datosPersonalesCompleto.nroCuil 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil   
            : null
        )
        setValCivil(
            datosPersonalesCompleto ? datosPersonalesCompleto.estadoCivil 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil   
            : null
        )
        setValCivilDescripcion(
            datosPersonalesCompleto ? datosPersonalesCompleto.estadoCivilDescripcion 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilDescripcion   
            : null
        )
        setValNacionalidad(
            datosPersonalesCompleto ? datosPersonalesCompleto.nacionalidad 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo   
            : null
            )
        setValNacionalidadDescripcion(
            datosPersonalesCompleto ? datosPersonalesCompleto.nacionalidadDescripcion 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadNombre   
            : null
        )
        setFirstRender(false)
    },[])
    
    useEffect(()=>{
         if(denuncia == null && dniBuscador && dniBuscador.nroDoc ){
            setValDNI(dniBuscador.nroDoc)
          } 
    },[dniBuscador])

    useEffect(()=>{
        if(!firstRender || cleanDatosAccidentado){
            if (denuncia != null) {setValDNI(denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null)}
            setValApellido(denuncia && denuncia.accidentado ? denuncia.accidentado.apellido : '')
            setValNombre(denuncia && denuncia.accidentado ? denuncia.accidentado.nombre : '')
            setValSexo(denuncia && denuncia.accidentado ? denuncia.accidentado.sexo : null)
            setValSexoDescripcion(denuncia && denuncia.accidentado ? (denuncia.accidentado.sexo === 'M' ? 'Masculino' : denuncia.accidentado.sexo === 'F' ? 'Femenino' : null): null)
            setValFechaNacimiento(denuncia && denuncia.accidentado ? denuncia.accidentado.fechaNacimiento : null)
            setValCuil(denuncia && denuncia.accidentado ? denuncia.accidentado.nroCuil : '')
            setValCivil(denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilIdEstadoCivil : '')
            setValCivilDescripcion(denuncia && denuncia.accidentado ? denuncia.accidentado.estadoCivilDescripcion : null)
            setValNacionalidad(denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadCodigo : null)
            setValNacionalidadDescripcion(denuncia && denuncia.accidentado ? denuncia.accidentado.nacionalidadNombre : null)
        }
    },[denuncia, cleanDatosAccidentado])

    useEffect(() => {
        if (setDatosPersonalesCompleto) {
            setDatosPersonalesCompleto({
                nroDoc: valDNI ?? null,
                apellido: valApellido ?? null,
                nombre: valNombre ?? null,
                sexo: valSexo ?? null,
                sexoDescripcion: valSexoDescripcion ?? null,
                nroCuil: valCuil ?? null,
                fechaNacimiento: valFechaNacimiento ? (Utils.dateFormat2(valFechaNacimiento) === 'Invalid date' ? valFechaNacimiento : Utils.dateFormat2(valFechaNacimiento)) : null,
                estadoCivil: valCivil ?? null,
                estadoCivilDescripcion: valCivilDescripcion ?? null,
                nacionalidad: valNacionalidad ?? null,
                nacionalidadDescripcion: valNacionalidadDescripcion ?? null,
                tipoDocumento: tipoDoc ?? 1,
            })
        }
    }, [valDNI, valApellido, valNombre, valSexo, valSexoDescripcion, valFechaNacimiento, valCuil, valCivil, valCivilDescripcion, valNacionalidad, valNacionalidadDescripcion, tipoDoc])

    //Form Change:
    const handleChangeEstadoCivil = (e, data) => {
        if(e.target.value){
            setValCivil(e.target.value)
            setValCivilDescripcion(data.filter(it => it.codigo === e.target.value)[0].descripcion)
        }else{
            setValCivil(null)
            setValCivilDescripcion(null)
        }
    }
    const handleChangeSexo = (e) => {
        if(e.target.value){
            setValSexo(e.target.value)
            setValSexoDescripcion(e.target.value === 'M' ? 'Masculino' : 'Femenino')
        }else{
            setValSexo(null)
            setValSexoDescripcion(null)
        }
    }
    const handleChangeNacionalidad = (e, data) => {
        if(e.target.value){
            setValNacionalidad(e.target.value)
            setValNacionalidadDescripcion(data.filter(it => it.codigo === e.target.value)[0].descripcion)
        }else{
            setValNacionalidad(null)
            setValNacionalidadDescripcion(null)
        }
    }
    const onChangeDNI = (e) => {
        setValDNI(e.target.value)
    }

    //Calculo CUIL:
    useEffect(() => {
        if(valDNI && valDNI.length > 7 && valSexo){
            let req = { dni: valDNI, sexo: valSexo }
            let callback = (data) => { setValCuil(data) }
            dispatch(actions.calcularCuil(req, callback))
        }else{
            setValCuil('')
        }
    }, [valDNI, valSexo])

    return (
        <Fragment>
            {isEditar ?
                <Grid container spacing={2} alignItems={'end'}>
                    <Grid item xs={4}>
                        <CustomText
                            label={'DNI'}
                            id={'nroDoc'}
                            name={'dni'}
                            error ={Utils.validarCampos(camposRequeridos, 'nroDoc', valDNI) }
                            helperText={Utils.validarCampos(camposRequeridos, 'nroDoc', valDNI) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            onkeydown="return event.keyCode !== 69"
                            inputComponente={true}
                            pattern="^[0-9,$]*$"
                            onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                            value={valDNI}
                            onChange={onChangeDNI} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            label = {'Apellido'}
                            id = {'ape'}
                            error = {Utils.validarCampos(camposRequeridos, 'apellido', valApellido) }
                            helperText = {Utils.validarCampos(camposRequeridos, 'apellido', valApellido) ? 'Campo Requerido' : null}
                            shrink = {true}
                            fullwidth = {true}
                            value = {valApellido}
                            onChange = {e => setValApellido(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            label = {'Nombres'}
                            id = {'name'}
                            error = {Utils.validarCampos(camposRequeridos, 'nombre', valNombre) }
                            helperText = {Utils.validarCampos(camposRequeridos, 'nombre', valNombre) ? 'Campo Requerido' : null}
                            shrink = {true}
                            fullwidth = {true}
                            value = {valNombre}
                            onChange={e => setValNombre(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Sexo
                            name = {'sexo'}
                            valSexo = {valSexo}
                            error = {Utils.validarCampos(camposRequeridos, 'sexo', valSexo) }
                            helperTextSelect = {Utils.validarCampos(camposRequeridos, 'sexo', (valSexo)) ? 'Campo Requerido' : null}
                            handleChangeSelectSexo = {handleChangeSexo} 
                            colorHelper = {Utils.validarCampos(camposRequeridos, 'sexo', (valSexo)) ? 'red' : null} 
                        />
                    </Grid>
                    <Grid item xs={4} style={{marginTop:'5px'}}>
                        <CustomDatePicker
                            label = {'Fecha de Nacimiento'}
                            error = {Utils.validarCampos(camposRequeridos, 'fechaNacimiento', valFechaNacimiento) }
                            helperText = {Utils.validarCampos(camposRequeridos, 'fechaNacimiento', valFechaNacimiento) ? 'Campo Requerido' : null}
                            selectedDate = {valFechaNacimiento}
                            setSelectedDate = {setValFechaNacimiento}
                            shrink = {true}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4} style={{marginTop:'5px'}}>
                        <CustomText
                            label = {'Cuil'}
                            id = {'cuil'}
                            error = {Utils.validarCampos(camposRequeridos, 'nroCuil', valCuil) }
                            helperText= {Utils.validarCampos(camposRequeridos, 'nroCuil', valFechaNacimiento) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                            inputComponente={true}                
                            pattern="^[0-9,$]*$"
                            value={valCuil}
                            maxlenght = {11}
                            onChange={e => setValCuil(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <EstadoCivil
                            handleChangeSelectCivil={handleChangeEstadoCivil}
                            valCivil={valCivil}
                            error={Utils.validarCampos(camposRequeridos, 'estadoCivilIdEstadoCivil', valCivil ) }
                            helperTextSelect={Utils.validarCampos(camposRequeridos, 'estadoCivilIdEstadoCivil', valCivil) ? 'Campo Requerido' : null} 
                            colorHelper={Utils.validarCampos(camposRequeridos, 'estadoCivilIdEstadoCivil', valCivil) ? 'red' : null}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Nacionalidad
                            handleChangeSelectNac={handleChangeNacionalidad}
                            valNacionalidad={valNacionalidad}
                            error={Utils.validarCampos(camposRequeridos, 'nacionalidadCodigo', valNacionalidad) }
                            helperTextSelect={Utils.validarCampos(camposRequeridos, 'nacionalidadCodigo', valNacionalidad) ? 'Campo Requerido' : null}
                            colorHelper={Utils.validarCampos(camposRequeridos, 'nacionalidadCodigo', valNacionalidad) ? 'red' : null}
                        />
                    </Grid>
                </Grid>
                :
                <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        DNI:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valDNI && valDNI.length ? valDNI : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Nombre:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        { `${valNombre ?? ''} ${valApellido ?? ''}`.length > 1 ? `${valApellido} ${valNombre} `: '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Edad:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valFechaNacimiento ? Utils.calcularEdad(valFechaNacimiento) : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Sexo:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valSexoDescripcion ?? '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Cuil:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valCuil && valCuil.length > 0 ? valCuil : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Fecha Nac:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valFechaNacimiento ? Utils.dateFormat(valFechaNacimiento) : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Estado Civil:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valCivilDescripcion ?? '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomTypography 
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{color:'grey'}}>
                                        Nacionalidad:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {valNacionalidadDescripcion ?? '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'} 
                            style={{fontSize:13, marginRight:5}}  
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <HistoricoSiniestros 
                            dni={valDNI}
                            denuncia={denuncia}
                            setOpenBuscador={setOpenBuscador}                      
                        />
                    </Grid>
                </Grid>
            }
        </Fragment>
    )

}

export default DatosPersonales
