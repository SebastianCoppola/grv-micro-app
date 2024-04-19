import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { Box, Divider, Grid, makeStyles, Typography } from '@material-ui/core';

import CustomButton from '../../commons/Button/CustomButton';
import { ReactComponent as TickIcon } from '../../../commons/assets/IconsSolicitudesGenericas/tickIcon.svg';
import FiltroSolicitudesGenericas from '../FiltroSolicitudesGenericas/FiltroSolicitudesGenericas';
import Reasignar from '../acciones/Reasignar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { searchCantidadSolicitudesGenericas } from '../../../redux/actions/solicitudesGenericas';
import CustomLoading from '../../commons/Loading/CustomLoading';

const useCardStyles = makeStyles({
    root: ({ color, selected }) => ({
        width: 145,
        height: 145,
        padding: '21px 0 0',
        boxShadow: '0 4px 8px 0 rgba(37, 38, 94, 0.1)',
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
            height: 8,
            width: '100%',
            backgroundColor: selected ? color : 'inherit'
        }
    })
});

const VerticalCard = ({ icon, count, label, color, selected, onClickHandler }) => {
    const classes = useCardStyles({ color, selected });
    return (
        <Box onClick={onClickHandler} display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.root}>
            {icon}
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography><b>{count}</b></Typography>
                <Typography style={{ fontSize: 13.5 }}>{label}</Typography>
            </Box>
            <span></span>
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

const TableroSupervisor = ({ usuarioActivo, request, setRequest, page, rowsPerPage, setPage, setRowsPerPage, setMensajeNotFound, loadingCabecera, noFiltro, setNoFiltro, isAsc }) => {
    const classes = useTableroStyles();
    const [selectedCard, setSelectedCard] = useState(-1);
    const [selectedButton, setSelectedButton] = useState(-1);
    const styledButton = [
        { margin: 5, backgroundColor: 'white', border: '1px solid #d3d3d3' },
        { margin: 5, backgroundColor: 'white', border: '1px solid #2f61d5' },
    ]
    //Dispatch
    const dispatch = useDispatch()
    const cantidades = useSelector(state => state.solicitudesGenericas.cantidadSolicitudesGenericas)
    const [botones, setBotones] = useState(null)
    const [botonesCard, setBotonesCard] = useState(null)


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
        // console.log(selectedButton)
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
        // console.log(noFiltro)
        if (!noFiltro || noFiltro === null) {
            setPage(0)
            setRowsPerPage(rowsPerPage)
            setRequest({
                ...request,
                reabierto: botones && botones === "reabierto" ? true : null,
                vencido: botones && botones === "vencido" ? true : botones === "porVencer" ? false : null,
                porVencer: botones && botones === "porVencer" ? true : null,
                filtroPersonaLogueada: botonesCard !== null ? false : true,
                sinAsignar: botonesCard && botonesCard === "sinAsignar" ? true : false,
                activasDelArea: botonesCard && botonesCard === "activasDelArea" ? true : false,
                asignadasAmi: botonesCard && botonesCard === "asignadasAmi" ? true : false,
                misPedidasEnviadas: botonesCard && botonesCard === "misPedidasEnviadas" ? true : false,
                misPedidasCerradas: botonesCard && botonesCard === "misPedidasCerradas" ? true : false,
                limit: rowsPerPage,
                offset: 0
            })
        } else {
            setPage(0)
            setRowsPerPage(rowsPerPage)
            setRequest({
                idOperador: usuarioActivo && usuarioActivo.id && parseInt(usuarioActivo.id),
                areaOperador: usuarioActivo && usuarioActivo.area,
                filtroPersonaLogueada: true,
                supervisor: usuarioActivo && !usuarioActivo.isOperador,
                offset: 0,
                limit: rowsPerPage,
                ordenarDesc: !isAsc
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
                setBotonesCard("sinAsignar")
                break;
            case 1:
                setBotonesCard("activasDelArea")
                break;
            case 2:
                setBotonesCard("asignadasAmi")
                break;
            case 3:
                setBotonesCard("misPedidasEnviadas")
                break;
            case 4:
                setBotonesCard("misPedidasCerradas")
                break;
        }
    };

    const onButtonClickedHandler = (buttonId) => {
        setSelectedButton(buttonId)
        // setSelectedButton(prevState => prevState === buttonId ? -1 : buttonId)
        switch (buttonId) {
            case 0:
                setBotones("porVencer")
                break;
            case 1:
                setBotones("vencido")
                break;
            case 2:
                setBotones("reabierto")
                break;
        }
    };

    useEffect(() => {
        setMensajeNotFound(`No se encontraron SG${selectedButton === 0 ? ' por vencer' : selectedButton === 1 ? ' vencidas' : selectedButton === 2 ? ' reabiertas' : ''}${selectedCard === 0 ? ' en "Sin asignar"' : selectedCard === 1 ? ' en "Activas del área"' : selectedCard === 2 ? ' en "Activas asignadas a mi"' : selectedCard === 3 ? ' en "Mis pedidas enviadas"' : selectedCard === 4 ? ' en "Mis pedidas cerradas"' : ''}.`)
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
                                <Reasignar usuarioActivo={usuarioActivo} />
                            </Grid>
                            <Grid item>
                                <FiltroSolicitudesGenericas usuarioActivo={usuarioActivo} />
                            </Grid>
                        </Grid>
                    </Grid >
                    <Grid item><Divider /></Grid>
                    <Grid container item justify="space-between">
                        <Grid container item direction="column" xs>
                            <Grid item><Typography>Ver solo las SG que están</Typography></Grid>
                            <Grid item >
                                <CustomButton
                                    width={107}
                                    height={40}
                                    label="Por vencer"
                                    styleButton={selectedButton === 0 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(0)}
                                />
                                <CustomButton
                                    width={107}
                                    height={40}
                                    label="Vencidas"
                                    styleButton={selectedButton === 1 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(1)}
                                />
                                <CustomButton
                                    width={107}
                                    height={40}
                                    label="Reabiertas"
                                    styleButton={selectedButton === 2 ? styledButton[1] : styledButton[0]}
                                    onClik={() => onButtonClickedHandler(2)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item justify="flex-end" xs={9} spacing={4}>
                            <Grid item>
                                <VerticalCard icon={<TickIcon />} count={cantidades && cantidades.sinAsignarDelArea ? cantidades.sinAsignarDelArea : 0} label="Sin asignar" color="#ff7052"
                                    selected={selectedCard === 0}
                                    onClickHandler={() => onCardClickedHandler(0)} />
                            </Grid>
                            <Grid item>
                                <VerticalCard icon={<TickIcon />} count={cantidades && cantidades.activasDelArea ? cantidades.activasDelArea : 0} label="Activas del área" color="#3fb6dc"
                                    selected={selectedCard === 1}
                                    onClickHandler={() => onCardClickedHandler(1)}
                                />
                            </Grid>
                            <Grid item>
                                <VerticalCard icon={<TickIcon />} count={cantidades && cantidades.asignadasAlOperador ? cantidades.asignadasAlOperador : 0} label="Activas asignadas a mí" color="#2f61d5"
                                    selected={selectedCard === 2}
                                    onClickHandler={() => onCardClickedHandler(2)} />
                            </Grid>
                            <Grid item>
                                <VerticalCard icon={<TickIcon />} count={cantidades && cantidades.pedidasDelOperador ? cantidades.pedidasDelOperador : 0} label="Mis pedidas enviadas" color="#f29423"
                                    selected={selectedCard === 3}
                                    onClickHandler={() => onCardClickedHandler(3)} />
                            </Grid>
                            <Grid item>
                                <VerticalCard icon={<TickIcon />} count={cantidades && cantidades.pedidasCerradasDelOperador ? cantidades.pedidasCerradasDelOperador : 0} label="Mis pedidas cerradas" color="#2dc76d"
                                    selected={selectedCard === 4}
                                    onClickHandler={() => onCardClickedHandler(4)} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            )}
        </Box>
    );
};


TableroSupervisor.propTypes = {

};

export default TableroSupervisor;