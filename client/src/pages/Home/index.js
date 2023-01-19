import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routeConfig from '~/configs/route';

function Home() {
    const auth = useSelector((state) => state.auth);
    return auth.accessToken ? <div>Home</div> : <Navigate to={routeConfig.login} />;
}

export default Home;
