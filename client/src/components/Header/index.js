import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import routeConfig from '~/configs/route';
import { logout } from '~/stores/actions/auth';
import UserMenu from '../UserMenu';

function Header() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="flex h-headerH items-center gap-8 px-5 md:px-10">
            <Link to={routeConfig.home} className="logo font-lobster text-4xl text-white transition lg:text-5xl">
                Learn It
            </Link>

            <nav className="hidden flex-1 justify-start gap-2 text-lg font-bold uppercase text-white md:flex">
                <NavLink
                    to={routeConfig.home}
                    end
                    className={({ isActive }) =>
                        `rounded-md px-3 py-2 transition-all ${isActive ? 'text-red-500' : 'hover:opacity-70'}`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to={routeConfig.about}
                    end
                    className={({ isActive }) =>
                        `rounded-md px-3 py-2 transition-all ${isActive ? 'text-red-500' : 'hover:opacity-70'}`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to={routeConfig.contact}
                    end
                    className={({ isActive }) =>
                        `rounded-md px-3 py-2 transition-all ${isActive ? 'text-red-500' : 'hover:opacity-70'}`
                    }
                >
                    Contact
                </NavLink>
            </nav>

            <div className="ml-auto flex items-center gap-2 text-lg text-white">
                <p className="space-x-2">
                    <span className="hidden select-none font-medium min-[400px]:inline-block">Welcome</span>
                    <span className="font-bold italic text-red-500">{auth.user.username}</span>
                </p>
                {/* UserDropdown: show & md:hidden */}
                <UserMenu />

                {/* hidden & md:show */}
                <span className="hidden h-10 w-0.5 bg-gray-300 md:block"></span>
                <button
                    className="hidden items-center gap-1 font-medium transition-all hover:-translate-y-1 hover:opacity-80 md:flex"
                    onClick={() => dispatch(logout())}
                >
                    <span>
                        <BiLogOut size={20} />
                    </span>
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
