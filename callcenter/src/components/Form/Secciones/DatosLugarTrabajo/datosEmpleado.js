import React, { useState, useEffect } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Utils:
import Utils from '../../../../Utils/utils'
//Mui:
import { Grid } from '@material-ui/core'
//Componentes:
import CustomText from '../../../commons/TextField/CustomText'
import CustomDatePicker from '../../../commons/DatePicker/CustomDatePicker'
import CustomCheck from '../../../commons/CustomCheck/CustomChek'
import CustomTypography from '../../../commons/Typography/CustomTypography'
import Ocupacion from '../../../Autosuggest/ocupacion'
import Tarea from '../../../Autosuggest/tarea'
import ModalidadTrabajo from '../../../Selects/ModalidadTrabajo'

const DatosEmpleado = (props) => {

    const { isEditar, denuncia, setDatosEmpleadoCompleto, datosEmpleadoCompleto, cleanDatosAccidentado } = props

    const [firstRender, setFirstRender] = useState(true)
    
    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    
    //Ocupación:
    const [idOcupacion, setIdOcupacion] = useState(null)
    const [ocupacion, setOcupacion] = useState(null)
    const [dataOcupacion, setDataOcupacion] = useState(null)
    //Fecha de Ingreso:
    const [fechaIngreso, setFechaIngreso] = useState(null)
    //Franquero:
    const [franquero, setFranquero] = useState(false)
    //Teléfono Laboral:
    const [telefonoLaboral, setTelefonoLaboral] = useState(null)
    //Horario Laboral
    const [horarioLaboral, setHorarioLaboral] = useState(null)
    //Modalidad Trabajo
    const [modalidadTrabajo, setModalidadTrabajo] = useState(null)
    const [idModalidadTrabajo, setIdModalidadTrabajo] = useState(null)
    //Tarea Accidente:
    const [idTareaAccidente, setIdTareaAccidente] = useState(null)
    const [tareaAccidente, setTareaAccidente] = useState(null)
    const [dataTareaAccidente, setDataTareaAccidente] = useState(null)
    
    //Cargo el form apenas se reenderiza el componente:
    useEffect(() => {
        setIdOcupacion(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.idOcupacion
            : denuncia ? denuncia.ocupacionIdOcupacion
            : null
        )
        setOcupacion(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.ocupacion
            : denuncia ? denuncia.ocupacionDescripcion 
            : null
        )
        setFechaIngreso(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.fechaIngreso
            : denuncia && denuncia.fechaIngresoLaboral ? new Date(denuncia.fechaIngresoLaboral) 
            : null
        )
        setFranquero(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.franquero
            : denuncia ? denuncia.franquero 
            : false
        )
        setTelefonoLaboral(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.telefonoLaboral
            : denuncia ? denuncia.telefonoLaboral 
            : null
        )
        setHorarioLaboral(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.horarioLaboral
            : denuncia ? denuncia.horarioLaboral 
            : null
        )
        setIdModalidadTrabajo(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.idModalidadTrabajo
            : denuncia ? denuncia.idModalidadTrabajo 
            : null
        )
        setModalidadTrabajo(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.modalidadTrabajo
            : denuncia ? denuncia.descripcionModalidadTrabajo 
            : null
        )
        setIdTareaAccidente(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.idTareaAccidente
            : denuncia ? denuncia.tareaDuranteAccidenteIdOcupacion
            : null
        )
        setTareaAccidente(
            datosEmpleadoCompleto ? datosEmpleadoCompleto.tareaAccidente
            : denuncia ? denuncia.tareaDuranteAccidenteDescripcion
            : null
        )
        setFirstRender(false)
    }, [])

    //Cargo el form cuando cambia denuncia (save o buscador):
    useEffect(() => {
        if(!firstRender || cleanDatosAccidentado){
            setIdOcupacion(denuncia ? denuncia.ocupacionIdOcupacion : null)
            setOcupacion(denuncia ? denuncia.ocupacionDescripcion : null)
            setFechaIngreso(denuncia && denuncia.fechaIngresoLaboral ? new Date(denuncia.fechaIngresoLaboral) : null)
            setFranquero(denuncia ? denuncia.franquero : false)
            setTelefonoLaboral(denuncia ? denuncia.telefonoLaboral : '')
            setHorarioLaboral(denuncia ? denuncia.horarioLaboral : '')
            setModalidadTrabajo(denuncia ? denuncia.descripcionModalidadTrabajo : null)
            setIdModalidadTrabajo(denuncia ? denuncia.idModalidadTrabajo : null)
            setIdTareaAccidente(denuncia ? denuncia.tareaDuranteAccidenteIdOcupacion: null)
            setTareaAccidente(denuncia ? denuncia.tareaDuranteAccidenteDescripcion: null)    
        }
    }, [denuncia, cleanDatosAccidentado])

    //Cargo Request cuando cambian los values:
    useEffect(() => {
        if (setDatosEmpleadoCompleto) {
            setDatosEmpleadoCompleto({
                ocupacion: ocupacion && ocupacion.length ? ocupacion : null,
                idOcupacion: idOcupacion ? idOcupacion : null,
                fechaIngreso: fechaIngreso ? (Utils.dateFormat2(fechaIngreso) === 'Invalid date' ? fechaIngreso : Utils.dateFormat2(fechaIngreso)) : null,
                franquero: franquero,
                telefonoLaboral: telefonoLaboral && telefonoLaboral.length ? telefonoLaboral : null,
                horarioLaboral: horarioLaboral && horarioLaboral.length ? horarioLaboral : null,
                modalidadTrabajo: modalidadTrabajo && modalidadTrabajo.length ? modalidadTrabajo : null,
                idModalidadTrabajo: idModalidadTrabajo ? idModalidadTrabajo : null,
                tareaAccidente: tareaAccidente && tareaAccidente.length ? tareaAccidente : null,
                idTareaAccidente: idTareaAccidente ? idTareaAccidente : null,
            })
        }
    }, [ocupacion, idOcupacion, fechaIngreso, franquero, telefonoLaboral, horarioLaboral, modalidadTrabajo, tareaAccidente, idTareaAccidente])
   
    //On change Ocupación:
    const handleChangeOcupacion = (value) => {
        setOcupacion(value)
        if (value) setTareaAccidente(value)
        if (value && dataOcupacion && dataOcupacion.length){
            let temp1 = dataOcupacion.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdOcupacion(temp2)
            setIdTareaAccidente(temp2)
        }else{
            setIdOcupacion(null)
        }
    }
    
    //On change Tarea Accidente:
    const handleChangeTareaAccidente = (value) => {
        setTareaAccidente(value)
        if (value && dataTareaAccidente && dataTareaAccidente.length){
            let temp1 = dataTareaAccidente.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdTareaAccidente(temp2)
        }else{
            setIdTareaAccidente(null)
        }
    }

    //On change Modalidad Trabajo:
    const handleChangeModalidadTrabajo = (value, options) => {
        setIdModalidadTrabajo(value)
        if (value && options && options.length){
            let temp1 = options.filter(it => it.codigo === value)
            let temp2 = temp1 && temp1[0] && temp1[0].descripcion ? temp1[0].descripcion : null
            setModalidadTrabajo(temp2)
        }else{
            setModalidadTrabajo(null)
        }
    }

    return (
        <>
            {isEditar ?
                <Grid container spacing={2} alignItems='end'>
                    <Grid item xs={12}>
                        <Ocupacion
                            label={'Ocupación'}
                            valueOcupacion={ocupacion}
                            setValueOcupacion={handleChangeOcupacion}
                            denuncia={denuncia}
                            setDataOcupacion={setDataOcupacion}
                            error={Utils.validarCampos(camposRequeridos, 'ocupacionIdOcupacion', ocupacion)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomDatePicker
                            label={'Fecha de Ingreso'}
                            error={Utils.validarCampos(camposRequeridos, 'fechaIngresoLaboral', fechaIngreso)}
                            helperText={Utils.validarCampos(camposRequeridos, 'fechaIngresoLaboral', fechaIngreso) ? 'Campo Requerido' : null}
                            selectedDate={fechaIngreso}
                            setSelectedDate={e => setFechaIngreso(e)} 
                            shrink={true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomCheck
                            checked={franquero}
                            handleChange={e => setFranquero(e.target.checked)}
                            texto={'Franquero'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            label={'Teléfono Laboral'}
                            id={'telLaboral'}
                            error={Utils.validarCampos(camposRequeridos, 'telefonoLaboral', telefonoLaboral)}
                            helperText={Utils.validarCampos(camposRequeridos, 'telefonoLaboral', telefonoLaboral) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            value={telefonoLaboral}
                            onChange={e =>  setTelefonoLaboral(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            label={'Horario Laboral'}
                            value={horarioLaboral}
                            id='horarioLaboral'
                            error={Utils.validarCampos(camposRequeridos, 'horarioLaboral', horarioLaboral)}
                            helperText={Utils.validarCampos(camposRequeridos, 'horarioLaboral', horarioLaboral) ? 'Campo Requerido' : null}
                            onChange={e => setHorarioLaboral(e.target.value)}
                            fullwidth={true}
                            shrink={true}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <ModalidadTrabajo
                            valModalidadTrabajo={idModalidadTrabajo}
                            handleChangeSelectModalidadTrabajo={handleChangeModalidadTrabajo}
                            error={Utils.validarCampos(camposRequeridos, 'idModalidadTrabajo', modalidadTrabajo)}
                            helperTextSelect={Utils.validarCampos(camposRequeridos, 'idModalidadTrabajo', (modalidadTrabajo !== 0 ? modalidadTrabajo : null), true) ? 'Campo Requerido' : null}
                            colorHelper={Utils.validarCampos(camposRequeridos, 'idModalidadTrabajo', (modalidadTrabajo !== 0 ? modalidadTrabajo : null), true) ? 'red' : null}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Tarea
                            label={'Tarea durante el accidente'}
                            valueOcupacion={tareaAccidente}
                            setValueOcupacion={handleChangeTareaAccidente}
                            denuncia={denuncia}
                            tipeo={true}
                            setDataTareaAccidente={setDataTareaAccidente}
                            error={Utils.validarCampos(camposRequeridos, 'tareaDuranteAccidenteIdOcupacion', tareaAccidente)}
                        />
                    </Grid>
                </Grid>
            :
                <Grid container alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Ocupación:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {ocupacion && ocupacion.length ? ocupacion : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Tarea Durante el Accidente:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {tareaAccidente && tareaAccidente.length ? tareaAccidente : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Fecha de Ingreso:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {fechaIngreso ? Utils.dateFormat(fechaIngreso) : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Horario:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {horarioLaboral && horarioLaboral.length ? horarioLaboral : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13, marginRight:5}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{ color: 'grey' }}>
                                        Modalidad de Trabajo:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {modalidadTrabajo && modalidadTrabajo.length ? modalidadTrabajo : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13, marginRight:5}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomCheck
                            checked={franquero}
                            texto={'Franquero'}
                            disabled={true} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Teléfono Laboral:
                                    </div>
                                    <div style={{marginLeft:5}}>
                                        {telefonoLaboral && telefonoLaboral.length ? telefonoLaboral : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13, marginRight:5}}
                        />
                    </Grid>
                </Grid> 
            }
        </>
    )
}

export default DatosEmpleado