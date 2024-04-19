import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import MaterialTable, { MTableAction, MTableBodyRow, MTableToolbar } from "material-table";
import { Checkbox, Input, Radio } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
//estilo
import { makeStyles } from '@material-ui/styles';
//import CustomButton from "../../commons/Button/CustomButton";
import CustomTypography from '../../../commons/Typography/CustomTypography';
import Loader from '../../../commons/Loading/Loader';
import Buscador from '../../../commons/Buscador/buscador';
import CustomText from '../../../commons/TextField/CustomText';
import CustomRadio from '../../../commons/Radio/CustomRadio';
import CustomCheck from '../../../commons/CustomCheck/CustomChek';

const useStyles = makeStyles({
    root: {
        width: '100%',
        '&& .element.style': {
            backgroundColor: 'rgba(255, 205, 113, 0.25)'
        },
        '&& .MuiInput-underline:before':{
            borderBottom:'none'
        },
        '&& .MuiInput-underline:after':{
            borderBottom:'none'
        },
        '&& .MuiCheckbox-colorPrimary.Mui-checked':{
            color:'#2dc76d'
        }
    },
    color: {
        '&& .MuiTableRow-root': {
            backgroundColor: 'rgba(255, 205, 113, 0.25)'
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
    }
})
const TablaSiniestrosMultiples = (props) => {
    const classes = useStyles(props);
    const { data, setData, loading, onClickCheck, columnas,
        setDataSeleccionada, selectedRow, setRow, dataDenuncia } = props
    const addActionRef = React.useRef();
    const loadingDenuncianteVIP = useSelector(state => state.listados.loadingDenuncianteVIP)
    const [clickedRow, setClicked] = React.useState(false);
    const [rows1, setRows1] = React.useState(undefined);
        const handleClick2 = (row)=> {
            setRows1(row)
            
        }
        
    const handleClick = (rows, dataRow) => {
        const selectedAdult = rows.find(
            row => row.idCausaSiniestroMultiple !== selectedRow
          );

        setRow(selectedAdult ? selectedAdult.idCausaSiniestroMultiple : undefined);
        setDataSeleccionada(dataRow)
          setData(oldData =>
      
            oldData.map(d => ({
              ...d,
              tableData: {
                ...d.tableData,
                checked:
                  selectedAdult && selectedAdult.idCausaSiniestroMultiple === d.idCausaSiniestroMultiple
      
              }
            }))
          );
        // console.log(props,'prooooooooooooooooooooooooooooooooooooooo')
        // let a =[row]
        // const selectedAdult = data.find(
        //     row => row.id !== selectedRow
        //   );
        // // const selectedAdult = rows.find(
        // //     row => row.id !== selectedRow
        // // );
        //  setRow(selectedAdult ? selectedAdult.id : undefined);
        // // setRow(selectedAdult ? selectedAdult.id : undefined);

        //  setData(oldData =>
        //    oldData.map(d => ({
        //      ...d,
        //     // tableData:selectedAdult && selectedAdult.id === d.id ? true: false
        //      tableData: {
        //        ...d.tableData,
              
        //         checked: selectedAdult && selectedAdult.id === d.id
     
        //      }
        //    }))
        //  );
        //  setData(oldData =>

        //      oldData.map(d => ({
        //          ...d,
        //          tableData: {
        //              ...d.tableData,
        //              //checked:row && row.id ===d.id,
        //              value:
        //                row && row.id ===d.id

        //          },
                 
        //      }))
        //  );
    }

    // useEffect(() => {
    //     if (data) {
    //        console.log(dat,'dataaaaaaaaaaaaaa')
    //     }
    // }, [data])

    const MyIcon = (props) => (<span {...props}> <ArrowUpwardIcon /> </span>);
    return (
        <div className={classes.root}>
            <MaterialTable
                columns={columnas}
                data={data}
                isLoading={loading ? <Loader loading={loading} /> : false}
                data={data}
        
                title={<CustomTypography fontweight={'600'} text={<strong>Lista de causas a vincular</strong>} variant='subtitle1' />}
                components={{
                    // Action: props => {
                    //     if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                    //         return <MTableAction {...props} />

                    //     } else {
                    //         return <div className={classes.boton}>
                    //             <CustomButton startIcon={<AddIcon />} label={'Nuevo contacto'} variant='outlined' onClik={props.action.onClick} />
                    //         </div>
                    //     }
                    // },
                    // Row: (props) => (
                    //     <MTableBodyRow
                    //       {...props}
                    //       options={{
                    //         ...props.options,
                    //         selectionProps: {
                             
                    //           icon: <CustomRadio  />,
                             
                    //         },
                    //       }}
                    //     />
                    //   ),
                    Toolbar: props => (
                        <div style={{ backgroundColor: '#f4f4f4' }}>
                            <MTableToolbar {...props} />
                            <Grid container spacing={2} className={classes.tipografia} >
                               
                                {/* <Grid item xs={12}><Divider /></Grid>
                                <Grid item ><CustomTypography text={`Personas autorizadas en el ingreso de una nueva denuncia por parte de ${dataDenuncia ? dataDenuncia.empleadorRazonSocial : ''}.`} variant='subtitle2' />

                                    <CustomTypography text='Por favor seleccionar, según la persona que realiza el llamado.' variant='subtitle2' /></Grid> */}
                            </Grid>
                        </div>
                    ),

                }}

                icons={{
                    // Add: props => <CustomButton label={'agregar nuevo contacto'} variant='outlined' />,
                    Edit: props => <EditIcon />,
                    Delete: props => <DeleteIcon />,
                    Clear: props => <DeleteIcon />,
                    Check: props => <CustomRadio/>,
                    Search: props => <SearchIcon />,
                    ResetSearch: props => <DeleteIcon />,
                    LastPage: props => <LastPageIcon />,
                    FirstPage: props => <FirstPageIcon />,
                    NextPage: props => <KeyboardArrowRight />,
                    Selection: props => <CustomRadio/>,
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
                    body: {
                        editRow: {
                            //deleteText: 'Voulez-vous supprimer cette ligne?',
                            cancelTooltip: 'Eliminar',
                            saveTooltip: 'Guardar'
                        },
                        emptyDataSourceMessage: 'No hay registros para mostrar'

                    },

                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'filas',
                        labelRowsPerPage: 'filas por página:',
                        firstAriaLabel: 'Primer página',
                        firstTooltip: 'Primer página',
                        previousAriaLabel: 'Página previa',
                        previousTooltip: 'Página previa',
                        nextAriaLabel: 'Página siguiente',
                        nextTooltip: 'Página siguiente',
                        lastAriaLabel: 'Última pagina',
                        lastTooltip: 'Última página'
                    },
                }}

                options={{
                    actionsColumnIndex: 0,
                    searchFieldStyle: { maxWidth: '190px', borderRadius:'20px', width: '243px',
                                    height: '30px',
                                    margin: '0 0 15px 15px',
                                    padding: '0 16px 0 0',
                                    
                                    border: 'solid 1px #dfdfdf',
                                    backgroundColor: '#ffffff' },
                    sorting: true,
                    addRowPosition: 'first',
                    selection: true,
                    showSelectAllCheckbox: false,
                    showTextRowsSelected: false,
                     selectionProps: (rowData, props) => ({
                         color: 'primary',
                       //  icon:<CustomCheck />,
                        
                        // CheckIcon:<CustomRadio/>,
                        // onClick:(row, props)=> handleClick(row, rowData, props)
                     }),
                }}
                onSelectionChange={(rows, rowData) => handleClick(rows, rowData)}
                
                action={[
                    (rowData) => ({

                        icon: CheckIcon,
                        tooltip: "save",
                        isFreeAction: false,
                        onClick: (event, rowData) => console.log(rowData, 'rowdata111'),

                    }),
                    // rowData => {
                    //     console.log(rowData,'wr')
                    //     let active =
                    //       rowData &&
                    //       clickedRow &&
                    //       rowData.tableData.id === clickedRow.tableData.id;
                    //       return {
                    //         icon: "circle",
                    //         tooltip: "Report bug",
                    //         onClick: (event, rowData) => setClicked(rowData),
                    //         iconProps: { color: active ? "primary" : "white" }
                    //       };
                    //   }
                ]}
                
            // editable={{
            //     onRowAdd: (newData) =>
            //         new Promise((resolve, reject) => {
            //             onClickCheck(newData)
            //             resolve();
            //         }
            //         ),
            // }}
            />
        </div>
    )
}
export default TablaSiniestrosMultiples