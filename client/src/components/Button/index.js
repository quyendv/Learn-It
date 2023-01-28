import { Link } from 'react-router-dom';

function Button({ to, href, disabled, children, leftIcon, rightIcon, className, onClick, ...restProps }) {
    // Component & props
    let Comp = 'button';
    const props = {
        onClick,
        ...restProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    // Classes
    const wrapperClass = 'inline-flex cursor-pointer select-none items-center justify-center font-bold rounded-sm';
    const classes = `${wrapperClass} ${disabled ? 'pointer-events-none opacity-50' : ''} ${className}`;

    // Disable onEvent function
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof key === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Comp className={(classes, 'min-w-[6.25rem] rounded-md py-2 px-4')} {...props}>
            {leftIcon && <span className="mr-2 inline-block w-5 text-center">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="ml-2 inline-block w-5 text-center">{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
