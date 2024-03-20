import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//material-ui
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from "@material-ui/core/styles";
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    box: {
        margin: '24px 0px'
    },
    contenedor: {
        margin: '24px 24px'
    }
}))


function TabPanel(props) {
    const { marginContenedorAlarma, children, value, index, ...other } = props
    const classes = useStyles(props)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className={marginContenedorAlarma ? classes.box : classes.contenedor}>
                    <Typography> {children} </Typography>
                </div>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    marginContenedorAlarma: PropTypes.any

}


const CustomTab = (props) => {
    const { justificado, marginContenedorAlarma, data } = props
    const [value, setValue] = React.useState(0)


    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Grid container justify={!justificado ? 'center' : 'flex-start'} spacing={2}>
            <Grid item xs={!justificado ? 11 : 12}>
                <Tabs style={{borderBottom:'1px solid #eaeaea', margin: 0, padding: 0 }}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    //variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {data && data.map((item, index) => (
                        item && item.view ?
                            <Tab label={item && item.label} style={{ textTransform: 'none' }} />
                        : null
                    ))}

                </Tabs>
                {data && data.map((item, index) => (
                    item && item.view ?
                        <TabPanel marginContenedorAlarma={marginContenedorAlarma} value={value} index={index} dir={'row'}>
                            {item && item.component}
                        </TabPanel>
                    : null
                ))}
            </Grid>
        </Grid>
    )
}
CustomTab.propTypes = {
    justificado: PropTypes.any,
    marginContenedorAlarma: PropTypes.any
};
export default CustomTab