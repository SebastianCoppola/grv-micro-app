import React from "react"
import PropTypes from "prop-types"
//Redux:
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../redux/actions/index"
//Componentes:
import AutoSuggest from "../commons/Autosuggest/Autosuggest"
import MultipleAutocomplete from "../commons/Autosuggest/MultipleAutocomplete"
//Utils:
import { DIAGNOSTICO_CIE10_NO_ENCONTRADO, SUGERENCIA_BUSQUEDA_NOMBRE } from "../../Utils/const"

const DiagnosticoCIE10 = (props) => {
  	const {
		valueDiagnosticoCie10,
		setValueDiagnosticoCie10,
		denuncia,
		setDataDiagnosticoCie10,
		error,
		label,
		tipoBusqueda,
		multiple,
		style,
		referencia,
		esFiltro,
		variant,
		disableEdition
  	} = props

	const [seleccionado, setSeleccionado] = React.useState(false)
	const [opciones, setOpciones] = React.useState([])

	const dispatch = useDispatch()
	const data1 = useSelector((state) => state.listados.diagnosticoCIE10)
	const data2 = useSelector((state) => state.listados.diagnosticoCIE10_2)
	const data3 = useSelector((state) => state.listados.diagnosticoCIE10_3)
	const loadingAutosuggestDiagnosticoCIE10 = useSelector(state=>state.listados.loadingAutosuggestDiagnosticoCIE10)
  	const loadingAutosuggestDiagnosticoCIE10_2 = useSelector(state=>state.listados.loadingAutosuggestDiagnosticoCIE10_2)
  	const loadingAutosuggestDiagnosticoCIE10_3 = useSelector(state=>state.listados.loadingAutosuggestDiagnosticoCIE10_3)
  	const errorAutosuggestDiagnosticoCIE10 = useSelector(state=>state.listados.errorAutosuggestDiagnosticoCIE10)
  	const errorAutosuggestDiagnosticoCIE10_2 = useSelector(state=>state.listados.errorAutosuggestDiagnosticoCIE10_2)
  	const errorAutosuggestDiagnosticoCIE10_3 = useSelector(state=>state.listados.errorAutosuggestDiagnosticoCIE10_3)

	const onInput = (value) => {
		dispatch(actions.searchDiagnosticoCIE10(value, tipoBusqueda))
	}

	const mapDiagnosticoCIE10 =
		tipoBusqueda === 0 ? data1 && data1.map((data) => { return data })
			: tipoBusqueda === 1 ? data2 && data2.map((data) => { return data })
			: tipoBusqueda === 2 && data3 && data3.map((data) => { return data })

	if (tipoBusqueda === 0 && data1 && setDataDiagnosticoCie10) {
    	setDataDiagnosticoCie10(data1)
  	}

	if (tipoBusqueda === 1 && data2 && setDataDiagnosticoCie10) {
    	setDataDiagnosticoCie10(data2)
  	}

	if (tipoBusqueda === 2 && data3 && setDataDiagnosticoCie10) {
    	setDataDiagnosticoCie10(data3)
  	}

	return (
		<>
			{multiple ?
				<MultipleAutocomplete
					onInput={onInput}
					minType={3}
					setSeleccionado={setSeleccionado}
					label={"Diagnostico Cie 10"}
					shrink={true}
					opciones={opciones}
					setOpciones={setOpciones}
					nombreVariable={"descripcion"}
					style={style}
					inputRef={referencia}
					disabledAutosuggest={disableEdition}
				/>
			 :
				<AutoSuggest
					onInput={onInput}
					minType={3}
					list={mapDiagnosticoCIE10}
					setSeleccionado={setSeleccionado}
					valueAutoSuggest={valueDiagnosticoCie10}
					setValueAutoSuggest={setValueDiagnosticoCie10}
					textoSugerencia={SUGERENCIA_BUSQUEDA_NOMBRE}
					textoError={DIAGNOSTICO_CIE10_NO_ENCONTRADO}
					label={label}
					shrink={true}
					opciones={opciones}
					valueDiagnostico={true}
					setOpciones={setOpciones}
					esFiltro={esFiltro}
					denuncia={denuncia}
					nombreVariable={"descripcion"}
					loading={
						tipoBusqueda === 0
						? loadingAutosuggestDiagnosticoCIE10
						: tipoBusqueda === 1
						? loadingAutosuggestDiagnosticoCIE10_2
						: tipoBusqueda === 2
						? loadingAutosuggestDiagnosticoCIE10_3
						: false
					}
					error={
						tipoBusqueda === 0
						? errorAutosuggestDiagnosticoCIE10
						: tipoBusqueda === 1
						? errorAutosuggestDiagnosticoCIE10_2
						: tipoBusqueda === 2
						? errorAutosuggestDiagnosticoCIE10_3
						: false
					}
					errorLoc={!esFiltro ? (!valueDiagnosticoCie10 || error) : error}
					variant={variant}
					disabledAutosuggest={disableEdition}
				/>
			}
		</>
	)
}

DiagnosticoCIE10.propTypes = {
	valueDiagnosticoCie10: PropTypes.string,
	setValueDiagnosticoCie10: PropTypes.func,
	denuncia: PropTypes.object,
	setDataDiagnosticoCie10: PropTypes.func,
	error: PropTypes.bool,
	label: PropTypes.string,
	tipoBusqueda: PropTypes.number,
	multiple: PropTypes.bool,
	style: PropTypes.object,
	referencia: PropTypes.element,
	esFiltro: PropTypes.bool,
	variant: PropTypes.string,
	disableEdition: PropTypes.bool
}

export default DiagnosticoCIE10
