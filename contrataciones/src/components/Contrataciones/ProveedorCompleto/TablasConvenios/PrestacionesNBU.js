import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Material:
import { CircularProgress, Divider, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//Components:
import CustomButton from '../../../commons/Button/CustomButton'
import TablasConvenio from '../TablasConvenios/TablasConvenio'
import Utils from '../../../../Utils/utils'

const useStyles = makeStyles(() => ({
    step1Box: {
        minHeigh: '300px',
        border: '1px solid grey',
        borderRadius: '10px',
        padding: '20px 25px',
    }
}))


const PrestacionesNBU = props => {
    const { setDrawerNro, valorNBU, seleccion, setSeleccion, proveedor, dataConvenio } = props
    const classes = useStyles()
    //Redux:
    const dispatch = useDispatch()
    const dataBack = useSelector(state => state.convenio.pnbu)
    const errorDataBack = useSelector(state => state.convenio.errorPNBU)
    const request = useSelector(state => state.convenio.request)
    const setAllPreQx = useSelector(state => state.convenio.request && state.convenio.request.marcarPrQxTodasNBU)
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    const [criterioBusqueda, setCriterioBusqueda] = useState("")
    //Tabla:
    const [disableAplicar, setDisableAplicar] = useState(true)
    const [data, setData] = useState(null)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [loadingTabla, setLoadingTabla] = useState(true)
    const [loadingComponent, setLoadingComponent] = useState(true)
    //steper:
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [valueNBU, setValueNBU] = useState(valorNBU ? valorNBU : '')
    const [errorValueNBU, setErrorValueNBU] = useState(false)


    //Hay valor NBU?
    useEffect(() => {
        if (valorNBU === '') {
            setStep1(true)
            setLoadingComponent(false)
            setLoadingTabla(false)
        }
        if (seleccion && seleccion.pnbu && seleccion.pnbu.length > 0) {
            setSeleccion({ ...seleccion, pnbu: [] })
        }
    }, [])


    //Llama a la DB:
    useEffect(() => {
        if (request && request.valorNBU === 0) {
            setStep1(true)
            setValueNBU('')
        } else {
            setLoadingTabla(true)
            dispatch(actions.getPNBUConvenio({
                "idConvenio": null,
                "idProveedor": proveedor.idProveedor,
                "criterioBusqueda": criterioBusqueda !== "" ? criterioBusqueda : "",
                "limit": rowsPerPage,
                "offset": page * rowsPerPage
            }))
        }
    }, [page, rowsPerPage, request, criterioBusqueda])


    //Cuando se deja de usar NBU:
    useEffect(() => {
        if (request && !request.valorNBU && request.valorNBU === '') {
            setValueNBU('')
            setStep1(true)
        }
    }, [request])


    //Procesa dataBack & request.prestacionesNBU
    useEffect(() => {

        //Asigno dataRequest segun criteriode búsqueda o no
        let dataRequest;
        if (criterioBusqueda) {
            if (request && request.prestacionesNBU && request.prestacionesNBU.length > 0) {
                dataRequest = request.prestacionesNBU.filter(it => {
                    if ((it.codigo && it.codigo.toLowerCase().includes(criterioBusqueda.toLowerCase())) ||
                        (it.descripcion && it.descripcion.toLowerCase().includes(criterioBusqueda.toLowerCase()))) {
                        return it
                    }
                })
            }
        } else {
            if (request && request.prestacionesNBU && request.prestacionesNBU.length > 0) {
                dataRequest = request.prestacionesNBU
            }
        }

        if ((dataBack && dataBack.objetos) || dataRequest) {
            setLoadingTabla(true)

            let dimension = rowsPerPage * page
            let tempCantidad = dataBack.cantidadTotal

            let dataRellenar = [];
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }

            let dataApi = []
            dataBack && dataBack.objetos && dataBack.objetos.forEach(dato => {
                let presRepe = dataRequest && dataRequest.length > 0 && dataRequest.filter(it => it.idPrestacion === dato.idPrestacion)[0]
                if (presRepe) { dataApi.push(presRepe) }
                else { dataApi.push({ ...dato, esPrQx: Utils.calcularPrQx(2, dato, request) }) }
            })

            let dataRestante = [];
            let lengthData = dataRellenar.length + dataApi.length
            if (lengthData < tempCantidad) {
                for (let index = lengthData; index < tempCantidad; index++) {
                    dataRestante.push({})
                }
            }

            setData({
                objetos: [...dataRellenar, ...dataApi, ...dataRestante],
                cantidadTotal: tempCantidad
            })
        } else {
            setData({ objetos: [], cantidadTotal: 0 })
        }
    }, [dataBack, request])


    //Cambia Loading a FALSE al procesar la data. 
    useEffect(() => {
        if (data && data.objetos && data.objetos.length > 0) {
            setLoadingComponent(false)
            setLoadingTabla(false)
        } else {
            if (criterioBusqueda) {
                setLoadingTabla(false)
                setLoadingComponent(false)
            }
        }
    }, [data])

    useEffect(() => {
        if (errorValueNBU) {
            setDisableAplicar(true)
        }
    }, [errorValueNBU])


    //Acciones NBU:
    const handleIngresarValorNBU = () => {
        setStep1(false)
        setStep2(true)
    }
    const handleCancelarValorNBU = () => {
        setStep2(false)
        setStep1(true)
    }
    const handleAplicarValorNBU = () => {
        if (!dataBack) {
            setLoadingComponent(true)
            dispatch(actions.getPNBUConvenio({
                "idConvenio": convenioActual && convenioActual.idConvenio ? convenioActual.idConvenio : null,
                "limit": rowsPerPage,
                "offset": page
            }))
        }
        setLoadingComponent(true)
        setStep1(false)
        setStep2(false)
        dispatch(actions.setRequestConvenio({ ...request, valorNBU: valueNBU }))
    }
    const onChangeValueNBU = (e) => {
        var regEx1 = /^([0-9]{1,4}\.?)$/
        var regEx2 = /^([0-9]{1,4}(\.[0-9]{1,2})?)$/
        var regEx3 = /^([0-9]{1,4}\.)$/

        if (!isNaN(e.target.value) && !e.target.value.includes(' ') && (regEx1.test(e.target.value) || regEx2.test(e.target.value) || e.target.value === '')) {
            setValueNBU(e.target.value)
            setDisableAplicar(false)
            if (regEx3.test(e.target.value)) { setErrorValueNBU(true) }
            else { setErrorValueNBU(false) }
        }
        if (e.target.value === '') {
            setErrorValueNBU(true)
            setValueNBU(e.target.value)
        }

        if (!isNaN(e.target.value) && e.target.value.includes(".")) {
            let string = e.target.value.split(".")
            let enteros = string[0].length <= 4;
            let decimales = string[1].length <= 2;
            let decimalesNumeros = regEx1.test(string[1])
            if (enteros && decimales && decimalesNumeros) {
                setValueNBU(e.target.value)
                setDisableAplicar(false)
                setValueNBU(e.target.value)
            } else {
                setValueNBU(e.target.value)
                setErrorValueNBU(false)
                setDisableAplicar(true)
            }
        }

        if (e.target.value === "0" || e.target.value.startsWith("0")) {
            setDisableAplicar(true)
            setErrorValueNBU(true)
        }
    }


    return (
        <>
            {
                loadingComponent ?
                    <Grid container justify='center' alignItems='center' style={{ width: '100%', minHeight: '200px' }}>
                        <CircularProgress color="primary" />
                    </Grid>
                    : step1 ?
                        <Grid container xs={12} justify='center' alignItems='center' style={{ height: '250px' }}>
                            <Grid xs={4} className={classes.step1Box}>
                                <Typography style={{ fontWeight: '600', fontSize: '15px' }}>Prestaciones NBU</Typography>
                                <Divider style={{ color: 'grey', margin: '10px 0' }} />
                                <Typography style={{ fontSize: '14px', margin: '0 0 40px 0' }}>No hay registros para mostrar.</Typography>
                                <Grid xs={12} container justify='flex-end'>
                                    <CustomButton
                                        label='Ingresar valor NBU'
                                        variant='contained'
                                        color='primary'
                                        size='small'
                                        onClik={handleIngresarValorNBU}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        : step2 ?
                            <Grid container xs={12} justify='center' alignItems='center' style={{ height: '250px' }}>
                                <Grid xs={4} className={classes.step1Box}>
                                    <Typography style={{ fontWeight: '600', fontSize: '15px' }}>Prestaciones NBU</Typography>
                                    <Divider style={{ color: 'grey', margin: '10px 0' }} />
                                    <Typography style={{ fontSize: '14px', margin: '0 0 10px 0' }}>
                                        El valor se aplica a TODAS las prácticas NBU del convenio actual.
                                    </Typography>
                                    <TextField
                                        label='Valor NBU'
                                        type='text'
                                        placeholder='0.00'
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => onChangeValueNBU(e)}
                                        value={valueNBU}
                                        error={errorValueNBU}
                                        style={{ margin: '0 0 40px 0' }}
                                        className={classes.sinArrows}
                                    />
                                    <Grid xs={12} container justify='flex-end' spacing={1}>
                                        <Grid item>
                                            <CustomButton
                                                label='Cancelar'
                                                variant='outlined'
                                                size='small'
                                                onClik={handleCancelarValorNBU}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CustomButton
                                                label='Aplicar'
                                                variant='contained'
                                                color='primary'
                                                size='small'
                                                onClik={handleAplicarValorNBU}
                                                disabled={disableAplicar}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            <TablasConvenio
                                data={data}
                                setDrawerNro={setDrawerNro}
                                esEditar={true}
                                pnbu={true}
                                valueNBU={valueNBU}
                                setValueNBU={setValueNBU}
                                seleccion={seleccion} setSeleccion={setSeleccion}
                                page={page}
                                setPage={setPage}
                                rowsPerPage={rowsPerPage}
                                setRowsPerPage={setRowsPerPage}
                                loadingDataTabla={loadingTabla}
                                errorDataTabla={errorDataBack}
                                criterioBusqueda={criterioBusqueda}
                                setCriterioBusqueda={setCriterioBusqueda}
                                convenioHistorico={dataConvenio}
                            />
            }
        </>
    )
}

export default PrestacionesNBU