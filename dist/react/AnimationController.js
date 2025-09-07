import { jsx as _jsx } from "react/jsx-runtime";
// src/components/AnimationController.tsx
import { useEffect, useState } from 'react';
import { useSceneContext } from './SceneContext';
const AnimationController = ({ className = '', children, }) => {
    const [disabled, setDisabled] = useState(false);
    const [direction, setDirection] = useState('forward');
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager && disabled) {
            if (direction === 'forward') {
                sceneManager
                    ?.getAnimationManager()
                    ?.playForward(() => setDisabled(false));
            }
            else {
                sceneManager
                    ?.getAnimationManager()
                    ?.playBackward(() => setDisabled(false));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);
    const handleClick = () => {
        if (sceneManager?.getAnimationManager()?.isBusy()) {
            return;
        }
        setDisabled(true);
        setDirection((old) => (old === 'forward' ? 'backward' : 'forward'));
    };
    return (_jsx("button", { onClick: handleClick, disabled: disabled, className: className, children: children }));
};
export default AnimationController;
//# sourceMappingURL=AnimationController.js.map