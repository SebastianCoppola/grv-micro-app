import React, { useEffect, useState } from 'react'
//Components: 
import ContenedorMenuProveedores from '../ContenedorMenuProveedores'
import CustomConvenioHF from '../CustomConvenioHF/CustomConvenioHF';
import ConvenioFuturoEditar from './ConvenioFuturoEditar';
import CustomCardConvenios from '../CustomConvenioHF/CustomCardConvenios';
import Loader from '../../../commons/Loading/Loader';
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';
//Material:
import { Grid } from '@material-ui/core';
//Redux:
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import CustomAlert from '../../../commons/CustomAlert/customAlert';

const ConveniosFuturos = props => {
    const { setMiniMenu, proveedor, usuarioActivo } = props;
    //Alert && SnackBar:
    const [openAlert, setOpenAlert] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' });
    //En caso de poner la pantalla de editar:
    const [editar, setEditar] = useState(false)
    //Convenio seleccionado:
    const [convenioSeleccionado, setConvenioSeleccionado] = useState({})
    //Redux:
    const dataConveniosFuturo = useSelector(state => state.convenio.convenioFuturo)
    const loadingConvenioFuturo = useSelector(state => state.convenio.loadingConvenioFuturo)
    const errorConvenioFuturo = useSelector(state => state.convenio.errorConvenioFuturo)
    const dispatch = useDispatch()
    //Loading componente toda la pantalla
    const [loadingComponente, setLoadingComponente] = useState(false)

    //Busco los convenios asociados al proveedor:
    useEffect(() => {
        setMiniMenu(true)
        let req = { idProveedor: proveedor && proveedor.idProveedor && proveedor.idProveedor }
        dispatch(actions.getConveniosFuturos(req))
        dispatch(actions.setRequestConvenio(null))
    }, [])

    //En caso de error:
    useEffect(() => {
        if (errorConvenioFuturo) {
            setOpenSnackBar({
                "open": true,
                "title": 'Ocurrió un error al intentar cargar los convenios.',
                "severity": 'error'
            })
        }
    }, [errorConvenioFuturo])

    //Cambio la pantalla para editar Convenios Futuros
    const handleClickEditar = () => {
        setEditar(true)
    }
    //Cuando el usuario aprieta en las cards para eliminar
    const callbackEliminar = (exito) => {
        if (exito) {
            setOpenAlert(true)
            dispatch(actions.getConveniosFuturos(
                { idProveedor: proveedor && proveedor.idProveedor }
            ))
        } else {
            setOpenSnackBar({
                "open": true,
                "title": 'Ocurrió un error al intentar eliminar el convenio.',
                "severity": 'error'
            })
        }
        setLoadingComponente(false)
    }
    const handleClickEliminar = () => {
        setLoadingComponente(true)
        dispatch(actions.eliminarConvenioFuturo(
            { idConvenio: convenioSeleccionado.idConvenio },
            callbackEliminar
        ))
    }
    //Para cancelar el editar y volver a la primer pantalla de convenios futuros
    const handleClickCancelarEditar = () => {
        setEditar(false)
        dispatch(actions.setRequestConvenio(null))
        let req = { idProveedor: proveedor && proveedor.idProveedor && proveedor.idProveedor }
        dispatch(actions.getConveniosFuturos(req))
    }

    //Alert && SnackBar:
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    return (
        <ContenedorMenuProveedores>
            {loadingConvenioFuturo ?
                <Grid container justify='center' alignItems='center' style={{ minHeight: '500px' }}>
                    <Loader loading={true} />
                </Grid>
                : editar ?
                    <ConvenioFuturoEditar
                        convenioSeleccionado={convenioSeleccionado}
                        setConvenioSeleccionado={setConvenioSeleccionado}
                        handleClickCancelarEditar={handleClickCancelarEditar}
                        proveedor={proveedor}
                        usuarioActivo={usuarioActivo}
                    />
                    : dataConveniosFuturo && dataConveniosFuturo.length > 0 && !errorConvenioFuturo ?
                        <CustomConvenioHF
                            titulo={"Convenios a futuro"}
                            historicoConvenio={false}
                            data={dataConveniosFuturo}
                            convenioSeleccionado={convenioSeleccionado}
                            setConvenioSeleccionado={setConvenioSeleccionado}
                            handleClickEditar={handleClickEditar}
                            handleClickEliminar={handleClickEliminar}
                            loadingComponente={loadingComponente}
                            setLoadingComponente={setLoadingComponente}
                        />
                        : !errorConvenioFuturo ?
                            <Grid xs={12} style={{ margin: "auto" }}>
                                <CustomCardConvenios
                                    titulo={"Convenios A Futuro"}
                                    bodyText={"No hay convenios registrados en este proveedor"}
                                />
                            </Grid>
                            : null}
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />
            <CustomAlert
                message={`El convenio fue eliminado correctamente.`}
                onClose={handleCloseAlert}
                variant={"filled"}
                severity="success"
                open={openAlert}
                snack={true}
            />
        </ContenedorMenuProveedores>
    )
}

ConveniosFuturos.propTypes = {

}

export default ConveniosFuturos