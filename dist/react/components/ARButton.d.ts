import React from 'react';

type ARButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: PointerEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
declare const ARButton: React.FC<ARButtonProps>;

export { ARButton };
