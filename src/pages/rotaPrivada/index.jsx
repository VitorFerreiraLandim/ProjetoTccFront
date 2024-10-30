import { Navigate } from 'react-router-dom';

const RotaPrivada = ({ children }) => {
    const autenticar = !!localStorage.getItem('USUARIO'); 

    return autenticar ? children : <Navigate to="/" />;
};

export default RotaPrivada;
