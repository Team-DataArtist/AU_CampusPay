import React from 'react';

interface ButtonProps {
    text: string | React.ReactNode;
    icon?: any;
    buttonType?: 'submit' | 'button' | 'reset' | undefined;
    className?: string;
    onClick?: () => void;
}

const Button = ({
    buttonType,
    text,
    onClick,
    className
}: ButtonProps) => {
    return (
        <button
            type={buttonType}
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;