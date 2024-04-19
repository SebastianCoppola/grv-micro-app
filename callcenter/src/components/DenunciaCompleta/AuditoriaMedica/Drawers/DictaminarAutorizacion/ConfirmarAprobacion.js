import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Divider, Typography } from '@material-ui/core'
import { aprobarRechazarAutorizacion, getDataPracticasPendientesAutorizacion, setSnackBarAuditoria } from '../../../../../redux/actions/auditoriaMedica'
import CustomButton from '../../../../commons/Button/CustomButton'

const ConfirmarAprobacion = (props) => {
    const { numero, setActiveStep, setOpenDrawer, openDrawer, aprobarTodo, aprobarSinTraslado, request, setRequest, denuncia } = props
    const dispatch = useDispatch()

    useEffect(() => setRequest({ ...request, aprobarAutorizacion: true }), [])

    //Confirmar: 
    const handleConfirmar = () => {
        dispatch(aprobarRechazarAutorizacion(request, callbackConfirmar))
    }

    let callbackConfirmar = (bool) => {
        
        dispatch(setSnackBarAuditoria({
            open: true,
            severity: bool ? 'success' : 'error',
            message: bool ? `Autorizacion ${numero ? numero : ""} aprobada` : `Hubo un error al aprobar la autorizacion ${numero ? numero : ""}`,
            vertical: bool ? 'bottom' : 'top'
        }))
        
        if (bool) {
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
            setOpenDrawer({...openDrawer, right: false})
        }

    }

    return (
        <Grid style={{ width: 350, border: '1px solid #dadce0', borderRadius: '5px', padding: '0px 20px', margin: '150px 0 0 0', margin: 'auto', marginTop: 150 }}>
            <Typography style={{ fontSize: 17, fontWeight: 700, padding: '15px 0' }}>
                {
                    aprobarTodo ? 'Confirmar aprobación con traslado' :
                        aprobarSinTraslado ? 'Confirmar aprobación sin traslado' :
                            'Confirmar aprobación'
                }
            </Typography>
            <Divider />
            {aprobarTodo ?
                <Typography style={{ fontSize: 13, padding: '15px 0' }}>
                    Se aprobará la autorización {numero ? numero : "1058454"} con
                    solicitud de traslado. ¿Desea confirmar esta decisión?
                </Typography>
                : aprobarSinTraslado ?
                    <Typography style={{ fontSize: 13, padding: '15px 0' }}>
                        Se aprobará la autorización {numero ? numero : "1058454"} pero
                        se rechazará la solicitud de traslado.
                        ¿Desea confirmar esta decisión?
                    </Typography>
                    :
                    <Typography style={{ fontSize: 13, padding: '15px 0' }}>
                        Se aprobará la autorización {numero ? numero : "1058454"}.{<br />}
                        ¿Desea confirmar esta decisión?
                    </Typography>
            }
            <Grid container justify='flex-end' style={{ padding: '15px 0 15px 0', gap: 10 }}>
                <CustomButton
                    variant="contained"
                    label="Volver"
                    styleButton={{ borderRadius: 20 }}
                    styleLabel={{ color: '#747474' }}
                    onClik={() => setActiveStep(0)}
                />
                <CustomButton
                    color="primary"
                    variant="contained"
                    label="Confirmar"
                    styleButton={{ borderRadius: 20 }}
                    onClik={handleConfirmar}
                />
            </Grid>
        </Grid>
    )
}

export default ConfirmarAprobacion
