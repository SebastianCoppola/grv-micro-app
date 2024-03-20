import React, { useEffect, useState } from 'react'
//Redux:
import * as actions from '../../../redux/actions/index'
import { useDispatch, useSelector } from 'react-redux'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import CustomTypography from '../../commons/Typography/CustomTypography'
import Provincia from '../../commons/CustomAutosuggest/provincia'
import Localidades from '../../commons/CustomAutosuggest/localidades'
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import CustomLoading from '../../commons/Loading/CustomLoading'
import CustomAlert from '../../commons/CustomAlert/customAlert'
import Contacto from './contacto'

const AgendaContactos = () => {

    const dispatch = useDispatch()

    const [localidad, setLocalidad] = useState(null)
    const [provincia, setProvincia] = useState(null)
    const [checkedContacto, setCheckedContacto] = useState(contactos)
    const [dataLocalidad, setDataLocalidad] = useState(null)
    const [dataProvincia, setDataProvincia] = useState(null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = useState(null)
    const [operError, setOpenError] = useState(false)
    const [openErroBase, setOpenErrorBase] = useState(false)
    const [noChecked, setNoChecked] = useState(false)

    const dataContactos = useSelector(state => state.contactos.agendaContactos)
    const loadingContactos = useSelector(state => state.contactos.loadingContactos)

    const handleCheckedContacto = (event, codigo) => {
        setCheckedContacto(checkedContacto.map((i, index2) => {
            if (codigo === i.codigo) {
                return (
                    { ...i, verificado: !i.verificado }
                )
            } else {
                return { ...i }
            }
        }))
    }

    useEffect(() => {
        if (checkedContacto[0].verificado === false && checkedContacto[1].verificado === false
            && checkedContacto[2].verificado === false && checkedContacto[3].verificado === false) {
            setNoChecked(true)
        } else {
            setNoChecked(false)
        }
    }, [checkedContacto])

    useEffect(() => {
        if (localidad && (dataLocalidad !== null || dataLocalidad.length > 0)) {
            let idLoc = dataLocalidad && dataLocalidad.filter(it => it.descripcion === localidad)
            setCodigoIdLocalidad(idLoc && idLoc[0] && idLoc[0].codigo ? idLoc[0].codigo : codigoIdLocalidad)
        }
        if (codigoIdLocalidad && checkedContacto) {
            let request = {
                idLocalidad: codigoIdLocalidad,
                remises: checkedContacto && checkedContacto[3] ? checkedContacto[3].verificado : null,
                farmacias: checkedContacto && checkedContacto[1] ? checkedContacto[1].verificado : null,
                centrosMedicos: checkedContacto && checkedContacto[0] ? checkedContacto[0].verificado : null,
                ambulancias: checkedContacto && checkedContacto[2] ? checkedContacto[2].verificado : null
            }
            dispatch(actions.searchContactos(request, callback))

        }
    }, [provincia, localidad, checkedContacto, codigoIdLocalidad])

    const callback = (success, errorBase) => {
        if (!success) {
            setOpenError(true)
            setOpenErrorBase(errorBase)
        } else {
            setOpenError(false)
            setOpenErrorBase(false)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false)
        setOpenErrorBase(false)
    }

    return (
        <Grid container xs={12}>
            <Grid item container spacing={2} xs={6} alignItems='center' justify='flex-start'>
                <Grid item>
                    <CustomTypography text={'Filtros'} variant={'subtitle2'} fontweight={600} />
                </Grid>
                <Grid item xs={10}>
                    <Provincia
                        valueProvincia={provincia}
                        setValueProvincia={setProvincia}
                        setDataProvincia={setDataProvincia}
                    />
                </Grid>
                <Grid item xs={10}>
                    <Localidades
                        valueLocalidades={localidad}
                        setValueLocalidades={setLocalidad}
                        setDataLocalidad={setDataLocalidad}
                        dataProvincia={dataProvincia}
                        prov={provincia}
                    />
                </Grid>
                {checkedContacto && checkedContacto.map((it) => (
                    <Grid item xs={10}>
                        <CustomCheck
                            checked={it.verificado}
                            handleChange={(event) => handleCheckedContacto(event, it.codigo)}
                            texto={it.descripcion}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid item container spacing={3} xs={6} alignItems='center' justify='flex-start' style={{ maxHeight: '450px', overflowY: 'auto', marginTop: '10px', marginBottom: 'auto' }}>
                <CustomLoading loading={loadingContactos} />
                {operError ?
                    <CustomAlert
                        message={
                            openErroBase ?
                                'Le pedimos disculpas. Hubo un problema en el sistema. Por favor intente más tarde'
                                : noChecked ?
                                    'Debe seleccionar al menos una casilla'
                                    :
                                    'No se encontro ningún Centro Médico/ Farmacia/ Servicio de Ambulancias / Servicio Remises en la localidad seleccionada.'
                        }
                        onClose={handleClose}
                        variant={'outlined'}
                        severity='error'
                        open={operError}
                    />
                    :
                    dataContactos && dataContactos.map((contact, index) => (
                        <Grid item >
                            <Contacto component={'Contactos'} contact={contact} index={index} />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>

    )
}

export const contactos = [
    { descripcion: 'Centros médicos', codigo: 1, verificado: true },
    { descripcion: 'Farmacias', codigo: 2, verificado: false },
    { descripcion: 'Servicio Ambulancia', codigo: 3, verificado: true },
    { descripcion: 'Servicio Remises', codigo: 4, verificado: false }
]

export default AgendaContactos
