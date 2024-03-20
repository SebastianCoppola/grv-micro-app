import React from "react";
import ReactDOM from "react-dom";
import Collapse from "@kunukn/react-collapse";
import Down from "./down";
//estilos
import  "./style.scss";
//componentes
import SeccionDatosPaciente from "../../Form/Secciones/DatosDelPaciente/SeccionDatosPaciente";
import SeccionTrabajo from "../../Form/Secciones/DatosLugarTrabajo/SeccionTrabajo";
import DatosDenuncia from "../../Form/Secciones/DatosDenuncia/DatosDenuncia";
import DatosPersonales from "../../Form/Secciones/DatosDelPaciente/datosPersonales";

const initialState = [false, false, false];
function reducer(state, { type, index }) {
  switch (type) {
    case "expand-all":
      return [true, true, true, true];
    case "collapse-all":
      return [false, false, false, false];
    case "toggle":
      state[index] = !state[index];
      return [...state];

    default:
      throw new Error();
  }
}

function Block({ isOpen, title, onToggle, children }) {
  return (
    <div className="block">
      <button className="btn toggle" onClick={onToggle}>
        <span>{title}</span>
        <Down isOpen={isOpen} />
      </button>
      <Collapse layoutEffect isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  );
}

const Acordion2 = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [editar, setEditar] = React.useState(false)
  return (
    <div className="app">
      {/* <header>
        <button
          onClick={() => dispatch({ type: "expand-all" })}
          disabled={state.every(s => s === true)}
        >
          Expand all
        </button>
        <button
          onClick={() => dispatch({ type: "collapse-all" })}
          disabled={state.every(s => s === false)}
        >
          Collapse all
        </button>
         */}
      {/* </header> */}

      <Block
        title="Datos Personales"
        isOpen={state[0]}
        onToggle={() => dispatch({ type: "toggle", index: 2 })}
      >
        <div className="content">
          <DatosPersonales datosAccidentado={datosAccidentado} editar={editar}/>
        </div>
      </Block>

      <Block
        title="Your details"
        isOpen={state[1]}
        onToggle={() => dispatch({ type: "toggle", index: 1 })}
      >
        <div className="content">
          <SeccionTrabajo datosAccidentado={datosAccidentado} denuncia={true} editar={editar}/>
        </div>
      </Block>

      {/* <Block
        title="Handling instructions"
        isOpen={state[2]}
        onToggle={() => dispatch({ type: "toggle", index: 2 })}
      >
        <div className="content">
          <p>Paragraph of text.</p>
          <p>Another paragraph.</p>
          <p>Other content.</p>
        </div>
      </Block> */}

      <p>Some content below the collapsibles.</p>
    </div>
  );
}
export default Acordion2
const datosAccidentado = 
    { nombre: 'HERRERA JORGE DANIEL', 
    dni: '24974189', 
    edad: '64', sexo: 'Masculino', cuil:'20249741893', 
    fechaNacimiento: '13/07/1972', 
    estadoCivil:'Soltero', nacionalidad: 'Argentino', 
    domicilio:'Nahuel Huapi 2314, piso 9 depto. 5 CCiudad Autónoma de Buenos Aires - CABA CP: 1431',
    ascensor:'si', celular:'911 93148754', whatsapp:'si', telefono: '1121874587',otroTelefono:'1161424514',
    email:'fernando.medina@gmail.com.ar',
    provincia:'Provincia de Mendoza',
    localidad:'Los Árboles Caidos',
    calle:'Pacheco',
    numero:'2874',
    piso:'3',
    depto:'C',
    codigoPostal:'4581',
    apellido:'HERRERA',
    nombres:'JORGE DANIEL',
    ocupacion:'Otros trabajadores de servicios personales a particulares. No clasificados bajo otro',
    fechIngreso:'03/03/2021',
    telefonoLaboral:1165478142,
    horarioDesde:'18:00 hs',
    horarioHasta:'24:00 hs',
    horarioLaboral:'22:00 a 6:00hs',
    tareaDuranteAccidente:'Otros trabajadores de servicios personales a particulares. No clasificados bajo otro',
    tipoSede:'Central Gobierno de la Provincia de Mendoza',
    sede:'Centro de logística del Ministerio de Salud',
    direccionSedeLaboral:'Videla Castillo 2961 (MENDOZA - MENDOZA - MENDOZA)',
    localidadSedeLaboral: 'MENDOZA - MENDOZA',
    codigoPostalSedeLaboral:'5500',
    direccionCompletaSedeLaboral:'Alvarez Thomas 4567. Ciudad Autónoma de Buenos Aires. CABA - Cód Postal: 1457  '

    }