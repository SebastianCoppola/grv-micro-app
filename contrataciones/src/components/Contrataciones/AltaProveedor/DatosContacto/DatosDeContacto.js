import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//material-ui
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
//estilo
import { makeStyles } from '@material-ui/styles';
import CustomTypography from '../../../commons/Typography/CustomTypography';
import CustomSelect from '../../../commons/Select/customSelect'
import CustomText from '../../../commons/TextField/CustomText';
import CustomChip from '../../../commons/Chip/CustomChip';
import Utils from '../../../../Utils/utils';
import * as actions from '../../../../redux/actions/index'

const useStyles = makeStyles({
    contenedor: {
        backgroundColor: 'white',
        border: 'solid 1px #dadce0',
        borderRadius: '8px',
    },
    form: {
        marginTop: '10vh',
        marginBottom: '10vh'

    },
    seleccionar: {
        paddingLeft: '0px'
    },
    hora: {
        marginTop: '9px'
    },
    texto2: {
        // paddingRight:'10px',
        paddingLeft: '5px'
    }
})

const DatosDeContacto = (props) => {
    const { data, setData, borrar, setBorrar } = props
    const classes = useStyles(props);
    const [tipoContacto, setTipoContacto] = useState(2)
    const [nombre, setNombre] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [mail, setMail] = useState(null)
    const [errorEmail, setErrorEmail] = useState(false)
    const [visibilidad, setVisibilidad] = useState(Visibilidad)
    const tiposContactos = useSelector(state => state.listados.tiposContactos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.serchTiposContactos())
    }, [])

    useEffect(() => {
        if(!data || data === null) {
            setTipoContacto(2)
            setNombre(null)
            setTelefono(null)
            setMail(null)
            setErrorEmail(false)
            setVisibilidad(Visibilidad)
        }
    }, [data])
    
    useEffect(()=>{
        if(borrar){
            setData({
                ...data,
                idTipoContacto: tipoContacto
            })
            setTipoContacto(2)
            setNombre('')
            setTelefono('')
            setMail('')
            setErrorEmail(false)
            setVisibilidad(Visibilidad)
            setBorrar(false)
        }
    },[borrar])
    
    const onChangeNombre = (event) => {
        setNombre(event.target.value)
        if (setData) {
            setData({
                ...data,
                nombreContacto: event.target.value !=='' ? event.target.value : null
            })
        }
    }
    const onChangeTelefono = (event) => {
        setTelefono(event.target.value)
        if (setData) {
            setData({
                ...data,
                telefono: event.target.value !=='' ? event.target.value : null
            })
        }
    }
    const onChangeMail = (event) => {
        let reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        if (reg.test(event.target.value) && regOficial.test(event.target.value)) {
            setErrorEmail(false)
        } else if (reg.test(event.target.value)) {
            setErrorEmail(false)

        } else {
            setErrorEmail(true)
        }
        setMail(event.target.value)
        if (setData) {
            setData({
                ...data,
                email: event.target.value !=='' ? event.target.value : null
            })
        }
    }
    const onClickVisibilidad = (event, codigo) => {
        setData({
            ...data,
            idTipoVisibilidad: codigo
        })
        setVisibilidad(Visibilidad.map((i, index2) => {
            if (i && (codigo === i.codigo)) {
                return (
                    { ...i, verificado: true }
                )
            } else {
                return { ...i, verificado: false }
            }
        })
        )
    }

    return (
        <Container maxWidth='lg' className={classes.form} >
            <Grid container xs={12} alignItems='flex-end' justify='center' >
                <Grid item container xs={9}  className={classes.contenedor} spacing={4}>
                    <Grid item container spacing={2} alignItems={'flex-end'} >
                        <Grid item xs={11}>
                            <CustomTypography text={<strong> Agregar datos de contacto Administrativo </strong>} variant={''} />
                        </Grid>
                        <Grid item xs={11}>
                            <Divider />
                        </Grid>
                        <Grid item xs={5}>
                            <CustomText
                                label={'Nombre  *'}
                                value={nombre === null ? '' : nombre}
                                onChange={onChangeNombre}
                                id='nombre'
                                fontSize={'12px'}
                                shrink={true}
                                width={'100%'} />
                        </Grid>
                        <Grid item xs={5}>
                            <CustomText
                                label={'Teléfono *'}
                                value={telefono === null ? '' : telefono}
                                onChange={onChangeTelefono}
                                id='telefono'
                                fontSize={'12px'}
                                shrink={true}
                                inputComponente={true}
                                width={'100%'} />
                        </Grid>
                        <Grid item xs={5} style={errorEmail  ? {marginBottom:'-19px'} : null}>
                            <CustomText
                                type={'email'}
                                label={'Mail *'}
                                value={mail === null ? '' : mail}
                                onChange={onChangeMail}
                                id='telefono'
                                fontSize={'12px'}
                                shrink={true}
                                width={'100%'}
                                helperText={errorEmail ? <div style={{ color: '#ff7052' }}>Complete segun formato: abc@abc.com/ abc@abc.com.ar</div> : ''} />
                        </Grid>
                   
                    <Grid item xs={12}>
                    <CustomTypography
                        text={'Visibilidad *'}
                        variant={'body2'}/>
                    </Grid>
                        {visibilidad && visibilidad.map((it) => {
                            return (
                                <Grid item xs={2}>
                                    <CustomChip
                                        fontSize={true}
                                        label={Utils.capitalize(it.descripcion)}
                                        variant={'outlined'}
                                        onClick={(event,) => onClickVisibilidad(event, it.codigo)}
                                        style={it && it.verificado ? { border: '2px solid blue' } : null}
                                    />
                                </Grid>
                            )
                        })}

                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
export default DatosDeContacto

const Visibilidad = [
    { descripcion: 'Pública', codigo: 1, verificado: false },
    { descripcion: 'Privada', codigo: 2, verificado: false }
]