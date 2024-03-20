import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//estilo
import { makeStyles } from '@material-ui/styles';
import "./style.scss";
//Componentes
import CustomTypography from '../Typography/CustomTypography';
import CustomButton from '../Button/CustomButton';
import CreateIcon from '@material-ui/icons/Create';


const useStyles = makeStyles({
    root: {
        borderBottom: props=>props.isOpen ===false ? 'solid 1px #dadce0' : null,
        '& .MuiAccordionSummary-content.Mui-expanded': {
            borderBottom:  'solid 1px #1473e6',
        }
    },
    titulo: {
        marginBottom: '10px',
       
    },
    acordion: {
        boxShadow: 'none'
    },
    card: {
        borderBottom: 'solid 1px #dadce0'
    }
})

const CustomAcordion2= (props) => {
    const classes = useStyles(props);
    const { titulo, estilo, botonComprimir, denunciaCompleta, onEditar,  isOpen, onToggle, editar, children, error, disableEdition } = props
    
    return (

        <Accordion square expanded={isOpen} onChange={ !botonComprimir ? onToggle : null} className={estilo ? classes.acordion : null}>

            <AccordionSummary
                expandIcon={!botonComprimir ?  <ExpandMoreIcon /> : null}
                aria-controls="panel1a-content"
                id="panel2-header"
                className={estilo ? classes.root : null}
              //  defaultExpanded
            >
                <Grid container alignItems={'center'} justify='space-between' className={classes.titulo}>
                    <Grid item container alignItems='center' spacing={1}>
                        <Grid item xs={denunciaCompleta ? 8 : 10}>
                            <CustomTypography text={titulo} variant={'subtitle1'} fontweight={'600'} />
                        </Grid>
                        {botonComprimir ?
                            <Grid item >
                                <CustomButton size={'small'} onClik={onToggle} label={isOpen ? 'Comprimir' : 'Expandir'} variant={'outlined'} />
                            </Grid>
                            : null}
                        {denunciaCompleta ?
                            <Grid item >
                                <CustomButton onClik={onEditar} size='small' label={editar ? 'Vista Lectura ' : 'Editar'} variant={'outlined'} startIcon={!editar ? <CreateIcon /> : null} disabled={disableEdition}/>
                            </Grid>
                            : null}
                    </Grid>

                </Grid>
            </AccordionSummary>
            <AccordionDetails >
                
            {children}
                
            </AccordionDetails>

        </Accordion>


    )
}
CustomAcordion2.propTypes = {
    titulo: PropTypes.string,
     body: PropTypes.any,
     estilo: PropTypes.any,  
     botonComprimir: PropTypes.any, 
     denunciaCompleta: PropTypes.any, 
     onEditar: PropTypes.any,  
     isOpen:PropTypes.any, 
     onToggle:PropTypes.any, 
     editar:PropTypes.any,
    children:PropTypes.any,
    estiloTitulo:PropTypes.any
};
export default CustomAcordion2