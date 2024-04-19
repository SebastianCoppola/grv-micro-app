import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//Mui:
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        color: props => props.color,
        fontStretch:' normal',
        fontStyle: 'normal',
        lineHeight: 1.3,
        letterSpacing: 'normal',
        '&.MuiTypography-h5': {
            fontSize: '27px',
            fontWeight: props => props.bold ? 'bold' : props.fontweight ? props.fontweight: 'normal',
        }
    }
})

const CustomTypography = props => {
    
    const { text, variant, component, gutterBottom, className, style, fontweight} = props

    const classes = useStyles(props)

    return (
        <Fragment>
            <Typography 
                style={style ?? {fontWeight: fontweight}} 
                variant={variant} 
                component={component}
                gutterBottom={gutterBottom} 
                className={className ? className : classes.root}
            > 
                {text} 
            </Typography>
        </Fragment>
    )
}

CustomTypography.propTypes = {
    text: PropTypes.string,
    variant: PropTypes.string,
    component: PropTypes.string,
    gutterBottom: PropTypes.bool,
    color: PropTypes.string,
    bold: PropTypes.bool,
    fontweight: PropTypes.string,
    className: PropTypes.any,
    style: PropTypes.object,
}

export default CustomTypography