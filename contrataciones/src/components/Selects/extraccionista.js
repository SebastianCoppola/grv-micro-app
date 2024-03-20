import React, { useEffect } from 'react'
//Redux:
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions/index'
//Components:
import CustomSelect from '../commons/Select/customSelect'
	
const Extraccionista = props => {

    const { handleChangeSelectExtraccionista, valExtraccionista, error, helperTextSelect, denuncia, disableEdition } = props
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.listados.extraccionista)

    useEffect(() => {
	    dispatch(actions.searchExtraccionista())
	}, [])
	
	const mapExtraccionista = data.map(data => { 
        return {
            descripcion: data.descripcion,
            codigo: data.codigo,
        }
    })
    
    return (
        <CustomSelect
            titulo='Extraccionista'
            data={mapExtraccionista && mapExtraccionista }
            val={valExtraccionista ? valExtraccionista : "" }
            handleChangeSelect={(event) => handleChangeSelectExtraccionista(event)}
            disabled={denuncia && denuncia.cortopunzante && denuncia.cortopunzante.horaValidacion || (disableEdition)}
            error={error}
            helperTextSelect={helperTextSelect}
            seleccione={true}
            variant={'outlined'}
            height='42px'
            estilo={true}
            fullwidth={true}
	    />
	)
}

export default Extraccionista