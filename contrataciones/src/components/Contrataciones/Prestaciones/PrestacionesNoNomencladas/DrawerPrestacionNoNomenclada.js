import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
//Material:
import { Grid } from '@material-ui/core'
//Components:
import CustomCheck from '../../../commons/CustomCheck/CustomChek';
import CustomSelect from '../../../commons/Select/customSelect';
import CustomText from '../../../commons/TextField/CustomText';

const DrawerPrestacionNoNomenclada = (props) => {
    const { request, setRequest } = props;
    //Redux:
    const dispatch = useDispatch();
    const prestacionesCategorias = useSelector(state => state.listados.prestacionesCategorias);
    const prestacionesCategoriasContrataciones = useSelector(state => state.listados.prestacionesCategoriasContrataciones);
    const prestacionesSubCategoriasContrataciones = useSelector(state => state.listados.prestacionesSubCategoriasContrataciones);
    //ValuesForm:
    const [codigo, setCodigo] = useState(request && request.codigo ? request.codigo : null)
    const [descripcion, setDescripcion] = useState(request && request.descripcion ? request.descripcion : null)
    const [checkSerologico, setCheckSerologico] = useState(request && request.controlSerologico ? request.controlSerologico : false);
    const [valCategoria, setValCategoria] = useState(request && request.idCategoria ? request.idCategoria : '');
    const [valCategoriaContrataciones, setValCategoriaContrataciones] = useState(request && request.idCategoriaContrataciones ? request.idCategoriaContrataciones : '');
    const [valSubCategoriaContrataciones, setValSubCategoriaContrataciones] = useState(request && request.idSubCategoriaContrataciones ? request.idSubCategoriaContrataciones : '');

    //Cargo las categorías: 
    useEffect(() => {
        dispatch(actions.getPrestacionesCategorias())
        dispatch(actions.getPrestacionesCategoriasContrataciones())
        dispatch(actions.getPrestacionesSubCategoriasContrataciones())
    }, [])

    //Onchange Values Form: 
    const onChangeCodigo = (event) => {
        setCodigo(event.target.value)
        setRequest({
            ...request,
            "codigo": event.target.value
        })
    }
    const onChangeDescripcion = (event) => {
        setDescripcion(event.target.value)
        setRequest({
            ...request,
            "descripcion": event.target.value
        })
    }
    const onChangeSerologico = () => {
        setCheckSerologico(!checkSerologico)
        setRequest({
            ...request,
            "controlSerologico": !checkSerologico
        })
    }
    const handleChangeSelectCategoria = (event) => {
        setValCategoria(event.target.value);
        if (event.target.value) {
            setRequest({
                ...request,
                "idCategoria": event.target.value,
                "categoria": (prestacionesCategorias.filter(it => it.codigo === event.target.value))[0].descripcion
            })
        } else {
            setRequest({
                ...request,
                "idCategoria": null,
                "categoria": null
            })
        }
    };
    const handleChangeSelectCategoriaContrataciones = (event) => {
        setValCategoriaContrataciones(event.target.value);
        if (event.target.value) {
            setRequest({
                ...request,
                "idCategoriaContrataciones": event.target.value,
                "categoriaContrataciones": (prestacionesCategoriasContrataciones.filter(it => it.codigo === event.target.value))[0].descripcion
            })
        } else {
            setRequest({
                ...request,
                "idCategoriaContrataciones": null,
                "categoriaContrataciones": null
            })
        }
    };
    const handleChangeSelectSubCategoriaContrataciones = (event) => {
        setValSubCategoriaContrataciones(event.target.value);
        if (event.target.value) {
            setRequest({
                ...request,
                "idSubCategoriaContrataciones": event.target.value,
                "subCategoriaContrataciones": (prestacionesSubCategoriasContrataciones.filter(it => it.codigo === event.target.value))[0].descripcion
            })
        } else {
            setRequest({
                ...request,
                "idSubCategoriaContrataciones": null,
                "subCategoriaContrataciones": null
            })
        }
    };

    return (
        <Grid container xs={12} alignItems='flex-start' spacing={3} >
            <Grid item xs={12}>
                <CustomText
                    disabled={false}
                    label={'Código *'}
                    id={'codigo'}
                    maxCaracteres={80}
                    shrink={true}
                    placeholder={'Ingresar código'}
                    value={codigo}
                    onChange={onChangeCodigo}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    disabled={false}
                    label={'Descripción *'}
                    id={'descripcion'}
                    shrink={true}
                    maxCaracteres={200}
                    fullwidth={true}
                    value={descripcion}
                    onChange={(e) => onChangeDescripcion(e, descripcion)}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheck
                    checked={checkSerologico}
                    handleChange={onChangeSerologico}
                    texto={"Control Serológico"}
                />
            </Grid>
            <Grid item xs={12} style={{ maxWidth: '400px' }}>
                <CustomSelect
                    titulo={'Categoría'}
                    data={prestacionesCategorias}
                    fullwidth={true}
                    seleccione={true}
                    placeholder={'Seleccionar tipo'}
                    handleChangeSelect={handleChangeSelectCategoria}
                    val={valCategoria ? valCategoria : ''}
                />
            </Grid>
            <Grid item xs={12} style={{ maxWidth: '400px' }}>
                <CustomSelect
                    titulo={'Categoría Contrataciones'}
                    data={prestacionesCategoriasContrataciones}
                    fullwidth={true}
                    seleccione={true}
                    placeholder={'Seleccionar tipo'}
                    handleChangeSelect={handleChangeSelectCategoriaContrataciones}
                    val={valCategoriaContrataciones ? valCategoriaContrataciones : ''}
                />
            </Grid>
            <Grid item xs={12} style={{ maxWidth: '400px' }}>
                <CustomSelect
                    titulo={'Sub Categoría Contrataciones'}
                    data={prestacionesSubCategoriasContrataciones}
                    fullwidth={true}
                    seleccione={true}
                    placeholder={'Seleccionar tipo'}
                    handleChangeSelect={handleChangeSelectSubCategoriaContrataciones}
                    val={valSubCategoriaContrataciones ? valSubCategoriaContrataciones : ''}
                />
            </Grid>
        </Grid>
    )
}

export default DrawerPrestacionNoNomenclada;