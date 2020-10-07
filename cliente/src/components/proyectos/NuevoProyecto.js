import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario importando proyectoContext donde se encuentra el state inicial
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    // state del proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });

    // aplicamos destructiring al proyecto
    const { nombre } = proyecto;

    // Lee los contenidos del input que asignara un nombre al nuevo proyecto
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un nuevo proyecto
    const onSubmitProyecto = e => {
        e.preventDefault(); // para evitar que se genere un accion por default
        
        // Validamos el proyecto
        if( nombre === '' ) {
            mostrarError();
            return;
        }

        // Guadarmos los valores en el state
        agregarProyecto(proyecto);

        // Reiniciar el formulario
        guardarProyecto({
            nombre: ''
        })
        
    }

    // Mostrar formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >Nuevo Proyecto</button>

            { formulario ?
              (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />

                    <input
                        type="submit"
                        className="btn btn-block btn-primario"
                        value="Agregar Proyecto"
                    />
                </form>
              ) : null 
            }

            { errorformulario ? <p className="mensaje error">El nombre de proyecto es obligatorio</p> : null}
        </Fragment>
     );
}
 
export default NuevoProyecto;