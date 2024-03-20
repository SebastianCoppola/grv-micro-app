import CustomSelect from "../commons/Select/customSelect";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { listarClientes } from "../../redux/actions/listados";
const Cliente = (props) => {
  const {
    titulo,
    fullWidth,
    height,
    isOutline,
    seleccione,
    Clientvalue,
    setClienteValue,
    handleChangeCliente,
    filtros,
    setClienteCodigo,
    disabled,
    clienteDescripcion
  } = props;
 

  const dispatch=useDispatch()
  useEffect(()=>dispatch(listarClientes()),[])
  const data=useSelector(state=>state.listados.clientes)
  useEffect(()=>{
    if(setClienteCodigo){
      setClienteCodigo(data?data.filter(it=>it.codigo===Clientvalue):null)
    }
  },[Clientvalue])
  useEffect(()=> {
    if(clienteDescripcion){
      let clientes = data?data.filter(it=>it.descripcion===clienteDescripcion):null
      setClienteCodigo(clientes[0].codigo)
      setClienteValue(clientes[0].codigo)
    }else{
      setClienteCodigo(null)
      setClienteValue(null)
    }
  },[clienteDescripcion])

  return (
    <CustomSelect
      titulo={titulo}
      fullwidth={fullWidth}
      height={height}
      isOutline={isOutline}
      seleccione={seleccione}
      val={Clientvalue ? Clientvalue : ""}
      data={data && data}
      handleChangeSelect={(e) => handleChangeCliente(e)}
      disabled={disabled}
    />
  );
};

export default Cliente;
