import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routeConfig from '~/configs/route';

function AuthLayout({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Render
    // let loadingJsx;
    // if (authLoading) {
    //     loadingJsx = (
    //         <div className="flex animate-pulse items-center gap-3 text-blue-500">
    //             <FaSpinner className="animate-spin" />
    //             <p className="text-2xl">Loading...</p>
    //         </div>
    //     );
    // } else if (isAuthenticated) {
    //     return <Navigate to={routeConfig.home} />;
    // }

    if (isAuthenticated) return <Navigate to={routeConfig.home} />;

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-auth bg-cover bg-center bg-no-repeat">
            <div className="mb-4 text-center text-white">
                <h1 className="font-berkshireSwash text-5xl">Welcome to Learn-It!</h1>
                <p className="text-lg">Keep track of what you are learning</p>
            </div>
            <>
                {/* {!authLoading ? (
                    children
                ) : (
                    // <div className="flex animate-pulse items-center gap-3 text-blue-500">
                    //     <FaSpinner className="animate-spin" />
                    //     <p className="text-2xl">Loading...</p>
                    // </div>
                    loadingJsx
                )} */}
                {children}
            </>
        </div>
    );
}

export default AuthLayout;
