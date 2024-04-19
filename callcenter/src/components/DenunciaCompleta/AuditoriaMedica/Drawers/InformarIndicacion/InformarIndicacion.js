import { useState } from 'react'
//Mui:
import { Grid, makeStyles, Typography, Divider, Drawer, IconButton, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons'
//Components:
import CustomButton from '../../../../commons/Button/CustomButton'
//Icons:
import InformarIcon from '../../../../../commons/assets/IconsAuditoriaMedica/Otros/icon-observacion.svg'

const useStyles = makeStyles({
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)',
    },
})

const InformarIndicacion = () => {
   
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [value, setValue] = useState('')

    return (
        <>
            <CustomButton
                label={(
                    <Grid style={{display:'flex', gap:'7px', justifyContent:'space-between', alignItems:'center'}}>
                        <img src={InformarIcon} className={classes.icons} alt='observacion icon'/>
                        <Typography style={{color:'#505050', fontSize:'15px'}}>Informar</Typography>
                    </Grid>
                )}
                onClik={() => setOpenDrawer(true)}
                variant='outlined'
            />

            {/* Drawer */}
            <Drawer anchor='right' open={openDrawer} onClose={()=>setOpenDrawer(false)}>
                <Grid 
                    container 
                    direction="column" 
                    justify="space-between" 
                    style={{width:500, height:'100%', padding:'15px 20px'}}
                >
                    <Grid item container direction="column" spacing={1}>
                        <Grid item container justify="space-between" alignItems="center">
                            <Typography style={{fontSize:15, fontWeight:700}}>
                                Nuevo Próximo Contacto AM.
                            </Typography>
                            <IconButton style={{padding: 7}} onClick={()=>setOpenDrawer(false)}>
                                <Close />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        <Grid item container style={{marginTop:'25px'}}>
                            <TextField
                                placeholder='Completar'
                                label='Describir acción realizada *'
                                InputLabelProps={{shrink:true}}
                                value={value}
                                onChange={(e)=>setValue(e.target.value)}
                                style={{minWidth:'300px', fontSize:13}}
                                inputProps={{style:{fontSize:14}}}
                            />
                        </Grid>
                    </Grid>
                    <Grid item style={{display:'flex', justifyContent:'flex-end', margin:'20px 0px'}}>
                        <CustomButton
                            label={'Cancelar'}
                            variant='contained'
                            styleButton={{height:35, borderRadius:'20px', border:'none'}}
                            onClik={()=>setOpenDrawer(false)}
                        />
                        <CustomButton
                            label={'Guardar'}
                            styleButton={{height:35, borderRadius:'20px'}}
                            color='primary'
                            variant='contained'
                            onClik={() => console.log('save')}
                            disabled={value ? false : true}
                        />
                    </Grid>
                </Grid>
            </Drawer>
        </>
    )
}

export default InformarIndicacion