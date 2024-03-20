import React, { useEffect, useState } from 'react';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions/index'
//Material
import { Grid, IconButton, makeStyles } from '@material-ui/core';
//Components
import CustomTableContrataciones from '../../commons/Table/CustomTableContrataciones';
import CustomTypography from '../../commons/Typography/CustomTypography';
import IconExcel from '../../../commons/assets/Contrataciones/Modulos/file-excel-outline-modulos.png'

const useStyles = makeStyles((theme) => ({
    cabecera1: {
        padding: '20px 20px',
        borderLeft: '3px solid #f7c281',
        backgroundColor: '#f5f5f5',
        margin: '20px 10px 10px 10px',
    },
    cabecera2: {
        minWidth: '700px',
        padding: '20px 20px',
        borderLeft: '3px solid #1473e6',
        backgroundColor: '#f5f5f5',
        margin: '20px 10px 10px 10px',
    },
    cabeceraTitulo: {
        fontWeight: '700',
        fontSize: '13px',
        margin: '0 0 10px 0',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    cabeceraText: {
        fontSize: '14px',
        margin: '0 0 0 10',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
}))

const text1 = [`Atención:`, `Al seleccionar los convenios listados a continuación, estará pisando el módulo de esos convenios por una réplica de este. También, se puede continuar sin modificar ningún convenio.`];
const text2 = 'El módulo no se encuentra en ningún convenio. Podrás guardar cambios.'

const DrawerConvenios = (props) => {
    const { request, conveniosSeleccionados, setConveniosSeleccionados, setRequestImpactar } = props;
    const classes = useStyles(props);
    //Redux:
    const dispatch = useDispatch();
    const proveedoresConvenio = useSelector(state => state.moduloConvenio.conveniosIncluidos);
    const loadingConveniosIncluidos = useSelector(state => state.moduloConvenio.loadingConveniosIncluidos);

    //Busco convenios que contienen a este módulo:  
    useEffect(() => {
        setConveniosSeleccionados([])
        setRequestImpactar(null)
        if (request && request.incluidoEnConvenio) {
            dispatch(actions.getConveniosIncluidos({ "idModulo": request.idModulo }))
        }
    }, [])

    //Seteo requestImpactar si selecciono algún convenio: 
    useEffect(() => {
        setRequestImpactar({
            modulo: {...request},
            idConvenio: conveniosSeleccionados ? conveniosSeleccionados.map(it => it.idConvenio) : []
        })
    }, [conveniosSeleccionados])

    //Exportar data convenio: 
    const handleExportar = (row) => {
        console.log("Data a exportar: ", row)
    }

    //Data tabla:
    const headerTabla = [
        {
            title: "PROVEEDOR", field: "nombreProveedorCuit",
            cellStyle: { color: '#505050', fontSize: '10px', alignContent: 'left', height: '40px', width: '60%' },
            headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'left' },
        },
        {
            title: "VERSIÓN", field: "version",
            cellStyle: { color: '#505050', fontSize: '10px', alignContent: 'left', height: '40px', width: '20%' },
            headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'left' },
        },
        {
            title: "PDF", field: "pdf",
            cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'left', height: '40px', width: '20%' },
            headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'left' },
            render: row => (
                <div>
                    <IconButton
                        size="small"
                        onClick={() => handleExportar(row)} >
                        <img src={IconExcel} />
                    </IconButton>
                </div>
            )
        },
    ]

    return (
        request && request.incluidoEnConvenio ?
            <Grid container xs={12} justify="center">
                <Grid item xs={12} className={classes.cabecera1}>
                    <CustomTypography className={classes.cabeceraTitulo} text={text1[0]} />
                    <CustomTypography className={classes.cabeceraText} text={text1[1]} />
                </Grid>
                <Grid item xs={12} style={{ minWidth: '700px', maxHeight: '85vh', padding: '30px', overFlow: 'hidden', overflowY: 'auto' }}>
                    <CustomTableContrataciones
                        data={proveedoresConvenio === null ? [] : proveedoresConvenio}
                        colorAvatar={false}
                        columnas={headerTabla}
                        page={0}
                        styleAdd={true}
                        selection={true}
                        setDataSelect={setConveniosSeleccionados}
                        dataSelect={conveniosSeleccionados}
                        loading={loadingConveniosIncluidos}
                    />
                </Grid>
            </Grid>
            :
            <Grid xs={12} className={classes.cabecera2}>
                <CustomTypography className={classes.cabeceraText} text={text2} />
            </Grid>
    )
}

export default DrawerConvenios;
