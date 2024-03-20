import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
//MATERIAL-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        height: '30px',
        borderRadius: '20px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        /* '&.MuiInputBase-root': {
            fontSize: props => props.cabeceraTabla ? '13px' : null
        } */
    },
    input: {
        color:'#505050',
        marginLeft: theme.spacing(1),
        flex: 1,
        borderRadius: '50px',
        '&& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
            appearance: ' none',
            margin: 0,
        },
        '&.MuiInputBase-root': {
            fontSize: '13px',
        },
    },
    iconButton:{
        padding:'4px',
    }
}));

const BuscadorContrataciones = props => {
    const {onClick, estilo, placeholder, value } = props
    const classes = useStyles(props);

    const [val, setVal] = React.useState(value ? value : '')

    useEffect(()=>{
        setVal(value)
    },[value])

    const handleChangeBuscar = (event) => {
        if (event.target.value === '') {
            setVal(null);
        } else {
            setVal(event.target.value);
        }
    }

    const onKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            onClick(val)
        }
    }

    return (
        <Paper elevation={0} component="form" style={estilo} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                value={val}
                onChange={handleChangeBuscar}
                onKeyDown={onKey}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={ () => onClick(val)}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

BuscadorContrataciones.propTypes = {
    onClick:PropTypes.any,
    estilo:PropTypes.any,
    placeholder:PropTypes.any

}

export default BuscadorContrataciones
