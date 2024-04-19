import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'
import CustomTab from '../../commons/Tab/tab'
import TablaObservaciones from './TablaObservaciones'
import TablaSeguimientos from './TablaSeguimientos'
import IconSearch from '../../BuscadorFlotante/IconSearch'


const Seguimiento = (props) => {

    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, denuncia, esOperador,
        idOperador, usuarioActivo, setDataSiniestroCompleto, dataSiniestroCompleto,
        setGuardarContenedor, guardarContenedor, openBuscador, setOpenBuscador, disableEdition } = props
    
    const [open, setOpen] = useState(true)

    const tabs = [
        {
            label: 'Observaciones',
            component: 
                <TablaObservaciones
                    esOperador={esOperador}
                    usuarioActivo={usuarioActivo}
                    idDenuncia={denuncia && denuncia.idDenuncia && denuncia.idDenuncia}
                    idOperador={idOperador && idOperador}
                    openBuscador={openBuscador} setOpenBuscador={setOpenBuscador}
                    disableEdition={disableEdition}
                />,
            view: true,
        },
        {
            label: 'Evoluciones',
            component: <TablaSeguimientos idDenuncia={denuncia && denuncia.idDenuncia && denuncia.idDenuncia} />,
            view: true
        },
    ]

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(false)
        setTituloNavegacionSiniestro('Seguimiento')
        if (setDataSiniestroCompleto) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
            }))
        }
    }, [])

    return (
        <div>
            {!openBuscador ? <IconSearch open={openBuscador} usuarioActivo={usuarioActivo}/> : null}

            <ContenedorMenuSiniestroCompleto
                openMenuSiniestros={open}
                setOpenMenuSiniestros={setOpen}
                denuncia={denuncia}
                usuarioActivo={usuarioActivo}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                dataSiniestroCompleto={dataSiniestroCompleto}
                setGuardarContenedorAhora={setGuardarContenedor}
                guardarContenedorAhora={guardarContenedor}
                esOperador={esOperador}
                disableEdition={disableEdition}
                setOpenBuscador={setOpenBuscador}
            >
                <Grid container justify='center' alignItems='center' style={{padding:'0 10px'}}>
                    <CustomTab data={tabs} justificado={true}/>
                </Grid>
            </ContenedorMenuSiniestroCompleto>
        </div>
    )
}

Seguimiento.propTypes = {
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    openMenuSiniestros: PropTypes.any,
    setOpenMenuSiniestros: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any,
    usuarioActivo: PropTypes.object
};

export default Seguimiento
