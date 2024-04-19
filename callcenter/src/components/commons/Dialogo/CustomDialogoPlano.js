import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import CustomButton from '../Button/CustomButton'



const CustomDialogoPlano = props => {
    const { button1, button1Action, button1Label, button1Variant,
        button2, button2Action, button2Label, button2Variant,
        button3, button3Action, button3Label, button3Variant,
        text1, text2, bloqueado} = props

    return (
        <Grid container justify='center' alignItems='center' style={{width:'100%', minHeight:'250px'}}>
            <Grid style={{width:'400px', heigh:'200px', padding:'20px 20px', border:'1px solid #c4c4c4', borderRadius:'10px'}}>
                <Typography style={{margin:'0 0 10px 0'}}><b>{text1}</b></Typography>
                <Divider />
                <Typography style={{margin:'10px 0 40px 0', fontSize:'14px'}}>{text2}</Typography>
                <Grid container xs={12} justify='flex-end' spacing={1}>
                    { button3 ?
                        <Grid item>
                            <CustomButton
                                label={button3Label}
                                variant={button3Variant ? button3Variant : 'outlined'}
                                onClik={button3Action}
                                styleButton={{borderRadius:'15px'}}
                                size='small'
                            />
                        </Grid>
                        : null
                    }
                    { button2 ?
                        <Grid item>
                            <CustomButton
                                label={button2Label}
                                variant={button2Variant ? button2Variant : 'outlined'}
                                onClik={button2Action}
                                disabled={bloqueado}
                                styleButton={{borderRadius:'15px'}}
                                size='small'

                            />
                        </Grid>
                        : null
                    }
                    { button1 ?
                        <Grid item>
                            <CustomButton
                                label={button1Label}
                                variant={button1Variant ? button1Variant : 'contained'}
                                color='primary'
                                onClik={button1Action}
                                disabled={bloqueado}
                                styleButton={{borderRadius:'15px'}}
                                size='small'
                            />
                        </Grid>
                        : null
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CustomDialogoPlano
