import React, { useEffect, useState } from 'react'
//Utils:
import Utils from '../../../../../../Utils/utils'
//Mui:
import { Grid } from '@material-ui/core'
//COMPONENTES
import CustomText from '../../../../../commons/TextField/CustomText'
import CustomChip from '../../../../../commons/Chip/CustomChip'
import CustomTypography from '../../../../../commons/Typography/CustomTypography'
import TipoContacto from '../../../../../Selects/TipoContacto'

const DrawerListadoContactos = props => {

    const { contacto, setContacto, dataVisibilidad, drawer } = props

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2} >
                <Grid item xs={8} style={{ margin: '3px 0px' }}>
                    <TipoContacto
                        disabled={drawer.isEditar}
                        tipoContacto={contacto.idTipoContacto}
                        handleChangeSelectTipoContacto={e => {
                            e.target.value === 4 ?
                                setContacto({
                                    ...contacto, 
                                    idTipoContacto: e.target.value,
                                    idTipoVisibilidad: 2
                                })
                            :
                                setContacto({
                                    ...contacto, 
                                    idTipoContacto: e.target.value,
                                    idTipoVisibilidad: null
                                })
                        }}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: '3px 0px' }}>
                    <CustomText
                        label={'Nombre *'}
                        id={'Nombre'}
                        shrink={true}
                        fullwidth={true}
                        width={'100%'}
                        value={contacto.nombre}
                        onChange={e => setContacto({...contacto, nombre: e.target.value})}
                        disabled={drawer.isEditar}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: '3px 0px' }}>
                    <CustomText
                        label={'Teléfono *'}
                        id={'Telefono'}
                        shrink={true}
                        fullwidth={true}
                        width={'100%'}
                        value={contacto.telefono}
                        onChange={e => setContacto({...contacto, telefono: e.target.value})}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: '3px 0px' }}>
                    <CustomText
                        type={'email'}
                        label={'Mail *'}
                        id='mail'
                        shrink={true}
                        fullwidth={true}
                        width={'100%'}
                        value={contacto.mail}
                        onChange={e => setContacto({...contacto, mail: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography
                        fontweight={900}
                        style={{ color: '#323232' }}
                        text={'Visibilidad *'}
                        variant={'body2'}
                    />
                </Grid>
                {dataVisibilidad && dataVisibilidad.length && dataVisibilidad.map((it, index) => {
                    return (
                        <Grid item xs={2} key={index} style={{marginRight: '10px' }}>
                            <CustomChip
                                fontSize={true}
                                label={Utils.capitalize(it.descripcion)}
                                variant={'outlined'}
                                disabled={drawer.isEditar || contacto.idTipoContacto === 4}
                                style={it?.codigo === contacto?.idTipoVisibilidad ? { border: '2px solid blue' } : null}
                                onClick={() => setContacto({...contacto, idTipoVisibilidad: it.codigo})}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default DrawerListadoContactos
