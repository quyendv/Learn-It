import { FaHandPointDown, FaSignInAlt, FaUnlockAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import routeConfig from '~/routes/config';

function Login() {
    return (
        <div className="h-[350px] w-[500px] bg-[#19181852] p-9 shadow-sm shadow-[#ffffff1a]">
            <h1 className="mb-8 text-center font-lobster text-4xl text-white">
                Login here
                <FaHandPointDown className="ml-3 inline-block" />
            </h1>
            <form action="">
                {/* Username */}
                <div className="relative rounded-md bg-[#ffffff1a] p-2">
                    <FaUser className="absolute left-3 top-1/2 w-5 -translate-y-1/2 text-red-500" />
                    <input
                        type="text"
                        className="w-full bg-transparent pl-8 text-white"
                        placeholder="Username"
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
                        required
                    />
                </div>
                {/* Forgot password */}
                <div className="mt-1 text-right">
                    <span className="cursor-pointer text-sm text-[#ffffff80] hover:text-white hover:underline">
                        Forgot password?
                    </span>
                </div>
                {/* Confirm */}
                <button className="mt-2 inline-flex cursor-pointer items-center rounded-md bg-red-500 px-4 py-2 text-lg font-bold text-white transition duration-200 hover:bg-white hover:text-red-500">
                    <span>Confirm</span>
                    <FaSignInAlt className="ml-1.5" />
                </button>
            </form>
            <div className="mt-4 text-center">
                <span className="text-sm text-[#fff]">
                    Don't have an account?{' '}
                    <Link to={routeConfig.register} className="cursor-pointer font-bold text-red-500 hover:underline">
                        Register now
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default Login;
