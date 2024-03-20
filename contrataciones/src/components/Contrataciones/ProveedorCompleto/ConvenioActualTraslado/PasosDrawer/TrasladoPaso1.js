import React from 'react'
//Mui:
import { Grid } from '@material-ui/core'
//Components:
import CustomChip from '../../../../commons/Chip/CustomChip'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import MontoFijo from './componentsPaso1/MontoFijo'
import Zona from "./componentsPaso1/Zona"
import { MONTO_FIJO, VALOR_ZONA } from '../../../../../Utils/const'

const TrasladoPaso1 = ({ request, setRequest }) => {
  
  return (
    <Grid container>

      {/* Chips para activar Acordiones: */}
      <Grid item xs={12} style={{display:'flex', margin:'20px 0 0 0'}}>
        <CustomChip
          onClick={()=>setRequest({...request, isMontoFijo: !(request.isMontoFijo)})}
          fontSize={true}
          label={MONTO_FIJO}
          avatar={<FiberManualRecordIcon />}
          style={{border: request.isMontoFijo ? '3px solid #1473E6' : '1px solid #d3d3d3', backgroundColor: 'white'}} 
        />
        <CustomChip
          onClick={()=>setRequest({...request, isValorZona: !(request.isValorZona)})}
          fontSize={true}
          label={VALOR_ZONA}
          avatar={<FiberManualRecordIcon />}
          style={{border: request.isValorZona ? '3px solid #1473E6' : '1px solid #d3d3d3', backgroundColor: 'white', marginLeft: 5}} 
        />
      </Grid>

      {/* Acordiones: */}
      <Grid item xs={12}>
        { request.isMontoFijo && <MontoFijo request={request} setRequest={setRequest} /> }
        { request.isValorZona && <Zona request={request} setRequest={setRequest} /> }
      </Grid>

    </Grid>
  )
}

export default TrasladoPaso1

