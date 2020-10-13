import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoProyectos = () => {

    // Obtener el state de proyectos importando el Context donde se encuentra el state inicial
    // Extraer proyectos del state inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    // Extraer context de alertas
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {

        // Si existe un error
        if(mensaje){
          mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    // Validar si no existen proyectos creados
    if ( proyectos.length === 0 ) return <h3 className="mensaje">No hay proyectos comienza creando uno.</h3>;

    return (
      <ul className="listado-proyectos">
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
        <TransitionGroup>
          {proyectos.map((proyecto) => (
            <CSSTransition
                key={proyecto._id}
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