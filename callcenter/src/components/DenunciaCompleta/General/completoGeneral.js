import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { Grid } from '@material-ui/core/'
//Componentes
import Completar from './completar'
import CustomTab from '../../commons/Tab/tab'
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'


const CompletoGeneral = (props) => {

    const { denuncia, setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, activarAlarmas, setActivarAlarmas,
        usuarioActivo, esOperador, disableEdition, path, setOpenBuscador,
        activarCortoPunzante, setActivarCortoPunzante,
        setGuardarContenedor, guardarContenedor, 
        setDataSiniestroCompleto, dataSiniestroCompleto } = props

    const dispatch = useDispatch()

    const [open, setOpen] = useState(true)
    const [datosCompletarGeneral, setDatosCompletarGeneral] = useState(null)
    
    const tabs = [
        {
            label: 'Datos Medicos',
            component: <Completar
                dataSiniestroCompleto={dataSiniestroCompleto}
                setDatosCompletarGeneral={setDatosCompletarGeneral}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                guardarContenedor={guardarContenedor}
                activarCortoPunzante={activarCortoPunzante}
                setActivarCortoPunzante={setActivarCortoPunzante}
                denuncia={denuncia} activarAlarmas={activarAlarmas}
                setActivarAlarmas={setActivarAlarmas}
                disableEdition={disableEdition}
                usuarioActivo={usuarioActivo}
            />,
            view: true,
        },
    ]

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(true)
        setTituloNavegacionSiniestro('General')
    }, [])

    useEffect(() => {
        if (denuncia && denuncia.alarmas && denuncia.alarmas.length > 0) {
            dispatch(actions.searchCampanaNotificaciones())
        }
    }, [denuncia])

    useEffect(() => {
        if (setDataSiniestroCompleto && datosCompletarGeneral) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
                datosCompletarGeneral: datosCompletarGeneral
            }))
        }
    }, [datosCompletarGeneral])

    if (usuarioActivo && usuarioActivo.area === "AUDITORIA MEDICA") {
        return (
            <Grid container justify='center' spacing={2} >
                <CustomTab data={tabs} />
            </Grid>
        )
    } else {
        return (
            <ContenedorMenuSiniestroCompleto
                dataSiniestroCompleto={dataSiniestroCompleto}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                setGuardarContenedorAhora={setGuardarContenedor}
                guardarContenedorAhora={guardarContenedor}
                openMenuSiniestros={open} setOpenMenuSiniestros={setOpen} denuncia={denuncia}
                usuarioActivo={usuarioActivo}
                esOperador={esOperador}
                disableEdition={disableEdition}
                path={path}
                setOpenBuscador={setOpenBuscador}
            >
                <Grid container justify='center' spacing={2} >
                    <CustomTab data={tabs} />
                </Grid>
            </ContenedorMenuSiniestroCompleto>
        )
    }

}

CompletoGeneral.propTypes = {
    open2: PropTypes.any,
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any
}

export default CompletoGeneral