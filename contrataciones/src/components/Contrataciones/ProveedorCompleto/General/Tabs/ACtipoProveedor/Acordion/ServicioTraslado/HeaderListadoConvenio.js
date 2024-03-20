import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import CustomTypography from '../../../../../../../commons/Typography/CustomTypography'
import CustomButton from '../../../../../../../commons/Button/CustomButton'
import AdminSlide from '../../../../../../../commons/Slider/AdminSlide'
import Drawer2 from '../../../../../../../commons/CustomDrawer/Drawer'
import DrawerConvenio from './DrawerConvenio'
import CustomConfirmacion from '../../../../../../../commons/Dialogo/CustomConfirmacion';
import CustomAlert from '../../../../../../../commons/CustomAlert/customAlert';
import { useEffect } from 'react'

const HeaderListadoConvenio = (props) => {
    const { proveedorSeleccionado, textHeader, botones,
        marginLeft, setMensaje, selectedRow,
        tiposActuales, setTiposActuales,
        dataListadoConvenio, setDataListadoConvenio,
        conveniosEliminados, setConveniosEliminados,
        modoEdicion, setModoEdicion,
        openDrawer, setOpenDrawer,
        dataConvenio, setDataConvenio, actualizarData, setActualizarData,
        openConfirmacion, setOpenConfirmacion } = props
    const [guardarData, setGuardarData] = useState(false)
    const [openAlert, setOpenAlert] = useState(false);
    const [disableButton, setDisableButton] = useState(true);

    const agregarNuevoListadoConvenio = () => {
        setModoEdicion('agregar');
        setOpenDrawer({ ...openDrawer, 'right': true });
        setDataConvenio({
            ...dataConvenio,
            "tipoValor": 'Por KM fijo',
            "idTipoDeValor": 1,
            "eliminarRelacion": false
        })
    }
    const agregarLocalidad = () => {
        setMensaje(false)
    }
    const onClickImportar = () => {
        console.log('hizo click')
    }
    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    //Drawer Convenios (editar y agregar)
    const cancelarDrawer = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
        setModoEdicion(null);
        setDataConvenio(null)
    }
    const aceptarDrawer = (event) => {
        setGuardarData(true)
        //Seteo valorKM de dataConvenio:
        let valorKM = dataConvenio && dataConvenio.idTipoDeValor === 1 ? `$${dataConvenio.valorZonaKmConvenioTraslado.valorZona}` : 
        `$${dataConvenio.valorZonaKmConvenioTraslado.valorZona1}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona2}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona3}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona4}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona5}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona6}, $${dataConvenio.valorZonaKmConvenioTraslado.valorZona7}`; 
        setDataConvenio({
            ...dataConvenio,
            "valorKM": valorKM 
        })
    }
    const buttonsDrawer = () => {
        return (
            <>
                <Grid item>
                    <CustomButton
                        label={"Cancelar"}
                        variant={"contained"}
                        width={'102px'}
                        height={'40px'}
                        isAction={true}
                        styleLabel={{ fontSize: '14px', fontWeight: 'bold', color: '#747474' }}
                        styleButton={{ border: 'solid 2px #747474', backgroundColor: '#ffffff', marginRight: '15px' }}
                        onClik={cancelarDrawer}
                    />
                    <CustomButton
                        onClik={aceptarDrawer}
                        color={'primary'}
                        startIcon={false}
                        disabled={disableButton}
                        width={'105px'}
                        height={'40px'}
                        label={modoEdicion === 'editar' ? "Editar" : "Agregar"}
                        variant={"contained"}
                        isAction={true}
                    />
                </Grid>
            </>
        )
    }
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setModoEdicion(null);
        setOpenDrawer({ ...openDrawer, [anchor]: open });
        setDataConvenio(null)
    }
    const contenido = [
        {
            texto: <DrawerConvenio
                modoEdicion={modoEdicion}
                dataConvenio={dataConvenio} setDataConvenio={setDataConvenio}
                guardarData={guardarData} setGuardarData={setGuardarData}
                setOpenDrawer={setOpenDrawer}
                setOpenConfirmacion={setOpenConfirmacion}
                disableButton={disableButton} setDisableButton={setDisableButton}
                actualizarData={actualizarData} setActualizarData={setActualizarData}
            />
        }
    ]

    //Aceptar & Cancelar Confirmación (editar, agregar y eliminar)
    const cancelarConfirmacion = () => {
        if (modoEdicion === "eliminar") {
            setModoEdicion(null);
        }
        setOpenConfirmacion(false)
    }
    const aceptarConfirmacion = () => {
        setOpenConfirmacion(false)

        if (modoEdicion === 'agregar') {
            setDataListadoConvenio({
                    cantidad: 0,
                    data: [...dataListadoConvenio.data, dataConvenio]
            })            
        }

        if (modoEdicion === 'editar') {
            let newRequest = []
            for (let i = 0; i < dataListadoConvenio.data.length; i++) {
                let item = dataListadoConvenio.data[i];
                if((item.tableData && item.tableData.id !== selectedRow.tableData.id) || (item.idConvenioTraslado && item.idConvenioTraslado !== selectedRow.idConvenioTraslado)){
                    newRequest.push(item)
                } else {
                    newRequest.push(dataConvenio)
                }
            }
            setDataListadoConvenio({ cantidad: dataListadoConvenio.cantidad, data: newRequest })
        }

        if (modoEdicion === 'eliminar') {
            let newData = []
            for (let i = 0; i < dataListadoConvenio.data.length; i++) {
                let item = dataListadoConvenio.data[i];
                if(item && item.idConvenioTraslado){
                    if (item.idConvenioTraslado !== selectedRow.idConvenioTraslado){
                        newData.push(item)
                    } else {
                        setConveniosEliminados([
                            ...conveniosEliminados,
                            { ...item, "eliminarRelacion": true }
                        ])
                    }
                }else{
                    if(item.tableData && item.tableData.id !== selectedRow.tableData.id){
                        newData.push(item)
                    }
                }
            }
            setDataListadoConvenio({ cantidad: newData.length, data: newData })
        }

        setOpenDrawer(openDrawer => ({ ...openDrawer, 'right': false }));
        if (modoEdicion === 'agregar' || modoEdicion === 'editar' || modoEdicion === 'eliminar') {
            setOpenAlert(true)
        }
        setDataConvenio(null)
    }
    
    return (
        <Grid container justify="space-between" alignItems='center'>
            <Grid item container xs={12} justify="space-between" alignItems='center'>
                <Grid item >
                    <CustomTypography text={textHeader} variant="body1" />
                </Grid>
                {botones ? botones.map((it) => (
                    <Grid item>
                        <CustomButton
                            onClik={it.onClick === 'agregarNuevoListadoConvenio' ? agregarNuevoListadoConvenio : 
                                    it.onClick === 'onClickImportar' ? onClickImportar :
                                    it.onClick === 'agregarLocalidad' ? agregarLocalidad : null}
                            startIcon={it.startIcon}
                            width={it.width}
                            height={it.height}
                            label={it.label}
                            variant={it.variant}
                        />
                    </Grid>
                )) : null}
            </Grid>
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                width={'500px'}
                toggleDrawer={toggleDrawer}
                title={modoEdicion === 'editar' ? 'Editar contacto' : 'Agregar convenio de traslado'}
            >
                <AdminSlide
                    contenido={contenido}
                    labelButtonSiguiente={null}
                    variantButtonCancelar={'outlined'}
                    variantButtonSiguiente={'contained'}
                    activeStep={0}
                    setActiveStep={0}
                    maxSteps={0}
                    buttons={buttonsDrawer()}
                />
            </Drawer2>
            {openConfirmacion ?
                <CustomConfirmacion
                    openConfirmacion={openConfirmacion}
                    title={modoEdicion === 'agregar' ? 'Confirmar nuevo convenio' : modoEdicion === 'editar' ? 'Confirmar edición de convenio' : 'Confirmar eliminacion de convenio'}
                    text={modoEdicion === 'agregar' ? <div>¿Desea confirmar la creación del nuevo convenio?</div>
                        : modoEdicion === 'editar' ? <div>¿Desea confirmar la edicion del convenio?</div>
                            : <div>¿Desea eliminar el convenio?</div>
                    }
                    handleCancelar={cancelarConfirmacion}
                    handleConfirmar={aceptarConfirmacion}
                />
                : null}
            {modoEdicion == 'agregar' ?
                <CustomAlert
                    message={'Convenio AGREGADO.'}
                    onClose={handleCloseAlert}
                    variant={'filled'}
                    severity='success'
                    open={openAlert}
                    snack={true}
                />
                : modoEdicion == 'editar' ?
                    <CustomAlert
                        message={'Convenio Editado.'}
                        onClose={handleCloseAlert}
                        variant={'filled'}
                        severity='success'
                        open={openAlert}
                        snack={true}
                    />
                    :
                    <CustomAlert
                        message={'Convenio Suspendido.'}
                        onClose={handleCloseAlert}
                        variant={'filled'}
                        severity='success'
                        open={openAlert}
                        snack={true}
                    />
            }

        </Grid>
    )
}

export default HeaderListadoConvenio