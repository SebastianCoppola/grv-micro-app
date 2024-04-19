import { useEffect, useState } from 'react'
//Material:
import { Grid, List, ListItem, ListItemText, ListItemIcon, Typography } from '@material-ui/core'
import { ErrorOutline } from '@material-ui/icons'
//Components:
import ModalPage from '../../commons/Modal/ModalPage'
import CustomButton from '../../commons/Button/CustomButton'

const ModalCamposFaltantes = props => {

    const { openConfirmacion, title, campos, handleConfirmar, handleVolver, denunciaUrgente } = props

    const [columnas, setColumnas] = useState({colum1:[], colum2:[]})

    useEffect(() => {
        let tempCampos = campos && campos.length && campos.map(data => (data.descripcion))
        
        if(campos && campos.length > 10){
            let mitad = Math.ceil(tempCampos.length / 2)
            let tempCol1 = tempCampos.slice(0, mitad) 
            let tempCol2 = tempCampos.splice(mitad) 
            setColumnas({colum1: tempCol1, colum2: tempCol2}) 
        }else{
            setColumnas({colum1: tempCampos, colum2: []}) 
        }

    }, [])
    
    return (
        <ModalPage  
            open={openConfirmacion}
            fullWidth={true}
            maxWidth={campos && campos.length > 10 ? 'md' : 'sm'}
            divisor={true}
            styleTitle={true}
            title={
                <Typography style={{fontSize:'18px'}}>
                    {title}
                </Typography>
            }
            body={
                <Grid container justify='center'>
                    <Grid item xs={campos && campos.length <= 10 ? 12 : 6}>
                        {columnas && columnas.colum1 && columnas.colum1.length > 0 &&
                            <List>
                                {columnas.colum1.map((item, index) => (
                                    <ListItem style={{padding:'3px 16px'}}>
                                        <ListItemIcon style={{minWidth:'35px'}}>
                                            <ErrorOutline style={{color:'#fdc800', fontSize:'22px'}} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        }
                    </Grid>
                    <Grid item xs={campos && campos.length <= 10 ? 12 : 6}>
                        {columnas && columnas.colum2 && columnas.colum2.length > 0 &&
                            <List>
                                {columnas.colum2.map((item, index) => (
                                    <ListItem style={{padding:'3px 16px'}}>
                                        <ListItemIcon style={{minWidth:'35px'}}>
                                            <ErrorOutline style={{color:'#fdc800', fontSize:'22px'}} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        }
                    </Grid>
                </Grid>
            }
            actions={[
                <Grid container justify='flex-end' style={{margin:'10px 0'}}>
                    <CustomButton
                        label={'Seguir completando'}
                        variant='outlined'
                        size='small'
                        onClik={handleVolver}                       
                        isAction={true}
                        styleButton={{marginLeft:10, maxWidth:'200px'}}
                    />
                    <CustomButton
                        label={'Guardar de todos modos'}
                        variant={"contained"}
                        size='small'
                        disabled={denunciaUrgente}
                        onClik={handleConfirmar}
                        isAction={true}                       
                        color={'primary'}
                        styleButton={{marginLeft:10, maxWidth:'200px'}}
                    />
                </Grid>
            ]}
        />            
    )
}

export default ModalCamposFaltantes
