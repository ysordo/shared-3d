import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/AnimationController.tsx
import { useEffect, useState } from 'react';
import { useSceneContext } from '../hooks/SceneContext';
const AnimationController = ({ className = '', children, state, id = '0', }) => {
    const [disabled, setDisabled] = useState(false);
    const [direction, setDirection] = useState('forward');
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager && disabled) {
            if (direction === 'forward') {
                sceneManager?.getAnimationManager()?.playForward(id, () => {
                    setDisabled(false);
                    state?.({ status: false, dir: 'backward' });
                    setDirection('backward');
                });
            }
            else {
                sceneManager?.getAnimationManager()?.playBackward(id, () => {
                    setDisabled(false);
                    state?.({ status: false, dir: 'forward' });
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
        state?.({ status: true, dir: direction });
    };
    return (_jsx("button", { id: `anim-${id.toLowerCase()}`, onClick: handleClick, disabled: disabled, className: className, name: direction, children: children }));
};
const AnimationMultiplyController = ({ children }) => {
    const [list, setList] = useState([]);
    const { sceneManager } = useSceneContext();
    useEffect(() => {
        if (sceneManager && sceneManager.activeModelId) {
            setList(Object.keys(sceneManager?.getAnimationManager?.()?.actions));
        }
    }, [sceneManager, sceneManager?.activeModelId]);
    if (list.length > 0) {
        if (typeof children === 'function') {
            const ls = list.map((v) => ({ name: v, button: AnimationController }));
            return _jsx(_Fragment, { children: children?.(ls) });
        }
        else {
            return children;
        }
    }
    else {
        return null;
    }
};
export const Animation = {
    ButtonController: AnimationController,
    MultiplyController: AnimationMultiplyController,
};
//# sourceMappingURL=AnimationController.js.map