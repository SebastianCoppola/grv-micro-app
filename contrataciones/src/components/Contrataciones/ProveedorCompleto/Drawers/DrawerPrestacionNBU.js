import React, { useEffect, useState } from 'react'
//Material:
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Check } from '@material-ui/icons'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import { getPrestacionesNBUHistoricos } from '../../../../redux/actions/convenio'
//Components:
import CustomTableContrataciones from '../../../commons/Table/CustomTableContrataciones'
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'


const useStyles = makeStyles((theme) => ({
    qxTrue: {
        width: '35px',
        height: '35px',
        margin: '0 3px',
        padding: '0',
        border: '1px solid #2dc76d',
        borderRadius: '15%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "&:nth-child(1)": {
            fontSize: '8px',
            color: '#2dc76d'
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
    },
    cabecera: {
        fontSize: "10px",
        color: "#747474",
    },
}))


const DrawerPrestacionNBU = (props) => {
    const { convenioSeleccionado, setDeshabilitarSiguiente } = props
    const classes = useStyles();
    //Redux:
    const pnbuBack = useSelector(state => state.convenio.pnbu)
    const loadingPNBU = useSelector(state => state.convenio.loadingPNBU)
    const errorPNBU = useSelector(state => state.convenio.errorPNBU)
    const dispatch = useDispatch()
    //Tabla
    const [dataPrestacionesNBU, setDataPrestacionesNBU] = useState({ objetos: [] })
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    //SnackBar:
    const [openSnackBar, setOpenSnackBar] = useState({ 
        "open": errorPNBU, 
        "title": 'Se produjo un error al intentar cargar las prestaciones NBU.', 
        "severity": 'error' 
    });
    
    //Habilito el boton siguiente:
    useEffect(() => {
        setDeshabilitarSiguiente(false)
    }, [])

    //Request:
    useEffect(() => {
        let req = {
            idConvenio: convenioSeleccionado.idConvenio,
            offset: page * rowsPerPage,
            limit: rowsPerPage
        }
        dispatch(getPrestacionesNBUHistoricos(req))
    }, [convenioSeleccionado, page, rowsPerPage])

    //Seteo data segun paginacion:
    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (pnbuBack && pnbuBack.cantidadTotal && pnbuBack.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = pnbuBack && pnbuBack.objetos ? pnbuBack.objetos.map(newData => {
            return { ...newData }
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (pnbuBack && pnbuBack.cantidadTotal && lengthData < pnbuBack.cantidadTotal) {
            for (let index = lengthData; index < pnbuBack.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setDataPrestacionesNBU({
            cantidadTotal: pnbuBack && pnbuBack.cantidadTotal ? pnbuBack.cantidadTotal : 0,
            objetos: [...dataRellenar, ...dataApi, ...dataRestante]
        })
    }, [pnbuBack])

    //ColumnasTabla:
    let columnas = [
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>CÓDIGO</Typography>,
            field: "codigo",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '50px', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', height: '40px' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>DESCRIPCIÓN</Typography>,
            field: "descripcion",
            headerStyle: { padding: '5px 5px', fontSize: '12px' },
            cellStyle: { minWidth: '340px', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <div style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.descripcion}
                </div>
            )
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>CANTIDAD</Typography>,
            field: "cantidadNbu",
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '20px', maxWidth: '50px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px', textAlign: 'center' },
        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRECIO</Typography>,
            field: "precio",
            cellStyle: { maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' },

        },
        {
            title: <Typography className={classes.cabecera} style={{ cursor: "auto" }}>PRE. QX</Typography>,
            headerStyle: { padding: '5px 5px', fontSize: '12px', textAlign: 'center' },
            cellStyle: { minWidth: '25px', maxWidth: '25px', overflow: 'hidden', textOverflow: 'ellipsis', padding: '5px 5px' },
            render: row => (
                <Grid container justify='center'>
                    {row.esPrQx ?
                        <IconButton
                            disabled={true}
                            size="small"
                            className={classes.qxTrue} >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Check style={{ maxWidth: '20px' }} />
                                <p style={{ padding: '0', margin: '0' }}>PR.QX</p>
                            </div>
                        </IconButton>
                        : "-"
                    }
                </Grid>
            )
        }
    ];

    //SnackBar:
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };

    return (
        <Grid style={{marginTop:'30px'}}>
            { !errorPNBU ? 
                <CustomTableContrataciones 
                    //Data:
                    data={dataPrestacionesNBU.objetos}
                    cantTotal={dataPrestacionesNBU.cantidadTotal}
                    //Cols:
                    columnas={columnas}
                    //Pagination:
                    paginationWidth={true}
                    pagination={true}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    //Others:
                    noSorting={true}
                    loading={loadingPNBU}
                />
                :
                null
            }
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
        </Grid>
    )
}

export default DrawerPrestacionNBU
