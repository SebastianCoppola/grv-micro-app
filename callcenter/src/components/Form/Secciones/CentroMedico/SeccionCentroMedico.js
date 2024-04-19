import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//material-ui
import Grid from '@material-ui/core/Grid';
import { TablePagination } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//Constantes
import { SUGERENCIA_CENTRO_MEDICO } from '../../../../Utils/const'
//Componentes
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomCard from '../../../commons/Card/CustomCard';
import CardObrasSociales from './CardObrasSociales'
//estilo
import { makeStyles } from '@material-ui/styles';
import hospital2 from '../../../../commons/assets/hospital2.png'
import Provincia from '../../../Autosuggest/provincia';
import Localidades from '../../../Autosuggest/localidades';
import MessagePaginationActions from '../../../commons/Paginado/TablePaginationActions';
import BusquedaCentroMedico from '../../../Autosuggest/BusquedaCentrosMedicos';
import CustomRadio from '../../../commons/Radio/CustomRadio';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';
import Utils from '../../../../Utils/utils';

const useStyles = makeStyles({

})

const SeccionCentroMedico = (props) => {
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const { denuncia, dataDenuncia,
        valueCentroMedico, setValueCentroMedico,
        dataCentromedico, setDataCentroMedico, seleccionado2, setSeleccionado2,
        setDataSeccionCentroMedico, actualizarBorrador } = props
    const [seleccionado, setSeleccionado] = React.useState(false)
    const [value2Card, setValueCard] = React.useState(null);
    const [opciones, setOpciones] = React.useState([])
    const [provincia, setProvincia] = React.useState(null)
    const [localidad, setLocalidad] = React.useState(null)
    const [dataProvincia, setDataProvincia] = React.useState('')
    const [dataLocalidad, setDataLocalidad] = useState('')
    const [cambioProv, setCambioProv] = React.useState(false)
    const [cambioLoc, setCambioLoc] = React.useState(false)
    //borra lista cuando cambia provincia
    const [cambio, setCambio] = React.useState(false)
    //centro medico sugerido
    const dataCentroMedicoSugerido = useSelector(state => state.documentos.centroMedicoSugerido)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6)
    //radio a determinar
    const [valueRadio, setValueRadio] = React.useState(null);
    const [centroMedicoADeterminarCentro, setCentroMedicoADeterminarCentro] = React.useState(false)
    const [idCentroMedicoADeterminar, setIdCentroMedicoADeterminar] = React.useState(null)
    const [centroMedicoS, setCentroMedicoS] = useState(false)
    const [localidadCentroMedico, setLocalidadCentroMedico] = React.useState(null)
    const campos = useSelector(state => state.documentos.camposRequeridos)

    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
       
    };
    
    const handleChangeRadio = (event) => {
        setValueRadio(event.target.value)
        setValueCard(null)
        setCentroMedicoS(false)
        dispatch(actions.centroMedicoADeterminar(callBack))
    }
    const callBack = (succes, data) => {
        if (succes) {
            setOpenSnackBar({
                open: true,
                severity: 'success',
                title: 'Al elegir esta opción podrá completar mas adelante el Centro Médico elegido',
            })
            if(data){
                setIdCentroMedicoADeterminar(data.id)
                setCentroMedicoADeterminarCentro(data.centroMedico)
                if(actualizarBorrador) actualizarBorrador({centroPrimerAsistencia : data.id !== null ? {id:data.id, centroMedico:data.centroMedico}: null}) 
            }
            
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: 'Le pedimos disculpas hubo un problema. Por favor intente nuevamente'
            })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    useEffect(() => {
        if ((dataDenuncia && denuncia) || page || !seleccionado2) {
            const request = {
                idEmpleador: dataDenuncia ? dataDenuncia.empleadorIdEmpleador : 0,
                limit: rowsPerPage,
                offset: page * rowsPerPage
            }
            dispatch(actions.searchCentroMedicoSugerido(request))
        }
    }, [dataDenuncia, denuncia, page, seleccionado2])


     useEffect(() => {
        if (!cambioProv || seleccionado2 ) {
         //   setLocalidad(denuncia && denuncia.accidentado ? denuncia.accidentado.localidadNombre : null)
        }else{
             setLocalidadCentroMedico(null)
             setCambio(true)
        //  }
        }
     }, [provincia])

    useEffect(() => {
        if (cambio){
            setLocalidadCentroMedico('')
        }
    }, [])

    useEffect(() => {
        setCambio(false)
        if(localidadCentroMedico ===null){
            setCodigoIdLocalidad(null)
        }
        if(provincia ===null){
            setCodigoIdProvincia(null)
        }
    }, [localidadCentroMedico, provincia])


    const [codigoIdProvincia, setCodigoIdProvincia] = React.useState(null)
    const [codigoIdLocalidad, setCodigoIdLocalidad] = React.useState(null)
    
    const [dataCMedico, setDataCMedico] = React.useState(null)

     useEffect(() => {
         if (provincia && dataProvincia) {
            let idProv = dataProvincia && dataProvincia.filter(it=>it.descripcion ===provincia)
            setCodigoIdProvincia(idProv && idProv[0] ? idProv[0].codigo :codigoIdProvincia)    
         }
         if (localidadCentroMedico && dataLocalidad) {
            let idLoc = dataLocalidad && dataLocalidad.filter(it=>it.descripcion ===localidadCentroMedico)
            setCodigoIdLocalidad(idLoc && idLoc[0] && idLoc[0].codigo  ? idLoc[0].codigo : codigoIdLocalidad)
         }
     }, [provincia, dataProvincia, localidadCentroMedico, dataLocalidad])


    useEffect(() => {
        if (valueCentroMedico && dataCentromedico) {
            setDataCMedico(dataCentromedico.filter(it => it.razonSocial === valueCentroMedico))
            let idCMedico = dataCentromedico.filter(it => it.razonSocial === valueCentroMedico)
            setCentroMedicoS(idCMedico && idCMedico[0] && idCMedico[0].centroMedico )
        }
    }, [dataCentromedico, valueCentroMedico])

    useEffect(() => {
        if (!seleccionado2) {
            setValueCentroMedico(null)
            setDataCMedico(null)
            setProvincia( null)
            setLocalidadCentroMedico( null)
            dispatch(actions.setBusquedaCentroMedicos(null))
            dispatch(actions.setLocalidades(null))
            setCodigoIdProvincia(null)
            setCodigoIdLocalidad(null)
        }
    }, [seleccionado2])

    useEffect(()=>{
            setDataSeccionCentroMedico({
                id:value2Card!==null ? value2Card : valueRadio ? idCentroMedicoADeterminar: null,
                sugerido :  dataCentroMedicoSugerido && dataCentroMedicoSugerido.objetos && 
                    dataCentroMedicoSugerido.objetos[0]  && 
                    dataCentroMedicoSugerido.objetos[0].sugeridoEmpleador ===true ? 
                    dataCentroMedicoSugerido.objetos[0].id 
                    :null,
                centroMedico:valueRadio? centroMedicoADeterminarCentro : dataCMedico? centroMedicoS:  dataCentroMedicoSugerido && dataCentroMedicoSugerido.objetos && 
                dataCentroMedicoSugerido.objetos[0]  && 
                dataCentroMedicoSugerido.objetos[0].centroMedico,
            })
    },[value2Card, valueRadio, dataCentroMedicoSugerido, 
        idCentroMedicoADeterminar,centroMedicoS, centroMedicoADeterminarCentro, dataCMedico])

    //Autoguardado centro medico
    useEffect(() => {
        let idCMedico=[];
        if(actualizarBorrador && value2Card && value2Card !== null && dataCentromedico && dataCentromedico.length > 0){
            idCMedico = dataCentromedico.filter(it => it.id === parseInt(value2Card))
            if(idCMedico && idCMedico.length>0 && idCMedico[0].id === parseInt(value2Card)){
                if(actualizarBorrador) actualizarBorrador({centroPrimerAsistencia : idCMedico[0].id !== null ? {id:idCMedico[0].id, centroMedico:idCMedico[0].centroMedico}: null}) 
            }
        }
        if(actualizarBorrador && value2Card && value2Card !== null && dataCentroMedicoSugerido && dataCentroMedicoSugerido !== null && dataCentroMedicoSugerido.objetos && dataCentroMedicoSugerido.objetos.length >0 ){
            idCMedico = dataCentroMedicoSugerido.objetos.filter(it => it.id === parseInt(value2Card))
            if(idCMedico && idCMedico.length>0 && idCMedico[0].id === parseInt(value2Card)){
                if(actualizarBorrador) actualizarBorrador({centroPrimerAsistencia : idCMedico[0].id !== null ? 
                    {id:idCMedico[0].id, centroMedico:idCMedico[0].centroMedico}: null}) 
            }
        }
    }, [value2Card])

    return (
        <>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs={12}>
                    <CustomTypography variant='body2' text={SUGERENCIA_CENTRO_MEDICO} />
                </Grid>

                <Grid item container xs={6} spacing={2}>
                    <Grid item xs={12}>
                        <CustomTypography variant={'body2'} text={'Buscar Centro Médico'} />
                    </Grid>
                    <Grid item xs={6}>
                        <Provincia
                            valueProvincia = {provincia}
                            setValueProvincia = {setProvincia}
                            setDataProvincia = {setDataProvincia}
                            denuncia = {denuncia}
                            setCambioProv = {setCambioProv}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Localidades
                            valueLocalidades = {localidadCentroMedico}
                            setValueLocalidades = {setLocalidadCentroMedico}
                            dataProvincia = {dataProvincia}
                            disabledLocalidad = {!provincia ? true : false}
                            denuncia = {denuncia}
                            setCambioLoc = {setCambioLoc}
                            prov = {provincia}
                            idProv = {codigoIdProvincia}
                            cambioProv = {cambioProv}
                            cambio = {cambio}
                            setDataLocalidad = {setDataLocalidad}
                        />
                    </Grid>
                   
                </Grid>
                <Grid container justify='space-between'>
                        <Grid item xs={6}>
                            <BusquedaCentroMedico
                                valueCentroMedico = {valueCentroMedico}
                                setValueCentroMedico = {setValueCentroMedico}
                                dataDenuncia = {dataDenuncia}
                                idProvincia = {codigoIdProvincia}
                                idLocalidad = {codigoIdLocalidad}
                                denuncia = {denuncia}
                                seleccionado2 = {seleccionado2}
                                setSeleccionado2 = {setSeleccionado2}
                                setDataCentroMedico = {setDataCentroMedico}
                                error = {Utils.validarCampos(campos, 'id', (value2Card || valueRadio)) }
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <FormControl component="fieldset">
                                <RadioGroup aria-label="gender" name="gender1" value={valueRadio} onChange={handleChangeRadio}>
                                    <FormControlLabel
                                        value = "aDeterminar"
                                        control = {<CustomRadio />}
                                        label = {<div >
                                            A determinar
                                        </div>}
                                    />

                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                <Grid item container justify='flex-start' spacing={2} >
                   <Grid item container spacing={1} xs={4} style={{borderTop:'2px solid powderblue', 
                                    borderBottom:'2px solid powderblue',margin:'5px', padding:'2px',
                                    backgroundColor:'rgb(182, 208, 226)', borderRadius:'10px', display:'flex', alignItems:'center'}}>
                    <Grid item xss={1} >
                        <StarOutlineIcon htmlColor={'#f29423'} />
                    </Grid>
                    <Grid item xs={8} 
                    >
                        <CustomTypography 
                            text={'Sugerido Empleador'} 
                            variant={'body1'} 
                             />
                    </Grid>
                    </Grid>
                </Grid>

                {/* <Grid item container> */}
                    <Grid item container spacing={4}>

                        {dataCMedico ?
                            dataCMedico.map((datos) => (
                                <Grid item container xs={4}  >
                                    <CustomCard
                                        click = {true}
                                        value2 = {value2Card}
                                        setValue = {setValueCard}
                                        data = {datos}
                                        ambulancia = {false}
                                        body = {<CardObrasSociales
                                            form = {true}
                                            click = {true}
                                            ambulancia = {false}
                                            icon = {hospital2}
                                            value2 = {value2Card}
                                            setValue = {setValueCard}
                                            datos = {datos} 
                                            setValueRadio = {setValueRadio}/>} />
                                </Grid>
                            ))
                            : 
                            dataCentroMedicoSugerido && dataCentroMedicoSugerido.objetos
                            && dataCentroMedicoSugerido.objetos.map((datos) => (
                                <Grid item container xs={4}  >
                                    <CustomCard
                                        click = {true}
                                        value2 = {value2Card}
                                        setValue = {setValueCard}
                                        data = {datos}
                                        ambulancia = {false}
                                        body = {<CardObrasSociales
                                            form = {true}
                                            click = {true}
                                            ambulancia = {false}
                                            icon = {hospital2}
                                            value2 = {value2Card}
                                            setValue = {setValueCard}
                                            datos = {datos} 
                                            setValueRadio = {setValueRadio}/>} />
                                </Grid>
                            ))
                        }

                    </Grid>

                {dataCentroMedicoSugerido && dataCentroMedicoSugerido.objetos ?
                    <Grid item xs={12}>
                        <TablePagination
                            rowsPerPageOptions ={[6]}
                            colSpan = {3}
                            count = {dataCentroMedicoSugerido && dataCentroMedicoSugerido.cantidadTotal
                                && dataCentroMedicoSugerido.cantidadTotal}
                            rowsPerPage = {6}
                            page = {page}
                            SelectProps = {{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onChangePage = {handleChangePage}
                            ActionsComponent = {MessagePaginationActions}
                            component = "div"
                        />
                    </Grid>
                    : null}
            </Grid>

            {openSnackBar.open ? 
                <CustomSnackBar 
                    handleClose = {handleClose} 
                    open = {openSnackBar.open} 
                    title = {openSnackBar.title}
                    severity = {openSnackBar.severity} /> : null}
        </>
    )
}
SeccionCentroMedico.propTypes = {
    provincia: PropTypes.any,
    setProvincia: PropTypes.any,
    localidad: PropTypes.any,
    setLocalidad: PropTypes.any,
    dataDenuncia: PropTypes.any,
    dataCentromedico: PropTypes.any,
    setDataCentroMedico: PropTypes.any,
    seleccionado2: PropTypes.any,
    setSeleccionado2: PropTypes.any,
    //
    valueCentroMedico: PropTypes.any,
    setValueCentroMedico: PropTypes.any,
    setDataSeccionCentroMedico:PropTypes.any
};
export default SeccionCentroMedico

