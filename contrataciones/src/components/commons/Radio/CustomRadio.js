import React from 'react'
//material-ui
import Radio from '@material-ui/core/Radio';
//estilo
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#2dc76d',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#2dc76d',
        },
        '&$checked': {
            color: '#2dc76d',
          },
    },
}))


  
const CustomRadio = (props) => {
    const classes = useStyles(props);
    const { checked, handleChange, value } = props
    const theme = useTheme();
    return (

        <Radio
            className={classes.root}
            disableRipple
            checked={checked}
            onChange={handleChange}
            value={value}
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />


    )
}

export default CustomRadio