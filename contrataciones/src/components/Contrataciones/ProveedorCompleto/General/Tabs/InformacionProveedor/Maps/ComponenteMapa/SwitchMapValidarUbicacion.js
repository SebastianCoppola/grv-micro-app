import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Grid } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOffIcon from '@material-ui/icons/LocationOff';
//estilos
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { validarUbicacion, invalidarUbicacion } from '../../../../../../../../Utils/const'
import CustomTypography from '../../../../../../../commons/Typography/CustomTypography';

const tooltip = makeStyles({
    tooltip: {
        backgroundColor: '#ffffff',
        border: 'solid 1px #f29423',
        color: '#6e6e6e'
    }

})
const SwitchMapValidarUbicacion = (props) => {
    const { checkedSwitch, setCheckedSwitch, data, setData } = props
    const classesTooltip = tooltip();

    const handleChangeSwitch = () => {
        setCheckedSwitch(!checkedSwitch)       
    }
    return (
        <Grid item xs={12}>
            <Tooltip
                placement="bottom-start"
                interactive
                classes={classesTooltip}
                title={<>
                    <Grid container >
                        <Grid item container xs={2}  >
                            {checkedSwitch ?
                                <LocationOffIcon style={{ color: '#f29423' }} />
                                : <LocationOnIcon style={{ color: '#f29423' }} />
                            }
                        </Grid>
                        <Grid item xs={10} container spacing={1} >
                            <Grid item xs={12}>
                                <CustomTypography
                                    text={checkedSwitch ? 'Invalidar ubicación' : 'Validar ubicación'} variant='body2' color='#f29423' />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTypography
                                    text={checkedSwitch ? invalidarUbicacion : validarUbicacion} variant='body2' />
                            </Grid>
                            <Grid item>
                                <Button onClick={handleChangeSwitch}>
                                    Confirmar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </>}>
                <FormControlLabel
                    control={<Switch checked={checkedSwitch} name={'validacion'} />}
                    label={checkedSwitch ?
                        <CustomTypography
                            text='Ubicación validada'
                            variant='body2'
                            color='#2dc76d' />
                        : <CustomTypography
                            text={'Validar ubicación'}
                            variant='body2'
                            color='#505050' />
                    }
                />
            </Tooltip>

        </Grid>

    )
}
export default SwitchMapValidarUbicacion