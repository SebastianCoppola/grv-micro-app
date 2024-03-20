import React, { useEffect, useState } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../../redux/actions';
//Material:
import { Grid } from '@material-ui/core';
//Componentes:
import CustomConfirmacion from '../../../commons/Dialogo/CustomConfirmacion';
import Loader from '../../../commons/Loading/Loader';
import ContenedorMenuProveedores from '../ContenedorMenuProveedores'
import CustomCardConvenios from '../CustomConvenioHF/CustomCardConvenios';
import CustomConvenioHF from '../CustomConvenioHF/CustomConvenioHF';
import { restaurarRevision } from '../../../../redux/actions/convenio';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';

const HistoricosConvenios = props => {
    const { setMiniMenu, proveedor, usuario } = props;
    //Convenio seleccionado:
    const [convenioSeleccionado, setConvenioSeleccionado] = useState({})
    //Modal restaurar versión:
    const [openConfirmacion, setOpenConfirmacion] = useState(false)
    //Alert && SnackBar:
    const [openAlert, setOpenAlert] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' });
    //Redux:
    const dispatch = useDispatch()
    const dataConveniosHistorico = useSelector(state => state.convenio.convenioHistorico)
    const loadingConvenioHistorico = useSelector(state => state.convenio.loadingConvenioHistorico)
    const errorConvenioHistorico = useSelector(state => state.convenio.errorConvenioHistorico)
    const [dataConvenio, setDataConvenio] = useState([])
    //Request para activar convenios inactivos
    const [request, setRequest] = useState(null)
    //Loading componente toda la pantalla
    const [loadingComponente, setLoadingComponente] = useState(false)


    useEffect(() => {
        setMiniMenu(true)
        let req = { idProveedor: proveedor && proveedor.idProveedor && proveedor.idProveedor }
        dispatch(actions.getConvenioHistorico(req))
    }, [])

    useEffect(() => {
        setDataConvenio(dataConveniosHistorico)
    }, [dataConveniosHistorico])

    useEffect(() => {
        if (errorConvenioHistorico) {
            setOpenSnackBar({
                "open": true,
                "title": 'Ocurrió un error al intentar cargar los convenios.',
                "severity": 'error'
            })
        }
    }, [errorConvenioHistorico])

    //Actions restaurar versión: 
    const handleClickAceptarConfirmacion = () => {
        dispatch(restaurarRevision(request, callBack))
        setOpenConfirmacion(false)
        setLoadingComponente(true)
    }

    const callBack = (bool) => {
        if (bool) {
            let req = {
                idProveedor: proveedor.idProveedor
            }
            setOpenAlert(true)
            setLoadingComponente(false)
            dispatch(actions.getConvenioHistorico(req))
            dispatch(actions.clearDataConvenio())
        }
    }

    const handleClickCancelarConfirmacion = () => {
        setOpenConfirmacion(false)
    }

    //Alert && SnackBar:
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };

    return (
        <ContenedorMenuProveedores>
            {loadingConvenioHistorico ?
                <Grid container justify='center' alignItems='center' style={{ minHeight: '500px' }}>
                    <Loader loading={true} />
                </Grid>
                : dataConvenio && dataConvenio.length > 0 && !errorConvenioHistorico ?
                    <CustomConvenioHF
                        titulo={"Histórico Convenios"}
                        historicoConvenio={true}
                        data={dataConvenio}
                        setDataConvenio={setDataConvenio}
                        convenioSeleccionado={convenioSeleccionado}
                        setConvenioSeleccionado={setConvenioSeleccionado}
                        setOpenConfirmacion={setOpenConfirmacion}
                        openAlert={openAlert} handleCloseAlert={handleCloseAlert}
                        request={request}
                        setRequest={setRequest}
                        loadingComponente={loadingComponente}
                        setLoadingComponente={setLoadingComponente}
                        proveedor={proveedor}
                        usuario={usuario}
                    />
                    : !errorConvenioHistorico ?
                        <Grid xs={12} style={{ margin: "auto" }}>
                            <CustomCardConvenios
                                titulo={"Históricos Convenios"}
                                bodyText={"No hay convenios registrados en este proveedor"}
                                usuario={usuario}
                            />
                        </Grid>
                        : null}
            <CustomConfirmacion
                openConfirmacion={openConfirmacion}
                title={"Confirmar restauracion de la version " + convenioSeleccionado.version}
                text={
                    <div style={{ margin: '0', padding: '0' }}>
                        Esta version {convenioSeleccionado.titulo} volverá a ser el convenio actual
                        ¿Desea confirmar la restauracion?
                    </div>
                }
                handleConfirmar={handleClickAceptarConfirmacion}
                handleCancelar={handleClickCancelarConfirmacion}
            />
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
        </ContenedorMenuProveedores>
    )
}

export default HistoricosConvenios