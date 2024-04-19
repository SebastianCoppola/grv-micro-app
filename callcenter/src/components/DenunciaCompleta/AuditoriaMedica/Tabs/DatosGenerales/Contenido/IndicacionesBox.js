//Mui:
import { Grid, makeStyles, Typography, Divider, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
//Components:
import CustomButton from '../../../../../commons/Button/CustomButton'
import NuevaIndicacion from '../../../Drawers/NuevaIndicacion/NuevaIndicacion'
//Icons:
import ExcelIcon2 from '../../../../../../commons/assets/DenunciaCompleta/excelFileIcon.svg'
import InformarIndicacion from '../../../Drawers/InformarIndicacion/InformarIndicacion'

const useStyles = makeStyles({
    label: {
        fontSize:14, 
        color:'#747474',
        marginRight:'10px'
    },
    value: {
        fontSize:14, 
        color:'#505050'
    },
})

const HARDCODED_INDICACIONES = [
    {nroIndicacion:14, fechaIndicacion:'22/05/2023 16:55:16', fechaAccion:'22/05/2023 16:55:16', indicacion:'Prueba de indicacion 01.', solicitante:'Fernando Medina', gestor:'Pablo Perez', accionRealizada:'', diasDemora:5},
    {nroIndicacion:15, fechaIndicacion:'22/05/2023 16:55:16', fechaAccion:'22/05/2023 16:55:16', indicacion:'Prueba de indicacion 01.', solicitante:'Fernando Medina', gestor:'Pablo Perez', accionRealizada:'Test 01', diasDemora:5},
    {nroIndicacion:16, fechaIndicacion:'22/05/2023 16:55:16', fechaAccion:'22/05/2023 16:55:16', indicacion:'Prueba de indicacion 01.', solicitante:'Fernando Medina', gestor:'Pablo Perez', accionRealizada:'', diasDemora:5},
]

const IndicacionesBox = ({denuncia}) => {

    const classes = useStyles()

    return (
        <>
            <Grid item xs={12} container justify='space-between' alignItems='center'>
                <Typography style={{color:'#505050', fontSize:'16px', fontWeight:'700'}}>Auditoria</Typography>
                <Grid item style={{display:'flex', gap:'5px'}}>
                    <CustomButton 
                        label={(
                            <Grid style={{display:'flex', gap:'7px', justifyContent:'space-between', alignItems:'center'}}>
                                <img src={ExcelIcon2} className={classes.icons} alt='add icon right'/>
                                <Typography style={{color:'#505050', fontSize:'15px'}}>Descargar excel</Typography>
                            </Grid>
                        )}
                        onClik={() => console.log('Descargar excel')}
                        variant='outlined'
                    />
                    <NuevaIndicacion />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{padding:'15px 0'}}>
                { HARDCODED_INDICACIONES && HARDCODED_INDICACIONES.length > 0 ?
                    HARDCODED_INDICACIONES.map( indicacion => (
                        <Accordion key={indicacion.nroIndicacion} style={{border:'none', boxShadow:'none'}}>
                            <AccordionSummary expandIcon={<ExpandMore/>} aria-controls="panel1a-content" id="panel1a-header">
                                <Typography style={{fontSize:16, fontWeight:700, color:'#505050'}}>
                                    Indicación #{indicacion.nroIndicacion}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container xs={12} spacing={3} alignItems='center'>
                                    <Grid item xs={5} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Fecha indicación:</Typography>
                                        <Typography className={classes.value}>{indicacion.fechaIndicacion ? indicacion.fechaIndicacion : '-'}</Typography>
                                    </Grid>
                                    <Grid item xs={4} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Solicitante:</Typography>
                                        <Typography className={classes.value}>{indicacion.solicitante ? indicacion.solicitante : '-'}</Typography>
                                    </Grid>
                                    <Grid item xs={3} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Días de demora:</Typography>
                                        <Typography className={classes.value}>{indicacion.diasDemora ? indicacion.diasDemora : '-'}</Typography>
                                    </Grid>
                                    <Grid item xs={5} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Fecha Acción:</Typography>
                                        <Typography className={classes.value}>{indicacion.fechaAccion ? indicacion.fechaAccion : '-'}</Typography>
                                    </Grid>
                                    <Grid item xs={7} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Gestor:</Typography>
                                        <Typography className={classes.value}>{indicacion.gestor ? indicacion.gestor : '-' }</Typography>
                                    </Grid>
                                    <Grid item xs={5} style={{display:'flex'}}>
                                        <Typography className={classes.label}>Indicación:</Typography>
                                        <Typography className={classes.value}>{indicacion.indicacion ? indicacion.indicacion : '-'}</Typography>
                                    </Grid>
                                    <Grid item xs={7} style={{display:'flex', alignItems:'center'}}>
                                        <Typography className={classes.label}>Acción realizada:</Typography>
                                        { indicacion.accionRealizada ? 
                                            <Typography className={classes.value}>{indicacion.accionRealizada}</Typography>
                                        : 
                                            <InformarIndicacion />
                                        }
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))
                :
                    <Grid style={{background:'#f5f5f5', padding:'20px 25px'}}>
                        <Typography style={{fontSize:14, color:'#FF7052'}}>
                            No hay indicaciones para mostrar.
                        </Typography>
                    </Grid>
                }
            </Grid>
        </>
    )
}

export default IndicacionesBox