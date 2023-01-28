import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routeConfig from '~/configs/route';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return <>{isAuthenticated ? children : <Navigate to={routeConfig.login} />} </>;
}

export default ProtectedRoute;
