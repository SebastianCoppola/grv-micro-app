import React, { useState } from 'react'
//Clases:
import clsx from 'clsx'
//Router:
import { useHistory } from 'react-router'
//Mui:
import { Grid, Drawer, Divider, IconButton, ListItem, ListItemIcon, ListItemText, List, makeStyles } from '@material-ui/core'
import { Menu } from '@material-ui/icons/'
//Components:
import CustomTypography from '../../commons/Typography/CustomTypography'
//Redux:
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 255,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '&& .MuiDrawer-paperAnchorDockedLeft': {
            display: 'contents',
        }
    },
    drawerOpen: {
        width: 255,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 4 ,
        },
    }
}))

const MenuProveedor = () => {

    const history = useHistory()
    const classes = useStyles()

    const rutas = useSelector(state => state.generales.rutas)
    
    const [operDrawer, setOperDrawer] = useState(true)

    const isActive = (currentPath) => {
        return currentPath === history.location.pathname
    }

    return (
        <div>
            <Drawer 
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: operDrawer,
                    [classes.drawerClose]: !operDrawer,
                })}
            >
                <List style={{minHeight:'400px', borderRight:'1px solid #dadce0'}}>
                    {Object.keys(rutas?.rutasSecundarias)?.map((it, index) => (
                        <Grid container key={index} style={{width:'100%', borderRight: isActive(rutas.rutasSecundarias[it].path) ? '2px solid #1473e6' : null}}>
                            <Grid container style={{
                                width:'100%', 
                                cursor:'pointer',
                                display:'flex',
                                alignItems:'center',
                                gap:'10px',
                                overflow:'hideen',
                                backgroundColor: isActive(rutas.rutasSecundarias[it].path) ? 'rgba(20, 115, 230, 0.3)' : null,
                                borderRadius: isActive(rutas.rutasSecundarias[it].path) ? '25px' : null,            
                            }}>
                                <ListItem button onClick={()=>history.push(rutas.rutasSecundarias[it].path)}>
                                    <ListItemIcon style={{color:'#1473e6'}}> 
                                        <img src={rutas.rutasSecundarias[it].icon} alt='icon'/>
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={rutas.rutasSecundarias[it].title} 
                                        style={{color:'#1473e6'}}
                                    />
                                </ListItem>
                            </Grid>
                        </Grid>
                    ))}
                </List>
                <Divider />
                <IconButton onClick={()=>setOperDrawer(!operDrawer)} style={{padding: '0px'}}>
                    <Menu />
                    <CustomTypography text={operDrawer ? 'Cerrar' : 'Abrir'} variant={'body2'} />
                </IconButton>
            </Drawer>
        </div>
    )
}

export default MenuProveedor
