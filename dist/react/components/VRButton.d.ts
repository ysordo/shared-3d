import React from 'react';

type VRButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: (e: PointerEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
declare const VRButton: React.FC<VRButtonProps>;

export { VRButton };
