import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
//utils
import Utils from '../../../Utils/utils'
//material-ui
import Paper from '@material-ui/core/Paper';
import { Avatar, TablePagination } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
import SmsFailedOutlinedIcon from '@material-ui/icons/SmsFailedOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
//estilo
import { makeStyles } from '@material-ui/styles';
//componentes
import CustomTypography from '../Typography/CustomTypography';
import CustomButton from '../Button/CustomButton';
import Loader from "../../commons/Loading/Loader";
//table-material
import MaterialTable, { MTableAction, MTableToolbar } from "material-table";
import { COMPONENT_OBSERVACIONES, COMPONENT_SOLICITUDES_GENERICAS, OPCIONES_PAGINACION_5_10_15 } from '../../../Utils/const'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '&& .element.style': {
            backgroundColor: 'rgba(255, 205, 113, 0.25)'
        },
    },
    color: {
        '&& .MuiTableRow-root': {
            backgroundColor: 'rgba(255, 205, 113, 0.25)',
        }
    },
    button: {
        '&&.MuiIconButton-root:hover': {
            backgroundColor: 'red'
        }
    },
    tipografia: {
        padding: '0px 25px'
    },
    boton: {
        marginLeft: '15px'
    },
    container: {
        [theme.breakpoints.up('md')]: {
            '& .MuiTableHead-root': {
                //  maxWidth: props=> props.open2 ? '1100px': 1200,
                display: props => props.open2 ? 'block' : 'table-header-group',
                position: "sticky"
            }
        },
        '& .MuiTableCell-root': {
            padding: '3px',

        }
    },
    avatarPorVecer: {
        backgroundColor: props => props.vencimiento || props.colorAvatar ? '#f29423' : props.activo ? '#e34850' : '#747474',
        width: '18px',
        height: '18px',
        marginLeft: '17px'
    },
    avatarAdvertencia: {
        backgroundColor: props => props.vencimiento ? '#e34850' : props.activo ? '#747474' : null,
        width: '18px',
        height: '18px',
        marginLeft: '35px'
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
    avatarConsulta: {
        backgroundColor: 'rgba(255, 112, 82, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px',
        marginLeft: '20px'
    },
    avatarReclamo: {
        backgroundColor: 'rgba(47, 97, 213, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px',
        marginLeft: '17px',
    },
    customAvatar: {
        backgroundColor: props => props && props.avatar && props.avatar.length && props.avatar[0] && props.avatar[0].color,
        width: '18px',
        height: '18px',
        borderRadius: '50px',
        marginLeft: '17px',
    },
    customAvatarTexto: {
        fontSize: '13px',
        fontWeight: '700',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: props => props && props.avatar && props.avatar.length && props.avatar[0] && props.avatar[0].color,
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
    boton2: {
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

const CustomTable = props => {
    const { data, setData, columnas, title, toolbar, toolbarAccion, acciones, open2,
        editar, justify, selection, vencimiento,
        textoAvatar1, textoAvatar2, textoAvatar3, textoAvatar4, activo, refConsultaReclamo,
        cantTotal, setDataSelect, setPage, page, setRowsPerPage, rowsPerPage,
        add, labelAdd, iconAdd, loading, dataSelect, onDeleteAction,
        labelDelete, iconDelete, onAddAction, colorAvatar, avatar,
        setRowConfirm, setRowDataConfirm, component, deleted, onDeleteRow, verPaginacion, opcionesPaginacion } = props

    const classes = useStyles(props);
    const addActionRef = useRef();
    const MyIcon = (props) => (<span {...props}> <ArrowUpwardIcon /> </span>);
    const [r1, setR1] = useState(null)
    const selectedRow = React.useRef([]);

    const handleConfirm = (event, row) => {
        setRowDataConfirm(row)
        setRowConfirm(true)
    }

    const handleDeleteRows = () => {
        if (selectedRow.current.length > 0) {
            let _data = [...data];
            selectedRow.current.forEach(rd => {
                _data = _data.filter(t => t.tableData.id !== rd.tableData.id);
            });
            setData(_data);
        }
        selectedRow.current = [];
    }

    const handleClick = (rows) => {
        let arr = []
        if (rows.length !== 0) {
            if (component === COMPONENT_SOLICITUDES_GENERICAS) {
                rows.forEach(row => {
                    if (data[row.tableData.id].gestorIdPersona === null) {
                        arr = [...arr, data[row.tableData.id].idSolicitud]
                    }
                })
            } else
                if (component === COMPONENT_OBSERVACIONES) {
                    rows.forEach(row => {
                        if (data[row.tableData.id].idObservacion) {
                            arr = [...arr, data[row.tableData.id].idObservacion]
                        }
                    })
                }
                else {
                    rows.forEach(row => {
                        if (data[row.tableData.id].responsable === '') {
                            arr = [...arr, data[row.tableData.id].preDenuncia]
                        }
                    })
                }
        }
        setDataSelect(arr)
        selectedRow.current = rows;
    }

    const checkEnabled = (rowData) => {
        if (component === COMPONENT_SOLICITUDES_GENERICAS) {
            if (rowData.gestorIdPersona != null) {
                return true;
            } else {
                return false
            }
        }
        if (component === COMPONENT_OBSERVACIONES) {
            return false
        }
        return rowData.responsable !== ''
    }

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

                        if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                            return <MTableAction {...props} />
                        }

                        if (props.action.icon === 'edit') {
                            return (
                                <IconButton className={classes.iconBnt} size="small">
                                    <EditIcon htmlColor={'#747474'} />
                                </IconButton>
                            )
                        } else {
                            return
                            <div className={classes.boton}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <CustomButton startIcon={iconAdd} label={labelAdd} variant='outlined' onClik={onAddAction ? onAddAction : props.action.onClick} />
                                    </Grid>
                                    {labelDelete ? <Grid item>
                                        <CustomButton startIcon={iconDelete} onClik={onDeleteAction} label={labelDelete} disabled={dataSelect.length === 0 ? true : false} variant='outlined' />
                                    </Grid> : null}
                                </Grid>
                            </div>
                        }
                    },

                    Toolbar: props => (
                        <>
                            {toolbar ?
                                <div>
                                    <MTableToolbar {...props} />
                                </div>
                                : null}
                        </>
                    ),

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
                                <Grid container alignItems={'center'} justify={'space-between'}>
                                    <Grid container alignItems={'center'} item xs={6}>
                                        {refConsultaReclamo ?
                                            <>
                                                <Grid item>
                                                    <SmsOutlinedIcon htmlColor={'#2f61d5'} className={classes.avatarReclamo} />
                                                </Grid>
                                                <Grid item>
                                                    <CustomTypography className={classes.textoAvatar} text={textoAvatar1} />
                                                </Grid>
                                                <Grid item>
                                                    <SmsFailedOutlinedIcon htmlColor={'#ff7052'} className={classes.avatarConsulta} />
                                                </Grid>
                                                <Grid item>
                                                    <CustomTypography className={classes.textoAvatar} text={textoAvatar2} />
                                                </Grid>
                                            </>
                                            : vencimiento || activo ?
                                                <>
                                                    <Grid item>
                                                        <Avatar className={classes.avatarPorVecer}> </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <CustomTypography className={classes.textoAvatar} text={textoAvatar1} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar className={classes.avatarAdvertencia}> </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <CustomTypography className={classes.textoAvatar} text={textoAvatar2} />
                                                    </Grid>
                                                    {textoAvatar3 ?
                                                        <>
                                                            <Grid item>
                                                                <Avatar
                                                                    style={{
                                                                        backgroundColor: textoAvatar3.color,
                                                                        width: '18px',
                                                                        height: '18px',
                                                                        marginLeft: '35px'
                                                                    }}
                                                                > </Avatar>
                                                            </Grid>
                                                            <Grid item>
                                                                <CustomTypography className={classes.textoAvatar} text={textoAvatar3.texto} />
                                                            </Grid>
                                                        </>
                                                        : null}
                                                    {textoAvatar4 ?
                                                        <>
                                                            <Grid item>
                                                                <Avatar
                                                                    style={{
                                                                        backgroundColor: textoAvatar4.color,
                                                                        width: '18px',
                                                                        height: '18px',
                                                                        marginLeft: '35px'
                                                                    }}
                                                                > </Avatar>
                                                            </Grid>
                                                            <Grid item>
                                                                <CustomTypography className={classes.textoAvatar} text={textoAvatar4.texto} />
                                                            </Grid>
                                                        </>
                                                        : null}
                                                </>
                                                : null}
                                        {colorAvatar ?
                                            avatar.map((it) => (
                                                <>
                                                    <Grid item>
                                                        <Avatar className={classes[it && it.claseAvatar]}> </Avatar>
                                                    </Grid>
                                                    <Grid item>
                                                        <CustomTypography className={classes[it && it.clase]} text={it && it.textoRedondo} />
                                                    </Grid>
                                                </>
                                            ))
                                            : null}
                                    </Grid>
                                    <Grid item xs={6} >
                                        <TablePagination
                                            {...props}
                                            rowsPerPageOptions={opcionesPaginacion ?? OPCIONES_PAGINACION_5_10_15}
                                            component="div"
                                            count={cantTotal ? cantTotal : 0}
                                            page={page}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    }
                }}

                icons={{
                    Editar: props =>
                        <IconButton className={classes.iconBnt} size="small">
                            <EditIcon htmlColor={'#747474'} />
                        </IconButton>,
                    Delete: props =>
                        <IconButton className={classes.iconBnt} size="small">
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
                    SortArrow:
                        React.forwardRef((props, ref) => (
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
                    sorting: true,
                    search: false,
                    paging: verPaginacion == null ? true : verPaginacion,
                    pageSize: rowsPerPage,
                    addRowPosition: 'first',
                    // tableLayout:'fixed',
                    rowStyle: rowData => ({
                        fontSize: '13px',
                        textAlign: 'center',
                        borderLeft: vencimiento || colorAvatar
                            ? ((rowData.vencimiento === 'advertencia vencimiento') ? '5px solid #f29423' : (rowData.vencimiento === 'vencido') ? '5px solid #e34850' : rowData.conTransporte ? '5px solid #323232' : rowData.indicacionesPendientes ? '5px solid #f29423' : '5px solid white')
                            : rowData && rowData.estadoMedicoIdEstadoMedico && activo ? `2px solid ${Utils.colorChipDenuncia(rowData ? rowData.estadoMedicoIdEstadoMedico : null)}`
                                : null,
                        // wordBreak:'break-word'
                    }),
                    showTextRowsSelected: false,
                    selection: selection ? true : false,
                    selectionProps: rowData => ({
                        color: 'primary',
                        disabled: checkEnabled(rowData)
                    }),
                    headerStyle: {
                        fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8,
                        //wordBreak:'break-all'
                    },
                    padding: 'dense',
                }}

                onSelectionChange={(rows) => handleClick(rows)}

                actions={editar ?
                    [(rowData) => ({
                        disabled: rowData.estadoTrasladoDescripcion !== 'Borrador',
                        icon: props => (
                            < IconButton className={classes.iconBnt} size="small" >
                                <DeleteIcon htmlColor={'#747474'} />
                            </IconButton >
                        ),
                        tooltip: "Eliminar",
                        isFreeAction: false,
                        onClick: (event, rowData) => onDeletedAction(event, rowData)
                    }), deleted ? (rowData) => ({
                        disabled: rowData.estadosCEM === 1,
                        icon: props => (<IconButton className={classes.iconBnt} size="small" >
                            <EditIcon htmlColor={'#747474'} />
                        </IconButton>
                        ),
                        tooltip: rowData.estadoTrasladoDescripcion === 'Programado' ? "Detalles" : "Confirmar",
                        isFreeAction: false,
                        onClick: (event, rowData) => handleConfirm(event, rowData)
                    }) : null]
                    : add && !selection && component === COMPONENT_OBSERVACIONES ?
                        null
                        : add ?
                            [{
                                icon: 'Add',
                                tooltip: "Add",
                                isFreeAction: false,
                            }]
                            : null
                }

            // editable = {
            //     editar?
            //         {
            //         // onRowUpdate: (newData, oldData) =>
            //         //     new Promise((resolve, reject) => {
            //         //         setTimeout(() => {
            //         //             const dataUpdate = [...data];
            //         //             const index = oldData.tableData.id;
            //         //             dataUpdate[index] = newData;
            //         //             setData([...dataUpdate]);

            //         //             resolve();
            //         //         }, 1000);
            //         //     }),
            //         onRowDelete: rowData => onDeletedRowAction(rowData)

            //     } : null,
            //     add? {
            //         onRowAdd: newData =>
            //             new Promise((resolve, reject) => {
            //                 setTimeout(() => {
            //                     setData([...data, newData]);
            //                     resolve();
            //                 }, 1000);
            //             }
            //             ),
            //     }:null

            //     }
            />
        </div>
    );
};

CustomTable.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,
    columnas: PropTypes.array,
    title: PropTypes.string,
    acciones: PropTypes.any,
    open2: PropTypes.any,
    editar: PropTypes.bool,
    justify: PropTypes.any,
    textoAvatar1: PropTypes.any,
    textoAvatar2: PropTypes.any,
    activo: PropTypes.bool,
    add: PropTypes.any,
    iconAdd: PropTypes.any,
    labelAdd: PropTypes.any,
    iconDelete: PropTypes.any,
    labelDelete: PropTypes.any,
    refConsultaReclamo: PropTypes.bool,
    setRowConfirm: PropTypes.any,
    setRowDataConfirm: PropTypes.any,
    component: PropTypes.any,
    dataSelect: PropTypes.any,
};
export default CustomTable;