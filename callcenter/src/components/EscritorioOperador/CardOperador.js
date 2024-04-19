import React, { Fragment } from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index';
//material-ui
import { Grid, makeStyles, MenuItem } from '@material-ui/core'
import { Menu } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import AccessAlarmOutlinedIcon from '@material-ui/icons/AccessAlarmOutlined';
//componentes
import CustomAvatar from '../commons/Avatar/CustomAvatar';
import CustomTypography from '../commons/Typography/CustomTypography';
import CustomChip from '../commons/Chip/CustomChip';
import CustomSnackBar from '../commons/SnackBar/CustomSnackBar';
import { ERROR_SEARCH_BY_ID, ERROR_SEARCH_BY_ID_REDIRECCION } from '../../Utils/const';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '0px',
    },
    texto: {
        fontSize: '15px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#6e6e6e',
    },
    avatar: {
        border: 'solid 1px #f5f5f5',
    },
    select: {
        '& > .MuiSelect-icon': {
            display: 'none'
        },
        '& > .MuiSelect-root > .MuiTypography-root': {
            display: 'none'
        },
        '& >.MuiSelect-select .MuiSelect-select': {
            paddingRight: '0px',
            minWidth: '0px'
        },
        '& >.MuiInputBase-input': {
            padding: 0
        },
        '& >.MuiSelect-selectMenu': {
            minWidth: '0px'
        }
    },
    items: {
        margin: '5px 0 5px 0px',
        fontSize: '17px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#4b4b4b',
    }
}));

const CardOperador = (props) => {
    const { img, accidentado, denuncia, color, backgroundColor, countAlarm, accion, onClick, setActivarAlarmas, showAsignado, alarmas, data } = props;
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const [anchorElAlarm, setAnchorElAlarm] = React.useState(null);
    const [anchorElmenu, setAnchorElMenu] = React.useState(null);
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open: false,
        title: '',
        severity: ''
    });

    const handleClickMenu = (event) => {
        event.stopPropagation()
        setAnchorElMenu(event.currentTarget);
    };

    const handleClickAlarm = (event) => {
        event.stopPropagation()
        setAnchorElAlarm(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation()
        setAnchorElMenu(null);
        setAnchorElAlarm(null);
    };

    const handleSiniestroPendientes = (e) => {
        e.stopPropagation()
        onClick(e);
        setAnchorElMenu(null);
    };

    const handleAlarma = (e, item) => {
        e.stopPropagation();
        let idEstadoCem = data && data.estadoCEM
        if (data && data.idDenuncia) {
            dispatch(actions.searchDenunciaById(data.idDenuncia, idEstadoCem, callbackAlarma, item.codigo))
        }
        setAnchorElAlarm(null);
    }

    const callbackAlarma = (succes, codigo) => {
        if (succes) {
            if (codigo === 1) {
                setActivarAlarmas(alarmas => ({ ...alarmas, ['cortoPunzante']: true }))
                history.push('/home/editar/generales');
            }
            if (codigo === 2) {
                setActivarAlarmas(alarmas => ({ ...alarmas, ['diagnosticoMedico']: true }))
                history.push('/home/editar/generales');
            }
            if (codigo === 3) {
                setActivarAlarmas(alarmas => ({ ...alarmas, ['seguimientoMedico']: true }))
                history.push('/home/editar/traslados');
            }
        } else {
            setOpenSnackBar({
                open: true,
                severity: 'error',
                title: <div>
                    <div>{`${ERROR_SEARCH_BY_ID} 
                ${ERROR_SEARCH_BY_ID_REDIRECCION}`}</div>
                    <div>Por favor intente nuevamente.</div>
                </div>
            })
        }
    }

    const contieneAlarmasSinPendientes = () => {
        let sinPendiente = false
        if (alarmas && alarmas.length > 0) {
            alarmas.map((item) => {
                if (!item.pendiente) {
                    sinPendiente = true;
                }
            })
        }
        return sinPendiente;
    }
    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false });
    };

    return (
        <>
            <Grid container direction={'row'} style={{ minHeight: '100px' }} className={classes.root}>
                <Grid container item xs={10} alignItems={'center'} style={{ paddingLeft: '8px' }} >
                    <Grid item>
                        <CustomTypography
                            className={classes.texto}
                            text={`Accidentado: ${accidentado ? accidentado : ''}`}
                        />
                        <CustomTypography
                            className={classes.texto}
                            text={`Denuncia: ${denuncia ? denuncia : ''}`}
                            style={{ color: '#4b4b4b', fontSize: '13px' }}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={2} justify={accion ? 'center' : 'flex-start'} alignItems={accion ? 'center' : 'flex-end'} style={{ paddingRight: '5px' }} >
                    <Grid item>
                        {accion ?
                            (<>
                                <Grid item >
                                    {contieneAlarmasSinPendientes() ?
                                        <Fragment>
                                            <IconButton onClick={handleClickMenu} aria-label="add an alarm" style={{ height: '40px', width: '40px', marginLeft: '5px', marginBottom: '5px' }}>
                                                <MoreVertOutlinedIcon style={{ color: '#747474', height: '22px', width: '22px' }} />
                                            </IconButton>
                                            <Menu
                                                id="menu-siniestro"
                                                anchorEl={anchorElmenu}
                                                keepMounted
                                                open={Boolean(anchorElmenu)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleSiniestroPendientes}> <CustomTypography text='Enviar a Siniestros con pendientes' className={classes.items} /></MenuItem>
                                            </Menu>
                                        </Fragment>
                                        : null}

                                    <CustomChip
                                        onClick={handleClickAlarm}
                                        isAction={true}
                                        color={backgroundColor}
                                        avatar={<AccessAlarmOutlinedIcon style={{ width: '13px', height: '13px', color: color, paddingLeft: '4px' }} />}
                                        label={countAlarm}
                                        colorLabel={color}
                                        fontWeight={true}
                                        isAction={true}
                                    >
                                    </CustomChip>
                                    <Menu
                                        id="menu-alert"
                                        anchorEl={anchorElAlarm}
                                        keepMounted
                                        open={Boolean(anchorElAlarm)}
                                        onClose={handleClose}
                                    >
                                        {alarmas ? alarmas.map((item, index) => {
                                            return (<MenuItem onClick={(e) => handleAlarma(e, item,)}> <CustomTypography text={item.descripcion} className={classes.items} /></MenuItem>
                                            )
                                        }) : null}
                                    </Menu>
                                </Grid>
                            </>)
                            : null}

                        {showAsignado ?
                            (<CustomAvatar
                                alt={'avatar'}
                                src={img}
                                variant={'circle'}
                                className={classes.avatar}
                            />)
                            : null}
                    </Grid>
                </Grid>
            </Grid>
            {openSnackBar.open ? <CustomSnackBar handleClose={handleCloseSnack} open={openSnackBar.open} title={openSnackBar.title}
                severity={openSnackBar.severity} /> : null}
        </>
    )
}
export default CardOperador
