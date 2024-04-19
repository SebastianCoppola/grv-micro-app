//Mui:
import { Grid, makeStyles, Typography, Divider, FormControlLabel, Checkbox, TextField } from '@material-ui/core'
//Components:
import DiagnosticoCIE10 from './DiagnosticoCIE10'
import CustomSelect from '../../../../../commons/Select/customSelect'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchListadoSeveridad, searchSeveridadDenuncia } from '../../../../../../redux/actions/listados'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    contenedor: {
        border: '1px solid #d3d3d3',
        borderRadius: '10px',
        margin: '10px 20px',
        padding: '10px 20px',
    },
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)',
    },
    label: {
        fontSize: 14,
        color: '#747474'
    },
    value: {
        fontSize: 14,
        color: '#505050'
    },colorTextError: {
        color: "#e34850"        
    },
    underlineError : {
        "&& .MuiInput-underline:before": {
            borderBottomColor: "#e34850",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#e34850',
        }
    }
})

const DatosDenunciaBox = ({ denuncia, request, setRequest }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const listadoSeveridad = useSelector(state => state.listados.severidad)
    const listadoSeveridadDenuncia = useSelector(state => state.listados.severidadDenuncia)

    useEffect(() => {
        dispatch(fetchListadoSeveridad())
        dispatch(searchSeveridadDenuncia())
    }, [])

    return (
        <>
            <Grid item xs={12} >
                <Typography style={{ color: '#505050', fontSize: '16px', fontWeight: '700' }}>
                    Datos de la denuncia
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10, display: 'flex', gap: 30 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.suspendido}
                            onChange={() => setRequest({ ...request, suspendido: !request.suspendido })}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Suspendido</Typography>
                    }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.dictamen}
                            onChange={() => setRequest({ ...request, dictamen: !request.dictamen })}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Dictamen</Typography>
                    }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.rechazadoART}
                            onChange={() => setRequest({ ...request, rechazadoART: !request.rechazadoART })}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Rechazado por ART</Typography>
                    }
                />
            </Grid>
            <Grid item xs={8} style={{ marginTop: 20 }}>
                <DiagnosticoCIE10
                    denuncia={denuncia}
                    request={request}
                    setRequest={setRequest}
                    isMultiple={false}
                />
            </Grid>
            <Grid item xs={12} container style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                    <Typography className={classes.label}>Severidad: * </Typography>
                    <CustomSelect
                        val={request.idSeveridad}
                        handleChangeSelect={(e) => setRequest({ ...request, idSeveridad: e.target.value })}
                        data={listadoSeveridad && listadoSeveridad.length > 0 && listadoSeveridad}
                        seleccione={false}
                        textStyles={{ fontSize: 10 }}
                        fullwidth={true}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
                <DiagnosticoCIE10
                    denuncia={denuncia}
                    request={request}
                    setRequest={setRequest}
                    isMultiple={true}
                />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
                <Typography className={classes.label}>Diagnóstico de Certeza: * </Typography>
                <TextField
                    value={request.diagnosticoCerteza}
                    onChange={(e) => setRequest({ ...request, diagnosticoCerteza: e.target.value })}
                    placeholder='Completar'
                    style={{ width: '500px', fontSize: 10 }}
                    inputProps={{ style: { fontSize: 14 } }}
                    className={!request.diagnosticoCerteza ? classes.underlineError
                    : null}
                    helperText={!request.diagnosticoCerteza ?
                        <div className={classes.colorTextError}>Campo Requerido</div>
                    : null}
                />
            </Grid>
            <Grid item xs={12} container style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                    <Typography className={classes.label}>Severidad denuncia: * </Typography>
                    <CustomSelect
                        val={request.idSeveridadDenuncia}
                        handleChangeSelect={(e) => setRequest({ ...request, idSeveridadDenuncia: e.target.value })}
                        data={listadoSeveridadDenuncia && listadoSeveridadDenuncia.length > 0 && listadoSeveridadDenuncia}
                        seleccione={false}
                        textStyles={{ fontSize: 10 }}
                        fullwidth={true}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} container alignItems='center' style={{ marginTop: 20 }}>
                <Grid item xs={3}>
                    <Typography className={classes.label}>Incapacidad Presunta: * </Typography>
                    <CustomSelect
                        val={request && request.incapacidadPresunta ? 1 : 0}
                        handleChangeSelect={(e) => setRequest({ ...request, incapacidadPresunta: e.target.value === 1 ? true : false })}
                        data={[
                            { codigo: 1, descripcion: "Con Incapacidad" },
                            { codigo: 0, descripcion: "Sin Incapacidad" }
                        ]}
                        seleccione={true}
                        textStyles={{ fontSize: 10 }}
                        fullwidth={true}
                    />
                </Grid>
                <Grid item xs={3} style={{ marginLeft: 20 }}>
                    <Typography className={classes.label}>Porcentaje incapacidad</Typography>
                    <TextField
                        value={`${request.porcentajeIncapacidad ?? "0"}`}
                        onChange={(e) => setRequest({ ...request, porcentajeIncapacidad: e.target.value })}
                        placeholder='%'
                        inputProps={{ style: { fontSize: 14 } }}
                        disabled={request && request.incapacidadPresunta === true ? false : true}
                        fullwidth={true}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10, display: 'flex', gap: 30 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.incapacidad}
                            onChange={() => setRequest({ ...request, incapacidad: !request.incapacidad })}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Incapacidad</Typography>
                    }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={request.comunicacionReconocimientoMedico}
                            onChange={e => setRequest({ ...request, comunicacionReconocimientoMedico: !request.comunicacionReconocimientoMedico })}
                            color="primary"
                        />
                    }
                    label={
                        <Typography className={classes.label}>Comunicación con reconocimientos médicos</Typography>
                    }
                />
            </Grid>
            <Grid item xs={12} style={{ margin: '20px 0' }}>
                <Typography className={classes.label}>¿Qué sucedió? Relato del siniestro</Typography>
                <TextField
                    value={request.relatoSiniestro}
                    onChange={(e) => setRequest({ ...request, relatoSiniestro: e.target.value })}
                    placeholder='Completar'
                    style={{ width: '500px', fontSize: 10 }}
                    inputProps={{ style: { fontSize: 14 } }}
                    multiline
                />
            </Grid>
        </>
    )
}

export default DatosDenunciaBox