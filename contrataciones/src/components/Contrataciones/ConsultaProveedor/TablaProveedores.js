import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CustomSwitch from '../../commons/Switch/CustomSwitch';
import CustomTypography from '../../commons/Typography/CustomTypography';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import SVGiconEdit from '../../../commons/assets/Icon-edit.svg'
import prestadoresPNG from '../../../commons/assets/Contrataciones/Proveedores/prestadoresMedicos.png';
import CustomTableContrataciones from '../../commons/Table/CustomTableContrataciones';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Drawer2 from '../../commons/CustomDrawer/Drawer';
import AdminSlide from '../../commons/Slider/AdminSlide';
import DrawerSubPrestadores from '../ProveedorCompleto/General/Tabs/SubPrestadores/DrawerSubPrestadores';
import CustomButton from '../../commons/Button/CustomButton';
import CustomAlert from '../../commons/CustomAlert/customAlert';
import CustomConfirmacion from '../../commons/Dialogo/CustomConfirmacion';
import { GUION } from '../../../Utils/const';


const useStyles = makeStyles({
    switchInactivo: {
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
    },
    switchActivo: {
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.24,
        letterSpacing: 'normal',
        color: "#2dc76d"

    },
    iconEditar: {
        "&:hover": {
            backgroundColor: "transparent",
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    },
    fondoImgPrestadores: {
        backgroundColor: 'rgba(47, 97, 213, 0.1)',
        width: '40px',
        height: '40px',
        margin: '7px 9px 8px',
        padding: '8px',
        borderRadius: '5px',
    },
    imgPrestadores: {
        width: '23px',
        height: '23px',
    },
    buttonAdd: {
        //marginLeft: '15px',
        marginRight: '15px',
        //marginBottom: '19px',
        //justifyContent: 'start',
        width: '170px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#1473e6',
        fontSize: '14px',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#1473e6',
            borderRadius: '20px',
        },
        '&:focus': {
            backgroundColor: '#1473e6',
            borderRadius: '20px',
        },
    },
    subpresbox: {
        display: 'flex',
        alignItems: 'center'
    }
});
const initialSubPrestador = {
    tipo: null,
    nombre: null,
    cuit: null,
    calle: null,
    nro: null,
    telefono: null,
    mail: null,
    cuit: null,
    localidadProvincia: null,
    estadoActivo: true,
    direccionValidad: false,
}

const TablaProveedores = (props) => {
    const { data, page, setPage, rowsPerPage, setRowsPerPage, usuarioActivo, setActualizarData,
        setOpenSnackBar, datos, setProveedor } = props;
    const classes = useStyles(props);
    const dispatch = useDispatch()
    const history = useHistory();
    const loading = useSelector(state => state.documentos.loadingBusquedaPrestador)
    const [dataProveedores, setDataProveedores] = useState([])
    const [selectRow, setSelectRow] = useState(null);
    const [subPrestador, setSubPrestador] = useState(initialSubPrestador)
    const [guardarData, setGuardarData] = useState(false)
    const [openConfirmacion, setOpenConfirmacion] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const [importarSubPrestador, setImportarSubPrestador] = useState(false);
    const [modo, setModo] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [openDrawer, setOpenDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    useEffect(() => {
        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (data && data.cantidadTotal && data.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = data && data.objetos ? data.objetos.map(newData => {
            return ({
                ...newData,
                localidadProvincia: `${newData?.localidad ?? '#'}  ${newData?.provincia ? '-'  + newData.provincia : ''}`,
                nombreRazonSocial: `${newData?.nombreCorto ?? ''} (${newData?.razonSocial ?? GUION})`

            })
        }
        ) : []

        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (data && data.cantidadTotal && lengthData < data.cantidadTotal) {
            for (let index = lengthData; index < data.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }

        setDataProveedores([...dataRellenar, ...dataApi, ...dataRestante])
    }, [data])

    const contenido = [
        {
            texto: <DrawerSubPrestadores
                setSubPrestador={setSubPrestador}
                subPrestador={subPrestador}
                guardarData={guardarData}
                setGuardarData={setGuardarData}
                setOpenConfirmacion={setOpenConfirmacion}
                setDisableButton={setDisableButton}
                disableButton={disableButton}
                modo={modo}
            />
        }
    ]
     //CANCELA LA CONFIRMACION DE AGREGAR O EDITAR UN SUBPRESTADOR
     const cancelarConfirmacion = () => {
        setOpenConfirmacion(false)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }

    //CONFIRMA LA CREACION O LA EDICION DE UN SUBPRESTADOR
    const handleAceptarConfirmacion = () => {
        setOpenConfirmacion(false)
        setOpenDrawer(openDrawer => ({ ...openDrawer, 'right': false }));
        setSubPrestador(initialSubPrestador)
        setOpenAlert(true)
    }
    //CIERRA EL DRAWER
    const handleCancelar = () => {
        setSubPrestador(initialSubPrestador)
        setModo(null);
        setSelectRow(null)
        setOpenDrawer({ ...openDrawer, 'right': false });
    }
     //BOTON EDITAR O AGREGAR UN SUBPRESTADOR
     const agregarSubPrestador = (event) => {
        setGuardarData(true)
        setOpenConfirmacion(false)
        setOpenDrawer({ ...openDrawer, 'right': false });
    }
    const recortarRow = (campo) => {
        if(campo.length >= 50){
            return `${campo.slice(0, 50)}...`;
        }else{
            return campo
        }
    }
    const buttons = () => {
        return (<>
            <Grid item>
                <CustomButton
                    label={"Cancelar"}
                    variant={"contained"}
                    width={'102px'}
                    height={'40px'}
                    isAction={true}
                    styleLabel={{ fontSize: '14px', fontWeight: 'bold', color: '#747474' }}
                    styleButton={{ border: 'solid 2px #747474', backgroundColor: '#ffffff', marginRight: '15px' }}
                    onClik={handleCancelar}
                />
                <CustomButton
                    onClik={agregarSubPrestador}
                    color={'primary'}
                    startIcon={false}
                    disabled={disableButton}
                    width={'105px'}
                    height={'40px'}
                    label={importarSubPrestador ? 'Importar' : modo === 'agregar' ? "Agregar" : "Guardar"}
                    variant={"contained"}
                    isAction={true}
                />

            </Grid> </>)
    }
    const headerTablaProveedor = [
        {
            title: "NOMBRE FANTASIA y RAZON SOCIAL",
            cellStyle: { color: '#505050', fontSize: '12px', minWidth: '350px'},
            headerStyle: { color: '#747474', minWidth: '350px' },
            render: row => (
                <Tooltip title={row.nombreRazonSocial}>
                    <Typography style={{fontSize: '12px'}}>{recortarRow(row && row.nombreRazonSocial ? row.nombreRazonSocial : "-")}</Typography>
                </Tooltip>
            )
        },
        {
            title: "CUIT", field: "cuit",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "TIPO", field: "tipo",
            cellStyle: { color: '#505050', minWidth: '250px', fontSize: '10px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <Grid container alignItems={'center'} >
                    {row.subprestador ?
                        (<div className={classes.subpresbox}>
                            <Grid item className={classes.fondoImgPrestadores}>
                                <img src={prestadoresPNG} className={classes.imgPrestadores}></img>
                            </Grid>
                            <p>SUB-PRESTADOR</p>
                        </div>)
                        : null
                    }
                    <Grid item>
                        {row.tipoProveedor && row.tipoProveedor.join(' - ')}
                    </Grid>
                </Grid>
            )
        },
        {
            title: "LOCALIDAD Y PROVINCIA",
            cellStyle: { color: '#505050' }, field: "localidadProvincia",
            cellStyle: { minWidth: '250px', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' },

        },
        {
            title: "TELÉFONO", field: "telefono",
            cellStyle: { color: '#505050', width: '150px',fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "ESTADO", field: "estado",
            cellStyle: { color: '#505050', width: '150px', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: (data) => {

                return (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <CustomSwitch
                                /* color={'#747474'} */
                                checked={data && data.estado === 1 ? true : false}
                                onChange={() => handleSwitch(data)}
                            />
                            <CustomTypography
                                className={data && data.estado === 1 ? classes.switchActivo : classes.switchInactivo}
                                text={data && data.estado === 1 ? "Activo" : "Inactivo"}
                            />
                        </Box>
                    </>)
            }
        },
        {
            title: "EDITAR", field: "editar",
            cellStyle: { color: '#505050', width: '5%', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <div>
                    <IconButton className={classes.iconEditar} size="small" onClick={(event) => onClickEditar(event, row)} >
                        <img src={SVGiconEdit} />
                    </IconButton>
                </div>
            )
        },
    ]

    const handleSwitch = (row) => {
        setActualizarData(false)
        let request = {
            "idProveedor": row && row.idProveedor,
            "idSubprestador": row && row.idSubprestador,
            "activar": row.estado === 1 ? 0 : 1,
            "idUsuario": usuarioActivo && usuarioActivo.id
        }
        dispatch(actions.cambiarEstadoProveedor(request, callbackSwitch, row))
    }

    const callbackSwitch = (succes, row) => {
        if (succes) {
            setActualizarData(true)
            setOpenSnackBar({
                open: true,

                severity: 'success',
                title: <div> Se ha {row && row.estado === 1 ? 'desactivado' : 'activado'} correctamente el prestador.</div>
            })
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    No se pudo {row && row.estado === 1 ? 'desactivar' : 'activar'} el prestador. Por favor intente nuevamente.
                </div>
            })
        }
    }

    const onClickEditar = (event, row) => {
        setProveedor(row)
        if (row && row.subprestador) {
            setSubPrestador({
                ...row
            })
            setSelectRow(row)
            setModo('editar')
            setOpenDrawer({ ...openDrawer, 'right': true });
        } else {
            history.push({
                pathname: '/home/proveedores/general'
            })
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //setSubPrestador(initialSubPrestador)
         setModo(null);
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    }
    const handleCloseAlert = () => {
        setOpenAlert(false)
        //setModo(null)
    }

    return (
        <div>
            <Grid container alignItems='center' justify={'center'} spacing={1}>
                <Grid item xs={12}>
                    <CustomTableContrataciones
                        data={dataProveedores}
                        setData={setDataProveedores}
                        cantTotal={data && data.cantidadTotal && data.cantidadTotal}
                        columnas={headerTablaProveedor}
                        colorAvatar={true}
                        avatar={[{ textoRedondo: 'Es prioritario', clase: 'textoAvatar', claseAvatar: 'avatarPrioridad' }]}
                        mensaje={false}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        loading={loading}
                        pagination={true}
                    />
                </Grid>
            </Grid>
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                title={importarSubPrestador ? 'Importar sub prestador desde Excel' :
                    modo === 'editar' ? 'Editar sub prestador' : 'Agregar nuevo sub prestador'}
               width={'650px'}
            justify={true}
            >
                <AdminSlide
                    contenido={contenido}
                    labelButtonSiguiente={null}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    activeStep={0}
                    setActiveStep={0}
                    maxSteps={0}
                 buttons={buttons()}
                />
            </Drawer2>
            {openConfirmacion ?
                <CustomConfirmacion
                    openConfirmacion={openConfirmacion}
                    title={modo === 'agregar' ? 'Confirmar nuevo sub prestador' : 'Confirmar edición de sub prestador'}
                    text={modo === 'agregar' ? <div>
                        ¿Desea confirmar la creación del nuevo sub prestador?
                    </div>
                        : <div>
                            ¿Desea confirmar la edición del sub prestador?
                        </div>
                    }
                    handleCancelar={cancelarConfirmacion}
                    handleConfirmar={handleAceptarConfirmacion}
                />
                : null}
            {
                <CustomAlert
                    message={`Sub prestador ${modo === 'agregar' ? 'AGREGADO' : 'MODIFICADO'}.`}
                    onClose={handleCloseAlert}
                    variant={'filled'}
                    severity='success'
                    open={openAlert}
                    snack={true}
                />
            }
        </div>
    )
}

export default TablaProveedores
