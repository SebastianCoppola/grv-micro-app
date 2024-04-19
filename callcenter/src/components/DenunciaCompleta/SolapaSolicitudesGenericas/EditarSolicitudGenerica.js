import React, { useState } from 'react'
import Menu from '../MenuDenuncia';
import CalificarGestion from '../../SolicitudesGenericas/acciones/CalificarGestion';
import ReabrirSolicitudGenerica from '../../SolicitudesGenericas/acciones/ReabrirSolicitudGenerica';
import DetalleSolicitudGenerica from '../../SolicitudesGenericas/DetalleSolicitudGenerica/DetalleSolicitudGenerica';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}));

const EditarSolicitudGenerica = (props) => {
    const { denuncia, idSolicitud, usuarioActivo, actualizarData } = props;
    const classes = useStyles();
    const [openMenuSiniestros, setOpenMenuSiniestros] = useState(true);

    return (
        <div className={classes.root}>
            {usuarioActivo && usuarioActivo.area ===
                "AUDITORIA MEDICA" ? (
                <>
                    <DetalleSolicitudGenerica
                        idSolicitud={idSolicitud}
                        usuarioActivo={usuarioActivo}
                        actualizarData={actualizarData}
                        botonesAdicionales={[<ReabrirSolicitudGenerica />,
                        <CalificarGestion usuarioActivo={usuarioActivo} />]}
                        esModoEdicion={true} />
                </>
            ) : (
                <>
                    <Menu
                        open={openMenuSiniestros}
                        setOpen={setOpenMenuSiniestros}
                        denuncia={denuncia} />
                    <DetalleSolicitudGenerica
                        idSolicitud={idSolicitud}
                        usuarioActivo={usuarioActivo}
                        actualizarData={actualizarData}
                        botonesAdicionales={[<ReabrirSolicitudGenerica />,
                        <CalificarGestion usuarioActivo={usuarioActivo} />]}
                        esModoEdicion={true} />
                </>
            )}

        </div>
    )
}

export default EditarSolicitudGenerica
