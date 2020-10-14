import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTareas = () => {

    // Obtener si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener states y funciones del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detacta si hay una tarea seleccionada 
    useEffect(() => {
        if (tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada])


    // State del formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    // extraer nombre del la tarea
    const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Aplicamos Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handdleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if ( nombre.trim() === '' ){
            validarTarea();
            return;
        }

        // Validar si es una tarea para editar o agregar 
        if ( tareaseleccionada === null ){
            // Agregar la tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualiza tarea existente
            actualizarTarea(tarea);

            // Elimina tarea seleccionada
            limpiarTarea();
        }

        
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // Reiniciar el form
        guardarTarea({
            nombre: ''
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handdleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errortarea ? <p className="mensaje error">El nombre de la tarea es requerido</p> : null }
        </div>
     );
}
 
export default FormTareas;