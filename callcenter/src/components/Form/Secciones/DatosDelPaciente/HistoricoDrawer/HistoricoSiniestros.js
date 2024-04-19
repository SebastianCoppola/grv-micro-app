import React, { useState } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../../../redux/actions/'
//Mui:
import { makeStyles, Grid } from '@material-ui/core'
//Utils:
import Utils from '../../../../../Utils/utils'
//Components:
import CustomTypography from '../../../../commons/Typography/CustomTypography'
import SiniestosAnteriores from '../../../../PreDenuncias/ComponenteDrawer/SiniestosAnteriores'
import Loader from '../../../../commons/Loading/Loader'
import CustomButton from '../../../../commons/Button/CustomButton'
import Drawer2 from '../../../../commons/CustomDrawer/Drawer'
import AdminSlide from '../../../../commons/Slider/AdminSlide'
import IconHistorico from '../../../../../commons/assets/IconHistorico.png'
import { estadosCEM } from '../../../../../Utils/const'

const useStyles = makeStyles((theme) => ({
    siniestrosAnteriores: {
        backgroundColor: '#f5f5f5',
        padding: '21px 15px 13px 15px',
        marginTop: '14px',
    }
}))

const HistoricoSiniestros = props => {
    
    const { value, dni, denuncia, setOpenBuscador } = props
    
    const classes = useStyles(props)

    const dispatch = useDispatch()
    
    const loadingDenunciasAnterioresReingreso = useSelector(state => state.documentos.loadingDenunciasAnterioresReingreso)
    const [openDrawer, setOpenDrawer] = useState({top: false, left: false, bottom: false, right: false})
    const [data, setData] = useState(undefined)


    //Drawer Historico Siniestros:
    const contenido = [
        { texto: 
            <Grid container xs={12}>
                {dni === null || dni === '' ?
                    <Grid item xs={12} className={classes.siniestrosAnteriores}>
                        <CustomTypography text='No hay DNI asociado a la denuncia.' className={classes.sinSiniestros} />
                    </Grid>
                : loadingDenunciasAnterioresReingreso ?
                    <Grid container justify='center'  alignItems='flex-end' style={{ margin: '170px' }}>
                        <Grid item > <Loader loading={loadingDenunciasAnterioresReingreso} /> </Grid>
                    </Grid>
                : data ?
                    (data === undefined || data.objetos === null || data.objetos.length === 0) ?
                        <div className={classes.siniestrosAnteriores}>
                            <CustomTypography text={`No se encontraron siniestros anteriores para el DNI ${data && data.dni ? data.dni : ''}`} className={classes.sinSiniestros} />
                        </div>
                    :
                        data.objetos.map((siniestro, index) => {
                            return (
                                <SiniestosAnteriores
                                    key={index}
                                    index={index}
                                    data={siniestro}
                                    DatosAmpliados={true}
                                    value={siniestro ? Utils.nroAsignadoProvisorio(siniestro) : ''}
                                    valueActual={value}
                                />
                            )
                        })
                : 
                    <div className={classes.siniestrosAnteriores}>
                        <CustomTypography text={`No se encontraron siniestros anteriores para el DNI ${dni ? dni : ''}`} className={classes.sinSiniestros} />
                    </div>
                }
            </Grid>
        },
    ]
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open })
        setOpenBuscador(true)
    }
    const onClickDrawer = () => {
        setOpenDrawer({ ...openDrawer, 'right': true })
        if(dni !== null || dni !== ''){
            setOpenBuscador(false)
            let req = {                            
                nroDoc: dni,
                tipoDoc: denuncia && denuncia.accidentado ? denuncia.accidentado.tipoDocumentoIdTipoDocumento : null,
                estadoCem: estadosCEM.COMPLETO,
            }
            dispatch(actions.searchDenunciasAnteriores(req, response))
        }
    }
    const response = (data) => {
        setData(data)
    }
    const handleNext = () => {
        setOpenDrawer({ ...openDrawer, 'right': false })
        setOpenBuscador(true)
    }


    return (
        <>
            {/**BUTTON**/}
            <CustomButton
                label={'Histórico Siniestros'}
                variant='outlined'
                startIcon={<img src={IconHistorico} />}
                onClik={onClickDrawer}
            />
            
            {/**DRAWER**/}
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                button={false}
                variant={'contained'}
                titleStyleJustify='flex-start'
                titleStyleMargin={{margin:0}}
                title={`Histórico Siniestros: DNI ${dni && dni.length ? dni : '-'}`}
            >
                <AdminSlide
                    contenido={contenido}
                    buttonCancelar={false}
                    backBoton={false}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    labelButtonSiguiente={'Cerrar'}
                    onClickCancelar={null}
                    handleNext={handleNext}
                    activeStep={0}
                    setActiveStep={null}
                    maxSteps={0}
                    disabled={true} 
                />
            </Drawer2>
        </>
    )
}

export default HistoricoSiniestros