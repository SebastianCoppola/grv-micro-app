import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import { listarPrestador } from "../../redux/actions/listados"
import CustomSelect from "../commons/Select/customSelect"

const Prestador = (props) => {

	const {
		titulo,
		fullWidth,
		height,
		isOutline,
		seleccione,
		value,
		handleChangePrestador,
		setPrestadorCodigo
	} = props

  	const dispatch=useDispatch()
  
	useEffect(()=>dispatch(listarPrestador()),[])
  	
	const data = useSelector(state=>state.listados.prestador)

	useEffect(()=>{
		if(setPrestadorCodigo){
			setPrestadorCodigo(data?data.filter(it=>it.codigo===value):null)
		}
	},[value])

	return (
		<CustomSelect
			titulo={titulo}
			fullwidth={fullWidth}
			data={data && data}
			height={height}
			isOutline={isOutline}
			seleccione={seleccione}
			val={value}
			handleChangeSelect={(e) => handleChangePrestador(e)}
		/>
	)
}

export default Prestador
