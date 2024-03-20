import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import credentials from './credentials'
import SwitchMapValidarUbicacion from './SwitchMapValidarUbicacion'
import LatLong from './LatLong'
import Maps from './Maps'

const useStyles = makeStyles({
    cabecera: {
        padding: '15px', 
        borderLeft: '2px solid #1473e6',
        backgroundColor: '#f5f5f5',
        marginBottom:'8px',
    }
})

const CustomMap = (props) => {

    const { coordenadas, setCoordenadas, checkedSwitch, setCheckedSwitch, switchValidacion, latLong, 
        gridLat, gridSwitch, data, setData } = props

    const classes = useStyles(props)

    return (
        <div>
            <Grid className={classes.cabecera} container justify='space-between' alignItems='center' >
                {switchValidacion ?
                    <Grid item xs={gridSwitch}>
                        <SwitchMapValidarUbicacion
                            checkedSwitch={checkedSwitch}
                            setCheckedSwitch={setCheckedSwitch} 
                            data={data} setData={setData}
                        />
                    </Grid>
                : null}
                {latLong ?
                    <Grid item xs={gridLat} container spacing={3} justify='flex-end'>
                        <LatLong coordenadas={coordenadas} />
                    </Grid>
                : null}
            </Grid>
            <div style={checkedSwitch ? { pointerEvents: 'none' } : null}>
                <Maps
                    validacion={checkedSwitch}
                    coordenadas={coordenadas}
                    setCoordenadas={setCoordenadas}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?&key=${credentials.mapsKey}`}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    loadingElement={<p>Cargando</p>}
                />
            </div>
        </div>
    )
}

export default CustomMap