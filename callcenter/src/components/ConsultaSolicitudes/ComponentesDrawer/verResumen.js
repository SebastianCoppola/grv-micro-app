import React from 'react';
import PropTypes from 'prop-types';
//material-ui
import { Divider, Grid } from '@material-ui/core';
//componentes
import CustomTypography from '../../commons/Typography/CustomTypography';
import contactPhone from '../../../commons/assets/contactPhone.png'
import badgeBlack from '../../../commons/assets/badgeBlack.png'
import CustomSelect from '../../commons/Select/customSelect';
import CustomText from '../../commons/TextField/CustomText';


const VerResumen = (props) => {
    const { datos } = props
    const estadoMedico = [{codigo:1, descripcion: datos && datos.estadoMedico ? datos.estadoMedico : ''}]
    const tipoSiniestro = [{codigo:1, descripcion: datos && datos.tipoSiniestro ? datos.tipoSiniestro : ''}]
    const [valEstadoMedico, setValEstadoMedico] = React.useState(estadoMedico && estadoMedico[0].codigo ? estadoMedico[0].codigo : '')
    const [valTipoSiniestro, setValTipoSiniestro] = React.useState(tipoSiniestro && tipoSiniestro[0].codigo? tipoSiniestro[0].codigo : '')
    const [valDiagnostico, setValDiagnostico] = React.useState(datos && datos.diagnosticoCie10 ? datos.diagnosticoCie10 : '')
    const [valDiagnosticoCerteza, setValDiagnosticoCerteza] = React.useState( datos && datos.diagnosticoDeCerteza ? datos.diagnosticoDeCerteza : '')
    let nombre = 'Fernando Medina [31860026]'
    let denuncia = 'Denuncia 01901848/001/00'
    let tel = '+54 911 96302713 - 11 47823311/ 11 45845891'
    let adress = 'Altolaguirre 3386 piso [CP 1649]. Acassuso, Mendoza.'

    const handleChangeSelectEstadoMedico = (event) => {
        setValEstadoMedico(event.target.value);
    };
    const handleChangeTipoSiniestro = (event) => {
        setValTipoSiniestro(event.target.value);
    };
    const onChangeDiagnostico = (event) => {
        setValDiagnostico(event.target.value)
    }
    const onChangeDiagnosticoCerteza = (event) => {
        setValDiagnosticoCerteza(event.target.value)
    }

    return (

        <Grid container spacing={1}>
            <Grid item spacing={1} container style={{ backgroundColor: '#f5f5f5', padding: '20px', }}>
                <Grid item xs={12}>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div style={{ paddingRight: '10px' }}>
                            {datos && datos.paciente ? datos.paciente : ''}
                        </div>
                        <div >[{datos && datos.dni ? datos.dni : ''}]</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div >
                            <img src={contactPhone} style={{ paddingRight: '10px' }} />
                        </div>
                        <div >{datos && datos.telefono ? datos.telefono : ''}</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
                <Grid item>
                    <CustomTypography text={<div style={{ display: 'flex' }}>
                        <div >
                            <img src={badgeBlack} style={{ paddingRight: '10px' }} />
                        </div>
                        <div >{datos && datos.direccion ? datos.direccion : ''}</div>
                    </div>}
                        variant={'body2'} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomSelect
                    disabled={true}
                    titulo={'Estado médico'}
                    data={estadoMedico}
                    fullwidth={true}
                    handleChangeSelect={(event) => handleChangeSelectEstadoMedico(event)}
                    val={valEstadoMedico ? valEstadoMedico : ""}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomSelect
                    disabled={true}
                    titulo={'Tipo Siniestro'}
                    data={tipoSiniestro}
                    fullwidth={true}
                    handleChangeSelect={(event) => handleChangeTipoSiniestro(event)}
                    val={valTipoSiniestro}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    disabled={true}
                    label={'Diagnóstico Cie 10'}
                    id={'DiagnósticoCie10'}
                    shrink={true}
                    fullwidth={true}
                    value={valDiagnostico}
                    onChange={onChangeDiagnostico}
                    multiline={2} />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    disabled={true}
                    label={'Diagnóstico de Certeza'}
                    id={'DiagnósticoCerteza'}
                    shrink={true}
                    fullwidth={true}
                    value={valDiagnosticoCerteza}
                    onChange={onChangeDiagnosticoCerteza}
                    multiline={2} />
            </Grid>

        </Grid>

    )
}
VerResumen.propTypes = {
    datos: PropTypes.any
};
export default VerResumen
const data2 = ['Descartado por error', 'En Proceso', 'Pendiente']
const data1 = ['[T] Accidente de trabajo', '[T] Accidente en la calle', '[T] Accidente en el domicilio']