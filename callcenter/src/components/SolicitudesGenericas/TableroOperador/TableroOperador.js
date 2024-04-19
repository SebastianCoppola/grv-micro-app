import { useEffect, useState } from "react";
import { Box, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import CustomButton from "../../commons/Button/CustomButton";
import FiltroSolicitudesGenericas from "../FiltroSolicitudesGenericas/FiltroSolicitudesGenericas";
import { ReactComponent as TickIcon } from '../../../commons/assets/IconsSolicitudesGenericas/tickIcon.svg';
import { useDispatch, useSelector } from "react-redux";
import { searchCantidadSolicitudesGenericas } from "../../../redux/actions/solicitudesGenericas";
import CustomLoading from "../../commons/Loading/CustomLoading";
//Constantes:
import {BOTONES_OPERADOR, CARDS_OPERADOR} from "../../../Utils/const"

const useCardStyles = makeStyles({
    root: ({ color, selected }) => ({
        width: 260,
        height: 90,
        boxShadow: '0 4px 24px 0 rgba(37, 38, 94, 0.1)',
        border: selected ? `1px solid ${color}` : '1px solid white',
        borderRadius: 5,
        boxSizing: 'border-box',
        backgroundColor: 'white',
        '&:hover': {
            border: `1px solid ${color}`,
            cursor: 'pointer',
            '& span': {
                backgroundColor: color
            }
        },
        '& span': {
            height: '100%',
            width: 8,
            backgroundColor: selected ? color : 'inherit'
        }
    })
});
const HorizontalCard = ({ icon, count, label, color, selected, onClickHandler, }) => {
    const classes = useCardStyles({ color, selected });
    return (
        <Box onClick={onClickHandler} display="flex" alignItems="center" className={classes.root}>
            <span></span>
            <Box p={2}>{icon}</Box>
            <Box display="flex" flexDirection="column">
                <Typography><b>{count}</b></Typography>
                <Typography style={{ fontSize: 13.5 }}>{label}</Typography>
            </Box>
        </Box>
    );
}
const useTableroStyles = makeStyles({
    root: {
        borderRadius: 8,
        backgroundColor: '#f5f5f5'
    },
    titulo: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.46',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#323232',
        margin: '0 0px 23px 0',
        flexGrow: 1
    }
});

const TableroOperador = (props) => {
    const { usuarioActivo, request, setRequest, setPage, rowsPerPage, setRowsPerPage, setMensajeNotFound, loadingCabecera, noFiltro, setNoFiltro,isAsc } = props
    const classes = useTableroStyles();
    const [selectedCard, setSelectedCard] = useState(0);
    const [selectedButton, setSelectedButton] = useState(-1);
    const styledButton = [
        { margin: 5, backgroundColor: 'white', border: '1px solid #d3d3d3' },
        { margin: 5, backgroundColor: 'white', border: '1px solid #2f61d5' },
    ]
    //Dispatch
    const dispatch = useDispatch()
    const cantidades = useSelector(state => state.solicitudesGenericas.cantidadSolicitudesGenericas)
    const [botones, setBotones] = useState(null)
    const [botonesCard, setBotonesCard] = useState("asignadasAmi")

    useEffect(() => {
        if (selectedCard !== -1) {
            setNoFiltro(noFiltro === false ? null : false)
        } else if (selectedCard === -1 && selectedButton !== -1) {
            setBotonesCard(null)
            setNoFiltro(noFiltro === false ? null : false)
        } else {
            setBotonesCard(null)
            setNoFiltro(true)
        }
    }, [selectedCard])

    useEffect(() => {
        if (selectedButton !== -1) {
            setNoFiltro(noFiltro === false ? null : false)
        } else if (selectedButton === -1 && selectedCard !== -1) {
            setBotones(null)
            setNoFiltro(noFiltro === false ? null : false)
        } else {
            setBotones(null)
            setNoFiltro(true)
        }
    }, [selectedButton])

    useEffect(() => {
        if (!noFiltro || noFiltro === null) {
            setPage(0)
            setRowsPerPage(rowsPerPage)
            setRequest({
                ...request,
                idOperador: usuarioActivo.id && parseInt(usuarioActivo.id),
                areaOperador: usuarioActivo.area,
                supervisor: false,
                reabierto: botones && botones === BOTONES_OPERADOR[0] ? true : null,
                vencido: botones && botones === BOTONES_OPERADOR[1] ? true : botones === BOTONES_OPERADOR[2] ? false : null,
                porVencer: botones && botones === BOTONES_OPERADOR[2] ? true : null,
                filtroPersonaLogueada: botonesCard !== null ? false : true,
                sinAsignar: false,
                activasDelArea: false,
                asignadasAmi: botonesCard && botonesCard === CARDS_OPERADOR[0] ? true : false,
                misPedidasEnviadas: botonesCard && botonesCard === CARDS_OPERADOR[1] ? true : false,
                misPedidasCerradas: botonesCard && botonesCard === CARDS_OPERADOR[2] ? true : false,
                limit: rowsPerPage,
                offset: 0
            })
        } 
    }, [noFiltro])

    useEffect(() => {
        if (usuarioActivo) {
            let req = {
                areaOperador: usuarioActivo && usuarioActivo.area,
                idOperador: usuarioActivo && usuarioActivo.id && parseInt(usuarioActivo.id),
                esSupervisor: usuarioActivo && !usuarioActivo.isOperador
            }
            dispatch(searchCantidadSolicitudesGenericas(req))
        }
    }, [])

    const onCardClickedHandler = (cardId) => {
        setSelectedCard(cardId)
        // setSelectedCard(prevState => prevState === cardId ? -1 : cardId)
        switch (cardId) {
            case 0:
                setBotonesCard(CARDS_OPERADOR[0])
                break;
            case 1:
                setBotonesCard(CARDS_OPERADOR[1])
                break;
            case 2:
                setBotonesCard(CARDS_OPERADOR[2])
                break;
        }
    };


    const onButtonClickedHandler = (buttonId) => {
        setSelectedButton(buttonId)
        // setSelectedButton(prevState => prevState === buttonId ? -1 : buttonId)
        switch (buttonId) {
            case 0:
                setBotones(BOTONES_OPERADOR[2])
                break;
            case 1:
                setBotones(BOTONES_OPERADOR[1])
                break;
            case 2:
                setBotones(BOTONES_OPERADOR[0])
                break;
        }
    };

    useEffect(() => {
        setMensajeNotFound(`No se encontraron SG${selectedButton === 0 ? ' por vencer' : selectedButton === 1 ? ' vencidas' : selectedButton === 2 ? ' reabiertas' : ''}${selectedCard === 0 ? ' en "Activas asignadas a mi"' : selectedCard === 1 ? ' en "Mis pedidas enviadas"' : selectedCard === 2 ? ' en "Mis pedidas cerradas"' : ''}.`)
    }, [selectedButton, selectedCard])

    return (
        <Box p={3} className={classes.root}>
            {loadingCabecera ? (
                <CustomLoading loading={true} />
            ) : (
                <Grid container direction="column" spacing={2}>
                    <Grid container item justify="space-between" alignItems="flex-end">
                        <Grid item xs={8}><Typography className={classes.titulo}>Tablero de SG</Typography></Grid >
                        <Grid container item justify="flex-end" xs={4}>
                            <Grid item>
                                <FiltroSolicitudesGenericas usuarioActivo={usuarioActivo} />
                            </Grid>
                        </Grid>
                    </Grid >
                    <Grid item><Divider /></Grid>
                    <Grid container item justify="space-between">
                        <Grid container item xs={9} spacing={2}>
                            <Grid item>
                                <HorizontalCard
                                    icon={<TickIcon />}
                                    count={cantidades && cantidades.asignadasAlOperador ? cantidades.asignadasAlOperador : 0}
                                    label="Activas asignadas a mí"
                                    color="#2f61d5"
                                    selected={selectedCard === 0}
                                    onClickHandler={() => onCardClickedHandler(0)}
                                />
                            </Grid>
                            <Grid item>
                                <HorizontalCard
                                    icon={<TickIcon />}
                                    count={cantidades && cantidades.pedidasDelOperador ? cantidades.pedidasDelOperador : 0}
                                    label="Mis pedidas enviadas"
                                    color="#f29423"
                                    selected={selectedCard === 1}
                                    onClickHandler={() => onCardClickedHandler(1)}
                                />
                            </Grid>
                            <Grid item>
                                <HorizontalCard
                                    icon={<TickIcon />}
                                    count={cantidades && cantidades.pedidasCerradasDelOperador ? cantidades.pedidasCerradasDelOperador : 0}
                                    label="Mis pedidas cerradas"
                                    color="#2dc76d"
                                    selected={selectedCard === 2}
                                    onClickHandler={() => onCardClickedHandler(2)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction="column" alignItems="flex-end" xs>
                            <Grid item><Typography>Ver solo las SG que están</Typography></Grid>
                            <Grid item>
                                <CustomButton
                                    width={95}
                                    height={40}
                                    label="Por vencer"
                                    styleButton={selectedButton === 0 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(0)}
                                />
                                <CustomButton
                                    width={90}
                                    height={40}
                                    label="Vencidas"
                                    styleButton={selectedButton === 1 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(1)}
                                />
                                <CustomButton
                                    width={95}
                                    height={40}
                                    label="Reabiertas"
                                    styleButton={selectedButton === 2 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(2)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            )}
        </Box>
    );
};

export default TableroOperador;