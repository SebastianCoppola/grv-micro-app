import React, { useState } from 'react'
import PropTypes from 'prop-types'
//Utils:
import Utils from '../../Utils/utils'
//Redux:
import { useSelector } from 'react-redux'
//Mui:
import { Grid, Button, Avatar, makeStyles } from '@material-ui/core'
import { SmsOutlined, SmsFailedOutlined, NotificationsActiveOutlined, NotificationsNoneOutlined } from '@material-ui/icons'
//Componentes:
import CustomTable from '../commons/Table/CustomTable'
import EstadoTabla from './activo'
import Drawer2 from '../commons/CustomDrawer/Drawer'
import Resumen from './ComponentDrawer/resumen'
import AdminSlide from '../commons/Slider/AdminSlide'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '2px'
    },
    iconBntVerificado: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        width: "40px",
        height: "40px",
        marginLeft: '4px',
        backgroundColor: '#e9f9f0',
        border: '1px solid #2dc76d'
    },
    iconCommentFailed: {
        backgroundColor: 'rgba(255, 112, 82, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px'
    },
    iconComment: {
        backgroundColor: 'rgba(47, 97, 213, 0.1)',
        padding: '8px 8px 4px 8px',
        borderRadius: '5px'
    },
    fabActiva: {
        boxShadow: 'none',
        backgroundColor: '#fff5e0',
        border: '1px solid #ffcd71'
    },
    fabNoActiva: {
        boxShadow: 'none',
        backgroundColor: '#ffcd71',
    },
    button: {
        '&.MuiButton-textPrimary:hover': {
            backgroundColor: 'transparent'
        }
    },
}))

const TablaConsultasyReclamos = (props) => {
    
    const classes = useStyles(props)

    const { esOperador, data, setData, cantidadTotal,
        page, rowsPerPage, setPage, setRowsPerPage, denuncia, usuarioActivo
    } = props

    const [selectedRow, setSelectedRow] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [openDrawer, setOpenDrawer] = useState({ top: false, left: false, bottom: false, right: false })
    const loading = useSelector(state => state.consultasReclamos.loading)
    const opcionesPaginacion = Utils.setRowsOptionTables(usuarioActivo)

    const handleContacto = (event, row) => {
        setSelectedRow(row)
        setOpenDrawer({ ...openDrawer, 'right': true });
    }

    const headerOperador = [
        {
            title: "# CONTACTO", field: "contacto",
            headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            cellStyle: (data, rowData) => (
                esOperador ?
                    { color: '#1473e6', textDecoration: 'underline', fontSize: '12px', minWidth: '150px' }
                    : { fontSize: '12px', minWidth: '150px' }
            ),
            render: row =>
                <div row={selectedRow}>
                    <Grid container alignItems='center'>
                        <Grid item className={row.tipo === 'Reclamo' ? classes.iconCommentFailed : classes.iconComment}>
                            {row.tipo === 'Reclamo' ? <SmsFailedOutlined htmlColor={'#ff7052'} /> : <SmsOutlined htmlColor={'#2f61d5'} />}
                        </Grid>
                        <Grid item>
                            <Button
                                color="primary"
                                className={classes.button}
                                onClick={(event) => handleContacto(event, row)}>
                                {row.idContactoCallCenter}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
        },
        {
            title: "DENUNCIA", field: "denuncia",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row ? Utils.nroAsignadoProvisorio2(row) : '')
        },
        {
            title: "DNI", field: "nroDocAccidentado",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "TELÉFONO", field: "telefono",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
        },
        {
            title: "FECHA CARGA", field: "fechaCarga",
            cellStyle: { fontSize: '12px', minWidth: '150px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row && row.fechaCarga ? Utils.dateFormat5(row.fechaCarga) : '-')
        },
        {
            title: "FECHA RESPUESTA", field: "fechaCierre",
            cellStyle: { fontSize: '12px', minWidth: '150px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row && row.fechaCierre ? Utils.dateFormat5(row.fechaCierre) : '-')
        },
        {
            title: "OPERADOR", field: "operador",
            cellStyle: { fontSize: '12px', padding: '10px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row && row.operador ? row.operador : '')
        },
        {
            title: "TRAMITADOR", field: "tramitador",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => (row && row.tramitador ? row.tramitador : '')
        },
        {
            title: "ESTADO", field: "estado",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => <EstadoTabla estado={row.estado} demora={row.demora} />
        },
        {
            title: "RECORDATORIO", field: "acciones",
            cellStyle: { boxSizing: 'inherit', fontSize: '12px', minWidth: '150px' }, headerStyle: { fontSize: '11px', color: '#747474', fontWeight: 700, paddingRight: 8 },
            render: row => <div row={selectedRow} >
                {row.estado !== 'Cerrado' ?
                    row.estado === 'Activo' ?
                        <Grid container alignItems='center'>
                            <Grid item >
                                <Avatar size={'small'} className={classes.fabNoActiva}>
                                    <NotificationsActiveOutlined htmlColor='#ffffff' />
                                </Avatar>
                            </Grid>
                            <Grid item style={{ wordBreak: 'break-word', padding: '0px 7px' }}>
                                <span>Alerta activa</span>
                            </Grid>
                        </Grid>
                        :
                        <Grid container alignItems='center' direcion='column'>
                            <Grid item >
                                <Avatar size={'small'} className={classes.fabActiva}>
                                    <NotificationsNoneOutlined
                                        htmlColor='#ffcd71' style={{ color: '#ffcd71' }} />
                                </Avatar>
                            </Grid>
                            <Grid item xs style={{ wordBreak: 'break-word', padding: '0px 7px' }}>
                                {row && row.fechaVencimiento ?
                                    Utils.dateFormat5(row.fechaVencimiento)
                                    : '-'}
                            </Grid>
                        </Grid>
                    : null
                }
            </div>
        }
    ]

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    }

    const handleButton = (event) => {
        setOpenDrawer({ ...openDrawer, 'right': false });
    }

    const contenido = [
        { texto: <Resumen datos={selectedRow} denuncia={denuncia} handleButton={handleButton} /> },
    ]

    const onClickCancelar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false })
    }

    const maxSteps = contenido.length

    return (
        <div>
            <Grid container justify='center' alignItems='center' spacing={2} >
                <Grid item xs={12}>
                    <CustomTable
                        data={data}
                        setData={setData}
                        columnas={headerOperador}
                        refConsultaReclamo={true}
                        menuGeneral={false}
                        textoAvatar1={'Consultas'}
                        textoAvatar2={'Reclamos'}
                        cantTotal={cantidadTotal}
                        setPage={setPage}
                        setRowsPerPage={setRowsPerPage}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        loading={loading}
                        opcionesPaginacion={opcionesPaginacion}
                    />
                </Grid>
            </Grid>

            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                label={'Cerrar'}
                variant={'contained'}
                button={false}
                handleButton={handleButton}
                title={` ${selectedRow && selectedRow.tipo ? selectedRow.tipo : ''} ${selectedRow && selectedRow.contacto ? selectedRow.contacto : ''} `}
                height={'80%'}
            >
                <AdminSlide
                    contenido={contenido}
                    labelButtonSiguiente={'Cerrar'}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    handleNext={onClickCancelar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                />
            </Drawer2>
        </div>

    )
}

TablaConsultasyReclamos.propTypes = {
    open2: PropTypes.any,
    esOperador: PropTypes.any,
    data: PropTypes.any,
    setData: PropTypes.any,

};
export default TablaConsultasyReclamos