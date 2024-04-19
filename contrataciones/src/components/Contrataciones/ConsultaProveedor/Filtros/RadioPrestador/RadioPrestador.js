import React, { useEffect, useState } from 'react'
//Mui:
import { Grid, FormControlLabel, FormControl, RadioGroup } from '@material-ui/core'
//Components:
import CustomTypography from '../../../../commons/Typography/CustomTypography'
import CustomRadio from '../../../../commons/Radio/CustomRadio'
 
const RadioPrestador = (props) => {

    const { datos, setDatos, consulta, gridRadio, limpiarFiltros } = props

    const [radioContrato, setRadioContrato] = useState('si')
    const [radioAtencion, setRadioAtencion] = useState('todos')
    const [radioServicio, setRadioServicio] = useState('todos')
    const [radioRMN, setRadioRMN] = useState('todos')
    const [radioTAC, setRadioTAC] = useState('todos')
    const [radioREDCSS, setRadioREDCSS] = useState('todos')
    const [radioREDProvart, setRadioREDProvart] = useState('todos')

    useEffect(() => {
        setDatos({
            ...datos,
            'ContratoActivo': true
        })
    }, [])

    useEffect(() => {
        if(limpiarFiltros){
            cleanAll()
        }
    }, [limpiarFiltros])

    const cleanAll = () => {
        setRadioContrato('si')
        setRadioAtencion('todos')
        setRadioServicio('todos')
        setRadioRMN('todos')
        setRadioTAC('todos')
        setRadioREDCSS('todos')
        setRadioREDProvart('todos')
        setDatos({
            ...datos,
            'ContratoActivo': true,
            'primeraAsistencia': null, 
            'redCS': null,
            'redProvart': null,
            'servicio24h': null, 
            'tieneRmn': null,
            'tieneTac': null, 
            'tipoPrestadorMedico': null
        })
    }

    const handleChangeRadioContrato = (event, valor) => {
        setRadioContrato(valor)
        setDatos({             
            ...datos,
            ContratoActivo: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }

    const handleChangeRadioAtencion = (event, valor) => {
        setRadioAtencion(valor)
        setDatos({             
            ...datos,
            primeraAsistencia: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }
    
    const handleChangeRadioServicio = (event, valor) => {
        setRadioServicio(valor)
        setDatos({             
            ...datos,
            servicio24h: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }

    const handleChangeRadioRMN = (event, valor) => {
        setRadioRMN(valor)
        setDatos({             
            ...datos,
            tieneRmn: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }

    const handleChangeRadioTAC = (event, valor) => {
        setRadioTAC(valor)
        setDatos({             
            ...datos,
            tieneTac: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }

    const handleChangeRadioREDCSS = (event, valor) => {
        setRadioREDCSS(valor)
        setDatos({             
            ...datos,
            redCS: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }
    
    const handleChangeRadioREDProvart = (event, valor) => {
        setRadioREDProvart(valor)
        setDatos({             
            ...datos,
            redProvart: valor ==='todos' ? null: valor ==='si' ? true : false
        })
    }
   
    return (
        <Grid item container spacing={2} style={{display:'contents'}}>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6} >
                <CustomTypography text={'Contrato activo'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioContrato}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioContrato(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioContrato(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioContrato(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'Primera atención'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioAtencion}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioAtencion(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioAtencion(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioAtencion(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'Servicio 24hs'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioServicio}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioServicio(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioServicio(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioServicio(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'RMN'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioRMN}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioRMN(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioRMN(event, 'no')}
                        />
                         <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioRMN(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'TAC'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioTAC}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioTAC(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioTAC(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioTAC(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'RED CSS'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioREDCSS}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioREDCSS(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioREDCSS(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioREDCSS(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={consulta && gridRadio ? gridRadio : 6}>
                <CustomTypography text={'RED Provart'} />
                <FormControl component="fieldset" >
                    <RadioGroup style={{ flexDirection: 'row' }} aria-label="gender" name="gender1" value={radioREDProvart}  >
                        <FormControlLabel
                            value={'si'}
                            control={<CustomRadio />}
                            label={'Sí'}
                            onChange={(event) => handleChangeRadioREDProvart(event, 'si')}
                        />
                        <FormControlLabel
                            value={'no'}
                            control={<CustomRadio />}
                            label={'No'}
                            onChange={(event) => handleChangeRadioREDProvart(event, 'no')}
                        />
                        <FormControlLabel
                            value={'todos'}
                            control={<CustomRadio />}
                            label={'Todos'}
                            onChange={(event) => handleChangeRadioREDProvart(event, 'todos')}
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
export default RadioPrestador
