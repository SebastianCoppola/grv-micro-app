import React, { useState } from 'react'
//Mui:
import { Grid, makeStyles } from '@material-ui/core'
//Components:
import CustomText from '../../commons/TextField/CustomText'
import CustomTypography from '../../commons/Typography/CustomTypography'
import InformacionPreDenuncia from './InformacionPreDenuncia'

const useStyles = makeStyles({
    title: {
        color: '#505050',
        fontSize: '17px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        textAlign: 'left',
    }
})

const AnularPreDenuncia = props => {
    const { data, dataInfo, setValMensaje, valMensaje } = props
    const classes = useStyles(props)
    const [verificacionMensaje, setVerificacionMensaje] = useState(false)

    const onChangeMensaje = (event) => {
        setValMensaje(event.target.value)
        if (event.target.value === "" || event.target.value === null) {
            setVerificacionMensaje(true)
        } else {
            setVerificacionMensaje(false)
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <InformacionPreDenuncia dataInfo={dataInfo} data={data} />
                <Grid item xs={12}>
                    <CustomTypography text={'Observaciones'} className={classes.title} />
                </Grid>
                <Grid item xs={12}>
                    <CustomText
                        id={'Mensaje'}
                        shrink={true}
                        error={verificacionMensaje}
                        fullwidth={true}
                        value={valMensaje}
                        onChange={(event) => onChangeMensaje(event)}
                        multiline={true} 
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default AnularPreDenuncia