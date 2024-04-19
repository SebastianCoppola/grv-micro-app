import React, { useEffect, useState } from 'react'
//Material:
import { Grid } from '@material-ui/core'
//Components:
import ContenedorMenuProveedores from '../ContenedorMenuProveedores'
import InformacionProveedor from './Tabs/InformacionProveedor/InformacionProveedor'
import SubPrestadores from './Tabs/SubPrestadores/SubPrestadores'
import CustomTab from '../../../commons/Tab/tab'
import ListadoContactos from './Tabs/ListadoContactos/ListadoContactos'


const General = ({ proveedor, usuarioActivo })=> {


    const [data, setData] = useState(proveedor ? proveedor : null)
    const [prueba, setPrueba] = useState(false)
    
    const idProveedor = data && data.idProveedor

    const tabs = [
        {
            label: 'Información del proveedor',
            component: <InformacionProveedor usuarioActivo={usuarioActivo} proveedor={proveedor} data={data} setData={setData} />,
            view: true,
        },
        {
            label: 'Listado de contactos',
            component: <ListadoContactos idProveedor={idProveedor} usuarioActivo={usuarioActivo} />,
            view: true
        },
        {
            label: 'Sub-prestadores',
            component: <SubPrestadores data={data} idProveedor={idProveedor} />,
            view: prueba
        },
    ]

    useEffect(() => {
        if (data && data.idTiposProveedor) {
            data.idTiposProveedor.forEach(item => {
                if (item === 11) {
                    setPrueba(true)
                } else {
                    setPrueba(false)
                }
            })
        }
    }, [data])

    return (
        <ContenedorMenuProveedores>
            <Grid container justifyContent='center' alignItems='center' spacing={2} >
                <Grid item xs={12}>
                    <CustomTab data={tabs} justificado={true} />
                </Grid>
            </Grid>
        </ContenedorMenuProveedores>
    )
}

export default General
