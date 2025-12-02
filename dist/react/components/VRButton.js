'use client';
import { useEffect } from 'react';
import { useScene } from '../../hooks/useScene';
import { VRButton as ThreeVRButton } from 'three/examples/jsm/webxr/VRButton.js';
export const VRButton = () => {
    const { renderer } = useScene();
    useEffect(() => {
        if (!renderer) {
            return;
        }
        renderer.xr.enabled = true;
        const button = ThreeVRButton.createButton(renderer);
        document.body.appendChild(button);
        return () => {
            if (button.parentNode) {
                button.parentNode.removeChild(button);
            }
        };
    }, [renderer]);
    return null;
};
//# sourceMappingURL=VRButton.js.map