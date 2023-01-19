import routeConfig from '~/configs/route';
import { AuthLayout } from '~/layouts';
import { HomePage, LoginPage, RegisterPage } from '~/pages';

const routes = [
    {
        path: routeConfig.home,
        layout: null,
        component: HomePage,
    },
    {
        path: routeConfig.login,
        layout: AuthLayout,
        component: LoginPage,
    },
    {
        path: routeConfig.register,
        layout: AuthLayout,
        component: RegisterPage,
    },
];

export default routes;
