//React:
import { useEffect, useState } from 'react'
//Mui:
import { Grid, makeStyles, Typography, Divider, FormControlLabel, Checkbox, TextField } from '@material-ui/core'
//Components:
import CustomButton from '../../../../../commons/Button/CustomButton'
import AlarmaModal from './AlarmaModal'
//Icons:
import NuevoProximoContactoAM from '../../../Drawers/NuevoProximoContactoAM/NuevoProximoContactoAM'
import RegionPatologica from './RegionPatologica'
import Utils from '../../../../../../Utils/utils'

const useStyles = makeStyles({
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)',
    },
    label: {
        fontSize:14, 
        color:'#747474'
    },
    value: {
        fontSize:14, 
        color:'#505050'
    },
})

const AuditoriaBox = ({denuncia, request, setRequest}) => {

    const classes = useStyles()

    return (
        <>
            <Grid item xs={12} container justify='space-between' alignItems='center'>
                <Typography style={{color:'#505050', fontSize:'16px', fontWeight:'700'}}>Auditoria</Typography>
                <NuevoProximoContactoAM denuncia={denuncia} setRequest={setRequest} request={request}/>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{display:'flex', gap:'10px', marginTop:20}}>
                <Typography className={classes.label}>Fecha próximo contacto auditoría: </Typography>
                <Typography className={classes.value}>
                    {request && request.fechaProxContactoAM 
                        ? Utils.formatoFecha(new Date(request.fechaProxContactoAM),'dd/mm/yyyy') 
                        : ' - '
                    }
                </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop:10}}>
                <Typography className={classes.label}>Observaciones próximo contacto: </Typography>
                <Typography className={classes.value}> 
                    {request && request.observacionProxContactoAM ? request.observacionProxContactoAM : ' - '}
                </Typography>
            </Grid>
            <Grid item xs={12} style={{marginTop:20}}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.patologiaInculpable}
                            onChange={()=>setRequest({...request, patologiaInculpable: !request.patologiaInculpable})}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Patología inculpable </Typography>
                    }
                />
            </Grid>
            { request.patologiaInculpable === true &&
                <>
                    <Grid item xs={12} style={{marginTop:10}}>
                        <RegionPatologica 
                            request={request} 
                            setRequest={setRequest}
                        />
                    </Grid>
                    <Grid item xs={12} style={{marginTop:10}}>
                        <Typography className={classes.label}>Patología: * </Typography>
                        <TextField
                            value={request.patologia ?? ''}
                            onChange={(e) => setRequest({...request, patologia: e.target.value})}
                            placeholder='Completar'
                            style={{width:'500px', fontSize:10}}
                            inputProps={{ style: {fontSize: 14} }}
                        />
                    </Grid>
                </>
            }
            {/**
             * 
             * SE COMENTA LA ALARMA HASTA DESARROLLAR NUEVA DEFINICION DEL CLIENTE
             * 
             *<Grid item xs={12} container style={{margin:'30px 0 20px 0'}}>
                    <FormControlLabel
                        control={<AlarmaModal esPosponer={false} request={request} setRequest={setRequest} idDenuncia={denuncia.idDenuncia}/>}
                        label={
                            <Typography className={classes.label}>
                                {request.alarmaEstudiosPendientes ? 
                                    <>
                                        Alarma de estudios pendientes: {request.fechaAlarmaEstudiosPendientes ? 
                                            Utils.formatoFecha(new Date(request.fechaAlarmaEstudiosPendientes), 'dd/mm/yyyy') 
                                            : ' - '}
                                    </>
                                    : <>Sin alarma de estudios pendientes</>
                                }
                            </Typography>
                        }
                    />
                    { request.alarmaEstudiosPendientes && 
                        <CustomButton 
                            label={<AlarmaModal 
                                        esPosponer={true} 
                                        idDenuncia={denuncia.idDenuncia} 
                                        request={request} setRequest={setRequest} 
                                        fechaAlarmaEstudiosPendientes={request.fechaAlarmaEstudiosPendientes}/>}
                            variant='outlined'
                            styleButton={{marginLeft:30}}
                        />
                    }
                </Grid> 
             * 
             */}
                            
            
        </>
    )
}

export default AuditoriaBox