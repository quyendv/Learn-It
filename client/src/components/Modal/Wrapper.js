function ModalWrapper({ show = false, title, onClose = () => {}, children }) {
    return (
        <div className={`inset-0 grid place-content-center bg-[#0000004d] ${show ? 'fixed' : 'hidden'}`}>
            <div className="relative min-h-[400px] min-w-[300px] rounded-md bg-white p-4 shadow-md md:min-w-[400px]">
                {/* Title */}
                <h1 className="mb-4 text-2xl font-semibold text-slate-500">{title}</h1>

                {/* Close */}
                <span className="absolute right-0 top-0 cursor-pointer px-2 text-2xl" onClick={onClose}>
                    &times;
                </span>

                {/* Form */}
                <>{children}</>
            </div>
        </div>
    );
}

export default ModalWrapper;
