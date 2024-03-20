import React, { useState } from 'react'
//Components:
import Contenido from './Contenido'
import CustomButton from '../../../commons/Button/CustomButton';
import DrawersConvenio from '../Drawers/DrawersConvenio';
//Material:
import { Grid, Typography } from '@material-ui/core'
import RestoreIcon from '@material-ui/icons/Restore';
import Loader from '../../../commons/Loading/Loader';

//CustomConvenios HF: Puede utilizarse tanto en la pantalla de historicos convenios como convenios
//futuros, agregando la prop de titulo para diferenciar de que pantalla se trata.
/*
    Props: 
    - data: son los datos necesarios para crear las cards en cada una de las pantallas
    - titulo: titulo o pestaña (tab) principal de la pantalla
    - historicoConvenio: boolean, indica si se trata de la pantalla historico Convenios
    - handleClickCustomCard : para cambiar los datos de las tablas segun la version del convenio, tambien sirve para bordear la card a un tono azulado
    - convenioSeleccionado => devuelve el item o la card que el usuario fue clickeando.
    - botonRestaurar => booleano(true) indica para saber si ese convenio es inactivo por lo tanto aparece el boton de restaurar convenio
    - setOpenConfirmacion-> Abre el modal de confirmacion
    - handleClickEditar => Cuando el usuario clickea la parte del editar en convenios futuros, se muestra otra pantalla
    - handleClickEliminar=> Eliminar convenio futuros

    Tablas:
    - dataPrestacionesNomencladas
    - dataPrestacionesNoNomencladas
    - dataPrestacionesNBU
    - dataModulos
    - dataInclusiones
*/

const CustomConvenioHF = (props) => {
    const {
        titulo,
        historicoConvenio,
        data,
        setOpenConfirmacion,
        openAlert,
        handleCloseAlert,
        handleClickEditar,
        handleClickEliminar,
        convenioSeleccionado,
        setConvenioSeleccionado,
        setDataConvenio,
        request,
        setRequest,
        loadingComponente,
        setLoadingComponente,
        proveedor,
        usuario
    } = props

    //Drawers:
    const [drawerNro, setDrawerNro] = useState(null)
    const [editRow, setEditRow] = useState({})


    return (
        <Grid>
            <Grid container xs={12} alignItems='center' style={{ height: '60px' }}>
                <Grid item xs={2} container justify='center' alignItems='flex-end'
                    style={{ height: '100%', borderBottom: '1px solid #1473e6', padding: '0 0 10px 0' }}>
                    <Typography style={{ fontWeight: '200', color: '#1473e6', fontSize: '15px' }}><b>{titulo}</b></Typography>
                </Grid>
                <Grid item xs={10} container justify='flex-end' alignItems='flex-end'
                    style={{ height: '100%', borderBottom: '1px solid #efefef', padding: '0 0 10px 40px' }}>
                    {historicoConvenio && convenioSeleccionado && !convenioSeleccionado.esActivo ?
                        (
                            <CustomButton
                                label={"Restaurar revisión"}
                                onClik={() => setOpenConfirmacion(true)}
                                startIcon={<RestoreIcon />}
                                color='primary'
                                variant={"contained"}
                                styleButton={{ borderRadius: "15px" }}
                                styleLabel={{ color: "white", fontSize: "14px", alignItems: "left" }}
                            />
                        )
                        : null
                    }
                </Grid>
            </Grid>
            {loadingComponente ?
                <Grid container justify='center' alignItems='center' style={{ minHeight: '300px' }}>
                    <Loader loading={true} />
                </Grid>
                : (
                    <Contenido
                        data={data}
                        historicoConvenio={historicoConvenio}
                        convenioSeleccionado={convenioSeleccionado}
                        setConvenioSeleccionado={setConvenioSeleccionado}
                        openAlert={openAlert}
                        handleCloseAlert={handleCloseAlert}
                        setDrawerNro={setDrawerNro}
                        handleClickEditar={handleClickEditar}
                        setEditRow={setEditRow}
                        handleClickEliminar={handleClickEliminar}
                        setDataConvenio={setDataConvenio}
                        loadingComponente={loadingComponente}
                        setLoadingComponente={setLoadingComponente}
                        request={request} setRequest={setRequest}
                        proveedor={proveedor}
                        usuario={usuario}
                    />
                )}
            <DrawersConvenio
                drawerNro={drawerNro}
                setDrawerNro={setDrawerNro}
                editRow={editRow}
                editarConvenioFuturo={false}
                convenioSeleccionado={convenioSeleccionado}
            />
        </Grid>
    )
}

export default CustomConvenioHF
