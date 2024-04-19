
import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
//estilo
import { makeStyles } from '@material-ui/core/styles';
//componentes
import DiagnosticoCIE10 from "../../Autosuggest/diagnosticoCIE10";
import NaturalezaSiniestro from "../../Autosuggest/naturalezaSiniestro";
import ZonaAfeccion from "../../Autosuggest/zonaAfeccion";

const useStyles = makeStyles((theme) => ({
    fondo:{
        border:'2px dotted #707070',
        backgroundColor: 'rgba(255, 205, 113, 0.25)',
        margin:'5px',
        marginLeft:'10px'
    }
}))

const Multiple10 = (props) => {
    const { denuncia, dataSiniestroCompleto, errorCIE10_2, errorNaturaleza_2, errorZonaAfectada_2,
         setDatosMultipleCIE10, datosMultipleCIE10, tipo1, tipo2, 
         labelDiagnostico, labelNaturaleza, labelZona, denunciaCie10, disableEdition} = props
    const classes = useStyles(props);
    const [valueDiagnosticoCie10_2, setValueDiagnosticoCie10_2] = useState(tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
       
        ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_2 
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
      
        ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_3 
        : denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.descripcionCodigoCie10
        :null)
    const [dataDiagnosticoCie10_2, setDataDiagnosticoCie10_2] = useState( null)
    const [valueNaturaleza_2, setValueNaturaleza_2] = useState( tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
      
        ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_2 
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
       
        ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_3
        : denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.descripcionNaturalezaLesion  
        : null)
    const [dataNaturaleza_2, setDataNaturaleza_2] = useState(null)
    const [valueZonaAfectada_2, setValueZonaAfectada_2] = useState(tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
   
        ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion_2 
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 

        ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion_3 
        : denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.descripcionZonaAfectada 
        :  null)
    const [dataZonaAfectada_2, setDataZonaAfectada_2] = useState(null)
    const [codigoIdZonaAfectada_2, setCodigoIdZonaAfectada_2] = React.useState( tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
     
        ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID_2
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
       
        ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID_3
        :  denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.zonaAfectada 
        :null)
    const [codigoIdDiagnosticoCie10_2, setCodigoIdDiagnosticoCie10_2] = React.useState( tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
     
        ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_2
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
    
        ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_3
        :  denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.codigoCie10 
        :null)
    const [codigoIdNaturalezaSiniestro_2, setCodigoIdNaturalezaSiniestro_2] = React.useState(tipo1 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
   
        ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID_2
        : tipo2 && 
        dataSiniestroCompleto 
        && dataSiniestroCompleto.datosCompletarGeneral 
      
        ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID_3
        :  denunciaCie10 && denunciaCie10 !==null
        ? denunciaCie10.naturalezaLesion 
        :null)
    
    const serchIdAutocompletar = (valueCampo, dataCampo, setIdCampo, idCampo, setValueCampo, dataSiniestroCompletoID, dataSiniestroCompletoValue) =>{
        if (valueCampo && (dataCampo !== null)) {
            let id = dataCampo && dataCampo.filter(it => it.descripcion === valueCampo)
            setIdCampo(id && id[0] ? id[0].codigo : idCampo)
        }
         else if (valueCampo ) {
            setValueCampo( dataSiniestroCompletoValue ? dataSiniestroCompletoValue : null)
            setIdCampo(dataSiniestroCompletoID ?  dataSiniestroCompletoID : null)
        }
    }

    useEffect(() => {
        serchIdAutocompletar(valueZonaAfectada_2, dataZonaAfectada_2, setCodigoIdZonaAfectada_2, codigoIdZonaAfectada_2, setValueZonaAfectada_2, 
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
          
            ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID_2
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
           
            ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaID_3 :
            denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.zonaAfectada 
            :null,
            
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
          
            ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion_2
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
          
            ? dataSiniestroCompleto.datosCompletarGeneral.zonaAfectadaDescripcion_3
            : denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionZonaAfectada 
            :  null)
        
        serchIdAutocompletar(valueNaturaleza_2, dataNaturaleza_2, setCodigoIdNaturalezaSiniestro_2, codigoIdNaturalezaSiniestro_2, setValueNaturaleza_2, 
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
          
            ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID_2
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
           
            ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroID_3
            :denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.naturalezaLesion 
            :  null,
            
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_2!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_2
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_3!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.naturalezasSiniestroDescripcion_3
            : denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionNaturalezaLesion 
            :  null,
            )

        serchIdAutocompletar(valueDiagnosticoCie10_2, dataDiagnosticoCie10_2, setCodigoIdDiagnosticoCie10_2, codigoIdDiagnosticoCie10_2, setValueDiagnosticoCie10_2, 
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_2!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_2
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_3!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10ID_3 
            : denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.codigoCie10 
            :  null,
            
            tipo1 &&
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_2!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_2 
            : tipo2 && 
            dataSiniestroCompleto 
            && dataSiniestroCompleto.datosCompletarGeneral 
            && dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_3!==null 
            ? dataSiniestroCompleto.datosCompletarGeneral.diagnosticoCie10Descripcion_3
            : denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionCodigoCie10 
            :  null 
            )
  
    },[valueNaturaleza_2,  valueZonaAfectada_2, valueDiagnosticoCie10_2, denunciaCie10])
    const [contador, setContador] = useState(0)
    useEffect(() => {
  
         if (denunciaCie10 && datosMultipleCIE10.naturaleza_2_id===null && datosMultipleCIE10.zonaAfectada_2_id ===null && 
            datosMultipleCIE10.diagnosticoCIE10_2_id === null && contador < 2
            
           )  {
            
        setValueDiagnosticoCie10_2( valueDiagnosticoCie10_2 ?
            valueDiagnosticoCie10_2 :denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionCodigoCie10
            :null
            ) 

        setValueNaturaleza_2(valueNaturaleza_2 ?valueNaturaleza_2:
             denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionNaturalezaLesion  
            : null)

        setValueZonaAfectada_2( valueZonaAfectada_2?
            valueZonaAfectada_2
            :denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.descripcionZonaAfectada 
            :  null)
        setCodigoIdZonaAfectada_2 (codigoIdZonaAfectada_2 ? codigoIdZonaAfectada_2
            :denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.zonaAfectada 
            :null)

        setCodigoIdDiagnosticoCie10_2(codigoIdDiagnosticoCie10_2?
            codigoIdDiagnosticoCie10_2:
             denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.codigoCie10 
            :null)

        setCodigoIdNaturalezaSiniestro_2(codigoIdNaturalezaSiniestro_2?
            codigoIdNaturalezaSiniestro_2: denunciaCie10 && denunciaCie10 !==null
            ? denunciaCie10.naturalezaLesion 
            :null)
        }
        setContador(contador +1)
    }, [denunciaCie10])

    useEffect(()=>{
        setDatosMultipleCIE10({
            ...datosMultipleCIE10,
            "naturaleza_2_id": valueNaturaleza_2 ? codigoIdNaturalezaSiniestro_2 : null,
            "zonaAfectada_2_id": valueZonaAfectada_2 ? codigoIdZonaAfectada_2 : null,
            "diagnosticoCIE10_2_id": valueDiagnosticoCie10_2  ? codigoIdDiagnosticoCie10_2 : null,
            
            "naturaleza_2": valueNaturaleza_2 ,
            "zonaAfectada_2": valueZonaAfectada_2 ,
            
            "diagnosticoCIE10_2": valueDiagnosticoCie10_2 ,
           
        })
   
    },[codigoIdNaturalezaSiniestro_2,  codigoIdZonaAfectada_2, codigoIdDiagnosticoCie10_2, 
        valueNaturaleza_2,  valueZonaAfectada_2, valueDiagnosticoCie10_2  ])

    return (
        <>
            <Grid item container xs={6} spacing={2}  className={classes.fondo}>
                <Grid item xs={12} >
                    <DiagnosticoCIE10
                        valueDiagnosticoCie10 = {valueDiagnosticoCie10_2}
                        setValueDiagnosticoCie10 = {setValueDiagnosticoCie10_2}
                        denuncia = {denuncia}
                        setDataDiagnosticoCie10 = {setDataDiagnosticoCie10_2}
                        error = {errorCIE10_2}
                        label = {labelDiagnostico} 
                        tipoBusqueda = {tipo1 ? 1 : tipo2 ? 2 : null }
                        disableEdition={disableEdition}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <NaturalezaSiniestro
                        valueNaturaleza = {valueNaturaleza_2}
                        setValueNaturaleza = {setValueNaturaleza_2}
                        denuncia = {denuncia}
                        setDataNaturaleza = {setDataNaturaleza_2}
                        error = {errorNaturaleza_2}
                        label = {labelNaturaleza} 
                        tipoBusqueda = {tipo1 ? 1 : tipo2 ? 2 : null }
                        disableEdition={disableEdition}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <ZonaAfeccion
                        valueZonaAfectada = {valueZonaAfectada_2}
                        setValueZonaAfectada = {setValueZonaAfectada_2}
                        denuncia = {denuncia}
                        setDataZonaAfectada = {setDataZonaAfectada_2}
                        error = {errorZonaAfectada_2}
                        label = {labelZona} 
                        tipoBusqueda = {tipo1 ? 1 : tipo2 ? 2 : null }
                        disableEdition={disableEdition}
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default Multiple10









