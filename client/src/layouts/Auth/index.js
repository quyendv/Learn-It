function Auth({ children }) {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-auth bg-cover bg-center bg-no-repeat">
            <div className="mb-4 text-center text-white">
                <h1 className="font-berkshireSwash text-5xl">Welcome to Learn-It!</h1>
                <p className="text-lg">Keep track of what you are learning</p>
            </div>
            <>{children}</>
        </div>
    );
}

export default Auth;
