import React, { useState } from 'react'
//Utils:
import { ATRAS, BASES_Y_VIGENCIA, CANCELAR, CERRAR, COLOR, CONFIRMACION, DESTINO_Y_MONTOS, 
    SIGUIENTE, VARIANT_BUTTON } from '../../../../../Utils/const'
//Components:
import TrasladoPaso1 from './TrasladoPaso1'
import TrasladoPaso2 from './TrasladoPaso2'
import TrasladoPaso3 from './TrasladoPaso3'
import DrawerRight from '../../../../commons/CustomDrawer/DrawerRight'
import CustomButton from '../../../../commons/Button/CustomButton'
//Mui:
import { Grid, Step, StepLabel, Stepper } from '@material-ui/core'
import TrasladoPaso4 from './TrasladoPaso4'
//Entities:
import { ConvenioTraslado } from '../../../../../Entities/ConvenioTraslado.js'

// const requestInitialState = {
//     isMontoFijo: false,
//     montoFijo: {
//         valorViaje: '',
//         tipoValorViajeNegativo: '',
//         valorNegativo: '',
//         montoFijoPesos: '',
//         valorKm: '',
//         porcentual: '',
//         valorHoraEspera: '',
//         cantidadHoraEspera: ''
//     },
//     isValorZona: false, 
//     valorZonas: [
//         { zona: '1', valor: ''},
//         { zona: '2', valor: ''},
//         { zona: '3', valor: ''},
//         { zona: '4', valor: ''},
//         { zona: '5', valor: ''},
//         { zona: '6', valor: ''},
//         { zona: '7', valor: ''},
//     ],
//     destinosFrecuentes: [],
//     basesConvenidas: [],
//     token: false,
//     fechaDesde: '',
//     fechaHasta: ''
// }

const DrawerNewConvenio = ({ drawer, setDrawer }) => {

    const [request, setRequest] = useState(ConvenioTraslado.emptyConvenioTraslado())

    const agregarOtroConvenio = () => {
        setRequest(ConvenioTraslado.emptyConvenioTraslado())
        setDrawer(prev => ({...prev, stepper: 0}))
    }

    const contenidoDrawer = [
        <TrasladoPaso1 request={request} setRequest={setRequest} />,
        <TrasladoPaso2 request={request} setRequest={setRequest} />,
        <TrasladoPaso3 request={request} setDrawer={setDrawer}/>,
        <TrasladoPaso4 agregarOtroConvenio={agregarOtroConvenio}/>
    ]

    const sharedContent = (
        <Grid item xs={12}>
            <Stepper activeStep={drawer.stepper} alternativeLabel style={{ padding: '24px 0px' }}>
                {[DESTINO_Y_MONTOS, BASES_Y_VIGENCIA, CONFIRMACION].map((label) => (
                    <Step>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Grid>
    )

    const botonesDrawer = drawer.stepper === 2 ? [] : [
        <Grid container justify='space-between' style={{padding: '20px 5px'}}>
            <Grid item xs={6}>
                {(drawer.stepper === 0 || drawer.stepper === 1) &&
                    <CustomButton
                        onClik={()=>{setDrawer({open: false, title: '', isEditar: false, stepper: 0})}}
                        disabled={false}
                        label={CANCELAR}
                        isAction={true}
                        color={COLOR.SECONDARY}
                        variant={VARIANT_BUTTON.SECONDARY}
                        styleButton={{marginRight:15}}
                    />
                }
            </Grid>
            <Grid item xs={6} container justify='flex-end'>
                {(drawer.stepper === 1 || drawer.stepper === 2) &&
                    <CustomButton
                        onClik={()=>setDrawer({...drawer, stepper: drawer.stepper-1})}
                        disabled={false}
                        label={ATRAS}
                        isAction={true}
                        color={COLOR.SECONDARY}
                        variant={VARIANT_BUTTON.OUTLINED}
                        styleButton={{marginRight:15}}
                    />
                }
                {(drawer.stepper !== 3) &&
                    <CustomButton
                        onClik={()=>setDrawer({...drawer, stepper: (drawer.stepper)+1})}
                        //disabled={handleDisableAceptar()}
                        label={SIGUIENTE}
                        isAction={true}
                        color={COLOR.PRIMARY}
                        variant={VARIANT_BUTTON.CONTAINED}
                        styleButton={{marginRight:15}}
                    />
                }
                {(drawer.stepper === 3) &&
                    <CustomButton
                        onClik={()=>setDrawer({open: false, title: '', isEditar: false, stepper: 0})}
                        label={CERRAR}
                        isAction={true}
                        color={COLOR.PRIMARY}
                        variant={VARIANT_BUTTON.CONTAINED}
                        styleButton={{marginRight:15}}
                    />
                }
            </Grid>
        </Grid>
    ]

    return (
        <DrawerRight 
            openDrawer={drawer.open}
            closeDrawer={()=>{
                setDrawer({open: false, title: ''})
                setRequest(ConvenioTraslado.emptyConvenioTraslado())
            }}
            contenido={contenidoDrawer}
            sharedContent={sharedContent}
            botones={botonesDrawer}
            stepper={drawer.stepper}
            title={drawer.title}
            width={850}
        />
    )
}

export default DrawerNewConvenio