import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//Material:
import { Grid, AppBar, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
//Componentes:
import Versionar from './Versionar'
import PrestacionesNBU from '../TablasConvenios/PrestacionesNBU'
import PrestacionesNomencladas from '../TablasConvenios/PrestacionesNomencladas'
import PrestacionesNoNomencladas from '../TablasConvenios/PrestacionesNoNomencladas'
import Modulos from '../TablasConvenios/Modulos'
//Constantes:
import {TABS_CONVENIO_PROVEEDOR, ID_TAB_VERSIONAR} from "../../../../Utils/const"

const useStyles = makeStyles((theme) => ({
    contenidoBox: {
        width: '100%',
        height: '80%',
        margin: '0',
        padding: '0',
    },
    appBar: {
        position: 'static',
        margin: '0px 0px',
        width: '100%',
        padding: '0',
        backgroundColor: '#ffff',
        color: 'grey',
        boxShadow: 'none',
        borderBottom: '1px solid grey',
        '& .MuiTabs-root': {
            minHeight: '0px'
        },
        '&& .MuiTabs-indicator': {
            backgroundColor: '#1473e6',
        },
    },
    tabs: {
        cursor: 'pointer',
        margin: '15px 30px 15px 5px',
        fontSize: '14px',
        textAlign: 'center',
    },
    tabSelected: {
        cursor: 'pointer',
        margin: '15px 30px 15px 5px',
        color: '#1473e6',
        fontSize: '14px',
        textAlign: 'center',
    },
    tabsContent: {
        padding: '15px',
    },
}))

function TabPanel(props) {
    const { children, value, index } = props;
    return <> {value === index && (<p> {children} </p>)} </>
}

const ContenidoConvenio = props => {
    const { setDrawerNro, setEditRow,
        setOpenAlert1, setOpenAlert2, setOpenModal,
        nuevosCambios, setNuevosCambios,
        setVersionarActual, setVersionarFuturo1, versionarFuturo2,
        seleccion, setSeleccion, onClickSaveActual, proveedor, dateValue, setDateValue,
        updateTable, setUpdateTable, objectCriterioBusqueda, setObjectCriterioBusqueda } = props;
    const classes = useStyles(props);
    const [value, setValue] = useState(0);
    const request = useSelector(state => state.convenio.request)
    const convenioActual = useSelector(state => state.convenio.convenioActual)

    useEffect(() => {
        if (updateTable) setUpdateTable(false)
    }, [updateTable])

    return (
        <Grid xs={12} className={classes.contenidoBox}>
            <AppBar className={classes.appBar}>
                <Tabs value={value}>
                    {TABS_CONVENIO_PROVEEDOR.map((tab)=>(
                        <p key={tab.id} onClick={() => setValue(tab.id)} className={value === tab.id ? classes.tabSelected : classes.tabs}>
                            {tab.titulo}
                            {(nuevosCambios && tab.id == ID_TAB_VERSIONAR)?
                                <>
                                    <br />
                                    <FiberManualRecordIcon style={{ fontSize: 'small', color: '#1473e6' }} />
                                </>
                                : null
                            }</p>
                        
                    ))}
                </Tabs>
            </AppBar>
            <Grid className={classes.tabsContent}>
                <TabPanel value={value} index={0} >
                    {updateTable ? null :
                        <PrestacionesNomencladas
                            dataConvenio={convenioActual}
                            setDrawerNro={setDrawerNro}
                            setEditRow={setEditRow}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            setOpenAlert1={setOpenAlert1}
                            proveedor={proveedor}
                            objectCriterioBusqueda={objectCriterioBusqueda}
                            setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                        />
                    }
                </TabPanel>
                <TabPanel value={value} index={1} >
                    {updateTable ? null :
                        <PrestacionesNoNomencladas
                            dataConvenio={convenioActual}
                            setDrawerNro={setDrawerNro}
                            setEditRow={setEditRow}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            setOpenAlert1={setOpenAlert1}
                            proveedor={proveedor}
                            objectCriterioBusqueda={objectCriterioBusqueda}
                            setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                        />
                    }
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <PrestacionesNBU
                        dataConvenio={convenioActual}
                        setDrawerNro={setDrawerNro}
                        setEditRow={setEditRow}
                        seleccion={seleccion} setSeleccion={setSeleccion}
                        valorNBU={request && (request.valorNBU || request.valorNBU === 0) ? (request.valorNBU ? request.valorNBU : '') : convenioActual && convenioActual.valorNbu ? convenioActual.valorNbu : ''}
                        proveedor={proveedor}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} >
                    {updateTable ? null :
                        <Modulos
                            dataConvenio={convenioActual}
                            setDrawerNro={setDrawerNro}
                            setEditRow={setEditRow}
                            seleccion={seleccion} setSeleccion={setSeleccion}
                            setOpenAlert1={setOpenAlert1}
                            proveedor={proveedor}
                            objectCriterioBusqueda={objectCriterioBusqueda}
                            setObjectCriterioBusqueda={setObjectCriterioBusqueda}
                        />
                    }
                </TabPanel>
                <TabPanel value={value} index={4} >
                    <Versionar
                        nuevosCambios={nuevosCambios} setNuevosCambios={setNuevosCambios}
                        setOpenModal={setOpenModal}
                        setVersionarActual={setVersionarActual}
                        setVersionarFuturo1={setVersionarFuturo1}
                        versionarFuturo2={versionarFuturo2}
                        setValue={setValue}
                        onClickSaveActual={onClickSaveActual}
                        dateValue={dateValue} setDateValue={setDateValue}
                        setOpenAlert2={setOpenAlert2}
                    />
                </TabPanel>
            </Grid>
        </Grid>
    )
}

export default ContenidoConvenio;