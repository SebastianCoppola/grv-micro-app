import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//Mui:
import { Grid } from '@material-ui/core/'
import PublicIcon from '@material-ui/icons/Public'
//Utils:
import Utils from '../../../../Utils/utils'
import Geocode from "react-geocode"
//Componentes
import CustomText from '../../../commons/TextField/CustomText'
import CustomCheck from '../../../commons/CustomCheck/CustomChek'
import CustomTypography from '../../../commons/Typography/CustomTypography'
import CustomButton from '../../../commons/Button/CustomButton'
import Localidades from '../../../Autosuggest/localidades'
import Calle from '../../../Autosuggest/calle'
import CodigoPostal from '../../../Autosuggest/codigoPostal'
import credentials from '../../../commons/Maps/ComponenteMapa/credentials'
import CustomMap from '../../../commons/Maps/ComponenteMapa/CustomMap';

const Domicilio = (props) => {
    
    const { isEditar, denuncia, datosDomicilioCompleto, setDatosDomicilioCompleto, cleanDatosAccidentado } = props
        
    const dispatch = useDispatch()
    const camposRequeridos = useSelector(state => state.documentos.camposRequeridos)
    const [firstRender, setFirstRender] = useState(true)
    
    //Localidad:   
    const [idLocalidad, setIdLocalidad] = useState(null)
    const [localidad, setLocalidad] = useState(null)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    //Provincia:
    const [provincia, setProvincia] = useState(null)
    //Cale:
    const [idCalle, setIdCalle] = useState(null)
    const [calle, setCalle] = useState(null)
    const [dataCalle, setDataCalle] = useState(null)
    //Numero:
    const [nroCalle, setNroCalle] = useState(null)
    //Piso:
    const [piso, setPiso] = useState(null)
    //Depto:
    const [depto, setDepto] = useState(null)
    //Ascensor:
    const [ascensor, setAscensor] = useState(false)
    //CondigoPosta:
    const [codPostal, setCodPostal] = useState(null)
    const [idCodPostal, setIdCodPostal] = useState(null)
    const [dataCodigoPostal, setDataCodigoPostal] = useState(null)
    const codigoPostalCABA2 = useSelector(state => state.ubicacion.codigoPostalCABA)
    //Aclaraciones:
    const [aclaraciones, setAclaraciones] = useState(null)
    //Geolocalización:
    const [showMapa, setShowMapa] = useState(false)
    const [ubicacionValidada, setUbicacionValidada] = useState(false)
    const [coordenadas, setCoordenadas] = useState({})
    Geocode.setApiKey(credentials.mapsKey)  

    useEffect(()=>{
        //Localidad:
        setIdLocalidad(
            datosDomicilioCompleto ? datosDomicilioCompleto.localidadIdLocalidad
            : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad 
            : null
        )
        setLocalidad(
            datosDomicilioCompleto ? datosDomicilioCompleto.localidadNombre
            : denuncia && denuncia.accidentado ? denuncia.accidentado.localidadNombre 
            : null
        )
        setProvincia(
            datosDomicilioCompleto ? datosDomicilioCompleto.localidadProvinciaNombre
            : denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaNombre ? denuncia.accidentado.localidadProvinciaNombre 
            : null
        )
        //Calle:
        setCalle(
            datosDomicilioCompleto ? datosDomicilioCompleto.calle 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.calle 
            : null
        )
        setIdCalle(
            datosDomicilioCompleto ? datosDomicilioCompleto.calleId 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle 
            : null
        )
        //Numero:
        setNroCalle(
            datosDomicilioCompleto ? datosDomicilioCompleto.numero
            : denuncia && denuncia.accidentado ? denuncia.accidentado.numero 
            : null
        )
        //Piso:
        setPiso(
            datosDomicilioCompleto ? datosDomicilioCompleto.piso 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.piso 
            : null
        )
        //Depto:
        setDepto(
            datosDomicilioCompleto ? datosDomicilioCompleto.depto
            : denuncia && denuncia.accidentado ? denuncia.accidentado.depto 
            : null
        )
        //Ascensor:
        setAscensor(
            datosDomicilioCompleto ? datosDomicilioCompleto.ascensor
            : denuncia && denuncia.accidentado ? denuncia.accidentado.ascensor
            : false
        )
        //CodigoPostal:
        setIdCodPostal(
            datosDomicilioCompleto ? datosDomicilioCompleto.codigoPostalIdCodigoPostal
            : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal 
            : null
        )
        setCodPostal(
            datosDomicilioCompleto ? datosDomicilioCompleto.codigoPostalCodigo 
            : denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalCodigo
            : null
        )
        //Aclaraciones:
        setAclaraciones(
            datosDomicilioCompleto ? datosDomicilioCompleto.aclaraciones
            : denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones
            : null
        )
        //Geolocalización:
        setUbicacionValidada(
            datosDomicilioCompleto ? datosDomicilioCompleto.ubicacionRegistrada
            : denuncia && denuncia.accidentado ? denuncia.accidentado.ubicacionRegistrada
            : false
        )
        setCoordenadas({
            lat: datosDomicilioCompleto ? datosDomicilioCompleto.latitud 
                : denuncia?.accidentado?.latitudMaps ? parseFloat(denuncia.accidentado.latitudMaps) 
                : null, 
            lng: datosDomicilioCompleto ? datosDomicilioCompleto.longitud 
                : denuncia?.accidentado?.longitudMaps ? parseFloat(denuncia.accidentado.longitudMaps) 
                : null, 
        })
        setFirstRender(false)
    },[])

    useEffect(() => {
        if(!firstRender || cleanDatosAccidentado){
            //Localidad:
            setIdLocalidad(denuncia && denuncia.accidentado ? denuncia.accidentado.localidadIdLocalidad : null)
            setLocalidad(denuncia && denuncia.accidentado ? denuncia.accidentado.localidadNombre : null)
            setProvincia(denuncia && denuncia.accidentado && denuncia.accidentado.localidadProvinciaNombre ? denuncia.accidentado.localidadProvinciaNombre : null)
            //Calle:
            setCalle(denuncia && denuncia.accidentado ? denuncia.accidentado.calle : '')
            setIdCalle(denuncia && denuncia.accidentado ? denuncia.accidentado.idCalleIdCalle : null)
            //Numero:
            setNroCalle(denuncia && denuncia.accidentado ? denuncia.accidentado.numero : '')
            //Piso:
            setPiso(denuncia && denuncia.accidentado ? denuncia.accidentado.piso : '')
            //Depto:
            setDepto(denuncia && denuncia.accidentado ? denuncia.accidentado.depto : '')
            //Ascensor:
            setAscensor(denuncia && denuncia.accidentado ? denuncia.accidentado.ascensor : false)
            //CodigoPostal:
            setIdCodPostal(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalIdCodigoPostal : null)
            setCodPostal(denuncia && denuncia.accidentado ? denuncia.accidentado.codigoPostalCodigo : null)
            //Aclaraciones:
            setAclaraciones(denuncia && denuncia.accidentado ? denuncia.accidentado.aclaraciones : '')
            //Geolocalización:
            setUbicacionValidada(denuncia && denuncia.accidentado ? denuncia.accidentado.ubicacionRegistrada : false)
            setCoordenadas({
                lat: denuncia && denuncia.accidentado ? parseFloat(denuncia.accidentado.latitudMaps) : null, 
                lng: denuncia && denuncia.accidentado ? parseFloat(denuncia.accidentado.longitudMaps) : null, 
            })
        }
    }, [denuncia, cleanDatosAccidentado])

    useEffect(() => {
        if (setDatosDomicilioCompleto) {
            setDatosDomicilioCompleto({
                localidadNombre: localidad && localidad.length ? localidad : null,
                localidadIdLocalidad: idLocalidad ? idLocalidad : null,
                calle: calle && calle.length ? calle : null,
                calleId: idCalle ? idCalle : null, 
                numero: nroCalle && nroCalle.length ? nroCalle : null, 
                piso: piso && piso.length ? piso : null,
                depto: depto && depto.length ? depto : null,
                ascensor: ascensor !== null ? ascensor : false,
                codigoPostalCodigo: codPostal && codPostal.length ? codPostal : null,
                codigoPostalIdCodigoPostal: idCodPostal ? idCodPostal : null,
                aclaraciones: aclaraciones && aclaraciones.length ? aclaraciones : null,
                latitud: coordenadas && coordenadas.lat ? coordenadas.lat : null,
                longitud: coordenadas && coordenadas.lng ? coordenadas.lng : null,
                ubicacionRegistrada: ubicacionValidada
            })
        }
    }, [localidad, idLocalidad, 
        idCodPostal, calle, 
        nroCalle, piso, depto, ascensor, 
        codPostal, idCalle,
        aclaraciones,
        ubicacionValidada, 
        coordenadas]
    )

    //Handle Change Localidad:
    const handleChangeLocalidad = (value) => {
        setLocalidad(value)
        if (value && dataLocalidad && dataLocalidad.length) {
            let temp1 = dataLocalidad.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1.length ? temp1[0].codigo : null
            setIdLocalidad(temp2)
        }else{
            setIdLocalidad(null)
        }
    }
    
    //On Change Codigo Postal:
    const handleChangeCodigoPostal = (value) => {
        setCodPostal(value)
        if (value && dataCodigoPostal && dataCodigoPostal.length) {
            let temp1 = dataCodigoPostal && dataCodigoPostal.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1.length ? temp1[0].codigo : null
            setIdCodPostal(temp2)
        }else{
            setIdCodPostal(null)
        }
    }

    //On Change Calle:
    const handleChangeCalle = (value) => {
        setCalle(value)
        if (idLocalidad === 1555 && value && dataCalle && dataCalle.length) {
            let temp1 = dataCalle.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1.length ? temp1[0].idCalle : null
            setIdCalle(temp2)
        }else{
            setIdCalle(null)
        }
    }

    //On Change Nro Calle:
    const handleChangeNroCalle = (value) => {
        setNroCalle(value)
    }

    //Cuando cambian localidad, calle, nroCalle o codPostal, calcula coordenadas:
    useEffect(()=>{
        if (!firstRender && !ubicacionValidada){
            calcularCoordenadasAccidentado(calle, nroCalle, codPostal, localidad)
        }
    },[localidad, calle, nroCalle, codPostal])

    //Calcula las coordenadas del domicilio del accidenatado:
    const calcularCoordenadasAccidentado = (calle, nroCalle, codPostal, localidad) => {
        if(calle && nroCalle && codPostal && localidad){
            let address = Utils.AdressAccidentado(calle, nroCalle, codPostal, localidad)
            if (address) {
                Geocode.fromAddress(address)
                    .then((res) => {
                        let { lat, lng } = res.results[0].geometry.location
                        setCoordenadas({lat: lat, lng: lng})
                    }, (err) => {
                        console.error(err)
                    })
            }
        }else{
            setCoordenadas({})
            setShowMapa(false)
        }
    }

    //AutoSearch CodigoPostal CABA: 
    useEffect(() => {
        if(!firstRender){
            if (idLocalidad === 1555 && calle && nroCalle) {
                dispatch(actions.searchCodigoPostalCaba(calle, nroCalle))
            }
        }
    }, [idLocalidad, calle, nroCalle])
    useEffect(() => {
        if(!firstRender){
            if (codigoPostalCABA2 && idLocalidad === 1555 && calle && nroCalle) {
                setCodPostal(codigoPostalCABA2.codigoPostal)
                setIdCodPostal(codigoPostalCABA2.codigoPostalId)
            }else{
                setCodPostal(null)
                setIdCodPostal(null)
            }
        }
    }, [codigoPostalCABA2])

    //Set Domicilio Solo Lectura:
    const setDomicilioLectura = () => {
        let existCalle = calle && calle.length ? true : false
        let existNro = nroCalle && nroCalle.length ? true : false
        let existLocalidad = localidad && localidad.length ? true : false
        let codPostalLetura = `${codPostal && codPostal.length ? codPostal : ''}`
        let pisoLectura = ` ${piso && piso.length ? piso : ''}`
        let deptoLectura = ` ${depto && depto.length ? depto : ''}`

        return existCalle && existNro && existLocalidad
            ? `${calle} ${nroCalle}${pisoLectura}${deptoLectura} - ${localidad} ${codPostalLetura}`
            : ' - '
    }

    //Disable Geolocalización ?
    const disableGeolocalizacion = () => {
        let lat = coordenadas && coordenadas.lat && coordenadas.lat != null
        let lng = coordenadas && coordenadas.lat && coordenadas.lng != null
        return lat && lng ? false : true
    }
       
    return (
        <>
            {isEditar ?
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Localidades
                            valueLocalidades={localidad}
                            setValueLocalidades={value => handleChangeLocalidad(value)}
                            setDataLocalidad={setDataLocalidad} 
                            denuncia={denuncia}
                            prov={provincia}
                            cambioProv={false}
                            dataProvincia={null}
                            error={Utils.validarCampos(camposRequeridos, 'localidadIdLocalidad', idLocalidad)}
                            disabledLocalidad={ubicacionValidada}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {idLocalidad === 1555 ?
                            <Calle
                                valueCalle={calle}
                                setValueCalle={value => handleChangeCalle(value)}
                                denuncia={denuncia}
                                setDataCalle={setDataCalle}
                                error={Utils.validarCampos(camposRequeridos, 'idCalleIdCalle', idCalle)}
                                disabledCalle={ubicacionValidada}
                            />
                        : 
                            <CustomText
                                maxCaracteres={60}
                                label={'Calle'}
                                id={'calle'}
                                fullwidth={true}
                                shrink={true}
                                value={calle}
                                onChange={e => handleChangeCalle(e.target.value)}
                                error={Utils.validarCampos(camposRequeridos, 'calle', calle)}
                                helperText={Utils.validarCampos(camposRequeridos, 'calle', calle) ? 'Campo Requerido' : null} 
                                disabled={ubicacionValidada}
                            />
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <CustomText
                            label={'Número'}
                            id={'nroCalle'}
                            error={Utils.validarCampos(camposRequeridos, 'numero', nroCalle)}
                            helperText={Utils.validarCampos(camposRequeridos, 'numero', nroCalle) ? 'Campo Requerido' : null}
                            shrink={true}
                            inputComponente={true}
                            pattern="^[0-9,$]*$"
                            onKey={ e => e.keyCode === 69 ? e.preventDefault() : null }
                            onChange={(e) => handleChangeNroCalle(e.target.value)}
                            value={nroCalle} 
                            disabled={ubicacionValidada}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CustomText
                            label={'Piso'}
                            id={'piso'}
                            error={Utils.validarCampos(camposRequeridos, 'piso', piso)}
                            helperText={Utils.validarCampos(camposRequeridos, 'piso', piso) ? 'Campo Requerido' : null}
                            shrink={true}
                            value={piso}
                            onChange={e => setPiso(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <CustomText
                            label={'Depto'}
                            id={'depto'}
                            error={Utils.validarCampos(camposRequeridos, 'depto', depto)}
                            helperText={Utils.validarCampos(camposRequeridos, 'depto', depto) ? 'Campo Requerido' : null}
                            shrink={true}
                            value={depto}
                            onChange={e => setDepto(e.target.value)} 
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomCheck
                            checked={ascensor}
                            handleChange={e => setAscensor(e.target.checked)}
                            texto={'Ascensor'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CodigoPostal
                            valueCodigoPostal={codPostal}
                            setValueCodigoPostal={value => handleChangeCodigoPostal(value)}
                            denuncia={denuncia}
                            error={Utils.validarCampos(camposRequeridos, 'codigoPostalIdCodigoPostal', codPostal)}
                            codigoPostalCABA2={codigoPostalCABA2}
                            setDataCodigoPostal={setDataCodigoPostal} 
                            disabled={ubicacionValidada}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <CustomText
                            label={'Aclaraciones'}
                            id={'aclaraciones'}
                            error={Utils.validarCampos(camposRequeridos, 'aclaraciones', aclaraciones)}
                            helperText={Utils.validarCampos(camposRequeridos, 'aclaraciones', aclaraciones) ? 'Campo Requerido' : null}
                            shrink={true}
                            fullwidth={true}
                            value={aclaraciones}
                            onChange={e => setAclaraciones(e.target.value)} 
                        />
                    </Grid>
                </Grid>
            :
                <Grid container alignItems='center' justify='space-between' spacing={2}>
                    <Grid item xs={5}>
                        <CustomTypography
                            text={
                                <div style={{display:'flex'}}>
                                    <div style={{color:'grey'}}>
                                        Dirección:
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        { setDomicilioLectura() }
                                    </div>
                                </div>
                            }
                            variant={'body1'}
                            style={{fontSize:13, marginRight:5}}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <CustomCheck
                            checked={ascensor}
                            texto={'Ascensor'}
                            disabled={!isEditar}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CustomButton
                            label={'Geolocalización'}
                            variant='outlined'
                            isAction={true}
                            disabled={disableGeolocalizacion()}
                            startIcon={<PublicIcon />}
                            onClik={() => setShowMapa(!showMapa)} 
                        />
                    </Grid>
                    {showMapa ?
                        <Grid item xs={9}>
                            <CustomMap
                                gridLat={7}
                                switchValidacion={true}
                                gridSwitch={4}
                                latLong={true}
                                coordenadas={coordenadas}
                                setCoordenadas={setCoordenadas}
                                checkedSwitch={ubicacionValidada}
                                setCheckedSwitch={setUbicacionValidada}
                            />
                        </Grid>
                    : null}
                </Grid>
            }
        </>
    )
}

export default Domicilio