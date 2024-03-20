import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTiposPrestadorMedico, searchCentrosMedicosPropios } from "../../../../../../../../redux/actions/listados";
import { Divider, Grid, IconButton } from '@material-ui/core'
import CustomCheck from "../../../../../../../commons/CustomCheck/CustomChek";
import CustomText from "../../../../../../../commons/TextField/CustomText";
import CustomSelect from "../../../../../../../commons/Select/customSelect";
import CustomButton from "../../../../../../../commons/Button/CustomButton";
import CustomTypography from "../../../../../../../commons/Typography/CustomTypography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import CustomRadio from "../../../../../../../commons/Radio/CustomRadio";
import BusquedaEspecialidad from './BusquedaEspecialidad'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from '@material-ui/styles';
import Utils from "../../../../../../../../Utils/utils";

const useStyles = makeStyles({
    especialidadesElegidas: {
        borderBottom: '1px solid  #eaeaea',
        paddingLeft: '0px',
        paddingBottom: '15px'
    },
    buttonDelete: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        height: "40px",
        marginLeft: '4px'
    }
})

const PrestadorMedico = (props) => {
    const classes = useStyles(props);
    const { tiposActuales, setTiposActuales, proveedorSeleccionado, valTipo, setValTipo, 
        especialidadesElegidas, setEspecialidadesElegidas } = props
    const dispatch = useDispatch()
    const tiposPrestadorMedico = useSelector(state => state.listados.tiposPrestadorMedicos)
    const centrosMedicosPropios = useSelector(state => state.listados.centrosMedicosPropios)
    const tiposProveedorDatos = useSelector(state => state.proveedor.tiposProveedorDatos);
    const [valCentrosMedicosPropios, setValCentrosMedicosPropios] = React.useState(null)
    const [centrosPropios, setCentrosPropios] = React.useState(null);
    const [checkedMedico, setCheckedMedico] = React.useState(false)
    const [checkedQX, setCheckedQX] = React.useState(false)
    const [observaciones, setObservaciones] = React.useState(null)
    const [notas, setNotas] = React.useState(null)
    const [tipoProfesionalOptions, setTipoProfesionalOptions] = React.useState(false)
    const [addEspecialidad, setAddEspecialidad] = React.useState(false)
    const [checkProfesionalPropio, setCheckProfesionalPropio] = React.useState(null)
    const [radioPrestador, setRadioPrestador] = React.useState([
        {
            titulo: 'Red Colonia Suiza', nombre: 'redColoniaSuiza', value: 2, id: 'id',
            dataRadio: [{ codigo: 1, descripcion: 'Incluído' }, { codigo: 2, descripcion: 'No incluído' },]
        },
        {
            titulo: 'Red provart', nombre: 'redProvart', value: 2, id: 'id2',
            dataRadio: [{ codigo: 1, descripcion: 'Incluído' }, { codigo: 2, descripcion: 'No incluído' },]
        },
    ])
    const [check, setCheck] = React.useState([
        {
            titulo: 'Tiene RMN', nombre: 'tieneRMN', value: false, id: 'id',
        },
        {
            titulo: 'Tiene TAC', nombre: 'tieneTAC', value: false, id: 'id2',
        },
        {
            titulo: 'Servicio 24hs', nombre: 'servicio24h', value: false, id: 'id3',
        },
        {
            titulo: 'Visible en cartilla', nombre: 'visibleEnCartilla', value: false, id: 'id4',
        },
        {
            titulo: 'Ver código externo en PDF auto', nombre: 'codigoExternoPDF', value: false, id: 'id5',
        },
    ])
    const [check2, setCheck2] = React.useState([
        {
            titulo: 'Contrato activo', nombre: 'contratoActivo', value: false, grid: 3, id: 'id',
        },
        {
            titulo: 'Primera asistencia', nombre: 'primeraAsistencia', value: false, grid: 3, id: 'id2',
        }
    ])

    useEffect(() => {
        if (tiposProveedorDatos && tiposProveedorDatos.proveedorPrestadorMedicoDTO) {
            setObservaciones(tiposProveedorDatos.proveedorPrestadorMedicoDTO.observaciones)
            setCheckedMedico(tiposProveedorDatos.proveedorPrestadorMedicoDTO.centroMedicoPropio)
            setCheckedQX(tiposProveedorDatos.proveedorPrestadorMedicoDTO.requiereParteQx)
            setObservaciones(tiposProveedorDatos.proveedorPrestadorMedicoDTO.observaciones)
            setNotas(tiposProveedorDatos.proveedorPrestadorMedicoDTO.notas)
            setValTipo(tiposProveedorDatos.proveedorPrestadorMedicoDTO.idTipoPrestadorMedico)
            setTipoProfesionalOptions(tiposProveedorDatos.proveedorPrestadorMedicoDTO.idTipoPrestadorMedico === 5 ? true : false)
            setEspecialidadesElegidas(tiposProveedorDatos.proveedorPrestadorMedicoDTO.especialidadesMedicas)
            setCheckProfesionalPropio(tiposProveedorDatos.proveedorPrestadorMedicoDTO.profesionalPropio)
            setCentrosPropios(tiposProveedorDatos.proveedorPrestadorMedicoDTO.centrosMedico)
            setRadioPrestador([
                {
                    titulo: 'Red Colonia Suiza', nombre: 'redColoniaSuiza', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.redColoniaSuiza , id: 'id',
                    dataRadio: [{ codigo: 1, descripcion: 'Incluído' }, { codigo: 2, descripcion: 'No incluído' },]
                },
                {
                    titulo: 'Red provart', nombre: 'redProvart', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.redProvart, id: 'id2',
                    dataRadio: [{ codigo: 1, descripcion: 'Incluído' }, { codigo: 2, descripcion: 'No incluído' },]
                },
            ])
            setCheck([
                {
                    titulo: 'Tiene RMN', nombre: 'tieneRMN', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.tieneRMN, id: 'id',
                },
                {
                    titulo: 'Tiene TAC', nombre: 'tieneTAC', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.tieneTAC, id: 'id2',
                },
                {
                    titulo: 'Servicio 24hs', nombre: 'servicio24h', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.servicio24h, id: 'id3',
                },
                {
                    titulo: 'Visible en cartilla', nombre: 'visibleEnCartilla', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.visibleEnCartilla, id: 'id4',
                },
                {
                    titulo: 'Ver código externo en PDF auto', nombre: 'codigoExternoPDF', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.codigoExternoPDF, id: 'id5',
                },
            ])
            setCheck2([
                {
                    titulo: 'Contrato activo', nombre: 'contratoActivo', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.contratoActivo, grid: 3, id: 'id',
                },
                {
                    titulo: 'Primera asistencia', nombre: 'primeraAsistencia', value: tiposProveedorDatos.proveedorPrestadorMedicoDTO.primeraAsistencia, grid: 3, id: 'id2',
                }

            ])

        }
    }, [tiposProveedorDatos])
    useEffect(() => {
        if (tiposActuales) {
            proveedorSeleccionado.map(element => {
                setTiposActuales({
                    ...tiposActuales,
                    "proveedorPrestadorMedicoDTO": {
                        ...tiposActuales.proveedorPrestadorMedicoDTO,
                        "eliminarRelacion": !element.seleccionado
                    }
                })
            })
        }
    }, [proveedorSeleccionado])
    useEffect(() => {
        dispatch(searchTiposPrestadorMedico())
        dispatch(searchCentrosMedicosPropios())
    }, [checkProfesionalPropio])
    useEffect(() => {
        setValCentrosMedicosPropios(centrosMedicosPropios)
    }, [centrosMedicosPropios])
    const handleChangeRadio2 = (event, it, value) => {
        setRadioPrestador(data2 => {
            return data2.map((item) => {

                if (item.nombre === it.nombre) {
                    proveedorSeleccionado.map(element => {
                        setTiposActuales({
                            ...tiposActuales,
                            "proveedorPrestadorMedicoDTO": {
                                ...tiposActuales.proveedorPrestadorMedicoDTO,
                                [it.nombre]: value.codigo === 1 ? true : false,
                                ////eliminarRelacion: element.seleccionado
                            }
                        })
                    })
                    return {
                        nombre: it.nombre,
                        value: value.codigo === 1 ? true : false,
                        titulo: it.titulo,
                        id: it.id,
                        dataRadio: it.dataRadio,
                    }
                } else {
                    return item
                }
            })
        })
    }
    const handleChangeCheck = (event, it) => {
        setCheck(data2 => {
            return data2.map((item) => {
                if (item.nombre === it.nombre) {
                    proveedorSeleccionado.map(element => {
                        setTiposActuales({
                            ...tiposActuales,
                            "proveedorPrestadorMedicoDTO": {
                                ...tiposActuales.proveedorPrestadorMedicoDTO,
                                [it.nombre]: event.target.checked,
                                ////eliminarRelacion: element.seleccionado
                            }
                        })
                    })
                    return {
                        nombre: it.nombre,
                        value: event.target.checked,
                        titulo: it.titulo,
                        id: it.id,
                    }
                } else {
                    return item
                }
            })
        })
    }
    const handleChangeCheck2 = (event, it) => {
        setCheck2(data2 => {
            return data2.map((item) => {
                if (item.nombre === it.nombre) {
                    proveedorSeleccionado.map(element => {
                        setTiposActuales({
                            ...tiposActuales,
                            "proveedorPrestadorMedicoDTO": {
                                ...tiposActuales.proveedorPrestadorMedicoDTO,
                                [it.nombre]: event.target.checked,
                                //eliminarRelacion: element.seleccionado
                            }
                        })
                    })
                    return {
                        nombre: it.nombre,
                        value: event.target.checked,
                        titulo: it.titulo,
                        id: it.id,
                        grid: it.grid
                    }
                } else {
                    return item
                }
            })
        })
    }
    
    const handleChangeCheckProfesionalPropio = (event, value) => {
        setCheckProfesionalPropio(!checkProfesionalPropio)
        proveedorSeleccionado.map(element => {
            setTiposActuales({
                ...tiposActuales,
                "proveedorPrestadorMedicoDTO": {
                    ...tiposActuales.proveedorPrestadorMedicoDTO,
                    "profesionalPropio": event.target.checked,
                    ////eliminarRelacion: element.seleccionado
                }
            })
        })
    }
    const editAsociarDesasociarCentroMedico = (nuevoArray) => {
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "asociarDesasociarCentroMedico": nuevoArray
            }
        })
    }
    const handleChangeCentrosPropios = (event, value) => {
        //MODIFICAR tiposActuales => proveedorPrestadorMedicoDTO => asociarDesasociarCentroMedico:
        //Existe asociar/desaociar:
        if (tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarCentroMedico) {
            let arrayAsociar = tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarCentroMedico;
            let newArrayAsociar = [];
            let arrayRepe = arrayAsociar && arrayAsociar.filter(it => it.id === value.codigo);
            //Existe EN asociar/desasociar:
            if (arrayRepe.length > 0) {
                for (let i = 0; i < arrayAsociar.length; i++) {
                    if ((arrayAsociar[i].id) === value.codigo) {
                        newArrayAsociar.push({
                            "id": arrayAsociar[i].id,
                            "asociar": !arrayAsociar[i].asociar
                        })
                    } else {
                        newArrayAsociar.push(arrayAsociar[i])
                    }
                }
            }
            //No existe EN asociar/desasociar:
            else {
                let array = centrosPropios && centrosPropios.filter(it => it.idCentroMedicoPropio === value.codigo);
                //Estaba seleccionado anteriormente:
                if (array && array.length > 0) {
                    for (let i = 0; i < arrayAsociar.length; i++) {
                        newArrayAsociar.push(arrayAsociar[i])
                    }
                    newArrayAsociar.push({
                        "id": value.codigo,
                        "asociar": false
                    })
                }
                //No estaba seleccionado anteriormente:
                else {
                    for (let i = 0; i < arrayAsociar.length; i++) {
                        newArrayAsociar.push(arrayAsociar[i])
                    }
                    newArrayAsociar.push({ "id": value.codigo, "asociar": true })
                }
            }
            //Seteo los datos en tiposActuales:
            editAsociarDesasociarCentroMedico(newArrayAsociar)
        }
        //No existe asociar/desaociar:
        else {
            let array = centrosPropios && centrosPropios.filter(it => it.idCentroMedicoPropio === value.codigo);
            editAsociarDesasociarCentroMedico([{ "id": value.codigo, "asociar": !(array && array.length > 0) }])
        }

        //MODIFICAR tiposActuales => proveedorPrestadorMedicoDTO => idTiposProveedor:
        //Creo el objeto:
        let newCentroPropio = {
            idCentroMedicoPropio: value.codigo,
            descripcion: value.descripcion
        }
        //Existe centrosPropios:
        if (centrosPropios) {
            let array = centrosPropios && centrosPropios.filter(it => it.idCentroMedicoPropio === value.codigo);
            //Existe EN centrosPropios:
            if (array && array.length > 0) {
                let newData = []
                for (let index = 0; index < centrosPropios.length; index++) {
                    const element = centrosPropios[index];
                    if (element.idCentroMedicoPropio !== value.codigo) {
                        newData.push(element)
                    }
                }
                setCentrosPropios(newData)
                //No existe EN centrosPropios:
            } else {
                setCentrosPropios([...centrosPropios, newCentroPropio])
            }
            //No existe centrosPropios:
        } else {
            setCentrosPropios([newCentroPropio])
        }
    }
    useEffect(() => {
        if (tiposActuales) {
            setTiposActuales({
                ...tiposActuales,
                "proveedorPrestadorMedicoDTO": {
                    ...tiposActuales.proveedorPrestadorMedicoDTO,
                    "centrosMedicos": {
                        ...centrosPropios
                    }
                }
            })
        }
    }, [centrosPropios])

    const handleCheckedMedico = (event) => {
        setCheckedMedico(event.target.checked)
        setCheckedQX(event.target.checked)
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "centroMedicoPropio": event.target.checked,
                "requiereParteQx": true,
            }
        })
    }
    const handleCheckedQX = (event) => {
        setCheckedQX(event.target.checked)
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "requiereParteQx": event.target.checked,
            }
        })
    }
    const onChangeObservaciones = (event) => {
        setObservaciones(event.target.value)
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "observaciones": event.target.value,
            }
        })
    }
    const onChangeNotas = (event) => {
        setNotas(event.target.value)
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "notas": event.target.value,
            }
        })
    }
    const handleChangeSelectTipo = (event) => {
        if (event.target.value === 5) {
            setTipoProfesionalOptions(true)
        } else {
            setTipoProfesionalOptions(false)
            setCheckProfesionalPropio(false)
            setAddEspecialidad(false)
        }
        setValTipo(event.target.value)
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "idTipoPrestadorMedico": event.target.value,
            }
        })
    }
    const editAsociarDesasociarEspecialidad = (nuevoArray) => {
        setTiposActuales({
            ...tiposActuales,
            "proveedorPrestadorMedicoDTO": {
                ...tiposActuales.proveedorPrestadorMedicoDTO,
                "asociarDesasociarEspecialidad": nuevoArray
            }
        })
    }
    const deleteIconAdd = (event, value) => {
        //MODIFICAR tiposActuales => proveedorPrestadorMedicoDTO => asociarDesasociarEspecialidad: 
        //Existe asociarDesasociar:
        if (tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarEspecialidad) {
            let arrayAsociar = tiposActuales.proveedorPrestadorMedicoDTO.asociarDesasociarEspecialidad;
            let newArrayAsociar = [];
            let arrayRepe;
            arrayRepe = arrayAsociar && arrayAsociar.filter(it => it.id === value.idEspecialidadMedica);
            //El id existe en asociar/desasociar:
            if (arrayRepe.length > 0) {
                for (let i = 0; i < arrayAsociar.length; i++) {
                    if ((arrayAsociar[i].id) === value.idEspecialidadMedica) {
                        newArrayAsociar.push({
                            "id": arrayAsociar[i].id,
                            "asociar": false
                        })
                    } else {
                        newArrayAsociar.push(arrayAsociar[i])
                    }
                }
                //El id no existe en asociarDesasociar:
            } else {
                newArrayAsociar = [...arrayAsociar, { "id": value.idEspecialidadMedica, "asociar": false }]
            }
            //Seteo los datos en tiposActuales:
            editAsociarDesasociarEspecialidad(newArrayAsociar)
            //No existe asociarDesasociar:
        } else {
            editAsociarDesasociarEspecialidad([{ "id": value.idEspecialidadMedica, "asociar": false }])
        }
        //MODIFICAR especialidadesElegidas:
        let newData = []
        for (let index = 0; index < especialidadesElegidas.length; index++) {
            const element = especialidadesElegidas[index];
            if (element.descripcion !== value.descripcion) {
                newData.push(element)
            }
        }
        setEspecialidadesElegidas(newData)
    }

    return (
        <Grid container xs={12} spacing={4} alignItems="flex-end">
            <Grid item xs={3}>
                <CustomCheck
                    checked={checkedMedico}
                    handleChange={handleCheckedMedico}
                    texto={'Es c. médico propio'}
                />
            </Grid>
            <Grid item xs={3}>
                <CustomCheck
                    checked={checkedQX}
                    handleChange={handleCheckedQX}
                    texto={'Requiere Parte Qx para 13.01.10'}
                />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <CustomText
                    label={'Observaciones'}
                    value={observaciones}
                    onChange={onChangeObservaciones}
                    id='Observaciones'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                    placeholder="Ingresar observaciones"
                />
            </Grid>
            <Grid item xs={6}>
                <CustomText
                    label={'Notas'}
                    value={notas}
                    onChange={onChangeNotas}
                    id='Notas'
                    fontSize={'12px'}
                    shrink={true}
                    width={'100%'}
                    placeholder="Ingresar notas"
                />
            </Grid>
            <Grid item xs={6}>
                <CustomSelect
                    titulo={"Tipo *"}
                    data={tiposPrestadorMedico}
                    fullwidth={true}
                    seleccione={true}
                    handleChangeSelect={(event) => handleChangeSelectTipo(event)}
                    val={valTipo ? valTipo : ""}
                    error={Utils.validarCamposEditar((valTipo !== "") ? valTipo : null, 1)}
                    helperTextSelect={Utils.validarCamposEditar((valTipo !== "") ? valTipo : null, 1) ? 'Campo Requerido' : null}
                    colorHelper={Utils.validarCamposEditar((valTipo !== "") ? valTipo : null, 1) ? 'red' : null}
                />
            </Grid>

            {check2 && check2.map((it2) => (
                <Grid item xs={it2 && it2.grid}>
                    <CustomCheck
                        checked={it2 && it2.value}
                        handleChange={(event) => handleChangeCheck2(event, it2)}
                        texto={it2 && it2.titulo}
                    />
                </Grid>
            ))}
            {tipoProfesionalOptions ?
                <Grid item container xs={12} justify="space-between">
                    <CustomCheck
                        checked={checkProfesionalPropio}
                        handleChange={handleChangeCheckProfesionalPropio}
                        texto='Profesional propio'
                    />
                    {checkProfesionalPropio ?
                        <Grid item container xs={12} spacing={2} style={{ marginTop: 40, marginBottom: 20 }}>
                            <Grid item xs={12}>
                                <CustomTypography variant={'subtitle1'} text={<strong>Seleccionar centro médico</strong>} />
                            </Grid>
                            {
                                valCentrosMedicosPropios && valCentrosMedicosPropios.map((it) => (
                                    <Grid item xs={12}>
                                        <CustomCheck
                                            checked={centrosPropios && centrosPropios.filter(centro => centro.idCentroMedicoPropio === it.codigo).length > 0 ? true : false}
                                            handleChange={(event) => handleChangeCentrosPropios(event, it)}
                                            texto={it.descripcion}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        : null
                    }
                    <Grid item xs={12}>
                        <BusquedaEspecialidad
                            especialidadesElegidas={especialidadesElegidas}
                            setEspecialidadesElegidas={setEspecialidadesElegidas}
                            tiposActuales={tiposActuales}
                            setTiposActuales={setTiposActuales}
                            editAsociarDesasociarEspecialidad={editAsociarDesasociarEspecialidad}
                        // valueEspecialidad={valueEspecialidad}
                        // setValueEspecialidad={setValueEspecialidad}
                        />
                    </Grid>
                </Grid>
                : null
            }
            {tipoProfesionalOptions && especialidadesElegidas && especialidadesElegidas.length > 0 &&
                <Grid item container xs={12} style={{ marginTop: 30, marginBottom: 70 }}>
                    <CustomTypography text={'ESPECIALIDAD'} style={{ fontSize: '12px', color: '#959595' }} />
                    <Grid item xs={12} spacing={4}>
                        <Divider />
                    </Grid>
                    {especialidadesElegidas && especialidadesElegidas.map((it) => (
                        <Grid item container alignItems="flex-end" justify="space-between">
                            <Grid item xs={11} className={classes.especialidadesElegidas} justify="center">
                                {it.descripcion}
                            </Grid>
                            <Grid item xs={1} className={classes.especialidadesElegidas} style={{ marginTop: 7 }}>
                                <IconButton
                                    onClick={(event) => deleteIconAdd(event, it)}
                                    className={classes.buttonDelete} >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            }

            {radioPrestador && radioPrestador.map((radio) => (
                <Grid item xs={6} >
                    <Grid item container xs={12} >
                        <CustomTypography text={radio.titulo} variant="subtitle2" />
                    </Grid>
                    <Grid item container xs={12} >
                        <FormControl component="fieldset">
                            <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radio.value}  >
                                {radio && radio.dataRadio.map((item) => (
                                    <Grid >
                                        <FormControlLabel
                                            value={item.codigo === 1 ? true : false}
                                            control={<CustomRadio />}
                                            label={<CustomTypography
                                                text={item.descripcion}
                                                variant={'body2'}
                                            />}
                                            onChange={(event) => handleChangeRadio2(event, radio, item)}
                                        />
                                    </Grid>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            ))}
            {check && check.map((it) => (
                <Grid item xs={3}>
                    <CustomCheck
                        checked={it && it.value}
                        handleChange={(event) => handleChangeCheck(event, it)}
                        texto={it && it.titulo} />
                </Grid>
            ))}
        </Grid>
    )
}
export default PrestadorMedico;