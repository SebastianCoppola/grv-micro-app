import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index'
import { CircularProgress, Grid } from '@material-ui/core';
import CustomTableContrataciones from '../../commons/Table/CustomTableContrataciones';

const DrawerInclusiones = (props) => {
    const { request } = props;
    const dispatch = useDispatch();
    const inclusionesModulo = useSelector(state => state.moduloConvenio.inclusionesModulo);
    const loadingInclusionesModulo = useSelector(state => state.moduloConvenio.loadingInclusionesModulo);
    const [oldInclusiones, setOldInclusiones] = useState([]);


    //Busco las inclusiones del módulo seleccionado:
    useEffect(() => {
        setOldInclusiones([])
        if (request && request.idModulo) {
            dispatch(actions.getInclusionesModulo({ "idModulo": request.idModulo }));
        }
    }, [])

    //Seteo Old Inclusiones:
    useEffect(() => {
        setOldInclusiones(
            inclusionesModulo.map(inclusion => {
                return {
                    "idPrestacion": inclusion.idPrestacionNomeclada !== null ? inclusion.idPrestacionNomeclada : inclusion.idPrestacionNoNomenclada,
                    "codigo": inclusion.codigo,
                    "descripcion": inclusion.descripcion,
                    "codigoDescripcion": `${inclusion.codigo} ${inclusion.descripcion}`,
                    "cantidad": inclusion.cantidad,
                    "tipoPrestacion": inclusion.idPrestacionNoNomenclada ? "No Nomenclada" : "Nomenclada",
                    "idTipoPrestacion": inclusion.idPrestacionNomenclada ? 1 : 2,
                }
            })
        )
    }, [inclusionesModulo])

    //Contenido Tabla:
    const headerTabla = [
        {
            title: "TIPO PRÁCTICA",
            field: "tipoPrestacion",
            cellStyle: { color: '#505050', fontSize: '10px', alignContent: 'left', height: '40px', width: '25%' },
            headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'left' },
        },
        {
            title: "CÓDIGO Y DESCRIPCIÓN",
            field: "codigoDescripcion",
            cellStyle: { color: '#505050', fontSize: '10px', alignContent: 'left', height: '40px', width: '60%', maxWidth: '200px', overflow: 'hidden', textOverflow: "ellipsis" },
            headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'left' },

        },
        {
            title: "CANTIDAD",
            field: "cantidad",
            cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'center', height: '40px', width: '5%', maxWidth: '30px', overflow: 'hidden', textOverflow: "ellipsis" },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'center' },

        },
    ]

    return (
        <Grid container xs={12} justify="center">
            <Grid item xs={12} style={{ minWidth: '700px', maxHeight: '85vh', padding: '30px', overFlow: 'hidden' }}>
                {loadingInclusionesModulo ?
                    <Grid container xs={12} justify="center" style={{ marginTop: '50px' }}>
                        <CircularProgress />
                    </Grid>
                    :
                    <CustomTableContrataciones
                        data={oldInclusiones}
                        colorAvatar={false}
                        columnas={headerTabla}
                        page={0}
                        styleAdd={true}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default DrawerInclusiones;