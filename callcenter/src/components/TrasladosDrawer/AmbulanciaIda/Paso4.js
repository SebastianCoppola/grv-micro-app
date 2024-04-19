import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid } from '@material-ui/core';
//compontentes 
import CustomTypography from '../../commons/Typography/CustomTypography';
import Utils from '../../../Utils/utils';

const IdaPaso4 = (props) => {
    const { dataConfirm } = props

    return (
        <Grid container spacing={2} style={{ width: '400px', height: '200px', backgroundColor: '#f5f5f5' }} alignItems='center' >
            <Grid item container spacing={2} alignItems='center' justify='center'>
                <Grid item xs={10}>
                    <CustomTypography
                        text={<strong>{dataConfirm ? 'Traslado confirmado' : `Traslado `}</strong>}
                        variant={'subtitle1'} />
                </Grid>
                <Grid item xs={10}>
                    <Divider />
                </Grid>
                <Grid item xs={10}>
                    <CustomTypography
                        text={<div>
                            {dataConfirm ?
                                `El traslado para la denuncia 
                                #${
                                    dataConfirm ? Utils.nroAsignadoProvisorio3(dataConfirm) : ''
                                } 
                                ha sido confirmada correctamente.` :
                                'Se ha generado exitosamente el traslado. Luego podrás confirmar el traslado desde la consulta de traslado del Siniestro Completo.'}</div>}
                        variant={'subtitle2'} />
                </Grid>
            </Grid>
        </Grid>
    )
}
IdaPaso4.propTypes = {
    dataConfirm: PropTypes.any
};
export default IdaPaso4