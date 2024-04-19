import { FormControl, FormHelperText, Grid, makeStyles } from "@material-ui/core"
import Utils from "../../../../../Utils/utils"
import CustomSelect from "../../../../commons/Select/customSelect"
import CustomText from "../../../../commons/TextField/CustomText"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions/'
import CustomDatePicker from '../../../../commons/DatePicker/CustomDatePicker'
import AutoSuggest from "../../../../commons/Autosuggest/Autosuggest"
import CustomSnackBar from "../../../../commons/SnackBar/CustomSnackBar"

const useStyles = makeStyles({
    filtrosBox: {
        borderRadius: 5,
        boxShadow: '0 4px 8px 0 rgba(37, 38, 94, 0.1)',
        padding: '10px 20px',
        margin: '0 0 0 0',
        margin: 'auto',
    }
})

const FiltrosCirugiaGeneral = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {requestFiltrosCirugias, setRequestFiltrosCirugias} = props
    const estados = useSelector(state=>state.listados.dataListadoEstadosCirugias)
    const [prestacion, setPrestacion] = useState(null)
    const [opciones, setOpciones] = useState([])
    const [seleccionado, setSeleccionado] = useState(false)
    const prestaciones = useSelector(state => state.prestaciones.dataPrestaciones)
    const snackBarAuditoria = useSelector(state => state.auditoriaMedica.snackBarAuditoria)

    useEffect(()=>{
        getEstadosCirugias();
    },[])

    const getEstadosCirugias = () => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al intentar cargar la lista de estados de cirugias.'
                }))
            }
        }
        dispatch(actions.getListadoEstadosCirugias(errorCallback))
    }
    
    //Change filtros:
    // TODO - manejar filtros
    const handleFiltros = (e, id) => {
        let NewRequestFiltrosCirugias = {...requestFiltrosCirugias}
        switch (id) {
            case 'autorizacion':
                NewRequestFiltrosCirugias = {...requestFiltrosCirugias, numeroAutorizacion: e.target.value}  
                setRequestFiltrosCirugias(NewRequestFiltrosCirugias)
                break
            case 'fechaAutorizacion':
                let dateAutorizacion = e ? new Date(e) : null
                if(dateAutorizacion) dateAutorizacion.setDate(dateAutorizacion.getDate())
                NewRequestFiltrosCirugias = {...requestFiltrosCirugias, fechaAutorizacion: Utils.yearMonthDateFormat(dateAutorizacion)}  
                setRequestFiltrosCirugias(NewRequestFiltrosCirugias)
                break
            case 'fechaCirugia':
                let dateCirugia = e ? new Date(e) : null
                if(dateCirugia) dateCirugia.setDate(dateCirugia.getDate())
                NewRequestFiltrosCirugias = {...requestFiltrosCirugias, fechaCirugia: Utils.yearMonthDateFormat(dateCirugia)}  
                setRequestFiltrosCirugias(NewRequestFiltrosCirugias)
                break
            case 'fechaIndicacion':
                let dateIndicacion = e ? new Date(e) : null
                if(dateIndicacion) dateIndicacion.setDate(dateIndicacion.getDate())
                NewRequestFiltrosCirugias = {...requestFiltrosCirugias, fechaIndicacion: Utils.yearMonthDateFormat(dateIndicacion)}
                setRequestFiltrosCirugias(NewRequestFiltrosCirugias)
                break
            case 'prestacion':
                let prestacion = e;
                if(prestacion){
                    setPrestacion(prestacion)
                }else{
                    setRequestFiltrosCirugias({...requestFiltrosCirugias, idPrestacion: null})
                    setPrestacion(prestacion)
                }
                break
            case 'estado':
                NewRequestFiltrosCirugias = {...requestFiltrosCirugias, idEstado: e.target.value}  
                setRequestFiltrosCirugias(NewRequestFiltrosCirugias)
                break
            default:
                break
        }
    }

    useEffect(() => prestaciones && prestaciones.filter(it => {
        if (it.descripcion === prestacion) {
            setRequestFiltrosCirugias({...requestFiltrosCirugias, idPrestacion: it.idPrestacion})
        }
    }), [prestacion])

    const onInput = (value) => {
        let callback = (error) => {
            if(error){
                dispatch(actions.setSnackBarAuditoria({
                    open: true,
                    severity:'error',
                    message:'Ocurrió un error al buscar el listado de prestaciones.',
                    vertical:'top'
                }))
            }
        }
        dispatch(actions.busquedaPrestaciones({"criterioBusqueda" : value}, callback))
    }

    const mapPrestaciones = prestaciones && prestaciones.map(prestacion => {
        return prestacion.descripcion
    })

    return (
        <div style={{display:'flex', flexWrap:'no-wrap', gap:'10px'}}>
            <div style={{width:'10%'}}>
                <FormControl fullWidth>
                    <FormHelperText># Autorización</FormHelperText>
                    <CustomText
                        inputStyle={{ fontSize: 14 }}
                        borderRadius={20}
                        variant="outlined"
                        type='text'
                        placeholder="Ingresar nro."
                        fullwidth
                        value={requestFiltrosCirugias && requestFiltrosCirugias.numeroAutorizacion}
                        onChange={(e) => { handleFiltros(e, 'autorizacion') }}
                    />
                </FormControl>
            </div>
            <div style={{width:'15%'}}>
                <FormControl fullWidth>
                    <FormHelperText>Fecha autorización</FormHelperText>
                    <CustomDatePicker
                        selectedDate={requestFiltrosCirugias?.fechaAutorizacion ?? ''}
                        setSelectedDate={(e) => { handleFiltros(e, 'fechaAutorizacion') }}
                        placeholder='dd/mm/aaaa'
                        styleFiltrosAuditoria={true}
                    />
                </FormControl>
            </div>
            <div style={{width:'15%'}}>
                <FormControl fullWidth>
                    <FormHelperText>Fecha cirugía</FormHelperText>
                    <CustomDatePicker
                        selectedDate={requestFiltrosCirugias?.fechaCirugia ?? ''}
                        setSelectedDate={(e) => { handleFiltros(e, 'fechaCirugia') }}
                        placeholder='dd/mm/aaaa'
                        styleFiltrosAuditoria={true}
                    />
                </FormControl>
            </div>
            <div style={{width:'15%'}}>
                <FormControl fullWidth>
                    <FormHelperText>Fecha indicación</FormHelperText>
                        <CustomDatePicker
                            selectedDate={requestFiltrosCirugias?.fechaIndicacion ?? ''}
                            setSelectedDate={(e) => { handleFiltros(e, 'fechaIndicacion') }}
                            placeholder='dd/mm/aaaa'
                            styleFiltrosAuditoria={true}
                        />
                    </FormControl>
            </div>
            <div style={{width:'30%'}}>
                <FormControl fullWidth>
                <FormHelperText>Buscar por prestación</FormHelperText>
                <AutoSuggest
                    onInput = {onInput}
                    minType = {1}
                    list = {mapPrestaciones}
                    setSeleccionado = {setSeleccionado}
                    seleccion={seleccionado}
                    valueAutoSuggest = {prestacion}
                    setValueAutoSuggest = {(e) => handleFiltros(e, 'prestacion')}
                    placeholder = {"Ingresar min 1 caracter"}
                    shrink = {true}
                    opciones = {opciones}
                    setOpciones = {setOpciones}
                    style={{
                        width: '90%',
                        height: '30px',
                        border: '2px solid #cacaca',
                        borderRadius: '20px',
                        padding: '2px 10px 0 10px',
                }}    
                />
                </FormControl>
            </div>
            <div style={{width:'15%'}}>
                <CustomSelect
                    titulo='Estado'
                    variant="outlined"
                    auditoriaMedica
                    fullwidth
                    seleccione={true}
                    placeholder='Todos'
                    data={estados}
                    val={requestFiltrosCirugias && requestFiltrosCirugias.idEstado}
                    handleChangeSelect={(e) => { handleFiltros(e, 'estado') }}
                />
            </div>
            <CustomSnackBar
                handleClose={()=>dispatch(actions.setSnackBarAuditoria({open:false}))}
                open={snackBarAuditoria.open}
                title={snackBarAuditoria.message}
                severity={snackBarAuditoria.severity}
                vertical={snackBarAuditoria.vertical ? snackBarAuditoria.vertical : 'bottom'}
            />
        </div>          
    )
}

export default FiltrosCirugiaGeneral;