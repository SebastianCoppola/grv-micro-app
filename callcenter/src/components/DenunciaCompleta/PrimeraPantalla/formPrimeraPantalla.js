import React, { useEffect, useState } from 'react'
//Eedux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Utils:
import { ERROR_BUSCADOR } from '../../../Utils/const'
//Mui:
import { CircularProgress, Divider, Grid } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
//Componentes:
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
import DatosDenuncia from '../../Form/Secciones/DatosDenuncia/DatosDenuncia'
import DatosPersonales from '../../Form/Secciones/DatosDelPaciente/datosPersonales'
import Domicilio from '../../Form/Secciones/DatosDelPaciente/domicilio'
import DatosContacto from '../../Form/Secciones/DatosDelPaciente/datosContacto'
import DatosEmpleado from '../../Form/Secciones/DatosLugarTrabajo/datosEmpleado'
import DatosSedeLaboral from '../../Form/Secciones/DatosLugarTrabajo/datosSedeLaboral'
import Buscador from '../../commons/Buscador/buscador'
import CustomLoading from '../../commons/Loading/CustomLoading'
import CustomAlert from '../../commons/CustomAlert/customAlert'
import CustomTypography from '../../commons/Typography/CustomTypography'
import CustomButton from '../../commons/Button/CustomButton'

const FormPrimeraPantalla = (props) => {

    const { usuarioActivo, esOperador, denuncia,
        dataSiniestroCompleto, setDataSiniestroCompleto,
        openBuscador, setOpenBuscador, disableEdition,
        setTituloNavegacionSiniestro, setId } = props

    const dispatchs = useDispatch()

    //Forms:
    const [datosPersonalesCompleto, setDatosPersonalesCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosPersonales ? dataSiniestroCompleto.datosPersonales : null)
    const [datosDomicilioCompleto, setDatosDomicilioCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosDomicilioCompleto ? dataSiniestroCompleto.datosDomicilioCompleto : null)
    const [datosContactoCompleto, setDatosContactoCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosContactoCompleto ? dataSiniestroCompleto.datosContactoCompleto : null)
    const [datosEmpleadoCompleto, setDatosEmpleadoCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosEmpleadoCompleto ? dataSiniestroCompleto.datosEmpleadoCompleto : null)
    const [datosSedeLaboralCompleto, setDatosSedeLaboralCompleto] = useState(dataSiniestroCompleto && dataSiniestroCompleto.datosSedeLaboralCompleto ? dataSiniestroCompleto.datosSedeLaboralCompleto : null)
    const [checkedSiniestroMultiple, setCheckedSiniestroMultiple] = useState(dataSiniestroCompleto && dataSiniestroCompleto.siniestroMultiple ? dataSiniestroCompleto.siniestroMultiple.checked : denuncia?.siniestroMultiple ? denuncia.siniestroMultiple : false)
    //Otros:
    const [denunciaBuscador, setDenunciaBuscador] = useState(denuncia ? denuncia : null)
    //Loadings:
    const [loading, setLoading] = useState(false)
    const loadingNuevaDenuncia = useSelector(state => state.documentos.loadingNuevaDenuncia)
    //Buscador DNI:
    const [open, setOpen] = useState(false)
    const [dataBuscador, setDataBuscador] = useState({ tipoDoc: 1, nroDoc: null })
    //SnackBar:
    const [snackbar, setSnackbar] = useState({ open: false })
    //Editar:
    const [editarDatosEmpleado, setEditarDatosEmpleado] = useState(false)
    const [editarDatosTrabajo, setEditarDatosTrabajo] = useState(false)

    //Cuando cambia DENUNCIA:
    useEffect(() => {
        if (setTituloNavegacionSiniestro) setTituloNavegacionSiniestro('Denuncia')
        setDenunciaBuscador(denuncia)
    }, [denuncia])

    //Cuando cambian los FORMS:
    useEffect(() => {
        if (setDataSiniestroCompleto && datosSedeLaboralCompleto && datosEmpleadoCompleto
            && datosContactoCompleto && datosDomicilioCompleto && datosPersonalesCompleto) {
            setDataSiniestroCompleto(data => ({
                ...data,
                idAccidentado: denuncia && denuncia.accidentado && denuncia.accidentado.idAccidentado,
                idDenuncia: denuncia && denuncia.idDenuncia ? denuncia.idDenuncia : null,
                siniestroMultiple: { checked: checkedSiniestroMultiple },
                datosPersonales: datosPersonalesCompleto,
                datosDomicilioCompleto: datosDomicilioCompleto,
                datosContactoCompleto: datosContactoCompleto,
                datosEmpleadoCompleto: datosEmpleadoCompleto,
                datosSedeLaboralCompleto: datosSedeLaboralCompleto
            }))
        }
    }, [datosDomicilioCompleto, datosPersonalesCompleto, datosContactoCompleto, datosEmpleadoCompleto, datosSedeLaboralCompleto, checkedSiniestroMultiple])

    //Buscador DNI:
    const handleBuscador = (tipoDoc, nroDoc) => {
        setDataBuscador(dataBuscador => ({ ...dataBuscador, tipoDoc: tipoDoc, nroDoc: nroDoc }))
        if (nroDoc && denuncia) {
            let callbackSuccess = (data) => {
                if (data) {
                    setDenunciaBuscador(data)
                    setId(data.accidentado.idAccidentado)
                    setOpen(false)
                }
                else setOpen(true)
            }
            dispatchs(actions.searchAccidentado(tipoDoc, nroDoc, denuncia.empleadorIdEmpleador, callbackSuccess))
        }
    }

    //Deshabilita la edición:
    const disableEditar = () => {
        let isOperador = esOperador
        let isSiniestroVerificado = denuncia && denuncia.esVerificadoSupervisor
        return disableEdition || (isOperador && isSiniestroVerificado)
    }

    return (
        <Grid container alignItems='center' spacing={3} style={{ paddingTop: '20px' }}>
            {loading ?
                <Grid>
                    <CircularProgress open={true} />
                </Grid>
                :
                <>
                    {/* BUSCADOR */}
                    <>
                        {denuncia && denuncia.estadoCEM === 2 ?
                            <Grid item container justify='center' alignItems='center'>
                                <Buscador
                                    onClik={handleBuscador}
                                    data={dataBuscador}
                                    setDataBuscador={setDataBuscador}
                                />
                                <CustomLoading loading={loadingNuevaDenuncia} />
                            </Grid>
                            : null}
                        {open ?
                            <Grid item container justify='center' alignItems='center'>
                                <Grid item xs={7}>
                                    <CustomAlert
                                        message={ERROR_BUSCADOR}
                                        onClose={() => setOpen(false)}
                                        variant={'outlined'}
                                        severity='error'
                                        open={open}
                                    />
                                </Grid>
                            </Grid>
                            : null}
                    </>

                    {/* DATOS DE LA DENUNCIA */}
                    <>
                        <DatosDenuncia
                            denuncia={denunciaBuscador}
                            usuarioActivo={usuarioActivo}
                            setSnackbar={setSnackbar}
                            setLoading={setLoading}
                            editar={!disableEdition}
                            setOpenBuscador={setOpenBuscador}
                            checkedSiniestroMultiple={checkedSiniestroMultiple}
                            setCheckedSiniestroMultiple={setCheckedSiniestroMultiple}
                        />
                    </>

                    {/* DATOS DEL EMPLEADO */}
                    <Grid container spacing={2} alignItems={'center'} style={{ marginTop: 25, border: '1px solid #dadce0', padding: 10, borderRadius: 10, backgroundColor: "#f9f9f9" }}>
                        <Grid item xs={12} container justify='space-between' alignItems='center'>
                            <CustomTypography
                                text={<strong>Datos del Empleado</strong>}
                                variant={'subtitle1'}
                                fontweight={'600'}
                            />
                            <CustomButton
                                size='small'
                                variant='outlined'
                                label={editarDatosEmpleado ? 'Vista Lectura' : 'Editar'}
                                startIcon={!editarDatosEmpleado ? <CreateIcon /> : null}
                                onClik={() => setEditarDatosEmpleado(!editarDatosEmpleado)}
                                disabled={disableEditar()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} container spacing={6}>
                            <Grid item xs={12}>
                                <CustomTypography
                                    text={<strong>Datos Personales</strong>}
                                    variant={'subtitle2'}
                                    style={{ marginBottom: 20, fontSize: 15 }}
                                />
                                <DatosPersonales
                                    isEditar={editarDatosEmpleado}
                                    tipoDoc={dataBuscador ? dataBuscador.tipoDoc : 1}
                                    denuncia={denunciaBuscador ? denunciaBuscador : denuncia}
                                    datosPersonalesCompleto={datosPersonalesCompleto}
                                    setDatosPersonalesCompleto={setDatosPersonalesCompleto}
                                    openBuscador={openBuscador}
                                    setOpenBuscador={setOpenBuscador}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <CustomTypography
                                        text={<strong>Domicilio</strong>}
                                        variant={'subtitle2'}
                                        style={{ marginBottom: 20, fontSize: 15 }}
                                    />
                                    <Domicilio
                                        isEditar={editarDatosEmpleado}
                                        denuncia={denunciaBuscador}
                                        datosDomicilioCompleto={datosDomicilioCompleto}
                                        setDatosDomicilioCompleto={setDatosDomicilioCompleto}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTypography
                                    text={<strong>Datos de Contacto</strong>}
                                    variant={'subtitle2'}
                                    style={{ marginBottom: 20, fontSize: 15 }}
                                />
                                <Grid item xs={12}>
                                    <DatosContacto
                                        isEditar={editarDatosEmpleado}
                                        denuncia={denunciaBuscador}
                                        datosContactoCompleto={datosContactoCompleto}
                                        setDatosContactoCompleto={setDatosContactoCompleto}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* DATOS DEL LUGAR DE TRABAJO */}
                    <Grid container spacing={2} alignItems={'center'}
                        style={{
                            marginTop: '25px',
                            marginBottom: '40px',
                            border: '1px solid #dadce0',
                            padding: '10px',
                            borderRadius: '10px',
                            backgroundColor: "#f9f9f9"
                        }}
                    >
                        <Grid item xs={12} container justify='space-between' alignItems='center'>
                            <CustomTypography
                                text={<strong>Datos del lugar de trabajo</strong>}
                                variant={'subtitle1'}
                                fontweight={'600'}
                            />
                            <CustomButton
                                size='small'
                                variant='outlined'
                                label={editarDatosTrabajo ? 'Vista Lectura' : 'Editar'}
                                startIcon={!editarDatosTrabajo ? <CreateIcon /> : null}
                                onClik={() => setEditarDatosTrabajo(!editarDatosTrabajo)}
                                disabled={disableEditar()}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} container spacing={6}>
                            <Grid item xs={12}>
                                <CustomTypography
                                    text={<strong>Datos empleado</strong>}
                                    variant={'subtitle2'}
                                    style={{ marginBottom: 20, fontSize: 15 }}
                                />
                                <DatosEmpleado
                                    isEditar={editarDatosTrabajo}
                                    denuncia={denunciaBuscador}
                                    datosEmpleadoCompleto={datosEmpleadoCompleto}
                                    setDatosEmpleadoCompleto={setDatosEmpleadoCompleto}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <CustomTypography
                                        text={<strong>Datos sede laboral</strong>}
                                        variant={'subtitle2'}
                                        style={{ marginBottom: 20, fontSize: 15 }}
                                    />
                                    <DatosSedeLaboral
                                        isEditar={editarDatosTrabajo}
                                        denuncia={denunciaBuscador}
                                        datosSedeLaboralCompleto={datosSedeLaboralCompleto}
                                        setDatosSedeLaboralCompleto={setDatosSedeLaboralCompleto}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }

            {/* SNACKBAR */}
            <CustomSnackBar
                handleClose={() => setSnackbar({ open: false })}
                open={snackbar.open}
                title={snackbar.title}
                severity={snackbar.severity}
                vertical={snackbar.vertical ? snackbar.vertical : 'bottom'}
            />

        </Grid>
    )
}

export default FormPrimeraPantalla

