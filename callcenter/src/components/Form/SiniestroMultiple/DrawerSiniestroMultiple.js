import React from 'react'
//Redux:
import { useSelector } from 'react-redux'
//Mui:
import { makeStyles, Grid } from '@material-ui/core'
//Utils:
import { MENSAJE_SINIESTROS_MULTIPLES_VACIOS, MENSAJE_SINIESTROS_MULTIPLES_VACIOS_2 } from '../../../Utils/const'
//Componentes:
import CustomTypography from '../../commons/Typography/CustomTypography'
import BotonVincular from './BotonVincular/BotonVincular'
import FormNuevoSiniestroMultiple from './FormNuevoSiniestroMultiple'
import Tabla from './TablaSiniestrosMultiplesAnteriores.js/tabla'
import CustomLoading from '../../commons/Loading/CustomLoading'
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker'

const useStyles = makeStyles({
    mensajeVacio: {
        backgroundColor: '#f5f5f5',
        margin: '10px',
        padding: '20px'
    }
})

const DrawerSiniestroMultiple = (props) => {

    const { textoSiniestroMultiple, setTextoSiniestroMultiple,
        descripcionSiniestroMultiple, setDescripcionSiniestroMultiple, 
        dataSeleccionada, setDataSeleccionada, 
        showFormCausa, setShowFormCausa, 
        fechaCausa, setFechaCausa
    } = props

    const classes = useStyles(props)

    const dataTabla = useSelector(state => state.listados.listadoSiniestroMultiples)
    const loadingSiniestrosMultiplesTable = useSelector(state => state.listados.loadingSiniestrosMultiplesTable)
    const loadingSiniestrosMultiplesSaveDenuncia = useSelector(state => state.documentos.loadingSiniestrosMultiplesSaveDenuncia)
    
    //boton para crear causa dentro del drawer
    const onClickCrearCausa = () => {
        setShowFormCausa(!showFormCausa)
        setDataSeleccionada(undefined)
    }

    return (
        <Grid item container spacing={3} alignItems='flex-end' justify='center'>

            <CustomLoading loading={loadingSiniestrosMultiplesTable || loadingSiniestrosMultiplesSaveDenuncia} />

            <Grid item xs={12} container justify='space-between' alignItems='center' style={{margin:'10px 8px'}}>
                <Grid item xs={4}>
                    <CustomDatePicker
                        label={'Fecha Ocurrencia'}
                        selectedDate={fechaCausa}
                        setSelectedDate={setFechaCausa}
                        shrink={true}
                        maxDate={new Date()}
                        deshabilitarTeclado={true}
                        disabledPicker={showFormCausa}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BotonVincular
                        textoButtonSiniestroMultiple={showFormCausa ? 'Salir de crear' : 'Crear una causa'}
                        onClickSiniestroMultiple={onClickCrearCausa} 
                        disableEdition={(dataTabla && dataTabla.length === 0)}
                    />
                </Grid>
            </Grid>

            {dataTabla && dataTabla.length === 0 &&
                <Grid item xs={12} className={classes.mensajeVacio}>
                    <CustomTypography
                        variant='subtitle2' 
                        color='#ff7052'
                        text={
                            <Grid container spacing={1}>
                                <Grid item xs={10}>{MENSAJE_SINIESTROS_MULTIPLES_VACIOS}</Grid>
                                <Grid item xs={10}>{MENSAJE_SINIESTROS_MULTIPLES_VACIOS_2}</Grid>
                            </Grid>
                        }
                    />
                </Grid>
            }
            
            {dataTabla && dataTabla.length > 0 && !showFormCausa &&
                <Grid item container spacing={2} xs={12}>
                    <Grid item xs={12}>
                        <Tabla
                            dataSeleccionada={dataSeleccionada}
                            setDataSeleccionada={setDataSeleccionada}
                        />
                    </Grid>
                </Grid>
            }

            { (dataTabla && dataTabla.length === 0 || showFormCausa) &&
                <Grid item container spacing={2} xs={12}>
                    <Grid item xs={12}>
                        <FormNuevoSiniestroMultiple
                            textoSiniestroMultiple={textoSiniestroMultiple}
                            setTextoSiniestroMultiple={setTextoSiniestroMultiple}
                            descripcionSiniestroMultiple={descripcionSiniestroMultiple}
                            setDescripcionSiniestroMultiple={setDescripcionSiniestroMultiple}
                        />
                    </Grid>
                </Grid>
            }

        </Grid>
    )
}

export default DrawerSiniestroMultiple