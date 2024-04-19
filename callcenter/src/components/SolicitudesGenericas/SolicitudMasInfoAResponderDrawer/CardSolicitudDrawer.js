import React, { useEffect, useState } from "react";
//Mui:
import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
//Components:
import CustomButton from "../../commons/Button/CustomButton";
import ArchivoAdjunto from "../DetalleSolicitudGenerica/ArchivoAdjunto";
import ResponderMasInfoForm from "./ResponderMasInfoForm";
import { ReactComponent as InfoRespondidaIcon } from '../../../commons/assets/IconsSolicitudesGenericas/infoRespondidaIcon.svg';
//Context:
import { useRespuestaSolicitudContext } from './RespuestaSolicitudContext';
//Utils:
import Utils from "../../../Utils/utils";


const useStyles = makeStyles((theme) => ({
    card: {
        boxSizing: 'border-box',
        borderRadius: 8,
        border: '1px solid #dadce0',
        width: '100%'
    },
    label: {
        fontSize: 14,
        color: '#747474',
        marginRight: 12
    },
    value: {
        fontSize: 14
    },
    observacion: {
        backgroundColor: 'rgba(47, 207, 213, 0.1)'
    },
    respuesta: {
        backgroundColor: 'rgba(47, 207, 213, 0.1)'
    },
    sinRespuesta: {
        color: '#e34850',
        backgroundColor: '#f5f5f5',
        textAlign: 'center'
    }
}));

const CardSolicitudDrawer = ({ solicitud, aResponder, comprimir, file, setFile }) => {
    const classes = useStyles()
    const [openCard, setOpenCard] = useState(comprimir ? false : true)
    const [openResponderMasInfoForm, setOpenResponderMasInfoForm] = useState(false)
    const [respuesta] = useRespuestaSolicitudContext()

    useEffect(() => {
        if (respuesta.respuesta === null) {
            setOpenResponderMasInfoForm(false)
        }
    }, [respuesta])

    return (
        <Box px={3} py={2} className={classes.card}>
            <Grid container direction="column" spacing={2}>
                <Grid container item justify="space-between" alignItems="center" spacing={1}>
                    <Grid item xs><Typography style={{ fontSize: 17 }}>{`Solicitud #${solicitud && solicitud.idSolicitudMasInfo ? solicitud.idSolicitudMasInfo : '-'}`}</Typography></Grid>
                    <Grid item>
                        <Box display="flex" alignItems="center">
                            <Typography className={classes.label}>Fecha de solicitud:</Typography>
                            <Typography className={classes.value}>
                                {solicitud && solicitud.fechaSolicitud ?
                                    Utils.dateFormat5(solicitud.fechaSolicitud)
                                    : '-'
                                }
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box display="flex" alignItems="center" ml={1}>
                            <Typography className={classes.label}>Estado solicitud:</Typography>
                            <CustomButton
                                height={30}
                                label={solicitud && solicitud.descripcionEstado ? solicitud.descripcionEstado : '-'}
                                styleButton={{ border: '1px solid #fdc800', backgroundColor: 'rgba(255, 205, 113, 0.27)' }}
                                styleLabel={{ color: '#f29423' }}
                                disabled={true}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <CustomButton
                            height={30}
                            width={90}
                            label={openCard ? 'Comprimir' : 'Expandir'}
                            styleButton={{ border: '1px solid #d3d3d3' }}
                            styleLabel={{ color: '#505050', fontSize: 15 }}
                            onClik={() => setOpenCard(prevState => !prevState)} />
                    </Grid>
                </Grid>
                <Grid item><Divider /></Grid>
                <Grid item container spacing={3}>
                    <Grid container item direction="column" spacing={2} xs>
                        <Grid item>
                            <Box display="flex" alignItems="center">
                                <Typography className={classes.label}>Solicitante responsable:</Typography>
                                {solicitud && solicitud.solicitante ?
                                    <CustomButton
                                        height={30}
                                        label={solicitud.solicitante}
                                        startIcon={<PersonIcon />}
                                        styleButton={{ boxSizing: 'border-box', border: '1px solid #cacaca', backgroundColor: '#f5f5f5' }}
                                        styleLabel={{ textTransformation: 'none', color: '#6e6e6e' }}
                                        disabled={true}
                                    />
                                    : '-'}
                            </Box>
                        </Grid>
                        {openCard && (
                            <>
                                <Grid item>
                                    <Box p={2} className={classes.observacion}>
                                        <Typography style={{ fontSize: 14 }}>{`Observación: ${solicitud && solicitud.observacion ? solicitud.observacion : '-'}`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box display="flex" flexWrap="wrap">
                                        <Typography className={classes.label}>Adjunto de la solicitud:</Typography>
                                        {solicitud && solicitud.adjuntoSolicitud
                                            ? <Box flexGrow={1}><ArchivoAdjunto nombre={solicitud && solicitud.adjuntoSolicitud ? solicitud.adjuntoSolicitud : "-"} peso="15 Kb" /></Box>
                                            : <Typography style={{ fontSize: 14 }}>Sin adjunto</Typography>}
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Grid container item direction="column" alignItems="stretch" spacing={2} xs>
                        {openResponderMasInfoForm && openCard ?
                            <Grid item>
                                <ResponderMasInfoForm
                                    solicitud={solicitud}
                                    setOpenResponderMasInfoForm={setOpenResponderMasInfoForm}
                                    file={file}
                                    setFile={setFile}
                                />
                            </Grid>
                            :
                            <>
                                <Grid item>
                                    <Box display="flex" alignItems="center">
                                        <Typography className={classes.label}>Gestor solicitado:</Typography>
                                        {solicitud && (solicitud.gestorSolicitado || solicitud.areaGestion) ?
                                            <CustomButton
                                                height={30}
                                                label={solicitud && solicitud.gestorSolicitado ? solicitud.gestorSolicitado : solicitud.areaGestion}
                                                startIcon={<PersonIcon />}
                                                styleButton={{ boxSizing: 'border-box', border: '1px solid #cacaca', backgroundColor: '#f5f5f5' }}
                                                styleLabel={{ textTransformation: 'none', color: '#6e6e6e' }}
                                                disabled={true}
                                            />
                                            : '-'}
                                    </Box>
                                </Grid>
                                {openCard && (
                                    <>
                                        <Grid item>
                                            {aResponder ?
                                                <Box style={{ border: 'solid 1px #f2f2f2' }}>
                                                    <Box minHeight={100} display="flex" justifyContent="center" alignItems="center">
                                                        <CustomButton
                                                            startIcon={<InfoRespondidaIcon />}
                                                            label="Responder + info"
                                                            styleButton={{ border: '1px solid #d3d3d3' }}
                                                            styleLabel={{ color: '#505050' }}
                                                            onClik={() => setOpenResponderMasInfoForm(true)}
                                                        />
                                                    </Box>
                                                </Box>
                                                :
                                                <Box p={2} className={solicitud.respuesta ? classes.respuesta : classes.sinRespuesta}>
                                                    <Typography style={{ fontSize: 14 }}>
                                                        {solicitud.respuesta ? `Respuesta: ${solicitud.respuesta}` : 'Sin respuesta'}
                                                    </Typography>
                                                </Box>
                                            }
                                        </Grid>
                                        <Grid item >
                                            <Box display="flex" flexWrap="wrap">
                                                <Typography className={classes.label}>Adjunto de la respuesta:</Typography>
                                                {solicitud && solicitud.adjuntoDeRespuesta
                                                    ? <Box flexGrow={1}><ArchivoAdjunto nombre={solicitud && solicitud.adjuntoDeRespuesta ? solicitud.adjuntoDeRespuesta : "-"} peso="15 Kb" /></Box>
                                                    : <Typography style={{ fontSize: 14 }}>Sin adjunto</Typography>
                                                }
                                            </Box>
                                        </Grid>
                                    </>
                                )}
                            </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
};

export default CardSolicitudDrawer;
