import React from 'react';
import {  makeStyles, Typography } from "@material-ui/core";

 const useStyles = makeStyles({
    donutChart: {
          position: 'relative',
          width: '127px',
          height: '128px',
          margin: '0 0 2rem',
          borderRadius: '100%',
          minWidth:'128px',
       },
    recorte:{
        borderRadius: '50%',
        clip: 'rect(0px, 200px, 200px, 64px)',
        height: '100%',
        position: 'absolute',
        width: '100%',
    },
    quesito:{
        borderRadius: '50%',
        clip: 'rect(0px, 64px, 200px, 0px)',
        height: '100%',
        position: 'absolute',
        width: '100%',
        fontSize: '1.5rem',
        fontFamily:'monospace',
    },
    porcion1:{
        transform: 'rotate(0deg)',
      
    },
    porcion12:{
        backgroundColor: props => props.porcion1 && props.porcion1.color !== null ? props.porcion1.color: '',
        transform: props => `rotate(${props.porcion1 && props.porcion1.porcentaje  !== null ? props.porcion1.porcentaje : 0}deg)`,
    },
    
    porcion2 :{
        transform:  props => `rotate(${props.porcion1 && props.porcion1.porcentaje  !== null ? props.porcion1.porcentaje : 0}deg)`,
    },
    porcion22:{
        backgroundColor: props => props.porcion2 && props.porcion2.color  !== null ? props.porcion2.color: '',
        transform: props => `rotate(${ props.porcion2 && props.porcion2.porcentaje  !== null ? props.porcion2.porcentaje : 0}deg)`,
    },
    porcion3:{
        transform: props => `rotate(${ props.porcion3 && (props.porcion1.porcentaje + props.porcion2.porcentaje)}deg)`,
    },
    porcion32:{
        backgroundColor: props => props.porcion3 && props.porcion3.color  !== null ? props.porcion3.color: '',
        transform: props => `rotate(${ props.porcion3 && props.porcion3.porcentaje  !== null ? props.porcion3.porcentaje : 0}deg)`,
    },
    porcion4:{
        transform: props => `rotate(${ props.porcion3 && (props.porcion1.porcentaje + props.porcion2.porcentaje + props.porcion3.porcentaje)}deg)`,
    },
    porcion42:{
        backgroundColor: props => props.porcion4 && props.porcion4.color  !== null ? props.porcion4.color: '',
        transform:  props => `rotate(${ props.porcion4 && props.porcion4.porcentaje  !== null ? props.porcion4.porcentaje : 0}deg)`,
    },


    centerDate:{
        webkitBoxSizing: 'border-box',
        mozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        background: '#ffffff',
        position: 'absolute',
        textAlign: 'center',
        fontSize: '32px',
        top:0,
        left:0,
        bottom:0,
        right:0,
        width: '110px',
        height: '110px',
        margin: 'auto',
        borderRadius: '50%',
        lineHeight: '20px',
        padding: '26% 0 0',
        color:'#4b4b4b',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        letterSpacing: 'normal',
    },
    text:{
    fontSize: '13px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.3',
    letterSpacing: 'normal',
    textAlign: 'left',
    color:'#4b4b4b',
    marginBottom:'5px',
    },
}) 

const Graficos = (props) => {
    const {estados, porcion1, porcion2, porcion3, porcion4,} = props;
    const classes = useStyles(props);

    return (
        <>
            <div className={classes.donutChart}>
                <div className={`${classes.porcion1} ${classes.recorte}`}><div className={`${classes.porcion12} ${classes.quesito}`}></div></div>
                <div className={`${classes.porcion2} ${classes.recorte}`}><div className={`${classes.porcion22} ${classes.quesito}`}></div></div>
                {
                    porcion3 !== null &&  <div className={`${classes.porcion3} ${classes.recorte}`}><div className={`${classes.porcion32} ${classes.quesito}`}></div></div>
                }
                {
                    porcion4 !== null &&  <div className={`${classes.porcion4} ${classes.recorte}`}><div className={`${classes.porcion42} ${classes.quesito}`}></div></div>
                }
                <Typography className={classes.centerDate}> {estados[0].cant}<br/><span className={classes.text}>{estados[0].text}</span></Typography>     
            </div>
            </>
        )
}

export default Graficos
