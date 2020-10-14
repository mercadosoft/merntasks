import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentificacion/authContext';

const RutaPrivada = ({ component: Component, ...props }) => {
    
    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // Agregando la dependencia la app produce un error e informa la usuario 
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !autenticado && !cargando ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
     );
}
 
export default RutaPrivada;