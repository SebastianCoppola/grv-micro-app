import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import CustomTableBuscador from "./CustomTableBuscador";
import { makeStyles } from '@material-ui/styles';
import IconButtonMenu from "../../commons/Menu/IconButtonMenu";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Drawer2 from "../../commons/CustomDrawer/Drawer";
import AdminSlide from "../../commons/Slider/AdminSlide";
import DrawerVerMasInformacion from "../Drawer/DrawerVerMasInformacion";
import DrawerVerContactos from "../Drawer/DrawerVerContactos";
import { useSelector } from "react-redux";
import StarIcon from '@material-ui/icons/Star';
import Utils from "../../../Utils/utils";
import { GUION } from "../../../Utils/const";

const useStyles = makeStyles({
    iconBnt: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        //height: "40px",
        marginLeft: '2px'
    },
    espacio: {
        // padding: '5px 0px'
    }
});

const TablaBuscador = (props) => {
    const { page, setPage, rowsPerPage, setRowsPerPage, dataTabla, cantidadTotal, buscador, setBuscador, datos, opcionesPaginacion } = props
    const classes = useStyles(props);
    const [data, setData] = useState([])
    const options = ['Ver más información']
    const [verMas, setVerMas] = useState(null)
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedRow, setSelectedRow] = useState(null);
    const loading = useSelector(state => state.documentos.loadingBusquedaPrestadorBuscador)
    const [openDrawer, setOpenDrawer] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer({ ...openDrawer, [anchor]: open });
    }

    const onClickItem = (event, row, value) => {
        if (event.target.value === 0) {
            setVerMas(event.target.value)
            setOpenDrawer({ ...openDrawer, 'right': true });
            setSelectedRow(row)
        }

    }

    const headerTablaBuscador = [
        {
            title: "RAZÓN SOCIAL", field: "razonSocial",
            cellStyle: { color: '#505050', minWidth: '300px', fontSize: '12px' },
            headerStyle: { color: '#fff', backgroundColor: '#25afdb' },
            render: (row) => {
                return (
                    row.prioritario === 1 ?
                        <div>
                            <Grid container alignItems="center" spacing={2} style={{borderLeft: BorderColor(row), height: '100px'}}>
                                <Grid item >
                                    <StarIcon size='small' htmlColor="yellow" style={{ paddingRight: '5px' }} />
                                    {row.razonSocial}
                                </Grid>
                            </Grid>
                        </div>
                        : <div>
                            <Grid container alignItems="center" spacing={2} style={{height: '100px'}}>
                                <Grid item style={{ paddingLeft: '15px' }}> {row.razonSocial}</Grid>
                            </Grid></div>)
            }

        },
        {
            title: "DIRECCION", field: "domicilio",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#fff', backgroundColor: '#25afdb' },
        },
        {
            title: "TELEFONO", field: "telefono",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#fff', backgroundColor: '#25afdb' },
        },
        {
            title: "MAIL", field: "mail",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#fff', backgroundColor: '#25afdb' }
        },
        {
            title: "ACCIONES", field: "acciones",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#fff', backgroundColor: '#25afdb' },
            render: (row) => {
                return (
                    <div>
                        <IconButtonMenu
                            icon={<MoreVertOutlinedIcon style={{ color: '#747474' }} />}
                            className={classes.iconBnt}
                            size="small"
                            options={options}
                            onClickItem={(event) => onClickItem(event, row)} />
                    </div>)
            }
        },

    ]
    useEffect(() => {

        const dataRellenar = [];
        const dimension = page * rowsPerPage
        if (dataTabla && dataTabla.cantidadTotal && dataTabla.cantidadTotal !== 0) {
            for (let index = 0; index < dimension; index++) {
                dataRellenar.push({})
            }
        }
        let dataApi = dataTabla && dataTabla.objetos ? dataTabla.objetos.map(newData => {
            return ({
                estado: newData ? newData.estado : null,
                cuit: newData ? newData.cuit : null,
                domicilio: `${newData?.domicilio ?? GUION} [${newData?.localidad ?? GUION} - ${newData?.provincia ?? GUION}]`,
                localidad: newData ? newData.localidad : null,
                mail:  newData?.subprestador ? newData?.mail ?? null 
                    : 
                    newData?.proveedorContactoDTO && newData?.proveedorContactoDTO[0]?.mailContacto ? newData.proveedorContactoDTO[0].mailContacto : null,
                prestadorMedicoDTO: newData ? newData.prestadorMedicoDTO : null,
                prioritario: newData ? newData.prioritario : null,
                proveedorContactoDTO: newData ? newData.proveedorContactoDTO : null,
                provincia: newData ? newData.provincia : null,
                razonSocial: newData ? newData.razonSocial : null,
                subprestador: newData ? newData.subprestador : null,
                telefono: newData?.subprestador ? newData?.telefono ?? null 
                    : 
                    newData?.proveedorContactoDTO && newData?.proveedorContactoDTO[0]?.telefonoContacto ? newData.proveedorContactoDTO[0].telefonoContacto : null,
                datosSubprestador: newData ? newData.datosSubprestador : null,
            })
        }
        ) : []
        const dataRestante = [];
        const lengthData = dataRellenar.length + dataApi.length
        if (dataTabla && dataTabla.cantidadTotal && lengthData < dataTabla.cantidadTotal) {
            for (let index = lengthData; index < dataTabla.cantidadTotal; index++) {
                dataRestante.push({})
            }
        }
        setData([...dataRellenar, ...dataApi, ...dataRestante])

    }, [dataTabla, buscador])


    // useEffect(() => {
    //     const dataRellenar = [];
    //     const dimension = page * rowsPerPage
    //     if (dataTabla && dataTabla.cantidadTotal && dataTabla.cantidadTotal !== 0) {
    //         for (let index = 0; index < dimension; index++) {
    //             dataRellenar.push({})
    //         }
    //     }
    //     let dataApi = dataTabla && dataTabla.objetos ? dataTabla.objetos : []
    //     const dataRestante = [];

    //     const lengthData = dataRellenar.length + dataApi.length
    //     if (dataTabla && dataTabla.cantidadTotal && lengthData < dataTabla.cantidadTotal) {
    //         for (let index = lengthData; index < dataTabla.cantidadTotal; index++) {
    //             dataRestante.push({})
    //         }
    //     }
    //     setData([...dataRellenar, ...dataApi, ...dataRestante])
    //     setData(datos)
    // }, [dataTabla])

    const contenidoVerMasInformacion = [
        {
            texto: verMas === 0 ? <DrawerVerMasInformacion data={selectedRow} />
                : null
        }
    ]

    const maxSteps = contenidoVerMasInformacion.length

    const handleCerrar = () => {
        setOpenDrawer({ ...openDrawer, 'right': false });
    }

    const BorderColor = (data) => {
        let color = null
        //subprestador:
        if (data && data.subprestador) {
            color = '5px solid #3fb6dc'
        }
        //inactivo:
        else if (data && data.estado === 0 || (data && data.estado === null)) {
            color = '5px solid #e34850'
        }
        //activo:
        else if (data && data.estado === 1) {
            if(!data.prestadorMedicoDTO){
                color = '5px solid #33ab84'
            }else if(data.prestadorMedicoDTO.convenioActivo === 1){
                color = '5px solid #33ab84'
            }else{
                //activo sin convenio
                color = '5px solid #fdc800'
            }
        }
        return color
    }

    return (
        <>
            <Grid item container xs={12} >
                <CustomTableBuscador
                    loading={loading}
                    data={data}
                    setData={setData}
                    cantTotal={cantidadTotal}
                    columnas={headerTablaBuscador}
                    colorAvatar={false}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    buscadorPage={buscador}
                    setBuscadorPage={setBuscador}
                    datos={datos}
                    opcionesPaginacion={opcionesPaginacion}
                />
            </Grid>
            <Drawer2
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                anchor='right'
                toggleDrawer={toggleDrawer}
                title={verMas === 0 ? 'Más información' : verMas === 1 ? 'Contactos' : null}
                variant={'contained'}
                button={false}
                handleButton={null}
            >
                <AdminSlide
                    contenido={contenidoVerMasInformacion}
                    labelButtonSiguiente={'Cerrar'}
                    variantButtonSiguiente={'contained'}
                    handleNext={handleCerrar}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    maxSteps={maxSteps}
                />

            </Drawer2>
        </>
    )
}
export default TablaBuscador