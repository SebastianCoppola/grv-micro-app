import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import TablaProveedores from './TablaProveedores'
//estilo
import { makeStyles } from "@material-ui/core/styles";
//material-ui
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'; import Filtros from '../../BuscadorFlotante/Filtros/Filtros';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import CustomButton from '../../commons/Button/CustomButton';
import IconExcel from '../../../commons/assets/Contrataciones/file-excel-box-outline.png'
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { ACTIVO, INACTIVO, MENSAJE_ERROR_MARCAR_VISTA, NOMBRE_EXCEL_EXPORTAR_PROVEEDORES, TITULOS_EXCEL_PROVEEDOR, TITULO_PROVEEDOR, ESTADO_PROVEEDOR_ACTIVO, TIPO_PRESTADOR_TODOS } from '../../../Utils/const';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

const ConsultaProveedor = (props) => {
    const { open2, setMiniMenu, setNavegacion, setTituloHeader, usuarioActivo, setProveedor } = props
    const classes = useStyles(props);
    const history = useHistory();
    const dispatch = useDispatch()
    const dataBusquedaPrestador = useSelector(state => state.documentos.dataPrestadores)
    const cantidadTotal = useSelector(state => state.documentos && state.documentos.dataPrestadores && state.documentos.dataPrestadores.cantidadTotal
        ? state.documentos.dataPrestadores.cantidadTotal
        : 0)
    const [datos, setDatos] = useState({ estado: ESTADO_PROVEEDOR_ACTIVO, tipoProveedor: TIPO_PRESTADOR_TODOS })
    const [idProv, setIDProv] = useState(null)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });
    const [timeoutId, setTimeoutId] = useState(null)

    // const [selectPrimeraLinea, setSelectPrimeraLinea] = React.useState([
    //     {
    //         titulo: 'Estado', nombre: 'estado', value: null, id: 'id1', placeHolder: 'Todos',
    //         data: dataEstado
    //     },
    //     {
    //         titulo: "Provincia", grid: 3, nombre: 'idProvincia', value: null, id: 'id2',
    //         placeHolder: 'Seleccionar Provincia', vista: true,
    //         data: dataProvincia
    //     },
    // ])
    // const prov = selectPrimeraLinea && selectPrimeraLinea.find((it) => it.nombre === 'idProvincia')

    // useEffect(() => {
    //     if (prov) {
    //         setIDProv(prov && prov.value)
    //     }
    // }, [prov])
    useEffect(() => {
        dispatch(actions.getListadoProvinciaSelect())
        dispatch(actions.getListadoPrestadorMedicoTiposSelect())
        dispatch(actions.getListadoTipoPrestadorSelect())
        dispatch(actions.getListadoEstadoSelect())
        //Elimino el proveedor cargado anteriormente de editar:
        dispatch(actions.setTipoProveedorDatosNull())
        //Elimino los datos guardados de convenios:
        dispatch(actions.clearDataConvenio())
    }, [])

    const [textPrimeraLinea, setTextPrimeraLinea] = React.useState([
        { titulo: 'Razón Social- Nombre', nombre: 'razonSocial', value: null },
        { titulo: 'Nombre de fantasía', nombre: 'nombreFantasia', value: null },
        { titulo: 'CUIT', nombre: 'cuit', value: null },
    ])

    useEffect(() => {
        setMiniMenu(false)
        setNavegacion(false)
        setTituloHeader('Proveedores');
    }, [])
    const [actualizarData, setActualizarData] = React.useState(false)
    
    useEffect(() => {
        busquedaPrestador()
    }, [ page, rowsPerPage ])

    useEffect(() => {
        if (datos !== null) {
                //Si no hay un delay seteado para la busqueda de prestador se setea el delay y se ejecuta la busqueda
                if(!timeoutId){
                    setTimeoutId(setTimeout(() => {
                        busquedaPrestador()
                        setTimeoutId(null)
                    }, 1200))
                //Si ya existe un delay se cancela y luego se vuelve a setear el delay y a ejecutar la busqueda 
                }else {
                    clearTimeout(timeoutId)
                    setTimeoutId(setTimeout(() => {
                        busquedaPrestador()
                        setTimeoutId(null)
                    }, 1200))
                }

        }
    }, [ datos, actualizarData ])

    const busquedaPrestador = () => {
        let request = []
        if (datos.idProvincia === null) {
            request = {
                ...datos,
                idLocalidad: null,
                limit: rowsPerPage,
                offset: page * rowsPerPage,
            }
        } else {
            request = {
                ...datos,
                limit: rowsPerPage,
                offset: page * rowsPerPage,
            }
        }
        dispatch(actions.busquedaPrestador(request, callbackBusquedaPrestador))
    }

    const callbackBusquedaPrestador = (fail) => {
        if (fail) {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: MENSAJE_ERROR_MARCAR_VISTA,
            });
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    const handleNuevoProveedor = () => {
        history.push({
            pathname: '/home/altaProveedor'
        })
    }
    const handleExportar = () => {
        dispatch(actions.busquedaPrestador(datos, callbackDatosExportar))
    }

    const callbackDatosExportar = (fail, datos) => {
        if (!fail) {
            const datosFila = [];
            datos.objetos.map(proveedor => {
                const localidad = proveedor && proveedor.localidad ? proveedor.localidad : ''
                const provincia = proveedor && proveedor.provincia ? proveedor.provincia : ''
                const fila = [
                    proveedor && proveedor.prioritario === 1 ? "Si" : "No",
                    proveedor && proveedor.idProveedor ? proveedor.idProveedor : '',
                    proveedor && proveedor.tipoPersona ? proveedor.tipoPersona : '',
                    proveedor && proveedor.tipoProveedor ? proveedor.tipoProveedor.join(' - ') : '',
                    proveedor && proveedor.cuit ? proveedor.cuit : '',
                    proveedor && proveedor.dni ? proveedor.dni : '',
                    proveedor && proveedor.razonSocial ? proveedor.razonSocial : '',
                    localidad && provincia ? localidad + ' - ' + provincia : '',
                    proveedor && proveedor.domicilio ? proveedor.domicilio : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailAdministrativo ? proveedor.contactoMailTelefonoDTO.mailAdministrativo : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailMedico ? proveedor.contactoMailTelefonoDTO.mailMedico : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailPrimeraAsistencia ? proveedor.contactoMailTelefonoDTO.mailPrimeraAsistencia : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoAdministrativo ? proveedor.contactoMailTelefonoDTO.telefonoAdministrativo : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoMedico ? proveedor.contactoMailTelefonoDTO.telefonoMedico : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoPrimeraAsistencia ? proveedor.contactoMailTelefonoDTO.telefonoPrimeraAsistencia : '',
                    proveedor && proveedor.estado === 1 ? ACTIVO : INACTIVO
                ]
                datosFila.push(fila)
            })

            const request = {
                tituloArchivo: TITULO_PROVEEDOR,
                titulos: TITULOS_EXCEL_PROVEEDOR,
                datosFilas: datosFila
            }
            dispatch(actions.exportarConsultaGenerica(request, NOMBRE_EXCEL_EXPORTAR_PROVEEDORES, callBackExportar))
        }
    }

    const callBackExportar = (fail) => {
        if (fail) {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Le pedimos disculpas, ocurrió un problema al intentar exportar el excel. Por favor intente nuevamente. ',
            });
        }
    }

    return (
        <div className={classes.root}>
            <Grid container alignItems='center' justify='center' spacing={2} >
                <Grid item xs={12} >
                    <Paper elevation={0}>
                        <Grid item>
                            <Filtros
                                gridTextPrimeraLinea={3}
                                gridSelectPrimeraLinea={3}
                                gridRadio={3}
                                consulta={true}
                                // selectPrimeraLinea={selectPrimeraLinea}
                                // setSelectPrimeraLinea={setSelectPrimeraLinea}
                                textPrimeraLinea={textPrimeraLinea}
                                setTextPrimeraLinea={setTextPrimeraLinea}
                                align={'flex-start'}
                                datos={datos} setDatos={setDatos}
                                idProv={idProv}
                                openMenu={open2}
                                filtrosBuscadorFlotante={false}
                            />
                        </Grid>
                    </Paper>
                </Grid>

                <Grid container justify={'flex-end'} alignItems={'center'} alignContent={'flex-end'} item spacing={2}>
                    <Grid item >
                        <CustomButton
                            size={'medium'}
                            startIcon={<img src={IconExcel} />}
                            onClik={handleExportar}
                            label={'Exportar'}
                            variant={'outlined'}
                            disabled={cantidadTotal === 0}
                        />
                    </Grid>
                    <Grid item >
                        <CustomButton
                            size={'medium'}
                            isAction={true}
                            startIcon={<AddIcon style={{ marginLeft: '5px', color: '#ffffff' }} />}
                            onClik={handleNuevoProveedor}
                            label={"Nuevo Proveedor"}
                            variant={'contained'}
                            color='primary' />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TablaProveedores
                        page={page} setPage={setPage}
                        rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                        data={dataBusquedaPrestador} cantidadTotal={cantidadTotal}
                        datos={datos}
                        usuarioActivo={usuarioActivo}
                        setActualizarData={setActualizarData}
                        setOpenSnackBar={setOpenSnackBar}
                        setProveedor={setProveedor}
                    />
                </Grid>
            </Grid>
            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={handleCloseSnackBar}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    vertical={'bottom'}
                    severity={openSnackBar.severity} />
                : null}
        </div>
    )
}
export default ConsultaProveedor
