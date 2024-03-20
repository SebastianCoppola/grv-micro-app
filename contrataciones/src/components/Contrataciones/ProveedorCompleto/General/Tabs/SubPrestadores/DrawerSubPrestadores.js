import React, { useEffect, useState } from 'react'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import CustomTypography from '../../../../../commons/Typography/CustomTypography'
import CustomText from '../../../../../commons/TextField/CustomText'
import CustomChip from '../../../../../commons/Chip/CustomChip'
import MapaSubPrestadores from './MapaSubPrestadores'
import Localidades from '../../../../../commons/CustomAutosuggest/localidades'
//Utils:
import Utils from '../../../../../../Utils/utils'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import { searchTipoSubprestadores } from '../../../../../../redux/actions/listados'

const DrawerSubPrestadores = props => {

    const { subPrestador, setSubPrestador, guardarData, setGuardarData, 
        setOpenConfirmacion, setDisableButton, modo } = props

    const dispatch = useDispatch()
    
    const dataTipoSubPrestador = useSelector(state => state.listados.tipoSubprestador)

    //Ubicación: 
    const [dataLocalidad, setDataLocalidad] = useState(null)
    const [coordenadas, setCoordenadas] = useState({})

    //Busco TIPOS SubPrestador
    useEffect(() => {
        dispatch(searchTipoSubprestadores())
    }, [])

    //Habilito GUARDAR
    useEffect(() => {
        let habilitarGuardar = subPrestador.nombre 
            && subPrestador.cuit && subPrestador.localidadProvincia 
            && subPrestador.idLocalidad && subPrestador.direccion
        setDisableButton(!habilitarGuardar)
    }, [subPrestador])

    //On Change TIPO SubPrestador:
    const onChangeTipoSubprestador = (codigo) => {
        setSubPrestador({
            ...subPrestador,
            idTipoSubprestador: codigo, 
            tipoSubPrestador: dataTipoSubPrestador && dataTipoSubPrestador.length > 0 
                && dataTipoSubPrestador.filter(i => i.codigo === codigo)[0].descripcion
        })
    }

    //On Change Localidad:
    const onChangeLocalidad = (value) => {
        setSubPrestador({
            ...subPrestador, 
            localidadProvincia: value ?? '',
            idLocalidad: value && dataLocalidad 
                ? dataLocalidad.filter(it => it.descripcion === value)[0].codigo
                : ''
        })
    }

    //Guardar Data: 
    useEffect(() => {
        if (guardarData) {
            setSubPrestador({
                ...subPrestador,
                latitudMaps: subPrestador.ubicacionValidada ? coordenadas.lat : null,
                longitudMaps: subPrestador.ubicacionValidada ? coordenadas.lng : null,
            })
            setOpenConfirmacion(true)
            setGuardarData(false)
        }
    }, [guardarData])

    //Convierte Dirección para Geolocalización:
    const transformarDireccion = () => {
        let newDireccion = subPrestador.direccion && subPrestador.direccion !== null ? subPrestador.direccion : '';
        let newLocalidad = subPrestador.localidadProvincia && subPrestador.localidadProvincia !== null ? `${subPrestador.localidadProvincia}, ` : '';
        let response = `${newDireccion}${newLocalidad} Argentina`
        return response
    }

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2} >
                <Grid item xs={9} style={{ margin: '3px 0px' }}>
                    <CustomText
                        label='Nombre *'
                        placeholder='Ingresar nombre'
                        shrink={true}
                        fullwidth={true}
                        value={subPrestador.nombre}
                        onChange={e=>setSubPrestador({...subPrestador, nombre: e.target.value})}
                        error={subPrestador.nombre ? false : true}
                    />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3} style={{ margin: '3px 0px' }}>
                    <CustomText
                        label='CUIT *'
                        placeholder='Ingresar cuit'
                        shrink={true}
                        fullwidth={true}
                        value={subPrestador.cuit}
                        onChange={e=>setSubPrestador({...subPrestador, cuit: e.target.value})}
                        disabled={modo === 'editar' ? true : false}
                        error={subPrestador.cuit ? false : true}
                    />
                </Grid>
                <Grid item xs={6} style={{ margin: '3px 0px' }}>
                    <Localidades
                        label='Localidad *'
                        valueLocalidades={subPrestador.localidadProvincia}
                        setValueLocalidades={value => onChangeLocalidad(value)}
                        setDataLocalidad={setDataLocalidad}
                        sinProv={true}
                        disabledLocalidad={subPrestador.ubicacionValidada}
                        denuncia={subPrestador}
                        error={subPrestador.localidadProvincia && subPrestador.idLocalidad ? false : true}
                    />
                </Grid>
                <Grid item xs={6} style={{ margin: '3px 0px' }}>
                    <CustomText
                        label='Dirección *'
                        placeholder='Ingresar dirección'
                        shrink={true}
                        fullwidth={true}
                        width={'100%'}
                        value={subPrestador.direccion}
                        onChange={e=>setSubPrestador({...subPrestador, direccion: e.target.value})}
                        disabled={subPrestador.ubicacionValidada}
                        error={subPrestador.direccion ? false : true}
                    />
                </Grid>
                <Grid item xs={3} style={{ margin: '3px 0px' }}>
                </Grid>
                <Grid item xs={12} style={{ margin: '10px 0px' }}>
                    <MapaSubPrestadores
                        setCheckedSwitch={value => setSubPrestador({...subPrestador, ubicacionValidada: value})}
                        checkedSwitch={subPrestador.ubicacionValidada}
                        adress={transformarDireccion()}
                        disableMapa={false}
                        coordenadas={coordenadas}
                        setCoordenadas={setCoordenadas}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomText
                        label='Teléfono'
                        shrink={true}
                        fullwidth={true}
                        value={subPrestador.telefono}
                        onChange={e=>setSubPrestador({...subPrestador, telefono: e.target.value})}
                    />
                </Grid>
                <Grid item xs={5}>
                    <CustomText
                        label='Mail'
                        type='email'
                        shrink={true}
                        fullwidth={true}
                        value={subPrestador.email}
                        onChange={e=>setSubPrestador({...subPrestador, email: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        text='Tipo'
                        fontweight={900}
                        style={{color:'#323232'}}
                        variant='body2'
                    />
                </Grid>
                {dataTipoSubPrestador && dataTipoSubPrestador.length && 
                    dataTipoSubPrestador.map((it, index) => {
                        if (it.codigo === 1 || it.codigo === 2) {
                            return (
                                <Grid item xs={2} style={index === 1 ? { marginLeft: '35px' } : null}>
                                    <CustomChip
                                        disabled={modo === 'editar' ? true : false}
                                        fontSize={true}
                                        label={Utils.capitalize(it.descripcion)}
                                        variant={'outlined'}
                                        onClick={() => onChangeTipoSubprestador(it.codigo)}
                                        style={ it.codigo === subPrestador.idTipoSubprestador 
                                            ? { border: '2px solid blue' } 
                                            : null
                                        }
                                    />
                                </Grid>
                            )
                        } else {
                            return null
                        }
                    })
                }
            </Grid>
        </Grid>
    )
}

export default DrawerSubPrestadores
