import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index';
//material-ui
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ClearIcon from '@material-ui/icons/Clear';
import TablePagination from '@material-ui/core/TablePagination';
//estilo
import { makeStyles } from '@material-ui/core/styles';
//componentes
import CustomTypography from '../../commons/Typography/CustomTypography';
import { MENSAJE_DRAWER_TRASLADO_IDA, PAGE_SIZE_AGENCIAS } from '../../../Utils/const'
import CustomChip from '../../commons/Chip/CustomChip';
import CustomText from '../../commons/TextField/CustomText';
import ProveedorTraslados from '../../Autosuggest/proveedorTraslados';
import CustomSwitch from '../../commons/CustomSwitch/customSwitch';

const useStyles = makeStyles((theme) => ({
    cuadro: {
        border: '2px solid #1473e6',
        margin: '10px'
    },
    cuadroDisabled: {
        border: '1px solid #eaeaea',
        margin: '10px'
    },
    cuadroMail: {
        border: '1px solid #eaeaea',
        height: '100px'
    }
}))

const IdaPaso3 = (props) => {
    const classes = useStyles(props);
    const { tipoTraslado, sectorTraslado, idaYvuelta, idTipoTraslado, setRequest, request, denuncia,
            soloCarga } = props
    const [valueAutoSuggest, setValueAutoSuggest] = useState('');
    const [seleccionado, setSeleccionado] = useState(false)
    const [valueOtroMail1, setValueOtroMail1] = useState('')
    const [valueAsuntoMail, setValueAsuntoMail] = useState(tipoTraslado ? 'Pedido servicio ambulancia' : 'Pedido servicios remises')
    const [chipData, setChipData] = useState()
    const [indexMail, setIndexMail] = useState(null)
    const [valueProveedor, setValueProveedor] = useState(null)
    const [dataProveedor, setDataProveedor] = useState(null)
    const [page, setPage] = useState(0)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.traslados.loading)
    const agenciasTraslados = useSelector(state => state.traslados.agenciasTraslados.objetos)
    const cantTotal = useSelector(state => state.traslados.agenciasTraslados ? state.traslados.agenciasTraslados.cantidadTotal : 0)
    const [newServices, setNewServicies] = useState([])

    useEffect(() => {
        buscarAgencias()
    }, [])

    const buscarAgencias = () => {
        let request = {
            idTipoTraslado: idTipoTraslado,
            limit: PAGE_SIZE_AGENCIAS,
            offset: (page * PAGE_SIZE_AGENCIAS),
        }
        dispatch(actions.fetchAgenciasTraslado(request));
    }

    useEffect(() => {
        if(valueProveedor === null && !soloCarga){
            let list = []
            for (var i in agenciasTraslados) {
                const exisServices = newServices.some(s => s.codigo === agenciasTraslados[i].codigo)
                const index = newServices.findIndex(t => t.codigo === agenciasTraslados[i].codigo)
                let clone;
                if(exisServices){
                    clone = {
                        ...newServices[index],
                        checked: true
                    }
                }else{
                    clone = {
                        ...agenciasTraslados[i],
                        checked: false
                    }
                }
                list.push(clone);
            }
            setChipData(list)
        }
    }, [agenciasTraslados, valueProveedor])

    useEffect(() => {
        if(!seleccionado){
            setValueProveedor(null)
        }
    }, [seleccionado])

    useEffect(() => {
        getServicios()
    }, [newServices])

    const verificarServicios = (servicio) =>{
        const exisServices = newServices.some(s => s.codigo === servicio.codigo);
        if(exisServices){
            let listServices = [];
            for (var i in newServices) {
               if(newServices[i].codigo !== servicio.codigo){
                   listServices.push(newServices[i]);
               }
            }
        setNewServicies(listServices)
        }else{
            setNewServicies([...newServices, { ...servicio, checked: !servicio.checked }])
        }
    }

    const handleChangeSwitch1 = (indexRow) => {
        setChipData(chipData.map((it, index) => {
            if (index === indexRow) {
                verificarServicios(it);
                return (
                    { ...it, checked: !it.checked }
                )
            } else {
                return (
                    { ...it }
                )
            }
        }))
    }
    const getServicios = () => {
        let list = []
        for (var i in newServices) {
            const item = newServices[i]
            let clone = { codigo: item.codigo, emails: item.emails }
            list.push(clone);
        }
        setRequest({
            ...request,
            servicios: list
        })
    }
    
    const onChangeValueOtroMail1 = (event, indexMail) => {
        setIndexMail(indexMail)
        setValueOtroMail1(event.target.value)
    }

    const onDeleteChip = (chipToDelete, index1, indexRow) => {
        setChipData(chipData && chipData.length>0 && chipData.map((it, index2) => {
            if (indexRow === index2) {
                setNewServicies(newServices.map(s =>{
                    if(s.codigo === it.codigo){
                        return(
                        { ...s, emails: s.emails.filter((chip, index) => index !== index1) }
                        )
                    }else{
                        return { ...s }
                    }
                }))
                return ({ ...it, emails: it.emails.filter((chip, index) => index !== index1) })
            } else {
                return { ...it }
            }
        }))
    }
    const onkey = (event, indexMail, mail2) => {
        if (event.keyCode === 13) {  //checks whether the pressed key is "Enter"

            setChipData(chipData.map((it, index) => {
                if (index === indexMail) {
                    setNewServicies(newServices.map(s =>{
                        if(s.codigo === it.codigo){
                            return(
                            { ...s, emails: [...s.emails, valueOtroMail1] }
                            )
                        }else{
                            return { ...s }
                        }
                    }))
                    return (
                        { ...it, emails: [...it.emails ? it.emails : [], valueOtroMail1] }
                    )
                } else {
                    return { ...it }
                }
            }))
            setValueOtroMail1('')
        }
    }
    
    const handleChange = (event, newPage) => {
        setPage(newPage)
    }

    useEffect(() => {
        buscarAgencias();
    }, [page])

    useEffect(() => {
        if (valueProveedor !== null) {
            let prov = dataProveedor && dataProveedor.filter(it => it.descripcion === valueProveedor)
           // let chipData2 = [...chipData];
            let list = []
            if (prov && prov.length > 0) {
                const exisServices = newServices.some(s => s.descripcion === prov[0].descripcion)
                const index = newServices.findIndex(t => t.descripcion === prov[0].descripcion)
                if(exisServices){
                    const item = newServices[index]
                    let clone1 = { codigo: item.codigo, descripcion: item.descripcion, emails: item.emails, checked: item.checked }
                    list.push(clone1);
                }else{
                    let item = prov[0]
                    let clone1 = { codigo: item.codigo, descripcion: item.descripcion, emails: item.emails, checked: true }
                    list.push(clone1);
                    setNewServicies(data => [...data, clone1 ])
                }
            }

            setChipData(list)
        }
    }, [valueProveedor])

    return (
        <Grid container alignItems='flex-end' spacing={2}>
            <Grid item xs={12}>
                <CustomTypography
                    text = {<strong> Reserva traslado </strong>}
                    variant = {'subtitle1'} />
            </Grid>
            <Grid item xs={12}>
                <CustomTypography
                    text = {MENSAJE_DRAWER_TRASLADO_IDA}
                    variant = {'subtitle2'} />
            </Grid>
            <Grid item xs={6}>
                <ProveedorTraslados
                    valueProveedor = {valueProveedor}
                    setValueProveedor = {setValueProveedor}
                    denuncia = {denuncia}
                    setDataProveedor = {setDataProveedor}
                    idTipoTraslado = {idTipoTraslado}
                    seleccionado = {seleccionado}
                    setSeleccionado = {setSeleccionado} />
            </Grid>
            <>
            
            {

                chipData && chipData.map((it, indexRow) => (
                    <>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control = {<CustomSwitch
                                checkedSwitch = {it.checked}
                                handleChangeSwitch = {() => handleChangeSwitch1(indexRow)}
                                nameSwitch = {it.descripcion} />}
                            label = {it.descripcion}

                        />
                    </Grid>
                    {!soloCarga?
                    <Grid container xs={12} spacing={2} className={it.checked ? classes.cuadro : classes.cuadroDisabled} alignItems='flex-end'>
                        <Grid item xs={12}>
                            <CustomTypography
                                text = {'Mails destinatarios'}
                                variant = {'body2'} />
                        </Grid>

                        {it && it.emails && it.emails.map((mail1, index) => (
                            <>
                                <Grid item xs={5} >
                                    <Grid item>
                                        <CustomChip
                                            disabled = {!it.checked}
                                            label = {mail1}
                                            fontSize = {true}
                                            variant = {'body2'}
                                            icon = {<ClearIcon />}
                                            handleDelete = {() => onDeleteChip(mail1, index, indexRow)} />
                                    </Grid>
                                </Grid>
                            </>
                            ))}
                            <Grid item xs={4}>
                            <CustomText
                                disabled = {!it.checked}
                                label = {'Agregar otro mail'}
                                value = {indexMail === indexRow ? valueOtroMail1 : null}
                                id = {indexRow}
                                shrink = {true}
                                onKey = {(event) => indexMail === indexRow ? onkey(event, indexRow) : null}
                                fullwidth = {true}
                                onChange = {(event) => onChangeValueOtroMail1(event, indexRow, it)} />
                        </Grid>
                    </Grid>
                    : null}
                    </>

                ))

            }
                <Grid item xs={12} >
                {valueProveedor === null ?
                    <TablePagination
                        count = {cantTotal}
                        rowsPerPage = {PAGE_SIZE_AGENCIAS}
                        rowsPerPageOptions = {[]}
                        page = {page}
                        SelectProps = {{
                            inputProps: {
                                'aria-label': 'Filas',
                            },
                            native: true,
                        }}
                        labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
                        onChangePage = {handleChange}
                    />
                :null
                }
            </Grid>
            </>
        </Grid>
    )
}
IdaPaso3.propTypes = {
    tipoTraslado: PropTypes.any,
    sectorTraslado: PropTypes.any,
    idaYvuelta: PropTypes.any
};
export default IdaPaso3
