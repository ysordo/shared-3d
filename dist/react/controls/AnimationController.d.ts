import type { ReactNode } from 'react';
import React from 'react';
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
export declare const AnimationController: React.FC<AnimationControllerProps>;
export {};
//# sourceMappingURL=AnimationController.d.ts.map