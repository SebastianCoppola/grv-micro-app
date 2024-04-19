import React from "react"
//Mui:
import { Grid } from "@material-ui/core"
//Components:
import RowReingreso from "./RowReingreso"

const Row = (props) => {

    const {checkedReingreso, checkedIntercurrencia,
        intercurrenciaIdSiniestro, setIntercurrenciaIdSiniestro,
        intercurrenciaNroSiniestro, setIntercurrenciaNroSiniestro,
        handleCheckedReingreso, handleIntercurrencia,
        reingresoNroSiniestro, setReingresoNroSiniestro, 
        denuncia, disableEdition } = props
    
    return (
        <Grid item xs={12} container alignItems='center'>
            <Grid item xs={ !checkedReingreso ? 3 : reingresoNroSiniestro !== null ? 8 : 6 }>
                <RowReingreso
                    checkedReingreso={checkedReingreso} 
                    checkedIntercurrencia={checkedIntercurrencia}
                    intercurrenciaIdSiniestro={intercurrenciaIdSiniestro}
                    setIntercurrenciaIdSiniestro={setIntercurrenciaIdSiniestro}
                    intercurrenciaNroSiniestro={intercurrenciaNroSiniestro} 
                    setIntercurrenciaNroSiniestro={setIntercurrenciaNroSiniestro}
                    handleCheckedReingreso={handleCheckedReingreso}
                    handleIntercurrencia={handleIntercurrencia}
                    reingresoNroSiniestro={reingresoNroSiniestro}
                    setReingresoNroSiniestro={setReingresoNroSiniestro} 
                    denuncia={denuncia} 
                    texto={'Reingreso'}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={ !checkedIntercurrencia ? 3 : reingresoNroSiniestro!==null ?  8 : 6 }>
                <RowReingreso
                    checkedReingreso={checkedReingreso} 
                    checkedIntercurrencia={checkedIntercurrencia}
                    intercurrenciaIdSiniestro={intercurrenciaIdSiniestro}
                    setIntercurrenciaIdSiniestro={setIntercurrenciaIdSiniestro}
                    intercurrenciaNroSiniestro={intercurrenciaNroSiniestro}  
                    setIntercurrenciaNroSiniestro={setIntercurrenciaNroSiniestro}
                    handleCheckedReingreso={handleCheckedReingreso}
                    handleIntercurrencia={handleIntercurrencia}
                    reingresoNroSiniestro={reingresoNroSiniestro}
                    setReingresoNroSiniestro={setReingresoNroSiniestro} 
                    denuncia={denuncia} 
                    texto={'Intercurrencia'}
                    disableEdition={disableEdition}
                />
            </Grid>
        </Grid>
    )
}
export default Row