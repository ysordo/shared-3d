'use client';
import { useEffect } from 'react';
import { useActiveModel } from './useActiveModel';
import { THREE } from '../lib';
export const useAnimation = (clipName, play = true) => {
    const model = useActiveModel();
    useEffect(() => {
        if (!model || !model.animations) {
            return;
        }
        const clip = model.animations.find(a => a.name === clipName);
        if (!clip) {
            return;
        }
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(clip);
        if (play) {
            action.play();
        }
        const clock = new THREE.Clock();
        const animate = () => {
            mixer.update(clock.getDelta());
            requestAnimationFrame(animate);
        };
        animate();
        return () => {
            action.stop();
        };
    }, [model, clipName, play]);
};
//# sourceMappingURL=useAnimation.js.map