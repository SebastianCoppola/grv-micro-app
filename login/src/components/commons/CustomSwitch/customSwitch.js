import { Switch } from "@mui/material";
import React from "react"; 
import { withStyles } from '@mui/styles';

const GreenSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: '#2dc76d',
    },
    '&$checked + $track': {
      backgroundColor: '#2dc76d',
    },
  },
  checked: {},
  track: {},
})(Switch);

const CustomSwitch = (props) => {
  const { checkedSwitch, handleChangeSwitch, nameSwitch, disabled } = props

  return (
    <GreenSwitch
      checked = {checkedSwitch}
      disabled = {disabled}
      onChange = {handleChangeSwitch}
      name = {nameSwitch}
    />
  )
}

export default CustomSwitch