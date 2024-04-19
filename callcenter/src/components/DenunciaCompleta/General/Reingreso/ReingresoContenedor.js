import React, { useState } from "react"
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../../../redux/actions/index'
//Utils:
import Utils from '../../../../Utils/utils'
import { REINGRES_CLONAR_DENUNCIA_ERROR, REINGRES_CLONAR_DENUNCIA_OK, 
    SNACK_SEVERITY, VINCULAR_REINGRESO, VINCULAR_INTERCURRENCIA, 
    ACEPTAR, CANCELAR, SNACK_VERTICAL, 
    VINCULAR_SINIESTRO, CAMBIAR, SINIESTRO_DE_ORIGEN, estadosCEM} from "../../../../Utils/const"
//Mui:
import { Grid } from "@material-ui/core"
//Components:
import CustomButton from "../../../commons/Button/CustomButton"
import DrawerReingreso from "./DrawerReingreso"
import CustomText from "../../../commons/TextField/CustomText"
import DrawerRight from "../../../commons/CustomDrawer/DrawerRight"
import CustomSnackBar from "../../../commons/SnackBar/CustomSnackBar"
//Icos:
import IconoReingresoDrawer from '../../../../commons/assets/IconoReingresoDrawer/iconoReingresoDrawer.png'
import IconoCambiarReingreso from '../../../../commons/assets/IconoReingresoDrawer/iconoCambiarReingreso.png'

const ReingresoContenedor = (props) => {

    const { checkedReingreso, checkedIntercurrencia,  
        intercurrenciaIdSiniestro, setIntercurrenciaIdSiniestro, 
        intercurrenciaNroSiniestro, setIntercurrenciaNroSiniestro,
        reingresoNroSiniestro, denuncia, texto, disableEdition } = props
    
    const dispatch = useDispatch()
    
    //States:
    const [reingresoIdDenuncia, setReingresoIdDenuncia] = useState(denuncia && denuncia.siniestroOriginalIdDenuncia ? denuncia.siniestroOriginalIdDenuncia : null)
    const [intercurrenciaIdDenuncia, setIntercurrenciaIdDenuncia] = useState(denuncia && denuncia.idSiniestroIntercurrencia ? denuncia.idSiniestroIntercurrencia : null)
    const [intercurrenciaNroDenuncia, setIntercurrenciaNroDenuncia] = useState(null)
    const [denunciaOrigen, setDenunciaOrigen] = useState(null)
    // Drawer
    const [drawer, setDrawer] = useState({open: false, title: ''})
    const [disableAceptar, setDisableAceptar] = useState(true)
    // SnackBar
    const [openSnackBar, setOpenSnackBar] = useState({open: false, title: '', severity: '', vertical:''})
    
    const handleSnackbarReingreso = (success) => {
        setOpenSnackBar({
            open: true,
            severity: success ? SNACK_SEVERITY.SUCCESS : SNACK_SEVERITY.ERROR,
            title: success ? REINGRES_CLONAR_DENUNCIA_OK : REINGRES_CLONAR_DENUNCIA_ERROR,
            vertical: success ? SNACK_VERTICAL.BOTTOM : SNACK_VERTICAL.TOP
        }) 
    }

    const handleGuardar = () => {
        
        let callbackDenuncia = (success) => {
            if(success){
                handleSnackbarReingreso(true)
                setDrawer({open: false})
            }else{
                handleSnackbarReingreso(false)
            }
        }

        let callbackClonar = (success, data) => {
            if (success && data){
                dispatch(actions.searchDenunciaById(
                    data.idDenuncia, 
                    estadosCEM[data.estado],
                    callbackDenuncia
                ))        
            } else {
                handleSnackbarReingreso(false)
            }
        }

        if (checkedReingreso) {
            let request = {
                denunciaOrigen: {
                    idDenuncia: reingresoIdDenuncia,
                    estadoCem: Utils.getLabelCodEstadoCem(denunciaOrigen.estadoCEM) ? 
                        Utils.getLabelCodEstadoCem(denunciaOrigen.estadoCEM).toUpperCase() 
                        : ''
                },
                denunciaDestino: {
                    idDenuncia: denuncia.idDenuncia,
                    estadoCem: Utils.getLabelCodEstadoCem(denuncia.estadoCEM) ? 
                        Utils.getLabelCodEstadoCem(denuncia.estadoCEM).toUpperCase() 
                        : ''
                }
            }
            dispatch(actions.clonarDenunciaReingreso(request, callbackClonar))
        } else {
            setIntercurrenciaIdSiniestro(intercurrenciaIdDenuncia)
            setIntercurrenciaNroSiniestro(intercurrenciaNroDenuncia)
            setDrawer({ open: false, title: '' })
        }
    }

    const contenidoDrawer = [
        <DrawerReingreso
            checkedReingreso={checkedReingreso}
            checkedIntercurrencia={checkedIntercurrencia}
            setReingresoIdDenuncia={setReingresoIdDenuncia}
            // setReingresoNroDenuncia={setReingresoNroDenuncia}
            setIntercurrenciaIdDenuncia={setIntercurrenciaIdDenuncia}
            setIntercurrenciaNroDenuncia={setIntercurrenciaNroDenuncia}
            setDisableAceptar={setDisableAceptar}
            setDenunciaOrigen={setDenunciaOrigen}
            denuncia={denuncia}
        />
    ]

    const botonesDrawer = [
        <Grid container justify='flex-end'>
            <CustomButton
                onClik={()=>setDrawer({open: false, title: ''})}
                disabled={false}
                label={CANCELAR}
                isAction={true}
                color={'secondary'}
                variant={"outlined"}
                styleButton={{marginRight:15}}
            />
            <CustomButton
                onClik={handleGuardar}
                disabled={disableAceptar}
                label={ACEPTAR}
                isAction={true}
                color={'primary'}
                variant={"contained"}
                styleButton={{marginRight:15}}
            />
        </Grid>
    ]

    return (
        <>
            <Grid container alignItems="center">
                {(checkedReingreso && reingresoNroSiniestro === null) || (checkedIntercurrencia && intercurrenciaIdSiniestro === null) ?
                    <Grid item xs={7}>
                        <CustomButton
                            label={VINCULAR_SINIESTRO}
                            variant={'outlined'}
                            width='170px'
                            height='30px'
                            size='small'
                            styleButton={{ backgroundColor: 'white' }}
                            onClik={()=>setDrawer({ 
                                open: true, 
                                title: checkedReingreso ? VINCULAR_REINGRESO : VINCULAR_INTERCURRENCIA 
                            })}
                            startIcon={<img src={IconoReingresoDrawer} />} 
                            disabled={disableEdition} 
                        />
                    </Grid>
                : (checkedReingreso && reingresoNroSiniestro !== null) || (checkedIntercurrencia && intercurrenciaIdSiniestro !== null) ?
                    <Grid item xs={5}>
                        <CustomButton
                            label={CAMBIAR}
                            variant={'outlined'}
                            width='110px'
                            height='30px'
                            size='small'
                            styleButton={{ backgroundColor: 'white' }}
                            onClik={()=>setDrawer({ 
                                open: true, 
                                title: checkedReingreso ? VINCULAR_REINGRESO : VINCULAR_INTERCURRENCIA 
                            })}
                            startIcon={<img src={IconoCambiarReingreso} />} 
                            disabled={disableEdition}
                        />
                    </Grid>
                : null}

                {(checkedReingreso && reingresoNroSiniestro !== null) || (checkedIntercurrencia && intercurrenciaNroSiniestro !== null) ?
                    <Grid item xs={6}>
                        <CustomText
                            disabled={true}
                            value={texto === 'Reingreso' ? reingresoNroSiniestro : intercurrenciaNroSiniestro}
                            label={SINIESTRO_DE_ORIGEN}
                            shrink={true}
                            fullwidth={true}
                        />
                    </Grid>
                : null}
            </Grid>


            <DrawerRight 
                openDrawer={drawer.open}
                closeDrawer={()=>setDrawer({open: false, title: ''})}
                contenido={[contenidoDrawer]}
                stepper={null}
                botones={[botonesDrawer]}
                title={drawer.title}
                width={700}
            />
            
            <CustomSnackBar 
                handleClose={()=>setOpenSnackBar({ open: false })} 
                open={openSnackBar.open} 
                title={openSnackBar.title}
                severity={openSnackBar.severity} 
                vertical={openSnackBar.vertical}
            />
        </>
    )
}

export default ReingresoContenedor