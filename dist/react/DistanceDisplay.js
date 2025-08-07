'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useSceneContext } from './SceneContext';
/**
 * Component to display the distance from the camera to the active model in a 3D scene.
 * It updates the distance in real-time and can optionally set it via a callback.
 * @param {DistanceDisplayProps} props - Component properties
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {React.ReactNode} [props.children] - Child elements to render inside the component
 * @param {(distance: number) => void} [props.setDistance] - Callback function to set the distance value
 * @returns {JSX.Element} Rendered component showing distance and scale bar
 */
export function DistanceDisplay({ children, className, setDistance, }) {
    const { sceneManager } = useSceneContext();
    const animationRef = useRef(0);
    useEffect(() => {
        const updateDistance = () => {
            const control = sceneManager?.getOrbitControls();
            if (control) {
                const rawDistance = control.getDistance();
                setDistance?.(rawDistance);
            }
            /* const activeModelId = sceneManager?.getModelActiveId();
            if (!activeModelId) {
              animationRef.current = requestAnimationFrame(updateDistance);
              return;
            }
      
            const model = sceneManager?.getModel(activeModelId);
            const camera = sceneManager?.getCamera();
      
            if (model && camera) {
              const modelPosition = new THREE.Vector3();
              model.getWorldPosition(modelPosition);
      
              const rawDistance = modelPosition.distanceTo(camera.position);
              setDistance?.(rawDistance);
            }*/
            animationRef.current = requestAnimationFrame(updateDistance);
        };
        animationRef.current = requestAnimationFrame(updateDistance);
        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [sceneManager, setDistance]);
    return _jsx("div", { className: className, children: children });
}
//# sourceMappingURL=DistanceDisplay.js.map