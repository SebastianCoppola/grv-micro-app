import React, { useState } from 'react'
//estilos
import { makeStyles } from "@material-ui/core/styles";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { Grid, InputBase } from '@material-ui/core'
import CustomTableContrataciones from "../../../../../../../commons/Table/CustomTableContrataciones";
import IconButtonMenu from '../../../../../../../commons/Menu/IconButtonMenu';
import AddIcon from '@material-ui/icons/Add';
import CustomCheck from '../../../../../../../commons/CustomCheck/CustomChek';
import HeaderTablaHoteles from './HeaderTablaHoteles';
import { useEffect } from 'react';
import CustomButton from '../../../../../../../commons/Button/CustomButton';



const useStyles = makeStyles((theme) => ({
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '2px'
    },
    root: {
        flex: 1,
        border: '1px solid #d3d3d3',
        borderRadius: '5px',
        '&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            appearance: ' none',
            margin: 0,
        },
        '&.MuiInputBase-root': {
            fontSize: '13px'
        }
    },
    focused: {
        border: '2px solid #378ef0',
        borderRadius: '5px'
    },
    cell: {
        color: '#505050', fontSize: '14px',
    }
}));

const TablaHoteles = (props) => {
    const { 
        proveedorSeleccionado, 
        tiposActuales, setTiposActuales, 
        conConvenio, setConConvenio,
        valorLavanderia, setValorLavanderia,
        valorPensionCompleta, setValorPensionCompleta,
        valorHabitacionSimple, setValorHabitacionSimple,
        valorHabitacionDoble, setValorHabitacionDoble,
        valorHabitacionTriple, setValorHabitacionTriple,
        valorHabitacionCuadruple, setValorHabitacionCuadruple,
        dataListado, setDataListado } = props
    const classes = useStyles(props);
    //const options = ['Editar', 'Eliminar']
    const options = ['Eliminar']
    const [editarFila, setEditarFila] = React.useState(false)
    const [eliminarFila, setEliminarFila] = React.useState(false)
    const [modoEdicion, setModoEdicion] = useState(null)
    const [selectRow, setSelectRow] = useState(null)
    const [openConfirmacion, setOpenConfirmacion] = useState(true);
    const [newRow2, setRow2] = useState()
    const [rowEliminada, setRowEliminada] = React.useState()
    const [oldData2, setOldData2] = useState()
    let cbu = ""
    let cuit = ""
    let sucursal = ""
    let banco = ""
    const [dataBanco, setDataBanco] = useState({})

    useEffect(() => setDataBanco({
        cantidad: 0,
        data: dataListado ? dataListado : []
    }), [dataListado])

    //useEffect para agregar datoBancario a la request:
    useEffect(()=>{
        if(dataBanco && dataBanco.data && dataBanco.cantidad){
            let dataRequest = [];
            if(tiposActuales && tiposActuales.proveedorHotelDTO && tiposActuales.proveedorHotelDTO.datoBancario){
                dataRequest = tiposActuales.proveedorHotelDTO.datoBancario;
            }
            dataBanco.data.map(datoTabla => {
                let datoRepe = dataRequest && dataRequest.filter(datoReq => datoReq.cbu == datoTabla.cbu);
                if(datoRepe.length === 0){
                    dataRequest.push({...datoTabla, eliminar: false})
                }
            })
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorHotelDTO": {
                        ...tiposActuales.proveedorHotelDTO,
                        "datoBancario": dataRequest,
                        //"eliminarRelacion": element.seleccionado
                    }
                })
            })

        } 
    },[dataBanco])

    const onClickItem = (event, row, value) => {
        // if (event.target.value === 0) {
        //     setEditarFila(true)
        //     const newRow = {
        //         ...row, tableData: {
        //             ...row.tableData,
        //             editing: 'update'
        //         }
        //     }
        //     const oldData = dataBanco && dataBanco.data.map((item) => {
        //         if (item.tableData.id === newRow.tableData.id) {
        //             return newRow
        //         } else {
        //             return item
        //         }
        //     })
        //     setOldData2(oldData)
        //     setRow2(newRow)
        //     setDataBanco({ ...dataBanco.data, data: oldData })
        // }
        if (event.target.value === 0) {
            setEliminarFila(true)
            const newRow = {
                ...row, tableData: {
                    ...row.tableData,
                    editing: 'delete'
                }
            }
            const oldData = dataBanco && dataBanco.data.map((item) => {
                if (item.tableData.id === newRow.tableData.id) {
                    return newRow
                } else {
                    return item
                }
            })
            setDataBanco({ ...dataBanco.data, data: oldData })
            setRowEliminada(newRow)
        }
    }

    const validarCampos = (list) => {
        let result = false
        list.forEach(element => {
            if (element === null || element === " ") result = true
        });
        return result
    }

    const [mensaje, setMensaje] = useState(dataBanco && dataBanco.data ? validarCampos(dataBanco.data) : validarCampos([]))

    const handleChangeCBU = (e, props) => {
        props.onChange(e.target.value)
        if ((e.target.value).match(/^[0-9\s]*$/) && e.target.value !== " ") {
            cbu = e.target.value
        }
        if (e.target.value !== " ") {
            setMensaje(false)
        }
    }
    const handleChangeCUIT = (e, props) => {
        props.onChange(e.target.value)
        if ((e.target.value).match(/^[0-9\s]*$/) && e.target.value !== " ") {
            cuit = e.target.value
        }
        if (e.target.value !== " ") {
            setMensaje(false)
        }
    }
    const handleChangeBanco = (e, props) => {
        props.onChange(e.target.value)
        if (e.target.value !== " ") {
            banco = e.target.value
        }
    }
    const handleChangeSucursal = (e, props) => {
        props.onChange(e.target.value)
        if (e.target.value !== " ") {
            sucursal = e.target.value
        }
    }

    const headerTablaListado = [
        {
            title: "CBU", field: "cbu",
            cellStyle: { color: '#505050', fontSize: '12px', padding: '5px', minWidth: editarFila ? '300px' : null },
            headerStyle: { color: '#747474', fontSize: '12px' },
            editComponent: (props,row) => {
                return (
                    <InputBase
                        key={'1'}
                        name={'cbu'}
                        fullWidth={true}
                        type="text"
                        classes={{ root: classes.root, focused: classes.focused }}
                        onChange={(e) => handleChangeCBU(e, props)}
                        value={cbu}
                    />
                )
            },
            render: row => (
                <Grid container alignItems={'center'} >
                    <Grid item >
                        {row.cbu}
                    </Grid>
                </Grid>
            )
        },
        {
            title: "CUIT", field: "cuit",
            cellStyle: { color: '#505050', fontSize: '12px', minWidth: editarFila ? '150px' : null },
            headerStyle: { color: '#747474', fontSize: '12px' },
            editComponent: (props) => {
                return (
                    <InputBase
                        fullWidth={true}
                        key={'2'}
                        //type="checkbox"
                        classes={{ root: classes.root, focused: classes.focused }}
                        onChange={(e) => handleChangeCUIT(e, props)}
                        value={cuit}
                    />
                );
            },
        },
        {
            title: "BANCO", field: "banco",
            cellStyle: { color: '#505050', fontSize: '12px', minWidth: null },
            headerStyle: { color: '#747474', fontSize: '12px' },
            editComponent: (props) => {
                return (
                    <InputBase
                        key={'3'}
                        //type="checkbox"
                        classes={{ root: classes.root, focused: classes.focused }}
                        value={banco}
                        onChange={(e) => handleChangeBanco(e, props)}
                    />
                );
            },
        },
        {
            title: "SUCURSAL", field: "sucursal",
            cellStyle: { color: '#505050', padding: '5px', fontSize: '12px', minWidth: editarFila ? '150px' : null },
            headerStyle: { color: '#747474', fontSize: '12px' },
            editComponent: (props) => {
                return (
                    <InputBase
                        key={'4'}
                        variant='outlined'
                        //type="checkbox"
                        classes={{ root: classes.root, focused: classes.focused }}
                        fullWidth={true}
                        value={sucursal}
                        onChange={(e) => handleChangeSucursal(e, props)}
                    />
                );
            },
            render: row => (
                <Grid container alignItems='center' xs={12} spacing={2}>
                    <Grid item xs={9}> {row.sucursal}</Grid>
                    <Grid item xs={2}>
                        <IconButtonMenu
                            icon={<MoreVertOutlinedIcon style={{ color: '#747474' }} />}
                            className={classes.iconBnt}
                            size="small"
                            options={options}
                            onClickItem={(event) => onClickItem(event, row)} />
                    </Grid>
                </Grid>
            )
        },
    ]
    const agregarDatoBancario = () => {}

    const handleChangeConConvenio = (event) => {
        setConConvenio(!conConvenio)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorHotelDTO": {
                    ...tiposActuales.proveedorHotelDTO,
                    "conConvenio": event.target.checked,
                    //"eliminarRelacion": element.seleccionado
                }
            })
        })
    }
    const botonesHeader = [
        {
            // buscador: <CustomCheck
            //             color='#747474'
            //             checked={conConvenio}
            //             handleChange={handleChangeConConvenio}
            //             texto={'Con convenio'} />,
            // cabecera: conConvenio ?
            //     <HeaderTablaHoteles
            //         data={data}
            //         setData={setData}
            //         proveedorSeleccionado={proveedorSeleccionado}
            //         tiposActuales={tiposActuales} setTiposActuales={setTiposActuales}
            //         proveedorHotelDTO={proveedorHotelDTO} setProveedorHotelDTO={setProveedorHotelDTO}/>
            //     : null,
            boton1: [
                {
                    click: {agregarDatoBancario},
                    startIcon: <AddIcon />,
                    width: '210px',
                    height: '40px',
                    label: 'Agregar dato bancario',
                    variant: "outlined",
                    grid: 3,
                    gridContenedor: 'flex-start',
                    gridTitulo: 6
                }
            ]
        },
    ]

    // const handleEditar = (editar) => {
    //     new Promise((resolve, reject) => {
    //         let newData = {
    //             cuit: cuit !== '' ? cuit : newRow2.cuit,
    //             cbu: cbu !== '' ? cbu : newRow2.cbu,
    //             sucursal: sucursal !== '' ? sucursal : newRow2.sucursal,
    //             banco: banco !== '' ? banco : newRow2.banco
    //         }
    //         const newDataListado = dataBanco && dataBanco.data && dataBanco.data.map((itemNew) => {
    //             if ((itemNew && itemNew.tableData.id) === (newRow2 && newRow2.tableData.id)) {
    //                 return ({ ...newData, tableData: { id: newRow2.tableData.id, editing: undefined } })
    //             } else {
    //                 return (itemNew)
    //             }
    //         })
    //         setDataBanco({ cantidad: dataBanco.cantidad, data: [...newDataListado] })
    //         setOldData2({})
    //         resolve();
    //     })
    // }
    const handleDelete = () => {
        let newData = []
        for (let i = 0; i < dataBanco.data.length; i++) {
            const item = dataBanco.data[i];
            if (item.tableData.id !== rowEliminada.tableData.id) {
                newData.push(item)
            }        
        }
        setDataBanco({ cantidad: newData.length, data: newData })
        
        // "delete: true" en la request:
        let newRequest = [];
        if(tiposActuales && tiposActuales.proveedorHotelDTO && tiposActuales.proveedorHotelDTO.datoBancario){
            let datosBancariosRequest = tiposActuales.proveedorHotelDTO.datoBancario;
            let datoRepe = datosBancariosRequest && datosBancariosRequest.filter(it => it.cbu === rowEliminada.cbu);
            if(datoRepe.length > 0){
                for(let i = 0; i<datosBancariosRequest.length; i++){
                    if(datosBancariosRequest[i].cbu !== rowEliminada.cbu){
                        newRequest.push(datosBancariosRequest[i])
                    }else{
                        newRequest.push({
                                "cbu": rowEliminada.cbu,
                                "cuit": rowEliminada.cuit,
                                "banco": rowEliminada.banco,
                                "sucursal": rowEliminada.sucursal,
                                "eliminar": true
                        })
                    }
                }
            }else{
                newRequest.push(...datosBancariosRequest,{
                    "cbu": rowEliminada.cbu,
                    "cuit": rowEliminada.cuit,
                    "banco": rowEliminada.banco,
                    "sucursal": rowEliminada.sucursal,
                    "eliminar": true
                })
            }
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorHotelDTO": {
                        ...tiposActuales.proveedorHotelDTO,
                        "datoBancario": newRequest,
                        //"eliminarRelacion": element.seleccionado
                    }
                })
            })
        }
    }

    return (
        <Grid container alignItems='center' justify={'center'} spacing={0}>
            <Grid item xs={12} sx={{mb:1500}}>
                <CustomCheck
                //color='#747474'
                checked={conConvenio}
                handleChange={handleChangeConConvenio}
                texto={'Con convenio'} />
                {
                    conConvenio ?
                        <HeaderTablaHoteles
                            proveedorSeleccionado={proveedorSeleccionado}
                            tiposActuales={tiposActuales} setTiposActuales={setTiposActuales}
                            valorLavanderia={valorLavanderia} setValorLavanderia={setValorLavanderia}
                            valorPensionCompleta={valorPensionCompleta} setValorPensionCompleta={setValorPensionCompleta}
                            valorHabitacionSimple={valorHabitacionSimple} setValorHabitacionSimple={setValorHabitacionSimple}
                            valorHabitacionDoble={valorHabitacionDoble} setValorHabitacionDoble={setValorHabitacionDoble}
                            valorHabitacionTriple={valorHabitacionTriple} setValorHabitacionTriple={setValorHabitacionTriple} 
                            valorHabitacionCuadruple={valorHabitacionCuadruple} setValorHabitacionCuadruple={setValorHabitacionCuadruple}
                        />
                        : null
                } 
            </Grid>
            <Grid item xs={12} >
                <CustomTableContrataciones
                    toolbar={true}
                    botonesHeader={botonesHeader}
                    labelAdd='Agregar dato bancario'
                    itemGridAdd={8}
                    iconAdd={<AddIcon />}
                    //data={ dataBanco && dataBanco.data && dataBanco.data.filter(item => item.eliminar && item.eliminar !== true)}
                    data={dataBanco.data}
                    //cantTotal={ dataBanco.data && dataBanco.data.filter(item => item.eliminar !== true).length}
                    cantTotal={dataBanco.cantidad}
                    colorAvatar={false}
                    columnas={headerTablaListado}
                    page={0}
                    setData={setDataBanco}
                    rowsPerPage={5}
                    styleAdd={true}
                    //estiloEditar={true}
                    mensaje={mensaje}
                    setMensaje={setMensaje}
                    //editarFila={editarFila}
                    //setEditarFila={setEditarFila}
                    //handleEditar={handleEditar}
                    confirmarData={newRow2}
                    confirmarDataOld={oldData2}
                    eliminarFila={eliminarFila}
                    setEliminarFila={setEliminarFila}
                    handleDelete={handleDelete}
                   
                />
            </Grid>
        </Grid>
    )
}
export default TablaHoteles

