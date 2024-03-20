import React, { useState } from 'react'
//Utils:
import { AGREGAR_COVENIO_TRASLADO } from '../../../../Utils/const'
//Components:
import ContenedorMenuProveedores from '../ContenedorMenuProveedores'
import HeaderConvenio from '../ConvenioActual/HeaderConvenio'
import ContenidoConvenioActual from './ContenidoConvenioActual'
import DrawerNewConvenio from './PasosDrawer/DrawerNewConvenio'
//Mui:
import { Grid } from '@material-ui/core'

const ConvenioActualTraslado = () => {

    const [drawer, setDrawer] = useState({open: false, title: '', isEditar: false, stepper: 0})
    const [seleccion, setSeleccion] = useState(null)
    const [aplicoValoresPrestacionesUnit, setAplicoValoresPrestacionesUnit] = useState(false)

    const addTraslado = () => {
        setDrawer({open: true, title: AGREGAR_COVENIO_TRASLADO, isEditar: false, stepper: 0})
    }

    return (
        <ContenedorMenuProveedores>
            <Grid style={{width: '98%' }}>
                <HeaderConvenio
                    editarConvenioFuturo={false}
                    convenioActualTraslado={true}
                    seleccion={seleccion} setSeleccion={setSeleccion}
                    aplicoValoresPrestacionesUnit={aplicoValoresPrestacionesUnit}
                />
                <ContenidoConvenioActual addTraslado={addTraslado}/>
                <DrawerNewConvenio drawer={drawer} setDrawer={setDrawer}/>
            </Grid>
        </ContenedorMenuProveedores>
    )
}

export default ConvenioActualTraslado
