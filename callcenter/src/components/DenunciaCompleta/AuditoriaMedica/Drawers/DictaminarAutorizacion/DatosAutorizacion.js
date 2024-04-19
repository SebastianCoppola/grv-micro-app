import React, { useState } from 'react'
//Mui:
import { Grid, makeStyles, AppBar, Tabs } from '@material-ui/core'
//Components:
import ContenidoDatosAutorizacion from './ContenidoDatosAutorizacion'
import PedidosMaterialesQuirurgicos from './PedidosMaterialesQuirurgicos'

const useStyles = makeStyles({
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
    },
})

//Metodo gestionar tabs:
function TabPanel(props) {
    const { children, value, index } = props
    return <> {value === index && (<p> {children} </p>)} </>
}

const DatosAutorizacion = (props) => {
    const { idTipo, numeroAutorizacion,
        disableRechazarAprobar, setDisableRechazarAprobar,
        request, setRequest, setNumero } = props
    const classes = useStyles()
    const [tabValue, tabTabValue] = useState(0)

    return (
        <Grid container>
            {idTipo && idTipo === "Materiales Quirurgicos" ?
                <Grid container>
                    <AppBar className={classes.appBar}>
                        <Tabs value={tabValue}>
                            <p onClick={() => tabTabValue(0)} className={tabValue === 0 ? classes.tabSelected : classes.tabs}>Datos de autorización</p>
                            <p onClick={() => tabTabValue(1)} className={tabValue === 1 ? classes.tabSelected : classes.tabs}>Pedido de materiales quirúrgicos</p>
                        </Tabs>
                    </AppBar>
                    <Grid item xs={12} className={classes.tabsContent}>
                        <TabPanel value={tabValue} index={0}>
                            <ContenidoDatosAutorizacion
                                numeroAutorizacion={numeroAutorizacion}
                                request={request}
                                setRequest={setRequest}
                                setNumero={setNumero}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <PedidosMaterialesQuirurgicos
                                numeroAutorizacion={numeroAutorizacion}
                                disableRechazarAprobar={disableRechazarAprobar}
                                setDisableRechazarAprobar={setDisableRechazarAprobar}
                            />
                        </TabPanel>
                    </Grid>
                </Grid>
                :
                <ContenidoDatosAutorizacion
                    numeroAutorizacion={numeroAutorizacion}
                    request={request}
                    setRequest={setRequest}
                    setNumero={setNumero}
                />
            }
        </Grid>
    )
}

export default DatosAutorizacion
