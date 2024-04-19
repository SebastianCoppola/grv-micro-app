import React, { useEffect } from 'react'
import { Grid, Divider, Typography } from '@material-ui/core'
import CustomButton from '../../../../commons/Button/CustomButton'
import { useDispatch } from 'react-redux'
import { aprobarRechazarAutorizacion, getDataPracticasPendientesAutorizacion, setSnackBarAuditoria } from '../../../../../redux/actions/auditoriaMedica'

const RechazarAprobacion = (props) => {
    const { numero, setActiveStep, setOpenDrawer, openDrawer, request, setRequest, denuncia } = props
    const dispatch = useDispatch()

    useEffect(() => setRequest({ ...request, aprobarAutorizacion: false, aprobarTraslado: false }), [])


    //Confirmar: 
    const handleConfirmar = () => {
        setOpenDrawer({ ...openDrawer, right: false })
        dispatch(aprobarRechazarAutorizacion(request, callback))
    }

    let callback = (bool) => {
        if (bool) {
            dispatch(setSnackBarAuditoria({
                open: true,
                severity: "success",
                message: `Autorizacion ${numero ? numero : ""} rechazada`,
                vertical: "bottom"
            }))
            const errorCallback = (bool) => {
                if (bool) {
                    dispatch(setSnackBarAuditoria({
                        open: true,
                        severity: 'error',
                        message: 'Ocurrió un error al intentar cargar los datos de la tabla.',
                        vertical: 'top'
                    }))
                }
            }
            let req = { "idDenuncia": denuncia && denuncia.idDenuncia, offset: 0, limit: 5 }
            dispatch(getDataPracticasPendientesAutorizacion(req, errorCallback))
        } else {
            dispatch(setSnackBarAuditoria({
                open: true,
                severity: "error",
                message: `Hubo un error al rechazar la autorizacion ${numero ? numero : ""}`,
                vertical: "bottom"
            }))
        }
    }

    return (
        <Grid style={{ width: 350, border: '1px solid #dadce0', borderRadius: '5px', padding: '0px 20px', margin: '150px 0 0 0', margin: 'auto', marginTop: 150 }}>
            <Typography style={{ fontSize: 17, fontWeight: 700, padding: '15px 0' }}>
                Confirmar rechazo
            </Typography>
            <Divider />
            <Typography style={{ fontSize: 13, padding: '15px 0' }}>
                Se rechazará la autorización {numero ? numero : "1058454"}.<br />
                ¿Desea confirmar esta decisión?
            </Typography>
            <Grid container justify='flex-end' style={{ padding: '15px 0 15px 0', gap: 10 }}>
                <CustomButton
                    variant="contained"
                    label="Volver"
                    styleButton={{ borderRadius: 20 }}
                    styleLabel={{ color: '#747474' }}
                    onClik={() => setActiveStep(0)}
                />
                <CustomButton
                    variant="contained"
                    label="Confirmar"
                    styleButton={{ borderRadius: 20, background: '#ff0000' }}
                    styleLabel={{ color: '#ffff' }}
                    onClik={handleConfirmar}
                />
            </Grid>
        </Grid>
    )
}

export default RechazarAprobacion
