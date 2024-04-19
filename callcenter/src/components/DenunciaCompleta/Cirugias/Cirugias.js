import React, { useState } from 'react'
//Mui:
import { AppBar, Grid, makeStyles, Tabs } from '@material-ui/core'
//Componentes:
import General from './Tabs/General/General'
import PedidoMaterialesQX from './Tabs/PedidoMatQx/PedidoMaterialesQX'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'
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

const Cirugias = (props) => {
    const { denuncia, usuarioActivo } = props
    const classes = useStyles()
    const [tabValue, tabTabValue] = useState(0)
    const dispatch = useDispatch()
    const snackBarAuditoria = useSelector(state => state.auditoriaMedica.snackBarAuditoria)

    return (
        <Grid style={{padding:'0px 20px'}}>
            <AppBar className={classes.appBar}>
                <Tabs value={tabValue}>
                    <p onClick={() => tabTabValue(0)} className={tabValue === 0 ? classes.tabSelected : classes.tabs}>General</p>
                    <p onClick={() => tabTabValue(1)} className={tabValue === 1 ? classes.tabSelected : classes.tabs}>Pedido Materiales Quirúrgicos</p>
                </Tabs>
            </AppBar>
            <Grid className={classes.tabsContent}>
                <TabPanel value={tabValue} index={0}>
                    <General denuncia={denuncia} usuarioActivo={usuarioActivo}/>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <PedidoMaterialesQX denuncia={denuncia} usuarioActivo={usuarioActivo}/>
                </TabPanel>
            </Grid>
            <CustomSnackBar
                handleClose={()=>dispatch(actions.setSnackBarAuditoria({open:false}))}
                open={snackBarAuditoria.open}
                title={snackBarAuditoria.message}
                severity={snackBarAuditoria.severity}
                vertical={snackBarAuditoria.vertical ? snackBarAuditoria.vertical : 'bottom'}
            />
        </Grid>
    )
}

export default Cirugias