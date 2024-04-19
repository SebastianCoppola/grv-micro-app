import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Maps = (props) => {

    const { coordenadas, setCoordenadas } = props

    const handleMarkerMovement = (e) => {
        let lat = e.latLng.lat()
        let lng = e.latLng.lng()
        if(setCoordenadas) setCoordenadas({ lat, lng })
    }

    return (
        <div >
            <GoogleMap
                defaultZoom={18}
                initialCenter={coordenadas}
                center={coordenadas}
            >
                <Marker
                    position={coordenadas} 
                    draggable={true}
                    onDragEnd={ e => handleMarkerMovement(e) }
                />
            </GoogleMap>
        </div>
    )
}
export default withScriptjs(withGoogleMap(Maps));