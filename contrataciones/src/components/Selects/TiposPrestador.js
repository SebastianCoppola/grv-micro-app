import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
import CustomSelect from '../commons/Select/customSelect'
import {SELECT_PRESTADOR_TODOS, TIPO_PRESTADOR_TODOS } from '../../Utils/const';

const TipoPrestador = props => {

    const { valTipoPrestador, setValTipoPrestador, setDatos, datos, setMostrarFiltroAvanzado} = props;
    const data = useSelector(state => state.listados.tipoPrestadorSelect)
    const dispatch = useDispatch()
    const [datosSelect,setDatosSelect]=useState([])


    useEffect(() => {
        dispatch(actions.getListadoTipoPrestadorSelect())
    }, [])

    useEffect(()=> data && data.length >0 ? setDatosSelect([{codigo:0,descripcion:"TODOS",seleccionado:false},...data]) : setDatosSelect([]),[data])

    const handleChangeSelectTipoPrestador = (event) => {
        setValTipoPrestador(event.target.value)
        let nuevoDato = datos
        nuevoDato.tipoProveedor = event.target.value === '' ? TIPO_PRESTADOR_TODOS : event.target.value  
        if (event.target.value !== 5 || nuevoDato.tipoProveedor === 0) {
            nuevoDato.ContratoActivo = null
            nuevoDato.primeraAsistencia = null 
            nuevoDato.redCS = null
            nuevoDato.redProvart= null
            nuevoDato.servicio24h= null
            nuevoDato.tieneRmn= null
            nuevoDato.tieneTac= null 
            nuevoDato.tipoPrestadorMedico= null
            setMostrarFiltroAvanzado(false)
        }
        setDatos({...nuevoDato})
    }

    return (
        <CustomSelect
            titulo = {'Tipo'}
            data = { datosSelect && datosSelect.length>0 && datosSelect}
            fullwidth = {true}
            seleccione = {true}
            handleChangeSelect = {(event) => handleChangeSelectTipoPrestador(event)}
            val = {valTipoPrestador}
            isOutline={true}
        />
    );
};

export default TipoPrestador;
