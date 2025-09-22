import { jsx as _jsx } from "react/jsx-runtime";
// src/components/AnimationController.tsx
import { useEffect, useState } from 'react';
import { useSceneContext } from '../hooks/SceneContext';
const AnimationController = ({ className = '', children, state, }) => {
    const [disabled, setDisabled] = useState(false);
    const [direction, setDirection] = useState('forward');
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager && disabled) {
            if (direction === 'forward') {
                sceneManager?.getAnimationManager()?.playForward('0', () => {
                    setDisabled(false);
                    state?.(false);
                    setDirection('backward');
                });
            }
            else {
                sceneManager?.getAnimationManager()?.playBackward('0', () => {
                    setDisabled(false);
                    state?.(false);
                    setDirection('forward');
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);
    const handleClick = () => {
        if (sceneManager?.getAnimationManager()?.isBusy()) {
            return;
        }
        setDisabled(true);
        state?.(true);
    };
    return (_jsx("button", { onClick: handleClick, disabled: disabled, className: className, name: direction, children: children }));
};
export const Animation = {
    ButtonController: AnimationController,
};
//# sourceMappingURL=AnimationController.js.map