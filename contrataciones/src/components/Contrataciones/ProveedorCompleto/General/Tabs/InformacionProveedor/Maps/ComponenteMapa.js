import React from 'react'
import { Grid } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public';
import CustomMap from './ComponenteMapa/CustomMap';
import CustomTypography from '../../../../../../commons/Typography/CustomTypography';
import CustomButton from '../../../../../../commons/Button/CustomButton';

const ComponenteMapa = (props) => {
    const { handleUbicacion, checkedSwitch, setCheckedSwitch, adress, coordenadas, viewMap, gridLat,
            gridMapa, gridSwitch, disableMapa, data, setData } = props
    return (
        <Grid item container spacing={2}>
            <Grid item >
                <CustomButton
                    size="small"
                    styleButton={{width:'200px'}}
                    label={'Ver ubicación en mapa'}
                    startIcon={<PublicIcon />}
                    disabled={disableMapa ? disableMapa : null}
                    onClik={handleUbicacion}
                    variant={'outlined'} />
            </Grid>

            <Grid item xs={7}>
                <CustomTypography
                    style={{marginTop:'6px'}}
                    text={<strong>{!checkedSwitch ? 'No validado' : 'Validado'}</strong>}
                    variant='body2'
                    color={!checkedSwitch ? '#e34850' : '#33ab84'} />
            </Grid>

            {viewMap ?
                <Grid item xs={gridMapa}>
                    <CustomMap
                        gridLat={gridLat}
                        switchValidacion={true}
                        gridSwitch={gridSwitch}
                        latLong={true}
                        adress={adress}
                        coordenadas={coordenadas}
                        checkedSwitch={checkedSwitch} setCheckedSwitch={setCheckedSwitch}
                        data={data} setData={setData} />
                </Grid>
                : null}
        </Grid>
    )
}
export default ComponenteMapa