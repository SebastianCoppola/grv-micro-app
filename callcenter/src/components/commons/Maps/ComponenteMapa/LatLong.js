//Mui:
import { Grid } from '@material-ui/core'
//Components:
import CustomTypography from '../../Typography/CustomTypography'

const LatLong = (props) => {
    const { coordenadas } = props
    return (
        <Grid item container spacing={2} justify='flex-end'>
            <Grid item >
                <CustomTypography
                    text={`Latitud: ${coordenadas && coordenadas.lat}`}
                    variant='body2'
                />
            </Grid>
            <Grid item >
                <CustomTypography
                    text={`Longitud: ${coordenadas && coordenadas.lng}`}
                    variant='body2'
                />
            </Grid>
        </Grid>
    )
}
export default LatLong