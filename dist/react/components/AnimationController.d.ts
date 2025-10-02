import React from 'react';
interface AnimationControllerProps {
    className?: string;
    children?: React.ReactNode;
    state?: ({ status, dir }: {
        status: boolean;
        dir: string;
    }) => void;
    id?: string;
}
interface AnimationMultiplyControllerProps {
    children: (list: {
        name: string;
        button: React.FC<AnimationControllerProps>;
    }[]) => React.ReactNode;
}
export declare const Animation: {
    ButtonController: React.FC<AnimationControllerProps>;
    MultiplyController: React.FC<AnimationMultiplyControllerProps>;
};
export {};
//# sourceMappingURL=AnimationController.d.ts.map