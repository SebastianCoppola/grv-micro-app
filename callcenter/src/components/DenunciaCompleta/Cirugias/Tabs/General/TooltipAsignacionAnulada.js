import { IconButton, makeStyles, Typography, Grid } from '@material-ui/core'
import { useState } from 'react'
import { Tooltip as TippyTooltip } from 'react-tippy'
import InformarIcon from '../../../../../commons/assets/IconsAuditoriaMedica/Otros/icon-observacion.svg'
import CustomText from "../../../../commons/TextField/CustomText";

const useStyles = makeStyles({
    iconBnt: {
        borderRadius: '5px',
        border: '1px solid #d3d3d3',
        width: "40px",
        color: '#5e5e5d',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    iconBntSelect: {
        borderRadius: '5px',
        border: '1px solid #348ceb',
        width: "40px",
        color: '#5e5e5d',
        marginLeft: '2px',
        "&:hover": {
            backgroundColor: "transparent"
        },
    },
    tooltipData: {
        width: '237px',
        height: '108px',
        margin: '0px 0px -15px 0px',
        borderRadius: '5px',
        background: '#ffff',
        padding: '10px 11px 10px 14px',
        border: 'solid 1px #d3d3d3',
        boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.15)',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            background: "#f1f1f1",
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#555'
        },
      }
})

const TooltipAsignacionAnulada = (props) => {
    const classes = useStyles(props)
    const {motivo, comentario} = props
    const [openTooltip, setOpenTooltip] = useState(false)
    const [select, setSelect] = useState(false)
    
    const setStatusOpenTooltip = (e) => {
        setOpenTooltip(!openTooltip)
        setSelect(!select)
    }
    
    const showDataTooltip = () => {
        return (
          
            <div className={classes.tooltipData}>
                <Typography style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    Detalle anulación
                </Typography>
                <Grid item style={{marginTop:'5px'}}>
                    <Typography style={{ fontSize: "14px" }}>
                        Motivo: {motivo ? motivo : " -"}</Typography>
                </Grid>
                <Grid item style={{marginTop:'5px'}}>
                    <Typography style={{ fontSize: "14px" }}>
                        Comentario: {comentario ? comentario : " -"}</Typography>
                </Grid>
            </div> 
          
        )
    }

    return (
        <TippyTooltip position="left" open={openTooltip} html={showDataTooltip()}>
            <IconButton className={select ? classes.iconBntSelect : classes.iconBnt} size="small" onClick={(e) => setStatusOpenTooltip(e)} >
                <img src={InformarIcon} className={classes.icons} alt='detalle icon' />
            </IconButton>
        </TippyTooltip>
    )
}

export default TooltipAsignacionAnulada;