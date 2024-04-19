import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize:14, 
        color:'#747474'
    },
    value: {
        fontSize:14, 
        color:'#505050'
    },
    box: {
        borderRadius: '5px',
        border: '1px solid #EAEAEA',
        padding: '10px'
    }
}))

const Observacion = (props) => {
    const {fecha, responsable, observacion} =  props;
    const classes = useStyles()

    return (
        <Grid container className={classes.box}>
            <Grid item xs={12} container>
                <Grid item xs={6} style={{display:'flex', gap:'10px'}}>
                    <Typography className={classes.label}>Fecha</Typography>
                    <Typography className={classes.value}>
                        {fecha ? fecha : "dd/mm/yyyy"}
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{display:'flex', gap:'10px'}}>
                    <Typography className={classes.label}>Responsable</Typography>
                        <Typography className={classes.value}>
                            {responsable ? responsable : "N/A"}
                        </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: '10px'}}>
                <Divider />
            </Grid>
            <Grid item xs={12} style={{display:'flex', gap:'10px', marginTop: '10px'}}>
                <Typography className={classes.label}>Observacion</Typography>
                <Typography className={classes.value}>
                    {observacion ? observacion : "Sin observacion"}
                </Typography>                    
            </Grid>
        </Grid>
    )
}

export default Observacion;