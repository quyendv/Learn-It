import HeadlessTippy from '@tippyjs/react/headless';
import { useRef } from 'react';
import { BiCaretDown, BiHome, BiInfoCircle, BiLogOut } from 'react-icons/bi';
import { MdContactPage } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import routeConfig from '~/configs/route';
import { logout } from '~/stores/actions/auth';

const userMenu = [
    {
        name: 'Home',
        path: routeConfig.home,
        icon: <BiHome size={24} />,
    },
    {
        name: 'About',
        path: routeConfig.about,
        icon: <BiInfoCircle size={24} />,
    },
    {
        name: 'Contact',
        path: routeConfig.contact,
        icon: <MdContactPage size={24} />,
    },
];

function UserMenu() {
    const tippyRef = useRef(null);
    const dispatch = useDispatch();

    return (
        <>
            <HeadlessTippy
                delay={[50, 50]}
                // offset={[0, 16]}
                // visible
                // trigger="click"
                interactive
                placement="bottom-end"
                appendTo={'parent'}
                ref={tippyRef}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        <nav className="relative min-w-[200px] rounded bg-[#3d3b3b] py-2 text-white shadow-md">
                            {userMenu.map((item, id) => (
                                <NavLink
                                    key={id}
                                    to={item.path}
                                    className="flex items-center gap-5 px-3 py-1.5 font-semibold uppercase tracking-wide hover:bg-[#665d5d]"
                                    onClick={() => tippyRef?.current?._tippy?.hide()}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                            <button
                                className="flex w-full items-center gap-5 px-3 py-1.5 font-semibold uppercase tracking-wide hover:bg-[#665d5d]"
                                onClick={() => dispatch(logout())}
                            >
                                <span>
                                    <BiLogOut size={20} />
                                </span>
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                )}
            >
                <span className="inline-block md:hidden">
                    <BiCaretDown size={20} />
                </span>
            </HeadlessTippy>
        </>
    );
}

export default UserMenu;
