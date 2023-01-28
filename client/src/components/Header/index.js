import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routeConfig from '~/configs/route';
import { logout } from '~/stores/actions/auth';

function Header() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="flex h-headerH items-center gap-4 px-10">
            <Link to={routeConfig.home} className="font-lobster text-4xl text-white">
                Learn It
            </Link>

            <nav className="flex flex-1 justify-center gap-2 text-lg text-white">
                <Link className="px-4 py-2">Home</Link>
                <Link className="px-4 py-2">About</Link>
                <Link className="px-4 py-2">Contact</Link>
            </nav>

            <div className="flex items-center gap-2.5">
                <p className="text-white">
                    Welcome <span className="font-bold text-red-500">{auth.user.username}</span>
                </p>
                <div className="h-8 w-8 rounded-full">
                    <img
                        className="rounded-full object-cover"
                        src="https://avatars.githubusercontent.com/u/80147846?v=4"
                        alt="avatar"
                    />
                </div>
            </div>
            <div
                onClick={() => {
                    dispatch(logout());
                }}
            >
                Logout Temp
            </div>
        </div>
    );
}

export default Header;
