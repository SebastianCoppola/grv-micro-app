import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../redux/actions'
//Componentes:
import ContenedorMenuProveedores from '../ContenedorMenuProveedores'
import HeaderConvenio from './HeaderConvenio'
import ContenidoConvenio from './ContenidoConvenio'
import CustomAlert from "../../../commons/CustomAlert/customAlert"
import CustomSnackBar from '../../../commons/SnackBar/CustomSnackBar'
import CustomLoader from '../../../commons/Loading/CustomLoading'
import ModalPage from '../../../commons/Modal/ModalPage'
import CustomButton from '../../../commons/Button/CustomButton'
import DrawersConvenio from '../Drawers/DrawersConvenio'
import CustomTypography from '../../../commons/Typography/CustomTypography'
import Loader from '../../../commons/Loading/Loader'
//Material: 
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    alertVersionar: {
        padding: '0',
        margin: '0',
        minWidth: '700px',
        display: 'flex',
        justifyContent: 'space-between',
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
})

const ConvenioActual = props => {
    const { setMiniMenu, proveedor, usuarioActivo } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    //Drawers:
    const [drawerNro, setDrawerNro] = useState(null)
    const [seleccion, setSeleccion] = useState(null)
    //Alerts & SnackBars & Modals:
    const [openAlert1, setOpenAlert1] = useState({ "open": false, "mensaje": null });
    const [openAlert2, setOpenAlert2] = useState({ "open": false, "text": "Versionar convenio actual", "button": 'Versionar ahora' });
    const [openSnackBar, setOpenSnackBar] = useState({ "open": false, "title": '', "severity": '' });
    const [openModal, setOpenModal] = useState({ "open": false, "title": '', "text": '', 'button1': '', 'button2': '' });
    //Redux: 
    const convenioActual = useSelector(state => state.convenio.convenioActual)
    const loadingConvenioActual = useSelector(state => state.convenio.loadingConvenioActual)
    const errorConvenioActual = useSelector(state => state.convenio.errorConvenioActual)
    const request = useSelector(state => state.convenio.request)
    //Versionar:
    const [nuevosCambios, setNuevosCambios] = useState(false)
    const [versionarActual, setVersionarActual] = useState(false)
    const [versionarFuturo1, setVersionarFuturo1] = useState(false)
    const [versionarFuturo2, setVersionarFuturo2] = useState(false)
    const [loadingVersionar, setLoadingVersionar] = useState(false)
    const dateHoy = new Date()
    const [dateValue, setDateValue] = useState(dateHoy.getFullYear() + '-' 
        + (dateHoy.getMonth()+1 > 9 ? (dateHoy.getMonth()+1) : '0' + (dateHoy.getMonth()+1)) 
        + '-' + dateHoy.getDate())
    //Tablas:
    const [editRow, setEditRow] = useState(null)
    const [firstRender, setFirstRender] = useState(true)
    const [updateTable, setUpdateTable] = useState(false)
    const [objectCriterioBusqueda, setObjectCriterioBusqueda] = useState({})
    const [aplicoValoresPrestacionesUnit, setAplicoValoresPrestacionesUnit] = useState(false)

    //Al renderizarse el componente:
    useEffect(() => {
        dispatch(actions.clearDataConvenio())
        dispatch(actions.setRequestConvenio(null))
        setMiniMenu(true)
        if (proveedor && proveedor.idProveedor) {
            dispatch(actions.getConvenioActual({ "idProveedor": proveedor.idProveedor }))
        }
        setFirstRender(false)
    }, [])

    //Al cambiar convenioActual:
    useEffect(() => {
        if (!convenioActual) {
            dispatch(actions.clearDataConvenio())
        }
    }, [convenioActual])

    //Error al cargar Convenio Actual:
    useEffect(() => {
        if (errorConvenioActual) {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Ocurrió un error al intentar cargar el convenio.',
            });
        }
    }, [errorConvenioActual])

    //Al cambiar algo y actualizar 'request'
    useEffect(() => {
        if (request !== null && !firstRender) {
            setNuevosCambios(true)
            setOpenAlert2({ "open": true, "text": "Versionar convenio actual", "button": 'Versionar ahora' });
        }
    }, [request])

    //Alert & SnackBar:
    const handleCloseAlert1 = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenAlert1({ "open": false, "mensaje": null })
    }
    const handleCloseAlert2 = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenAlert2({ "open": false, "text": "Versionar convenio actual", "button": 'Versionar ahora' })
    }
    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setOpenSnackBar({ open: false });
    };
    const handleVersionarAlert = () => {
        if (nuevosCambios) {
            setVersionarActual(true)
            handleCloseAlert2()
            handleCloseAlert1()
            onClickSaveActual()
        } else if (!nuevosCambios) {
            handleCloseAlert2()
        }
    }

    //Action Modales
    const handleButton1 = () => {
        setOpenModal({ "open": false })
        if (versionarActual) {
            setNuevosCambios(false)
            const version = convenioActual && convenioActual.version ? parseInt(convenioActual && convenioActual.version) : 1
            setOpenAlert2({
                "open": true,
                "text": `Estás en la versión ${version} del convenio actual. El botón de versionar se habilitará nuevamente cuando efectúes algún cambio en el convenio.`,
                "button": 'Aceptar'
            })
        }
        setLoadingVersionar(false)
        setVersionarActual(false)
        setVersionarFuturo1(false)
        setVersionarFuturo2(false)
    }
    const handleButton2 = () => {
        if (versionarActual || versionarFuturo2) {
            setOpenModal({ "open": false })
            history.push({ pathname: '/home/proveedores/' })
        }
        if (versionarFuturo1) {
            setLoadingVersionar(true)
            setVersionarFuturo1(false)
            setVersionarFuturo2(true)
            dispatch(actions.versionarConvenio({
                ...request,
                fechaVigenciaDesde: dateValue,
                valorNBU: request && request.valorNBU || request && request.valorNBU === '' || request && request.valorNBU === 0 ? request.valorNBU : convenioActual && convenioActual.valorNbu ? convenioActual.valorNbu : 0,
                idProveedor: proveedor.idProveedor,
                idConvenioAnterior: convenioActual && convenioActual.idConvenio ? convenioActual.idConvenio : null,
                idResponsableModificacion: usuarioActivo.id
            }, callBackVersionarFuturo))
        }
    }


    //Versionar convenio actual
    const onClickSaveActual = () => {
        setLoadingVersionar(true)
        setVersionarActual(true)
        dispatch(actions.versionarConvenio({
            ...request,
            valorNBU: request.valorNBU || request.valorNBU === 0 ? request.valorNBU : convenioActual && convenioActual.valorNbu ? convenioActual.valorNbu : 0,
            idProveedor: proveedor.idProveedor,
            idConvenioAnterior: convenioActual && convenioActual.idConvenio ? convenioActual.idConvenio : null,
            idResponsableModificacion: usuarioActivo.id
        }, callBackVersionarActual))
    }
    const callBackVersionarActual = (success, date) => {
        setLoadingVersionar(false)
        if (success) {
            setNuevosCambios(false)
            setOpenModal({
                "open": true,
                "title": 'Convenio actual versionado',
                "text": `El convenio actual con vigencia desde el ${date ? date : dateHoy.getDate() + '/' + (dateHoy.getMonth() + 1) + '/' + dateHoy.getFullYear()}, del proveedor ${proveedor.razonSocial}, se ha versionado exitosamente.`,
                'button1': 'Volver al proveedor',
                'button2': 'Ir a proveedores'
            })
            dispatch(actions.clearDataConvenio())
            dispatch(actions.setRequestConvenio(null))
            setObjectCriterioBusqueda({})
            dispatch(actions.getConvenioActual({ "idProveedor": proveedor.idProveedor }))
            setAplicoValoresPrestacionesUnit(false)
        } else {
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Ocurrió un error al intentar versionar el convenio.',
            });
        }
    }
    const callBackVersionarFuturo = (success) => {
        if (success) {
            let formatedDateValue = Math.ceil(new Date(dateValue).getTime() / 1000 / 60 / 60 / 24)
            let formatedDateHoy = Math.floor(dateHoy.getTime() / 1000 / 60 / 60 / 24)
            let esFuturo = formatedDateHoy < formatedDateValue
            if (esFuturo) {
                dispatch(actions.getConvenioActual({ "idProveedor": proveedor.idProveedor }))
                setLoadingVersionar(false)
                setOpenModal({
                    "open": true,
                    "title": 'Convenio a futuro guardado',
                    "text": `Se han guardado exitósamente el convenio a futuro. Los cambios se harán efectivos desde el ${(dateValue.split('-').reverse()).toString().replaceAll(',', '/')}.`,
                    'button1': 'Volver al proveedor',
                    'button2': 'Ir a proveedores'
                })
            } else {
                setVersionarFuturo2(false)
                setVersionarActual(true)
                callBackVersionarActual(true, (dateValue.split('-').reverse()).toString().replaceAll(',', '/'))
            }

        } else {
            setLoadingVersionar(false)
            setOpenModal({ "open": false })
            setOpenSnackBar({
                open: true,
                severity: "error",
                title: 'Ocurrió un error al intentar guardar el convenio a futuro.',
            });
        }
    }

    return (
        <ContenedorMenuProveedores>
            {loadingConvenioActual || loadingVersionar ?
                <Grid xs={12} container justify='center' alignItems='center' style={{ minHeigh: '450px' }}>
                    <Loader loading={true} />
                </Grid>
                :
                <>
                    <Grid style={{ width: '98%' }}>
                        <HeaderConvenio
                            editarConvenioFuturo={false}
                            setDrawerNro={setDrawerNro}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            aplicoValoresPrestacionesUnit={aplicoValoresPrestacionesUnit}
                        />
                        <ContenidoConvenio
                            nuevosCambios={nuevosCambios} setNuevosCambios={setNuevosCambios}
                            setOpenAlert1={setOpenAlert1} setOpenAlert2={setOpenAlert2}
                            setOpenModal={setOpenModal}
                            setVersionarActual={setVersionarActual}
                            setVersionarFuturo1={setVersionarFuturo1}
                            versionarFuturo2={versionarFuturo2}
                            setDrawerNro={setDrawerNro}
                            setEditRow={setEditRow}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            onClickSaveActual={onClickSaveActual}
                            proveedor={proveedor}
                            dateValue={dateValue} setDateValue={setDateValue}
                            updateTable={updateTable} setUpdateTable={setUpdateTable}
                            objectCriterioBusqueda={objectCriterioBusqueda}
                            setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                        />
                    </Grid>

                    <DrawersConvenio
                        drawerNro={drawerNro} setDrawerNro={setDrawerNro}
                        setOpenAlert1={setOpenAlert1} setOpenAlert2={setOpenAlert2}
                        setOpenSnackBar={setOpenSnackBar}
                        seleccion={seleccion} setSeleccion={setSeleccion}
                        editRow={editRow}
                        proveedor={proveedor}
                        editarConvenioFuturo={false}
                        setUpdateTable={setUpdateTable}
                        objectCriterioBusqueda={objectCriterioBusqueda}
                        setAplicoValoresPrestacionesUnit={setAplicoValoresPrestacionesUnit}
                    />
                    <CustomAlert
                        open={openAlert1.open}
                        message={openAlert1.mensaje}
                        onClose={handleCloseAlert1}
                        variant={'filled'}
                        severity={openAlert1.severity ? openAlert1.severity : 'success'}
                        snack={true}
                        customStyle={{ marginTop: '-200px' }}
                        color={true}
                    />
                    <CustomAlert
                        open={openAlert2.open}
                        message={
                            <div className={classes.alertVersionar}>
                                <p className={classes.alertVersionarParagraph}>{openAlert2.text}</p>
                                <button className={classes.alertVersionarButton} onClick={handleVersionarAlert}>{openAlert2.button}</button>
                            </div>
                        }
                        onClose={handleCloseAlert2}
                        variant='filled'
                        severity='info'
                        snack={true}
                        autoHideDuration={1000000}
                    />
                    <CustomSnackBar
                        handleClose={handleCloseSnackBar}
                        open={openSnackBar.open}
                        title={openSnackBar.title}
                        severity={openSnackBar.severity}
                    />

                    <CustomLoader loading={false} />

                    <ModalPage
                        noBodyPadding={true}
                        buttonsCentered={true}
                        open={openModal.open}
                        fullWidth={true}
                        maxWidth={'xs'}
                        divisor={true}
                        title={<CustomTypography variant={'body1'} text={<strong>{openModal.title}</strong>} style={{ fontSize: '14px' }} />}
                        subtitle={<CustomTypography variant={'body2'} text={<>{openModal.text}</>} />}
                        actions={[
                            <CustomButton
                                variant={'outlined'}
                                isAction={true}
                                label={openModal.button1}
                                onClik={handleButton1}
                            />,
                            <CustomButton
                                label={openModal.button2}
                                variant={'contained'}
                                color={'primary'}
                                isAction={true}
                                onClik={handleButton2}
                            />
                        ]}
                    />
                </>
            }
        </ContenedorMenuProveedores>
    )
}

export default ConvenioActual