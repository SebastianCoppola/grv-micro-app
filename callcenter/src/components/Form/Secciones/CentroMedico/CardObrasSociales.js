import React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Grid, Divider, FormControlLabel, FormControl, Radio } from '@material-ui/core/'
//Components:
import CustomTypography from '../../../commons/Typography/CustomTypography'

const CardObrasSociales = (props) => {
    
    const { datos, value2, setValue, icon, click, form, denuncia, setValueRadio, ambulancia } = props

    const handleChange = (event) => {
        setValue(event.target.value)
        if (setValueRadio) setValueRadio(null)
    }
  
    return (
        <>
            {form ?
                <FormControl fullWidth value={value2} onClick={click ? handleChange : null}>
                    <FormControlLabel
                        value={datos.id} control={<Radio style={{ display: 'none' }} />}
                        label={
                            <Grid value={datos.id} item container alignItems={'center'} spacing={1} style={{margin:'5px'}}>
                                <Grid item xss={2}>
                                    <img src={icon} />
                                </Grid>
                                <Grid item xs spacing={1} container alignItems='flex-start' direction='column'>
                                    <Grid item xs>
                                        <CustomTypography
                                            variant={'body2'}
                                            fontweight={'600'}
                                            text={<strong>{datos ? datos.razonSocial : ''}</strong>}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <CustomTypography
                                            variant={'body2'}
                                            text={datos ? datos.provinciaNombre : ''}
                                        />
                                    </Grid>

                                </Grid>
                                <Grid item xs={12}> <Divider /> </Grid>
                                <Grid item xs={12}>
                                    <CustomTypography
                                        variant={'body2'}
                                        text={<Fragment >
                                            {datos && datos.domicilioCalle ?
                                                `${datos.domicilioCalle} ${''}` : ''}
                                            <Fragment>
                                                {datos && datos.domicilioNumero ?
                                                    datos.domicilioNumero : ''}
                                            </Fragment>
                                        </Fragment>}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomTypography
                                        variant={'body2'}
                                        text={`Tel: ${datos ? datos.telefono.substring(0, 15) : ''}`}
                                    />
                                </Grid>

                            </Grid>}>
                    </FormControlLabel>
                </FormControl> : null}
            {ambulancia ?
                <FormControl fullWidth value={value2} onClick={click ? handleChange : null}>
                    <FormControlLabel
                        value={datos.idProveedorServicioTraslado} control={<Radio style={{ display: 'none' }} />}
                        label={
                            <Grid value={datos.id} item container alignItems={'center'} spacing={1}>
                                <Grid item xs={4}>
                                    <img src={icon} />
                                </Grid>
                                <Grid item xs spacing={1} container alignItems='flex-start' direction='column'>
                                    <Grid item xs>
                                        <CustomTypography
                                            variant={'body2'}
                                            fontweight={'600'}
                                            text={<strong>{datos && datos.razonSocial !=='-' ? datos.razonSocial : datos ? datos.nombreCorto : ''}</strong>}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}> <Divider /> </Grid>
                                <Grid item xs={12}>
                                    <CustomTypography
                                        variant={'body2'}
                                        text={`Tel: ${datos ? datos.telefono.substring(0, 15) : ''}`}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTypography
                                        variant={'body2'}
                                        text={`${datos && datos.observaciones ? datos.observaciones : ''}`}
                                    />
                                </Grid>
                            </Grid>}>
                    </FormControlLabel>
                </FormControl> : null}
            {denuncia ?
             <FormControl fullWidth value={value2} onClick={click ? handleChange : null}>
             <FormControlLabel
                 value={datos.id} control={<Radio style={{ display: 'none' }} />}
                 label={
                <Grid  item container alignItems={'center'} spacing={1}>
                    <Grid item xs={4}><img src={icon} /></Grid>
                    <Grid item xs spacing={1} container alignItems='flex-start' direction='column'>
                        <Grid item xs>
                            <CustomTypography
                                variant={'body2'}
                                fontweight={'600'}
                                text={<strong>{denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.razonSocial !== null ?
                                    denuncia.centroPrimerAsistencia.razonSocial : ''}
                                </strong>}
                            />
                        </Grid>
                        <Grid item xs>
                            <CustomTypography
                                variant={'body2'}
                                text={denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.provinciaNombre !== null ?
                                    denuncia.centroPrimerAsistencia.provinciaNombre : ''}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}> <Divider /></Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            variant={'body2'}
                            text={`${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.domicilioCalle !== null ?
                                denuncia.centroPrimerAsistencia.domicilioCalle : ''}
                                ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.domicilioNumero !== null ?
                                    denuncia.centroPrimerAsistencia.domicilioNumero : ''}`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            variant={'body2'}
                            text={`${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.localidadNombre !== null ?
                                denuncia.centroPrimerAsistencia.localidadNombre : ''}
                                ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.provinciaNombre !== null ?
                                    denuncia.centroPrimerAsistencia.provinciaNombre : ''}`}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTypography
                            variant={'body2'}
                            text={`Tel: ${denuncia && denuncia.centroPrimerAsistencia && denuncia.centroPrimerAsistencia.telefono !== null ?
                                denuncia.centroPrimerAsistencia.telefono.substring(0, 15) : ''}`}
                        />
                    </Grid>
                </Grid>
                }>
                </FormControlLabel>
            </FormControl> : null
            }
        </>
    )
}

CardObrasSociales.propTypes = {
    datos: PropTypes.any,
    value2: PropTypes.any,
    setValue: PropTypes.any,
    icon: PropTypes.any,
    click: PropTypes.any,
    form: PropTypes.any,
    denuncia: PropTypes.any,
    setValueRadio: PropTypes.any
}

export default CardObrasSociales
