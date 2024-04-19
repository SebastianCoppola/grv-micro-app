import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Utils from "../../../../Utils/utils";
import Multiple10 from "../multiple10";

const Multiple10Row = (props) => {
    const { denuncia, dataSiniestroCompleto, setDataSiniestroCompleto,
        diagnostico, naturaleza, zona, campos,
        datosMultipleCIE10, setDatosMultipleCIE10,
        datosMultipleCIE10_2, setDatosMultipleCIE10_2,
        datosArrayMultiple10, setDatosArrayMultiple10,
        setDatosCompletarGeneral, disableEdition, datosDiagnosticoCIE10_3,
        setDatosDiagnosticoCIE10_3 } = props

    const ModificaDatos = (datos2, datos3) => {
        if ((datos2 !== null && datos3 === null) || (datos2 === null && datos3 !== null)) {
            setDatosArrayMultiple10(
                [{
                    codigoCie10: datos2 !== null ? datos2.diagnosticoCIE10_2_id :
                        datos3 !== null ? datos3.diagnosticoCIE10_2_id : null,
                    zonaAfectada: datos2 !== null ? datos2.zonaAfectada_2_id :
                        datos3 !== null ? datos3.zonaAfectada_2_id : null,
                    naturalezaLesion: datos2 !== null ? datos2.naturaleza_2_id :
                        datos3 !== null ? datos3.naturaleza_2_id : null,
                }]
            )
        }
        else if (datos3 !== null && datos2 !== null) {
            setDatosArrayMultiple10(
                [{
                    codigoCie10: datos2 !== null ? datos2.diagnosticoCIE10_2_id : null,
                    zonaAfectada: datos2 !== null ? datos2.zonaAfectada_2_id : null,
                    naturalezaLesion: datos2 !== null ? datos2.naturaleza_2_id : null,
                },
                {
                    codigoCie10: datos3 !== null ? datos3.diagnosticoCIE10_2_id : null,
                    zonaAfectada: datos3 !== null ? datos3.zonaAfectada_2_id : null,
                    naturalezaLesion: datos3 !== null ? datos3.naturaleza_2_id : null,
                }
                ]
            )
        }
        else if (datos3 === null && datos2 === null) {
            setDatosArrayMultiple10([])
        }
    }

    const validarDatos = (object) => {
        let result = false
        let valores = Object.values(object);
        valores.map(item => {
            if (item !== null) {
                result = true
            }
        })
        return result
    }

    useEffect(() => {
        if (datosMultipleCIE10 !== null && datosMultipleCIE10_2 !== null) {
            if (validarDatos(datosMultipleCIE10) && validarDatos(datosMultipleCIE10_2)) {
                ModificaDatos(datosMultipleCIE10, datosMultipleCIE10_2)
            } else if (validarDatos(datosMultipleCIE10) && !validarDatos(datosMultipleCIE10_2)) {
                ModificaDatos(datosMultipleCIE10, null)
            } else if (!validarDatos(datosMultipleCIE10) && validarDatos(datosMultipleCIE10_2)) {
                ModificaDatos(null, datosMultipleCIE10_2)
            } else if (!validarDatos(datosMultipleCIE10) && !validarDatos(datosMultipleCIE10_2)) {
                ModificaDatos(null, null)
            }
        }
    }, [datosMultipleCIE10, datosMultipleCIE10_2])

    ///desestructurar array
    const [denunciaCie10Original, setDenunciaCie10Original] = React.useState(
        {
            cie102: null,
            cie103: null
        })
    //
    const [dataSiniestroCompletDenunciaCie10, setDataSiniestroCompletDenunciaCie10] = React.useState({
        cie102: null,
        cie103: null
    })
    const [prueba, setPrueba] = React.useState(true)
    const [prueba2, setPrueba2] = React.useState(true)

    const desArrayDenuncia = (data, data2) => {

        if (data && data.denunciaCie10 !== null && data.denunciaCie10.length > 0) {
            data.denunciaCie10.map((it, index) => {
                index === 0 && setDenunciaCie10Original({ cie102: it })
                index === 1 && setDenunciaCie10Original(den => ({ ...den, cie103: it }))

            })
        }
        if (data2 && data2 !== null && data2.denunciaMultiple10 !== undefined
            && data2.denunciaMultiple10 !== null && data2.denunciaMultiple10.length > 0) {
            data2.denunciaMultiple10.map((it, index) => {
                index === 0 && setDataSiniestroCompletDenunciaCie10(data => [{ cie102: it }])
                index === 1 && setDataSiniestroCompletDenunciaCie10(data => [{ cie103: it }])
            })
        }
    }

    useEffect(() => {
        if ((denuncia && denuncia.denunciaCie10 !== null) && dataSiniestroCompleto && dataSiniestroCompleto.datosCompletarGeneral !== null) {
            desArrayDenuncia(denuncia, dataSiniestroCompleto.datosCompletarGeneral)
        }
    }, [denuncia])


    return (
        <Grid container >
            <>
                <Multiple10
                    denuncia={denuncia}
                    dataSiniestroCompleto={dataSiniestroCompleto}
                    setDataSiniestroCompleto={setDataSiniestroCompleto}
                    errorCIE10_2={Utils.validarCampos(campos, 'diagnosticoCie10Codigo', diagnostico)}
                    errorNaturaleza_2={Utils.validarCampos(campos, 'naturalezasSiniestroIdNaturalezaSiniestro', naturaleza)}
                    errorZonaAfectada_2={Utils.validarCampos(campos, 'zonaAfectadaIdZonaAfectada', zona)}
                    errorCIE10_3={false}
                    labelDiagnostico={'Diagnóstico Cie10 (2)'}
                    labelNaturaleza={'Naturaleza (2)'}
                    labelZona={'Zona Afectada (2)'}
                    errorNaturaleza_3={false}
                    errorZonaAfectada_3={false}
                    datosMultipleCIE10={datosMultipleCIE10}
                    setDatosMultipleCIE10={setDatosMultipleCIE10}
                    tipo1={true}
                    setPrueba={setPrueba}
                    setDenunciaCie10Original={setDenunciaCie10Original}
                    denunciaCie10={denunciaCie10Original.cie102}
                    nombre={'cie102'}
                    setDatosCompletarGeneral={setDatosCompletarGeneral}
                    dataSiniestroCompletDenunciaCie10={dataSiniestroCompletDenunciaCie10}
                    disableEdition={disableEdition}
                />
                <Multiple10
                    denuncia={denuncia}
                    dataSiniestroCompleto={dataSiniestroCompleto}
                    setDataSiniestroCompleto={setDataSiniestroCompleto}
                    //errorCIE10_3 = {false }
                    labelDiagnostico={'Diagnóstico Cie10 (3)'}
                    labelNaturaleza={'Naturaleza (3)'}
                    labelZona={'Zona Afectada (3)'}
                    errorNaturaleza_3={false}
                    errorZonaAfectada_3={false}
                    datosMultipleCIE10={datosMultipleCIE10_2}
                    setDatosMultipleCIE10={setDatosMultipleCIE10_2}
                    tipo2={true}
                    setPrueba2={setPrueba2}
                    setDenunciaCie10Original={setDenunciaCie10Original}
                    nombre={'cie103'}
                    setDatosCompletarGeneral={setDatosCompletarGeneral}
                    denunciaCie10={denunciaCie10Original.cie103}
                    dataSiniestroCompletDenunciaCie10={dataSiniestroCompletDenunciaCie10}
                    disableEdition={disableEdition}
                />
            </>
        </Grid>
    )
}
export default Multiple10Row
