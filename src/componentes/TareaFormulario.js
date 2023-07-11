import {React, useState} from "react";
import '../hojasEstilo/TareaFormulario.css';
import{v4 as uuidv4} from 'uuid';

function TareaFormulario(props){
  const [input, setInput]=useState('');

  const manejarInput=(e)=>{
    setInput(e.target.value);
  }

  function manejarEnvio(e){
    e.preventDefault();
    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false
    }
    document.getElementsByClassName('tarea-input')[0].value='';

    props.onSubmit(tareaNueva);//Metodo que recibo como prop
  }

  return(
    <form className="tarea-formulario" onSubmit={manejarEnvio}>
      <input 
        className="tarea-input" 
        type="text" 
        placeholder="Escribe una Tarea" 
        name="textp" 
        onChange={(e)=>manejarInput(e)} />
      <button className="tarea-boton">Agregar Tarea</button>
    </form>
  );

}

export default TareaFormulario;