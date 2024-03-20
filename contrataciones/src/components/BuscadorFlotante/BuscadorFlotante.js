import React, { useEffect, useState } from "react"
//Utils:
import Utils from "../../Utils/utils"
import { MENSAJE_ERROR_MARCAR_VISTA, MODULO_CEM, NOMBRE_EXCEL_EXPORTAR_PROVEEDORES, 
    TITULOS_EXCEL_PROVEEDOR_CEM, TITULO_PROVEEDOR, ERROR_MENSAJE_EXPORTAR_EXCEL, 
    ESCAPE, KEYUP, SNACK_SEVERITY, ESTADO_PROVEEDOR_ACTIVO, TIPO_PRESTADOR_TODOS
} from "../../Utils/const"
//Redux:
import { useSelector, useDispatch } from "react-redux"
import * as actions from '../../redux/actions/index'
import { busquedaPrestadorBuscador, limpiarDataPrestadoresBuscador } from "../../redux/actions/documentos";
//Mui:
import { Divider, Grid } from "@material-ui/core"
//Components:
import CustomButton from "../commons/Button/CustomButton"
import CustomTypography from "../commons/Typography/CustomTypography"
import Filtros from "./Filtros/Filtros"
import TablaBuscador from "./Tabla/TablaBuscador"
import CustomSnackBar from "../commons/SnackBar/CustomSnackBar"
//Icons:
import IconExcel from '../../commons/assets/Contrataciones/file-excel-box-outline.png'

const BuscadorFlotante = (props) => {
    const { handleClose, usuarioActivo } = props
    const dispatch = useDispatch()
    const dataProvincia = useSelector(state => state.listados.provinciaSelect)
    const dataEstado = useSelector(state => state.listados.estadoSelect)
    const dataBusquedaPrestador = useSelector(state => state.documentos.dataPrestadoresBuscador)
    const cantidadTotal = useSelector(state => state.documentos.dataPrestadoresBuscador && state.documentos.dataPrestadoresBuscador.cantidadTotal ? state.documentos.dataPrestadoresBuscador.cantidadTotal : 0)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    const [buscador, setBuscador] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(usuarioActivo && usuarioActivo.apps && usuarioActivo.apps.length === 1 && usuarioActivo.apps[0] === MODULO_CEM ? 15 : 5)

    const [datos, setDatos] = useState({ 
        estado: ESTADO_PROVEEDOR_ACTIVO, 
        tipoProveedor: TIPO_PRESTADOR_TODOS,
        ContratoActivo: null,
        esPrioritario: null,
        primeraAsistencia: null,
        redCS: null,
        redProvart: null,
        servicio24h: null,
        tieneRmn: null,
        tieneTac: null,
        tipoPrestadorMedico:null 
    })
    const [idProv, setIDProv] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        title: '',
        severity: ''
    });

    useEffect(() => {
        dispatch(limpiarDataPrestadoresBuscador())
        //Se cierra la ventana si se aprieta Escape:
        const keyEscPressed = (evt) => {
            if (evt.key === ESCAPE) {
                evt.preventDefault()
                handleClose()
            }
        }
        document.addEventListener(KEYUP, keyEscPressed)
        //Limpio el evento
        return () => {
            document.removeEventListener(KEYUP, keyEscPressed)
        }
    }, [])

    const [selectPrimeraLinea, setSelectPrimeraLinea] = React.useState([
        {
            titulo: 'Estado', nombre: 'estado', value: null, id: 'id1', placeHolder: 'Todos',
            data: dataEstado
        },
        {
            titulo: "Provincia", grid: 3, nombre: 'idProvincia', value: null, id: 'id2',
            placeHolder: 'Seleccionar Provincia', vista: true,
            data: dataProvincia
        },
    ])
    const prov = selectPrimeraLinea && selectPrimeraLinea.find((it) => it.nombre === 'idProvincia')

    useEffect(() => {
        if (prov) {
            setIDProv(prov && prov.value)
        }
    }, [prov])

    const [textPrimeraLinea, setTextPrimeraLinea] = useState([
        { titulo: 'Razón Social- Nombre', nombre: 'razonSocial', value: null },
        { titulo: 'CUIT', nombre: 'cuit', value: null },
    ])

    useEffect(() => {
        if (datos && (datos.tipoProveedor || datos.tipoProveedor === 0)) {
            Buscador()
        }
    }, [page, rowsPerPage])

    const Buscador = (buscar) => {
        let request = {
            ...datos,
            "limit": rowsPerPage,
            "offset": (page * rowsPerPage),
        }

        dispatch(busquedaPrestadorBuscador(request, callbackBusquedaPrestadorBuscador))
    }
    const callbackBusquedaPrestadorBuscador = (fail) => {
        if (fail) {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: MENSAJE_ERROR_MARCAR_VISTA,
            });
        }
    }
    const Buscar = (event, buscar) => {
        if (datos && (datos.tipoProveedor || datos.tipoProveedor === 0)) {
            Buscador(buscar)
        } else if (buscar) {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    Debe completar la opción de TIPO para poder realizar la búsqueda
                </div>
            })
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };
    const handleExportar = () => {
        dispatch(actions.busquedaPrestador(datos, callbackDatosExportar))
    }

    const callbackDatosExportar = (fail, datos) => {
        if (!fail) {
            const datosFila = [];
            datos.objetos.map(proveedor => {
                const localidad = proveedor && proveedor.localidad ? proveedor.localidad : ''
                const provincia = proveedor && proveedor.provincia ? proveedor.provincia : ''
                let tiposProveedor = ''
                const tp = proveedor && proveedor.tipoProveedor ? (proveedor.tipoProveedor.map(tipo => {
                    tiposProveedor += ' - ' + tipo
                })) : null
                const fila = [
                    proveedor && proveedor.razonSocial ? proveedor.razonSocial : '',
                    proveedor && proveedor.nombreCorto ? proveedor.nombreCorto : '',
                    proveedor && proveedor.cuit ? proveedor.cuit : '',
                    localidad && provincia ? localidad + ' - ' + provincia : '',
                    proveedor && proveedor.domicilio ? proveedor.domicilio : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailAdministrativo ? proveedor.contactoMailTelefonoDTO.mailAdministrativo : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailMedico ? proveedor.contactoMailTelefonoDTO.mailMedico : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.mailPrimeraAsistencia ? proveedor.contactoMailTelefonoDTO.mailPrimeraAsistencia : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoAdministrativo ? proveedor.contactoMailTelefonoDTO.telefonoAdministrativo : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoMedico ? proveedor.contactoMailTelefonoDTO.telefonoMedico : '',
                    proveedor && proveedor.contactoMailTelefonoDTO && proveedor.contactoMailTelefonoDTO.telefonoPrimeraAsistencia ? proveedor.contactoMailTelefonoDTO.telefonoPrimeraAsistencia : '',
                    proveedor && proveedor.prestadorMedicoDTO && proveedor.prestadorMedicoDTO.observaciones ? proveedor.prestadorMedicoDTO.observaciones : '',
                    tiposProveedor
                ]
                datosFila.push(fila)
            })

            const request = {
                tituloArchivo: TITULO_PROVEEDOR,
                titulos: TITULOS_EXCEL_PROVEEDOR_CEM,
                datosFilas: datosFila
            }
            dispatch(actions.exportarConsultaGenerica(request, NOMBRE_EXCEL_EXPORTAR_PROVEEDORES, callBackExportar))
        }
    }

    const callBackExportar = (fail) => {
        if (fail) {
            setOpenSnackBar({
                open: true,
                severity: SNACK_SEVERITY.ERROR,
                title: ERROR_MENSAJE_EXPORTAR_EXCEL,
            });
        }
    }
    return (

        <Grid container>
            <Grid item container xs={12} justify='space-between' style={{ marginBottom: 10 }} >
                <CustomTypography
                    text={<strong>Consulta proveedores</strong>}
                    variant="h6"
                    style={{ marginBottom: 15 }}
                />
                <CustomButton
                    size={'medium'}
                    startIcon={<img src={IconExcel} />}
                    onClik={handleExportar}
                    label={'Exportar'}
                    variant={'outlined'}
                    disabled={cantidadTotal === 0}
                />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item container xs={12} style={{ display: "flex" }}>
                <Grid item xs={3} style={{ height: '65vh', overflow: 'auto', overflowX: 'hidden' }}>
                    <Filtros
                        textPrimeraLinea={textPrimeraLinea}
                        setTextPrimeraLinea={setTextPrimeraLinea}
                        align={'flex-start'}
                        datos={datos} setDatos={setDatos}
                        idProv={idProv}
                        filtrosBuscadorFlotante={true}
                    />

                </Grid>
                <Grid item container xs={9} style={{ height: "72vh" }}>
                    <Grid item xs={12} >
                        <TablaBuscador
                            page={page} setPage={setPage}
                            rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                            dataTabla={dataBusquedaPrestador} cantidadTotal={cantidadTotal}
                            buscador={buscador} setBuscador={setBuscador} datos={datos} opcionesPaginacion={opcionesPaginacion}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} spacing={1}>
                <Grid item>
                    <CustomButton
                        label="Cerrar"
                        variant={'outlined'}
                        isAction={true}
                        onClik={handleClose}
                    />
                </Grid>
                <Grid item >
                    <CustomButton
                        label="Buscar"
                        variant="contained"
                        color="primary"
                        isAction={true}
                        onClik={(event) => Buscar(event, 'si')}
                    />
                </Grid>
            </Grid>
            {openSnackBar.open ?
                <CustomSnackBar
                    handleClose={handleCloseSnackBar}
                    open={openSnackBar.open}
                    title={openSnackBar.title}
                    severity={openSnackBar.severity}
                />
                : null}
        </Grid>
    )
}

export default BuscadorFlotante