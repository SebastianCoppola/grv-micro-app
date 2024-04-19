import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { Grid } from '@material-ui/core/'
//Utils:
import Utils from '../../../Utils/utils'
//Components:
import CustomText from '../../commons/TextField/CustomText'
import Circunstancia from '../../Selects/Circunstancia'
import LugarAccidente from '../../Selects/LugarAccidente'
import Localidades from '../../Autosuggest/localidades'
import Calle from '../../Autosuggest/calle'
import CodigoPostal from '../../Autosuggest/codigoPostal'

const CompletarLugarAccidente = (props) => {
    const { denuncia, denuncia2, datosLugarAccidenteCompleto, setDatosLugarAccidenteCompleto, disableEdition, cleanDatosAccidentado } = props
    
    const dispatch = useDispatch()
    let codigoPostalCABA2 = useSelector(state => state.ubicacion.codigoPostalCABA)
    const campos = useSelector(state => state.documentos.camposRequeridos)
    const [firstRender, setFirstRender] = useState(true)

    //LugarAccidente:
    const [lugarAccidente, setLugarAccidente] = useState(0)
    //Localidad:
    const [idLocalidad, setIdLocalidad] = useState(null)
    const [localidad, setLocalidad] = useState(null)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    //Calle:
    const [idCalle, setIdCalle] = useState(null)
    const [calle, setCalle] = useState(null)
    const [dataCalle, setDataCalle] = useState(null)
    //NroCalle:
    const [nroCalle, setNroCalle] = useState(null)
    //CodPostal:
    const [idCodigoPostal, setIdCodigoPostal] = useState(null) 
    const [codigoPostal, setCodigoPostal] = useState(null)
    const [dataCodigoPostal, setDataCodigoPostal] = useState(null)
    //Circunstancia:
    const [circunstancia, setCircunstancia] = useState(0)
    //Provincia:
    const [provincia, setProvincia] = useState(null)
    const [dataProvincia, setDataProvincia] = useState(null)
        
    //Cargo states on render:
    useEffect(() => {
        //LugarAccidente:
        setLugarAccidente(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.lugardeAccidente
            : denuncia && denuncia.lugarAccidenteIdLugarAccidente ? denuncia.lugarAccidenteIdLugarAccidente 
            : denuncia2 && denuncia2.lugarAccidenteIdLugarAccidente ? denuncia2.lugarAccidenteIdLugarAccidente 
            : 0
        )
        //Localidad:
        setIdLocalidad( 
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereIdLocalidad
            : denuncia && denuncia.localidadItinereIdLocalidad ? denuncia.localidadItinereIdLocalidad 
            : denuncia2 && denuncia2.localidadItinereIdLocalidad ? denuncia2.localidadItinereIdLocalidad 
            : null
        )
        setLocalidad(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.localidadItinereLocalidadDescripcion
            : denuncia && denuncia.localidadItinereNombre ? denuncia.localidadItinereNombre 
            : denuncia2 && denuncia2.localidadItinereNombre ? denuncia2.localidadItinereNombre 
            : null
        )
        //Calle:
        setIdCalle(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleId 
            : denuncia && denuncia.idCalleOcurrenciaItinere ? denuncia.idCalleOcurrenciaItinere 
            : denuncia2 && denuncia2.idCalleOcurrenciaItinere ? denuncia2.idCalleOcurrenciaItinere 
            : null
        )
        setCalle(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.calleOcurrenciaItinere
            : denuncia && denuncia.calleOcurrenciaItinere ? denuncia.calleOcurrenciaItinere 
            : denuncia2 && denuncia2.calleOcurrenciaItinere ? denuncia2.calleOcurrenciaItinere
            : null
        )
        //NroCalle:
        setNroCalle(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.numeroOcurrenciaItinere
            : denuncia && denuncia.numeroOcurrenciaItinere ? denuncia.numeroOcurrenciaItinere 
            : denuncia2 && denuncia2.numeroOcurrenciaItinere ? denuncia2.numeroOcurrenciaItinere
            : null
        )
        //CodPostal:
        setIdCodigoPostal(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.codigoPostalItinereIdCodigoPostal
            : denuncia && denuncia.codigoPostalItinereIdCodigoPostal ? denuncia.codigoPostalItinereIdCodigoPostal
            : denuncia2 && denuncia2.codigoPostalItinereIdCodigoPostal ? denuncia2.codigoPostalItinereIdCodigoPostal 
            : null
        )
        setCodigoPostal(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.codigoPostalItinereCodigoPostalDescripcion 
            : denuncia && denuncia.codigoPostalItinereCodigo ? denuncia.codigoPostalItinereCodigo 
            : denuncia2 && denuncia2.codigoPostalItinereCodigo ? denuncia2.codigoPostalItinereCodigo 
            : null
        )
        //Circunstancia:
        setCircunstancia(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.circunstanciaItinereIdCircunstancia
            : denuncia && denuncia.circunstanciaItinereIdCircunstancia ? denuncia.circunstanciaItinereIdCircunstancia 
            : denuncia2 && denuncia2.circunstanciaItinereIdCircunstancia ? denuncia2.circunstanciaItinereIdCircunstancia 
            : 0
        )
        //Provincia:
        setProvincia(
            datosLugarAccidenteCompleto ? datosLugarAccidenteCompleto.provincia
            : denuncia && denuncia.localidadItinereProvinciaNombre ? denuncia.localidadItinereProvinciaNombre
            : denuncia2 && denuncia2.localidadItinereProvinciaNombre ? denuncia2.localidadItinereProvinciaNombre 
            : null
        )
        //FirstRender:
        setFirstRender(false)
    }, [])

    //Cargo States cuando cambia la denuncia (guardar o buscar DNI)
    useEffect(() => {
        if(!firstRender || cleanDatosAccidentado){
            setLugarAccidente(
                denuncia && denuncia.lugarAccidenteIdLugarAccidente ? denuncia.lugarAccidenteIdLugarAccidente 
                : denuncia2 && denuncia2.lugarAccidenteIdLugarAccidente ? denuncia2.lugarAccidenteIdLugarAccidente 
                : 0
            )
            //Localidad:
            setIdLocalidad( 
                denuncia && denuncia.localidadItinereIdLocalidad ? denuncia.localidadItinereIdLocalidad 
                : denuncia2 && denuncia2.localidadItinereIdLocalidad ? denuncia2.localidadItinereIdLocalidad 
                : null
            )
            setLocalidad(
                denuncia && denuncia.localidadItinereNombre ? denuncia.localidadItinereNombre 
                : denuncia2 && denuncia2.localidadItinereNombre ? denuncia2.localidadItinereNombre 
                : null
            )
            //Calle:
            setIdCalle(
                denuncia && denuncia.idCalleOcurrenciaItinere ? denuncia.idCalleOcurrenciaItinere 
                : denuncia2 && denuncia2.idCalleOcurrenciaItinere ? denuncia2.idCalleOcurrenciaItinere 
                : null
            )
            setCalle(
                denuncia && denuncia.calleOcurrenciaItinere ? denuncia.calleOcurrenciaItinere 
                : denuncia2 && denuncia2.calleOcurrenciaItinere ? denuncia2.calleOcurrenciaItinere
                : ''
            )
            //NroCalle:
            setNroCalle(
                denuncia && denuncia.numeroOcurrenciaItinere ? denuncia.numeroOcurrenciaItinere 
                : denuncia2 && denuncia2.numeroOcurrenciaItinere ? denuncia2.numeroOcurrenciaItinere
                : ''
            )
            //CodPostal:
            setIdCodigoPostal(
                denuncia && denuncia.codigoPostalItinereIdCodigoPostal ? denuncia.codigoPostalItinereIdCodigoPostal
                : denuncia2 && denuncia2.codigoPostalItinereIdCodigoPostal ? denuncia2.codigoPostalItinereIdCodigoPostal 
                : null
            )
            setCodigoPostal(
                denuncia && denuncia.codigoPostalItinereCodigo ? denuncia.codigoPostalItinereCodigo 
                : denuncia2 && denuncia2.codigoPostalItinereCodigo ? denuncia2.codigoPostalItinereCodigo 
                : null
            )
            //Circunstancia:
            setCircunstancia(
                denuncia && denuncia.circunstanciaItinereIdCircunstancia ? denuncia.circunstanciaItinereIdCircunstancia 
                : denuncia2 && denuncia2.circunstanciaItinereIdCircunstancia ? denuncia2.circunstanciaItinereIdCircunstancia 
                : null
            )
            //Provincia:
            setProvincia(
                denuncia && denuncia.localidadItinereProvinciaNombre ? denuncia.localidadItinereProvinciaNombre
                : denuncia2 && denuncia2.localidadItinereProvinciaNombre ? denuncia2.localidadItinereProvinciaNombre 
                : null
            )
        }
    }, [denuncia, denuncia2, cleanDatosAccidentado])

    //Lee los cambios en los estados y los setea en datosAccidenteCompleto:
    useEffect(() => {
        if (setDatosLugarAccidenteCompleto) {
            setDatosLugarAccidenteCompleto({
                lugardeAccidente : lugarAccidente ? lugarAccidente : 0,
                localidadItinereIdLocalidad: idLocalidad ? idLocalidad : null,
                localidadItinereLocalidadDescripcion: localidad ? localidad : null,
                calleId: idLocalidad === 1555 && idCalle ? idCalle : null, 
                calleOcurrenciaItinere: calle ? calle : null,
                numeroOcurrenciaItinere: nroCalle ? nroCalle : null,
                codigoPostalItinereIdCodigoPostal:  idCodigoPostal ? idCodigoPostal : null,
                codigoPostalItinereCodigoPostalDescripcion: codigoPostal ? codigoPostal : null,
                circunstanciaItinereIdCircunstancia: circunstancia ? circunstancia : 0,
            })
        }
    }, [lugarAccidente, 
        idLocalidad, localidad,
        idCalle, calle,
        nroCalle, 
        idCodigoPostal, codigoPostal,
        circunstancia, 
        provincia]
    )

    //On Change Localidad:
    const handleChangeLocalidad = (value) => {
        setLocalidad(value)
        if(value && dataLocalidad && dataLocalidad.length){
            let temp1 = dataLocalidad && dataLocalidad.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdLocalidad(temp2)
        }else{
            setIdLocalidad(null)
        }
    }

    //On Change Calle:
    const handleChangeCalle = (value) => {
        setCalle(value)
        if(value && dataCalle && dataCalle.length){
            let temp1 = dataCalle && dataCalle.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdCalle(temp2)
        }else{
            setIdCalle(null)
        }
    }
    
    //On Change Codigo Postal:
    const handleChangeCodigoPostal = (value) => {
        setCodigoPostal(value)
        if(value && dataCodigoPostal && dataCodigoPostal.length){
            let temp1 = dataCodigoPostal && dataCodigoPostal.filter(it => it.descripcion === value)
            let temp2 = temp1 && temp1[0] && temp1[0].codigo ? temp1[0].codigo : null
            setIdCodigoPostal(temp2)
        }else{
            setIdCodigoPostal(null)
        }
    }

    //Codigo Postal CABA:
    useEffect(() => {
        if (idLocalidad && idLocalidad === 1555 && calle && nroCalle) {
            dispatch(actions.searchCodigoPostalCaba(calle, nroCalle))
        }
    }, [idLocalidad])
    
    //Codigo Postal CABA:
    useEffect(() => {
        if(codigoPostalCABA2) setDataCalle(codigoPostalCABA2)
    }, [codigoPostalCABA2])
              
    return (
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <LugarAccidente
                    valueLugarAccidente={lugarAccidente}
                    handleChangeLugarAccidente={e => setLugarAccidente(e.target.value)} 
                    error={Utils.validarCampos(campos, 'lugarAccidenteIdLugarAccidente', (lugarAccidente !==0 ? lugarAccidente : null)) }
                    helperTextSelect={Utils.validarCampos(campos, 'lugarAccidenteIdLugarAccidente', (lugarAccidente !==0 ? lugarAccidente : null)) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'lugarAccidenteIdLugarAccidente', (lugarAccidente !==0 ? lugarAccidente : null)) ? 'red' : null}
                    disableEdition={disableEdition}    
                />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <Localidades
                    error={Utils.validarCampos(campos, 'lugarAccidenteIdLugarAccidente', localidad) }
                    valueLocalidades={localidad}
                    setValueLocalidades={handleChangeLocalidad}
                    dataProvincia={dataProvincia}
                    denuncia={denuncia || denuncia2}
                    prov={provincia}
                    setDataLocalidad={setDataLocalidad}
                    disabledLocalidad={disableEdition}
                />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
                {localidad && idLocalidad && idLocalidad === 1555 ?
                    <Calle
                        valueCalle={calle}
                        setValueCalle={handleChangeCalle}
                        denuncia={denuncia}
                        setDataCalle={setDataCalle}
                        error={Utils.validarCampos(campos, 'idCalleOcurrenciaItinere', calle) }
                        disabledCalle={disableEdition}
                    />
                : 
                    <CustomText
                        maxCaracteres={50}
                        label={'Calle'}
                        value={calle}
                        id={'Calle'}
                        shrink={true}
                        onChange={e => setCalle(e.target.value)} 
                        error={Utils.validarCampos(campos, 'calleOcurrenciaItinere', calle) }
                        helperText={Utils.validarCampos(campos, 'calleOcurrenciaItinere', calle) ? 'Campo Requerido' : null}
                        disabled={disableEdition}
                    />
                }
            </Grid>
            <Grid item xs={3}>
                <CustomText
                    label={'Número'}
                    value={nroCalle}
                    id={'NumeroCalle'}
                    error={Utils.validarCampos(campos, 'numeroOcurrenciaItinere', nroCalle) }
                    helperText= {Utils.validarCampos(campos, 'numeroOcurrenciaItinere', nroCalle) ? 'Campo Requerido' : null}
                    shrink={true}
                    inputComponente={true}
                    pattern="^[0-9,$]*$"
                    onKey={e=> e.keyCode === 69 ? e.preventDefault() : null }
                    onChange={(e) => setNroCalle(e.target.value)} 
                    disabled={disableEdition}
                />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={6}>
                <CodigoPostal
                    valueCodigoPostal={codigoPostal}
                    setValueCodigoPostal={handleChangeCodigoPostal}
                    codigoPostalCABA2={codigoPostalCABA2}
                    setDataCodigoPostal={setDataCodigoPostal}
                    denuncia={denuncia || denuncia2}
                    error={Utils.validarCampos(campos, 'codigoPostalItinereIdCodigoPostal', codigoPostal)}
                    disabled={disableEdition}
                />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <Circunstancia
                    valCircunstacia={circunstancia}
                    handleChangeSelectCircunstacia={e => setCircunstancia(e.target.value)} 
                    error={Utils.validarCampos(campos, 'circunstanciaItinereIdCircunstancia', (circunstancia !==0 ? circunstancia : null)) }
                    helperTextSelect={Utils.validarCampos(campos, 'circunstanciaItinereIdCircunstancia', (circunstancia !==0 ? circunstancia : null)) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCampos(campos, 'circunstanciaItinereIdCircunstancia', (circunstancia !==0 ? circunstancia : null)) ? 'red' : null}    
                    disableEdition={disableEdition}
                />
            </Grid>
        </Grid>
    )
}

export default CompletarLugarAccidente
