import {React, useState, useEffect} from "react";
import TareaFormulario from "./TareaFormulario";
import '../hojasEstilo/ListaDeTareas.css';
import Tarea from "./Tarea";

function ListaDeTareas(){
  const [tareas, setTareas]=useState([]);

  useEffect(()=>{
    pedirDatos()
  },[])


  function agregarTarea(tarea){
    if (tarea.texto.trim()){
      tarea.texto=tarea.texto.trim();
      
      const requestOptions = {
        method: "POST",//TO CREATE ELEMENT
        headers: { "Accept":"application/json", "Content-Type": "application/json"},
        body: JSON.stringify(tarea)
      };

      fetch("http://[::1]:3000/homeworks", requestOptions)
      .then((response)=> pedirDatos())
      .catch((error) => console.log("error", error));
    }
  }

  function pedirDatos(){
    fetch("http://localhost:3000/homeworks", {method: "GET"})
      .then((response) => response.json())
      .then((result) => setTareas(result))
      .catch((error) => console.log("error", error));
  }

  function completarTarea(id){
    const tareasCompletadas=tareas.map(tarea=>{
      if(tarea.id===id){
        tarea.completada = !tarea.completada;
        console.log(tarea.completada);
        const patchConfig={
          method:"PATCH",//TO UPDATE A SINGLE FEATURE
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({"completada": tarea.completada})
        }
        fetch("http://localhost:3000/homeworks/"+id, patchConfig)
      }
      return tarea;//importante
    });
    
    setTareas(tareasCompletadas);
  }

  function eliminarTarea(id){
    const tareasActualizadas = tareas.filter(tarea=>tarea.id!==id);
    fetch("http://localhost:3000/homeworks/"+id, {method: "DELETE"})
    .then(() => setTareas(tareasActualizadas))
    .catch((error) => console.log("error", error));
  }
  
  function editarTarea(nuevoNombre, id){
    const patchConfig={
      method:"PATCH",//TO UPDATE A SINGLE FEATURE
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"texto": nuevoNombre})
    };
    fetch("http://localhost:3000/homeworks/"+id, patchConfig)
    .then((response)=>pedirDatos())
    .catch((error)=>console.log("error", error))
  }
  return(
    <>
      <TareaFormulario onSubmit={agregarTarea}/>{/*Como estamos usando los 'Fragmentos que son las etiquetas vacias, no se agrega ningun contenedor lo que perimite que nuestras propiedades css funcionen como esperado.'*/}
      <div className="tareas-lista-contenedor">
        {
          tareas.map((tarea)=>/*Generamos la lista de elementos con la propiedad con estado y map*/
            <Tarea
              /*key={index} A well-chosen key provides more information than the position within the array. Even if the position changes due to reordering, the key lets React identify the item throughout its lifetime.*/
              key= {tarea.id}//Key no se pasa como prop solo sirve para react pues estamos retornndo una lista de elementos.
              id={tarea.id}
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea}
              editarTarea={editarTarea}
            />
          )
        }
      </div>
    </>
  );
}

export default ListaDeTareas;