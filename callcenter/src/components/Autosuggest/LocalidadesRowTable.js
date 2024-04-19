import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import CheckIcon from "@material-ui/icons/Check";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    rowsTab: {
        fontSize: '12px',
        textAlign: 'center'
    },
    autocompleteRow: {
        border: '3px dashed #d3d3d3',
        backgroundColor: "#fff2db",
        alignItems: 'center',
        height: '70px',
    },
    autcompleteId: {
        maxWidth: "70%",
        height: "40px",
        border: "1px #d3d3d3 solid",
        borderRadius: "6px",
        background: "white",
        display: 'felx',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 0 0 10px',
        boxSizing: 'border-box',
        '&& .MuiInput-underline.Mui-disabled:before': {
            borderBottom: "none",
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            minHeight: '40px'
        },
    },
    autocompleteSelf: {
        background: "white",
        width: "90%",
        height: "40px",
        maxHeight: "55px",
        border: "1px #d3d3d3 solid",
        borderRadius: "6px",
        display: 'felx',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
        padding: '3px 20px 0 20px',
        boxSizing: 'border-box',
        '&& .MuiInput-underline:before': {
            borderBottom: "none",
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
        },
    }
}));

const LocalidadesRowTable = (props) => {
    const { rowsWidth, 
        valueAutocomplete, inputAutocomplete, localidadAEditar,
        localidadesOptions, optionLabel, 
        changeInputAutoComplete, changeValueAutoComplete,
        cancelAddEditLocalidad, saveAddEditLocalidad} = props;
    const classes = useStyles(props);

    return (
        <ListItem className={classes.autocompleteRow} >
            <Grid item xs={rowsWidth[0]}>
                <ListItemText disableTypography className={classes.rowsTab}>
                    <TextField
                        value={valueAutocomplete && valueAutocomplete.codigo ? valueAutocomplete.codigo : localidadAEditar && localidadAEditar.idLocalidad ? localidadAEditar.idLocalidad : null}
                        disabled={true}
                        className={classes.autcompleteId}
                    />
                </ListItemText>
            </Grid>
            <Grid item xs={rowsWidth[1]}>
                <ListItemText disableTypography className={classes.rowsTab} >
                    <Autocomplete
                        options={localidadesOptions}
                        getOptionSelected={(option, value) => option.descripcion === value.descripcion}
                        getOptionLabel={(option) => option.descripcion}
                        onInputChange={(event, value) => changeInputAutoComplete(event, value)}
                        onChange={(event, value) => changeValueAutoComplete(event, value)}
                        inputValue={inputAutocomplete}
                        value={localidadAEditar ? localidadAEditar : null}
                        className={classes.autocompleteSelf}
                        noOptionsText="No hay opciones disponibles"
                        renderInput={(params) => (
                            <TextField
                                placeholder="Ingrese min 3 caracteres."
                                {...params}
                                InputProps={{ ...params.InputProps, }}
                            />
                        )}
                    />
                </ListItemText>
            </Grid>
            <Grid item xs={rowsWidth[2]}>
                <ListItemText disableTypography className={classes.rowsTab}>
                    <IconButton onClick={cancelAddEditLocalidad}>
                        <ClearOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={saveAddEditLocalidad}>
                        <CheckIcon />
                    </IconButton>
                </ListItemText>
            </Grid>
        </ListItem>
    )
}

export default LocalidadesRowTable;