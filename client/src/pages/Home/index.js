import { Navigate } from 'react-router-dom';
import routeConfig from '~/routes/config';

function Home() {
    return <Navigate to={routeConfig.login} />;
}

export default Home;
