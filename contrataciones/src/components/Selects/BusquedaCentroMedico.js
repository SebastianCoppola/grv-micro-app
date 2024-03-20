import CustomSelect from "../commons/Select/customSelect";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { listarPrimeraAsistencia } from "../../redux/actions/listados";

const BusquedaCentroMedico = (props) => {
  const {
    titulo,
    fullWidth,
    height,
    style,
    isOutline,
    seleccione,
    value,
    handleChangeCentrosMedicos,
    setCentMedPrimeraAsistenciaCodigo
  } = props;
  const dispatch=useDispatch()
  const data=useSelector(state=>state.listados.primeraAsistencia)
  useEffect(()=>{
    dispatch(listarPrimeraAsistencia())
  },[])
  useEffect(()=>{
    if(setCentMedPrimeraAsistenciaCodigo){
      setCentMedPrimeraAsistenciaCodigo(data?data.filter(it=>it.codigo===value):null)
    }
  },[value])
  return (
    <CustomSelect
      titulo={titulo}
      data={data && data}
      fullwidth={fullWidth}
      height={height}
      style={style}
      isOutline={isOutline}
      seleccione={seleccione}
      val={value}
      handleChangeSelect={(e) => handleChangeCentrosMedicos(e)}
    />
  );
};

export default BusquedaCentroMedico;
