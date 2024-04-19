import React, { useState } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

import MenuDenuncia from '../MenuDenuncia';
import DetalleSolicitudGenerica from '../../SolicitudesGenericas/DetalleSolicitudGenerica/DetalleSolicitudGenerica';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}));


const VerSolicitudGenerica = (props) => {
    const { denuncia, idSolicitud, usuarioActivo, actualizarData } = props;
    const classes = useStyles();
    const [openMenuSiniestros, setOpenMenuSiniestros] = useState(true);

    return (
        <div className={classes.root}>
            {usuarioActivo && usuarioActivo.area ===
                "AUDITORIA MEDICA" ? (
                <DetalleSolicitudGenerica idSolicitud={idSolicitud} usuarioActivo={usuarioActivo} actualizarData={actualizarData} />
            ) : (
                <>
                    <MenuDenuncia
                        open={openMenuSiniestros}
                        setOpen={setOpenMenuSiniestros}
                        denuncia={denuncia} />
                    <DetalleSolicitudGenerica idSolicitud={idSolicitud} usuarioActivo={usuarioActivo} actualizarData={actualizarData} />
                </>
            )}
        </div>
    );
};

VerSolicitudGenerica.propTypes = {
    denuncia: PropTypes.any.isRequired,

};

export default VerSolicitudGenerica;