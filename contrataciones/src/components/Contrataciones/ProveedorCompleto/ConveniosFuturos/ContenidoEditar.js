import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
//Material:
import { Grid, makeStyles, Typography } from '@material-ui/core'
//Comeponents:
import PrestacionesNomencladas from '../TablasConvenios/PrestacionesNomencladas'
import Modulos from '../TablasConvenios/Modulos'
import PrestacionesNBU from '../TablasConvenios/PrestacionesNBU'
import PrestacionesNoNomencladas from '../TablasConvenios/PrestacionesNoNomencladas'

const useStyles = makeStyles((theme) => ({
    titles: {
        fontSize: "16px",
        color: "#323232",
        margin: '30px 0 10px 0'
    },
}))

const ContenidoEditar = (props) => {
    const { setDrawerNro, setEditRow, convenioSeleccionado, proveedor,
        setOpenAlert1,
        seleccion, setSeleccion, updateTable, setUpdateTable, objectCriterioBusqueda, setObjectCriterioBusqueda } = props
    //Estilos
    const classes = useStyles(props)
    const request = useSelector(state => state.convenio.request)

    useEffect(() => {
        if (updateTable) setUpdateTable(false)
    }, [updateTable])

    return (
        <Grid container>
            <Grid item xs={12} style={{ margin: '20px 0' }}>
                <Typography className={classes.titles}> Prestaciones nomencladas</Typography>
                {updateTable ? null :
                    <PrestacionesNomencladas
                        dataConvenio={convenioSeleccionado}
                        proveedor={proveedor}
                        setDrawerNro={setDrawerNro}
                        setEditRow={setEditRow}
                        seleccion={seleccion} setSeleccion={setSeleccion}
                        setOpenAlert1={setOpenAlert1}
                        objectCriterioBusqueda={objectCriterioBusqueda}
                        setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                    />
                }
            </Grid>
            <Grid item xs={12} style={{ marginTop: "40px" }}>
                <Typography className={classes.titles}> Prestaciones no nomencladas</Typography>
                {updateTable ? null :
                    <PrestacionesNoNomencladas
                        dataConvenio={convenioSeleccionado}
                        proveedor={proveedor}
                        setDrawerNro={setDrawerNro}
                        setEditRow={setEditRow}
                        seleccion={seleccion} setSeleccion={setSeleccion}
                        setOpenAlert1={setOpenAlert1}
                        objectCriterioBusqueda={objectCriterioBusqueda}
                        setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                    />
                }
            </Grid>
            <Grid item xs={12} style={{ marginTop: "40px" }}>
                <Typography className={classes.titles}> Prestaciones NBU</Typography>
                <PrestacionesNBU
                    dataConvenio={convenioSeleccionado}
                    proveedor={proveedor}
                    setDrawerNro={setDrawerNro}
                    seleccion={seleccion} setSeleccion={setSeleccion}
                    valorNBU={request && request.valorNBU ? request.valorNBU : convenioSeleccionado && convenioSeleccionado.valorNbu ? convenioSeleccionado.valorNbu : ''}
                />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "15px" }}>
                <Typography className={classes.titles}>Módulos</Typography>
                {updateTable ? null :
                    <Modulos
                        dataConvenio={convenioSeleccionado}
                        proveedor={proveedor}
                        setDrawerNro={setDrawerNro}
                        setEditRow={setEditRow}
                        seleccion={seleccion}
                        setSeleccion={setSeleccion}
                        setOpenAlert1={setOpenAlert1}
                        objectCriterioBusqueda={objectCriterioBusqueda}
                        setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default ContenidoEditar
