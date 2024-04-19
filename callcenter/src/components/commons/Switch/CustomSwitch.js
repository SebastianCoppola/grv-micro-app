import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
    },
    switch_green: {
        "&.Mui-checked": {
            color: "#2dc76d",
        },
        "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#4CAF50",
        },
    },
});
const CustomSwitch = props => {
    const {checked, onChange,name, label,size, positionLabel, value, disabled, color } =props
    const classes = useStyles(props);
    return (
        <div>
            <FormControlLabel
                control={<Switch  checked={checked}
                                  classes={{colorGreen: classes.switch_green}}
                                  onChange={onChange} 
                                  name={name}
                                  size={size}
                                  color={color ? color : checked ? "Green" : "default"}
                                />}
                label={label}
                labelPlacement = {positionLabel}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

CustomSwitch.propTypes = {
    checked: PropTypes.bool,
    onChange:PropTypes.any,
    name:PropTypes.string,
    label:PropTypes.string,
    size:PropTypes.string,
    positionLabel:PropTypes.string,
    value:PropTypes.any,
    disabled:PropTypes.bool,
    color:PropTypes.string,
}

export default CustomSwitch
