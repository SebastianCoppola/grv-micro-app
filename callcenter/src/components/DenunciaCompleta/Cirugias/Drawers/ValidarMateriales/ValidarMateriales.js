import { useState } from 'react'
//Mui:
import { Grid, makeStyles, Typography, Divider, Drawer, IconButton } from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'
//Components:
import MaterialesQuirurgicos from './MaterialesQuirurgicos'
import CustomButton from '../../../../commons/Button/CustomButton'
//Icons:
import { ReactComponent as View } from "../../../../../commons/assets/auditoriaMedica/view.svg"
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../redux/actions'
import { validarMaterialesQxFetch } from '../../../../../redux/actions/auditoriaMedica'

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
    iconBtnChecked: {
        borderRadius: '5px',
        border: '1px solid #2dc76d',
        background: '#e9f9f0',
        width: '40px',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    iconChecked: {
        background:'#2dc76d', 
        borderRadius:'50px', 
        color:'#ffff', 
        fontSize:'20px', 
        padding:'2px'
    },
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)',
    },
})

const ValidarMateriales = (props) => {
    const {pedido, denuncia, usuarioActivo, validado, setPedidoValidado } = props
    const classes = useStyles()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [editMode, setEditMode ] = useState(false)
    const dispatch = useDispatch()
    const [listadoMateriales, setListadoMateriales] = useState()

    const validarMaterialesQx = () => {
        let errorCallback = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'error', 
                    message: 'Ocurrió un error al validar los materiales.'
                }))
            }else{
                dispatch(actions.setSnackBarAuditoria({
                    open: true, 
                    vertical: 'top',
                    severity: 'success', 
                    message: `Pedido ${pedido.idPedidoMaterialQuirurgico} VALIDADO`
                }))
                setOpenDrawer(false)
                setPedidoValidado(true)
            }
        }
        let materiales = listadoMateriales
        materiales = materiales.map(function(item) {
            let material = {
                idMaterialQuirurgico : item.idMaterialQuirurgico,
                validado : item.validado ? item.validado : 0
            }
            return material
        });
        let req = {
            idAutorizacion : pedido.idAutorizacion,
            idOperadorLogueado : parseInt(usuarioActivo.id),
            materialesQuirurgicos : materiales
        }
        validarMaterialesQxFetch(req, errorCallback)
    }

    const actualizarListadoMateriales = (listado) => {
        setListadoMateriales(listado)
    }

    const handleCheck = () => {
        if(!validado){
            setOpenDrawer(true)
            setEditMode(true)
        }else{
            dispatch(actions.setSnackBarAuditoria({
                open: true, 
                vertical: 'top',
                severity: 'success', 
                message: `Pedido ${pedido.idPedidoMaterialQuirurgico} VALIDADO`
            }))
        }
    }

    const openDrawerView = () => {
        setOpenDrawer(true)
        setEditMode(false)
    }

    return (
        <>
            <span style={{ display: "flex" }}>
                {/*Botones*/}
                
                <IconButton size='small' onClick={()=>openDrawerView()} className={classes.iconBnt}>
                    <View className={classes.icons} />
                </IconButton>

                <IconButton className={validado ? classes.iconBtnChecked : classes.iconBnt} size="small" onClick={()=>handleCheck()} >
                    <Check className={validado ? classes.iconChecked : ''} />
                </IconButton>
            </span>

            

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
                            {editMode ? 
                                <Typography style={{fontSize:15, fontWeight:700}}>
                                    Validar Materiales
                                </Typography>
                            :   <Typography style={{fontSize:15, fontWeight:700}}>
                                    Ver Materiales
                                </Typography>
                            }
                            <IconButton style={{padding: 7}} onClick={()=>setOpenDrawer(false)}>
                                <Close />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Divider />
                        </Grid>
                        
                        <Grid item container style={{marginTop:'25px'}}>
                        <MaterialesQuirurgicos 
                            editMode={editMode}
                            pedido={pedido} 
                            denuncia={denuncia}
                            usuarioActivo={usuarioActivo}
                            actualizarListadoMateriales={actualizarListadoMateriales}
                        />
                        </Grid>
                        
                    </Grid>
                    {editMode &&
                        <Grid item style={{display:'flex', justifyContent:'flex-end', margin:'20px 0px', gap:'5px'}}>
                            <CustomButton
                                label={'Cancelar'}
                                variant='contained'
                                styleButton={{height:35, borderRadius:'20px', border:'none'}}
                                onClik={()=>setOpenDrawer(false)}
                            />
                            <CustomButton
                                label={'Validar'}
                                styleButton={{height:35, borderRadius:'20px'}}
                                color='primary'
                                variant='contained'
                                onClik={() => validarMaterialesQx()}
                            />
                        </Grid>
                    }
                </Grid>
            </Drawer>
        </>
    )
}

export default ValidarMateriales