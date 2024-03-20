import React, { useState } from 'react'
//Utils:
import { AGREGAR, ASTERISCO, BASES_CONVENIDAS, BLANK_SPACE, COLOR, DIRECCION, EMPTY_STRING, 
  FECHA_DESDE, FECHA_HASTA, FECHA_VIGENCIA_DE_CONVENIO, LOCALIDAD, NO, NOMBRE, SI, TOKEN, 
  VARIANT_BUTTON
} from '../../../../../Utils/const'
//Mui:
import { Divider, Grid, IconButton, TextField, Typography, makeStyles } from '@material-ui/core'
//Components:
import CustomTypography from '../../../../commons/Typography/CustomTypography'
import CustomText from '../../../../commons/TextField/CustomText'
import CustomButton from '../../../../commons/Button/CustomButton'
import CustomTable from '../../../../commons/Table/CustomTable'
import imgDelete from '../../../../../commons/assets/Contrataciones/ProveedorCompleto/General/IconDeleted.svg'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CustomChip from '../../../../commons/Chip/CustomChip'

const useStyles = makeStyles((theme) => ({
  basesBox: {
    border:'1px solid #dadce0',
    borderRadius:'25px', 
    padding:'15px 20px', 
    margin:'10px 0 0 0'
  },
  basesForm: {
    backgroundColor:'rgba(255, 205, 113, 0.25)', 
    padding:'15px 20px', 
    border:'dashed 1px #707070', 
    margin:'5px 0'
  }
}))


const TrasladoPaso2 = ({request, setRequest}) => {
  
  const classes = useStyles()
   
  //Form:
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [localidad, setLocalidad] = useState('')
 
  //Agregar Bases Convenidas
  const addBases = () => {
    setRequest({
      ...request,
      basesConvenidas: [
        ...request.basesConvenidas,
        { nombre, direccion, localidad }
      ]
    })
    setNombre('')
    setDireccion('')
    setLocalidad('')
  }

  //Eliminar Bases Convenidas
  const deleteBases = (row) => {
    setRequest({
      ...request,
      basesConvenidas: request.basesConvenidas.filter(it=>it.nombre !== row.nombre)
    })
  }

  //Tabla Bases Convenidas
  const headerTabla = [
    {
        title: "NOMBRE", field: "nombre",
        cellStyle: { color: '#505050', fontSize: '12px', textAlign: 'left', width: '20%', height: '50px' },
        headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'left' },
    },
    {
        title: "DIRECCIÓN", field: "direccion",
        cellStyle: { color: '#505050', fontSize: '12px', textAlign: 'left', maxWidth: '350px', overflow: 'hidden', textOverflow: "ellipsis" },
        headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'left' },
    },
    {
        title: "LOCALIDAD", field: "localidad",
        cellStyle: { color: '#505050', fontSize: '12px', alignContent: 'center', width: '15%', },
        headerStyle: { color: '#747474', fontSize: '10px', alignContent: 'center' },
    },
    {
        title: "ELIMINAR",
        cellStyle: { color: '#505050', fontSize: '10px', textAlign: 'center', width: '5%' },
        headerStyle: { color: '#747474', fontSize: '10px', textAlign: 'center' },
        render: row => (
            <IconButton onClick={()=> deleteBases(row)}>
                <img style={{ cursor: 'pointer' }} src={imgDelete} />
            </IconButton>
        )
    },
  ]

  return (
    <>
      {/* Bases Convenidas */}
      <Grid container spacing={2} className={classes.basesBox}>
        <Grid item xs={12}>
          <CustomTypography text={BASES_CONVENIDAS} variant='h6' />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container alignItems='center' spacing={2} className={classes.basesForm}>
          <Grid item xs={3}>
            <CustomText
              label={NOMBRE}
              onChange={(e)=>setNombre(e.target.value)}
              value={nombre}
              shrink={true}
              variant={VARIANT_BUTTON.OUTLINED}
              fullwidth={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomText
              label={DIRECCION}
              onChange={(e)=>setDireccion(e.target.value)}
              value={direccion}
              shrink={true}
              variant={VARIANT_BUTTON.OUTLINED}
              fullwidth={true}
            />
          </Grid>
          <Grid item xs={3}>
            <CustomText
              label={LOCALIDAD}
              onChange={(e)=>setLocalidad(e.target.value)}
              value={localidad}
              shrink={true}
              variant={VARIANT_BUTTON.OUTLINED}
              fullwidth={true}
            />
          </Grid>
          <Grid item xs={2} container justify='center'>
            <CustomButton
              size="medium"
              color={COLOR.PRIMARY}
              variant={VARIANT_BUTTON.CONTAINED}
              label={AGREGAR}
              disabled={nombre === EMPTY_STRING || direccion === EMPTY_STRING || localidad === EMPTY_STRING}
              onClik={addBases}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{marginTop:10}}>
          {request.basesConvenidas && request.basesConvenidas.length > 0 ? 
            <CustomTable
              data={request.basesConvenidas}
              columnas={headerTabla}
              verPaginacion={false}
            />  
          : null}
        </Grid>
      </Grid>

      {/* Token */}
      <Grid container style={{marginTop:35}}>
        <Grid item xs={12}>
          <CustomTypography varian='h5' text={TOKEN}/>
        </Grid>
        <Grid item xs={12} container spacing={2} style={{marginTop:10}}>
          <Grid item>
            <CustomChip
              onClick={()=>setRequest({...request, token: true})}
              fontSize={true}
              label={SI}
              avatar={<FiberManualRecordIcon />}
              style={{backgroundColor: 'white', border: request.token ? '3px solid #1473E6' : '1px solid #d3d3d3' }} 
            />
          </Grid>
          <Grid item>
            <CustomChip
              onClick={()=>setRequest({...request, token: false})}
              fontSize={true}
              label={NO}
              avatar={<FiberManualRecordIcon />}
              style={{backgroundColor: 'white', border: !request.token ? '3px solid #1473E6' : '1px solid #d3d3d3' }} 
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Fecha de vigencia */}
      <Grid container style={{marginTop:35}}>
        <Grid item xs={12}>
          <CustomTypography varian={'h5'} text={FECHA_VIGENCIA_DE_CONVENIO}/>
        </Grid>
        <Grid item sx={12} container spacing={2} style={{marginTop:25}}>
          <Grid item>
            <TextField
              id="date"
              label={
                <Typography>
                  {FECHA_DESDE}
                  {BLANK_SPACE}
                  <span style={{color:'red'}}>{ASTERISCO}</span>
                </Typography>
              }
              type="date"
              value={request.fechaDesde}
              onChange={e=>setRequest({...request, fechaDesde: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="date"
              label={FECHA_HASTA}
              type="date"
              value={request.fechaDesde}
              onChange={e=>setRequest({...request, fechaHasta: e.target.value})}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TrasladoPaso2
