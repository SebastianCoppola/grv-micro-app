import React from "react"
//Mui:
import { Grid } from "@material-ui/core"
//Components:
import ReingresoContenedor from '../ReingresoContenedor'
import CustomCheck from '../../../../commons/CustomCheck/CustomChek'

const RowReingreso = (props) => {

    const  { checkedReingreso, checkedIntercurrencia,
        intercurrenciaIdSiniestro, setIntercurrenciaIdSiniestro,
        intercurrenciaNroSiniestro, setIntercurrenciaNroSiniestro,
        handleCheckedReingreso, handleIntercurrencia, 
        reingresoNroSiniestro, setReingresoNroSiniestro, 
        denuncia, texto, disableEdition } = props

    return(
        <Grid item xs={12} container alignItems='center' spacing={2}>
            <Grid item>
                <CustomCheck
                    checked={texto === 'Reingreso' ? checkedReingreso : checkedIntercurrencia }
                    handleChange={texto === 'Reingreso' ? handleCheckedReingreso : handleIntercurrencia }
                    texto={texto} 
                    disabled={disableEdition}
                />
            </Grid>
            
            {(texto === 'Reingreso' && checkedReingreso) || (texto === 'Intercurrencia' && checkedIntercurrencia) ?
                <Grid item>
                    <ReingresoContenedor
                        checkedReingreso={checkedReingreso}
                        checkedIntercurrencia={checkedIntercurrencia}
                        intercurrenciaIdSiniestro={intercurrenciaIdSiniestro}
                        setIntercurrenciaIdSiniestro={setIntercurrenciaIdSiniestro}
                        intercurrenciaNroSiniestro={intercurrenciaNroSiniestro}
                        setIntercurrenciaNroSiniestro={setIntercurrenciaNroSiniestro}
                        reingresoNroSiniestro={reingresoNroSiniestro}
                        setReingresoNroSiniestro={setReingresoNroSiniestro}
                        denuncia={denuncia} 
                        texto={texto}
                        disableEdition={disableEdition}
                    />
                </Grid>
            : null}           
        </Grid>
    )
}
export default RowReingreso