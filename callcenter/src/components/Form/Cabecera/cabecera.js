import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
//Mui:
import { Grid, Typography, makeStyles } from '@material-ui/core/'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
//Utils:
import { getImage } from '../../../Utils/icons'
//Componentes
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker'
import CustomText from '../../commons/TextField/CustomText'
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import CustomTypography from '../../commons/Typography/CustomTypography'
import Buscador from '../../commons/Buscador/buscador'
import Chip2 from '../../commons/Chip/CustomChip'
import TipoSiniestro from '../../Selects/TipoSiniestro'
import BusquedaEmpleador from '../../Autosuggest/busquedaEmpleador'
import SiniestroMultiple from '../SiniestroMultiple/SiniestroMultiple'
import CustomLoading from '../../commons/Loading/CustomLoading'
import PersonalAutorizado from '../PersonalAutorizado/PersonalAutorizado'

const useStyles = makeStyles({
    column: {
        flexDirection: 'column'
    },
    chip: {
        position: 'absolute',
        marginTop: '-10px'
    },
    chip2: {
        borderRadius: '5px',
        height: '30px',
        width: '74px'
    },
})

const Cabecera = (props) => {

    const classes = useStyles()

    const { cabecera, validacion, seleccion, setSeleccion, vip, checkedReingreso, setCheckedReingreso,
        handleChecked, denuncia, setPasoPantalla, codigoSeleccionado, setCodigoSeleccionado,
        setSelectedDate, selectedDate, textRelato, setTextRelato, valSiniestro, setValSiniestro,
        hora, setHora, valueEmpleador, setValueEmpleador, dataDenuncia, handleBuscadorReingreso,
        dataBuscadorReingreso, setDataBuscadorReingreso, handleCheckedIntercurrencia, checkedIntercurrencia,
        fechaOcurrenciaValidar, idEmpleadorValidar, reingresoValidar, idCausa, setIdCausa,
        checkedSiniestroMultiple, setCheckedSiniestroMultiple, setCheckedIntercurrencia,
        checkUrgencia, setCheckUrgencia, denuncianteAutorizado, setDenuncianteAutorizado,
        setOpenBuscador } = props

    const [seleccionado, setSeleccionado] = useState(false)
    const [valSiniestroDenuncia, setValSiniestroDenuncia] = useState('')
    const loading = useSelector(state => state.documentos.loadingDenuncia)

    //useEffect(() => console.log(dataBuscadorReingreso), [dataBuscadorReingreso])

    const changeRelato = (event) => {
        setTextRelato(event.target.value)
    }

    const handleChangeSelectSiniestro = (event) => {
        setValSiniestro(event.target.value);
    }

    const handleChangeSelectSiniestroDenuncia = (event) => {
        setValSiniestroDenuncia(event.target.value);
    }

    const onChangeHora = (event) => {
        setHora(event.target.value)
    }

    if (!cabecera) {
        if (seleccionado && selectedDate) setSeleccion(true)
        else setSeleccion(false)
    }

    if (!cabecera) {
        if (vip) {
            if (seleccionado && textRelato && valSiniestro && selectedDate && hora && (denuncianteAutorizado || checkUrgencia)) {
                setPasoPantalla(true)
            } else {
                setPasoPantalla(false)
            }
        } else {
            if (seleccionado && textRelato && valSiniestro && selectedDate && hora) {
                setPasoPantalla(true)
            } else {
                setPasoPantalla(false)
            }
        }
    }

    useEffect(() => {
        let fecha = dataDenuncia && new Date(dataDenuncia.fechaOcurrencia)
        setSelectedDate(dataDenuncia && dataDenuncia.fechaOcurrencia ? fecha : new Date())
        setHora(dataDenuncia && dataDenuncia.horaOcurrencia ? dataDenuncia.horaOcurrencia : selectedDate && selectedDate.toString().substring(16, 21))
        setTextRelato(dataDenuncia && dataDenuncia.relato ? dataDenuncia.relato : null)
        setValSiniestroDenuncia(dataDenuncia && dataDenuncia.tipoSiniestroIdTipoSiniestro ? dataDenuncia.tipoSiniestroIdTipoSiniestro : null)
        setCheckedReingreso(dataDenuncia && dataDenuncia.reingreso ? dataDenuncia.reingreso : false)
        setCheckedIntercurrencia(dataDenuncia && dataDenuncia.idSiniestroIntercurrencia !== null ? true : false)
    }, [dataDenuncia])

    return (
        <Grid container alignItems='center' spacing={!cabecera ? 3 : 3}>
            {!cabecera ?
                <Grid item alignItems={'center'} container spacing={2}>
                    <Grid item xs={12}>
                        <CustomTypography variant={'h6'} text={'Datos del Siniestro'} />
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={9} container spacing={2}>
                            <Grid item xs={6}>
                                <CustomDatePicker
                                    label={'Fecha Ocurrencia'}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                    shrink={true}
                                    maxDate={new Date()}
                                    minDate={new Date(new Date() - (1000 * 60 * 60 * 24 * (365 * 2)))}
                                    deshabilitarTeclado={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomText
                                    label={'Hora Ocurrencia'}
                                    defaultValue={hora}
                                    value={hora}
                                    onChange={onChangeHora}
                                    type={'time'}
                                    id='time'
                                    width={'100%'}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ height: '80px' }}>
                                <Grid item container justify='space-between'>
                                    <Grid item xs={12}>
                                        <Grid item container direction='row' justify='flex-end'>
                                            {vip ?
                                                <div className={classes.chip}>
                                                    <Chip2 size={"small"} className={classes.chip2} avatar={<StarOutlineIcon style={{ color: '#f29423' }} />} label={'VIP'} variant={'outlined'} />
                                                </div>
                                                : null}
                                        </Grid>
                                        <BusquedaEmpleador
                                            valueEmpleador={valueEmpleador}
                                            setValueEmpleador={setValueEmpleador}
                                            setSeleccionado={setSeleccionado}
                                            setCodigoSeleccionado={setCodigoSeleccionado}
                                            seleccion={seleccion}
                                            fechaOcurrenciaValidar={fechaOcurrenciaValidar}
                                            idEmpleadorValidar={idEmpleadorValidar}
                                            reingresoValidar={reingresoValidar}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} container >
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                {codigoSeleccionado && codigoSeleccionado[0] &&
                                    <img
                                        src={getImage(codigoSeleccionado && codigoSeleccionado[0].nombreLogo)}
                                        style={{ width: '150px' }}
                                    />
                                }
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                {codigoSeleccionado && codigoSeleccionado[0] &&
                                    <>
                                        <Typography style={{ fontSize: 14 }}>CUIT: {codigoSeleccionado[0].cuit}</Typography>
                                        <Typography style={{ fontSize: 14 }}>Teléfono: {codigoSeleccionado[0].telefono ? codigoSeleccionado[0].telefono : '-'}</Typography>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    {vip ?
                        <Grid item xs={12}>
                            <PersonalAutorizado
                                idEmpleadorSeleccionado={codigoSeleccionado}
                                nombreEmpleadorSeleccionado={valueEmpleador}
                                denuncianteAutorizado={denuncianteAutorizado}
                                setDenuncianteAutorizado={setDenuncianteAutorizado}
                                checkUrgencia={checkUrgencia}
                                setCheckUrgencia={setCheckUrgencia}
                                backgroundColor='#d3e3f6'
                            />
                        </Grid>
                        : null}
                    {validacion ?
                        <>
                            <Grid item className={classes.column} xs={!cabecera ? 10 : 6}>

                                <CustomText
                                    label={'¿Qué sucedió? Relato del siniestro'}
                                    multiline={true}
                                    placeholder={'Comente lo sucedido'}
                                    fullwidth={true}
                                    id='relato'
                                    shrink={true}
                                    onChange={(event) => changeRelato(event)}
                                    value={textRelato}
                                />
                            </Grid>
                            <Grid item xs={!cabecera ? 5 : 4}>
                                <TipoSiniestro
                                    valSiniestro={valSiniestro}
                                    handleChangeSelectSiniestro={handleChangeSelectSiniestro}
                                />
                            </Grid>
                        </>
                        : null}
                    <Grid item xs={12}></Grid>
                    <Grid item xs={2}>
                        <CustomCheck
                            checked={checkedReingreso}
                            handleChange={handleChecked}
                            texto={'Reingreso'}
                        />
                    </Grid>

                    {(checkedReingreso && seleccionado) ?
                        <Grid item xs={4} >
                            <Buscador onClik={handleBuscadorReingreso} data={dataBuscadorReingreso}
                                setDataBuscador={setDataBuscadorReingreso} />
                        </Grid>
                        : null}
                    <Grid item xs={2} style={{ marginLeft: '2%' }}>
                        <CustomCheck
                            checked={checkedIntercurrencia}
                            handleChange={handleCheckedIntercurrencia}
                            texto={'Intercurrencia'}
                        />
                    </Grid>
                    {(checkedIntercurrencia && seleccionado) ?
                        <Grid item xs={4} style={{ marginLeft: '3%' }}>
                            <Buscador onClik={handleBuscadorReingreso} data={dataBuscadorReingreso}
                                setDataBuscador={setDataBuscadorReingreso} />
                        </Grid>
                        : null}
                </Grid>

                :
                <Grid container spacing={3} alignItems='flex-start' style={{ padding: '5px' }}>
                    <Grid item container direction='column' xs={4} style={{ display: 'block' }} >
                        <Grid item alignItems='center' container spacing={2}  >
                            <Grid item xs={6}>
                                <CustomDatePicker
                                    label={'Fecha Ocurrencia'}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate} shrink={true}
                                    disabledPicker={true} />
                            </Grid>
                            <Grid item xs={6} >
                                <CustomText
                                    label={'Hora Ocurrencia'}
                                    defaultValue={hora}
                                    type={'time'}
                                    id='time'
                                    width={'100%'}
                                    shrink={true}
                                    value={hora}
                                    onChange={onChangeHora} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TipoSiniestro
                                valSiniestro={valSiniestroDenuncia}
                                handleChangeSelectSiniestro={handleChangeSelectSiniestroDenuncia}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <CustomCheck
                                checked={checkedReingreso}
                                handleChange={handleChecked}
                                texto={'reingreso'}
                                disabled={true} />
                        </Grid>
                        <Grid item xs={10}>
                            <CustomCheck
                                checked={checkedIntercurrencia}
                                texto={'Intercurrencia'}
                                disabled={true} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={4} >
                        <Grid item className={classes.column} xs={12}>
                            <CustomText
                                label={'¿Qué sucedió? Relato del siniestro'}
                                multiline={true}
                                placeholder={'Comente lo sucedido'}
                                fullwidth={true}
                                id='relato'
                                shrink={true}
                                onChange={(event) => changeRelato(event)}
                                value={textRelato}
                                rowMax={4}
                            />
                        </Grid>

                    </Grid>

                    <CustomLoading loading={loading} />

                    <Grid item container justify='flex-start' alignItems='center' xs={4} >
                        <Grid item alignItems='center' container spacing={1} >
                            <Grid item xs={7}>
                                {dataDenuncia && dataDenuncia.nombreLogo ?
                                    <img src={getImage(dataDenuncia && dataDenuncia.nombreLogo)}
                                        style={{ width: '150px' }} />
                                    : null}
                            </Grid>

                            <Grid item xs={9}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>    <CustomTypography variant={'body2'} text={'Empleador : '} /></div>
                                    <CustomTypography fontweight={'600'} variant={'body2'} text={dataDenuncia ? dataDenuncia.empleadorRazonSocial : ''} />
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                {vip ?
                                    <div className={classes.chip}>
                                        <Chip2 size={"small"} className={classes.chip2} avatar={<StarOutlineIcon style={{ color: '#f29423' }} />} label={'VIP'} variant={'outlined'} />
                                    </div>
                                    : null}

                            </Grid>
                            <Grid item xs={7}>

                                <div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        <CustomTypography variant={'body2'} text={`CUIT: `} style={{ paddingRight: '10px' }} /></div>
                                    <CustomTypography variant={'body2'} fontweight={'600'} text={dataDenuncia ? dataDenuncia.empleadorCuit : ''} />
                                </div>
                            </Grid>
                            <Grid item xs={7}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ paddingRight: '10px' }}>
                                        <CustomTypography
                                            variant='body2'
                                            text={'Teléfono:'} />
                                    </div>
                                    <CustomTypography variant='body2' fontweight={'600'} text={dataDenuncia ? dataDenuncia.telefonoLaboral : ''} />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <SiniestroMultiple
                            home={false}
                            fechaOcurrencia={selectedDate}
                            denuncia={denuncia || dataDenuncia} 
                            setOpenBuscador={setOpenBuscador}
                            idCausa={idCausa} 
                            setIdCausa={setIdCausa}
                            checkedSiniestroMultiple={checkedSiniestroMultiple}
                            setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                        />
                    </Grid> 
                </Grid>
            }
        </Grid>
    )
}

Cabecera.propTypes = {
    cabecera: PropTypes.bool,
    validacion: PropTypes.any,
    seleccion: PropTypes.any,
    setSeleccion: PropTypes.any,
    vip: PropTypes.bool,
    checkedReingreso: PropTypes.any,
    handleChecked: PropTypes.any,
    setOpen: PropTypes.any,
    open: PropTypes.any,
    setPasoPantalla: PropTypes.any,
    setCodigoSeleccionado: PropTypes.any,
    setSelectedDate: PropTypes.any,
    selectedDate: PropTypes.any,
    textRelato: PropTypes.any,
    setTextRelato: PropTypes.any,
    valSiniestro: PropTypes.any,
    setValSiniestro: PropTypes.any,
    hora: PropTypes.any,
    setHora: PropTypes.any,
    valueEmpleador: PropTypes.any,
    setValueEmpleador: PropTypes.any,
    dataDenuncia: PropTypes.any,
    handleBuscadorReingreso: PropTypes.any,
    dataBuscadorReingreso: PropTypes.any,
    setDataBuscadorReingreso: PropTypes.any,
    setCheckedReingreso: PropTypes.any,
    checkedIntercurrencia: PropTypes.bool,
    handleCheckedIntercurrencia: PropTypes.func,
}

export default Cabecera