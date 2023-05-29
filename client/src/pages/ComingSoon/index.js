import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import comingSoonImage from '~/assets/images/comingSoon.png';
import routeConfig from '~/configs/route';

function ComingSoon() {
    return (
        <div className="grid min-h-screen w-screen place-content-center bg-slate-400">
            <div className="flex flex-col items-center gap-2 p-2">
                <p className="text-center text-3xl font-bold">Sorry, this page is not yet completed.</p>
                <div className="h-48 w-48">
                    <img className="h-auto w-full object-cover" src={comingSoonImage} alt="clock" />
                </div>
                <p className="text-lg font-medium">We will update it soon.</p>
                <Link className="mt-4 space-x-2 rounded bg-red-500 px-3 py-1.5 text-white" to={routeConfig.home}>
                    <span>
                        <BsArrowReturnLeft />
                    </span>
                    <span>Go Home</span>
                </Link>
            </div>
        </div>
    );
}

export default ComingSoon;
