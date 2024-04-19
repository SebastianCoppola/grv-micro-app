import React from "react"
//Mui:
import { Grid } from "@material-ui/core"
//Componentes:
import CustomText from "../../commons/TextField/CustomText"
import CustomTypography from "../../commons/Typography/CustomTypography"

const FormNuevoSiniestroMultiple = (props) => {

    const {textoSiniestroMultiple, setTextoSiniestroMultiple,
        descripcionSiniestroMultiple, setDescripcionSiniestroMultiple } = props

    const onChangeTituloCausa = (event) => {
        setTextoSiniestroMultiple(event.target.value)
    }
    const onChangeDescripcionCausa = (event) => {
        setDescripcionSiniestroMultiple(event.target.value)
    }

    return(
        <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12}>
                <CustomTypography
                    text={<strong> Crear una nueva causa </strong>}
                    variant="subtitle2"
                    fontweight="600"
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    label={'Título de la causa'}
                    id={'tituloCausa'}
                    shrink={true}
                    fullwidth={true}
                    value={textoSiniestroMultiple}
                    onChange={onChangeTituloCausa}
                    maxCaracteres={50}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomText
                    label={'Descripción'}
                    id={'descripcion'}
                    shrink={true}
                    fullwidth={true}
                    value={descripcionSiniestroMultiple}
                    onChange={onChangeDescripcionCausa}
                    multiline={2}
                    maxCaracteres={500}
                />
            </Grid>
        </Grid> 
    )
}

export default FormNuevoSiniestroMultiple