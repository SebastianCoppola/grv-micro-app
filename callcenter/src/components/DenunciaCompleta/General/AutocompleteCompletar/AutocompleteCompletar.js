import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Utils from "../../../../Utils/utils";
import AgenteCausante from "../../../Autosuggest/agenteCausante";
import AgenteMaterial from "../../../Autosuggest/agenteMaterial";
import DiagnosticoCIE10 from "../../../Autosuggest/diagnosticoCIE10";
import FormaAccidente from "../../../Autosuggest/FormaAccidente";
import NaturalezaSiniestro from "../../../Autosuggest/naturalezaSiniestro";
import ZonaAfeccion from "../../../Autosuggest/zonaAfeccion";

const AutocompleteCompletar = (props) => {
    const { valueAccidente, setValueAccidente, setDataFormaAccidente, denuncia,
        valueZonaAfectada, setValueZonaAfectada, setDataZonaAfectada,
        valueNaturaleza, setValueNaturaleza, setDataNaturaleza,
        valueAgenteCausante, setValueAgenteCausante, setDataAgenteCausante,
        valueAgenteMaterial, setValueAgenteMaterial, setDataAgenteMaterial,
        valueDiagnosticoCie10, setValueDiagnosticoCie10, setDataDiagnosticoCie10, disableEdition } = props
    const campos = useSelector(state => state.documentos.camposRequeridos)

    return (
        <>
            <Grid item xs={6}>
                <FormaAccidente
                    valueAccidente = {valueAccidente}
                    setValueAccidente = {setValueAccidente}
                    setDataFormaAccidente = {setDataFormaAccidente}
                    denuncia = {denuncia}
                    error = {Utils.validarCampos(campos, 'formaAccidenteIdFormaAccidente', valueAccidente)}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <ZonaAfeccion
                    valueZonaAfectada = {valueZonaAfectada}
                    setValueZonaAfectada = {setValueZonaAfectada}
                    denuncia = {denuncia}
                    setDataZonaAfectada = {setDataZonaAfectada}
                    error = {Utils.validarCampos(campos, 'zonaAfectadaIdZonaAfectada', valueZonaAfectada)}
                    label = {'Zona Afectada'}
                    tipoBusqueda = {0}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <NaturalezaSiniestro
                    valueNaturaleza = {valueNaturaleza}
                    setValueNaturaleza = {setValueNaturaleza}
                    denuncia = {denuncia}
                    setDataNaturaleza = {setDataNaturaleza}
                    error = {Utils.validarCampos(campos, 'naturalezasSiniestroIdNaturalezaSiniestro', valueNaturaleza)}
                    label = {'Naturaleza'}
                    tipoBusqueda = {0}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <AgenteCausante
                    valueAgenteCausante = {valueAgenteCausante}
                    setValueAgenteCausante = {setValueAgenteCausante}
                    denuncia = {denuncia}
                    setDataAgenteCausante = {setDataAgenteCausante}
                    error = {Utils.validarCampos(campos, 'agenteCausanteEpIdAgenteCausanteEp', valueAgenteCausante)}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <AgenteMaterial
                    valueAgenteMaterial = {valueAgenteMaterial}
                    setValueAgenteMaterial = {setValueAgenteMaterial}
                    denuncia = {denuncia}
                    setDataAgenteMaterial = {setDataAgenteMaterial}
                    error = {Utils.validarCampos(campos, 'agenteMaterialAsociadoIdAgenteMaterialAsociado', valueAgenteMaterial)}
                    disableEdition={disableEdition}
                />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
                <DiagnosticoCIE10
                    valueDiagnosticoCie10 = {valueDiagnosticoCie10}
                    setValueDiagnosticoCie10 = {setValueDiagnosticoCie10}
                    denuncia = {denuncia}
                    setDataDiagnosticoCie10 = {setDataDiagnosticoCie10}
                    error = {Utils.validarCampos(campos, 'diagnosticoCie10Codigo', valueDiagnosticoCie10)}
                    label = {'Diagnóstico Cie10'}
                    tipoBusqueda = {0}
                    disableEdition={disableEdition}
                />
            </Grid>
        </>
    )
}
export default AutocompleteCompletar