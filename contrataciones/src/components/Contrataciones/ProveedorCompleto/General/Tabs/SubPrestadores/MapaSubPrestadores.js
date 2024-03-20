import React, {useEffect, useState} from 'react'
//GoogleMap:
import Geocode from "react-geocode"
//Components:
import credentials from '../InformacionProveedor/Maps/ComponenteMapa/credentials'
import ComponenteMapa from '../InformacionProveedor/Maps/ComponenteMapa'
//Mui:
import { Grid } from '@material-ui/core'

const MapaSubPrestadores = props => {

    const {checkedSwitch, setCheckedSwitch, adress, disableMapa, coordenadas, setCoordenadas} = props

    Geocode.setApiKey(credentials.mapsKey)

    const [viewMap, setViewMap] = useState(false)

    //const adress = 'bv. chacabuco 458, cordoba, argentina'
    useEffect(() => {
        Geocode.fromAddress(adress).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setCoordenadas({
                    lat: lat,
                    lng: lng
                })
            },
            (error) => {
                console.error(error);
            }
        );
    }, [adress])

    const handleUbicacion = () => {
        setViewMap(!viewMap)
    }

    useEffect(() => {
        if(disableMapa){
            setViewMap(false)
        }  
    }, [disableMapa])

    return (
        <Grid container>
            <Grid item xs={12}>
                <ComponenteMapa
                    gridLat={8}
                    gridSwitch={4}
                    gridMapa={12}
                    handleUbicacion={handleUbicacion}
                    checkedSwitch={checkedSwitch}
                    setCheckedSwitch={setCheckedSwitch}
                    coordenadas={coordenadas}
                    viewMap={viewMap}
                    disableMapa={disableMapa}
                />
            </Grid>
        </Grid>
    )
}

export default MapaSubPrestadores
