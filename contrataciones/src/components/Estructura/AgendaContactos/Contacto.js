import React from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Grid, Avatar } from '@material-ui/core'
//Components:
import CustomTypography from '../../commons/Typography/CustomTypography'
//Icons:
import ambulancia from '../../../commons/assets/agendaContactos/ambulancia.png'
import centroMedico from '../../../commons/assets/agendaContactos/centroMedico.png'
import farmacia from '../../../commons/assets/agendaContactos/farmacia.png'
import remis from '../../../commons/assets/agendaContactos/remis.png'

const Contacto = (props) => {

    const { contact, index } = props   

    return (
        <>
            <Grid key={index} container alignItems='flex-start' spacing={2} style={{ border: '1px solid #eaeaea' }}>
                <Grid item>
                    <Avatar 
                        variant="square" 
                        src={
                            contact && contact.tipoContacto === 'Centro Medico' ?
                                centroMedico
                            : contact.tipoContacto === 'Farmacia' ?
                                farmacia
                            : contact.tipoContacto === 'Ambulancia' ?
                                ambulancia 
                            : contact.tipoContacto === 'Remis' ?
                                remis 
                            : null  
                        } 
                    />
                </Grid>
                <Grid item md container>
                    <Grid item container>
                        <Grid item xs={10}>
                            <CustomTypography
                                text={
                                    <strong>{
                                        `${contact && contact.tipoContacto !==null ? contact.tipoContacto: ''} 
                                        ${contact && contact.nombre!==null ? contact.nombre :''}`
                                    }</strong>
                                } 
                                variant="body2" 
                            />
                        </Grid>  
                    </Grid>
                    <Grid item  xs={10}>
                        <CustomTypography
                            text={
                                `${contact && contact.domicilioCalle !==null ? contact.domicilioCalle: ''} 
                                ${contact && contact.domicilioNumero !==null ? contact.domicilioNumero: ''} `    
                            }
                            variant="body2" 
                        />
                    </Grid>
                    <Grid item  xs={10}>
                        <CustomTypography
                            text={
                                `${contact && contact.localidadNombre ? contact.localidadNombre : ''},
                                ${contact && contact.provinciaNombre !==null ? contact.provinciaNombre: ''}`                              
                            }
                            variant="caption" 
                        />
                    </Grid>
                    <Grid item  xs={10}>
                        <CustomTypography
                            text={
                                `tel: ${contact && contact.telefono ? contact.telefono : ''} `                              
                            }
                            variant="caption" 
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

Contacto.propTypes = {
    contact: PropTypes.any,
    index: PropTypes.any
}

export default Contacto