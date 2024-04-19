import React, { useState } from 'react'
//Mui:
import { Grid, makeStyles, Typography } from '@material-ui/core'
//Components:
import TablaAuditoriaMedica from '../../../../AuditoriasMedicas/commons/TablaAuditoriaMedica';
import PedidoCitacion from '../../Drawers/PedidoCitacion/PedidoCitacion';

const useStyles = makeStyles({
    icons: {
        filter: 'invert(37%) sepia(0%) saturate(5046%) hue-rotate(60deg) brightness(82%) contrast(97%)'
    },
    chipEstadoAnulado: {
		display:'inline',
        padding: '5px 8px',
        fontSize: '12px',
        border: 'solid 1px',      
        borderRadius: '5px',
		backgroundColor: "#e9f3fd",
        color: "#5151d3",
        borderColor: "#5151d3",
    },
    chipEstadoDefault: {
		display:'inline',
        padding: '5px 8px',
        fontSize: '12px',
        border: 'solid 1px',
        borderRadius: '5px',
		backgroundColor: "#e9e7e7",
        color: "#00000",
        borderColor: "#00000",
    },
})

const CitacionesAuditoria = props => {

    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    
    const dataCitacionesPendientes = {
		objetos: [
			{fechaCarga:'24/08/23', rCarga:'Marcos Toledo', fechaProceso:'24/08/23', rProceso:'Gabriela Loretto', observacion:'Prueba observacion para usabilidad del sistema', auditor:'Carmen Sosa', turno:'245379', fechaTurno:'29/08/23', idEstado:1, estadoDescripcion:'Anulado'}
		],
		cantidadTotal: 1
    }

    const loadingCitacion = false
    
    //Devuelve la clase para el chip del estado según el estado de la Citacion. 
    const classNamePicker = (idEstado) => {
        return classes.chipEstadoAnulado
		// switch (estado) {
        //     case "Anulado": return classes.chipEstadoAnulado
        //     default: return classes.chipEstadoDefault
        // }
    }
    
    const columnasTabla = [
		{
			title: "FECHA CARGA", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.fechaCarga ? row.fechaCarga : "-"),
		},
      	{
			title: "R. CARGA", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.rCarga ? row.rCarga : "-"),
      	},
		{
			title: "FECHA PROCESO", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.fechaProceso ? row.fechaProceso : "-"),
		},
		{
			title: "R. PROCESO", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.rProceso ? row.rProceso : "-"),
		},
		{
			title: "OBSERVACIONES", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.observacion ? row.observacion : "-"),
		},
		{
			title: "AUDITOR", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.auditor ? row.auditor : "-"),
		},
		{
			title: "TURNO", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.turno ? row.turno : "-"),
		},
		{
			title: "FECHA TURNO", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (row && row.fechaTurno ? row.fechaTurno : "-"),
		},
		{
			title: "ESTADO", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => (
				<div>
					<Typography className={classNamePicker(row.idEstado)}>
						{row.estadoDescripcion}
					</Typography>
				</div>
			),
		},
		{
			title: "ACCIONES", sorting: false,
			headerStyle: {fontSize:'12px', color:'#747474', fontWeight:'700', padding:'0px 5px'},
			cellStyle: {fontSize:'12px', padding:'5px 5px'},
			render: (row) => <span style={{display:'flex'}}></span>,
		},
	]




    return (
        <Grid container xs={12} justify='center' alignItems='center'  style={{ minHeight: '200px' }}>
            <PedidoCitacion/>
            <Grid item xs={12} style = {{ marginTop : '20px' }}>
                <TablaAuditoriaMedica
                    data={dataCitacionesPendientes && dataCitacionesPendientes.objetos && dataCitacionesPendientes.objetos.length ? dataCitacionesPendientes.objetos : []}
                    cantTotal={dataCitacionesPendientes && dataCitacionesPendientes.cantidadTotal}
                    columnas={columnasTabla}
                    page={page} setPage={setPage}
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}
                    loading={ loadingCitacion}
                />
            </Grid>
        </Grid>
    )
}

export default CitacionesAuditoria