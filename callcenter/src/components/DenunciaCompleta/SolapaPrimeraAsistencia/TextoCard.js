import React from 'react'

const TextoCard = () => {
    return(
        <div>
           <Grid value={datos.nombre} item container alignItems={'center'} spacing={1}>
                        <Grid item xs={4}><img src={icon} /></Grid>
                        <Grid item xs spacing={1} container alignItems='flex-start' direction='column'>
                            <Grid item  xs> <CustomTypography variant={'body2'} fontweight={'600'} text={<strong>{datos.nombre}</strong>} /> </Grid>
                            <Grid item xs><CustomTypography variant={'body2'} text={datos.provincia} /></Grid>
                        </Grid>
                        <Grid item xs={12}><Divider /></Grid>
                        <Grid item xs={12}>  <CustomTypography variant={'body2'} text={datos.direccion} /> </Grid>
                        <Grid item xs={12}>  <CustomTypography variant={'body2'} text={datos.ciudad} /> </Grid>
                        <Grid item xs={12}>  <CustomTypography variant={'body2'} text={`Tel: ${datos.telefono}`} /> </Grid>

                    </Grid>
        </div>
    )
}
export default TextoCard