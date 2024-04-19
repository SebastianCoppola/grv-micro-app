import React, { useEffect, useState } from 'react'
//Redux:
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../redux/actions/index'
//Mui:
import { CircularProgress, Divider, makeStyles, Typography, Grid } from '@material-ui/core'
//Components:
import CustomTable from './CustomTable'
import CustomCheck from '../../commons/CustomCheck/CustomChek'
import CustomSnackBar from '../../commons/SnackBar/CustomSnackBar'

const useStyle = makeStyles({
    box:{
        borderRadius:'15px',
        padding:'10px 15px 15px 15px',
        background: props => props.backgroundColor,
        boxShadow: '0 4px 8px 0 rgba(37, 38, 94, 0.1)',
        marginBottom:'15px'
    },
    scrollBox:{
        maxHeight:'240px',
        overflowY:'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            background: "#f1f1f1",
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        },
        padding:'0 15px'
    }
})

const PersonalAutorizado = (props) => {

    const {idEmpleadorSeleccionado, nombreEmpleadorSeleccionado,
        denuncianteAutorizado, setDenuncianteAutorizado, 
        pantallaEmpleadorVip,checkUrgencia, setCheckUrgencia, backgroundColor } = props

    const classes = useStyle(props)
    const dispatch = useDispatch()

    //VIP: 
    const [dataTabla, setDataTabla] = useState(null)
    const [selectedRow, setSelectedRow] = useState(undefined)
    const [firstRender, setFirstRender] = useState(true)
    //Redux:
    const dataDenuncia = useSelector(state => state.documentos.denuncia)
    const dataVIP = useSelector(state => state.listados.denuncianteVIP)
    const loadingDenuncianteVIP = useSelector(state => state.listados.loadingDenuncianteVIP)
    const loadingAddPersonalVIP = useSelector(state => state.listados.loadingAddPersonalVIP)
    //SnackBar:
    const [snackbar, setSnackbar] = useState({open:false})
    
    //Dispatch para buscar denunciantes:
    useEffect(() => {
        let idEmpleador = idEmpleadorSeleccionado && idEmpleadorSeleccionado[0].codigo
        dispatch(actions.searchDenuncianteVIP(idEmpleador, errorCalback))
    }, [])
    
    //Callback Search Denunciante VIP:
    const errorCalback = (bool) => {
        if(bool){
            setSnackbar({
                open: true, 
                vertical: 'top', 
                severity: 'error', 
                title: 'Ocurrió un error al buscar el personal autorizado.'
            })
        }
    }

    //Cargo dataTabla al actualizarse lista de denunciantes:
    useEffect(() => {
        if(denuncianteAutorizado){
            let idDenunciante = denuncianteAutorizado && denuncianteAutorizado.id
            if(dataVIP && dataVIP.filter(it => it.idDenuncianteAutorizado === denuncianteAutorizado.id).length){
                setDataTabla(dataVIP ? dataVIP.map(newData => {
                    return ({
                        apellido: newData && newData.apellido ? newData.apellido : '',
                        nombre: newData && newData.nombre ? newData.nombre : '',
                        puesto: newData && newData.puesto ? newData.puesto : '',
                        id: newData && newData.idDenuncianteAutorizado ? newData.idDenuncianteAutorizado : 0,
                        tableData: pantallaEmpleadorVip ? {checked: idDenunciante === (newData && newData.idDenuncianteAutorizado)} : null
                    })
                }) : [])
            }else{
                let newDataVIP = [denuncianteAutorizado, ...dataVIP]
                setDataTabla(newDataVIP.map(newData => {
                    return ({
                        apellido: newData && newData.apellido ? newData.apellido : '',
                        nombre: newData && newData.nombre ? newData.nombre : '',
                        puesto: newData && newData.puesto ? newData.puesto : '',
                        id: newData && newData.idDenuncianteAutorizado ? newData.idDenuncianteAutorizado : newData.id ? newData.id : 0,
                        tableData: pantallaEmpleadorVip ? 
                            {checked: idDenunciante === (newData && newData.idDenuncianteAutorizado) ? 
                                true : idDenunciante === (newData && newData.id) ?
                                true : false 
                            } : null
                    })
                }))
            }

        }else{
            setDataTabla(dataVIP ? dataVIP.map(newData => {
                return ({
                    apellido: newData && newData.apellido ? newData.apellido : '',
                    nombre: newData && newData.nombre ? newData.nombre : '',
                    puesto: newData && newData.puesto ? newData.puesto : '',
                    id: newData && newData.idDenuncianteAutorizado ? newData.idDenuncianteAutorizado : 0,
                })
            }) : [])
        }
    }, [dataVIP])
      
    //Seteo Denunciante Autorizado al seleccionar en la tabla.
    useEffect(() => {
        if(!firstRender){
            if(selectedRow && dataTabla){
                let row = dataTabla.filter(it => it.id === selectedRow)[0]
                setDenuncianteAutorizado(row)
                setCheckUrgencia(false)
            }else{
                setDenuncianteAutorizado(null)
            }
        }else{
            setFirstRender(false)
        }
    }, [selectedRow])

    //Handle check No Autorizado - Urgencia:
    const handleCheck = () => {
        setCheckUrgencia(!checkUrgencia)
    }

    //Muestra el nombre del emplador dentro de la tabla:
    const showNombreEmpleador = () => {
        let temp1 = nombreEmpleadorSeleccionado
        let temp2 = temp1 && temp1.split('-')
        let temp3 = temp2 && temp2.length > 1 ? temp2[1] : '-'
        return temp3
    }
    
    useEffect(() => {
        if (checkUrgencia){ 
            setDataTabla(oldData =>
                oldData.map(d => ({
                    ...d,
                    tableData: {
                        ...d.tableData,
                        checked: false
                    }
                }))
            )
        }
    }, [checkUrgencia]);

    return (
        <>
            <Grid className={classes.box}>
                <Grid xs={12} style={{padding:'7px 0'}}>
                    <CustomCheck 
                        checked={checkUrgencia}
                        handleChange={handleCheck}
                        texto='No Autorizado - Urgencia' 
                        textStyle={{fontSize:'14px', fontWeight:700 }}
                    />
                </Grid>
                
                <Divider />
                
                <Grid xs={12} style={{padding:'15px 0'}}>
                    <Typography style={{fontSize:'14px', fontWeight:700 }}>Personal Autorizado</Typography>
                </Grid>
                
                <Grid xs={12} style={{padding:'0 0 15px 0'}}>
                    <Typography style={{fontSize:'14px'}}>
                        Personas autorizadas en el ingreso de una nueva denuncia por parte 
                        de {showNombreEmpleador()}. <br/>
                        Por favor seleccionar, según la persona que realiza el llamado.
                    </Typography>
                </Grid>
                <Grid xs={12} className={classes.scrollBox}>
                    {loadingDenuncianteVIP || loadingAddPersonalVIP ? 
                        <Grid container justify='center'>
                            <CircularProgress />
                        </Grid>
                    :
                        <CustomTable
                            data={dataTabla && dataTabla.length ? dataTabla : []} 
                            setData={setDataTabla}
                            selectedRow={selectedRow} 
                            setRow={setSelectedRow}
                            dataDenuncia={dataDenuncia ? dataDenuncia 
                                : {"empleadorRazonSocial": idEmpleadorSeleccionado && idEmpleadorSeleccionado[0].razonSocial}
                            }
                            backgroundColor={backgroundColor}
                        />
                    }
                </Grid>
            </Grid>

            <CustomSnackBar
                open={snackbar.open}
                severity={snackbar.severity}
                vertical={snackbar.vertical}
                title={snackbar.title}
                handleClose={()=>setSnackbar({open:false})}
            />
        </>
    )
}

export default PersonalAutorizado
