import React from 'react';
import { Avatar, Grid, IconButton, Paper, TablePagination } from "@material-ui/core";
//estilo
import { makeStyles } from '@material-ui/styles';
import CustomButton from "../../commons/Button/CustomButton";
import Loader from "../../commons/Loading/Loader";
import CustomTypography from "../../commons/Typography/CustomTypography";
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
//table-material
import MaterialTable, { MTableAction, MTableToolbar } from "material-table";
import { ICONOS_BUSCADOR, OPCIONES_PAGINACION_5_10_15 } from '../../../Utils/const';

//GUIA DE USO TABLA
//botones de la tabla se pasan el header
//toolbar={true} habilita el toolbar con los botones arriba
//add={true} habilita el boton agregar algo a la tabla
//deleted={true} habilita el boton eliminar en el toolbar , se debe pasar dataselect y setdataselect para que guarde los id a eliminar
//setDataSelect and dataSelect pasan lada data de que filas(identificadas a traves del id se van a borrar)
//selection={true} habilita la seleccion multiple en la tabla...(no se puede poner select 
//y pasar un boton en la tabla desde la tabla como icono porque no lo lee, se debe pasar a traves del header)
//avatar=> pasa un array con el icono redondo de identificacion de colores(con la clase css y el texto)
//colorAvatar={true} habilita el color al lado de cada fila y el array de identificacion de color

const useStyles = makeStyles((theme) => ({
    
    container: {
        width: '100%',
        
        [theme.breakpoints.up('md')]: {
            '& .MuiTableHead-root': {
                display: props => props.open2 ? 'block' : 'table-header-group'
            }
        },
        '& .MuiTableCell-root': {
            padding: '7px',
        }
    },
    toolbar:{
        marginBottom:'10px'
    },
    avatarPrioridad: {
        backgroundColor: props => props.colorAvatar ? '#f29423' : '#747474',
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
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
}))
export const URL_API = process.env.REACT_APP_URL_SERVICIOS;
// PORTS
export const PORT_ESTADO_CIVIL = process.env.REACT_APP_PORT_ESTADO_CIVIL

const CustomTableBuscador = (props) => {
    const { data, setData, columnas, title, toolbar, selection,
        cantTotal, setDataSelect, setPage, page, setRowsPerPage, rowsPerPage,buscadorPage,setBuscadorPage,
        add, labelAdd, iconAdd, loading, dataSelect, onDeleteAction,
        labelDelete, iconDelete, onAddAction,
        setRowConfirm, setRowDataConfirm, deleted, onDeleteRow,
        colorAvatar, avatar, botonesHeader, buscador, handleBuscador, datos, opcionesPaginacion } = props
    const classes = useStyles(props);
    const MyIcon = (props) => (<span {...props}> <ArrowUpwardIcon /> </span>);
    const selectedRow = React.useRef([]);

    //habilita el boton eliminar asignando seleccionando un id del array de filas
    const handleClick = (rows) => {
        let arr = []
        if (rows.length !== 0) {
            rows.forEach(row => {
                if (data[row.tableData.id].id) {
                    arr = [...arr, data[row.tableData.id].id]
                }
            })
        }
        if(setDataSelect){
            setDataSelect(arr)
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

    const Iconos = ICONOS_BUSCADOR

    return (
        <div className={classes.container}>
            <MaterialTable
                
                columns={columnas}
                data={data}
                isLoading={loading ? <Loader loading={loading} /> : false}
                title={title ? <CustomTypography fontweight={'600'} text={title} variant='subtitle1' /> : null}
                components={{
                    Container: props => <Paper {...props} elevation={0} />,

                    Action: props => {
                        //console.log(props, 'props')
                        if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                            return <MTableAction {...props} />
                        }
                        
                    },

                    Toolbar: props => (
                        <>
                            {
                                toolbar ?
                                    <div className={classes.toolbar}>
                                        <Grid container justify='space-between' alignItems='center'>
                                                {/* <Grid item  >
                                                    {buscador && 
                                                        <BuscadorContrataciones
                                                            onClick = {handleBuscador}
                                                            placeholder={'Buscar'}
                                                        />
                                                    }
                                                </Grid> */}
                                                <Grid item >
                                                    {add && botonesHeader && botonesHeader.map(item =>(
                                                        <CustomButton
                                                            styleButton={item && item.styleButton} 
                                                            styleLabel={item && item.styleLabel} 
                                                            startIcon={item && item.startIcon} 
                                                            label={item && item.label} 
                                                            variant= {item && item.variant}
                                                            onClik={item && item.onClick} />
                                                    ))}
                                                </Grid>
                                        </Grid>
                                    </div> 
                                : null
                            }
                        </>),

                    Pagination: props => {
                        const { page: pageActual, rowsPerPage: rowsPerPageActual } = props
                         
                        if (pageActual !== page) {
                            if (setPage ) {
                                
                                setPage( pageActual)
                                
                            }
                        }
                        
                        if (rowsPerPageActual !== rowsPerPage) {
                            if (setRowsPerPage) {
                                setRowsPerPage(rowsPerPageActual)
                            }
                        }
                        return (
                            <div>
                                <Grid container alignItems={'center'} justify={'flex-start'}>
                                    <Grid item container alignItems={'center'} xs={6}>
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
                                   
                                    <Grid item xs={5} style={{height:'10px'}}>
                                        <TablePagination
                                            {...props}
                                            
                                            rowsPerPageOptions={opcionesPaginacion ?? OPCIONES_PAGINACION_5_10_15}
                                            component="div"
                                            count={cantTotal ? cantTotal : 0}
                                            page={page}
                                        />
                                    </Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#f5f5f5', height: '50px', padding: '0 50px', display: 'flex', justifyContent: 'space-between' }}>
                                        {Iconos && Iconos.map((it) => {
                                            return (
                                                <Grid style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <IconButton variant={'contained'} style={{ backgroundColor: it && it.color }} />
                                                    <CustomTypography text={it && it.nombre} variant="body2" />
                                                </Grid>
                                            )
                                        })}
                                    </Grid >
                                </Grid>
                            </div>
                        )
                    }
                }}
                // data={query =>{
                //     if(datos && datos.tipoProveedor){
                //         new Promise((resolve, reject) => {
                //         let url = `${URL_API}${PORT_ESTADO_CIVIL}/grv/proveedor/proveedor`
                //         url += 'per_page=' + query.pageSize
                //         url += '&page=' + (query.page + 1)
                //         fetch(url,{
                //             method: 'POST',
                //             body: JSON.stringify( {
                //                 ...datos,
                //                 "limit": rowsPerPage,
                //                 "offset": (page * rowsPerPage),
                //             }),
                //             headers:{
                //             'Content-Type': 'application/json'
                //             }})
                //             .then(response => response.json())
                //             .then(result => {
                //                 console.log(result,'resultttttt')
                //             resolve({
                //                 data: result.data,
                //                 page: result.page - 1,
                //                 totalCount: result.total,
                //             })
                //             })
                //         }
                //     )}
                //   }}
                icons={{
                    Editar: props => <IconButton className={classes.iconBnt} size="small">
                        <EditIcon htmlColor={'#747474'} />
                    </IconButton>,
                    Delete: props => <IconButton className={classes.iconBnt} size="small">
                        <DeleteOutlineIcon htmlColor={'#747474'} />
                    </IconButton>,
                    Clear: props => <ClearOutlinedIcon htmlColor={'#747474'} />,
                    Check: props => <CheckIcon />,
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
                        emptyDataSourceMessage: 'No hay registros para mostrar'

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
                    sorting: false,
                    search: false,
                    
                    maxBodyHeight: '67vh',
                    pageSize: rowsPerPage,
                    addRowPosition: 'first',
                     tableLayout:'auto',
                    rowStyle: rowData => ({
                        fontSize: '13px',
                        textAlign: 'center',
                        borderLeft: colorAvatar ? ((rowData.esPrioritario) ? '5px solid #f29423' : null)
                            : null
                    }),
                    showTextRowsSelected: false,
                    selection: selection ? true : false,
                    selectionProps: rowData => ({
                        color: 'primary',
                        disabled: checkEnabled(rowData)
                    }),
                    headerStyle: {
                        fontSize: '13px',
                        //wordBreak:'break-all'
                    },
                    padding: 'dense',

                }}
                onSelectionChange={(rows) => handleClick(rows)}
                actions={
                    toolbar && !selection ? null
                        :
                        toolbar ? [
                            {
                                icon: 'Add',
                                tooltip: "Add",
                                isFreeAction: false,
                            }
                        ] : null
                }

                editable={
                    deleted ?
                        {
                            onRowDelete: rowData => onDeletedRowAction(rowData)

                        } : 
                    toolbar ? {
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setData([...data, newData]);
                                    resolve();
                                }, 1000);
                            }
                            )
                    } : null
                }
            />
        </div>
    )
}
export default CustomTableBuscador
