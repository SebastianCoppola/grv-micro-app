import React, { useEffect, useState } from "react"
//Redux:
import { useDispatch } from "react-redux"
import * as actions from "../../../redux/actions/index"
//Mui:
import { Grid, makeStyles } from "@material-ui/core"
import { Add, NotificationsOff } from "@material-ui/icons/"
//Componentes:
import CustomPeriodo from "../../../components/commons/DatePickerPeriodo/CustomPeriodo"
import CustomButton from "../../../components/commons/Button/CustomButton"
import Operadores from "../../../components/Selects/Operadores"
import EstadoTraslado from "../../../components/Selects/EstadoTraslado"
import Utils from "../../../Utils/utils"

const useStyles = makeStyles({
	contenedor: {
        borderRadius: 5,
        boxShadow: '0 4px 8px 0 rgba(37, 38, 94, 0.1)',
        padding: '10px 20px 30px 20px',
        margin: '0 0 0 0',
        margin: 'auto',
	}
})

const FiltrosTraslado = (props) => {

	const { handleButton, disableEdition, denuncia, rowsPerPage, page, handleApagarAlarma, actualizarData } = props
  
	const classes = useStyles()
	const dispatch = useDispatch()

	const [fechaDesde, setFechaDesde] = useState(denuncia?.fechaCreacion ?? new Date())
	const [fechaHasta, setFechaHasta] = useState(
		Utils.datesAreEqual(denuncia?.fechaCreacion, new Date()) 
		? Utils.sumarDias(new Date(denuncia?.fechaCreacion), 1)
		: new Date()	
	)
	const [operador, setOperador] = useState('')
	const [estadoCEM, setEstadoCEM] = useState('')

	useEffect(()=>{

		buscarTraslados()

	},[fechaDesde, fechaHasta, operador, estadoCEM, rowsPerPage, page, actualizarData])

	const buscarTraslados = () => {
		const request = {
			fechaTurnoInicio: fechaDesde ?? null,
			fechaTurnoFin: fechaHasta ?? null,
			estadoCem: estadoCEM ?? null,
			idResponsable: operador ?? null,
			limit: rowsPerPage,
			offset: page * rowsPerPage,
			idDenuncia: denuncia?.idDenuncia,
		}
		dispatch(actions.searchtTrasladosCompleto(request))
	}

    const tieneAlarma = () => {
        let alarmaAmbulancia = false
        denuncia && denuncia.alarmas && denuncia.alarmas.length > 0 
            && denuncia.alarmas.map((it) => {
                it.codigo === 3 ? alarmaAmbulancia = true : alarmaAmbulancia = false
            })
        return alarmaAmbulancia
    }

	return (
		<Grid container justify='space-between' className={classes.contenedor}>
			<Grid item xs={8} container alignItems='flex-end' justify='flex-start' spacing={2}>
				<Grid item style={{width:'270px'}}>
					<CustomPeriodo
						label='Periodo de Carga'
						fontSize='13px'
						selectedDesde={fechaDesde}
						setSelectedDesde={setFechaDesde}
						selectedHasta={fechaHasta}
						setSelectedHasta={setFechaHasta}
						minDate={denuncia?.fechaCreacion ?? new Date()}
					/>
				</Grid>
				<Grid item>
					<Operadores
						val={operador}
						handleChangeSelect={ e => setOperador(e.target.value) }
						titulo={"Operadores"}
						placeholder={"Seleccionar"}
						isOutline={true}
						variant={"body2"}
						fontSize={"13px"}
						seleccione={true}
					/>
				</Grid>
				<Grid item>
					<EstadoTraslado
						val={estadoCEM}
						handleChangeSelect={ e => setEstadoCEM(e.target.value) }
						titulo='Estado CEM'
						placeholder={"Seleccionar"}
						fullwidth={true}
						seleccione={true}
						isOutline={true}
						fontSize={"13px"}
					/>
				</Grid>
			</Grid>
			<Grid item xs={4} container alignItems='flex-end' justify='flex-end' spacing={2}>
				<Grid item>
					<CustomButton
						label='Traslado'
						variant='contained'
						isAction={true}
						color='primary'
						startIcon={<Add htmlColor='white' />}
						onClik={handleButton}
						disabled={disableEdition}
					/>
				</Grid>
				<Grid item>
					{ tieneAlarma() &&
						<CustomButton
							label='Apagar alarma'
							variant='contained'
							isAction={true}
							startIcon={<NotificationsOff />}
							onClik={handleApagarAlarma}
						/>
					}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default FiltrosTraslado


