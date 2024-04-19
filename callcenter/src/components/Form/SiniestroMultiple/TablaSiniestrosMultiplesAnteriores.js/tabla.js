import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import TablaSiniestrosMultiples from './tablaSiniestrosMultipes'

const Tabla = (props) => {
    const [data, setData] = React.useState(null)
    const [selectedRow, setRow] = React.useState(undefined);
    const {dataSeleccionada, setDataSeleccionada} = props;
    const dataTabla = useSelector(state=> state.listados.listadoSiniestroMultiples)
    const loadingSiniestrosMultiplesTable = useSelector( state => state.listados.loadingSiniestrosMultiplesTable)
 
    const separacion = (data) => {
        let separ=[]
            if(data.nroDenuncia  && data.nroDenuncia.length>0 ){
                separ=   data.nroDenuncia.reduce((prev, current) =>`${prev} , ${current}`)
                
                }
            return separ
    }
    const onClickCheck = () => {
        
    }

    const columnas = [
        {
            title: "TÍTULO DE LA CAUSA", field: "titulo",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' }
        },
        {
            title: "DESCRIPCIÓN", field: "descripcion",
            cellStyle: { fontSize: '12px' }, headerStyle: { fontSize: '12px' },
        },
        {
            title: "SINIESTROS", field: "nroDenuncia",
            cellStyle:(row) => row.length === 0 ? {fontSize: '12px', color:'red'} : { fontSize: '12px' }, 
            headerStyle: { fontSize: '12px' },
            render: (row, index) => separacion(row).length ===0 ? 'Ninguna' : separacion(row)
        }, 
    ]

    useEffect(()=>{
        setData(dataTabla)
    },[dataTabla]) 
    
    return(
        <div>
            <TablaSiniestrosMultiples
                loading = {loadingSiniestrosMultiplesTable}
                data = {data}
                setData = {setData}
                onClickCheck = {onClickCheck}
                setDataSeleccionada = {setDataSeleccionada}
                selectedRow = {selectedRow}
                setRow = {setRow}
                columnas = {columnas}
            />
        </div>
    )
}
export default Tabla