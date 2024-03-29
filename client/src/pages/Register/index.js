import { useEffect, useState } from 'react';
import { FaSignInAlt, FaUnlockAlt, FaUser } from 'react-icons/fa';
import { MdWavingHand } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routeConfig from '~/configs/route';
import { register } from '~/stores/actions/auth';

function Register() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    // Local State
    const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });

    useEffect(() => {
        // console.log(auth);
        // Xử lý show/hide error input
    }, [auth]);

    // Fn
    const handleChangeForm = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(registerData));
    };

    return (
        <div className="h-[400px] w-[500px] bg-[#19181852] p-9 shadow-sm shadow-[#ffffff1a]">
            <h1 className="mb-8 text-center font-lobster text-4xl text-white">
                Join now
                <MdWavingHand className="ml-3 inline-block" />
            </h1>
            <form action="" onSubmit={handleSubmit}>
                {/* Username */}
                <div className="relative rounded-md bg-[#ffffff1a] p-2">
                    <FaUser className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500" />
                    <input
                        type="text"
                        className="w-full bg-transparent pl-8 text-white"
                        placeholder="Username"
                        name='username'
                        value={registerData.username}
                        onChange={handleChangeForm}
                        required
                    />
                </div>
                {/* Password */}
                <div className="relative mt-4 rounded-md bg-[#ffffff1a] p-2">
                    <FaUnlockAlt className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500" />
                    <input
                        type="password"
                        className="w-full bg-transparent pl-8 text-white"
                        placeholder="Password"
                        name='password'
                        value={registerData.password}
                        onChange={handleChangeForm}
                        required
                    />
                </div>
                {/* Repeat Password */}
                <div className="relative mt-4 rounded-md bg-[#ffffff1a] p-2">
                    <FaUnlockAlt className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500" />
                    <input
                        type="password"
                        className="w-full bg-transparent pl-8 text-white"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        value={registerData.confirmPassword}
                        onChange={handleChangeForm}
                        required
                    />
                </div>
                {/* Confirm */}
                <button className="mt-6 inline-flex cursor-pointer items-center rounded-md bg-red-500 px-4 py-2 text-lg font-bold text-white transition duration-200 hover:bg-white hover:text-red-500">
                    <span>Confirm</span>
                    <FaSignInAlt className="ml-1.5" />
                </button>
            </form>
            <div className="mt-4 text-center">
                <span className="text-sm text-[#fff]">
                    Already have an account?{' '}
                    <Link to={routeConfig.login} className="cursor-pointer font-bold text-red-500 hover:underline">
                        Login now
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Register;
