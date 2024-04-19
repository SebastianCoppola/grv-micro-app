import React from "react";
import PropTypes from "prop-types";
//material-ui
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";
//estilos
import { makeStyles } from "@material-ui/core/styles";
import CustomTypography from "../Typography/CustomTypography";

const useStyles = makeStyles({
    root: {
        border: 'none',
        padding: '5px',
        '&.MuiOutlinedInput-root': {
            height: '42px',
            backgroundColor: 'white'
        },
        '&&.MuiInput-underline:before': {
            content: 'none',
        },
        '&&.MuiInput-underline:after': {
            borderBottom: '#505050',
        },
        '&& .MuiSelect-selectMenu': {
            height: '0px'
        },
        '&& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
    },
    style1: {
        border: 'none',
        padding: '5px',
        borderRadius: '20px',
        '&.MuiOutlinedInput-root': {
            height: '37px',
            backgroundColor: 'white'
        },
        '&&.MuiInput-underline:before': {
            content: 'none',
        },
        '&&.MuiInput-underline:after': {
            borderBottom: '#505050',
        },
        '&& .MuiSelect-selectMenu': {
            height: '0px'
        },
        '&& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
    },

    select: {
        padding: '1px 1px 1px 1px',
        borderRadius: '20px',
        minWidth: '176px',
        height: props => props.height ? props.height : "42",
        paddingLeft: '10px',
        border: prop => prop.error ? 'solid 1px red' : 'solid 2px rgba(202, 202, 202)',
        backgroundColor: '#ffffff',

        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderButtom: "0px solid",
        },
        "& .MuiSelect-select:focus": {
            borderRadius: "20px",
            backgroundColor: "transparent",
        },
        '&&.MuiInput-underline:before': {
            content: 'none',
        },
        '&&.MuiInput-underline:after': {
            borderBottom: '#505050',
        },
    },
    text: {
        fontSize: props => props.fontSize ? props.fontSize : '15px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
        margin: '6px 5px',
        color: '#6e6e6e',
        '&.MuiFormLabel-root.Mui-focused': {
            color: '#6e6e6e',
        },
    },
    form: {
        "& .MuiFormHelperText-root": {
            marginTop: '0px',

        }
    },
    textOverflow: {
        fontSize: props => props.textSize ? props.textSize : '15px',
        // fontSize:'12px', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

})


/* 
 Prop solicitudGenerica = toma el idPersona como valor y nombreApellido para mostrar en la interfaz
 sería como idPersona = codigo y nombreApellido = descripcion 
*/
const CustomSelect = (props) => {
    const { id, placeholder, titulo, data, variant, fullwidth, value, variantTitulo,
        val, estilo, seleccione, height, handleChangeSelect, isOutline, disabled, disabledOption,
        name, error, helperTextSelect, colorHelper, textStyles, solicitudGenerica, auditoriaMedica } = props
    const classes = useStyles(props);

    return (
        !isOutline ?
            <FormControl fullWidth={fullwidth} >
                <FormHelperText style={{ color: colorHelper }} className={classes.form}>
                    {titulo}
                </FormHelperText>
                <Select
                    disabled={disabled}
                    className={estilo ? classes.root : auditoriaMedica ? classes.style1 : null}
                    displayEmpty
                    id={id}
                    fullWidth={fullwidth}
                    name={name}
                    error={error}
                    defaultValue={val ? val : ""}
                    //defaultValue={val!==null ?"":val}
                    variant={variant}
                    value={val}

                    onChange={handleChangeSelect}
                    placeholder={placeholder ? placeholder : ''}
                >
                    {seleccione ?
                        <MenuItem value={""}>
                            <Typography variant={variantTitulo} className={classes.textOverflow}>
                                {placeholder ? placeholder : 'Seleccione'}
                            </Typography>
                        </MenuItem>
                        : null}
                    {data && data.map((item, index) => (
                        <MenuItem key={index} value={solicitudGenerica ? item && item.idPersona : item && item.codigo} disabled={disabledOption && item && item.codigo === 3}>
                            <Typography variant={variantTitulo} className={classes.textOverflow}>
                                {solicitudGenerica ? item && item.nombreApellido : item && item.descripcion}
                            </Typography>
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText style={{ color: colorHelper }}>{helperTextSelect}</FormHelperText>
            </FormControl>
            :
            <FormControl fullWidth={fullwidth}>
                <Typography style={textStyles} className={classes.text}>{titulo ? titulo : ''}</Typography>
                <Select
                    fullWidth={fullwidth}
                    disabled={disabled}
                    className={classes.select}
                    displayEmpty
                    id={id}
                    error={error}
                    name={name}
                    defaultValue={val ? val : ''}
                    inputProps={{ 'aria-label': 'Without label' }} autoWidth
                    value={val !== null ? val : ''}
                    onChange={handleChangeSelect}
                >
                    {seleccione ?
                        <MenuItem value=''>{placeholder ? placeholder : 'Seleccione'}</MenuItem> : null}
                    {!data ? null :
                        data.map((item, index) => (
                            <MenuItem key={index} value={item && item.codigo}>
                                <Typography variant={variantTitulo} >
                                    {item && item.descripcion}
                                </Typography>
                            </MenuItem>
                        ))}
                </Select>
                <FormHelperText
                    style={isOutline && error ? { color: colorHelper, marginLeft: '5px' } : { color: colorHelper, }}
                    className={classes.form}>{helperTextSelect}</FormHelperText>
            </FormControl>
    )
}

CustomSelect.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    titulo: PropTypes.string,
    data: PropTypes.any,
    fullwidth: PropTypes.bool,
    value: PropTypes.any,
    handleChangeSelect: PropTypes.any,
    val: PropTypes.any,
    estilo: PropTypes.bool,
    isOutline: PropTypes.bool,
    fontSize: PropTypes.any,
    seleccione: PropTypes.bool,
    variant: PropTypes.any,
    height: PropTypes.string,
    variantTitulo: PropTypes.any,
    disabled: PropTypes.any,
};
export default CustomSelect;
