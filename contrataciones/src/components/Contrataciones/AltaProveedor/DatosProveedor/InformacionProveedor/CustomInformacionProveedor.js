import React, { useEffect } from 'react'
//material-ui
import Grid from '@material-ui/core/Grid';
import CustomChip from '../../../../commons/Chip/CustomChip';
import Utils from '../../../../../Utils/utils';
const CustomInformacionProveedor = (props) => {
    const { valChip, onClickChip, item } = props
    
    return (

            <Grid item container spacing={ 1}>
                {valChip && valChip.map((it) => {
                    return (
                        <Grid item xss >
                            <CustomChip
                                fontSize={true}
                                label={Utils.capitalize(it.descripcion)}
                                variant={'outlined'}
                                onClick={(event,) => onClickChip(event, it.codigo)}
                                style={it && it.verificado ? { border: '2px solid blue' } : null}
                            />
                        </Grid>
                    )
                })}
            </Grid>

    )
}
export default CustomInformacionProveedor
