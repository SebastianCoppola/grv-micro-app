import React, { useState } from 'react'
//Mui:
import { Grid, IconButton } from '@material-ui/core'
//Components:
import CustomButton from '../../commons/Button/CustomButton'
import DrawerRight from '../../commons/CustomDrawer/DrawerRight'
import AgendaContactos from './agendaContactos'
import SVGcontact from '../../../commons/assets/Header/Contact.svg'
//Utils:
import { CERRAR } from '../../../Utils/const'
//Redux:
import { useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions'


const Contactos = ({ setOpenBuscador }) => {

    const dispatch = useDispatch()

    const [openDrawer, setOpenDrawer] = useState(false)

    const handleOpenContactos = () => {
        dispatch(actions.setContactos([]))
        setOpenBuscador(false)
        setOpenDrawer(true)
    }

    const handleCloseContactos = () => {
        setOpenBuscador(true)
        setOpenDrawer(false)
    }

    const botonesDrawer = [
        <Grid container justify='flex-end'>
            <CustomButton
                variant='contained'
                label={CERRAR}
                styleButton={{ borderRadius: 25 }}
                styleLabel={{ color: '#505050' }}
                onClik={handleCloseContactos}
            />
        </Grid>
    ]

    return (
        <>
            {/* CONTACTOS ICON */}
            <IconButton style={{ color: '#1473e6' }} onClick={handleOpenContactos}>
                <img src={SVGcontact} />
            </IconButton>

            {/* CONTACTOS DRAWER */}
            <DrawerRight
                openDrawer={openDrawer}
                closeDrawer={handleCloseContactos}
                contenido={[<AgendaContactos />]}
                botones={botonesDrawer}
                title='Agenda de Contactos'
                width='650px'
            />
        </>
    )
}

export default Contactos