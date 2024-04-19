import React, { useState, useEffect } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Utils:
import Utils from '../../../../Utils/utils'
//Mui:
import { Grid } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons/'
//Componentes:
import CustomTypography from '../../../commons/Typography/CustomTypography'
import CustomButton from '../../../commons/Button/CustomButton'
import CustomText from '../../../commons/TextField/CustomText'
import Localidades from '../../../Autosuggest/localidades'
import TipoSede from '../../../Autosuggest/tipoSede'
import Sede from '../../../Autosuggest/sede'
import CodigoPostal from '../../../Autosuggest/codigoPostal'

const DatosSedeLaboral = (props) => {
    const { isEditar, denuncia, dataDenuncia, datosSedeLaboralCompleto, setDatosSedeLaboralCompleto } = props
    
    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    const [firstRender, setFirstRender] = useState(true)

    //OpenNuevaSede:
    const [openNuevaSede, setOpenNuevaSede] = useState(false)
    //TipoSede:
    const [idTipoSede, setIdTipoSede] = useState(null)
    const [tipoSede, setTipoSede] = useState(null)
    const [dataTipoSede, setDataTipoSede] = useState(null)
    //Sede:
    const [idSede, setIdSede] = useState(null) 
    const [sede, setSede] = useState(null)
    const [sedeSeleccionado, setSedeSeleccionado] = useState('')
    const [dataSede, setDataSede] = useState(null)
    //Calle:
    const [direccion, setDireccion] = useState(null)
    const [nroCalle, setNroCalle] = useState(null)
    //Localidad:
    const [idLocalidad, setIdLocalidad] = useState(null) 
    const [localidad, setLocalidad] = useState(null)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    //CodigoPostal: 
    const [idCodigoPostal, setIdCodigoPostal] = useState('')
    const [codPostal, setCodPostal] = useState('')
    const [dataCodigoPostal, setDataCodigoPostal] = useState(null)
    //Provincia:
    const [provincia, setProvincia] = useState(null)
    const [idProvincia, setIdProvincia] = useState(null)
   
    //Carga los estados cuando se reenderiza el componente:
    useEffect(() => {
        //TipoSede:
        setIdTipoSede(
            datosSedeLaboralCompleto ? (datosSedeLaboralCompleto.tipoSede ? datosSedeLaboralCompleto.tipoSede.idTipoSede : null)
            : denuncia && denuncia.tipoSede ? denuncia.tipoSede.idTipoSede 
            : null
        )
        setTipoSede(
            datosSedeLaboralCompleto ? (datosSedeLaboralCompleto.tipoSede ? datosSedeLaboralCompleto.tipoSede.tipoSede : null)
            : denuncia && denuncia.tipoSede ? denuncia.tipoSede.nombre 
            : null
        )
        //Sede:
        setIdSede(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idSede 
            : denuncia && denuncia.sede ? denuncia.sede.idSede 
            : null
        )
        setSede(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.sede 
            : denuncia && denuncia.sede ? denuncia.sede.nombre 
            : null
        )
        //Calle:
        setDireccion(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.direccion
            : denuncia && denuncia.sede ? denuncia.sede.direccion 
            : null
        )
        setNroCalle(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.nroCalle
            : denuncia && denuncia.sede ? denuncia.sede.nro 
            : null
        )
        //Localidad:
        setIdLocalidad(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idLocalidad
            : denuncia && denuncia.sede ? denuncia.sede.localidadesIdLocalidad 
            : null
        )
        setLocalidad(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.localidad 
            : denuncia && denuncia.sede ? denuncia.sede.localidadesNombre 
            : null
        )
        //CodigoPostal:
        setIdCodigoPostal(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idCodigoPostal
            : denuncia && denuncia.sede ? denuncia.sede.codigoPostalIdCodigoPostal
            : ''
        )
        setCodPostal(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.codigoPostal
            : denuncia && denuncia.sede ? denuncia.sede.codigoPostalCodigo 
            : ''
        )
        //Provincia:
        setProvincia(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.provincia
            : denuncia && denuncia.sede ? denuncia.sede.localidadesProvinciaNombre 
            : null
        )
        setIdProvincia(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.idProvincia
            : denuncia && denuncia.sede ? denuncia.sede.localidadesProvinciaIdProvincia 
            : null
        )
        //Nueva Sede
        setOpenNuevaSede(
            datosSedeLaboralCompleto ? datosSedeLaboralCompleto.openNuevaSede 
            : null    
        )
        //First Render:
        setFirstRender(false)
    }, [])

    //Modifica los estados al cambiar denuncia (luego del save o buscar x dni)
    useEffect(() => {
        if(!firstRender){
            setIdTipoSede(denuncia && denuncia.tipoSede ? denuncia.tipoSede.idTipoSede : null)
            setTipoSede(denuncia && denuncia.tipoSede ? denuncia.tipoSede.nombre : null)
            setIdSede(denuncia && denuncia.sede ? denuncia.sede.idSede : null)
            setSede(denuncia && denuncia.sede ? denuncia.sede.nombre : null)
            setDireccion(denuncia && denuncia.sede ? denuncia.sede.direccion : null)
            setNroCalle(denuncia && denuncia.sede ? denuncia.sede.nro : null)
            setIdLocalidad(denuncia && denuncia.sede ? denuncia.sede.localidadesIdLocalidad : null)
            setLocalidad(denuncia && denuncia.sede ? denuncia.sede.localidadesNombre : null)
            setIdCodigoPostal(denuncia && denuncia.sede ? denuncia.sede.codigoPostalIdCodigoPostal : '')
            setCodPostal(denuncia && denuncia.sede ? denuncia.sede.codigoPostalCodigo : '')
            setProvincia(denuncia && denuncia.sede ? denuncia.sede.localidadesProvinciaNombre : null)
            setIdProvincia(denuncia && denuncia.sede ? denuncia.sede.localidadesProvinciaIdProvincia : null)
            setOpenNuevaSede(false)
        }
    }, [denuncia])

    //Modifica datosSedeLaboralCompleto al cambiar los inputs:
    useEffect(() => {
        if (setDatosSedeLaboralCompleto) {
            setDatosSedeLaboralCompleto({
                'tipoSede': {'idTipoSede': idTipoSede, 'tipoSede': tipoSede },
                'sede': sede ? sede : null,
                'idSede': idSede ? idSede : null,
                'direccion': direccion? direccion : null,
                'nroCalle': nroCalle ? nroCalle : null,
                'localidad': localidad ? localidad : null,
                'idLocalidad': idLocalidad ? idLocalidad : null,
                'codigoPostal': codPostal ? codPostal : '',
                'idCodigoPostal': idCodigoPostal ? idCodigoPostal : '',
                'provincia': provincia ? provincia : null,
                'idProvincia': idProvincia ? idProvincia : null,
                'openNuevaSede': openNuevaSede 
            })
        }
    }, [idTipoSede, tipoSede,
        idSede, sede,
        openNuevaSede,
        direccion, nroCalle,
        idLocalidad, localidad,
        idCodigoPostal, codPostal,
        provincia, idProvincia,
        openNuevaSede
    ])        

    //On Change Tipo Sede
    const onChangeTipoSede = (value) => {
        setTipoSede(value)
        if (value && dataTipoSede && dataTipoSede.length) {
            let temp1 = dataTipoSede.filter(it => it.nombre === value)
            let temp2 = temp1 && temp1[0] && temp1[0].idTipoSede ? temp1[0].idTipoSede : null
            setIdTipoSede(temp2)
        }else{
            setIdTipoSede(null)
            //Reseteo los otros campos: 
            setSede(null)
            setIdSede(null)
            setDireccion(null)
            setNroCalle(null)
            setLocalidad(null)
            setIdLocalidad(null)
            setProvincia(null)
            setIdProvincia(null)
            setCodPostal(null)
            setIdCodigoPostal(null)
        }
    }

    //On Change Sede
    const onChangeSede = (value) => {
        setSede(value)
        if (value && dataSede && dataSede.length) {
            let temp1 = dataSede.filter(it => it.nombre === value)
            let temp2 = temp1 && temp1[0] && temp1[0].idSede ? temp1[0].idSede : null
            setIdSede(temp2)
            autocompletarDatosSede(temp2)
        }else{
            setIdSede(null)
            setDireccion(null)
            setNroCalle(null)
            setLocalidad(null)
            setIdLocalidad(null)
            setProvincia(null)
            setIdProvincia(null)
            setCodPostal(null)
            setIdCodigoPostal(null)
        }
    }
    
    //On Change Localidad
    const onChangeLocalidad = (value) => {
        setLocalidad(value)
        if (value && dataLocalidad && dataLocalidad.length) {
            let temp1 = dataLocalidad.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            let temp3 = temp1 && temp1[0] && temp1[0].idProvincia ? temp1[0].idProvincia : null
            setIdLocalidad(temp2)
            setIdProvincia(temp3)
            setProvincia(null)
        }else{
            setIdLocalidad(null)
            setIdProvincia(null)
            setProvincia(null)
        }
    }
    
    //On Change Codigo Postal:
    const onChangeCodigoPostal = (value) => {
        setCodPostal(value)
        if (value && dataCodigoPostal && dataCodigoPostal.length) {
            let temp1 = dataCodigoPostal.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdCodigoPostal(temp2)
        }else{
            setIdCodigoPostal(null)
        }
    }

    //On Change Dirección:
    const onChangeDireccion = (event) => {
        setDireccion(event.target.value)
    }

    //On Change Nro Calle:
    const onChangeNroCalle = (event) => {
        setNroCalle(event.target.value)
    }

    //On Change Sede:
    const onChangeNuevaSede = (event) => {
        setSede(event.target.value)
    }  

    //On Change Open Nueva Sede:
    const handleOpenNuevaSede = () => {
        setOpenNuevaSede(!openNuevaSede)
        // setIdTipoSede(null)
        // setTipoSede('')
        setIdSede(null)
        setSede('')
        setDireccion('')
        setNroCalle('')
        setIdCodigoPostal(null)
        setCodPostal('')
        setIdLocalidad(null)
        setLocalidad('')
    }

    //Autocompleta los datos cuando se elige una sede laboral:
    const autocompletarDatosSede = (idSede) => {
        if (idSede && dataSede && dataSede.length > 0) {
            let dire = dataSede && dataSede.filter(it => it.idSede === idSede)
            setIdLocalidad(dire && dire[0] ? dire[0].localidadesIdLocalidad : idLocalidad)
            setLocalidad(dire && dire[0] ? dire[0].localidadesNombre : localidad)
            setIdCodigoPostal(dire && dire[0] ? dire[0].codigoPostalIdCodigoPostal : idCodigoPostal)
            setCodPostal(dire && dire[0] ? dire[0].codigoPostalCodigo : codPostal)
            setDireccion(dire && dire[0] ? dire[0].direccion : direccion)
            setNroCalle(dire && dire[0] ? dire[0].nro : nroCalle)
        }
    }

    //Set Domicilio Solo Lectura:
    const setDomicilioLectura = () => {
        let existsCalle = direccion && direccion.length ? true : false
        let existsNro = nroCalle && nroCalle.length ? true : false
        let existsLocalidad = localidad && localidad.length ? true : false
        let existsCP = codPostal && codPostal.length ? true : false
        let existsProvincia = provincia && provincia.length ? true : false
        return existsCalle && existsNro && existsLocalidad && existsCP 
            ? `${direccion} ${nroCalle} - ${localidad} ${codPostal} ${existsProvincia ? '- ' + provincia : ''}`
            : ' - '
    }

    //Disable Campos:
    const disableCampos = () => {
        let existsTipoSede = tipoSede && tipoSede.length && idTipoSede ? true : false 
        let existsSede = sede && sede.length && idSede ? true : false 
        return openNuevaSede ? false : (existsSede && existsTipoSede ? false : true)
    }

    return (
        <>
            { isEditar ?
                <Grid container xs={12} spacing={2}>
                    <Grid item container justify='space-between' alignItems='center' >
                        <Grid item xs={4}>
                            <CustomTypography text={'Seleccione Tipo y Sede'} />
                        </Grid>
                        <Grid item>
                            <CustomButton
                                label={openNuevaSede ? 'Salir de crear nueva Sede' : 'Crear nueva Sede'}
                                startIcon={openNuevaSede ? <Remove htmlColor={'#747474'} /> : <Add htmlColor={'#747474'} /> }
                                variant={'outlined'}
                                onClik={handleOpenNuevaSede}
                                disabled={idSede !== null && idSede !== ''} 
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <TipoSede
                            valueTipoSede={tipoSede}
                            setValueTipoSede={onChangeTipoSede}
                            denuncia={denuncia ? denuncia : dataDenuncia}
                            dataDenuncia={dataDenuncia}
                            nuevaSede={openNuevaSede}
                            setSedeSeleccionado={setSedeSeleccionado}
                            setDataTipoSede={setDataTipoSede}
                            error={Utils.validarCampos(camposRequeridos, 'idTipoSede', tipoSede)}
                        />
                    </Grid>
                    { openNuevaSede ?
                        <Grid item xs={8}>
                            <CustomText
                                label={'Sede'}
                                id={'sedeLaboral'}
                                shrink={true}
                                fullwidth={true}
                                value={sede}
                                onChange={onChangeNuevaSede}
                                error={Utils.validarCampos(camposRequeridos, 'sede', sede)}
                                helperText={Utils.validarCampos(camposRequeridos, 'sede', sede) ? 'Campo Requerido' : null}
                            />
                        </Grid> 
                    :
                        <Grid item xs={8}>
                            <Sede
                                disabled={idTipoSede && idTipoSede !== null ? false : true}
                                tipoSedeID={idTipoSede}
                                setValueSede={onChangeSede}
                                valueSede={sede}
                                denuncia={denuncia}
                                dataDenuncia={dataDenuncia}
                                sedeSeleccionado={sedeSeleccionado}
                                setDataSede={setDataSede}
                                error={Utils.validarCampos(camposRequeridos, 'sede', sede)} 
                                // error={Utils.validarCampos(camposRequeridos, 'sede', sede, true)} 
                                // setCambioSede={setCambioSede}
                                // placeholder={denuncia && denuncia.sede && denuncia.sede.nombre ? denuncia.sede.nombre : null}
                            />
                        </Grid>
                    }
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            maxCaracteres={50}
                            label={'Calle'}
                            id={'calle'}
                            error={Utils.validarCampos(camposRequeridos, 'direccionSede', direccion)}
                            helperText={Utils.validarCampos(camposRequeridos, 'direccionSede', direccion) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            value={direccion}
                            onChange={onChangeDireccion}
                            disabled={disableCampos()}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomText
                            label={'Número'}
                            id={'nroCalle'}
                            error={Utils.validarCampos(camposRequeridos, 'numeroSede', nroCalle)}
                            helperText={Utils.validarCampos(camposRequeridos, 'numeroSede', nroCalle) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            inputComponente={true}
                            pattern="^[0-9,$]*$"
                            onKey={e => e.keyCode === 69 ? e.preventDefault() : null}
                            value={nroCalle !== null ? nroCalle : ''}
                            onChange={onChangeNroCalle}
                            disabled={disableCampos()}
                        />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <Localidades
                            valueLocalidades={localidad}
                            setValueLocalidades={onChangeLocalidad}
                            setDataLocalidad={setDataLocalidad}
                            denuncia={denuncia}
                            sede={dataSede}
                            error={Utils.validarCampos(camposRequeridos, 'provinciaSede', localidad)}
                            disabledLocalidad={disableCampos()}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CodigoPostal
                            valueCodigoPostal={codPostal}
                            setValueCodigoPostal={onChangeCodigoPostal}
                            denuncia={denuncia}
                            setDataCodigoPostal={setDataCodigoPostal}
                            sede={dataSede}
                            error={Utils.validarCampos(camposRequeridos, 'codPostalSede', codPostal)}
                            disabled={disableCampos()}
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
                                        Tipo Sede:
                                    </div>
                                    <div style={{marginLeft:'5px'}}>
                                        {tipoSede && tipoSede.length ? tipoSede : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:'13px', marginRight:'5px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Sede:
                                    </div>
                                    <div style={{marginLeft:'5px'}}>
                                        {sede && sede.length ? sede : '-'}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:'13px', marginRight:'5px'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            text={
                                <div style={{ display: 'flex' }}>
                                    <div style={{ color: 'grey' }}>
                                        Dirección:
                                    </div>
                                    <div style={{marginLeft:'5px'}}>
                                        {setDomicilioLectura()}
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:'13px', marginRight:'5px'}}
                        />
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default DatosSedeLaboral
