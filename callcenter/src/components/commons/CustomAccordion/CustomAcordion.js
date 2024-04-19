import React from 'react'
import PropTypes from 'prop-types';
//material-ui
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrintIcon from '@material-ui/icons/Print';
import AccordionActions from '@material-ui/core/AccordionActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Collapse from '@material-ui/core/Collapse';
//estilo
import { makeStyles } from '@material-ui/styles';
//Componentes
import CustomTypography from '../Typography/CustomTypography';
import CustomButton from '../Button/CustomButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles({
    root: {
        borderBottom: 'solid 1px #dadce0',
        '& .MuiAccordionSummary-content.Mui-expanded': {
            borderBottom: 'solid 1px #1473e6',
        }
    },
    titulo: {
        marginBottom: '10px'
    },
    acordion: {
        boxShadow: 'none'
    },
    card: {
        borderBottom: 'solid 1px #dadce0'
    }
})
const CustomAccordion = (props) => {
    const { titulo, body, editar, estilo, state, botonComprimir, id, idClick, denunciaCompleta, onEditar, expandido, setExpandido } = props
    const classes = useStyles(props);
    const [expanded, setExpanded] = React.useState(true);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false)
        if (expandido) {
            setExpandido(!expandido)
        }

    };
    const hanldeButtonExpandir = (panel) => (event, newExpanded) => {
        if (expandido) {
            setExpanded(newExpanded ? panel : false)
            setExpandido(expanded)
        }

    }

    return (

        <Accordion square expanded={expanded === idClick || expandido} onChange={handleChange(idClick)} className={estilo ? classes.acordion : null}>

            <AccordionSummary
                expandIcon={!botonComprimir ? <ExpandMoreIcon /> : null}
                aria-controls="panel1a-content"
                id="panel2-header"
                className={estilo ? classes.root : null}
                defaultExpanded
            >
                <Grid container alignItems={'center'} justify='space-between' className={classes.titulo}>
                    <Grid item container alignItems='center' spacing={1}>
                        <Grid item xs={denunciaCompleta ? 8 : 10}>
                            <CustomTypography text={titulo} variant={'subtitle1'} fontweight={'600'} />
                        </Grid >
                        {botonComprimir ?
                            <Grid item >
                                <CustomButton
                                    size={'small'}
                                    onClik={hanldeButtonExpandir(idClick)}
                                    label={expandido || expanded ? 'Comprimir' : 'Expandir'}
                                    variant={'outlined'}
                                />
                            </Grid>
                            : null}
                        {denunciaCompleta ?
                            <Grid item >
                                <CustomButton
                                    onClik={onEditar}
                                    size='small'
                                    label={editar ? 'Vista Lectura ' : 'Editar'}
                                    variant={'outlined'}
                                    startIcon={!editar ? <CreateIcon /> : null}
                                />
                            </Grid>
                            : null}
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Collapse in={expandido || expanded} timeout="auto" unmountOnExit>
                    {body}
                </Collapse>
            </AccordionDetails>

        </Accordion>
    )
}
CustomAccordion.propTypes = {
    titulo: PropTypes.string,
    body: PropTypes.any,
    estilo: PropTypes.any,
    botonComprimir: PropTypes.any,
    denunciaCompleta: PropTypes.any,
    onEditar: PropTypes.any,
    editar: PropTypes.any,
    expandido: PropTypes.any,
    setExpandido: PropTypes.any,
    id: PropTypes.any,
    idClick: PropTypes.any,
    state: PropTypes.any
};
export default CustomAccordion