import React, { Fragment, useEffect, useState } from 'react';

//material-ui
import Paper from '@material-ui/core/Paper';
import { Avatar, TablePagination } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
//estilo
import { makeStyles } from '@material-ui/styles';
//componentes
import CustomTypography from '../Typography/CustomTypography';
import CustomButton from '../Button/CustomButton';
import Loader from "../../commons/Loading/Loader";
//table-material
import MaterialTable, { MTableAction, MTableToolbar } from "material-table";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Mensaje from '../../Contrataciones/ProveedorCompleto/General/Tabs/ACtipoProveedor/Acordion/ServicioTraslado/Mensaje';
import CustomAlert from '../CustomAlert/customAlert';
import { eliminarObservaciones } from '../../../redux/actions';

//GUIA DE USO TABLA
//botones de la tabla se pasan el header
//toolbar={true} habilita el toolbar con los botones arriba
//iconAdd habilita el boton de agregar propio de la tabla
//botonesHeader agrega botones a la cabecera...se pasa como un array 
//(agregado buscador(agrega un buscador a la tabla), button, botones, cabecera(un componente que ocupa todo el ancho))
//deleted={true} habilita el boton eliminar en el toolbar , se debe pasar dataselect y setdataselect para que guarde los id a eliminar
//setDataSelect and dataSelect pasan lada data de que filas(identificadas a traves del id se van a borrar)
//selection={true} habilita la seleccion multiple en la tabla...(no se puede poner select 
//y pasar un boton en la tabla desde la tabla como icono porque no lo lee, se debe pasar a traves del header)
//avatar=> pasa un array con el icono redondo de identificacion de colores(con la clase css y el texto)
//colorAvatar={true} habilita el color al lado de cada fila y el array de identificacion de color
const theme = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                "&[mode=add]": {
                    background: "rgba(255, 205, 113, 0.25)",
                    // padding:  '5px',
                    border: '1px dotted #70707073 !important',
                    //margin:'10px'
                    "& .MuiInputBase-root": {
                        width: "90%",
                        height: '50px',
                        border: '1px dotted #707070 !important',
                    },
                },
                "&[mode=update]": {
                    background: "rgba(255, 205, 113, 0.25)",
                    // padding:  '5px',
                    border: '1px dotted #70707073 !important',
                },
            },
        },
        MuiTableCell: {
            root: {
                padding: '0px',

            },
        },
        // MuiIconButton:{
        //     root: {
        //         "&[title=Aceptar]": {
        //            // pointerEvents: 'none',
        //            // opacity:'0.5'
        //         },

        // },
        // },
        MuiInputBase: {

            root: {
                background: 'white',
                // border:  '1px solid #d3d3d3' ,

            }
        }
    },


});
const useStyles = makeStyles((theme) => ({
    tabla: {
        padding: '50px'
    },
    container: {
        [theme.breakpoints.up('md')]: {
            '& .MuiTableHead-root': {
                display: props => props.open2 ? 'block' : 'table-header-group'
            }
        },
        '& .MuiTableCell-root': {
            padding: '3px',
        },


    },
    toolbar: {
        marginBottom: '10px',

    },
    boton: {
        '&& .MTableToolbar-root': {
            padding: '0px'
        }
    },
    avatarPrioridad: {
        backgroundColor: props => props.colorAvatar ? '#f29423' : '#747474',
        width: '18px',
        height: '18px',
        marginLeft: '17px'
    },
    avatarBloqueado: {
        backgroundColor: props => props.colorAvatar ? '#e34850' : '#747474',
        width: '18px',
        height: '18px',
        marginLeft: '17px'
    },
    textoAvatar: {
        fontSize: '15px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.29,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#505050',
        marginLeft: '5px',
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        //backgroundColor:'red',
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    checkTest: {
        pointerEvents: 'none'

    }
}))

const CustomTableContrataciones = (props) => {
    const { data, setData, columnas, title, toolbar, selection,
        cantTotal, setDataSelect, setPage, page, setRowsPerPage, rowsPerPage,
        add, labelAdd, iconAdd, loading, dataSelect, onDeleteAction,
        labelDelete, iconDelete, onAddAction, itemGridAdd,
        setRowConfirm, setRowDataConfirm, deleted, onDeleteRow, styleAdd,
        colorAvatar, avatar, botonesHeader, editarFila, setEditarFila, handleEditar,
        eliminarFila, setEliminarFila, handleDelete, loc, setLoc, codLoc, setNewRow,
        mensaje, setMensaje, pagination, noSorting,  paginationWidth, disableSelection,
        prestacion, setPrestacionesSeleccionadas, prestacionesSeleccionadas, 
        convenios, handleClick3 } = props
        
    const classes = useStyles(props);
    const MyIcon = (props) => (<span {...props}> <ArrowUpwardIcon /> </span>);
    const selectedRow = React.useRef([]);
    const options = ['Editar', 'Eliminar']
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: ''});

    //habilita el boton eliminar asignando seleccionando un id del array de filas:
    const handleClick = (rows) => {
        if (setDataSelect) {
            setDataSelect(rows)
        }
        // let arr = []
        // if (rows.length !== 0) {
        //     rows.forEach(row => {
        //         if (data[row.tableData.id].id) {
        //             arr = [...arr, data[row.tableData.id].id]
        //         }
        //     })
        // }
        // if (setDataSelect) {
        //     setDataSelect(arr)
        // }
        selectedRow.current = rows;
    }
    //handleClick selection prestaciones:
    const handleClick2 = (rows, row) => {
        //mapeo las prestaciones seleccionadas que tienen datos:
        let newSelection = []
        if (rows.length !== 0) {
            rows.forEach(it => {
                if (it.codigo) {
                    newSelection = [...newSelection, it]
                }
            })
        }
        //seteo prestacionesSeleccionadas: 
        if(prestacionesSeleccionadas && setPrestacionesSeleccionadas){
            //caso selecciono una por una
            if((rows.length !== 0 && rows.length !== cantTotal) || ((rows.length === 0 || rows.length === cantTotal) && row !== undefined)){
                if(prestacionesSeleccionadas.filter(it => it.idPrestacion === row.idPrestacion).length === 0){
                    setPrestacionesSeleccionadas([...prestacionesSeleccionadas, row])
                }else{
                    setPrestacionesSeleccionadas(prestacionesSeleccionadas.filter(it => it.idPrestacion !== row.idPrestacion))
                }
            //caso select all
            }else if (rows.length === cantTotal && row === undefined ){
                let array = prestacionesSeleccionadas;
                newSelection.forEach(it => { 
                    if(prestacionesSeleccionadas.filter(p => p.idPrestacion === it.idPrestacion).length === 0){
                        array.push(it)
                    }                    
                })
                setPrestacionesSeleccionadas(array)
            //caso desselect all
            }else if(rows.length === 0 && row === undefined) {
                let array = prestacionesSeleccionadas;
                dataSelect.forEach(it => { 
                    array = array.filter(p => p.idPrestacion !== it.idPrestacion)                    
                })
                setPrestacionesSeleccionadas(array)
            }
        }
        //seteo dataSelect: 
        if (setDataSelect) {
            setDataSelect(newSelection)
        }
        selectedRow.current = rows;
    }
    //habilita el boton de seleccion para que sea visible
    const checkEnabled = (rowData) => {
        return false
    }
    //accion de eliminar una fila por id
    const onDeletedRowAction = (rowData) => {
        return new Promise((resolve, reject) => {
            const dataDelete = [...data];
            const index = rowData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve();
        })
    }
    const onDeletedAction = (event, row) => {
        onDeleteRow(row)
    }
    const HandleAdd = (click) => {
        if (setMensaje) {
            setMensaje(false)
        }
        click()
    }
    const eliminar = (clic) => {
        if (setMensaje) {
            setMensaje(true)
        }
        if (setLoc) {
            setLoc(null)
        }
        if (setNewRow) {
            setNewRow(null)
        }
    }
    const confirmar = (event, clic) => {
        if (event.key === 'Enter') {
            event.stopPropagation()
        }
        if (editarFila) {
            handleEditar()
            setEditarFila(false)
            if (setNewRow) {
                setNewRow(null)
            }
        }
        if (eliminarFila) {
            handleDelete()
            setEliminarFila(false)
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className={classes.container}>
                    <MaterialTable
                        className={classes.root}
                        columns={mensaje && data && data.length < 1 ? [] : columnas}
                        data={mensaje && data && data.length < 1 ? [] : data}
                        isLoading={loading ? <Loader loading={loading} /> : false}
                        title={title ? <CustomTypography fontweight={'600'} text={title} variant='subtitle1' /> : null}
                        components={{

                            Container: props => <Paper {...props} elevation={0} />,

                            Action: props => {
                                if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                                    return <MTableAction {...props} />
                                } else {
                                    return  <div className={classes.boton}>
                                                <Grid container spacing={2} >
                                                    {botonesHeader && iconAdd ? 
                                                        botonesHeader.map(item => (
                                                            item && item.boton1 ? 
                                                                item.boton1.map((bot) => (
                                                                    <Grid item xs={bot.grid}>
                                                                        <CustomButton
                                                                            startIcon={bot.startIcon}
                                                                            label={bot.label}
                                                                            variant='outlined'
                                                                            onClik={bot.click.name !== 'onClickImportar' ? () => HandleAdd(props.action.onClick) : null}
                                                                            styleButton={{ width: bot.width, height: bot.height, }}
                                                                            styleLabel={{ fontSize: bot.fontSize }}
                                                                        />
                                                                    </Grid>
                                                                )) 
                                                                : null
                                                        ))
                                                        : null
                                                    }
                                                </Grid>
                                            </div>
                                }
                            },

                            Toolbar: props => (
                                <>
                                    {
                                        toolbar ?
                                            <div className={classes.toolbar}>
                                                <Grid container justify='space-between' alignItems='center' xs={12}>
                                                    {botonesHeader ? 
                                                        botonesHeader.map(item => (
                                                            <>
                                                                <Grid item xs={item.gridItem}>
                                                                    {item.buscador}
                                                                </Grid>
                                                                <Grid item xs={item.gridItem2}>
                                                                    {item.button ?
                                                                        item.button
                                                                        : iconAdd ?
                                                                            <div style={item.margin ? { marginRight: item.margin } : null}> <MTableToolbar {...props} /> </div>
                                                                            : null
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={12} style={item.cabecera ? { margin: '20px 0px' } : null}>
                                                                    {item.cabecera}
                                                                </Grid>
                                                            </>
                                                        )) 
                                                        : null
                                                    }
                                                </Grid>
                                            </div>
                                            : null
                                    }
                                </>),

                            Pagination: props => {
                                const { page: pageActual, rowsPerPage: rowsPerPageActual } = props
                                if (pageActual !== page) {
                                    if (setPage) {
                                        setPage(pageActual)
                                    }
                                }
                                if (rowsPerPageActual !== rowsPerPage) {
                                    if (setRowsPerPage) {
                                        setRowsPerPage(rowsPerPageActual)
                                    }
                                }
                                return (
                                    <div>
                                        {!mensaje || data && data.length < 1 ?
                                            <Grid container alignItems={'center'} justify={'space-between'}>
                                                <Grid container alignItems={'center'} item xs={paginationWidth ? 4 : 6}>
                                                    {colorAvatar ?
                                                        avatar && avatar.map((it) => (
                                                            <>
                                                                <Grid item>
                                                                    <Avatar className={classes[it && it.claseAvatar]}> </Avatar>
                                                                </Grid>
                                                                <Grid item>
                                                                    <CustomTypography className={classes[it && it.clase]} text={it && it.textoRedondo} />
                                                                </Grid>
                                                            </>
                                                        )) : null}

                                                </Grid>
                                                <Grid item xs={paginationWidth ? 8 : 6} >
                                                    <TablePagination
                                                        {...props}
                                                        rowsPerPageOptions={[5, 10, 15]}
                                                        component="div"
                                                        count={cantTotal ? cantTotal : 0}
                                                        page={page}
                                                    />
                                                </Grid>
                                            </Grid> 
                                            : null
                                        }
                                    </div>
                                )
                            }
                        }}
                        icons={{
                            Editar: props => <IconButton className={classes.iconBnt} size="small">
                                                <EditIcon htmlColor={'#747474'} /></IconButton>,
                            Delete: props => <IconButton className={classes.iconBnt} size="small">
                                                <DeleteOutlineIcon htmlColor={'#747474'} /></IconButton>,
                            Clear: props => <IconButton onClick={(props => eliminar(props))}>
                                                <ClearOutlinedIcon htmlColor={'#747474'} /></IconButton>,
                            Check: props => <IconButton onClick={((event, props) => confirmar(event, props))}>
                                                <CheckIcon /></IconButton>,
                            Search: props => <SearchIcon />,
                            ResetSearch: props => <DeleteOutlineIcon htmlColor={'#747474'} />,
                            LastPage: props => <LastPageIcon />,
                            FirstPage: props => <FirstPageIcon />,
                            NextPage: props => <KeyboardArrowRight />,
                            PreviousPage: props => <KeyboardArrowLeft />,
                            SortArrow: React.forwardRef((props, ref) => (
                                <MyIcon {...props} ref={ref} />
                            ))
                        }}
                        localization={{
                            toolbar: {
                                searchPlaceholder: 'Buscar',
                                searchTooltip: 'Buscar',
                            },
                            header: {
                                actions: 'ACCIONES'
                            },
                            body: {
                                editRow: {
                                    //deleteText: 'Voulez-vous supprimer cette ligne?',
                                    cancelTooltip: 'Cancelar',
                                    saveTooltip: 'Aceptar',
                                    deleteText: '¿Está seguro que desea eliminar esta fila?'
                                },
                                editTooltip: 'Editar',
                                deleteTooltip: 'Eliminar',
                                emptyDataSourceMessage: mensaje && data && data.length < 1 ? 
                                    <Mensaje textoMensaje='No hay convenios de traslados agregados.' />
                                    : 'No hay registros para mostrar'
                            },
                            pagination: {
                                labelDisplayedRows: `{from}-{to} de {count}`,
                                labelRowsSelect: 'filas',
                                labelRowsPerPage: 'filas por página:',
                                firstAriaLabel: 'Primer página',
                                firstTooltip: 'Primer página',
                                previousAriaLabel: 'Página previa',
                                previousTooltip: 'Página previa',
                                nextAriaLabel: 'Página siguiente',
                                nextTooltip: 'Página siguiente',
                                lastAriaLabel: 'Última pagina',
                                lastTooltip: 'Última página',
                            },
                        }}
                        options={{
                            actionsColumnIndex: -1,
                            searchFieldStyle: { maxWidth: '190px' },
                            sorting: noSorting ? false : true,
                            search: false,
                            pageSize: rowsPerPage,
                            paging: pagination,
                            //exportButton : true,
                            addRowPosition: 'first',
                            //tableLayout:'fixed',
                            rowStyle: rowData => ({
                                fontSize: '13px',
                                textAlign: 'center',
                                borderLeft: rowData.bloqueado ? '5px solid #e34850' : colorAvatar ? ((rowData.prioritario === 1 || (rowData.tieneCostosExtras)) ? '5px solid #f29423' : null) : null,
                                //wordBreak:'break-word'
                            }),
                            showTextRowsSelected: false,
                            selection: selection ? true : false,
                            selectionProps: rowData => ({
                                color: 'primary',
                                disabled: disableSelection ? rowData.disableSelection : checkEnabled(rowData)
                            }),
                            headerStyle: {
                                fontSize: '13px',
                                //wordBreak:'break-all'
                            },
                            padding: 'dense',
                        }}
                        onSelectionChange={(rows, row) => {
                            prestacion ? handleClick2(rows, row) : convenios ? handleClick3(rows, row) : handleClick(rows)
                        }}
                        actions={
                            toolbar && !selection ? 
                                null
                                : toolbar ? 
                                    [{
                                        icon: 'Add',
                                        tooltip: "Add",
                                        isFreeAction: false,
                                    }] 
                                    : null
                        }
                        editable={
                            deleted ?
                                {onRowDelete: rowData => onDeletedRowAction(rowData)} 
                            : 
                                //null,
                            toolbar ? 
                                {onRowAdd: newData => (
                                    //     (loc && loc.descripcion !==undefined) ?  
                                    // handleAddLoc(newData)
                                    //:
                                    (newData !== {} && (
                                        (newData.cuit !== undefined || newData.cbu !== undefined
                                            || newData.sucursal !== undefined || newData.banco !== undefined
                                        ) || (loc !== null && loc !== undefined)
                                    )) ?
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {

                                                setData(dataAnterior => {
                                                    return (
                                                        {
                                                            cantidad: dataAnterior.cantidad + 1,
                                                            //data:  [...dataAnterior.data, {idLocalidad: loc && loc.codigo, localidadProvincia:loc && loc.descripcion}] 
                                                            data: (loc !== null && loc !== undefined) ? dataAnterior.data && [...dataAnterior.data, { idLocalidad: codLoc, localidadProvincia: loc }] : dataAnterior.data && [...dataAnterior.data, newData]
                                                        }
                                                    )
                                                })
                                                if (loc) {
                                                    setLoc(null)
                                                }
                                                resolve();
                                            }, 1000);
                                        })
                                        //) 
                                        :
                                        new Promise((resolve, reject) => {
                                            setData(dataAnterior => {
                                                return (
                                                    {
                                                        cantidad: dataAnterior.cantidad + 1,
                                                        data: dataAnterior.data && [...dataAnterior.data]
                                                    }
                                                )
                                            })
                                            reject();
                                            setOpenSnackBar({
                                                open: true,
                                                severity: "error",
                                                title: "No es posible llevar a cabo la acción. Se debe completar al menos un campo.",
                                            })
                                        })),
                                    // onRowUpdate: (newData, oldData) =>
                                    // new Promise((resolve, reject) => {
                                    //   setTimeout(() => {
                                    //     console.log("old data: ", oldData);
                                    //     const dataUpdate = [...data];
                                    //     const index = oldData.tableData.id;
                                    //     dataUpdate[index] = newData;
                                    //     //setData([...dataUpdate]);
                                    //     setData({...data,data:[...dataUpdate]})
                                    //     handleEditar(newData,oldData)
                                    //     resolve();
                                    //   }, 1000);
                                    // }),
                                    // onRowUpdate: (newData, oldData) => (
                                    //  new Promise((resolve, reject) => {
                                    //   setTimeout(() => {
                                    //     const dataUpdate = [...data];
                                    //     const index = oldData.tableData.id;
                                    //     dataUpdate[index] = newData;
                                    //     setData({cantidad:oldData.cantidad, data: [...dataUpdate]});
                                    //     resolve();
                                    //   }, 1000);
                                    // })),
                                    //  HandleEditar(newData, oldData)
                                    //  )
                                } 
                            : null
                        }
                    />
                </div>
            </ThemeProvider>
            <CustomAlert
                message={openSnackBar.title}
                onClose={handleClose}
                variant={'filled'}
                severity={openSnackBar.severity}
                open={openSnackBar.open}
                snack={true}
            />
        </>
    )
}
export default CustomTableContrataciones