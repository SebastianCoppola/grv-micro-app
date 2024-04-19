import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
//componentes
import DatosPersonales from './datosPersonales';
import Domicilio from './domicilio';
import DatosContacto from './datosContacto';
import CustomAccordion from '../../../commons/CustomAccordion/CustomAcordion';

const SeccionDatosPaciente = (props) => {
    const { editar, expandido, datosAccidentado, setExpandido, state } = props
    const [provincia, setProvincia] = React.useState(null)
    const [localidad, setLocalidad] = React.useState(null)

    return (
        <Grid container xs={12} >
            <Grid item xs={12}>
                <CustomAccordion id={'panel7-header'} state={state}
                                idClick={"panel7"} 
                                setExpandido={setExpandido} expandido={expandido} 
                                editar={editar}  estilo={true} titulo={'Datos Personales'} 
                                body={<DatosPersonales datosAccidentado={datosAccidentado} editar={editar}/>} />
            </Grid>
            <Grid item xs={12}>
                <CustomAccordion id={'panel8-header'} state={state}
                                idClick={"panel8"} 
                                setExpandido={setExpandido} 
                                expandido={expandido} 
                                editar={editar}  
                                estilo={true} 
                                titulo={'Domicilio'} 
                                body={<Domicilio  provincia={provincia} 
                                                setProvincia={setProvincia}
                                                localidad={localidad}
                                                setLocalidad={setLocalidad} 
                                                datosAccidentado={datosAccidentado} 
                                                editar={editar}/>} />
            </Grid>
            <Grid item xs={12}>
                <CustomAccordion id={'panel9-header'} state={state}
                                idClick={"panel9"} setExpandido={setExpandido} expandido={expandido} editar={editar}  estilo={true} titulo={'Datos de Contacto'} body={<DatosContacto datosAccidentado={datosAccidentado} editar={editar}/>} />
            </Grid>
        </Grid>
    )

}
SeccionDatosPaciente.propTypes = {
    titulo: PropTypes.string,
    editar:PropTypes.bool,
    denuncia:PropTypes.any,
    expandido:PropTypes.any,
    datosAccidentado:PropTypes.any,
    setExpandido:PropTypes.any,
    state: PropTypes.any
};
export default SeccionDatosPaciente

