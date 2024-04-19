import React, { useEffect, useState } from 'react'
//Mui:
import Grid from '@material-ui/core/Grid'
//Components:
import ContenedorMenuSiniestroCompleto from '../ContenedorMenu'
import CustomTab from '../../commons/Tab/tab'
import CompletarLugarAccidente from './completarLugarAccidente'

const LugarDelAccidente = (props) => {
    const { setMiniMenu, setNavegacion, setTituloNavegacionSiniestro, denuncia,
        guardarContenedor, setDataSiniestroCompleto, dataSiniestroCompleto, 
        setGuardarContenedor, usuarioActivo, esOperador, disableEdition, setOpenBuscador } = props
    
    const [open, setOpen] = useState(true)
    const [datosLugarAccidenteCompleto, setDatosLugarAccidenteCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosLugarAccidenteCompleto ? dataSiniestroCompleto.datosLugarAccidenteCompleto : null)

    const tabs = [
        {
            label:'Lugar accidente',
            component: <CompletarLugarAccidente
                            datosLugarAccidenteCompleto={datosLugarAccidenteCompleto}
                            setDatosLugarAccidenteCompleto={setDatosLugarAccidenteCompleto} 
                            denuncia={denuncia}
                            disableEdition={disableEdition}
                        />,
            view:true,
        },
    ]

    useEffect(() => {
        setMiniMenu(true)
        setNavegacion(true)
        setOpen(true)
        setTituloNavegacionSiniestro('Lugar del accidente')
    }, [])

    useEffect(() => {
        if (setDataSiniestroCompleto && datosLugarAccidenteCompleto) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                idAccidentado:denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
                datosLugarAccidenteCompleto: datosLugarAccidenteCompleto,
            }))
        }
    }, [datosLugarAccidenteCompleto])

    return (
        <div>
            <ContenedorMenuSiniestroCompleto
                dataSiniestroCompleto={dataSiniestroCompleto}
                setDataSiniestroCompleto={setDataSiniestroCompleto}
                openMenuSiniestros={open}
                setOpenMenuSiniestros={setOpen}
                guardarContenedorAhora={guardarContenedor}
                setGuardarContenedorAhora={setGuardarContenedor}
                esOperador={esOperador}
                denuncia={denuncia} 
                usuarioActivo={usuarioActivo}
                disableEdition={disableEdition}
                setOpenBuscador={setOpenBuscador}
            >
                <Grid container justify='center' alignItems='center' >
                    <CustomTab data={tabs} />
                </Grid>
            </ContenedorMenuSiniestroCompleto>
        </div>
    )

}

export default LugarDelAccidente
