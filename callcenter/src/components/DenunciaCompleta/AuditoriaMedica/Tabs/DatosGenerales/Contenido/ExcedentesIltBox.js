//Mui:
import { Grid, makeStyles, Typography, Divider, TextField } from '@material-ui/core'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getListadoCausaILT, getListadoSubCausaILT } from '../../../../../../redux/actions/listados'
//Components:
import CustomButton from '../../../../../commons/Button/CustomButton'
import CustomSelect from '../../../../../commons/Select/customSelect'

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
    },
})

const ExcedentesIltBox = ({ denuncia, request, setRequest }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const listadoCausaILT = useSelector(state => state.listados.causaILT)
    const listadoSubCausaILT = useSelector(state => state.listados.subCausaILT)

    useEffect(() => {
        if (request && request.excedenteILTRevisado) {
            dispatch(getListadoCausaILT())
        }
        if (request && request.idRazonExcedenteILT) {
            dispatch(getListadoSubCausaILT({ idMotivoPadre: request && request.idRazonExcedenteILT }))
        }
    }, [request.excedenteILTRevisado, request.idRazonExcedenteILT])

    return (
        <>
            <Grid item xs={12} container justify='space-between' alignItems='center'>
                <Typography style={{ color: '#505050', fontSize: '16px', fontWeight: '700' }}>Excedentes ILT</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
                <Typography className={classes.label}>Excedente ILT *</Typography>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', gap: '10px', marginTop: 10, marginBottom: request.excedenteILTRevisado ? 10 : 20 }}>
                <CustomButton
                    label='Revisado'
                    onClik={() => setRequest({ ...request, excedenteILTRevisado: true })}
                    variant='outlined'
                    styleButton={request.excedenteILTRevisado ? { borderColor: '#1473e6' } : null}
                />
                <CustomButton
                    label='No Revisado'
                    onClik={() => setRequest({ ...request, excedenteILTRevisado: false })}
                    variant='outlined'
                    styleButton={!request.excedenteILTRevisado ? { borderColor: '#1473e6' } : null}
                />
            </Grid>
            {request.excedenteILTRevisado &&
                <>
                    <Grid item xs={12} container alignItems='center' style={{ marginTop: 10 }}>
                        <Grid item xs={3}>
                            <Typography className={classes.label}>Razón Excedente ILT: * </Typography>
                            <CustomSelect
                                val={request.idRazonExcedenteILT ?? ''}
                                handleChangeSelect={(e) => setRequest({ ...request, idRazonExcedenteILT: e.target.value })}
                                data={listadoCausaILT && listadoCausaILT.length > 0 && listadoCausaILT}
                                seleccione={false}
                                textStyles={{ fontSize: 10 }}
                                fullwidth={true}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems='center' style={{ marginTop: 10 }}>
                        <Grid item xs={3}>
                            <Typography className={classes.label}>Sub Causas: * </Typography>
                            <CustomSelect
                                val={request.idSubCausa ?? ''}
                                handleChangeSelect={(e) => setRequest({ ...request, idSubCausa: e.target.value })}
                                data={listadoSubCausaILT && listadoSubCausaILT.length > 0 && listadoSubCausaILT}
                                seleccione={true}
                                textStyles={{ fontSize: 10 }}
                                fullwidth={true}
                                disabled={request.idRazonExcedenteILT ? false : true}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ margin: '10px 0 20px 0' }}>
                        <Typography className={classes.label}>Observaciones</Typography>
                        <TextField
                            value={request.observacionExcedenteILT ?? ''}
                            onChange={(e) => setRequest({ ...request, observacionExcedenteILT: e.target.value })}
                            placeholder='Completar'
                            style={{ width: '500px', fontSize: 10 }}
                            inputProps={{ style: { fontSize: 14 } }}
                            disabled={request.idSubCausa ? false : true}
                        />
                    </Grid>
                </>
            }
        </>
    )
}

export default ExcedentesIltBox