import React from 'react'
import PropTypes from 'prop-types'
import {Chip as MuiChip, makeStyles} from '@material-ui/core/'

const useStyles = makeStyles(() => ({
    root: {
      "& > *": {
        borderRadius:'5px',
        border: props => `solid 1px ${ props.style.color}`,
        color: props=> props.style.color,
        backgroundColor: props => props.style.backgroundColor
      }
    }
}))
  
const Chip = (props) => {

    const { label, size } = props
    
    const classes = useStyles(props)

    return(
        <div className={classes.root}>
            <MuiChip  size={size} label={label} />
        </div>
    )
}

Chip.propTypes = {
    label:PropTypes.string,
    style:PropTypes.string,
    size:PropTypes.string
}

export default Chip