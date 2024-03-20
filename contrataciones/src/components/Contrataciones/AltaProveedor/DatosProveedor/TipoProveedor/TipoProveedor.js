import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//material-ui
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CustomTypography from '../../../../commons/Typography/CustomTypography';
import CustomChip from '../../../../commons/Chip/CustomChip';
import AvisoSubPrestador from '../../../ProveedorCompleto/General/Tabs/InformacionProveedor/AvisoSubPrestador/AvisoSubPrestador';
import * as action from '../../../../../redux/actions'
import AvisoTraslado from '../../../ProveedorCompleto/General/Tabs/InformacionProveedor/AvisoTraslado/AvisoTraslado';
import { Tooltip, makeStyles } from '@material-ui/core';
import { setProveedorTrasladoActivo } from '../../../../../redux/actions/proveedor';


const useStyles = makeStyles(theme => ({
    customTooltip:{
        backgroundColor:'rgba(47, 97, 213, 0.1)'
    }
}))

const TipoProveedor = (props) => {
    //Props
    const { data, setData,
        subPrestador, borrar,
        setBorrar, proveedorSeleccionado,
        setProveedorSeleccionado, dataTipoProveedor, setProveedorSeleccionadoAlta, proveedorSeleccionadoAlta, datosPreviosSeleccionAlta, setDatosPreviosSelecionAlta } = props
    //Estilos
    const classes = useStyles()
    //Redux
    const reduxDispatch = useDispatch();
    const tiposForChips = useSelector(state => state.listados.tipoPrestadorSelect)  
    
    let datosSeleccionadosAlta = []
    
    
    useEffect(() => {
        if (dataTipoProveedor && setProveedorSeleccionado) {
            setProveedorSeleccionado(dataTipoProveedor)
        }
        if (dataTipoProveedor && setProveedorSeleccionadoAlta) {
            setProveedorSeleccionadoAlta(dataTipoProveedor)
        }
    }, [dataTipoProveedor])

    useEffect(() => {
        if (proveedorSeleccionado) {
            if (data) {
                data && data.idTiposProveedor && data.idTiposProveedor.forEach(id => {
                    proveedorSeleccionado && proveedorSeleccionado.forEach(data => {
                        if (data.codigo === id) {
                            data.seleccionado = true
                        }
                    })
                })
            }
            proveedorSeleccionado && proveedorSeleccionado.map((it) => {
                if (it.seleccionado) {
                    const req = {
                        idProveedor: data && data.idProveedor,
                        idTipoProveedor: it.codigo
                    }
                    reduxDispatch(action.findTiposProveedorDatos(req));
                }
            })
        } else {
            reduxDispatch(action.getListadoTipoPrestadorSelect());
        }
        reduxDispatch(setProveedorTrasladoActivo(null))
    }, [])

    useEffect(() => {
        const idTiposProveedoresDemo = proveedorSeleccionado && proveedorSeleccionado.map(item => {
            if (item.seleccionado === true) {
                return item.codigo
            }
        })
        let idTiposProveedores = idTiposProveedoresDemo && idTiposProveedoresDemo.filter(it => it != undefined)
        setData({ ...data, idTiposProveedor: idTiposProveedores })

        if(proveedorSeleccionado && proveedorSeleccionado[2] && proveedorSeleccionado[2].seleccionado){
            reduxDispatch(setProveedorTrasladoActivo({provedorTrasladoSeleccionado:true}))
        } else {
            reduxDispatch(setProveedorTrasladoActivo({provedorTrasladoSeleccionado : false}))
        }
    }, [proveedorSeleccionado])


    useEffect(() => {
        if (setDatosPreviosSelecionAlta) {
            setDatosPreviosSelecionAlta(tiposForChips)
        }
    }, [tiposForChips])

    useEffect(() => {
        if (datosPreviosSeleccionAlta) {
            datosPreviosSeleccionAlta.forEach(it => {
                if (it.seleccionado === true) {
                    datosSeleccionadosAlta.push(it.codigo)
                }
            })
            setProveedorSeleccionadoAlta(datosSeleccionadosAlta)
        }
        
        if(datosPreviosSeleccionAlta && datosPreviosSeleccionAlta.length>0 && datosPreviosSeleccionAlta[2].seleccionado){
            reduxDispatch(setProveedorTrasladoActivo({provedorTrasladoSeleccionado:true}))
         }
         if (datosPreviosSeleccionAlta && datosPreviosSeleccionAlta.length >0 && !datosPreviosSeleccionAlta[2].seleccionado){
            reduxDispatch(setProveedorTrasladoActivo({provedorTrasladoSeleccionado : false}))
         }
    }, [datosPreviosSeleccionAlta])

    const handleChangeTipoProveedor = (event, descripcion, codigo, seleccionado) => {
        const req = {
            idProveedor: data && data.idProveedor,
            idTipoProveedor: codigo
        }
        if (!seleccionado) {
            reduxDispatch(action.findTiposProveedorDatos(req));
        }
        
        setProveedorSeleccionado(proveedorSeleccionado && proveedorSeleccionado.map((i, index2) => {
           if (i && (codigo === i.codigo)){
                return (
                    { ...i, seleccionado: i.seleccionado === true ? false : true }
                )
            }else if(i.codigo !== codigo && codigo === 3){
                return {...i,seleccionado:false}
            }else {
                return { ...i }
            }
        }))
    }

    const handleChangeTipoProveedor2 = (event, descripcion, codigo, seleccionado) => {
        setDatosPreviosSelecionAlta(datosPreviosSeleccionAlta && datosPreviosSeleccionAlta.map(i => {
            if (i && (codigo === i.codigo)){
                return (
                    { ...i, seleccionado: i.seleccionado === true ? false : true }
                )
            }else if(i.codigo !== codigo && codigo === 3){
                return {...i,seleccionado:false}
            }else {
                return { ...i }
            }
        }))
    }

    useEffect(() => {
        if (!data || data === null) {
            setProveedorSeleccionado(dataTipoProveedor ? dataTipoProveedor : [])
            if (setProveedorSeleccionadoAlta) {
                setProveedorSeleccionadoAlta(dataTipoProveedor ? dataTipoProveedor : [])
            }
        }
    }, [data])

    useEffect(() => {
        setProveedorSeleccionado(dataTipoProveedor)
        if (setProveedorSeleccionadoAlta) {
            setProveedorSeleccionadoAlta(dataTipoProveedor)
        }
    }, [borrar])

    return (

        <Grid container alignItems='center' spacing={3}>
            <Grid item xs={12}>
                <CustomTypography
                    text={'Seleccionar tipo de proveedor *'}
                    variant={'subtitle1'} />
            </Grid>
            <Grid container item spacing={2} xs={12}>
                {proveedorSeleccionado ? proveedorSeleccionado.map((it, index) => {
                    return (
                        <>
                            {
                                it && it.codigo === 3 && proveedorSeleccionado[2].seleccionado ?
                                    <Tooltip title={<AvisoTraslado/>} placement="top" classes={{tooltip:classes.customTooltip}} open={true}>
                                        <Grid item>
                                            <CustomChip
                                                onClick={(event) => handleChangeTipoProveedor(event, it.descripcion, it.codigo, it.seleccionado)}
                                                fontSize={true}
                                                label={it.descripcion}
                                                avatar={<FiberManualRecordIcon />}
                                                style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }} />
                                        </Grid>
                                    </Tooltip>
                                :it && it.codigo !== 11 ?
                                    <Grid item >
                                        <CustomChip
                                            disabled={proveedorSeleccionado[2].seleccionado}
                                            onClick={(event) => handleChangeTipoProveedor(event, it.descripcion, it.codigo, it.seleccionado)}
                                            fontSize={true}
                                            label={it.descripcion}
                                            avatar={<FiberManualRecordIcon />}
                                            style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }} />
                                    </Grid>
                                : it && it.codigo === 11 ?
                                    <Grid item spacing={2} >
                                        <Grid container>
                                            <CustomChip
                                                disabled={proveedorSeleccionado[2].seleccionado}
                                                onClick={(event) => handleChangeTipoProveedor(event, it.descripcion, it.codigo, it.seleccionado)}
                                                fontSize={true}
                                                label={it.descripcion}
                                                avatar={<FiberManualRecordIcon />}
                                                style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                                            />
                                            {proveedorSeleccionado[10].seleccionado === true ?
                                                <Grid item style={{ maxWidth: '200px', marginLeft: '15px' }}>
                                                    <AvisoSubPrestador />
                                                </Grid>
                                            : null}
                                        </Grid>
                                    </Grid>
                                : null
                            }
                        </>
                    )
                }) : datosPreviosSeleccionAlta ? datosPreviosSeleccionAlta.map(it => {
                    return (
                        <>
                            {
                                it && it.codigo === 3 && datosPreviosSeleccionAlta[2].seleccionado ?
                                    <Grid item>
                                        <CustomChip
                                            onClick={(event) => handleChangeTipoProveedor2(event, it.descripcion, it.codigo, it.seleccionado)}
                                            fontSize={true}
                                            label={it.descripcion}
                                            avatar={<FiberManualRecordIcon />}
                                            style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }} />
                                    </Grid>
                                :it && it.codigo !== 11 ?
                                    <Grid item >
                                        <CustomChip
                                            disabled={datosPreviosSeleccionAlta[2].seleccionado}
                                            onClick={(event) => handleChangeTipoProveedor2(event, it.descripcion, it.codigo, it.seleccionado)}
                                            fontSize={true}
                                            label={it.descripcion}
                                            avatar={<FiberManualRecordIcon />}
                                            style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }} />
                                    </Grid>
                                : it && it.codigo === 11 ?
                                    <Grid item spacing={2} >
                                        <Grid container>
                                            <CustomChip
                                                disabled={datosPreviosSeleccionAlta[2].seleccionado}
                                                onClick={(event) => handleChangeTipoProveedor2(event, it.descripcion, it.codigo, it.seleccionado)}
                                                fontSize={true}
                                                label={it.descripcion}
                                                avatar={<FiberManualRecordIcon />}
                                                style={it && it.seleccionado ? { border: '3px solid #1473E6', backgroundColor: 'white' } : { backgroundColor: 'white', border: '1px solid #d3d3d3' }}
                                            />
                                        </Grid>
                                    </Grid>
                                : null
                            }
                        </>
                    )
                }) : null}
            </Grid>
        </Grid>
    )
}
export default TipoProveedor