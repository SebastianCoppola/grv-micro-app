import React, { useState } from 'react'
//Material:
import { Grid, makeStyles } from '@material-ui/core';
//Components:
import CustomCheck from '../../commons/CustomCheck/CustomChek';
import CustomText from '../../commons/TextField/CustomText';
import CustomTypography from '../../commons/Typography/CustomTypography';
import InclusionesModulo from './InclusionesModulo';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    container: {
        border: '1px solid #dadce0',
        padding: '10px',
    },
    cabecera: {
        padding: '20px 20px',
        borderLeft: '3px solid #f7c281',
        backgroundColor: '#f5f5f5',
        margin: '20px 10px 10px 10px',
    },
    cabeceraTitulo: {
        fontWeight: '700',
        fontSize: '13px',
        margin: '0 0 10px 0',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
    cabeceraText: {
        fontSize: '14px',
        margin: '0 0 0 10',
        lineHeight: 1.32,
        color: '#4b4b4b',
    },
}))

const text1 = `Importante:`
const text2 = `El código se encuentra inhabilitado para editar debido a que este módulo se encuentra en 3 convenios actualmente.`

const DrawerModulo = (props) => {
    const { request, setRequest, incluido, setIncluido, modoEditarModulo, modoCrearModulo, navigateBack,
        newInclusiones, setNewInclusiones, oldInclusiones, setOldInclusiones, openSnackBar, setOpenSnackBar } = props;
    const classes = useStyles(props);
    //Campos request:
    const [codigo, setCodigo] = useState(request && request.codigo ? request.codigo : "")
    const [nombre, setNombre] = useState(request && request.nombre ? request.nombre : null)
    const [descripcion, setDescripcion] = useState(request && request.descripcion ? request.descripcion : null)
    const [checkSerologico, setCheckSerologico] = useState(request && request.controlSerologico ? request.controlSerologico : false);



    //OnChange FORM:
    const onChangeCodigo = (e) => {
        setCodigo(e.target.value)
        setRequest({
            ...request,
            "codigo": e.target.value
        })
    }

    const onChangeNombre = (e) => {
        setNombre(e.target.value)
        setRequest({
            ...request,
            "nombre": e.target.value
        })
    }
    const onChangeDescripcion = (e) => {
        setDescripcion(e.target.value)
        setRequest({
            ...request,
            "descripcion": e.target.value
        })
    }
    const onChangeSerologico = () => {
        setCheckSerologico(!checkSerologico)
        setRequest({
            ...request,
            "controlSerologico": !checkSerologico
        })
    }

    return (
        <Grid container xs={12} alignItems='flex-start' spacing={3}>
            {request && request.incluidoEnConvenio ?
                <Grid item xs={12} className={classes.cabecera}>
                    <CustomTypography className={classes.cabeceraTitulo} text={text1} />
                    <CustomTypography className={classes.cabeceraText} text={text2} />
                </Grid>
                : null
            }
            <Grid item xs={12}>
                <CustomText
                    disabled={request && request.incluidoEnConvenio ? request.incluidoEnConvenio : false}
                    label={'Código *'}
                    id={'codigo'}
                    shrink={true}
                    maxCaracteres={20}
                    placeholder={'Ingresar código'}
                    value={codigo}
                    onChange={(e) => onChangeCodigo(e)}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    disabled={false}
                    label={'Nombre *'}
                    id={'nombre'}
                    maxCaracteres={200}
                    shrink={true}
                    fullwidth={true}
                    value={nombre}
                    onChange={(e) => onChangeNombre(e)}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    disabled={false}
                    label={'Descripción *'}
                    id={'descripcion'}
                    shrink={true}
                    fullwidth={true}
                    maxCaracteres={4000}
                    value={descripcion}
                    onChange={(e) => onChangeDescripcion(e)}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheck
                    checked={checkSerologico}
                    handleChange={onChangeSerologico}
                    texto={"Control Serológico"}
                />
            </Grid>
            <InclusionesModulo
                request={request} setRequest={setRequest}
                incluido={incluido} setIncluido={setIncluido}
                newInclusiones={newInclusiones} setNewInclusiones={setNewInclusiones}
                oldInclusiones={oldInclusiones} setOldInclusiones={setOldInclusiones}
                modoEditarModulo={modoEditarModulo} modoCrearModulo={modoCrearModulo}
                openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar}
                navigateBack={navigateBack}
            />
        </Grid>
    )
}

export default DrawerModulo;