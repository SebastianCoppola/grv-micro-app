import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchEspecialidadesMedicas } from "../../../../../../../../redux/actions/listados";
import { Grid } from '@material-ui/core'
import AutoSuggest from "../../../../../../../commons/Autosuggest/Autosuggest";
import { COMPONENT_CONSULTA_RECLAMOS_GENERAL, SUGERENCIA_BUSQUEDA_NOMBRE } from "../../../../../../../../Utils/const";
import CustomTypography from "../../../../../../../commons/Typography/CustomTypography";

const BusquedaEspecialidad = (props) => {
    const { editAsociarDesasociarEspecialidad, especialidadesElegidas, setEspecialidadesElegidas, tiposActuales, setTiposActuales} = props
    const dispatch = useDispatch();
    const especialidadesMedicas = useSelector(state=>state.listados.especialidadesMedicas)
    const loadingAutosuggestEspecialidadMedica = useSelector(state => state.listados.loadingAutosuggestEspecialidadMedica)
    const errorAutosuggestEspecialidadMedica = useSelector(state => state.listados.errorAutosuggestEspecialidadMedica)
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [opciones, setOpciones] = React.useState([])
    const [valueEspecialidad, setValueEspecialidad] = React.useState(null)
    const onInput = (value) => {
        let request = {
            descripcion:value
        }
        dispatch(searchEspecialidadesMedicas(request))
    }

    useEffect(() => {
        //MODIFICAR tiposActuales => proveedorPrestadorMedicoDTO => asociarDesasociarEspecialidad: 
        if (valueEspecialidad && especialidadesMedicas && !errorAutosuggestEspecialidadMedica) {
            let newEspecialidad = especialidadesMedicas && especialidadesMedicas.filter(it => it.descripcion === valueEspecialidad)[0]
            //Existe asociar/desasociar:
            if(tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarEspecialidad){
                let arrayAsociar = tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarEspecialidad;
                let newArrayAsociar = [];
                let arrayRepe = arrayAsociar && arrayAsociar.filter(it => it.id === newEspecialidad.codigo);
                //Existe EN asociar/desasociar:
                if(arrayRepe.length > 0){
                    for(let i = 0; i < arrayAsociar.length; i++ ){
                        if((arrayAsociar[i].id) === newEspecialidad.codigo){
                            newArrayAsociar.push({
                                "id": arrayAsociar[i].id,
                                "asociar": !arrayAsociar[i].asociar
                            })
                        }else{
                            newArrayAsociar.push(arrayAsociar[i])
                        }
                    }
                }  
                //No existe EN asociar/desasociar:
                else{
                    let array = especialidadesElegidas && especialidadesElegidas.filter(it => it.idEspecialidadMedica === newEspecialidad.idEspecialidadMedica);
                    //Estaba seleccionado anteriormente:
                    if (array && array.length > 0) {    
                        for(let i = 0; i < arrayAsociar.length; i++ ){
                            newArrayAsociar.push(arrayAsociar[i])
                        }
                        newArrayAsociar.push({
                            "id": newEspecialidad.codigo,
                            "asociar": false
                        })
                    }                
                    //No estaba seleccionado anteriormente:
                    else{
                        for(let i = 0; i < arrayAsociar.length; i++ ){
                            newArrayAsociar.push(arrayAsociar[i])
                        }
                        newArrayAsociar.push({"id": newEspecialidad.codigo, "asociar": true})  
                    }  
                }
                //Seteo los datos en tiposActuales:
                editAsociarDesasociarEspecialidad(newArrayAsociar)
            }
            //No existe asociar/desasociar:
            else{
                let array = especialidadesElegidas && especialidadesElegidas.filter(it => it.codigo === newEspecialidad.codigo);   
                editAsociarDesasociarEspecialidad([{"id": newEspecialidad.codigo, "asociar": !(array && array.length > 0)}])
            }
        }


        //MODIFICAR especialidadesElegidas
        if(valueEspecialidad){
            let nuevaEspecialidad = especialidadesMedicas && especialidadesMedicas.filter(it => it.descripcion === valueEspecialidad)
            if(especialidadesElegidas){
                let array = especialidadesElegidas && especialidadesElegidas.filter(it => it.descripcion === valueEspecialidad);
                if(array && array.length === 0){
                    if (valueEspecialidad && especialidadesMedicas && !errorAutosuggestEspecialidadMedica) {
                        setEspecialidadesElegidas([...especialidadesElegidas, {
                            "idEspecialidadMedica": nuevaEspecialidad[0].codigo,
                            "descripcion": nuevaEspecialidad[0].descripcion
                        }])
                    }
                }else{
                    if(tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarEspecialidad){
                        editAsociarDesasociarEspecialidad([{"id": nuevaEspecialidad[0].codigo, "asociar": true}])
                    }
                }
            }else{
                setEspecialidadesElegidas([{
                    "idEspecialidadMedica": nuevaEspecialidad[0].codigo,
                    "descripcion": nuevaEspecialidad[0].descripcion
                }])
            }
            setValueEspecialidad(null)
        }
        
    }, [valueEspecialidad])
    
    useEffect(() => {
        if(especialidadesElegidas){
            setTiposActuales({
                ...tiposActuales,
                "proveedorPrestadorMedicoDTO" : {
                    ...tiposActuales.proveedorPrestadorMedicoDTO,
                    "especialidadesMedicas" : {
                        ...especialidadesElegidas
                    },
                }
            })
        }
        
    }, [especialidadesElegidas]);



    return (
        <Grid container justify={"space-between"} xs={12} spacing={3} style={{marginTop:15}}>
            <Grid item xs={6} justify={"flex-start"}>
                <CustomTypography text='BUSCAR ESPECIALIDAD A AGREGAR *' style={{ fontSize: '12px', color:'#959595' }} />
            </Grid>
            <Grid container item xs={5} justify={"flex-end"} alignContent={'flex-end'}>
                <CustomTypography text='Debe haber al menos una especialidad agregada' style={{ fontSize: '12px', color:'#959595' }} />
            </Grid>
            <Grid item xs={12} style={{
                background: "rgba(255, 205, 113, 0.25)",
                padding: '15px',
                border: '1px dashed #70707073 '
            }}>
                <AutoSuggest
                    placeholder={'Ingrese minimo 3 caracteres'}
                    style={{ 
                        border: especialidadesElegidas && especialidadesElegidas.length > 0 ? "1px solid #747474" : "1px solid #e34850", 
                        borderRadius: '7px', backgroundColor: "white", 
                        boxSizing:'border-box', paddingLeft:'10px',
                        paddingRight:'10px', height: "40px",
                    }}
                    onInput={onInput}
                    minType={3}
                    list={especialidadesMedicas}
                    setSeleccionado={setSeleccionado}
                    valueAutoSuggest={valueEspecialidad}
                    setValueAutoSuggest={setValueEspecialidad}
                    textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
                    textoError={'No se encontró.'}
                    shrink={true}
                    opciones={opciones}
                    setOpciones={setOpciones}
                    nombreVariable = {'descripcion'}
                    loading={loadingAutosuggestEspecialidadMedica}
                    error={errorAutosuggestEspecialidadMedica}
                />
            </Grid>
        </Grid>
    )
}
export default BusquedaEspecialidad
