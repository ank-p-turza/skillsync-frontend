import React from "react";
type ButtonProps = {
    children : React.ReactNode;
    onClick? : ()=> void;
    type?: "button" | "submit" | "reset";
    variant?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled,
    style
}: ButtonProps) => { 
    const baseStyles = "btn";
    const variantStyles = 
    variant == 'primary'? 'btn-primary' : 'btn-ghost';

    return (
        <button 
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles}`}
            disabled={disabled}
            style={style}
        >
            {children}
        </button>
   );
}
export default Button;