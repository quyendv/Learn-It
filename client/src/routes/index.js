import routeConfig from '~/configs/route';
import { AuthLayout } from '~/layouts';
import { HomePage, LoginPage, RegisterPage } from '~/pages';

const publicRoutes = [
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

const privateRoutes = [
    {
        path: routeConfig.home,
        layout: null,
        component: HomePage,
    },
];

export { publicRoutes, privateRoutes };
