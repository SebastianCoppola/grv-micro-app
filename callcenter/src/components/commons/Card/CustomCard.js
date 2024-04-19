import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
//Mui:
import { makeStyles, Card, CardContent, Grid, CardActionArea, Tooltip } from '@material-ui/core'
import StarOutlineIcon from '@material-ui/icons/StarOutline'
//Components:
import CustomTypography from '../Typography/CustomTypography'

const useStyles = makeStyles({
    border: {
        border: 'solid 1px #1473e6',
        '.Mui-focusVisible': {
            border: 'solid 1px #1473e6',
        }
    },
    cardSugerido:{
        backgroundColor:' rgb(182, 208, 226)',
        //powderblue
    },
    formControlLabel: {
        border: 'solid 2px #ffffff',
        position: 'relative',
        padding: '10px',
        marginLeft: 0,
        '& .MuiFormGroup-root': {
            position: 'absolute',
            top: 0,
            right: 0,
            '& .MuiFormControlLabel-root': {
                margin: 0,
            },
        },
        '& .MuiFormControlLabel-label': {
            height: '100%',
            width: ' 100%',
        },
    },
    ambulanciaColor: {
        border: props => `solid 2px ${props.color}` ,
        position: 'relative',
        padding: '10px',
        marginLeft: 0,
        '& .MuiFormGroup-root': {
            position: 'absolute',
            top: 0,
            right: 0,
            '& .MuiFormControlLabel-root': {
                margin: 0,
            },
        },
        '& .MuiFormControlLabel-label': {
            height: '100%',
            width: ' 100%',
        },
    },
    formControlSelected: {
        borderColor: '#1473e6',
    },
    vertical: {
        padding: '3px',
        maxWidth: '150px',
        maxHeight: '150px',
        margin: '2px',
        borderRadius: '8px',
        boxShadow: '0 0px 8px 0 rgba(37, 38, 94, 0.1)',
        backgroundColor: '#ffffff',
        borderBottom: props => `8px solid ${props.color}`,
        '&>.MuiButtonBase-root > .MuiCardContent-root>.MuiGrid-root>#show': {
            display: "none"
        },
        '&:hover': {
            border: props => `3px solid ${props.color}`,
            padding: '0px',
            '&>.MuiButtonBase-root > .MuiCardContent-root>.MuiGrid-root>#show': {
                display: "block"
            }
        }
    },
    horizontal: {
        margin: 2,
        minWidth: '150px',
        minHeight: '50px',
        borderRadius: '8px',
        boxShadow: '0 0px 8px 0 rgba(37, 38, 94, 0.1)',
        backgroundColor: '#ffffff',
        borderLeft: props => `8px solid ${props.color}`,
        '&:hover': {
            border: props => `2px solid ${props.color}`,
            borderLeft: props => `10px solid ${props.color}`,
            margin: 0,
            '& > .MuiButtonBase-root > .MuiCardContent-root > .makeStyles-root': {
                paddingLeft: '50px',
            }
        }
    }
})

const CustomCard = (props) => {
    
    const { body, data, value2, isVariante, estilo, handleClickCard, click, ambulancia } = props

    const classes = useStyles(props)

    return (
        <>
            {!isVariante ?
                <Card className={`${classes.formControlLabel} ${ambulancia ? classes.ambulanciaColor : null} ${data && parseInt(value2) === data.id ? classes.formControlSelected : classes.formControlLabel}`}>
                    {click ?
                        <CardActionArea id={'panel'} className={`${data && data.sugeridoEmpleador ? classes.cardSugerido : null}`}>
                            {data && data.sugeridoEmpleador ?
                                <Tooltip
                                    placement="right"
                                    title={
                                        <Fragment>
                                            <Grid container justify='center' alignItems='center'>
                                                <Grid item>
                                                    <CustomTypography 
                                                        style={{fontSize:'14px', marginLeft:'5px', marginBottom:'3px'}} 
                                                        text={'Sugerido por empleador'} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Fragment>
                                    }
                                >
                                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'end' }}>
                                        <StarOutlineIcon htmlColor={'#f29423'} />
                                    </Grid>
                                </Tooltip>
                            : null}
                            <CardContent className={`${data && value2 === data.razonSocial ? classes.formControlSelected : data && data.sugeridoEmpleador ? classes.cardSugerido : null}`}>
                                <Grid item alignItems={'center'} spacing={2}>
                                    {body}
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    : 
                        <CardContent className={`${data && parseInt(value2) === data.id ? classes.formControlSelected : data && data.sugeridoEmpleador ? classes.cardSugerido : null}`}>
                            <Grid item container alignItems={'center'} spacing={1}>
                                {body}
                            </Grid>
                        </CardContent>
                    }
                </Card>
            :
                <Card className={isVariante === 'vertical' ? classes.vertical : classes.horizontal} style={estilo}>
                    <CardActionArea 
                        onClick={click ? handleClickCard : null} 
                        style={isVariante === 'vertical' ? {minHeight:'150px'} : {minHeight:'100px'}}
                    >
                        <CardContent style={{padding:'1px'}}>
                            {body}
                        </CardContent>
                    </CardActionArea>
                </Card>
            }
        </>
    )
}

CustomCard.propTypes = {
    body: PropTypes.any,
    colorCheck: PropTypes.bool,
    data: PropTypes.any,
    value2: PropTypes.any,
    setValue: PropTypes.any,
    isVariante: PropTypes.string,
    estilo: PropTypes.any,
    handleClickCard: PropTypes.any,
    click: PropTypes.any,
}

export default CustomCard
