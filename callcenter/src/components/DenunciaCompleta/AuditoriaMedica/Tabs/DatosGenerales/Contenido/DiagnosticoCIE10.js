import React, { useState, useEffect } from 'react'
//Mui:
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core'
//Components:
import SimpleCIE10 from '../../../../../Autosuggest/diagnosticoCIE10'
import MultipleCIE10 from '../../../../General/Multiple10/multiple10Row'


const DiagnosticoCIE10 = ({ denuncia, isMultiple, request, setRequest }) => {

    const [dataDiagnosticoCie10, setDataDiagnosticoCie10] = useState('')
    const [datosArrayMultiple10, setDatosArrayMultiple10] = useState([])
    const [valueDiagnosticoCie10, setValueDiagnosticoCie10] = useState(
        request && request.codigoDiagnosticoCie10 ?
            `[${request.codigoDiagnosticoCie10}] - ${request.diagnosticoCie10 ?? ''}`
            : null
    )
    const [datosDiagnosticoCIE10_2, setDatosDiagnosticoCIE10_2] = useState({
        diagnosticoCIE10_2: request.diagnosticoCie102 ?? null,
        diagnosticoCIE10_2_id: request.codigoDiagnosticoCie102 ?? null,
        naturaleza_2: request.naturalezaSiniestro2 ?? null,
        naturaleza_2_id: request.idNaturalezaSiniestro2 ?? null,
        zonaAfectada_2: request.zonaAfectada2 ?? null,
        zonaAfectada_2_id: request.idZonaAfectada2 ?? null,
    })
    const [datosDiagnosticoCIE10_3, setDatosDiagnosticoCIE10_3] = useState({
        diagnosticoCIE10_3: request.diagnosticoCie103 ?? null,
        diagnosticoCIE10_3_id: request.codigoDiagnosticoCie103 ?? null,
        naturaleza_3: request.naturalezaSiniestro3 ?? null,
        naturaleza_3_id: request.idNaturalezaSiniestro3 ?? null,
        zonaAfectada_3: request.zonaAfectada3 ?? null,
        zonaAfectada_3_id: request.idZonaAfectada3 ?? null,
    })

    useEffect(() => {
        setRequest({
            ...request,
            diagnosticoCie102: datosDiagnosticoCIE10_2.diagnosticoCIE10_2,
            codigoDiagnosticoCie102: datosDiagnosticoCIE10_2.diagnosticoCIE10_2_id,
            naturalezaSiniestro2: datosDiagnosticoCIE10_2.naturaleza_2,
            idNaturalezaSiniestro2: datosDiagnosticoCIE10_2.naturaleza_2_id,
            zonaAfectada2: datosDiagnosticoCIE10_2.zonaAfectada_2,
            idZonaAfectada2: datosDiagnosticoCIE10_2.zonaAfectada_2_id,
        })
    }, [datosDiagnosticoCIE10_2])

    useEffect(() => {
        setRequest({
            ...request,
            diagnosticoCie103: datosDiagnosticoCIE10_3.diagnosticoCIE10_3 ? datosDiagnosticoCIE10_3.diagnosticoCIE10_3 : datosDiagnosticoCIE10_3.diagnosticoCIE10_2 ? datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.diagnosticoCIE10_2 : null,
            codigoDiagnosticoCie103: datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.diagnosticoCIE10_2_id ? datosDiagnosticoCIE10_3.diagnosticoCIE10_2_id : null,
            naturalezaSiniestro3: datosDiagnosticoCIE10_3.naturaleza_3 ? datosDiagnosticoCIE10_3.naturaleza_3 : datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.naturaleza_2 ? datosDiagnosticoCIE10_3.naturaleza_2 : null,
            idNaturalezaSiniestro3: datosDiagnosticoCIE10_3.naturaleza_3_id ? datosDiagnosticoCIE10_3.naturaleza_3_id : datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.naturaleza_2_id ? datosDiagnosticoCIE10_3.naturaleza_2_id : null,
            zonaAfectada3: datosDiagnosticoCIE10_3.zonaAfectada_3 ? datosDiagnosticoCIE10_3.zonaAfectada_3 : datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.zonaAfectada_2 ? datosDiagnosticoCIE10_3.zonaAfectada_2 : null,
            idZonaAfectada3: datosDiagnosticoCIE10_3.zonaAfectada_3_id ? datosDiagnosticoCIE10_3.zonaAfectada_3_id : datosDiagnosticoCIE10_3 && datosDiagnosticoCIE10_3.zonaAfectada_2_id ? datosDiagnosticoCIE10_3.zonaAfectada_2_id : null,
        })
    }, [datosDiagnosticoCIE10_3])

    useEffect(() => {
        let codigo = null
        let descripcion = null
        if (valueDiagnosticoCie10) {
            codigo = valueDiagnosticoCie10.split(' - ')[0].slice(1).slice(0, -1)
            descripcion = valueDiagnosticoCie10.split(' - ')[1]
        }
        setRequest({
            ...request,
            codigoDiagnosticoCie10: codigo,
            diagnosticoCie10: descripcion,
        })
    }, [valueDiagnosticoCie10])

    return (
        <>
            {isMultiple ?
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={request.multipleCie10}
                                onChange={() => setRequest({ ...request, multipleCie10: !request.multipleCie10 })}
                                color="primary"
                            />
                        }
                        label={
                            <Typography style={{ fontSize: 14, color: '#747474' }}>Múltiples CIE10</Typography>
                        }
                    />
                    {request && request.multipleCie10 &&
                        <MultipleCIE10
                            denuncia={denuncia}
                            datosMultipleCIE10={datosDiagnosticoCIE10_2}
                            setDatosMultipleCIE10={setDatosDiagnosticoCIE10_2}
                            datosMultipleCIE10_2={datosDiagnosticoCIE10_3}
                            setDatosMultipleCIE10_2={setDatosDiagnosticoCIE10_3}
                            datosArrayMultiple10={datosArrayMultiple10}
                            setDatosArrayMultiple10={setDatosArrayMultiple10}
                            dataSiniestroCompleto={request}
                        />
                    }
                </>
                :
                <>
                    <Typography style={{ fontSize: 14, color: '#747474' }}>Diagnóstico Cie10: * </Typography>
                    <SimpleCIE10
                        valueDiagnosticoCie10={valueDiagnosticoCie10}
                        setValueDiagnosticoCie10={setValueDiagnosticoCie10}
                        denuncia={denuncia}
                        setDataDiagnosticoCie10={setDataDiagnosticoCie10}
                        tipoBusqueda={0}
                        disableEdition={false}
                    />
                </>
            }
        </>
    )
}

export default DiagnosticoCIE10