import React, { useEffect, useState } from 'react'
//Mui:
import { AppBar, Grid, makeStyles, Tabs } from '@material-ui/core'
//Componentes:
import AutorizacionesPendientes from './Tabs/AutorizacionesPendientes/AutorizacionesPendientes'
import CitacionesAuditoria from './Tabs/Citaciones/CitacionesAuditoria'
import DatosGenerales from './Tabs/DatosGenerales/DatosGenerales'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
//Routerx
import { useHistory } from 'react-router-dom'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../redux/actions'

const useStyles = makeStyles((theme) => ({
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
        padding: '0 10px',
        fontSize: '14px',
        textAlign: 'center',
    },
    tabSelected: {
        cursor: 'pointer',
        padding: '0 10px',
        fontSize: '14px',
        textAlign: 'center',
        color: '#1473e6',
    },
    tabsContent: {
        maxWidth: '100%',
        padding: '15px',
    },
}))

//Metodo para traerme los contenidos segun la pestaña que se elija
function TabPanel(props) {
    const { children, value, index } = props
    return <> {value === index && (<p> {children} </p>)} </>
}

const AuditoriaMedicaDenuncia = (props) => {
    const { denuncia, setTituloNavegacionSiniestro } = props
    const classes = useStyles()
    const [tabValue, tabTabValue] = useState(0)
    const dispatch = useDispatch()
    const snackBarAuditoria = useSelector(state => state.auditoriaMedica.snackBarAuditoria)
    const history = useHistory()

    useEffect(()=>{ 
        setTituloNavegacionSiniestro('Auditoría Médica')
        if(history && history.location.from === "autorizacionesPendientes"){
            tabTabValue(2)
        }
    },[])

    return (
        <Grid style={{ padding: '0px 20px' }}>
            <AppBar className={classes.appBar}>
                <Tabs value={tabValue}>
                    <p onClick={() => tabTabValue(0)} className={tabValue === 0 ? classes.tabSelected : classes.tabs}>Datos Generales</p>
                    <p onClick={() => tabTabValue(1)} className={tabValue === 1 ? classes.tabSelected : classes.tabs}>Citaciones Auditoría</p>
                    <p onClick={() => tabTabValue(2)} className={tabValue === 2 ? classes.tabSelected : classes.tabs}>Autorizaciones pendientes</p>
                    <p onClick={() => tabTabValue(3)} className={tabValue === 3 ? classes.tabSelected : classes.tabs}>Autorizaciones pendientes ortopedia</p>
                    <p onClick={() => tabTabValue(4)} className={tabValue === 4 ? classes.tabSelected : classes.tabs}>Autorizaciones</p>
                </Tabs>
            </AppBar>
            <Grid className={classes.tabsContent}>
                <TabPanel value={tabValue} index={0}>
                    <DatosGenerales denuncia={denuncia} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <CitacionesAuditoria />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <AutorizacionesPendientes denuncia={denuncia} />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                    Autorizaciones pendientes ortopedia
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                    Autorizaciones
                </TabPanel>
            </Grid>
            <CustomSnackBar
                handleClose={() => dispatch(actions.setSnackBarAuditoria({ open: false }))}
                open={snackBarAuditoria.open}
                title={snackBarAuditoria.message}
                severity={snackBarAuditoria.severity}
                vertical={snackBarAuditoria.vertical ? snackBarAuditoria.vertical : 'bottom'}
            />
        </Grid>
    )
}

export default AuditoriaMedicaDenuncia
