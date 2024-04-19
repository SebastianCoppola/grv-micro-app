import { Grid } from "@material-ui/core";
import React from "react";
import CustomText from "../../../commons/TextField/CustomText";

const AlarmaCortoPunzante = (props) => {
    const { selectedHoraValidacion, denuncia, valExtraccionista, selectedHoraExtraccion,
    handleHoraValidacion, textoHora, valuePlaceholder,value, valueHelperText,
    endAdornment, id, border, handleChange,defaultValue, disableEdition } = props
    return (
        <>
            <Grid item xs={4} style={{ height: '20%' }}>
                <span style={{ fontSize: '13px' }}>{textoHora}</span>
                <CustomText
                    label={''}
                    defaultValue={defaultValue}
                    value={value}
                    // defaultValue={selectedHoraValidacion && Utils.time24h(selectedHoraValidacion) === 'Invalid date' ? Utils.hora(selectedHoraValidacion, 0, 2, 2, 5, 0) : Utils.hora(selectedHoraValidacion, 16, 18, 18, 21, 0)}
                    type={'time'}
                    shrink={true}
                    disabled={denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaValidacion || (disableEdition)}
                    id={id}
                    variant='outlined'
                    fullwidth={true}
                    width={'100%'}
                    border={border}
                    placeholder={valuePlaceholder}
                    onChange={(event) => handleChange(event)}
                    helperText={valueHelperText && id==='horaExtraccion' ? <div style={{ backgroundColor: 'none', color: 'red' }}>Campo Requerido</div> : valueHelperText}
                    endAdornment={endAdornment}
                />
            </Grid>
        </>
    )
}
export default AlarmaCortoPunzante