import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
//Mui;
import { List, ListItem, ListItemIcon, ListItemText, Chip, makeStyles } from '@material-ui/core/'
import { Add } from '@material-ui/icons/'
//Icons:
import SVGproveedores from '../../../commons/assets/Contrataciones/Proveedores/proveedores.svg'
import SVGnomencladas from '../../../commons/assets/Contrataciones/Nomencladas/nomencladas.svg'
import SVGnoNomencladas from '../../../commons/assets/Contrataciones/NoNomencladas/noNomencladas.svg'
import SVGmodulos from '../../../commons/assets/Contrataciones/Modulos/modulos.svg'
import SVGsolicitudesGenericas from '../../../commons/assets/Contrataciones/SolicitudesGenericas/solicitudesGenericas.svg'
import SVGconsulta from '../../../commons/assets/Icons Menu/Consultas.svg'
//Utils: 
import RutasInternas from '../../../Utils/rutasInternas'

const useStyles = makeStyles({
    lista: {
        flexGrow: 1,
        paddingTop: '10%'
    },
    listActive: {
        backgroundColor: "rgb(245, 245, 245, 0.15) !important",
        borderRadius: '4px',
        border: '1px solid #f5f5f5',
      },
      botonList: {
        '&:hover': {
          backgroundColor: "rgb(245, 245, 245, 0.15) !important",
          borderRadius: '4px',
        },
        width: '90%',
        height: '35px',
        marginTop: '20px',
        marginLeft: '15px'
      },
      textMenu: {
        '&>.MuiTypography-root': {
          fontSize: '14px !important',
        },
        margin: '2px 0px 0px 0px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#e3e3e3',
      },
      iconsMenu: {
        padding: '0px 0px 0px 8.5px',
        minWidth: '0px',
        marginLeft: '5px',
        marginRight: '15px',
        color: '#ffffff',
        width:'20px',
        height:'20px'
      },
      buttonAdd: {
        marginLeft: '15px',
        marginRight: '30px',
        marginBottom: '19px',
        justifyContent: 'start',
        width: '190px',
        minHeight: '40px',
        borderRadius: '20px',
        backgroundColor: '#1473e6',
        fontSize: '14px',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#1473e6',
          borderRadius: '20px',
        },
        '&:focus': {
          backgroundColor: '#1473e6',
          borderRadius: '20px',
        },
      },
})

const Proveedores = props => {
    
    const { open, handleRouter, rutaActual } = props
    
    const classes = useStyles(props)

    const initialRutas = {
        proveedores: false,
        prestacionesNomencladas: false,
        prestacionesNoNomencladas: false,
        modulos: false,
        solicitudesGenericas: false,
    }

    //ESTADOS
    const [ruta, setRuta] = useState(initialRutas)

    //SELECCIONA EL ITEM DEL MENU Y LO RESALTA DE COLOR BLANCO
    useEffect(() => {
        if (rutaActual === RutasInternas.PROVEEDORES) {
          setRuta({ ...initialRutas, ['proveedores']: true })
          return
        } else if (rutaActual === RutasInternas.PRESTACIONES_NOMENCLADAS) {
          setRuta({ ...initialRutas, ['prestacionesNomencladas']: true })
          return
        } else if (rutaActual === RutasInternas.PRESTACIONES_NO_NOMENCLADAS) {
          setRuta({ ...initialRutas, ['prestacionesNoNomencladas']: true })
          return
        } else if (rutaActual === RutasInternas.MODULOS) {
          setRuta({ ...initialRutas, ['modulos']: true })
          return
        } else if (rutaActual === RutasInternas.SOLICITUDES_GENERICAS) {
          setRuta({ ...initialRutas, ['solicitudesGenericas']: true })
          return
        } else if (rutaActual === RutasInternas.CONSULTA_SINIESTROS) {
          setRuta({ ...initialRutas, ['consultaSolicitudes']: true })
          return
        } else {
          setRuta({ ...initialRutas })
          return
        }
    }, [rutaActual])

    return (
        <> 
            <List className={classes.lista}>
                <ListItem button onClick={() => handleRouter(RutasInternas.PROVEEDORES)} selected={ruta.proveedores} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}> 
                        <img src={SVGproveedores} style={{ width: '20px', height: '20px' }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Proveedores"} />}
                </ListItem>
                <ListItem button onClick={() => handleRouter(RutasInternas.PRESTACIONES_NOMENCLADAS)} selected={ruta.prestacionesNomencladas} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}> 
                        <img src={SVGnomencladas} style={{ width: '20px', height: '20px' }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Prestaciones nomencladas"} />}
                </ListItem>
                <ListItem button onClick={() => handleRouter(RutasInternas.PRESTACIONES_NO_NOMENCLADAS)} selected={ruta.prestacionesNoNomencladas} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}>
                        <img src={SVGnoNomencladas} style={{ width: '20px', height: '20px' }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Prestaciones no nomencladas"} /> }
                </ListItem>
                <ListItem button onClick={() => handleRouter(RutasInternas.MODULOS)} selected={ruta.modulos} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}> 
                        <img src={SVGmodulos} style={{ width: '20px', height: '20px' }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Módulos"} /> }
                </ListItem>
                <ListItem button onClick={() => handleRouter(RutasInternas.SOLICITUDES_GENERICAS)} selected={ruta.solicitudesGenericas} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}>
                        <img src={SVGsolicitudesGenericas} style={{ width: '20px', height: '20px' }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Solicitudes Genéricas"} /> }
                </ListItem>
                <ListItem button onClick={() => handleRouter(RutasInternas.CONSULTA_SINIESTROS)} selected={ruta.consultaSolicitudes} disableGutters={true} component={''} to={''} style={open ? { width: '90%' } : { width: '50px' }} className={classes.botonList} classes={{ selected: classes.listActive }}>
                    <ListItemIcon className={classes.iconsMenu}>
                        <img src={SVGconsulta} style={{ width: '20px', height: '20px', marginRight: 2 }} />
                    </ListItemIcon>
                    {open && <ListItemText className={classes.textMenu} primary={"Consulta de Siniestros"} /> }
                </ListItem>
            </List>
            <Chip
                style={!open ? { width: '60px', marginLeft: '10px' } : null}
                className={classes.buttonAdd}
                icon={<Add style={{ marginLeft: '18px', marginRight: '5.5px', color: '#ffffff' }} />}
                label={open ? "Nuevo Proveedor" : null}
                clickable
                onClick={() => handleRouter(RutasInternas.ALTA_PROVEEDOR)}
            />
        </>
    )
}

Proveedores.propTypes = {
    open: PropTypes.bool,
    handleRouter: PropTypes.any,
    rutaActual: PropTypes.any, 
}

export default Proveedores
