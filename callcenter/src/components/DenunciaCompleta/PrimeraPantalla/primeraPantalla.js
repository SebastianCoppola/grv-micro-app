
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Router:
import { useHistory } from 'react-router'
//Utils:
import Utils from '../../../Utils/utils'
//Mui:
import { Grid, makeStyles } from '@material-ui/core/'
//Componentes:
import FormPrimeraPantalla from './formPrimeraPantalla'
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'
import IconSearch from '../../BuscadorFlotante/IconSearch'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
}))

const PrimeraPantalla = (props) => {

    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, denuncia,
        setGuardarContenedor, guardarContenedor, setDataSiniestroCompleto, dataSiniestroCompleto,
        usuarioActivo, esOperador, openBuscador, setOpenBuscador, disableEdition } = props

    const classes = useStyles(props)
    const history = useHistory()

    const [open, setOpen] = useState(true)
    const [denunciaBuscador, setDenunciaBuscador] = useState(denuncia ? denuncia : null)
    const [id, setId] = useState(null)
    
    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(true)
        setTituloNavegacionSiniestro(`Denuncia ${denuncia ? Utils.nroAsignadoProvisorio(denuncia) : ''}`)
    }, [denuncia])

    useEffect(() => {
        if (history?.location?.state?.redireccion) {
            setDataSiniestroCompleto({})
            history.push({ state: { redireccion: false } })
        }
    }, [history])

    return (
        <>
            <div className={classes.root}>

                {!openBuscador ?
                    <IconSearch open={openBuscador} historicoGrid={true} usuarioActivo={usuarioActivo}/>
                : null}

                <ContenedorMenuSiniestroCompleto
                    dataSiniestroCompleto={dataSiniestroCompleto}
                    setDataSiniestroCompleto={setDataSiniestroCompleto}
                    setGuardarContenedorAhora={setGuardarContenedor}
                    guardarContenedorAhora={guardarContenedor}
                    openMenuSiniestros={open} 
                    setOpenMenuSiniestros={setOpen} 
                    denuncia={denuncia}
                    usuarioActivo={usuarioActivo}
                    esOperador={esOperador}
                    noHeader={true}
                    disableEdition={disableEdition}
                    denunciaBuscador={denunciaBuscador}
                    setId={setId}
                    id={id}
                    setOpenBuscador={setOpenBuscador}
                >
                    <Grid container justify='center' spacing={'2'}>
                        <Grid item xs={11}>
                            <FormPrimeraPantalla
                                esOperador={esOperador}
                                usuarioActivo={usuarioActivo}
                                denuncia={denuncia}
                                setDataSiniestroCompleto={setDataSiniestroCompleto}
                                dataSiniestroCompleto={dataSiniestroCompleto}
                                openBuscador={openBuscador} 
                                setOpenBuscador={setOpenBuscador}
                                disableEdition={disableEdition}
                                setId={setId}
                            />
                        </Grid>
                    </Grid>
                </ContenedorMenuSiniestroCompleto>

            </div>
        </>
    )
}

PrimeraPantalla.propTypes = {
    setMiniMenu: PropTypes.any,
    setNavegacion: PropTypes.any,
    setTituloNavegacionSiniestro: PropTypes.any,
    denuncia: PropTypes.any,
    usuarioActivo: PropTypes.object
}

export default PrimeraPantalla


