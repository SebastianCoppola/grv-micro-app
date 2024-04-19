import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
//Componentes
import DatosEmpleado from './datosEmpleado';
import DatosSedeLaboral from './datosSedeLaboral';
import CustomAccordion from '../../../commons/CustomAccordion/CustomAcordion';

const SeccionTrabajo = (props) => {
    const { titulo, editar, expandido, datosAccidentado, setExpandido  } = props
    
    return (
        <Grid container xs={12} >
            <Grid item xs={12}>
                <CustomAccordion setExpandido={setExpandido} expandido={expandido} editar={editar}  estilo={true} estilo={true} titulo={'Datos Empleado'} body={<DatosEmpleado datosAccidentado={datosAccidentado} editar={editar}/>} />
            </Grid>
            <Grid item xs={12}>
                <CustomAccordion setExpandido={setExpandido}  expandido={expandido} editar={editar}  estilo={true} estilo={true} titulo={'Datos sede Laboral'} body={<DatosSedeLaboral datosAccidentado={datosAccidentado} editar={editar}/>} />
            </Grid>
        </Grid>
    )
}
SeccionTrabajo.propTypes = {
    titulo: PropTypes.string,
    editar:PropTypes.bool,
    denuncia:PropTypes.any,
    expandido:PropTypes.any,
    datosAccidentado:PropTypes.any,
    setExpandido:PropTypes.any
};
export default SeccionTrabajo