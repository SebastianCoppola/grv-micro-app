import React, { useEffect, useState } from 'react'
//Mui:
import { useAutocomplete } from '@material-ui/lab'
import { Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../redux/actions'

const useStyles = makeStyles({
    /* INPUT */
    inputContainer: {
        width:'500px', 
        borderBottom: '1px solid #949494',
        padding:'3px 0px',
        marginBottom:'1px',
        display:'flex',
        gap:'10px',
        flexWrap:'wrap',
        boxSizing:'border-box',
        '&:hover':{
            borderBottom:'2px solid black',
            marginBottom:'0px',
        }
    },
    inputContainerFocused: {
        width:'500px', 
        borderBottom: '2px solid #1473e6',
        padding:'3px 0px',
        display:'flex',
        gap:'10px',
        flexWrap:'wrap',
    },
    /* TAG */
    tagContainer: {
        display:'flex', 
        alignItems:'center', 
        justifyContent:'space-between',
        flexWrap:'no-wrap',
        border:'1px solid #505050',
        borderRadius:'7px',
        padding:'5px 7px', 
    },
    tagLabel: {
        color:'#505050',
        fontSize:'13px'
    },
    tagIcon: {
        color:'#505050',
        fontSize:'15px',
        marginLeft:'5px',
        cursor:'pointer',
    },
    /* OPTIONS */
    optionsUL: {
        backgroundColor:'#ffff',
        zIndex:5,
        border:'1px solid #949494',
        borderRadius:'2px',
        width:'300px',
        padding:'10px 15px',
        margin:0,
        display:'flex',
        flexDirection:'column',
        gap:'5px',
        position:'absolute',
    },
    optionsLI: {
        backgroundColor:'#ffff',
        listStyle:'none',
        fontSize:'14px',
        color:'#505050',
        margin:0,
        padding:0,
        cursor:'pointer'
    }
})

const RegionPatologica = ({request, setRequest}) => {
        
    const classes = useStyles()
    const dispatch = useDispatch()
    //Redux:
    const dataListadoRegionPatologica = useSelector(state=>state.listados.dataListadoRegionPatologica)
    const loadingListadoRegionPatologica = useSelector(state=>state.listados.loadingListadoRegionPatologica)
    //State:
    const [inputFocus, setInputFocus] = useState(false)
    const [firstRender, setFirstRender] = useState(true)

    //Rescupera el listado de regiones patológicas: 
    const getDataListadoRegionPatologica = () => {
        let errorCallBack = (bool) => {
            if(bool){
                dispatch(actions.setSnackBarAuditoria({
                    open:true,
                    message:'Ocurrió un error al intentar cargar el listado de Regiones Patológicas.',
                    severity:'error',
                    vertical:'top',
                }))
            }
        }
        dispatch(actions.getDataListadoRegionPatologica(errorCallBack))
    }

    //Retorna un defaultValue en caso que ya existan regiones patológicas:
    const setDefaultValue = () => {
        if(dataListadoRegionPatologica && dataListadoRegionPatologica.length){
            if(request && request.idRegionPatologia && request.idRegionPatologia.length){
                let newValues = request.idRegionPatologia.map(id => {
                    let tempValue = dataListadoRegionPatologica.filter(option => option.codigo === id)[0]
                    return tempValue
                })
                return newValues
            }
        }
    }

    //Retorna las opciones dejando afuera las que ya se encuentran seleccionadas:
    const setOptions = () => {
        if(dataListadoRegionPatologica && dataListadoRegionPatologica.length){
            let newOptions = []
            dataListadoRegionPatologica.forEach( option => {
                if(request && request.idRegionPatologia.filter(id => id === option.codigo).length === 0){
                    newOptions.push(option)
                }
            })
            return newOptions
        }else{
            return []
        }    
    }

    //Hook Autocomplete:
    const { getInputProps, getTagProps, getListboxProps, getOptionProps, groupedOptions, value } = 
        useAutocomplete({
            id: 'customized-hook-demo',
            defaultValue: setDefaultValue(),
            multiple: true,
            options: setOptions(),
            getOptionLabel: (option) => option.descripcion,
        })

    useEffect(()=>{
        getDataListadoRegionPatologica()
        setFirstRender(false)
    },[])

    useEffect(()=>{
        if(!firstRender){
            let idRegionPatologia = value.map(it => { return it.codigo })
            setRequest({...request, idRegionPatologia: idRegionPatologia})
        }
    },[value])
    
    const Tag = ({label, onDelete}) => (
        <div className={classes.tagContainer}>
            <Typography noWrap className={classes.tagLabel}>{label}</Typography>
            <CloseIcon className={classes.tagIcon} onClick={onDelete} />
        </div>
    )
   
    return (
        <Grid item xs={12} style={{marginTop:10}}>
            <Typography style={{fontSize:14, color:'#747474'}}>Región Patológica: * </Typography>
            <Grid className={inputFocus ? classes.inputContainerFocused : classes.inputContainer}>
                {value && value.length === 0 ?
                    <>
                        <TextField
                            placeholder='Completar'
                            style={{width:'80%'}}
                            InputProps={{
                                disableUnderline: true,
                                style:{fontSize: 14},
                                onFocus: () => setInputFocus(true),
                                onBlur: () => setInputFocus(false),
                            }}
                            {...getInputProps()}
                            disabled={loadingListadoRegionPatologica}
                        />
                    </>
                :
                    <>
                        {value.map((option, index) => (
                            <Tag key={option.codigo} label={option.descripcion} {...getTagProps({ index })}/>
                        ))}
                        <TextField
                            style={{width:'80%'}}
                            InputProps={{
                                disableUnderline: true,
                                style:{fontSize: 14},
                                onFocus: () => setInputFocus(true),
                                onBlur: () => setInputFocus(false)
                            }}
                            {...getInputProps()}
                            disabled={loadingListadoRegionPatologica}
                        />
                    </>
                }
            </Grid>
            {inputFocus && groupedOptions.length > 0 ?
                <ul {...getListboxProps()} className={classes.optionsUL}>
                    {groupedOptions.map((option, index) => (
                        <li {...getOptionProps({ option, index })} className={classes.optionsLI}>
                            {option.descripcion}
                        </li>
                    ))}
                </ul>
            : null}
        </Grid>
    )
}

export default RegionPatologica