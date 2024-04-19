import React, { useEffect, useState, useRef } from "react"
//Mui:
import { Grid, useMediaQuery } from '@material-ui/core'
//Components:
import CustomSelect from '../../../commons/Select/customSelect'
import CustomText from '../../../commons/TextField/CustomText'
import CustomTypography from '../../../commons/Typography/CustomTypography'
import CustomButton from '../../../commons/Button/CustomButton'
import RadioPrestador from './RadioPrestador/RadioPrestador'
import LocalidadesSelect from '../../../Selects/LocalidadesSelect'
import TipoPrestador from '../../../Selects/TiposPrestador'
import PrestadorMedico from '../../../Selects/PrestadorMedico'
import RadioEsPrioridad from './RadioEsPrioridad/RadioEsPrioridad'
//Redux:
import { useSelector } from "react-redux"
//Constantes:
import { RAZON_SOCIAL_NOMBRE, ESTADO_PROVEEDOR_ACTIVO } from '../../../../Utils/const'
//Iconos:
import filterPlus from '../../../../commons/assets/Header/filterPlus.svg'
import filterMinus from '../../../../commons/assets/Header/filterMinus.svg'
import Restore from '../../../../commons/assets/Header/restore.svg'

const Filtros = (props) => {
    
    const { align, textPrimeraLinea, setTextPrimeraLinea, datos, setDatos, consulta, gridRadio, 
        gridTextPrimeraLinea, openMenu, openMenuSiniestros, filtrosBuscadorFlotante } = props
    
    const isSmallDevice = useMediaQuery('(max-width:1280px)')
    
    const loadingPrestadores = useSelector(state => state.documentos.loadingBusquedaPrestador)
    const dataProvincia = useSelector(state => state.listados.provinciaSelect)
    const dataEstado = useSelector(state => state.listados.estadoSelect)
    const customButtonRef = useRef();

    const [valLocalidadesSelect, setValLocalidadesSelect] = useState(null)
    const [valTipoPrestador, setValTipoPrestador] = useState(null)
    const [valPrestadorMedico, setValPrestadorMedico] = useState(null)
    const [estado, setEstado] = useState(ESTADO_PROVEEDOR_ACTIVO)
    const [provincia, setProvincia] = useState(null)
    const [mostrarFiltroAvanzado, setMostrarFiltroAvanzado] = useState(false)
    const [limpiarFiltros, setLimpiarFiltros] = useState(false)

    useEffect(() => {
        filtrosBuscadorFlotante && setValTipoPrestador(0)
    }, [])
    
    const changeText = (event, value) => {
        setTextPrimeraLinea(data => {
            return data.map((item) => {
                if (item.nombre === value.nombre) {
                    setDatos({
                        ...datos,
                        [item.nombre]: event.target.value !== '' ? event.target.value : null
                    })
                    return {
                        nombre: value.nombre,
                        value: event.target.value !== '' ? event.target.value : null,
                        titulo: value.titulo
                    }
                }
                else {
                    return item
                }
            })
        })
    }

    const handleChangeSelectEstado = (event) => {
        setEstado(event.target.value)
        setDatos({
            ...datos,
            'estado': event.target.value !== '' ? event.target.value : null
        })
    }

    const handleChangeLocalidadesSelect = (event) => {
        setValLocalidadesSelect(event.target.value)
        setDatos({
            ...datos,
            'idLocalidad': event.target.value !== '' ? event.target.value : null
        })
    }

    const handleChangeSelectProvincia = (event) => {
        setProvincia(event.target.value)
        setDatos({
            ...datos,
            'idProvincia': event.target.value !== '' ? event.target.value : null,
            'idLocalidad': null
        })
    }

    const handleChangePrestadorMedico = (event) => {
        setValPrestadorMedico(event.target.value)
        setDatos({
            ...datos,
            'tipoPrestadorMedico': event.target.value !== '' ? event.target.value : null
        })
    }

    const handleClickFiltrosAvanzados = () => {
        setMostrarFiltroAvanzado(true);
    }

    const handleClickComprimir = () => {
		setMostrarFiltroAvanzado(false)
        setDatos({
            ...datos,
            'ContratoActivo': null,
            'primeraAsistencia': null, 
            'redCS': null,
            'redProvart': null,
            'servicio24h': null, 
            'tieneRmn': null,
            'tieneTac': null, 
            'tipoPrestadorMedico': null
        })
	}

    const handleClickLimpiarFiltro = () => {
        setLimpiarFiltros(true)
    }

    return (
        <Grid container justifyContent={align} alignItems='flex-start' style={{padding:'10px'}}>
            <Grid
                item
                container
                xs={!isSmallDevice ? 12 : 12}
                alignItems={'flex-start'}
                justifyContent={(isSmallDevice || openMenu || openMenuSiniestros) ? 'flex-start' : align}
                spacing={2}
            >
                {textPrimeraLinea ? textPrimeraLinea.map((text) => (
                    <Grid item xs={consulta && gridTextPrimeraLinea ? gridTextPrimeraLinea : 12}>
                        <CustomTypography text={text.titulo} variant='body2' />
                        <CustomText
                            focus={text.titulo == RAZON_SOCIAL_NOMBRE}
                            fullwidth={true}
                            variant='outlined'
                            value={text.value}
                            radius={'20px'}
                            shrink={true}
                            name={text.nombre}
                            onChange={(event) => changeText(event, text)}
                            disabled={!filtrosBuscadorFlotante && loadingPrestadores} 
                        />
                    </Grid>
                )) : null}
                <Grid item xs={consulta ? 3 : 12} style={{ marginTop: '-12px' }}>
                    <CustomSelect
                        titulo={"Estado"}
                        data={dataEstado}
                        fullwidth={true}
                        seleccione={true}
                        val={estado}
                        name={'estado'}
                        placeholder={'Todos'}
                        isOutline={true}
                        handleChangeSelect={(event) => handleChangeSelectEstado(event)}
                    />
                </Grid>
                <Grid item xs={consulta ? 3 : 12}>
                    <CustomSelect
                        titulo={"Provincia"}
                        data={dataProvincia}
                        fullwidth={true}
                        seleccione={true}
                        val={provincia}
                        name={"idProvincia"}
                        placeholder={"Seleccionar Provincia"}
                        isOutline={true}
                        handleChangeSelect={(event) => handleChangeSelectProvincia(event)}
                    />
                </Grid>
                <Grid item xs={consulta ? 3 : 12}>
                    <LocalidadesSelect
                        handleChangeLocalidadesSelect={handleChangeLocalidadesSelect}
                        setValLocalidadesSelect={setValLocalidadesSelect}
                        valLocalidadesSelect={valLocalidadesSelect}
                        idProv={provincia}
                        setDatos={setDatos}
                        datos={datos}
                    />
                </Grid>
                <Grid item xs={consulta ? 3 : 12}>
                    <TipoPrestador
                        valTipoPrestador={valTipoPrestador}
                        setValTipoPrestador={setValTipoPrestador}
                        setDatos={setDatos}
                        datos={datos}
                        setMostrarFiltroAvanzado={setMostrarFiltroAvanzado}
                    />
                </Grid>
                {valTipoPrestador === 5 ? (
                    <Grid item xs={consulta ? 3 : 12}>
                        <PrestadorMedico
                            valPrestadorMedico={valPrestadorMedico}
                            handleChangePrestadorMedico={handleChangePrestadorMedico}
                        />
                    </Grid>
                ) : null}
                {valTipoPrestador !== 5 ? (
                    <RadioEsPrioridad
                        datos={datos}
                        setDatos={setDatos}
                        consulta={consulta}
                        gridRadio={gridRadio}
                        style={{ marginTop: '15px' }}
                    />
                ) : null}
            </Grid>
                {!mostrarFiltroAvanzado ? (
                    <Grid container justify={'flex-end'} alignItems={'center'} alignContent={'flex-end'} style={{ padding: '10px' }}>
                        <CustomButton
                            label="Ver filtros Avanzados"
                            styleButton={{
                                borderRadius: "5px",
                                backgroundColor: "#f4f4f4",
                                border: "1px solid #d3d3d3",
                                width: "200px",
                                height: "40px",
                            }}
                            startIcon={<img src={filterPlus} />}
                            onClik={handleClickFiltrosAvanzados}
                            referencia={customButtonRef}
                            disabled={!(valTipoPrestador === 5)}
                        />
                    </Grid>
                ):(
                    <Grid container justify={align} alignItems='flex-start' style={{ padding: '10px' }}>
                        <Grid container item xs={9}>
                            <RadioEsPrioridad
                                datos={datos}
                                setDatos={setDatos}
                                consulta={consulta}
                                gridRadio={gridRadio}
                                style={{ marginLeft: '8px', marginTop: '8px', marginRight: '-10px' }}
                                limpiarFiltros={limpiarFiltros}
                                setLimpiarFiltros={setLimpiarFiltros}
                            />
                            <RadioPrestador
                                datos={datos}
                                setDatos={setDatos}
                                consulta={consulta}
                                gridRadio={gridRadio}
                                limpiarFiltros={limpiarFiltros}
                                setLimpiarFiltros={setLimpiarFiltros}
                                comprimirFiltros={mostrarFiltroAvanzado}
                            />
                        </Grid>
                        <Grid container item xs={3} alignItems='flex-end' justify='flex-end'>
                            <CustomButton
                                label="Comprimir"
                                styleButton={{
                                    borderRadius: "5px",
                                    backgroundColor: "#f4f4f4",
                                    border: "1px solid #d3d3d3",
                                    width: "203px",
                                    height: "40px",
                                }}
                                startIcon={<img src={filterMinus} />}
                                onClik={handleClickComprimir}
                            />
                            <CustomButton
                                label="Limpiar filtros"
                                styleButton={{
                                    marginTop: "5px",
                                    borderRadius: "5px",
                                    backgroundColor: "#d3d3d3",
                                    border: "1px solid #d3d3d3",
                                    width: "203px",
                                    height: "40px",
                                }}
                                startIcon={<img src={Restore} />}
                                onClik={handleClickLimpiarFiltro}
                            />
                        </Grid>
                    </Grid>
                )}
        </Grid>
    )
}

export default Filtros