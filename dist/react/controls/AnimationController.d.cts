import React, { ReactNode } from 'react';

type AnimationItem = {
    name: string;
    playForward: () => void;
    playBackward: () => void;
    toggle: () => void;
    isPlaying: boolean;
    isReversed: boolean;
};
type AnimationControllerProps = {
    children: (animations: AnimationItem[]) => ReactNode;
    className?: string;
};
declare const AnimationController: React.FC<AnimationControllerProps>;

export { AnimationController };
