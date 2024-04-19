import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions/index';
//Material-UI
import { FormControl, Grid, makeStyles, RadioGroup, } from '@material-ui/core';
//Componentes
import CustomTypography from '../../commons/Typography/CustomTypography'
import SiniestosAnteriores from './SiniestosAnteriores';
import CustomDatePicker from '../../commons/DatePicker/CustomDatePicker';
import Utils from '../../../Utils/utils';
import InformacionPreDenuncia from './InformacionPreDenuncia';
import CustomLoading from '../../commons/Loading/CustomLoading';

const useStyles = makeStyles((theme) => ({
    title: {
        color: '#505050',
        fontSize: '17px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
    },
    texto: {
        color: '#4b4b4b',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        textAlign: 'left',
    },
    siniestrosAnteriores: {
        backgroundColor: '#f5f5f5',
        padding: '21px 15px 13px 15px',
        marginTop: '14px',
    },
    sinSiniestros: {
        color: '#ff7052',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        textAlign: 'left',
    },
    fecha: {
        paddingBottom: '10px'
    }
}));

const VerDetallePreDenuncias = (props) => {
    const { data, nroDoc, tipoDoc, loading, setLoading, setSelectSiniestroAnterior, setSelectEstadoCEM,
        dataInfo } = props;
    const [value, setValue] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [siniestrosAnteriores, setSiniestrosAnteriores] = React.useState([]);
    const loadingGenerar = useSelector(state => state.documentos.loadingGenerarPredenuncia)
    const dispatch = useDispatch();

    useEffect(() => {
        let newDate = null
        if (selectedDate !== null && selectedDate !== undefined) {
            newDate = Utils.formatoFecha(selectedDate, 'yyyy-mm-dd');
        }
        setValue(null);
        setLoading(true)
        let request = {
            tipoDoc: parseInt(tipoDoc),
            nroDoc: (nroDoc).toString(),
            fechaExacta: newDate,
        }
        dispatch(actions.searchSiniestrosAnteriores(request, callback))
    }, [selectedDate])

    const callback = (succes, data) => {
        if (succes) {
            setSiniestrosAnteriores(data)
        } else {
            setSiniestrosAnteriores(null)
        }
        setLoading(false)
    }

    useEffect(() => {
        setSelectSiniestroAnterior(value);
        if (siniestrosAnteriores && siniestrosAnteriores.objetos) {
            siniestrosAnteriores.objetos.forEach(siniestro => {
                if (parseInt(siniestro.idDenuncia) === parseInt(value)) {
                    setSelectEstadoCEM(siniestro.estadoCEM);
                };
            })
        }
    }, [value])

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const classes = useStyles(props);
    return (
        <div>
            <CustomLoading loading={loadingGenerar}/>
            <Grid container justify={'flex-start'} alignItems={'center'} spacing={1}>
                <InformacionPreDenuncia dataInfo={dataInfo} data={data} />
                <Grid item xs={12}>
                    <CustomTypography text='Siniestros anteriores' style={{ marginTop: '20px' }} className={classes.title} />
                </Grid>
                <Grid item xs={12} className={classes.fecha}>
                    <CustomDatePicker
                        setSelectedDate={setSelectedDate}
                        selectedDate={selectedDate}
                        placeholder={'Ingrese Fecha'}
                        isOutline={true}
                        fontSize={'13px'}
                    />
                </Grid>
                {
                    loading ?
                        <CustomTypography text={`CARGANDO...`} />
                        :
                        loading === false && siniestrosAnteriores === null ?
                            <Grid item xs={12}>
                                <div className={classes.siniestrosAnteriores}>
                                    <CustomTypography text={`No se encontraron siniestros anteriores para el DNI ${data && data.dni ? data.dni : ''}`} className={classes.sinSiniestros} />
                                </div>
                            </Grid>
                            :
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="siniestrosAnteriores" name="siniestrosAnteriores" value={value} onChange={handleChange}>
                                        {siniestrosAnteriores && siniestrosAnteriores.objetos ? siniestrosAnteriores.objetos.map((siniestro, index) => {
                                            return (
                                                <SiniestosAnteriores
                                                    key={index}
                                                    index={index}
                                                    data={siniestro}
                                                    DatosAmpliados={true}
                                                    value={siniestro && siniestro.idDenuncia ? siniestro.idDenuncia : ''}
                                                    valueActual={value}
                                                    radioButton={true}
                                                />
                                            )
                                        }) : null}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                }
            </Grid>
        </div>
    )
}

export default VerDetallePreDenuncias
