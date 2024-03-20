import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//Material:
import { Grid, makeStyles } from '@material-ui/core'
//Components:
import CustomButton from '../../../commons/Button/CustomButton'
import CustomAlert from '../../../commons/CustomAlert/customAlert'
import HeaderConvenio from '../ConvenioActual/HeaderConvenio'
import DrawersConvenio from '../Drawers/DrawersConvenio'
import ContenidoEditar from './ContenidoEditar'
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar';
import Loader from '../../../commons/Loading/Loader'


const useStyles = makeStyles((theme) => ({
    titles: {
        fontSize: "16px",
        color: "#323232"
    },
    alertVersionar: {
        padding: '0',
        margin: '0',
        minWidth: '700px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    alertVersionarParagraph: {
        padding: '0',
        margin: '0',
    },
    alertVersionarButton: {
        padding: '0',
        margin: '0',
        border: 'none',
        backgroundColor: 'inherit',
        color: 'white',
        cursor: 'pointer'
    },
}))

/**
 * Props:
 * convenioSeleccionado => datos para la cabecera y las tablas
 * handleClickCancelarEditar => para cancelar la edicion convenio futuro y volver a la pantalla anterior
 *  
 */
const ConvenioFuturoEditar = (props) => {
    const { convenioSeleccionado, setConvenioSeleccionado, handleClickCancelarEditar, proveedor, usuarioActivo } = props
    const history = useHistory();
    const classes = useStyles(props)
    //Redux
    const dispatch = useDispatch()
    const request = useSelector(state => state.convenio.request)
    const dataConveniosFuturo = useSelector(state => state.convenio.convenioFuturo)
    //Loadings
    const [loadingComponent, setLoadingComponent] = useState(true)
    //Drawers
    const [editRow, setEditRow] = useState({})
    const [drawerNro, setDrawerNro] = useState(null)
    const [updateTable, setUpdateTable] = useState(false)
    //Alerts && SnackBars
    const [openAlert1, setOpenAlert1] = useState({ 'open': false, 'text': null, 'button': 'Ir al Proveedor' });
    const [openAlert2, setOpenAlert2] = useState({ 'open': false, 'mensaje': null });
    const [openSnackBar, setOpenSnackBar] = useState({ 'open': false, 'title': '', 'severity': '' });
    //Seleccion
    const [seleccion, setSeleccion] = useState(null)
    const [objectCriterioBusqueda, setObjectCriterioBusqueda] = useState({})
    const [aplicoValoresPrestacionesUnit, setAplicoValoresPrestacionesUnit] = useState(false)


    //Loading FALSE al cargar el componente:
    useEffect(() => {
        if (convenioSeleccionado) setLoadingComponent(false)
    }, [])


    //Guardar cambios
    const callbackUpdateConveniosFuturos = (exito, data) => {
        let convenioActualizado = data.filter(it => it.idConvenio === convenioSeleccionado.idConvenio)
        if (convenioActualizado.length > 0) {
            setConvenioSeleccionado(convenioActualizado[0])
            setOpenAlert1({ ...openAlert1, open: true, text: 'Cambios GUARDADOS.' })
            setLoadingComponent(false)
        } else {
            history.push({ pathname: '/home/proveedores/convenioActual' })
            setLoadingComponent(false)
        }
        if (!exito) {
            setOpenSnackBar({ 'open': true, 'title': 'Ocurrió un error al recuperar el convenio guardado.', 'severity': 'error' })
            setLoadingComponent(false)
        }
    }
    const callBackGuardarFuturo = (exito) => {
        if (exito) {
            setSeleccion(null)
            setAplicoValoresPrestacionesUnit(false)
            setOpenAlert2({ open: 'false' })
            setOpenAlert1({ ...openAlert1, open: true, text: "Cambios GUARDADOS." })
            dispatch(actions.setRequestConvenio(null))
            setObjectCriterioBusqueda({})
            dispatch(actions.updateConveniosFuturos({ idProveedor: proveedor && proveedor.idProveedor && proveedor.idProveedor }, callbackUpdateConveniosFuturos))
        }
        else {
            setOpenSnackBar({ 'open': true, 'title': 'Ocurrió un error al intentar guardar el convenio', 'severity': 'error' });
            setLoadingComponent(false)
        }
    }
    const handleClickGuardarCambios = () => {
        setLoadingComponent(true)
        setOpenAlert1({open: false})
        setOpenAlert2({open: false})
        dispatch(actions.guardarConvenioFuturo({
            ...request,
            valorNBU: request.valorNBU || request.valorNBU === 0 ? request.valorNBU : convenioSeleccionado && convenioSeleccionado.valorNbu ? convenioSeleccionado.valorNbu : 0,
            idProveedor: proveedor.idProveedor,
            idConvenioAnterior: convenioSeleccionado.idConvenio,
            idResponsableModificacion: usuarioActivo.id
        }, callBackGuardarFuturo))
    }
    const irAlProveedor = () => {
        history.push({ pathname: '/home/proveedores/convenioActual' })
    }


    //Alert && SnackBar:
    const handleCloseAlert1 = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenAlert1({ "open": false, "text": null, "button": 'Ir al Proveedor' })
    }
    const handleCloseAlert2 = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenAlert2({ ...openAlert2, open: false })
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };


    return (
        <Grid container xs={12}>
            {loadingComponent ?
                <Grid container justify='center' alignItems='center' style={{ minHeight: '500px' }}>
                    <Loader loading={true} />
                </Grid>
                :
                <>
                    <HeaderConvenio
                        data={convenioSeleccionado}
                        editarConvenioFuturo={true}
                        drawerNro={drawerNro}
                        setDrawerNro={setDrawerNro}
                        seleccion={seleccion}
                        setSeleccion={setSeleccion}
                        aplicoValoresPrestacionesUnit={aplicoValoresPrestacionesUnit}
                    />
                    <Grid container xs={11} style={{ margin: 'auto' }}>
                        <ContenidoEditar
                            convenioSeleccionado={convenioSeleccionado}
                            proveedor={proveedor}
                            setDrawerNro={setDrawerNro}
                            setEditRow={setEditRow}
                            setOpenAlert1={setOpenAlert2}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            updateTable={updateTable} setUpdateTable={setUpdateTable}
                            objectCriterioBusqueda={objectCriterioBusqueda}
                            setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                        />
                    </Grid>
                    <Grid container xs={12} justify='flex-end' style={{ margin: '70px 50px 50px 0' }}>
                        <CustomButton
                            label={"Cancelar"}
                            variant={"outlined"}
                            disabled={false}
                            isAction={true}
                            onClik={handleClickCancelarEditar}
                        />
                        <CustomButton
                            styleButton={{ marginLeft: "5px" }}
                            label={"Guardar cambios"}
                            color={"primary"}
                            variant={"contained"}
                            disabled={request ? false : true}
                            isAction={true}
                            onClik={handleClickGuardarCambios}
                        />
                    </Grid>
                </>

            }

            <CustomAlert
                open={openAlert1.open}
                message={
                    <div className={classes.alertVersionar}>
                        <p className={classes.alertVersionarParagraph}>{openAlert1.text}</p>
                        <button className={classes.alertVersionarButton} onClick={irAlProveedor}> {openAlert1.button}</button>
                    </div>
                }
                onClose={handleCloseAlert1}
                variant='filled'
                severity='success'
                snack={true}
                autoHideDuration={1000000}
            />
            <CustomAlert
                message={openAlert2.mensaje}
                onClose={handleCloseAlert2}
                variant={"filled"}
                severity={openAlert2.severity ? openAlert2.severity : 'success'}
                open={openAlert2.open}
                snack={true}
                customStyle={{ marginTop: '-200px' }}
            />
            <CustomSnackBar
                handleClose={handleCloseSnackBar}
                open={openSnackBar.open}
                title={openSnackBar.title}
                severity={openSnackBar.severity}
            />

            <DrawersConvenio
                drawerNro={drawerNro} setDrawerNro={setDrawerNro}
                editRow={editRow}
                proveedor={proveedor}
                editarConvenioFuturo={true}
                convenioSeleccionado={convenioSeleccionado}
                seleccion={seleccion} setSeleccion={setSeleccion}
                setOpenAlert1={setOpenAlert2} setOpenAlert2={setOpenAlert1} 
                setOpenSnackBar={setOpenSnackBar}
                setUpdateTable={setUpdateTable}
                objectCriterioBusqueda={objectCriterioBusqueda}
                setAplicoValoresPrestacionesUnit={setAplicoValoresPrestacionesUnit}
            />
        </Grid>
    )
}

export default ConvenioFuturoEditar