import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router';
//ESTILOS
import { makeStyles } from '@material-ui/core/styles';
//MATERIAL-UI
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
//COMPONENTES
import CustomTypography from '../../commons/Typography/CustomTypography';
import SVGgeneral from '../../../commons/assets/Contrataciones/ProveedorCompleto/general.svg'
import SVGconvenioActual from '../../../commons/assets/Contrataciones/ProveedorCompleto/convenioActual.svg'
import SVGhistoricoConvenios from '../../../commons/assets/Contrataciones/ProveedorCompleto/historicoConvenios.svg'
import SVGconveniosFuturos from '../../../commons/assets/Contrataciones/ProveedorCompleto/conveniosFuturos.svg'


const drawerWidth = 255;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '&& .MuiDrawer-paperAnchorDockedLeft': {
            display: 'contents'
        },

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '&& .MuiDrawer-paperAnchorDockedLeft': {
            display: 'contents'
        }
    },
    drawerOpen: {
        width: drawerWidth,
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

    },
    textMenu: {
        color: '#1473e6'
    },
    list: {
        '& .MuiListItem-button:hover': {
            backgroundColor: 'transparent'
        }
    },
    boton: {
        padding: '0px',
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent'
        }
    },
    fondo: {
        width: '97%',
        height: '13%',
        objectFit: 'cover',
        zIndex: '+1',
        position: 'absolute',
        backgroundColor: '#1473e6',
        opacity: '0.08',
        borderRadius: '25px'
    },
    item: {
        borderRight: '2px solid #1473e6'
    }
}))

const MenuProveedor = props => {
    //CONSTANTES
    const history = useHistory();
    const classes = useStyles(props);
    const initialRutas = {
      general:false,
      convenioActual:false,
      historicoConvenios:false,
      conveniosFuturos:false,  
    }
    const rutaActual = history.location.pathname;
    //ESTADOS
    const [open, setOpen] = useState(true);
    const [ruta, setRuta] = useState(initialRutas)

    const handleDrawer = () => {
        setOpen(!open);
    };
    const handlerRouter = (props) => {
        history.push({
            pathname: props
        })
    }
    useEffect(() => {
        if(rutaActual === '/home/proveedores/general'){
            setRuta({ ...initialRutas, ['general']: true })
        }else if (rutaActual === '/home/proveedores/convenioActual'){
            setRuta({ ...initialRutas, ['convenioActual']: true })
        }else if (rutaActual === '/home/proveedores/historicoConvenios'){
            setRuta({ ...initialRutas, ['historicoConvenios']: true })
        }else if (rutaActual === '/home/proveedores/conveniosFuturos'){
            setRuta({ ...initialRutas, ['conveniosFuturos']: true })
        }else{
            setRuta(initialRutas)
        }
    }, [rutaActual])
    return (
        <div>
          <Drawer className={classes.root}
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <List style={{ minHeight: '400px', borderRight: '1px solid #dadce0' }} className={classes.list}>
                <div className={ruta.general ? classes.fondo : null} onClick={()=>handlerRouter('/home/proveedores/general') }></div>
                <ListItem button onClick={()=>handlerRouter('/home/proveedores/general')} className={ruta.general ? classes.item : null}>
                    <ListItemIcon className={classes.textMenu} > <img src={SVGgeneral} /></ListItemIcon>
                    <ListItemText primary={'General'} className={classes.textMenu} />
                </ListItem>
                <div className={ruta.convenioActual ? classes.fondo : null} onClick={()=>handlerRouter('/home/proveedores/convenioActual')}></div>
                <ListItem button onClick={()=>handlerRouter('/home/proveedores/convenioActual')} className={ruta.convenioActual ? classes.item : null}>
                    <ListItemIcon className={classes.textMenu}> <img src={SVGconvenioActual} /></ListItemIcon>
                    <ListItemText className={classes.textMenu} primary={'Convenio actual'} />
                </ListItem>
                <div className={ruta.historicoConvenios ? classes.fondo : null} onClick={()=>handlerRouter('/home/proveedores/historicoConvenios')}></div>
                <ListItem button onClick={()=>handlerRouter('/home/proveedores/historicoConvenios')} className={ruta.historicoConvenios ? classes.item : null}>
                    <ListItemIcon className={classes.textMenu} > <img src={SVGhistoricoConvenios} /></ListItemIcon>
                    <ListItemText primary={'Histórico convenios'} className={classes.textMenu} />
                </ListItem>
                <div className={ruta.conveniosFuturos ? classes.fondo : null} onClick={()=>handlerRouter('/home/proveedores/conveniosFuturos')}></div>
                <ListItem button onClick={()=>handlerRouter('/home/proveedores/conveniosFuturos')} className={ruta.conveniosFuturos ? classes.item : null}>
                    <ListItemIcon className={classes.textMenu} > <img src={SVGconveniosFuturos} /></ListItemIcon>
                    <ListItemText primary={'Convenios futuros'} className={classes.textMenu} />
                </ListItem>
            </List>
            <Divider />
            <div >
              <IconButton onClick={handleDrawer} className={classes.boton}>
                <MenuIcon />
                <CustomTypography text={open ? 'Cerrar' : 'Abrir'} variant={'body2'} />
              </IconButton>
            </div>
          </Drawer>
        </div>
    )
}

MenuProveedor.propTypes = {

}

export default MenuProveedor
