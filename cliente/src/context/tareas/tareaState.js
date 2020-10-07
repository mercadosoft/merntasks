import React, { useReducer } from 'react';
import { v4 as uuid } from "uuid";

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = props => {

    const initialState = {
      tareas: [
        { id: 1, nombre: "Elegir plataforma", estado: true, proyectoId: 1 },
        { id: 2, nombre: "Elegir colores", estado: false, proyectoId: 2 },
        { id: 3, nombre: "Elegir formas de pago", estado: true, proyectoId: 3 },
        { id: 4, nombre: "Elegir hosting", estado: false, proyectoId: 1 },
        { id: 5, nombre: "Elegir plataforma", estado: true, proyectoId: 3 },
        { id: 6, nombre: "Elegir colores", estado: false, proyectoId: 1 },
        { id: 7, nombre: "Elegir formas de pago", estado: true, proyectoId: 2 },
        { id: 8, nombre: "Elegir hosting", estado: false, proyectoId: 2 },
      ],
      tareasproyecto: null,
      errortarea: false,
      tareaseleccionada: null
    };

    // Crear dispatch y state
    const [ state, dispatch ] = useReducer(TareaReducer, initialState);

    // Crear funciones de tareas

    // Obtener tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {

        // Asignar un id a la tarea en caso que no sea un string vacio o exista
        tarea.id = uuid();

        // Insertar una tarea al state
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    // Valida y muestra un error al agregar una nueva tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar una tarea 
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    // Cambio del estado de la tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    // Extrae una tarea para la edicion 
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    // Editar o modificar una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    // Eliminar la tarea seleccionada 
    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }


    return (
      <TareaContext.Provider
        value={{
          tareas: state.tareas,
          tareasproyecto: state.tareasproyecto,
          errortarea: state.errortarea,
          tareaseleccionada: state.tareaseleccionada,
          obtenerTareas,
          agregarTarea,
          validarTarea,
          eliminarTarea,
          cambiarEstadoTarea,
          guardarTareaActual,
          actualizarTarea,
          limpiarTarea,
        }}
      >
        {props.children}
      </TareaContext.Provider>
    );

}

export default TareaState;