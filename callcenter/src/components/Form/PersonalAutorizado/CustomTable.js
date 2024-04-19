import React from "react"
//Material:
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import MaterialTable from "material-table"
import { ArrowUpward, FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from "@material-ui/icons"

const CustomTable = (props) => {
    const { data, setData, selectedRow, setRow, backgroundColor} = props

    const handleClick = (rows) => {
        const selectedAdult = rows.find(row => row.id !== selectedRow)
        
        setRow(selectedAdult ? selectedAdult.id : undefined)

        setData(oldData =>
            oldData.map(d => ({
                ...d,
                tableData: {
                    ...d.tableData,
                    checked: selectedAdult && selectedAdult.id === d.id
                }
            }))
        )
    }

    const theme = createMuiTheme({
        palette: {
            background: backgroundColor ?? '#ffff',
        }
    })
    
    const MyIcon = (props) => (<span {...props}> <ArrowUpward /> </span>)
    
    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                style={{
                    border: 'none',
                    boxShadow: 'none'
                }}
                columns={[
                    { 
                        title: "APELLIDO", field: "apellido",
                        cellStyle: {fontSize:'12px', color:'#505050'},
                        headerStyle: {fontSize: '12px', fontWeight:700, color:'#747474'}
                    },
                    { 
                        title: "NOMBRE", field: "nombre",
                        cellStyle: {fontSize:'12px', color:'#505050', height:'10px', maxHeight:'10px'},
                        headerStyle: {fontSize: '12px', fontWeight:700, color:'#747474', height:'30px', maxHeight:'30px'},
                    },
                    { 
                        title: "PUESTO", field: "puesto",
                        cellStyle: {fontSize:'12px', color:'#505050', height:'10px', maxHeight:'10px'},
                        headerStyle: {fontSize: '12px', fontWeight:700, color:'#747474', height:'30px', maxHeight:'30px'},
                    },
                ]}
                data={data && data.length ? data : []}
                components={{
                    Toolbar: () => null
                }}
                icons={{
                    // LastPage: () => <LastPage />,
                    // FirstPage: () => <FirstPage />,
                    // NextPage: () => <KeyboardArrowRight />,
                    // PreviousPage: () => <KeyboardArrowLeft />,
                    SortArrow: React.forwardRef((props, ref) => ( <MyIcon {...props} ref={ref}/> ))
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'No hay registros para mostrar'
                    },
                    // pagination: {
                    //     labelDisplayedRows: '{from}-{to} de {count}',
                    //     labelRowsSelect: 'filas',
                    //     labelRowsPerPage: 'filas por página:',
                    //     firstAriaLabel: 'Primer página',
                    //     firstTooltip: 'Primer página',
                    //     previousAriaLabel: 'Página previa',
                    //     previousTooltip: 'Página previa',
                    //     nextAriaLabel: 'Página siguiente',
                    //     nextTooltip: 'Página siguiente',
                    //     lastAriaLabel: 'Última pagina',
                    //     lastTooltip: 'Última página'
                    // },
                }}
                options={{
                    // actionsColumnIndex: -1,
                    sorting: true,
                    addRowPosition: 'first',
                    selection: true,
                    showTextRowsSelected: false,
                    selectionProps: () => ({ color: "primary" }),
                    paging: false,
                    showSelectAllCheckbox: false,                    
                }}
                onSelectionChange={(rows) => handleClick(rows)}
            />
        </MuiThemeProvider>
    )
}

export default CustomTable