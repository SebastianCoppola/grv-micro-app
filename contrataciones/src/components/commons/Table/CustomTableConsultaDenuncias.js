import React from 'react'
//Mui: 
import { Avatar, TablePagination, Typography, Paper, Grid } from '@material-ui/core'
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
//Components:
import Loader from '../Loading/Loader'
//Material Table:
import MaterialTable, { MTableToolbar } from "material-table"
import { OPCIONES_PAGINACION_5_10_15 } from '../../../Utils/const'

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('md')]: {
            '& .MuiTableHead-root': {
                display: props => props.open2 ? 'block' : 'table-header-group',
                position:"sticky"
            }
        },
        '& .MuiTableCell-root': {
            padding: '3px',

        }
    }
}))

const CustomTableConsultaSolicitudes = props => {
    
    const {data, cantTotal, columnas, referencias, setRowBorderLeft, 
        page, setPage, rowsPerPage, setRowsPerPage, toolbar, loading ,
        opcionesPaginacion
    } = props
    
    const classes = useStyles(props)
   
    return (
        <div className={classes.container}>
            <MaterialTable
                columns={columnas}
                data={data}
                isLoading={loading ? <Loader loading={loading} /> : false}
                components={{
                    Container: props => <Paper {...props} elevation={0} />,
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
                            <Grid container alignItems={'center'} justify={'space-between'} style={{flexWrap:'nowrap'}}>
                                <Grid item style={{display:'flex', gap:'20px', flexWrap:'wrap'}}>
                                    {referencias && referencias.length 
                                        && referencias.map((it, index)=>(
                                            <div key={index} style={{display:'flex',alignItems:'center', gap:'5px'}}>
                                                <Avatar style={{background:it.color,width:'18px',height:'18px'}}> </Avatar>
                                                <Typography noWrap style={{fontSize:'12px', color:'#747474'}}>{it.text}</Typography>
                                            </div>
                                        ))
                                    }
                                </Grid>
                                <Grid item style={{overflowX:'visible'}}>
                                    <TablePagination
                                        {...props}
                                        rowsPerPageOptions={opcionesPaginacion ?? OPCIONES_PAGINACION_5_10_15}
                                        component="div"
                                        count={cantTotal ? cantTotal : 0}
                                        page={page}
                                        style={{overflowX:'visible'}}
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                }}
                icons = {{
                    LastPage: () => <LastPage /> ,
                    FirstPage: () => <FirstPage /> ,
                    NextPage: () => <KeyboardArrowRight /> ,
                    PreviousPage: () => <KeyboardArrowLeft /> ,
                }}
                localization = {{
                    body: {
                        emptyDataSourceMessage: 'No hay registros para mostrar.'
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
                options = {{
                    actionsColumnIndex: -1,
                    searchFieldStyle: { maxWidth: '190px' },
                    sorting: false,
                    search: false,
                    pageSize:rowsPerPage,
                    addRowPosition: 'first',
                    rowStyle: (row) => ({
                        fontSize: '13px',
                        textAlign: 'center',
                        borderLeft: setRowBorderLeft ? `5px solid ${setRowBorderLeft(row)}` : '' 
                    }),
                    showTextRowsSelected: false,
                    headerStyle: {fontSize: '13px'},
                    padding: 'dense',
                }}
            />
        </div>
    )
}

export default CustomTableConsultaSolicitudes