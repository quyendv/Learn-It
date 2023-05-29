import routeConfig from '~/configs/route';
import { AuthLayout } from '~/layouts';
import { ComingSoon, HomePage, LoginPage, RegisterPage } from '~/pages';

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
    {
        path: routeConfig.contact,
        layout: null,
        component: ComingSoon,
    },
    {
        path: routeConfig.about,
        layout: null,
        component: ComingSoon,
    },
];

export { publicRoutes, privateRoutes };
