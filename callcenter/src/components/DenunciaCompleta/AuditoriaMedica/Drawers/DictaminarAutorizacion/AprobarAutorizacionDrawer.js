import React, { useState } from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Mui:
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { ArrowDropUp } from '@material-ui/icons'
//Icons:
import { ReactComponent as View } from "../../../../../commons/assets/auditoriaMedica/view.svg"
import AdminSlide from '../../../../commons/Slider/AdminSlide'
import DatosAutorizacion from './DatosAutorizacion'
import CustomButton from '../../../../commons/Button/CustomButton'
import ConfirmarAprobacion from './ConfirmarAprobacion'
import RechazarAprobacion from './RechazarAprobacion'
import Drawer2 from '../../../../commons/CustomDrawer/Drawer'
import { Tooltip as TippyTooltip } from 'react-tippy'

const useStyles = makeStyles({
    iconBnt: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    tippyObservaciones: {
        margin: '0px 0px 15px 0px',
        borderRadius: '5px',
        background: '#ffff',
        padding: '14px 17px',
        border: 'solid 1px #d3d3d3',
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
        gap: 5
    },
    tippyOptions: {
        fontSize: '14px',
        cursor: 'pointer',
        padding: '5px 7px',
        "&:hover": {
            opacity: '0.8',
        },
    }
})

const AprobarAutorizacionDrawer = ({ autorizacionPendiente, denuncia }) => {
    const classes = useStyles()
    //Redux:
    const detalleAutorizacionPendiente = useSelector(state => state.auditoriaMedica.dataDetalleAutorizacionPendiente)
    //Drawer:
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const [activeStep, setActiveStep] = useState(0)
    const [aprobarTodo, setAprobarTodo] = useState(false)
    const [disableRechazarAprobar, setDisableRechazarAprobar] = useState(false)
    const [request, setRequest] = useState(null)
    //Numero para Aprobar o rechazar autorizacion
    const [numero, setNumero] = useState(null)

    //Aprobar con traslado:
    const handleAprobarTodo = () => {
        setRequest({ ...request, aprobarTraslado: true })
        setAprobarTodo(true)
        setActiveStep(1)
    }

    //Aprobar sin traslado:
    const handleAprobarSinTraslado = () => {
        setAprobarTodo(false)
        setRequest({ ...request, aprobarTraslado: false })
        setActiveStep(1)
    }

    //Toggle Drawers:
    const toggleDrawer = () => (event) => {
        setOpenDrawer({ ...openDrawer, right: false })
        setActiveStep(0)
    }

    //Contenido Drawers:
    let contenidoDrawers = [
        {
            texto: <DatosAutorizacion
                idTipo={autorizacionPendiente && autorizacionPendiente.tipo}
                numeroAutorizacion={autorizacionPendiente && autorizacionPendiente.nroAutorizacion}
                disableRechazarAprobar={disableRechazarAprobar}
                setDisableRechazarAprobar={setDisableRechazarAprobar}
                request={request}
                setRequest={setRequest}
                setNumero={setNumero}
            />
        },
        {
            texto: <ConfirmarAprobacion
                setActiveStep={setActiveStep}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                autorizacionPendiente={autorizacionPendiente}
                aprobarTodo={aprobarTodo}
                request={request}
                setRequest={setRequest}
                numero={numero}
                denuncia={denuncia}
            />
        },
        {
            texto: <RechazarAprobacion
                setActiveStep={setActiveStep}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                autorizacionPendiente={autorizacionPendiente}
                request={request}
                setRequest={setRequest}
                numero={numero}
                denuncia={denuncia}
            />
        }
    ]

    //Max Steps
    let maxSteps = contenidoDrawers.length

    //Retorna los botones del drawer:
    let returnButtons = () => {
        if (activeStep !== 1 && activeStep !== 2) {
            return (
                <Grid style={{ display: 'flex', justifyContent: 'flex-end', gap: 5, margin: '10px 10px 20px 10px' }}>
                    <CustomButton
                        size="small"
                        variant={'contained'}
                        label={'Cancelar'}
                        styleButton={{ height: 35, borderRadius: "20px", border: "1px solid #747474", background: "rgba(200,0,0,0)" }}
                        styleLabel={{ color: "#747474" }}
                        onClik={() => setOpenDrawer({ ...openDrawer, right: false })}
                    />
                    <CustomButton
                        size="small"
                        variant={'contained'}
                        label={'Rechazar'}
                        color='#d7373f'
                        styleButton={{ opacity: disableRechazarAprobar ? 0.4 : 1, height: 35, borderRadius: "20px", border: "1px solid #d7373f", background: "rgba(200,0,0,0)" }}
                        styleLabel={{ color: "#d7373f" }}
                        onClik={() => setActiveStep(2)}
                        disabled={disableRechazarAprobar}
                    />
                    {detalleAutorizacionPendiente && detalleAutorizacionPendiente.traslado ?
                        <TippyTooltip
                            position="top"
                            trigger="click"
                            html={(
                                <div className={classes.tippyObservaciones}>
                                    <Typography className={classes.tippyOptions} style={{ marginBottom: 10 }} onClick={handleAprobarTodo}>
                                        Aprobar todo
                                    </Typography>
                                    <Typography className={classes.tippyOptions} onClick={handleAprobarSinTraslado}>
                                        Aprobar sin traslado
                                    </Typography>
                                </div>
                            )}
                            disabled={disableRechazarAprobar}
                        >
                            <CustomButton
                                size="small"
                                variant={'contained'}
                                label={
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        Aprobar <ArrowDropUp />
                                    </span>
                                }
                                color="primary"
                                styleButton={{ height: 35, borderRadius: "20px" }}
                                disabled={disableRechazarAprobar}
                            />
                        </TippyTooltip>
                        :
                        <CustomButton
                            size="small"
                            variant={'contained'}
                            label={"Aprobar"}
                            color="primary"
                            styleButton={{ height: 35, borderRadius: "20px" }}
                            onClik={() => setActiveStep(1)}
                            disabled={disableRechazarAprobar}
                        />
                    }
                </Grid>
            )
        }
    }

    return (
        <>
            {/*Boton*/}
            <IconButton size='small' onClick={() => setOpenDrawer({ ...openDrawer, right: true })} className={classes.iconBnt}>
                <View htmlColor='#853434' style={{ color: '#853434' }} color='#853434' />
            </IconButton>
            {/*Drawer*/}
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor="right"
                toggleDrawer={toggleDrawer}
                variant={'contained'}
                button={false}
                title={'Dictaminar Autorización'}
                titleStyleJustify={'flex-start'}
                titleStyleMargin={{ marginLeft: '20px' }}
                width={500}
            >
                <AdminSlide
                    contenido={contenidoDrawers}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxStep={maxSteps}
                    buttons={returnButtons()}
                />
            </Drawer2>
        </>
    )
}

export default AprobarAutorizacionDrawer