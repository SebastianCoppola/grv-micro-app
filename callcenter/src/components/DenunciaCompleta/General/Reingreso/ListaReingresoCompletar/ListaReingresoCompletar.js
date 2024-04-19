import { FormControl, Grid, RadioGroup } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from 'react-redux'
//redux
import Lista from "../../../../Form/Lista/Lista";
import Utils from "../../../../../Utils/utils";

const ListaReingresoCompletar = (props) => {
    const dispatch = useDispatch()
    const {valueForm, setValueForm, listaReingreso, checkedReingreso,
        openSnackBar, setOpenSnackBar, textoDialogo, setTextoDialogo,
        openDialogo, setOpenDialogo, checkedIntercurrencia, setDialogoOK, setDenunciaOrigen} = props

    const handleChangeReingreso = (event) => {
        setValueForm(event.target.value)
        let denunciaSeleccionada = null;
        
        listaReingreso && listaReingreso.objetos && listaReingreso.objetos.map(datos => {
            if (datos.idDenuncia == event.target.value) {
                denunciaSeleccionada = datos
            }
        })
        
        let  resultado = null ; 
        if(checkedReingreso){
            resultado = Utils.verificacionReingreso(denunciaSeleccionada.estadoMedicoIdEstadoMedico, denunciaSeleccionada.rechazadoPorArt, denunciaSeleccionada.dictamen);
        }
        if(checkedIntercurrencia){
            resultado = Utils.verificacionIntercurrencia(denunciaSeleccionada.estadoMedicoIdEstadoMedico, denunciaSeleccionada.rechazadoPorArt, denunciaSeleccionada.dictamen);
        }

        if (resultado.mensaje !== null) {
            setTextoDialogo(resultado.mensaje)
            setOpenDialogo(true)
            setDialogoOK(resultado.continuar)

            if (!resultado.continuar) {
                setValueForm(null)
                setDenunciaOrigen(null)
            } else {
                setValueForm(event.target.value)
                if(setDenunciaOrigen){
                    setDenunciaOrigen(denunciaSeleccionada)
                }
            }
        } else {
            setValueForm(event.target.value)
            if(setDenunciaOrigen){
                setDenunciaOrigen(denunciaSeleccionada)
            }
        }
    }
     

    return (
        <Grid item container >
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="listado de denuncias en reingreso" name="listadoDenunciasReingreso" value={valueForm} onChange={handleChangeReingreso}>
                        {listaReingreso && listaReingreso.objetos && listaReingreso.objetos.map((datos, index) => (
                            <Grid item xs={12} >
                                <Lista
                                    datos={datos}
                                    valueForm={datos && datos.idDenuncia}
                                />
                            </Grid>
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
export default ListaReingresoCompletar