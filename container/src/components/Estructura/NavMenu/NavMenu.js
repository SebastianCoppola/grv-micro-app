import React from 'react'
//Router:
import { useHistory } from 'react-router-dom' 
import { useLocation } from 'react-router-dom'
//Mui:
import { makeStyles, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from '@material-ui/core/'
import { Add } from '@material-ui/icons/'

const useStyles = makeStyles({
    listItemHover: {
        '&:hover': {
            backgroundColor: 'rgb(245, 245, 245, 0.15)',
            borderRadius: '4px',
        }
    },
    buttonHover: {
        '&:hover': {
            backgroundColor: '#1473e6',
        },
    },
})

const NavMenu = ({ navLinks, open }) => {
    
    const history = useHistory()
    const location = useLocation()  
    const classes = useStyles()

    const isActive = (currentPath) => {
        return currentPath === location.pathname
    }

    return (
        <Grid container direction='column' justifyContent='space-between' style={{height:'100%'}}> 
            <List style={{marginTop:'50px'}}>
                {Object.keys(navLinks.rutasPrimarias).map((it, index) => (
                    <ListItem 
                        key={index}
                        button 
                        onClick={() => history.push(navLinks.rutasPrimarias[it].path)} 
                        style={{padding:0, margin:'15px 0 0 0'}} 
                    >
                        <span style={{
                            width:'100%', 
                            height:'30px',
                            cursor:'pointer',
                            display:'flex',
                            alignItems:'center',
                            gap:'10px',
                            backgroundColor: isActive(navLinks.rutasPrimarias[it].path) ? 'rgb(245, 245, 245, 0.15)' : null,
                            borderRadius: isActive(navLinks.rutasPrimarias[it].path) ? '4px' : null,
                            border: isActive(navLinks.rutasPrimarias[it].path) ? '1px solid #f5f5f5' : null,
                            overflow:'hideen'

                        }}>
                            <ListItemIcon style={{minWidth:0, width:0, marginLeft:'12px'}}> 
                                <img src={navLinks.rutasPrimarias[it].icon} style={{width:'20px', height:'20px'}} />
                            </ListItemIcon>
                            {open &&
                                <ListItemText style={{maxHeight:'100%', marginLeft:'20px'}}>
                                    <Typography style={{fontSize:'14px', color:'#e3e3e3'}} noWrap>
                                        {open && navLinks.rutasPrimarias[it].title}
                                    </Typography> 
                                </ListItemText>
                            }
                        </span>
                    </ListItem>
                ))}
            </List>
            <Grid item container justifyContent='flex-start' style={{padding:'0 0 20px 0'}}>
                {Object.keys(navLinks.otrasRutasPrimarias).map((it, index) => (
                    <Chip
                        key={index}
                        icon={<Add style={{color:'#ffffff', marginLeft:'10px'}}/>}
                        label={open ? navLinks.otrasRutasPrimarias[it].title : null}
                        clickable
                        onClick={() => history.push(navLinks.otrasRutasPrimarias[it].path)}
                        className={classes.buttonHover}
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            minHeight: '40px',
                            backgroundColor: '#1473e6',
                            borderRadius: '20px',
                            fontSize: '14px',
                            color: '#ffffff',
                        }}
                    />
                ))}
            </Grid>
            {/* <List style={{marginTop:'50px'}}>
                {navLinks?.rutasPrimarias?.length && navLinks.rutasPrimarias.map((it, index) => (
                    <ListItem 
                        key={index}
                        button 
                        onClick={() => history.push(it.path)} 
                        style={{padding:0, margin:'15px 0 0 0'}} 
                    >
                        <span style={{
                            width:'100%', 
                            height:'30px',
                            cursor:'pointer',
                            display:'flex',
                            alignItems:'center',
                            gap:'10px',
                            backgroundColor: isActive(it.path) ? 'rgb(245, 245, 245, 0.15)' : null,
                            borderRadius: isActive(it.path) ? '4px' : null,
                            border: isActive(it.path) ? '1px solid #f5f5f5' : null,
                            overflow:'hideen'

                        }}>
                            <ListItemIcon style={{minWidth:0, width:0, marginLeft:'12px'}}> 
                                <img src={it.icon} style={{width:'20px', height:'20px'}} />
                            </ListItemIcon>
                            {open &&
                                <ListItemText style={{maxHeight:'100%', marginLeft:'20px'}}>
                                    <Typography style={{fontSize:'14px', color:'#e3e3e3'}} noWrap>
                                        {open && it.title}
                                    </Typography> 
                                </ListItemText>
                            }
                        </span>
                    </ListItem>
                ))}
            </List>
            <Grid item container justifyContent='flex-start' style={{padding:'0 0 20px 0'}}>
                {navLinks?.otrasRutasPrimarias?.length && navLinks.otrasRutasPrimarias.map((it, index) => (
                    <Chip
                        key={index}
                        icon={<Add style={{color:'#ffffff', marginLeft:'10px'}}/>}
                        label={open ? it.title : null}
                        clickable
                        onClick={() => history.push(it.path)}
                        className={classes.buttonHover}
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            minHeight: '40px',
                            backgroundColor: '#1473e6',
                            borderRadius: '20px',
                            fontSize: '14px',
                            color: '#ffffff',
                        }}
                    />
                ))}
            </Grid> */}
        </Grid>
    )
}

export default NavMenu
