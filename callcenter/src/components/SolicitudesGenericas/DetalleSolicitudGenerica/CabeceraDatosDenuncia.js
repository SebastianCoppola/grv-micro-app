import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import DatosDePaciente from './DatosDePaciente'
import { useSelector } from 'react-redux'
import Utils from '../../../Utils/utils'
import { GUION }from '../../../Utils/const'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        '& p': {
            fontSize: 13
        }
    },
    label: {
        width: 'fit-content',
        marginRight: 12,
        color: '#747474'
    }
})

const Item = ({ label, data, wrap = 'wrap' }) => {
    const classes = useStyles()
    return (
        <Grid item container wrap={wrap}>
            <Grid item><Typography className={classes.label}>{label}</Typography></Grid>
            <Grid item><Typography>{data}</Typography></Grid>
        </Grid>
    )
}

const CabeceraDatosDenuncia = (props) => {
    const { dataBackSolicitud, denuncia } = props
    const classes = useStyles()
    const usuarioActivo = useSelector(state => state.solicitudesGenericas.usuarioActivo)
    const [data, setData] = useState({})
        
    //ACTUALIZO DATA
    useEffect(() => {
        if(dataBackSolicitud){
            setData({
                denuncia: dataBackSolicitud?.denuncia ?? GUION,
                fechaDenuncia: dataBackSolicitud && dataBackSolicitud.fechaDenuncia ? Utils.dateFormat5(dataBackSolicitud.fechaDenuncia) : GUION,
                direccion: dataBackSolicitud?.direccion ?? GUION,
                localidadYCp: dataBackSolicitud?.localidadYCp ?? GUION,
                provincia: dataBackSolicitud?.provincia ?? GUION,
                internacion: dataBackSolicitud?.internacion ?? GUION,
                grupoGestion: dataBackSolicitud?.grupoGestion ?? GUION,
                empleador: dataBackSolicitud?.empleador ?? GUION,
                paciente: dataBackSolicitud?.paciente ?? GUION,
                auditor: dataBackSolicitud?.auditor ?? GUION
            })
        }else{
            setData({
                denuncia: denuncia?.idDenuncia ?? GUION,
                fechaDenuncia: denuncia && denuncia.fechaOcurrencia ? Utils.dateFormat5(denuncia.fechaOcurrencia) : GUION,
                direccion: denuncia ? Utils.getDomicilioAccidentadoSinlocalidadYCp(denuncia) : GUION,
                localidadYCp: denuncia ? Utils.getLocalidadYCpAccidentado(denuncia) : GUION,
                provincia: denuncia?.accidentado?.localidadProvinciaNombre ?? GUION,
                internacion: denuncia?.estadoInternacionDescripcion ?? GUION,
                grupoGestion: denuncia?.grupoGestion ?? GUION,
                empleador: denuncia?.empleadorRazonSocial ?? GUION,
                paciente: denuncia ? Utils.getNombreYApellidoAccidentado(denuncia) : GUION,
                auditor: denuncia?.tramitadorNombreCompleto ??  GUION
            })
        }
    }, [dataBackSolicitud])

    if (usuarioActivo && usuarioActivo.isOperador) return (
        <Grid container className={classes.root} justify="space-between" spacing={1}>
            <Grid container item direction="column" xs spacing={1}>
                <Item label="Denuncia" data={data.denuncia} />
                <Item wrap="nowrap" label="Dirección" data={data.direccion} />
                <Item wrap="nowrap" label="Localidad" data={data.localidadYCp}/>
                <Item wrap="nowrap" label="Provincia" data={data.provincia} />
            </Grid>
            <Grid container item direction="column" xs spacing={1}>
                <Item label="Fecha de Denuncia" data={data.fechaDenuncia} />
                <Item label="Internación" data={data.internacion} />
                <Item label="Grupo gestión" data={data.grupoGestion} />
                <Item wrap="nowrap" label="Empleador" data={data.empleador} />
            </Grid>
            <Grid container item direction="column" xs spacing={1}>
                <Item wrap="nowrap" label="Paciente" data={data.paciente} />
                <Grid item xs><DatosDePaciente denuncia={denuncia ? denuncia.accidentado : dataBackSolicitud} /></Grid>
            </Grid>
        </Grid>
    )
    
    return (
        <Grid container className={classes.root} justify="space-between">
            <Grid container item direction="column" xs={4} spacing={1}>
                <Item label="Denuncia" data={data.denuncia} />
                <Item wrap="nowrap" label="Dirección" data={data.direccion ?? "-"} />
                <Item label="Localidad" data={data.localidadYCp ?? "-"}/>
                <Item label="Provincia" data={data.provincia} />
            </Grid>
            <Grid container item direction="column" xs={4} spacing={1}>
                <Item label="Fecha de Denuncia" data={data.fechaDenuncia} />
                <Item label="Internación" data={data.internacion} />
                <Item label="Grupo gestión" data={data.grupoGestion} />
                <Item wrap="nowrap" label="Empleador" data={data.empleador} />
            </Grid>
            <Grid container item direction="column" xs={4} spacing={1}>
                <Item label="Auditor" data={data.auditor} />
                <Item wrap="nowrap" label="Paciente" data={data.paciente ?? "-"} />
                <Grid item container>
                    <Grid item>
                        <DatosDePaciente denuncia={denuncia ? denuncia.accidentado : dataBackSolicitud} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CabeceraDatosDenuncia;
