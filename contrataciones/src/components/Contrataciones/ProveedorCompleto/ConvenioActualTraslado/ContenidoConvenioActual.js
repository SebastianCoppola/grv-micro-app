import { AppBar, Grid, Tabs, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import {TAB_CONVENIO_ACTUAL_TRASLADO } from '../../../../Utils/const'
import ServicioDeTraslados from './ServicioDeTraslados'
import VersionarTrasladoActual from './VersionarTrasladoActual'

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
    }
}))

const ContenidoConvenioActual = (props) => {
    const{ addTraslado } = props
    //Estilos
    const classes = useStyles(props)
    //Appbar - pantallas
    const [value, setValue] = useState(0);

    //Tab panel:
    function TabPanel(props) {
        const { children, value, index } = props;
        return <> {value === index && (<p> {children} </p>)} </>
    }

  return (
    <Grid xs={12} className={classes.contenidoBox} style={{marginTop:20}}>
        <AppBar className={classes.appBar}>
            <Tabs value={value}>
                {TAB_CONVENIO_ACTUAL_TRASLADO.map(tab=>(
                    <p key={tab.id} onClick={() => setValue(tab.id)} className={value === tab.id ? classes.tabSelected : classes.tabs}>
                        {tab.titulo}
                    </p>
                ))}
            </Tabs>
        </AppBar>
        <Grid className={classes.tabsContent}>
            <TabPanel value={value} index={0}>
                <ServicioDeTraslados addTraslado={addTraslado}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <VersionarTrasladoActual/>
            </TabPanel>
        </Grid>
    </Grid>
  )
}

export default ContenidoConvenioActual
