import React, { useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import * as actions from '../../../redux/actions/index'
import { useDispatch } from 'react-redux'
//Mui:
import { Grid, Typography, RadioGroup, FormControl } from '@material-ui/core'
//Componentes:
import CustomText from '../../commons/TextField/CustomText'
import CustomButton from '../../commons/Button/CustomButton'
import TipoDNI from '../../Selects/tipoDNI'
import Loader from '../../commons/Loading/Loader'
import SiniestosAnteriores from '../../PreDenuncias/ComponenteDrawer/SiniestosAnteriores'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import { estadosCEM } from '../../../Utils/const'

const NuevoContacto = (props) => {
    
    const { value, setValue, setValueHabilitado, valueHabilitado, text, marginTralado,
        openSnackBar, setOpenSnackBar } = props
    
    const dispatch = useDispatch()

    const [dataDoc, setDataDoc] = useState('')
    const [valTipoDni, setValTipoDni] = useState(1)
    const [dni, setDni] = useState(undefined)
    const [circularProgress, setCircularProgress] = useState(false)
    const [data, setData] = useState(null)

    const handleChange = (event) => {
        setValue(event.target.value);
        if (valueHabilitado) setValueHabilitado(false)
    }

    const handleChangeSelectTipoDni = (event) => {
        setValTipoDni(event.target.value)
    }

    const onChangeValueDNI = (event) => {
        setDni(event.target.value)
    }

    const onValidar = () => {
        if (dni) {
            let req = {                            
                nroDoc: dni,
                tipoDoc: valTipoDni,
                estadoCem: estadosCEM.NO_BORRADOR
            }
            setCircularProgress(true)
            dispatch(actions.searchDenunciasAnteriores(req, response))
        }
    }

    const response = (data) => {
        setCircularProgress(false)
        setData(data)
    }


    return (
        <Grid container spacing={2} alignItems='flex-end' style={marginTralado ? { margin: '20px' } : null}>
            
            <Grid item xs={12} container spacing={2} alignItems='flex-end'>
                <Grid item xs={12} style={{marginTop:'15px'}}>
                    <Typography>
                        {text}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TipoDNI
                        valTipoDni = {valTipoDni}
                        handleChangeSelectTipoDni = {handleChangeSelectTipoDni}
                        titulo = {true}
                        setDataDoc = {setDataDoc} 
                    />
                </Grid>
                <Grid item xs={6} style={{paddingBottom:'10px'}}>
                    <CustomText
                        label = {'Número'}
                        value = {dni}
                        id = {'dni'}
                        shrink = {true}
                        onChange = {(event) => onChangeValueDNI(event)} 
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomButton
                        label = {'Validar'}
                        variant = {'outlined'}
                        onClik = {onValidar}
                    />
                </Grid>
            </Grid>

            { circularProgress ?
                <Grid item xs={11} style={{marginTop:'100px'}}>
                    <Loader loading={circularProgress} />
                </Grid>
            : data ?
                <Grid item xs={11}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="siniestrosAnteriores" name="siniestrosAnteriores" value={value} onChange={handleChange}>
                            {data && data.objetos.map((siniestro, index) => {
                                return (
                                    <SiniestosAnteriores
                                        key = {index}
                                        radioButton = {true}
                                        index = {index}
                                        data = {siniestro}
                                        DatosAmpliados = {true}
                                        value = {siniestro && siniestro.accidentado ?
                                            siniestro.idDenuncia + '-' + siniestro.estadoCEM + '-' + siniestro.accidentado.nroDoc + '-' + siniestro.nroProvisorio + '-' + siniestro.nroAsignado + '-' + siniestro.empleadorIdEmpleador : null}
                                        valueActual = {value}
                                    />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </Grid>
            :
                <Grid item xs={12} style={{marginTop:'100px', textAlign:'center'}}>
                    <Typography style={{fontSize:'.9rem'}}>
                        No se encontraron siniestros anteriores para el DNI. 
                        {/* {data && data.dni ? data.dni : '.'}  */}
                    </Typography> 
                </Grid>
            }
            
            {openSnackBar.open ? 
                <CustomSnackBar 
                    handleClose={()=>setOpenSnackBar({open: false})} 
                    open={openSnackBar.open} 
                    title={openSnackBar.title}
                    severity={openSnackBar.severity} 
                /> 
            : null}

        </Grid>
    )
}

NuevoContacto.propTypes = {
    value: PropTypes.any,
    setValue: PropTypes.any,
    setValueHabilitado: PropTypes.any,
    valueHabilitado: PropTypes.any,
    marginTralado: PropTypes.any
}

export default NuevoContacto