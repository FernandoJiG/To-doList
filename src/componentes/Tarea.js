import {useState} from "react";
import React from "react";
import '../hojasEstilo/Tarea.css';
import {AiOutlineCloseCircle} from 'react-icons/ai';


function Tarea({texto, completada, id, completarTarea, eliminarTarea, editarTarea}){
  const [textoEditado, editarTexto]=useState(texto);

  function activateInput(e){
    e.stopPropagation();
    e.target.readOnly=false;
  }

  function editClicked(e){
    e.stopPropagation();
    editarTarea(textoEditado, id);
  }

  return(
    <div className={`tarea-contenedor ${completada ? 'completada':''}`.trimEnd()} onClick={()=>completarTarea(id)}>
      <div className="tarea-texto">
        <input className="textoTarea" readOnly={true} type="text" value={textoEditado} onChange={(e)=>{editarTexto(e.target.value)}} onClick={(e)=>{activateInput(e)}}></input>
      </div>
      <div className="tarea-contenedor-iconos">
        <AiOutlineCloseCircle className="tarea-icono" onClick={()=>eliminarTarea(id)}/>
        <button className="btnEditar" onClick={(e)=>editClicked(e)}>Editar</button>
      </div>
    </div>
  );
}

export default Tarea;