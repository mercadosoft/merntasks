import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {

    // Obtener el state de proyectos importando el Context donde se encuentra el state inicial
    const proyectosContext = useContext(proyectoContext);
    // Extraer proyectos del state inicial
    const { proyectos, obtenerProyectos } = proyectosContext;

    useEffect(() => {
        obtenerProyectos();
        // eslint-disable-next-line
    }, []);

    // Validar si no existen proyectos creados
    if ( proyectos.length === 0 ) return <h3 className="mensaje">No hay proyectos comienza creando uno.</h3>;

    return (
      <ul className="listado-proyectos">
        <TransitionGroup>
          {proyectos.map((proyecto) => (
            <CSSTransition
                key={proyecto.id}
                timeout={500}
                classNames="proyecto"
            >
              <Proyecto proyecto={proyecto} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    );
}
 
export default ListadoProyectos;