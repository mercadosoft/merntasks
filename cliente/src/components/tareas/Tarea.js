import React, { useContext } from 'react';
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Tarea = ({tarea}) => {

    // Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual } = tareasContext;

    // Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Aplicamos Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando el usuuario toca el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id); // Filtrar y mostrar las tareas que quedan el en proyecto
    }

    // Funcion que realiza el cambio de estado en una tarea
    const cambiarEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);
    }

    // Agrega una tarea actual cuando el usuario decia editarla 
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                  ? (<button
                        type="button"
                        className="completo"
                        onClick={ () => cambiarEstado(tarea)}
                     >Finalizado</button> 
                    )
                  : (<button
                        type="button"
                        className="incompleto"
                        onClick={ () => cambiarEstado(tarea)}
                     >Pendiente</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea.id)}
                >Eliminar</button>

            </div>
        </li>
     );
}
 
export default Tarea;