import React, { useState, useEffect } from 'react'
import Utils from '../../../Utils/utils'
import * as actions from '../../../redux/actions/index'
import { useSelector, useDispatch } from 'react-redux';
//estilo
import { makeStyles } from '@material-ui/styles';
//material-ui
import { Grid } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
//componentes
import CustomTypography from '../../commons/Typography/CustomTypography';
import badgeBlack from '../../../commons/assets/badgeBlack.png'
import CustomSelect from '../../commons/Select/customSelect';
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker';
import CustomText from '../../commons/TextField/CustomText';
import CustomChip from '../../commons/Chip/CustomChip';
import CustomRadio from '../../commons/Radio/CustomRadio';
import Tramitador from '../../Autosuggest/tramitador';

const useStyles = makeStyles({
    texto: {
        color: '#4b4b4b'
    },
    subtexto: {
        fontSize: '9px',
        marginTop:'10px'
    }
})
const CargarNuevoContacto = (props) => {
    const { denuncia, request, setRequest, usuarioActivo, setSelectedDate, 
        selectedDate, setSelectedHora, selectedHora,
        valTramitador, setValTramitador } = props
    const classes = useStyles(props);
    const [value, setValue] = React.useState(null);
    let celular = denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : null
    let telefono = denuncia && denuncia.accidentado && denuncia.accidentado.telefono !== null ? denuncia.accidentado.telefono : null
    const [valueTelefono, setValueTelefono] = useState(denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : telefono ? telefono : null)
    const [valProceso, setValProceso] = useState('')
    const [valMensaje, setValMensaje] = useState('')
    const dispatch = useDispatch()
    const tipoContacto = useSelector(state => state.listados.tipoContacto ? state.listados.tipoContacto : [])
    const procesos = useSelector(state => state.listados.procesos ? state.listados.procesos : [])
    
    useEffect(() => {
        dispatch(actions.fetchProcesos())
        dispatch(actions.fetchTipoContacto())
    }, [])

    useEffect(()=>{
        setValueTelefono(denuncia && denuncia.accidentado ? '+' + Utils.getTelefonoCompleto(denuncia) : telefono ? telefono : null)
        setValTramitador(denuncia && denuncia.tramitadorIdPersona ? denuncia.tramitadorIdPersona : valTramitador)
    },[denuncia])
    

    const handleHora = (event) => {
        setSelectedHora(event.target.value)
        setRequest(request2 => ({
            ...request2,
            hora: event.target.value
        }))
    }
    const handleChangeSelectProceso = (event) => {
        setValProceso(event.target.value)
        setRequest(request2 => ({
            ...request2,
            proceso: event.target.value
        }))
    }
    const onChangeValueTelefono = (event) => {
        setValueTelefono(event.target.value)
        setRequest(request2 => ({
            ...request2,
            telefono: event.target.value
        }))
    }
    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
        setRequest(request2 => ({
            ...request2,
            idTipoContacto: parseInt(event.target.value)
        }))
    };
    const onChangeMensaje = (event) => {
        setValMensaje(event.target.value)
        setRequest(request2 => ({
            ...request2,
            mensaje: event.target.value
        }))
    }
    const handleChangeSelectTramitador = (event) => {
        setValTramitador(event.target.value)
        setRequest(request2 => ({
            ...request2,
            tramitador: event.target.value
        }))
    };
    return (
        <Grid container spacing={2}  >
            <Grid item container style={{ backgroundColor: '#f5f5f5', padding: '20px', borderLeft: '2px solid #1473e6' }}>
                <Grid item container spacing={2}>
                <Grid item container spacing={2} justify='space-between'>
                    <Grid item xs={4}>
                        <CustomTypography text={<div style={{ display: 'flex' }}>
                            <div style={{ paddingRight: '10px', fontWeight: 500 }}>
                                Denuncia:
                            </div>
                            <div >
                                {
                                    denuncia ? Utils.nroAsignadoProvisorio(denuncia) : ''
                                
                                }</div>
                        </div>}
                            variant={'subtitle2'}
                        />
                    </Grid>
                    <Grid item >
                        <CustomChip
                            isCount={true}
                            style={{ backgroundColor: '#ffffff' }}
                            color={'#ffffff'}
                            colorLabel={'#2dc76d'}
                            label={denuncia ? denuncia.estadoMedicoDescripcion : null} />
                    </Grid>
                    </Grid>

                    <Grid item xs={10}>
                        <CustomTypography text={<div style={{ display: 'flex' }}>
                            <div >
                                <img src={badgeBlack} style={{ paddingRight: '10px', }} />
                            </div>
                            <div >{denuncia && denuncia.accidentado ? denuncia.accidentado.nroDoc : null}</div>
                        </div>}
                            variant={'body2'}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Tramitador
                    titulo={'Tramitador'}
                    valTramitador={valTramitador}
                    handleChangeSelectTramitador={handleChangeSelectTramitador}
                />
            </Grid>
            <Grid item xs={6}>
                <CustomDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    label={'Fecha'}
                    shrink={true}
                    fontSize={'13px'} />
            </Grid>
            <Grid item xs={6}>
                <CustomText
                    label={'Hora'}
                    defaultValue={selectedHora}
                    type={'time'}
                    id='time'
                    shrink={true}
                    fullwidth={true}
                    width={'100%'}
                    placeholder='13.30hs'
                    onChange={(event) => handleHora(event)} />
            </Grid>

            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        {tipoContacto ? tipoContacto.map((item) => {
                            return <FormControlLabel
                                value={item.codigo}
                                control={<CustomRadio />}
                                label={<div >
                                    {item.descripcion}
                                </div>}
                            />
                        }) : null}
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid item xs={10}>
                <CustomSelect
                    titulo={'Proceso'}
                    data={procesos}
                    fullwidth={true}
                    placeholder={'Seleccionar'}
                    seleccione={true}
                    handleChangeSelect={(event) => handleChangeSelectProceso(event)}
                    val={valProceso ? valProceso : ""}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    label={'Teléfono'}
                    value={valueTelefono}
                    id={'Telefono'}
                    shrink={true}
                    fullwidth={true}
                    onChange={(event) => onChangeValueTelefono(event)} />
            </Grid>
            <Grid item container  style={{ padding: '15px', margin: '15px 0px' }} alignItems='space-between'>
            <Grid item xs={12}>
                <CustomText
                    label={'Mensaje'}
                    id={'Mensaje'}
                    shrink={true}
                    fullwidth={true}
                    value={valMensaje}
                    onChange={onChangeMensaje}
                    multiline={2} />
            </Grid>
            <Grid item className={classes.subtexto}>
                        <CustomTypography 
                            text={<div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '5px' }}>
                                        Operador:
                                    </div>
                                    <div>
                                        {usuarioActivo 
                                        ? Utils.stringNull(usuarioActivo.apellido) 
                                        + ' ' 
                                        + Utils.stringNull(usuarioActivo.nombre) 
                                        : null}
                                    </div>
                                </div>
                                } 
                            variant='body2' />
                    </Grid>
                    </Grid>
        </Grid>
    )
}
CargarNuevoContacto.propTypes = {

};
export default CargarNuevoContacto

const dataTramitador = ['Opcion1 ', 'Opcion2', 'Opcion3']
const dataProceso = ['Opcion1 SinIntegrar', 'Opcion2 SinIntegrar', 'Opcion3 SinIntegrar']