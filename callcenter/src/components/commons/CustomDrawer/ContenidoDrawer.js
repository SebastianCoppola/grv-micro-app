import React from 'react'
import CustomButton from '../Button/CustomButton';
import { Grid } from '@material-ui/core';


const ContenidoDrawer = (props) => {
    const { botonSiguiente, botonSiguienteLabel, botonSiguienteDisabled, botonSiguienteVariant, handleSiguiente,
        botonCancelar, botonCancelarLabel, botonCancelarDisabled, botonCancelarVariant, handleCancelar,
        botonBack, botonBackLabel, botonBackDisabled, botonBackVariant, handleBack,
        botonCuarto, botonCuartoLabel, botonCuartoDisabled, botonCuartovariant, handleCuarto,
        contenido } = props

    return (
        <>
            {contenido !== null || contenido !== undefined ?
                <Grid container direction='column' justify='space-between' style={{ width: '100%', minHeight: '110%' }}>
                    <Grid item container xs={12}>
                        {contenido && contenido.texto ? contenido.texto : null}
                    </Grid>
                    <Grid item container xs={12} style={{ marginTop: "100px" }}>
                        <Grid item xs={4}>
                            {botonBack ? 
                                <CustomButton
                                    label={botonBackLabel}
                                    disabled={botonBackDisabled}
                                    variant={botonBackVariant}
                                    onClik={handleBack}
                                    isAction={true}
                                    //size="small"
                                />
                                : null
                            }
                        </Grid>
                        <Grid  item xs={8} container justify='flex-end' spacing='2'>
                            {botonCuarto ?
                                <Grid item>
                                    <CustomButton
                                        label={botonCuartoLabel}
                                        disabled={botonCuartoDisabled}
                                        variant={botonCuartovariant}
                                        onClik={handleCuarto}
                                        isAction={true}
                                        //size="small"
                                    />
                                </Grid>
                                : null
                            }
                            {botonCancelar ?
                                <Grid item>
                                    <CustomButton
                                        label={botonCancelarLabel}
                                        disabled={botonCancelarDisabled}
                                        variant={botonCancelarVariant}
                                        onClik={handleCancelar} 
                                        isAction={true}
                                        //size="medium"
                                    />
                                </Grid>
                                : null
                            }
                            { botonSiguiente ? 
                                <Grid item>
                                    <CustomButton
                                        label={botonSiguienteLabel}
                                        disabled={botonSiguienteDisabled}
                                        variant={botonSiguienteVariant}
                                        onClik={handleSiguiente}
                                        isAction={true}
                                        //size="medium"
                                        color='primary'
                                    />
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                : null
            }
        </>
    )
}

export default ContenidoDrawer