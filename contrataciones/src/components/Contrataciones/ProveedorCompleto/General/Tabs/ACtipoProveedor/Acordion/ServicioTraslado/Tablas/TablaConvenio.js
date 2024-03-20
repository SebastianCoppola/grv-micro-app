import React from "react";
import { Grid } from '@material-ui/core'
import CustomTableContrataciones from "../../../../../../../../commons/Table/CustomTableContrataciones";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import IconButtonMenu from "../../../../../../../../commons/Menu/IconButtonMenu";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
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
}));

const TablaConvenio = (props) => {
    const { dataListadoConvenio, setDataListadoConvenio, setModoEdicion, openDrawer, setOpenDrawer,
        setSelectedRow, setDataConvenio, setOpenConfirmacion } = props
    const classes = useStyles(props);
    const options = ['Editar', 'Suspender']

    const onClickItem = (event, row, value) => {
        if (event.target.value === 0) {
            setDataConvenio(row)
            setModoEdicion('editar');
            setSelectedRow(row)
            setOpenDrawer({ ...openDrawer, 'right': true });
        }
        else if (event.target.value === 1) {
            setSelectedRow(row)
            setModoEdicion('eliminar');
            setOpenConfirmacion(true)
        }
    }


    const headerTablaListadoConvenio = [
        {
            title: "PROVINCIA", field: "provincia",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <Grid container alignItems={'center'} >
                    <Grid item >
                        {row.provincia}
                    </Grid>
                </Grid>
            )
        },
        {
            title: "TIPO VALOR", field: "tipoValor",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "VALOR KM", field: "valorKM",
            cellStyle: { color: '#505050', fontSize: '12px', minWidth: '200px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "KM EXDTE.", field: "valorKmExcedenteString",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' }
        },
        {
            title: "VIGENCIA DESDE Y HASTA", field: "vigenciaTabla",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '11px' }
        },
        {
            title: "ACCIONES", field: "acciones",
            cellStyle: { color: '#505050', fontSize: '12px' },
            headerStyle: { color: '#747474', fontSize: '12px' },
            render: row => (
                <Grid container >
                    <IconButtonMenu icon={<MoreVertOutlinedIcon style={{ color: '#747474' }} />}
                        className={classes.iconBnt}
                        size="small"
                        options={options}
                        onClickItem={(event) => onClickItem(event, row)} />
                </Grid>
            )
        },
    ]


    let prueba = dataListadoConvenio.data.map(i => {
        if ((i.vigenciaTabla === "null null")) {
            return { ...i, vigenciaTabla: " " }
        } else if (i.valorKM === "$null") {
            return { ...i, valorKM: " " }
        } else {
            return i
        }

    })

    return (
        <>
            <CustomTableContrataciones
                data={prueba.length > 0 ? prueba : []}
                cantTotal={dataListadoConvenio ? dataListadoConvenio.cantidad : null}
                colorAvatar={false}
                columnas={headerTablaListadoConvenio}
                page={0}
                setData={setDataListadoConvenio}
                styleAdd={true}
            />
        </>
    )
}

export default TablaConvenio