import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
//material-ui
import Drawer from '@material-ui/core/Drawer';
import { Divider, Grid, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
//estilo
import { makeStyles } from '@material-ui/core/styles';
//componentes
import CustomButton from '../Button/CustomButton';
import CustomTypography from '../Typography/CustomTypography';

const useStyles = makeStyles({
    list: {
        width: props => props.width ? props.width :430,
        padding: '2px 18px',
        height: props=> props.height ? props.height : '100%',
    },
    list2:{
        width: 600,
        padding: '2px 20px',
        height:'100%',
    },
    fullList: {
        width: 'auto',
        
    },
    drawer: {
        '& .MuiDrawer-paper': {
            overflowY: 'initial',
        }
    }
});

const Drawer2 = (props) => {
    const classes = useStyles(props);
    const { openDrawer, setOpenDrawer, anchor, toggleDrawer, children, label, label2, disabled2,
        variant, handleButton, title, handleButton2, button, height, width,justify, titleStyleJustify, titleStyleMargin } = props
        
    const list = (anchor) => (
        <>
            <div
                className={clsx(classes.list, {
                    [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                })}
                role="presentation"
            >
                <Grid container style={{height:'75%'}}>
                    <Grid item alignItems='center' container >
                        <Grid item xs={10} container justify={titleStyleJustify ? titleStyleJustify : 'center'} >
                            <Grid item style={titleStyleMargin ? titleStyleMargin : {marginLeft:'100px'}}>
                                <CustomTypography 
                                    fontweight='700'
                                    variant={'subtitle1'} 
                                    text={title} 
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={toggleDrawer(anchor, false)}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={12} style={{ marginBottom: '10px' }}>
                            <Divider />
                        </Grid>
                    </Grid>
                    <Grid item className={clsx(classes.list, {
                        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
                    })}>
                        {children}
                    </Grid>
                </Grid>

            </div>
            {button ?
                <Grid  item style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }} >
                    {label2 && label2 ?

                        (<CustomButton
                            label={label2}
                            variant={variant}
                            isAction={true}
                            color={'primary'}
                            styleButton={{ marginRight: '8px' }}
                            disabled={disabled2 && disabled2}
                            onClik={handleButton2 && handleButton2}
                        />)
                        : null
                    }
                    <CustomButton
                        label={label}
                        variant={variant}
                        isAction={true}
                        color={'primary'}
                        onClik={handleButton}
                    />
                </Grid>
                : null}
        </>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={openDrawer[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
Drawer2.propTypes = {
    anchor: PropTypes.any,
    toggleDrawer: PropTypes.any,
    openDrawer: PropTypes.any,
    setOpenDrawer: PropTypes.any,
    children: PropTypes.any,
    handleButton: PropTypes.any,
    label: PropTypes.string,
    variant: PropTypes.string,
    title: PropTypes.string,
    button: PropTypes.any,
    height:PropTypes.any,
    width:PropTypes.any,
    justify:PropTypes.any
};
export default Drawer2