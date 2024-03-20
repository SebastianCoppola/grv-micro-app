
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { listarProvincias } from "../../redux/actions/listados"
import CustomSelect from "../commons/Select/customSelect"

const Provincia = (props) => {

    const {
        titulo,
        fullWidth,
        height,
        isOutline,
        seleccione,
        val,
        handleChangeProvincia,
        setProvinciaCodigo
    } = props
    
    const dispatch=useDispatch()
    const data = useSelector(state=>state.listados.provincias)
  
    useEffect(()=>{
        dispatch(listarProvincias())
    },[])

    useEffect(()=>{
        if(setProvinciaCodigo){
            setProvinciaCodigo(data?data.filter(it=>it.codigo===val):null)
        }
    },[val])
    
    return (
        <CustomSelect
            titulo={titulo}
            data={data && data}
            fullwidth={fullWidth}
            height={height}
            isOutline={isOutline}
            seleccione={seleccione}
            handleChangeSelect={(e) => handleChangeProvincia(e)}
            val={val}
        />
    )
}

export default Provincia
