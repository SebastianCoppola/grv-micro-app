import React, {useEffect, useState} from 'react'
//Utils:
import Utils from '../../../../Utils/utils'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import CustomDialogo from '../../../commons/Dialogo/CustomDialogo'
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
import BuscadorReingreso from './Buscador/BuscadorReingreso'
import ListaReingresoCompletar from './ListaReingresoCompletar/ListaReingresoCompletar'

const DrawerReingreso = (props) => {

    const { setReingresoIdDenuncia, checkedReingreso, 
            setDisableAceptar, checkedIntercurrencia, setIntercurrenciaIdDenuncia,
            setIntercurrenciaNroDenuncia, setDenunciaOrigen, denuncia} = props

    const [dataBuscadorReingreso, setDataBuscadorReingreso] = useState({ tipoDoc: 1, nroDoc: null })
    const [errorReingreso, setErrorReingreso] = useState(false)
    const [listaReingreso, setListaReingreso] = useState(null)
    const [valueForm, setValueForm] = useState(null)
    const [open, setOpen] = useState(false)
    const [openDialogo, setOpenDialogo] = useState(false)
    const [textoDialogo, setTextoDialogo] = useState("")
    const [dialogoOK, setDialogoOK] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''})

    useEffect(() => {
        setDisableAceptar(valueForm === null ? true : false)
        if(checkedReingreso){
            setReingresoIdDenuncia(valueForm === null ? valueForm : parseInt(valueForm))
        }else{
            setIntercurrenciaIdDenuncia(valueForm === null ? valueForm : parseInt(valueForm))
            if(valueForm && valueForm !== null && listaReingreso){
                listaReingreso && listaReingreso.objetos && listaReingreso.objetos.map(item => {
                    if(item.idDenuncia === parseInt(valueForm)){
                        setIntercurrenciaNroDenuncia(item ? Utils.nroAsignadoProvisorio(item) : '')
                    }
                })}
        }
    }, [valueForm])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    }

    const aceptarDialogo = () => {
        setOpenDialogo(false)
        setTextoDialogo("")
        setDialogoOK(false)
    }

    const cancelarDialogo = () => {
        setOpenDialogo(false)
        setTextoDialogo("")
        setDialogoOK(false)
        setValueForm(null)
        setDenunciaOrigen(null)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{margin:'10px 0 0 10px'}}>
                <BuscadorReingreso
                    dataBuscadorReingreso = {dataBuscadorReingreso}
                    setDataBuscadorReingreso = {setDataBuscadorReingreso}
                    errorReingreso = {errorReingreso}
                    setErrorReingreso = {setErrorReingreso}
                    listaReingreso = {listaReingreso} 
                    setListaReingreso = {setListaReingreso}
                    valueForm = {valueForm} 
                    setValueForm = {setValueForm}
                    open = {open} 
                    setOpen = {setOpen} 
                    denuncia = {denuncia}
                />
            </Grid>

            {open && listaReingreso ?
                <Grid item xs={12}>
                    <ListaReingresoCompletar 
                        listaReingreso = {listaReingreso} setListaReingreso = {setListaReingreso}
                        valueForm = {valueForm} setValueForm = {setValueForm}
                        openSnackBar = {openSnackBar} setOpenSnackBar = {setOpenSnackBar}
                        textoDialogo = {textoDialogo} setTextoDialogo = {setTextoDialogo}
                        openDialogo = {openDialogo} setOpenDialogo = {setOpenDialogo}
                        dialogoOK = {dialogoOK} setDialogoOK = {setDialogoOK} 
                        setDenunciaOrigen = {setDenunciaOrigen}
                        checkedReingreso = {checkedReingreso}  checkedIntercurrencia = {checkedIntercurrencia}
                    />
                </Grid>
            : null}

            <CustomSnackBar 
                handleClose={handleClose} 
                open={openSnackBar.open} 
                title={openSnackBar.title}
                severity={openSnackBar.severity} 
            /> 

            <CustomDialogo
                handleAceptar={aceptarDialogo}
                handleCancelar={cancelarDialogo}
                openDialogo={openDialogo}
                texto={textoDialogo}
                dialogoOk={!dialogoOK}
            />
        </Grid>
    )
}

export default DrawerReingreso