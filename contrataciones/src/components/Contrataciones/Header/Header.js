import React from 'react'
//material-ui
import { Grid, Paper, useMediaQuery } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomSelect from '../../commons/Select/customSelect';
import CustomText from '../../commons/TextField/CustomText';
import CustomTypography from '../../commons/Typography/CustomTypography'
import CustomRadio from '../../commons/Radio/CustomRadio';
import RadioPrestador from './RadioPrestador/RadioPrestador';

const Header = (props) => {
    const { openMenu, openMenuSiniestros, align,
        selectPrimeraLinea, setSelectPrimeraLinea, selectSegundaLinea, setSelectSegundaLinea,
        textPrimeraLinea, setTextPrimeraLinea } = props
    const isSmallDevice = useMediaQuery('(max-width:1280px)');
    const [radioPrioridad, setRadioPrioridad] = React.useState('no')
    //definde el estado en true si el select de la primera linea tipo prestador es igual a "prestadores medicos"
    //y muestra los radio buttons
    const prestador = selectPrimeraLinea && selectPrimeraLinea.find((it) => it.value === 1 && it.nombre === 'Tipo') ? true : false
    //estado de radio button cuando select es tipo prestador === "Prestadores medicos"
    const [radiosTipoPrestador, setRadiosTipoPrestador] = React.useState({
        ContratoActivo: false,
        PrimeraAtencion: false,
        Servicio24hs: false,
        RMN: false,
        TAC: false,
        REDCSS: false,
        REDProvart: false
    })

    //maneja el estado de los custom text de la primera linea
    const changeText = (event, value) => {
        setTextPrimeraLinea(data => {
            return data.map((item) => {
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        value: event.target.value,
                        titulo: value.titulo
                    }
                }
                else {
                    return item
                }
            })
        })
    }
    //maneja el estado de los select de la primera linea del header
    const handleChangeSelect = (event, value) => {
        setSelectPrimeraLinea(data => {
            return data.map((item) => {
                if (item.nombre === value.nombre) {
                    setSelectSegundaLinea(data => {
                        return data.map((it) => {
                            if (event.target.value === 1) {
                                return {
                                    ...it,
                                    vista: true
                                }
                            } else if (event.target.value !== 1) {
                                return {
                                    ...it,
                                    vista: it.nombre === 'TipoPrestadorMedico' ? false : true
                                }
                            }
                        })
                    })
                    return {
                        nombre: value.nombre,
                        value: event.target.value,
                        placeHolder: value.placeHolder,
                        titulo: value.titulo,
                        id: value.id,
                        data: value.data,
                    }
                } else {
                    return item
                }
            })
        })

    }

    //maneja el estado de los select de la segunda linea
    const handleChangeSelect2 = (event, value) => {
        setSelectSegundaLinea(data => {
            return data.map((item) => {
                if (item.nombre === value.nombre) {
                    return {
                        nombre: value.nombre,
                        value: event.target.value,
                        titulo: value.titulo,
                        placeHolder: value.placeHolder,
                        id: value.id,
                        data: value.data,
                        grid: value.grid,
                        vista: value.vista
                    }
                } else {
                    return item
                }
            })
        })
    }
    const handleChangeRadioPrioridad = (event, valor) => {
        setRadioPrioridad(valor)
    }
    
    return (

        <Grid container justify={align} alignItems='flex-end'>
            <Paper elevation={4} style={{ padding: '20px' }}>
                <Grid
                    item
                    container
                    xs={!isSmallDevice ? 12 : 12}
                    alignItems={'flex-end'}
                    justify={(isSmallDevice || openMenu || openMenuSiniestros) ? 'flex-start' : align}
                    spacing={2}>
                    {textPrimeraLinea ? textPrimeraLinea.map((text) => (
                        <Grid item xs={2}>
                            <CustomTypography text={text.titulo} variant='body2' />
                            <CustomText
                                variant='outlined'
                                value={text.value}
                                radius={'20px'}
                                shrink={true}
                                name={text.nombre}
                                onChange={(event) => changeText(event, text)} />
                        </Grid>
                    )) : null}
                    {selectPrimeraLinea ? selectPrimeraLinea.map((it) => (
                        <Grid item xs={3}>
                            <CustomSelect
                                titulo={it.titulo}
                                data={it.data}
                                fullwidth={true}
                                seleccione={true}
                                val={it.value}
                                name={it.nombre}
                                placeholder={it.placeHolder}
                                isOutline={true}
                                fontSize={'13px'}
                                handleChangeSelect={(event) => handleChangeSelect(event, it)}
                            />
                        </Grid>
                    )) : null}
                    <Grid item xs={2}>
                        <CustomTypography text={'Es prioridad'} />
                        <FormControl component="fieldset">
                            <RadioGroup
                                style={{ flexDirection: 'row' }}
                                aria-label="gender"
                                name="gender1"
                                value={radioPrioridad}  >
                                <FormControlLabel
                                    value={'si'}
                                    control={<CustomRadio />}
                                    label={'Sí'}
                                    onChange={(event) => handleChangeRadioPrioridad(event, 'si')}
                                />
                                <FormControlLabel
                                    value={'no'}
                                    control={<CustomRadio />}
                                    label={'No'}
                                    onChange={(event) => handleChangeRadioPrioridad(event, 'no')}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    {selectSegundaLinea ? selectSegundaLinea.map((it, index) => (
                        it.vista ?
                            <Grid item xs={it.grid}>
                                <CustomSelect
                                    titulo={it.titulo}
                                    data={it.data}
                                    disabled={(selectSegundaLinea[0].value === null || selectSegundaLinea[0].value === "") && it.nombre === 'Localidad' ? true : false}
                                    fullwidth={true}
                                    seleccione={true}
                                    val={it.value}
                                    name={it.nombre}
                                    placeholder={it.placeHolder}
                                    isOutline={true}
                                    fontSize={'13px'}
                                    handleChangeSelect={(event) => handleChangeSelect2(event, it)}
                                />
                            </Grid>
                            : null
                    )) : null}
                    {prestador ?
                        <RadioPrestador
                            radiosTipoPrestador={radiosTipoPrestador}
                            setRadiosTipoPrestador={setRadiosTipoPrestador}
                        />
                        : null}
                </Grid>
            </Paper>
        </Grid>

    )
}
export default Header


