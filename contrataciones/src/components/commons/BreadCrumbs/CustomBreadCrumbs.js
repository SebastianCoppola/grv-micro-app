import React from 'react'
//material-ui
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
//estilo
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > .MuiBreadcrumbs-ol > .MuiBreadcrumbs-separator': {
            marginLeft: '4px',
            marginRight: '4px'
        }
    },
    texto: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '2.1',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#707070',

    },
    separador: {
        height: '15px',
        width: '15px',
        color: '#707070'
    }
}));

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}



const breadcrumbNameMap = {
    'home': 'Inicio',
    'solicitudesGenericas': 'Solicitudes Génericas',
    'ver-detalle': 'Ver detalle',
    'editar': 'Editar',
};


const CustomBreadCrumbs = (props) => {
    const { nroDenuncia } = props
    const classes = useStyles();
    const location = useLocation()

    // console.log('location', location)



    return (
        <Breadcrumbs className={classes.root} separator={<NavigateNextIcon className={classes.separador} />} aria-label="breadcrumb">
            <Link className={classes.texto} href="/home" onClick={handleClick}>
                Inicio
            </Link>
            <Link className={classes.texto} href="/home/consultas/" onClick={handleClick}>
                Consultas
            </Link>
            <Typography className={classes.texto} > Denuncia {nroDenuncia}</Typography>

            {/* {
                location.pathname
                    .split('/')
                    .filter(x => Boolean(x))
                    .map(path => (
                        <Link className={classes.texto} onClick={handleClick}>
                            {breadcrumbNameMap[path]}
                        </Link>
                    ))
            } */}
        </Breadcrumbs>
    )
}

export default CustomBreadCrumbs
